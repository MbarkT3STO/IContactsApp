using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Abstraction;

namespace Web.API.Features.GroupFeature.Queries.GetGroupsQuery;

public class GetGroupsQueryResult : BaseQueryResult<IEnumerable<GetGroupsQueryResultDTO>>
{
    public GetGroupsQueryResult(IEnumerable<GetGroupsQueryResultDTO>? value) : base(value)
    {
    }

    public GetGroupsQueryResult(Exception? exception) : base(exception)
    {
    }

    public GetGroupsQueryResult(Exception? exception, string? errorMessage) : base(exception, errorMessage)
    {
    }

    public GetGroupsQueryResult(IEnumerable<GetGroupsQueryResultDTO>? value, bool isSuccess = true, Exception? exception = null, string? errorMessage = null) : base(value, isSuccess, exception, errorMessage)
    {
    }
}
