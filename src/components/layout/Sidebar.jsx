import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Users, ClipboardList, X } from 'lucide-react';

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
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-slate-200 shadow-lg
                     flex flex-col justify-between
                     transform transition-transform duration-300 ease-in-out
                     lg:translate-x-0 lg:static lg:shadow-none lg:z-10
                     ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Mobile header close button */}
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-slate-100 shrink-0">
            <span className="font-semibold text-slate-800">Menu</span>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Navigation</p>
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                  ${isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm border border-indigo-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`
                }
              >
                <link.icon size={18} className="shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom status badge (flex layout — no absolute positioning overlap) */}
        <div className="p-4 border-t border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2 px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-500">System Online</span>
          </div>
        </div>
      </aside>
    </>
  );
}
