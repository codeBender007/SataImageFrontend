import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getProductionLogs } from '../services/api';
import FilterBar from '../components/dashboard/FilterBar';
import EntryTable from '../components/dashboard/EntryTable';
import { ClipboardList, TrendingUp, AlertTriangle, Activity, PackageCheck, Clock, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateFrom: '', dateTo: '', shift: '', machineNo: '', search: '',
  });

  const fetchLogs = useCallback(async () => {
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
  }, [filters, isAdmin, user?.id]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  useEffect(() => {
    window.addEventListener('production-log-submitted', fetchLogs);
    return () => window.removeEventListener('production-log-submitted', fetchLogs);
  }, [fetchLogs]);

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
      <div className="overview-banner p-6 sm:p-8 text-slate-900 dark:text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[202px]">
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200/80 dark:border-indigo-300/20 bg-white/45 dark:bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-200">
            <Sparkles size={13} /> Operations overview
          </div>
          <h2 className="page-heading text-2xl sm:text-3xl font-bold flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-white/10 text-indigo-600 dark:text-white">
              <ClipboardList size={22} />
            </div>
            {isAdmin ? '' : 'My Production Logs'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-indigo-100/80 mt-2">
            {isAdmin ? 'Real-time overview of shop-floor forms, output, and TPM losses' : 'Track your uploaded production sheets and hourly output'}
          </p>
        </div>

        <div className="chart-art" aria-hidden="true"><div className="chart-donut" /><div className="chart-bars"><span/><span/><span/><span/><span/></div></div>
      </div>

      {/* Filters (Admin & Search) */}
      <FilterBar filters={filters} setFilters={setFilters} />

      <EntryTable logs={logs} loading={loading} />

    </div>
  );
}

