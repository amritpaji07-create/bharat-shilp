import {
  CraftArchiveCategory,
  CraftEnsemble,
  CraftPiece,
  CraftReel,
  CraftShelfFilter,
  CraftShelfItem
} from '../models/craft-studio.model';
import { Product } from '../models/marketplace.model';

export function createCraftProduct(params: {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  artisanName?: string;
  state?: string;
  badge?: string;
  description?: string;
}): Product {
  const original = params.originalPrice ?? Math.round(params.price * 1.15);
  const discount = Math.max(0, Math.round(((original - params.price) / original) * 100));
  return {
    id: params.id,
    name: params.name,
    hindiName: params.name,
    category: params.category || 'Handicrafts & Artisanal Crafts',
    categorySlug: 'handicrafts-pottery',
    price: params.price,
    originalPrice: original,
    discountPercent: discount,
    rating: 4.9,
    reviewCount: 42,
    primaryImage: params.image,
    galleryImages: [params.image],
    sellerId: `seller-${params.id}`,
    sellerName: params.artisanName || 'Master Tribal Guild',
    sellerType: 'Artisan Guild',
    state: params.state || 'Madhya Pradesh',
    district: 'Heritage Artisan Cluster',
    inStock: true,
    stockCount: 18,
    isGI: true,
    isOdop: true,
    isOrganic: true,
    description: params.description || 'Curated handcrafted heritage creation, sourced directly from certified artisan guilds.',
    craftStory: 'Custodian of centuries-old regional craft tradition, crafting small batches with zero industrial processing.',
    specifications: {
      material: params.badge || '100% Pure Natural Materials',
      origin: params.state || 'India',
      careInstructions: 'Store in a cool, dry place. Handcrafted with traditional care.'
    },
    tags: ['Artisanal', 'Handcrafted', 'GI Certified', 'SHREEM Verified'],
    reviews: []
  };
}

/* ==================================================================== */
/* 1. HONEY STUDIO DATA                                                 */
/* ==================================================================== */
export const HONEY_ASSETS = {
  hero: 'assets/honey-experience/honey-rail/jars/wild-forest-honey.png',
  forestHero: 'assets/images/craft-studios/honey/van_amrit_forest_honey_hero.jpg',

  // Section 1: Arched category artwork tiles (pick-a-honey)
  arches: {
    wildForest: 'assets/honey-experience/pick-a-honey/wild-forest-honey.png',
    jamun: 'assets/honey-experience/pick-a-honey/jamun-honey.png',
    multifloral: 'assets/honey-experience/pick-a-honey/multifloral-honey.png',
    neem: 'assets/honey-experience/pick-a-honey/neem-honey.png',
    raw: 'assets/honey-experience/pick-a-honey/raw-honey.png',
    tulsi: 'assets/honey-experience/pick-a-honey/tulsi-honey.png',
    eucalyptus: 'assets/honey-experience/pick-a-honey/eucalyptus-honey.png'
  },

  // Section 2: Transparent jar cutouts on wooden base (honey-rail/jars)
  jars: {
    wildForest: 'assets/honey-experience/honey-rail/jars/wild-forest-honey.png',
    jamun: 'assets/honey-experience/honey-rail/jars/jamun-honey.png',
    multifloral: 'assets/honey-experience/honey-rail/jars/multifloral-honey.png',
    neem: 'assets/honey-experience/honey-rail/jars/neem-honey.png',
    raw: 'assets/honey-experience/honey-rail/jars/raw-honey.png',
    tulsi: 'assets/honey-experience/honey-rail/jars/tulsi-honey.png',
    eucalyptus: 'assets/honey-experience/honey-rail/jars/eucalyptus-honey.png'
  },

  // Section 3: Product card artwork (honey-cards/products)
  cards: {
    wildForest: 'assets/honey-experience/honey-cards/products/wild-forest-honey-card.png',
    jamun: 'assets/honey-experience/honey-cards/products/jamun-honey-card.png',
    multifloral: 'assets/honey-experience/honey-cards/products/multifloral-honey-card.png',
    neem: 'assets/honey-experience/honey-cards/products/neem-honey-card.png',
    raw: 'assets/honey-experience/honey-cards/products/raw-honey-card.png',
    tulsi: 'assets/honey-experience/honey-cards/products/tulsi-honey-card.png',
    eucalyptus: 'assets/honey-experience/honey-cards/products/eucalyptus-honey-card.png'
  },

  // Backward-compatible keys
  sundarbans: 'assets/honey-experience/pick-a-honey/wild-forest-honey.png',
  acacia: 'assets/honey-experience/pick-a-honey/raw-honey.png',
  jamun: 'assets/honey-experience/pick-a-honey/jamun-honey.png',
  nilgiri: 'assets/honey-experience/pick-a-honey/multifloral-honey.png',
  cliff: 'assets/honey-experience/pick-a-honey/wild-forest-honey.png',
  coffee: 'assets/honey-experience/pick-a-honey/eucalyptus-honey.png',

  pieces: {
    jar: 'assets/honey-experience/honey-rail/jars/raw-honey.png',
    dipper: 'assets/images/craft-studios/honey/piece-02-dipper.jpg',
    drizzler: 'assets/images/craft-studios/honey/piece-03-drizzler.jpg',
    pollen: 'assets/images/craft-studios/honey/piece-04-pollen.jpg',
    comb: 'assets/images/craft-studios/honey/piece-05-comb.jpg',
    walnuts: 'assets/images/craft-studios/honey/piece-06-walnuts.jpg'
  }
};

export const HONEY_ARCHIVE_CATEGORIES: CraftArchiveCategory[] = [
  {
    id: 'wild-forest-arch',
    name: 'Wild Forest Reserve',
    subName: 'Sundarbans & Satpura Wild Canopy',
    region: 'Sundarbans Biosphere & Satpura, MP',
    colorName: 'Lush Emerald Amber',
    accent: '#183827',
    textColor: '#FFFFFF',
    image: HONEY_ASSETS.arches.wildForest,
    price: 699,
    note: 'Deeply aromatic with complex herbal-sweet notes from pristine virgin forest canopies.',
    tag: 'GI Tagged · Tribal Wild Harvest'
  },
  {
    id: 'jamun-arch',
    name: 'Western Ghats Jamun',
    subName: 'Syzygium Cumini Blossom',
    region: 'Bhimashankar Ridge, Maharashtra',
    colorName: 'Rich Bitter-Sweet Dark Port',
    accent: '#3D141E',
    textColor: '#FFFFFF',
    image: HONEY_ASSETS.arches.jamun,
    price: 749,
    note: 'Revered in Ayurveda for its low glycemic index, robust tannic depth, and active enzymes.',
    tag: 'Ayurvedic Low GI · Antioxidant'
  },
  {
    id: 'multifloral-arch',
    name: 'Nilgiri Multi-Flora',
    subName: 'Blue Mountain Shola Wildflowers',
    region: 'Nilgiris Biosphere, Tamil Nadu',
    colorName: 'Warm Blossom Rose Topaz',
    accent: '#692318',
    textColor: '#FFFFFF',
    image: HONEY_ASSETS.arches.multifloral,
    price: 649,
    note: 'Sustainably gathered by indigenous honey gatherers from over 40 species of wild mountain flora.',
    tag: 'Kurumba Gatherers Guild'
  },
  {
    id: 'neem-arch',
    name: 'Deccan Neem Blossom',
    subName: 'Azadirachta Indica Bitter-Sweet Bloom',
    region: 'Deccan Plateau, Karnataka',
    colorName: 'Midnight Sapphire Amber',
    accent: '#0E1E38',
    textColor: '#FFFFFF',
    image: HONEY_ASSETS.arches.neem,
    price: 599,
    note: 'Intensely therapeutic single-floral neem bloom nectar with purifying medicinal attributes.',
    tag: 'Medicinal Reserve · Raw'
  },
  {
    id: 'raw-arch',
    name: 'Pure Meadow Raw',
    subName: 'Unheated Himalayan Foothills',
    region: 'Kangra Valley, Himachal Pradesh',
    colorName: 'Raw Sunlit Gold',
    accent: '#4A3515',
    textColor: '#FFFFFF',
    image: HONEY_ASSETS.arches.raw,
    price: 599,
    note: 'Bottled straight from the comb with zero heat, preserving active diastase enzymes and natural pollen.',
    tag: 'Zero Heat · Live Enzymes'
  },
  {
    id: 'tulsi-arch',
    name: 'Sacred Temple Tulsi',
    subName: 'Holy Basil Floral Essence',
    region: 'Braj & Shivalik Foothills',
    colorName: 'Sacred Royal Plum',
    accent: '#441838',
    textColor: '#FFFFFF',
    image: HONEY_ASSETS.arches.tulsi,
    price: 629,
    note: 'Infused naturally with sacred Ocimum Sanctum floral nectar; renowned for natural respiratory immunity.',
    tag: 'Sacred Aroma · Immunity'
  },
  {
    id: 'eucalyptus-arch',
    name: 'Nilgiri Eucalyptus',
    subName: 'Highland Eucalyptus Grove Harvest',
    region: 'Ooty & Coonoor Ridges, Tamil Nadu',
    colorName: 'Spiced Caramel Amber',
    accent: '#5E3310',
    textColor: '#FFFFFF',
    image: HONEY_ASSETS.arches.eucalyptus,
    price: 699,
    note: 'Crisp mentholic undertone with rich, buttery body harvested from highland montane trees.',
    tag: 'Herbal Infusion · Respiratory'
  }
];

export const HONEY_PICK_VARIETIES = [
  { id: 'pick-h-1', title: 'WILD FOREST', subtitle: 'Sundarbans & Satpura Canopy', price: 699, image: HONEY_ASSETS.jars.wildForest, bg: '#183827' },
  { id: 'pick-h-2', title: 'JAMUN', subtitle: 'Western Ghats Antioxidant', price: 749, image: HONEY_ASSETS.jars.jamun, bg: '#3D141E' },
  { id: 'pick-h-3', title: 'MULTI FLORAL', subtitle: 'Nilgiri Shola Rainforest', price: 649, image: HONEY_ASSETS.jars.multifloral, bg: '#692318' },
  { id: 'pick-h-4', title: 'NEEM BLOSSOM', subtitle: 'Deccan Plateau Bitter-Sweet', price: 599, image: HONEY_ASSETS.jars.neem, bg: '#0E1E38' },
  { id: 'pick-h-5', title: 'RAW MEADOW', subtitle: 'Unheated Pristine Reserve', price: 599, image: HONEY_ASSETS.jars.raw, bg: '#4A3515' },
  { id: 'pick-h-6', title: 'SACRED TULSI', subtitle: 'Vrindavan Holy Basil Flora', price: 629, image: HONEY_ASSETS.jars.tulsi, bg: '#441838' },
  { id: 'pick-h-7', title: 'EUCALYPTUS', subtitle: 'Blue Mountain Forest Breeze', price: 699, image: HONEY_ASSETS.jars.eucalyptus, bg: '#5E3310' }
];

export const HONEY_SHELF_FILTERS: CraftShelfFilter[] = [
  { id: 'all', label: 'All Harvests', count: 7 },
  { id: 'single-floral', label: 'Single Floral', count: 3 },
  { id: 'multi-floral', label: 'Multi-Floral', count: 2 },
  { id: 'medicinal', label: 'Medicinal & Ayurvedic', count: 2 }
];

