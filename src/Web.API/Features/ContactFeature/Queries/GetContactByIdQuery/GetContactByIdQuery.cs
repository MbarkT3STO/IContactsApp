using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Web.API.Abstraction;

namespace Web.API.Features.ContactFeature.Queries.GetContactByIdQuery;

public record GetContactByIdQuery : IRequest<GetContactByIdQueryResult>
{
    public int Id { get; set; }

    public GetContactByIdQuery(int id)
    {
        Id = id;
    }
}

public class GetContactByIdQueryHandler : BaseQueryHandler, IRequestHandler<GetContactByIdQuery, GetContactByIdQueryResult>
{
    public GetContactByIdQueryHandler(AppDbContext context, IMapper mapper) : base(context, mapper)
    {
    }

    public async Task<GetContactByIdQueryResult> Handle(GetContactByIdQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var contact = await _context.Contacts.FindAsync(request.Id);
            var contactDTO = _mapper.Map<GetContactByIdQueryResultDTO>(contact);

            return new GetContactByIdQueryResult(contactDTO);
        }
        catch (Exception ex)
        {
            return new GetContactByIdQueryResult(ex);
        }
    }
}
