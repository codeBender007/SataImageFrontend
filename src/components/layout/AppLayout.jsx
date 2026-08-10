import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Sidebar from './Sidebar';
import UploadModal from '../upload/UploadModal';
import ToolHandoverUploadModal from '../upload/ToolHandoverUploadModal';
import { Menu, LogOut, Shield, User, Sun, Moon, Bell } from 'lucide-react';

export default function AppLayout() {
  const { user, logout, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showToolHandoverUpload, setShowToolHandoverUpload] = useState(false);

  return (
    <div className="app-shell bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* ── TOP HEADER ─────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-950/75 backdrop-blur-2xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-[0_3px_16px_rgba(15,23,42,.04)] transition-colors duration-300">
        <div className="flex items-center justify-between px-4 lg:px-8 h-[74px]">
          {/* Left: hamburger + brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-300"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 ring-1 ring-indigo-300/30">
                <span className="font-extrabold text-white text-base tracking-wider">SV</span>
              </div>
              <div className="hidden sm:block pl-1">
                <h1 className="text-[15px] font-bold text-slate-900 dark:text-slate-100 leading-tight">Production &amp; TPM Tracker</h1>
                <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.12em] mt-1">Sata Vikas India Pvt Ltd</p>
              </div>
            </div>
          </div>

          {/* Right: theme toggle + user info + logout */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:grid relative h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300" title="Notifications">
              <Bell size={17} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-800" />
            </button>
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
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/80 shadow-sm">
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
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onUpload={() => setShowUpload(true)}
          onToolHandoverUpload={() => setShowToolHandoverUpload(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-7 bg-slate-50/35 dark:bg-slate-950/25">
          <Outlet />
        </main>
      </div>
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onSubmitted={() => {
            setShowUpload(false);
            window.dispatchEvent(new Event('production-log-submitted'));
          }}
        />
      )}
      {showToolHandoverUpload && (
        <ToolHandoverUploadModal
          onClose={() => setShowToolHandoverUpload(false)}
          onSubmitted={() => {
            setShowToolHandoverUpload(false);
            window.dispatchEvent(new Event('production-log-submitted'));
          }}
        />
      )}
    </div>
  );
}

