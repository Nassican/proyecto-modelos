using api_shifts.Data;
using api_shifts.Interfaces;
using api_shifts.Models;
using Microsoft.EntityFrameworkCore;

namespace api_shifts.Repositories;

public class ShiftRepository : IShiftRepository
{
    private readonly ShiftsDbContext _context;

    public ShiftRepository(ShiftsDbContext context)
    {
        _context = context;
    }

    public async Task<List<ShiftModel>> GetAllAsync()
    {
        return await _context.Shifts.ToListAsync();
    }
}
