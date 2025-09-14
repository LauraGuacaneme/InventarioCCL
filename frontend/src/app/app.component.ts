// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

/**
 * Componente raíz de la aplicación
 * Renderiza las rutas hijas según la navegación.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `<app-header />
  <router-outlet></router-outlet>`
})
export class AppComponent {}
