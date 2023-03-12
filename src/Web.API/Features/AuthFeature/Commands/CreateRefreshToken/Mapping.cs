using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Features.AuthFeature.Commands.CreateRefreshToken;

public class Mapping : Profile
{
    public Mapping()
    {
        CreateMap<Identity.RefreshToken, CreateRefreshTokenCommandResultDTO>();
    }
}
