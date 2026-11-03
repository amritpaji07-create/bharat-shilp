import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

interface CategoryItem {
  id: string;
  name: string;
  hindiName: string;
  slug: string;
  iconImg: string;
  itemCount: string;
}

@Component({
  selector: 'app-category-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section class="bg-[#FAF8F5] border-y border-[#E8E4DC] py-7 sm:py-9 relative select-none" aria-label="Artisan Product Categories">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header with Quick Context -->
        <div class="flex items-center justify-between mb-5 sm:mb-6">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-4.5 bg-[#0D5C3A] rounded-full inline-block"></span>
            <h2 class="text-sm sm:text-base font-extrabold text-[#15365B] uppercase tracking-wider">
              {{ market.currentLanguage() === 'hi' ? 'शिल्प श्रेणियों द्वारा खोजें' : 'Explore by Craft Category' }}
            </h2>
            <span class="hidden sm:inline-block text-xs text-[#667085]">
              (Direct from 500+ Rural Cooperatives)
            </span>
          </div>

          <button
            type="button"
            (click)="market.setView('catalogue')"
            class="text-xs font-bold text-[#0D5C3A] hover:text-[#15365B] flex items-center gap-1 transition-colors cursor-pointer group">
            <span>{{ market.currentLanguage() === 'hi' ? 'सभी देखें' : 'View All Crafts' }}</span>
            <mat-icon class="!w-3.5 !h-3.5 !text-[15px] group-hover:translate-x-0.5 transition-transform">arrow_forward</mat-icon>
          </button>
        </div>

        <!-- Carousel Wrapper with Left & Right Floating Controls -->
        <div class="relative flex items-center">
          
          <!-- Left Carousel Navigation Button -->
          <button
            type="button"
            (click)="scrollLeft()"
            class="hidden md:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#DDD6C8] hover:border-[#0D5C3A] hover:bg-[#0D5C3A] hover:text-white text-[#15365B] shadow-sm hover:shadow-md items-center justify-center shrink-0 transition-all duration-200 cursor-pointer z-10 -ml-2"
            aria-label="Scroll left category items">
            <mat-icon class="!w-5 !h-5 !text-[20px]">chevron_left</mat-icon>
          </button>

          <!-- Smooth Overflow Scroller with Snap Support -->
          <div 
            id="category-scroller"
            class="flex-1 flex items-start gap-4 sm:gap-6 lg:gap-7 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 snap-x">
            
            @for (cat of categoryItems; track cat.id) {
              <button
                type="button"
                (click)="selectCategory(cat.slug)"
                class="flex flex-col items-center group text-center shrink-0 snap-start cursor-pointer w-[86px] sm:w-[104px] lg:w-[112px] focus-visible:outline-[#0D5C3A] focus-visible:outline-2 rounded-2xl p-1 transition-transform"
                [attr.aria-label]="cat.name">
                
                <!-- Circular Avatar Frame with High-Res Photography -->
                <div 
                  class="w-18 h-18 sm:w-21 sm:h-21 lg:w-23 lg:h-23 rounded-full bg-white overflow-hidden p-1 shadow-xs group-hover:shadow-lg transition-all duration-300 relative group-hover:-translate-y-1.5"
                  [class.ring-3]="isSelected(cat.slug)"
                  [class.ring-[#0D5C3A]]="isSelected(cat.slug)"
                  [class.ring-offset-2]="isSelected(cat.slug)"
                  [class.ring-offset-[#FAF8F5]]="isSelected(cat.slug)"
                  [class.ring-2]="!isSelected(cat.slug)"
                  [class.ring-[#E5E0D5]]="!isSelected(cat.slug)"
                  [class.group-hover:ring-[#0D5C3A]]="!isSelected(cat.slug)">
                  
                  <!-- Circular Image Cut with Scale Hover Animation -->
                  <div class="w-full h-full rounded-full overflow-hidden bg-[#FBF9F5] flex items-center justify-center">
                    <img
                      [src]="cat.iconImg"
                      [alt]="cat.name"
                      class="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                      loading="lazy"
                      referrerpolicy="no-referrer"
                    />
                  </div>

                  <!-- Active Selection Ping Badge -->
                  @if (isSelected(cat.slug)) {
                    <span class="absolute bottom-1 right-1 w-3.5 h-3.5 bg-[#0D5C3A] border-2 border-white rounded-full"></span>
                  }
                </div>

                <!-- Category Name Label (Fixed height to guarantee baseline alignment) -->
                <div class="h-9 sm:h-10 mt-2.5 flex items-center justify-center px-0.5">
                  <span 
                    class="text-[11px] sm:text-xs font-bold leading-tight line-clamp-2 transition-colors"
                    [class.text-[#0D5C3A]]="isSelected(cat.slug)"
                    [class.text-[#15365B]]="!isSelected(cat.slug)"
                    [class.group-hover:text-[#0D5C3A]]="!isSelected(cat.slug)">
                    {{ market.currentLanguage() === 'hi' ? cat.hindiName : cat.name }}
                  </span>
                </div>

                <!-- Quiet Craft Volume Badge -->
                <span class="text-[10px] text-[#78716C] font-semibold mt-0.5 group-hover:text-[#0D5C3A] transition-colors">
                  {{ cat.itemCount }}
                </span>

              </button>
            }

          </div>

          <!-- Right Carousel Navigation Button -->
          <button
            type="button"
            (click)="scrollRight()"
            class="hidden md:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#DDD6C8] hover:border-[#0D5C3A] hover:bg-[#0D5C3A] hover:text-white text-[#15365B] shadow-sm hover:shadow-md items-center justify-center shrink-0 transition-all duration-200 cursor-pointer z-10 -mr-2"
            aria-label="Scroll right category items">
            <mat-icon class="!w-5 !h-5 !text-[20px]">chevron_right</mat-icon>
          </button>

        </div>

      </div>
    </section>
  `
})
export class CategoryGrid {
  readonly market = inject(MarketplaceService);

  readonly categoryItems: CategoryItem[] = [
    {
      id: 'cat-handicrafts',
      name: 'Handicrafts',
      hindiName: 'हस्तशिल्प',
      slug: 'handicrafts-pottery',
      iconImg: '/assets/images/cat_handicraft_wood_1793598197065.jpg',
      itemCount: '184 Crafts'
    },
    {
      id: 'cat-handloom',
      name: 'Handloom & Textiles',
      hindiName: 'हथकरघा एवं वस्त्र',
      slug: 'handloom-textiles',
      iconImg: '/assets/images/category_handloom_saree_1793447459310.jpg',
      itemCount: '248 Weaves'
    },
    {
      id: 'cat-food',
      name: 'Food & Beverages',
      hindiName: 'खाद्य एवं पेय',
      slug: 'organic-food',
      iconImg: '/assets/images/category_organic_honey_1793447459115.jpg',
      itemCount: '190 Forest Items'
    },
    {
      id: 'cat-organic',
      name: 'Organic Products',
      hindiName: 'जैविक उत्पाद',
      slug: 'organic-food',
      iconImg: '/assets/images/cold_pressed_oil_ayurveda_1793450792142.jpg',
      itemCount: '310 Certified'
    },
    {
      id: 'cat-homeliving',
      name: 'Home & Living',
      hindiName: 'गृह सज्जा',
      slug: 'tribal-metalcraft',
      iconImg: '/assets/images/category_brass_dhokra_1793447459537.jpg',
      itemCount: '142 Decor Items'
    },
    {
      id: 'cat-agri',
      name: 'Agriculture Spices',
      hindiName: 'कृषि एवं मसाले',
      slug: 'organic-food',
      iconImg: '/assets/images/cat_spices_agri_1793598210912.jpg',
      itemCount: '215 GI Spices'
    },
    {
      id: 'cat-beauty',
      name: 'Beauty & Wellness',
      hindiName: 'सौंदर्य एवं आरोग्य',
      slug: 'ayurveda-wellness',
      iconImg: '/assets/images/cold_pressed_oil_ayurveda_1793450792142.jpg',
      itemCount: '96 Ayurvedic'
    },
    {
      id: 'cat-tribal',
      name: 'Tribal Crafts',
      hindiName: 'जनजातीय शिल्प',
      slug: 'tribal-metalcraft',
      iconImg: '/assets/images/cat_tribal_craft_1793598233574.jpg',
      itemCount: '120 Dhokra Casts'
    },
    {
      id: 'cat-stationery',
      name: 'Stationery & Paper',
      hindiName: 'हस्तनिर्मित स्टेशनरी',
      slug: 'handicrafts-pottery',
      iconImg: '/assets/images/cat_stationery_paper_1793598247640.jpg',
      itemCount: '75 Handmade'
    },
    {
      id: 'cat-art',
      name: 'Traditional Art',
      hindiName: 'पारंपरिक कला',
      slug: 'traditional-art',
      iconImg: '/assets/images/madhubani_folk_painting_1793450790489.jpg',
      itemCount: '88 Paintings'
    },
    {
      id: 'cat-pottery',
      name: 'Blue Pottery',
      hindiName: 'जयपुर ब्लू पॉटरी',
      slug: 'handicrafts-pottery',
      iconImg: '/assets/images/jaipur_blue_pottery_1793450789528.jpg',
      itemCount: '110 Ceramic'
    },
    {
      id: 'cat-toys',
      name: 'Wooden Toys',
      hindiName: 'काष्ठ खिलौने',
      slug: 'handicrafts-pottery',
      iconImg: '/assets/images/channapatna_wooden_toys_1793450789922.jpg',
      itemCount: '95 Lacquer Toys'
    }
  ];

  isSelected(slug: string): boolean {
    return this.market.filters().category === slug && this.market.currentView() === 'catalogue';
  }

  selectCategory(slug: string) {
    this.market.selectCategory(slug);
  }

  scrollLeft() {
    const el = document.getElementById('category-scroller');
    if (el) {
      el.scrollBy({ left: -260, behavior: 'smooth' });
    }
  }

  scrollRight() {
    const el = document.getElementById('category-scroller');
    if (el) {
      el.scrollBy({ left: 260, behavior: 'smooth' });
    }
  }
}
