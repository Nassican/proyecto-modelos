using api_shifts.Data;
using api_shifts.Interfaces;
using api_shifts.Models;
using Microsoft.EntityFrameworkCore;

namespace api_shifts.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ShiftsdbContext _context;

    public UserRepository(ShiftsdbContext context)
    {
        _context = context;
    }
    
    public async Task<List<UserModel>> GetAllAsync()
    {
        return await _context.Users.ToListAsync();
    }
}