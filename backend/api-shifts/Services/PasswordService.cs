using api_shifts.Interfaces.IServices;

namespace api_shifts.Services;

public class PasswordService : IPasswordService
{
    public string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool VerifyPassword(string inputPassword, string passwordHash)
    {
        return BCrypt.Net.BCrypt.Verify(inputPassword, passwordHash);
    }
}