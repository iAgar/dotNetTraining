using backend.Models;
using backend.Repository;
using backend.Services;
using backend.Utils;

namespace backend.Authorisation
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IPasswordUtils utils, IUserRepository userRepository, IAccountService accountService, IConfiguration configuration)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var path = context.Request.Path.Value?.Split("/").Last();
            var userId = utils.ValidateToken(token, configuration);
            if (userId != null)
            {
                // attach user to context on successful jwt validation
                var tuser = userRepository.GetRegisteredUserById(userId.Value);
                var user = SystemExtension.Clone(tuser);
                if (user != null) user.Pass = null;
                context.Items["User"] = user;
                context.Items["Path"] = path;
                context.Items["Acc"] = accountService.GetAccountIds(userId.Value).ToArray();
            }

            await _next(context);
        }
    }
}
