using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Account
{
    public int Aid { get; set; }

    public int? Userid { get; set; }

    public string? HomeBranch { get; set; }

    public double? Balance { get; set; }

    public string? AccType { get; set; }

    public virtual ICollection<Txn> Txns { get; set; } = new List<Txn>();

    public virtual RegisteredUser? User { get; set; }
}
