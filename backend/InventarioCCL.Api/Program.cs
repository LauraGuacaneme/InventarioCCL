// Program.cs
// Punto de entrada de la API Web (.NET 9). Aquí se configuran servicios, autenticación JWT y DbContext.

using InventarioCCL.Api.Data;
using InventarioCCL.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// -----------------------
// Servicios básicos
// -----------------------
builder.Services.AddControllers();               // Controladores MVC / API
builder.Services.AddEndpointsApiExplorer();      // Para OpenAPI/Swagger
builder.Services.AddSwaggerGen();                // Generar UI de Swagger (solo dev)

// -----------------------
// DbContext - PostgreSQL
// -----------------------
// Registra AppDbContext usando la cadena de conexión "DefaultConnection" en appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// -----------------------
// Servicio para generar tokens JWT
// -----------------------
builder.Services.AddScoped<ITokenService, TokenService>();

// -----------------------
// Configuración de JWT Authentication
// -----------------------
var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key no encontrado en configuration"));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    // En desarrollo no requerimos HTTPS estrictamente; en producción sí.
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

// -----------------------
// Construir la app
// -----------------------
var app = builder.Build();

// -----------------------
// Crear DB (EnsureCreated) y seed de datos mínimos
// - Usa EnsureCreated para evitar migraciones complejas en esta prueba técnica.
// - Si la DB no existe, se creará con la tabla Products.
// -----------------------
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    // Seed inicial: solo si no hay productos
    if (!db.Productos.Any())
    {
        db.Productos.AddRange(
            new InventarioCCL.Api.Models.Producto { Nombre = "Clavos 2mm", Cantidad = 500 },
            new InventarioCCL.Api.Models.Producto { Nombre = "Tornillos 3mm", Cantidad = 300 },
            new InventarioCCL.Api.Models.Producto { Nombre = "Tuercas M6", Cantidad = 250 }
        );
        db.SaveChanges();
    }
}

// Activar Swagger solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Habilitar autenticación y autorización
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
