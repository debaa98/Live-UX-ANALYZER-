import React, { useState } from 'react';
import { Sparkles, HelpCircle, TrendingUp, X, Code, CheckCircle, Info } from 'lucide-react';
import { Insight } from '../types';

interface AIInsightsViewProps {
  insights: Insight[];
  searchQuery: string;
}

export default function AIInsightsView({ insights, searchQuery }: AIInsightsViewProps) {
  const [activeTab, setActiveTab] = useState<'low_hanging' | 'structural'>('low_hanging');
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [appliedInsights, setAppliedInsights] = useState<Record<string, boolean>>({});

  const handleApplyInsight = (id: string) => {
    setAppliedInsights(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSelectedInsight(null);
    }, 1500);
  };

  // Filter insights by tab AND search query
  const filteredInsights = insights.filter((item) => {
    const matchesTab = item.type === activeTab;
    const matchesSearch = searchQuery
      ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-10 animate-fade-in relative z-10 select-none text-[#1A1A1A]">
      
      {/* Primary Landing Content Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1A1A1A]/10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8C8C] block mb-1">Telemetry Diagnostics</span>
          <h2 className="text-4xl font-serif italic font-bold tracking-tight text-[#1A1A1A]">
            Prioritized Intelligence
          </h2>
          <p className="text-[#8C8C8C] font-serif text-sm max-w-xl leading-relaxed mt-2 italic">
            Machine-learning generated optimization directives designed to harmonize digital geometry & eliminate drop-off points.
          </p>
        </div>

        {/* Tab Controls to Match Editorial Theme */}
        <div className="flex bg-[#EBE8E1] p-1 rounded-none border border-[#1A1A1A]/10">
          <button
            onClick={() => setActiveTab('low_hanging')}
            className={`px-4 py-2 text-[9px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer rounded-none md:w-36 ${
              activeTab === 'low_hanging'
                ? 'bg-[#1A1A1A] text-white'
                : 'text-[#8C8C8C] hover:text-[#1A1A1A]'
            }`}
          >
            Low Hanging Fruit
          </button>
          <button
            onClick={() => setActiveTab('structural')}
            className={`px-4 py-2 text-[9px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer rounded-none md:w-36 ${
              activeTab === 'structural'
                ? 'bg-[#1A1A1A] text-white'
                : 'text-[#8C8C8C] hover:text-[#1A1A1A]'
            }`}
          >
            Structural Changes
          </button>
        </div>
      </div>

      {/* Grid List of Cards */}
      {filteredInsights.length === 0 ? (
        <div className="text-center py-20 px-4 bg-[#EBE8E1] border border-[#1A1A1A]/10 rounded-none">
          <Sparkles className="w-8 h-8 text-[#8C8C8C] mx-auto mb-4" />
          <h3 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">No optimizations match query</h3>
          <p className="text-[11px] text-[#8C8C8C] mt-1 max-w-sm mx-auto">Try altering your search keywords or checking the other tab scope category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map((item) => {
            const isApplied = appliedInsights[item.id];
            let badgeText = `${item.confidence} Confidence`;
            if (item.confidence === 'Emerging') badgeText = 'Emerging Trend';

            return (
              <div 
                key={item.id} 
                className="bg-[#E6E3DD] border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/20 rounded-none p-6 flex flex-col relative overflow-hidden transition-all duration-350"
              >
                {/* Top Section */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-1.5 text-[#1A1A1A]">
                    <Sparkles className="w-3 text-[#1A1A1A]" />
                    <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#8C8C8C]">{badgeText}</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-[#8C8C8C]">
                    {item.source}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-serif italic font-bold text-[#1A1A1A] line-clamp-2 leading-tight mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#4A4A4A] leading-relaxed mb-6 flex-1 line-clamp-4">
                  {item.description}
                </p>

                {/* Bottom Section */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1A1A1A]/10 w-full">
                  <div>
                    <span className="text-[8px] font-bold text-[#8C8C8C] uppercase tracking-widest block mb-0.5">Projected Lift</span>
                    <p className="text-base font-serif italic font-bold text-[#1A1A1A] leading-none flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-[#1A1A1A]" />
                      +{item.lift}%
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedInsight(item)}
                    className="px-4 py-2 text-[9px] uppercase tracking-[0.15em] font-bold bg-[#1A1A1A] hover:bg-[#2D2D2D] text-[#F2EFE9] transition-all cursor-pointer rounded-none"
                  >
                    {isApplied ? 'Applied' : 'Details'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Code Inspector Slideshow Drawer / Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex justify-end z-50">
          <div className="w-full max-w-xl bg-[#F2EFE9] h-screen overflow-y-auto shadow-2xl flex flex-col justify-between animate-slide-left relative select-text border-l border-[#1A1A1A]/10">
            
            {/* Header */}
            <div>
              <div className="p-6 border-b border-[#1A1A1A]/10 flex justify-between items-center bg-[#EBE8E1]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-[#1A1A1A]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] font-sans">Directive Audit</span>
                </div>
                <button 
                  onClick={() => setSelectedInsight(null)} 
                  className="p-1.5 text-[#8C8C8C] hover:text-[#1A1A1A] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Core stats */}
              <div className="p-6 space-y-6">
                <div>
                  <span className="text-[8px] font-bold text-[#8C8C8C] uppercase tracking-[0.25em]">
                    Telemetry Engine: {selectedInsight.source}
                  </span>
                  <h1 className="text-2xl font-serif italic font-bold text-[#1A1A1A] tracking-tight mt-1.5">
                    {selectedInsight.title}
                  </h1>
                </div>

                {/* Score lifts */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-[#1A1A1A]/10 bg-[#E6E3DD] rounded-none">
                    <span className="text-[8px] font-bold text-[#8C8C8C] uppercase tracking-[0.1em] block mb-1">Est. Conversion Boost</span>
                    <p className="text-base font-serif italic font-bold text-[#1A1A1A] flex items-center gap-1 leading-none">
                      <TrendingUp className="w-4 h-4 text-[#1A1A1A]" />
                      +{selectedInsight.lift}%
                    </p>
                  </div>
                  <div className="p-4 border border-[#1A1A1A]/10 bg-[#E6E3DD] rounded-none">
                    <span className="text-[8px] font-bold text-[#8C8C8C] uppercase tracking-[0.1em] block mb-1">Confidence Indicator</span>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] mt-1.5">
                      {selectedInsight.confidence} Rating
                    </p>
                  </div>
                </div>

                {/* Directives details info */}
                <div className="space-y-4 pt-2">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#1A1A1A]" />
                      Behavioral Root Cause
                    </h4>
                    <p className="text-xs text-[#4A4A4A] mt-1.5 leading-relaxed">
                      {selectedInsight.why}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-[#1A1A1A]" />
                      Recommended Prescription
                    </h4>
                    <p className="text-xs text-[#4A4A4A]/90 mt-1.5 leading-relaxed pl-1 border-l border-[#1A1A1A]/10 italic font-serif">
                      {selectedInsight.recommendation}
                    </p>
                  </div>
                </div>

                {/* Code display boxes (Only if originalHtml is supplied) */}
                {selectedInsight.originalHtml && (
                  <div className="space-y-4 pt-4 border-t border-[#1A1A1A]/10">
                    <div>
                      <span className="text-[8px] font-bold text-[#8C8C8C] uppercase tracking-[0.2em] block mb-1.5">Before (Frictional Code)</span>
                      <pre className="p-3 bg-[#EBE8E1] border border-[#1A1A1A]/5 rounded-none text-[11px] font-mono text-[#4A4A4A] overflow-x-auto whitespace-pre leading-normal">
                        {selectedInsight.originalHtml}
                      </pre>
                    </div>

                    <div>
                      <span className="text-[8px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] block mb-1.5">Optimized (AI-Powered Code)</span>
                      <pre className="p-3 bg-[#2D2D2D] text-[#E6E3DD] border border-white/5 rounded-none text-[11px] font-mono overflow-x-auto whitespace-pre leading-normal">
                        {selectedInsight.optimizedHtml}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Application CTAs */}
            <div className="p-6 border-t border-[#1A1A1A]/10 bg-[#E6E3DD] flex gap-4">
              <button 
                onClick={() => setSelectedInsight(null)}
                className="flex-1 py-3 text-[10px] font-bold rounded-none border border-[#1A1A1A]/20 text-[#1A1A1A] bg-transparent hover:bg-[#DEDBD5] transition-colors uppercase tracking-[0.15em] cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleApplyInsight(selectedInsight.id)}
                disabled={appliedInsights[selectedInsight.id]}
                className="flex-1 py-3 text-[10px] font-bold rounded-none bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white transition-colors uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {appliedInsights[selectedInsight.id] ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-[#EBE8E1]" />
                    Applied
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Push to Production
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
