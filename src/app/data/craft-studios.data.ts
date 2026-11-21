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
  hero: 'assets/images/craft-studios/honey/pure_meadow_honey_user.jpg',
  forestHero: 'assets/images/craft-studios/honey/van_amrit_forest_honey_hero.jpg',
  sundarbans: 'assets/images/craft-studios/honey/nectar-01-sundarbans.jpg',
  acacia: 'assets/images/craft-studios/honey/nectar-02-acacia.jpg',
  jamun: 'assets/images/craft-studios/honey/nectar-03-jamun.jpg',
  nilgiri: 'assets/images/craft-studios/honey/nectar-04-nilgiri.jpg',
  cliff: 'assets/images/craft-studios/honey/nectar-05-cliff.jpg',
  coffee: 'assets/images/craft-studios/honey/nectar-06-coffee.jpg',
  pieces: {
    jar: 'assets/images/craft-studios/honey/pure_meadow_honey_user.jpg',
    dipper: 'assets/images/craft-studios/honey/piece-02-dipper.jpg',
    drizzler: 'assets/images/craft-studios/honey/piece-03-drizzler.jpg',
    pollen: 'assets/images/craft-studios/honey/piece-04-pollen.jpg',
    comb: 'assets/images/craft-studios/honey/piece-05-comb.jpg',
    walnuts: 'assets/images/craft-studios/honey/piece-06-walnuts.jpg'
  }
};

export const HONEY_ARCHIVE_CATEGORIES: CraftArchiveCategory[] = [
  {
    id: 'sundarbans-wild',
    name: 'Sundarbans Mangrove',
    subName: 'Sundari Blossom Wild Harvest',
    region: 'Sundarbans Biosphere, West Bengal',
    colorName: 'Deep Mahogany Amber',
    accent: '#8C430B',
    textColor: '#FFFFFF',
    image: HONEY_ASSETS.sundarbans,
    price: 640,
    note: 'Deeply aromatic with complex salty-sweet notes from pristine tidal mangrove floral blooms.',
    tag: 'GI Tagged · Wild Forest'
  },
  {
    id: 'kashmir-acacia',
    name: 'Kashmir White Acacia',
    subName: 'High-Altitude Robinia Nectar',
    region: 'Pahalgam Valley, Kashmir',
    colorName: 'Lustrous Pale Platinum Gold',
    accent: '#B08832',
    textColor: '#FFFFFF',
    image: HONEY_ASSETS.acacia,
    price: 780,
    note: 'Water-clear single-source blossom honey with delicate vanillic undertones and zero crystallization.',
    tag: 'Single Floral · Pure Raw'
  },
  {
    id: 'western-jamun',
    name: 'Western Ghats Jamun',
    subName: 'Syzygium Cumini Blossom',
    region: 'Bhimashankar Ridge, Maharashtra',
    colorName: 'Rich Bitter-Sweet Dark Port',
    accent: '#5E2028',
    textColor: '#FFFFFF',
    image: HONEY_ASSETS.jamun,
    price: 520,
    note: 'Known in Ayurveda for its low glycemic index, robust tannic notes, and active antioxidant enzymes.',
    tag: 'Ayurvedic Reserve'
  },
  {
    id: 'nilgiri-multiflora',
    name: 'Nilgiri Multi-Flora',
    subName: 'Blue Mountain Shola Forest',
    region: 'Nilgiris Biosphere, Tamil Nadu',
    colorName: 'Warm Golden Topaz',
    accent: '#C27C17',
    textColor: '#FFFFFF',
    image: HONEY_ASSETS.nilgiri,
    price: 490,
    note: 'Sustainably gathered by Kurumba honey hunters from over 40 species of wild mountain wildflowers.',
    tag: 'Tribal Gathered'
  },
  {
    id: 'himalayan-cliff',
    name: 'Himalayan Cliff Honey',
    subName: 'Apis Laboriosa Rock Harvest',
    region: 'Nanda Devi Foothills, Uttarakhand',
    colorName: 'Reddish Smoky Amber',
    accent: '#9C3A16',
    textColor: '#FFFFFF',
    image: HONEY_ASSETS.cliff,
    price: 950,
    note: 'Extremely rare cliff honey rich in wild rhododendron nectar, revered by hill communities.',
    tag: 'Limited Annual Batch'
  },
  {
    id: 'coorg-coffee',
    name: 'Coorg Coffee Blossom',
    subName: 'Arabica & Robusta Bloom',
    region: 'Madikeri Canopy, Karnataka',
    colorName: 'Velvety Spiced Caramel',
    accent: '#6E4522',
    textColor: '#FFFFFF',
    image: HONEY_ASSETS.coffee,
    price: 560,
    note: 'Harvested during the fleeting 4-day monsoon blossom season; notes of roasted cocoa and white petals.',
    tag: 'Estate Reserve'
  }
];

