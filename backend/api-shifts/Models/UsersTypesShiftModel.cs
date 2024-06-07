using System;
using System.Collections.Generic;

namespace api_shifts.Models;

public partial class UsersTypesShiftModel
{
    public int Id { get; set; }

    public int IdUser { get; set; }

    public int IdTypeShift { get; set; }

    public virtual TypesShiftModel IdTypeShiftModelNavigation { get; set; } = null!;

    public virtual UserModel IdUserModelNavigation { get; set; } = null!;
}
