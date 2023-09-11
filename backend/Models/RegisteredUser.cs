using System;
using System.Collections.Generic;

namespace atmBanking.Models;

public partial class RegisteredUser
{
    public int Userid { get; set; }

    public string? Uname { get; set; }

    public DateTime? Dob { get; set; }

    public string? Email { get; set; }

    public string? Proof { get; set; }

    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
}
