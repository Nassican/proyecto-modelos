using Microsoft.AspNetCore.SignalR;

namespace api_shifts.Hubs;

public class UserConnection
{
    public string Username { get; set; } = string.Empty;
    public string Group { get; set; } = string.Empty;
}

public class NotificationHub : Hub
{
    public async Task Join(UserConnection user)
    {
        await Clients.All
            .SendAsync("ReceiveMessage", "admin", $"{user.Username} joined");
    }

    public async Task JoinGroup(UserConnection user)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, user.Group);
        await Clients.Group(user.Group)
            .SendAsync("JoinGroup", "admin", $"{user.Username} joined group {user.Group}");
    }
}