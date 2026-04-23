import { Outlet } from "react-router-dom";

import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="shell">
      <Sidebar />
      <main className="content">
        <div className="page-frame">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

