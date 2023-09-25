using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public partial class Account
{
    public int Aid { get; set; }

    [Required]
    public int? Userid { get; set; }

    public string? HomeBranch { get; set; }

    public double? Balance { get; set; }

    public string? AccType { get; set; }

    public bool? IsDeleted { get; set; }

    [Required]
    public string? Pin { get; set; }

    [Required]
    public string? Currency { get; set; }

    public virtual ICollection<Txn> Txns { get; set; } = new List<Txn>();

    public virtual RegisteredUser? User { get; set; }
}
