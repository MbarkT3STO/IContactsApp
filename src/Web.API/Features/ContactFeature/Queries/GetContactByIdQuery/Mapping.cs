using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Domain;

namespace Web.API.Features.ContactFeature.Queries.GetContactByIdQuery;

public class Mapping : Profile
{
    public Mapping()
    {
        CreateMap<Contact, GetContactByIdQueryResultDTO>();
    }
}
