using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

public class DogDetails
{
    public string Id { get; set; } = null!; 
    public int Age { get; set; }
    public string Gender { get; set; } = null!; 
    public string Breed { get; set; } = null!; 
    public string Color { get; set; } = null!; 
    public string Description { get; set; } = null!; 
    public required string DisplayName { get; set; } = null!; 
    public string? ProfileImageUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime LastActiveAt { get; set; } = DateTime.UtcNow;

    public required string City { get; set; }
    public required string Country { get; set; }


    //Navigation properties
    [ForeignKey(nameof(Id))]
    public AppUser User { get; set; } = null!;
    public List<Photo> Photos { get; set; } = [];
}
