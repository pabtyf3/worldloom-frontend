import type { ElementType, HTMLAttributes } from 'react';

type TextTone = 'primary' | 'secondary' | 'muted';
type TextSize = 'sm' | 'md' | 'lg';

type TextProps<T extends ElementType> = {
  as?: T;
  tone?: TextTone;
  size?: TextSize;
} & Omit<HTMLAttributes<HTMLElement>, 'as' | 'color'>;

const sizeMap: Record<TextSize, string> = {
  sm: '0.85rem',
  md: '1rem',
  lg: '1.1rem',
};

export const Text = <T extends ElementType = 'p'>({
  as,
  tone = 'primary',
  size = 'md',
  className,
  style,
  ...props
}: TextProps<T>) => {
  const Component = as ?? 'p';
  return (
    <Component
      className={['wl-text', 'wl-ui', className].filter(Boolean).join(' ')}
      data-tone={tone}
      style={{ fontSize: sizeMap[size], ...style }}
      {...props}
    />
  );
};
