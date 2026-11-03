import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mobile-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Mobile Fixed Bottom Navigation Bar (Height ~54px, < 15% mobile viewport) -->
    <nav 
      class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5"
      aria-label="Mobile Navigation">
      <div class="grid grid-cols-5 gap-1 text-[10px] font-bold text-center">
        
        <!-- Home -->
        <button
          type="button"
          (click)="market.setView('home')"
          [class.text-[#176B45]]="market.currentView() === 'home'"
          [class.text-[#667085]]="market.currentView() !== 'home'"
          class="flex flex-col items-center py-1 rounded transition-colors cursor-pointer">
          <mat-icon class="!w-5 !h-5 !text-[20px]">home</mat-icon>
          <span class="mt-0.5">Home</span>
        </button>

        <!-- Catalogue / All Products -->
        <button
          type="button"
          (click)="market.setView('catalogue')"
          [class.text-[#176B45]]="market.currentView() === 'catalogue'"
          [class.text-[#667085]]="market.currentView() !== 'catalogue'"
          class="flex flex-col items-center py-1 rounded transition-colors cursor-pointer">
          <mat-icon class="!w-5 !h-5 !text-[20px]">storefront</mat-icon>
          <span class="mt-0.5">Products</span>
        </button>

        <!-- Wishlist -->
        <button
          type="button"
          (click)="market.setView('wishlist')"
          [class.text-[#176B45]]="market.currentView() === 'wishlist'"
          [class.text-[#667085]]="market.currentView() !== 'wishlist'"
          class="flex flex-col items-center py-1 rounded transition-colors relative cursor-pointer">
          <mat-icon class="!w-5 !h-5 !text-[20px]">favorite_border</mat-icon>
          <span class="mt-0.5">Wishlist</span>
          @if (market.wishlistIds().length > 0) {
            <span class="absolute top-0.5 right-4 w-3.5 h-3.5 rounded-full bg-[#D99A32] text-white text-[9px] font-black flex items-center justify-center">
              {{ market.wishlistIds().length }}
            </span>
          }
        </button>

        <!-- Cart -->
        <button
          type="button"
          (click)="market.toggleCartDrawer(true)"
          class="flex flex-col items-center py-1 rounded transition-colors relative cursor-pointer text-[#667085]">
          <mat-icon class="!w-5 !h-5 !text-[20px] text-[#176B45]">shopping_bag</mat-icon>
          <span class="mt-0.5 text-[#176B45]">Bag</span>
          @if (market.cartCount() > 0) {
            <span class="absolute top-0.5 right-4 min-w-3.5 h-3.5 px-0.5 rounded-full bg-[#176B45] text-white text-[9px] font-black flex items-center justify-center">
              {{ market.cartCount() }}
            </span>
          }
        </button>

        <!-- Account / Orders -->
        <button
          type="button"
          (click)="market.openAccount('orders')"
          [class.text-[#176B45]]="market.currentView() === 'account'"
          [class.text-[#667085]]="market.currentView() !== 'account'"
          class="flex flex-col items-center py-1 rounded transition-colors cursor-pointer">
          <mat-icon class="!w-5 !h-5 !text-[20px]">person_outline</mat-icon>
          <span class="mt-0.5">Account</span>
        </button>

      </div>
    </nav>
  `
})
export class MobileNav {
  readonly market = inject(MarketplaceService);
}
