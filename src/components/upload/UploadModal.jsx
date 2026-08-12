import { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { uploadFormImage, submitProductionLog } from '../../services/api';
import VerificationView from './VerificationView';
import { X, Upload, Image as ImageIcon, FileSearch, Loader2 } from 'lucide-react';

export default function UploadModal({ onClose, onSubmitted }) {
  const { user } = useAuth();
  const fileRef = useRef(null);
  const [step, setStep] = useState('upload'); // 'upload' | 'processing' | 'verify'
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setStep('processing');

    try {
      const extracted = await uploadFormImage(file);
      extracted.uploadedBy = user.fullName;
      extracted.uploadedById = String(user.id);
      extracted.entryPersonName = user.fullName;
      setFormData(extracted);
      setStep('verify');
    } catch (err) {
      console.error('OCR extraction failed:', err);
      setStep('upload');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleReupload = () => {
    setStep('upload');
    setImageUrl(null);
    setFormData(null);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitProductionLog(formData);
      onSubmitted?.();
    } catch (err) {
      console.error('Submit failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget && step !== 'processing') onClose(); }}>
      <div className={`modal-content flex flex-col ${step === 'verify' ? 'w-[95vw] h-[92vh] max-w-full' : 'w-full max-w-lg'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            {step === 'upload' && <Upload size={20} className="text-indigo-600 dark:text-indigo-400" />}
            {step === 'processing' && <Loader2 size={20} className="text-indigo-600 dark:text-indigo-400 animate-spin" />}
            {step === 'verify' && <FileSearch size={20} className="text-indigo-600 dark:text-indigo-400" />}
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {step === 'upload' && 'Upload Form Image'}
              {step === 'processing' && 'Processing Image OCR...'}
              {step === 'verify' && 'Verify Extracted Sheet Data'}
            </h3>
          </div>
          {step !== 'processing' && (
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer">
              <X size={18} />
            </button>
          )}
        </div>

        {/* ── Step: Upload ──────────────────────────── */}
        {step === 'upload' && (
          <div className="p-6">
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200
                         ${dragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              style={{ cursor: 'pointer' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400 shadow-inner">
                <ImageIcon size={30} />
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Drop your form photo here or click to browse
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Supports JPG, PNG, HEIC — Max 10MB
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>
          </div>
        )}

        {/* ── Step: Processing ─────────────────────── */}
        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-100 dark:border-indigo-950 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FileSearch size={24} className="text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">Extracting OCR Data from Form...</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Analyzing hourly production grid & TPM breakdown lines</p>
            </div>
            {/* Fake progress bar */}
            <div className="w-64 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full animate-pulse" style={{ width: '75%' }} />
            </div>
          </div>
        )}

        {/* ── Step: Verification ───────────────────── */}
        {step === 'verify' && formData && (
          <div className="flex-1 overflow-hidden">
            <VerificationView
              imageUrl={imageUrl}
              formData={formData}
              onChange={setFormData}
              onReupload={handleReupload}
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          </div>
        )}
      </div>
    </div>
  );
}

