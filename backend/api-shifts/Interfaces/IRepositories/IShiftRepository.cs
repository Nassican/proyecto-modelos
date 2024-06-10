using api_shifts.Models;

namespace api_shifts.Interfaces.IRepositories;

public interface IShiftRepository
{
    Task<List<ShiftModel>> GetAllAsync();
    Task<ShiftModel?> GetByIdAsync(int id);
    Task<ShiftModel> CreateAsync(ShiftModel shift);
    Task<ShiftModel?> UpdateAsync(int id, ShiftModel shift);
    Task<ShiftModel?> DeleteAsync(int id);
    Task<bool> ShiftExist(int id);
}
