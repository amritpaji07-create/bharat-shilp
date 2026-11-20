import {
  RailCategory,
  RailSaree,
  SilkCategory,
  SilkLook,
  SilkReel,
  SilkSpool
} from '../models/silk-experience.model';

const ASSET_ROOT = 'assets/silk-experience';
const RAIL_ROOT = `${ASSET_ROOT}/silk-rail/sarees`;
const PICK_ROOT = `${ASSET_ROOT}/pick-a-silk`;
const MODEL_ROOT = `${ASSET_ROOT}/try-the-look/models`;

export const RAIL_CATEGORIES: RailCategory[] = [
  { id: 'all', label: 'All pieces', count: 24 },
  { id: 'silk-sarees', label: 'Silk Sarees', count: 8 },
  { id: 'soft-sarees', label: 'Soft Sarees', count: 6 },
  { id: 'half-sarees', label: 'Half Sarees', count: 4 },
  { id: 'skirts', label: 'Full-Drape Skirts', count: 4 },
  { id: 'blouses', label: 'Silk Blouses', count: 6 }
];

export const SILK_RAIL: RailSaree[] = [
  {
    id: 'rail-01',
    name: 'Koorai Royal Blue Silk',
    category: 'Silk Saree',
    categoryType: 'silk-sarees',
    price: 28500,
    image: `${RAIL_ROOT}/saree-01-royal-blue.png`,
    description: 'Vivid royal blue pure mulberry silk adorned with intricate gold zari checks and an ornate peacock pallu.',
    catalogueProductId: 'prod-001',
    lookId: 'look-01'
  },
  {
    id: 'rail-02',
    name: 'Sindoor Red Banarasi',
    category: 'Banarasi Silk',
    categoryType: 'silk-sarees',
    price: 32000,
    image: `${RAIL_ROOT}/saree-02-red-banarasi.png`,
    description: 'Festive crimson red handloom Banarasi silk woven with kadhwa gold zari floral bel motifs.',
    catalogueProductId: 'prod-002',
    lookId: 'look-04'
  },
  {
    id: 'rail-03',
    name: 'Emerald Kanjivaram Zari',
    category: 'Kanjivaram Silk',
    categoryType: 'silk-sarees',
    price: 34500,
    image: `${RAIL_ROOT}/saree-03-emerald-green.png`,
    description: 'Deep forest emerald Kanjivaram drape featuring heavy korvai borders and solid gold zari pattu.',
    catalogueProductId: 'prod-003',
    lookId: 'look-03'
  },
  {
    id: 'rail-04',
    name: 'Purple Patola Heritage',
    category: 'Soft Saree',
    categoryType: 'soft-sarees',
    price: 29800,
    image: `${RAIL_ROOT}/saree-04-purple-patola.png`,
    description: 'Exquisite double-ikat Patola inspired geometry in rich imperial purple and mustard temple borders.',
    catalogueProductId: 'prod-004',
    lookId: 'look-02'
  },
  {
    id: 'rail-05',
    name: 'Gulabi Rose Pink Silk',
    category: 'Soft Saree',
    categoryType: 'soft-sarees',
    price: 26000,
    image: `${RAIL_ROOT}/saree-05-rose-pink.png`,
    description: 'Delicate pastel rose pink silk woven with silver-gold dual-tone zari buttis and fine tissue tassels.',
    catalogueProductId: 'prod-005',
    lookId: 'look-05'
  },
  {
    id: 'rail-06',
    name: 'Surya Golden Orange Silk',
    category: 'Half Saree',
    categoryType: 'half-sarees',
    price: 27500,
    image: `${RAIL_ROOT}/saree-06-golden-orange.png`,
    description: 'Luminous sunset golden-orange drape with pure zari borders inspired by temple dawn silhouettes.',
    catalogueProductId: 'prod-006',
    lookId: 'look-06'
  },
  {
    id: 'rail-07',
    name: 'Mayur Teal Gold Zari',
    category: 'Full-Drape Skirt',
    categoryType: 'skirts',
    price: 31000,
    image: `${RAIL_ROOT}/saree-07-teal-gold.png`,
    description: 'Regal peacock teal handloom drape with dense antique meenakari zari vines along the border.',
    catalogueProductId: 'prod-007',
    lookId: 'look-07'
  },
  {
    id: 'rail-08',
    name: 'Magenta Rani Peacock',
    category: 'Silk Blouse & Saree',
    categoryType: 'blouses',
    price: 33500,
    image: `${RAIL_ROOT}/saree-08-magenta-peacock.png`,
    description: 'Vibrant celebratory rani magenta silk with traditional floral jaal and hand-twisted silk selvedge.',
    catalogueProductId: 'prod-008',
    lookId: 'look-08'
  }
];

