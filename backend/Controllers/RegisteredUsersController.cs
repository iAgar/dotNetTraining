using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using atmBanking.Models;

namespace atmBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisteredUsersController : ControllerBase
    {
        private readonly AtmBankingContext _context;

        public RegisteredUsersController(AtmBankingContext context)
        {
            _context = context;
        }

        // GET: api/RegisteredUsers
        
        // POST: api/RegisteredUsers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegisteredUser>> PostRegisteredUser(RegisteredUser registeredUser)
        {
          if (_context.RegisteredUsers == null)
          {
              return Problem("Entity set 'AtmBankingContext.RegisteredUsers'  is null.");
          }
            
                if (validateUser(registeredUser)==true)
                {
                var x=(_context.RegisteredUsers?.FirstOrDefault(e => (e.Userid==registeredUser.Userid && e.Dob==registeredUser.Dob)));

                return Ok(x);
                }
                else
                {
                    return Problem("Invalid credentials");
                }
           
        }

        private bool validateUser(RegisteredUser registeredUser)
        {
            if(registeredUser.Userid==0 || registeredUser.Dob==null)
            {
                return false;
            }
            return (RegisteredUserExists(registeredUser.Userid));
            
        }
            private bool RegisteredUserExists(int id)
        {
            return (_context.RegisteredUsers?.Any(e => e.Userid == id)).GetValueOrDefault();
        }
    }
}
