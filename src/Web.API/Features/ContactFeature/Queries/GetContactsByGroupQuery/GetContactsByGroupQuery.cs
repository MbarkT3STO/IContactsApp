using System;
using Microsoft.EntityFrameworkCore;
using Web.API.Abstraction;
using Web.API.Exceptions;

namespace Web.API.Features.ContactFeature.Queries.GetContactsByGroupQuery
{
	public class GetContactsByGroupQuery: IRequest<GetContactsByGroupQueryResult>
	{
		public string UserId { get; set; } 
		public int GroupId { get; set;}
	}

	public class GetContactsByGroupQueryHandler: BaseQueryHandler, IRequestHandler<GetContactsByGroupQuery, GetContactsByGroupQueryResult>
	{
		public GetContactsByGroupQueryHandler(AppDbContext context, IMapper mapper): base(context, mapper)
		{
		}

		public async Task<GetContactsByGroupQueryResult> Handle(GetContactsByGroupQuery request, CancellationToken cancellationToken)
		{
			var group = await _context.Groups
				.Include(g => g.Contacts)
				.FirstOrDefaultAsync(g => g.Id == request.GroupId && g.UserId == request.UserId, cancellationToken: cancellationToken);	
				
				if (group == null)
				throw new RecordIsNotExistException($"Group with id {request.GroupId} is not exist");
				
				var resultValue = _mapper.Map<GetContactsByGroupQueryResultDTO>(group);
				resultValue.Contacts = _mapper.Map<IReadOnlyList<GetContactsByGroupQueryResultContactDTO>>(group.Contacts);
				
				return new GetContactsByGroupQueryResult(resultValue);
		}
	}
}