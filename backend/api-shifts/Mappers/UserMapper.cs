using api_shifts.Dtos.User;
using api_shifts.Models;

namespace api_shifts.Mappers;

public static class UserMapper
{
    public static UserDto ToUserDto(this UserModel userModel)
    {
        return new UserDto
        {
            Id = userModel.Id,
            Username = userModel.Username,
            Password = userModel.Password,
            Email = userModel.Email,
        };
    }
    
    public static UserModel ToUserFromCreate(this CreateUserRequestDto userDto)
    {
        return new UserModel
        {
            Username = userDto.Username,
            Password = userDto.Password,
            Email = userDto.Email,
        };
    }
}