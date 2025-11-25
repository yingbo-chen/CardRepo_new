import React from 'react';
import { Search, ScanLine } from 'lucide-react';

interface TopBarProps {
  onScan: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onScan }) => {
  return (
    // Removed border-b and changed bg to slate-50/90 to match body
    <div className="sticky top-0 z-40 bg-slate-50/90 backdrop-blur-md px-4 py-3 flex items-center gap-3">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border-none rounded-full leading-5 bg-white shadow-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary sm:text-sm transition-colors"
          placeholder="搜索创作者、IP、卡包..."
        />
      </div>
      <button 
        onClick={onScan}
        className="p-2 text-gray-600 hover:text-slate-900 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ScanLine className="h-6 w-6" />
      </button>
    </div>
  );
};