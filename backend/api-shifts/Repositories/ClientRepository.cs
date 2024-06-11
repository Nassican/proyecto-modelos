using api_shifts.Data;
using api_shifts.Interfaces.IRepositories;
using api_shifts.Models;
using Microsoft.EntityFrameworkCore;

namespace api_shifts.Repositories;

public class ClientRepository : IClientRepository
{
    private readonly ShiftsDbContext _context;
    
    public ClientRepository(ShiftsDbContext context)
    {
        _context = context;
    }
    
    public async Task<IEnumerable<ClientModel>> GetAllAsync()
    {
        return await _context.Clients.ToListAsync();
    }

    public async Task<ClientModel?> GetByIdAsync(int id)
    {
        return await _context.Clients.FindAsync(id);
    }

    public async Task<ClientModel?> GetByStudentCodeAsync(string studentCode)
    {
        return await _context.Clients
            .Where(x => x.StudentCode == studentCode)
            .FirstOrDefaultAsync();
    }

    public async Task<ClientModel> CreateAsync(ClientModel client)
    {
        await _context.Clients.AddAsync(client);
        await _context.SaveChangesAsync();

        return client;
    }

    public async Task<ClientModel?> UpdateAsync(int id, ClientModel client)
    {
        var existingClient = await _context.Clients
            .FirstOrDefaultAsync(x => x.Id == id);
        if (existingClient == null) return null;

        existingClient.Email = client.Email;
        
        await _context.SaveChangesAsync();
        
        return existingClient;
    }
}