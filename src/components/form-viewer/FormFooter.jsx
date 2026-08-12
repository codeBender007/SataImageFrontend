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
      {/* The printed sheet keeps all footer details in one compact row. */}
      <tr>
        <td className="form-label-cell bg-slate-100 dark:bg-slate-800" colSpan={4}>
          <div className="flex items-center gap-1 text-[10px] whitespace-nowrap">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Entry Person Name:</span>
            <Cell value={data.entryPersonName} field="entryPersonName" placeholder="Full name" />
          </div>
        </td>
        <td className="form-label-cell bg-slate-100 dark:bg-slate-800" colSpan={4}>
          <div className="flex items-center gap-1 text-[10px] whitespace-nowrap">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Abnormality Parts - Tool Change:</span>
            <Cell value={data.abnormalityToolChange} field="abnormalityToolChange" />
          </div>
        </td>
        <td className="form-label-cell bg-slate-100 dark:bg-slate-800" colSpan={4}>
          <div className="flex items-center gap-1 text-[10px] whitespace-nowrap">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Other Abnormality/Alarm:</span>
            <Cell value={data.otherAbnormality} field="otherAbnormality" />
          </div>
        </td>
      </tr>
    </>
  );
}

