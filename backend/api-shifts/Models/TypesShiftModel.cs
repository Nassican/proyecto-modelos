using System;
using System.Collections.Generic;

namespace api_shifts.Models;

public partial class TypesShiftModel
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public bool IsActive { get; set; }

    public virtual ICollection<ShiftModel> Shifts { get; set; } = new List<ShiftModel>();

    public virtual ICollection<UserModel> Users { get; set; } = new List<UserModel>();
}
