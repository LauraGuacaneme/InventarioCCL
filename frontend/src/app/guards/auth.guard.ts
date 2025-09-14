import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

/**
 * AuthGuard con SweetAlert2
 * -------------------------
 * Muestra una alerta si el usuario no está autenticado.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso restringido',
        text: 'Debes iniciar sesión para acceder a esta página.',
        confirmButtonText: 'Ir al login',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return false;
    }
  }
}
