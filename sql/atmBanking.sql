/*create database atmBanking;*/

use atmBanking;

create table RegisteredUser
(
userid int primary key identity(5000,1),
uname varchar(20),
dob date default getdate(),
email varchar(20),
proof varchar(12),
isAdmin bit,
pass varchar(128)
);

create table account(
	aid int primary key identity(1000,1),
	userid int references RegisteredUser(userid),
	homeBranch varchar(50),
	balance float,
	accType varchar(3)
);

create table txn(
	tid int primary key identity(100,1),
	aid int references account(aid),
	amount float,
	txnTime date default getdate(),
	loc varchar(6),
	txnType varchar(3)
);


/*insert into RegisteredUser(uname, email, proof) values('Ram', 'ram@abc.com', '123456');
insert into account(homeBranch, balance, accType) values('Hyderabad', 10000, 'SAV');
insert into txn(amount, loc, txnType) values(200, 'ABCXYZ', 'DEB')*/
