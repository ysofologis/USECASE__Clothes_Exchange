import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse, LoginDto, RegisterDto, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly API_URL = 'http://localhost:3000/api/auth';

  private readonly _authState = new BehaviorSubject<boolean>(this.hasToken());
  readonly authState$ = this._authState.asObservable();

  private readonly _currentUser = new BehaviorSubject<User | null>(this.loadUser());
  readonly currentUser$ = this._currentUser.asObservable();

  register(dto: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, dto).pipe(
      tap(response => this.onAuthSuccess(response))
    );
  }

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, dto).pipe(
      tap(response => this.onAuthSuccess(response))
    );
  }

  refresh(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token'));
    }
    return this.http.post<AuthResponse>(`${this.API_URL}/refresh`, { refreshToken }).pipe(
      tap(response => this.onAuthSuccess(response)),
      catchError(() => {
        this.logout();
        return throwError(() => new Error('Refresh failed'));
      })
    );
  }

  logout(): Observable<void> {
    const refreshToken = this.getRefreshToken();
    const promise = this.http.post<void>(`${this.API_URL}/logout`, { refreshToken }).toPromise();
    this.clearAuth();
    return promise ? promise : Promise.resolve();
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/me`);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authState$;
  }

  getCurrentUser(): User | null {
    return this._currentUser.value;
  }

  // --- Private ---

  private onAuthSuccess(response: AuthResponse): void {
    this.saveToken(response.accessToken, response.refreshToken);
    this._authState.next(true);
    this._currentUser.next(response.user);
  }

  private clearAuth(): void {
    this.removeToken('accessToken');
    this.removeToken('refreshToken');
    this._authState.next(false);
    this._currentUser.next(null);
  }

  private hasToken(): boolean {
    return !!this.getAccessToken();
  }

  private loadUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  private saveToken(access: string, refresh: string): void {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    const user = this._currentUser.value;
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  private getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  private removeToken(key: string): void {
    localStorage.removeItem(key);
  }
}
