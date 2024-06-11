using api_shifts.Interfaces;
using api_shifts.Interfaces.IRepositories;
using api_shifts.Interfaces.IServices;
using api_shifts.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api_shifts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientController : ControllerBase
{
    private readonly IClientService _clientService;
    
    public ClientController(IClientService clientService)
    {
        _clientService = clientService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var clients = await _clientService.GetAll();
        return Ok(clients);
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var client = await _clientService.GetById(id);
        if (client == null) return NotFound("Client not found");

        return Ok(client);
    }
    
    [HttpGet("GetByStudentCode/{code}")]
    public async Task<IActionResult> GetByStudentCode([FromRoute] string code)
    {
        var client = await _clientService.GetByStudentCode(code);
        if (client == null) return NotFound("Client not found");

        return Ok(client);
    }
}