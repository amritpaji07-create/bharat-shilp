export type { Product } from './marketplace.model';

export interface SilkMood {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface SilkPiece {
  id: string;
  type: string;
  brand?: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  liked?: boolean;
}

export interface SilkLook {
  id: string;
  index: number;
  name: string;
  title?: string;
  sareeTitle?: string;
  image: string;
  productImage: string;
  category: string;
  description: string;
  pieces: SilkPiece[];
  originalTotalPrice?: number;
  totalPrice: number;
  bundlePrice: number;
  discountNote?: string;
  catalogueProductId?: string;
}

export interface SilkCategory {
  id: string;
  name: string;
  subName?: string;
  colorName?: string;
  accent: string;
  textColor?: string;
  image: string;
  price: number;
  note?: string;
  tag?: string;
  liked?: boolean;
}

export interface RailCategory {
  id: string;
  label: string;
  count: number;
}

export interface RailItem {
  id: string;
  name: string;
  price: number;
  category: string;
  categoryType: string;
  categoryLabel?: string;
  image: string;
  backImage?: string;
  description: string;
  sizes: number[];
  catalogueProductId?: string;
  lookId?: string;
}

export type RailSaree = RailItem;

export interface SilkReel {
  id: string;
  reelNumber?: string;
  duration?: string;
  fabricType?: string;
  title: string;
  location?: string;
  videoUrl: string;
  price: number;
  avatar?: string;
  handle?: string;
  soundTrack?: string;
  subtitle?: string;
}

export interface SilkSpool {
  id: string;
  name: string;
  weaveType: string;
  color: string;
  gradient: string;
  price: number;
  origin: string;
}

export interface BridalSaree {
  id: string;
  name: string;
  price: number;
  image: string;
  palluNote: string;
  fabric: string;
  tag?: string;
  liked?: boolean;
}
