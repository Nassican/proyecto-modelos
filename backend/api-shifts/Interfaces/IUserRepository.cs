using api_shifts.Models;

namespace api_shifts.Interfaces;

public interface IUserRepository
{
    Task<List<UserModel>> GetAllAsync();
}