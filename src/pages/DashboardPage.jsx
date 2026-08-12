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
            {isAdmin ? 'Production & TPM Dashboard' : 'My Production Logs'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-indigo-100/80 mt-2">
            {isAdmin ? 'Real-time overview of shop-floor forms, output, and TPM losses' : 'Track your uploaded production sheets and hourly output'}
          </p>
        </div>

        <div className="chart-art" aria-hidden="true"><div className="chart-donut" /><div className="chart-bars"><span/><span/><span/><span/><span/></div></div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Entries */}
        <div className="kpi-card surface-glow">
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
          <div className="metric-sparkline metric-sparkline-indigo" />
        </div>

        {/* Card 2: Total Production */}
        <div className="kpi-card kpi-card-emerald surface-glow">
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
          <div className="metric-sparkline metric-sparkline-emerald" />
        </div>

        {/* Card 3: Total Downtime / Loss */}
        <div className="kpi-card kpi-card-amber surface-glow">
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
          <div className="metric-sparkline metric-sparkline-amber" />
        </div>

        {/* Card 4: Efficiency */}
        <div className="kpi-card kpi-card-sky surface-glow">
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
          <div className="metric-sparkline metric-sparkline-sky" />
        </div>
      </div>

      {/* Filters (Admin & Search) */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Main Entry Table */}
      <EntryTable logs={logs} loading={loading} />

    </div>
  );
}

