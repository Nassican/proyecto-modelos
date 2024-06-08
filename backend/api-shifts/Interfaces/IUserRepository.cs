using api_shifts.Models;

namespace api_shifts.Interfaces;

public interface IUserRepository
{
    Task<List<UserModel>> GetAllAsync();
    Task<UserModel?> GetByIdAsync(int id);
    Task<UserModel> CreateAsync(UserModel user);
    Task<UserModel?> UpdateAsync(UserModel user);
    Task<UserModel?> DeleteAsync(int id);
}