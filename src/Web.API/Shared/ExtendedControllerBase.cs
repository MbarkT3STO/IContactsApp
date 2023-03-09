using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Web.API.Shared;

public abstract class ExtendedControllerBase : ControllerBase
{
    private readonly IMediator _mediator;

    protected ExtendedControllerBase(IMediator mediator)
    {
        _mediator = mediator;
    }

    protected async Task<ActionResult<TResponse>> Send<TResponse>(IRequest<TResponse> request)
    {
        var response = await _mediator.Send(request);

        return Ok(response);
    }
}
