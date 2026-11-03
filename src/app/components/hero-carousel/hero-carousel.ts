import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

interface RegionalHighlight {
  id: string;
  name: string;
  tagline: string;
  avatar: string;
  stateQuery: string;
}

@Component({
  selector: 'app-hero-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- HERO: Full-bleed background image with left-side fade only -->
    <section class="relative overflow-hidden border-b border-[#E5E7EB] min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex items-center">

      <!-- Background Image — pure clean natural image, no fade overlays -->
      <img
        src="/assets/hero/hero_clean_bg.png"
        alt="Indian artisan crafting traditional products with scenic backdrop"
        class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        aria-hidden="true"
      />

      <!-- Content overlaid on background -->
      <div class="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          <!-- LEFT: Text, Headline & CTAs (Span 5) -->
          <div class="lg:col-span-5 flex flex-col justify-center space-y-4">

            <!-- Kicker with Flag -->
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold tracking-widest text-[#52525B] uppercase leading-none">
                INDIAN PRODUCTS &nbsp;•&nbsp; INDIAN PEOPLE &nbsp;•&nbsp; STRONGER INDIA
              </span>
              <div class="flex h-1.5 w-7 rounded overflow-hidden shrink-0 shadow-2xs">
                <div class="flex-1 bg-[#FF9933]"></div>
                <div class="flex-1 bg-white border-y border-slate-200"></div>
                <div class="flex-1 bg-[#138808]"></div>
              </div>
            </div>

            <!-- 3-Line Distinctive Colored Headline -->
            <h1 class="text-3xl sm:text-4xl lg:text-[2.85rem] font-black tracking-tight leading-[1.07] font-serif">
              <span class="block text-[#11233B]">Real People.</span>
              <span class="block text-[#0D5C3A]">Real Products.</span>
              <span class="block text-[#C25E1A]">A Stronger India.</span>
            </h1>

            <!-- Subheading -->
            <p class="text-[13px] sm:text-sm text-[#475467] max-w-sm leading-relaxed">
              {{ market.currentLanguage() === 'en'
                ? 'Discover authentic products from local artisans, Self Help Groups, rural entrepreneurs and traditional Indian communities.'
                : 'स्थानीय कारीगरों, स्वयं सहायता समूहों और ग्रामीण उद्यमियों से प्रमाणित विशुद्ध भारतीय उत्पादों की खोज करें।' }}
            </p>

            <!-- Action CTAs -->
            <div class="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                (click)="market.setView('catalogue')"
                class="px-5 py-3 bg-[#0D5C3A] hover:bg-[#09432A] text-white font-bold text-sm rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer group">
                <span>Explore Products</span>
                <mat-icon class="!w-4 !h-4 !text-[17px] group-hover:translate-x-0.5 transition-transform">arrow_forward</mat-icon>
              </button>
              <button
                type="button"
                (click)="isVideoModalOpen.set(true)"
                class="px-4 py-3 bg-white/95 hover:bg-white text-[#1D2939] font-bold text-sm rounded-lg border border-[#D0D5DD] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer">
                <mat-icon class="!w-5 !h-5 !text-[19px] text-[#0D5C3A]">play_circle</mat-icon>
                <span>Watch Our Story</span>
              </button>
            </div>

            <!-- Trust Stats Grid (Small cards with clean semi-transparent background) -->
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5 pt-3 border-t border-slate-300/60">
              <div class="flex items-center gap-2 p-2 rounded-xl bg-white/90 backdrop-blur-xs border border-white/80 shadow-xs hover:shadow-sm transition-shadow">
                <div class="w-7 h-7 rounded-lg bg-emerald-50 text-[#0D5C3A] flex items-center justify-center shrink-0 border border-emerald-100">
                  <mat-icon class="!w-4 !h-4 !text-[16px]">groups</mat-icon>
                </div>
                <div class="min-w-0">
                  <div class="font-extrabold text-[12px] text-[#11233B] leading-tight truncate">50,000+</div>
                  <div class="text-[9.5px] text-[#52525B] leading-tight truncate">Artisans &amp; SHGs</div>
                </div>
              </div>

              <div class="flex items-center gap-2 p-2 rounded-xl bg-white/90 backdrop-blur-xs border border-white/80 shadow-xs hover:shadow-sm transition-shadow">
                <div class="w-7 h-7 rounded-lg bg-amber-50 text-[#D97706] flex items-center justify-center shrink-0 border border-amber-100">
                  <mat-icon class="!w-4 !h-4 !text-[16px]">storefront</mat-icon>
                </div>
                <div class="min-w-0">
                  <div class="font-extrabold text-[12px] text-[#11233B] leading-tight truncate">10,000+</div>
                  <div class="text-[9.5px] text-[#52525B] leading-tight truncate">Verified Sellers</div>
                </div>
              </div>

              <div class="flex items-center gap-2 p-2 rounded-xl bg-white/90 backdrop-blur-xs border border-white/80 shadow-xs hover:shadow-sm transition-shadow">
                <div class="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-100">
                  <mat-icon class="!w-4 !h-4 !text-[16px]">verified</mat-icon>
                </div>
                <div class="min-w-0">
                  <div class="font-extrabold text-[12px] text-[#11233B] leading-tight truncate">1 Lakh+</div>
                  <div class="text-[9.5px] text-[#52525B] leading-tight truncate">Products</div>
                </div>
              </div>

              <div class="flex items-center gap-2 p-2 rounded-xl bg-white/90 backdrop-blur-xs border border-white/80 shadow-xs hover:shadow-sm transition-shadow">
                <div class="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 border border-rose-100">
                  <mat-icon class="!w-4 !h-4 !text-[16px]">shield</mat-icon>
                </div>
                <div class="min-w-0">
                  <div class="font-extrabold text-[12px] text-[#11233B] leading-tight truncate">Govt. Backed</div>
                  <div class="text-[9.5px] text-[#52525B] leading-tight truncate">Certified Platform</div>
                </div>
              </div>
            </div>

          </div>

          <!-- CENTER: Empty space so center artisan collage is visible (Span 3) -->
          <div class="hidden lg:block lg:col-span-3 min-h-[300px]"></div>

          <!-- RIGHT: Curved Arc Flow of Regional Cards (Span 4) -->
          <div class="lg:col-span-4 relative flex flex-col items-end space-y-3.5">

            <!-- 5 Curved Highlight Cards matching referred design -->
            @for (reg of regionalHighlights; track reg.id; let idx = $index) {
              <button
                type="button"
                (click)="filterByRegion(reg.stateQuery)"
                class="relative bg-white/95 hover:bg-white text-left rounded-full p-1.5 pr-4 border border-white/80 shadow-md hover:shadow-xl transition-all duration-200 flex items-center gap-3 group cursor-pointer w-[245px] sm:w-[265px]"
                [style.transform]="getCurvedOffset(idx)">
                
                <!-- Circular Avatar enlarged to overflow gracefully, while pill body remains same compact size -->
                <div class="relative w-15 h-15 -my-2.5 -ml-1 rounded-full overflow-hidden shrink-0 ring-3 ring-white shadow-md group-hover:scale-105 transition-transform bg-stone-100">
                  <img
                    [src]="reg.avatar"
                    [alt]="reg.name"
                    class="w-full h-full object-cover"
                  />
                  <!-- Pin icon on the top card -->
                  @if (idx === 0) {
                    <div class="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-white rounded-full flex items-center justify-center text-[#0D5C3A] shadow-xs">
                      <mat-icon class="!w-3 !h-3 !text-[12px]">location_on</mat-icon>
                    </div>
                  }
                </div>

                <!-- Text info -->
                <div class="flex-1 min-w-0 pr-0.5">
                  <div class="font-black text-[11px] text-[#11233B] group-hover:text-[#0D5C3A] tracking-wider uppercase leading-tight truncate">
                    {{ reg.name }}
                  </div>
                  <div class="text-[9.5px] text-[#667085] leading-tight truncate mt-0.5">
                    {{ reg.tagline }}
                  </div>
                </div>

                <!-- Subtle arrow circle (right) -->
                <div class="w-5 h-5 rounded-full bg-slate-100 group-hover:bg-[#0D5C3A] group-hover:text-white text-slate-500 flex items-center justify-center shrink-0 transition-colors">
                  <mat-icon class="!w-3 !h-3 !text-[12px]">arrow_forward</mat-icon>
                </div>
              </button>
            }

          </div>

        </div>
      </div>

      <!-- Video Story Modal -->
      @if (isVideoModalOpen()) {
        <div
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          class="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          (click)="isVideoModalOpen.set(false)"
          (keydown.escape)="isVideoModalOpen.set(false)">
          <div
            role="document"
            tabindex="0"
            class="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl p-6 space-y-4"
            (click)="$event.stopPropagation()"
            (keydown)="$event.stopPropagation()">

            <div class="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 class="font-black text-base text-[#11233B]">Our Story: Hands that Build India</h3>
              <button
                type="button"
                (click)="isVideoModalOpen.set(false)"
                class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200">
                <mat-icon class="!w-4 !h-4 !text-[18px]">close</mat-icon>
              </button>
            </div>

            <div class="aspect-16/9 rounded-xl overflow-hidden bg-slate-900 relative flex items-center justify-center">
              <img src="/assets/hero/hero_bg.png" alt="Artisan documentary" class="w-full h-full object-cover opacity-80"/>
              <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6 text-center space-y-3">
                <div class="w-16 h-16 rounded-full bg-[#0D5C3A] text-white flex items-center justify-center shadow-lg animate-pulse">
                  <mat-icon class="!w-8 !h-8 !text-[36px]">play_arrow</mat-icon>
                </div>
                <div class="text-sm font-bold">BharatHaat National Rural Livelihoods Documentary</div>
                <div class="text-xs text-white/80 max-w-md">
                  Witness how 50,000+ women Self Help Groups and tribal artisans in over 700 districts are transforming local economy through direct digital commerce.
                </div>
              </div>
            </div>

            <div class="text-xs text-[#667085] flex justify-between items-center">
              <span>Presented by Ministry of Rural Development &amp; TRIFED</span>
              <button
                type="button"
                (click)="isVideoModalOpen.set(false); market.setView('catalogue')"
                class="px-4 py-1.5 bg-[#0D5C3A] text-white font-bold rounded-lg text-xs">
                Explore Their Products
              </button>
            </div>

          </div>
        </div>
      }

    </section>
  `
})
export class HeroCarousel {
  readonly market = inject(MarketplaceService);
  readonly isVideoModalOpen = signal<boolean>(false);

  readonly regionalHighlights: RegionalHighlight[] = [
    {
      id: 'reg-himachal',
      name: 'HIMACHAL',
      tagline: 'Apples, Honey, Handicrafts',
      avatar: '/assets/hero/reg_himachal.jpg',
      stateQuery: 'Himachal Pradesh'
    },
    {
      id: 'reg-uttarakhand',
      name: 'UTTARAKHAND',
      tagline: 'Herbs, Handloom, Organic Products',
      avatar: '/assets/hero/reg_uttarakhand.jpg',
      stateQuery: 'Uttarakhand'
    },
    {
      id: 'reg-kashmir',
      name: 'JAMMU & KASHMIR',
      tagline: 'Shawls, Dry Fruits, Handicrafts',
      avatar: '/assets/hero/reg_kashmir.jpg',
      stateQuery: 'Jammu & Kashmir'
    },
    {
      id: 'reg-northeast',
      name: 'NORTH EAST',
      tagline: 'Handloom, Bamboo, Spices',
      avatar: '/assets/hero/reg_northeast.jpg',
      stateQuery: 'Assam'
    },
    {
      id: 'reg-rajasthan',
      name: 'RAJASTHAN',
      tagline: 'Handicrafts, Textiles, Home Decor',
      avatar: '/assets/hero/reg_rajasthan.jpg',
      stateQuery: 'Rajasthan'
    }
  ];

  getCurvedOffset(index: number): string {
    // Flipped / Opposite curve:
    // Himachal (top): indented into section (-26px)
    // Uttarakhand: slightly indented (-13px)
    // J&K (center): extends furthest right (0px)
    // North East: slightly indented (-13px)
    // Rajasthan (bottom): indented into section (-26px)
    const flippedOffsets = [-26, -13, 0, -13, -26];
    const x = flippedOffsets[index] ?? 0;
    return `translateX(${x}px)`;
  }

  filterByRegion(stateName: string) {
    this.market.updateFilter('state', stateName);
    this.market.setView('catalogue');
  }
}
