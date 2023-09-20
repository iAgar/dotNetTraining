using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend.Authorisation
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class UserAccAuthorizeAttribute : Attribute, IAuthorizationFilter
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
            var accs = (int[]?)context.HttpContext.Items["Acc"];
            int? aid = -1;
            try
            {
                aid = int.Parse(path!);
            }
            catch (Exception)
            {
                context.Result = new JsonResult(new { success = false, message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }

            if (user?.IsAdmin == true || accs?.Any(e => e == aid) == true)
                return;

            // not logged in or role not authorized
            context.Result = new JsonResult(new { success = false, message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }
    }
}
