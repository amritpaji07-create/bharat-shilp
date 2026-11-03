import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <header class="bg-white sticky top-0 z-40 shadow-xs border-b border-[#E5E7EB]">
      
      <!-- Main Upper Header -->
      <div class="max-w-[1440px] mx-auto px-4 sm:px-8 py-3.5">
        <div class="flex items-center justify-between gap-4 md:gap-8">
          
          <!-- Logo: BharatHaat with Lotus Emblem -->
          <div class="flex items-center shrink-0">
            <button 
              type="button"
              (click)="market.setView('home')"
              class="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-[#0D5C3A]">
              
              <!-- Clean Stylized Lotus Logo Emblem -->
              <div class="w-10 h-10 flex items-center justify-center shrink-0">
                <svg class="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Lotus petals -->
                  <path d="M50 15C50 15 58 35 58 55C58 66 54 75 50 80C46 75 42 66 42 55C42 35 50 15 50 15Z" fill="#E67E22"/>
                  <path d="M50 25C50 25 68 40 70 60C71 70 65 77 58 80C60 70 58 55 50 45C50 45 50 35 50 25Z" fill="#D35400"/>
                  <path d="M50 25C50 25 32 40 30 60C29 70 35 77 42 80C40 70 42 55 50 45C50 45 50 35 50 25Z" fill="#F39C12"/>
                  <path d="M58 80C70 78 85 70 88 55C89 45 80 40 70 42C68 55 64 68 58 80Z" fill="#27AE60"/>
                  <path d="M42 80C30 78 15 70 12 55C11 45 20 40 30 42C32 55 36 68 42 80Z" fill="#2ECC71"/>
                  <path d="M30 80C40 85 60 85 70 80C65 86 55 88 50 88C45 88 35 86 30 80Z" fill="#1E8449"/>
                </svg>
              </div>

              <div class="flex flex-col">
                <span class="text-2xl sm:text-2xl font-black tracking-tight text-[#0D3B34] font-serif leading-none">
                  BharatHaat
                </span>
                <span class="text-[11px] text-[#0D5C3A] font-semibold tracking-wide mt-0.5">
                  Local Hands. Stronger India.
                </span>
              </div>
            </button>
          </div>

          <!-- Center: Search Bar with Category Dropdown & Green Search Button -->
          <div class="flex-1 max-w-2xl relative hidden md:block">
            <div class="flex items-center border border-[#D1D5DB] rounded-lg overflow-hidden bg-white focus-within:border-[#0D5C3A] focus-within:ring-1 focus-within:ring-[#0D5C3A] transition-all">
              
              <!-- Search Icon & Text Input -->
              <div class="pl-3.5 text-[#667085] flex items-center pointer-events-none">
                <mat-icon class="!w-5 !h-5 !text-[20px]">search</mat-icon>
              </div>

              <input
                type="text"
                [value]="market.searchQuery()"
                (input)="onSearchInput($event)"
                (focus)="showSuggestions.set(true)"
                (keydown.enter)="executeSearch()"
                placeholder="Search for handmade, organic, local, or government-certified products..."
                class="w-full pl-3 pr-2 py-2.5 text-xs sm:text-sm bg-transparent focus:outline-none text-[#1D2939] placeholder:text-[#667085]"
              />

              <!-- "All Categories ▾" Dropdown Trigger -->
              <div class="relative shrink-0 border-l border-[#E5E7EB] bg-slate-50/50">
                <select
                  [value]="market.filters().category"
                  (change)="onCategoryChange($any($event.target).value)"
                  class="px-3 py-2.5 text-xs font-semibold text-[#15365B] bg-transparent focus:outline-none cursor-pointer pr-7 appearance-none">
                  <option value="all">All Categories</option>
                  @for (c of market.categories(); track c.id) {
                    <option [value]="c.slug">{{ c.name }}</option>
                  }
                </select>
                <mat-icon class="!w-4 !h-4 !text-[16px] text-slate-400 absolute right-1.5 top-3 pointer-events-none">arrow_drop_down</mat-icon>
              </div>

              <!-- Green Search Button -->
              <button
                type="button"
                (click)="executeSearch()"
                class="px-4 py-2.5 bg-[#0D5C3A] hover:bg-[#09432A] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Search">
                <mat-icon class="!w-5 !h-5 !text-[20px]">search</mat-icon>
              </button>
            </div>

            <!-- Autocomplete Suggestions Dropdown -->
            @if (showSuggestions() && suggestions().length > 0) {
              <div 
                class="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E5E7EB] rounded-lg shadow-xl z-50 p-2 text-xs"
                (mouseleave)="showSuggestions.set(false)">
                <div class="px-3 py-1 font-semibold text-[#667085] uppercase tracking-wider text-[10px] flex items-center justify-between">
                  <span>Trending Artisan Searches</span>
                  <button type="button" (click)="showSuggestions.set(false)" class="text-slate-400 hover:text-slate-600">Close</button>
                </div>
                <div class="divide-y divide-slate-100">
                  @for (s of suggestions(); track s) {
                    <button
                      type="button"
                      (click)="pickSuggestion(s)"
                      class="w-full text-left px-3 py-2 hover:bg-slate-50 rounded flex items-center justify-between text-[#1D2939] cursor-pointer">
                      <span class="flex items-center gap-2">
                        <mat-icon class="!w-4 !h-4 !text-[16px] text-[#0D5C3A]">trending_up</mat-icon>
                        <span class="font-medium">{{ s }}</span>
                      </span>
                      <span class="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">Certified GI</span>
                    </button>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Right: Account, Wishlist, Cart -->
          <div class="flex items-center gap-4 sm:gap-6 shrink-0">
            
            <!-- Mobile Search Icon Trigger -->
            <button
              type="button"
              (click)="isMobileSearchOpen.set(!isMobileSearchOpen())"
              class="md:hidden p-2 text-[#0D3B34] hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Search">
              <mat-icon class="!w-5 !h-5 !text-[20px]">search</mat-icon>
            </button>

            <!-- Sign In / My Account -->
            <button
              type="button"
              (click)="market.openAccount('orders')"
              class="flex items-center gap-2 text-left hover:text-[#0D5C3A] transition-colors cursor-pointer group"
              [class.text-[#0D5C3A]]="market.currentView() === 'account'"
              title="Sign In / My Account">
              <div 
                class="w-8 h-8 rounded-full border flex items-center justify-center transition-colors"
                [class.border-[#0D5C3A]]="market.currentView() === 'account'"
                [class.bg-[#0D5C3A]/10]="market.currentView() === 'account'"
                [class.text-[#0D5C3A]]="market.currentView() === 'account'"
                [class.border-slate-300]="market.currentView() !== 'account'"
                [class.text-[#15365B]]="market.currentView() !== 'account'"
                [class.group-hover:border-[#0D5C3A]]="market.currentView() !== 'account'">
                <mat-icon class="!w-5 !h-5 !text-[20px]">person_outline</mat-icon>
              </div>
              <div class="hidden sm:flex flex-col text-xs leading-none">
                <span class="font-bold text-[#15365B] group-hover:text-[#0D5C3A]" [class.text-[#0D5C3A]]="market.currentView() === 'account'">Yashdeep</span>
                <span class="text-[10px] text-[#667085] mt-0.5">My Account</span>
              </div>
            </button>

            <!-- Wishlist -->
            <button
              type="button"
              (click)="market.setView('wishlist')"
              class="flex items-center gap-1.5 text-left hover:text-[#0D5C3A] transition-colors cursor-pointer"
              title="Saved Items">
              <div class="relative">
                <mat-icon class="!w-6 !h-6 !text-[22px] text-[#15365B]">favorite_border</mat-icon>
                @if (market.wishlistIds().length > 0) {
                  <span class="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#E67E22] text-white text-[9px] font-bold flex items-center justify-center">
                    {{ market.wishlistIds().length }}
                  </span>
                }
              </div>
              <span class="text-xs font-bold text-[#15365B] hidden lg:inline">Wishlist</span>
            </button>

            <!-- Cart with Orange Badge '3' -->
            <button
              type="button"
              (click)="market.toggleCartDrawer(true)"
              class="flex items-center gap-2 text-left hover:text-[#0D5C3A] transition-colors cursor-pointer"
              title="Shopping Cart">
              <div class="relative">
                <mat-icon class="!w-6 !h-6 !text-[24px] text-[#15365B]">shopping_cart</mat-icon>
                <span class="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#E67E22] text-white text-[10px] font-black flex items-center justify-center leading-none shadow-xs">
                  {{ market.cartCount() > 0 ? market.cartCount() : 3 }}
                </span>
              </div>
              <span class="text-xs font-bold text-[#15365B] hidden lg:inline">Cart</span>
            </button>

          </div>

        </div>

        <!-- Mobile Search Dropdown -->
        @if (isMobileSearchOpen()) {
          <div class="mt-3 pt-3 border-t border-slate-100 md:hidden">
            <div class="relative flex items-center">
              <input
                type="text"
                [value]="market.searchQuery()"
                (input)="onSearchInput($event)"
                (keydown.enter)="executeSearch()"
                placeholder="Search products, GI crafts, SHGs..."
                class="w-full pl-9 pr-16 py-2 text-xs bg-[#F8F7F2] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0D5C3A]"
              />
              <div class="absolute left-2.5 text-slate-400">
                <mat-icon class="!w-4 !h-4 !text-[16px]">search</mat-icon>
              </div>
              <button
                type="button"
                (click)="executeSearch()"
                class="absolute right-1 px-3 py-1 bg-[#0D5C3A] text-white text-[11px] font-bold rounded">
                Search
              </button>
            </div>
          </div>
        }
      </div>

      <!-- Secondary Subnavigation Menu -->
      <nav class="border-t border-[#E5E7EB] bg-white text-xs font-medium text-[#1D2939] hidden md:block">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between overflow-x-auto no-scrollbar">
          
          <div class="flex items-center gap-1">
            <button 
              type="button" 
              (click)="market.setView('catalogue')"
              class="px-3 py-2.5 hover:text-[#0D5C3A] font-semibold flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap">
              <span>All Products</span>
              <mat-icon class="!w-3.5 !h-3.5 !text-[14px] text-slate-400">keyboard_arrow_down</mat-icon>
            </button>

            <button 
              type="button" 
              (click)="market.selectCategory('handicrafts-pottery')"
              class="px-3 py-2.5 hover:text-[#0D5C3A] flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap">
              <span>Handicrafts</span>
              <mat-icon class="!w-3.5 !h-3.5 !text-[14px] text-slate-400">keyboard_arrow_down</mat-icon>
            </button>

            <button 
              type="button" 
              (click)="market.selectCategory('handloom-textiles')"
              class="px-3 py-2.5 hover:text-[#0D5C3A] flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap">
              <span>Handloom & Textiles</span>
              <mat-icon class="!w-3.5 !h-3.5 !text-[14px] text-slate-400">keyboard_arrow_down</mat-icon>
            </button>

            <button 
              type="button" 
              (click)="market.selectCategory('organic-food')"
              class="px-3 py-2.5 hover:text-[#0D5C3A] flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap">
              <span>Food & Beverages</span>
              <mat-icon class="!w-3.5 !h-3.5 !text-[14px] text-slate-400">keyboard_arrow_down</mat-icon>
            </button>

            <button 
              type="button" 
              (click)="market.selectCategory('organic-food')"
              class="px-3 py-2.5 hover:text-[#0D5C3A] flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap">
              <span>Organic & Natural</span>
              <mat-icon class="!w-3.5 !h-3.5 !text-[14px] text-slate-400">keyboard_arrow_down</mat-icon>
            </button>

            <button 
              type="button" 
              (click)="market.selectCategory('handicrafts-pottery')"
              class="px-3 py-2.5 hover:text-[#0D5C3A] flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap">
              <span>Home & Living</span>
              <mat-icon class="!w-3.5 !h-3.5 !text-[14px] text-slate-400">keyboard_arrow_down</mat-icon>
            </button>

            <button 
              type="button" 
              (click)="market.setView('catalogue')"
              class="px-3 py-2.5 hover:text-[#0D5C3A] flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap">
              <span>Regional Collections</span>
              <mat-icon class="!w-3.5 !h-3.5 !text-[14px] text-slate-400">keyboard_arrow_down</mat-icon>
            </button>

            <button 
              type="button" 
              (click)="market.setView('sellers')"
              class="px-3 py-2.5 hover:text-[#0D5C3A] transition-colors cursor-pointer whitespace-nowrap">
              <span>Our Sellers</span>
            </button>

            <button 
              type="button" 
              (click)="market.setView('craft-map')"
              class="px-3 py-2.5 font-bold flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
              [class.text-[#0D5C3A]]="market.currentView() === 'craft-map'"
              [class.hover:text-[#0D5C3A]]="market.currentView() !== 'craft-map'">
              <mat-icon class="!w-3.5 !h-3.5 !text-[15px] text-[#0D5C3A]">map</mat-icon>
              <span>Craft Map</span>
            </button>

            <button 
              type="button" 
              (click)="market.setView('initiatives')"
              class="px-3 py-2.5 hover:text-[#0D5C3A] transition-colors cursor-pointer whitespace-nowrap">
              <span>Government Initiatives</span>
            </button>
          </div>

        </div>
      </nav>

    </header>
  `
})
export class Header {
  readonly market = inject(MarketplaceService);

  readonly isMobileSearchOpen = signal<boolean>(false);
  readonly showSuggestions = signal<boolean>(false);

  readonly suggestions = signal<string[]>([
    'Chanderi Silk Saree',
    'Bastar Dhokra Brass',
    'Wild Forest Honey',
    'Jaipur Blue Pottery',
    'Kashmiri Pashmina Shawl',
    'Channapatna Wooden Toys'
  ]);

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.market.setSearchQuery(value);
  }

  onCategoryChange(catSlug: string) {
    this.market.selectCategory(catSlug);
  }

  executeSearch() {
    this.showSuggestions.set(false);
    this.isMobileSearchOpen.set(false);
    this.market.setView('catalogue');
  }

  pickSuggestion(text: string) {
    this.market.setSearchQuery(text);
    this.showSuggestions.set(false);
    this.market.setView('catalogue');
  }
}
