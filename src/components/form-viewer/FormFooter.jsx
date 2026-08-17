export default function FormFooter({ data, editable, onChange }) {
  const update = (field, value) => {
    if (onChange) onChange({ ...data, [field]: value });
  };

  const Cell = ({ value, field, placeholder }) => (
    editable ? (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => update(field, e.target.value)}
        placeholder={placeholder || ''}
        className="form-cell-input text-left px-1"
      />
    ) : (
      <span className="text-xs text-slate-900 dark:text-slate-100 font-semibold">{value || '—'}</span>
    )
  );

  return (
    <>
      {/* The original paper form has one final row with all three notes. */}
      <tr>
        <td className="form-label-cell bg-slate-100 dark:bg-slate-800 px-1.5 py-1" colSpan={4}>
          <div className="flex min-w-0 items-center gap-1 text-[10px] text-slate-800 dark:text-slate-200">
            <span className="shrink-0 font-semibold">Entry person Name :</span>
            <span className="min-w-0 flex-1"><Cell value={data.entryPersonName} field="entryPersonName" placeholder="Write full name" /></span>
          </div>
        </td>
        <td className="form-label-cell bg-slate-100 dark:bg-slate-800 px-1.5 py-1" colSpan={4}>
          <div className="flex min-w-0 items-center gap-1 text-[10px] text-slate-800 dark:text-slate-200">
            <span className="shrink-0 font-semibold">Abnormality Parts - Tool change :</span>
            <span className="min-w-0 flex-1"><Cell value={data.abnormalityToolChange} field="abnormalityToolChange" /></span>
          </div>
        </td>
        <td className="form-label-cell bg-slate-100 dark:bg-slate-800 px-1.5 py-1" colSpan={4}>
          <div className="flex min-w-0 items-center gap-1 text-[10px] text-slate-800 dark:text-slate-200">
            <span className="shrink-0 font-semibold">Other abnormality/Alarm :</span>
            <span className="min-w-0 flex-1"><Cell value={data.otherAbnormality} field="otherAbnormality" /></span>
          </div>
        </td>
      </tr>
    </>
  );
}

