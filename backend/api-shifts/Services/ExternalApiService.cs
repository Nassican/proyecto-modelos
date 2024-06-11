using api_shifts.Dtos.Student;
using api_shifts.Interfaces.IServices;
using api_shifts.Settings;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace api_shifts.Services;

public class ExternalApiService : IExternalApiService
{
    private readonly HttpClient _httpClient;
    private readonly string _baseUrl;

    public ExternalApiService(HttpClient httpClient, IOptions<ExternalApiSettings> options)
    {
        _httpClient = httpClient;
        _baseUrl = options.Value.BaseUrl;
    }

    public async Task<StudentDto?> GetStudentByCode(string code)
    {
        var endpoint = $"{_baseUrl}/student/{code}";
        var response = await _httpClient.GetAsync(endpoint);
        response.EnsureSuccessStatusCode();

        var data = await response.Content.ReadAsStringAsync();
        var student = JsonSerializer.Deserialize<StudentDto>(data, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
        return student;
    }
}