export const SILK_LOOKS: SilkLook[] = [
  {
    id: 'look-01',
    name: 'Royal Blue Silk',
    category: 'Royal Blue',
    image: `${MODEL_ROOT}/look-01-royal-blue-silk.png`,
    productImage: `${RAIL_ROOT}/saree-01-royal-blue.png`,
    catalogueProductId: 'prod-001',
    description: 'A vivid sapphire drape framed with warm gold-toned borders and traditional motif embellishments.',
    totalPrice: 38200,
    pieces: [
      {
        type: 'Saree',
        name: 'Royal Blue Kanjivaram Saree',
        price: 28500,
        image: `${RAIL_ROOT}/saree-01-royal-blue.png`,
        description: 'Pure silk with heavy contrast gold zari pallu.'
      },
      {
        type: 'Blouse',
        name: 'Brocade Raw Silk Blouse',
        price: 4500,
        image: `${RAIL_ROOT}/saree-06-golden-orange.png`,
        description: 'Contrast mustard silk with hand-zardosi sleeve embroidery.'
      },
      {
        type: 'Jewellery',
        name: 'Temple Pearl & Gold Choker',
        price: 5200,
        image: `${RAIL_ROOT}/saree-03-emerald-green.png`,
        description: 'Handcrafted matte gold choker with South Sea pearls.'
      }
    ]
  },
  {
    id: 'look-02',
    name: 'Purple Patola',
    category: 'Patola',
    image: `${MODEL_ROOT}/look-02-purple-patola.png`,
    productImage: `${RAIL_ROOT}/saree-04-purple-patola.png`,
    catalogueProductId: 'prod-004',
    description: 'A rich royal purple styling inspired by traditional double-ikat geometric precision.',
    totalPrice: 39500,
    pieces: [
      {
        type: 'Saree',
        name: 'Purple Patola Silk Saree',
        price: 29800,
        image: `${RAIL_ROOT}/saree-04-purple-patola.png`,
        description: 'Pure mulberry silk with authentic ikat checks.'
      },
      {
        type: 'Blouse',
        name: 'Zari Bordered Silk Blouse Piece',
        price: 4200,
        image: `${RAIL_ROOT}/saree-02-red-banarasi.png`,
        description: 'Deep ruby red contrast blouse with gold border.'
      },
      {
        type: 'Jewellery',
        name: 'Antique Gold Jhumka & Mathapatti',
        price: 5500,
        image: `${RAIL_ROOT}/saree-06-golden-orange.png`,
        description: 'Traditional temple jewelry finish with ruby cabochons.'
      }
    ]
  },
  {
    id: 'look-03',
    name: 'Emerald Kanjivaram',
    category: 'Kanjivaram',
    image: `${MODEL_ROOT}/look-03-emerald-kanjivaram.png`,
    productImage: `${RAIL_ROOT}/saree-03-emerald-green.png`,
    catalogueProductId: 'prod-003',
    description: 'Jewel emerald tone draped with heavy korvai zari borders and heirloom South Indian grace.',
    totalPrice: 45200,
    pieces: [
      {
        type: 'Saree',
        name: 'Emerald Green Kanjivaram Saree',
        price: 34500,
        image: `${RAIL_ROOT}/saree-03-emerald-green.png`,
        description: 'Heritage weave with solid gold zari pallu and rudraksh motifs.'
      },
      {
        type: 'Blouse',
        name: 'Gold Tissue Embroidered Blouse',
        price: 4900,
        image: `${RAIL_ROOT}/saree-06-golden-orange.png`,
        description: 'Gold tissue silk with delicate sequin cutwork.'
      },
      {
        type: 'Jewellery',
        name: 'South Heritage Mango Haar',
        price: 5800,
        image: `${RAIL_ROOT}/saree-01-royal-blue.png`,
        description: 'Traditional Manga Malai necklace with emerald drops.'
      }
    ]
  },
  {
    id: 'look-04',
    name: 'Sindoor Red Banarasi',
    category: 'Banarasi',
    image: `${MODEL_ROOT}/look-04-red-banarasi.png`,
    productImage: `${RAIL_ROOT}/saree-02-red-banarasi.png`,
    catalogueProductId: 'prod-002',
    description: 'Celebratory vermilion red Banarasi silk woven with rich floral jaal and auspicious gold zari.',
    totalPrice: 42800,
    pieces: [
      {
        type: 'Saree',
        name: 'Sindoor Red Banarasi Saree',
        price: 32000,
        image: `${RAIL_ROOT}/saree-02-red-banarasi.png`,
        description: 'Pure Katan silk with gold kadhwa zari weave.'
      },
      {
        type: 'Blouse',
        name: 'Emerald Brocade Custom Blouse',
        price: 4600,
        image: `${RAIL_ROOT}/saree-03-emerald-green.png`,
        description: 'Deep emerald contrast blouse with hand-finished piping.'
      },
      {
        type: 'Jewellery',
        name: 'Kundan Hasli Necklace Set',
        price: 6200,
        image: `${RAIL_ROOT}/saree-05-rose-pink.png`,
        description: 'Bridal jadau choker set with green meenakari reverse.'
      }
    ]
  },
  {
    id: 'look-05',
    name: 'Rose Pink Silk',
    category: 'Silk',
    image: `${MODEL_ROOT}/look-05-rose-pink-silk.png`,
    productImage: `${RAIL_ROOT}/saree-05-rose-pink.png`,
    catalogueProductId: 'prod-005',
    description: 'A soft romantic rose-pink silhouette adorned with subtle silver-gold sheen.',
    totalPrice: 34900,
    pieces: [
      {
        type: 'Saree',
        name: 'Gulabi Rose Pink Saree',
        price: 26000,
        image: `${RAIL_ROOT}/saree-05-rose-pink.png`,
        description: 'Featherlight soft silk with intricate silver zari buttis.'
      },
      {
        type: 'Blouse',
        name: 'Silver Tissue Sleeveless Blouse',
        price: 3900,
        image: `${RAIL_ROOT}/saree-07-teal-gold.png`,
        description: 'Contemporary square neck blouse in shimmering silver tissue.'
      },
      {
        type: 'Jewellery',
        name: 'Basra Pearl Choker & Tops',
        price: 5000,
        image: `${RAIL_ROOT}/saree-01-royal-blue.png`,
        description: 'Tiered seed pearl choker with rose gold clasp.'
      }
    ]
  },
  {
    id: 'look-06',
    name: 'Golden Orange Mysore',
    category: 'Mysore Silk',
    image: `${MODEL_ROOT}/look-06-golden-orange-silk.png`,
    productImage: `${RAIL_ROOT}/saree-06-golden-orange.png`,
    catalogueProductId: 'prod-006',
    description: 'Warm sunset hues in pure Mysore crepe silk with lustrous pure gold zari borders.',
    totalPrice: 36700,
    pieces: [
      {
        type: 'Saree',
        name: 'Surya Golden Orange Saree',
        price: 27500,
        image: `${RAIL_ROOT}/saree-06-golden-orange.png`,
        description: 'Pure Mysore crepe silk with 100% pure gold zari borders.'
      },
      {
        type: 'Blouse',
        name: 'Wine Red Velvet Embellished Blouse',
        price: 4400,
        image: `${RAIL_ROOT}/saree-08-magenta-peacock.png`,
        description: 'Micro velvet blouse with delicate marodi handwork.'
      },
      {
        type: 'Jewellery',
        name: 'Guttapusalu Pearl Choker',
        price: 4800,
        image: `${RAIL_ROOT}/saree-02-red-banarasi.png`,
        description: 'Traditional Telugu bunch-pearl necklace with ruby floral centerpiece.'
      }
    ]
  },
  {
    id: 'look-07',
    name: 'Teal Gold Banarasi',
    category: 'Banarasi',
    image: `${MODEL_ROOT}/look-07-deep-green-banarasi.png`,
    productImage: `${RAIL_ROOT}/saree-07-teal-gold.png`,
    catalogueProductId: 'prod-007',
    description: 'Rich jewel teal silk drape accented by opulent heritage gold work and floral vines.',
    totalPrice: 41400,
    pieces: [
      {
        type: 'Saree',
        name: 'Mayur Teal Gold Zari Saree',
        price: 31000,
        image: `${RAIL_ROOT}/saree-07-teal-gold.png`,
        description: 'Pure silk handloom with antique gold zari jaal.'
      },
      {
        type: 'Blouse',
        name: 'Teal Silk Blouse with Elbow Zari',
        price: 4500,
        image: `${RAIL_ROOT}/saree-01-royal-blue.png`,
        description: 'Tailored silk blouse with elbow-length gold borders.'
      },
      {
        type: 'Jewellery',
        name: 'Polki Emerald Drop Choker',
        price: 5900,
        image: `${RAIL_ROOT}/saree-03-emerald-green.png`,
        description: 'Uncut diamond polki finish with Colombian emerald bead drops.'
      }
    ]
  },
  {
    id: 'look-08',
    name: 'Maroon Rani Banarasi',
    category: 'Banarasi',
    image: `${MODEL_ROOT}/look-08-maroon-banarasi.png`,
    productImage: `${RAIL_ROOT}/saree-08-magenta-peacock.png`,
    catalogueProductId: 'prod-008',
    description: 'A deep crimson-maroon drape with celebratory peacock borders and timeless heritage charm.',
    totalPrice: 44500,
    pieces: [
      {
        type: 'Saree',
        name: 'Magenta Rani Peacock Saree',
        price: 33500,
        image: `${RAIL_ROOT}/saree-08-magenta-peacock.png`,
        description: 'Pure Katan silk with intricate peacock and lotus jaal in real gold zari.'
      },
      {
        type: 'Blouse',
        name: 'Gold Zari Brocade High-Neck Blouse',
        price: 4800,
        image: `${RAIL_ROOT}/saree-06-golden-orange.png`,
        description: 'High-neck brocade blouse with potli button back styling.'
      },
      {
        type: 'Jewellery',
        name: 'Heritage Temple Coin Malai',
        price: 6200,
        image: `${RAIL_ROOT}/saree-02-red-banarasi.png`,
        description: 'Lakshmi kasu haram in vintage yellow gold patina.'
      }
    ]
  }
];

