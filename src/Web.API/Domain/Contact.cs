using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.API.Identity;
using Web.API.Interfaces;

namespace Web.API.Domain;

public class Contact : IAuditable
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Company { get; set; }
    public string JobTitle { get; set; }
    public string ImageUrl { get; set; }
    public string Notes { get; set; }
    public int GroupId { get; set; }
    public Group Group { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int UserId { get; set; }
    public AppUser User { get; set; }
}
