using System;

namespace Web.API.Models.Identity.UpdateEmail
{
	public class UpdateEmailRequest
	{
		public string UserName { get; set; }
		public string NewEmail { get; set; }
		public string Password { get; set; }
	}
}