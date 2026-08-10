import { Pencil, Trash2, ShieldCheck, User } from 'lucide-react';

export default function UserTable({ users, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="table-container p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
        <div className="w-10 h-10 border-4 border-indigo-100 dark:border-indigo-950 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin mx-auto mb-3" />
        Loading users...
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="table-container p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
        No users found.
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50/80 dark:bg-slate-800/60">
            <th className="table-header">Username</th>
            <th className="table-header">Full Name</th>
            <th className="table-header">Role</th>
            <th className="table-header">Department</th>
            <th className="table-header">Created</th>
            <th className="table-header">Status</th>
            <th className="table-header text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="table-row">
              <td className="table-cell">
                <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  {user.username}
                </span>
              </td>
              <td className="table-cell">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.role === 'admin' ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {user.role === 'admin'
                      ? <ShieldCheck size={16} />
                      : <User size={16} />
                    }
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{user.fullName}</span>
                </div>
              </td>
              <td className="table-cell">
                <span className={user.role === 'admin' ? 'badge-admin' : 'badge-employee'}>
                  {user.role === 'admin' ? 'Admin' : 'Employee'}
                </span>
              </td>
              <td className="table-cell text-slate-600 dark:text-slate-300 font-medium">{user.department}</td>
              <td className="table-cell text-slate-500 dark:text-slate-400 text-xs font-mono">{user.createdDate}</td>
              <td className="table-cell">
                <span className={user.status === 'active' ? 'badge-active' : 'badge-inactive'}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  {user.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="table-cell text-center">
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 rounded-xl text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="p-2 rounded-xl text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/60 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

