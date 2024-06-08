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
        var typesShift = await _typesShiftRepo.GetAllAsync();
        
        var typesShiftDto = typesShift.Select(x => x.ToTypesShiftDto());

        return Ok(typesShiftDto);
    }
}