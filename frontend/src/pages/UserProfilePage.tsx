import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getUser } from "../api/client";
import type { UserDetail } from "../api/types";
import { SectionCard } from "../components/SectionCard";
import { StatusPill } from "../components/StatusPill";
import { formatRelativeTime } from "../lib/format";

export function UserProfilePage() {
  const { userId = "" } = useParams();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .catch(() => setError("Unable to load user profile."));
  }, [userId]);

  if (error) {
    return <p className="error-banner">{error}</p>;
  }

  if (!user) {
    return <p className="loading-copy">Loading profile...</p>;
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Profile</p>
          <h1>{user.full_name}</h1>
        </div>
        <StatusPill>{user.status}</StatusPill>
      </header>

      <section className="profile-grid">
        <SectionCard title="Account snapshot" eyebrow="Commercial context">
          <div className="profile-meta">
            <div>
              <span className="label">Company</span>
              <strong>{user.company}</strong>
            </div>
            <div className="account-tier-highlight">
              <span className="label">Account tier</span>
              <strong className={`tier-badge tier-${user.account_tier?.toLowerCase()}`}>
                {user.account_tier}
              </strong>
            </div>
            <div>
              <span className="label">Renewal date</span>
              <strong>{user.renewal_date}</strong>
            </div>
            <div>
              <span className="label">Open orders</span>
              <strong>{user.open_orders}</strong>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Contact and activity" eyebrow="Support handoff">
          <div className="profile-meta">
            <div>
              <span className="label">Email</span>
              <strong>{user.email}</strong>
            </div>
            <div>
              <span className="label">Phone</span>
              <strong>{user.phone}</strong>
            </div>
            <div>
              <span className="label">Timezone</span>
              <strong>{user.timezone}</strong>
            </div>
            <div>
              <span className="label">Last active</span>
              <strong>{formatRelativeTime(user.last_active_at)}</strong>
            </div>
          </div>
          <p className="profile-note">{user.notes}</p>
        </SectionCard>
      </section>
    </div>
  );
}

