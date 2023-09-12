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
    public class RegisteredUsers1Controller : ControllerBase
    {
        private readonly AtmBankingContext _context;

        public RegisteredUsers1Controller(AtmBankingContext context)
        {
            _context = context;
        }

        // GET: api/RegisteredUsers1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegisteredUser>>> GetRegisteredUsers()
        {
          if (_context.RegisteredUsers == null)
          {
              return NotFound();
          }
            return await _context.RegisteredUsers.ToListAsync();
        }

        // GET: api/RegisteredUsers1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegisteredUser>> GetRegisteredUser(int id)
        {
          if (_context.RegisteredUsers == null)
          {
              return NotFound();
          }
            var registeredUser = await _context.RegisteredUsers.FindAsync(id);

            if (registeredUser == null)
            {
                return NotFound();
            }

            return registeredUser;
        }

        // PUT: api/RegisteredUsers1/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegisteredUser(int id, RegisteredUser registeredUser)
        {
            if (id != registeredUser.Userid)
            {
                return BadRequest();
            }

            _context.Entry(registeredUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegisteredUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RegisteredUsers1
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegisteredUser>> PostRegisteredUser(RegisteredUser registeredUser)
        {
          if (_context.RegisteredUsers == null)
          {
              return Problem("Entity set 'AtmBankingContext.RegisteredUsers'  is null.");
          }
            _context.RegisteredUsers.Add(registeredUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegisteredUser", new { id = registeredUser.Userid }, registeredUser);
        }

        // DELETE: api/RegisteredUsers1/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegisteredUser(int id)
        {
            if (_context.RegisteredUsers == null)
            {
                return NotFound();
            }
            var registeredUser = await _context.RegisteredUsers.FindAsync(id);
            if (registeredUser == null)
            {
                return NotFound();
            }

            _context.RegisteredUsers.Remove(registeredUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegisteredUserExists(int id)
        {
            return (_context.RegisteredUsers?.Any(e => e.Userid == id)).GetValueOrDefault();
        }
    }
}
