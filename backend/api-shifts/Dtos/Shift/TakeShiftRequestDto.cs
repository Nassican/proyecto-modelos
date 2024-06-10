using System.ComponentModel.DataAnnotations;

namespace api_shifts.Dtos.Shift;

public class TakeShiftRequestDto
{
    [Required]
    public int Id { get; set; }
    
    [Required]
    public bool? IsAttended { get; set; }
}