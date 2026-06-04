import React from 'react';
import { initialFunnelSteps } from '../data';
import { ArrowDown, AlertTriangle, Sparkles } from 'lucide-react';

interface FunnelsViewProps {
  onNavigateToView: (view: string) => void;
}

export default function FunnelsView({ onNavigateToView }: FunnelsViewProps) {
  return (
    <div className="space-y-10 animate-fade-in select-none text-[#1A1A1A]">
      <div className="pb-6 border-b border-[#1A1A1A]/10">
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8C8C] block mb-1">Path Progression</span>
        <h2 className="text-4xl font-serif italic font-bold tracking-tight text-[#1A1A1A]">Conversion Funnels</h2>
        <p className="text-[#8C8C8C] font-serif italic text-sm mt-1">
          Visualizing interactive telemetry drop-offs across structural checkout stages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Step-by-Step Funnel visualization (2/3 width) */}
        <div className="lg:col-span-2 border border-[#1A1A1A]/10 rounded-none bg-[#EBE8E1] p-6 space-y-6">
          <h3 className="font-serif italic font-bold text-[#1A1A1A] text-lg">Primary Conversion Pipeline</h3>

          <div className="space-y-4 pt-2">
            {initialFunnelSteps.map((step, idx) => {
              const maxVisitors = initialFunnelSteps[0].visitors;
              const percentOfMax = ((step.visitors / maxVisitors) * 100).toFixed(1);
              
              const showArrow = idx < initialFunnelSteps.length - 1;

              return (
                <div key={idx} className="space-y-2">
                  <div className="p-5 border border-[#1A1A1A]/10 bg-white rounded-none hover:border-[#1A1A1A]/30 transition-all">
                    {/* Top row */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-3">
                      <div>
                        <span className="text-[9px] font-bold font-mono text-white bg-[#1A1A1A] px-2 py-0.5 rounded-none mr-2 uppercase tracking-wider">
                          Step {idx + 1}
                        </span>
                        <span className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide">{step.name}</span>
                      </div>
                      <div className="flex items-baseline gap-2 font-mono">
                        <span className="text-sm font-bold text-[#1A1A1A]">{step.visitors.toLocaleString()}</span>
                        <span className="text-xs text-[#8C8C8C]">({percentOfMax}%)</span>
                      </div>
                    </div>

                    {/* Progress tracking line */}
                    <div className="w-full h-1.5 bg-[#EBE8E1] rounded-none overflow-hidden mb-3">
                      <div 
                        className="h-full bg-[#1A1A1A]" 
                        style={{ width: `${percentOfMax}%` }}
                      ></div>
                    </div>

                    {/* Friction points lists */}
                    {step.frictionPoints.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {step.frictionPoints.map((f, fIdx) => (
                          <span 
                            key={fIdx} 
                            className="bg-[#E6E3DD] text-[#1A1A1A] border border-[#1A1A1A]/10 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5"
                          >
                            <AlertTriangle className="w-3.5 h-3.5 text-[#1A1A1A]" />
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Down arrow link between blocks */}
                  {showArrow && (
                    <div className="flex items-center justify-between px-6 py-2 select-none">
                      <div className="flex items-center gap-2">
                        <ArrowDown className="w-4 h-4 text-[#8C8C8C]" />
                        <span className="text-[10px] text-[#1A1A1A] font-bold uppercase tracking-wider font-sans">
                          ▲ -{initialFunnelSteps[idx + 1].dropoffRate}% Dropoff Rate
                        </span>
                      </div>
                      <span className="text-[9px] font-semibold text-[#8C8C8C] uppercase tracking-[0.2em] font-mono">Moving downward</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Funnel Recommendations Sidebar (1/3 width) */}
        <div className="border border-[#1A1A1A]/10 rounded-none bg-white p-6 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1A1A1A]/10">
            <Sparkles className="w-4.5 h-4.5 text-[#1A1A1A]" />
            <h3 className="font-serif italic font-bold text-base text-[#1A1A1A]">Targeted Interventions</h3>
          </div>

          <p className="text-xs text-[#8C8C8C] leading-relaxed font-sans">
            Our models have mapped exact layout adjustments addressing major structural drop-off points in your funnel checkout stages.
          </p>

          <div className="space-y-5">
            
            <div className="p-5 border border-[#1A1A1A]/10 bg-[#E6E3DD] space-y-4 rounded-none">
              <div className="flex items-center gap-1.5 text-[#1A1A1A]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] font-sans">Checkout Friction Fix</span>
              </div>
              <h4 className="font-serif italic font-bold text-[#1A1A1A] text-sm leading-tight">Fix checkout button transparency + Remove non-essential attributes</h4>
              <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                Applying these structural reforms is projected to reclaim up to 2,400 abandoned checkout sessions.
              </p>
              <button 
                onClick={() => onNavigateToView('ai-insights')}
                className="w-full text-center py-2.5 bg-[#1A1A1A] hover:bg-[#2D2D2D] text-[#F2EFE9] font-bold text-[9px] uppercase tracking-[0.2em] cursor-pointer transition-colors rounded-none"
              >
                Apply Both Directives
              </button>
            </div>

            <div className="p-5 border border-[#1A1A1A]/10 rounded-none space-y-1 bg-[#F2EFE9]">
              <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-widest block mb-1">Funnels score rating</span>
              <p className="text-base font-serif italic font-bold text-[#1A1A1A]">Good (76/100)</p>
              <div className="text-[11px] text-[#4A4A4A] pt-1 leading-relaxed font-serif italic">
                Your checkout ranks in the top 24% of SaaS conversion velocity. Contrast adjustment on mobile will push you above 90%.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
