using backend.Models;
using backend.Repository;
using backend.Services;

namespace backend.Authorisation
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IAuthService authService, IUserRepository userRepository, IAccountService accountService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var path = context.Request.Path.Value?.Split("/").Last();
            var userId = authService.ValidateToken(token);
            if (userId != null)
            {
                // attach user to context on successful jwt validation
                context.Items["User"] = userRepository.GetRegisteredUserById(userId.Value);
                context.Items["Path"] = path;
                context.Items["Acc"] = accountService.GetAccountIds(userId.Value).ToArray();
            }

            await _next(context);
        }
    }
}
