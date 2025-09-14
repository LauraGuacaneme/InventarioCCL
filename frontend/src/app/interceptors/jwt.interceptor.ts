// src/app/interceptors/jwt.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor para agregar el token JWT a todas las peticiones HTTP
 * automáticamente si el usuario está autenticado.
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  return next(req);
};
