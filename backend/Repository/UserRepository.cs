using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly AtmBankingContext _context;

        public UserRepository(AtmBankingContext context)
        {
            _context = context;
        }

        public IEnumerable<RegisteredUser> GetAllUser()
        {
            return _context.RegisteredUsers.ToList();
        }

        public IEnumerable<RegisteredUser> GetAllCustomers()
        {
            return _context.RegisteredUsers.Where(e => e.IsAdmin != true).ToList();
        }
        public RegisteredUser? GetRegisteredUserById(int uId)
        {
            return _context.RegisteredUsers.Find(uId);
        }

        public RegisteredUser? GetRegisteredUserByEmail(string email)
        {
            return _context.RegisteredUsers.FirstOrDefault(e => email.Equals(e.Email));
        }

        public int AddRegisteredUser(RegisteredUser userEntity)
        {
            int result = -1;
            if (userEntity != null && userEntity.Email != null && GetRegisteredUserByEmail(userEntity.Email) == null)
            {
                _context.RegisteredUsers.Add(userEntity);
                _context.SaveChanges();
                result = userEntity.Userid;
            }
            return result;

        }
        public RegisteredUser? UpdateRegisteredUser(RegisteredUser userEntity)
        {
            RegisteredUser? registeredUser = null;

            if (userEntity != null && userEntity.Userid != 0 && GetRegisteredUserById(userEntity.Userid) != null)
            {
                _context.Entry(userEntity).State = EntityState.Modified;
                _context.SaveChanges();
                registeredUser = userEntity;
            }
            return registeredUser;
        }
        public void DeleteRegisteredUser(int uId)
        {
            RegisteredUser? userEntity = GetRegisteredUserById(uId);
            if (userEntity != null)
                _context.RegisteredUsers.Remove(userEntity);
            _context.SaveChanges();

        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);

            GC.SuppressFinalize(this);
        }
    }

}