const HR_KEYS = ['hr1', 'hr2', 'hr3', 'hr4', 'hr5', 'hr6', 'hr7', 'hr8', 'hr9', 'total'];

function HourRow({ label, sublabel, dataKey, data, editable, onChange, highlight }) {
  const rowData = data[dataKey] || {};

  const updateCell = (hrKey, value) => {
    if (!onChange) return;
    const updated = { ...data, [dataKey]: { ...rowData, [hrKey]: value } };
    onChange(updated);
  };

  return (
    <tr>
      <td className={`form-label-cell text-[10px] ${highlight ? 'bg-indigo-50/80 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200' : ''}`} colSpan={2}>
        <div className="leading-tight">
          {sublabel && <span className="text-slate-400 dark:text-slate-500 text-[9px]">{sublabel} </span>}
          {label}
        </div>
      </td>
      {HR_KEYS.map(hrKey => (
        <td key={hrKey} className={`form-cell ${hrKey === 'total' ? 'bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100' : ''} ${highlight ? 'bg-indigo-50/40 dark:bg-indigo-950/40' : ''}`}>
          {editable ? (
            <input
              type="text"
              value={rowData[hrKey] || ''}
              onChange={(e) => updateCell(hrKey, e.target.value)}
              className="form-cell-input"
            />
          ) : (
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{rowData[hrKey] || ''}</span>
          )}
        </td>
      ))}
    </tr>
  );
}

