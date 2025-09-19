import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ProfileComponent {
  private authService = inject(AuthService);

  // Use the signal-based user from auth service
  public readonly user = this.authService.currentUser;
  public readonly userEmail = this.authService.userEmail;
  public readonly isAuthenticated = this.authService.isAuthenticated;

  // Component state
  public readonly isLoggingOut = signal(false);

  /**
   * Handle user logout
   */
  async onLogout() {
    try {
      this.isLoggingOut.set(true);
      await this.authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
      this.isLoggingOut.set(false);
    }
  }
}
