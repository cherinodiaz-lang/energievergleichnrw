import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  ...props
}: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-gray-200';
  
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };
  
  const style = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };
  
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseStyles, variants.text)}
            style={{ width: i === lines - 1 ? '80%' : '100%' }}
          />
        ))}
      </div>
    );
  }
  
  return <div className={cn(baseStyles, variants[variant], className)} style={style} {...props} />;
}

export function SkeletonCard() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="text" lines={3} />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width={100} height={40} />
        <Skeleton variant="rectangular" width={100} height={40} />
      </div>
    </div>
  );
}

export function SkeletonForm() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6">
      <Skeleton variant="text" height={32} width={300} />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton variant="text" width={150} />
            <Skeleton variant="rectangular" height={48} />
          </div>
        ))}
      </div>
      <Skeleton variant="rectangular" height={48} />
    </div>
  );
}