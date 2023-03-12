using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Abstraction;

namespace Web.API.Features.GroupFeature.Queries.GetGroupByIdQuery;

public class GetGroupByIdQueryResult : BaseQueryResult<GetGroupByIdQueryResultDTO>
{
    public GetGroupByIdQueryResult(GetGroupByIdQueryResultDTO? value) : base(value)
    {
    }

    public GetGroupByIdQueryResult(Exception? exception) : base(exception)
    {
    }

    public GetGroupByIdQueryResult(Exception? exception, string? errorMessage) : base(exception, errorMessage)
    {
    }

    public GetGroupByIdQueryResult(GetGroupByIdQueryResultDTO? value, bool isSuccess = true, Exception? exception = null, string? errorMessage = null) : base(value, isSuccess, exception, errorMessage)
    {
    }
}
