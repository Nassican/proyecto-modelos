using api_shifts.Data;
using api_shifts.Interfaces;
using api_shifts.Models;
using Microsoft.EntityFrameworkCore;

namespace api_shifts.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ShiftsDbContext _context;

    public UserRepository(ShiftsDbContext context)
    {
        _context = context;
    }
    
    public async Task<List<UserModel>> GetAllAsync()
    {
        return await _context.Users
            .Where(x => x.IsActive == true)
            .ToListAsync();
    }

    public async Task<UserModel?> GetByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<UserModel?> GetByEmailAsync(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<UserModel?> GetByUsernameAsync(string username)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Username == username);
    }

    public async Task<UserModel> CreateAsync(UserModel userModel)
    {
        await _context.Users.AddAsync(userModel);
        await _context.SaveChangesAsync();
        return userModel;
    }

    public async Task<UserModel?> UpdateAsync(int id, UserModel userModel)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(x => x.Id == id);
        if (existingUser == null) return null;
        
        existingUser.Email = userModel.Email;
        
        await _context.SaveChangesAsync();
        
        return existingUser;
    }

    public async Task<UserModel?> DeleteAsync(int id)
    {
        var userModel = await _context.Users
            .FirstOrDefaultAsync(x => x.Id == id);
        if (userModel == null) return null;
        
        userModel.IsActive = false;
        
        await _context.SaveChangesAsync();
        
        return userModel;
    }
}