using backend.Models;

namespace backend.Services
{
    public class AccountService : IAccountService
    {
        private readonly AtmBankingContext _context;
        public AccountService(AtmBankingContext context)
        {
            _context = context;
        }
        public List<int> GetAccountIds(int uid)
        {
            try
            {
                return _context.Accounts.Where(c => c.Userid == uid).ToList().ConvertAll(e => e.Aid);
            }
            catch (Exception)
            {
                return new List<int>();
            }
        }
        public bool CreateAccount(Account a)
        {
            try
            {
                a.Balance = 0;
                a.IsDeleted = false;
                _context.Accounts.Add(a);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool DeleteAccount(int? aid)
        {
            try
            {
                Account? a = _context.Accounts.Find(aid);
                if (a != null)
                {
                    a.IsDeleted = true;
                    _context.SaveChanges();
                    return true;
                }
                throw new KeyNotFoundException();
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool PerformTransaction(Txn t)
        {
            try
            {
                Account? a = _context.Accounts.Find(t.Aid);
                if (a != null)
                {
                    if (t.IsDebit == false)
                    {
                        a.Balance += t.Amount;
                        _context.Txns.Add(t);
                        _context.SaveChanges();
                        return true;
                    }
                    else
                    {
                        if (t.Amount <= a.Balance)
                        {
                            a.Balance -= t.Amount;
                            _context.Txns.Add(t);
                            _context.SaveChanges();
                            return true;
                        }
                    }
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public List<int> GetTxnIds(int aid)
        {
            try
            {
                Account? a = _context.Accounts.Find(aid);
                if (a != null)
                {
                    return _context.Txns.Where(t => t.Aid == aid).ToList().ConvertAll(t => t.Tid);
                }
                throw new KeyNotFoundException();
            }
            catch (Exception)
            {
                return new List<int>();
            }
        }

        public Txn? GetTxnById(int tid)
        {
            var res = _context.Txns.Find(tid);
            if (res != null)
                res.AidNavigation = null;
            return res;
        }

        public Account? GetAccountById(int aid)
        {
            var res = _context.Accounts.Find(aid);
            if (res != null)
                res.User = null;
            return res;
        }
    }

}