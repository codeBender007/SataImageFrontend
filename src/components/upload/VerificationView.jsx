import { useState } from 'react';
import ImagePreview from './ImagePreview';
import FormViewer from '../form-viewer/FormViewer';
import { Camera, FileEdit, CheckCircle2, RotateCcw } from 'lucide-react';

export default function VerificationView({ imageUrl, formData, onChange, onReupload, onSubmit, submitting }) {
  const [mobileTab, setMobileTab] = useState('form'); // 'photo' | 'form'

  return (
    <div className="flex flex-col h-full max-h-[85vh]">
      {/* Instruction banner */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800/60 px-4 py-2.5 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
          <p className="text-xs text-amber-900 dark:text-amber-200 font-semibold">
            <strong>Double Verification:</strong> Compare the uploaded photo with extracted entries below. Edit any values before submitting.
          </p>
        </div>
      </div>

      {/* Mobile Tab Toggle (Visible on screens < 1280px) */}
      <div className="flex xl:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shrink-0 gap-2">
        <button
          onClick={() => setMobileTab('photo')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'photo' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Camera size={14} /> View Form Photo
        </button>
        <button
          onClick={() => setMobileTab('form')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'form' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <FileEdit size={14} /> Edit Form Entries
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-0 overflow-hidden min-h-[400px]">
        {/* Left: Image Preview (Desktop always shown; Mobile conditional) */}
        <div className={`border-r border-slate-200 dark:border-slate-800 flex-col overflow-hidden ${
          mobileTab === 'photo' ? 'flex' : 'hidden xl:flex'
        }`}>
          <div className="bg-slate-50 dark:bg-slate-800/80 px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Camera size={14} className="text-indigo-600 dark:text-indigo-400" /> Uploaded Form Image
            </h4>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Pinch or scroll to zoom</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <ImagePreview imageUrl={imageUrl} />
          </div>
        </div>

        {/* Right: Editable Form (Desktop always shown; Mobile conditional) */}
        <div className={`flex-col overflow-hidden ${
          mobileTab === 'form' ? 'flex' : 'hidden xl:flex'
        }`}>
          <div className="bg-slate-50 dark:bg-slate-800/80 px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileEdit size={14} className="text-indigo-600 dark:text-indigo-400" /> Extracted Form Data (Editable)
            </h4>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-semibold">
              Live Editing Enabled
            </span>
          </div>
          <div className="flex-1 overflow-auto p-2 sm:p-3">
            <FormViewer data={formData} editable={true} onChange={onChange} />
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shadow-lg shrink-0">
        <button
          onClick={onReupload}
          className="btn-secondary text-xs flex items-center gap-1 cursor-pointer"
          disabled={submitting}
        >
          <RotateCcw size={14} /> Re-upload
        </button>

        <button
          onClick={onSubmit}
          disabled={submitting}
          className="btn-success text-xs flex items-center gap-1.5 px-5 cursor-pointer"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              Confirm &amp; Submit to DB
            </>
          )}
        </button>
      </div>
    </div>
  );
}

