using api_shifts.Models;

namespace api_shifts.Interfaces;

public interface IClientRepository
{
    Task<List<ClientModel>> GetAllAsync();
}