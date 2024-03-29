using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Web.API.Data;
using Web.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add DB Context
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.AddAutoMapper();
builder.AddMediatR();

builder.AddCustomOptions();

builder.AddIdentity();
builder.AddAuthentication();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.ConfigureStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
