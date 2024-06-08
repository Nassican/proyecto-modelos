using api_shifts.Models;

namespace api_shifts.Interfaces;

public interface IUserRepository
{
    Task<List<UserModel>> GetAllAsync();
    Task<UserModel?> GetByIdAsync(int id);
    Task<UserModel?> GetByEmailAsync(string email);
    Task<UserModel?> GetByUsernameAsync(string username);
    Task<UserModel> CreateAsync(UserModel userModel);
    Task<UserModel?> UpdateAsync(int id, UserModel userModel);
    Task<UserModel?> DeleteAsync(int id);
}