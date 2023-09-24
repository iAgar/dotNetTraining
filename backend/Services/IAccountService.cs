using backend.Models;

namespace backend.Services
{
    public interface IAccountService
    {
        bool CreateAccount(Account a);
        List<int> GetAccountIds(int uid);
        List<Account> GetAccounts(int uid);
        bool DeleteAccount(int? aid);
        bool PerformTransaction(TxnDto t1);
        bool PerformTransfer(TxnDto t1);
        List<int> GetTxnIds(int aid);
        Txn? GetTxnById(int tid);
        Account? GetAccountById(int aid);
        // bool CheckPin(Account a, string? pin);
        Txn CreateTxnObj(TxnDto t1, Account a, bool isDebit);
        double CurrencyConverter(string? c1, string? c2, double amt);
        bool UpdatePin(PinDto p);
    }

}