using backend.Models;
using System.Security.Cryptography;

namespace backend.Services
{
    public interface IAuthService
    {
        string HashPasswordV2(string password, RandomNumberGenerator rng);
        bool VerifyHashedPasswordV2(string hashedPassword, string password);
        Tuple<RegisteredUser?, string> Login(UserDto user);
        int Register(RegisteredUser user);
        string? CreateToken(RegisteredUser user);
        int? ValidateToken(string? token);
    }
}
