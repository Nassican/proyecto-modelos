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
        return await _context.Users.ToListAsync();
    }

    public async Task<UserModel?> GetByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<UserModel> CreateAsync(UserModel userModel)
    {
        await _context.Users.AddAsync(userModel);
        await _context.SaveChangesAsync();
        return userModel;
    }

    public Task<UserModel> UpdateAsync(UserModel user)
    {
        throw new NotImplementedException();
    }

    public Task<UserModel> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}