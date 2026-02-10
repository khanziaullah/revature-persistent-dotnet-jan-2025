namespace DelegatesDemo;

class Program
{
    static void Main(string[] args)
    {
        DelegatesDemoApp app = new DelegatesDemoApp();
        app.Run();
    }
}

class DelegatesDemoApp
{
    //void Add(int a, int b)
    delegate void MathOperation(int a, int b);

    public void Run()
    {
        MathOperation operation = Subtract;

        operation(5, 3);
    }

    public void Add(int a, int b)
    {
        Console.WriteLine($"The sum of {a} and {b} is: {a + b}");
    }

    public void Subtract(int a, int b)
    {
        Console.WriteLine($"The difference between {a} and {b} is: {a - b}");
    }
}