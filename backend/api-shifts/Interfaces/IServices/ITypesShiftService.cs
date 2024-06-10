using api_shifts.Dtos.TypesShift;

namespace api_shifts.Interfaces.IServices;

public interface ITypesShiftService
{
    Task<IEnumerable<TypesShiftDto?>> GetAllAsync();
    Task<TypesShiftDto?> GetByIdAsync(int id);
    Task<TypesShiftDto?> CreateAsync(CreateTypesShiftRequestDto typesShiftDto);
    Task<TypesShiftDto?> UpdateAsync(int id, UpdateTypesShiftRequestDto typesShiftDto);
    Task<bool> DeleteAsync(int id);
}