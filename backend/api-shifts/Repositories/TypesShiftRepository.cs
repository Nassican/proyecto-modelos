using api_shifts.Data;
using api_shifts.Interfaces.IRepositories;
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
        return await _context.TypesShifts
            .Where(x => x.IsActive == true)
            .ToListAsync();
    }

    public async Task<TypesShiftModel?> GetByIdAsync(int id)
    {
        return await _context.TypesShifts.FindAsync(id);
    }

    public async Task<TypesShiftModel> CreateAsync(TypesShiftModel typesShiftModel)
    {
        await _context.TypesShifts.AddAsync(typesShiftModel);
        await _context.SaveChangesAsync();
        return typesShiftModel;
    }
    
    public async Task<TypesShiftModel?> UpdateAsync(int id, TypesShiftModel typesShiftModel)
    {
        var existingTypesShift = await _context.TypesShifts
            .FirstOrDefaultAsync(x => x.Id == id);
        if (existingTypesShift == null) return null;

        existingTypesShift.Color = typesShiftModel.Color;
        existingTypesShift.Icon = typesShiftModel.Icon;
        existingTypesShift.Name = typesShiftModel.Name;
        existingTypesShift.Description = typesShiftModel.Description;
        existingTypesShift.Code = typesShiftModel.Code;
        
        await _context.SaveChangesAsync();
        
        return existingTypesShift;
    }
    
    public async Task<TypesShiftModel?> DeleteAsync(int id)
    {
        var typesShiftModel = await _context.TypesShifts
            .FirstOrDefaultAsync(x => x.Id == id);
        if (typesShiftModel == null) return null;
        
        typesShiftModel.IsActive = false;
        
        await _context.SaveChangesAsync();
        
        return typesShiftModel;
    }
    
    public async Task<bool> TypesShiftExist(int id)
    {
        return await _context.TypesShifts.AnyAsync(x => x.Id == id);
    }
}