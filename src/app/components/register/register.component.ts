import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  // Signals for component state (zoneless-ready)
  public readonly isLoading = signal(false);
  public readonly errorMessage = signal<string | null>(null);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      // Clear previous errors
      this.errorMessage.set(null);
      this.isLoading.set(true);

      const { email, password } = this.registerForm.getRawValue();

      this.authService.register(email!, password!)
        .subscribe({
          next: (credential) => {
            this.isLoading.set(false);
            console.log('Registration successful:', credential.user.email);
            this.router.navigate(['/profile']);
          },
          error: (error) => {
            this.isLoading.set(false);
            // Handle specific Firebase auth errors
            const errorMessage = this.getErrorMessage(error.code);
            this.errorMessage.set(errorMessage);
            console.error('Registration error:', error);
          }
        });
    } else {
      // Mark all fields as touched to show validation errors
      this.registerForm.markAllAsTouched();
    }
  }

  /**
   * Convert Firebase error codes to user-friendly messages
   * @param errorCode - Firebase error code
   * @returns User-friendly error message
   */
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      default:
        return 'Registration failed. Please try again.';
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
