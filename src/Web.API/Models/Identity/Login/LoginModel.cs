using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Models.Identity.Login;

public class LoginModel
{
    public string Username { get; set; }
    public string Password { get; set; }
}
