
var avgCalc = new AverageCalculation();

var app = new MyCalcApp(avgCalc);

app.CalculateAverageHO();

public interface IAverageCalculation
{
    int[] GetValues();
}

public class AverageCalculation : IAverageCalculation
{
    public int[] GetValues()
    {
        // Complicated DB code
        return new int[] { 10, 10, 10, 10, 10 };
    }

}

public class MyCalcApp
{
    IAverageCalculation calc;

    public MyCalcApp(IAverageCalculation calc)
    {
        this.calc = calc;
    }

    public double CalculateAverageHO()
    {
        var values = calc.GetValues();

        var average = values.Average();
        Console.WriteLine($"Average: {average}");

        return average;
    }

}