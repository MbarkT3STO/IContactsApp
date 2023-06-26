using System;
using Microsoft.EntityFrameworkCore;
using Web.API.Abstraction;
using Web.API.Domain;
using Web.API.Exceptions;
using Web.API.Extensions;

namespace Web.API.Features.ContactFeature.Commands.UpdateContactCommand
{
	public class UpdateContactCommand: IRequest<UpdateContactCommandResult>
	{
		public int Id { get; set; }
		public string NewName { get; set; }
		public string? NewEmail { get; set; }
		public string NewPhone { get; set; }
		public string? NewAddress { get; set; }
		public string? NewCountry { get; set; }
		public string? NewCity { get; set; }
		public string? NewState { get; set; }
		public string? NewCompany { get; set; }
		public string? NewJobTitle { get; set; }
		public IFormFile? NewImageFile { get; set; }
		public string? NewNotes { get; set; }
		public int NewGroupId { get; set; }
		public string UserId { get; set; }
	}


	public class UpdateContactCommandHandler: BaseCommandHandler, IRequestHandler<UpdateContactCommand, UpdateContactCommandResult>
	{
		public UpdateContactCommandHandler(AppDbContext context, IMapper mapper): base(context, mapper)
		{
		}

		public async Task<UpdateContactCommandResult> Handle(UpdateContactCommand request, CancellationToken cancellationToken)
		{
			try
			{
				var contact = await _context.Contacts.FirstOrDefaultAsync(x => x.Id == request.Id && x.UserId == request.UserId, cancellationToken);

				if (contact == null)
					return new UpdateContactCommandResult(new RecordIsNotExistException($"Contact with id ({request.Id}) not found"));

				var isExists = await _context.Contacts.AnyAsync(x => x.Name == request.NewName && x.Id != request.Id && x.UserId == request.UserId, cancellationToken);

				if (isExists)
					return new UpdateContactCommandResult(new RecordAlreadyExistException($"Contact with name ({request.NewName}) already exist"));

				// Update Contact
				await UpdateContactAsync(contact, request);

				await _context.SaveChangesAsync(cancellationToken);
				await _context.Entry(contact).ReloadAsync(cancellationToken);

				var resultDto = _mapper.Map<UpdateContactCommandResultDTO>(contact);

				return new UpdateContactCommandResult(resultDto);
			}
			catch (Exception exception)
			{
				return new UpdateContactCommandResult(exception);
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
			var dbPath   = folderName + "/" + fileName;

			using var stream = new FileStream(fullPath, FileMode.Create);
			imageFile.CopyTo(stream);

			return Task.FromResult(dbPath);
		}


		/// <summary>
		/// Fix empty values to avoid null exception
		/// </summary>
		private static void FixEmptyValues(UpdateContactCommand request)
		{
			if (request.NewEmail.IsNullOrEmpty())
				request.NewEmail = string.Empty;

			if (request.NewAddress.IsNullOrEmpty())
				request.NewAddress = string.Empty;

			if (request.NewCountry.IsNullOrEmpty())
				request.NewCountry = string.Empty;

			if (request.NewCity.IsNullOrEmpty())
				request.NewCity = string.Empty;

			if (request.NewState.IsNullOrEmpty())
				request.NewState = string.Empty;

			if (request.NewCompany.IsNullOrEmpty())
				request.NewCompany = string.Empty;

			if (request.NewJobTitle.IsNullOrEmpty())
				request.NewJobTitle = string.Empty;

			if (request.NewNotes.IsNullOrEmpty())
				request.NewNotes = string.Empty;
		}
		private static async Task UpdateContactAsync(Contact contact, UpdateContactCommand request)
		{
			FixEmptyValues(request);
			
			contact.Name      = request.NewName;
			contact.Email     = request.NewEmail;
			contact.Phone     = request.NewPhone;
			contact.Address   = request.NewAddress;
			contact.Country   = request.NewCountry;
			contact.City      = request.NewCity;
			contact.State     = request.NewState;
			contact.Company   = request.NewCompany;
			contact.JobTitle  = request.NewJobTitle;
			contact.ImageUrl  = request.NewImageFile != null ? await SaveImageAsync(request.NewImageFile) : contact.ImageUrl;
			contact.Notes     = request.NewNotes;
			contact.GroupId   = request.NewGroupId;
			contact.UpdatedAt = DateTime.UtcNow;
		}
		
		
	}
}