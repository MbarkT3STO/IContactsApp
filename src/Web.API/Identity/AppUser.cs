using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Web.API.Domain;

namespace Web.API.Identity;

public class AppUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Contact> Contacts { get; set; }
    public virtual ICollection<Group> Groups { get; set; }
    public virtual ICollection<AppUserRole> UserRoles { get; set; }
}
