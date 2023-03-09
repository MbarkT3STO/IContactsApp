using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Interfaces;

namespace Web.API.Extensions;

public static class AuditableExtensions
{
    public static void WriteCreateAudit(this IAuditable entity)
    {
        entity.CreatedAt = DateTime.Now;
    }

    public static void WriteUpdateAudit(this IAuditable entity)
    {
        entity.UpdatedAt = DateTime.Now;
    }
}
