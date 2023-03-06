using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Data;
using Web.API.Domain;

namespace Web.API.Features;

public class ContactService : IContactService
{
    private readonly AppDbContext _context;

    public ContactService(AppDbContext context)
    {
        _context = context;
    }

    public Task<Contact> CreateAsync(Contact contact)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Contact>> GetAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Contact> GetAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(Contact contact)
    {
        throw new NotImplementedException();
    }
}
