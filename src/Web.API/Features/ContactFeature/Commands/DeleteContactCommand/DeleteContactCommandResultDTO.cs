using System;

namespace Web.API.Features.ContactFeature.Commands.DeleteContactCommand
{
	public class DeleteContactCommandResultDTO
	{
		public int Id { get; set; }
		public bool IsDeleted { get; set; }
		public DateTime DeletedAt { get; set; }
	}
}