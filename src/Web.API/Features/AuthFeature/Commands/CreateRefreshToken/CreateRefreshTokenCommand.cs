using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Abstraction;

namespace Web.API.Features.AuthFeature.Commands.CreateRefreshToken;

public class CreateRefreshTokenCommand : IRequest<CreateRefreshTokenCommandResult>
{
    public string UserId { get; set; }

    public CreateRefreshTokenCommand(string userId)
    {
        UserId = userId;
    }
}

public class CreateRefreshTokenCommandHandler : BaseCommandHandler, IRequestHandler<CreateRefreshTokenCommand, CreateRefreshTokenCommandResult>
{
    public CreateRefreshTokenCommandHandler(AppDbContext context, IMapper mapper) : base(context, mapper)
    {
    }

    public async Task<CreateRefreshTokenCommandResult> Handle(CreateRefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var refreshToken = new Identity.RefreshToken
        {
            UserId = request.UserId,
            Token = Guid.NewGuid().ToString(),
            CreatedAt = DateTime.UtcNow.ToLocalTime(),
            ExpiresAt = DateTime.UtcNow.ToLocalTime().AddHours(1),
        };

        await _context.RefreshTokens.AddAsync(refreshToken, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        var value = _mapper.Map<CreateRefreshTokenCommandResultDTO>(refreshToken);

        var result = new CreateRefreshTokenCommandResult(value);

        return result;
    }
}
