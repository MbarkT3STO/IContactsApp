using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Web.API.Data;
using Web.API.Domain;
using static Web.API.Features.ContactFeature.Queries.GetContactsQuery.GetContactsQuery;

namespace Web.API.Features.ContactFeature.Queries.GetContactsQuery;

public class GetContactsQuery : IRequest<GetContactsQueryResult>
{
    public class GetContactsQueryHandler : IRequestHandler<GetContactsQuery, GetContactsQueryResult>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public GetContactsQueryHandler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GetContactsQueryResult> Handle(GetContactsQuery request, CancellationToken cancellationToken)
        {
            var contacts = await _context.Contacts
                .Include(c => c.Group)
                .ToListAsync(cancellationToken);

            var result = new GetContactsQueryResult
            {
                Contacts = _mapper.Map<IEnumerable<GetContactsQueryDTO>>(contacts)
            };

            return result;
        }

    }


    public class GetContactsQueryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Company { get; set; }
        public string JobTitle { get; set; }
        public string ImageUrl { get; set; }
        public string Notes { get; set; }
        public int GroupId { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string UserId { get; set; }
    }

    public class GetContactsQueryResult
    {
        public IEnumerable<GetContactsQueryDTO> Contacts { get; set; }
    }


    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Contact, GetContactsQueryDTO>();
        }
    }

}

