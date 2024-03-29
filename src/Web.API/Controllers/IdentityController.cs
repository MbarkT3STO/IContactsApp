using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Web.API.Identity;
using Web.API.Models.Identity.UpdateEmail;
using Web.API.Models.Identity.UpdatePassword;
using Web.API.Models.Identity.UpdateUser;
using Web.API.Options;
using Web.API.Shared;
using System.IO;


namespace Web.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IdentityController: ExtendedControllerBase
{
	private readonly UserManager<AppUser> _userManager;
	private readonly SignInManager<AppUser> _signInManager;
	private readonly IOptions<JwtOptions> _jwtOptions;

	public IdentityController(IMediator mediator, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IOptions<JwtOptions> jwtOptions): base(mediator)
	{
		_userManager   = userManager;
		_signInManager = signInManager;
		_jwtOptions    = jwtOptions;
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

	[HttpPost("UpdateEmail")]
	public async Task<ActionResult<UpdateEmailResponse>> UpdateEmail(UpdateEmailRequest request)
	{
		var user = await _userManager.FindByNameAsync(request.UserName);

		if (user == null)
			return BadRequest(new UpdateEmailResponse(errorMessage: $"User with username {request.UserName} not found"));

		// Check if the password is correct
		var passwordCorrect = await _userManager.CheckPasswordAsync(user, request.Password);

		if (!passwordCorrect)
			return BadRequest(new UpdateEmailResponse(errorMessage: "Password is incorrect"));

		// Check if the new email is already taken
		var emailTaken = await _userManager.FindByEmailAsync(request.NewEmail);

		if (emailTaken == null)
		{
			// Update the email
			user.Email           = request.NewEmail;
			user.NormalizedEmail = request.NewEmail.ToUpper();
			// user.EmailConfirmed = false;

			var result = await _userManager.UpdateAsync(user);

			if (result.Succeeded)
				return Ok(new UpdateEmailResponse(isSucceeded: true));

			else
				return BadRequest(result.Errors);
		}

		else
			return BadRequest(new UpdateEmailResponse(errorMessage: $"Email {request.NewEmail} is already taken"));
	}

	[HttpPost("UpdatePassword")]
	public async Task<ActionResult<UpdatePasswordResponse>> UpdatePassword(UpdatePasswordRequest request)
	{
		var user = await _userManager.FindByNameAsync(request.UserName);

		if (user == null)
			return BadRequest(new UpdatePasswordResponse(errorMessage: $"User with username {request.UserName} not found"));

		// Check if the current password is correct
		var isCurrentPasswordCorrect = await _userManager.CheckPasswordAsync(user, request.CurrentPassword);

		if (!isCurrentPasswordCorrect)
			return BadRequest(new UpdatePasswordResponse(errorMessage: "Current password is incorrect"));

		// Update the password
		var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);

		if (result.Succeeded)
		{
			// Sign out the user
			await _signInManager.SignOutAsync();

			return Ok(new UpdatePasswordResponse(isSucceeded: true));
		}
		else
		{
			return BadRequest(new UpdatePasswordResponse(errorMessage: result.Errors.First().Description));
		}

	}

	[HttpPost("UpdateUser")]
	public async Task<ActionResult<UpdateUserResponse>> UpdateUser([FromForm] UpdateUserRequest request, [FromForm] IFormFile? newImageFile)
	{
		var user = await _userManager.FindByNameAsync(request.UserName);

		if (user == null)
			return BadRequest(new UpdateUserResponse(errorMessage: $"User with username {request.UserName} not found"));

		// Update the user info
		user.FirstName   = request.NewFirstName;
		user.LastName    = request.NewLastName;
		user.PhoneNumber = request.NewPhoneNumber;

		// Update the user image
		var folderName = Path.Combine("Resources", "Images", "Users");
		var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
		
		// Check if the Resources/Images/Users folder exists
		if (!Directory.Exists(pathToSave))
			Directory.CreateDirectory(pathToSave);

		if (newImageFile != null)
		{
			var fileName = Guid.NewGuid().ToString() + Path.GetExtension(newImageFile.FileName);
			var fullPath = Path.Combine(pathToSave, fileName);
			var dbPath   = Path.Combine(folderName, fileName);

			using var stream = new FileStream(fullPath, FileMode.Create);
			newImageFile.CopyTo(stream);
			stream.Flush();
			
			var oldImageUrl = user.ImageUrl;
						
			// Update the user image
			user.ImageUrl = dbPath;

			// Delete the old image
			if (oldImageUrl != null)
			{
				var oldImagePath = Path.Combine(Directory.GetCurrentDirectory(), oldImageUrl);
				if (System.IO.File.Exists(oldImagePath))
					System.IO.File.Delete(oldImagePath);
			}
		}
		else if(request.RemoveImage)
		{
			var oldImageUrl = user.ImageUrl;
			
			// Update the user image
			user.ImageUrl = null;

			// Delete the old image
			if (oldImageUrl != null)
			{
				var oldImagePath = Path.Combine(Directory.GetCurrentDirectory(), oldImageUrl);
				if (System.IO.File.Exists(oldImagePath))
					System.IO.File.Delete(oldImagePath);
			}
		}
		

		var result = await _userManager.UpdateAsync(user);

		if (result.Succeeded)
			return Ok(new UpdateUserResponse(isSucceeded: true));

		else
			return BadRequest(new UpdateUserResponse(errorMessage: result.Errors.First().Description));

	}
}

