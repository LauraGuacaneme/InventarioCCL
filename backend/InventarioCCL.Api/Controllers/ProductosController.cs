using InventarioCCL.Api.Data;
using InventarioCCL.Api.DTOs;
using InventarioCCL.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventarioCCL.Api.Controllers
{
    /// <summary>
    /// Controlador que gestiona las operaciones sobre productos e inventario.
    /// Incluye CRUD completo y movimientos de entrada/salida.
    /// Todos los endpoints requieren JWT.
    /// </summary>
    [ApiController]
    [Route("productos")]
    [Authorize]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductosController(AppDbContext context)
        {
            _context = context;
        }

        // -----------------------------
        //  CRUD BÁSICO DE PRODUCTOS
        // -----------------------------

        // Obtener todos los productos
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var productos = await _context.Productos.ToListAsync();
            return Ok(productos);
        }

        // Obtener producto por Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
                return NotFound(new { mensaje = "Producto no encontrado." });

            return Ok(producto);
        }

        // Crear producto
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Producto producto)
        {
            if (string.IsNullOrWhiteSpace(producto.Nombre))
                return BadRequest(new { mensaje = "El nombre es obligatorio." });

            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = producto.Id }, producto);
        }

        // Actualizar producto
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Producto producto)
        {
            var existente = await _context.Productos.FindAsync(id);
            if (existente == null)
                return NotFound(new { mensaje = "Producto no encontrado." });

            existente.Nombre = producto.Nombre;
            existente.Cantidad = producto.Cantidad;

            await _context.SaveChangesAsync();
            return Ok(existente);
        }

        // Eliminar producto
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
                return NotFound(new { mensaje = "Producto no encontrado." });

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();
            return Ok(new { mensaje = "Producto eliminado correctamente." });
        }

        // -----------------------------
        // MOVIMIENTOS DE INVENTARIO
        // -----------------------------

        // Entrada y salida de productos
        [HttpPost("movimiento")]
        public async Task<IActionResult> RegistrarMovimiento([FromBody] MovimientoRequest request)
        {
            var producto = await _context.Productos.FindAsync(request.ProductoId);
            if (producto == null)
                return NotFound(new { mensaje = "Producto no encontrado." });

            if (producto.Cantidad + request.Cantidad < 0)
                return BadRequest(new { mensaje = "Stock insuficiente para realizar la salida." });

            producto.Cantidad += request.Cantidad;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Movimiento registrado correctamente.",
                producto = new { producto.Id, producto.Nombre, producto.Cantidad }
            });
        }

        // Consultar el inventario
        [HttpGet("inventario")]
        public async Task<IActionResult> ConsultarInventario()
        {
            var productos = await _context.Productos
                .Select(p => new { p.Id, p.Nombre, p.Cantidad })
                .ToListAsync();

            return Ok(productos);
        }
    }
}
