import { CheckCircle2 } from 'lucide-react';

const fields = ['toolDescription', 'operationNo', 'machineNo', 'toolNo', 'time', 'reasonForFOP', 'fopParts', 'fopRejection', 'toolSetBy'];
const handoverRows = ['Problem Analysis :', 'Why?', 'Why?', 'Why?', 'Why?', 'Why?', 'Root Cause :', 'Action 1 :', 'Action 2 :'];
const pdiRows = [
  'Part 1', 'Part 2', 'Rework generation - Part 1', 'Rework generation - Part 2',
  'Rework cleared in shift - Part 1', 'Rework cleared in shift - Part 2',
  'Rework approval No : XYZ', 'Tool No. XYZ', 'Tool No. ABCD', 'Total',
];
const operationNumbers = ['10', '20', '30', '40', '50', '60', '70', '80', '90', 'Total'];
const materialOperationRows = ['', 'M/c (Opn#)', 'Op#10', 'Op#20', 'Op#30', 'Op#40', 'Op#50', 'Op#60', 'Op#70', 'TOTAL :'];

function Field({ value, onChange, readOnly, className = '' }) {
  return <input readOnly={readOnly} value={value || ''} onChange={(event) => onChange(event.target.value)} className={`min-h-[24px] w-full bg-transparent px-1 text-center text-[10px] text-slate-900 outline-none focus:bg-violet-50 dark:text-slate-100 dark:focus:bg-violet-950/40 ${className}`} />;
}

