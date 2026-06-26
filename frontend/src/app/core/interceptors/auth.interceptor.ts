import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('accessToken');
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired or invalid - try refresh
          return this.authService.refresh().pipe(
            switchMap(() => {
              // Retry the original request with new token
              const newToken = localStorage.getItem('accessToken');
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
              return next.handle(retryReq);
            }),
            catchError(() => {
              // Refresh failed - logout
              this.authService.logout().subscribe();
              this.router.navigate(['/auth/login']);
              return throwError(() => new Error('Session expired'));
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
