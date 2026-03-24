var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS

app.UseCors(configurePolicy: options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/api/customers", async () =>
{
    return new List<Customer> {
        new(1, "John Doe", "0Fg7B@example.com", "Acme Inc."),
        new (2, "Jane Doe", "lM5Zu@example.com", "Acme Inc."),
        new (3, "Bob Smith", "0Fg7B@example.com", "Acme Inc."),
        new (4, "Alice Smith", "lM5Zu@example.com", "Acme Inc."),
        new (5, "Bob Johnson", "0Fg7B@example.com", "Acme Inc."),
        new (6, "Alice Johnson", "lM5Zu@example.com", "Acme Inc."),
        new (7, "Bob Williams", "0Fg7B@example.com", "Acme Inc."),
    };
});

app.MapGet("/api/customer/id", (id) =>
{
    return new Customer(1, "John Doe", "0Fg7B@example.com", "Acme Inc.");
});

app.MapPost("/api/customer", () =>
{
});

app.MapPut("/api/customer", () =>
{
});

app.MapDelete("/api/customer", (id) =>
{
    throw new NotImplementedException();
});

app.Run();

record Customer(int Id, string Name, string Email, string Company);

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
