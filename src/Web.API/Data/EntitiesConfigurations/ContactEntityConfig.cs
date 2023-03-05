using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web.API.Domain;

namespace Web.API.Data.EntitiesConfigurations;

public class ContactEntityConfig : IEntityTypeConfiguration<Contact>
{
    public void Configure(EntityTypeBuilder<Contact> builder)
    {
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id).UseIdentityColumn();

        builder.Property(c => c.Name).IsRequired().HasMaxLength(50);
        builder.Property(c => c.Email).IsRequired().HasMaxLength(50);
        builder.Property(c => c.Phone).IsRequired().HasMaxLength(50);
        builder.Property(c => c.Address).IsRequired().HasMaxLength(50);
        builder.Property(c => c.Country).IsRequired().HasMaxLength(50);
        builder.Property(c => c.City).IsRequired().HasMaxLength(50);
        builder.Property(c => c.State).IsRequired().HasMaxLength(50);
        builder.Property(c => c.Company).IsRequired().HasMaxLength(50);
        builder.Property(c => c.JobTitle).IsRequired().HasMaxLength(50);

        builder.HasOne(c => c.Group).WithMany(g => g.Contacts).HasForeignKey(c => c.GroupId);
        builder.HasOne(c => c.User).WithMany(u => u.Contacts).HasForeignKey(c => c.UserId);
    }
}
