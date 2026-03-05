/**
 * Loading Skeleton Component
 * Zeigt Placeholder während Content lädt
 */

import type { CSSProperties } from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
}

export function Skeleton({
  width = '100%',
  height = 20,
  variant = 'text',
  animation = 'pulse',
  className = ''
}: SkeletonProps) {
  const style: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: variant === 'circular' ? '50%' : variant === 'text' ? '4px' : '8px'
  };

  return (
    <div
      className={`skeleton skeleton-${animation} ${className}`}
      style={style}
      aria-busy="true"
      aria-live="polite"
    />
  );
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="card">
      <Skeleton height={200} className="mb-4" />
      <Skeleton width="60%" height={24} className="mb-2" />
      <Skeleton width="80%" height={16} className="mb-2" />
      <Skeleton width="90%" height={16} />
    </div>
  );
}

// List Skeleton
export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1">
            <Skeleton width="40%" height={16} className="mb-2" />
            <Skeleton width="60%" height={14} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Table Skeleton
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} height={40} className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
