import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Users, ClipboardPenLine, ClipboardList, X, Activity, Sparkles, Upload } from 'lucide-react';

export default function Sidebar({ open, onClose, onUpload, onToolHandoverUpload }) {
  const { isAdmin } = useAuth();

  const links = [
    { to: '/dashboard', icon: isAdmin ? ClipboardList : LayoutDashboard, label: isAdmin ? 'Form Entries' : 'My Entries' },
    ...(isAdmin ? [{ to: '/users', icon: Users, label: 'User Management' }] : []),
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-[296px] bg-white/85 dark:bg-slate-950/80 border-r border-slate-200 dark:border-slate-800/80 shadow-xl backdrop-blur-2xl
                     flex flex-col justify-between
                     transform transition-transform duration-300 ease-in-out
                     lg:translate-x-0 lg:static lg:shadow-none lg:z-10
                     ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Mobile header close button */}
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-slate-100 dark:border-slate-800 shrink-0">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Menu</span>
            <button onClick={onClose} className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-500 dark:text-slate-400">
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-5 space-y-1.5">
            <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">Navigation</p>
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                  ${isActive
                    ? 'bg-gradient-to-r from-indigo-100/90 to-violet-50 dark:from-indigo-950/80 dark:to-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold shadow-sm border border-indigo-100 dark:border-indigo-700/60'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'}`
                }
              >
                <link.icon size={19} className="shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="px-5 pb-5">
            <button
              type="button"
              onClick={() => { onUpload?.(); onClose?.(); }}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
            >
              <Upload size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
              Upload Form Photo
            </button>
            <p className="mt-2 px-1 text-center text-[11px] leading-4 text-slate-400 dark:text-slate-500">
              Import a completed production sheet for verification.
            </p>
            <button
              type="button"
              onClick={() => { onToolHandoverUpload?.(); onClose?.(); }}
              className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 transition-all hover:-translate-y-0.5 hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300 dark:hover:bg-violet-950/70 dark:focus:ring-offset-slate-950"
            >
              <ClipboardPenLine size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
              Upload Tool &amp; Handover Form
            </button>
            <p className="mt-2 px-1 text-center text-[11px] leading-4 text-slate-400 dark:text-slate-500">
              Import the separate tool, EOP/FOP, and shift handover sheet.
            </p>
          </div>
        </div>

        {/* Bottom status badge */}
        <div className="p-5 space-y-4 border-t border-slate-100 dark:border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div className="absolute w-4 h-4 rounded-full bg-emerald-500/30 animate-ping" />
            </div>
            <div className="flex items-center justify-between flex-1">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">System Online</span>
              <Activity size={13} className="text-emerald-500" />
            </div>
          </div>
          <div className="sidebar-promo hidden lg:block">
            <div className="relative z-10 mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
              <Sparkles size={22} />
            </div>
            <h3 className="relative z-10 text-sm font-bold text-slate-900 dark:text-white">Stay Organized</h3>
            <p className="relative z-10 mt-2 text-xs leading-5 text-slate-500 dark:text-slate-300">Upload production sheets and track output efficiency in real time.</p>
          </div>
        </div>
      </aside>
    </>
  );
}

