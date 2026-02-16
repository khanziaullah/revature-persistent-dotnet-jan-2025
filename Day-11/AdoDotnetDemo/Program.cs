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
    SqlDataAdapeterDemo(connection);
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