using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers;

public class ErrorController : BaseApiController
{
    [HttpGet("unauthorized")]
    public IActionResult AuthError()
    {
        return Unauthorized();
    }
    
    [HttpGet("not-found")]
    public IActionResult NotFoundError()
    {
        return NotFound();
    }

    [HttpGet("server-error")]
    public IActionResult ServerError()
    {
        throw new Exception("A server error occurred.");
    }

    [HttpGet("bad-request")]
    public IActionResult BadRequestError()
    {
        return BadRequest("A bad request error occurred.");
    }

    [HttpPost("validation-error")]
    public IActionResult ValidationError()
    {
        return BadRequest("A validation error occurred.");
    }
}
