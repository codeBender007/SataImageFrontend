import { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import UserTable from '../components/users/UserTable';
import UserModal from '../components/users/UserModal';
import { Users, UserPlus, Shield, UserCheck, UserX } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSave = async (formData, userId) => {
    if (userId) {
      await updateUser(userId, formData);
    } else {
      await createUser(formData);
    }
    fetchUsers();
  };

  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete user "${user.fullName}"?`)) {
      await deleteUser(user.id);
      fetchUsers();
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser(null);
  };

  return (
    <div className="page-enter max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <Users size={22} />
            </div>
            User Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage shop-floor operator and administrator accounts</p>
        </div>
        <button
          onClick={() => { setEditUser(null); setShowModal(true); }}
          className="btn-primary cursor-pointer self-start sm:self-auto"
        >
          <UserPlus size={17} />
          Add New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Users</span>
            <Users size={16} className="text-indigo-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{users.length}</p>
        </div>

        <div className="card p-4 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Active</span>
            <UserCheck size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{users.filter(u => u.status === 'active').length}</p>
        </div>

        <div className="card p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Admins</span>
            <Shield size={16} className="text-indigo-500" />
          </div>
          <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{users.filter(u => u.role === 'admin').length}</p>
        </div>

        <div className="card p-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Operators</span>
            <Users size={16} className="text-slate-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-700 dark:text-slate-300">{users.filter(u => u.role === 'employee').length}</p>
        </div>
      </div>

      {/* Table */}
      <UserTable
        users={users}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      {showModal && (
        <UserModal
          user={editUser}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

