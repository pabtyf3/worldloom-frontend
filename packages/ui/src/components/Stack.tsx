import type { HTMLAttributes } from 'react';

type StackDirection = 'column' | 'row';
type StackGap = '1' | '2' | '3' | '4';

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  direction?: StackDirection;
  gap?: StackGap;
  align?: string;
  justify?: string;
  wrap?: boolean;
};

const gapMap: Record<StackGap, string> = {
  '1': 'var(--wl-space-1)',
  '2': 'var(--wl-space-2)',
  '3': 'var(--wl-space-3)',
  '4': 'var(--wl-space-4)',
};

export const Stack = ({
  className,
  direction = 'column',
  gap = '3',
  align,
  justify,
  wrap = false,
  style,
  ...props
}: StackProps) => (
  <div
    className={['wl-stack', 'wl-ui', className].filter(Boolean).join(' ')}
    data-direction={direction === 'row' ? 'row' : 'column'}
    style={{
      gap: gapMap[gap],
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...style,
    }}
    {...props}
  />
);
