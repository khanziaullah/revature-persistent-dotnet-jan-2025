using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.ComponentModel.DataAnnotations.Schema;

var _context = new CrmDbContext();

var customers = _context.Customers.ToList();

// var customersFromPune =
//     _context.Customers
//     .Where(c => c.City == "Pune")
//     .OrderBy(c => c.Name)
//     .Select(c => new { c.Name, c.Email })
//     .ToList();

// SELECTION
// ITERATION
// FILTERING

// sequence
// selectio
// iteration

// var results = context.TableName
//     .Where(condition)      // Filter
//     .OrderBy(sort)        // Sort
//     .Select(shape)        // Choose columns
//     .ToList();            // Execute

// var results = context.TableName
//     .Where(condition)      // Filter
//     .Select(shape)        // Choose columns
//     .OrderBy(sort)        // Sort
//     .ToList();            // Execute


// var customersWithOrderValueMoreThan1000 =
//     from c in _context.Customers
//     join o in _context.Orders on c.CustomerId equals o.CustomerId
//     where o.TotalAmount > 1000
//     order by c.Name
//     select c;


var customersWithOrderValueMoreThan1000_2 =
    _context.Customers
    .Join(_context.Orders,
          c => c.CustomerId,
          o => o.CustomerId,
          (c, o) => new { Customer = c, Order = o })
    .Where(co => co.Order.TotalAmount > 1000)
    .OrderBy(co => co.Customer.Name)
    .Select(co => co.Customer)
    .ToList();

foreach (var customer in customersWithOrderValueMoreThan1000_2)
{
    Console.WriteLine($"Customer ID: {customer.CustomerId}, Name: {customer.Name}, Email: {customer.Email}");
}

foreach (var customer in customers)
{
    Console.WriteLine($"Customer ID: {customer.CustomerId}, Name: {customer.Name}, Email: {customer.Email}");
}

class CrmDbContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=localhost;Database=CrmDb;User Id=sa;Password=p@ssw0rd;TrustServerCertificate=True");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CustomerType>()
            .HasData(
                new CustomerType { Id = 1, TypeName = "Regular" },
                new CustomerType { Id = 2, TypeName = "Premium" }
            );

        modelBuilder.Entity<Customer>()
            // .HasSoftDelete(c => c.IsDeleted)
            .HasQueryFilter(c => c.IsDeleted == false);

        modelBuilder.Entity<Order>()
            .HasKey(o => o.OrderId);

        modelBuilder.Entity<Order>()
            .HasOne(o => o.Customer)
            .WithMany()
            .HasForeignKey(o => o.CustomerId);
    }
}

public class Customer
{
    public int CustomerId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public bool IsDeleted { get; internal set; }
}

public class CustomerType
{
    public int Id { get; set; }
    public string TypeName { get; set; }
}

public class Order
{
    public int OrderId { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }

    // [ForeignKey("Customer")]
    public int CustomerId { get; set; }

    // Navigation Property
    public Customer Customer { get; set; }
}

// order.CustomerId
// order.Customer.Name

// _context.Customers.Where(x=> x.Id == order.CustomerId).Select(x => x.Name).FirstOrDefault()