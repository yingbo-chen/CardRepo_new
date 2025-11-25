import React from 'react';
import { Home, Compass, User, WalletCards } from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'explore', label: '探索', icon: Compass },
    { id: 'collection', label: '收藏', icon: WalletCards },
    { id: 'profile', label: '我的', icon: User },
  ];

  return (
    // Added max-w-md mx-auto and border-x to align with the main phone frame on desktop
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-50/95 backdrop-blur-lg border-t border-x border-gray-200 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.02)] max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-secondary' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className={`h-6 w-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};