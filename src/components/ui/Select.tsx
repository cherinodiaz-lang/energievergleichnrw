import React from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'w-full px-4 py-3 border border-gray-300 rounded-lg',
          'focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'transition-all appearance-none',
          'bg-white text-gray-900',
          'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50',
          'hover:border-gray-400',
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export default Select;
