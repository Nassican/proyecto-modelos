namespace api_shifts.Dtos.User;

public class CreateUserRequestDto
{
    public string Username { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }

    public int IdTypeShift { get; set; }
}