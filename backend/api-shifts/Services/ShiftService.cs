using api_shifts.Dtos.Shift;
using api_shifts.Interfaces.IRepositories;
using api_shifts.Interfaces.IServices;
using api_shifts.Mappers;

namespace api_shifts.Services;

public class ShiftService : IShiftService
{
    private readonly IClientService _clientService;
    private readonly IEmailService _emailService;
    private readonly INotificationService _notificationService;
    private readonly IShiftRepository _shiftRepo;
    private readonly ITypesShiftRepository _typeShiftRepo;

    public ShiftService(IClientService clientService, IShiftRepository shiftRepo, INotificationService notificationService, IEmailService emailService, ITypesShiftRepository typeShiftRepo)
    {
        _clientService = clientService;
        _shiftRepo = shiftRepo;
        _notificationService = notificationService;
        _emailService = emailService;
        _typeShiftRepo = typeShiftRepo;
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
        
        if (shiftDtoResult == null) return null;
        
        // Notify all clients about the next shift
        await _notificationService.NotifyNextShiftAsync(shiftDtoResult);
        var client = await _clientService.GetById(shiftDtoResult.IdClient);
        
        var body = await File.ReadAllTextAsync("../api-shifts/EmailTemplates/nextShift.html");
        
        await _emailService.SendEmailAsync(
            client?.Email ?? "",
            "Next shift",
            body
        );

            

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
        
        var typesShift = await _typeShiftRepo.GetByIdAsync(shiftDto.IdTypeShift);
        
        var body = await File.ReadAllTextAsync("../api-shifts/EmailTemplates/shift.html");
        body = body.Replace("{{NumShift}}", createdShiftModel.NumShift);
        body = body.Replace("{{ClientName}}", client.Name);
        body = body.Replace("{{StudentCode}}", client.StudentCode);
        body = body.Replace("{{Email}}", client.Email);
        body = body.Replace("{{TypeShift}}", typesShift?.Name ?? "Unknown");
        body = body.Replace("{{CreatedAt}}", createdShiftModel.AtCreated.ToString("dd/MM/yyyy HH:mm"));
        
        await _emailService.SendEmailAsync(
            client.Email,
            "Shift created",
            body
        );
        
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