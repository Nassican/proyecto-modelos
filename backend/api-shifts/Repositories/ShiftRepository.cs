using api_shifts.Data;
using api_shifts.Interfaces.IRepositories;
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

    public async Task<ShiftModel?> GetByIdAsync(int id)
    {
        return await _context.Shifts.FindAsync(id);
    }

    public async Task<ShiftModel> CreateAsync(ShiftModel shiftModel)
    {
        await _context.Shifts.AddAsync(shiftModel);
        await _context.SaveChangesAsync();
        return shiftModel;
    }

    public Task<ShiftModel?> UpdateAsync(int id, ShiftModel shift)
    {
        throw new NotImplementedException();
    }

    public Task<ShiftModel?> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ShiftExist(int id)
    {
        throw new NotImplementedException();
    }
}
