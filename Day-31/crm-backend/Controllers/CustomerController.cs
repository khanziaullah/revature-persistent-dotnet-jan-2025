

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    CrmService crmService;

    public CustomersController(CrmService crmService)
    {
        this.crmService = crmService;

    }
    [HttpGet]
    public async Task<IActionResult> GetCustomers() =>
         Ok(await crmService.GetCustomers());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetCustomerById(int id) =>
         Ok(await crmService.GetCustomersById(id));

    [HttpPost]
    public async Task<IActionResult> AddCustomer([FromBody] Customer customer)
    {
        await crmService.AddCustomer(customer);
        return Created();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateCustomer([FromBody] Customer customer)
    {
        await crmService.UpdateCustomer(customer);
        return NoContent();
    }

    [HttpDelete("id:int")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        await crmService.DeleteCustomer(id);
        return NoContent();
    }
}