export const HONEY_SHELF_ITEMS: CraftShelfItem[] = [
  {
    id: 'hs-1',
    name: 'Wild Forest Raw Tribal Honey 500g',
    price: 699,
    category: 'multi-floral',
    categoryType: 'Wild Honey',
    categoryLabel: 'Wild Harvest',
    image: HONEY_ASSETS.jars.wildForest,
    description: 'Pristine raw forest honey gathered by tribal honey gatherers from untamed canopy blossoms with zero processing.',
    origin: 'Sundarbans & Satpura',
    artisanCluster: 'Van Samiti Tribal Cooperative',
    specs: [
      { label: 'Moisture', value: '17.0% (Pure Grade A)' },
      { label: 'Pollen Count', value: 'High Multifocal' },
      { label: 'Processing', value: 'Zero Heat / Unfiltered' },
      { label: 'Certification', value: 'GI Tagged · Organic' }
    ]
  },
  {
    id: 'hs-2',
    name: 'Western Ghats Dark Jamun Honey 500g',
    price: 749,
    category: 'single-floral',
    categoryType: 'Single Floral',
    categoryLabel: 'Ayurvedic Reserve',
    image: HONEY_ASSETS.jars.jamun,
    description: 'Rare single-origin dark port honey harvested from blooming Syzygium Cumini groves, celebrated for low glycemic index.',
    origin: 'Bhimashankar, Maharashtra',
    artisanCluster: 'Sahyadri Honey Guild',
    specs: [
      { label: 'Source', value: '100% Wild Jamun Blossom' },
      { label: 'Antioxidants', value: 'Phenolic Rich 84mg/kg' },
      { label: 'Color', value: 'Rich Bitter-Sweet Dark Port' },
      { label: 'Certification', value: 'Lab Certified Raw' }
    ]
  },
  {
    id: 'hs-3',
    name: 'Nilgiri Multi-Floral Shola Honey 500g',
    price: 649,
    category: 'multi-floral',
    categoryType: 'Wild Honey',
    categoryLabel: 'Multi-Floral',
    image: HONEY_ASSETS.jars.multifloral,
    description: 'Gathered by indigenous Kurumba honey hunters from over forty varieties of endemic Blue Mountain shola wildflowers.',
    origin: 'Nilgiris Biosphere',
    artisanCluster: 'Kurumba Honey Hunters Guild',
    specs: [
      { label: 'Flora', value: '40+ Endemic Wild Species' },
      { label: 'Taste', value: 'Floral with herbal undertones' },
      { label: 'Extraction', value: 'Traditional cold-pressed' },
      { label: 'Certification', value: 'Tribal Harvest Verified' }
    ]
  },
  {
    id: 'hs-4',
    name: 'Deccan Neem Blossom Medicinal Honey 500g',
    price: 599,
    category: 'medicinal',
    categoryType: 'Medicinal Honey',
    categoryLabel: 'Medicinal Reserve',
    image: HONEY_ASSETS.jars.neem,
    description: 'Single-floral bitter-sweet nectar gathered during the summer neem canopy flowering season across the Deccan plateau.',
    origin: 'Deccan Plateau, Karnataka',
    artisanCluster: 'Deccan Organic Apiary',
    specs: [
      { label: 'Source', value: 'Azadirachta Indica Bloom' },
      { label: 'Therapeutic', value: 'Antibacterial & purifying' },
      { label: 'Sugar Profile', value: 'Natural Fructose dominant' },
      { label: 'Certification', value: 'Ayush Certified' }
    ]
  },
  {
    id: 'hs-5',
    name: 'Pure Meadow Raw Wildflower Honey 500g',
    price: 599,
    category: 'single-floral',
    categoryType: 'Raw Honey',
    categoryLabel: 'Single Floral',
    image: HONEY_ASSETS.jars.raw,
    description: 'Raw mountain meadow flower nectar bottled fresh without heat, preserving active diastase enzymes and delicate floral notes.',
    origin: 'Kangra Valley, Himachal Pradesh',
    artisanCluster: 'Kangra Beekeeping Cooperative',
    specs: [
      { label: 'Moisture', value: '17.2% (Pure Grade A)' },
      { label: 'Pollen Count', value: 'High Multifocal' },
      { label: 'Processing', value: 'Zero Heat / Unfiltered' },
      { label: 'Certification', value: 'FSSAI Organic · GI Certified' }
    ]
  },
  {
    id: 'hs-6',
    name: 'Sacred Temple Tulsi Honey 500g',
    price: 629,
    category: 'medicinal',
    categoryType: 'Medicinal Honey',
    categoryLabel: 'Ayurvedic Reserve',
    image: HONEY_ASSETS.jars.tulsi,
    description: 'Revered holy basil blossom nectar hand-harvested around sacred heritage temple sanctums for respiratory wellness.',
    origin: 'Braj & Shivalik Hills',
    artisanCluster: 'Vrindavan Herb Collective',
    specs: [
      { label: 'Source', value: 'Ocimum Sanctum (Krishna Tulsi)' },
      { label: 'Aroma', value: 'Warm aromatic camphoraceous' },
      { label: 'Benefits', value: 'Respiratory immunity & adaptogen' },
      { label: 'Certification', value: '100% Pure Organic' }
    ]
  },
  {
    id: 'hs-7',
    name: 'Nilgiri Highland Eucalyptus Honey 500g',
    price: 699,
    category: 'single-floral',
    categoryType: 'Single Floral',
    categoryLabel: 'Single Floral',
    image: HONEY_ASSETS.jars.eucalyptus,
    description: 'Crisp menthol-undertone honey with a buttery spiced caramel finish, collected from highland blue gum forest canopies.',
    origin: 'Coonoor & Ooty, Nilgiris',
    artisanCluster: 'Highland Beekeepers Guild',
    specs: [
      { label: 'Source', value: 'Eucalyptus Globulus Bloom' },
      { label: 'Texture', value: 'Smooth velvety crystallization' },
      { label: 'Aroma', value: 'Refreshing woody herbal' },
      { label: 'Certification', value: 'Nilgiris Biosphere Certified' }
    ]
  }
];

export const HONEY_ENSEMBLES: CraftEnsemble[] = [];
export const HONEY_REELS: CraftReel[] = [];

/* 2. POTTERY & TERRACOTTA STUDIO DATA                                  */
/* ==================================================================== */
export const POTTERY_ASSETS = {
  hero: 'assets/images/craft-studios/pottery/artisanal_pottery_hero.jpg',
  jaipur: 'assets/images/craft-studios/pottery/earth-01-jaipur-blue.jpg',
  longpi: 'assets/images/craft-studios/pottery/earth-02-longpi-black.jpg',
  gorakhpur: 'assets/images/craft-studios/pottery/earth-03-gorakhpur-terracotta.jpg',
  khavda: 'assets/images/craft-studios/pottery/earth-04-khavda-mud.jpg',
  alwar: 'assets/images/craft-studios/pottery/earth-05-alwar-kagzi.jpg',
  pokhran: 'assets/images/craft-studios/pottery/earth-06-pokhran-handi.jpg',
  pieces: {
    vase: 'assets/images/craft-studios/pottery/piece-01-vase.jpg',
    handi: 'assets/images/craft-studios/pottery/piece-02-handi.jpg',
    teapot: 'assets/images/craft-studios/pottery/piece-03-teapot.jpg',
    kulhads: 'assets/images/craft-studios/pottery/piece-04-kulhads.jpg',
    diffuser: 'assets/images/craft-studios/pottery/piece-05-diffuser.jpg',
    trivet: 'assets/images/craft-studios/pottery/piece-06-trivet.jpg'
  }
};

export const POTTERY_ARCHIVE_CATEGORIES: CraftArchiveCategory[] = [
  {
    id: 'jaipur-blue-pottery',
    name: 'Jaipur Blue Pottery',
    subName: 'Quartz & Cobalt Glaze',
    region: 'Sanganer, Rajasthan',
    colorName: 'Royal Cobalt & Turquoise',
    accent: '#18426B',
    textColor: '#FFFFFF',
    image: POTTERY_ASSETS.jaipur,
    price: 2400,
    note: 'World-famous GI-tagged Egyptian paste pottery made from ground quartz stone, Fuller’s earth, and copper oxide glaze.',
    tag: 'GI Tagged · Quartz Stone'
  },
  {
    id: 'longpi-black-stone',
    name: 'Longpi Black Stone',
    subName: 'Serpentine & Weathered Cane',
    region: 'Ukhrul, Manipur',
    colorName: 'Matte Charcoal Black',
    accent: '#262626',
    textColor: '#FFFFFF',
    image: POTTERY_ASSETS.longpi,
    price: 1850,
    note: 'Ancient Tangkhul Naga craft hand-shaped without a potter’s wheel using crushed black serpentinite stone and bamboo motifs.',
    tag: 'Ancient Wheel-Free Craft'
  },
  {
    id: 'gorakhpur-terracotta',
    name: 'Gorakhpur Terracotta',
    subName: 'Natural Earthen Dip Kiln Art',
    region: 'Gorakhpur, Uttar Pradesh',
    colorName: 'Burnt Ochre Terracotta',
    accent: '#8C3822',
    textColor: '#FFFFFF',
    image: POTTERY_ASSETS.gorakhpur,
    price: 1250,
    note: 'GI-tagged ceremonial terracotta horses and ornate planters with hand-pinched floral appliqués and natural soda dip kiln fire.',
    tag: 'GI Certified · ODOP'
  },
  {
    id: 'khavda-mud-pottery',
    name: 'Khavda Kutch Mud Craft',
    subName: 'White Geru Slip Painting',
    region: 'Khavda Village, Kutch, Gujarat',
    colorName: 'Sun-Baked Red Earth',
    accent: '#A84C2A',
    textColor: '#FFFFFF',
    image: POTTERY_ASSETS.khavda,
    price: 1100,
    note: 'Desert pottery shaped on a stone wheel, coated with natural red clay wash and painted with bamboo twigs using natural pigments.',
    tag: 'Desert Heritage Craft'
  },
  {
    id: 'alwar-kagzi',
    name: 'Alwar Kagzi Pottery',
    subName: 'Paper-Thin Delicate Clay',
    region: 'Alwar, Rajasthan',
    colorName: 'Warm Sandstone Bisque',
    accent: '#B88258',
    textColor: '#FFFFFF',
    image: POTTERY_ASSETS.alwar,
    price: 980,
    note: 'Renowned for its remarkable paper-thin wall thickness; porous and luminous when lit from within.',
    tag: 'Rare Artisan Heritage'
  },
  {
    id: 'pokhran-cooking-clay',
    name: 'Pokhran Fire Clay',
    subName: 'Mica-Infused Slow Cooking Pots',
    region: 'Pokhran, Thar Desert, Rajasthan',
    colorName: 'Golden Sandstone Earth',
    accent: '#7D4721',
    textColor: '#FFFFFF',
    image: POTTERY_ASSETS.pokhran,
    price: 950,
    note: 'Rich in natural silica and mica minerals, providing unmatched heat retention for slow simmering curries and daals.',
    tag: '100% Lead-Free Cookware'
  }
];

