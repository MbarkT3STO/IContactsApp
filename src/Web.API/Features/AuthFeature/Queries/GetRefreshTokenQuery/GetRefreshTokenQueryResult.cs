using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Abstraction;

namespace Web.API.Features.AuthFeature.Queries.GetRefreshTokenQuery;

public class GetRefreshTokenQueryResult : BaseQueryResult<GetRefreshTokenQueryResultDTO>
{
    public GetRefreshTokenQueryResult(GetRefreshTokenQueryResultDTO? value) : base(value)
    {
    }

    public GetRefreshTokenQueryResult(Exception? exception) : base(exception)
    {
    }

    public GetRefreshTokenQueryResult(Exception? exception, string? errorMessage) : base(exception, errorMessage)
    {
    }

    public GetRefreshTokenQueryResult(GetRefreshTokenQueryResultDTO? value, bool isSuccess = true, Exception? exception = null, string? errorMessage = null) : base(value, isSuccess, exception, errorMessage)
    {
    }
}
