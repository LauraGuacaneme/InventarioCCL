import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movimiento } from '../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private apiUrl = `${environment.apiUrl}/productos/movimiento`;

  constructor(private http: HttpClient) {}

  /**
   * Registra un movimiento de producto en el backend.
   * @param movimiento Objeto con productoId y cantidad
   * @returns Observable del producto actualizado
   */
  registrarMovimiento(movimiento: Movimiento): Observable<any> {
    return this.http.post<any>(this.apiUrl, movimiento);
  }
}
