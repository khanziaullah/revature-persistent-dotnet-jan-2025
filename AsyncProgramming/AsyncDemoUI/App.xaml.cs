using System.Configuration;
using System.Data;
using System.Windows;

namespace AsyncDemoUI;

/// <summary>
/// Interaction logic for App.xaml
/// </summary>
public partial class App : Application
{
    protected override void OnActivated(EventArgs e)
    {
        base.OnActivated(e);
        Console.WriteLine("App is activated up...");
        Task.Run(async ()=>
        {
            Console.WriteLine("Delay started");
            await Task.Delay(5000);
            Console.WriteLine("Delay ended");

        });
    }
}
