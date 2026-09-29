namespace API.Entities;
using System.ComponentModel.DataAnnotations.Schema;
public class Photo
{
    public int Id { get; set; }
    public string? Url { get; set; }
    public string? PublicId { get; set; }

    //Navigation properties
    public DogDetails DogDetails { get; set; } = null!;
    [ForeignKey(nameof(DogDetailsId))]
    public string DogDetailsId { get; set; } = null!;
}