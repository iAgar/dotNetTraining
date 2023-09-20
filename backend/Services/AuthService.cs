using backend.Models;
using backend.Repository;
using backend.Utils;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordUtils _utils;
        private readonly IConfiguration _configuration;
        private readonly RandomNumberGenerator _rng = RandomNumberGenerator.Create();

        public AuthService(IUserRepository userRepository, IPasswordUtils utils, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _utils = utils;
            _configuration = configuration;
        }

        public int Register(RegisteredUser user)
        {
            if (user.Pass == null)
            {
                return -1;
            }

            user.Pass = _utils.HashPasswordV2(user.Pass, _rng);
            user.IsAdmin = false;
            return _userRepository.AddRegisteredUser(user);
        }

        public Tuple<RegisteredUser?, string> Login(UserDto user)
        {
            var result_wrong = new Tuple<RegisteredUser?, string>(null, "Invalid credentials");

            if (user == null || user.Pass == null || user.Email == null)
            {
                return result_wrong;
            }

            RegisteredUser? user1 = _userRepository.GetRegisteredUserByEmail(user.Email);

            if (user1 == null || user1.Pass == null)
            {
                return result_wrong;
            }

            if (!_utils.VerifyHashedPasswordV2(user1.Pass, user.Pass))
            {
                return result_wrong;
            }
            else
            {
                user1.Pass = null;
                var token = _utils.CreateToken(user1, _configuration);
                if (token == null)
                {
                    return result_wrong;
                }
                var result_right = new Tuple<RegisteredUser?, string>(user1, token);
                return result_right;
            }
        }
        public IEnumerable<RegisteredUser> GetRegisteredCustomers()
        {
            return _userRepository.GetAllCustomers();
        }
    }
}
