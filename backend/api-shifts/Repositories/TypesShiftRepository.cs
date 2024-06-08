using api_shifts.Data;
using api_shifts.Interfaces;
using api_shifts.Models;
using Microsoft.EntityFrameworkCore;

namespace api_shifts.Repositories;

public class TypesShiftRepository : ITypesShiftRepository
{
    private readonly ShiftsDbContext _context;

    public TypesShiftRepository(ShiftsDbContext context)
    {
        _context = context;
    }

    public async Task<List<TypesShiftModel>> GetAllAsync()
    {
        return await _context.TypesShifts.ToListAsync();
    }

    public async Task<TypesShiftModel?> GetByIdAsync(int id)
    {
        return await _context.TypesShifts.FindAsync(id);
    }

    public Task<TypesShiftModel> CreateAsync(TypesShiftModel typesShift)
    {
        throw new NotImplementedException();
    }
}