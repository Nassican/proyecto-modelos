using System.ComponentModel.DataAnnotations;

namespace api_shifts.Dtos.Shift;

public class CreateShiftDto
{
    [Required]
    public int IdTypeShift { get; set; }

    [Required]
    public int IdClient { get; set; }
}