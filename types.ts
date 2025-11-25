
export type Category = 'Actor' | 'Singer' | 'Coser' | 'Sports' | 'Brand' | 'IP' | 'Streamer' | 'Dance';

export interface Card {
  id: string;
  title: string;
  imageUrl: string;
  rarity: 'R' | 'SR' | 'SSR' | 'UR';
  creator: string;
  description: string;
}

export interface Creator {
  id: string;
  name: string;
  avatarUrl: string;
  bio?: string;
}

export interface CardPack {
  id: string;
  title: string;
  coverUrl: string;
  price: number;
  category: Category;
  tags: string[];
  description?: string;
  videoUrl?: string;
  creator: Creator; // New detailed creator info
  isHot?: boolean;
  isNew?: boolean;
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  balance: number;
  collectionCount: number;
}
