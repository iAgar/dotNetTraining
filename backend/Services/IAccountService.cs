using backend.Models;

namespace backend.Services
{
    public interface IAccountService
    {
        bool CreateAccount(Account a);
        bool DeleteAccount(int? aid);
        bool PerformTransaction(Txn t);
        List<Txn> GetTxns(int aid);
    }

}