// Microsoft SQL Server
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

// mySQL
// using MySql.Data.SqlClient;

// // create console application builder
var builder = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json");

// Connection
// var connectionString = builder.GetConnectionString("CrmDbConnection");
var connectionString = builder.Build().GetConnectionString("CrmDb");

// for disposing connection object
//using (var connection = new SqlConnection(connectionString))
//{
//}

using var connection = new SqlConnection(connectionString);



try
{
    connection.Open();
    Console.WriteLine("Connection opened successfully.");
    // Execute Reader
    // ExecuteReader(connection);

    // Execute NonQuery
    // ExecuteNonQuery(connection);

    // Execute Scalar
    // ExecuteScalar(connection);

    // SQL Data Adapater
    // SqlDataAdapeterDemo(connection);

    // Insert Customer Demo
    // InsertCustomerDemo(connection);

    // SQL Injection Demo
    // SqlInjectionDemo(connection);

    // Parameterized Query Demo
    ParameterizedQueryDemo(connection);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}
finally
{
    connection.Close();
}

void ParameterizedQueryDemo(SqlConnection connection)
{
    using (SqlCommand command = new SqlCommand(
        "SELECT * FROM Customers WHERE Name LIKE @Name",
        connection))

    {
        // var id = "3";
        // var id = "3 or 1 = 1";
        // var id = "3 or 1 = 1";
        // Add parameters - database treats them as DATA, never as SQL code
        var name = "John or 1 = 1";
        command.Parameters.AddWithValue("@Name", name);

        using SqlDataReader reader = command.ExecuteReader();
        if (reader.Read())
        {
            Console.WriteLine($"Id: {reader["Id"]}, Name: {reader["Name"]}, Age: {reader["Age"]}");
        }
        else
        {
            Console.WriteLine("No customer found with the specified Id.");
        }
    }
}

void SqlInjectionDemo(SqlConnection connection)
{
    // Query: SELECT * FROM Customers WHERE Id = 1 or 1 = 1
    var userInput = "1 or 1 = 1";
    // var userInput = "1; DROP TABLE Customers; ";
    // var userInput = "3";
    var query = $"SELECT * FROM Customers WHERE Id = {userInput}";

    using var command = new SqlCommand(query, connection);
    try
    {
        using var reader = command.ExecuteReader();
        while (reader.Read())
        {
            Console.WriteLine($"Id: {reader["Id"]}, Name: {reader["Name"]}, Age: {reader["Age"]}");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error executing query: {ex.Message}");
    }
}

void InsertCustomerDemo(SqlConnection connection)
{
    var dataSet = new DataSet();
    var selectQuery = "SELECT * FROM Customers";
    using var selectCommand = new SqlCommand(selectQuery, connection);
    using var adapter = new SqlDataAdapter(selectCommand);
    adapter.Fill(dataSet, "Customers");

    var dataTable = dataSet.Tables["Customers"];

    var newRow = dataTable.NewRow();
    newRow["Id"] = 2;
    newRow["Name"] = "New Customer";
    newRow["Age"] = 28;

    dataTable.Rows.Add(newRow);

    adapter.InsertCommand = new SqlCommand("INSERT INTO Customers (Id, Name, Age) VALUES (@Id, @Name, @Age)", connection)
    {
        CommandType = CommandType.Text
    };

    adapter.InsertCommand.Parameters.Add("@Id", SqlDbType.Int, 6, "Id");
    adapter.InsertCommand.Parameters.Add("@Name", SqlDbType.NVarChar, 50, "Name");
    adapter.InsertCommand.Parameters.Add("@Age", SqlDbType.Int, 0, "Age");

    adapter.Update(dataSet, "Customers");

    dataSet.AcceptChanges();
}


void SqlDataAdapeterDemo(SqlConnection connection)
{
    var query = "SELECT * FROM Customers";
    SqlCommand sqlCommand = new(query, connection);
    using var selectAllCustomersCommand = sqlCommand;
    using var adapter = new SqlDataAdapter(selectAllCustomersCommand);
    var customerDataTable = new DataTable();

    adapter.Fill(customerDataTable);

    foreach (DataRow row in customerDataTable.Rows)
    {
        Console.WriteLine($"Id: {row["Id"]}, Name: {row["Name"]}, Age: {row["Age"]}");
    }
}

void ExecuteScalar(SqlConnection connection)
{
    var query = "SELECT COUNT(*) FROM Customers";
    using var command = new SqlCommand(query, connection);
    var count = (int)command.ExecuteScalar();
    Console.WriteLine($"Total customers: {count}");
}

void ExecuteReader(SqlConnection connection)
{
    var query = "SELECT * FROM Customers WHERE Age > 25";
    using var command = new SqlCommand(query, connection);
    using var reader = command.ExecuteReader();

    while (reader.Read())
    {
        Console.WriteLine($"Id: {reader["Id"]}, Name: {reader["Name"]}, Age: {reader["Age"]}");
    }
}

void ExecuteNonQuery(SqlConnection connection)
{
    var query = "INSERT INTO Customers (Id, Name, Age) VALUES (1, 'Danny', 30)";
    using var command = new SqlCommand(query, connection);
    var rowsAffected = command.ExecuteNonQuery();
    Console.WriteLine($"Rows affected: {rowsAffected}");
}