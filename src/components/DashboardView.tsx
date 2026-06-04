import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Percent, 
  Users, 
  Gauge, 
  RefreshCw, 
  Plus
} from 'lucide-react';
import { mockDashboardMetrics } from '../data';

interface DashboardViewProps {
  onNavigateToView: (view: string) => void;
  onOpenOptimize: () => void;
}

export default function DashboardView({ onNavigateToView, onOpenOptimize }: DashboardViewProps) {
  const [selectedKpi, setSelectedKpi] = useState<'cr' | 'lift' | 'friction'>('cr');
  const [simulationActive, setSimulationActive] = useState(false);
  const [conversionRate, setConversionRate] = useState(4.1);
  const [liftValue, setLiftValue] = useState(18.4);

  const simulateRealtimeEvent = () => {
    setSimulationActive(true);
    setTimeout(() => {
      setConversionRate(prev => parseFloat((prev + 0.1).toFixed(2)));
      setLiftValue(prev => parseFloat((prev + 0.3).toFixed(2)));
      setSimulationActive(false);
    }, 1000);
  };

  const abTests = [
    { id: 1, name: 'Checkout Form Single Pillar Flow', crA: '3.8%', crB: '4.5%', status: '74% significance', lift: '+18.4%', active: true },
    { id: 2, name: 'Testimonials above the pricing grid', crA: '4.1%', crB: '4.3%', status: '52% significance', lift: '+4.8%', active: true },
    { id: 3, name: 'CTA Color Shift (Standard light grey contrast)', crA: '3.9%', crB: '4.6%', status: 'Completed (99%)', lift: '+17.9%', active: false },
  ];

  const pageFrictionScores = [
    { path: '/checkout/step2-shipping', visitors: '14,200', score: 71, level: 'High', color: 'text-neutral-900 font-bold' },
    { path: '/signup/basic-info', visitors: '22,500', score: 48, level: 'Medium', color: 'text-neutral-700 font-semibold' },
    { path: '/home', visitors: '124,000', score: 14, level: 'Low', color: 'text-neutral-500' },
  ];

  return (
    <div className="space-y-10 animate-fade-in select-none text-[#1A1A1A]">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1A1A1A]/10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8C8C] block mb-1">Metrics & Streams</span>
          <h2 className="text-4xl font-serif italic font-bold tracking-tight text-[#1A1A1A]">Workspace Intelligence</h2>
          <p className="text-[#8C8C8C] font-serif italic text-sm mt-1">
            Continuous telemetry feed evaluates interactive viewport widths against standard WCAG expectations.
          </p>
        </div>
        <button 
          onClick={simulateRealtimeEvent}
          className={`flex items-center gap-2 px-4 py-2.5 text-[9px] uppercase tracking-[0.2em] font-bold rounded-none border border-[#1A1A1A]/20 bg-white hover:bg-[#E6E3DD] active:translate-y-px transition-all relative cursor-pointer font-sans text-[#1A1A1A] ${simulationActive ? 'opacity-70' : ''}`}
        >
          <RefreshCw className={`w-3 h-3 text-[#1A1A1A] ${simulationActive ? 'animate-spin' : ''}`} />
          <span>Realtime Pulse Stream</span>
          <span className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full animate-ping absolute -top-0.5 -right-0.5"></span>
        </button>
      </div>

      {/* KPI Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div 
          onClick={() => setSelectedKpi('cr')}
          className={`p-6 rounded-none border transition-all ${selectedKpi === 'cr' ? 'border-[#1A1A1A] bg-[#E6E3DD] shadow-xs' : 'border-[#1A1A1A]/10 bg-white hover:bg-[#E6E3DD]/40'}`}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.25em]">Conversion Rate</span>
            <div className="text-[#1A1A1A]"><Percent className="w-3.5 h-3.5" /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif italic font-bold text-[#1A1A1A]">{conversionRate}%</span>
            <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-widest font-mono">live</span>
          </div>
          <p className="text-[10px] text-[#8C8C8C] mt-2 font-serif italic">Aggregated across checkout funnels.</p>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => setSelectedKpi('lift')}
          className={`p-6 rounded-none border transition-all ${selectedKpi === 'lift' ? 'border-[#1A1A1A] bg-[#E6E3DD] shadow-xs' : 'border-[#1A1A1A]/10 bg-white hover:bg-[#E6E3DD]/40'}`}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.25em]">Conversion Lift</span>
            <div className="text-[#1A1A1A]"><ArrowUpRight className="w-3.5 h-3.5" /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif italic font-bold text-[#1A1A1A]">+{liftValue}%</span>
            <span className="text-[9px] font-bold bg-[#1A1A1A] text-white px-1.5 py-0.5 rounded-none font-sans uppercase tracking-widest">▲ 1.4%</span>
          </div>
          <p className="text-[10px] text-[#8C8C8C] mt-2 font-serif italic">Versus unoptimized static baseline.</p>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => setSelectedKpi('friction')}
          className={`p-6 rounded-none border transition-all ${selectedKpi === 'friction' ? 'border-[#1A1A1A] bg-[#E6E3DD] shadow-xs' : 'border-[#1A1A1A]/10 bg-white hover:bg-[#E6E3DD]/40'}`}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.25em]">Friction Index</span>
            <div className="text-[#1A1A1A]"><Gauge className="w-3.5 h-3.5" /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif italic font-bold text-[#1A1A1A]">{mockDashboardMetrics.frictionIndex}</span>
            <span className="text-[9px] font-bold bg-[#8C8C8C] text-white px-1.5 py-0.5 rounded-none font-sans uppercase tracking-widest">Optimal</span>
          </div>
          <p className="text-[10px] text-[#8C8C8C] mt-2 font-serif italic">Healthy ratio of step transitions.</p>
        </div>

        {/* Metric 4 */}
        <div className="p-6 rounded-none border border-[#1A1A1A]/10 bg-white">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.25em]">Weekly Cohorts</span>
            <div className="text-[#1A1A1A]"><Users className="w-3.5 h-3.5" /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif italic font-bold text-[#1A1A1A]">{mockDashboardMetrics.weeklyVisitors}</span>
            <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-widest font-mono">uniques</span>
          </div>
          <p className="text-[10px] text-[#8C8C8C] mt-2 font-serif italic">Active telemetry endpoints loaded.</p>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Column (2/3 width) */}
        <div className="lg:col-span-2 border border-[#1A1A1A]/10 rounded-none bg-[#EBE8E1] p-6 space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-[#1A1A1A]/10">
            <div>
              <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.2em] font-mono">Conversion Velocity</span>
              <h3 className="text-base font-bold text-[#1A1A1A] font-serif italic">Performance Vector Timeline</h3>
            </div>
            <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold">
              <span className="flex items-center gap-1.5 text-[#1A1A1A]"><span className="w-2 h-2 bg-[#1A1A1A]"></span>A/B Vector</span>
              <span className="flex items-center gap-1.5 text-[#8C8C8C]"><span className="w-2 h-2 bg-[#DEDBD5] border border-[#1A1A1A]/30"></span>Baseline</span>
            </div>
          </div>

          {/* Dynamic Interactive Chart Simulator to match Editorial design */}
          <div className="relative h-64 bg-[#F2EFE9] border border-[#1A1A1A]/10 p-4">
            <svg viewBox="0 0 600 200" className="w-full h-full text-[#8C8C8C]">
              {/* Background delicate gridlines */}
              <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(26, 26, 26, 0.04)" strokeWidth="1" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(26, 26, 26, 0.04)" strokeWidth="1" />
              <line x1="0" y1="150" x2="600" y2="150" stroke="rgba(26, 26, 26, 0.04)" strokeWidth="1" />

              {/* Control Base Line */}
              <path 
                d="M 50 160 Q 150 140 250 142 T 450 135 T 550 138" 
                fill="none" 
                stroke="#8C8C8C" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
              />

              {/* Optimized A/B Line - Solid Charcoal Black */}
              <path 
                d="M 50 160 Q 150 120 250 90 T 450 64 T 550 48" 
                fill="none" 
                stroke="#1A1A1A" 
                strokeWidth="2.5" 
              />

              {/* Aesthetic Data points */}
              <circle cx="50" cy="160" r="4" fill="#1A1A1A" stroke="#F2EFE9" strokeWidth="1.5" />
              <circle cx="150" cy="120" r="4" fill="#1A1A1A" stroke="#F2EFE9" strokeWidth="1.5" />
              <circle cx="250" cy="90" r="4" fill="#1A1A1A" stroke="#F2EFE9" strokeWidth="1.5" />
              <circle cx="350" cy="72" r="4" fill="#1A1A1A" stroke="#F2EFE9" strokeWidth="1.5" />
              <circle cx="450" cy="64" r="4" fill="#1A1A1A" stroke="#F2EFE9" strokeWidth="1.5" />
              <circle cx="550" cy="48" r="5" fill="#1A1A1A" stroke="#F2EFE9" strokeWidth="2" className="animate-pulse" />

              {/* Elegant Mono labels */}
              <text x="50" y="190" fill="#8C8C8C" className="text-[9px] font-mono tracking-widest text-[#8C8C8C] uppercase text-anchor-middle">Mon</text>
              <text x="150" y="190" fill="#8C8C8C" className="text-[9px] font-mono tracking-widest text-[#8C8C8C] uppercase text-anchor-middle">Tue</text>
              <text x="250" y="190" fill="#8C8C8C" className="text-[9px] font-mono tracking-widest text-[#8C8C8C] uppercase text-anchor-middle">Wed</text>
              <text x="350" y="190" fill="#8C8C8C" className="text-[9px] font-mono tracking-widest text-[#8C8C8C] uppercase text-anchor-middle">Thu</text>
              <text x="450" y="190" fill="#8C8C8C" className="text-[9px] font-mono tracking-widest text-[#8C8C8C] uppercase text-anchor-middle">Fri</text>
              <text x="550" y="190" fill="#8C8C8C" className="text-[9px] font-mono tracking-widest text-[#8C8C8C] uppercase text-anchor-middle">Sun</text>
            </svg>
            <div className="absolute top-4 left-6 bg-[#E6E3DD] border border-[#1A1A1A]/10 p-2.5 rounded-none text-[10px]">
              <span className="font-bold uppercase tracking-wider block">Peak Performance</span>
              <p className="text-[9px] text-[#4A4A4A] font-mono mt-0.5">CR: 4.1% • Lift +18.4%</p>
            </div>
          </div>

          {/* Quick Stats Actions */}
          <div className="p-4 bg-white border border-[#1A1A1A]/10 rounded-none flex flex-col md:flex-row gap-4 items-center justify-between text-xs font-semibold">
            <span className="text-[#4A4A4A] font-serif italic text-[11px]">Ready to implement more organic directives and geometric fixes?</span>
            <div className="flex gap-2">
              <button 
                onClick={() => onNavigateToView('ai-insights')}
                className="px-3 py-2 border border-[#1A1A1A]/20 text-[9px] font-bold uppercase tracking-wider bg-transparent hover:bg-[#E6E3DD] transition-all cursor-pointer rounded-none"
              >
                Review Recommendations
              </button>
              <button 
                onClick={onOpenOptimize}
                className="px-3 py-2 rounded-none bg-[#1A1A1A] text-white hover:bg-[#2D2D2D] text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                Inspect Live HTML
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Diagnostics Column (1/3 width) */}
        <div className="border border-[#1A1A1A]/10 rounded-none bg-white p-6 space-y-6">
          <div>
            <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.25em]">Path Friction</span>
            <h3 className="text-base font-bold text-[#1A1A1A] font-serif italic mt-0.5">Friction Hostspots</h3>
          </div>

          <div className="space-y-4">
            {pageFrictionScores.map((p, idx) => (
              <div key={idx} className="p-4 border border-[#1A1A1A]/10 rounded-none hover:bg-[#F2EFE9] transition-colors">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-[#1A1A1A] break-all">{p.path}</span>
                  <span className={`text-[11px] font-bold tracking-widest ${p.color}`}>{p.score}%</span>
                </div>
                <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-[#8C8C8C] font-semibold">
                  <span>Audits: {p.visitors}</span>
                  <span>{p.level} Friction</span>
                </div>
                {/* Friction indicator bar */}
                <div className="w-full h-1 bg-[#EBE8E1] rounded-none mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-[#1A1A1A]"
                    style={{ width: `${p.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => onNavigateToView('funnels')}
            className="w-full py-3.5 border border-[#1A1A1A]/15 text-[#1A1A1A] text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-[#E6E3DD] rounded-none transition-all cursor-pointer"
          >
            Investigate Funnels
          </button>
        </div>
      </div>

      {/* A/B Significance Tests */}
      <div className="border border-[#1A1A1A]/10 rounded-none bg-white p-6">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-[#1A1A1A]/10">
          <div>
            <h3 className="text-base font-bold text-[#1A1A1A] font-serif italic">Active Validation Experiments</h3>
            <p className="text-xs text-[#8C8C8C] mt-0.5">Continuous verification streams executed across unoptimized baseline controls.</p>
          </div>
          <span className="text-[9px] tracking-widest font-bold uppercase text-white bg-[#1A1A1A] px-3 py-1">2 Active Runs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#EBE8E1] border-b border-[#1A1A1A]/10">
                <th className="p-3 text-[#1A1A1A] font-bold uppercase tracking-[0.15em] text-[9px]">Experiment Name</th>
                <th className="p-3 text-[#1A1A1A] font-bold uppercase tracking-[0.15em] text-[9px]">Baseline CR (Control)</th>
                <th className="p-3 text-[#1A1A1A] font-bold uppercase tracking-[0.15em] text-[9px]">Directive CR (Variant)</th>
                <th className="p-3 text-[#1A1A1A] font-bold uppercase tracking-[0.15em] text-[9px]">Current Lift</th>
                <th className="p-3 text-[#1A1A1A] font-bold uppercase tracking-[0.15em] text-[9px]">Significance Rate</th>
                <th className="p-3 text-[#1A1A1A] font-bold uppercase tracking-[0.15em] text-[9px]">Cohort Status</th>
              </tr>
            </thead>
            <tbody>
              {abTests.map((t) => (
                <tr key={t.id} className="border-b border-[#1A1A1A]/5 hover:bg-[#F2EFE9]/40 transition-colors">
                  <td className="p-3 font-semibold text-[#1A1A1A]">{t.name}</td>
                  <td className="p-3 text-[#8C8C8C] font-mono">{t.crA}</td>
                  <td className="p-3 text-[#1A1A1A] font-mono font-bold">{t.crB}</td>
                  <td className="p-3 text-[#1A1A1A] font-mono font-bold">{t.lift}</td>
                  <td className="p-3 text-[#4A4A4A] font-sans font-medium">{t.status}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded-none ${
                      t.active ? 'bg-transparent text-[#1A1A1A] border border-[#1A1A1A]' : 'bg-[#E6E3DD] text-[#8C8C8C]'
                    }`}>
                      {t.active ? 'Running' : 'Success'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
