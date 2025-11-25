import React, { useState, useRef, useEffect } from 'react';
import { CardPack, Card } from '../types';
import { SmartImage } from './SmartImage';

interface DrawAnimationProps {
  pack: CardPack;
  resultCards: Card[];
  onComplete: () => void;
}

export const DrawAnimation: React.FC<DrawAnimationProps> = ({ pack, resultCards, onComplete }) => {
  const [stage, setStage] = useState<'VIDEO' | 'FLASH' | 'REVEAL'>('VIDEO');
  const [showFlash, setShowFlash] = useState(false);
  
  // Logic: Default to local 'draw.mp4'. If it fails, fallback to pack.videoUrl.
  const [videoSrc, setVideoSrc] = useState<string>('/videos/draw.mp4');
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Single card shortcut for easier conditional rendering
  const isSingle = resultCards.length === 1;
  const singleCard = resultCards[0];

  useEffect(() => {
    // Attempt to play whenever the videoSrc changes or component mounts
    if (stage === 'VIDEO' && videoRef.current) {
        // Reset video to start
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn("Video autoplay blocked or failed:", error);
                // If pure autoplay failure (not src error), we might want to show a "Tap to play" or just skip
                // For this UI, we treat playback failure as a signal to skip if we can't recover
            });
        }
    }
  }, [videoSrc, stage]);

  const handleVideoError = () => {
    // If the local file failed, try the pack URL
    if (videoSrc === '/videos/draw.mp4') {
        console.log("Local draw.mp4 not found, attempting fallback to pack URL.");
        if (pack.videoUrl) {
            setVideoSrc(pack.videoUrl);
        } else {
            // No fallback available, skip video
            handleVideoEnded();
        }
    } else {
        // We were already on fallback (or some other url) and it failed
        console.log("Video source failed to load, skipping animation.");
        handleVideoEnded();
    }
  };

  const handleVideoEnded = () => {
    setStage('FLASH');
    triggerFlash();
  };

  const triggerFlash = () => {
    setShowFlash(true);
    setTimeout(() => {
        setStage('REVEAL');
    }, 500);
    setTimeout(() => {
        setShowFlash(false);
    }, 1000);
  };

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center overflow-hidden transition-colors duration-500 ${stage === 'REVEAL' ? 'bg-slate-50' : 'bg-black'}`}>
      
      {/* Stage 1: Full Screen Video */}
      {stage === 'VIDEO' && (
        <div className="absolute inset-0 w-full h-full bg-black">
             <video 
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover"
                playsInline
                muted 
                autoPlay
                onEnded={handleVideoEnded}
                onError={handleVideoError}
             />
             <div className="absolute bottom-10 w-full text-center text-white/50 text-xs animate-pulse">
                {isSingle ? '单抽祈愿中...' : '十连祈愿中...'}
             </div>
             
             {/* Skip Button (Optional UX improvement) */}
             <button 
                onClick={handleVideoEnded}
                className="absolute top-4 right-4 text-white/50 text-xs border border-white/20 px-2 py-1 rounded hover:bg-white/10"
             >
                跳过
             </button>
        </div>
      )}

      {/* Stage 3: Reveal Result - LIGHT THEME */}
      {stage === 'REVEAL' && (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-[fadeIn_0.5s_ease-out]">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 to-pink-100/50 blur-3xl -z-10" />
            
            {/* SINGLE PULL LAYOUT */}
            {isSingle ? (
                <div className="relative w-[85vw] max-w-[400px] aspect-[9/16] animate-[zoomIn_0.4s_ease-out]">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white shadow-2xl shadow-indigo-200 bg-white">
                        <SmartImage 
                            fallbackSrc={singleCard.imageUrl}
                            localId={singleCard.id} 
                            alt="New Card" 
                            className="w-full h-full object-cover" 
                        />
                        <div className={`absolute inset-0 pointer-events-none mix-blend-screen opacity-50 ${
                            singleCard.rarity === 'UR' ? 'bg-gradient-to-tr from-yellow-300 via-transparent to-transparent' : 
                            singleCard.rarity === 'SSR' ? 'bg-gradient-to-tr from-pink-300 via-transparent to-transparent' : ''
                        }`} />

                        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                                    singleCard.rarity === 'UR' ? 'bg-yellow-400 text-black' :
                                    singleCard.rarity === 'SSR' ? 'bg-pink-500 text-white' :
                                    'bg-blue-500 text-white'
                                }`}>
                                    {singleCard.rarity}
                                </span>
                                <p className="text-secondary font-bold text-sm tracking-widest uppercase">New Acquisition</p>
                            </div>
                            <h3 className="text-white font-bold text-2xl mb-1">{singleCard.title}</h3>
                            <p className="text-white/80 text-xs">{singleCard.creator}</p>
                        </div>
                    </div>
                </div>
            ) : (
                /* MULTI PULL LAYOUT (10x) */
                <div className="w-full max-w-md h-[80vh] px-4 flex flex-col">
                    <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
                        恭喜获得
                    </h2>
                    <div className="grid grid-cols-2 gap-3 overflow-y-auto no-scrollbar pb-4">
                        {resultCards.map((card, idx) => (
                            <div 
                                key={idx} 
                                className="relative aspect-[9/14] rounded-lg overflow-hidden border border-gray-200 bg-white shadow-md animate-[slideUp_0.5s_ease-out]"
                                style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
                            >
                                <SmartImage 
                                    fallbackSrc={card.imageUrl} 
                                    localId={card.id}
                                    className="w-full h-full object-cover" 
                                />
                                <div className="absolute top-1 left-1">
                                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm ${
                                        card.rarity === 'UR' ? 'bg-yellow-400 text-black' :
                                        card.rarity === 'SSR' ? 'bg-pink-500 text-white' :
                                        'bg-blue-600/80 text-white'
                                    }`}>
                                        {card.rarity}
                                    </span>
                                </div>
                                {card.rarity === 'UR' && <div className="absolute inset-0 border-2 border-yellow-400 animate-pulse rounded-lg"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <button 
                onClick={onComplete}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[200px] py-3 bg-slate-900 text-white font-bold rounded-full shadow-lg shadow-slate-400 active:scale-95 transition-transform"
            >
                全部收下
            </button>
        </div>
      )}

      {/* White Flash Overlay */}
      {showFlash && (
        <div className="absolute inset-0 bg-white z-[70] animate-flash pointer-events-none"></div>
      )}
    </div>
  );
};