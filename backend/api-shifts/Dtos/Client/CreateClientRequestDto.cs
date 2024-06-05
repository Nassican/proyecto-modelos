using System.ComponentModel.DataAnnotations;

namespace api_shifts.Dtos.Client;

public class CreateClientRequestDto
{
    [Required]
    public string Name { get; set; }
  
    [Required]
    public string StudentCode { get; set; }
}