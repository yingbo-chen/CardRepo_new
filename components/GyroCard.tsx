
import React, { useEffect, useState, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Card } from '../types';
import { SmartImage } from './SmartImage';

interface GyroCardProps {
  card: Card;
  onClose: () => void;
}

export const GyroCard: React.FC<GyroCardProps> = ({ card, onClose }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Gamma is left-to-right tilt in degrees, usually -90 to 90
      // Beta is front-to-back tilt in degrees, usually -180 to 180
      const { gamma, beta } = event;
      
      if (gamma !== null && beta !== null) {
        // Clamp values to avoid extreme flips
        const x = Math.min(Math.max(gamma, -45), 45); 
        const y = Math.min(Math.max(beta, -45), 45);
        setRotation({ x, y });
      }
    };

    // Fallback for desktop mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((event.clientX / innerWidth) - 0.5) * 60; // -30 to 30
      const y = ((event.clientY / innerHeight) - 0.5) * 60; // -30 to 30
      setRotation({ x, y });
    };

    if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
      window.addEventListener('deviceorientation', handleOrientation);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate transform styles
  const transformStyle = {
    transform: `perspective(1000px) rotateY(${rotation.x}deg) rotateX(${-rotation.y}deg)`,
  };

  const shineStyle = {
    background: `linear-gradient(${135 + rotation.x}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0) 100%)`,
    backgroundPosition: `${50 + (rotation.x * 2)}% ${50 + (rotation.y * 2)}%`,
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-3 bg-white/10 rounded-full text-white z-50 hover:bg-white/20"
      >
        <X size={24} />
      </button>

      <div className="relative w-[85vw] max-w-[400px] aspect-[9/16]" style={transformStyle}>
        {/* Card Content */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 border border-white/20 bg-card">
          <SmartImage 
            fallbackSrc={card.imageUrl} 
            localId={card.imageId || card.id}
            alt={card.title} 
            className="w-full h-full object-cover"
          />
          
          {/* Bottom Info Gradient */}
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent p-6 flex flex-col justify-end">
            <div className="flex justify-between items-end mb-1">
                <h2 className="text-2xl font-bold text-white tracking-wide">{card.title}</h2>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    card.rarity === 'UR' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' :
                    card.rarity === 'SSR' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' :
                    'bg-blue-500 text-white'
                }`}>
                    {card.rarity}
                </span>
            </div>
            <p className="text-gray-300 text-sm">{card.creator}</p>
          </div>
        </div>

        {/* Shine/Holo Overlay */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-overlay opacity-70"
          style={shineStyle}
        />
        
        {/* Sparkles for UR/SSR */}
        {(card.rarity === 'UR' || card.rarity === 'SSR') && (
            <div className="absolute -top-10 -right-10 text-yellow-300 animate-pulse">
                <Sparkles size={48} />
            </div>
        )}
      </div>

      <div className="absolute bottom-10 text-white/50 text-sm flex items-center gap-2">
         <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
         </div>
         <span>晃动手机查看光效</span>
      </div>
    </div>
  );
};
