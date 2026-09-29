using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.DTO;

public record SeedDogDetailsDTO
{
    [JsonPropertyName("id")]
    public required string Id { get; set; } = null!; 
    [JsonPropertyName("email")]
    public required string Email { get; set; } = null!; 
    [JsonPropertyName("age")]
    public int Age { get; set; }
    [JsonPropertyName("gender")]
    public string Gender { get; set; } = null!; 
    [JsonPropertyName("breed")]
    public string Breed { get; set; } = null!; 
    [JsonPropertyName("color")]
    public string Color { get; set; } = null!; 
    [JsonPropertyName("description")]
    public string Description { get; set; } = null!; 
    [JsonPropertyName("displayName")]
    public required string DisplayName { get; set; } = null!; 
    [JsonPropertyName("profileImageUrl")]
    public string? ProfileImageUrl { get; set; }
    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    [JsonPropertyName("lastActiveAt")]
    public DateTime LastActiveAt { get; set; } = DateTime.UtcNow;

    [JsonPropertyName("city")]
    public required string City { get; set; }
    [JsonPropertyName("country")]
    public required string Country { get; set; }
}
