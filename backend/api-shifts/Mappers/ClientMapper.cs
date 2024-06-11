using api_shifts.Dtos.Client;
using api_shifts.Models;

namespace api_shifts.Mappers;

public static class ClientMapper
{
    public static ClientDto ToClientDto(this ClientModel clientModel)
    {
        return new ClientDto()
        {
            Id = clientModel.Id,
            Name = clientModel.Name,
            StudentCode = clientModel.StudentCode,
            Email = clientModel.Email
        };
    }
    
    public static ClientModel ToClientFromCreate(this CreateClientRequestDto clientDto)
    {
        return new ClientModel()
        {
            Name = clientDto.Name,
            StudentCode = clientDto.StudentCode,
            Email = clientDto.Email
        };
    }
}