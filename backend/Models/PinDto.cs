namespace backend.Models;

public partial class PinDto
{

    public int Aid { get; set; }
    public string Pin { get; set; } = default!;
    public string? NewPin { get; set; }
}
