using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Abstraction;
using Web.API.Domain;
using Web.API.Extensions;

namespace Web.API.Features.GroupFeature.Commands.Create;

public class CreateGroupCommand : IRequest<CreateGroupCommandResult>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string UserId { get; set; }

    public CreateGroupCommand(string name, string description, string userId)
    {
        Name = name;
        Description = description;
        UserId = userId;
    }
}

public class CreateGroupCommandHandler : BaseCommandHandler, IRequestHandler<CreateGroupCommand, CreateGroupCommandResult>
{
    public CreateGroupCommandHandler(AppDbContext context, IMapper mapper) : base(context, mapper)
    {
    }

    public async Task<CreateGroupCommandResult> Handle(CreateGroupCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var group = _mapper.Map<Group>(request);

            group.WriteCreateAudit();

            await _context.Groups.AddAsync(group, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            var value = _mapper.Map<CreateGroupCommandResultDTO>(group);

            var result = new CreateGroupCommandResult(value);

            return result;
        }
        catch (Exception ex)
        {
            return new CreateGroupCommandResult(ex);
        }
    }
}
