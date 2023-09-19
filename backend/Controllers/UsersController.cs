using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using backend.Authorisation;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly IAuthService _authService;

        public UsersController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        [AdminAuthorize]
        public ActionResult Register(RegisteredUser request)
        {
            var result = _authService.Register(request);
            return Ok(result != -1 ? new { success = true, message = "User registration successful", id = result } : new { success = false, message = "User registration not successful" });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public ActionResult Login(UserDto request)
        {
            var result = _authService.Login(request);

            if (result.Item1 == null)
            {
                return Ok(new { success = false, message = result.Item2 })
;
            }
            return Ok(new { success = true, message = "Login successful", token = result.Item2, user = result.Item1 });
        }

        [HttpGet("me")]
        [AllowAnonymous]
        public ActionResult GetUserDetails()
        {
            var user = (RegisteredUser?)HttpContext.Items["User"];
            return Ok(new { success = user != null, user });
        }
    }
}
