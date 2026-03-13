

ICommand createCustomerCommand = new CreateCustomerCommand();
createCustomerCommand.Execute();

// SOLID
CreateCustomer();

void CreateCustomer()
{
    Console.WriteLine("Creating customer directly ");
}

public interface ICommand
{
    void Execute();
}

public class CreateCustomerCommand : ICommand
{
    public void Execute()
    {
        Console.WriteLine("Create Customer");
    }
}