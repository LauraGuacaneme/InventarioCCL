/**
 * Modelo para un movimiento de producto.
 * cantidad > 0 => entrada
 * cantidad < 0 => salida
 */
export interface Movimiento {
  productoId: number;
  cantidad: number;
}
