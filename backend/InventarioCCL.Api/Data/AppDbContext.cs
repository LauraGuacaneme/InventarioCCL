// AppDbContext.cs
// DbContext para EF Core usando Npgsql (PostgreSQL)

using InventarioCCL.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace InventarioCCL.Api.Data
{
    public class AppDbContext : DbContext
    {
        // Constructor estándar con DbContextOptions inyectadas por DI
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSet de productos
        public DbSet<Product> Products { get; set; }
    }
}
