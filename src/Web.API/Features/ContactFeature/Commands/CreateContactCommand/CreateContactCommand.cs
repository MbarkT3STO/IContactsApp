using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Web.API.Data;
using Web.API.Domain;

namespace Web.API.Features.ContactFeature.Commands.CreateContactCommand;

public record CreateContactCommand : IRequest<CreateContactCommandResult>
{
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
    public string UserId { get; set; }
}

public class CreateContactCommandHandler : IRequestHandler<CreateContactCommand, CreateContactCommandResult>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public CreateContactCommandHandler(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<CreateContactCommandResult> Handle(CreateContactCommand request, CancellationToken cancellationToken)
    {
        var contact = _mapper.Map<Contact>(request);
        contact.CreatedAt = DateTime.Now;
        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync(cancellationToken);
        return new CreateContactCommandResult { CreatedContact = _mapper.Map<CreateContactCommandResultDTO>(contact) };
    }
}
