using api_shifts.Models;

namespace api_shifts.Dtos.Shift;

public class ShiftDto
{
    public int Id { get; set; }

    public string? NumShift { get; set; }

    public DateTime? DateAttended { get; set; }

    public bool? IsAttended { get; set; }

    public bool IsStandby { get; set; }

    public int IdTypeShift { get; set; }

    public int IdClient { get; set; }

    public int? IdUser { get; set; }

    public DateTime AtCreated { get; set; }
}
