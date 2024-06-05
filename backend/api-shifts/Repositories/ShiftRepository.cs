using api_shifts.Data;
using api_shifts.Interfaces;
using api_shifts.Models;
using Microsoft.EntityFrameworkCore;

namespace api_shifts.Repositories;

public class ShiftRepository : IShiftRepository
{
    private readonly ShiftsdbContext _context;

    public ShiftRepository(ShiftsdbContext context)
    {
        _context = context;
    }

    public async Task<List<ShiftModel>> GetAllAsync()
    {
        return await _context.Shifts.ToListAsync();
    }
}
