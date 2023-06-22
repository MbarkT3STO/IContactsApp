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
        CreateMap<Group, GetGroupByIdQueryResultDTO>().ForMember(dest=> dest.Contacts, opt=>opt.MapFrom(src=>src.Contacts.Select(c=>new GetGroupByIdQueryResultDTO.Contact
		{
			Id = c.Id,
			Name = c.Name,
			Email = c.Email,
			ImageUrl = c.ImageUrl
		})));
    }
}