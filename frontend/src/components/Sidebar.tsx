import { NavLink } from "react-router-dom";

const navigationItems = [
  { to: "/", label: "Overview" },
  { to: "/users", label: "Users" },
  { to: "/orders", label: "Orders" },
  { to: "/checkout", label: "Checkout" },
  { to: "/config", label: "Config" },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <p className="eyebrow">NimbusOps</p>
        <h1 className="sidebar-title">Revenue operations control room</h1>
        <p className="sidebar-copy">
          Track customer health, order execution, and rollout posture in one place.
        </p>
      </div>

      <nav className="nav-stack" aria-label="Primary">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-chip">West Coast Rollout</div>
        <p className="sidebar-copy">Live posture: stable, assisted fulfillment enabled.</p>
      </div>
    </aside>
  );
}

