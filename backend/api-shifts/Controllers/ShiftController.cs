using api_shifts.Dtos.Shift;
using api_shifts.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;

namespace api_shifts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShiftController : ControllerBase
{
    private readonly IShiftService _shiftService;

    public ShiftController(IShiftService shiftService)
    {
        _shiftService = shiftService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var shifts = await _shiftService.GetAll();
        return Ok(shifts);
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var shift = await _shiftService.GetById(id);
        if (shift == null) return NotFound("Shift not found");

        return Ok(shift);
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateShiftRequestDto shiftDto)
    {
        var createdShift = await _shiftService.Create(shiftDto);
        if (createdShift == null) return BadRequest("Shift not created");
        
        return CreatedAtAction(nameof(GetById), new { id = createdShift.Id }, createdShift);
    }
}

