using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace Web.API.Features.Contact.Queries;

public class GetContactsQuery : IRequest
{
	public int Page { get; set; }
	public int PageSize { get; set; }
}
