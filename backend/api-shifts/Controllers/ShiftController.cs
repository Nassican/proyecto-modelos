using api_shifts.Interfaces;
using api_shifts.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api_shifts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShiftController : ControllerBase
{
    private readonly IShiftRepository _shiftRepo;

    public ShiftController(IShiftRepository shiftRepo)
    {
        _shiftRepo = shiftRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var shifts = await _shiftRepo.GetAllAsync();

        var shiftsDto = shifts.Select(x => x.ToShiftDto());

        return Ok(shiftsDto);
    }
}

