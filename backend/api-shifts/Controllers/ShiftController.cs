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
    
    [HttpGet("ByTypeShift/{typeShift:int}")]
    public async Task<IActionResult> GetByTypeShift([FromRoute] int typeShift)
    {
        var shifts = await _shiftService.GetByIdTypeShift(typeShift);

        return Ok(shifts);
    }
    
    [HttpGet("ByTypeShiftPending/{typeShift:int}")]
    public async Task<IActionResult> GetByTypeShiftPending([FromRoute] int typeShift)
    {
        var shifts = await _shiftService.GetByIdTypeShiftPending(typeShift);

        return Ok(shifts);
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateShiftRequestDto shiftDto)
    {
        try
        {
            var createdShift = await _shiftService.Create(shiftDto);
            if (createdShift == null) return BadRequest("Shift not created");

            return CreatedAtAction(nameof(GetById), new { id = createdShift.Id }, createdShift);
        }
        catch (Exception ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpPost("NextShift")]
    public async Task<IActionResult> NextShift([FromBody] NextShiftRequestDto shiftDto)
    {
        var nextShift = await _shiftService.NextShiftByIdTypeShift(shiftDto);
        if (nextShift == null) return NotFound("Shift not found");

        return Ok(nextShift);
    }
    
    [HttpPost("TakeShift")]
    public async Task<IActionResult> TakeShift([FromBody] TakeShiftRequestDto shiftDto)
    {
        var takenShift = await _shiftService.TakeShift(shiftDto);
        if (takenShift == null) return NotFound("Shift not found");

        return Ok(takenShift);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Cancel([FromRoute] int id)
    {
        var deleted = await _shiftService.CancelShift(id);
        if (!deleted) return NotFound("Shift not found");

        return NoContent();
    }
}

