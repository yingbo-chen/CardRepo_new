
import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { TopBar } from './components/TopBar';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Collection } from './pages/Collection';
import { Profile } from './pages/Profile';
import { DrawAnimation } from './components/DrawAnimation';
import { GyroCard } from './components/GyroCard';
import { PackDetail } from './components/PackDetail';
import { CardPack, Card } from './types';
import { MOCK_COLLECTION, MOCK_PACKS } from './constants';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  
  // Data State - Lifted up to allow modification via Custom Image Loader
  const [packs, setPacks] = useState<CardPack[]>(MOCK_PACKS);
  const [userCollection, setUserCollection] = useState<Card[]>(MOCK_COLLECTION);
  const [customImages, setCustomImages] = useState<string[]>([]);

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTab]);

  // State for the flow: Home -> Pack Detail -> Drawing -> Result
  const [selectedPack, setSelectedPack] = useState<CardPack | null>(null);
  const [drawingPack, setDrawingPack] = useState<CardPack | null>(null);
  const [viewingCard, setViewingCard] = useState<Card | null>(null);
  const [newCards, setNewCards] = useState<Card[]>([]);

  // Feature: Load Custom Images from Local Files
  const handleLoadCustomImages = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Convert files to Blob URLs
    const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
    setCustomImages(imageUrls);

    // 1. Update Packs with new images
    const updatedPacks = packs.map((pack, index) => ({
        ...pack,
        coverUrl: imageUrls[index % imageUrls.length] // Cycle through images
    }));
    setPacks(updatedPacks);

    // 2. Update existing Collection with new images
    const updatedCollection = userCollection.map((card, index) => ({
        ...card,
        imageUrl: imageUrls[(index + 5) % imageUrls.length] // Offset slightly for variety
    }));
    setUserCollection(updatedCollection);

    alert(`成功导入 ${imageUrls.length} 张图片！全站图片已替换。`);
  };

  const handlePackClick = (pack: CardPack) => {
    setSelectedPack(pack);
  };

  const handleStartDraw = (pack: CardPack, quantity: number) => {
    // Generate 'quantity' number of random cards
    const drawnCards: Card[] = [];
    for (let i = 0; i < quantity; i++) {
        // Use custom images if available, otherwise fallback to mock random
        let cardImage = `https://picsum.photos/400/711?random=${Date.now() + i}`;
        if (customImages.length > 0) {
            cardImage = customImages[Math.floor(Math.random() * customImages.length)];
        }

        // Generate a mock 'imageId' (e.g., '1', '2', '20') to simulate local files
        // This assumes the user might have files like /cards/1.jpg, /cards/2.jpg etc.
        const randomImageId = (Math.floor(Math.random() * 20) + 1).toString();

        const randomCard: Card = {
            id: `new-${Date.now()}-${i}`,
            imageId: randomImageId, // IMPORTANT: valid localId for SmartImage
            title: customImages.length > 0 ? `自定义卡片 #${Math.floor(Math.random() * 100)}` : `神秘卡片 #${randomImageId}`,
            imageUrl: cardImage,
            rarity: Math.random() > 0.9 ? 'UR' : Math.random() > 0.6 ? 'SSR' : 'R',
            creator: pack.creator.name,
            description: 'Newly drawn card.'
        };
        drawnCards.push(randomCard);
    }
    
    setNewCards(drawnCards);
    setDrawingPack(pack);
  };

  const handleDrawComplete = () => {
    // Add new cards to collection
    setUserCollection(prev => [...newCards, ...prev]);
    setDrawingPack(null);
    setNewCards([]);
  };

  const handleScan = () => {
    alert("模拟开启摄像头扫描二维码...");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-secondary/30">
      
      {/* Main Content Area */}
      <main className="max-w-md mx-auto relative min-h-screen border-x border-gray-200 bg-slate-50 shadow-2xl shadow-slate-200">
        
        {(currentTab === 'home' || currentTab === 'explore') && (
          <TopBar onScan={handleScan} />
        )}

        {currentTab === 'home' && <Home packs={packs} onPackClick={handlePackClick} />}
        {currentTab === 'explore' && <Explore packs={packs} onPackClick={handlePackClick} />}
        {currentTab === 'collection' && <Collection cards={userCollection} onSelectCard={setViewingCard} />}
        {currentTab === 'profile' && <Profile onLoadCustomImages={handleLoadCustomImages} />}
      </main>

      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Overlays / Modals */}
      
      {selectedPack && !drawingPack && (
        <PackDetail 
          pack={selectedPack} 
          onClose={() => setSelectedPack(null)} 
          onDraw={handleStartDraw} 
        />
      )}

      {drawingPack && newCards.length > 0 && (
        <DrawAnimation 
          pack={drawingPack} 
          resultCards={newCards} 
          onComplete={handleDrawComplete} 
        />
      )}

      {viewingCard && (
        <GyroCard 
          card={viewingCard} 
          onClose={() => setViewingCard(null)} 
        />
      )}
    </div>
  );
}
