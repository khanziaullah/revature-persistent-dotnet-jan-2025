using System.ComponentModel.DataAnnotations;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;

/// <summary>
/// API endpoitn to create customers
/// </summary>
[ApiController]
[Route("api/v1/[controller]")]
public class CustomerController : ControllerBase
{
    // In memory caching
    // IMemoryCache _cache;

    // Redis Caching
    IDistributedCache _cache;
    ICustomerService customerService;
    IMapper mapper;

    IValidator<CreateCustomerDTO> createCustomerDTOValidator;

    public CustomerController(ICustomerService customerService, IMapper mapper, IValidator<CreateCustomerDTO> createCustomerDTOValidator, IDistributedCache cache)
    {
        this.customerService = customerService;
        this.mapper = mapper;
        this.createCustomerDTOValidator = createCustomerDTOValidator;
        this._cache = cache;
    }

    /// <summary>
    ///
    /// </summary>
    /// <returns> 200 -
    /// List of Customers.
    /// </returns>
    [HttpGet]
    public IActionResult Get()
    {
        var customers = customerService.GetAllCustomers();

        // DRY -
        // Violation of Single Responsibility
        // Remove Manual mapping and replace with Automapper
        // var customerDTOs = customers.Select(c => new CustomerDTO
        // {
        //     FullName = c.Name
        // }).ToList();
        // Refactoring -

        // AutoMapper
        var customerDTOs = mapper.Map<List<CustomerDTO>>(customers);
        foreach (var customerDTO in customerDTOs)
        {
            var customerRequestUrl = HttpContext.Request.GetDisplayUrl();
            customerDTO.RequestUrl = customerRequestUrl;
        }
        return Ok(customerDTOs);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCustomerById(int id)
    {
        if(ModelState.IsValid) throw new NOt("Invalid model");
        // Try to get the customer from cache
        // var cachedCustomer = await _cache.GetStringAsync($"customer_{id}");
        // if (cachedCustomer != null)
        // {
        //     return Ok(cachedCustomer);
        // }

        // await Task.Delay(5000); // Simulate a delay for database access

        var customer = customerService.GetAllCustomers().FirstOrDefault(c => c.Id == id);
        if (customer == null)
        {
            return NotFound();
        }

        // // Cache the customer data for future requests
        // await _cache.SetStringAsync($"customer_{id}", customer.Name, new DistributedCacheEntryOptions
        // {
        //     AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
        // });

        var customerDTO = mapper.Map<CustomerDTO>(customer);


        var customerRequestUrl = HttpContext.Request.GetDisplayUrl();
        customerDTO.RequestUrl = customerRequestUrl;

        return Ok(customerDTO);
    }


    [HttpPost]
    public IActionResult Post(CreateCustomerDTO createCustomerDTO)
    {

        var validationResult = createCustomerDTOValidator.Validate(createCustomerDTO);

        if (validationResult.IsValid == false)
        {
            return BadRequest(validationResult.Errors);
        }

        // if(ModelState.IsValid)
        // {
        //     // Map CreateCustomerDTO to Customer
        //     return BadRequest(ModelState);
        // }

        return Ok(createCustomerDTO);
    }
}


// DB - Domain Entity
class Custmer
{
    public int Id;

    public string name;

    pulic string lastname;
    public int age;


    public bool IsDeleted;

    // Audit Before
    public string CreatedBy;
    public DateTime CreateDate;
    public string UpdatedBy;
    public DateTime UpdateDate;
    public string DeletedBy;
    public DateTime DeleteDate;
}

public record CreateCustomerDTO([MinLength(3)]string fullname, int age);

public record CreateCustomerCommand(string name, int age) : IRequest<CreateCustomerResponseDTO>;

// AutoMapper

dotnet add package AutoMapper;

// DRY - Do not repeat
CustomerProfile<Customer, CreateCustomerDTO> : Profile
{
    CustomerProfile()
    {
        Map<Custoemr, CtusomerDTO>.Source().Destination();
    }
}


IMapper;

mapper.Map<custoemr, customerdto>;


FLuentValidation;


IndianAddressValidations : AbstractValidator
{
    ctor()
    {
        RuleSet(zip).Lenght(6).IsNull().IsEmpty().MEsage("Vlidation message")");
        RuleSet(age).MinLenght(3).IsNull().IsEmpty().MEsage("Vlidation message")");
    }

}

AmericanAddValidations : AbstractValidator
{
    ctor()
    {
        RuleSet(zip).MinLenght(3).IsNull().IsEmpty().MEsage("5-4")");
        RuleSet(age).MinLenght(3).IsNull().IsEmpty().MEsage("Vlidation message")");
    }

}