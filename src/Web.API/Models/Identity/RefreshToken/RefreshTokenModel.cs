using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Models.Identity.RefreshToken;

public class RefreshTokenModel
{
    public string RefreshToken { get; set; }
    public string UserId { get; set; }
}
