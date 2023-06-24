using System;

namespace Web.API.Models.Identity.UpdatePassword
{
	public class UpdatePasswordResponse
	{
		public bool IsSucceeded { get; set; }
		public string ErrorMessage { get; set; }
		
		public UpdatePasswordResponse(bool isSucceeded=false, string errorMessage="")
		{
			IsSucceeded  = isSucceeded;
			ErrorMessage = errorMessage;
		}
	}
}