// AppDbContext.cs
// DbContext para EF Core usando Npgsql (PostgreSQL)

using InventarioCCL.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace InventarioCCL.Api.Data
{
    /// <summary>
    /// Contexto de base de datos que maneja las entidades con Entity Framework Core.
    /// </summary>
    public class AppDbContext : DbContext
    {
        // Constructor estándar con DbContextOptions inyectadas por DI
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSet de productos
        public DbSet<Producto> Productos { get; set; }
    }
}
