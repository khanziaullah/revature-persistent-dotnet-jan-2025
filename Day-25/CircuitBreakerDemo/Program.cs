using System;
using System.Net.Http;
using System.Threading.Tasks;
using Polly;
using Polly.CircuitBreaker;

HttpClient client = new HttpClient();
int failureCount = 0;

// Simulate a failing service
var circuitBreakerPolicy = Policy
    .Handle<HttpRequestException>()
    .CircuitBreakerAsync(
        exceptionsAllowedBeforeBreaking: 2,
        durationOfBreak: TimeSpan.FromSeconds(10),
        onBreak: (ex, breakDelay) =>
        {
            Console.WriteLine($"Circuit broken! Will retry after {breakDelay.TotalSeconds} seconds.");
        },
        onReset: () =>
        {
            Console.WriteLine("Circuit reset. Service is healthy again.");
        },
        onHalfOpen: () =>
        {
            Console.WriteLine("Circuit half-open. Testing service...");
        }
    );

for (int i = 0; i < 1000; i++)
{
    try
    {
        await circuitBreakerPolicy.ExecuteAsync(async () =>
        {
            var result = await CallExternalService();
            Console.WriteLine(result);
        });
        Console.WriteLine("Request successful.");
    }
    catch (BrokenCircuitException)
    {
        Console.WriteLine("Circuit is open. Skipping request.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Request failed: {ex.Message}");
    }

    await Task.Delay(1000); // Wait 1 second between requests
}

Console.WriteLine("Press any key to exit.");
Console.ReadKey();

async Task<string> CallExternalService()
{
    var response = await client.GetAsync("http://localhost:5000/customer");
    response.EnsureSuccessStatusCode();
    return await response.Content.ReadAsStringAsync();
}