export const HONEY_ENSEMBLES: CraftEnsemble[] = [
  {
    id: 'honey-look-01',
    index: 1,
    name: 'Pure Meadow Morning Ritual',
    title: 'Pure Meadow Honey Ensemble',
    subtitle: 'Golden Wildflower Honey paired with hand-hewn brass and mountain pollen',
    category: 'Wildflower Harvest',
    image: HONEY_ASSETS.hero,
    description: 'Raw, unheated meadow wildflower honey in a classic embossed glass jar, styled with handcrafted serving brass and wellness accompaniments.',
    totalPrice: 3300,
    bundlePrice: 2800,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'High Valley Meadow',
    tastingOrCraftNote: 'Delicate floral bouquet, sunlit notes of clover and chamomile',
    pieces: [
      {
        id: 'hp-1',
        type: 'Honey Jar',
        name: 'Pure Meadow Raw Wildflower Honey 500g',
        price: 580,
        image: HONEY_ASSETS.hero,
        brand: 'VAN AMRIT'
      },
      {
        id: 'hp-2',
        type: 'Dipper',
        name: 'Hand-Cast Pure Brass Honey Dipper',
        price: 450,
        image: HONEY_ASSETS.pieces.dipper,
        brand: 'SHREEM BRASS'
      },
      {
        id: 'hp-3',
        type: 'Pot',
        name: 'Hand-Thrown Ceramic Drizzler Jar with Cork',
        price: 650,
        image: HONEY_ASSETS.pieces.drizzler,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'hp-4',
        type: 'Bee Pollen',
        name: 'Sun-Dried Golden Bee Pollen Granules 100g',
        price: 380,
        image: HONEY_ASSETS.pieces.pollen,
        brand: 'FOREST NECTAR'
      },
      {
        id: 'hp-5',
        type: 'Honeycomb',
        name: 'Intact Raw Forest Honeycomb Slab 200g',
        price: 550,
        image: HONEY_ASSETS.pieces.comb,
        brand: 'WILD COMB'
      },
      {
        id: 'hp-6',
        type: 'Spiced Nuts',
        name: 'Honey Glazed Himalayan Walnuts 250g',
        price: 690,
        image: HONEY_ASSETS.pieces.walnuts,
        brand: 'PAHALGAM EDITS'
      }
    ]
  },
  {
    id: 'honey-look-02',
    index: 2,
    name: 'Sundarbans Mangrove Reserve',
    title: 'Tidal Mangrove Wild Harvest',
    subtitle: 'Smoky, mineral-rich wild forest honey collected from deep mangrove canopy',
    category: 'Mangrove Nectar',
    image: HONEY_ASSETS.sundarbans,
    description: 'Gathered by licensed Mouli forest collectors from Apis Dorsata combs in the tidal mangrove sanctuaries of the Bengal delta.',
    totalPrice: 3450,
    bundlePrice: 2950,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Sundarbans Biosphere',
    tastingOrCraftNote: 'Tannic, bold, rich salinity and dark treacle finish',
    pieces: [
      {
        id: 'hp-21',
        type: 'Honey Jar',
        name: 'Sundarbans Deep Wild Forest Honey 500g',
        price: 640,
        image: HONEY_ASSETS.sundarbans,
        brand: 'VAN AMRIT'
      },
      {
        id: 'hp-22',
        type: 'Dipper',
        name: 'Hand-Cast Pure Brass Honey Dipper',
        price: 450,
        image: HONEY_ASSETS.pieces.dipper,
        brand: 'SHREEM BRASS'
      },
      {
        id: 'hp-23',
        type: 'Pot',
        name: 'Hand-Thrown Ceramic Drizzler Jar with Cork',
        price: 650,
        image: HONEY_ASSETS.pieces.drizzler,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'hp-24',
        type: 'Bee Pollen',
        name: 'Sun-Dried Golden Bee Pollen Granules 100g',
        price: 380,
        image: HONEY_ASSETS.pieces.pollen,
        brand: 'FOREST NECTAR'
      },
      {
        id: 'hp-25',
        type: 'Honeycomb',
        name: 'Intact Raw Forest Honeycomb Slab 200g',
        price: 550,
        image: HONEY_ASSETS.pieces.comb,
        brand: 'WILD COMB'
      },
      {
        id: 'hp-26',
        type: 'Spiced Nuts',
        name: 'Honey Glazed Himalayan Walnuts 250g',
        price: 690,
        image: HONEY_ASSETS.pieces.walnuts,
        brand: 'PAHALGAM EDITS'
      }
    ]
  },
  {
    id: 'honey-look-03',
    index: 3,
    name: 'Kashmir Valley White Acacia',
    title: 'High-Altitude Acacia Blossom',
    subtitle: 'Pale crystalline nectar from pristine mountain forests',
    category: 'Single Floral',
    image: HONEY_ASSETS.acacia,
    description: 'Rare white acacia honey with zero processing, offering an ultra-light texture, silky finish, and pure floral clarity.',
    totalPrice: 3600,
    bundlePrice: 3050,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Pahalgam, Kashmir',
    tastingOrCraftNote: 'Silky smooth, gentle hints of vanilla and spring blossoms',
    pieces: [
      {
        id: 'hp-31',
        type: 'Honey Jar',
        name: 'Kashmir Acacia Raw White Honey 500g',
        price: 780,
        image: HONEY_ASSETS.acacia,
        brand: 'VAN AMRIT'
      },
      {
        id: 'hp-32',
        type: 'Dipper',
        name: 'Hand-Cast Pure Brass Honey Dipper',
        price: 450,
        image: HONEY_ASSETS.pieces.dipper,
        brand: 'SHREEM BRASS'
      },
      {
        id: 'hp-33',
        type: 'Pot',
        name: 'Hand-Thrown Ceramic Drizzler Jar with Cork',
        price: 650,
        image: HONEY_ASSETS.pieces.drizzler,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'hp-34',
        type: 'Bee Pollen',
        name: 'Sun-Dried Golden Bee Pollen Granules 100g',
        price: 380,
        image: HONEY_ASSETS.pieces.pollen,
        brand: 'FOREST NECTAR'
      },
      {
        id: 'hp-35',
        type: 'Honeycomb',
        name: 'Intact Raw Forest Honeycomb Slab 200g',
        price: 550,
        image: HONEY_ASSETS.pieces.comb,
        brand: 'WILD COMB'
      },
      {
        id: 'hp-36',
        type: 'Spiced Nuts',
        name: 'Honey Glazed Himalayan Walnuts 250g',
        price: 690,
        image: HONEY_ASSETS.pieces.walnuts,
        brand: 'PAHALGAM EDITS'
      }
    ]
  },
  {
    id: 'honey-look-04',
    index: 4,
    name: 'Bhimashankar Wild Jamun',
    title: 'Medicinal Jamun Berry Nectar',
    subtitle: 'Deep antioxidant harvest from the Sahyadri mountains',
    category: 'Ayurvedic Reserve',
    image: HONEY_ASSETS.jamun,
    description: 'Harvested exclusively when the black plum trees burst into blossom across the Western Ghats wildlife sanctuary.',
    totalPrice: 3200,
    bundlePrice: 2720,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Western Ghats Ridge',
    tastingOrCraftNote: 'Tart berry undertone, full-bodied warmth, lingering herbal finish',
    pieces: [
      {
        id: 'hp-41',
        type: 'Honey Jar',
        name: 'Western Ghats Jamun Flower Honey 500g',
        price: 520,
        image: HONEY_ASSETS.jamun,
        brand: 'VAN AMRIT'
      },
      {
        id: 'hp-42',
        type: 'Dipper',
        name: 'Hand-Cast Pure Brass Honey Dipper',
        price: 450,
        image: HONEY_ASSETS.pieces.dipper,
        brand: 'SHREEM BRASS'
      },
      {
        id: 'hp-43',
        type: 'Pot',
        name: 'Hand-Thrown Ceramic Drizzler Jar with Cork',
        price: 650,
        image: HONEY_ASSETS.pieces.drizzler,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'hp-44',
        type: 'Bee Pollen',
        name: 'Sun-Dried Golden Bee Pollen Granules 100g',
        price: 380,
        image: HONEY_ASSETS.pieces.pollen,
        brand: 'FOREST NECTAR'
      },
      {
        id: 'hp-45',
        type: 'Honeycomb',
        name: 'Intact Raw Forest Honeycomb Slab 200g',
        price: 550,
        image: HONEY_ASSETS.pieces.comb,
        brand: 'WILD COMB'
      },
      {
        id: 'hp-46',
        type: 'Spiced Nuts',
        name: 'Honey Glazed Himalayan Walnuts 250g',
        price: 690,
        image: HONEY_ASSETS.pieces.walnuts,
        brand: 'PAHALGAM EDITS'
      }
    ]
  },
  {
    id: 'honey-look-05',
    index: 5,
    name: 'Nilgiri Kurumba Multi-Flora',
    title: 'Blue Mountain Forest Flora',
    subtitle: 'Wild medicinal harvest from sacred Shola rainforest groves',
    category: 'Tribal Harvest',
    image: HONEY_ASSETS.nilgiri,
    description: 'Cold-settled by indigenous Kurumba gatherers using bamboo strainers, preserving all natural pollen and active propolis.',
    totalPrice: 3180,
    bundlePrice: 2700,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Nilgiri Biosphere',
    tastingOrCraftNote: 'Multi-layered wildflower notes, forest eucalyptus and crushed mint',
    pieces: [
      {
        id: 'hp-51',
        type: 'Honey Jar',
        name: 'Nilgiri Shola Forest Multi-Flora Honey 500g',
        price: 490,
        image: HONEY_ASSETS.nilgiri,
        brand: 'VAN AMRIT'
      },
      {
        id: 'hp-52',
        type: 'Dipper',
        name: 'Hand-Cast Pure Brass Honey Dipper',
        price: 450,
        image: HONEY_ASSETS.pieces.dipper,
        brand: 'SHREEM BRASS'
      },
      {
        id: 'hp-53',
        type: 'Pot',
        name: 'Hand-Thrown Ceramic Drizzler Jar with Cork',
        price: 650,
        image: HONEY_ASSETS.pieces.drizzler,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'hp-54',
        type: 'Bee Pollen',
        name: 'Sun-Dried Golden Bee Pollen Granules 100g',
        price: 380,
        image: HONEY_ASSETS.pieces.pollen,
        brand: 'FOREST NECTAR'
      },
      {
        id: 'hp-55',
        type: 'Honeycomb',
        name: 'Intact Raw Forest Honeycomb Slab 200g',
        price: 550,
        image: HONEY_ASSETS.pieces.comb,
        brand: 'WILD COMB'
      },
      {
        id: 'hp-56',
        type: 'Spiced Nuts',
        name: 'Honey Glazed Himalayan Walnuts 250g',
        price: 690,
        image: HONEY_ASSETS.pieces.walnuts,
        brand: 'PAHALGAM EDITS'
      }
    ]
  },
  {
    id: 'honey-look-06',
    index: 6,
    name: 'Himalayan Rock Cliff Reserve',
    title: 'Apis Laboriosa Rock Harvest',
    subtitle: 'Pristine raw honey gathered from towering high-altitude granite cliffs',
    category: 'Rare Cliff Honey',
    image: HONEY_ASSETS.cliff,
    description: 'Gathered on rope ladders over 8,000 feet up in the Garhwal Himalayas from giant rock bees feeding on wild rhododendrons.',
    totalPrice: 3800,
    bundlePrice: 3200,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Garhwal Himalayas',
    tastingOrCraftNote: 'Intense smoky aromatics, deep molasses resonance and warming spice',
    pieces: [
      {
        id: 'hp-61',
        type: 'Honey Jar',
        name: 'Himalayan Cliff Raw Honey 500g',
        price: 950,
        image: HONEY_ASSETS.cliff,
        brand: 'VAN AMRIT'
      },
      {
        id: 'hp-62',
        type: 'Dipper',
        name: 'Hand-Cast Pure Brass Honey Dipper',
        price: 450,
        image: HONEY_ASSETS.pieces.dipper,
        brand: 'SHREEM BRASS'
      },
      {
        id: 'hp-63',
        type: 'Pot',
        name: 'Hand-Thrown Ceramic Drizzler Jar with Cork',
        price: 650,
        image: HONEY_ASSETS.pieces.drizzler,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'hp-64',
        type: 'Bee Pollen',
        name: 'Sun-Dried Golden Bee Pollen Granules 100g',
        price: 380,
        image: HONEY_ASSETS.pieces.pollen,
        brand: 'FOREST NECTAR'
      },
      {
        id: 'hp-65',
        type: 'Honeycomb',
        name: 'Intact Raw Forest Honeycomb Slab 200g',
        price: 550,
        image: HONEY_ASSETS.pieces.comb,
        brand: 'WILD COMB'
      },
      {
        id: 'hp-66',
        type: 'Spiced Nuts',
        name: 'Honey Glazed Himalayan Walnuts 250g',
        price: 690,
        image: HONEY_ASSETS.pieces.walnuts,
        brand: 'PAHALGAM EDITS'
      }
    ]
  },
  {
    id: 'honey-look-07',
    index: 7,
    name: 'Coorg Estate Blossom Reserve',
    title: 'Rainforest Coffee & Cardamom Bloom',
    subtitle: 'Gourmet plantation honey with notes of roasted cocoa and white spice',
    category: 'Estate Harvest',
    image: HONEY_ASSETS.coffee,
    description: 'Single estate honey harvested during the annual four-day coffee bloom across shade-grown biodiversity estates in Madikeri.',
    totalPrice: 3280,
    bundlePrice: 2790,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Madikeri, Coorg',
    tastingOrCraftNote: 'Mellow caramel sweetness, soft floral undertones of jasmine and roasted bean',
    pieces: [
      {
        id: 'hp-71',
        type: 'Honey Jar',
        name: 'Coorg Coffee Blossom Honey 500g',
        price: 560,
        image: HONEY_ASSETS.coffee,
        brand: 'VAN AMRIT'
      },
      {
        id: 'hp-72',
        type: 'Dipper',
        name: 'Hand-Cast Pure Brass Honey Dipper',
        price: 450,
        image: HONEY_ASSETS.pieces.dipper,
        brand: 'SHREEM BRASS'
      },
      {
        id: 'hp-73',
        type: 'Pot',
        name: 'Hand-Thrown Ceramic Drizzler Jar with Cork',
        price: 650,
        image: HONEY_ASSETS.pieces.drizzler,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'hp-74',
        type: 'Bee Pollen',
        name: 'Sun-Dried Golden Bee Pollen Granules 100g',
        price: 380,
        image: HONEY_ASSETS.pieces.pollen,
        brand: 'FOREST NECTAR'
      },
      {
        id: 'hp-75',
        type: 'Honeycomb',
        name: 'Intact Raw Forest Honeycomb Slab 200g',
        price: 550,
        image: HONEY_ASSETS.pieces.comb,
        brand: 'WILD COMB'
      },
      {
        id: 'hp-76',
        type: 'Spiced Nuts',
        name: 'Honey Glazed Himalayan Walnuts 250g',
        price: 690,
        image: HONEY_ASSETS.pieces.walnuts,
        brand: 'PAHALGAM EDITS'
      }
    ]
  },
  {
    id: 'honey-look-08',
    index: 8,
    name: 'Van Amrit Master Reserve',
    title: 'The Royal Forest Apiary Edit',
    subtitle: 'Triple-blended raw forest nectar sealed with handmade botanical label',
    category: 'Master Collection',
    image: HONEY_ASSETS.forestHero,
    description: 'An extraordinary reserve jar showcasing the ultimate purity of untamed Indian forest floral nectars, unpasteurised and zero-filtered.',
    totalPrice: 3400,
    bundlePrice: 2890,
    discountNote: 'Bundle all 6 pieces · save 15%',
    originBadge: 'Madhya Pradesh Central Reserve',
    tastingOrCraftNote: 'Complex honey notes with wild thyme, mahua flower, and forest moss',
    pieces: [
      {
        id: 'hp-81',
        type: 'Honey Jar',
        name: 'Van Amrit Wild Forest Master Reserve 500g',
        price: 680,
        image: HONEY_ASSETS.forestHero,
        brand: 'VAN AMRIT'
      },
      {
        id: 'hp-82',
        type: 'Dipper',
        name: 'Hand-Cast Pure Brass Honey Dipper',
        price: 450,
        image: HONEY_ASSETS.pieces.dipper,
        brand: 'SHREEM BRASS'
      },
      {
        id: 'hp-83',
        type: 'Pot',
        name: 'Hand-Thrown Ceramic Drizzler Jar with Cork',
        price: 650,
        image: HONEY_ASSETS.pieces.drizzler,
        brand: 'MITTI ATELIER'
      },
      {
        id: 'hp-84',
        type: 'Bee Pollen',
        name: 'Sun-Dried Golden Bee Pollen Granules 100g',
        price: 380,
        image: HONEY_ASSETS.pieces.pollen,
        brand: 'FOREST NECTAR'
      },
      {
        id: 'hp-85',
        type: 'Honeycomb',
        name: 'Intact Raw Forest Honeycomb Slab 200g',
        price: 550,
        image: HONEY_ASSETS.pieces.comb,
        brand: 'WILD COMB'
      },
      {
        id: 'hp-86',
        type: 'Spiced Nuts',
        name: 'Honey Glazed Himalayan Walnuts 250g',
        price: 690,
        image: HONEY_ASSETS.pieces.walnuts,
        brand: 'PAHALGAM EDITS'
      }
    ]
  }
];

