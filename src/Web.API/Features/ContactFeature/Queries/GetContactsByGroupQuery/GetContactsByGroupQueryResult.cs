using System;
using Web.API.Abstraction;
using Web.API.Interfaces;

namespace Web.API.Features.ContactFeature.Queries.GetContactsByGroupQuery
{
	public class GetContactsByGroupQueryResult : BaseQueryResult<GetContactsByGroupQueryResultDTO>
	{
		public GetContactsByGroupQueryResult(GetContactsByGroupQueryResultDTO? value) : base(value)
		{
		}

		public GetContactsByGroupQueryResult(Exception? exception) : base(exception)
		{
		}

		public GetContactsByGroupQueryResult(Exception? exception, string? errorMessage) : base(exception, errorMessage)
		{
		}

		public GetContactsByGroupQueryResult(GetContactsByGroupQueryResultDTO? value, bool isSuccess = true, Exception? exception = null, string? errorMessage = null) : base(value, isSuccess, exception, errorMessage)
		{
		}
		
	}
}