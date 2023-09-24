using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CSharp.RuntimeBinder;
using Microsoft.Extensions.Configuration;

namespace backend.Tests
{
    [TestClass]
    public class UsersControllerTest
    {
        private DbContextOptionsBuilder<Models.AtmBankingContext> _boptions = default!;
        private Utils.IPasswordUtils _passUtils = default!;
        private IConfiguration _configuration = default!;

        [TestInitialize]
        public void SetUp()
        {
            _boptions = new DbContextOptionsBuilder<Models.AtmBankingContext>();
            _passUtils = new Utils.PasswordUtils();
            _configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string?> { { "AppSettings:Token", "test token token token" } })
                .Build();
        }

        private dynamic InitialControllerTests(ActionResult actionResult)
        {
            Assert.IsInstanceOfType<OkObjectResult>(actionResult);
            var okres = actionResult as OkObjectResult;
            Assert.IsNotNull(okres);
            Assert.IsNotNull(okres.Value);
            Assert.AreEqual(okres.StatusCode, 200);

            dynamic obj = new DynamicObjectResultValue(okres.Value);
            return obj;
        }

        [TestMethod]
        public void Test_ConfigurationMock_pass()
        {
            var _options = _boptions.UseInMemoryDatabase(databaseName: "testdb-userscontroller-1").Options;
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            var authService = new Services.AuthService(repo, _passUtils, _configuration);

            Assert.AreEqual(_configuration.GetSection("AppSettings:Token").Value, "test token token token");
        }

        [TestMethod]
        public void Test_UsersController_Login_pass()
        {
            var _options = _boptions
                .UseInMemoryDatabase(databaseName: "testdb-userscontroller-" + System.Reflection.MethodBase.GetCurrentMethod()!.Name)
                .Options;
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            var authService = new Services.AuthService(repo, _passUtils, _configuration);
            var controller = new Controllers.UsersController(authService);

            authService.Register(new Models.RegisteredUser { Email = "login@test.co", Pass = "pass1234" });

            var res = controller.Login(new Models.UserDto { Email = "login@test.co", Pass = "pass1234" });
            var obj = InitialControllerTests(res);

            Assert.AreEqual(obj.success, true);
            Assert.IsNotNull(obj.token);
        }

        [TestMethod]
        public void Test_UsersController_Login_fail()
        {
            var _options = _boptions
                .UseInMemoryDatabase(databaseName: "testdb-userscontroller-" + System.Reflection.MethodBase.GetCurrentMethod()!.Name)
                .Options;
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            var authService = new Services.AuthService(repo, _passUtils, _configuration);
            var controller = new Controllers.UsersController(authService);

            authService.Register(new Models.RegisteredUser { Email = "login@test.co", Pass = "pass1234" });

            var res = controller.Login(new Models.UserDto { Email = "login@test.co", Pass = "wrongpass" });
            var obj = InitialControllerTests(res);

            Assert.AreEqual(obj.success, false);
            Assert.AreEqual(obj.message, "Invalid credentials");
        }

        [TestMethod]
        public void Test_UsersController_GetUserDetails_loggedIn()
        {
            var _options = _boptions
                .UseInMemoryDatabase(databaseName: "testdb-userscontroller-" + System.Reflection.MethodBase.GetCurrentMethod()!.Name)
                .Options;
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            var authService = new Services.AuthService(repo, _passUtils, _configuration);
            authService.Register(new Models.RegisteredUser { Userid = 1, Email = "login@test.co", Pass = "pass1234" });
            var httpContext = new DefaultHttpContext();
            httpContext.Items["User"] = repo.GetRegisteredUserById(1);

            var controller = new Controllers.UsersController(authService)
            {
                ControllerContext = new ControllerContext() { HttpContext = httpContext }
            };
            var res = controller.GetUserDetails();
            var obj = InitialControllerTests(res);
            Assert.AreEqual(obj.success, true);
            Assert.IsNotNull(obj.user);
        }

        [TestMethod]
        public void Test_UsersController_GetUserDetails_NotLoggedIn()
        {
            var _options = _boptions
                .UseInMemoryDatabase(databaseName: "testdb-userscontroller-" + System.Reflection.MethodBase.GetCurrentMethod()!.Name)
                .Options;
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            var authService = new Services.AuthService(repo, _passUtils, _configuration);
            var httpContext = new DefaultHttpContext();
            httpContext.Items["User"] = null;

            var controller = new Controllers.UsersController(authService)
            {
                ControllerContext = new ControllerContext() { HttpContext = httpContext }
            };
            var res = controller.GetUserDetails();
            var obj = InitialControllerTests(res);
            Assert.AreEqual(obj.success, false);
            Assert.IsNull(obj.user);
        }

        [TestMethod]
        public void Test_UsersController_GetAllUsers_AllCustomers_pass()
        {
            var _options = _boptions
                .UseInMemoryDatabase(databaseName: "testdb-userscontroller-" + System.Reflection.MethodBase.GetCurrentMethod()!.Name)
                .Options;
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            var authService = new Services.AuthService(repo, _passUtils, _configuration);
            authService.Register(new Models.RegisteredUser { Email = "login1@test.co", Pass = "pass1234" });
            authService.Register(new Models.RegisteredUser { Email = "login2@test.co", Pass = "pass1234" });
            authService.Register(new Models.RegisteredUser { Email = "login3@test.co", Pass = "pass1234" });

            var controller = new Controllers.UsersController(authService);

            var res = controller.GetAllUsers();
            var obj = InitialControllerTests(res);
            Assert.AreEqual(obj.success, true);
            Assert.IsNotNull(obj.users);
            Assert.AreEqual(obj.users.Count, 3);
        }

