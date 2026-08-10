const HR_KEYS = ['hr1', 'hr2', 'hr3', 'hr4', 'hr5', 'hr6', 'hr7', 'hr8', 'hr9'];

const GROUP_COLORS = {
  'Breakdown (BD)': { bg: 'bg-red-50/40', label: 'bg-red-100 text-red-800', border: 'border-l-red-400' },
  'Set up (ST)': { bg: 'bg-orange-50/40', label: 'bg-orange-100 text-orange-800', border: 'border-l-orange-400' },
  'Start up (SU)': { bg: 'bg-amber-50/40', label: 'bg-amber-100 text-amber-800', border: 'border-l-amber-400' },
  'Speed loss (MS)': { bg: 'bg-yellow-50/40', label: 'bg-yellow-100 text-yellow-800', border: 'border-l-yellow-400' },
  'Waiting (ML)': { bg: 'bg-blue-50/40', label: 'bg-blue-100 text-blue-800', border: 'border-l-blue-400' },
  'Delay (DL)': { bg: 'bg-purple-50/40', label: 'bg-purple-100 text-purple-800', border: 'border-l-purple-400' },
  'Oth.Loss (OL)': { bg: 'bg-slate-50/40', label: 'bg-slate-200 text-slate-700', border: 'border-l-slate-400' },
  'Pl.Loss (PL)': { bg: 'bg-teal-50/40', label: 'bg-teal-100 text-teal-800', border: 'border-l-teal-400' },
};

export default function TPMLossGrid({ data, editable, onChange }) {
  const tpmLosses = data.tpmLosses || [];

  const updateLossCell = (lossIdx, hrKey, value) => {
    if (!onChange) return;
    const updated = [...tpmLosses];
    updated[lossIdx] = {
      ...updated[lossIdx],
      hourlyValues: { ...updated[lossIdx].hourlyValues, [hrKey]: value },
    };
    onChange({ ...data, tpmLosses: updated });
  };

  // Group losses by their group field
  const groups = [];
  let currentGroup = null;
  tpmLosses.forEach((loss, idx) => {
    if (!currentGroup || currentGroup.name !== loss.group) {
      currentGroup = { name: loss.group, items: [] };
      groups.push(currentGroup);
    }
    currentGroup.items.push({ ...loss, originalIdx: idx });
  });

  // Calculate total losses per hour
  const hourTotals = {};
  HR_KEYS.forEach(hr => {
    hourTotals[hr] = tpmLosses.reduce((sum, loss) => {
      return sum + (parseInt(loss.hourlyValues?.[hr]) || 0);
    }, 0);
  });
  const grandTotal = Object.values(hourTotals).reduce((a, b) => a + b, 0);

  return (
    <>
      {/* TPM Header */}
      <tr>
        <td className="border border-slate-400 bg-slate-800 text-white font-bold text-[11px] px-2 py-1.5" colSpan={2}>
          TPM 16 Loss entry :
        </td>
        <td className="border border-slate-400 bg-slate-800 text-center" colSpan={10}>
          <span className="text-[10px] text-amber-300 font-medium">
            {'<<<Enter Loss time in Minute only & write machine number>>>'}
          </span>
        </td>
      </tr>

      {/* Loss Rows grouped */}
      {groups.map((group) => {
        const colors = GROUP_COLORS[group.name] || GROUP_COLORS['Oth.Loss (OL)'];
        return group.items.map((loss, itemIdx) => (
          <tr key={loss.originalIdx}>
            {/* Code cell */}
            <td className={`form-cell text-center text-[9px] font-bold w-8 border-l-2 ${colors.border} ${colors.bg}`}>
              {loss.code}
            </td>
            {/* Description cell */}
            <td className={`form-label-cell text-[10px] ${colors.bg}`}>
              <div className="flex items-center gap-1">
                {itemIdx === 0 && (
                  <span className={`${colors.label} text-[8px] px-1 py-0.5 rounded font-bold mr-1 whitespace-nowrap`}>
                    {group.name}
                  </span>
                )}
                <span className="truncate">{loss.description}</span>
              </div>
            </td>
            {/* Hourly cells */}
            {HR_KEYS.map(hr => (
              <td key={hr} className={`form-cell ${colors.bg}`}>
                {editable ? (
                  <input
                    type="text"
                    value={loss.hourlyValues?.[hr] || ''}
                    onChange={(e) => updateLossCell(loss.originalIdx, hr, e.target.value)}
                    className="form-cell-input"
                  />
                ) : (
                  <span className={`text-xs ${loss.hourlyValues?.[hr] ? 'font-semibold text-red-700' : ''}`}>
                    {loss.hourlyValues?.[hr] || ''}
                  </span>
                )}
              </td>
            ))}
            {/* No total column for individual rows */}
            <td className={`form-cell ${colors.bg}`}></td>
          </tr>
        ));
      })}

      {/* TOTAL LOSSES ROW */}
      <tr>
        <td className="border border-slate-400 bg-red-100 font-bold text-[11px] px-2 py-1.5 text-red-900" colSpan={2}>
          TOTAL LOSSES :
        </td>
        {HR_KEYS.map(hr => (
          <td key={hr} className="form-cell bg-red-50 font-bold text-red-800 text-xs">
            {hourTotals[hr] > 0 ? hourTotals[hr] : ''}
          </td>
        ))}
        <td className="form-cell bg-red-100 font-bold text-red-900 text-sm">
          {grandTotal > 0 ? `${grandTotal}` : '0'}
          <span className="text-[9px] text-red-600 ml-0.5">Min</span>
        </td>
      </tr>
    </>
  );
}
