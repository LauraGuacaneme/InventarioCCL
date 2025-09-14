// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Modelo de datos de Producto según el backend
 */
export interface Product {
  id: number;
  nombre: string;
  cantidad: number;
}

/**
 * Servicio encargado de interactuar con el backend para manejar productos.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) { }

  /**
   * Obtener la lista de productos.
   * Llama a GET /productos/inventario
   */
  getInventario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inventario`);
  }


  getProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/inventario`);
  }
}
