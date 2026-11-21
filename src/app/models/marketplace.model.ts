export interface Review {
  id: string;
  userName: string;
  city: string;
  state: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface ProductSpecifications {
  material: string;
  origin: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  certification?: string;
  artisanCluster?: string;
}

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  primaryImage: string;
  galleryImages: string[];
  sellerId: string;
  sellerName: string;
  sellerType: 'SHG' | 'Cooperative' | 'Artisan Guild' | 'ODOP Enterprise' | 'Tribal Producer';
  state: string;
  district: string;
  inStock: boolean;
  stockCount: number;
  isGI: boolean; // Geographical Indication Tagged
  isSilkMark?: boolean;
  isOdop?: boolean; // One District One Product
  isOrganic?: boolean;
  description: string;
  craftStory: string;
  specifications: ProductSpecifications;
  tags: string[];
  reviews: Review[];
}

export interface Seller {
  id: string;
  name: string;
  hindiName?: string;
  type: 'SHG' | 'Cooperative' | 'Artisan Guild' | 'ODOP Enterprise' | 'Tribal Producer';
  state: string;
  district: string;
  verified: boolean;
  memberCount: number;
  womenLed: boolean;
  foundedYear: number;
  description: string;
  story: string;
  craftSpecialty: string;
  rating: number;
  productsCount: number;
  govtRegNumber: string;
  heroImage?: string;
}

export interface Category {
  id: string;
  name: string;
  hindiName: string;
  slug: string;
  count: number;
  image: string;
  description: string;
  icon: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  pincode: string;
  addressLine: string;
  district: string;
  city: string;
  state: string;
  landmark?: string;
  isDefault: boolean;
  type: 'Home' | 'Work';
}

export interface TrackingStep {
  title: string;
  location: string;
  date: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  shgSupportDonation: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  deliveryEstimate: string;
  address: Address;
  trackingSteps: TrackingStep[];
}

export interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
  state: string;
  onlyGI: boolean;
  onlySHG: boolean;
  onlyInStock: boolean;
  minRating: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
  searchQuery: string;
}

export interface CraftHeritageStep {
  title: string;
  desc: string;
}

export interface ArtisanCluster {
  id: string;
  name: string;
  hindiName?: string;
  state: string;
  district: string;
  craftName: string;
  categorySlug: string;
  cooperativeName: string;
  artisanCount: number;
  giTagNumber?: string;
  giYear?: number;
  lat: number;
  lng: number;
  image: string;
  description: string;
  specialtyTag: string;
  masterArtisanName?: string;
  masterArtisanQuote?: string;
  craftHeritageSteps?: CraftHeritageStep[];
  featuredProductId?: string;
  distanceKm?: number;
}

export type PageView = 'home' | 'catalogue' | 'sellers' | 'initiatives' | 'about' | 'orders' | 'wishlist' | 'product-detail' | 'craft-map' | 'account' | 'silk-studio' | 'try-the-look' | 'honey-studio' | 'pottery-studio' | 'coconut-studio';
