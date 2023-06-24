using System;

namespace Web.API.Models.Identity.UpdateEmail
{
	public class UpdateEmailResponse
	{
		public bool IsSucceeded { get; set; }
		public string ErrorMessage { get; set; }
		
		public UpdateEmailResponse(bool isSucceeded=false, string errorMessage="")
		{
			IsSucceeded = isSucceeded;
			ErrorMessage = errorMessage;
		}
	}
}