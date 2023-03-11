using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Abstraction;
using Web.API.Interfaces;

namespace Web.API.Features.ContactFeature.Queries.GetContactByIdQuery;

public class GetContactByIdQueryResult : BaseQueryResult<GetContactByIdQueryResultDTO>
{
    public GetContactByIdQueryResult(GetContactByIdQueryResultDTO? value) : base(value)
    {
    }

    public GetContactByIdQueryResult(Exception? exception, string? errorMessage) : base(exception, errorMessage)
    {
    }

    public GetContactByIdQueryResult(GetContactByIdQueryResultDTO? value, bool isSuccess = true, Exception? exception = null, string? errorMessage = null) : base(value, isSuccess, exception, errorMessage)
    {
    }

    public GetContactByIdQueryResult(Exception? exception) : base(exception)
    {
    }
}
