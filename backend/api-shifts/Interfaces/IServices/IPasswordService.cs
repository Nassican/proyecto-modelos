namespace api_shifts.Interfaces.IServices;

public interface IPasswordService
{
    string HashPassword(string password);
    bool Verify(string passwordHash, string inputPassword);
}