using api_shifts.Interfaces;
using api_shifts.Interfaces.IRepositories;
using api_shifts.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api_shifts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientController : ControllerBase
{
    private readonly IClientRepository _clientRepo;
    
    public ClientController(IClientRepository clientRepo)
    {
        _clientRepo = clientRepo;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var clients = await _clientRepo.GetAllAsync();

        var clientsDto = clients.Select(x => x.ToClientDto());

        return Ok(clientsDto);
    }
}