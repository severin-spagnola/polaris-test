import { useDeferredValue, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getUsers } from "../api/client";
import type { UserSummary } from "../api/types";
import { SectionCard } from "../components/SectionCard";
import { StatusPill } from "../components/StatusPill";
import { formatRelativeTime } from "../lib/format";

export function UsersPage() {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const deferredSearch = useDeferredValue(searchTerm);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setError("Unable to load users."));
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = deferredSearch.trim().toLowerCase();
    if (!query) {
      return true;
    }
    return (
      user.full_name.toLowerCase().includes(query) ||
      user.company.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Users</p>
          <h1>Customer operators and account owners</h1>
        </div>
        <input
          className="search-input"
          placeholder="Search by name, company, or email"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </header>

      {error ? <p className="error-banner">{error}</p> : null}

      <SectionCard title="All users" eyebrow="Account coverage">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Tier</th>
                <th>Status</th>
                <th>Open orders</th>
                <th>Last active</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`} className="table-link">
                      {user.full_name}
                    </Link>
                    <div className="table-subtle">{user.email}</div>
                  </td>
                  <td>{user.company}</td>
                  <td>{user.account_tier}</td>
                  <td>
                    <StatusPill>{user.status}</StatusPill>
                  </td>
                  <td>{user.open_orders}</td>
                  <td>{formatRelativeTime(user.last_active_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

