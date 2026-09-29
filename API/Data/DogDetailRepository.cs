using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
public class DogDetailRepository(AppDbContext context) : IDogDetailRepository
{
    private readonly AppDbContext _context = context;

    public async Task AddDogDetailsAsync(DogDetails dogDetails)
    {
        await _context.DogDetails.AddAsync(dogDetails);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteDogDetailsAsync(string id)
    {
        var dogDetails = await _context.DogDetails.FindAsync(id);
        if (dogDetails is null) return;

        _context.DogDetails.Remove(dogDetails);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> DogDetailsExistsAsync(string id)
    {
        return await _context.DogDetails.AnyAsync(dogDetails => dogDetails.Id == id);
    }

    public async Task<IReadOnlyList<DogDetails>> GetAllDogDetailsAsync()
    {
        return await _context.DogDetails
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<DogDetails?> GetDogDetailsByIdAsync(string id)
    {
        return await _context.DogDetails
            .AsNoTracking()
            .FirstOrDefaultAsync(dogDetails => dogDetails.Id == id);
    }

    public async Task<IReadOnlyList<Photo>> GetPhotos(string dogDetailsId)
    {
        return await _context.DogDetails
            .AsNoTracking()
            .Where(dogDetails => dogDetails.Id == dogDetailsId)
            .SelectMany(dogDetails => dogDetails.Photos)
            .ToListAsync();
    }

    public async Task UpdateDogDetailsAsync(DogDetails dogDetails)
    {
        _context.Entry(dogDetails).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}