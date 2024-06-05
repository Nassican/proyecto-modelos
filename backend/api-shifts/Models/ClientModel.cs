using System;
using System.Collections.Generic;

namespace api_shifts.Models;

public partial class ClientModel
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string StudentCode { get; set; } = null!;

    public virtual ICollection<ShiftModel> Shifts { get; set; } = new List<ShiftModel>();
}
