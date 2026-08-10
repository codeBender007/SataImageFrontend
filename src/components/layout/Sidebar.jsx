import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Users, ClipboardList, X, Activity } from 'lucide-react';

export default function Sidebar({ open, onClose }) {
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
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-xl
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
          <nav className="p-4 space-y-1.5">
            <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Navigation</p>
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                  ${isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold shadow-sm border border-indigo-100 dark:border-indigo-800/60'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'}`
                }
              >
                <link.icon size={19} className="shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom status badge */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div className="absolute w-4 h-4 rounded-full bg-emerald-500/30 animate-ping" />
            </div>
            <div className="flex items-center justify-between flex-1">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">System Online</span>
              <Activity size={13} className="text-emerald-500" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

