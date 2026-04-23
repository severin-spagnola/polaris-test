import { useEffect, useState } from "react";

import { getPublicConfig } from "../api/client";
import type { PublicConfig } from "../api/types";
import { SectionCard } from "../components/SectionCard";

export function ConfigPage() {
  const [config, setConfig] = useState<PublicConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublicConfig()
      .then(setConfig)
      .catch(() => setError("Unable to load config."));
  }, []);

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Config</p>
          <h1>Runtime policy and rollout defaults</h1>
        </div>
        <p className="page-copy">Public settings exposed to operations and partner success teams.</p>
      </header>

      {error ? <p className="error-banner">{error}</p> : null}

      {config ? (
        <section className="two-column-grid">
          <SectionCard title="Core settings" eyebrow="Public config">
            <div className="profile-meta">
              <div>
                <span className="label">Environment</span>
                <strong>{config.environment}</strong>
              </div>
              <div>
                <span className="label">Region</span>
                <strong>{config.region}</strong>
              </div>
              <div>
                <span className="label">Default currency</span>
                <strong>{config.default_currency}</strong>
              </div>
              <div>
                <span className="label">Rate limit / minute</span>
                <strong>{config.request_rate_limit_per_minute}</strong>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Feature flags" eyebrow="Ops-safe toggles">
            <div className="list-stack">
              {config.flags.map((flag) => (
                <div key={flag.key} className="list-row list-row-static">
                  <div>
                    <strong>{flag.key}</strong>
                    <p>{flag.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>
      ) : null}
    </div>
  );
}

