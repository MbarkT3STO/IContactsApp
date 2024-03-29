using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Features.GroupFeature.Commands.Create;

public class CreateGroupCommandResultDTO
{
	public int Id { get; set; }
	public string Name { get; set; }
	public string Description { get; set; }

	public DateTime CreatedAt { get; set; }
	public DateTime UpdatedAt { get; set; }
	public string UserId { get; set; }

	public int ContactsCount { get; set; }
}
