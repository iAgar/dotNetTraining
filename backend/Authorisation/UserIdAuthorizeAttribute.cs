using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend.Authorisation
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class UserIdAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // skip authorization if action is decorated with [AllowAnonymous] attribute
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
            if (allowAnonymous)
                return;

            // authorization
            var user = (RegisteredUser?)context.HttpContext.Items["User"];
            var path = (string?)context.HttpContext.Items["Path"];
            int? uid = -1;
            try
            {
                uid = int.Parse(path!);
            }
            catch (Exception)
            {
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }

            if (user?.IsAdmin == true || user?.Userid == uid)
                return;

            // not logged in or role not authorized
            context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }
    }
}
