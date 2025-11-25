import React from 'react';
import { CATEGORIES } from '../constants';
import { CardPack } from '../types';
import { MapPin, Flame } from 'lucide-react';
import { SmartImage } from '../components/SmartImage';

interface HomeProps {
  packs: CardPack[];
  onPackClick: (pack: CardPack) => void;
}

export const Home: React.FC<HomeProps> = ({ packs, onPackClick }) => {
  return (
    <div className="pb-24 pt-4 px-4 space-y-8">
      
      {/* Local Event Banner */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
            <MapPin className="text-secondary w-5 h-5" />
            本地漫展 & 活动
          </h2>
          <span className="text-xs text-gray-500">上海 <span className="text-secondary ml-1">Change</span></span>
        </div>
        <div className="w-full aspect-[21/9] bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl relative overflow-hidden shadow-xl shadow-indigo-200 group cursor-pointer">
           <SmartImage 
             fallbackSrc="https://picsum.photos/800/400?random=99" 
             localId="event-banner"
             className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity mix-blend-overlay" 
             alt="Event" 
           />
           <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black/60 to-transparent">
             <span className="bg-secondary text-white text-[10px] px-2 py-0.5 rounded-full mb-2 inline-block">进行中</span>
             <h3 className="font-bold text-white text-lg drop-shadow-md">CP29 场贩限定卡包首发</h3>
             <p className="text-xs text-gray-100 mt-1 drop-shadow">仅限现场定位领取限定 SSR</p>
           </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat.label}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                idx === 0 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Hot Packs */}
      <section>
        <div className="flex items-center gap-2 mb-4 px-1">
          <Flame className="text-orange-500 w-5 h-5 fill-current" />
          <h2 className="text-lg font-bold text-slate-900">热门卡包</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {packs.map((pack) => (
            <div 
              key={pack.id} 
              onClick={() => onPackClick(pack)}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative aspect-[9/12]">
                <SmartImage 
                  fallbackSrc={pack.coverUrl} 
                  localId={pack.id}
                  alt={pack.title} 
                  className="w-full h-full object-cover" 
                />
                {pack.isHot && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-bold shadow-md">
                    HOT
                  </div>
                )}
                {pack.isNew && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded font-bold shadow-md">
                    NEW
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-200 shadow-sm">
                   <p className="text-slate-900 font-bold text-sm">¥{pack.price}</p>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm truncate text-slate-900 mb-1">{pack.title}</h3>
                <div className="flex flex-wrap gap-1">
                  {pack.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};