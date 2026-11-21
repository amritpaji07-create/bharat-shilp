import {
  BridalSaree,
  RailCategory,
  RailItem,
  RailSaree,
  SilkCategory,
  SilkLook,
  SilkPiece,
  SilkReel,
  SilkSpool
} from '../models/silk-experience.model';
import { Product } from '../models/marketplace.model';

const ASSET_ROOT = 'assets/silk-experience';
const RAIL_ROOT = `${ASSET_ROOT}/silk-rail/sarees`;
const BLOUSE_ROOT = `${ASSET_ROOT}/silk-rail/blouses`;
const PICK_ROOT = `${ASSET_ROOT}/pick-a-silk`;
const MODEL_ROOT = `${ASSET_ROOT}/try-the-look/models`;
const PIECE_ROOT = `${ASSET_ROOT}/try-the-look/pieces`;
const BRIDAL_ROOT = `${ASSET_ROOT}/bridal`;
const REEL_ROOT = `${ASSET_ROOT}/silk-reels`;

export const RAIL_CATEGORIES: RailCategory[] = [
  { id: 'all', label: 'All pieces', count: 25 },
  { id: 'silk-sarees', label: 'Silk Sarees', count: 9 },
  { id: 'half-sarees', label: 'Half Sarees', count: 4 },
  { id: 'full-blouses', label: 'Full-Sleeve Blouses', count: 4 },
  { id: 'half-blouses', label: 'Half-Sleeve Blouses', count: 8 },
  { id: 'checked-sarees', label: 'Checked Sarees', count: 5 },
  { id: 'zari-brocade', label: 'Zari & Brocade', count: 4 }
];

export const SILK_RAIL: RailItem[] = [
  {
    id: 'rail-01',
    name: 'Koorai Royal Blue Silk',
    category: 'Silk Saree',
    categoryType: 'silk-sarees',
    categoryLabel: 'Silk Saree',
    price: 28500,
    image: `${RAIL_ROOT}/saree-01-royal-blue.png`,
    description: 'Vivid royal blue pure mulberry silk adorned with intricate gold zari checks and an ornate peacock pallu.',
    sizes: [34, 36, 38, 40, 42],
    catalogueProductId: 'prod-001',
    lookId: 'look-01'
  },
  {
    id: 'rail-02',
    name: 'Sindoor Red Banarasi',
    category: 'Banarasi Silk',
    categoryType: 'silk-sarees',
    categoryLabel: 'Banarasi Silk',
    price: 32000,
    image: `${RAIL_ROOT}/saree-02-red-banarasi.png`,
    description: 'Festive crimson red handloom Banarasi silk woven with kadhwa gold zari floral bel motifs.',
    sizes: [34, 36, 38, 40, 42],
    catalogueProductId: 'prod-002',
    lookId: 'look-04'
  },
  {
    id: 'rail-03',
    name: 'Emerald Kanjivaram Zari',
    category: 'Kanjivaram Silk',
    categoryType: 'zari-brocade',
    categoryLabel: 'Kanjivaram Silk',
    price: 34500,
    image: `${RAIL_ROOT}/saree-03-emerald-green.png`,
    description: 'Deep forest emerald Kanjivaram drape featuring heavy korvai borders and solid gold zari pattu.',
    sizes: [34, 36, 38, 40, 42],
    catalogueProductId: 'prod-003',
    lookId: 'look-03'
  },
  {
    id: 'rail-04',
    name: 'Purple Patola Heritage',
    category: 'Checked Saree',
    categoryType: 'checked-sarees',
    categoryLabel: 'Checked Saree',
    price: 29800,
    image: `${RAIL_ROOT}/saree-04-purple-patola.png`,
    description: 'Exquisite double-ikat Patola inspired geometry in rich imperial purple and mustard temple borders.',
    sizes: [34, 36, 38, 40, 42],
    catalogueProductId: 'prod-004',
    lookId: 'look-02'
  },
  {
    id: 'rail-05',
    name: 'Gulabi Rose Pink Silk',
    category: 'Half Saree',
    categoryType: 'half-sarees',
    categoryLabel: 'Half Saree',
    price: 26000,
    image: `${RAIL_ROOT}/saree-05-rose-pink.png`,
    description: 'Delicate pastel rose pink silk woven with silver-gold dual-tone zari buttis and fine tissue tassels.',
    sizes: [34, 36, 38, 40, 42],
    catalogueProductId: 'prod-005',
    lookId: 'look-05'
  },
  {
    id: 'rail-06',
    name: 'Surya Golden Orange Silk',
    category: 'Half Saree',
    categoryType: 'half-sarees',
    categoryLabel: 'Half Saree',
    price: 27500,
    image: `${RAIL_ROOT}/saree-06-golden-orange.png`,
    description: 'Luminous sunset golden-orange drape with pure zari borders inspired by temple dawn silhouettes.',
    sizes: [34, 36, 38, 40, 42],
    catalogueProductId: 'prod-006',
    lookId: 'look-06'
  },
  {
    id: 'rail-07',
    name: 'Mayur Teal Gold Zari',
    category: 'Full-Sleeve Blouse',
    categoryType: 'full-blouses',
    categoryLabel: 'Full-Sleeve Blouse',
    price: 31000,
    image: `${RAIL_ROOT}/saree-07-teal-gold.png`,
    description: 'Regal peacock teal handloom drape with dense antique meenakari zari vines along the border.',
    sizes: [34, 36, 38, 40, 42],
    catalogueProductId: 'prod-007',
    lookId: 'look-07'
  },
  {
    id: 'rail-08',
    name: 'Magenta Rani Peacock',
    category: 'Zari Brocade',
    categoryType: 'zari-brocade',
    categoryLabel: 'Zari Brocade',
    price: 33500,
    image: `${RAIL_ROOT}/saree-08-magenta-peacock.png`,
    description: 'Vibrant celebratory rani magenta silk with traditional floral jaal and hand-twisted silk selvedge.',
    sizes: [34, 36, 38, 40, 42],
    catalogueProductId: 'prod-008',
    lookId: 'look-08'
  }
];

