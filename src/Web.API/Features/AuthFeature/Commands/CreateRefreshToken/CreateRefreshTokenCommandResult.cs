using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Abstraction;

namespace Web.API.Features.AuthFeature.Commands.CreateRefreshToken;

public class CreateRefreshTokenCommandResult : BaseCommandResult<CreateRefreshTokenCommandResultDTO>
{
    public CreateRefreshTokenCommandResult(CreateRefreshTokenCommandResultDTO? value) : base(value)
    {
    }

    public CreateRefreshTokenCommandResult(Exception? exception) : base(exception)
    {
    }

    public CreateRefreshTokenCommandResult(Exception? exception, string? errorMessage) : base(exception, errorMessage)
    {
    }

    public CreateRefreshTokenCommandResult(CreateRefreshTokenCommandResultDTO? value, bool isSucceeded = true, Exception? exception = null, string? errorMessage = null) : base(value, isSucceeded, exception, errorMessage)
    {
    }
}
