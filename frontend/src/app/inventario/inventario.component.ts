import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

/**
 * Componente de Inventario
 * Permite consultar el estado actual del inventario
 */
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  imports: [CommonModule]
})
export class InventarioComponent implements OnInit {

  productos: any[] = [];  // Array que almacenará los productos obtenidos del backend
  cargando: boolean = false; // indicador de carga

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  /**
   * Llama al servicio para obtener los productos y los asigna al array local
   */
  cargarProductos(): void {
    this.cargando = true;
    this.productService.getInventario().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar inventario:', err);
        this.cargando = false;
      }
    });
  }
}
