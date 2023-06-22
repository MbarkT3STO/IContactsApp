using System;
using Web.API.Abstraction;

namespace Web.API.Features.ContactFeature.Queries.GetContactsByGroupQuery
{
	public class GetContactsByGroupQuery  : IRequest<GetContactsByGroupQueryResult>
	{
		public string UserId { get; set; } 
		public string GroupId { get; set;}
	}

    public class GetContactsByGroupQueryHandler : BaseQueryHandler, IRequestHandler<GetContactsByGroupQueryResult>
    {
        public GetContactsByGroupQueryHandler(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public Task<Unit> Handle(GetContactsByGroupQueryResult request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}