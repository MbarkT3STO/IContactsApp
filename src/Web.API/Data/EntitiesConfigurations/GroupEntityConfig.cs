using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web.API.Domain;

namespace Web.API.Data.EntitiesConfigurations;

public class GroupEntityConfig : IEntityTypeConfiguration<Group>
{
    public void Configure(EntityTypeBuilder<Group> builder)
    {
        builder.HasKey(g => g.Id);
        builder.Property(g => g.Id).UseIdentityColumn();

        builder.Property(g => g.Name).IsRequired().HasMaxLength(50);
        builder.Property(g => g.Description).IsRequired().HasMaxLength(50);

        builder.HasOne(g => g.User).WithMany(u => u.Groups).HasForeignKey(g => g.UserId).OnDelete(DeleteBehavior.NoAction);
    }
}
