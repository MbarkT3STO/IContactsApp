
using System.IO;
using System.Net.Http.Headers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using Web.API.Exceptions;
using Web.API.Features.ContactFeature.Commands.CreateContactCommand;
using Web.API.Features.ContactFeature.Commands.DeleteContactCommand;
using Web.API.Features.ContactFeature.Commands.UpdateContactCommand;
using Web.API.Features.ContactFeature.Queries.GetContactByIdQuery;
using Web.API.Features.ContactFeature.Queries.GetContactsByGroupQuery;
using Web.API.Features.ContactFeature.Queries.GetContactsQuery;
using Web.API.Shared;
using static Web.API.Features.ContactFeature.Queries.GetContactsQuery.GetContactsQuery;

namespace Web.API;

[ApiController]
[Route("api/[controller]")]

[Authorize]
public class ContactsController : ExtendedControllerBase
{
	public ContactsController(IMediator mediator) : base(mediator)
	{
	}

	[HttpGet]
	public async Task<ActionResult<IEnumerable<GetContactsQueryDTO>>> Get()
	{
		var contacts = await Send(new GetContactsQuery());

		return Ok(contacts.Contacts);
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<GetContactByIdQueryResultDTO>> Get(int id)
	{
		var result = await Send(new GetContactByIdQuery(id));

		return Ok(result.Value);
	}

	[HttpPost]
	public async Task<ActionResult<CreateContactCommandResultDTO>> Post([FromForm] CreateContactCommand command, [FromForm] IFormFile? imageFile)
	{
		command.ImageFile = imageFile;

		var result = await Send(command);

		if (result.Exception is RecordAlreadyExistException)
			return Conflict(result.Exception.Message);

		return Ok(result.Value);
	}

	[HttpPost("GetByGroup")]
	public async Task<ActionResult<GetContactsByGroupQueryResultDTO>> GetByGroup(GetContactsByGroupQuery query)
	{
		var result = await Send(query);

		return Ok(result.Value);
	}


	[HttpPut]
	public async Task<ActionResult<UpdateContactCommandResultDTO>> Put([FromForm] UpdateContactCommand command, [FromForm] IFormFile? imageFile)
	{
		command.NewImageFile = imageFile;

		var result = await Send(command);

		if (result.Exception is RecordAlreadyExistException)
			return Conflict(result.Exception.Message);

		if (result.Exception is RecordIsNotExistException)
			return NotFound(result.Exception.Message);
			
		if (result.HasException)
			return BadRequest(result.Exception.Message);

		return Ok(result.Value);
	}

	
	[HttpDelete("Delete/{id}/{userId}")]
	public async Task<ActionResult<DeleteContactCommandResultDTO>> Delete(int id, string userId)
	{
		var result = await Send(new DeleteContactCommand { Id = id, UserId = userId });

		if (result.Exception is RecordIsNotExistException)
			return NotFound(result.Exception.Message);
		
		if (result.HasException)
			return BadRequest(result.Exception.Message);

		return Ok(result.Value);
	}
}