export const SILK_CATEGORIES: SilkCategory[] = [
  {
    id: 'koorai-kattu',
    name: 'KOORAI KATTU',
    image: `${PICK_ROOT}/look-03-emerald-kanjivaram.png`,
    accent: '#23533E',
    note: 'South India’s ancient festive temple weave woven with dense gold border motifs.',
    tag: 'Temple Weave'
  },
  {
    id: 'murshidabad-matka',
    name: 'MURSHIDABAD MATKA',
    image: `${PICK_ROOT}/look-04-red-banarasi.png`,
    accent: '#8C1D2F',
    note: 'Bengal handloom spun from organic wild mulberry silk with tactile slub texture.',
    tag: 'Handspun'
  },
  {
    id: 'monsoon-organza',
    name: 'MONSOON ORGANZA',
    image: `${PICK_ROOT}/look-01-royal-blue-silk.png`,
    accent: '#1E4D7A',
    note: 'Weightless, luminous silk organza hand-painted with celestial monsoon motifs.',
    tag: 'Sheer Silk'
  },
  {
    id: 'mashru-stripe',
    name: 'MASHRU STRIPE',
    image: `${PICK_ROOT}/look-06-golden-orange-silk.png`,
    accent: '#B85D26',
    note: 'Satin silk warp woven over cooling cotton weft, prized across the desert royal courts.',
    tag: 'Royal Satin'
  },
  {
    id: 'magenta-shell',
    name: 'MAGENTA SHELL SILK',
    image: `${PICK_ROOT}/look-05-rose-pink-silk.png`,
    accent: '#8A2058',
    note: 'Lustrous festive silk dyed with natural madder and cochineal extracts.',
    tag: 'Natural Dye'
  },
  {
    id: 'palace-brocade',
    name: 'PALACE BROCADE',
    image: `${PICK_ROOT}/look-08-maroon-banarasi.png`,
    accent: '#9E7B26',
    note: 'Heirloom weave featuring 24-karat gold electroplated silver zari florals.',
    tag: 'Heirloom Zari'
  },
  {
    id: 'bengal-tussar',
    name: 'BENGAL TUSSAR',
    image: `${PICK_ROOT}/look-07-deep-green-banarasi.png`,
    accent: '#1D5A60',
    note: 'Raw golden tussar silk gathered from Sal and Arjun forest canopies.',
    tag: 'Wild Silk'
  },
  {
    id: 'emerald-kanjivaram',
    name: 'EMERALD KANJIVARAM',
    image: `${PICK_ROOT}/look-02-purple-patola.png`,
    accent: '#1F4A38',
    note: 'Legendary triple-ply silk warp locked with interlocking temple korvai pallu.',
    tag: 'Korvai GI Tag'
  }
];

