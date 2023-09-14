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
        public bool CreateAccount(Account a)
        {
            try
            {
                a.Balance = 0;
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
        public List<Txn> GetTxns(int aid)
        {
            try
            {
                Account? a = _context.Accounts.Find(aid);
                if (a != null)
                {
                    return _context.Txns.Where(t => t.Aid == aid).ToList();
                }
                throw new KeyNotFoundException();
            }
            catch (Exception)
            {
                return new List<Txn>();
            }
        }

    }

}