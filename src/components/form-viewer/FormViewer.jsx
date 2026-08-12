import FormHeader from './FormHeader';
import ProductionGrid from './ProductionGrid';
import TPMLossGrid from './TPMLossGrid';
import FormFooter from './FormFooter';

export default function FormViewer({ data, editable = false, onChange }) {
  return (
    <div className="form-grid w-full">
      <table className="w-full table-fixed border-collapse border-2 border-slate-500 bg-white">
        <tbody>
          {/* Header Section */}
          <FormHeader data={data} editable={editable} onChange={onChange} />

          {/* Production Grid */}
          <ProductionGrid data={data} editable={editable} onChange={onChange} />

          {/* TPM 16 Loss Grid */}
          <TPMLossGrid data={data} editable={editable} onChange={onChange} />

          {/* Footer Section */}
          <FormFooter data={data} editable={editable} onChange={onChange} />
        </tbody>
      </table>
    </div>
  );
}
