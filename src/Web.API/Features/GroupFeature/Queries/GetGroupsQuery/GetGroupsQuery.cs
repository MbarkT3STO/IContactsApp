using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Web.API.Abstraction;

namespace Web.API.Features.GroupFeature.Queries.GetGroupsQuery;

public class GetGroupsQuery : IRequest<GetGroupsQueryResult>
{

}

public class GetGroupsQueryHandler : BaseQueryHandler, IRequestHandler<GetGroupsQuery, GetGroupsQueryResult>
{
    public GetGroupsQueryHandler(AppDbContext context, IMapper mapper) : base(context, mapper)
    {
    }

    public async Task<GetGroupsQueryResult> Handle(GetGroupsQuery request, CancellationToken cancellationToken)
    {
        var groups = await _context.Groups.ToListAsync(cancellationToken);
        var value = _mapper.Map<IEnumerable<GetGroupsQueryResultDTO>>(groups);

        var result = new GetGroupsQueryResult(value);

        return result;
    }
}