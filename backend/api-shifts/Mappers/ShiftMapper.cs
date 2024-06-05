using api_shifts.Dtos.Shift;
using api_shifts.Models;

namespace api_shifts.Mappers;

public static class ShiftMapper
{
    public static ShiftDto ToShiftDto(this ShiftModel shiftModel)
    {
        return new ShiftDto
        {
            Id = shiftModel.Id,
            NumShift = shiftModel.NumShift,
            DateAttended = shiftModel.DateAttended,
            IsAttended = shiftModel.IsAttended,
            IdTypeShift = shiftModel.IdTypeShift,
            IdClient = shiftModel.IdClient,
            IdUser = shiftModel.IdUser
        };
    }

    public static ShiftModel ToShiftFromCreate(this CreateShiftRequestDto shiftDto)
    {
        return new ShiftModel
        {
            IdTypeShift = shiftDto.IdTypeShift,
            IdClient = shiftDto.IdClient
        };
    }
}
