import { useEffect, useState } from "react";

import { getUsers } from "../api/client";
import type { UserSummary } from "../api/types";
import { SectionCard } from "../components/SectionCard";

interface CheckoutDraft {
  userId: string;
  sku: string;
  quantity: string;
}

const initialDraft: CheckoutDraft = {
  userId: "101",
  sku: "priority-fulfillment-seat",
  quantity: "4",
};

export function CheckoutPage() {
  const [draft, setDraft] = useState<CheckoutDraft>(initialDraft);
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    getUsers().then(setUsers).catch(() => undefined);
  }, []);

  const selectedUser = users.find((user) => String(user.id) === draft.userId);
  const payloadPreview = {
    user_id: Number(draft.userId),
    sku: draft.sku,
    quantity: Number(draft.quantity),
  };

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Checkout</p>
          <h1>Manual order builder</h1>
        </div>
        <p className="page-copy">
          Sales and support teams use this to draft one-off fulfillment requests for high-touch
          accounts.
        </p>
      </header>

      <section className="two-column-grid">
        <SectionCard title="Draft a manual order" eyebrow="Sales assist">
          <div className="form-grid">
            <label>
              <span className="label">User ID</span>
              <input
                value={draft.userId}
                onChange={(event) => setDraft({ ...draft, userId: event.target.value })}
              />
            </label>
            <label>
              <span className="label">SKU</span>
              <input
                value={draft.sku}
                onChange={(event) => setDraft({ ...draft, sku: event.target.value })}
              />
            </label>
            <label>
              <span className="label">Quantity</span>
              <input
                value={draft.quantity}
                onChange={(event) => setDraft({ ...draft, quantity: event.target.value })}
              />
            </label>
            <button
              className="primary-button"
              type="button"
              onClick={() => setSavedMessage("Draft saved for order review.")}
            >
              Save draft
            </button>
            {savedMessage ? <p className="success-copy">{savedMessage}</p> : null}
          </div>
        </SectionCard>

        <SectionCard title="Payload preview" eyebrow="What gets submitted">
          <pre className="payload-preview">{JSON.stringify(payloadPreview, null, 2)}</pre>
          {selectedUser ? (
            <p className="inline-note">
              Selected account: {selectedUser.full_name} at {selectedUser.company}
            </p>
          ) : (
            <p className="inline-note">No account matches the current user ID.</p>
          )}
        </SectionCard>
      </section>
    </div>
  );
}

