﻿using System;
using System.Collections.Generic;

namespace api_shifts.Models;

public partial class ShiftModel
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

    public bool IsActive { get; set; }

    public virtual ClientModel IdClientModelNavigation { get; set; } = null!;

    public virtual TypesShiftModel IdTypeShiftModelNavigation { get; set; } = null!;

    public virtual UserModel? IdUserModelNavigation { get; set; }
}
