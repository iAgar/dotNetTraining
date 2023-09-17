using backend.Models;
using System.Security.Cryptography;

namespace backend.Services
{
    public interface IAuthService
    {
        Tuple<RegisteredUser?, string> Login(UserDto user);
        int Register(RegisteredUser user);
    }
}
