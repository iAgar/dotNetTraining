using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class TxnDto
{

    public int Aid { get; set; }

    public double Amount { get; set; }

    public string? Loc { get; set; }

    public string? TxnType { get; set; }

    public bool IsDebit { get; set; }

    public string? Remarks { get; set; }

    public string? Pin { get; set; }

    public int? Rec_aid { get; set; }
}
