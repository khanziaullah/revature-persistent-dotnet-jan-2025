using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddCors();

builder.Services.AddDbContext<CrmDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CrmDb")));

builder.Services.AddScoped<CrmService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(configurePolicy: options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseRouting();

app.MapControllers();

app.Run();
