namespace api_shifts.Dtos.User;

public class LoginUserResponseDto
{
    public int Id { get; set; }

    public string Username { get; set; }

    public string Email { get; set; }
    
    public string Token { get; set; }
}