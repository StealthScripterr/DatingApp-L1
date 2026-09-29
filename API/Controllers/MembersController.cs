using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[Authorize]
public class MembersController : BaseApiController
{

    private readonly IDogDetailRepository _dogDetailRepository;

    public MembersController(IDogDetailRepository dogDetailRepository)
    {
        _dogDetailRepository = dogDetailRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<DogDetails>>> GetMembers()
    {
        var members = await _dogDetailRepository.GetAllDogDetailsAsync();
        return Ok(members);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DogDetails>> GetMember(string id)
    {
        var member = await _dogDetailRepository.GetDogDetailsByIdAsync(id);
        if (member == null) return NotFound();
        return Ok(member);
    }
}
