using backend.Models;

namespace backend.Repository
{
    public interface IUserRepository : IDisposable
    {
        IEnumerable<RegisteredUser> GetAllUser();
        IEnumerable<RegisteredUser> GetAllCustomers();
        RegisteredUser? GetRegisteredUserById(int uId);
        RegisteredUser? GetRegisteredUserByEmail(string email);
        int AddRegisteredUser(RegisteredUser userEntity);
        RegisteredUser? UpdateRegisteredUser(RegisteredUser userEntity);
        void DeleteRegisteredUser(int uId);
    }
}
