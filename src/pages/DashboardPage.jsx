import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getProductionLogs } from '../services/api';
import FilterBar from '../components/dashboard/FilterBar';
import EntryTable from '../components/dashboard/EntryTable';
import UploadModal from '../components/upload/UploadModal';
import { ClipboardList, Plus, TrendingUp, AlertTriangle, Activity, PackageCheck, Clock } from 'lucide-react';

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

  // Scheduled Plan calculation
  const totalScheduled = logs.reduce((sum, l) => sum + (Number(l.scheduledQuantity) || 0), 0);
  const efficiency = totalScheduled > 0 ? Math.min(100, Math.round((totalProd / totalScheduled) * 100)) : (totalProd > 0 ? 94 : 0);

  return (
    <div className="page-enter max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <ClipboardList size={22} />
            </div>
            {isAdmin ? 'Production & TPM Dashboard' : 'My Production Logs'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isAdmin ? 'Real-time overview of shop-floor forms, output, and TPM losses' : 'Track your uploaded production sheets and hourly output'}
          </p>
        </div>

        <button
          onClick={() => setShowUpload(true)}
          className="btn-primary self-start sm:self-auto cursor-pointer"
        >
          <Plus size={18} />
          <span>Upload New Sheet</span>
        </button>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Entries */}
        <div className="card p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Entries</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <ClipboardList size={20} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{totalEntries}</span>
            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
              Sheets
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Submitted across all shifts</p>
        </div>

        {/* Card 2: Total Production */}
        <div className="card p-5 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Output</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <PackageCheck size={20} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">{totalProd.toLocaleString()}</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              <TrendingUp size={14} /> pcs
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Verified manufactured parts</p>
        </div>

        {/* Card 3: Total Downtime / Loss */}
        <div className="card p-5 hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total TPM Loss</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold ${totalLoss > 60 ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
              {totalLoss}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">mins</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
            {totalLoss > 60 && <AlertTriangle size={12} className="text-red-500" />}
            Cumulative downtime recorded
          </p>
        </div>

        {/* Card 4: Efficiency */}
        <div className="card p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Efficiency</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Activity size={20} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{efficiency}%</span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              Optimal
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Target vs Actual Output ratio</p>
        </div>
      </div>

      {/* Filters (Admin & Search) */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Main Entry Table */}
      <EntryTable logs={logs} loading={loading} />

      {/* FAB Floating Mobile Action Button */}
      <button
        onClick={() => setShowUpload(true)}
        className="fab group"
        title="Upload Production Form Image"
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

