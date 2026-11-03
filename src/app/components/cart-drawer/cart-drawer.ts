import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (market.isCartDrawerOpen()) {
      <div 
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        class="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
        (click)="close()"
        (keydown.escape)="close()">
        
        <div 
          role="document"
          tabindex="0"
          class="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between relative animate-in slide-in-from-right duration-200"
          (click)="$event.stopPropagation()"
          (keydown)="$event.stopPropagation()">
          
          <!-- Drawer Header -->
          <div class="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-[#F8F7F2]">
            <div class="flex items-center gap-2">
              <mat-icon class="!w-5 !h-5 !text-[20px] text-[#176B45]">shopping_bag</mat-icon>
              <h2 class="text-base font-bold text-[#15365B]">
                {{ market.currentLanguage() === 'en' ? 'Your Shopping Bag' : 'आपकी खरीदारी थैली' }}
              </h2>
              <span class="text-xs bg-emerald-100 text-[#176B45] font-extrabold px-2 py-0.5 rounded-full">
                {{ market.cartCount() }} items
              </span>
            </div>

            <button
              type="button"
              (click)="close()"
              class="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close cart">
              <mat-icon class="!w-5 !h-5 !text-[20px]">close</mat-icon>
            </button>
          </div>

          <!-- Free Delivery Progress Bar -->
          <div class="px-5 py-3 bg-emerald-50/70 border-b border-emerald-100 text-xs text-[#176B45]">
            @if (freeDeliveryDiff() <= 0) {
              <div class="flex items-center gap-1.5 font-bold">
                <mat-icon class="!w-4 !h-4 !text-[16px]">check_circle</mat-icon>
                <span>Congratulations! You unlocked FREE India Post Speed Post delivery</span>
              </div>
            } @else {
              <div class="space-y-1.5">
                <div class="flex items-center justify-between text-[11px] font-semibold">
                  <span>Add ₹{{ freeDeliveryDiff() }} more for FREE delivery</span>
                  <span>Threshold ₹499</span>
                </div>
                <div class="w-full bg-emerald-200/60 h-1.5 rounded-full overflow-hidden">
                  <div 
                    class="bg-[#176B45] h-full transition-all duration-300"
                    [style.width.%]="deliveryProgressPercent()">
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Drawer Body (Items List) -->
          <div class="flex-1 overflow-y-auto p-5 space-y-4">
            @if (market.cartItems().length === 0) {
              <!-- Empty Cart State -->
              <div class="py-16 text-center space-y-4">
                <div class="w-16 h-16 rounded-full bg-[#F8F7F2] text-[#667085] mx-auto flex items-center justify-center">
                  <mat-icon class="!w-8 !h-8 !text-[32px]">remove_shopping_cart</mat-icon>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-[#15365B]">Your shopping bag is empty</h3>
                  <p class="text-xs text-[#667085] mt-1 max-w-xs mx-auto">
                    Explore GI tagged handlooms, Bastar tribal crafts, and wild organic produce to empower local producers.
                  </p>
                </div>
                <button
                  type="button"
                  (click)="exploreProducts()"
                  class="px-5 py-2.5 bg-[#176B45] text-white text-xs font-bold rounded-lg hover:bg-[#15365B] transition-colors cursor-pointer">
                  Explore Products
                </button>
              </div>
            } @else {
              <!-- Cart Items -->
              @for (item of market.cartItems(); track item.product.id) {
                <div class="flex gap-3 pb-4 border-b border-slate-100 text-xs">
                  <!-- Thumbnail -->
                  <div class="w-18 h-18 rounded-lg overflow-hidden bg-[#F8F7F2] border border-slate-200 shrink-0">
                    <img [src]="item.product.primaryImage" [alt]="item.product.name" referrerpolicy="no-referrer" class="w-full h-full object-cover"/>
                  </div>

                  <!-- Details -->
                  <div class="flex-1 min-w-0 space-y-1">
                    <div class="flex items-start justify-between gap-1">
                      <h4 class="font-bold text-[#15365B] line-clamp-1 leading-snug">
                        {{ item.product.name }}
                      </h4>
                      <button
                        type="button"
                        (click)="removeItem(item.product.id)"
                        class="text-slate-400 hover:text-rose-600 p-0.5"
                        title="Remove item">
                        <mat-icon class="!w-4 !h-4 !text-[16px]">delete_outline</mat-icon>
                      </button>
                    </div>

                    <div class="text-[11px] text-[#667085] line-clamp-1">
                      By {{ item.product.sellerName }}
                    </div>

                    <!-- Quantity Stepper & Price -->
                    <div class="flex items-center justify-between pt-1">
                      <div class="flex items-center border border-slate-200 rounded-md overflow-hidden bg-white">
                        <button
                          type="button"
                          (click)="updateQty(item.product.id, -1)"
                          class="px-2 py-0.5 hover:bg-slate-100 text-slate-700 font-bold"
                          aria-label="Decrease quantity">
                          -
                        </button>
                        <span class="px-2.5 py-0.5 text-xs font-bold tabular-nums">{{ item.quantity }}</span>
                        <button
                          type="button"
                          (click)="updateQty(item.product.id, 1)"
                          class="px-2 py-0.5 hover:bg-slate-100 text-slate-700 font-bold"
                          aria-label="Increase quantity">
                          +
                        </button>
                      </div>

                      <div class="text-right">
                        <span class="font-black text-[#15365B] tabular-nums text-sm">
                          ₹{{ item.product.price * item.quantity }}
                        </span>
                        @if (item.product.originalPrice > item.product.price) {
                          <div class="text-[10px] text-[#667085] line-through tabular-nums">
                            ₹{{ item.product.originalPrice * item.quantity }}
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }

              <!-- Coupon Code Section -->
              <div class="pt-2">
                <div class="flex items-center gap-2">
                  <input
                    type="text"
                    [value]="couponInput()"
                    (input)="couponInput.set($any($event.target).value)"
                    placeholder="Enter Coupon (e.g. VOCALFORLOCAL)"
                    class="flex-1 px-3 py-2 text-xs uppercase bg-[#F8F7F2] border border-slate-200 rounded-lg focus:outline-none focus:border-[#176B45]"
                  />
                  <button
                    type="button"
                    (click)="applyCoupon()"
                    class="px-3.5 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
                    Apply
                  </button>
                </div>
                @if (market.couponCode()) {
                  <div class="mt-1.5 flex items-center justify-between text-[11px] text-[#176B45] font-semibold bg-emerald-50 px-2 py-1 rounded">
                    <span>Coupon "{{ market.couponCode() }}" applied (-₹{{ market.couponDiscount() }})</span>
                    <button type="button" (click)="market.removeCoupon()" class="text-rose-600 hover:underline">Remove</button>
                  </div>
                } @else {
                  <button
                    type="button"
                    (click)="quickApplyCoupon('VOCALFORLOCAL')"
                    class="mt-1.5 text-[11px] text-[#176B45] font-semibold hover:underline flex items-center gap-1">
                    <mat-icon class="!w-3 !h-3 !text-[12px]">local_offer</mat-icon>
                    <span>Use coupon <b>VOCALFORLOCAL</b> for 10% off</span>
                  </button>
                }
              </div>
            }
          </div>

          <!-- Drawer Footer (Total & Checkout) -->
          @if (market.cartItems().length > 0) {
            <div class="p-5 border-t border-slate-200 bg-[#F8F7F2] space-y-3">
              <!-- Itemized Bill -->
              <div class="text-xs space-y-1.5 text-[#667085]">
                <div class="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span class="font-semibold text-[#1D2939] tabular-nums">₹{{ market.cartSubtotal() }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Speed Post Delivery:</span>
                  @if (market.deliveryFee() === 0) {
                    <span class="font-bold text-emerald-700">FREE</span>
                  } @else {
                    <span class="font-semibold text-[#1D2939] tabular-nums">₹{{ market.deliveryFee() }}</span>
                  }
                </div>
                @if (market.couponDiscount() > 0) {
                  <div class="flex justify-between text-emerald-700 font-semibold">
                    <span>Vocal for Local Discount:</span>
                    <span class="tabular-nums">-₹{{ market.couponDiscount() }}</span>
                  </div>
                }
                <div class="flex justify-between text-[11px] text-amber-800 font-medium">
                  <span>Artisan Welfare Fund (1.5% Govt Pledged):</span>
                  <span class="tabular-nums">+₹{{ market.shgContribution() }} (Funded)</span>
                </div>
                <div class="flex justify-between text-sm font-black text-[#15365B] pt-2 border-t border-slate-200">
                  <span>Grand Total:</span>
                  <span class="text-base tabular-nums">₹{{ market.cartGrandTotal() }}</span>
                </div>
              </div>

              <!-- Checkout CTA -->
              <button
                type="button"
                (click)="proceedToCheckout()"
                class="w-full py-3 px-4 bg-[#176B45] hover:bg-[#15365B] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                <mat-icon class="!w-5 !h-5 !text-[20px]">lock</mat-icon>
                <span>Proceed to Secure Checkout</span>
              </button>

              <div class="text-center text-[10px] text-[#667085] flex items-center justify-center gap-2">
                <mat-icon class="!w-3 !h-3 !text-[12px] text-emerald-700">verified</mat-icon>
                <span>Government Secure Payment Gateway (UPI / RuPay / Cards)</span>
              </div>
            </div>
          }

        </div>

      </div>
    }
  `
})
export class CartDrawer {
  readonly market = inject(MarketplaceService);

  readonly couponInput = signal<string>('');

  readonly freeDeliveryDiff = computed(() => {
    return Math.max(0, 499 - this.market.cartSubtotal());
  });

  readonly deliveryProgressPercent = computed(() => {
    const subtotal = this.market.cartSubtotal();
    return Math.min(100, Math.round((subtotal / 499) * 100));
  });

  close() {
    this.market.toggleCartDrawer(false);
  }

  exploreProducts() {
    this.close();
    this.market.setView('catalogue');
  }

  updateQty(productId: string, delta: number) {
    this.market.updateCartQuantity(productId, delta);
  }

  removeItem(productId: string) {
    this.market.removeFromCart(productId);
  }

  applyCoupon() {
    if (this.couponInput().trim()) {
      this.market.applyCoupon(this.couponInput().trim());
      this.couponInput.set('');
    }
  }

  quickApplyCoupon(code: string) {
    this.market.applyCoupon(code);
  }

  proceedToCheckout() {
    this.close();
    this.market.toggleCheckoutModal(true);
  }
}
