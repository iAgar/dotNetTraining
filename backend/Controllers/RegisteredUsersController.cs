using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisteredUsersController : ControllerBase
    {
        private readonly backendContext _context;

        public RegisteredUsersController(backendContext context)
        {
            _context = context;
        }

        // POST: api/RegisteredUsers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegisteredUser>> PostRegisteredUser(RegisteredUser registeredUser)
        {
            if (_context.RegisteredUsers == null || registeredUser == null)
            {
                return Problem("Entity set 'backendContext.RegisteredUsers'  is null.");
            }
            else
            {
                if (validateUser(registeredUser) == true)
                {
                    var x = await _context.RegisteredUsers.FirstOrDefaultAsync(e => e.Userid == registeredUser.Userid && e.Dob == registeredUser.Dob);
                    return Ok(x);
                }
                else
                {
                    return Problem("Invalid credentials");
                }
            }

        }

        private bool validateUser(RegisteredUser registeredUser)
        {
            if (registeredUser.Userid == 0 || registeredUser.Dob == null)
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
