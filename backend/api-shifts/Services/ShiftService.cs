using api_shifts.Dtos.Shift;
using api_shifts.Interfaces.IRepositories;
using api_shifts.Interfaces.IServices;
using api_shifts.Mappers;

namespace api_shifts.Services;

public class ShiftService : IShiftService
{
    private readonly IClientService _clientService;
    private readonly IShiftRepository _shiftRepo;
    private readonly INotificationService _notificationService;

    public ShiftService(IClientService clientService, IShiftRepository shiftRepo, INotificationService notificationService)
    {
        _clientService = clientService;
        _shiftRepo = shiftRepo;
        _notificationService = notificationService;
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
        
        var shiftDtoResult = updateShiftModel?.ToShiftDto();
        
        // Notify all clients about the next shift
        if (shiftDtoResult != null)
        {
            await _notificationService.NotifyNextShiftAsync(shiftDtoResult);
        }
        
        return shiftDtoResult;
    }

    public async Task<ShiftDto?> Create(CreateShiftRequestDto shiftDto)
    {
        var client = await _clientService.SearchByStudentAndCreate(shiftDto.StudentCode, shiftDto.Email);
        if (client == null) throw new NullReferenceException("Client not found");
        
        var hasStandbyShift = await _shiftRepo.HasShiftByIdClientOnStandby(client.Id);
        if (hasStandbyShift)
        {
            throw new Exception("The client already has a shift on standby");
        }

        var shift = new CreateShiftDto
        {
            IdClient = client.Id,
            IdTypeShift = shiftDto.IdTypeShift
        };
        
        var shiftModel = shift.ToShiftFromCreate();
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