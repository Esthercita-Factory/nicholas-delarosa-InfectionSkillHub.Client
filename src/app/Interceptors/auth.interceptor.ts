import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_URL } from '../Services/api.config';
import { AuthService } from '../Services/auth.service';

/** Sign in and sign up never carry the token, and a 401 there means wrong credentials, not an expired session. */
const ACCESS_ROUTES = ['/auth/login', '/auth/register'];

/**
 * Adds "Authorization: Bearer <token>" to the API requests and, when the API answers 401
 * (expired or invalid token), closes the session and goes to sign in.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isApi = req.url.startsWith(API_URL);
  const isAccess = isApi && ACCESS_ROUTES.some((route) => req.url.startsWith(`${API_URL}${route}`));
  const token = isApi && !isAccess ? auth.token() : null;

  const request = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && isApi && !isAccess && token) {
        auth.logout('expired', router.url);
      }

      return throwError(() => error);
    })
  );
};
