import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Flame, 
  Filter, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: any) => void;
  onUpgradeClick?: () => void;
}

export default function Sidebar({ currentView, setCurrentView, onUpgradeClick }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai-insights', name: 'AI Insights', icon: Sparkles },
    { id: 'heatmaps', name: 'Heatmaps', icon: Flame },
    { id: 'funnels', name: 'Funnels', icon: Filter },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-[#E6E3DD] border-r border-[#1A1A1A]/10 flex flex-col justify-between select-none shrink-0 font-sans text-[#1A1A1A]">
      {/* Top Brand Section */}
      <div className="p-6">
        <div className="space-y-1 mb-12">
          <div className="text-[9px] uppercase tracking-[0.3em] font-semibold text-[#8C8C8C]">AI-Driven Precision</div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full border border-[#1A1A1A] flex items-center justify-center overflow-hidden shrink-0">
              <span className="text-[10px] font-serif italic text-[#1A1A1A]">ux</span>
            </div>
            <h1 className="text-xl font-serif italic tracking-tight font-bold text-[#1A1A1A]">UX Optimiser</h1>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-3 px-3 py-3 text-[10px] tracking-[0.25em] uppercase font-bold transition-all duration-150 cursor-pointer text-left border-b ${
                  isActive
                    ? 'border-[#1A1A1A] text-[#1A1A1A] font-extrabold translate-x-0.5'
                    : 'border-[#1A1A1A]/5 text-[#8C8C8C] hover:text-[#1A1A1A] hover:border-[#1A1A1A]/30'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1A1A1A]' : 'text-[#8C8C8C]'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 flex flex-col gap-5 border-t border-[#1A1A1A]/10 bg-[#DEDBD5]/60">
        <button
          onClick={onUpgradeClick}
          className="w-full py-3 px-4 bg-[#1A1A1A] text-white text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-[#2D2D2D] active:translate-y-px transition-all rounded-sm cursor-pointer"
        >
          Upgrade to Pro
        </button>
        <button
          onClick={() => setCurrentView('settings')}
          className="flex items-center gap-2 py-1 text-[9px] uppercase tracking-[0.2em] font-bold text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors cursor-pointer text-left"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Help Center</span>
        </button>
      </div>
    </aside>
  );
}

