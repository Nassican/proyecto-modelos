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

    public async Task<IEnumerable<ShiftDto?>> GetByIdTypeShiftPending(int idTypeShift)
    {
        var shifts = await _shiftRepo.GetByIdTypeShiftPendingAsync(idTypeShift);
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

        const string body = """<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport"content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Next Shift</title><style>body {font-family: Arial, sans-serif;background-color: #f0f8ff;color: #333;display: flex;justify-content: center;align-items: center;height: 100vh;margin: 0;}.container {text-align: center;padding: 20px;background-color: #fff;border: 1px solid #ccc;border-radius: 10px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}.title {font-size: 2rem;font-weight: bold;color: #2c3e50;}.message {font-size: 1.25rem;margin-top: 10px;color: #34495e;}</style></head><body><div class="container"><div class="title">Shift Reminder</div><div class="message">It's time for your shift! Please prepare yourself and head to your designated area.</div></div></body></html>""";
        
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
        
        var body = """<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Shift Details</title><style>body {font-family: Arial, sans-serif;background-color: #f9f9f9;color: #333;}.class__relative {position: relative;}.class__absolute {position: absolute;top: 33rem;}.grid {display: grid;gap: 16px;justify-items: center;margin: 20px;}.text-center {text-align: center;}.text-xl {font-size: 1.5rem;}.text-3xl {font-size: 1.875rem;}.font-bold {font-weight: bold;}.tracking-tight {letter-spacing: -0.05em;}.text-gray-900 {color: #1a202c;}.dark .text-gray-50 {color: #f9fafb;}.rounded-lg {border-radius: 0.5rem;}.border {border: 1px solid #e2e8f0;}.bg-card {background-color: #ffffff;}.text-card-foreground {color: #2d3748;}.w-96 {width: 24rem;}.flex {display: flex;}.flex-col {flex-direction: column;}.space-y-1-5 > * + * {margin-top: 6px;}.p-6 {padding: 1.5rem;}.pt-0 {padding-top: 0;}.mb-4 {margin-bottom: 1rem;}.text-sm {font-size: 0.875rem;}.text-gray-500 {color: #a0aec0;}.text-gray-700 {color: #4a5568;}.leading-none {line-height: 1;}.font-semibold {font-weight: 600;}svg {width: 100%;height: auto;}</style></head><body><div class="grid gap-4"><label class="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Your Shift</label><div class="class__relative"><div class="rounded-lg border bg-card text-card-foreground w-96 p-6"><div><h3 class="text-xl font-bold">{{NumShift}}</h3><p class="text-sm text-gray-700">Shift Details</p></div><div class="mb-4"><label class="text-sm leading-none font-semibold" for="clientName">Client Name:</label><p id="clientName" class="text-gray-700">{{ClientName}}</p></div><div class="mb-4"><label class="text-sm leading-none font-semibold" for="studentCode">Student Code:</label><p id="studentCode" class="text-gray-700">{{StudentCode}}</p></div><div class="mb-4"><label class="text-sm leading-none font-semibold" for="email">Email:</label><p id="email" class="text-gray-700">{{Email}}</p></div><div class="mb-4"><label class="text-sm leading-none font-semibold" for="idTypeShift">Type Shift:</label><p id="idTypeShift" class="text-gray-700">{{TypeShift}}</p></div><div><label class="text-sm leading-none font-semibold" for="atCreated">Created At:</label><p id="atCreated" class="text-gray-700">{{CreatedAt}}</p></div></div></div></div></body></html>""";
        
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