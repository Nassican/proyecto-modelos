using api_shifts.Dtos.User;
using api_shifts.Interfaces.IServices;
using api_shifts.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api_shifts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var usersDto = await _userService.GetAllAsync();
        return Ok(usersDto);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var userDto = await _userService.GetByIdAsync(id);
        if (userDto == null) return NotFound("User not found");

        return Ok(userDto);
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserRequestDto userDto)
    {
        try
        {
            var createdUserDto = await _userService.CreateAsync(userDto);
            if (createdUserDto == null) return BadRequest("User not created");
        
            return CreatedAtAction(nameof(GetById), new { id = createdUserDto.Id }, createdUserDto);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateUserRequestDto userDto)
    {
        var updatedUserDto = await _userService.UpdateAsync(id, userDto);
        if (updatedUserDto == null) return NotFound("User not found");

        return Ok(updatedUserDto);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var deleted = await _userService.DeleteAsync(id);
        if (!deleted) return NotFound("User not found");

        return NoContent();
    }
}