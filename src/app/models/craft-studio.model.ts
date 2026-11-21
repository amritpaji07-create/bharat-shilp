export type { Product } from './marketplace.model';

export interface CraftPiece {
  id: string;
  type: string;
  brand?: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  liked?: boolean;
}

export interface CraftEnsemble {
  id: string;
  index: number;
  name: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  description: string;
  pieces: CraftPiece[];
  totalPrice: number;
  bundlePrice: number;
  discountNote?: string;
  originBadge?: string;
  tastingOrCraftNote?: string;
}

export interface CraftArchiveCategory {
  id: string;
  name: string;
  subName?: string;
  region: string;
  colorName?: string;
  accent: string;
  textColor?: string;
  image: string;
  price: number;
  note?: string;
  tag?: string;
  liked?: boolean;
}

export interface CraftShelfFilter {
  id: string;
  label: string;
  count: number;
}

export interface CraftShelfItem {
  id: string;
  name: string;
  price: number;
  category: string;
  categoryType: string;
  categoryLabel?: string;
  image: string;
  description: string;
  origin: string;
  artisanCluster: string;
  specs: { label: string; value: string }[];
  tag?: string;
  inStock?: boolean;
}

export interface CraftReel {
  id: string;
  reelNumber?: string;
  duration?: string;
  craftType?: string;
  title: string;
  location?: string;
  videoUrl?: string;
  posterImage: string;
  price: number;
  handle?: string;
  soundTrack?: string;
  artisanStory: string;
}
