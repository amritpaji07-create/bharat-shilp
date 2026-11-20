export interface SilkPiece {
  type: 'Saree' | 'Blouse' | 'Jewellery';
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface SilkLook {
  id: string;
  name: string;
  category: string;
  image: string;
  productImage: string;
  catalogueProductId?: string;
  description: string;
  pieces: SilkPiece[];
  totalPrice: number;
}

export interface SilkCategory {
  id: string;
  name: string;
  image: string;
  accent: string;
  note: string;
  tag?: string;
}

export interface RailCategory {
  id: string;
  label: string;
  count: number;
}

export interface RailSaree {
  id: string;
  name: string;
  category: string;
  categoryType: string;
  price: number;
  image: string;
  description: string;
  catalogueProductId?: string;
  lookId?: string;
}

export interface SilkReel {
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  price: number;
  avatar: string;
  handle: string;
  soundTrack: string;
  catalogueProductId?: string;
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

export interface SilkCustomWeave {
  strandA: SilkSpool;
  strandB: SilkSpool;
  strandC: SilkSpool;
}
