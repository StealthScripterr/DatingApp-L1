using System.Security.Cryptography;
using System.Text.Json;
using API.DTO;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
public class Seed
{
    public static async Task SeedData(AppDbContext context)
    {
        if(await context.Users.AnyAsync()) return;
        var dogDetails = await File.ReadAllTextAsync("Data/DogDetailsSeedData.json");
        var dogDetailsList = JsonSerializer.Deserialize<List<SeedDogDetailsDTO>>(dogDetails);

        if(dogDetailsList == null)
        {
            Console.WriteLine("Dog details list is null.");
            return;
        }
        
        foreach(var record in dogDetailsList)
        {
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Id = record.Id,
                DisplayName = record.DisplayName,
                Email = record.Email,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("Pa$$w0rd")),
                PasswordSalt = hmac.Key,
                ProfileImageUrl = record.ProfileImageUrl,
                DogDetails = new DogDetails
                {
                    Id = record.Id,
                    DisplayName = record.DisplayName,
                    Breed = record.Breed,
                    Age = record.Age,
                    Color = record.Color,
                    City = record.City,
                    Country = record.Country,
                    Description = record.Description,
                    ProfileImageUrl = record.ProfileImageUrl,
                    CreatedAt = record.CreatedAt,
                    LastActiveAt = record.LastActiveAt,
                    Gender = record.Gender
                }
            };

            user.DogDetails.Photos.Add(new Photo
            {
                Url = record.ProfileImageUrl,
                DogDetailsId = record.Id
            });

            context.Users.Add(user);
        }
        await context.SaveChangesAsync();
    }
}
