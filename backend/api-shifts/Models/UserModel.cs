using System;
using System.Collections.Generic;

namespace api_shifts.Models;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public int IdTypeShift { get; set; }

    public bool IsActive { get; set; }

    public virtual TypesShiftModel IdTypeShiftNavigation { get; set; } = null!;

    public virtual ICollection<ShiftModel> Shifts { get; set; } = new List<ShiftModel>();
}
