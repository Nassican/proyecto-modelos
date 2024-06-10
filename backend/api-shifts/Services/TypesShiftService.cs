using api_shifts.Dtos.TypesShift;
using api_shifts.Interfaces.IServices;

namespace api_shifts.Services;

public class TypesShiftService : ITypesShiftService
{
    public Task<IEnumerable<TypesShiftDto?>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<TypesShiftDto?> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<TypesShiftDto?> CreateAsync(CreateTypesShiftRequestDto typesShiftDto)
    {
        throw new NotImplementedException();
    }

    public Task<TypesShiftDto?> UpdateAsync(int id, UpdateTypesShiftRequestDto typesShiftDto)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}