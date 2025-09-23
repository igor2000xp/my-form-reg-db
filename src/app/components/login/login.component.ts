import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  // Signals for component state (zoneless-ready)
  public readonly isLoading = signal(false);
  public readonly errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      // Clear previous errors
      this.errorMessage.set(null);
      this.isLoading.set(true);

      const { email, password } = this.loginForm.getRawValue();

      this.authService.login(email!, password!)
        .subscribe({
          next: (credential) => {
            this.isLoading.set(false);
            console.log('Login successful:', credential.user.email);
            this.router.navigate(['/profile']);
          },
          error: (error) => {
            this.isLoading.set(false);
            // Handle specific Firebase auth errors
            const errorMessage = this.getErrorMessage(error.code);
            this.errorMessage.set(errorMessage);
            console.error('Login error:', error);
          }
        });
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  /**
   * Convert Firebase error codes to user-friendly messages
   * @param errorCode - Firebase error code
   * @returns User-friendly error message
   */
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please try again.';
      default:
        return 'Login failed. Please try again.';
    }
  }

  /**
   * Clear error message when user starts typing
   */
  onInputChange() {
    if (this.errorMessage()) {
      this.errorMessage.set(null);
    }
  }
}
