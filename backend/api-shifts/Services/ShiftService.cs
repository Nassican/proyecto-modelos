using api_shifts.Dtos.Shift;
using api_shifts.Interfaces.IRepositories;
using api_shifts.Interfaces.IServices;
using api_shifts.Mappers;

namespace api_shifts.Services;

public class ShiftService : IShiftService
{
    private readonly IShiftRepository _shiftRepo;

    public ShiftService(IShiftRepository shiftRepo)
    {
        _shiftRepo = shiftRepo;
    }

    public async Task<IEnumerable<ShiftDto?>> GetAll()
    {
        var shifts = await _shiftRepo.GetAllAsync();
        return shifts.Select(x => x.ToShiftDto());
    }

    public async Task<ShiftDto?> GetById(int id)
    {
        var shift = await _shiftRepo.GetByIdAsync(id);
        return shift?.ToShiftDto();
    }

    public async Task<IEnumerable<ShiftDto?>> GetByIdTypeShift(int idTypeShift)
    {
        var shifts = await _shiftRepo.GetByIdTypeShiftAsync(idTypeShift);
        return shifts.Select(x => x.ToShiftDto());
    }

    public async Task<ShiftDto?> NextShiftByIdTypeShift(NextShiftRequestDto shiftDto)
    {
        var shiftModel = await _shiftRepo.NextShiftByIdTypeShiftAsync(shiftDto.IdTypeShift);
        if (shiftModel == null) return null;
        
        shiftModel.IdUser = shiftDto.IdUser;
        shiftModel.IsStandby = false;
        shiftModel.DateAttended = DateTime.Now;
        var updateShiftModel = await _shiftRepo.UpdateAsync(shiftModel.Id, shiftModel);
        return updateShiftModel?.ToShiftDto();
    }

    public async Task<ShiftDto?> Create(CreateShiftRequestDto shiftDto)
    {
        var hasStandbyShift = await _shiftRepo.HasShiftByIdClientOnStandby(shiftDto.IdClient);
        if (hasStandbyShift)
        {
            throw new Exception("The client already has a shift on standby");
        }
        
        var shiftModel = shiftDto.ToShiftFromCreate();
        var createdShiftModel = await _shiftRepo.CreateAsync(shiftModel);

        return createdShiftModel?.ToShiftDto();
    }

    public async Task<ShiftDto?> TakeShift(TakeShiftRequestDto shiftDto)
    {
        var shiftModel = await _shiftRepo.GetByIdAsync(shiftDto.Id);
        if (shiftModel == null) return null;
        
        shiftModel.IsAttended = shiftDto.IsAttended;
        var updateShiftModel = await _shiftRepo.UpdateAsync(shiftDto.Id, shiftModel);
        return updateShiftModel?.ToShiftDto();
    }

    public async Task<bool> CancelShift(int id)
    {
        var shift = await _shiftRepo.DeleteAsync(id);
        return shift != null;
    }
}