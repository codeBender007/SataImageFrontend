import { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, Maximize2 } from 'lucide-react';

export default function ImagePreview({ imageUrl }) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);

  const zoomIn = () => setZoom(z => Math.min(z + 0.25, 4));
  const zoomOut = () => setZoom(z => Math.max(z - 0.25, 0.25));
  const rotateCW = () => setRotation(r => r + 90);
  const rotateCCW = () => setRotation(r => r - 90);
  const reset = () => { setZoom(1); setRotation(0); };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-center gap-1 p-2 bg-slate-800 rounded-t-lg border-b border-slate-700">
        <button onClick={zoomOut} className="p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Zoom Out">
          <ZoomOut size={16} />
        </button>
        <span className="text-xs text-slate-400 font-mono w-14 text-center">{Math.round(zoom * 100)}%</span>
        <button onClick={zoomIn} className="p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Zoom In">
          <ZoomIn size={16} />
        </button>
        <div className="w-px h-5 bg-slate-600 mx-1" />
        <button onClick={rotateCCW} className="p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Rotate CCW">
          <RotateCcw size={16} />
        </button>
        <button onClick={rotateCW} className="p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Rotate CW">
          <RotateCw size={16} />
        </button>
        <div className="w-px h-5 bg-slate-600 mx-1" />
        <button onClick={reset} className="p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Reset">
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Image area */}
      <div
        ref={containerRef}
        className="flex-1 bg-slate-900 overflow-auto flex items-center justify-center rounded-b-lg"
        style={{ minHeight: '400px' }}
      >
        <img
          src={imageUrl}
          alt="Uploaded form"
          className="max-w-none transition-transform duration-200"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transformOrigin: 'center center',
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}
