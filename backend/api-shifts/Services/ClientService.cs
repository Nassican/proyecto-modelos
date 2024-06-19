using api_shifts.Dtos.Client;
using api_shifts.Interfaces.IRepositories;
using api_shifts.Interfaces.IServices;
using api_shifts.Mappers;

namespace api_shifts.Services;

public class ClientService : IClientService
{
    private readonly IClientRepository _clientsRepo;
    private readonly IExternalApiService _externalApiService;

    public ClientService(IClientRepository clientsRepository, IExternalApiService externalApiService)
    {
        _clientsRepo = clientsRepository;
        _externalApiService = externalApiService;
    }

    public async Task<IEnumerable<ClientDto?>> GetAll()
    {
        var clients = await _clientsRepo.GetAllAsync();
        return clients.Select(x => x.ToClientDto());
    }

    public async Task<ClientDto?> GetById(int id)
    {
        var client = await _clientsRepo.GetByIdAsync(id);
        return client?.ToClientDto();
    }

    public async Task<ClientDto?> GetByStudentCode(string studentCode)
    {
        var client = await _clientsRepo.GetByStudentCodeAsync(studentCode);
        return client?.ToClientDto();
    }

    public async Task<ClientDto?> SearchByStudentAndCreate(string studentCode, string email)
    {
        var client = await _clientsRepo.GetByStudentCodeAsync(studentCode);
        if (client != null)
        {
            if (client.Email == email) return client.ToClientDto();
            
            client.Email = email;
            await _clientsRepo.UpdateAsync(client.Id, client);

            return client.ToClientDto();
        }
        
        var student = await _externalApiService.GetStudentByCode(studentCode);
        if (student == null) return null;
        
        var newClient = new CreateClientRequestDto
        {
            StudentCode = studentCode,
            Name = student.Name,
            Email = email,
        };

        var createdClient = await _clientsRepo.CreateAsync(newClient.ToClientFromCreate());
        return createdClient.ToClientDto();
    }

    public Task<ClientDto?> Create(CreateClientRequestDto clientDto)
    {
        throw new NotImplementedException();
    }

    public Task<ClientDto?> Update(int id, UpdateClientRequestDto clientDto)
    {
        throw new NotImplementedException();
    }
}