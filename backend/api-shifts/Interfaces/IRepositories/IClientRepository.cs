using api_shifts.Models;

namespace api_shifts.Interfaces.IRepositories;

public interface IClientRepository
{
    Task<IEnumerable<ClientModel>> GetAllAsync();
    Task<ClientModel?> GetByIdAsync(int id);
    Task<ClientModel?> GetByStudentCodeAsync(string studentCode);
    Task<ClientModel> CreateAsync(ClientModel client);
    Task<ClientModel?> UpdateAsync(int id, ClientModel client);
}