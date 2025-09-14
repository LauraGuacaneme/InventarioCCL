using System.ComponentModel.DataAnnotations;

namespace InventarioCCL.Api.Models
{
    /// <summary>
    /// Representa un producto dentro del inventario.
    /// </summary>
    public class Producto
    {

        [Key]
        public int Id { get; set; } // Identificador único del producto (Primary Key).


        [Required]
        public string Nombre { get; set; } = string.Empty;  // Nombre del producto.


        public int Cantidad { get; set; } // Cantidad disponible en el inventario.
    }
}
