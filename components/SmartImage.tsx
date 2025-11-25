import React, { useState, useEffect } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc: string;
  localId?: string; // The ID used to find the file locally, e.g., '1' -> '/cards/1.jpg'
}

export const SmartImage: React.FC<SmartImageProps> = ({ fallbackSrc, localId, ...props }) => {
  const [src, setSrc] = useState<string>(fallbackSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Priority 1: If it's a Blob (User uploaded manually via "Profile" page), use it immediately.
    if (fallbackSrc.startsWith('blob:')) {
      setSrc(fallbackSrc);
      return;
    }

    // Priority 2: Try local file if ID exists and we haven't failed yet
    if (localId) {
      // Logic: If we are in a deployed environment, we expect images in /cards/{id}.jpg
      // We strip non-numeric characters if your IDs are complex, or just use ID directly.
      // For this app, let's try to match the ID directly.
      // Example: ID '1' -> '/cards/1.jpg'
      const fileName = localId.replace(/^c/, ''); // Optional: clean 'c1' to '1' if you prefer numeric files
      setSrc(`/cards/${fileName}.jpg`);
      setHasError(false);
    } else {
      setSrc(fallbackSrc);
    }
  }, [fallbackSrc, localId]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If the current src is the local path and it failed, switch to fallback
    if (!hasError && src !== fallbackSrc) {
      // Console debug is helpful for development
      // console.warn(`Local image not found for ${localId}, falling back to ${fallbackSrc}`);
      setSrc(fallbackSrc);
      setHasError(true);
    }
    
    // Pass event to parent if needed
    if (props.onError) {
      props.onError(e);
    }
  };

  return (
    <img 
      {...props} 
      src={src} 
      onError={handleError}
      // Ensure we don't carry over the error handler loop
      alt={props.alt || "Card Image"}
    />
  );
};