export const POTTERY_ENSEMBLES: CraftEnsemble[] = [
  {
    id: 'pottery-look-01',
    index: 1,
    name: 'The Earth & Hearth Sanctuary',
    title: 'Living Earth Kitchen & Table Ensemble',
    subtitle: 'Hand-thrown blue pottery and unglazed terracotta for sustainable home dining',
    category: 'Studio Hearth Set',
    image: POTTERY_ASSETS.hero,
    description: 'An authentic curation of India’s most revered pottery forms, combining functional cookware with artisanal statement table decor.',
    totalPrice: 6750,
    bundlePrice: 5700,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Rajasthan & Manipur Heritage',
    tastingOrCraftNote: 'Hand-thrown quartz paste and riverbed clay fired at 1100°C',
    pieces: [
      {
        id: 'pp-1',
        type: 'Vase',
        name: 'Royal Jaipur Blue Pottery Centerpiece Vase',
        price: 2400,
        image: POTTERY_ASSETS.pieces.vase,
        brand: 'JAIPUR GUILD'
      },
      {
        id: 'pp-2',
        type: 'Handi',
        name: 'Unglazed Terracotta Cooking Handi with Lid',
        price: 950,
        image: POTTERY_ASSETS.pieces.handi,
        brand: 'POKHRAN CLAY'
      },
      {
        id: 'pp-3',
        type: 'Teapot',
        name: 'Longpi Black Stone Kettle with Cane Handle',
        price: 1850,
        image: POTTERY_ASSETS.pieces.teapot,
        brand: 'UKHRUL NAGA'
      },
      {
        id: 'pp-4',
        type: 'Kulhads',
        name: 'Set of 4 Rustic Clay Chai Kulhads',
        price: 420,
        image: POTTERY_ASSETS.pieces.kulhads,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'pp-5',
        type: 'Diffuser',
        name: 'Carved Terracotta Aromatherapy Burner',
        price: 680,
        image: POTTERY_ASSETS.pieces.diffuser,
        brand: 'GORAKHPUR ART'
      },
      {
        id: 'pp-6',
        type: 'Trivet',
        name: 'Hand-Pressed Red Clay Leaf Trivet & Coasters',
        price: 450,
        image: POTTERY_ASSETS.pieces.trivet,
        brand: 'KHAVDA KUTCH'
      }
    ]
  },
  {
    id: 'pottery-look-02',
    index: 2,
    name: 'Jaipur Blue Palace Niche',
    title: 'Cobalt & Turquoise Table Edit',
    subtitle: 'Geometric Persian floral motifs painted with fine squirrel-hair brushes',
    category: 'Blue Pottery Edit',
    image: POTTERY_ASSETS.jaipur,
    description: 'Made strictly from quartz stone, glass powder, and Multani mitti. Hand-painted with natural copper sulphate turquoise and cobalt oxide blues.',
    totalPrice: 6500,
    bundlePrice: 5500,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Sanganer, Jaipur',
    tastingOrCraftNote: 'Semi-translucent quartz ceramic with delicate crazing glaze',
    pieces: [
      {
        id: 'pp-21',
        type: 'Vase',
        name: 'Royal Jaipur Blue Pottery Centerpiece Vase',
        price: 2400,
        image: POTTERY_ASSETS.jaipur,
        brand: 'JAIPUR GUILD'
      },
      {
        id: 'pp-22',
        type: 'Handi',
        name: 'Unglazed Terracotta Cooking Handi with Lid',
        price: 950,
        image: POTTERY_ASSETS.pieces.handi,
        brand: 'POKHRAN CLAY'
      },
      {
        id: 'pp-23',
        type: 'Teapot',
        name: 'Longpi Black Stone Kettle with Cane Handle',
        price: 1850,
        image: POTTERY_ASSETS.pieces.teapot,
        brand: 'UKHRUL NAGA'
      },
      {
        id: 'pp-24',
        type: 'Kulhads',
        name: 'Set of 4 Rustic Clay Chai Kulhads',
        price: 420,
        image: POTTERY_ASSETS.pieces.kulhads,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'pp-25',
        type: 'Diffuser',
        name: 'Carved Terracotta Aromatherapy Burner',
        price: 680,
        image: POTTERY_ASSETS.pieces.diffuser,
        brand: 'GORAKHPUR ART'
      },
      {
        id: 'pp-26',
        type: 'Trivet',
        name: 'Hand-Pressed Red Clay Leaf Trivet & Coasters',
        price: 450,
        image: POTTERY_ASSETS.pieces.trivet,
        brand: 'KHAVDA KUTCH'
      }
    ]
  },
  {
    id: 'pottery-look-03',
    index: 3,
    name: 'Longpi Black Stone Ceremony',
    title: 'Tangkhul Naga Stonecraft Set',
    subtitle: 'Zero artificial chemicals, hand-rubbed with wild Machi leaves',
    category: 'Black Stonecraft',
    image: POTTERY_ASSETS.longpi,
    description: 'Black stone cookware can be used directly on open gas stoves or wood fire, imparting natural alkaline minerals into tea and broths.',
    totalPrice: 6200,
    bundlePrice: 5250,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Ukhrul, Manipur',
    tastingOrCraftNote: 'Naturally black serpentine rock with organic polished finish',
    pieces: [
      {
        id: 'pp-31',
        type: 'Teapot',
        name: 'Longpi Black Stone Kettle with Cane Handle',
        price: 1850,
        image: POTTERY_ASSETS.longpi,
        brand: 'UKHRUL NAGA'
      },
      {
        id: 'pp-32',
        type: 'Vase',
        name: 'Royal Jaipur Blue Pottery Centerpiece Vase',
        price: 2400,
        image: POTTERY_ASSETS.pieces.vase,
        brand: 'JAIPUR GUILD'
      },
      {
        id: 'pp-33',
        type: 'Handi',
        name: 'Unglazed Terracotta Cooking Handi with Lid',
        price: 950,
        image: POTTERY_ASSETS.pieces.handi,
        brand: 'POKHRAN CLAY'
      },
      {
        id: 'pp-34',
        type: 'Kulhads',
        name: 'Set of 4 Rustic Clay Chai Kulhads',
        price: 420,
        image: POTTERY_ASSETS.pieces.kulhads,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'pp-35',
        type: 'Diffuser',
        name: 'Carved Terracotta Aromatherapy Burner',
        price: 680,
        image: POTTERY_ASSETS.pieces.diffuser,
        brand: 'GORAKHPUR ART'
      },
      {
        id: 'pp-36',
        type: 'Trivet',
        name: 'Hand-Pressed Red Clay Leaf Trivet & Coasters',
        price: 450,
        image: POTTERY_ASSETS.pieces.trivet,
        brand: 'KHAVDA KUTCH'
      }
    ]
  },
  {
    id: 'pottery-look-04',
    index: 4,
    name: 'Gorakhpur Earthen Heritage',
    title: 'GI-Tagged Terracotta Artistry',
    subtitle: 'Ceremonial red clay hand-adorned with traditional pinch craft',
    category: 'Terracotta Heritage',
    image: POTTERY_ASSETS.gorakhpur,
    description: 'Generations of master potters in Gorakhpur craft these distinctive clay vessels using local pond clay dipped in natural mineral baths.',
    totalPrice: 5900,
    bundlePrice: 5000,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Gorakhpur, UP',
    tastingOrCraftNote: 'Porous riverbed clay, warm terracotta earth tones',
    pieces: [
      {
        id: 'pp-41',
        type: 'Diffuser',
        name: 'Carved Terracotta Aromatherapy Burner',
        price: 680,
        image: POTTERY_ASSETS.gorakhpur,
        brand: 'GORAKHPUR ART'
      },
      {
        id: 'pp-42',
        type: 'Vase',
        name: 'Royal Jaipur Blue Pottery Centerpiece Vase',
        price: 2400,
        image: POTTERY_ASSETS.pieces.vase,
        brand: 'JAIPUR GUILD'
      },
      {
        id: 'pp-43',
        type: 'Handi',
        name: 'Unglazed Terracotta Cooking Handi with Lid',
        price: 950,
        image: POTTERY_ASSETS.pieces.handi,
        brand: 'POKHRAN CLAY'
      },
      {
        id: 'pp-44',
        type: 'Teapot',
        name: 'Longpi Black Stone Kettle with Cane Handle',
        price: 1850,
        image: POTTERY_ASSETS.pieces.teapot,
        brand: 'UKHRUL NAGA'
      },
      {
        id: 'pp-45',
        type: 'Kulhads',
        name: 'Set of 4 Rustic Clay Chai Kulhads',
        price: 420,
        image: POTTERY_ASSETS.pieces.kulhads,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'pp-46',
        type: 'Trivet',
        name: 'Hand-Pressed Red Clay Leaf Trivet & Coasters',
        price: 450,
        image: POTTERY_ASSETS.pieces.trivet,
        brand: 'KHAVDA KUTCH'
      }
    ]
  },
  {
    id: 'pottery-look-05',
    index: 5,
    name: 'Khavda Kutch Mudroom Setting',
    title: 'Desert Earth Painted Pottery',
    subtitle: 'Hand-shaped on wooden wheels with red geru clay slip',
    category: 'Kutch Folk Pottery',
    image: POTTERY_ASSETS.khavda,
    description: 'Women artisans paint each pot freehand using crushed bamboo brushes with black and white mineral stones gathered from the Rann of Kutch.',
    totalPrice: 5800,
    bundlePrice: 4900,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Khavda, Kutch',
    tastingOrCraftNote: 'Sun-dried desert clay with unglazed porous breathing texture',
    pieces: [
      {
        id: 'pp-51',
        type: 'Trivet',
        name: 'Hand-Pressed Red Clay Leaf Trivet & Coasters',
        price: 450,
        image: POTTERY_ASSETS.khavda,
        brand: 'KHAVDA KUTCH'
      },
      {
        id: 'pp-52',
        type: 'Vase',
        name: 'Royal Jaipur Blue Pottery Centerpiece Vase',
        price: 2400,
        image: POTTERY_ASSETS.pieces.vase,
        brand: 'JAIPUR GUILD'
      },
      {
        id: 'pp-53',
        type: 'Handi',
        name: 'Unglazed Terracotta Cooking Handi with Lid',
        price: 950,
        image: POTTERY_ASSETS.pieces.handi,
        brand: 'POKHRAN CLAY'
      },
      {
        id: 'pp-54',
        type: 'Teapot',
        name: 'Longpi Black Stone Kettle with Cane Handle',
        price: 1850,
        image: POTTERY_ASSETS.pieces.teapot,
        brand: 'UKHRUL NAGA'
      },
      {
        id: 'pp-55',
        type: 'Kulhads',
        name: 'Set of 4 Rustic Clay Chai Kulhads',
        price: 420,
        image: POTTERY_ASSETS.pieces.kulhads,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'pp-56',
        type: 'Diffuser',
        name: 'Carved Terracotta Aromatherapy Burner',
        price: 680,
        image: POTTERY_ASSETS.pieces.diffuser,
        brand: 'GORAKHPUR ART'
      }
    ]
  },
  {
    id: 'pottery-look-06',
    index: 6,
    name: 'Alwar Paper-Clay Chamber',
    title: 'Kagzi Ultra-Delicate Pottery',
    subtitle: 'Translucent terracotta crafted with microscopic clay fineness',
    category: 'Kagzi Pottery',
    image: POTTERY_ASSETS.alwar,
    description: 'Requires utmost dexterity on the wheel; only a handful of master potters possess the mastery to spin clay to mere millimeters.',
    totalPrice: 6100,
    bundlePrice: 5150,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Alwar, Rajasthan',
    tastingOrCraftNote: 'Featherlight porous clay wall with warm ambient glow',
    pieces: [
      {
        id: 'pp-61',
        type: 'Vase',
        name: 'Alwar Kagzi Fluted Amber Clay Lamp',
        price: 980,
        image: POTTERY_ASSETS.alwar,
        brand: 'ALWAR GUILD'
      },
      {
        id: 'pp-62',
        type: 'Vase',
        name: 'Royal Jaipur Blue Pottery Centerpiece Vase',
        price: 2400,
        image: POTTERY_ASSETS.pieces.vase,
        brand: 'JAIPUR GUILD'
      },
      {
        id: 'pp-63',
        type: 'Handi',
        name: 'Unglazed Terracotta Cooking Handi with Lid',
        price: 950,
        image: POTTERY_ASSETS.pieces.handi,
        brand: 'POKHRAN CLAY'
      },
      {
        id: 'pp-64',
        type: 'Teapot',
        name: 'Longpi Black Stone Kettle with Cane Handle',
        price: 1850,
        image: POTTERY_ASSETS.pieces.teapot,
        brand: 'UKHRUL NAGA'
      },
      {
        id: 'pp-65',
        type: 'Kulhads',
        name: 'Set of 4 Rustic Clay Chai Kulhads',
        price: 420,
        image: POTTERY_ASSETS.pieces.kulhads,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'pp-66',
        type: 'Diffuser',
        name: 'Carved Terracotta Aromatherapy Burner',
        price: 680,
        image: POTTERY_ASSETS.pieces.diffuser,
        brand: 'GORAKHPUR ART'
      }
    ]
  },
  {
    id: 'pottery-look-07',
    index: 7,
    name: 'Pokhran Fire Clay Hearth',
    title: 'Thar Desert Handcrafted Cookware',
    subtitle: 'Clay cured with buttermilk and mustard oil for lifetime durability',
    category: 'Artisanal Cookware',
    image: POTTERY_ASSETS.pokhran,
    description: 'Cook slow biryanis and dal tadka in pure earthenware that enhances natural flavor while preserving 100% of the food’s micro-nutrients.',
    totalPrice: 5750,
    bundlePrice: 4850,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Pokhran, Rajasthan',
    tastingOrCraftNote: 'Dense mica-bearing clay, flame-tempered natural earthen seal',
    pieces: [
      {
        id: 'pp-71',
        type: 'Handi',
        name: 'Unglazed Terracotta Cooking Handi with Lid',
        price: 950,
        image: POTTERY_ASSETS.pokhran,
        brand: 'POKHRAN CLAY'
      },
      {
        id: 'pp-72',
        type: 'Vase',
        name: 'Royal Jaipur Blue Pottery Centerpiece Vase',
        price: 2400,
        image: POTTERY_ASSETS.pieces.vase,
        brand: 'JAIPUR GUILD'
      },
      {
        id: 'pp-73',
        type: 'Teapot',
        name: 'Longpi Black Stone Kettle with Cane Handle',
        price: 1850,
        image: POTTERY_ASSETS.pieces.teapot,
        brand: 'UKHRUL NAGA'
      },
      {
        id: 'pp-74',
        type: 'Kulhads',
        name: 'Set of 4 Rustic Clay Chai Kulhads',
        price: 420,
        image: POTTERY_ASSETS.pieces.kulhads,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'pp-75',
        type: 'Diffuser',
        name: 'Carved Terracotta Aromatherapy Burner',
        price: 680,
        image: POTTERY_ASSETS.pieces.diffuser,
        brand: 'GORAKHPUR ART'
      },
      {
        id: 'pp-76',
        type: 'Trivet',
        name: 'Hand-Pressed Red Clay Leaf Trivet & Coasters',
        price: 450,
        image: POTTERY_ASSETS.pieces.trivet,
        brand: 'KHAVDA KUTCH'
      }
    ]
  },
  {
    id: 'pottery-look-08',
    index: 8,
    name: 'Kumbh Master Studio Edit',
    title: 'The Master Potter Signature Suite',
    subtitle: 'The complete museum-grade set across Jaipur quartz and Manipur stone',
    category: 'Master Collection',
    image: POTTERY_ASSETS.hero,
    description: 'Curated by national award-winning potters, this ensemble unites ancient Indian earthcraft traditions with timeless modern luxury living.',
    totalPrice: 6900,
    bundlePrice: 5800,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'National Master Potter Atelier',
    tastingOrCraftNote: 'Double kiln-fired, zero chemical enamels, museum-grade authenticity',
    pieces: [
      {
        id: 'pp-81',
        type: 'Vase',
        name: 'Royal Jaipur Blue Pottery Centerpiece Vase',
        price: 2400,
        image: POTTERY_ASSETS.hero,
        brand: 'JAIPUR GUILD'
      },
      {
        id: 'pp-82',
        type: 'Handi',
        name: 'Unglazed Terracotta Cooking Handi with Lid',
        price: 950,
        image: POTTERY_ASSETS.pieces.handi,
        brand: 'POKHRAN CLAY'
      },
      {
        id: 'pp-83',
        type: 'Teapot',
        name: 'Longpi Black Stone Kettle with Cane Handle',
        price: 1850,
        image: POTTERY_ASSETS.pieces.teapot,
        brand: 'UKHRUL NAGA'
      },
      {
        id: 'pp-84',
        type: 'Kulhads',
        name: 'Set of 4 Rustic Clay Chai Kulhads',
        price: 420,
        image: POTTERY_ASSETS.pieces.kulhads,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'pp-85',
        type: 'Diffuser',
        name: 'Carved Terracotta Aromatherapy Burner',
        price: 680,
        image: POTTERY_ASSETS.pieces.diffuser,
        brand: 'GORAKHPUR ART'
      },
      {
        id: 'pp-86',
        type: 'Trivet',
        name: 'Hand-Pressed Red Clay Leaf Trivet & Coasters',
        price: 450,
        image: POTTERY_ASSETS.pieces.trivet,
        brand: 'KHAVDA KUTCH'
      }
    ]
  }
];

