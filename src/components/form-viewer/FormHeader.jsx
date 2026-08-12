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
      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{value || '-'}</span>
    )
  );

  return (
    <>
      {/* Company, book title and date */}
      <tr>
        <td className="form-cell-header text-left px-2" colSpan={2}>
          <div className="flex items-center gap-1.5 mb-1">
            <img src="/sata-vikas-logo-transparent.png" alt="Sata Vikas" className="h-4 w-auto object-contain" />
            <div className="text-[9px] leading-tight">
              <span className="text-slate-500">Page</span>{' '}
              <Cell value={data.page} field="page" width="20px" />
            </div>
          </div>
          <div className="font-bold text-[10px] text-slate-800">SATA VIKAS INDIA PVT LTD, PALWAL</div>
        </td>
        <td className="form-cell-header text-center font-bold text-sm text-indigo-800" colSpan={9}>
          Hourly Production Monitoring Book
        </td>
        <td className="form-cell-header" colSpan={1}>
          <div className="flex items-center gap-1 text-[10px]">
            <span className="text-slate-500">Date :</span>
            <Cell value={data.date} field="date" />
          </div>
        </td>
      </tr>

      {/* Operation number row with PDI and shift */}
      <tr>
        <td className="form-label-cell" colSpan={2}>Operation Number :</td>
        {OP_SLOTS.map(slot => (
          <td key={slot} className="form-cell text-center bg-slate-50">
            <div className="text-[9px] text-slate-400 leading-none">{slot}</div>
          </td>
        ))}
        <td className="form-cell bg-slate-50 px-1">
          <div className="grid grid-cols-2 items-center gap-1 text-[10px]">
            <span className="font-semibold text-slate-700">PDI</span>
            <div className="flex items-center gap-1 border-l border-slate-300 pl-1">
              <span className="text-slate-500">Shift :</span>
              <Cell value={data.shift} field="shift" />
            </div>
          </div>
        </td>
      </tr>

      {/* Machine number, QA and cell */}
      <tr>
        <td className="form-label-cell" colSpan={2}>Machine No :</td>
        <td className="form-cell" colSpan={9}>
          <Cell value={data.machineNo} field="machineNo" />
        </td>
        <td className="form-cell" colSpan={1}>
          <div className="grid grid-cols-2 items-center gap-1 text-[10px]">
            <span className="font-medium text-slate-500">QA</span>
            <div className="flex items-center gap-1 border-l border-slate-300 pl-1">
              <span className="text-slate-500">Cell :</span>
              <Cell value={data.qaCell} field="qaCell" />
            </div>
          </div>
        </td>
      </tr>

      {/* Employee ID, employee name and part */}
      <tr>
        <td className="form-label-cell" colSpan={2}>Employee ID :</td>
        <td className="form-cell" colSpan={4}>
          <Cell value={data.employeeId || data.employeeNumbers} field="employeeId" placeholder="EMP-XXXX" />
        </td>
        <td className="form-label-cell" colSpan={2}>Employee No. :</td>
        <td className="form-cell" colSpan={2}>
          <Cell value={data.employeeNumbers} field="employeeNumbers" placeholder="Employee no." />
        </td>
        <td className="form-cell text-[10px] text-slate-500" colSpan={1}>Part :</td>
        <td className="form-cell" colSpan={1}>
          <Cell value={data.partNo1} field="partNo1" />
        </td>
      </tr>

      {/* Hour columns */}
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
