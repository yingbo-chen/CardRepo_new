import React from 'react';
import { CardPack } from '../types';
import { ChevronLeft, Share2, Info, Star, CheckCircle2 } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface PackDetailProps {
  pack: CardPack;
  onClose: () => void;
  onDraw: (pack: CardPack, quantity: number) => void;
}

export const PackDetail: React.FC<PackDetailProps> = ({ pack, onClose, onDraw }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col animate-[slideUp_0.3s_ease-out]">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/40 to-transparent">
        <button 
          onClick={onClose}
          className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors">
          <Share2 size={20} />
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 bg-slate-50">
        {/* Cover Image */}
        <div className="relative w-full aspect-[9/12]">
          <SmartImage 
            fallbackSrc={pack.coverUrl} 
            localId={pack.id}
            alt={pack.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-0 p-5 w-full">
            <div className="flex flex-wrap gap-2 mb-2">
                {pack.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] text-white border border-white/10">
                        #{tag}
                    </span>
                ))}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{pack.title}</h1>
            <p className="text-gray-200 text-sm shadow-black drop-shadow">{pack.category}</p>
          </div>
        </div>

        {/* Creator Info Section - NEW */}
        <div className="px-5 mt-4 mb-6">
           <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="relative">
                <img src={pack.creator.avatarUrl} alt={pack.creator.name} className="w-12 h-12 rounded-full border border-gray-100" />
                <div className="absolute -bottom-1 -right-1 bg-secondary text-white rounded-full p-0.5 border-2 border-white">
                   <CheckCircle2 size={12} />
                </div>
              </div>
              <div className="flex-1">
                 <p className="text-[10px] text-gray-500 uppercase tracking-wider">Creator</p>
                 <h3 className="font-bold text-slate-900 text-sm">{pack.creator.name}</h3>
              </div>
              <button className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-full shadow-md hover:bg-slate-800">
                 关注
              </button>
           </div>
        </div>

        {/* Details Section */}
        <div className="px-5 space-y-6">
           {/* Price & Stats */}
           <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div>
                  <p className="text-xs text-gray-500 mb-1">单抽价格</p>
                  <p className="text-2xl font-bold text-secondary">¥{pack.price}</p>
              </div>
              <div className="h-8 w-[1px] bg-gray-100" />
              <div>
                  <p className="text-xs text-gray-500 mb-1">包含卡数</p>
                  <p className="text-xl font-bold text-slate-800">1 张</p>
              </div>
              <div className="h-8 w-[1px] bg-gray-100" />
              <div>
                  <p className="text-xs text-gray-500 mb-1">SSR 概率</p>
                  <p className="text-xl font-bold text-orange-500">5%</p>
              </div>
           </div>

           {/* Description */}
           <div>
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                 <Info size={16} className="text-primary" />
                 卡包介绍
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                  {pack.description || "暂无描述。"}
              </p>
           </div>

           {/* Drop Rates Preview */}
           <div className="pb-10">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                 <Star size={16} className="text-orange-500" />
                 稀有度分布
              </h3>
              <div className="space-y-2">
                  <div className="flex items-center text-xs">
                      <span className="w-8 text-orange-500 font-bold">UR</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full mx-2 overflow-hidden">
                          <div className="h-full bg-orange-500 w-[1%]"></div>
                      </div>
                      <span className="text-gray-500">1%</span>
                  </div>
                  <div className="flex items-center text-xs">
                      <span className="w-8 text-pink-500 font-bold">SSR</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full mx-2 overflow-hidden">
                          <div className="h-full bg-pink-500 w-[5%]"></div>
                      </div>
                      <span className="text-gray-500">5%</span>
                  </div>
                  <div className="flex items-center text-xs">
                      <span className="w-8 text-blue-500 font-bold">SR</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full mx-2 overflow-hidden">
                          <div className="h-full bg-blue-500 w-[20%]"></div>
                      </div>
                      <span className="text-gray-500">20%</span>
                  </div>
                  <div className="flex items-center text-xs">
                      <span className="w-8 text-gray-400 font-bold">R</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full mx-2 overflow-hidden">
                          <div className="h-full bg-gray-400 w-[74%]"></div>
                      </div>
                      <span className="text-gray-500">74%</span>
                  </div>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Action Bar - Updated for 1x and 10x */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 border-t border-gray-100 pb-safe z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          <div className="flex gap-3">
            <button 
                onClick={() => onDraw(pack, 1)}
                className="flex-1 py-3 bg-gray-100 border border-gray-200 hover:bg-gray-200 text-slate-800 font-bold rounded-xl active:scale-95 transition-transform flex flex-col items-center justify-center"
            >
                <span className="text-sm">抽一包</span>
                <span className="text-xs text-secondary">¥{pack.price}</span>
            </button>
            <button 
                onClick={() => onDraw(pack, 10)}
                className="flex-[2] py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-transform flex flex-col items-center justify-center relative overflow-hidden"
            >
                <span className="text-sm">十连抽</span>
                <span className="text-xs opacity-90">¥{(pack.price * 10).toFixed(2)}</span>
                <div className="absolute top-0 right-0 bg-yellow-300 text-black text-[8px] px-1.5 py-0.5 rounded-bl font-bold">
                    保底SR
                </div>
            </button>
          </div>
      </div>
    </div>
  );
};