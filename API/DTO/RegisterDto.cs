using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO;

public class RegisterDto
{
    [Required]
    public string DisplayName { get; set; } = string.Empty;
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    [Required]
    [MinLength(4), MaxLength(16)]
    public string Password { get; set; } = string.Empty;
}
