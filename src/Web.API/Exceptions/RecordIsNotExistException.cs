using System;

namespace Web.API.Exceptions
{
	public class RecordIsNotExistException : Exception
	{

		public RecordIsNotExistException() : base()
		{
		}

		public RecordIsNotExistException(string? message) : base(message)
		{
		}

		public RecordIsNotExistException(string? message, Exception? innerException) : base(message, innerException)
		{
		}
	}
}