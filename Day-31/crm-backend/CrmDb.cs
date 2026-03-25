using Microsoft.EntityFrameworkCore;

public class CrmDbContext : DbContext
{
    public CrmDbContext(DbContextOptions<CrmDbContext> options) : base(options)
    {
    }
    public DbSet<Customer> Customers { get; set; }

}

public class CrmService
{
    CrmDbContext _crmDbContext;

    public CrmService(CrmDbContext crmDbContext)
    {
        _crmDbContext = crmDbContext;
    }

    public async Task<IEnumerable<Customer>> GetCustomers() => await _crmDbContext.Customers.ToListAsync();
    public async Task<Customer> GetCustomersById(int id) => await _crmDbContext.Customers.Where(x => x.Id == id).FirstOrDefaultAsync();

    public async Task<int> AddCustomer(Customer customer)
    {
        _crmDbContext.Customers.Add(customer);
        await _crmDbContext.SaveChangesAsync();
        return await Task.FromResult(customer.Id);
    }
    public async Task UpdateCustomer(Customer customer)
    {
        _crmDbContext.Customers.Update(customer);
        await _crmDbContext.SaveChangesAsync();
    }

    public async Task DeleteCustomer(Customer customer)
    {
        _crmDbContext.Customers.Remove(customer);
        await _crmDbContext.SaveChangesAsync();
    }
}

public record Customer(int Id, string Name, string Email, string Company);
