using FakeItEasy;
using Moq;

namespace MyApp.Tests;

public class WeatherServiceTests
{
    //[Fact]
    //public void GetWeather_ReturnsExpectedResult()
    //{
    //    // Arrange
    //    // IWeatherService weatherService = new WeatherService();

    //    var mockWeatherService = new Mock<IWeatherService>();

    //    mockWeatherService
    //        .Setup(x => x.GetTemperature(It.IsAny<string>()))
    //        .Returns(
    //            new List<double> { 30, 32, 28, 31, 29 }
    //        );
    //    var weatherService = mockWeatherService.Object;

    //    var expectedCount = 5;


    //    // Act
    //    var result = weatherService.GetTemperature("New York");
    //    var actualCount = result.Count();

    //    foreach (var temp in result)
    //    {
    //        Console.WriteLine(temp);
    //    }

    //    // Assert
    //    //Assert.Equal(1, mockWeatherService);
    //    Assert.NotNull(result);
    //    Assert.Equal(expectedCount, actualCount);
    //}


    //[Fact]
    //public void GetWeather_ThrowsException()
    //{
    //    // Arrange
    //    // IWeatherService weatherService = new WeatherService();

    //    var mockWeatherService = new Mock<IWeatherService>();

    //    mockWeatherService
    //        .Setup(x => x.GetTemperature(It.IsAny<string>()))
    //        .Throws(new Exception("City Not Found"));
    //    var weatherService = mockWeatherService.Object;


    //    // Assert
    //    //Assert.Equal(1, mockWeatherService);
    //    Assert.Throws<Exception>(() => weatherService.GetTemperature("Some dummy city"));
    //}

    //[Fact]
    //public void FakeItEasyTests()
    //{
    //    // Arrange
    //    var weatherService = A.Fake<IWeatherService>();

    //    //A.CallTo(() => weatherService.GetTemperature("London")).Returns<double>(25.0);
    //    A.CallTo(() => weatherService.GetTemperatureSeries("London")).Returns<IEnumerable<double>>(new List<double> { 10, 20, 30 });

    //    var actualTemp = 20;


    //    // Act
    //    var expectedTemp = weatherService.GetTemperature("London");

    //    // Assert
    //    Assert.Equal(expectedTemp, actualTemp);
    //}

    [Fact]
    public void MyCalcAppTest()
    {
        var mockAvgCalc = A.Fake<IAverageCalculation>();

        A.CallTo(() => mockAvgCalc.GetValues()).Returns<int[]>(new int[] { 40, 50, 60 });


        // Arrange
        var myCalcApp = new MyCalcApp(mockAvgCalc);

        // Act
        var actualAvg = myCalcApp.CalculateAverageHO();
        var expectedAvg = 50.0;

        // Assert

        Assert.Equal(expectedAvg, actualAvg);
    }
}