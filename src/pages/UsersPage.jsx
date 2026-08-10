import { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import UserTable from '../components/users/UserTable';
import UserModal from '../components/users/UserModal';
import { Users, UserPlus } from 'lucide-react';

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
    <div className="page-enter max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users size={22} className="text-indigo-600" />
            User Management
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage operator and admin accounts</p>
        </div>
        <button
          onClick={() => { setEditUser(null); setShowModal(true); }}
          className="btn-primary cursor-pointer"
        >
          <UserPlus size={17} />
          Add New User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="card p-3">
          <p className="text-2xl font-bold text-slate-900">{users.length}</p>
          <p className="text-xs text-slate-500">Total Users</p>
        </div>
        <div className="card p-3">
          <p className="text-2xl font-bold text-emerald-700">{users.filter(u => u.status === 'active').length}</p>
          <p className="text-xs text-slate-500">Active</p>
        </div>
        <div className="card p-3">
          <p className="text-2xl font-bold text-indigo-700">{users.filter(u => u.role === 'admin').length}</p>
          <p className="text-xs text-slate-500">Admins</p>
        </div>
        <div className="card p-3">
          <p className="text-2xl font-bold text-slate-600">{users.filter(u => u.role === 'employee').length}</p>
          <p className="text-xs text-slate-500">Employees</p>
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