export const SILK_REELS: SilkReel[] = [
  {
    id: 'reel-01',
    title: 'Marina Morning',
    subtitle: 'A vibrant occasion drape in fine mulberry silk and real zari borders.',
    videoUrl: 'assets/images/saree video.mp4',
    price: 26500,
    avatar: `${MODEL_ROOT}/look-01-royal-blue-silk.png`,
    handle: '@bharatshilp',
    soundTrack: 'Original Audio · Heritage Weaves of Bharat',
    catalogueProductId: 'prod-001'
  },
  {
    id: 'reel-02',
    title: 'Kaali Banarasi',
    subtitle: 'Midnight black handloom silk with luminous antique gold kadhwa bel.',
    videoUrl: 'assets/images/honey video.mp4',
    price: 31000,
    avatar: `${MODEL_ROOT}/look-04-red-banarasi.png`,
    handle: '@bharatshilp',
    soundTrack: 'Raga Bhairavi · Sitara Solo Weave',
    catalogueProductId: 'prod-002'
  },
  {
    id: 'reel-03',
    title: 'Radhai Ritu',
    subtitle: 'Soft sunset hues in handspun wild silk celebrating the monsoon breeze.',
    videoUrl: 'assets/images/pot video.mp4',
    price: 24800,
    avatar: `${MODEL_ROOT}/look-06-golden-orange-silk.png`,
    handle: '@bharatshilp',
    soundTrack: 'Temple Flute & Silk Looms · Live Studio',
    catalogueProductId: 'prod-006'
  },
  {
    id: 'reel-04',
    title: 'Ponni Kanjivaram',
    subtitle: 'Heirloom jewel-tone emerald green with traditional korvai pattu.',
    videoUrl: 'assets/images/coconut video.mp4',
    price: 34500,
    avatar: `${MODEL_ROOT}/look-03-emerald-kanjivaram.png`,
    handle: '@bharatshilp',
    soundTrack: 'Carnatic Veena Echoes · Master Artisans',
    catalogueProductId: 'prod-003'
  },
  {
    id: 'reel-05',
    title: 'Scented Sanctuary',
    subtitle: 'Hand-rolled natural temple incense rituals meeting pure sacred silk.',
    videoUrl: 'assets/images/Agarbatti.mp4',
    price: 29000,
    avatar: `${MODEL_ROOT}/look-08-maroon-banarasi.png`,
    handle: '@bharatshilp',
    soundTrack: 'Sacred Chants & Temple Bells · Kashi Heritage',
    catalogueProductId: 'prod-008'
  }
];

export const SILK_SPOOLS: SilkSpool[] = [
  {
    id: 'spool-01',
    name: 'Muga Ivory Zari',
    weaveType: 'Wild Golden Silk',
    color: '#E8DFD1',
    gradient: 'linear-gradient(135deg, #f5ecd8 0%, #d8be8a 50%, #9e7b36 100%)',
    price: 18500,
    origin: 'Assam'
  },
  {
    id: 'spool-02',
    name: 'Koorai Madras Checks',
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


import { Product } from '../models/marketplace.model';

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
