using backend.Services;
using backend.Utils;
using Microsoft.Extensions.Configuration;

namespace backend.Tests
{
    [TestClass]
    public  class AuthServiceTest
    {
        private DbContextOptions<Models.AtmBankingContext>? _options;

        [TestInitialize]
        public void SetUp()
        {
            _options = new DbContextOptionsBuilder<Models.AtmBankingContext>()
                .UseInMemoryDatabase(databaseName: "testdb").Options;
        }

        [TestMethod]
        public void Test_Services_Auth_Register()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            
            IConfiguration config = new ConfigurationBuilder().Build();

            var service = new Services.AuthService(repo, new PasswordUtils(), config);

            int res = service.Register(new Models.RegisteredUser
            {
                Uname = "Test User1",
                Email = "test1@email.com",
                Pass = "test123"
            });

            Assert.AreNotEqual(-1, res);
        }

        [TestMethod]
        public void Test_Services_Auth_Login_Pass()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);

            IConfiguration config = new ConfigurationBuilder().Build();

            var service = new Services.AuthService(repo, new PasswordUtils(), config);

            var user = new Models.RegisteredUser
            {
                Uname = "Test User2",
                Email = "test2@email.com",
                Pass = "test12"
            };

            int res = service.Register(user);

            var userDto = new Models.UserDto{
                Email = user.Email,
                Pass = user.Pass,
            };

            var result = service.Login(userDto);

            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void Test_Services_Auth_Login_Fail()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);

            IConfiguration config = new ConfigurationBuilder().Build();

            var service = new Services.AuthService(repo, new PasswordUtils(), config);

            var user = new Models.RegisteredUser
            {
                Uname = "Test User3",
                Email = "test3@email.com",
                Pass = "test12"
            };

            int res = service.Register(user);

            var userDto = new Models.UserDto
            {
                Email = "dsjf@email.com",
                Pass = "dfjisdf",
            };

            var result = service.Login(userDto);

            Assert.AreEqual(result.Item2, "Invalid credentials");
        }

        [TestMethod]
        public void Test_Services_Auth_GetRegistredCustomers()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);

            IConfiguration config = new ConfigurationBuilder().Build();

            var service = new Services.AuthService(repo, new PasswordUtils(), config);

            int res = service.Register(new Models.RegisteredUser
            {
                Uname = "Test User",
                Email = "test1@email.com",
                Pass = "test12"
            });

            var result = service.GetRegisteredCustomers();

            Assert.IsNotNull (result);
        }
    }
}
