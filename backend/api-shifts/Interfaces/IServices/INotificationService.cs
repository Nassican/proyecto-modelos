using api_shifts.Dtos.Shift;

namespace api_shifts.Interfaces.IServices;

public interface INotificationService
{
    Task NotifyNextShiftAsync(ShiftDto shift);
}