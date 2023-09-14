using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Txn
{
    public int Tid { get; set; }

    public int? Aid { get; set; }

    public double? Amount { get; set; }

    public DateTime? TxnTime { get; set; }

    public string? Loc { get; set; }

    public string? TxnType { get; set; }

    public bool? IsDebit { get; set; }

    public virtual Account? AidNavigation { get; set; }
}
