using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Web.API.Abstraction;

namespace Web.API.Features.AuthFeature.Queries.GetRefreshTokenQuery;

public class GetRefreshTokenQuery : IRequest<GetRefreshTokenQueryResult>
{
    public string RefreshToken { get; set; }
    public string UserId { get; set; }

    public GetRefreshTokenQuery(string refreshToken, string userId)
    {
        RefreshToken = refreshToken;
        UserId = userId;
    }
}

public class GetRefreshTokenQueryHandler : BaseQueryHandler, IRequestHandler<GetRefreshTokenQuery, GetRefreshTokenQueryResult>
{
    public GetRefreshTokenQueryHandler(AppDbContext context, IMapper mapper) : base(context, mapper)
    {
    }

    public async Task<GetRefreshTokenQueryResult> Handle(GetRefreshTokenQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var refreshToken = await _context.RefreshTokens
                .Where(x => x.Token == request.RefreshToken && x.UserId == request.UserId)
                .FirstOrDefaultAsync(cancellationToken);

            if (refreshToken == null)
                return new GetRefreshTokenQueryResult(null, "Refresh token not found");

            var refreshTokenDTO = _mapper.Map<GetRefreshTokenQueryResultDTO>(refreshToken);

            return new GetRefreshTokenQueryResult(refreshTokenDTO);
        }
        catch (Exception e)
        {
            return new GetRefreshTokenQueryResult(e);
        }
    }
}
