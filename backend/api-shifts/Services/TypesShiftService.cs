using api_shifts.Dtos.TypesShift;
using api_shifts.Interfaces.IRepositories;
using api_shifts.Interfaces.IServices;
using api_shifts.Mappers;

namespace api_shifts.Services;

public class TypesShiftService : ITypesShiftService
{
    private readonly ITypesShiftRepository _typesShiftRepo;

    public TypesShiftService(ITypesShiftRepository typesShiftRepo)
    {
        _typesShiftRepo = typesShiftRepo;
    }
    
    public async Task<IEnumerable<TypesShiftDto?>> GetAllAsync()
    {
        var typesShiftModel = await _typesShiftRepo.GetAllAsync();
        return typesShiftModel.Select(x => x.ToTypesShiftDto());
    }

    public async Task<TypesShiftDto?> GetByIdAsync(int id)
    {
        var typesShiftModel = await _typesShiftRepo.GetByIdAsync(id);
        return typesShiftModel?.ToTypesShiftDto();
    }

    public async Task<TypesShiftDto?> CreateAsync(CreateTypesShiftRequestDto typesShiftDto)
    {
        var typesShiftModel = typesShiftDto.ToTypesShiftFromCreate();
        var createShiftModel = await _typesShiftRepo.CreateAsync(typesShiftModel);
        return createShiftModel.ToTypesShiftDto();        
    }

    public async Task<TypesShiftDto?> UpdateAsync(int id, UpdateTypesShiftRequestDto typesShiftDto)
    {
        var typesShiftModel = await _typesShiftRepo.UpdateAsync(id, typesShiftDto.ToTypesShiftFromUpdate());
        return typesShiftModel?.ToTypesShiftDto();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var typesShiftModel = await _typesShiftRepo.DeleteAsync(id);
        return typesShiftModel != null;
    }
}