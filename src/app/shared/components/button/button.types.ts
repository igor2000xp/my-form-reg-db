// src/app/shared/components/button/button.types.ts

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonConfig {
  type?: ButtonType;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
}
