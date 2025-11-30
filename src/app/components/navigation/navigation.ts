import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-navigation',
  imports: [RouterModule],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navigation {
  private authService = inject(AuthService);

  // Expose signal-based properties for template
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly userEmail = this.authService.userEmail;

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
