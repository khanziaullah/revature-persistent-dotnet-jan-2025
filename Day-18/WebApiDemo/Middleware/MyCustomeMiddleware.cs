public class MyCustomMiddlware
{
    Action<RequestDelegate> _next;

    public MyCustomeMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Handle()
    {

        _next();
    }
}