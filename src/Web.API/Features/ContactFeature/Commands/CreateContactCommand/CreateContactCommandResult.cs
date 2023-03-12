using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Abstraction;

namespace Web.API.Features.ContactFeature.Commands.CreateContactCommand;

public class CreateContactCommandResult : BaseCommandResult<CreateContactCommandResultDTO>
{
    public CreateContactCommandResult(CreateContactCommandResultDTO? value) : base(value)
    {
    }

    public CreateContactCommandResult(Exception? exception) : base(exception)
    {
    }

    public CreateContactCommandResult(Exception? exception, string? errorMessage) : base(exception, errorMessage)
    {
    }

    public CreateContactCommandResult(CreateContactCommandResultDTO? value, bool isSucceeded = true, Exception? exception = null, string? errorMessage = null) : base(value, isSucceeded, exception, errorMessage)
    {
    }
}
