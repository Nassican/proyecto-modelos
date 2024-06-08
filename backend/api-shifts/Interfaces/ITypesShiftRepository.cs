using api_shifts.Models;

namespace api_shifts.Interfaces;

public interface ITypesShiftRepository
{
    Task<List<TypesShiftModel>> GetAllAsync();
    Task<TypesShiftModel?> GetByIdAsync(int id);
    Task<TypesShiftModel> CreateAsync(TypesShiftModel typesShift);
    Task<TypesShiftModel?> UpdateAsync(int id, TypesShiftModel typesShift);
    Task<TypesShiftModel?> DeleteAsync(int id);
    Task<bool> TypesShiftExist(int id);
    
}