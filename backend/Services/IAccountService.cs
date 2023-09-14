using backend.Models;

namespace backend.Services
{
    public interface IAccountService
    {
        bool CreateAccount(Account a);
        List<int> GetAccountIds(int uid);
        bool DeleteAccount(int? aid);
        bool PerformTransaction(Txn t);
        List<int> GetTxnIds(int aid);
        Txn? GetTxnById(int tid);
        Account? GetAccountById(int aid);
    }

}