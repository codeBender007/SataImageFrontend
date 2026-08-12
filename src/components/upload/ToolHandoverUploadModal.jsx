import { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { submitToolHandoverForm } from '../../services/api';
import { ClipboardPenLine, Image as ImageIcon, X } from 'lucide-react';
import ToolHandoverSheet from './ToolHandoverSheet';

const blankRecord = () => ({
  toolDescription: '',
  operationNo: '',
  machineNo: '',
  toolNo: '',
  time: '',
  reasonForFOP: '',
  fopParts: '',
  fopRejection: '',
  toolSetBy: '',
  handoverCheck: '',
  defect: '',
  remarks: '',
  materialOrTool: '',
});

export default function ToolHandoverUploadModal({ onClose, onSubmitted }) {
  const { user } = useAuth();
  const inputRef = useRef(null);
  const [step, setStep] = useState('upload');
  const [records, setRecords] = useState(Array.from({ length: 16 }, blankRecord));
  const [details, setDetails] = useState({ problemAnalysis: '', rootCause: '', action: '', shiftCommunication: '', supervisor: '' });

  const chooseFile = (file) => {
    if (!file?.type.startsWith('image/')) return;
    setStep('review');
  };

  const updateRecord = (index, field, value) => {
    setRecords(current => current.map((record, recordIndex) => recordIndex === index ? { ...record, [field]: value } : record));
  };

  const updateDetails = (field, value) => setDetails(current => ({ ...current, [field]: value }));

  const handleSubmit = async () => {
    const firstMachine = records.find(record => record.machineNo)?.machineNo || '—';
    const saved = await submitToolHandoverForm({
      records,
      details,
      date: new Date().toISOString().split('T')[0],
      shift: '—',
      machineNo: firstMachine,
      uploadedBy: user?.fullName || 'Unknown user',
      uploadedById: String(user?.id || ''),
      employeeId: `EMP-${String(user?.id || '').padStart(4, '0')}`,
      uploadedAt: new Date().toISOString()
    });
    onSubmitted?.(saved);
  };

  return (
    <div className="modal-overlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-content flex h-[92vh] max-w-[1440px] flex-col overflow-hidden">
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800 sm:px-6">
          <div className="flex items-center gap-2.5">
            <ClipboardPenLine size={20} className="text-violet-600 dark:text-violet-400" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Tool &amp; Shift Handover Form</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Import the sheet photo, then verify its tool and handover records.</p>
            </div>
        
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {step === 'upload' ? (
          <div className="m-auto w-full max-w-xl p-6">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDrop={(event) => { event.preventDefault(); chooseFile(event.dataTransfer.files?.[0]); }}
              onDragOver={(event) => event.preventDefault()}
              className="w-full rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50/60 p-12 text-center transition hover:border-violet-500 hover:bg-violet-50 dark:border-violet-800 dark:bg-violet-950/30 dark:hover:border-violet-500"
            >
              <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300"><ImageIcon size={30} /></span>
              <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">Drop the Tool &amp; Shift Handover form here</span>
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">or click to select a JPG, PNG, or HEIC photo</span>
            </button>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(event) => chooseFile(event.target.files?.[0])} />
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/60 dark:bg-slate-950/30">
              <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(event) => chooseFile(event.target.files?.[0])} />
              <ToolHandoverSheet records={records} details={details} onRecordChange={updateRecord} onDetailsChange={updateDetails} onSubmit={handleSubmit} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
