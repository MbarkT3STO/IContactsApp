using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Web.API.Domain;
using Web.API.Identity;

namespace Web.API.Data;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(Program).Assembly);

        // Seed data
        SeedRoles(modelBuilder);
        SeedUsers(modelBuilder);
        SeedUserRoles(modelBuilder);

        base.OnModelCreating(modelBuilder);
    }

    public DbSet<Contact> Contacts { get; set; }
    public DbSet<Group> Groups { get; set; }

    public DbSet<AppUser> Users { get; set; }
    public DbSet<AppRole> Roles { get; set; }
    // public DbSet<AppUserRole> UserRoles { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }


    // Seed AppRoles
    private void SeedRoles(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AppRole>().HasData(
            new AppRole
            {
                Id = "1",
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new AppRole
            {
                Id = "2",
                Name = "User",
                NormalizedName = "USER"
            }
        );
    }

    // Seed AppUsers
    private void SeedUsers(ModelBuilder modelBuilder)
    {
        var hasher = new PasswordHasher<AppUser>();

        modelBuilder.Entity<AppUser>().HasData(
            new AppUser
            {
                Id = "1",
                UserName = "mbark",
                NormalizedUserName = "mbark",
                FirstName = "M'BARK",
                LastName = "T3STO",
                Email = "mbark@localhost.com",
                NormalizedEmail = "MBARK@LOCALHOST.COM",
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "123456"),
                CreatedAt = DateTime.Now
            },
            new AppUser
            {
                Id = "2",
                UserName = "user1",
                NormalizedUserName = "USER1",
                FirstName = "USER1",
                LastName = "USER1",
                Email = "user1@localhost.com",
                NormalizedEmail = "USER1@LOCALHOST.COM",
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "123456"),
                CreatedAt = DateTime.Now
            },
            new AppUser
            {
                Id = "3",
                UserName = "user2",
                NormalizedUserName = "USER2",
                FirstName = "USER2",
                LastName = "USER2",
                Email = "user2@localhost.com",
                NormalizedEmail = "USER2@LOCALHOST.COM",
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "123456"),
                CreatedAt = DateTime.Now
            }
        );
    }

    // Seed AppUserRoles
    private void SeedUserRoles(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<IdentityUserRole<string>>().HasData(
            new IdentityUserRole<string>
            {
                UserId = "1",
                RoleId = "1"
            },
            new IdentityUserRole<string>
            {
                UserId = "2",
                RoleId = "2"
            },
            new IdentityUserRole<string>
            {
                UserId = "3",
                RoleId = "2"
            }
        );
    }
}
