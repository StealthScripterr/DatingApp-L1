using System.Security.Cryptography;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
{
    private readonly AppDbContext _context = context;
    private readonly ITokenService _tokenService = tokenService;
    [HttpPost("register")]
    public async Task<ActionResult<UserDTO>> Register(RegisterDto registerDto)
    {
        if (await _context.Users.AnyAsync(u => u.Email.ToLower() == registerDto.Email.ToLower())) return BadRequest("Email is already taken");

        using var hmac = new HMACSHA512(); // dispose of the HMACSHA512 instance after use
        var user = new AppUser
        {
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName,
            PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(user.AsUserDTO(_tokenService));
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDto loginDto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == loginDto.Email.ToLower());
        if (user == null) return Unauthorized("Invalid email or password");

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid email or password");
        }

        return Ok(user.AsUserDTO(_tokenService));
    }
}
