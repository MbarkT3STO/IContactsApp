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

public record CreateContactCommand: IRequest<CreateContactCommandResult>
{
    public string Name { get; set; }
    public string? Email { get; set; }
    public string Phone { get; set; }
    public string? Address { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Company { get; set; }
    public string? JobTitle { get; set; }
    public string? ImageUrl { get; set; }
    public IFormFile? ImageFile { get; set; }
    public string? Notes { get; set; }
    public int GroupId { get; set; }
    public string UserId { get; set; }
}

public class CreateContactCommandHandler: BaseCommandHandler, IRequestHandler<CreateContactCommand, CreateContactCommandResult>
{
    public CreateContactCommandHandler(AppDbContext context, IMapper mapper): base(context, mapper) { }

    public async Task<CreateContactCommandResult> Handle(CreateContactCommand request, CancellationToken cancellationToken
    )
    {
        try
        {
            var isExists = await _context.Contacts.AnyAsync(
                x => x.Name == request.Name && x.UserId == request.UserId,
                cancellationToken
            );

            if (isExists)
                return new CreateContactCommandResult(
                    new RecordAlreadyExistException(
                        $"Contact with name ({request.Name}) already exist"
                    )
                );

            if (request.ImageFile != null)
                request.ImageUrl = await SaveImageAsync(request.ImageFile);

            FixEmptyValues(request);

            var contact = _mapper.Map<Contact>(request);

            contact.WriteCreateAudit();

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync(cancellationToken);

            var dto    = _mapper.Map<CreateContactCommandResultDTO>(contact);
            var result = new CreateContactCommandResult(dto);

            return result;
        }
        catch (Exception ex)
        {
            return new CreateContactCommandResult(ex);
        }
    }

    /// <summary>
    /// Save Contact Image to server
    /// </summary>
    /// <param name="imageFile">Contact Image</param>
    /// <returns>Image Url in server to save in database</returns>
    private static Task<string> SaveImageAsync(IFormFile imageFile)
    {
        var folderName = Path.Combine("Resources", "Images");
        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
        var fullPath = Path.Combine(pathToSave, fileName);
        var dbPath   = Path.Combine(folderName, fileName);

        using var stream = new FileStream(fullPath, FileMode.Create);
        imageFile.CopyTo(stream);

        return Task.FromResult(dbPath);
    }

    /// <summary>
    /// Fix empty values to avoid null exception
    /// </summary>
    private static void FixEmptyValues(CreateContactCommand request)
    {
        if (request.Email.IsNullOrEmpty())
            request.Email = string.Empty;

        if (request.Address.IsNullOrEmpty())
            request.Address = string.Empty;

        if (request.Country.IsNullOrEmpty())
            request.Country = string.Empty;

        if (request.City.IsNullOrEmpty())
            request.City = string.Empty;

        if (request.State.IsNullOrEmpty())
            request.State = string.Empty;

        if (request.Company.IsNullOrEmpty())
            request.Company = string.Empty;

        if (request.JobTitle.IsNullOrEmpty())
            request.JobTitle = string.Empty;

        if (request.ImageUrl.IsNullOrEmpty())
            request.ImageUrl = string.Empty;

        if (request.Notes.IsNullOrEmpty())
            request.Notes = string.Empty;
    }
}
