// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Servicio encargado de manejar la autenticación de usuarios.
 * Se conecta al backend para obtener el JWT y lo guarda en localStorage.
 */
@Injectable({
  providedIn: 'root' // Disponible en toda la app sin necesidad de declararlo
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  /**
   * Método para loguear un usuario en el sistema.
   * @param credentials Objeto con usuario y contraseña
   * @returns Observable con la respuesta del backend (JWT incluido)
   */
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Guardamos el token en localStorage para futuras peticiones
        localStorage.setItem('token', response.token);
      })
    );
  }

  /**
   * Método para obtener el token guardado en el navegador
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Método para cerrar sesión y limpiar el token
   */
  logout(): void {
    localStorage.removeItem('token');
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