export const POTTERY_PICK_VARIETIES = [
  { id: 'pick-p-1', title: 'JAIPUR BLUE', subtitle: 'Quartz Stone & Cobalt Glaze', price: 2400, image: POTTERY_ASSETS.jaipur, bg: '#102A43' },
  { id: 'pick-p-2', title: 'LONGPI BLACK', subtitle: 'Manipur Serpentinite Stone', price: 1850, image: POTTERY_ASSETS.longpi, bg: '#1F1F1F' },
  { id: 'pick-p-3', title: 'GORAKHPUR', subtitle: 'Pond Clay Terracotta Art', price: 1250, image: POTTERY_ASSETS.gorakhpur, bg: '#5C2214' },
  { id: 'pick-p-4', title: 'KHAVDA MUD', subtitle: 'Kutch Folk Red Geru Slip', price: 1100, image: POTTERY_ASSETS.khavda, bg: '#6B311B' },
  { id: 'pick-p-5', title: 'POKHRAN CLAY', subtitle: 'Desert Slow Cookware Handi', price: 950, image: POTTERY_ASSETS.pokhran, bg: '#4A2B13' }
];

export const POTTERY_SHELF_FILTERS: CraftShelfFilter[] = [
  { id: 'all', label: 'All Wares', count: 14 },
  { id: 'blue-pottery', label: 'Jaipur Blue', count: 4 },
  { id: 'black-stone', label: 'Longpi Stone', count: 3 },
  { id: 'cookware', label: 'Clay Cookware', count: 4 },
  { id: 'decor', label: 'Home Accents', count: 3 }
];

export const POTTERY_SHELF_ITEMS: CraftShelfItem[] = [
  {
    id: 'ps-1',
    name: 'Jaipur Blue Pottery Fluted Peacock Vase 12"',
    price: 2400,
    category: 'blue-pottery',
    categoryType: 'Studio Vase',
    categoryLabel: 'Jaipur Blue',
    image: POTTERY_ASSETS.jaipur,
    description: 'Handcrafted using quartz powder and glass flux, freehand painted with traditional Mughal foliage and peacock motifs.',
    origin: 'Sanganer, Jaipur, Rajasthan',
    artisanCluster: 'Shilp Gram Blue Pottery Guild',
    specs: [
      { label: 'Material', value: 'Quartz Stone, Multani Clay & Glass' },
      { label: 'Firing Temp', value: '850°C Kiln Fired' },
      { label: 'Finish', value: 'Lead-Free Copper Glaze' },
      { label: 'GI Status', value: 'GI Registered Certificate' }
    ]
  },
  {
    id: 'ps-2',
    name: 'Longpi Black Stone Fire Kettle 1.2L',
    price: 1850,
    category: 'black-stone',
    categoryType: 'Teaware',
    categoryLabel: 'Longpi Stone',
    image: POTTERY_ASSETS.longpi,
    description: 'Carved and shaped by hand from black serpentine rock and weathered clay. Can be placed directly over gas flames or hot coals.',
    origin: 'Ukhrul, Manipur',
    artisanCluster: 'Tangkhul Naga Potters Association',
    specs: [
      { label: 'Heat Proof', value: 'Direct Flame Safe' },
      { label: 'Handle', value: 'Natural Cane / Bamboo Woven' },
      { label: 'Glaze', value: '100% Raw Eco Leaf Polish' },
      { label: 'Mineral Leaching', value: 'Natural Iron & Magnesium' }
    ]
  },
  {
    id: 'ps-3',
    name: 'Unglazed Terracotta Biryani Handi with Lid 2L',
    price: 950,
    category: 'cookware',
    categoryType: 'Earthen Cookware',
    categoryLabel: 'Clay Cookware',
    image: POTTERY_ASSETS.pokhran,
    description: 'Slow-cooking clay handi with deep steam-seal lid. Food cooks in its own natural moisture, intensifying delicate spices and aroma.',
    origin: 'Pokhran, Rajasthan',
    artisanCluster: 'Marwar Kumbhar Samaj',
    specs: [
      { label: 'Capacity', value: '2.0 Litres' },
      { label: 'Alkalinity', value: 'pH 8.5 (Neutralizes Acidity)' },
      { label: 'Curing', value: 'Pre-cured with Mustard Oil' },
      { label: 'Cleaning', value: 'Warm Water / No Detergent' }
    ]
  },
  {
    id: 'ps-4',
    name: 'Set of 6 Mitti Kulhad Cups with Saucers',
    price: 590,
    category: 'cookware',
    categoryType: 'Drinkware',
    categoryLabel: 'Clay Cookware',
    image: POTTERY_ASSETS.pieces.kulhads,
    description: 'Artisanal reusable chai kulhads giving your morning tea the unforgettable fragrance of wet earth (sondhi khushboo).',
    origin: 'Varanasi, Uttar Pradesh',
    artisanCluster: 'Ganga Ghat Mitti Artisans',
    specs: [
      { label: 'Set Includes', value: '6 Cups + 6 Clay Saucers' },
      { label: 'Clay Type', value: 'Riverbed Gangetic Silt' },
      { label: 'Finish', value: 'Unglazed Fire-Kissed' },
      { label: 'Food Grade', value: 'Certified Non-Toxic' }
    ]
  }
];

export const POTTERY_REELS: CraftReel[] = [
  {
    id: 'reel-p-1',
    reelNumber: 'REEL 01',
    duration: '0:42',
    craftType: 'WHEEL SPIN',
    title: 'Centering River Clay in Sanganer',
    location: 'Jaipur, Rajasthan',
    posterImage: POTTERY_ASSETS.jaipur,
    price: 2400,
    handle: '@jaipurpottery',
    soundTrack: 'Potter’s Wheel Rhythms & Desert Sarangi',
    artisanStory: 'Master craftsman Ramnarayan shapes raw quartz dough on a high-speed flywheel, sculpting symmetric curves with gentle palm pressure.'
  },
  {
    id: 'reel-p-2',
    reelNumber: 'REEL 02',
    duration: '0:35',
    craftType: 'STONE POLISH',
    title: 'The Leaf Polish of Longpi Naga Hills',
    location: 'Ukhrul, Manipur',
    posterImage: POTTERY_ASSETS.longpi,
    price: 1850,
    handle: '@longpi_earth',
    soundTrack: 'Highland Wind & Tribal Lute',
    artisanStory: 'Fresh from the wood kiln, red-hot black pots are hand-buffed with wet wild Machi leaves, producing an extraordinary lustrous stone patina.'
  }
];

/* ==================================================================== */
/* 3. COCONUT SHELL CRAFT STUDIO DATA                                   */
/* ==================================================================== */
export const COCONUT_ASSETS = {
  hero: 'assets/images/craft-studios/coconut/handcrafted_coconut_shell_hero.jpg',
  bowl: 'assets/images/craft-studios/coconut/crop_coconut_snack_bowls.jpg',
  lantern: 'assets/images/craft-studios/coconut/coastal-02-lantern.jpg',
  chalice: 'assets/images/craft-studios/coconut/coastal-03-chalice.jpg',
  cutlery: 'assets/images/craft-studios/coconut/crop_coconut_bowl_spoon.jpg',
  planter: 'assets/images/craft-studios/coconut/coastal-05-planter.jpg',
  candle: 'assets/images/craft-studios/coconut/coastal-06-candle.jpg',
  pieces: {
    bowl: 'assets/images/craft-studios/coconut/piece-01-bowl.jpg',
    cutlery: 'assets/images/craft-studios/coconut/piece-02-cutlery.jpg',
    candle: 'assets/images/craft-studios/coconut/piece-03-candle.jpg',
    cup: 'assets/images/craft-studios/coconut/piece-04-cup.jpg',
    lantern: 'assets/images/craft-studios/coconut/piece-05-lantern.jpg',
    planter: 'assets/images/craft-studios/coconut/piece-06-planter.jpg'
  }
};

export const COCONUT_ARCHIVE_CATEGORIES: CraftArchiveCategory[] = [
  {
    id: 'smoothie-bowls',
    name: 'Polished Coconut Bowls',
    subName: 'Zero-Waste Organic Dining',
    region: 'Kottayam, Kerala',
    colorName: 'Rich Teak Husk Brown',
    accent: '#472411',
    textColor: '#FFFFFF',
    image: COCONUT_ASSETS.bowl,
    price: 480,
    note: 'Hand-buffed reclaimed coconut shells conditioned with cold-pressed virgin coconut oil; 100% biodegradable.',
    tag: 'Upcycled Organic Dining'
  },
  {
    id: 'jaali-lanterns',
    name: 'Carved Jaali Lanterns',
    subName: 'Geometric Pierced Tea Light Holders',
    region: 'Alappuzha, Kerala',
    colorName: 'Warm Amber Filament Glow',
    accent: '#8C4D1D',
    textColor: '#FFFFFF',
    image: COCONUT_ASSETS.lantern,
    price: 580,
    note: 'Master craftsmen chisel intricate lattice jaali cutouts into dense mature coconut shells, casting enchanting light patterns.',
    tag: 'Hand-Chiseled Jaali'
  },
  {
    id: 'brass-rim-chalice',
    name: 'Brass-Inlay Chalices',
    subName: 'Hand-Beaten Gold Brass Trim',
    region: 'Mannar, Kerala',
    colorName: 'Antique Brass & Dark Husk',
    accent: '#6E4513',
    textColor: '#FFFFFF',
    image: COCONUT_ASSETS.chalice,
    price: 750,
    note: 'Fusion of Kerala coconut shell turning with royal Mannar bell-metal brass inlay for regal artisan tableware.',
    tag: 'Brass & Shell Fusion'
  },
  {
    id: 'palm-wood-cutlery',
    name: 'Palm Wood Dining Set',
    subName: 'Spoons, Forks & Butter Knives',
    region: 'Thrissur, Kerala',
    colorName: 'Striped Natural Grain',
    accent: '#54331C',
    textColor: '#FFFFFF',
    image: COCONUT_ASSETS.cutlery,
    price: 320,
    note: 'Carved from naturally fallen senile coconut palm wood; incredibly dense, water-resistant, and gentle on cookware.',
    tag: '100% Plastic-Free'
  },
  {
    id: 'hanging-planters',
    name: 'Hanging Shell Planters',
    subName: 'Hand-Knotted Natural Jute Macrame',
    region: 'Goa Coastal Belt',
    colorName: 'Botanical Sand Husk',
    accent: '#264D3B',
    textColor: '#FFFFFF',
    image: COCONUT_ASSETS.planter,
    price: 490,
    note: 'Half-shell planters with drainage holes, cradled in braided golden jute macrame cords for trailing indoor greens.',
    tag: 'Eco Home Sanctuary'
  },
  {
    id: 'coconut-soy-candle',
    name: 'Coconut Shell Soy Candle',
    subName: 'Wood-Wick Essential Oil Aromatherapy',
    region: 'Kochi, Kerala',
    colorName: 'Vanilla & Spiced Cinnamon',
    accent: '#7D5326',
    textColor: '#FFFFFF',
    image: COCONUT_ASSETS.candle,
    price: 650,
    note: 'Poured with 100% natural coconut soy wax and crackling cedarwood wicks inside smoothed natural coconut shells.',
    tag: 'Clean Burning Aromatherapy'
  }
];

