// DTO para registrar movimientos de inventario (entrada / salida)
namespace InventarioCCL.Api.DTOs
{
    /// <summary>
    /// Representa la petición para mover stock de un producto.
    /// productoId: id del producto.
    /// cantidad: cantidad a añadir (positivo) o restar (negativo).
    /// </summary>
    public class MovimientoRequest
    {
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
    }
}
