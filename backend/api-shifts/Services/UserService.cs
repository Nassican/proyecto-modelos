using api_shifts.Dtos.User;
using api_shifts.Interfaces.IRepositories;
using api_shifts.Interfaces.IServices;
using api_shifts.Mappers;

namespace api_shifts.Services;

public class UserService : IUserService
{
    private readonly IPasswordService _passwordService;
    private readonly ITokenService _tokenService;
    private readonly IUserRepository _userRepo;
    
    public UserService(IUserRepository userRepo, IPasswordService passwordService, ITokenService tokenService)
    {
        _userRepo = userRepo;
        _passwordService = passwordService;
        _tokenService = tokenService;
    }
    
    public async Task<IEnumerable<UserDto?>> GetAllAsync()
    {
        var users = await _userRepo.GetAllAsync();
        return users.Select(x => x.ToUserDto());
    }

    public async Task<UserDto?> GetByIdAsync(int id)
    {
        var user = await _userRepo.GetByIdAsync(id);
        return user?.ToUserDto();
    }

    public async Task<LoginUserResponseDto?> LoginAsync(LoginUserRequestDto userDto)
    {
        if (userDto.Password != userDto.ConfirmPassword)
            throw new InvalidOperationException("Password and Confirm Password must be different.");
        
        var user = await _userRepo.GetByUsernameAsync(userDto.Username);
        if (user == null) return null;
        
        var result = _passwordService.VerifyPassword(userDto.Password, user.Password);
        if (!result) return null;

        var token = _tokenService.CreateToken(user.ToUserDto());
        
        return new LoginUserResponseDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Token = token
        };
    }

    public async Task<UserDto?> CreateAsync(CreateUserRequestDto userDto)
    {
        var existingUserByEmail = await _userRepo.GetByEmailAsync(userDto.Email);
        if (existingUserByEmail != null)
        {
            throw new InvalidOperationException("A user with the provided email already exists.");
        }
        
        var existingUserByUsername = await _userRepo.GetByUsernameAsync(userDto.Username);
        if (existingUserByUsername != null)
        {
            throw new InvalidOperationException("A user with the provided username already exists.");
        }
        
        userDto.Password = _passwordService.HashPassword(userDto.Password);
        
        var userModel = userDto.ToUserFromCreate();
        var createdUserModel = await _userRepo.CreateAsync(userModel);
        return createdUserModel.ToUserDto();
    }
    
    public async Task<UserDto?> UpdateAsync(int id, UpdateUserRequestDto userDto)
    {
        var user = await _userRepo.UpdateAsync(id, userDto.ToUserFromUpdate());
        return user?.ToUserDto();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var user = await _userRepo.DeleteAsync(id);
        return user != null;
    }
}