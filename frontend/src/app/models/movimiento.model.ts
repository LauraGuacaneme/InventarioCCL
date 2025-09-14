/**
 * Modelo para un movimiento de producto.
 * quantity > 0 => entrada
 * quantity < 0 => salida
 */
export interface Movimiento {
  productoId: number;
  cantidad: number;
}
