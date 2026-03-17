import type { ReactNode } from "react";

export default function TableWrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`table-wrap ${className}`}>{children}</div>;
}
