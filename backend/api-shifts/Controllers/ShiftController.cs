using Microsoft.AspNetCore.Mvc;

namespace api_shifts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShiftController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok("Hello from Shifts API");
    }
}

