using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Web.API.Features.AuthFeature.Commands.CreateRefreshToken;
using Web.API.Features.AuthFeature.Queries.GetRefreshTokenQuery;
using Web.API.Identity;
using Web.API.Models.Identity.Login;
using Web.API.Models.Identity.RefreshToken;
using Web.API.Options;
using Web.API.Shared;

namespace Web.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ExtendedControllerBase
{
	private readonly UserManager<AppUser> _userManager;
	private readonly SignInManager<AppUser> _signInManager;
	private readonly IOptions<JwtOptions> _jwtOptions;

	public AuthController(IMediator mediator, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IOptions<JwtOptions> jwtOptions) : base(mediator)
	{
		_userManager = userManager;
		_signInManager = signInManager;
		_jwtOptions = jwtOptions;
	}

	[HttpPost("Login")]
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


	[HttpPost("RefreshToken")]
	public async Task<ActionResult<RefreshTokenResponseModel>> RefreshToken([FromBody] RefreshTokenModel model)
	{
		var user = await _userManager.FindByIdAsync(model.UserId);

		if (user == null)
			return BadRequest(new RefreshTokenResponseModel("Invalid User"));

		var queryResult = await Send(new GetRefreshTokenQuery(model.RefreshToken, model.UserId));

		if (queryResult.IsSucceeded)
		{
			var jwt = GenerateJwtToken(user);

			return Ok(new RefreshTokenResponseModel(jwt.Token, model.RefreshToken, jwt.CreatedAt, jwt.ExpiresAt));
		}
		else
		{
			return BadRequest(new RefreshTokenResponseModel("Invalid Refresh Token"));
		}
	}

[HttpPost("IsTokenValid")]
public ActionResult<bool> IsTokenValid([FromQuery] string token)
{
	var jwtHandler = new JwtSecurityTokenHandler();
	
	var validationParameters = new TokenValidationParameters
	{
		ValidateIssuerSigningKey = true,
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Value.Key)),
		ValidateIssuer = true,
		ValidIssuer = _jwtOptions.Value.Issuer,
		ValidateAudience = true,
		ValidAudience = _jwtOptions.Value.Audience,
		ValidateLifetime = true,
		ClockSkew = TimeSpan.Zero
	};
	
	// Check if token is expired or not
	try
	{
		jwtHandler.ValidateToken(token, validationParameters, out var validatedToken);
		return Ok(true);
	}
	catch (Exception)
	{
		return Ok(false);
	}
}

	#region Private Methods

	private (string Token, DateTime CreatedAt, DateTime ExpiresAt) GenerateJwtToken(AppUser user)
	{
		var issuer = _jwtOptions.Value.Issuer;
		var audience = _jwtOptions.Value.Audience;
		var secret = _jwtOptions.Value.Key;

		var claims = new[]
		{
			new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
			new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
		};

		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
		var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

		var jwt = new JwtSecurityToken(
			issuer: issuer,
			audience: audience,
			claims: claims,
			expires: DateTime.UtcNow.ToLocalTime().AddMinutes(5),
			signingCredentials: signingCredentials
		);

		var token = new JwtSecurityTokenHandler().WriteToken(jwt);

		return (token, DateTime.UtcNow.ToLocalTime(), DateTime.UtcNow.ToLocalTime().AddMinutes(5));
	}


	#endregion
}
