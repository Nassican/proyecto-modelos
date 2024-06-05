using api_shifts.Data;
using api_shifts.Interfaces;
using api_shifts.Models;
using Microsoft.EntityFrameworkCore;

namespace api_shifts.Repositories;

public class ClientRepository : IClientRepository
{
    private readonly ShiftsdbContext _context;
    
    public ClientRepository(ShiftsdbContext context)
    {
        _context = context;
    }
    
    public async Task<List<ClientModel>> GetAllAsync()
    {
        return await _context.Clients.ToListAsync();
    }
}