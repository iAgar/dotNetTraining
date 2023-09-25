namespace backend.Tests
{
    [TestClass]
    public class UserRepoTest
    {
        private DbContextOptions<Models.AtmBankingContext>? _options;

        [TestInitialize]
        public void SetUp()
        {
            _options = new DbContextOptionsBuilder<Models.AtmBankingContext>()
                .UseInMemoryDatabase(databaseName: "testdb").Options;
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

        [TestMethod]
        public void Test_Repo_User_UpdateRegisteredUser_Pass()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);

            var user = new Models.RegisteredUser
            {
                Userid = 367749,
                Uname = "Test User",
                Email = "test1@email.com",
                Pass = "test12"
            };

            int res = repo.AddRegisteredUser(user);

            user.Uname = "New username";

            var res1 = repo.UpdateRegisteredUser(user);

            Assert.IsNotNull(res1);
            Assert.AreEqual(res1.Uname, "New username");
        }

        [TestMethod]
        public void Test_Repo_User_UpdateRegisteredUser_Fail()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);

            var user = new Models.RegisteredUser
            {
                Userid = 15,
                Uname = "Test User",
                Email = "test1@email.com",
                Pass = "test12"
            };

            int res = repo.AddRegisteredUser(user);

            user.Userid = 16;

            var res1 = repo.UpdateRegisteredUser(user);

            Assert.IsNull(res1);
        }

        [TestMethod]
        public void Test_Repo_User_DeleteRegisteredUser_Pass()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);

            var user = new Models.RegisteredUser
            {
                Userid = 1,
                Uname = "Test User",
                Email = "test1@email.com",
                Pass = "test12"
            };

            int res = repo.AddRegisteredUser(user);

            repo.DeleteRegisteredUser(user.Userid);

            var result = _context.RegisteredUsers.Find(1);

            Assert.IsNull(result);

        }

        [TestMethod]
        public void Test_Repo_User_DeleteRegisteredUser_Fail()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);

            var user = new Models.RegisteredUser
            {
                Userid = 1,
                Uname = "Test User",
                Email = "test1@email.com",
                Pass = "test12"
            };

            int res = repo.AddRegisteredUser(user);

            repo.DeleteRegisteredUser(100);

            var result = _context.RegisteredUsers.Find(1);

            Assert.IsNotNull(result);

        }

        [TestMethod]
        public void Test_Repo_User_GetAllUser()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            int res = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Uname = "Test User",
                Email = "test1@email.com",
                Pass = "test12"
            });

            int res1 = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Uname = "Test User 1",
                Email = "test2@email.com",
                Pass = "test123"
            });

            var result = repo.GetAllUser();
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Test_Repo_User_GetAllCustomers()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            int res = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Uname = "Test User",
                Email = "test1@email.com",
                Pass = "test12"
            });

            int res1 = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Uname = "Test User 1",
                Email = "test2@email.com",
                Pass = "test123"
            });

            var result = repo.GetAllCustomers();
            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void Test_Repo_User_GetRegisteredUserById_Pass()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            int res = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Userid = 2,
                Uname = "Test User",
                Email = "test1@email.com",
                Pass = "test12"
            });

            int res1 = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Userid = 3,
                Uname = "Test User 1",
                Email = "test2@email.com",
                Pass = "test123"
            });

            var result = repo.GetRegisteredUserById(2);
            Assert.IsNotNull(result);
            Assert.AreEqual(result.Userid, 2);
        }

        [TestMethod]
        public void Test_Repo_User_GetRegisteredUserById_Fail()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            int res = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Userid = 29870,
                Uname = "Test User",
                Email = "test1@email.com",
                Pass = "test12"
            });

            int res1 = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Userid = 376780,
                Uname = "Test User 1",
                Email = "test2@email.com",
                Pass = "test123"
            });

            var result = repo.GetRegisteredUserById(58459);
            Assert.IsNull(result);
        }



        [TestMethod]
        public void Test_Repo_User_GetRegisteredUserByEmail_Pass()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            int res = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Userid = 10,
                Uname = "Test User",
                Email = "test1@email.com",
                Pass = "test12"
            });

            int res1 = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Userid = 11,
                Uname = "Test User 1",
                Email = "test2@email.com",
                Pass = "test123"
            });

            var result = repo.GetRegisteredUserByEmail("test1@email.com");
            Assert.IsNotNull(result);
            Assert.AreEqual(result.Email, "test1@email.com");
        }


        [TestMethod]
        public void Test_Repo_User_GetRegisteredUserByEmail_Fail()
        {
            using var _context = new Models.AtmBankingContext(_options);
            var repo = new Repository.UserRepository(_context);
            int res = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Userid = 137820,
                Uname = "Test User",
                Email = "test1@email.com",
                Pass = "test12"
            });

            int res1 = repo.AddRegisteredUser(new Models.RegisteredUser
            {
                Userid = 123981,
                Uname = "Test User 1",
                Email = "test2@email.com",
                Pass = "test123"
            });

            var result = repo.GetRegisteredUserByEmail("hsaduye@email.com");
            Assert.IsNull(result);
        }
    }
}