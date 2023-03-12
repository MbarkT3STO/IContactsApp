using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web.API.Features.GroupFeature.Commands.Create;
using Web.API.Features.GroupFeature.Queries.GetGroupByIdQuery;
using Web.API.Features.GroupFeature.Queries.GetGroupsQuery;
using Web.API.Shared;

namespace Web.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GroupsController : ExtendedControllerBase
{
    public GroupsController(IMediator mediator) : base(mediator)
    {
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GetGroupsQueryResultDTO>>> Get()
    {
        var result = await Send(new GetGroupsQuery());

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GetGroupByIdQueryResultDTO>> Get(int id)
    {
        var result = await Send(new GetGroupByIdQuery(id));

        if (result.IsSucceeded)
        {
            return Ok(result.Value);
        }

        return NotFound(result);
    }

    [HttpPost]
    public async Task<ActionResult<CreateGroupCommandResultDTO>> Post(CreateGroupCommand command)
    {
        var result = await Send(command);

        if (result.IsSucceeded)
        {
            return CreatedAtAction(nameof(Get), new { id = result.Value.Id }, result.Value);
        }

        return BadRequest(result);
    }
}