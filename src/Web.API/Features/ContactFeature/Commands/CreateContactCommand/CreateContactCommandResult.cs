using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Features.ContactFeature.Commands.CreateContactCommand;

public record CreateContactCommandResult
{
    public CreateContactCommandResultDTO CreatedContact { get; set; }
}
