using System;

namespace Web.API.Models.Identity.UpdateUser
{
	public class UpdateUserRequest
	{
		public string UserName { get; set; }
		public string NewFirstName { get; set; }
		public string NewLastName { get; set; }
		public string? NewPhoneNumber { get; set; }
		public bool RemoveImage { get; set; }
	}
}