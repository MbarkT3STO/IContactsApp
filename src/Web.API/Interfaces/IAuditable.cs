using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Identity;

namespace Web.API.Interfaces;

public interface IAuditable
{
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public string UserId { get; set; }
    public AppUser User { get; set; }
}
