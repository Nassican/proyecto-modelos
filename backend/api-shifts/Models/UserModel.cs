﻿using System;
using System.Collections.Generic;

namespace api_shifts.Models;

public partial class UserModel
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public bool IsActive { get; set; }

    public virtual ICollection<ShiftModel> Shifts { get; set; } = new List<ShiftModel>();

    public virtual ICollection<UsersTypesShiftModel> UsersTypesShifts { get; set; } = new List<UsersTypesShiftModel>();
}
