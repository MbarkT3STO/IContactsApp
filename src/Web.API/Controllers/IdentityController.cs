using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Web.API.Identity;
using Web.API.Options;
using Web.API.Shared;

namespace Web.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IdentityController : ExtendedControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly IOptions<JwtOptions> _jwtOptions;

    public IdentityController(IMediator mediator, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IOptions<JwtOptions> jwtOptions) : base(mediator)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtOptions = jwtOptions;
    }

    [HttpPost("GetUserById")]
    public async Task<ActionResult<AppUser>> GetUserById([FromQuery] string id)
    {
        var user = await _userManager.FindByIdAsync(id);

        if (user == null)
            return BadRequest("User not found");

        return Ok(user);
    }

    [HttpPost("GetUserByName")]
    public async Task<ActionResult<AppUser>> GetUserByName([FromQuery] string name)
    {
        var user = await _userManager.FindByNameAsync(name);

        if (user == null)
            return BadRequest("User not found");

        return Ok(user);
    }

    [HttpPost("GetUserRoles")]
    public async Task<ActionResult<List<string>>> GetUserRoles([FromQuery] string id)
    {
        var user = await _userManager.FindByIdAsync(id);

        if (user == null)
            return BadRequest("User not found");

        var roles = await _userManager.GetRolesAsync(user);

        return Ok(roles);
    }

    [HttpPost("IsUserInRole")]
    public async Task<ActionResult<bool>> IsUserInRole([FromQuery] string id, [FromQuery] string role)
    {
        var user = await _userManager.FindByIdAsync(id);

        if (user == null)
            return BadRequest("User not found");

        var isInRole = await _userManager.IsInRoleAsync(user, role);

        return Ok(isInRole);
    }
}
