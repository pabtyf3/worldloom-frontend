import type { HTMLAttributes } from 'react';

export type PanelProps = HTMLAttributes<HTMLDivElement>;

export const Panel = ({ className, ...props }: PanelProps) => (
  <div className={['wl-panel', 'wl-ui', className].filter(Boolean).join(' ')} {...props} />
);
