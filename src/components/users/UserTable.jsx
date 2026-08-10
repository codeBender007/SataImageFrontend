import { Pencil, Trash2, ShieldCheck, User } from 'lucide-react';

export default function UserTable({ users, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="table-container">
        <div className="p-12 flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Loading users...</p>
        </div>
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="table-container">
        <div className="p-12 text-center">
          <p className="text-sm text-slate-500">No users found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50/80">
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
                <span className="font-mono text-xs font-semibold text-slate-700">{user.username}</span>
              </td>
              <td className="table-cell">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    user.role === 'admin' ? 'bg-indigo-100' : 'bg-emerald-100'
                  }`}>
                    {user.role === 'admin'
                      ? <ShieldCheck size={14} className="text-indigo-600" />
                      : <User size={14} className="text-emerald-600" />
                    }
                  </div>
                  <span className="font-medium text-slate-800">{user.fullName}</span>
                </div>
              </td>
              <td className="table-cell">
                <span className={user.role === 'admin' ? 'badge-admin' : 'badge-employee'}>
                  {user.role === 'admin' ? 'Admin' : 'Employee'}
                </span>
              </td>
              <td className="table-cell text-slate-600">{user.department}</td>
              <td className="table-cell text-slate-500 text-xs">{user.createdDate}</td>
              <td className="table-cell">
                <span className={user.status === 'active' ? 'badge-active' : 'badge-inactive'}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1 ${user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                  {user.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="table-cell text-center">
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
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
