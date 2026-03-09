import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type NativeSelectOption = {
  label: string;
  value: string;
};

type NativeSelectProps = {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  options: NativeSelectOption[];
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export default function NativeSelect({
  id,
  value,
  onValueChange,
  options,
  placeholder,
  required = false,
  className,
}: NativeSelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        required={required}
        onChange={(event) => onValueChange(event.target.value)}
        className={cn(
          'flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  );
}