export const HONEY_PICK_VARIETIES = [
  { id: 'pick-h-1', title: 'SUNDARBANS', subtitle: 'Tidal Mangrove Wild Flora', price: 640, image: HONEY_ASSETS.sundarbans, bg: '#3D1D09' },
  { id: 'pick-h-2', title: 'ACACIA', subtitle: 'Pahalgam Pale White Bloom', price: 780, image: HONEY_ASSETS.acacia, bg: '#7A5B18' },
  { id: 'pick-h-3', title: 'JAMUN', subtitle: 'Western Ghats Antioxidant', price: 520, image: HONEY_ASSETS.jamun, bg: '#42161E' },
  { id: 'pick-h-4', title: 'NILGIRI', subtitle: 'Shola Wildflower Rainforest', price: 490, image: HONEY_ASSETS.nilgiri, bg: '#6B4210' },
  { id: 'pick-h-5', title: 'CLIFF ROCK', subtitle: 'Himalayan Giant Rock Bee', price: 950, image: HONEY_ASSETS.cliff, bg: '#54210C' }
];

export const HONEY_SHELF_FILTERS: CraftShelfFilter[] = [
  { id: 'all', label: 'All Harvests', count: 12 },
  { id: 'single-floral', label: 'Single Floral', count: 4 },
  { id: 'wild-comb', label: 'Raw Honeycombs', count: 3 },
  { id: 'medicinal', label: 'Ayurvedic Reserve', count: 3 },
  { id: 'estate', label: 'Estate Harvests', count: 2 }
];

