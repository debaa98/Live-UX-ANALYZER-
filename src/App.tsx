import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import AIInsightsView from './components/AIInsightsView';
import HeatmapsView from './components/HeatmapsView';
import FunnelsView from './components/FunnelsView';
import SettingsView from './components/SettingsView';
import RunOptimizationModal from './components/RunOptimizationModal';
import { initialInsights } from './data';
import { Insight } from './types';
import { Trophy, CreditCard, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'ai-insights' | 'heatmaps' | 'funnels' | 'settings'>('ai-insights');
  const [searchQuery, setSearchQuery] = useState('');
  const [subScope, setSubScope] = useState('Overview');
  const [insights, setInsights] = useState<Insight[]>(initialInsights);
  const [showOptimizeModal, setShowOptimizeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Merging newly generated insights from user scans
  const handleAddNewInsights = (newInsights: Omit<Insight, 'type'>[]) => {
    const prepared: Insight[] = newInsights.map(ins => ({
      ...ins,
      type: 'low_hanging' // newly analyzed pasted blocks default to low_hanging
    }));
    
    // De-duplicate newly added scanned insights
    setInsights(prev => {
      const filtered = prev.filter(p => !prepared.some(n => n.id === p.id));
      return [...prepared, ...filtered];
    });

    // Automatically navigate back to AI Insights to review newly scanned DOM suggestions
    setCurrentView('ai-insights');
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView 
            onNavigateToView={(view: any) => setCurrentView(view)} 
            onOpenOptimize={() => setShowOptimizeModal(true)}
          />
        );
      case 'ai-insights':
        return (
          <AIInsightsView 
            insights={insights} 
            searchQuery={searchQuery} 
          />
        );
      case 'heatmaps':
        return <HeatmapsView />;
      case 'funnels':
        return <FunnelsView onNavigateToView={(view: any) => setCurrentView(view)} />;
      case 'settings':
        return <SettingsView />;
      default:
        return <AIInsightsView insights={insights} searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F2EFE9] font-sans antialiased text-[#1A1A1A]">
      
      {/* 1. Sidebar Nav */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        onUpgradeClick={() => setShowUpgradeModal(true)}
      />

      {/* 2. Main Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header Control Hub */}
        <Header 
          onSearch={setSearchQuery} 
          onOpenOptimize={() => setShowOptimizeModal(true)}
          onSelectSubScope={setSubScope}
          subScope={subScope}
        />

        {/* Dynamic View Panel Container */}
        <main className="flex-1 overflow-y-auto p-8 max-w-7xl w-full mx-auto pb-16">
          {renderActiveView()}
        </main>
      </div>

      {/* 3. Global Optimizer Scan Modal */}
      {showOptimizeModal && (
        <RunOptimizationModal 
          onClose={() => setShowOptimizeModal(false)}
          onAddingNewInsights={handleAddNewInsights}
        />
      )}

      {/* 4. Upgrade Professional Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none animate-fade-in text-[#1A1A1A]">
          <div className="w-full max-w-md bg-[#F2EFE9] border border-[#1A1A1A]/20 rounded-none shadow-2xl p-6 relative">
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 p-1.5 text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-5">
              <div className="mx-auto w-12 h-12 bg-[#EBE8E1] border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A]">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif italic font-bold text-[#1A1A1A]">Upgrade Operator Status</h3>
                <p className="text-[11px] text-[#8C8C8C] mt-1.5 leading-relaxed">
                  Gain elite access to custom viewport audits, multiple subdomain scopes, real-time heat tracker maps, and deeper automated contrast correction algorithms.
                </p>
              </div>

              <div className="p-4 bg-[#EBE8E1] border border-[#1A1A1A]/10 text-left text-xs space-y-2 rounded-none">
                <div className="flex items-center gap-2 font-bold text-[#1A1A1A] uppercase tracking-wider text-[9px]">
                  <CreditCard className="w-4 h-4 text-[#1A1A1A]" />
                  <span>Pro Fleet Subscription</span>
                </div>
                <p className="text-[10px] text-[#4A4A4A] leading-relaxed">
                  Unlock unlimited device viewports and advanced telemetry reports for $49 per monthly cycle. Cancel anytime.
                </p>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 py-3 text-[9px] uppercase tracking-[0.15em] font-bold rounded-none border border-[#1A1A1A]/20 text-[#1A1A1A] bg-transparent hover:bg-[#E6E3DD] transition-all cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 py-3 text-[9px] uppercase tracking-[0.15em] font-bold rounded-none bg-[#1A1A1A] text-white hover:bg-[#2D2D2D] transition-all cursor-pointer"
                >
                  Request Access
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
