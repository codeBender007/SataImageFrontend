import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import { Menu, LogOut, Factory, Shield, User } from 'lucide-react';

export default function AppLayout() {
  const { user, logout, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ── TOP HEADER ─────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          {/* Left: hamburger + brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Menu size={20} className="text-slate-600" />
            </button>
            <div className="flex items-center gap-3">
              <img src="/sata-vikas-logo.svg" alt="Sata Vikas Logo" className="h-8 w-auto" />
              <div className="hidden sm:block border-l border-slate-200 pl-3">
                <h1 className="text-sm font-bold text-slate-900 leading-tight">Production &amp; TPM Tracker</h1>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Sata Vikas India Pvt Ltd</p>
              </div>
            </div>
          </div>

          {/* Right: user info + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                {isAdmin
                  ? <Shield size={13} className="text-white" />
                  : <User size={13} className="text-white" />
                }
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-800 leading-tight">{user?.fullName}</p>
                <p className="text-[10px] text-slate-400 capitalize">{user?.role}</p>
              </div>
            </div>
            <span className={isAdmin ? 'badge-admin' : 'badge-employee'}>
              {isAdmin ? 'Admin' : 'Employee'}
            </span>
            <button
              onClick={logout}
              className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
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
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
