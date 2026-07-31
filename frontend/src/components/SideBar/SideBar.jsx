import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

export default function SideBar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  function logoutHandle() {
    logout();
    navigate("/login", {
      replace: true,
    });
  }
  return (
    <aside className="hidden w-64 border-r border-slate-800 bg-[#080d20] p-6 md:flex md:flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-xl font-bold">
          ✓
        </div>

        <h2 className="text-2xl font-bold">
          Team<span className="text-violet-500">Board</span>
        </h2>
      </div>

      {user?.role?.toLowerCase() === "admin" && (
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-4 rounded-xl px-5 py-4 transition ${
              isActive
                ? "bg-violet-600 text-white"
                : "text-slate-300 hover:bg-violet-600/20 hover:text-white"
            }`
          }
        >
          <span>🛡️</span>
          <span>Admin Dashboard</span>
        </NavLink>
      )}

      {/* Sidebar Links */}
      <nav className="mt-12 space-y-3">
        <button className="flex w-full items-center gap-3 rounded-xl bg-violet-600/20 px-4 py-3 text-left font-medium text-violet-300">
          <span>▦</span>
          Dashboard
        </button>

        <NavLink
          to="/projects"
          className="flex items-center gap-4 rounded-xl px-5 py-4 text-slate-300 transition hover:bg-violet-600/20 hover:text-white"
        >
          <span>📁</span>
          <span>Projects</span>
        </NavLink>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-400 transition hover:bg-slate-800 hover:text-white">
          <span>👤</span>
          Profile
        </button>
      </nav>

      {/* Logout */}
      <div className="mt-auto border-t border-slate-800 pt-6">
        <button
          type="button"
          onClick={logoutHandle}
          className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
