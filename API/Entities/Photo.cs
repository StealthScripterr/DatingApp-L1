namespace API.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class Photo
{
    public int Id { get; set; }
    public string? Url { get; set; }
    public string? PublicId { get; set; }

    //Navigation properties
    [JsonIgnore]
    public DogDetails DogDetails { get; set; } = null!;
    [ForeignKey(nameof(DogDetailsId))]
    public string DogDetailsId { get; set; } = null!;
}