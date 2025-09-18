import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, CommonModule],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navigation {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
