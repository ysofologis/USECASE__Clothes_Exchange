import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginDto } from '../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Login</h2>
        <p class="subtitle">Welcome back to ReWear</p>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="your@email.com"
              [disabled]="loading"
            />
            @if (loginForm.get('email')?.touched && loginForm.get('email')?.errors) {
              <span class="error">{{ getErrorMessage('email') }}</span>
            }
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              formControlName="password"
              placeholder="••••••••"
              [disabled]="loading"
            />
            @if (loginForm.get('password')?.touched && loginForm.get('password')?.errors) {
              <span class="error">{{ getErrorMessage('password') }}</span>
            }
          </div>

          @if (error) {
            <div class="error-message">{{ error }}</div>
          }

          <button type="submit" [disabled]="loading || loginForm.invalid" class="btn-primary">
            @if (loading) {
              <span class="spinner"></span> Logging in...
            } @else {
              Login
            }
          </button>
        </form>

        <div class="auth-footer">
          Don't have an account?
          <a routerLink="/auth/register">Sign up</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem;
    }

    .auth-card {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 420px;
    }

    h2 {
      margin: 0 0 0.5rem;
      color: #1a1a2e;
      font-size: 1.75rem;
    }

    .subtitle {
      color: #666;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
      font-size: 0.875rem;
    }

    input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
    }

    input:disabled {
      background: #f5f5f5;
      cursor: not-allowed;
    }

    .error {
      color: #e53e3e;
      font-size: 0.75rem;
      margin-top: 0.25rem;
      display: block;
    }

    .error-message {
      background: #fff5f5;
      color: #e53e3e;
      padding: 0.75rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }

    .btn-primary {
      width: 100%;
      padding: 0.875rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 0.8s linear infinite;
      margin-right: 0.5rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .auth-footer {
      text-align: center;
      margin-top: 1.5rem;
      color: #666;
      font-size: 0.875rem;
    }

    .auth-footer a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .auth-footer a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  loading = false;
  error = '';

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const dto: LoginDto = this.loginForm.value;

    this.authService.login(dto).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Login failed. Please check your credentials.';
      },
    });
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (!control) return '';

    if (control.errors?.['required']) {
      return 'This field is required';
    }
    if (control.errors?.['email']) {
      return 'Please enter a valid email';
    }
    if (control.errors?.['minlength']) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }
}
