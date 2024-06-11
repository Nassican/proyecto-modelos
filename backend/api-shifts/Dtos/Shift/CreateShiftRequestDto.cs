using System.ComponentModel.DataAnnotations;

namespace api_shifts.Dtos.Shift;

public class CreateShiftRequestDto
{
    [Required]
    public int IdTypeShift { get; set; }

    [Required]
    public string StudentCode { get; set; }
    
    [Required]
    [EmailAddress]
    public string Email { get; set; }
}
