using api_shifts.Dtos.User;

namespace api_shifts.Interfaces.IServices;

public interface IUserService
{
    Task<IEnumerable<UserDto?>> GetAllAsync();
    Task<UserDto?> GetByIdAsync(int id);
    Task<UserDto?> CreateAsync(CreateUserRequestDto userDto);
    Task<UserDto?> UpdateAsync(int id, UpdateUserRequestDto userDto);
    Task<bool> DeleteAsync(int id);
}