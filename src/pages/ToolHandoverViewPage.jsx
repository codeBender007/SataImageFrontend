import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { getProductionLogById } from '../services/api';
import ToolHandoverSheet from '../components/upload/ToolHandoverSheet';

export default function ToolHandoverViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => { getProductionLogById(id).then(setData).catch(() => setData(false)); }, [id]);

  if (data === null) return <div className="flex min-h-[60vh] items-center justify-center text-sm text-slate-500">Loading form…</div>;
  if (!data) return <div className="card mx-auto max-w-md p-8 text-center"><p className="font-semibold text-red-600">Form not found</p><button onClick={() => navigate('/dashboard')} className="btn-primary mt-4">Back to Dashboard</button></div>;

  return (
    <div className="page-enter mx-auto max-w-7xl space-y-4">
      <div className="card flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
        <div className="flex items-center gap-3"><button onClick={() => navigate('/dashboard')} className="btn-ghost !px-2.5" title="Back"><ArrowLeft size={20} /></button><div><h2 className="page-heading text-lg font-bold text-slate-900 dark:text-slate-100">Tool &amp; Handover Form #{id}</h2><p className="text-xs text-slate-500 dark:text-slate-400">{data.date} · Submitted by {data.uploadedBy}</p></div></div>
        <div className="flex gap-2"><button onClick={() => window.print()} className="btn-secondary text-xs"><Printer size={15} /> Print</button><button className="btn-secondary text-xs"><Download size={15} /> Export</button></div>
      </div>
      <div className="card overflow-hidden"><ToolHandoverSheet records={data.records || []} details={data.details || {}} onRecordChange={() => {}} onDetailsChange={() => {}} readOnly /></div>
    </div>
  );
}
