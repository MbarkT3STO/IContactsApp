using System;
using Web.API.Abstraction;

namespace Web.API.Features.ContactFeature.Commands.DeleteContactCommand
{
    public class DeleteContactCommandResult : BaseCommandResult<DeleteContactCommandResultDTO>
    {
        public DeleteContactCommandResult(DeleteContactCommandResultDTO? value) : base(value)
        {
        }

        public DeleteContactCommandResult(Exception? exception) : base(exception)
        {
        }

        public DeleteContactCommandResult(Exception? exception, string? errorMessage) : base(exception, errorMessage)
        {
        }

        public DeleteContactCommandResult(DeleteContactCommandResultDTO? value, bool isSucceeded = true, Exception? exception = null, string? errorMessage = null) : base(value, isSucceeded, exception, errorMessage)
        {
        }
    }
}