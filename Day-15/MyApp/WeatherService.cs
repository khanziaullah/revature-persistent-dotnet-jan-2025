// Weather Service

// interface
public interface IWeatherService
{
    double GetTemperature(string city);
    public IEnumerable<double> GetTemperatureSeries(string city);

}

// Concrete implementation

public class WeatherService : IWeatherService
{
    public double GetTemperature(string city)
    {
        // City is not found
        return 21;
    }

    public IEnumerable<double> GetTemperatureSeries(string city)
    {
        // City is not found
        yield return 21;
        yield return 22;
        yield return 23;
    }
}

public class MockWeatherService : IWeatherService
{
    public MockWeatherService()
    {
    }

    public double GetTemperature(string city)
    {
        return 24;
    }
    public IEnumerable<double> GetTemperatureSeries(string city)
    {
        throw new NotImplementedException();   
    }

}

// FakeItEasy
// Moq