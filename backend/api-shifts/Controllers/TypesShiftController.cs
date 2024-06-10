using api_shifts.Dtos.TypesShift;
using api_shifts.Interfaces.IServices;
using api_shifts.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api_shifts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TypesShiftController : ControllerBase
{
    private readonly ITypesShiftService _typesShiftService;

    public TypesShiftController(ITypesShiftService typesShiftService)
    {
        _typesShiftService = typesShiftService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var typesShiftsDto = await _typesShiftService.GetAllAsync();
        return Ok(typesShiftsDto);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var typesShiftDto = await _typesShiftService.GetByIdAsync(id);
        if (typesShiftDto == null) return NotFound("TypesShift not found");

        return Ok(typesShiftDto);
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTypesShiftRequestDto typesShiftDto)
    {
        var createdTypesShiftDto = await _typesShiftService.CreateAsync(typesShiftDto);
        if (createdTypesShiftDto == null) return BadRequest("TypesShift not created");
        
        return CreatedAtAction(nameof(GetById), new { id = createdTypesShiftDto.Id }, createdTypesShiftDto);
    }
    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTypesShiftRequestDto typesShiftDto)
    {
        var updatedTypesShiftDto = await _typesShiftService.UpdateAsync(id, typesShiftDto);
        if (updatedTypesShiftDto == null) return NotFound("TypesShift not found");

        return Ok(updatedTypesShiftDto);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var deleted = await _typesShiftService.DeleteAsync(id);
        if (!deleted) return NotFound("TypesShift not found");

        return NoContent();
    }
}