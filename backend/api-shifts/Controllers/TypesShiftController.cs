using api_shifts.Dtos.TypesShift;
using api_shifts.Interfaces;
using api_shifts.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api_shifts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TypesShiftController : ControllerBase
{
    private readonly ITypesShiftRepository _typesShiftRepo;

    public TypesShiftController(ITypesShiftRepository typesShiftRepo)
    {
        _typesShiftRepo = typesShiftRepo;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var typesShiftModel = await _typesShiftRepo.GetAllAsync();
        
        var typesShiftDto = typesShiftModel.Select(x => x.ToTypesShiftDto());

        return Ok(typesShiftDto);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var typesShiftModel = await _typesShiftRepo.GetByIdAsync(id);
        if (typesShiftModel == null) return NotFound("TypesShift not found");
        
        return Ok(typesShiftModel.ToTypesShiftDto());
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTypesShiftRequestDto typesShiftDto)
    {
        var typesShiftModel = typesShiftDto.ToTypesShiftFromCreate();
        await _typesShiftRepo.CreateAsync(typesShiftModel);
        
        return CreatedAtAction(nameof(GetById), new { id = typesShiftModel.Id }, typesShiftModel.ToTypesShiftDto());
    }
    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTypesShiftRequestDto typesShiftDto)
    {
        var typesShiftModel = await _typesShiftRepo.UpdateAsync(id, typesShiftDto.ToTypesShiftFromUpdate());
        if (typesShiftModel == null) return NotFound("TypesShift not found");
        
        return Ok(typesShiftModel.ToTypesShiftDto());
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var typesShiftModel = await _typesShiftRepo.DeleteAsync(id);
        if (typesShiftModel == null) return NotFound("TypesShift not found");

        return NoContent();
    }
}