        [TestMethod]
        public void Test_UsersController_GetAllUsers_Admin_Customers_pass()
        {
            var _options = _boptions
                .UseInMemoryDatabase(databaseName: "testdb-userscontroller-" + System.Reflection.MethodBase.GetCurrentMethod()!.Name)
                .Options;
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            var authService = new Services.AuthService(repo, _passUtils, _configuration);
            _context.RegisteredUsers.Add(new Models.RegisteredUser { IsAdmin = true, Email = "login2@test.co", Pass = "pass1234" });
            authService.Register(new Models.RegisteredUser { Email = "login2@test.co", Pass = "pass1234" });
            authService.Register(new Models.RegisteredUser { Email = "login3@test.co", Pass = "pass1234" });

            var controller = new Controllers.UsersController(authService);

            var res = controller.GetAllUsers();
            var obj = InitialControllerTests(res);
            Assert.AreEqual(obj.success, true);
            Assert.IsNotNull(obj.users);
            Assert.AreEqual(obj.users.Count, 2);
        }

        [TestMethod]
        public void Test_UsersController_GetAllUsers_fail()
        {
            var _options = _boptions
                .UseInMemoryDatabase(databaseName: "testdb-userscontroller-" + System.Reflection.MethodBase.GetCurrentMethod()!.Name)
                .Options;
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            var authService = new Services.AuthService(repo, _passUtils, _configuration);

            var controller = new Controllers.UsersController(authService);

            var res = controller.GetAllUsers();
            var obj = InitialControllerTests(res);
            Assert.AreEqual(obj.success, false);
            Assert.IsNotNull(obj.users);
            Assert.AreEqual(obj.users.Count, 0);
        }

        [TestMethod]
        public void Test_UsersController_GetAllCurrencies_pass()
        {
            var _options = _boptions
                .UseInMemoryDatabase(databaseName: "testdb-userscontroller-" + System.Reflection.MethodBase.GetCurrentMethod()!.Name)
                .Options;
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            var authService = new Services.AuthService(repo, _passUtils, _configuration);

            var controller = new Controllers.UsersController(authService);

            var res = controller.GetAllCurrencies();
            var obj = InitialControllerTests(res);
            Assert.AreEqual(obj.success, true);
            Assert.IsNotNull(obj.currency);
            Assert.AreEqual(obj.currency.Count, Utils.CurrencyList.GetCurrencies().Count);
        }

        [TestMethod]
        public void Test_UsersController_Register_pass()
        {
            var _options = _boptions
                .UseInMemoryDatabase(databaseName: "testdb-userscontroller-" + System.Reflection.MethodBase.GetCurrentMethod()!.Name)
                .Options;
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            var authService = new Services.AuthService(repo, _passUtils, _configuration);

            var controller = new Controllers.UsersController(authService);

            var res = controller.Register(new Models.RegisteredUser { Email = "login@test.co", Pass = "pass1234" });
            var obj = InitialControllerTests(res);
            Assert.AreEqual(obj.success, true);
            Assert.IsNotNull(obj.id);
        }

        [TestMethod]
        public void Test_UsersController_Register_DuplicateEmail_fail()
        {
            var _options = _boptions
                .UseInMemoryDatabase(databaseName: "testdb-userscontroller-" + System.Reflection.MethodBase.GetCurrentMethod()!.Name)
                .Options;
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            var authService = new Services.AuthService(repo, _passUtils, _configuration);
            authService.Register(new Models.RegisteredUser { Email = "login@test.co", Pass = "pass1234" });

            var controller = new Controllers.UsersController(authService);
            var res = controller.Register(new Models.RegisteredUser { Email = "login@test.co", Pass = "pass1234" });
            var obj = InitialControllerTests(res);
            Assert.AreEqual(obj.success, false);
            Assert.IsNotNull(obj.message);
            Assert.AreEqual(obj.message, "User registration not successful");
        }

        [TestMethod]
        public void Test_UsersController_Register_NoEmail_fail()
        {
            var _options = _boptions
                .UseInMemoryDatabase(databaseName: "testdb-userscontroller-" + System.Reflection.MethodBase.GetCurrentMethod()!.Name)
                .Options;
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            var authService = new Services.AuthService(repo, _passUtils, _configuration);

            var controller = new Controllers.UsersController(authService);
            var res = controller.Register(new Models.RegisteredUser { Pass = "pass1234" });
            var obj = InitialControllerTests(res);
            Assert.AreEqual(obj.success, false);
            Assert.IsNotNull(obj.message);
            Assert.AreEqual(obj.message, "User registration not successful");
        }

        [TestMethod]
        public void Test_UsersController_Register_NoPassword_fail()
        {
            var _options = _boptions
                .UseInMemoryDatabase(databaseName: "testdb-userscontroller-" + System.Reflection.MethodBase.GetCurrentMethod()!.Name)
                .Options;
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            var authService = new Services.AuthService(repo, _passUtils, _configuration);

            var controller = new Controllers.UsersController(authService);
            var res = controller.Register(new Models.RegisteredUser { Email = "login@test.co" });
            var obj = InitialControllerTests(res);
            Assert.AreEqual(obj.success, false);
            Assert.IsNotNull(obj.message);
            Assert.AreEqual(obj.message, "User registration not successful");
        }
    }
}