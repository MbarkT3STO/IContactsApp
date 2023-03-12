using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Web.API.Features.AuthFeature.Commands.CreateRefreshToken;
using Web.API.Identity;
using Web.API.Models.Identity.Login;
using Web.API.Shared;

namespace Web.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ExtendedControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;

    public AuthController(IMediator mediator, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) : base(mediator)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseModel>> Login([FromBody] LoginModel model)
    {
        var user = await _userManager.FindByNameAsync(model.Username);

        if (user == null)
            return BadRequest(new LoginResponseModel(false, "Invalid username or password"));

        var signingResult = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);

        if (signingResult.Succeeded)
        {
            var jwt = GenerateJwtToken(user);
            var createRefreshTokenQueryResult = await Send(new CreateRefreshTokenCommand(user.Id));

            if (createRefreshTokenQueryResult.IsSucceeded)
            {
                var refreshToken = createRefreshTokenQueryResult.Value;
                return Ok(new LoginResponseModel(user.Id, user.UserName, jwt.Token, jwt.CreatedAt, jwt.ExpiresAt, refreshToken.Token));
            }
            else
            {
                return BadRequest(new LoginResponseModel(false, "An error occured while creating refresh token"));
            }
        }
        else
        {
            return BadRequest(new LoginResponseModel(false, "Invalid username or password"));
        }
    }

    #region Private Methods

    private (string Token, DateTime CreatedAt, DateTime ExpiresAt) GenerateJwtToken(AppUser user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mySuperSecretKey"));
        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var jwt = new JwtSecurityToken(
            issuer: "IContactsApp",
            audience: "IContactsApp",
            claims: claims,
            expires: DateTime.UtcNow.ToLocalTime().AddMinutes(5),
            signingCredentials: signingCredentials
        );

        var token = new JwtSecurityTokenHandler().WriteToken(jwt);

        return (token, DateTime.UtcNow.ToLocalTime(), DateTime.UtcNow.ToLocalTime().AddMinutes(5));
    }


    #endregion
}
