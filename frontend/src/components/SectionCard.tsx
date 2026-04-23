import type { PropsWithChildren, ReactNode } from "react";

interface SectionCardProps extends PropsWithChildren {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}

export function SectionCard({ action, children, eyebrow, title }: SectionCardProps) {
  return (
    <section className="section-card">
      <header className="section-header">
        <div>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2>{title}</h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

