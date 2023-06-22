using System;

namespace Web.API.Features.ContactFeature.Queries.GetContactsByGroupQuery
{
    public class GetContactsByGroupQueryResultDTO
    {
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }

		public DateTime CreatedAt { get; set; }
		public DateTime UpdatedAt { get; set; }
		public string UserId { get; set; }

		public IReadOnlyList<GetContactsByGroupQueryResultContactDTO> Contacts { get; set; }
	}
}