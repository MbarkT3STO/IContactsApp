using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.API.Features.ContactFeature.Queries.GetContactByIdQuery;

public class GetContactByIdQueryResultDTO
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

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UserId { get; set; }
}
