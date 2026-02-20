using MyApp;

namespace MyApp.Tests;
// Req -> Analysis/Design -> Development -> Testing -> Deployment
// Req -> Analysis/Design -> Testing -> Development -> Deployment

public class CalculatorTests
{
    [Fact]
    public void Add_TwoNumbers_GivesCorrectResult()
    {
        // Arrange
        var calculator = new Calculator();
        // system under test
        // var sut = new Calculator();

        // manual calculation
        var x = 5;
        var y = 10;
        var expectedResult = 15;

        // Act
        var actualResult = calculator.Add(x, y);

        // Assert
        Assert.Equal(expected: expectedResult, actual: actualResult);
    }
}