export default function ToolHandoverSheet({ records, details, onRecordChange, onDetailsChange, onSubmit, readOnly = false }) {
  const safeRecords = records.concat(Array.from({ length: Math.max(0, 16 - records.length) }, () => ({})));
  const setDetail = (field, value) => !readOnly && onDetailsChange(field, value);



  return (
    <div className="mx-auto w-full max-w-[1120px] p-3 sm:p-5">
      <div className="overflow-x-auto rounded-xl border border-slate-300 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.09)] dark:border-slate-600 dark:bg-slate-900">
        <div className="min-w-[1020px] p-2 sm:p-3">
          <table className="w-full border-collapse text-[10px] leading-tight text-slate-700 dark:text-slate-200">
            <tbody>
              <tr><td colSpan={2} className="border border-slate-400 px-2 py-1.5 font-semibold dark:border-slate-600">Page B</td><td colSpan={8} className="border border-slate-400 px-2 py-1 text-center font-bold text-[12px] text-slate-900 dark:border-slate-600 dark:text-white">First Operation Part (FOP) Record</td><td colSpan={2} className="border border-slate-400 px-2 py-1 text-center text-[9px] dark:border-slate-600">(Date &amp; shift as mentioned on page A)</td></tr>
              <tr className="bg-slate-100 text-center font-bold dark:bg-slate-800">
                <td colSpan={2} className="border border-slate-400 px-1 py-1.5 dark:border-slate-600">Tool Description</td><td className="border border-slate-400 px-1 dark:border-slate-600">Opn</td><td className="border border-slate-400 px-1 dark:border-slate-600">M/c No</td><td className="border border-slate-400 px-1 dark:border-slate-600">Tool No</td><td className="border border-slate-400 px-1 dark:border-slate-600">Time</td><td colSpan={2} className="border border-slate-400 px-1 dark:border-slate-600">Reason for FOP</td><td className="border border-slate-400 px-1 dark:border-slate-600">FOP parts</td><td className="border border-slate-400 px-1 dark:border-slate-600">FOP Rej.</td><td colSpan={2} className="border border-slate-400 px-1 dark:border-slate-600">Tool setting by</td>
              </tr>
              {safeRecords.map((record, index) => <tr key={index}>{fields.map((field, fieldIndex) => <td key={field} colSpan={fieldIndex === 0 || fieldIndex === 5 || fieldIndex === 8 ? 2 : 1} className="border border-slate-400 p-0 dark:border-slate-600"><Field readOnly={readOnly} value={record[field]} onChange={(value) => onRecordChange(index, field, value)} className={fieldIndex === 0 || fieldIndex === 5 ? 'text-left' : ''} /></td>)}</tr>)}
              <tr><td colSpan={12} className="h-2 border-x border-slate-400 dark:border-slate-600" /></tr>
              <tr><td colSpan={7} className="border border-slate-400 bg-slate-100 px-2 py-1.5 font-bold text-[11px] dark:border-slate-600 dark:bg-slate-800">Shift handover/Take over communication (MUST)</td><td colSpan={5} className="border border-slate-400 bg-slate-100 px-2 py-1.5 text-center font-bold text-[11px] dark:border-slate-600 dark:bg-slate-800">Red table REJECT / DEFECT<br />Total Defect (MUST FILL)</td></tr>
              {handoverRows.map((label, index) => <tr key={`${label}-${index}`}><td colSpan={2} className="border border-slate-400 px-2 py-1 dark:border-slate-600">{label}</td><td colSpan={3} className="border border-slate-400 p-0 dark:border-slate-600"><Field readOnly={readOnly} value={index === 0 ? details.problemAnalysis : index === 6 ? details.rootCause : index === 7 ? details.action : ''} onChange={(value) => setDetail(index === 0 ? 'problemAnalysis' : index === 6 ? 'rootCause' : 'action', value)} className="text-left" /></td><td colSpan={2} className="border border-slate-400 px-1 dark:border-slate-600">{index === 1 ? 'Handover check :' : index === 2 ? 'RM on line-Qty' : index === 3 ? 'Running Cavity' : index === 4 ? 'All Gauges online (Y/N)' : index === 5 ? 'Missing Gauges :' : index === 7 ? 'PDI Report/PV No.' : index === 8 ? 'Tool In/with line No.' : ''}</td><td className="border border-slate-400 text-center dark:border-slate-600">{index > 0 && index < 6 ? 'Start' : ''}</td><td className="border border-slate-400 text-center dark:border-slate-600">{index > 0 && index < 6 ? 'End' : ''}</td><td colSpan={2} className="border border-slate-400 dark:border-slate-600" /></tr>)}
              <tr><td colSpan={12} className="h-2 border-x border-slate-400 dark:border-slate-600" /></tr>
              <tr><td colSpan={5} className="border border-slate-400 bg-slate-100 px-2 py-1.5 font-bold dark:border-slate-600 dark:bg-slate-800">Shift communication / Remark :</td><td colSpan={3} className="border border-slate-400 bg-slate-100 px-2 py-1.5 text-center font-bold dark:border-slate-600 dark:bg-slate-800">Opn# defect / Sh :</td><td colSpan={4} className="border border-slate-400 bg-slate-100 px-2 py-1.5 text-center font-bold dark:border-slate-600 dark:bg-slate-800">Material &amp; Tool related communication</td></tr>
              <tr><td colSpan={5} className="border border-slate-400 bg-slate-50 px-2 py-1 font-semibold dark:border-slate-600 dark:bg-slate-800/70">PDI OK parts for shift (PDI Insp. to write)</td><td className="border border-slate-400 bg-slate-50 px-1 text-center font-semibold dark:border-slate-600 dark:bg-slate-800/70">Opn#</td><td className="border border-slate-400 bg-slate-50 px-1 text-center font-semibold dark:border-slate-600 dark:bg-slate-800/70">MR</td><td className="border border-slate-400 bg-slate-50 px-1 text-center font-semibold dark:border-slate-600 dark:bg-slate-800/70">CR</td><td colSpan={2} className="border border-slate-400 bg-slate-50 px-1 font-semibold dark:border-slate-600 dark:bg-slate-800/70">Supplier Information :</td><td colSpan={2} className="border border-slate-400 bg-slate-50 px-1 font-semibold dark:border-slate-600 dark:bg-slate-800/70">Die/Cavity No. / XYZ</td></tr>
              {pdiRows.map((label, index) => <tr key={label}>
                <td colSpan={5} className="border border-slate-400 px-2 py-1 dark:border-slate-600">{label} :</td>
                <td className="border border-slate-400 px-1 text-center font-semibold dark:border-slate-600">{operationNumbers[index]}</td>
                <td className="border border-slate-400 p-0 dark:border-slate-600"><Field readOnly={readOnly} value="" onChange={() => {}} /></td>
                <td className="border border-slate-400 p-0 dark:border-slate-600"><Field readOnly={readOnly} value="" onChange={() => {}} /></td>
                {index === 0 ? <td colSpan={4} className="border border-slate-400 p-0 dark:border-slate-600"><Field readOnly={readOnly} value={records[0]?.materialOrTool} onChange={(value) => onRecordChange(0, 'materialOrTool', value)} className="text-left" /></td> : index === 1 ? <><td colSpan={2} className="border border-slate-400 px-1 text-center font-semibold dark:border-slate-600">{materialOperationRows[index]}</td><td colSpan={2} className="border border-slate-400 px-1 text-center font-semibold dark:border-slate-600">Abnormality / Alarm (Mention time here)</td></> : <><td colSpan={2} className="border border-slate-400 px-2 dark:border-slate-600">{materialOperationRows[index]}</td><td colSpan={2} className="border border-slate-400 dark:border-slate-600">{index === 9 ? 'XYZ' : ''}</td></>}
              </tr>)}
              <tr><td colSpan={5} className="border border-slate-400 p-0 dark:border-slate-600"><Field readOnly={readOnly} value={details.shiftCommunication} onChange={(value) => setDetail('shiftCommunication', value)} className="min-h-[28px] text-left" /></td><td colSpan={3} className="border border-slate-400 dark:border-slate-600" /><td colSpan={4} className="border border-slate-400 dark:border-slate-600" /></tr>
              <tr><td colSpan={5} className="border border-slate-400 px-2 py-1 font-semibold dark:border-slate-600">Prepared by - Employee No :</td><td colSpan={4} className="border border-slate-400 dark:border-slate-600" /><td colSpan={3} className="border border-slate-400 px-2 py-1 text-right font-semibold dark:border-slate-600">Module Incharge / Supervisor</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      {!readOnly && <div className="mt-4 flex justify-end"><button type="button" onClick={onSubmit} className="btn-success text-xs"><CheckCircle2 size={16} /> Save Tool &amp; Handover Form</button></div>}
    </div>
  );
}
