using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Identity;
using Web.API.Interfaces;

namespace Web.API.Domain;

public class Group : IAuditable
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int UserId { get; set; }
    public AppUser User { get; set; }

    public List<Contact> Contacts { get; set; }
}
