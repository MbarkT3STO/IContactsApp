using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Web.API.Domain;

namespace Web.API.Features.GroupFeature.Queries.GetGroupsQuery;

public class Mapping : Profile
{
    public Mapping()
    {
        CreateMap<Group, GetGroupsQueryResultDTO>();
    }
}
