using System;
using System.Collections.Generic;

namespace api_shifts.Models;

public partial class TypesShiftModel
{
    public int Id { get; set; }

    public string Color { get; set; } = null!;

    public string Icon { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Code { get; set; } = null!;

    public bool IsActive { get; set; }

    public virtual ICollection<ShiftModel> Shifts { get; set; } = new List<ShiftModel>();

    public virtual ICollection<UsersTypesShiftModel> UsersTypesShifts { get; set; } = new List<UsersTypesShiftModel>();
}
