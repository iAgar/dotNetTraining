using System.Security.Cryptography;
using backend.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace backend.Authorisation
{
    public interface IPasswordUtils
    {
        string HashPasswordV2(string password, RandomNumberGenerator rng);
        bool VerifyHashedPasswordV2(string hashedPassword, string password);
        string? CreateToken(RegisteredUser user, IConfiguration configuration);
        int? ValidateToken(string? token, IConfiguration configuration);
    }
}