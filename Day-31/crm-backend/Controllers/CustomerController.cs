

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CustomerController : ControllerBase
{
    CrmService crmService;

    public CustomerController(CrmService crmService)
    {
        this.crmService = crmService;

    }
    [HttpGet]
    public async Task<IActionResult> GetCustomers() =>
         Ok(await crmService.GetCustomers());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetCustomerById(int id) =>
         Ok(await crmService.GetCustomersById(id));

    // app.MapGet("/api/customers/{id}", async (int id) =>
    // {
    //     var crmService = app.Services.GetRequiredService<CrmService>();
    //     return ;
    // });

    // app.MapPost("/api/customer", () =>
    // {
    // });

    // app.MapPut("/api/customer", () =>
    // {
    // });

    // app.MapDelete("/api/customer", (id) =>
    // {
    //     throw new NotImplementedException();
    // });

}