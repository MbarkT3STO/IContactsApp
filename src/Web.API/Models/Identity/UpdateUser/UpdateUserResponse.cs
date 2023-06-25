using System;

namespace Web.API.Models.Identity.UpdateUser
{
	public class UpdateUserResponse
	{
		public bool IsSucceeded { get; set; }
		public string ErrorMessage{ get; set; }
		
		public UpdateUserResponse(bool isSucceeded=false, string errorMessage="")
		{
			IsSucceeded = isSucceeded;
			ErrorMessage = errorMessage;
		}
	}
}