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

    public async Task<IEnumerable<ShiftModel>> GetAllAsync()
    {
        return await _context.Shifts
            .Where(x => x.IsActive == true)
            .ToListAsync();
    }

    public async Task<ShiftModel?> GetByIdAsync(int id)
    {
        return await _context.Shifts.FindAsync(id);
    }
    
    public async Task<IEnumerable<ShiftModel>> GetByIdTypeShiftAsync(int idTypeShift)
    {
        return await _context.Shifts
            .Where(x => x.IdTypeShift == idTypeShift && x.IsActive == true)
            .ToListAsync();
    }

    public async Task<ShiftModel?> NextShiftByIdTypeShiftAsync(int idTypeShift)
    {
        var shift = await _context.Shifts
            .Where(x => x.IdTypeShift == idTypeShift && x.IsStandby && x.IsActive)
            .OrderBy(x => x.NumShift)
            .FirstOrDefaultAsync();

        return shift;
    }
    
    public async Task<ShiftModel> CreateAsync(ShiftModel shiftModel)
    {
        await _context.Shifts.AddAsync(shiftModel);
        await _context.SaveChangesAsync();
        return shiftModel;
    }

    public async Task<ShiftModel?> UpdateAsync(int id, ShiftModel shiftModel)
    {
        var exitingShift = await _context.Shifts
            .FirstOrDefaultAsync(x => x.Id == id);
        if (exitingShift == null) return null;

        exitingShift.DateAttended = shiftModel.DateAttended;
        exitingShift.IsAttended = shiftModel.IsAttended;
        exitingShift.IsStandby = shiftModel.IsStandby;
        exitingShift.IdUser = shiftModel.IdUser;
        
        await _context.SaveChangesAsync();
        
        return exitingShift;
    }

    public async Task<ShiftModel?> DeleteAsync(int id)
    {
        var shiftModel = await _context.Shifts
            .FirstOrDefaultAsync(x => x.Id == id);
        if (shiftModel == null) return null;
        
        shiftModel.IsActive = false;
        
        await _context.SaveChangesAsync();
        
        return shiftModel;
    }

    public async Task<bool> ShiftExist(int id)
    {
        return await _context.Shifts.AnyAsync(x => x.Id == id);
    }
}