export default function ProductionGrid({ data, editable, onChange }) {
  const update = (field, value) => {
    if (onChange) onChange({ ...data, [field]: value });
  };

  const UPHRow = () => (
    <tr>
      <td className="form-label-cell text-[10px]" colSpan={2}>
        <div className="flex items-center gap-1 text-[10px]">
          Scheduled Quantity :
          {editable ? (
            <input
              type="text"
              value={data.scheduledQuantity || ''}
              onChange={(e) => update('scheduledQuantity', e.target.value)}
              className="form-cell-input w-16"
            />
          ) : (
            <span className="font-bold text-slate-900 dark:text-slate-100">{data.scheduledQuantity || ''}</span>
          )}
        </div>
      </td>
      <td className="form-cell bg-indigo-100 dark:bg-indigo-950 font-extrabold text-indigo-700 dark:text-indigo-300">
        {editable ? (
          <input type="text" value={data.uph || ''} onChange={(e) => update('uph', e.target.value)}
            className="form-cell-input font-bold text-indigo-700 dark:text-indigo-300" />
        ) : (
          <span>{data.uph || ''}</span>
        )}
      </td>
      {['hr1','hr2','hr3','hr4','hr5','hr6','hr7','hr8','hr9'].map(h => (
        <td key={h} className="form-cell bg-slate-50/50 dark:bg-slate-900/50"></td>
      ))}
    </tr>
  );

  return (
    <>
      {/* UPH Row */}
      <UPHRow />

      {/* ── Part No 1 ──────────────────────────────────── */}
      <tr>
        <td className="form-label-cell bg-indigo-100/80 dark:bg-indigo-950/80 font-bold text-indigo-900 dark:text-indigo-200 text-[10px]" colSpan={2}>
          <div className="flex items-center gap-1">
            Part No1:
            {editable ? (
              <input type="text" value={data.partNo1 || ''} onChange={(e) => update('partNo1', e.target.value)}
                className="form-cell-input font-bold w-20" />
            ) : (
              <span className="ml-1 font-bold">{data.partNo1 || ''}</span>
            )}
            <span className="text-slate-500 dark:text-slate-400 ml-2">Plan:</span>
            {editable ? (
              <input type="text" value={data.plan1 || ''} onChange={(e) => update('plan1', e.target.value)}
                className="form-cell-input w-12" />
            ) : (
              <span className="ml-1">{data.plan1 || ''}</span>
            )}
          </div>
        </td>
        <td className="form-cell" colSpan={10}></td>
      </tr>

      <HourRow label="Actual Production - Production :" dataKey="part1Production" data={data} editable={editable} onChange={onChange} highlight />
      <HourRow label="Casting Rejection for part 1" sublabel="" dataKey="part1CastingRej" data={data} editable={editable} onChange={onChange} />
      <HourRow label="Machining Rejection for part 1" sublabel="" dataKey="part1MachiningRej" data={data} editable={editable} onChange={onChange} />
      <HourRow label="Unprocessed casting rejection" sublabel="" dataKey="part1UnprocessedRej" data={data} editable={editable} onChange={onChange} />

      {/* ── Part No 2 ──────────────────────────────────── */}
      <tr>
        <td className="form-label-cell bg-emerald-100/80 dark:bg-emerald-950/80 font-bold text-emerald-900 dark:text-emerald-200 text-[10px]" colSpan={2}>
          <div className="flex items-center gap-1">
            Part No2:
            {editable ? (
              <input type="text" value={data.partNo2 || ''} onChange={(e) => update('partNo2', e.target.value)}
                className="form-cell-input font-bold w-20" />
            ) : (
              <span className="ml-1 font-bold">{data.partNo2 || '—'}</span>
            )}
            <span className="text-slate-500 dark:text-slate-400 ml-2">Plan:</span>
            {editable ? (
              <input type="text" value={data.plan2 || ''} onChange={(e) => update('plan2', e.target.value)}
                className="form-cell-input w-12" />
            ) : (
              <span className="ml-1">{data.plan2 || ''}</span>
            )}
          </div>
        </td>
        <td className="form-cell" colSpan={10}></td>
      </tr>

      <HourRow label="Actual Production - Production :" dataKey="part2Production" data={data} editable={editable} onChange={onChange} highlight />
      <HourRow label="Casting Rejection for part 2" dataKey="part2CastingRej" data={data} editable={editable} onChange={onChange} />
      <HourRow label="Machining Rejection for part 2" dataKey="part2MachiningRej" data={data} editable={editable} onChange={onChange} />
      <HourRow label="Unprocessed casting rejection" dataKey="part2UnprocessedRej" data={data} editable={editable} onChange={onChange} />

      {/* ── Middle Row: Supervisor / Shift In-charge / PDI OK ── */}
      <tr>
        <td className="form-label-cell bg-slate-100 dark:bg-slate-800" colSpan={2}>
          <span className="text-[10px] text-slate-700 dark:text-slate-300 font-semibold">Supervisor Name :</span>
        </td>
        <td className="form-cell" colSpan={3}>
          {editable ? (
            <input type="text" value={data.supervisorName || ''} onChange={(e) => update('supervisorName', e.target.value)} className="form-cell-input text-left" />
          ) : (
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{data.supervisorName || '—'}</span>
          )}
        </td>
        <td className="form-label-cell bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-700 dark:text-slate-300" colSpan={2}>
          Shift In-charge Name :
        </td>
        <td className="form-cell" colSpan={2}>
          {editable ? (
            <input type="text" value={data.shiftIncharge || ''} onChange={(e) => update('shiftIncharge', e.target.value)} className="form-cell-input text-left" />
          ) : (
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{data.shiftIncharge || '—'}</span>
          )}
        </td>
        <td className="form-label-cell bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-700 dark:text-slate-300" colSpan={1}>
          PDI OK-Part 1:
        </td>
        <td className="form-cell" colSpan={1}>
          {editable ? (
            <input type="text" value={data.pdiOkPart1 || ''} onChange={(e) => update('pdiOkPart1', e.target.value)} className="form-cell-input" />
          ) : (
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{data.pdiOkPart1 || '—'}</span>
          )}
        </td>
        <td className="form-cell" colSpan={1}>
          <div className="flex items-center gap-1 text-[10px]">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Part 2: </span>
            {editable ? (
              <input type="text" value={data.pdiOkPart2 || ''} onChange={(e) => update('pdiOkPart2', e.target.value)} className="form-cell-input w-12" />
            ) : (
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{data.pdiOkPart2 || '—'}</span>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}

