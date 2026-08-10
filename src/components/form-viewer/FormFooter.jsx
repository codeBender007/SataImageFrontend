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
      {/* Entry Person Name & Abnormalities */}
      <tr>
        <td className="form-label-cell bg-slate-100 dark:bg-slate-800" colSpan={2}>
          <div className="text-[10px]">
            <div className="font-semibold text-slate-800 dark:text-slate-200">Entry person Name :</div>
            <div className="text-[9px] text-slate-400 dark:text-slate-500 font-normal">(Write full name)</div>
          </div>
        </td>
        <td className="form-cell" colSpan={3}>
          <Cell value={data.entryPersonName} field="entryPersonName" placeholder="Full name" />
        </td>
        <td className="form-label-cell bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-800 dark:text-slate-200" colSpan={3}>
          Abnormality Parts - Tool change :
        </td>
        <td className="form-cell" colSpan={4}>
          <Cell value={data.abnormalityToolChange} field="abnormalityToolChange" />
        </td>
      </tr>

      {/* Other abnormality/Alarm */}
      <tr>
        <td className="form-label-cell bg-slate-100 dark:bg-slate-800" colSpan={2}></td>
        <td className="form-cell" colSpan={3}></td>
        <td className="form-label-cell bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-800 dark:text-slate-200" colSpan={3}>
          Other abnormality/Alarm :
        </td>
        <td className="form-cell" colSpan={4}>
          <Cell value={data.otherAbnormality} field="otherAbnormality" />
        </td>
      </tr>
    </>
  );
}

