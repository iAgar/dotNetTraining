using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using backend.Services;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisteredUsersController : ControllerBase
    {
        private readonly AtmBankingContext _context;
        private IAuthService _authService;
        //public static RegisteredUser user = new RegisteredUser();

        public RegisteredUsersController(AtmBankingContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        
        // POST: api/RegisteredUsers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /*[HttpPost]
        public async Task<ActionResult<RegisteredUser>> PostRegisteredUser(RegisteredUser registeredUser)
        
        {
            if (_context.RegisteredUsers == null || registeredUser == null)
            {
                return Problem("Entity set 'AtmBankingContext.RegisteredUsers'  is null.");
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

        }*/

        private bool validateUser(RegisteredUser registeredUser)
        {
            if (registeredUser.Userid == 0 || registeredUser.Dob == null)
            {
                return false;
            }
            return (RegisteredUserExists(registeredUser.Email));

        }
        private bool RegisteredUserExists(string id)
        {
            return (_context.RegisteredUsers?.Any(e => e.Email == id)).GetValueOrDefault();
        }




        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(RegisteredUser request)
        {
            var result = _authService.Register(request);
            return Ok(result != -1 ? "ok" : "not okay");
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(RegisteredUser request)
        {
            var result = _authService.Login(request);

            //string token = CreateToken(user);
            return Ok(result == null ? "not ok" : result);
        }

        private string CreateToken(RegisteredUser user)
        {

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Uname)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("achdbcewuechregbuovyhrtbrwhbnrfvwuhtgwnjgnigjthgtguritgu"));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