export const COCONUT_ENSEMBLES: CraftEnsemble[] = [
  {
    id: 'coco-look-01',
    index: 1,
    name: 'The Tropical Sustainable Living Set',
    title: 'Zero-Waste Coastal Table Collection',
    subtitle: 'Reclaimed coconut shells transformed into modern heirloom dining and living wares',
    category: 'Coastal Living Set',
    image: COCONUT_ASSETS.hero,
    description: 'Each piece is hand-carved, sanded through eight grades of grain, and polished solely with edible organic coconut oil.',
    totalPrice: 3270,
    bundlePrice: 2750,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Kerala Coastal Artisan Guild',
    tastingOrCraftNote: 'Upcycled mature coconut shells, zero toxic chemical varnishes',
    pieces: [
      {
        id: 'cp-1',
        type: 'Bowl',
        name: 'Jumbo Hand-Buffed Coconut Smoothie Bowl',
        price: 480,
        image: COCONUT_ASSETS.pieces.bowl,
        brand: 'THENGA CRAFT'
      },
      {
        id: 'cp-2',
        type: 'Cutlery',
        name: 'Reclaimed Coconut Palm Wood Spoon & Fork Pair',
        price: 320,
        image: COCONUT_ASSETS.pieces.cutlery,
        brand: 'ECO PALM'
      },
      {
        id: 'cp-3',
        type: 'Candle',
        name: 'Coconut Wax Scented Candle in Carved Shell',
        price: 650,
        image: COCONUT_ASSETS.pieces.candle,
        brand: 'MALABAR SCENTS'
      },
      {
        id: 'cp-4',
        type: 'Cup',
        name: 'Hand-Beaten Brass-Lined Coconut Espresso Tumbler',
        price: 750,
        image: COCONUT_ASSETS.pieces.cup,
        brand: 'MANNAR FUSION'
      },
      {
        id: 'cp-5',
        type: 'Lantern',
        name: 'Pierced Star Jaali Coconut Tea Light Lantern',
        price: 580,
        image: COCONUT_ASSETS.pieces.lantern,
        brand: 'KOTTAYAM CRAFT'
      },
      {
        id: 'cp-6',
        type: 'Planter',
        name: 'Hanging Coconut Succulent Planter with Jute Cord',
        price: 490,
        image: COCONUT_ASSETS.pieces.planter,
        brand: 'COASTAL GREEN'
      }
    ]
  },
  {
    id: 'coco-look-02',
    index: 2,
    name: 'Malabar Sunrise Breakfast Suite',
    title: 'Organic Acai & Granola Serving Set',
    subtitle: 'Twin coconut shell smoothie bowls with hand-carved palm wood spoons',
    category: 'Breakfast Suite',
    image: COCONUT_ASSETS.bowl,
    description: 'Perfect for morning fruit bowls, oatmeal, and chilled desserts. Naturally insulating shell keeps food refreshingly cold.',
    totalPrice: 3100,
    bundlePrice: 2600,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Kottayam, Kerala',
    tastingOrCraftNote: 'Naturally water-repellent shell with silky coconut oil sheen',
    pieces: [
      {
        id: 'cp-21',
        type: 'Bowl',
        name: 'Jumbo Hand-Buffed Coconut Smoothie Bowl',
        price: 480,
        image: COCONUT_ASSETS.bowl,
        brand: 'THENGA CRAFT'
      },
      {
        id: 'cp-22',
        type: 'Cutlery',
        name: 'Reclaimed Coconut Palm Wood Spoon & Fork Pair',
        price: 320,
        image: COCONUT_ASSETS.pieces.cutlery,
        brand: 'ECO PALM'
      },
      {
        id: 'cp-23',
        type: 'Candle',
        name: 'Coconut Wax Scented Candle in Carved Shell',
        price: 650,
        image: COCONUT_ASSETS.pieces.candle,
        brand: 'MALABAR SCENTS'
      },
      {
        id: 'cp-24',
        type: 'Cup',
        name: 'Hand-Beaten Brass-Lined Coconut Espresso Tumbler',
        price: 750,
        image: COCONUT_ASSETS.pieces.cup,
        brand: 'MANNAR FUSION'
      },
      {
        id: 'cp-25',
        type: 'Lantern',
        name: 'Pierced Star Jaali Coconut Tea Light Lantern',
        price: 580,
        image: COCONUT_ASSETS.pieces.lantern,
        brand: 'KOTTAYAM CRAFT'
      },
      {
        id: 'cp-26',
        type: 'Planter',
        name: 'Hanging Coconut Succulent Planter with Jute Cord',
        price: 490,
        image: COCONUT_ASSETS.pieces.planter,
        brand: 'COASTAL GREEN'
      }
    ]
  },
  {
    id: 'coco-look-03',
    index: 3,
    name: 'Alappuzha Glow Lantern Edit',
    title: 'Warm Ambient Candle & Lantern Suite',
    subtitle: 'Intricate pierced filigree casting hypnotic shadow dances across walls',
    category: 'Lantern Edit',
    image: COCONUT_ASSETS.lantern,
    description: 'Chiseled by hand with specialized micro-gauges. The natural curved geometry of the coconut amplifies the warm candle luminescence.',
    totalPrice: 3350,
    bundlePrice: 2820,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Alappuzha Backwaters',
    tastingOrCraftNote: 'Hardened mature shell with micro-perforated star constellation jaali',
    pieces: [
      {
        id: 'cp-31',
        type: 'Lantern',
        name: 'Pierced Star Jaali Coconut Tea Light Lantern',
        price: 580,
        image: COCONUT_ASSETS.lantern,
        brand: 'KOTTAYAM CRAFT'
      },
      {
        id: 'cp-32',
        type: 'Bowl',
        name: 'Jumbo Hand-Buffed Coconut Smoothie Bowl',
        price: 480,
        image: COCONUT_ASSETS.pieces.bowl,
        brand: 'THENGA CRAFT'
      },
      {
        id: 'cp-33',
        type: 'Cutlery',
        name: 'Reclaimed Coconut Palm Wood Spoon & Fork Pair',
        price: 320,
        image: COCONUT_ASSETS.pieces.cutlery,
        brand: 'ECO PALM'
      },
      {
        id: 'cp-34',
        type: 'Candle',
        name: 'Coconut Wax Scented Candle in Carved Shell',
        price: 650,
        image: COCONUT_ASSETS.pieces.candle,
        brand: 'MALABAR SCENTS'
      },
      {
        id: 'cp-35',
        type: 'Cup',
        name: 'Hand-Beaten Brass-Lined Coconut Espresso Tumbler',
        price: 750,
        image: COCONUT_ASSETS.pieces.cup,
        brand: 'MANNAR FUSION'
      },
      {
        id: 'cp-36',
        type: 'Planter',
        name: 'Hanging Coconut Succulent Planter with Jute Cord',
        price: 490,
        image: COCONUT_ASSETS.pieces.planter,
        brand: 'COASTAL GREEN'
      }
    ]
  },
  {
    id: 'coco-look-04',
    index: 4,
    name: 'Mannar Royal Brass & Husk Chalice',
    title: 'Heritage Bell-Metal Mounted Drinkware',
    subtitle: 'Beaten golden brass rim seamless bonded with polished coconut',
    category: 'Brass & Shell Luxury',
    image: COCONUT_ASSETS.chalice,
    description: 'A masterwork of two Kerala crafts: coconut shell turning and the lost-wax bell metal casting of Mannar.',
    totalPrice: 3450,
    bundlePrice: 2900,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Mannar & Kochi, Kerala',
    tastingOrCraftNote: 'Pure copper-brass lip with ergonomic warm wooden coconut stem',
    pieces: [
      {
        id: 'cp-41',
        type: 'Cup',
        name: 'Hand-Beaten Brass-Lined Coconut Espresso Tumbler',
        price: 750,
        image: COCONUT_ASSETS.chalice,
        brand: 'MANNAR FUSION'
      },
      {
        id: 'cp-42',
        type: 'Bowl',
        name: 'Jumbo Hand-Buffed Coconut Smoothie Bowl',
        price: 480,
        image: COCONUT_ASSETS.pieces.bowl,
        brand: 'THENGA CRAFT'
      },
      {
        id: 'cp-43',
        type: 'Cutlery',
        name: 'Reclaimed Coconut Palm Wood Spoon & Fork Pair',
        price: 320,
        image: COCONUT_ASSETS.pieces.cutlery,
        brand: 'ECO PALM'
      },
      {
        id: 'cp-44',
        type: 'Candle',
        name: 'Coconut Wax Scented Candle in Carved Shell',
        price: 650,
        image: COCONUT_ASSETS.pieces.candle,
        brand: 'MALABAR SCENTS'
      },
      {
        id: 'cp-45',
        type: 'Lantern',
        name: 'Pierced Star Jaali Coconut Tea Light Lantern',
        price: 580,
        image: COCONUT_ASSETS.pieces.lantern,
        brand: 'KOTTAYAM CRAFT'
      },
      {
        id: 'cp-46',
        type: 'Planter',
        name: 'Hanging Coconut Succulent Planter with Jute Cord',
        price: 490,
        image: COCONUT_ASSETS.pieces.planter,
        brand: 'COASTAL GREEN'
      }
    ]
  },
  {
    id: 'coco-look-05',
    index: 5,
    name: 'Coastal Hanging Botanical Garden',
    title: 'Suspended Coconut Shell Planter Suite',
    subtitle: 'Natural micro-climate planters with natural aeration for orchids and ferns',
    category: 'Botanical Accents',
    image: COCONUT_ASSETS.planter,
    description: 'Coconut shell is naturally rot-resistant and provides superior root thermal regulation compared to synthetic plastics.',
    totalPrice: 3200,
    bundlePrice: 2690,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Goa Coastal Hinterland',
    tastingOrCraftNote: 'Hand-knotted triple twisted natural jute with drainage plug',
    pieces: [
      {
        id: 'cp-51',
        type: 'Planter',
        name: 'Hanging Coconut Succulent Planter with Jute Cord',
        price: 490,
        image: COCONUT_ASSETS.planter,
        brand: 'COASTAL GREEN'
      },
      {
        id: 'cp-52',
        type: 'Bowl',
        name: 'Jumbo Hand-Buffed Coconut Smoothie Bowl',
        price: 480,
        image: COCONUT_ASSETS.pieces.bowl,
        brand: 'THENGA CRAFT'
      },
      {
        id: 'cp-53',
        type: 'Cutlery',
        name: 'Reclaimed Coconut Palm Wood Spoon & Fork Pair',
        price: 320,
        image: COCONUT_ASSETS.pieces.cutlery,
        brand: 'ECO PALM'
      },
      {
        id: 'cp-54',
        type: 'Candle',
        name: 'Coconut Wax Scented Candle in Carved Shell',
        price: 650,
        image: COCONUT_ASSETS.pieces.candle,
        brand: 'MALABAR SCENTS'
      },
      {
        id: 'cp-55',
        type: 'Cup',
        name: 'Hand-Beaten Brass-Lined Coconut Espresso Tumbler',
        price: 750,
        image: COCONUT_ASSETS.pieces.cup,
        brand: 'MANNAR FUSION'
      },
      {
        id: 'cp-56',
        type: 'Lantern',
        name: 'Pierced Star Jaali Coconut Tea Light Lantern',
        price: 580,
        image: COCONUT_ASSETS.pieces.lantern,
        brand: 'KOTTAYAM CRAFT'
      }
    ]
  },
  {
    id: 'coco-look-06',
    index: 6,
    name: 'Kochi Backwater Aromatherapy Candle',
    title: 'Hand-Poured Soy Coconut Candle Suite',
    subtitle: 'Wild lemongrass and cardamom essential oil infusion in natural shell',
    category: 'Artisan Candles',
    image: COCONUT_ASSETS.candle,
    description: 'Clean-burning 45-hour burn time with crackling natural wooden wick, filling your living space with soothing coastal aromatics.',
    totalPrice: 3320,
    bundlePrice: 2790,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Fort Kochi, Kerala',
    tastingOrCraftNote: 'Pure botanical soy wax, zero petroleum paraffin',
    pieces: [
      {
        id: 'cp-61',
        type: 'Candle',
        name: 'Coconut Wax Scented Candle in Carved Shell',
        price: 650,
        image: COCONUT_ASSETS.candle,
        brand: 'MALABAR SCENTS'
      },
      {
        id: 'cp-62',
        type: 'Bowl',
        name: 'Jumbo Hand-Buffed Coconut Smoothie Bowl',
        price: 480,
        image: COCONUT_ASSETS.pieces.bowl,
        brand: 'THENGA CRAFT'
      },
      {
        id: 'cp-63',
        type: 'Cutlery',
        name: 'Reclaimed Coconut Palm Wood Spoon & Fork Pair',
        price: 320,
        image: COCONUT_ASSETS.pieces.cutlery,
        brand: 'ECO PALM'
      },
      {
        id: 'cp-64',
        type: 'Cup',
        name: 'Hand-Beaten Brass-Lined Coconut Espresso Tumbler',
        price: 750,
        image: COCONUT_ASSETS.pieces.cup,
        brand: 'MANNAR FUSION'
      },
      {
        id: 'cp-65',
        type: 'Lantern',
        name: 'Pierced Star Jaali Coconut Tea Light Lantern',
        price: 580,
        image: COCONUT_ASSETS.pieces.lantern,
        brand: 'KOTTAYAM CRAFT'
      },
      {
        id: 'cp-66',
        type: 'Planter',
        name: 'Hanging Coconut Succulent Planter with Jute Cord',
        price: 490,
        image: COCONUT_ASSETS.pieces.planter,
        brand: 'COASTAL GREEN'
      }
    ]
  },
  {
    id: 'coco-look-07',
    index: 7,
    name: 'Coastal Palm Wood Dining Service',
    title: 'Artisan Palm Wood Flatware & Serving Set',
    subtitle: 'Smooth contoured salad servers, dessert spoons, and chopsticks',
    category: 'Table Cutlery',
    image: COCONUT_ASSETS.cutlery,
    description: 'Crafted from sustainable mature palm timbers that have completed their fruit-bearing cycle, supporting coastal farmers with secondary income.',
    totalPrice: 3150,
    bundlePrice: 2650,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Thrissur, Kerala',
    tastingOrCraftNote: 'Deep linear grain, non-scratch surface safe for cast iron and nonstick',
    pieces: [
      {
        id: 'cp-71',
        type: 'Cutlery',
        name: 'Reclaimed Coconut Palm Wood Spoon & Fork Pair',
        price: 320,
        image: COCONUT_ASSETS.cutlery,
        brand: 'ECO PALM'
      },
      {
        id: 'cp-72',
        type: 'Bowl',
        name: 'Jumbo Hand-Buffed Coconut Smoothie Bowl',
        price: 480,
        image: COCONUT_ASSETS.pieces.bowl,
        brand: 'THENGA CRAFT'
      },
      {
        id: 'cp-73',
        type: 'Candle',
        name: 'Coconut Wax Scented Candle in Carved Shell',
        price: 650,
        image: COCONUT_ASSETS.pieces.candle,
        brand: 'MALABAR SCENTS'
      },
      {
        id: 'cp-74',
        type: 'Cup',
        name: 'Hand-Beaten Brass-Lined Coconut Espresso Tumbler',
        price: 750,
        image: COCONUT_ASSETS.pieces.cup,
        brand: 'MANNAR FUSION'
      },
      {
        id: 'cp-75',
        type: 'Lantern',
        name: 'Pierced Star Jaali Coconut Tea Light Lantern',
        price: 580,
        image: COCONUT_ASSETS.pieces.lantern,
        brand: 'KOTTAYAM CRAFT'
      },
      {
        id: 'cp-76',
        type: 'Planter',
        name: 'Hanging Coconut Succulent Planter with Jute Cord',
        price: 490,
        image: COCONUT_ASSETS.pieces.planter,
        brand: 'COASTAL GREEN'
      }
    ]
  },
  {
    id: 'coco-look-08',
    index: 8,
    name: 'Thenga Master Coastal Sanctuary Edit',
    title: 'The Complete Zero-Waste Living Pavilion',
    subtitle: 'All six handcrafted coastal forms united in one master gift collection',
    category: 'Master Collection',
    image: COCONUT_ASSETS.hero,
    description: 'Packaged in natural woven palmyra gift boxes with artisanal botanical cards, celebrating India’s richest coastal coconut craft heritage.',
    totalPrice: 3450,
    bundlePrice: 2890,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Kerala State Certified Handicraft',
    tastingOrCraftNote: '100% natural materials, biodegradable, sustainable living award winner',
    pieces: [
      {
        id: 'cp-81',
        type: 'Bowl',
        name: 'Jumbo Hand-Buffed Coconut Smoothie Bowl',
        price: 480,
        image: COCONUT_ASSETS.hero,
        brand: 'THENGA CRAFT'
      },
      {
        id: 'cp-82',
        type: 'Cutlery',
        name: 'Reclaimed Coconut Palm Wood Spoon & Fork Pair',
        price: 320,
        image: COCONUT_ASSETS.pieces.cutlery,
        brand: 'ECO PALM'
      },
      {
        id: 'cp-83',
        type: 'Candle',
        name: 'Coconut Wax Scented Candle in Carved Shell',
        price: 650,
        image: COCONUT_ASSETS.pieces.candle,
        brand: 'MALABAR SCENTS'
      },
      {
        id: 'cp-84',
        type: 'Cup',
        name: 'Hand-Beaten Brass-Lined Coconut Espresso Tumbler',
        price: 750,
        image: COCONUT_ASSETS.pieces.cup,
        brand: 'MANNAR FUSION'
      },
      {
        id: 'cp-85',
        type: 'Lantern',
        name: 'Pierced Star Jaali Coconut Tea Light Lantern',
        price: 580,
        image: COCONUT_ASSETS.pieces.lantern,
        brand: 'KOTTAYAM CRAFT'
      },
      {
        id: 'cp-86',
        type: 'Planter',
        name: 'Hanging Coconut Succulent Planter with Jute Cord',
        price: 490,
        image: COCONUT_ASSETS.pieces.planter,
        brand: 'COASTAL GREEN'
      }
    ]
  }
];

