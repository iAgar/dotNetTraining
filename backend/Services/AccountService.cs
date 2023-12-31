using System.Security.Cryptography;
using backend.Models;
using backend.Repository;
using backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class AccountService : IAccountService
    {
        private readonly AtmBankingContext _context;
        private readonly IPasswordUtils _utils;
        private readonly IUserRepository _userRepository;
        private readonly RandomNumberGenerator _rng = RandomNumberGenerator.Create();
        public AccountService(AtmBankingContext context, IUserRepository userRepository, IPasswordUtils utils)
        {
            _context = context;
            _userRepository = userRepository;
            _utils = utils;
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

        public List<Account> GetAccounts(int uid)
        {
            try
            {
                var r = _context.Accounts.AsNoTracking()
                    .Where(c => c.Userid == uid).ToList();
                r.ForEach(e => e.Pin = null);
                return r;
            }
            catch (Exception)
            {
                return new List<Account>();
            }
        }

        public Txn CreateTxnObj(TxnDto t1, Account a, bool isDebit)
        {
            return new Txn()
            {
                Aid = a.Aid,
                Amount = t1.Amount,
                TxnTime = DateTime.Now,
                Loc = t1.Loc,
                TxnType = t1.TxnType,
                IsDebit = isDebit,
                Remarks = t1.Remarks,
                Currency = t1.Currency
            };
        }

        public double CurrencyConverter(string? c1, string? c2, double amt)
        {
            try
            {
                return CurrencyList.GetConversionRate(c1 ?? "", c2 ?? "") * amt;
            }
            catch (Exception)
            {
                return amt;
            }

        }

        private bool CheckPin(Account a, string? pin)
        {
            return _utils.VerifyHashedPasswordV2(a.Pin ?? "", pin ?? "");
        }

        public bool UpdatePin(PinDto p)
        {
            try
            {
                Account? a = _context.Accounts.Find(p.Aid);
                if (a != null && CheckPin(a, p.Pin))
                {
                    a.Pin = _utils.HashPasswordV2(p.NewPin!.Trim()[0..4], _rng);
                    _context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool CreateAccount(Account a)
        {
            try
            {
                if (_userRepository.GetRegisteredUserById(a.Userid ?? default) != null && CurrencyList.CheckCurrency(a.Currency ?? "") != null)
                {
                    a.Balance = 0;
                    a.AccType = a.AccType?.Trim().ToUpper()[0..3];
                    a.IsDeleted = false;
                    a.Pin = _utils.HashPasswordV2(a.Pin ?? "0000".Trim()[0..4], _rng);
                    _context.Accounts.Add(a);
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

        public bool PerformTransaction(TxnDto t1)
        {
            try
            {
                Account? a = _context.Accounts.Find(t1.Aid);
                if (a != null && a.IsDeleted == false)
                {
                    t1.Currency = (t1.Currency ?? a.Currency ?? "").ToUpper();
                    if (CurrencyList.CheckCurrency(t1.Currency) != null && t1.Amount > 0)
                    {
                        var t = CreateTxnObj(t1, a, t1.IsDebit);
                        var a_amount = CurrencyConverter(t1.Currency, a.Currency, t1.Amount);
                        if (t.IsDebit == false)
                        {
                            a.Balance += a_amount;
                            _context.Txns.Add(t);
                            _context.SaveChanges();
                            return true;
                        }
                        else
                        {
                            if (CheckPin(a, t1.Pin) && a_amount <= a.Balance)
                            {
                                a.Balance -= a_amount;
                                _context.Txns.Add(t);
                                _context.SaveChanges();
                                return true;
                            }
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

        public bool PerformTransfer(TxnDto t1)
        {
            try
            {
                if (t1.Aid == t1.Rec_aid || t1.Amount < 0) return false;
                Account? a = _context.Accounts.Find(t1.Aid);
                Account? a2 = _context.Accounts.Find(t1.Rec_aid);
                if (a != null && a2 != null && a.IsDeleted == false && a2.IsDeleted == false)
                {
                    t1.Currency = (t1.Currency ?? a.Currency ?? "").ToUpper();
                    if (CurrencyList.CheckCurrency(t1.Currency) != null && t1.Amount > 0)
                    {
                        var t = CreateTxnObj(t1, a, true);
                        var t2 = CreateTxnObj(t1, a2, false);
                        var a_amount = CurrencyConverter(t1.Currency, a.Currency, t1.Amount);
                        var a2_amount = CurrencyConverter(t1.Currency, a2.Currency, t1.Amount);
                        if (CheckPin(a, t1.Pin))
                        {
                            a.Balance -= a_amount;
                            a2.Balance += a2_amount;
                            _context.Txns.Add(t);
                            _context.Txns.Add(t2);
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

        public List<Txn> GetTxns(int aid)
        {
            try
            {
                Account? a = _context.Accounts.Find(aid);
                if (a != null)
                {
                    return _context.Txns.AsNoTracking()
                        .Where(t => t.Aid == aid).ToList();
                }
                throw new KeyNotFoundException();
            }
            catch (Exception)
            {
                return new List<Txn>();
            }
        }

        public Txn? GetTxnById(int tid)
        {
            var res = _context.Txns.Find(tid);
            if (res != null)
            {
                _context.Entry(res).State = EntityState.Detached;
                res.AidNavigation = null;
            }
            return res;
        }

        public Account? GetAccountById(int aid)
        {
            var res = _context.Accounts.Find(aid);
            if (res != null)
            {
                _context.Entry(res).State = EntityState.Detached;
                res.User = null;
                res.Pin = null;
            }
            return res;
        }
    }

}