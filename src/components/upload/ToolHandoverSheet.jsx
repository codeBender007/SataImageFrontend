import { CheckCircle2 } from 'lucide-react';

const toolFields = [
  ['toolDescription', 'Tool description'], ['operationNo', 'Opn no.'], ['machineNo', 'Machine no.'],
  ['reasonForEOP', 'Reason for EOP'], ['eop', 'EOP'], ['fop', 'FOP'], ['toolSetBy', 'Tool set by'],
];

function Cell({ value, onChange, className = '', readOnly = false }) {
  return <input readOnly={readOnly} value={value || ''} onChange={(event) => onChange(event.target.value)} className={`h-full min-h-[27px] w-full bg-transparent px-1 text-center text-[10px] text-slate-900 outline-none focus:bg-violet-50 dark:text-slate-100 dark:focus:bg-violet-950/40 ${className}`} />;
}

export default function ToolHandoverSheet({ records, details, onRecordChange, onDetailsChange, onSubmit, readOnly = false }) {
  return (
    <div className="mx-auto w-full max-w-[1040px] p-3 sm:p-5">
      <div className="overflow-x-auto rounded-xl border border-slate-300 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.09)] dark:border-slate-600 dark:bg-slate-900">
        <div className="min-w-[920px] p-2 sm:p-3">
          <table className="w-full border-collapse text-[10px] text-slate-700 dark:text-slate-200">
            <tbody>
              <tr>
                <td colSpan={2} className="border border-slate-400 px-2 py-1.5 align-top text-[9px] dark:border-slate-600"><span className="text-slate-500">Page</span> 6</td>
                <td colSpan={5} className="border border-slate-400 px-2 py-1.5 text-center font-bold text-[12px] text-slate-900 dark:border-slate-600 dark:text-white">Tool / Shift Handover &amp; Material Communication Record</td>
                <td colSpan={2} className="border border-slate-400 px-2 py-1.5 text-right dark:border-slate-600"><span className="text-slate-500">Date &amp; Shift:</span> as mentioned on page A</td>
              </tr>
              <tr className="bg-slate-100 text-center font-bold dark:bg-slate-800">
                {['Tool Description', 'Opn No', 'M/c No', 'Reason for EOP', 'EOP', 'FOP', 'Tool set by'].map((label, index) => <td key={label} colSpan={index === 0 ? 2 : 1} className="border border-slate-400 px-1 py-1.5 dark:border-slate-600">{label}</td>)}
              </tr>
              {records.concat(Array.from({ length: Math.max(0, 9 - records.length) }, () => ({}))).map((record, index) => (
                <tr key={index}>
                  {toolFields.map(([field], fieldIndex) => <td key={field} colSpan={fieldIndex === 0 ? 2 : 1} className="border border-slate-400 p-0 dark:border-slate-600"><Cell readOnly={readOnly} value={record[field]} onChange={(value) => index < records.length && onRecordChange(index, field, value)} className={fieldIndex === 0 ? 'text-left' : ''} /></td>)}
                </tr>
              ))}
              <tr><td colSpan={9} className="h-2 border-x border-slate-400 dark:border-slate-600" /></tr>
              <tr>
                <td colSpan={6} className="border border-slate-400 bg-slate-100 px-2 py-1 font-bold dark:border-slate-600 dark:bg-slate-800">Shift handover / Take over communication (MUST)</td>
                <td colSpan={3} className="border border-slate-400 bg-slate-100 px-2 py-1 text-center font-bold dark:border-slate-600 dark:bg-slate-800">Red table REJECT / Total Defect (MUST FILL)</td>
              </tr>
              {[['Problem Analysis', 'problemAnalysis'], ['Why?', 'shiftCommunication'], ['Why?', ''], ['Why?', ''], ['Why?', ''], ['Root Cause', 'rootCause'], ['Action 1', 'action'], ['Action 2', '']].map(([label, field]) => (
                <tr key={`${label}-${field}`}>
                  <td colSpan={2} className="border border-slate-400 px-2 py-1 text-slate-600 dark:border-slate-600 dark:text-slate-300">{label}</td>
                  <td colSpan={4} className="border border-slate-400 p-0 dark:border-slate-600"><Cell readOnly={readOnly} value={field ? details[field] : ''} onChange={(value) => field && onDetailsChange(field, value)} className="text-left" /></td>
                  <td colSpan={3} className="border border-slate-400 dark:border-slate-600" />
                </tr>
              ))}
              <tr><td colSpan={9} className="h-2 border-x border-slate-400 dark:border-slate-600" /></tr>
              <tr>
                <td colSpan={5} className="border border-slate-400 bg-slate-100 px-2 py-1 font-bold dark:border-slate-600 dark:bg-slate-800">Shift communication / Remark</td>
                <td colSpan={4} className="border border-slate-400 bg-slate-100 px-2 py-1 font-bold dark:border-slate-600 dark:bg-slate-800">Material &amp; Tool related communication</td>
              </tr>
              <tr>
                <td colSpan={5} className="border border-slate-400 p-0 dark:border-slate-600"><Cell readOnly={readOnly} value={details.shiftCommunication} onChange={(value) => onDetailsChange('shiftCommunication', value)} className="min-h-[55px] text-left" /></td>
                <td colSpan={4} className="border border-slate-400 p-0 dark:border-slate-600"><Cell readOnly={readOnly} value={records[0]?.materialOrTool} onChange={(value) => onRecordChange(0, 'materialOrTool', value)} className="min-h-[55px] text-left" /></td>
              </tr>
              <tr>
                <td colSpan={2} className="border border-slate-400 bg-slate-50 px-2 py-1 dark:border-slate-600 dark:bg-slate-800/70">Supervisor</td>
                <td colSpan={3} className="border border-slate-400 p-0 dark:border-slate-600"><Cell readOnly={readOnly} value={details.supervisor} onChange={(value) => onDetailsChange('supervisor', value)} className="text-left" /></td>
                <td colSpan={2} className="border border-slate-400 bg-slate-50 px-2 py-1 dark:border-slate-600 dark:bg-slate-800/70">Signature</td>
                <td colSpan={2} className="border border-slate-400 dark:border-slate-600" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {!readOnly && <div className="mt-4 flex justify-end"><button type="button" onClick={onSubmit} className="btn-success text-xs"><CheckCircle2 size={16} /> Save Tool &amp; Handover Form</button></div>}
    </div>
  );
}
