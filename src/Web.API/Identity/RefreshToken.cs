using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Identity;

public class RefreshToken
{
    public int Id { get; set; }
    public string Token { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public DateTime? RevokedAt { get; set; }
    public bool IsExpired { get; set; }
    public bool IsUsed { get; set; }
    public bool IsInvalidated { get; set; }
    public bool IsActive => !IsExpired && !IsUsed && !IsInvalidated;

    public string UserId { get; set; }
    public AppUser User { get; set; }
}
