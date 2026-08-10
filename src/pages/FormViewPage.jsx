import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getProductionLogById, updateProductionLog } from '../services/api';
import FormViewer from '../components/form-viewer/FormViewer';
import { ArrowLeft, Printer, Download, Edit2, Save, CheckCircle } from 'lucide-react';

export default function FormViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const log = await getProductionLogById(id);
        setData(log);
      } catch (err) {
        setError(err.message || 'Failed to load form data');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const canEdit = isAdmin || String(data?.uploadedById) === String(user?.id);

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const updated = await updateProductionLog(id, data);
      setData(updated);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update form:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Loading form data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="card p-8 text-center max-w-md">
          <p className="text-red-600 font-medium mb-2">Error</p>
          <p className="text-sm text-slate-600">{error}</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary mt-4">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="btn-ghost !px-2 cursor-pointer">
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Production Form #{id}</h2>
              {saveSuccess && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold animate-fade-in">
                  <CheckCircle size={12} /> Saved Successfully
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {data?.date} · Shift {data?.shift} · {data?.machineNo} · Uploaded by <strong className="text-slate-700">{data?.uploadedBy}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {canEdit && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`btn-secondary text-xs cursor-pointer ${isEditing ? 'bg-amber-50 text-amber-800 border-amber-300' : ''}`}
            >
              <Edit2 size={15} />
              {isEditing ? 'Cancel Edit' : 'Edit Mode'}
            </button>
          )}

          {isEditing && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-success text-xs cursor-pointer flex items-center gap-1.5"
            >
              <Save size={15} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          )}

          <button onClick={() => window.print()} className="btn-secondary text-xs cursor-pointer">
            <Printer size={15} />
            Print
          </button>
          <button className="btn-secondary text-xs cursor-pointer">
            <Download size={15} />
            Export
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
          <Edit2 size={16} className="text-amber-600 shrink-0" />
          <span>
            <strong>Form Edit Mode Active:</strong> You can edit any grid cell or header field below. Click <strong>"Save Changes"</strong> to update the record in the database.
          </span>
        </div>
      )}

      {/* Form Viewer Component (Read-Only vs Editable) */}
      <div className="card p-4 lg:p-6 overflow-hidden">
        <FormViewer data={data} editable={isEditing} onChange={setData} />
      </div>
    </div>
  );
}
