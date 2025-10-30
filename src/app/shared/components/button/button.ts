// src/app/shared/components/button/button.ts
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import type { ButtonColor, ButtonSize, ButtonType } from './button.types';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  // ===== INPUTS (using modern Angular 20 input() function) =====

  /**
   * Native button type attribute
   * @default 'button'
   */
  public readonly type = input<ButtonType>('button');

  /**
   * Color variant for styling
   * @default 'primary'
   */
  public readonly color = input<ButtonColor>('primary');

  /**
   * Size variant
   * @default 'medium'
   */
  public readonly size = input<ButtonSize>('medium');

  /**
   * Whether the button is disabled
   * @default false
   */
  public readonly disabled = input<boolean>(false);

  /**
   * Whether the button is in loading state
   * @default false
   */
  public readonly loading = input<boolean>(false);

  /**
   * Whether the button should take full width of container
   * @default false
   */
  public readonly fullWidth = input<boolean>(false);

  /**
   * Accessibility label (required if button content is icon-only)
   */
  public readonly ariaLabel = input<string | undefined>(undefined);

  // ===== OUTPUTS (using modern Angular 20 output() function) =====

  /**
   * Emitted when button is clicked
   * Not emitted when button is disabled or loading
   */
  public readonly btnClick = output<MouseEvent>();

  // ===== COMPUTED SIGNALS =====

  /**
   * Whether the button can be interacted with
   */
  protected readonly isInteractive = computed(() => !this.disabled() && !this.loading());

  /**
   * Dynamic CSS classes based on inputs
   */
  protected readonly cssClasses = computed(() => ({
    btn: true,
    [`btn--${this.color()}`]: true,
    [`btn--${this.size()}`]: true,
    'btn--full-width': this.fullWidth(),
    'btn--disabled': this.disabled(),
    'btn--loading': this.loading(),
  }));

  // ===== METHODS =====

  /**
   * Handle button click
   * Only emits if button is interactive
   */
  protected onClick(event: MouseEvent): void {
    if (!this.isInteractive()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.btnClick.emit(event);
  }
}
