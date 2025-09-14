// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// 👇 Import correcto
import { jwtInterceptor } from './app/interceptors/jwt.interceptor';

/**
 * Punto de entrada de la aplicación Angular Standalone
 */
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ]
});
