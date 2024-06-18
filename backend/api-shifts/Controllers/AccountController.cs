using api_shifts.Dtos.User;
using api_shifts.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;

namespace api_shifts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IUserService _userService;

    public AccountController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserRequestDto userDto)
    {
        try
        {
            var user = await _userService.LoginAsync(userDto);
            if (user == null) return Unauthorized("Invalid credentials");
        
            return Ok(user);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] CreateUserRequestDto userDto)
    {
        try
        {
            var createdUserDto = await _userService.CreateAsync(userDto);
            if (createdUserDto == null) return BadRequest("User not created");
        
            return Ok("User created");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}