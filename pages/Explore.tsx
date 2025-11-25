import React from 'react';
import { CardPack } from '../types';
import { Heart } from 'lucide-react';
import { SmartImage } from '../components/SmartImage';

interface ExploreProps {
  packs: CardPack[];
  onPackClick: (pack: CardPack) => void;
}

export const Explore: React.FC<ExploreProps> = ({ packs, onPackClick }) => {
  // Simulate more content by duplicating packs
  const explorePacks = [...packs, ...packs, ...packs].map((pack, idx) => ({
    ...pack,
    uniqueId: `exp-${pack.id}-${idx}`, // Unique key for list
    likes: Math.floor(Math.random() * 5000) + 100, // Random likes
  }));

  return (
    <div className="pb-24 pt-4 px-2 bg-slate-50 min-h-screen">
      <div className="columns-2 gap-2 space-y-2">
        {explorePacks.map((pack) => (
          <div 
            key={pack.uniqueId} 
            onClick={() => onPackClick(pack)}
            className="break-inside-avoid bg-white rounded-xl overflow-hidden border border-gray-100 mb-2 shadow-sm active:opacity-90 transition-opacity cursor-pointer group"
          >
            {/* Cover Image */}
            <div className="relative w-full">
               <SmartImage 
                fallbackSrc={pack.coverUrl} 
                localId={pack.id}
                alt={pack.title} 
                className="w-full h-auto object-cover" 
                style={{ aspectRatio: '9/16' }}
                loading="lazy"
               />
               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />
               
               {/* Price Tag */}
               <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-md border border-gray-200 px-2 py-0.5 rounded text-xs font-bold text-slate-900 shadow-sm">
                  ¥{pack.price}
               </div>

               {/* Tags */}
               <div className="absolute top-2 left-2 flex flex-col items-start gap-1">
                 {pack.isHot && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold shadow">HOT</span>}
                 {pack.isNew && <span className="bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold shadow">NEW</span>}
               </div>
            </div>

            {/* Info Section */}
            <div className="p-3">
              <h3 className="text-sm font-bold text-slate-800 line-clamp-2 mb-2 leading-tight">
                {pack.description || pack.title}
              </h3>
              
              <div className="flex items-center justify-between mt-2">
                {/* Creator */}
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={pack.creator.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] text-gray-500 truncate max-w-[70px]">{pack.creator.name}</span>
                </div>

                {/* Likes */}
                <div className="flex items-center gap-1 text-gray-400 flex-shrink-0">
                  <Heart className="w-3 h-3" />
                  <span className="text-[10px]">{pack.likes < 1000 ? pack.likes : (pack.likes / 1000).toFixed(1) + 'k'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center py-6">
        <p className="text-gray-400 text-xs">正在加载更多优质内容...</p>
      </div>
    </div>
  );
};