export const COCONUT_PICK_VARIETIES = [
  { id: 'pick-c-1', title: 'SMOOTHIE BOWL', subtitle: 'Hand-Buffed Organic Shell', price: 480, image: COCONUT_ASSETS.bowl, bg: '#3D1D09' },
  { id: 'pick-c-2', title: 'JAALI LANTERN', subtitle: 'Pierced Star Constellation', price: 580, image: COCONUT_ASSETS.lantern, bg: '#703B13' },
  { id: 'pick-c-3', title: 'BRASS CHALICE', subtitle: 'Mannar Bell Metal Rim', price: 750, image: COCONUT_ASSETS.chalice, bg: '#4A2A10' },
  { id: 'pick-c-4', title: 'PALM CUTLERY', subtitle: 'Dense Reclaimed Palm Wood', price: 320, image: COCONUT_ASSETS.cutlery, bg: '#361D0C' },
  { id: 'pick-c-5', title: 'HUSK PLANTER', subtitle: 'Hand-Knotted Jute Macrame', price: 490, image: COCONUT_ASSETS.planter, bg: '#1D3B2E' }
];

export const COCONUT_SHELF_FILTERS: CraftShelfFilter[] = [
  { id: 'all', label: 'All Pieces', count: 12 },
  { id: 'dining', label: 'Bowls & Dining', count: 4 },
  { id: 'lighting', label: 'Lanterns & Lights', count: 3 },
  { id: 'drinkware', label: 'Cups & Tumblers', count: 3 },
  { id: 'planters', label: 'Eco Planters', count: 2 }
];

export const COCONUT_SHELF_ITEMS: CraftShelfItem[] = [
  {
    id: 'cs-1',
    name: 'Jumbo Hand-Buffed Coconut Smoothie Bowl 650ml',
    price: 480,
    category: 'dining',
    categoryType: 'Organic Bowl',
    categoryLabel: 'Bowls & Dining',
    image: COCONUT_ASSETS.bowl,
    description: 'Crafted from discarded mature coconut shells that would otherwise be incinerated as waste. Hand-buffed and seasoned with virgin coconut oil.',
    origin: 'Kottayam, Kerala',
    artisanCluster: 'Thenga Women Artisan Collective',
    specs: [
      { label: 'Capacity', value: '650 ml' },
      { label: 'Diameter', value: '13 - 15 cm' },
      { label: 'Conditioning', value: '100% Virgin Coconut Oil' },
      { label: 'Sustainability', value: 'Zero Plastic · Upcycled' }
    ]
  },
  {
    id: 'cs-2',
    name: 'Handcarved Pierced Jaali Tea Light Lantern',
    price: 580,
    category: 'lighting',
    categoryType: 'Artisan Lighting',
    categoryLabel: 'Lanterns & Lights',
    image: COCONUT_ASSETS.lantern,
    description: 'Delicate geometric perforated holes cast hypnotic star patterns across ambient rooms. Equipped with a stable flat teak base.',
    origin: 'Alappuzha, Kerala',
    artisanCluster: 'Backwater Shell Carvers Guild',
    specs: [
      { label: 'Cutout Technique', value: 'Hand Chiseled Filigree' },
      { label: 'Base', value: 'Salvaged Teak Wood Rim' },
      { label: 'Includes', value: '1 Organic Soy Wax Tealight' },
      { label: 'Finish', value: 'Natural Matte Husk' }
    ]
  },
  {
    id: 'cs-3',
    name: 'Mannar Brass-Inlay Coconut Coffee Tumbler 280ml',
    price: 750,
    category: 'drinkware',
    categoryType: 'Drinkware',
    categoryLabel: 'Cups & Tumblers',
    image: COCONUT_ASSETS.chalice,
    description: 'Natural coconut shell lined with hand-beaten food-safe brass. Insulates hot artisan pour-overs and filter coffees with warm wooden grip.',
    origin: 'Mannar, Kerala',
    artisanCluster: 'Mannar Bell Metal & Coconut Artisans',
    specs: [
      { label: 'Lining', value: 'Food-Grade Pure Brass' },
      { label: 'Volume', value: '280 ml' },
      { label: 'Thermal Profile', value: 'Double Wall Natural Insulation' },
      { label: 'Craft Heritage', value: 'Century-Old Heritage Fusion' }
    ]
  },
  {
    id: 'cs-4',
    name: 'Hanging Coconut Shell Planter with Jute Macrame',
    price: 490,
    category: 'planters',
    categoryType: 'Eco Planter',
    categoryLabel: 'Eco Planters',
    image: COCONUT_ASSETS.planter,
    description: 'Naturally porous coconut shell keeps plant root systems cool and breathable. Complete with 30-inch braided jute hanging cord.',
    origin: 'North Goa Coastal Belt',
    artisanCluster: 'Goan Coastal Eco-Crafters',
    specs: [
      { label: 'Hanging Cord', value: '100% Natural Braided Jute' },
      { label: 'Drainage', value: 'Pre-Drilled Water Exit' },
      { label: 'Best Suited For', value: 'Succulents, Pothos, Air Plants' },
      { label: 'Durability', value: 'Weather Resistant Outdoor/Indoor' }
    ]
  }
];

export const COCONUT_REELS: CraftReel[] = [
  {
    id: 'reel-c-1',
    reelNumber: 'REEL 01',
    duration: '0:36',
    craftType: 'SHELL BUFFING',
    title: 'The Art of Thenga Shell Sanding',
    location: 'Kottayam, Kerala',
    posterImage: COCONUT_ASSETS.bowl,
    price: 480,
    handle: '@thengacraft',
    soundTrack: 'Coastal Waves & Palm Rustle',
    artisanStory: 'Artisan Marykutty meticulously buffs raw coconut shells through eight grades of sandpaper before massaging cold-pressed virgin coconut oil into the grain.'
  },
  {
    id: 'reel-c-2',
    reelNumber: 'REEL 02',
    duration: '0:40',
    craftType: 'JAALI CHISEL',
    title: 'Chiseling Stars in Coconut Husk',
    location: 'Alappuzha, Kerala',
    posterImage: COCONUT_ASSETS.lantern,
    price: 580,
    handle: '@keralacoastal',
    soundTrack: 'Traditional Chenda Rhythms',
    artisanStory: 'Using fine hardened steel chisels, master carver Sasi creates intricate pierced geometric jaalis that turn discarded coconut shells into glowing lamps.'
  }
];


/* ==================================================================== */
/* 4. AGARBATTI & INCENSE STUDIO DATA                                   */
/* ==================================================================== */
export const AGARBATTI_ASSETS = {
  hero: 'assets/images/craft-studios/agarbatti/incense-hero.jpg',
  video: 'assets/images/Agarbatti.mp4',
  chandan: 'assets/images/craft-studios/agarbatti/aroma-01-chandan.jpg',
  rose: 'assets/images/craft-studios/agarbatti/aroma-02-rose.jpg',
  sambrani: 'assets/images/craft-studios/agarbatti/aroma-03-sambrani.jpg',
  mogra: 'assets/images/craft-studios/agarbatti/aroma-04-mogra.jpg',
  loban: 'assets/images/craft-studios/agarbatti/aroma-05-loban.jpg',
  vetiver: 'assets/images/craft-studios/agarbatti/aroma-06-vetiver.jpg',
  pieces: {
    sticks: 'assets/images/craft-studios/agarbatti/piece-01-sticks.jpg',
    burner: 'assets/images/craft-studios/agarbatti/piece-02-burner.jpg',
    dhoop: 'assets/images/craft-studios/agarbatti/piece-03-dhoop.jpg',
    camphor: 'assets/images/craft-studios/agarbatti/piece-04-camphor.jpg',
    stand: 'assets/images/craft-studios/agarbatti/piece-05-stand.jpg',
    resin: 'assets/images/craft-studios/agarbatti/piece-06-resin.jpg'
  }
};

export const AGARBATTI_ARCHIVE_CATEGORIES: CraftArchiveCategory[] = [
  {
    id: 'arch-ag-1',
    name: 'Mysore Sandalwood Pure Flora',
    subName: 'GI Certified Chandan Agarbatti',
    region: 'Mysuru, Karnataka',
    colorName: 'Warm Sandalwood Gold',
    accent: '#B8860B',
    textColor: '#FFFFFF',
    image: AGARBATTI_ASSETS.chandan,
    price: 350,
    note: 'Ground genuine Santalum album heartwood with natural jigat binder. Slow 60-minute burning bamboo-less core.',
    tag: 'Royal Mysore Heritage'
  },
  {
    id: 'arch-ag-2',
    name: 'Kannauj Damask Rose Dhoop',
    subName: 'Distilled Desi Gulab Essence',
    region: 'Kannauj, Uttar Pradesh',
    colorName: 'Rose Petal Amber',
    accent: '#8B263E',
    textColor: '#FFFFFF',
    image: AGARBATTI_ASSETS.rose,
    price: 280,
    note: 'Hand-blended with sun-dried Kannauj rose petals, edible camphor, and pure cow ghee. Zero chemical perfumes.',
    tag: 'Attar Capital Distillate'
  },
  {
    id: 'arch-ag-3',
    name: 'Temple Sambrani Benzoin Cups',
    subName: 'Vedic Loban Purification',
    region: 'Tirupati, Andhra Pradesh',
    colorName: 'Smoky Charcoal Resin',
    accent: '#4A3525',
    textColor: '#FFFFFF',
    image: AGARBATTI_ASSETS.sambrani,
    price: 320,
    note: 'Pure Styrax benzoin resin cast inside cow dung charcoal cups with havan samagri. Dispels airborne microbes.',
    tag: 'Temple Sanctum Resin'
  },
  {
    id: 'arch-ag-4',
    name: 'Madurai Wild Mogra Jasmine',
    subName: 'Twilight Blossom Flora Sticks',
    region: 'Madurai, Tamil Nadu',
    colorName: 'Jasmine Moon White',
    accent: '#2D5A46',
    textColor: '#FFFFFF',
    image: AGARBATTI_ASSETS.mogra,
    price: 290,
    note: 'Hand-picked pre-dawn jasmine petals crushed with halmaddi resin on slender bamboo splints for serene clarity.',
    tag: 'GI Madurai Malli'
  },
  {
    id: 'arch-ag-5',
    name: 'Sacred Forest Loban & Guggul',
    subName: 'Tribal Foraged Tree Resin',
    region: 'Bastar, Chhattisgarh',
    colorName: 'Amber Balsam Gold',
    accent: '#7A481F',
    textColor: '#FFFFFF',
    image: AGARBATTI_ASSETS.loban,
    price: 380,
    note: 'Ethically tapped Boswellia serrata resin hand-kneaded with dried neem and basil leaf for sacred cleansing.',
    tag: 'Tribal Forest Harvest'
  },
  {
    id: 'arch-ag-6',
    name: 'Alwar Cooling Vetiver Khus',
    subName: 'Earthy Rain Monsoon Dhoop',
    region: 'Alwar, Rajasthan',
    colorName: 'Deep Earth Olive',
    accent: '#3E5638',
    textColor: '#FFFFFF',
    image: AGARBATTI_ASSETS.vetiver,
    price: 310,
    note: 'Sun-dried Chrysopogon zizanioides root fibers blended with powdered cedarwood for cooling meditative calm.',
    tag: 'Desert Earth Coolant'
  }
];

