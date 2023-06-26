using System;
using Microsoft.EntityFrameworkCore;
using Web.API.Abstraction;
using Web.API.Exceptions;

namespace Web.API.Features.ContactFeature.Commands.DeleteContactCommand
{
	public class DeleteContactCommand : IRequest<DeleteContactCommandResult>
	{
		public int Id { get; set; }
		public string UserId { get; set; } = null!;
	}
	
	public class DeleteContactCommandHandler : BaseCommandHandler, IRequestHandler<DeleteContactCommand, DeleteContactCommandResult>
	{
		public DeleteContactCommandHandler(AppDbContext context, IMapper mapper) : base(context, mapper)
		{
		}

		public async Task<DeleteContactCommandResult> Handle(DeleteContactCommand request, CancellationToken cancellationToken)
		{
			try
			{
				var contact = await _context.Contacts.FirstOrDefaultAsync(x => x.Id == request.Id && x.UserId == request.UserId, cancellationToken: cancellationToken);

				if (contact == null)
					return new DeleteContactCommandResult(new RecordIsNotExistException($"Contact with id ({request.Id}) not found"));
					
				_context.Contacts.Remove(contact);
				await _context.SaveChangesAsync(cancellationToken);

				var resultDto = new DeleteContactCommandResultDTO
				{
					Id = contact.Id,
					IsDeleted = true,
					DeletedAt = DateTime.UtcNow,
				};
				
				return new DeleteContactCommandResult(resultDto);
			}
			catch (Exception exception)
			{
				return new DeleteContactCommandResult(exception, exception.Message);
			}
		}
	}
}