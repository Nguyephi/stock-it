import { cn } from '@/lib/cn';

export default function Divider({ orientation = 'horizontal', className = '' }) {
  const baseStyles = 'bg-slate-200 dark:bg-slate-800';
  const horizontalStyles = 'border-t w-full h-px my-4';
  const verticalStyles = 'border-l h-full w-px mx-4';

  return (
    <div
      className={cn(
        baseStyles,
        orientation === 'horizontal' ? horizontalStyles : verticalStyles,
        className
      )}
    />
  );
}