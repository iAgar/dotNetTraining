using backend.Authorisation;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountsController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("new")]
        [AdminAuthorize]
        public ActionResult CreateBankAccount(Account a)
        {
            var result = _accountService.CreateAccount(a);
            return Ok(new { success = result, message = result ? "Account creation successful" : "Account creation failed" });
        }

        [HttpDelete("delete/{aid}")]
        [AdminAuthorize]
        public ActionResult DeleteBankAccount(int aid)
        {
            var result = _accountService.DeleteAccount(aid);
            return Ok(new { success = result, message = result ? "Account deletion successful" : "Account deletion failed" });
        }

        [HttpPost("withdraw/{aid}")]
        [UserAccAuthorize]
        public ActionResult Withdraw(int aid, TxnDto t)
        {
            t.IsDebit = true;
            t.Aid = aid;
            t.TxnType = "W";
            var result = _accountService.PerformTransaction(t);
            return Ok(new { success = result, message = result ? "Withdrawal successful" : "Withdrawal failed" });
        }

        [HttpPost("deposit/{aid}")]
        [UserAccAuthorize]
        public ActionResult Deposit(int aid, TxnDto t)
        {
            t.IsDebit = false;
            t.Aid = aid;
            t.TxnType = "D";
            var result = _accountService.PerformTransaction(t);
            return Ok(new { success = result, message = result ? "Deposit successful" : "Deposit failed" });
        }

        [HttpPost("transfer/{aid}")]
        [UserAccAuthorize]
        public ActionResult Transfer(int aid, TxnDto t)
        {
            t.Aid = aid;
            t.TxnType = "T";
            var result = _accountService.PerformTransfer(t);
            return Ok(new { success = result, message = result ? "Transfer successful" : "Transfer failed" });
        }

        [HttpGet("transactions/all/{aid}")]
        [UserAccAuthorize]
        public ActionResult GetAllTransactionIds(int aid)
        {
            var txns = _accountService.GetTxnIds(aid);
            bool result = txns.Count != 0;
            if (result)
            {
                return Ok(new { success = true, message = "Transactions found", txns });
            }
            return Ok(new { success = false, message = "No transactions found" });
        }

        [HttpGet("transactions/{tid}/{aid}")]
        [UserAccAuthorize]
        public ActionResult GetTransactionById(int tid)
        {
            var result = _accountService.GetTxnById(tid);
            return Ok(new
            {
                success = result != null,
                message = "Transacion details " + result != null ? "" : "not " + "found",
                details = result
            });
        }

        [HttpGet("details/{aid}")]
        [UserAccAuthorize]
        public ActionResult GetAccountById(int aid)
        {
            var result = _accountService.GetAccountById(aid);
            return Ok(new
            {
                success = result != null,
                message = "Account details " + result != null ? "" : "not " + "found",
                details = result
            });
        }

        [HttpGet("all/{uid}")]
        [UserIdAuthorize]
        public ActionResult GetAllAccounts(int uid)
        {
            var accounts = _accountService.GetAccounts(uid);
            bool result = accounts.Count != 0;
            if (result)
            {
                return Ok(new { success = true, message = "Accounts found", accounts });
                // return Ok(accs);
            }
            return Ok(new { success = false, message = "No accounts found" });
        }


        [HttpPost("/changepin/{aid}")]
        [UserAccSelfAuthorize]
        public ActionResult ChangePin(int aid, PinDto p)
        {
            p.Aid = aid;
            bool result = _accountService.UpdatePin(p);
            return Ok(new { success = result, message = "PIN change " + (result ? "" : "not ") + "successful" });

        }
    }
}