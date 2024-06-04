using System;
using System.Collections.Generic;

namespace api_shifts.Models;

public partial class Shift
{
    public int Id { get; set; }

    public string NumShift { get; set; } = null!;

    public DateTime? DateAttended { get; set; }

    public bool? IsAttended { get; set; }

    public int IdTypeShift { get; set; }

    public int IdClient { get; set; }

    public int IdUser { get; set; }

    public DateTime AtCreated { get; set; }

    public bool IsActive { get; set; }

    public virtual ClientModel IdClientNavigation { get; set; } = null!;

    public virtual TypesShift IdTypeShiftNavigation { get; set; } = null!;

    public virtual User IdUserNavigation { get; set; } = null!;
}
