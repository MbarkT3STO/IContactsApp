using System;
using Web.API.Abstraction;

namespace Web.API.Features.ContactFeature.Commands.UpdateContactCommand
{
    public class UpdateContactCommandResult : BaseCommandResult<UpdateContactCommandResultDTO>
    {
        public UpdateContactCommandResult(UpdateContactCommandResultDTO? value) : base(value)
        {
        }

        public UpdateContactCommandResult(Exception? exception) : base(exception)
        {
        }

        public UpdateContactCommandResult(Exception? exception, string? errorMessage) : base(exception, errorMessage)
        {
        }

        public UpdateContactCommandResult(UpdateContactCommandResultDTO? value, bool isSucceeded = true, Exception? exception = null, string? errorMessage = null) : base(value, isSucceeded, exception, errorMessage)
        {
        }
    }
}