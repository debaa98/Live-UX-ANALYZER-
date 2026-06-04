import React, { useState } from 'react';
import { Settings, Shield, Cpu, Check } from 'lucide-react';

export default function SettingsView() {
  const [modelType, setModelType] = useState('gemini-3.5-flash');
  const [minLift, setMinLift] = useState('1.5');
  const [enableTelemetry, setEnableTelemetry] = useState(true);
  const [savedStatus, setSavedStatus] = useState(false);

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => {
      setSavedStatus(false);
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-fade-in select-none text-[#1A1A1A]">
      <div className="pb-6 border-b border-[#1A1A1A]/10">
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8C8C] block mb-1">Configuration Profiles</span>
        <h2 className="text-4xl font-serif italic font-bold tracking-tight text-[#1A1A1A]">System Configurations</h2>
        <p className="text-[#8C8C8C] font-serif italic text-sm mt-1">
          Adjust scan sensitivities, threshold triggers, and modify underlying Gemini neural model endpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Settings Panel (2/3 width) */}
        <div className="lg:col-span-2 border border-[#1A1A1A]/10 rounded-none bg-white p-6 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1A1A1A]/10 text-[#1A1A1A]">
            <Settings className="w-4 h-4 text-[#1A1A1A]" />
            <span className="text-xs uppercase tracking-widest font-bold">Preferences</span>
          </div>

          <div className="space-y-5">
            {/* Model Setup */}
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] block">Intelligence Engine Model</label>
              <select 
                value={modelType}
                onChange={e => setModelType(e.target.value)}
                className="w-full text-xs rounded-none border border-[#1A1A1A]/15 p-3 focus:border-[#1A1A1A] focus:ring-0 bg-white cursor-pointer font-sans"
              >
                <option value="gemini-3.5-flash">Gemini 3.5 Flash (Analytical & Efficient)</option>
                <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro Preview (Complex Reasoning)</option>
              </select>
              <p className="text-[10px] text-[#8C8C8C] font-serif italic">Our recommendation is Gemini 3.5 Flash for rapid viewport diagnostics.</p>
            </div>

            {/* Threshold Setup */}
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] block">Minimum Lift Threshold criteria</label>
              <select 
                value={minLift}
                onChange={e => setMinLift(e.target.value)}
                className="w-full text-xs rounded-none border border-[#1A1A1A]/15 p-3 focus:border-[#1A1A1A] focus:ring-0 bg-white cursor-pointer font-sans"
              >
                <option value="0.5">Show all optimizations (&gt; +0.5%)</option>
                <option value="1.5">Moderate impact only (&gt; +1.5%)</option>
                <option value="3.0">Severe friction only (&gt; +3.0%)</option>
              </select>
              <p className="text-[10px] text-[#8C8C8C] font-serif italic">Ignore minor cosmetic recommended points and display high impact directives.</p>
            </div>

            {/* General Toggles */}
            <div className="pt-4 border-t border-[#1A1A1A]/10 space-y-4">
              <label className="flex items-start gap-3 group cursor-pointer text-xs">
                <input 
                  type="checkbox" 
                  checked={enableTelemetry}
                  onChange={e => setEnableTelemetry(e.target.checked)}
                  className="rounded-none border-[#1A1A1A]/20 text-[#1A1A1A] focus:ring-0 mt-0.5" 
                />
                <div>
                  <span className="font-bold text-[#1A1A1A] uppercase tracking-wider block text-[10px] mb-0.5">Gather interactive feedback telemetry</span>
                  <span className="text-[11px] text-[#8C8C8C] leading-normal block font-serif italic">Continuously compile hover density matrices and scroll depths on active steps.</span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1A1A1A]/10 flex items-center gap-4">
            <button 
              onClick={handleSave}
              className="px-5 py-3 rounded-none bg-[#1A1A1A] text-white text-[9px] font-bold hover:bg-[#2D2D2D] uppercase tracking-[0.2em] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {savedStatus ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Configurations Saved!
                </>
              ) : (
                'Save Preferences'
              )}
            </button>
          </div>
        </div>

        {/* Informational Credentials Sidebar (1/3 width) */}
        <div className="space-y-6">
          <div className="border border-[#1A1A1A]/10 rounded-none bg-white p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#1A1A1A]/10 text-[#1A1A1A]">
              <Shield className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-bold">Security credentials</span>
            </div>
            
            <p className="text-xs text-[#8C8C8C] leading-relaxed font-sans">
              API scanning is operated entirely server-side. Your Google Gemini AI secret keys are loaded dynamically from environment attributes.
            </p>

            <div className="bg-[#EBE8E1] p-4 border border-[#1A1A1A]/10 rounded-none text-xs space-y-2.5">
              <span className="font-bold text-[#1A1A1A] uppercase text-[9px] tracking-[0.2em] block mb-1">Workspace State</span>
              <div className="flex justify-between items-center text-[#4A4A4A] font-mono text-[10px]">
                <span>Secrets state:</span>
                <span className="text-[#1A1A1A] font-bold uppercase tracking-wider">Configured</span>
              </div>
              <div className="flex justify-between items-center text-[#4A4A4A] font-mono text-[10px]">
                <span>Telemetry Ingress:</span>
                <span className="text-[#1A1A1A] font-bold uppercase tracking-wider">Online</span>
              </div>
            </div>
          </div>

          {/* Engine specifications */}
          <div className="border border-[#1A1A1A]/10 rounded-none bg-white p-5 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#1A1A1A]/10">
              <Cpu className="w-4 h-4 text-[#1A1A1A]" />
              <span className="text-xs uppercase tracking-widest font-bold">Engine Specs</span>
            </div>
            <div className="text-xs text-[#8C8C8C] leading-relaxed font-serif italic">
              Auditing scan logic evaluates raw DOM nodes against WCAG AA standards, contrast guidelines, text lengths, and layout patterns.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
