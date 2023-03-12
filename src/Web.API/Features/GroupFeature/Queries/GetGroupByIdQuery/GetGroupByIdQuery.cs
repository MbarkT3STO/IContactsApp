using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Abstraction;

namespace Web.API.Features.GroupFeature.Queries.GetGroupByIdQuery;

public class GetGroupByIdQuery : IRequest<GetGroupByIdQueryResult>
{
    public int Id { get; set; }

    public GetGroupByIdQuery(int id)
    {
        Id = id;
    }
}

public class GetGroupByIdQueryHandler : BaseQueryHandler, IRequestHandler<GetGroupByIdQuery, GetGroupByIdQueryResult>
{
    public GetGroupByIdQueryHandler(AppDbContext context, IMapper mapper) : base(context, mapper)
    {
    }

    public async Task<GetGroupByIdQueryResult> Handle(GetGroupByIdQuery request, CancellationToken cancellationToken)
    {
        var group = await _context.Groups.FindAsync(request.Id);

        var value = _mapper.Map<GetGroupByIdQueryResultDTO>(group);

        return new GetGroupByIdQueryResult(value);
    }
}