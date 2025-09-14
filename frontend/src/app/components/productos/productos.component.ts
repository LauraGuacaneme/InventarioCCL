import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  nuevoProducto: Partial<Producto> = {};
  editando: Producto | null = null;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  // Obtener lista de productos
  cargarProductos(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => (this.productos = data),
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  // Agregar producto
  agregarProducto(): void {
    if (!this.nuevoProducto.nombre || this.nuevoProducto.cantidad == null) return;
    this.productosService.addProducto(this.nuevoProducto).subscribe({
      next: () => {
        this.cargarProductos();
        this.nuevoProducto = {};
      },
      error: (err) => console.error('Error al agregar producto', err)
    });
  }

  // Editar producto
  editarProducto(producto: Producto): void {
    this.editando = { ...producto };
  }

  guardarEdicion(): void {
    if (!this.editando) return;
    this.productosService.updateProducto(this.editando.id, this.editando).subscribe({
      next: () => {
        this.cargarProductos();
        this.editando = null;
      },
      error: (err) => console.error('Error al actualizar producto', err)
    });
  }

  cancelarEdicion(): void {
    this.editando = null;
  }

  // Eliminar producto
  eliminarProducto(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productosService.deleteProducto(id).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => console.error('Error al eliminar producto', err)
      });
    }
  }
}
