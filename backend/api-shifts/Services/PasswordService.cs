using api_shifts.Interfaces.IServices;

namespace api_shifts.Services;

public class PasswordService : IPasswordService
{
    public string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool Verify(string passwordHash, string inputPassword)
    {
        return BCrypt.Net.BCrypt.Verify(inputPassword, passwordHash);
    }
}