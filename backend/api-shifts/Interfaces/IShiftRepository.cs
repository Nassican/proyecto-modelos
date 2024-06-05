using api_shifts.Models;

namespace api_shifts.Interfaces;

public interface IShiftRepository
{
    Task<List<ShiftModel>> GetAllAsync();
}
