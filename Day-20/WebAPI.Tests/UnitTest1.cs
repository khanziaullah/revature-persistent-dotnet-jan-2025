namespace WebAPI.Tests;

using WebAPI.Controllers;
using DataAccessLayer;

public class UnitTest1
{
    [Fact]
    //[Theory]
    //[InlineData(1, 2, 3, 4)]
    public void Customer_CalculateInterest_ReturnsCorrectValue()
    // public void Customer_CalculateInterest_ReturnsCorrectValue(int duration, int principal, int rate, int expectedInterest)
    {
        // Arrange
        // controller, services
        ICustomerService customerService = A.Fake<ICustomerService>();
        IMapper mapper = null;
        IValidator<CreateCustomerDTO> createCustomerDTOValidator = null;

        customerService.GetAllCustomers().Returns(new List<Customer>
        {
            new Customer
            {
                Id = 1,
                Name = "John Doe",
                Email = "john.doe@example.com"
            }
        });

        var customerController = new CustomerController(customerService, mapper, createCustomerDTOValidator);

        var expectedResult = new
        {
            StatusCode = 200,
            Value = new List<Customer> {
            new Customer
            {
                Id = 1,
                Name = "John Doe",
                Email = "john.doe@example.com"
            }}
        };

        // Act
        var actualResult = customerController.Get(1);


        // Assert
        // Check of Status Code is 200
        // Check of Interest is correct
        Assert.Equal(expectedResult.StatusCode, (actualResult as OkObjectResult).StatusCode);
        Assert.Equal(expectedResult.Interest, (actualResult as OkObjectResult).Value);
    }
}