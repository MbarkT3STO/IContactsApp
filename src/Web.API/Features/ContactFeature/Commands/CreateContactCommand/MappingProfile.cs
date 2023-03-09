using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Web.API.Domain;

namespace Web.API.Features.ContactFeature.Commands.CreateContactCommand;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateContactCommand, Contact>();

        CreateMap<Contact, CreateContactCommandResultDTO>();
    }
}