export const AGARBATTI_ENSEMBLES: CraftEnsemble[] = [
  {
    id: 'ag-look-01',
    index: 1,
    name: 'The Mysore Sandalwood Sanctum',
    title: 'Chandan Meditation & Prayer Sanctuary',
    subtitle: 'Pure royal sandalwood incense paired with hand-cast brass temple hardware',
    category: 'Meditation Ritual Suite',
    image: AGARBATTI_ASSETS.hero,
    description: 'A calming temple sanctuary centered around pure Mysore sandalwood heartwood, hand-rolled with organic jigat binder on slender bamboo splints.',
    totalPrice: 2450,
    bundlePrice: 2080,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Karnataka Royal Guild',
    tastingOrCraftNote: 'Warm golden sandalwood, creamy amber, dry cedar undertone',
    pieces: [
      { id: 'ap-11', type: 'Incense Sticks', name: 'Mysore Pure Chandan Agarbatti (Pack of 50)', price: 380, image: AGARBATTI_ASSETS.pieces.sticks, brand: 'SUGANDH SHREEM' },
      { id: 'ap-12', type: 'Brass Stand', name: 'Hand-Cast Brass Diya & Agarbatti Tower', price: 650, image: AGARBATTI_ASSETS.pieces.burner, brand: 'TEMPLE GUILD' },
      { id: 'ap-13', type: 'Dhoop Cones', name: 'Bamboo-Free Sandalwood Dhoop Cones (30 Pcs)', price: 290, image: AGARBATTI_ASSETS.pieces.dhoop, brand: 'SUGANDH SHREEM' },
      { id: 'ap-14', type: 'Bhimseni Camphor', name: 'Pure White Bhimseni Camphor Tablets 100g', price: 340, image: AGARBATTI_ASSETS.pieces.camphor, brand: 'VEDIC PURITY' },
      { id: 'ap-15', type: 'Ash Catcher', name: 'Carved Sheesham Wood Floral Incense Tray', price: 390, image: AGARBATTI_ASSETS.pieces.stand, brand: 'SHREEM ATELIER' },
      { id: 'ap-16', type: 'Sacred Resin', name: 'Raw Mysore Sandalwood Paste & Resin 50g', price: 400, image: AGARBATTI_ASSETS.pieces.resin, brand: 'HERITAGE AROMA' }
    ]
  },
  {
    id: 'ag-look-02',
    index: 2,
    name: 'The Kannauj Rose Twilight Edit',
    title: 'Desi Gulab Evening Serenity',
    subtitle: 'Steam-distilled Damask rose petals blended into soothing aromatic dhoop',
    category: 'Floral Sanctuary Suite',
    image: AGARBATTI_ASSETS.rose,
    description: 'Crafted using the ancient Deg-Bhapka hydro-distillation method in Kannauj, balancing wild rose petals with organic cow ghee.',
    totalPrice: 2360,
    bundlePrice: 2000,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Kannauj Attar Guild',
    tastingOrCraftNote: 'Sweet morning rose, honey nectar, damp petal warmth',
    pieces: [
      { id: 'ap-21', type: 'Incense Sticks', name: 'Kannauj Desi Gulab Flora Agarbatti (50 Sticks)', price: 320, image: AGARBATTI_ASSETS.pieces.sticks, brand: 'SUGANDH SHREEM' },
      { id: 'ap-22', type: 'Brass Stand', name: 'Hand-Cast Brass Diya & Agarbatti Tower', price: 650, image: AGARBATTI_ASSETS.pieces.burner, brand: 'TEMPLE GUILD' },
      { id: 'ap-23', type: 'Dhoop Cones', name: 'Bamboo-Free Rose Dhoop Cones (30 Pcs)', price: 280, image: AGARBATTI_ASSETS.pieces.dhoop, brand: 'SUGANDH SHREEM' },
      { id: 'ap-24', type: 'Bhimseni Camphor', name: 'Pure White Bhimseni Camphor Tablets 100g', price: 340, image: AGARBATTI_ASSETS.pieces.camphor, brand: 'VEDIC PURITY' },
      { id: 'ap-25', type: 'Ash Catcher', name: 'Carved Sheesham Wood Floral Incense Tray', price: 390, image: AGARBATTI_ASSETS.pieces.stand, brand: 'SHREEM ATELIER' },
      { id: 'ap-26', type: 'Sacred Resin', name: 'Damask Rose Petal Dhoop Resin Blend 50g', price: 380, image: AGARBATTI_ASSETS.pieces.resin, brand: 'HERITAGE AROMA' }
    ]
  },
  {
    id: 'ag-look-03',
    index: 3,
    name: 'The Temple Sambrani Havan',
    title: 'Vedic Benzoin Cleansing Ritual',
    subtitle: 'Traditional resin cups releasing antimicrobial aromatic smoke',
    category: 'Purification Suite',
    image: AGARBATTI_ASSETS.sambrani,
    description: 'Harvested from wild Styrax trees, blended with camphor, cloves, and havan herbs to dispel negative vibrations and purify the home atmosphere.',
    totalPrice: 2540,
    bundlePrice: 2150,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Tirupati Sacred Woods',
    tastingOrCraftNote: 'Balsamic benzoin, burnt vanilla, temple charcoal depth',
    pieces: [
      { id: 'ap-31', type: 'Incense Sticks', name: 'Temple Benzoin Sambrani Incense (50 Sticks)', price: 360, image: AGARBATTI_ASSETS.pieces.sticks, brand: 'SUGANDH SHREEM' },
      { id: 'ap-32', type: 'Brass Stand', name: 'Hand-Cast Brass Diya & Agarbatti Tower', price: 650, image: AGARBATTI_ASSETS.pieces.burner, brand: 'TEMPLE GUILD' },
      { id: 'ap-33', type: 'Dhoop Cones', name: 'Sambrani Resin Charcoal Cups (Pack of 20)', price: 350, image: AGARBATTI_ASSETS.pieces.dhoop, brand: 'SUGANDH SHREEM' },
      { id: 'ap-34', type: 'Bhimseni Camphor', name: 'Pure White Bhimseni Camphor Tablets 100g', price: 340, image: AGARBATTI_ASSETS.pieces.camphor, brand: 'VEDIC PURITY' },
      { id: 'ap-35', type: 'Ash Catcher', name: 'Carved Sheesham Wood Floral Incense Tray', price: 390, image: AGARBATTI_ASSETS.pieces.stand, brand: 'SHREEM ATELIER' },
      { id: 'ap-36', type: 'Sacred Resin', name: 'Raw Forest Benzoin Resin Crystals 100g', price: 450, image: AGARBATTI_ASSETS.pieces.resin, brand: 'HERITAGE AROMA' }
    ]
  },
  {
    id: 'ag-look-04',
    index: 4,
    name: 'The Vedic Nag Champa Meditation',
    title: 'Sacred Plumeria Temple Sticks',
    subtitle: 'Golden floral nectar blended with halmaddi resin for deep breathwork',
    category: 'Vedic Meditation Suite',
    image: AGARBATTI_ASSETS.mogra,
    description: 'Slow-rolled by women artisan cooperatives using wild frangipani blossoms, Mysore sandalwood powder, and sacred resins.',
    totalPrice: 2380,
    bundlePrice: 2020,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Varanasi Ashram Reserve',
    tastingOrCraftNote: 'Creamy champaca flower, earthy patchouli, resinous halmaddi',
    pieces: [
      { id: 'ap-41', type: 'Incense Sticks', name: 'Handmade Vedic Nag Champa Agarbatti (50 Sticks)', price: 310, image: AGARBATTI_ASSETS.pieces.sticks, brand: 'SUGANDH SHREEM' },
      { id: 'ap-42', type: 'Brass Stand', name: 'Hand-Cast Brass Diya & Agarbatti Tower', price: 650, image: AGARBATTI_ASSETS.pieces.burner, brand: 'TEMPLE GUILD' },
      { id: 'ap-43', type: 'Dhoop Cones', name: 'Slow-Smolder Champa Dhoop Cones (30 Pcs)', price: 290, image: AGARBATTI_ASSETS.pieces.dhoop, brand: 'SUGANDH SHREEM' },
      { id: 'ap-44', type: 'Bhimseni Camphor', name: 'Pure White Bhimseni Camphor Tablets 100g', price: 340, image: AGARBATTI_ASSETS.pieces.camphor, brand: 'VEDIC PURITY' },
      { id: 'ap-45', type: 'Ash Catcher', name: 'Carved Sheesham Wood Floral Incense Tray', price: 390, image: AGARBATTI_ASSETS.pieces.stand, brand: 'SHREEM ATELIER' },
      { id: 'ap-46', type: 'Sacred Resin', name: 'Natural Halmaddi Tree Resin Gum 50g', price: 400, image: AGARBATTI_ASSETS.pieces.resin, brand: 'HERITAGE AROMA' }
    ]
  },
  {
    id: 'ag-look-05',
    index: 5,
    name: 'The Vetiver & Khus Twilight Sanctuary',
    title: 'Cooling Earth Root Incense',
    subtitle: 'Sun-dried wild vetiver grass roots bringing rainy earth fragrance',
    category: 'Cooling Meditation Suite',
    image: AGARBATTI_ASSETS.vetiver,
    description: 'Harvested after seasonal monsoon showers, the fibrous aromatic roots are dried and stone-ground without charcoal.',
    totalPrice: 2320,
    bundlePrice: 1970,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Rajasthan Dune Valley',
    tastingOrCraftNote: 'Petrichor damp earth, green rootiness, wild grass sweetness',
    pieces: [
      { id: 'ap-51', type: 'Incense Sticks', name: 'Alwar Wild Vetiver Khus Agarbatti (50 Sticks)', price: 300, image: AGARBATTI_ASSETS.pieces.sticks, brand: 'SUGANDH SHREEM' },
      { id: 'ap-52', type: 'Brass Stand', name: 'Hand-Cast Brass Diya & Agarbatti Tower', price: 650, image: AGARBATTI_ASSETS.pieces.burner, brand: 'TEMPLE GUILD' },
      { id: 'ap-53', type: 'Dhoop Cones', name: 'Charcoal-Free Khus Dhoop Cones (30 Pcs)', price: 270, image: AGARBATTI_ASSETS.pieces.dhoop, brand: 'SUGANDH SHREEM' },
      { id: 'ap-54', type: 'Bhimseni Camphor', name: 'Pure White Bhimseni Camphor Tablets 100g', price: 340, image: AGARBATTI_ASSETS.pieces.camphor, brand: 'VEDIC PURITY' },
      { id: 'ap-55', type: 'Ash Catcher', name: 'Carved Sheesham Wood Floral Incense Tray', price: 390, image: AGARBATTI_ASSETS.pieces.stand, brand: 'SHREEM ATELIER' },
      { id: 'ap-56', type: 'Sacred Resin', name: 'Wild Vetiver Root Aromatic Bundle 100g', price: 370, image: AGARBATTI_ASSETS.pieces.resin, brand: 'HERITAGE AROMA' }
    ]
  },
  {
    id: 'ag-look-06',
    index: 6,
    name: 'The Bastar Loban & Frankincense',
    title: 'Tribal Foraged Amber Resin',
    subtitle: 'Wild harvested sal tree resin for sanctum air purification',
    category: 'Ancient Forest Suite',
    image: AGARBATTI_ASSETS.loban,
    description: 'Gathered by tribal forest foragers in Chhattisgarh, dried in mountain air and blended with camphor and natural dried herbs.',
    totalPrice: 2470,
    bundlePrice: 2090,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Bastar Tribal Collective',
    tastingOrCraftNote: 'Balsamic pine, warm golden amber, peppery incense note',
    pieces: [
      { id: 'ap-61', type: 'Incense Sticks', name: 'Bastar Forest Loban Agarbatti (50 Sticks)', price: 350, image: AGARBATTI_ASSETS.pieces.sticks, brand: 'SUGANDH SHREEM' },
      { id: 'ap-62', type: 'Brass Stand', name: 'Hand-Cast Brass Diya & Agarbatti Tower', price: 650, image: AGARBATTI_ASSETS.pieces.burner, brand: 'TEMPLE GUILD' },
      { id: 'ap-63', type: 'Dhoop Cones', name: 'Pure Loban Resin Dhoop Cones (30 Pcs)', price: 310, image: AGARBATTI_ASSETS.pieces.dhoop, brand: 'SUGANDH SHREEM' },
      { id: 'ap-64', type: 'Bhimseni Camphor', name: 'Pure White Bhimseni Camphor Tablets 100g', price: 340, image: AGARBATTI_ASSETS.pieces.camphor, brand: 'VEDIC PURITY' },
      { id: 'ap-65', type: 'Ash Catcher', name: 'Carved Sheesham Wood Floral Incense Tray', price: 390, image: AGARBATTI_ASSETS.pieces.stand, brand: 'SHREEM ATELIER' },
      { id: 'ap-66', type: 'Sacred Resin', name: 'Raw Forest Boswellia Frankincense Tears 100g', price: 430, image: AGARBATTI_ASSETS.pieces.resin, brand: 'HERITAGE AROMA' }
    ]
  },
  {
    id: 'ag-look-07',
    index: 7,
    name: 'The Madurai Mogra Dawn Bloom',
    title: 'Pre-Dawn Jasmine Petal Sticks',
    subtitle: 'Fresh floral dew distilled into soothing daily prayer incense',
    category: 'Morning Prayer Suite',
    image: AGARBATTI_ASSETS.mogra,
    description: 'Handcrafted in Tamil Nadu using Madurai GI-tagged jasmine blossoms, cooling sandalwood powder, and zero synthetic dip oils.',
    totalPrice: 2310,
    bundlePrice: 1960,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Madurai Temple Guild',
    tastingOrCraftNote: 'Heady night jasmine, green stem, delicate honeyed floral',
    pieces: [
      { id: 'ap-71', type: 'Incense Sticks', name: 'Madurai Mogra Hand-Rolled Agarbatti (50 Sticks)', price: 290, image: AGARBATTI_ASSETS.pieces.sticks, brand: 'SUGANDH SHREEM' },
      { id: 'ap-72', type: 'Brass Stand', name: 'Hand-Cast Brass Diya & Agarbatti Tower', price: 650, image: AGARBATTI_ASSETS.pieces.burner, brand: 'TEMPLE GUILD' },
      { id: 'ap-73', type: 'Dhoop Cones', name: 'Floral Jasmine Dhoop Cones (30 Pcs)', price: 260, image: AGARBATTI_ASSETS.pieces.dhoop, brand: 'SUGANDH SHREEM' },
      { id: 'ap-74', type: 'Bhimseni Camphor', name: 'Pure White Bhimseni Camphor Tablets 100g', price: 340, image: AGARBATTI_ASSETS.pieces.camphor, brand: 'VEDIC PURITY' },
      { id: 'ap-75', type: 'Ash Catcher', name: 'Carved Sheesham Wood Floral Incense Tray', price: 390, image: AGARBATTI_ASSETS.pieces.stand, brand: 'SHREEM ATELIER' },
      { id: 'ap-76', type: 'Sacred Resin', name: 'Crushed Jasmine Flower Petal Dhoop 50g', price: 380, image: AGARBATTI_ASSETS.pieces.resin, brand: 'HERITAGE AROMA' }
    ]
  },
  {
    id: 'ag-look-08',
    index: 8,
    name: 'The Himalayan Deodar Pine Sanctum',
    title: 'Cedar Mountain Air Incense',
    subtitle: 'High-altitude pine needle resin with wild mountain lavender',
    category: 'Highland Sanctuary Suite',
    image: AGARBATTI_ASSETS.hero,
    description: 'Sourced from the cedar slopes of Himachal Pradesh, bringing the crisp, sacred resin aroma of ancient Deodar groves into mindful living spaces.',
    totalPrice: 2420,
    bundlePrice: 2050,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Himachal Pine Cooperative',
    tastingOrCraftNote: 'Crisp Deodar cedar, mountain pine sap, cool mist undertones',
    pieces: [
      { id: 'ap-81', type: 'Incense Sticks', name: 'Himalayan Deodar Cedar Agarbatti (50 Sticks)', price: 340, image: AGARBATTI_ASSETS.pieces.sticks, brand: 'SUGANDH SHREEM' },
      { id: 'ap-82', type: 'Brass Stand', name: 'Hand-Cast Brass Diya & Agarbatti Tower', price: 650, image: AGARBATTI_ASSETS.pieces.burner, brand: 'TEMPLE GUILD' },
      { id: 'ap-83', type: 'Dhoop Cones', name: 'Charcoal-Free Pine Dhoop Cones (30 Pcs)', price: 290, image: AGARBATTI_ASSETS.pieces.dhoop, brand: 'SUGANDH SHREEM' },
      { id: 'ap-84', type: 'Bhimseni Camphor', name: 'Pure White Bhimseni Camphor Tablets 100g', price: 340, image: AGARBATTI_ASSETS.pieces.camphor, brand: 'VEDIC PURITY' },
      { id: 'ap-85', type: 'Ash Catcher', name: 'Carved Sheesham Wood Floral Incense Tray', price: 390, image: AGARBATTI_ASSETS.pieces.stand, brand: 'SHREEM ATELIER' },
      { id: 'ap-86', type: 'Sacred Resin', name: 'Deodar Pine Tree Balsam Resin 50g', price: 410, image: AGARBATTI_ASSETS.pieces.resin, brand: 'HERITAGE AROMA' }
    ]
  }
];

