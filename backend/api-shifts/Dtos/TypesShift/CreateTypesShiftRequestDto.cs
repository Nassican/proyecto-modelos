using System.ComponentModel.DataAnnotations;

namespace api_shifts.Dtos.TypesShift;

public class CreateTypesShiftRequestDto
{
    [Required]
    [Length(6, 6, ErrorMessage = "Color is hex code with 6 characters")]
    public string Color { get; set; }

    [Required]
    public string Icon { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    [Length(2, 2, ErrorMessage = "Code is 2 characters long")]
    public string Code { get; set; }
}