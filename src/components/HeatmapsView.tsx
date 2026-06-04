import React, { useState } from 'react';
import { Flame, RefreshCw } from 'lucide-react';

export default function HeatmapsView() {
  const [targetPage, setTargetPage] = useState<'checkout' | 'signup' | 'landing'>('checkout');
  const [overlayType, setOverlayType] = useState<'clicks' | 'movements' | 'scroll'>('clicks');
  const [showAiOverlay, setShowAiOverlay] = useState(true);
  const [clicks, setClicks] = useState<Array<{ x: number; y: number }>>([
    // Initialize checkout mock clicks
    { x: 120, y: 80 }, { x: 125, y: 83 }, { x: 118, y: 79 }, // Inputs
    { x: 300, y: 154 }, { x: 305, y: 152 }, { x: 298, y: 150 }, { x: 310, y: 160 }, { x: 301, y: 151 }, // Purchase button clicks
    { x: 25, y: 150 }, { x: 30, y: 145 }, { x: 22, y: 155 } // Secondary menus
  ]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setClicks(prev => [...prev, { x, y }]);
  };

  const clearHeatpoints = () => {
    setClicks([]);
  };

  return (
    <div className="space-y-10 animate-fade-in select-none text-[#1A1A1A]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1A1A1A]/10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8C8C] block mb-1">Visual Telemetry</span>
          <h2 className="text-4xl font-serif italic font-bold tracking-tight text-[#1A1A1A]">Friction Hotspots</h2>
          <p className="text-[#8C8C8C] font-serif italic text-sm mt-1">
            Audit user interaction concentration. Click inside the viewport mockup below to place active interaction telemetry points.
          </p>
        </div>

        {/* View Controls formatted into Editorial layout */}
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={clearHeatpoints}
            className="px-4 py-2 text-[9px] uppercase tracking-[0.15em] font-bold border border-[#1A1A1A]/20 bg-transparent hover:bg-[#EBEBE4] text-[#1A1A1A] flex items-center gap-1.5 cursor-pointer rounded-none transition-all"
          >
            <RefreshCw className="w-3 h-3 text-[#1A1A1A]" />
            Reset Canvas
          </button>
          
          <div className="flex bg-[#EBE8E1] p-1 border border-[#1A1A1A]/10">
            <button
              onClick={() => setOverlayType('clicks')}
              className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] font-bold rounded-none transition-all cursor-pointer ${overlayType === 'clicks' ? 'bg-[#1A1A1A] text-white' : 'text-[#8C8C8C] hover:text-[#1A1A1A]'}`}
            >
              Clicks
            </button>
            <button
              onClick={() => setOverlayType('movements')}
              className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] font-bold rounded-none transition-all cursor-pointer ${overlayType === 'movements' ? 'bg-[#1A1A1A] text-white' : 'text-[#8C8C8C] hover:text-[#1A1A1A]'}`}
            >
              Movements
            </button>
            <button
              onClick={() => setOverlayType('scroll')}
              className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] font-bold rounded-none transition-all cursor-pointer ${overlayType === 'scroll' ? 'bg-[#1A1A1A] text-white' : 'text-[#8C8C8C] hover:text-[#1A1A1A]'}`}
            >
              Scroll Depth
            </button>
          </div>
        </div>
      </div>

      {/* Selector of Mocked page scopes */}
      <div className="flex gap-6 border-b border-[#1A1A1A]/10">
        <button 
          onClick={() => { setTargetPage('checkout'); }}
          className={`pb-3 text-[10px] font-bold uppercase tracking-[0.2em] relative cursor-pointer outline-none ${targetPage === 'checkout' ? 'text-[#1A1A1A]' : 'text-[#8C8C8C] hover:text-[#1A1A1A]'}`}
        >
          Checkout submission frame
          {targetPage === 'checkout' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1A1A1A]"></span>}
        </button>
        <button 
          onClick={() => { setTargetPage('signup'); }}
          className={`pb-3 text-[10px] font-bold uppercase tracking-[0.2em] relative cursor-pointer outline-none ${targetPage === 'signup' ? 'text-[#1A1A1A]' : 'text-[#8C8C8C] hover:text-[#1A1A1A]'}`}
        >
          SaaS signup input blocks
          {targetPage === 'signup' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1A1A1A]"></span>}
        </button>
      </div>

      {/* Heatmap Sandbox Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* The Frame Canvas (2/3 width) */}
        <div className="lg:col-span-2 border border-[#1A1A1A]/10 rounded-none bg-[#EBE8E1] p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-md relative select-none" style={{ height: '380px' }}>
            
            {/* Visual Screen Simulator Canvas */}
            <div 
              onClick={handleCanvasClick}
              className="absolute inset-0 border border-[#1A1A1A]/15 shadow-xl rounded-none overflow-hidden bg-[#F2EFE9] cursor-crosshair"
            >
              
              {/* Header inside mockup */}
              <div className="bg-[#1A1A1A] text-white p-2.5 text-[9px] uppercase tracking-widest flex justify-between font-mono">
                <span>Viewport Context: {targetPage === 'checkout' ? 'checkout_pipeline.dom' : 'signup_layout.dom'}</span>
                <span className="text-neutral-300">● telemetred</span>
              </div>

              {/* Mockup Frame Elements */}
              {targetPage === 'checkout' ? (
                // Checkout Frame Simulator
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <div className="h-4 bg-[#E6E3DD] w-1/3"></div>
                    <div className="h-2 bg-[#E6E3DD]/60 w-2/3"></div>
                  </div>

                  {/* Standard Form Input Cards */}
                  <div className="space-y-3 pt-2">
                    <div className="h-8 bg-white border border-[#1A1A1A]/10 flex items-center px-3">
                      <div className="h-2.5 w-2/3 bg-[#E6E3DD] rounded-none"></div>
                    </div>
                    <div className="h-8 bg-white border border-[#1A1A1A]/10 flex items-center px-3">
                      <div className="h-2.5 w-1/2 bg-[#E6E3DD] rounded-none"></div>
                    </div>
                  </div>

                  {/* Frictional Checkout Button (The Standard visual contrast) */}
                  <div className="pt-4 text-center">
                    <div className="h-10 bg-[#DEDBD5] border border-[#1A1A1A]/20 text-[10px] uppercase tracking-[0.25em] font-serif italic text-[#8C8C8C] flex items-center justify-center font-bold">
                      Proceed to Complete Payment
                    </div>
                    <p className="text-[9px] text-[#8C8C8C] mt-2 font-mono uppercase tracking-wide">Fails visual contrast guidelines (2.1:1)</p>
                  </div>
                </div>
              ) : (
                // Signup forms
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-[#E6E3DD] w-1/2"></div>
                  <div className="space-y-3 pt-2">
                    <div className="h-8 bg-white border border-[#1A1A1A]/10 flex items-center px-3">
                      <div className="h-2.5 w-1/3 bg-[#E6E3DD] rounded-none"></div>
                    </div>
                    {/* The fictional company field */}
                    <div className="h-11 bg-white border border-[#1A1A1A]/10 p-2">
                      <div className="text-[8px] text-[#8C8C8C] font-semibold uppercase tracking-wider">Company Name (Optional)</div>
                      <div className="h-2.5 w-1/2 bg-[#E6E3DD] mt-1"></div>
                    </div>
                    <div className="h-10 bg-[#E6E3DD] border border-[#1A1A1A]/20 flex items-center px-3 justify-center text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">
                      Register New Account
                    </div>
                  </div>
                </div>
              )}

              {/* OVERLAYS DISPLAY AREA */}
              {/* Overlay: Clicks representation */}
              {overlayType === 'clicks' && (
                <div className="absolute inset-0 pointer-events-none">
                  {clicks.map((point, i) => (
                    <div 
                      key={i} 
                      className="absolute rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${point.x}px`,
                        top: `${point.y}px`,
                        width: '32px',
                        height: '32px',
                        background: 'radial-gradient(circle, rgba(26,26,26,0.75) 0%, rgba(140,140,140,0.3) 50%, rgba(242,239,233,0) 100%)'
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Overlay: movements flow */}
              {overlayType === 'movements' && (
                <div className="absolute inset-0 pointer-events-none bg-neutral-900/5">
                  <svg className="w-full h-full stroke-neutral-900 stroke-2 fill-none stroke-linecap-round stroke-dasharray-2 opacity-70">
                    <path d="M 50,150 C 150,50 250,300 120,70" strokeWidth="1.5" />
                    <path d="M 120,80 Q 200,200 400,100" strokeWidth="2" strokeDasharray="3 3"/>
                    <path d="M 10,120 L 320,150 L 320,165" strokeWidth="3" className="stroke-neutral-800" />
                  </svg>
                </div>
              )}

              {/* Overlay: scroll maps gradient */}
              {overlayType === 'scroll' && (
                <div className="absolute inset-0 pointer-events-none flex flex-col">
                  <div className="h-1/3 bg-[#EBE8E1]/40 border-b border-[#1A1A1A]/10 flex items-center justify-end px-3 font-mono text-[9px] text-[#1A1A1A]">100% fold area</div>
                  <div className="h-1/3 bg-[#E6E3DD]/40 border-b border-[#1A1A1A]/10 flex items-center justify-end px-3 font-mono text-[9px] text-[#4A4A4A]">54% view average</div>
                  <div className="h-1/3 bg-[#DEDBD5]/40 flex items-center justify-end px-3 font-mono text-[9px] text-[#8C8C8C]">22% scroll absolute footer</div>
                </div>
              )}

              {/* AI indicators formatted perfectly for Editorial */}
              {showAiOverlay && targetPage === 'checkout' && (
                <div className="absolute top-[160px] left-[70px] w-[305px] h-12 border border-[#1A1A1A] border-dashed rounded-none pointer-events-none flex items-center justify-center bg-white/40">
                  <div className="bg-[#1A1A1A] text-[#F2EFE9] text-[9px] font-bold uppercase tracking-wider px-2 py-1 flex items-center gap-1.5 shadow-md">
                    <span>Frictional contrasts: +4.2% lift ready</span>
                  </div>
                </div>
              )}

            </div>
          </div>
          <p className="text-[10px] text-[#8C8C8C] mt-4 uppercase tracking-widest font-mono text-center">Interactive Device Context: Mobile Viewport (&lt; 480px)</p>
        </div>

        {/* Sidebar Diagnostics Info (1/3 width) */}
        <div className="border border-[#1A1A1A]/10 rounded-none bg-white p-6 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1A1A1A]/10">
            <Flame className="w-4.5 h-4.5 text-[#1A1A1A]" />
            <h3 className="font-serif italic font-bold text-base">Viewport Analytics</h3>
          </div>

          <div className="space-y-5 text-xs">
            <div className="p-4 bg-[#EBE8E1] border border-[#1A1A1A]/10 rounded-none">
              <span className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[9px]">Severe Drop-off hotspots</span>
              <p className="text-[#4A4A4A] mt-1.5 leading-relaxed font-sans text-[11px]">
                The interaction sequence reveals a sharp density falloff immediately following step 2 fields. Users fail to activate standard controls.
              </p>
            </div>

            <div className="space-y-3 font-sans">
              <span className="font-bold text-[#1A1A1A] uppercase text-[9px] tracking-[0.2em] block mb-2">Metrics Feed</span>
              <div className="flex justify-between items-center bg-[#E6E3DD]/45 p-2.5 border border-[#1A1A1A]/5 rounded-none">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]"></span>
                  <span>Input field focuses</span>
                </span>
                <span className="font-mono text-[#8C8C8C] text-[10px]">92% weight</span>
              </div>
              <div className="flex justify-between items-center bg-[#E6E3DD]/45 p-2.5 border border-[#1A1A1A]/5 rounded-none">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8C8C8C]"></span>
                  <span>Optional configurations</span>
                </span>
                <span className="font-mono text-[#8C8C8C] text-[10px]">41% weight</span>
              </div>
              <div className="flex justify-between items-center bg-[#E6E3DD]/45 p-2.5 border border-[#1A1A1A]/5 rounded-none">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  <span>Exit trigger positions</span>
                </span>
                <span className="font-mono text-[#8C8C8C] text-[10px]">12% exit rate</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A]/10">
              <label className="flex items-center gap-2.5 text-[#1A1A1A] font-bold cursor-pointer text-[11px] uppercase tracking-wider">
                <input 
                  type="checkbox" 
                  checked={showAiOverlay} 
                  onChange={e => setShowAiOverlay(e.target.checked)}
                  className="rounded-none border-[#1A1A1A]/20 text-[#1A1A1A] focus:ring-0" 
                />
                <span>Map recommendation spots</span>
              </label>
              <p className="text-[10px] text-[#8C8C8C] mt-1.5 leading-relaxed">Overlay exact layout areas where automated structural modifications are ready.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
