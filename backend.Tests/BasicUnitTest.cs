namespace backend.Tests
{
    [TestClass]
    public class BasicUnitTest
    {
        private DbContextOptions<Models.AtmBankingContext>? _options;

        [TestInitialize]
        public void SetUp()
        {
            _options = new DbContextOptionsBuilder<Models.AtmBankingContext>()
                .UseInMemoryDatabase(databaseName: "testdb").Options;
        }

        [TestMethod]
        public void TestMethod1()
        {
            Assert.AreEqual(1, 1);
            Assert.AreNotEqual(1, 0);
        }

        [TestMethod]
        public void Test_Model_Account()
        {
            using var _context = new Models.AtmBankingContext(_options);
            _context.Accounts.Add(new Models.Account { Userid = 5, Pin = "1234" });
            _context.SaveChanges();
            Assert.IsNotNull(_context.Accounts.FirstOrDefault(e => e.Userid == 5));
        }

        [TestMethod]
        public void Test_Repo_User_AddRegisteredUser_Pass()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            int res = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Uname = "Test User",
                Email = "test1@email.com",
                Pass = "test12"
            });
            Assert.AreNotEqual(res, -1);
            _context.Dispose();
        }

        [TestMethod]
        public void Test_Repo_User_AddRegisteredUser_Fail()
        {
            using var _context = new Models.AtmBankingContext(_options);

            var repo = new Repository.UserRepository(_context);
            int r1 = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Uname = "Test User",
                Email = "test@email.com",
                Pass = "test12"
            });
            int r2 = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Uname = "Test User 2",
                Email = "test@email.com",
                Pass = "test123"
            });
            int r3 = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Uname = "Test User",
                Pass = "test12"
            });
            Assert.AreNotEqual(r1, -1);
            Assert.AreEqual(r2, -1);
            Assert.AreEqual(r3, -1);
            _context.Dispose();
        }
    }
}