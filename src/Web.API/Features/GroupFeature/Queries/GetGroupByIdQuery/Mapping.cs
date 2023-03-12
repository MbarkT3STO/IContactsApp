using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Domain;

namespace Web.API.Features.GroupFeature.Queries.GetGroupByIdQuery;

public class Mapping : Profile
{
    public Mapping()
    {
        CreateMap<Group, GetGroupByIdQueryResultDTO>();
    }
}