export const HONEY_SHELF_ITEMS: CraftShelfItem[] = [
  {
    id: 'hs-1',
    name: 'Pure Meadow Raw Wildflower Honey 500g',
    price: 580,
    category: 'single-floral',
    categoryType: 'Raw Honey',
    categoryLabel: 'Single Floral',
    image: HONEY_ASSETS.hero,
    description: 'Raw meadow flower nectar bottled fresh without heat, preserving active diastase enzymes and delicate pollen notes.',
    origin: 'Himachal Meadows',
    artisanCluster: 'Kangra Beekeeping Cooperative',
    specs: [
      { label: 'Moisture', value: '17.2% (Pure Grade A)' },
      { label: 'Pollen Count', value: 'High Multifocal' },
      { label: 'Processing', value: 'Zero Heat / Unfiltered' },
      { label: 'Certification', value: 'FSSAI Organic · GI Certified' }
    ]
  },
  {
    id: 'hs-2',
    name: 'Sundarbans Wild Mangrove Honey 500g',
    price: 640,
    category: 'medicinal',
    categoryType: 'Wild Honey',
    categoryLabel: 'Ayurvedic Reserve',
    image: HONEY_ASSETS.sundarbans,
    description: 'Harvested deep inside the mangrove delta by traditional Mouli honey gatherers. Naturally dense, dark amber, and rich in natural bio-flavonoids.',
    origin: 'Sundarbans, West Bengal',
    artisanCluster: 'Mouli Tribal Forest Federation',
    specs: [
      { label: 'Moisture', value: '18.1%' },
      { label: 'Source', value: 'Wild Khalsi & Goran Bloom' },
      { label: 'Processing', value: 'Cold-Filtered' },
      { label: 'Harvest Date', value: 'Spring 2026' }
    ]
  },
  {
    id: 'hs-3',
    name: 'Kashmir White Acacia Honey 500g',
    price: 780,
    category: 'single-floral',
    categoryType: 'Blossom Honey',
    categoryLabel: 'Single Floral',
    image: HONEY_ASSETS.acacia,
    description: 'Exquisite water-white raw honey from high-altitude Kashmiri valleys. Low sucrose, delightfully sweet with floral clarity.',
    origin: 'Pahalgam, Jammu & Kashmir',
    artisanCluster: 'Valley Beekeepers Guild',
    specs: [
      { label: 'Moisture', value: '16.5%' },
      { label: 'Color', value: 'Extra White / Platinum' },
      { label: 'Crystallization', value: 'Ultra-Slow (Pure Fructose)' },
      { label: 'Enzymes', value: 'Active Invertase' }
    ]
  },
  {
    id: 'hs-4',
    name: 'Wild Forest Intact Honeycomb Slab 350g',
    price: 690,
    category: 'wild-comb',
    categoryType: 'Honeycomb',
    categoryLabel: 'Raw Honeycombs',
    image: HONEY_ASSETS.pieces.comb,
    description: '100% edible natural honeycomb cut straight from the forest hive box. Chewable pure beeswax filled with raw aromatic honey.',
    origin: 'Western Ghats, Maharashtra',
    artisanCluster: 'Sahyadri Tribal Apiculture Guild',
    specs: [
      { label: 'Beeswax', value: '100% Natural Organic' },
      { label: 'Purity', value: 'Direct from Hive' },
      { label: 'Storage', value: 'Room Temp / Dark' },
      { label: 'Best Paired', value: 'Artisan Cheeses / Warm Toast' }
    ]
  },
  {
    id: 'hs-5',
    name: 'Western Ghats Dark Jamun Honey 500g',
    price: 520,
    category: 'medicinal',
    categoryType: 'Medicinal Honey',
    categoryLabel: 'Ayurvedic Reserve',
    image: HONEY_ASSETS.jamun,
    description: 'Gathered during the annual wild jamun blossoming. Deep burgundy amber with a distinct herbal tang, traditionally recommended in Ayurveda.',
    origin: 'Bhimashankar, Maharashtra',
    artisanCluster: 'Mahadeo Koli Gatherers Group',
    specs: [
      { label: 'Floral Source', value: 'Syzygium Cumini (Jamun)' },
      { label: 'Glycemic Index', value: 'Naturally Low' },
      { label: 'Antioxidants', value: 'Very High Polyphenols' },
      { label: 'Harvest', value: 'Wild Forest Reserve' }
    ]
  },
  {
    id: 'hs-6',
    name: 'Coorg Estate Coffee Blossom Honey 500g',
    price: 560,
    category: 'estate',
    categoryType: 'Estate Honey',
    categoryLabel: 'Estate Harvests',
    image: HONEY_ASSETS.coffee,
    description: 'Single-estate gourmet honey produced during the fragrant 4-day coffee blooming season across misty canopy plantations.',
    origin: 'Coorg, Karnataka',
    artisanCluster: 'Kodagu Coffee Planters Collective',
    specs: [
      { label: 'Aroma', value: 'White Jasmine & Roasted Cocoa' },
      { label: 'Harvest Window', value: '4 Days Only (Annual)' },
      { label: 'Texture', value: 'Creamy Velvety' },
      { label: 'Pairs With', value: 'Espresso / Pancakes / Granola' }
    ]
  }
];

