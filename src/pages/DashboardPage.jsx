import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getProductionLogs } from '../services/api';
import FilterBar from '../components/dashboard/FilterBar';
import EntryTable from '../components/dashboard/EntryTable';
import UploadModal from '../components/upload/UploadModal';
import { ClipboardList, Plus, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: '', dateTo: '', shift: '', machineNo: '', search: '',
  });

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const apiFilters = { ...filters };
      if (!isAdmin) apiFilters.userId = user.id;
      const data = await getProductionLogs(apiFilters);
      setLogs(data);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, [filters, isAdmin]);

  // Summary stats
  const totalEntries = logs.length;
  const totalProd = logs.reduce((sum, l) => sum + (l.totalProduction || 0), 0);
  const totalLoss = logs.reduce((sum, l) => sum + (l.totalLossMin || 0), 0);

  return (
    <div className="page-enter max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ClipboardList size={22} className="text-indigo-600" />
          {isAdmin ? 'Form Entries' : 'My Entries'}
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          {isAdmin ? 'View and manage all production form submissions' : 'View your submitted production forms'}
        </p>
      </div>



      {/* Filters (Admin Only) */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Table */}
      <EntryTable logs={logs} loading={loading} />

      {/* FAB */}
      <button
        onClick={() => setShowUpload(true)}
        className="fab group"
      >
        <Plus size={22} className="group-hover:rotate-90 transition-transform duration-300" />
        <span className="hidden sm:inline">Upload Form Image</span>
      </button>

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onSubmitted={() => {
            setShowUpload(false);
            fetchLogs();
          }}
        />
      )}
    </div>
  );
}
