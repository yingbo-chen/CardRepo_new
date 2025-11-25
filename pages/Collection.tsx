import React from 'react';
import { Card } from '../types';
import { Grid3X3, Filter } from 'lucide-react';
import { SmartImage } from '../components/SmartImage';

interface CollectionProps {
  cards: Card[];
  onSelectCard: (card: Card) => void;
}

export const Collection: React.FC<CollectionProps> = ({ cards, onSelectCard }) => {
  return (
    <div className="pb-24 pt-4 px-4 min-h-screen bg-slate-50">
      {/* Header / Stats */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            我的卡册
          </h1>
          <p className="text-xs text-gray-500 mt-1">共收集 {cards.length} / 120 张</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm text-gray-600">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm text-gray-600">
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card) => (
          <div 
            key={card.id} 
            onClick={() => onSelectCard(card)}
            className="relative aspect-[9/16] rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-pointer group bg-white"
          >
            <SmartImage 
              fallbackSrc={card.imageUrl} 
              localId={card.id}
              alt={card.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
            />
            {/* Rarity Badge */}
            <div className="absolute top-1 left-1">
              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm ${
                card.rarity === 'UR' ? 'bg-orange-500 text-black' :
                card.rarity === 'SSR' ? 'bg-pink-500 text-white' :
                'bg-blue-600/80 text-white'
              }`}>
                {card.rarity}
              </span>
            </div>
          </div>
        ))}
        
        {/* Empty slots placeholders */}
        {[...Array(5)].map((_, i) => (
          <div key={`empty-${i}`} className="aspect-[9/16] rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
             <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};