export const HONEY_REELS: CraftReel[] = [
  {
    id: 'reel-h-1',
    reelNumber: 'REEL 01',
    duration: '0:38',
    craftType: 'TRIBAL CLIMB',
    title: 'The Honey Hunters of Biligiriranga Hills',
    location: 'BR Hills, Karnataka',
    posterImage: HONEY_ASSETS.nilgiri,
    price: 490,
    handle: '@vanamrit',
    soundTrack: 'Forest Canopy Birds & Bamboo Flute',
    artisanStory: 'Soliga tribal elders climb 60-foot jungle trees barefoot with natural smoke torches to harvest honey sustainably without harming the bee colonies.'
  },
  {
    id: 'reel-h-2',
    reelNumber: 'REEL 02',
    duration: '0:45',
    craftType: 'MANGROVE DAWN',
    title: 'Mouli Gatherers in the Tiger Forest',
    location: 'Sundarbans Delta, West Bengal',
    posterImage: HONEY_ASSETS.sundarbans,
    price: 640,
    handle: '@moulitribal',
    soundTrack: 'Tidal Waves & Mangrove Crickets',
    artisanStory: 'Braving mud flats and mangrove tides at low dawn, licensed Mouli gatherers harvest wild honeycombs under strict forest conservation quotas.'
  },
  {
    id: 'reel-h-3',
    reelNumber: 'REEL 03',
    duration: '0:32',
    craftType: 'ALPINE BLOOM',
    title: 'Acacia Blossom Gathering at Pahalgam',
    location: 'Lidder Valley, Kashmir',
    posterImage: HONEY_ASSETS.acacia,
    price: 780,
    handle: '@valleyhoney',
    soundTrack: 'Kashmiri Santoor & River Stream',
    artisanStory: 'High in the alpine pine meadows, white acacia blooms for just three weeks, yielding the purest water-clear honey in the world.'
  }
];

/* ==================================================================== */
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
  bowl: 'assets/images/craft-studios/coconut/coastal-01-bowl.jpg',
  lantern: 'assets/images/craft-studios/coconut/coastal-02-lantern.jpg',
  chalice: 'assets/images/craft-studios/coconut/coastal-03-chalice.jpg',
  cutlery: 'assets/images/craft-studios/coconut/coastal-04-cutlery.jpg',
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
