using api_shifts.Dtos.Student;

namespace api_shifts.Interfaces.IServices;

public interface IExternalApiService
{
    Task<StudentDto?> GetStudentByCode(string code);
}