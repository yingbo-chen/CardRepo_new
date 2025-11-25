
import React, { useState, useRef, useEffect } from 'react';
import { CardPack, Card } from '../types';
import { SmartImage } from './SmartImage';
import { Sparkles, X, Volume2, VolumeX } from 'lucide-react';
import { AUDIO_SOURCES } from '../constants';

interface DrawAnimationProps {
  pack: CardPack;
  resultCards: Card[];
  onComplete: () => void;
}

export const DrawAnimation: React.FC<DrawAnimationProps> = ({ pack, resultCards, onComplete }) => {
  const [stage, setStage] = useState<'VIDEO' | 'FLASH' | 'REVEAL'>('VIDEO');
  const [showFlash, setShowFlash] = useState(false);
  
  // Gyro State
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  // Multi-pull preview state
  const [previewCard, setPreviewCard] = useState<Card | null>(null);

  // Video State
  const [videoSrc, setVideoSrc] = useState<string>('/videos/draw.mp4');
  const [isMuted, setIsMuted] = useState(false); // Track if browser forced mute
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Single card shortcut for easier conditional rendering
  const isSingle = resultCards.length === 1;
  const singleCard = resultCards[0];
  const hasHighRarity = resultCards.some(c => c.rarity === 'UR' || c.rarity === 'SSR');

  // --- AUDIO LOGIC ---
  const playAudio = (localPath: string, remoteFallback: string) => {
    // Try to play local first
    const audio = new Audio(localPath);
    audio.volume = 0.5;
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Local failed, try remote
        const remoteAudio = new Audio(remoteFallback);
        remoteAudio.volume = 0.5;
        remoteAudio.play().catch(e => console.error("Audio playback failed:", e));
      });
    }
  };

  useEffect(() => {
    // Attempt to play whenever the videoSrc changes or component mounts
    if (stage === 'VIDEO' && videoRef.current) {
        const video = videoRef.current;
        
        // Explicitly set sound settings
        video.currentTime = 0;
        video.muted = false; // Intend to play with sound
        video.volume = 1.0;

        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn("Video autoplay with sound blocked:", error);
                // Fallback: Play muted if sound is blocked (common on mobile without user gesture)
                video.muted = true;
                setIsMuted(true);
                video.play().catch(e => console.error("Video playback completely failed:", e));
            });
        }
    }
  }, [videoSrc, stage]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    }
  };

  // Handle Sound Effects based on Stage
  useEffect(() => {
    if (stage === 'FLASH') {
        // Play Reveal Sound (Whoosh/Explosion)
        playAudio('/audio/reveal.mp3', AUDIO_SOURCES.reveal);
    }
    
    if (stage === 'REVEAL' && hasHighRarity) {
        // Play SSR Victory Sound slightly delayed
        setTimeout(() => {
            playAudio('/audio/ssr.mp3', AUDIO_SOURCES.ssr);
        }, 300);
    }
  }, [stage, hasHighRarity]);

  // Gyroscope Effect Logic
  useEffect(() => {
    if (stage !== 'REVEAL') return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { gamma, beta } = event;
      if (gamma !== null && beta !== null) {
        // Clamp values
        const x = Math.min(Math.max(gamma, -45), 45); 
        const y = Math.min(Math.max(beta, -45), 45);
        setRotation({ x, y });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((event.clientX / innerWidth) - 0.5) * 40; 
      const y = ((event.clientY / innerHeight) - 0.5) * 40; 
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
  }, [stage, previewCard]); 

  const handleVideoError = () => {
    if (videoSrc === '/videos/draw.mp4') {
        if (pack.videoUrl) {
            setVideoSrc(pack.videoUrl);
        } else {
            handleVideoEnded();
        }
    } else {
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

  // Helper styles for Gyro
  const transformStyle = {
    transform: `perspective(1000px) rotateY(${rotation.x}deg) rotateX(${-rotation.y}deg)`,
  };

  const shineStyle = {
    background: `linear-gradient(${135 + rotation.x}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0) 100%)`,
    backgroundPosition: `${50 + (rotation.x * 2)}% ${50 + (rotation.y * 2)}%`,
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
                // Removed JSX 'muted' and 'autoPlay' to handle via Effect for better control
                onEnded={handleVideoEnded}
                onError={handleVideoError}
             />
             
             {/* Sound Controls Overlay (If browser forces mute) */}
             <div className="absolute top-4 left-4 z-50">
                 {isMuted && (
                    <button 
                        onClick={toggleMute}
                        className="bg-black/40 backdrop-blur text-white px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20 animate-pulse"
                    >
                        <VolumeX size={16} />
                        <span className="text-xs">点击开启声音</span>
                    </button>
                 )}
                 {!isMuted && (
                    <button onClick={toggleMute} className="p-2 bg-black/20 text-white/50 rounded-full hover:bg-black/40">
                         <Volume2 size={16} />
                    </button>
                 )}
             </div>

             <div className="absolute bottom-10 w-full text-center text-white/50 text-xs animate-pulse pointer-events-none">
                {isSingle ? '单抽祈愿中...' : '十连祈愿中...'}
             </div>
             
             <button 
                onClick={handleVideoEnded}
                className="absolute top-4 right-4 text-white/50 text-xs border border-white/20 px-2 py-1 rounded hover:bg-white/10"
             >
                跳过
             </button>
        </div>
      )}

      {/* Stage 3: Reveal Result */}
      {stage === 'REVEAL' && (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-[fadeIn_0.5s_ease-out]">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 to-pink-100/50 blur-3xl -z-10" />
            
            {/* SINGLE PULL LAYOUT */}
            {isSingle ? (
                <div 
                    className="relative w-[85vw] max-w-[400px] aspect-[9/16] animate-[zoomIn_0.4s_ease-out]"
                    style={transformStyle}
                >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white shadow-2xl shadow-indigo-200 bg-white">
                        <SmartImage 
                            fallbackSrc={singleCard.imageUrl}
                            localId={singleCard.imageId || singleCard.id} 
                            alt="New Card" 
                            className="w-full h-full object-cover" 
                        />
                        {/* Shine Layer */}
                        <div 
                            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-70 z-20"
                            style={shineStyle}
                        />

                        {/* Rarity Overlay */}
                        <div className={`absolute inset-0 pointer-events-none mix-blend-screen opacity-50 z-10 ${
                            singleCard.rarity === 'UR' ? 'bg-gradient-to-tr from-yellow-300 via-transparent to-transparent' : 
                            singleCard.rarity === 'SSR' ? 'bg-gradient-to-tr from-pink-300 via-transparent to-transparent' : ''
                        }`} />

                        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/60 to-transparent z-30">
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

                         {/* Sparkles for High Rarity */}
                        {(singleCard.rarity === 'UR' || singleCard.rarity === 'SSR') && (
                            <div className="absolute -top-10 -right-10 text-yellow-300 animate-pulse z-40">
                                <Sparkles size={48} />
                            </div>
                        )}
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
                                onClick={() => setPreviewCard(card)}
                                className="relative aspect-[9/14] rounded-lg overflow-hidden border border-gray-200 bg-white shadow-md animate-[slideUp_0.5s_ease-out] cursor-pointer active:scale-95 transition-transform"
                                style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
                            >
                                <SmartImage 
                                    fallbackSrc={card.imageUrl} 
                                    localId={card.imageId || card.id}
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
                    <p className="text-center text-xs text-gray-400 mt-2 animate-pulse">点击卡片查看详情</p>
                </div>
            )}
            
            <button 
                onClick={onComplete}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[200px] py-3 bg-slate-900 text-white font-bold rounded-full shadow-lg shadow-slate-400 active:scale-95 transition-transform z-50"
            >
                全部收下
            </button>
        </div>
      )}

      {/* Preview Overlay for Multi-Pull with Gyro */}
      {previewCard && (
         <div className="absolute inset-0 z-[80] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
            <button 
                onClick={() => setPreviewCard(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 rounded-full text-white z-50 hover:bg-white/30"
            >
                <X size={24} />
            </button>
            <div 
                className="relative w-full max-w-[320px] aspect-[9/16]"
                style={transformStyle}
            >
                 <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/30 shadow-2xl">
                    <SmartImage 
                        fallbackSrc={previewCard.imageUrl}
                        localId={previewCard.imageId || previewCard.id} 
                        className="w-full h-full object-cover" 
                    />
                    <div 
                        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-70 z-20"
                        style={shineStyle}
                    />
                    <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-white font-bold text-xl">{previewCard.title}</h3>
                        <p className="text-gray-300 text-xs">{previewCard.creator}</p>
                    </div>
                 </div>
            </div>
         </div>
      )}

      {/* White Flash Overlay */}
      {showFlash && (
        <div className="absolute inset-0 bg-white z-[70] animate-flash pointer-events-none"></div>
      )}
    </div>
  );
};
