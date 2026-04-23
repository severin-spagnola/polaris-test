interface StatusPillProps {
  children: string;
}

export function StatusPill({ children }: StatusPillProps) {
  const normalized = children.toLowerCase().replace(/\s+/g, "-");
  return <span className={`status-pill status-${normalized}`}>{children}</span>;
}

