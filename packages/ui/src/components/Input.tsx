import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={['wl-input', 'wl-ui', className].filter(Boolean).join(' ')}
      {...props}
    />
  )
);

Input.displayName = 'Input';
