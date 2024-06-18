namespace api_shifts.Interfaces.IServices;

public interface IPasswordService
{
    string HashPassword(string password);
    bool VerifyPassword(string inputPassword, string passwordHash);
}