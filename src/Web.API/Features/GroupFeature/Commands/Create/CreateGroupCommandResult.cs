using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Abstraction;

namespace Web.API.Features.GroupFeature.Commands.Create;

public class CreateGroupCommandResult : BaseCommandResult<CreateGroupCommandResultDTO>
{
    public CreateGroupCommandResult(CreateGroupCommandResultDTO? value) : base(value)
    {
    }

    public CreateGroupCommandResult(Exception? exception) : base(exception)
    {
    }

    public CreateGroupCommandResult(Exception? exception, string? errorMessage) : base(exception, errorMessage)
    {
    }

    public CreateGroupCommandResult(CreateGroupCommandResultDTO? value, bool isSucceeded = true, Exception? exception = null, string? errorMessage = null) : base(value, isSucceeded, exception, errorMessage)
    {
    }
}
