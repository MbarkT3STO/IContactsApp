using System;
using Web.API.Domain;

namespace Web.API.Features.ContactFeature.Queries.GetContactsByGroupQuery
{
	public class Mapping: Profile 
	{
		public Mapping()
		{
			CreateMap<Group, GetContactsByGroupQueryResultDTO>();
			CreateMap<Contact, GetContactsByGroupQueryResultContactDTO>();
		}
		
	}
}