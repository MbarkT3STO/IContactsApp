using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Web.API.Identity;

public class AppRole : IdentityRole
{
    public virtual ICollection<IdentityUserRole<string>> UserRoles { get; set; }
}
