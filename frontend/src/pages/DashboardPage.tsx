import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDashboardSummary } from "../api/client";
import type { DashboardSummary } from "../api/types";
import { SectionCard } from "../components/SectionCard";
import { StatCard } from "../components/StatCard";
import { StatusPill } from "../components/StatusPill";

export function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDashboardSummary()
      .then(setSummary)
      .catch(() => setError("Unable to load dashboard metrics."));
  }, []);

  return (
    <div className="page-stack">
      <header className="hero">
        <div>
          <p className="eyebrow">Today at a glance</p>
          <h1>Operational signal for customer success and fulfillment</h1>
        </div>
        <p className="hero-copy">
          NimbusOps gives account teams a single place to see customer posture, active demand,
          and rollout constraints before they become support escalations.
        </p>
      </header>

      {error ? <p className="error-banner">{error}</p> : null}

      <section className="stats-grid">
        {summary?.stats.map((card) => <StatCard key={card.label} {...card} />)}
      </section>

      <SectionCard eyebrow="Customer pulse" title="Recently active users">
        <div className="list-stack">
          {summary?.recent_users.map((user) => (
            <Link key={user.id} to={`/users/${user.id}`} className="list-row">
              <div>
                <strong>{user.full_name}</strong>
                <p>
                  {user.company} · {user.account_tier}
                </p>
              </div>
              <StatusPill>{user.status}</StatusPill>
            </Link>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

