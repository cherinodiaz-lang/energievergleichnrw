import React from 'react';

export default function TableWrap({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`table-wrap ${className}`}>{children}</div>;
}
