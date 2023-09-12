using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class RegisteredUser
{
    public int Userid { get; set; }

    public string? Uname { get; set; }

    public DateTime? Dob { get; set; }

    public string? Email { get; set; }

    public string? Proof { get; set; }

    public bool? IsAdmin { get; set; }

    public string? Pass { get; set; }

    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
}
