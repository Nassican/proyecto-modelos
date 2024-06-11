using api_shifts.Dtos.Client;

namespace api_shifts.Interfaces.IServices;

public interface IClientService
{
    Task<IEnumerable<ClientDto?>> GetAll();
    Task<ClientDto?> GetById(int id);
    Task<ClientDto?> GetByStudentCode(string studentCode);
    Task<ClientDto?> SearchByStudentAndCreate(string studentCode, string email);
    Task<ClientDto?> Create(CreateClientRequestDto clientDto);
    Task<ClientDto?> Update(int id, UpdateClientRequestDto clientDto);
}