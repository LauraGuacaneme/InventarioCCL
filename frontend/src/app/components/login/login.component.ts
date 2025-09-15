import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * Componente de Login Standalone
 * Permite al usuario ingresar sus credenciales y autenticarse con JWT.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  loginForm!: FormGroup; // Definimos la variable pero la inicializamos en ngOnInit

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  /**
   * Inicializamos el formulario una vez que el componente está listo.
   */
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Envía el formulario al backend y maneja la autenticación.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value as any).subscribe({
        next: () => this.router.navigate(['/inventario']), // Redirige a productos tras login
        error: () => this.errorMessage = 'Credenciales inválidas'
      });
    }
  }
}
