using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Features.GroupFeature.Queries.GetGroupByIdQuery;

public class GetGroupByIdQueryResultDTO
{
	public class Contact
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string? ImageUrl { get; set; }
	}


	public int Id { get; set; }
	public string Name { get; set; }
	public string Description { get; set; }

	public DateTime CreatedAt { get; set; }
	public DateTime UpdatedAt { get; set; }
	public string UserId { get; set; }
	
	public List<Contact> Contacts { get; set; } = new List<Contact>();
}
