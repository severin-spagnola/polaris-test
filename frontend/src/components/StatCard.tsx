import type { StatCard as StatCardType } from "../api/types";

export function StatCard({ label, value, trend }: StatCardType) {
  return (
    <article className="stat-card">
      <p className="stat-label">{label}</p>
      <strong className="stat-value">{value}</strong>
      <p className="stat-trend">{trend}</p>
    </article>
  );
}

