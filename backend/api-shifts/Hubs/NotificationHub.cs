using Microsoft.AspNetCore.SignalR;

namespace api_shifts.Hubs;

public class UserConnection
{
    public string UserId { get; set; } = string.Empty;
    public string ConnectionId { get; set; } = string.Empty;
    public string GroupName { get; set; } = string.Empty;
}

public class NotificationHub : Hub
{
    public async Task Join(UserConnection user)
    {
        await Clients.All
            .SendAsync("ReceiveMessage", "admin", $"{user.UserId} joined");
    }

    public async Task JoinGroup(UserConnection user)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, user.GroupName);
        await Clients.Group(user.GroupName)
            .SendAsync("ReceiveMessage", "admin", $"{user.UserId} joined group {user.GroupName}");
    }
}