using api_shifts.Models;

namespace api_shifts.Interfaces;

public interface ITypesShiftRepository
{
    Task<List<TypesShiftModel>> GetAllAsync();
    Task<TypesShiftModel?> GetByIdAsync(int id);
    Task<TypesShiftModel> CreateAsync(TypesShiftModel typesShift);
}