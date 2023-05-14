
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.API.Exceptions;
using Web.API.Features.ContactFeature.Commands.CreateContactCommand;
using Web.API.Features.ContactFeature.Queries.GetContactByIdQuery;
using Web.API.Features.ContactFeature.Queries.GetContactsQuery;
using Web.API.Shared;
using static Web.API.Features.ContactFeature.Queries.GetContactsQuery.GetContactsQuery;

namespace Web.API;

[ApiController]
[Route("api/[controller]")]
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
    public async Task<ActionResult<CreateContactCommandResultDTO>> Post(CreateContactCommand command)
    {
        var result = await Send(command);

        if (result.Exception is RecordAlreadyExistException)
            return Conflict(result.Exception.Message);

        return Ok(result.Value);
    }
}
