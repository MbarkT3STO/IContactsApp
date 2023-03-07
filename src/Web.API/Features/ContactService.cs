using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Data;
using Web.API.Domain;
using Web.API.Interfaces;

namespace Web.API.Features;

public class ContactService : IContactService
{
    private readonly AppDbContext _context;

    public ContactService(AppDbContext context)
    {
        _context = context;
    }

    public Task<IEnumerable<Contact>> GetAsync()
    {
        var contacts = _context.Contacts.ToList();
        return Task.FromResult(contacts.AsEnumerable());
    }

    public async Task<Contact> CreateAsync(Contact contact)
    {
        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync();

        return contact;
    }

    public async Task<Contact> GetAsync(int id)
    {
        var contact = await _context.Contacts.FindAsync(id);
        return contact;
    }

    public async Task UpdateAsync(Contact contact)
    {
        _context.Contacts.Update(contact);
        await _context.SaveChangesAsync();
    }
    public async Task DeleteAsync(int id)
    {
        var contact = _context.Contacts.Find(id);
        _context.Contacts.Remove(contact);
        await _context.SaveChangesAsync();
    }
}
