import React, { useState } from 'react';
import { Search, Bell, Sparkles, User, CheckCircle2, AlertCircle } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onOpenOptimize: () => void;
  onSelectSubScope: (scope: string) => void;
  subScope: string;
}

export default function Header({ onSearch, onOpenOptimize, onSelectSubScope, subScope }: HeaderProps) {
  const [searchVal, setSearchVal] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchVal(val);
    onSearch(val);
  };

  const navs = ['Overview', 'Reports', 'Live View'];

  const notices = [
    { id: 1, type: 'alert', text: 'Checkout page mobile friction increased above 45%', time: '10m ago' },
    { id: 2, type: 'success', text: 'Optimization "Company Name field" applied successfully', time: '1h ago' },
    { id: 3, type: 'info', text: 'New weekly funnel conversion report is ready', time: '5h ago' }
  ];

  return (
    <header className="sticky top-0 bg-[#F2EFE9] border-b border-[#1A1A1A]/10 z-30 select-none">
      <div className="flex justify-between items-center h-16 px-6 w-full">
        {/* Search & Tabs */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-[#8C8C8C] w-4 h-4" />
            <input
              type="text"
              value={searchVal}
              onChange={handleSearchChange}
              placeholder="Search reports..."
              className="pl-9 pr-4 py-1.5 text-xs rounded-none bg-[#E6E3DD] border border-[#1A1A1A]/10 text-[#1A1A1A] placeholder-[#8C8C8C] focus:outline-none focus:border-[#1A1A1A] focus:ring-0 w-64 transition-all"
            />
          </div>

          <nav className="hidden lg:flex gap-8 ml-6">
            {navs.map((n) => {
              const active = subScope === n;
              return (
                <button
                  key={n}
                  onClick={() => onSelectSubScope(n)}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer pb-1.5 ${
                    active ? 'text-[#1A1A1A] border-b border-[#1A1A1A]' : 'text-[#8C8C8C] hover:text-[#1A1A1A]'
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Corner Control Panel */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-[#8C8C8C] hover:text-[#1A1A1A] p-2 rounded-none transition-all relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#1A1A1A] rounded-full"></span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#F2EFE9] border border-[#1A1A1A]/10 rounded-none shadow-xl py-2 z-40">
                <div className="px-4 py-2 border-b border-[#1A1A1A]/10 flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]">Friction alerts</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#8C8C8C] hover:text-[#1A1A1A] cursor-pointer">Mark read</span>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notices.map((n) => (
                    <div key={n.id} className="px-4 py-3 hover:bg-[#EBE8E1] flex gap-3 border-b border-[#1A1A1A]/5 last:border-0">
                      {n.type === 'alert' ? (
                        <AlertCircle className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-[#8C8C8C] shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="text-xs text-[#1A1A1A] leading-tight font-medium">{n.text}</p>
                        <span className="text-[9px] text-[#8C8C8C] font-mono mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="text-[#8C8C8C] hover:text-[#1A1A1A] p-2 transition-all cursor-pointer" title="AI Status Online">
            <Sparkles className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-[#1A1A1A]/10 mx-1"></div>

          {/* Core Optimizer Button */}
          <button
            onClick={onOpenOptimize}
            className="px-4 py-2 bg-[#1A1A1A] text-white text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-[#2D2D2D] transition-all flex items-center gap-1.5 cursor-pointer rounded-none active:translate-y-px"
          >
            <Sparkles className="w-3 h-3 text-[#EBE8E1]" />
            Optimize DOM
          </button>

          <div className="ml-2 w-7 h-7 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center overflow-hidden cursor-pointer bg-[#E6E3DD]" title="active operator session">
            <User className="w-3.5 h-3.5 text-[#1A1A1A]" />
          </div>
        </div>
      </div>
    </header>
  );
}

