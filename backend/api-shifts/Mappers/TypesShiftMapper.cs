using api_shifts.Dtos.TypesShift;
using api_shifts.Models;

namespace api_shifts.Mappers;

public static class TypesShiftMapper
{
    public static TypesShiftDto ToTypesShiftDto(this TypesShiftModel typesShiftModel)
    {
        return new TypesShiftDto
        {
            Id = typesShiftModel.Id,
            Color = typesShiftModel.Color,
            Icon = typesShiftModel.Icon,
            Name = typesShiftModel.Name,
            Description = typesShiftModel.Description,
            Code = typesShiftModel.Code
        };
    }
    
    public static TypesShiftModel ToTypesShiftFromCreate(this CreateTypesShiftRequestDto typesShiftDto)
    {
        return new TypesShiftModel
        {
            Color = typesShiftDto.Color,
            Icon = typesShiftDto.Icon,
            Name = typesShiftDto.Name,
            Description = typesShiftDto.Description,
            Code = typesShiftDto.Code,
            IsActive = true
        };
    }
    
    public static TypesShiftModel ToTypesShiftFromUpdate(this UpdateTypesShiftRequestDto typesShiftDto)
    {
        return new TypesShiftModel
        {
            Color = typesShiftDto.Color,
            Icon = typesShiftDto.Icon,
            Name = typesShiftDto.Name,
            Description = typesShiftDto.Description,
            Code = typesShiftDto.Code
        };
    }
}