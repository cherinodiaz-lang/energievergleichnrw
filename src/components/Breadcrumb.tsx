import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4 md:px-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-600 font-medium">{item.label}</span>
            ) : (
              <Link
                to={item.path}
                className="text-primary hover:underline transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