export const SILK_LOOKS: SilkLook[] = [
  {
    id: 'look-01',
    index: 1,
    name: 'Royal Blue Silk',
    title: 'Royal Sapphire Kanjivaram',
    sareeTitle: 'Royal Blue Kanjivaram Saree',
    category: 'Kanjivaram',
    image: `${MODEL_ROOT}/look-01-royal-blue-silk.png`,
    productImage: `${RAIL_ROOT}/saree-01-royal-blue.png`,
    catalogueProductId: 'prod-001',
    description: 'A vivid sapphire drape framed with warm gold-toned borders and traditional motif embellishments.',
    totalPrice: 65000,
    bundlePrice: 58500,
    discountNote: 'Save 10%',
    pieces: [
      { id: 'p-1', type: 'Saree', name: 'Royal Blue Kanjivaram Saree', price: 28500, image: `${RAIL_ROOT}/saree-01-royal-blue.png`, brand: 'SHREEM' },
      { id: 'p-2', type: 'Blouse', name: 'Mustard Silk Embroidered Blouse', price: 4500, image: `${PIECE_ROOT}/piece-02-blouse.png`, brand: 'SHREEM' },
      { id: 'p-3', type: 'Choker', name: 'South Sea Pearl Choker', price: 9200, image: `${PIECE_ROOT}/piece-03-choker.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-4', type: 'Jhumkas', name: 'Temple Bell Jhumkas', price: 4200, image: `${PIECE_ROOT}/piece-04-jhumkas.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-5', type: 'Ottiyanam', name: 'Peacock Motif Waist Belt', price: 14800, image: `${PIECE_ROOT}/piece-05-ottiyanam.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-6', type: 'Bangles', name: 'Antique Gold Kadas', price: 3800, image: `${PIECE_ROOT}/piece-06-bangles.png`, brand: 'SHREEM ARCHIVE' }
    ]
  },
  {
    id: 'look-02',
    index: 2,
    name: 'Purple Patola',
    title: 'Imperial Purple Patola',
    sareeTitle: 'Purple Patola Silk Saree',
    category: 'Patola',
    image: `${MODEL_ROOT}/look-02-purple-patola.png`,
    productImage: `${RAIL_ROOT}/saree-04-purple-patola.png`,
    catalogueProductId: 'prod-004',
    description: 'A rich royal purple styling inspired by traditional double-ikat geometric precision.',
    totalPrice: 66000,
    bundlePrice: 59400,
    discountNote: 'Save 10%',
    pieces: [
      { id: 'p-1', type: 'Saree', name: 'Purple Patola Silk Saree', price: 29800, image: `${RAIL_ROOT}/saree-04-purple-patola.png`, brand: 'SHREEM' },
      { id: 'p-2', type: 'Blouse', name: 'Ruby Raw Silk Blouse Piece', price: 4200, image: `${PIECE_ROOT}/piece-02-blouse.png`, brand: 'SHREEM' },
      { id: 'p-3', type: 'Choker', name: 'Kundan Navratan Choker', price: 9000, image: `${PIECE_ROOT}/piece-03-choker.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-4', type: 'Jhumkas', name: 'Ruby Drop Jhumkas', price: 4400, image: `${PIECE_ROOT}/piece-04-jhumkas.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-5', type: 'Ottiyanam', name: 'Filigree Gold Ottiyanam', price: 14600, image: `${PIECE_ROOT}/piece-05-ottiyanam.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-6', type: 'Bangles', name: 'Ruby Studded Bangles', price: 4000, image: `${PIECE_ROOT}/piece-06-bangles.png`, brand: 'SHREEM ARCHIVE' }
    ]
  },
  {
    id: 'look-03',
    index: 3,
    name: 'Emerald Kanjivaram',
    title: 'Emerald Forest Temple Pattu',
    sareeTitle: 'Emerald Green Kanjivaram Saree',
    category: 'Kanjivaram',
    image: `${MODEL_ROOT}/look-03-emerald-kanjivaram.png`,
    productImage: `${RAIL_ROOT}/saree-03-emerald-green.png`,
    catalogueProductId: 'prod-003',
    description: 'Jewel emerald tone draped with heavy korvai zari borders and heirloom South Indian grace.',
    totalPrice: 71000,
    bundlePrice: 63900,
    discountNote: 'Save 10%',
    pieces: [
      { id: 'p-1', type: 'Saree', name: 'Emerald Green Kanjivaram Saree', price: 34500, image: `${RAIL_ROOT}/saree-03-emerald-green.png`, brand: 'SHREEM' },
      { id: 'p-2', type: 'Blouse', name: 'Gold Tissue Embroidered Blouse', price: 4900, image: `${PIECE_ROOT}/piece-02-blouse.png`, brand: 'SHREEM' },
      { id: 'p-3', type: 'Choker', name: 'Emerald Mango Haar Choker', price: 9600, image: `${PIECE_ROOT}/piece-03-choker.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-4', type: 'Jhumkas', name: 'Temple Emerald Jhumkas', price: 4600, image: `${PIECE_ROOT}/piece-04-jhumkas.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-5', type: 'Ottiyanam', name: 'Temple Gopuram Ottiyanam', price: 13600, image: `${PIECE_ROOT}/piece-05-ottiyanam.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-6', type: 'Bangles', name: 'Green Enamel Gold Bangles', price: 3800, image: `${PIECE_ROOT}/piece-06-bangles.png`, brand: 'SHREEM ARCHIVE' }
    ]
  },
  {
    id: 'look-04',
    index: 4,
    name: 'Sindoor Red Banarasi',
    title: 'Sindoor Crimson Kadhwa',
    sareeTitle: 'Sindoor Red Banarasi Saree',
    category: 'Banarasi',
    image: `${MODEL_ROOT}/look-04-red-banarasi.png`,
    productImage: `${RAIL_ROOT}/saree-02-red-banarasi.png`,
    catalogueProductId: 'prod-002',
    description: 'Celebratory vermilion red Banarasi silk woven with rich floral jaal and auspicious gold zari.',
    totalPrice: 68000,
    bundlePrice: 61200,
    discountNote: 'Save 10%',
    pieces: [
      { id: 'p-1', type: 'Saree', name: 'Sindoor Red Banarasi Saree', price: 32000, image: `${RAIL_ROOT}/saree-02-red-banarasi.png`, brand: 'SHREEM' },
      { id: 'p-2', type: 'Blouse', name: 'Emerald Brocade Custom Blouse', price: 4600, image: `${PIECE_ROOT}/piece-02-blouse.png`, brand: 'SHREEM' },
      { id: 'p-3', type: 'Choker', name: 'Kundan Hasli Necklace Set', price: 9200, image: `${PIECE_ROOT}/piece-03-choker.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-4', type: 'Jhumkas', name: 'Chandbali Pearl Drops', price: 4400, image: `${PIECE_ROOT}/piece-04-jhumkas.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-5', type: 'Ottiyanam', name: 'Kundan Floral Kamarbandh', price: 14000, image: `${PIECE_ROOT}/piece-05-ottiyanam.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-6', type: 'Bangles', name: 'Polki Ruby Choodiyan', price: 3800, image: `${PIECE_ROOT}/piece-06-bangles.png`, brand: 'SHREEM ARCHIVE' }
    ]
  },
  {
    id: 'look-05',
    index: 5,
    name: 'Rose Pink Silk',
    title: 'Gulabi Rose Tissue Silk',
    sareeTitle: 'Rose Pink Soft Silk Saree',
    category: 'Soft Silk',
    image: `${MODEL_ROOT}/look-05-rose-pink-silk.png`,
    productImage: `${RAIL_ROOT}/saree-05-rose-pink.png`,
    catalogueProductId: 'prod-005',
    description: 'A soft pastel pink tone highlighted by delicate silver zari accents and contemporary refinement.',
    totalPrice: 62000,
    bundlePrice: 55800,
    discountNote: 'Save 10%',
    pieces: [
      { id: 'p-1', type: 'Saree', name: 'Rose Pink Soft Silk Saree', price: 26000, image: `${RAIL_ROOT}/saree-05-rose-pink.png`, brand: 'SHREEM' },
      { id: 'p-2', type: 'Blouse', name: 'Rose Gold Cutwork Blouse', price: 4200, image: `${PIECE_ROOT}/piece-02-blouse.png`, brand: 'SHREEM' },
      { id: 'p-3', type: 'Choker', name: 'Pink Tourmaline Choker', price: 8900, image: `${PIECE_ROOT}/piece-03-choker.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-4', type: 'Jhumkas', name: 'Silver Wash Drop Earrings', price: 4100, image: `${PIECE_ROOT}/piece-04-jhumkas.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-5', type: 'Ottiyanam', name: 'Delicate Pearl Chain Vaddanam', price: 15000, image: `${PIECE_ROOT}/piece-05-ottiyanam.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-6', type: 'Bangles', name: 'Rose Quartz Bangles', price: 3800, image: `${PIECE_ROOT}/piece-06-bangles.png`, brand: 'SHREEM ARCHIVE' }
    ]
  },
  {
    id: 'look-06',
    index: 6,
    name: 'Surya Golden Orange',
    title: 'Surya Sunset Gold Brocade',
    sareeTitle: 'Golden Orange Sunset Silk Saree',
    category: 'Temple Weave',
    image: `${MODEL_ROOT}/look-06-golden-orange-silk.png`,
    productImage: `${RAIL_ROOT}/saree-06-golden-orange.png`,
    catalogueProductId: 'prod-006',
    description: 'An effervescent marigold orange body flanked with majestic antique zari pallu patterns.',
    totalPrice: 64000,
    bundlePrice: 57600,
    discountNote: 'Save 10%',
    pieces: [
      { id: 'p-1', type: 'Saree', name: 'Golden Orange Sunset Silk Saree', price: 27500, image: `${RAIL_ROOT}/saree-06-golden-orange.png`, brand: 'SHREEM' },
      { id: 'p-2', type: 'Blouse', name: 'Rani Pink Zari Blouse', price: 4300, image: `${PIECE_ROOT}/piece-02-blouse.png`, brand: 'SHREEM' },
      { id: 'p-3', type: 'Choker', name: 'Temple Sun Motif Hasli', price: 9100, image: `${PIECE_ROOT}/piece-03-choker.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-4', type: 'Jhumkas', name: 'Gilded Coin Jhumkas', price: 4300, image: `${PIECE_ROOT}/piece-04-jhumkas.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-5', type: 'Ottiyanam', name: 'Sunburst Gold Ottiyanam', price: 15000, image: `${PIECE_ROOT}/piece-05-ottiyanam.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-6', type: 'Bangles', name: 'Textured Gold Valaiyal', price: 3800, image: `${PIECE_ROOT}/piece-06-bangles.png`, brand: 'SHREEM ARCHIVE' }
    ]
  },
  {
    id: 'look-07',
    index: 7,
    name: 'Deep Green Banarasi',
    title: 'Deep Green Banarasi',
    sareeTitle: 'Deep Green Banarasi Silk Saree',
    category: 'Banarasi',
    image: `${MODEL_ROOT}/look-07-deep-green-banarasi.png`,
    productImage: `${RAIL_ROOT}/saree-07-teal-gold.png`,
    catalogueProductId: 'prod-007',
    description: 'Deep green Banarasi silk styled with rich zari accents and handcrafted temple jewelry.',
    totalPrice: 68000,
    bundlePrice: 61200,
    discountNote: 'Save 10%',
    pieces: [
      {
        id: 'p-1',
        type: 'Saree',
        name: 'Deep Green Banarasi Silk Saree',
        price: 31000,
        image: `${RAIL_ROOT}/saree-07-teal-gold.png`,
        brand: 'SHREEM'
      },
      {
        id: 'p-2',
        type: 'Blouse',
        name: 'Dusty Rose Silk Blouse',
        price: 4200,
        image: `${PIECE_ROOT}/piece-02-blouse.png`,
        brand: 'SHREEM'
      },
      {
        id: 'p-3',
        type: 'Choker',
        name: 'Pink Stone Temple Choker',
        price: 9400,
        image: `${PIECE_ROOT}/piece-03-choker.png`,
        brand: 'SHREEM'
      },
      {
        id: 'p-4',
        type: 'Jhumkas',
        name: 'Jhumkas with Pearl Drops',
        price: 4600,
        image: `${PIECE_ROOT}/piece-04-jhumkas.png`,
        brand: 'SHREEM'
      },
      {
        id: 'p-5',
        type: 'Ottiyanam',
        name: 'Elephant Motif Ottiyanam',
        price: 15000,
        image: `${PIECE_ROOT}/piece-05-ottiyanam.png`,
        brand: 'SHREEM'
      },
      {
        id: 'p-6',
        type: 'Bangles',
        name: 'Gold and Dusty Rose Bangle Stack',
        price: 3800,
        image: `${PIECE_ROOT}/piece-06-bangles.png`,
        brand: 'SHREEM'
      }
    ]
  },
  {
    id: 'look-08',
    index: 8,
    name: 'Magenta Rani Peacock',
    title: 'Magenta Peacock Heritage',
    sareeTitle: 'Magenta Rani Peacock Saree',
    category: 'Banarasi',
    image: `${MODEL_ROOT}/look-08-maroon-banarasi.png`,
    productImage: `${RAIL_ROOT}/saree-08-magenta-peacock.png`,
    catalogueProductId: 'prod-008',
    description: 'A deep crimson-maroon drape with celebratory peacock borders and timeless heritage charm.',
    totalPrice: 67000,
    bundlePrice: 60300,
    discountNote: 'Save 10%',
    pieces: [
      { id: 'p-1', type: 'Saree', name: 'Magenta Rani Peacock Saree', price: 33500, image: `${RAIL_ROOT}/saree-08-magenta-peacock.png`, brand: 'SHREEM' },
      { id: 'p-2', type: 'Blouse', name: 'Gold Zari Brocade High-Neck Blouse', price: 4800, image: `${PIECE_ROOT}/piece-02-blouse.png`, brand: 'SHREEM' },
      { id: 'p-3', type: 'Choker', name: 'Heritage Temple Coin Malai', price: 9200, image: `${PIECE_ROOT}/piece-03-choker.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-4', type: 'Jhumkas', name: 'Peacock Carved Jhumkas', price: 4500, image: `${PIECE_ROOT}/piece-04-jhumkas.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-5', type: 'Ottiyanam', name: 'Mayil Motif Ottiyanam', price: 11200, image: `${PIECE_ROOT}/piece-05-ottiyanam.png`, brand: 'SHREEM ARCHIVE' },
      { id: 'p-6', type: 'Bangles', name: 'Kasu Zari Bangles', price: 3800, image: `${PIECE_ROOT}/piece-06-bangles.png`, brand: 'SHREEM ARCHIVE' }
    ]
  }
];

export const SILK_CATEGORIES: SilkCategory[] = [
  {
    id: 'palace-check',
    name: 'PALACE CHECK',
    subName: 'Palace Check',
    colorName: 'Emerald Green',
    accent: '#19392b',
    textColor: '#ffffff',
    image: `${PICK_ROOT}/look-03-emerald-kanjivaram.png`,
    price: 34000,
    note: 'Double-warp handwoven emerald silk with golden check grid and heritage pallu.'
  },
  {
    id: 'bengal-garden',
    name: 'BENGAL GARDEN',
    subName: 'Bengal Garden',
    colorName: 'Ruby Crimson',
    accent: '#6c1523',
    textColor: '#ffffff',
    image: `${PICK_ROOT}/look-04-red-banarasi.png`,
    price: 28500,
    note: 'Wild mulberry matka silk featuring hand-block floral bel motifs and fine zari borders.'
  },
  {
    id: 'kanchi-rani',
    name: 'KANCHI RANI',
    subName: 'Kanchi Rani',
    colorName: 'Royal Indigo',
    accent: '#182746',
    textColor: '#ffffff',
    image: `${PICK_ROOT}/look-01-royal-blue-silk.png`,
    price: 36000,
    note: 'Deep indigo royal silk with heavy contrast gold korvai border and temple gopuram motifs.'
  },
  {
    id: 'magenta-shell',
    name: 'MAGENTA SHELL SILK',
    subName: 'Magenta Shell Silk',
    colorName: 'Plum Rose',
    accent: '#59163d',
    textColor: '#ffffff',
    image: `${PICK_ROOT}/look-05-rose-pink-silk.png`,
    price: 31000,
    note: 'Luminous dual-tone shell silk dyed with natural madder and spun with pure tissue weft.'
  },
  {
    id: 'benares-gold',
    name: 'BENARES GOLD',
    subName: 'Benares Gold',
    colorName: 'Antique Mustard',
    accent: '#7f5616',
    textColor: '#ffffff',
    image: `${PICK_ROOT}/look-06-golden-orange-silk.png`,
    price: 42000,
    note: 'Pure Katan handloom with 24K gold electroplated silver zari kadhwa floral jaal.'
  },
  {
    id: 'koorai-check',
    name: 'KOORAI CHECK',
    subName: 'Koorai Check',
    colorName: 'Terracotta Rust',
    accent: '#722e18',
    textColor: '#ffffff',
    image: `${PICK_ROOT}/look-08-maroon-banarasi.png`,
    price: 29000,
    note: 'Ancient Tamil ritual wedding weave with earthy terracotta body and bold gold zari checks.'
  },
  {
    id: 'sindoor',
    name: 'SINDOOR',
    subName: 'Sindoor',
    colorName: 'Vermilion Red',
    accent: '#831a1a',
    textColor: '#ffffff',
    image: `${PICK_ROOT}/look-02-purple-patola.png`,
    price: 33500,
    note: 'Celebratory auspicious red Banarasi silk woven with traditional kadhwa floral vines.'
  }
];

export const BRIDAL_COLLECTION: BridalSaree[] = [
  {
    id: 'bridal-01',
    name: 'Manjal Kalyanam Kanjivaram',
    price: 48000,
    image: `${BRIDAL_ROOT}/bridal-01-manjal-kalyanam.png`,
    palluNote: 'Heavy Korvai Temple Pallu in 24K electroplated zari',
    fabric: 'Pure Mulberry Kanjivaram Silk',
    tag: 'Save 12%'
  },
  {
    id: 'bridal-02',
    name: 'Kumkum Red Banarasi Brocade',
    price: 52000,
    image: `${BRIDAL_ROOT}/bridal-02-kumkum-red.png`,
    palluNote: 'Solid Kadhwa Shikargah border and intricate jaal',
    fabric: 'Handloom Katan Silk',
    tag: 'Heirloom'
  },
  {
    id: 'bridal-03',
    name: 'Kalyana Maalai Rose Silk',
    price: 44000,
    image: `${BRIDAL_ROOT}/bridal-03-kalyana-maalai.png`,
    palluNote: 'Dual-Tone Silver Meenakari woven into pastel tissue',
    fabric: 'Organza & Soft Silk Blend',
    tag: 'Boutique Exclusive'
  }
];

export const SILK_REELS: SilkReel[] = [
  {
    id: 'reel-01',
    reelNumber: '01 / 05',
    duration: '0:16',
    fabricType: 'Kanjivaram',
    title: 'Ponni Kanjivaram',
    location: 'Thanjavur Temple Courtyard',
    subtitle: 'Woven with gold zari and traditional Thanjavur motifs',
    handle: '@shreem',
    soundTrack: 'Temple Bells & Shehnai',
    videoUrl: 'assets/silk-experience/Women_weaving_saree_in_workshop_0b741d56_1080p.mp4',
    price: 34000,
    avatar: `${REEL_ROOT}/reel-01-ponni.png`
  },
  {
    id: 'reel-02',
    reelNumber: '02 / 05',
    duration: '0:31',
    fabricType: 'Organza',
    title: 'Marina Morning',
    location: 'Chennai Coastline',
    subtitle: 'Weightless sunrise drape caught in ocean breeze',
    handle: '@shreem',
    soundTrack: 'Ocean Waves & Flute',
    videoUrl: 'assets/silk-experience/Women_weaving_saree_in_workshop_0b741d56_1080p.mp4',
    price: 26500,
    avatar: `${REEL_ROOT}/reel-02-marina.png`
  },
  {
    id: 'reel-03',
    reelNumber: '03 / 05',
    duration: '0:17',
    fabricType: 'Banarasi',
    title: 'Kaali Banarasi',
    location: 'Varanasi Ghats at Dusk',
    subtitle: 'Midnight black Katan silk glowing with antique gold jaal',
    handle: '@shreem',
    soundTrack: 'Ganga Aarti Acoustic',
    videoUrl: 'assets/silk-experience/Women_weaving_saree_in_workshop_0b741d56_1080p.mp4',
    price: 38000,
    avatar: `${REEL_ROOT}/reel-03-kaali.png`
  },
  {
    id: 'reel-04',
    reelNumber: '04 / 05',
    duration: '0:15',
    fabricType: 'Soft Silk',
    title: 'Pachai Pattu',
    location: 'Chettinad Heritage Mansion',
    subtitle: 'Lustrous emerald green weave against vintage Chettinad tiles',
    handle: '@shreem',
    soundTrack: 'Carnatic Veena Strings',
    videoUrl: 'assets/silk-experience/Women_weaving_saree_in_workshop_0b741d56_1080p.mp4',
    price: 29000,
    avatar: `${REEL_ROOT}/reel-04-pachai.png`
  },
  {
    id: 'reel-05',
    reelNumber: '05 / 05',
    duration: '0:38',
    fabricType: 'Tussar',
    title: 'Galli Sindoor',
    location: 'Kanchipuram Weaver Street',
    subtitle: 'Auspicious vermilion pattu draped along ancient weaver lanes',
    handle: '@shreem',
    soundTrack: 'Loom Rhythms & Nadaswaram',
    videoUrl: 'assets/silk-experience/Women_weaving_saree_in_workshop_0b741d56_1080p.mp4',
    price: 32000,
    avatar: `${REEL_ROOT}/reel-05-sindoor.png`
  }
];

export const SILK_SPOOLS: SilkSpool[] = [
  {
    id: 'spool-01',
    name: 'Koorai Blue Zari',
    weaveType: 'Temple Korvai',
    color: '#1B3A6B',
    gradient: 'linear-gradient(135deg, #1f4277 0%, #152f55 50%, #0b1a30 100%)',
    price: 22400,
    origin: 'Kanchipuram'
  },
  {
    id: 'spool-02',
    name: 'Surya Gold Raw Silk',
    weaveType: 'Templed Mulberry',
    color: '#D4882E',
    gradient: 'linear-gradient(135deg, #e7a03c 0%, #c37016 50%, #7d3c00 100%)',
    price: 19800,
    origin: 'Kanchipuram'
  },
  {
    id: 'spool-03',
    name: 'Red Pit-Tassle Border',
    weaveType: 'Vermilion Banarasi',
    color: '#9A1B28',
    gradient: 'linear-gradient(135deg, #b82333 0%, #871320 50%, #52050e 100%)',
    price: 25510,
    origin: 'Varanasi'
  },
  {
    id: 'spool-04',
    name: 'Neelambari Indigo',
    weaveType: 'Natural Indigo Silk',
    color: '#1E3A5F',
    gradient: 'linear-gradient(135deg, #2b558c 0%, #173356 50%, #0d1e34 100%)',
    price: 21400,
    origin: 'Bengal'
  },
  {
    id: 'spool-05',
    name: 'Royal Emerald Zari',
    weaveType: 'Korvai Pattu',
    color: '#1C4E3D',
    gradient: 'linear-gradient(135deg, #276b54 0%, #164636 50%, #0a251c 100%)',
    price: 24800,
    origin: 'Tamil Nadu'
  },
  {
    id: 'spool-06',
    name: 'Rani Gulabi Silk',
    weaveType: 'Celebratory Madder',
    color: '#C2456C',
    gradient: 'linear-gradient(135deg, #db557f 0%, #a83155 50%, #681630 100%)',
    price: 22600,
    origin: 'Rajasthan'
  },
  {
    id: 'spool-07',
    name: 'Temple Turmeric Ochre',
    weaveType: 'Mysore Pure Silk',
    color: '#C68B18',
    gradient: 'linear-gradient(135deg, #de9e21 0%, #ad760f 50%, #684200 100%)',
    price: 23500,
    origin: 'Karnataka'
  },
  {
    id: 'spool-08',
    name: 'Midnight Gold Charcoal',
    weaveType: 'Antique Kadhwa',
    color: '#2C2B30',
    gradient: 'linear-gradient(135deg, #3d3b42 0%, #222126 50%, #111014 100%)',
    price: 27900,
    origin: 'Varanasi'
  }
];

export function createSilkProduct(params: {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  origin?: string;
}): Product {
  const origPrice = Math.round(params.price * 1.25);
  const discount = Math.round(((origPrice - params.price) / origPrice) * 100);
  return {
    id: params.id,
    name: params.name,
    category: 'Handloom & Textiles',
    categorySlug: 'handloom-textiles',
    price: params.price,
    originalPrice: origPrice,
    discountPercent: discount,
    rating: 4.9,
    reviewCount: 38,
    primaryImage: params.image,
    galleryImages: [params.image],
    sellerId: 'seller-silk-handloom',
    sellerName: 'Varanasi & Kanchipuram Master Weavers',
    sellerType: 'Artisan Guild',
    state: 'Tamil Nadu',
    district: 'Kanchipuram',
    inStock: true,
    stockCount: 8,
    isGI: true,
    isSilkMark: true,
    description: params.description,
    craftStory: 'Woven slowly by master artisans using time-honored pit-looms and authentic zari threads.',
    specifications: {
      material: '100% Pure Mulberry Silk & Real Zari',
      origin: params.origin ?? params.category,
      careInstructions: 'Dry clean only. Store wrapped in pure cotton.'
    },
    tags: ['Silk', 'Handloom', 'Heritage', 'GI Tagged', params.category],
    reviews: []
  };
}
