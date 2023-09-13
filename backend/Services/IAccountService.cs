using backend.Models;

namespace backend.Services
{
    public interface IAccountService
    {
        int? CreateAccount(Account a);
        bool DeleteAccount(int? aid);
        int? PerformTransaction(Txn t);
        List<Txn> GetTxns();
    }

}