import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Sidebar from './Sidebar';
import { Menu, LogOut, Shield, User, Sun, Moon } from 'lucide-react';

export default function AppLayout() {
  const { user, logout, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* ── TOP HEADER ─────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          {/* Left: hamburger + brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-300"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-700 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <span className="font-extrabold text-white text-base tracking-wider">SV</span>
              </div>
              <div className="hidden sm:block border-l border-slate-200 dark:border-slate-800 pl-3">
                <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">Production &amp; TPM Tracker</h1>
                <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider">Sata Vikas India Pvt Ltd</p>
              </div>
            </div>
          </div>

          {/* Right: theme toggle + user info + logout */}
          <div className="flex items-center gap-3">
            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 transition-all duration-300 cursor-pointer shadow-inner flex items-center gap-1.5"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <>
                  <Sun size={18} className="text-amber-400 animate-spin-slow" />
                  <span className="hidden md:inline text-xs font-semibold text-amber-300">Light</span>
                </>
              ) : (
                <>
                  <Moon size={18} className="text-indigo-600" />
                  <span className="hidden md:inline text-xs font-semibold text-slate-700">Dark</span>
                </>
              )}
            </button>

            {/* User Profile Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center text-white shadow-sm">
                {isAdmin ? <Shield size={13} /> : <User size={13} />}
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">{user?.fullName}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-400 capitalize">{user?.role}</p>
              </div>
            </div>

            <span className={isAdmin ? 'badge-admin' : 'badge-employee'}>
              {isAdmin ? 'Admin' : 'Employee'}
            </span>

            <button
              onClick={logout}
              className="p-2.5 rounded-xl text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 cursor-pointer"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ── BODY: SIDEBAR + MAIN ──────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-slate-50/50 dark:bg-slate-950/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

