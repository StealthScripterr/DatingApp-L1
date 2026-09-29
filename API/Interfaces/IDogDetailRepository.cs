using API.Entities;

namespace API.Interfaces;

public interface IDogDetailRepository
{
    Task<DogDetails?> GetDogDetailsByIdAsync(string id);
    Task<IReadOnlyList<DogDetails>> GetAllDogDetailsAsync();
    Task AddDogDetailsAsync(DogDetails dogDetails);
    Task UpdateDogDetailsAsync(DogDetails dogDetails);
    Task DeleteDogDetailsAsync(string id);
    Task<bool> DogDetailsExistsAsync(string id);
    Task<IReadOnlyList<Photo>> GetPhotos(string dogDetailsId);
}
