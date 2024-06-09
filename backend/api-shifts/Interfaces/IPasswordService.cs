namespace api_shifts.Interfaces;

public interface IPasswordService
{
    string HashPassword(string password);
    bool Verify(string passwordHash, string inputPassword);
}