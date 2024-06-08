using System.ComponentModel.DataAnnotations;

namespace api_shifts.Dtos.User;

public class CreateUserRequestDto
{
    [Required]
    [MaxLength(20, ErrorMessage = "Username is too long")]
    public string Username { get; set; }

    [Required]
    [MinLength(6, ErrorMessage = "Password is too short")]
    public string Password { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }
}