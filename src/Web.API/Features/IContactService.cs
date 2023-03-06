using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Domain;

namespace Web.API.Features;

public interface IContactService
{
    Task<IEnumerable<Contact>> GetAsync();
    Task<Contact> GetAsync(int id);
    Task<Contact> CreateAsync(Contact contact);
    Task UpdateAsync(Contact contact);
    Task DeleteAsync(int id);
}
