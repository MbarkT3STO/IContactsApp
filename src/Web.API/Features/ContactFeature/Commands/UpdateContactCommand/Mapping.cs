using System;
using Web.API.Domain;

namespace Web.API.Features.ContactFeature.Commands.UpdateContactCommand
{
    public class Mapping : Profile
    {
        public Mapping()
        {
        	CreateMap<Contact, UpdateContactCommandResultDTO>();
        }
    }
}