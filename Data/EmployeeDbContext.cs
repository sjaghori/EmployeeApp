using Microsoft.EntityFrameworkCore;

namespace Bif4.SasanJaghori.EmployeeApp
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options)
          : base(options)
        {

        }
        public DbSet<EmployeeItem> EmployeeItems { get; set; }
    }
}