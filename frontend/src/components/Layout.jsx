import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Layout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <aside className={menuOpen ? "sidebar menu-open" : "sidebar"}>
        <div className="sidebar-brand">
          <span className="brand-mark">WF</span>
          <div>
            <h1>Whitefox</h1>
            <p>Student Management</p>
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <nav id="primary-navigation">
          <NavLink to="/dashboard" end onClick={closeMenu}>Dashboard</NavLink>
          <NavLink to="/students" end onClick={closeMenu}>Students</NavLink>
          <NavLink to="/students/add" onClick={closeMenu}>Add Student</NavLink>
        </nav>
        <div className="sidebar-footer">
          <span>{user?.username || "Signed in"}</span>
          <button className="btn secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
