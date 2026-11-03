import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-catalogue',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ProductCard],
  template: `
    <div class="max-w-[1320px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      
      <!-- Breadcrumb & Title -->
      <div class="mb-6 space-y-2">
        <nav class="flex items-center gap-2 text-xs text-[#667085]" aria-label="Breadcrumb">
          <button type="button" (click)="market.setView('home')" class="hover:text-[#176B45]">Home</button>
          <span>/</span>
          <button type="button" (click)="clearCategory()" class="hover:text-[#176B45]">All Handcrafted Collections</button>
          @if (market.filters().category !== 'all') {
            <span>/</span>
            <span class="font-bold text-[#15365B] capitalize">{{ currentCategoryName() }}</span>
          }
        </nav>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-black text-[#15365B]">
              {{ currentCategoryName() }}
            </h1>
            <p class="text-xs sm:text-sm text-[#667085] mt-0.5">
              Showing {{ market.filteredProducts().length }} verified authentic crafts from registered SHGs and cooperatives.
            </p>
          </div>

          <!-- Mobile Filter Button Trigger -->
          <button
            type="button"
            (click)="isMobileFilterOpen.set(true)"
            class="lg:hidden px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-[#15365B] flex items-center justify-center gap-1.5 shadow-xs self-start sm:self-auto cursor-pointer">
            <mat-icon class="!w-4 !h-4 !text-[18px] text-[#176B45]">tune</mat-icon>
            <span>Filters & Sort</span>
            @if (activeFilterCount() > 0) {
              <span class="w-4 h-4 rounded-full bg-[#176B45] text-white text-[10px] flex items-center justify-center">
                {{ activeFilterCount() }}
              </span>
            }
          </button>
        </div>
      </div>

      <!-- Main Layout: Left Sidebar Filters + Right Product Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Desktop Filter Sidebar -->
        <aside class="hidden lg:block lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 sticky top-20 shadow-xs space-y-6 text-xs">
          
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <span class="font-bold text-sm text-[#15365B] flex items-center gap-1.5">
              <mat-icon class="!w-4 !h-4 !text-[18px] text-[#176B45]">tune</mat-icon>
              <span>Filters</span>
            </span>
            @if (activeFilterCount() > 0) {
              <button 
                type="button"
                (click)="market.resetFilters()"
                class="text-[11px] font-semibold text-rose-600 hover:underline">
                Reset All
              </button>
            }
          </div>

          <!-- Category Selection -->
          <div class="space-y-2">
            <h4 class="font-bold text-xs text-[#1D2939] uppercase tracking-wider text-[11px]">Craft Category</h4>
            <div class="space-y-1.5">
              <button
                type="button"
                (click)="setCategory('all')"
                [class.font-bold]="market.filters().category === 'all'"
                [class.text-[#176B45]]="market.filters().category === 'all'"
                [class.text-[#667085]]="market.filters().category !== 'all'"
                class="w-full text-left py-1 hover:text-[#176B45] flex items-center justify-between">
                <span>All Categories</span>
                <span class="text-[10px] tabular-nums">({{ market.allProducts().length }})</span>
              </button>
              @for (cat of market.categories(); track cat.id) {
                <button
                  type="button"
                  (click)="setCategory(cat.slug)"
                  [class.font-bold]="market.filters().category === cat.slug"
                  [class.text-[#176B45]]="market.filters().category === cat.slug"
                  [class.text-[#667085]]="market.filters().category !== cat.slug"
                  class="w-full text-left py-1 hover:text-[#176B45] flex items-center justify-between">
                  <span class="truncate pr-2">{{ cat.name }}</span>
                  <span class="text-[10px] tabular-nums">({{ cat.count }})</span>
                </button>
              }
            </div>
          </div>

          <!-- Trust Badges Checkbox Filters -->
          <div class="space-y-2 pt-4 border-t border-slate-100">
            <h4 class="font-bold text-xs text-[#1D2939] uppercase tracking-wider text-[11px]">Certifications</h4>
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  [checked]="market.filters().onlyGI"
                  (change)="market.updateFilter('onlyGI', $any($event.target).checked)"
                  class="rounded text-[#176B45] focus:ring-[#176B45]"/>
                <span class="font-medium text-[#1D2939]">GI Tagged Products Only</span>
              </label>

              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  [checked]="market.filters().onlySHG"
                  (change)="market.updateFilter('onlySHG', $any($event.target).checked)"
                  class="rounded text-[#176B45] focus:ring-[#176B45]"/>
                <span class="font-medium text-[#1D2939]">Women SHG Produced Only</span>
              </label>

              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  [checked]="market.filters().onlyInStock"
                  (change)="market.updateFilter('onlyInStock', $any($event.target).checked)"
                  class="rounded text-[#176B45] focus:ring-[#176B45]"/>
                <span class="font-medium text-[#1D2939]">In Stock Immediately</span>
              </label>
            </div>
          </div>

          <!-- State / Region Filter -->
          <div class="space-y-2 pt-4 border-t border-slate-100">
            <h4 class="font-bold text-xs text-[#1D2939] uppercase tracking-wider text-[11px]">Origin State</h4>
            <select
              [value]="market.filters().state"
              (change)="market.updateFilter('state', $any($event.target).value)"
              class="w-full px-2.5 py-1.5 bg-[#F8F7F2] border border-slate-200 rounded-lg text-xs text-[#1D2939] focus:outline-none focus:border-[#176B45]">
              <option value="all">All States of India</option>
              @for (st of market.uniqueStates(); track st) {
                <option [value]="st">{{ st }}</option>
              }
            </select>
          </div>

          <!-- Price Range Slider -->
          <div class="space-y-2 pt-4 border-t border-slate-100">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-xs text-[#1D2939] uppercase tracking-wider text-[11px]">Max Price</h4>
              <span class="font-bold text-[#15365B] tabular-nums">₹{{ market.filters().maxPrice }}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="10000" 
              step="500"
              [value]="market.filters().maxPrice"
              (input)="market.updateFilter('maxPrice', +$any($event.target).value)"
              class="w-full accent-[#176B45] cursor-pointer"
            />
            <div class="flex justify-between text-[10px] text-[#667085]">
              <span>₹500</span>
              <span>₹10,000</span>
            </div>
          </div>

        </aside>

        <!-- Right: Catalog Area -->
        <main class="lg:col-span-9 space-y-4">
          
          <!-- Controls Bar: Search inside category + Sort dropdown + Active tags -->
          <div class="p-3.5 bg-white rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            
            <!-- Quick Search Input -->
            <div class="relative flex-1 min-w-[200px]">
              <input 
                type="text" 
                [value]="market.searchQuery()"
                (input)="market.setSearchQuery($any($event.target).value)"
                placeholder="Search within this collection..."
                class="w-full pl-8 pr-3 py-1.5 bg-[#F8F7F2] border border-slate-200 rounded-lg focus:outline-none focus:border-[#176B45] text-xs"
              />
              <mat-icon class="!w-4 !h-4 !text-[16px] text-slate-400 absolute left-2.5 top-2">search</mat-icon>
            </div>

            <!-- Sort By -->
            <div class="flex items-center gap-2">
              <span class="text-[#667085] hidden sm:inline">Sort:</span>
              <select
                [value]="market.filters().sortBy"
                (change)="market.updateFilter('sortBy', $any($event.target).value)"
                class="px-2.5 py-1.5 bg-[#F8F7F2] border border-slate-200 rounded-lg text-xs font-semibold text-[#15365B] focus:outline-none">
                <option value="featured">Featured Artisans</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>

          </div>

          <!-- Active Filter Chips (if any) -->
          @if (activeFilterCount() > 0) {
            <div class="flex flex-wrap items-center gap-2 text-xs">
              <span class="text-[#667085] text-[11px]">Active Filters:</span>
              @if (market.filters().category !== 'all') {
                <span class="inline-flex items-center gap-1 bg-white border border-slate-300 px-2.5 py-1 rounded-md text-[11px] font-medium text-[#15365B]">
                  <span>Category: {{ currentCategoryName() }}</span>
                  <button type="button" (click)="setCategory('all')" class="text-slate-400 hover:text-slate-600">×</button>
                </span>
              }
              @if (market.filters().onlyGI) {
                <span class="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px] font-bold text-[#176B45]">
                  <span>GI Certified</span>
                  <button type="button" (click)="market.updateFilter('onlyGI', false)" class="text-emerald-700 hover:text-emerald-900">×</button>
                </span>
              }
              @if (market.filters().onlySHG) {
                <span class="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md text-[11px] font-bold text-amber-900">
                  <span>Women SHG</span>
                  <button type="button" (click)="market.updateFilter('onlySHG', false)" class="text-amber-700 hover:text-amber-900">×</button>
                </span>
              }
              @if (market.filters().state !== 'all') {
                <span class="inline-flex items-center gap-1 bg-white border border-slate-300 px-2.5 py-1 rounded-md text-[11px] font-medium text-[#15365B]">
                  <span>State: {{ market.filters().state }}</span>
                  <button type="button" (click)="market.updateFilter('state', 'all')" class="text-slate-400 hover:text-slate-600">×</button>
                </span>
              }
              <button 
                type="button" 
                (click)="market.resetFilters()"
                class="text-[11px] text-[#176B45] font-bold hover:underline ml-1">
                Clear All
              </button>
            </div>
          }

          <!-- Product Grid -->
          @if (market.filteredProducts().length === 0) {
            <!-- Empty State -->
            <div class="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <div class="w-16 h-16 rounded-full bg-[#F8F7F2] text-slate-400 mx-auto flex items-center justify-center">
                <mat-icon class="!w-8 !h-8 !text-[32px]">inventory_2</mat-icon>
              </div>
              <h3 class="text-base font-bold text-[#15365B]">No matching artisan crafts found</h3>
              <p class="text-xs text-[#667085] max-w-sm mx-auto">
                Try widening your price range, clearing filters, or searching for other traditional crafts like "Saree" or "Honey".
              </p>
              <button
                type="button"
                (click)="market.resetFilters()"
                class="px-4 py-2 bg-[#176B45] text-white text-xs font-bold rounded-lg hover:bg-[#15365B] transition-colors cursor-pointer">
                Reset All Filters
              </button>
            </div>
          } @else {
            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              @for (prod of market.filteredProducts(); track prod.id) {
                <app-product-card [product]="prod" />
              }
            </div>
          }

        </main>

      </div>

      <!-- Mobile Filter Bottom Sheet Modal -->
      @if (isMobileFilterOpen()) {
        <div 
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          class="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center animate-in fade-in duration-200"
          (click)="isMobileFilterOpen.set(false)"
          (keydown.escape)="isMobileFilterOpen.set(false)">
          
          <div 
            role="document"
            tabindex="0"
            class="bg-white w-full rounded-t-2xl max-h-[85vh] overflow-y-auto p-5 space-y-5 animate-in slide-in-from-bottom duration-200"
            (click)="$event.stopPropagation()"
            (keydown)="$event.stopPropagation()">
            
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 class="font-black text-sm text-[#15365B]">Filters & Categories</h3>
              <button 
                type="button" 
                (click)="isMobileFilterOpen.set(false)" 
                class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <mat-icon class="!w-4 !h-4 !text-[18px]">close</mat-icon>
              </button>
            </div>

            <!-- Categories -->
            <div class="space-y-2 text-xs">
              <div class="font-bold text-[#15365B]">Category</div>
              <div class="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  (click)="setCategory('all')"
                  [class.bg-[#176B45]]="market.filters().category === 'all'"
                  [class.text-white]="market.filters().category === 'all'"
                  [class.bg-slate-100]="market.filters().category !== 'all'"
                  class="px-2.5 py-1.5 rounded-lg text-xs font-semibold">
                  All
                </button>
                @for (c of market.categories(); track c.id) {
                  <button
                    type="button"
                    (click)="setCategory(c.slug)"
                    [class.bg-[#176B45]]="market.filters().category === c.slug"
                    [class.text-white]="market.filters().category === c.slug"
                    [class.bg-slate-100]="market.filters().category !== c.slug"
                    class="px-2.5 py-1.5 rounded-lg text-xs font-semibold">
                    {{ c.name }}
                  </button>
                }
              </div>
            </div>

            <!-- Certifications -->
            <div class="space-y-2 text-xs pt-3 border-t border-slate-100">
              <div class="font-bold text-[#15365B]">Authenticity Credentials</div>
              <div class="space-y-2">
                <label class="flex items-center gap-2">
                  <input type="checkbox" [checked]="market.filters().onlyGI" (change)="market.updateFilter('onlyGI', $any($event.target).checked)"/>
                  <span>GI Tagged Authenticity Only</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="checkbox" [checked]="market.filters().onlySHG" (change)="market.updateFilter('onlySHG', $any($event.target).checked)"/>
                  <span>Self Help Group (SHG) Verified Only</span>
                </label>
              </div>
            </div>

            <div class="pt-4 flex gap-3">
              <button 
                type="button" 
                (click)="market.resetFilters()"
                class="flex-1 py-2.5 border border-slate-300 text-xs font-bold rounded-lg">
                Reset
              </button>
              <button 
                type="button" 
                (click)="isMobileFilterOpen.set(false)"
                class="flex-1 py-2.5 bg-[#176B45] text-white text-xs font-bold rounded-lg shadow-sm">
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      }

    </div>
  `
})
export class ProductCatalogue {
  readonly market = inject(MarketplaceService);

  readonly isMobileFilterOpen = signal<boolean>(false);

  readonly currentCategoryName = computed(() => {
    const slug = this.market.filters().category;
    if (slug === 'all') return 'All Handcrafted Collections';
    const found = this.market.categories().find(c => c.slug === slug);
    return found ? found.name : 'All Products';
  });

  readonly activeFilterCount = computed(() => {
    const f = this.market.filters();
    let count = 0;
    if (f.category !== 'all') count++;
    if (f.onlyGI) count++;
    if (f.onlySHG) count++;
    if (f.onlyInStock) count++;
    if (f.state !== 'all') count++;
    if (f.maxPrice < 10000) count++;
    return count;
  });

  setCategory(slug: string) {
    this.market.updateFilter('category', slug);
  }

  clearCategory() {
    this.market.updateFilter('category', 'all');
  }
}
