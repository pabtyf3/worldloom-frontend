import type { ElementType, HTMLAttributes } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

type HeadingProps<T extends ElementType> = {
  as?: T;
} & Omit<HTMLAttributes<HTMLElement>, 'as'>;

const sizeMap: Record<HeadingLevel, string> = {
  h1: '2rem',
  h2: '1.6rem',
  h3: '1.3rem',
  h4: '1.1rem',
};

export const Heading = <T extends ElementType = 'h2'>({
  as,
  className,
  style,
  ...props
}: HeadingProps<T>) => {
  const Component = as ?? 'h2';
  const level = (Component as HeadingLevel) in sizeMap ? (Component as HeadingLevel) : 'h2';

  return (
    <Component
      className={['wl-heading', 'wl-ui', className].filter(Boolean).join(' ')}
      style={{ fontSize: sizeMap[level], ...style }}
      {...props}
    />
  );
};
