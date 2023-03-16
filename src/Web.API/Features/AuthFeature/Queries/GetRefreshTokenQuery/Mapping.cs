using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Identity;

namespace Web.API.Features.AuthFeature.Queries.GetRefreshTokenQuery;

public class Mapping : Profile
{
    public Mapping()
    {
        CreateMap<RefreshToken, GetRefreshTokenQueryResultDTO>();
    }
}
