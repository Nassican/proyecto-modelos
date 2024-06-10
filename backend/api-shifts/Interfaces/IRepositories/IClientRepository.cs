using api_shifts.Models;

namespace api_shifts.Interfaces.IRepositories;

public interface IClientRepository
{
    Task<List<ClientModel>> GetAllAsync();
}