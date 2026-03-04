
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer;

// Top level statement
// public static async Task MainAsync(string[] args)

var builder = WebApplication.CreateBuilder(args);

// add appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// Dependency Root
builder.Services.AddControllers();

// Data Access Layer dependnecies
builder.Services.AddDataAccessLayer();


// Swagger API

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Version = "v1",
        Title = "Customer API",
        Description = "An ASP.NET Core Web API for managing customers"
    });
});


// AutoMapper
builder.Services.AddAutoMapper(config =>
{
    config.AddProfile<CustomerProfile>();
});

// Add Sql Server
builder.Services.AddDbContext<CrmDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CrmDbConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "CRM API v1");
        c.RoutePrefix = string.Empty;  // Swagger at root
    });
}


app.UseRouting();

app.MapControllers();

app.Run();
