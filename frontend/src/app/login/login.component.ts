// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Componente de Login Standalone
 * Permite al usuario ingresar sus credenciales y autenticarse con JWT.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <input type="text" formControlName="username" placeholder="Usuario" />
        <input type="password" formControlName="password" placeholder="Contraseña" />
        <button type="submit" [disabled]="loginForm.invalid">Ingresar</button>
      </form>
      <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  `,
  styles: [`
    .login-container { max-width: 300px; margin: auto; padding: 20px; }
    input { display: block; margin: 10px 0; padding: 8px; width: 100%; }
    button { width: 100%; padding: 10px; }
    .error { color: red; margin-top: 10px; }
  `]
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
        next: () => this.router.navigate(['/productos']), // Redirige a productos tras login
        error: () => this.errorMessage = 'Credenciales inválidas'
      });
    }
  }
}
