using api_shifts.Dtos.Shift;
using api_shifts.Hubs;
using api_shifts.Interfaces.IServices;
using Microsoft.AspNetCore.SignalR;

namespace api_shifts.Services;

public class NotificationService : INotificationService
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public NotificationService(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task NotifyNextShiftAsync(ShiftDto shift)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveNextShift", shift);
    }
}