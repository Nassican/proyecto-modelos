using api_shifts.Dtos.User;
using api_shifts.Interfaces;
using api_shifts.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api_shifts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepo;

    public UserController(IUserRepository userRepo)
    {
        _userRepo = userRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _userRepo.GetAllAsync();
        var usersDto = users.Select(x => x.ToUserDto());

        return Ok(usersDto);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var user = await _userRepo.GetByIdAsync(id);
        if (user == null) return NotFound("User not found");

        return Ok(user.ToUserDto());
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserRequestDto userDto)
    {
        var user = userDto.ToUserFromCreate();
        var createdUser = await _userRepo.CreateAsync(user);

        return CreatedAtAction(nameof(GetById), new { id = createdUser.Id }, createdUser.ToUserDto());
    }
    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateUserRequestDto userDto)
    {
        var user = await _userRepo.UpdateAsync(id, userDto.ToUserFromUpdate());
        if (user == null) return NotFound("User not found");

        return Ok(user.ToUserDto());
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var user = await _userRepo.DeleteAsync(id);
        if (user == null) return NotFound("User not found");

        return NoContent();
    }
}