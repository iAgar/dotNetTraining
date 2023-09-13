using backend.Models;
using backend.Repository;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace backend.Services
{
    public class AuthService: IAuthService
    { 
        private IUserRepository _userRepository;

        private readonly IConfiguration _configuration;


        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }


        private readonly RandomNumberGenerator _rng = RandomNumberGenerator.Create();
        public string HashPasswordV2(string password, RandomNumberGenerator rng)
        {
            const KeyDerivationPrf Pbkdf2Prf = KeyDerivationPrf.HMACSHA1; // default for Rfc2898DeriveBytes
            const int Pbkdf2IterCount = 1000; // default for Rfc2898DeriveBytes
            const int Pbkdf2SubkeyLength = 256 / 8; // 256 bits
            const int SaltSize = 128 / 8; // 128 bits

            // Produce a version 2 (see comment above) text hash.
            byte[] salt = new byte[SaltSize];
            rng.GetBytes(salt);
            byte[] subkey = KeyDerivation.Pbkdf2(password, salt, Pbkdf2Prf, Pbkdf2IterCount, Pbkdf2SubkeyLength);

            var outputBytes = new byte[1 + SaltSize + Pbkdf2SubkeyLength];
            outputBytes[0] = 0x00; // format marker
            Buffer.BlockCopy(salt, 0, outputBytes, 1, SaltSize);
            Buffer.BlockCopy(subkey, 0, outputBytes, 1 + SaltSize, Pbkdf2SubkeyLength);
            return Convert.ToBase64String(outputBytes);
        }
        public bool VerifyHashedPasswordV2(string hashedPassword, string password)
        {
            byte[] decodedHashedPassword = Convert.FromBase64String(hashedPassword);

            if (decodedHashedPassword.Length == 0)
            {
                return false;
            }

            const KeyDerivationPrf Pbkdf2Prf = KeyDerivationPrf.HMACSHA1; // default for Rfc2898DeriveBytes
            const int Pbkdf2IterCount = 1000; // default for Rfc2898DeriveBytes
            const int Pbkdf2SubkeyLength = 256 / 8; // 256 bits
            const int SaltSize = 128 / 8; // 128 bits

            // We know ahead of time the exact length of a valid hashed password payload.
            if (decodedHashedPassword.Length != 1 + SaltSize + Pbkdf2SubkeyLength)
            {
                return false; // bad size
            }

            byte[] salt = new byte[SaltSize];
            Buffer.BlockCopy(decodedHashedPassword, 1, salt, 0, salt.Length);

            byte[] expectedSubkey = new byte[Pbkdf2SubkeyLength];
            Buffer.BlockCopy(decodedHashedPassword, 1 + salt.Length, expectedSubkey, 0, expectedSubkey.Length);

            // Hash the incoming password and verify it
            byte[] actualSubkey = KeyDerivation.Pbkdf2(password, salt, Pbkdf2Prf, Pbkdf2IterCount, Pbkdf2SubkeyLength);
#if NETSTANDARD2_0 || NETFRAMEWORK
        return ByteArraysEqual(actualSubkey, expectedSubkey);
#elif NETCOREAPP
            return CryptographicOperations.FixedTimeEquals(actualSubkey, expectedSubkey);
#else
#error Update target frameworks
#endif

        }

        public int Register(RegisteredUser user)
        {
            if(user.Pass == null)
            {
                return -1;
            }

            user.Pass = HashPasswordV2(user.Pass, _rng);
            return _userRepository.AddRegisteredUser(user);

        }

        public Tuple<RegisteredUser?, string> Login(RegisteredUser user)
        {
            var result_wrong = new Tuple<RegisteredUser?, string>(null, "Invalid credentials");

            if (user == null || user.Pass == null || user.Email == null)
            {
                return result_wrong;
            }

            RegisteredUser? user1 = _userRepository.GetRegisteredUserByEmail(user.Email);

            if(user1 == null || user1.Pass == null) {
                return result_wrong;
            }

            if(!VerifyHashedPasswordV2(user1.Pass, user.Pass)) {
                return result_wrong;
            }
            else
            {
                user1.Pass = null;
                var token = CreateToken(user);
                if(token == null) {
                    return result_wrong;
                }
                var result_right = new Tuple<RegisteredUser?, string>(user1, token);
                return result_right;
            }
        }

        public string? CreateToken(RegisteredUser user)
        {
            if(user.Email == null)
            {
                return null;
            }

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
