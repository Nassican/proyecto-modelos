using api_shifts.Dtos.User;

namespace api_shifts.Interfaces.IServices;

public interface ITokenService
{
    string CreateToken(UserDto userDto);
}