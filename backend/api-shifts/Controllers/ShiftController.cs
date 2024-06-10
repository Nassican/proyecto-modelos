using api_shifts.Interfaces;
using api_shifts.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api_shifts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShiftController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok();
    }
}