export const AGARBATTI_PICK_VARIETIES = [
  { id: 'pick-ag-1', title: 'MYSORE CHANDAN', subtitle: 'Ground Pure Sandalwood Heartwood', price: 350, image: AGARBATTI_ASSETS.chandan, bg: '#5C3E14' },
  { id: 'pick-ag-2', title: 'KANNAUJ GULAB', subtitle: 'Damask Rose Steam Distillate', price: 280, image: AGARBATTI_ASSETS.rose, bg: '#6A1B29' },
  { id: 'pick-ag-3', title: 'TEMPLE SAMBRANI', subtitle: 'Purifying Benzoin Resin Charcoal Cup', price: 320, image: AGARBATTI_ASSETS.sambrani, bg: '#2B221B' },
  { id: 'pick-ag-4', title: 'BASTAR LOBAN', subtitle: 'Tribal Foraged Tree Resin Crystals', price: 380, image: AGARBATTI_ASSETS.loban, bg: '#4A2A0C' },
  { id: 'pick-ag-5', title: 'COOLING KHUS', subtitle: 'Alwar Wild Vetiver Monsoon Root', price: 310, image: AGARBATTI_ASSETS.vetiver, bg: '#223824' }
];

export const AGARBATTI_SHELF_FILTERS: CraftShelfFilter[] = [
  { id: 'all', label: 'All Aromas', count: 8 },
  { id: 'dhoop', label: 'Bamboo-Free Dhoop', count: 3 },
  { id: 'flora', label: 'Hand-Rolled Flora', count: 3 },
  { id: 'resins', label: 'Sacred Resins & Cups', count: 2 }
];

export const AGARBATTI_SHELF_ITEMS: CraftShelfItem[] = [
  {
    id: 'shelf-ag-1',
    name: 'Royal Mysore Sandalwood Agarbatti Box (50 Sticks)',
    price: 350,
    category: 'flora',
    categoryType: 'Flora Sticks',
    categoryLabel: 'Hand-Rolled Flora',
    image: AGARBATTI_ASSETS.chandan,
    description: 'Ground Santalum album heartwood paste hand-rolled onto fine bamboo splints with pure organic halmaddi binder.',
    origin: 'Mysuru, Karnataka',
    artisanCluster: 'Mysore Incense Artisans Guild',
    specs: [
      { label: 'Burn Duration', value: '55 - 60 minutes per stick' },
      { label: 'Primary Wood', value: '100% Genuine Mysore Sandalwood' },
      { label: 'Chemicals', value: '0% DEP, 0% Synthetic Phthalates' }
    ]
  },
  {
    id: 'shelf-ag-2',
    name: 'Kannauj Desi Gulab Cow Dung Dhoop Cones (30 Pcs)',
    price: 280,
    category: 'dhoop',
    categoryType: 'Dhoop Cone',
    categoryLabel: 'Bamboo-Free Dhoop',
    image: AGARBATTI_ASSETS.rose,
    description: 'Charcoal-free cones made from desi cow dung, rose petal powder, camphor, and pure desi cow ghee for serene puja rituals.',
    origin: 'Kannauj, Uttar Pradesh',
    artisanCluster: 'Kannauj Flower Distillers Cooperative',
    specs: [
      { label: 'Form', value: 'Solid charcoal-free dhoop cones' },
      { label: 'Burn Time', value: '35 minutes with continuous fragrance' },
      { label: 'Fragrance', value: 'Sweet Damask Rose & Desi Ghee' }
    ]
  },
  {
    id: 'shelf-ag-3',
    name: 'Vedic Sambrani Charcoal Dhoop Cups (Pack of 12)',
    price: 320,
    category: 'resins',
    categoryType: 'Resin Cups',
    categoryLabel: 'Sacred Resins & Cups',
    image: AGARBATTI_ASSETS.sambrani,
    description: 'Styrax benzoin tears hand-poured inside dried herbal charcoal cups. Creates dense aromatic white smoke that purifies room air.',
    origin: 'Tirupati, Andhra Pradesh',
    artisanCluster: 'Sri Kalahasti Traditional Resin Cooperative',
    specs: [
      { label: 'Ingredients', value: 'Natural Sambrani Resin, Cow Dung Charcoal' },
      { label: 'Purpose', value: 'Daily evening arti & atmospheric cleansing' },
      { label: 'Includes', value: 'Ceramic mini burner plate' }
    ]
  },
  {
    id: 'shelf-ag-4',
    name: 'Madurai Mogra Flora Agarbatti Box (50 Sticks)',
    price: 290,
    category: 'flora',
    categoryType: 'Flora Sticks',
    categoryLabel: 'Hand-Rolled Flora',
    image: AGARBATTI_ASSETS.mogra,
    description: 'Pre-dawn Arabian Jasmine petals crushed into wood dust and hand-rolled by women artisans in Tamil Nadu.',
    origin: 'Madurai, Tamil Nadu',
    artisanCluster: 'Madurai Malli Women Cooperative',
    specs: [
      { label: 'Floral Source', value: 'GI-Tagged Madurai Malli' },
      { label: 'Binder', value: 'Natural Jigat bark powder' },
      { label: 'Stick Count', value: '50 Sticks' }
    ]
  },
  {
    id: 'shelf-ag-5',
    name: 'Bastar Forest Loban & Camphor Resin Granules 150g',
    price: 380,
    category: 'resins',
    categoryType: 'Raw Resin',
    categoryLabel: 'Sacred Resins & Cups',
    image: AGARBATTI_ASSETS.loban,
    description: 'Golden crystalline tears tapped from wild sal trees in deep Bastar rainforests, blended with crushed white camphor crystals.',
    origin: 'Bastar, Chhattisgarh',
    artisanCluster: 'Van Dhan Vikas Kendra Collective',
    specs: [
      { label: 'Harvesting', value: '100% Ethical non-destructive tree tapping' },
      { label: 'Application', value: 'Burn on charcoal or electric dhoop burner' },
      { label: 'Net Weight', value: '150g Glass Jar' }
    ]
  },
  {
    id: 'shelf-ag-6',
    name: 'Cooling Alwar Vetiver Khus Dhoop Sticks (40 Pcs)',
    price: 310,
    category: 'dhoop',
    categoryType: 'Bamboo-Free',
    categoryLabel: 'Bamboo-Free Dhoop',
    image: AGARBATTI_ASSETS.vetiver,
    description: 'Heavy vetiver roots dried after rain showers and pressed into smooth solid sticks that smell like first rain on parched red soil.',
    origin: 'Alwar, Rajasthan',
    artisanCluster: 'Aravalli Herbal Foragers Group',
    specs: [
      { label: 'Core', value: 'Bamboo-less solid extruded dhoop' },
      { label: 'Smell Profile', value: 'Petrichor, wet roots, cool earth' },
      { label: 'Burn Duration', value: '45 minutes' }
    ]
  },
  {
    id: 'shelf-ag-7',
    name: 'Varanasi Nag Champa Ashram Reserve (50 Sticks)',
    price: 330,
    category: 'flora',
    categoryType: 'Flora Sticks',
    categoryLabel: 'Hand-Rolled Flora',
    image: AGARBATTI_ASSETS.mogra,
    description: 'Classic plumeria blossom extract blended with halmaddi resin and aged sandalwood powder according to 300-year-old ashram formulas.',
    origin: 'Varanasi, Uttar Pradesh',
    artisanCluster: 'Kashi Vedic Perfumers Guild',
    specs: [
      { label: 'Tradition', value: 'Authentic Ashram Vedic Recipe' },
      { label: 'Packaging', value: 'Biodegradable handmade paper tube' },
      { label: 'Length', value: '9 inch slow-burning sticks' }
    ]
  },
  {
    id: 'shelf-ag-8',
    name: 'Hand-Cast Pure Brass Peacock Dhoop Dani',
    price: 790,
    category: 'dhoop',
    categoryType: 'Brass Ware',
    categoryLabel: 'Bamboo-Free Dhoop',
    image: AGARBATTI_ASSETS.hero,
    description: 'Heavy solid brass ceremonial incense burner with perforated lid, wooden handle, and peacock finial for diffusing dhoop smoke.',
    origin: 'Moradabad, Uttar Pradesh',
    artisanCluster: 'Moradabad Master Brass Guild',
    specs: [
      { label: 'Metal', value: '100% Solid Brass with wooden handle' },
      { label: 'Weight', value: '420 grams' },
      { label: 'Finish', value: 'Traditional golden antique lacquer' }
    ]
  }
];

export const AGARBATTI_REELS: CraftReel[] = [
  {
    id: 'reel-ag-1',
    reelNumber: 'REEL 01',
    duration: '0:38',
    craftType: 'FLORA ROLLING',
    title: 'The Rhythm of Hand-Rolling Mysore Chandan',
    location: 'Mysuru, Karnataka',
    posterImage: AGARBATTI_ASSETS.chandan,
    price: 350,
    handle: '@sugandhshreem',
    soundTrack: 'Temple Bells & Gentle Chants',
    artisanStory: 'Master artisan Lakshmi rolls each bamboo splint with steady precision through pure sandalwood dough, rolling over 1,000 sticks every morning.'
  },
  {
    id: 'reel-ag-2',
    reelNumber: 'REEL 02',
    duration: '0:42',
    craftType: 'RESIN CASTING',
    title: 'Filling Benzoin Sambrani Cups for Temple Aarti',
    location: 'Tirupati, Andhra Pradesh',
    posterImage: AGARBATTI_ASSETS.sambrani,
    price: 320,
    handle: '@vedicincense',
    soundTrack: 'Sacred Sanskrit Havan Chants',
    artisanStory: 'Molten Styrax tree resin is hand-poured into natural charcoal cups, sealing pure botanical purity for evening prayer rituals.'
  }
];
