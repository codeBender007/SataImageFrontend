import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileClock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getProductionLogs } from '../services/api';
import FilterBar from '../components/dashboard/FilterBar';
import EntryTable from '../components/dashboard/EntryTable';

export default function FOPRecordPage() {
  const { user, isAdmin } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ dateFrom: '', dateTo: '', shift: '', machineNo: '', search: '' });

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const apiFilters = { ...filters };
      if (!isAdmin) apiFilters.userId = user?.id;
      const data = await getProductionLogs(apiFilters);
      setLogs(data.filter(log => log.formType === 'tool-handover'));
    } catch (error) {
      console.error('Failed to fetch FOP records:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, isAdmin, user?.id]);

  useEffect(() => { fetchRecords(); }, [fetchRecords]);
  useEffect(() => {
    window.addEventListener('production-log-submitted', fetchRecords);
    return () => window.removeEventListener('production-log-submitted', fetchRecords);
  }, [fetchRecords]);

  return <div className="page-enter mx-auto max-w-7xl space-y-6">
    <div className="overview-banner min-h-[170px] p-6 text-slate-900 dark:text-white sm:p-8">
      <Link to="/dashboard" className="mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 transition-colors hover:text-violet-900 dark:text-violet-200 dark:hover:text-white"><ArrowLeft size={15} /> Dashboard Overview</Link>
      <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-600 text-white"><FileClock size={22} /></span><div><h2 className="page-heading text-2xl font-bold sm:text-3xl">First Operation Part (FOP) Record (Page - B)</h2><p className="mt-1 text-sm text-slate-500 dark:text-indigo-100/80">Dedicated FOP records, separate from the Dashboard Overview.</p></div></div>
    </div>
    <FilterBar filters={filters} setFilters={setFilters} />
    <EntryTable logs={logs} loading={loading} />
  </div>;
}
