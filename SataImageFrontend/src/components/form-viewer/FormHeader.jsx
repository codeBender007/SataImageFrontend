import { OP_SLOTS } from '../../types/models';

export default function FormHeader({ data, editable, onChange }) {
  const update = (field, value) => {
    if (onChange) onChange({ ...data, [field]: value });
  };

  const Cell = ({ value, field, width, placeholder }) => (
    editable ? (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => update(field, e.target.value)}
        placeholder={placeholder || ''}
        className="form-cell-input"
        style={{ width: width || '100%' }}
      />
    ) : (
      <span className="text-xs font-medium text-slate-900">{value || '—'}</span>
    )
  );

  // Total columns = 12 (2 label + 10 data: UPH + Hr1-Hr9 or Hr1-Hr9 + Total)

  return (
    <>
      {/* Row 1: Company + Title + Date + Shift */}
      <tr>
        <td className="form-cell-header text-left px-2" colSpan={2}>
          <div className="flex items-center gap-1.5 mb-1">
            <img src="/sata-vikas-logo.svg" alt="Logo" className="h-4 w-auto" />
            <div className="text-[9px] leading-tight">
              <span className="text-slate-500">Page</span>{' '}
              <Cell value={data.page} field="page" width="20px" />
            </div>
          </div>
          <div className="font-bold text-[10px] text-slate-800">SATA VIKAS INDIA PVT LTD, PALWAL</div>
        </td>
        <td className="form-cell-header text-center font-bold text-sm text-indigo-800" colSpan={6}>
          Hourly Production Monitoring Book
        </td>
        <td className="form-cell-header" colSpan={2}>
          <div className="flex items-center gap-1 text-[10px]">
            <span className="text-slate-500">Date:</span>
            <Cell value={data.date} field="date" />
          </div>
        </td>
        <td className="form-cell" colSpan={2}>
          <div className="flex items-center gap-1 text-[10px]">
            <span className="text-slate-500">Shift:</span>
            <Cell value={data.shift} field="shift" />
          </div>
        </td>
      </tr>

      {/* Row 2: Operation Number slots */}
      <tr>
        <td className="form-label-cell" colSpan={2}>
          <span className="text-slate-600">Operation Number :</span>
        </td>
        {OP_SLOTS.map(slot => (
          <td key={slot} className="form-cell text-center bg-slate-50">
            <div className="text-[9px] text-slate-400 leading-none">{slot}</div>
          </td>
        ))}
        <td className="form-cell bg-blue-50 font-semibold text-[10px] text-blue-700">PDI</td>
      </tr>

      {/* Row 3: Machine No + QA + Cell */}
      <tr>
        <td className="form-label-cell" colSpan={2}>Machine No :</td>
        <td className="form-cell" colSpan={6}>
          <Cell value={data.machineNo} field="machineNo" />
        </td>
        <td className="form-cell" colSpan={2}>
          <div className="flex items-center gap-1 text-[10px]">
            <span className="text-slate-500 font-medium">QA</span>
          </div>
        </td>
        <td className="form-cell" colSpan={2}>
          <div className="flex items-center gap-1 text-[10px]">
            <span className="text-slate-500">Cell:</span>
            <Cell value={data.qaCell} field="qaCell" />
          </div>
        </td>
      </tr>

      {/* Row 4: Employee Number + Part */}
      <tr>
        <td className="form-label-cell" colSpan={2}>Employee number :</td>
        <td className="form-cell" colSpan={7}>
          <Cell value={data.employeeNumbers} field="employeeNumbers" placeholder="E-XXXX, E-XXXX" />
        </td>
        <td className="form-cell" colSpan={3}>
          <div className="flex items-center gap-1 text-[10px]">
            <span className="text-slate-500">Part:</span>
            <Cell value={data.partNo1} field="partNo1" />
          </div>
        </td>
      </tr>

      {/* Row 5: Scheduled Quantity + Hour Headers */}
      <tr>
        <td className="form-label-cell" colSpan={2}>Scheduled Quantity :</td>
        <td className="form-cell-header text-[10px]">UPH</td>
        <td className="form-cell-header text-[10px]">Hr1</td>
        <td className="form-cell-header text-[10px]">Hr2</td>
        <td className="form-cell-header text-[10px]">Hr3</td>
        <td className="form-cell-header text-[10px]">Hr4</td>
        <td className="form-cell-header text-[10px]">Hr5</td>
        <td className="form-cell-header text-[10px]">Hr6</td>
        <td className="form-cell-header text-[10px]">Hr7</td>
        <td className="form-cell-header text-[10px]">Hr8</td>
        <td className="form-cell-header text-[10px]">Hr9</td>
      </tr>
    </>
  );
}
