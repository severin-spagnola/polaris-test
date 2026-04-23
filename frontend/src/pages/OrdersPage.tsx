import { useEffect, useState } from "react";

import { getOrders } from "../api/client";
import type { OrderSummary } from "../api/types";
import { SectionCard } from "../components/SectionCard";
import { StatusPill } from "../components/StatusPill";
import { formatMoney } from "../lib/format";

export function OrdersPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setError("Unable to load orders."));
  }, []);

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Orders</p>
          <h1>Fulfillment queue</h1>
        </div>
        <p className="page-copy">Use this view to monitor demand and spot risky accounts quickly.</p>
      </header>

      {error ? <p className="error-banner">{error}</p> : null}

      <SectionCard title="Live order stream" eyebrow="Execution">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>User ID</th>
                <th>Account</th>
                <th>Channel</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.order_number}</strong>
                  </td>
                  <td>{order.user_id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.channel}</td>
                  <td>
                    <StatusPill>{order.status}</StatusPill>
                  </td>
                  <td>{formatMoney(order.total_cents, order.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

