using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Web.API.Abstraction;
using Web.API.Data;
using Web.API.Domain;
using Web.API.Exceptions;
using Web.API.Extensions;

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

public class CreateContactCommandHandler : BaseCommandHandler, IRequestHandler<CreateContactCommand, CreateContactCommandResult>
{
    public CreateContactCommandHandler(AppDbContext context, IMapper mapper) : base(context, mapper)
    {
    }

    public async Task<CreateContactCommandResult> Handle(CreateContactCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var isExists = await _context.Contacts.AnyAsync(x => x.Name == request.Name && x.UserId == request.UserId, cancellationToken);

            if (isExists)
                return new CreateContactCommandResult(new RecordAlreadyExistException($"Contact with name ({request.Name}) already exist"));

            var contact = _mapper.Map<Contact>(request);

            contact.WriteCreateAudit();

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync(cancellationToken);

            var dto = _mapper.Map<CreateContactCommandResultDTO>(contact);

            var result = new CreateContactCommandResult(dto);

            return result;
        }
        catch (Exception ex)
        {
            return new CreateContactCommandResult(ex);
        }

    }
}
