using MediatR;
using Web.API.Features.ContactFeature.Queries;

namespace Web.API.Extensions;

public static class DIExtensions
{
    public static void AddAutoMapper(this WebApplicationBuilder builder)
    {
        builder.Services.AddAutoMapper(typeof(Program).Assembly);
    }

    public static void AddMediatR(this WebApplicationBuilder builder)
    {
        builder.Services.AddMediatR(typeof(GetContactsQuery).Assembly);
    }

}
