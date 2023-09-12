using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public partial class RegisteredUser
{
    [Required]
    public int Userid { get; set; }

    public string? Uname { get; set; }

    public DateTime? Dob { get; set; }

    [EmailAddress]
    [Required]
    public string? Email { get; set; }

    public string? Proof { get; set; }

    public bool? IsAdmin { get; set; }


    public string? Pass { get; set; }

    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
}
