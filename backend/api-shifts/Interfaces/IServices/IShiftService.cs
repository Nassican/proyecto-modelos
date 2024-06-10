using api_shifts.Dtos.Shift;

namespace api_shifts.Interfaces.IServices;

public interface IShiftService
{
    Task<IEnumerable<ShiftDto?>> GetAll();
    Task<ShiftDto?> GetById(int id);
    Task<IEnumerable<ShiftDto?>> GetByIdTypeShift(int idTypeShift);
    Task<ShiftDto?> NextShiftByIdTypeShift(NextShiftRequestDto shiftDto);
    Task<ShiftDto?> Create(CreateShiftRequestDto shiftDto);
    Task<ShiftDto?> TakeShift(TakeShiftRequestDto shiftDto);
    Task<bool> CancelShift(int id);
}