
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.API.Features.ContactFeature.Queries;
using Web.API.Shared;
using static Web.API.Features.ContactFeature.Queries.GetContactsQuery;

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

        return Ok(contacts);
    }
}
