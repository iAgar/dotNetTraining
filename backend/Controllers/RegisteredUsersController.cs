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

        private IAuthService _authService;
        //public static RegisteredUser user = new RegisteredUser();

        public RegisteredUsersController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisteredUser request)
        {
            var result = _authService.Register(request);
            return Ok(result != -1 ? new { success = true, message = "User registration successful", id = result}  : new { success = false, message = "User registration not successful" });
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(RegisteredUser request)
        {
            var result = _authService.Login(request);

            if(result.Item1 == null)
            {
                return Ok(new { success = false, message = result.Item2 })
;           }
            return Ok(new {success = true, message = "Login successful", token = result.Item2, user = result.Item1});
        }
    }
}
