using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public partial class UserDto
{

    [EmailAddress]
    [Required]
    public string? Email { get; set; }

    [Required]
    public string? Pass { get; set; }

}
