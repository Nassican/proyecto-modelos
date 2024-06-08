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
}