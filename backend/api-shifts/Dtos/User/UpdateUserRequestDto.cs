using System.ComponentModel.DataAnnotations;

namespace api_shifts.Dtos.User;

public class UpdateUserRequestDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
}