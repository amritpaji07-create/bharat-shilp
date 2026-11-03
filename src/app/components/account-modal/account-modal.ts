import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';
import { Order, Product } from '../../models/marketplace.model';

@Component({
  selector: 'app-account-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (market.isAccountModalOpen()) {
      <div 
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
        (click)="close()"
        (keydown.escape)="close()">
        
        <div 
          role="document"
          tabindex="0"
          class="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
          (click)="$event.stopPropagation()"
          (keydown)="$event.stopPropagation()">

          <!-- Header -->
          <div class="px-6 py-4 border-b border-slate-200 bg-[#F8F7F2] flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#15365B] text-white flex items-center justify-center font-bold text-sm">
                YK
              </div>
              <div>
                <h2 class="text-sm sm:text-base font-black text-[#15365B]">
                  Citizen Portal Dashboard · Yashdeep Kumar
                </h2>
                <div class="text-[11px] text-[#667085]">
                  Aadhaar Verified Citizen Account · Member since 2024
                </div>
              </div>
            </div>

            <button
              type="button"
              (click)="close()"
              class="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
              aria-label="Close modal">
              <mat-icon class="!w-5 !h-5 !text-[20px]">close</mat-icon>
            </button>
          </div>

          <!-- Account Navigation Tabs -->
          <div class="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-white overflow-x-auto text-xs font-semibold">
            <button
              type="button"
              (click)="activeTab.set('orders')"
              [class.text-[#176B45]]="activeTab() === 'orders'"
              [class.border-[#176B45]]="activeTab() === 'orders'"
              [class.text-[#667085]]="activeTab() !== 'orders'"
              [class.border-transparent]="activeTab() !== 'orders'"
              class="pb-2.5 border-b-2 hover:text-[#176B45] transition-colors whitespace-nowrap flex items-center gap-1.5">
              <mat-icon class="!w-4 !h-4 !text-[16px]">local_shipping</mat-icon>
              <span>My Orders & Speed Post Tracking ({{ market.orders().length }})</span>
            </button>

            <button
              type="button"
              (click)="activeTab.set('wishlist')"
              [class.text-[#176B45]]="activeTab() === 'wishlist'"
              [class.border-[#176B45]]="activeTab() === 'wishlist'"
              [class.text-[#667085]]="activeTab() !== 'wishlist'"
              [class.border-transparent]="activeTab() !== 'wishlist'"
              class="pb-2.5 border-b-2 hover:text-[#176B45] transition-colors whitespace-nowrap flex items-center gap-1.5">
              <mat-icon class="!w-4 !h-4 !text-[16px]">favorite_border</mat-icon>
              <span>Wishlist ({{ market.wishlistIds().length }})</span>
            </button>

            <button
              type="button"
              (click)="activeTab.set('grievance')"
              [class.text-[#176B45]]="activeTab() === 'grievance'"
              [class.border-[#176B45]]="activeTab() === 'grievance'"
              [class.text-[#667085]]="activeTab() !== 'grievance'"
              [class.border-transparent]="activeTab() !== 'grievance'"
              class="pb-2.5 border-b-2 hover:text-[#176B45] transition-colors whitespace-nowrap flex items-center gap-1.5">
              <mat-icon class="!w-4 !h-4 !text-[16px]">support_agent</mat-icon>
              <span>Grievance Redressal</span>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto flex-1">
            
            <!-- TAB: MY ORDERS -->
            @if (activeTab() === 'orders') {
              <div class="space-y-6">
                
                @if (selectedOrder(); as ord) {
                  <!-- Detailed Order Tracking Timeline Box -->
                  <div class="p-5 bg-[#F8F7F2] rounded-xl border border-slate-200 space-y-4">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-bold text-sm text-[#15365B]">Order #{{ ord.id }}</span>
                          <span class="bg-emerald-100 text-[#176B45] px-2 py-0.5 rounded text-[10px] font-bold">
                            {{ ord.status }}
                          </span>
                        </div>
                        <div class="text-[11px] text-[#667085] mt-0.5">
                          Placed on {{ ord.date }} · Payment: {{ ord.paymentMethod }}
                        </div>
                      </div>
                      <button
                        type="button"
                        (click)="selectedOrder.set(null)"
                        class="text-xs font-semibold text-[#176B45] hover:underline">
                        View All Orders
                      </button>
                    </div>

                    <!-- India Post Live Stepper -->
                    <div class="space-y-4 pt-2">
                      <div class="text-xs font-bold text-[#15365B] flex items-center gap-1.5">
                        <mat-icon class="!w-4 !h-4 !text-[16px] text-[#176B45]">timeline</mat-icon>
                        <span>India Post Speed Post Tracking Journey</span>
                      </div>

                      <div class="relative pl-6 space-y-4 border-l-2 border-[#176B45]/30 ml-2 text-xs">
                        @for (step of ord.trackingSteps; track step.title) {
                          <div class="relative">
                            <!-- Bullet Marker -->
                            <div 
                              [class.bg-[#176B45]]="step.completed"
                              [class.bg-slate-300]="!step.completed"
                              [class.ring-4]="step.current"
                              [class.ring-emerald-200]="step.current"
                              class="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white">
                            </div>

                            <div class="flex flex-col">
                              <span class="font-bold" [class.text-[#15365B]]="step.completed" [class.text-slate-400]="!step.completed">
                                {{ step.title }}
                              </span>
                              <span class="text-[11px] text-[#667085]">{{ step.location }}</span>
                              <span class="text-[10px] text-slate-400">{{ step.date }}</span>
                            </div>
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Items in this Order -->
                    <div class="pt-3 border-t border-slate-200 text-xs">
                      <div class="font-bold text-[#15365B] mb-2">Package Contents:</div>
                      <div class="space-y-2">
                        @for (it of ord.items; track it.product.id) {
                          <div class="flex items-center justify-between p-2 bg-white rounded border border-slate-100">
                            <div class="flex items-center gap-2">
                              <img [src]="it.product.primaryImage" alt="item" class="w-10 h-10 rounded object-cover"/>
                              <div>
                                <div class="font-semibold text-[#15365B]">{{ it.product.name }}</div>
                                <div class="text-[10px] text-[#667085]">Qty: {{ it.quantity }} · {{ it.product.sellerName }}</div>
                              </div>
                            </div>
                            <span class="font-bold tabular-nums">₹{{ it.product.price * it.quantity }}</span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                }

                <!-- Orders List -->
                <div class="space-y-3">
                  @for (order of market.orders(); track order.id) {
                    <div class="p-4 bg-white rounded-xl border border-slate-200 hover:border-[#176B45] transition-colors text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-bold text-[#15365B] text-sm">{{ order.id }}</span>
                          <span class="bg-emerald-50 text-[#176B45] border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                            {{ order.status }}
                          </span>
                        </div>
                        <div class="text-[#667085] mt-1">
                          {{ order.items.length }} Item(s) · Placed on {{ order.date }} · Total: <span class="font-bold text-[#15365B]">₹{{ order.total }}</span>
                        </div>
                        <div class="text-[11px] text-[#176B45] mt-1 font-medium">
                          Expected Delivery: {{ order.deliveryEstimate }}
                        </div>
                      </div>

                      <div class="flex items-center gap-2">
                        <button
                          type="button"
                          (click)="selectedOrder.set(order)"
                          class="px-3.5 py-1.5 bg-[#176B45] hover:bg-[#15365B] text-white font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                          <mat-icon class="!w-4 !h-4 !text-[16px]">local_shipping</mat-icon>
                          <span>Track Order</span>
                        </button>
                      </div>
                    </div>
                  }
                </div>

              </div>
            }

            <!-- TAB: WISHLIST -->
            @if (activeTab() === 'wishlist') {
              <div class="space-y-4">
                @if (wishlistProducts().length === 0) {
                  <div class="py-12 text-center text-xs text-[#667085]">
                    No saved items in your wishlist. Click the heart icon on any craft to save it here!
                  </div>
                } @else {
                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    @for (p of wishlistProducts(); track p.id) {
                      <div class="p-3 bg-white rounded-xl border border-slate-200 flex flex-col justify-between text-xs space-y-2">
                        <div class="aspect-4/3 rounded-lg overflow-hidden bg-slate-50">
                          <img [src]="p.primaryImage" [alt]="p.name" class="w-full h-full object-cover"/>
                        </div>
                        <div>
                          <div class="font-bold text-[#15365B] line-clamp-1">{{ p.name }}</div>
                          <div class="text-[11px] text-[#667085]">{{ p.sellerName }}</div>
                          <div class="font-black text-[#15365B] mt-1 text-sm tabular-nums">₹{{ p.price }}</div>
                        </div>
                        <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
                          <button
                            type="button"
                            (click)="addToCartFromWishlist(p)"
                            class="flex-1 py-1.5 bg-[#176B45] text-white font-bold rounded text-xs flex items-center justify-center gap-1">
                            <mat-icon class="!w-3.5 !h-3.5 !text-[15px]">add_shopping_cart</mat-icon>
                            <span>Move to Cart</span>
                          </button>
                          <button
                            type="button"
                            (click)="market.toggleWishlist(p.id)"
                            class="p-1.5 text-slate-400 hover:text-rose-600 rounded border border-slate-200">
                            <mat-icon class="!w-4 !h-4 !text-[16px]">delete</mat-icon>
                          </button>
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>
            }

            <!-- TAB: GRIEVANCE REDRESSAL -->
            @if (activeTab() === 'grievance') {
              <div class="space-y-4 text-xs max-w-lg">
                <div>
                  <h3 class="text-sm font-bold text-[#15365B]">CPGRAMS Government Grievance Redressal</h3>
                  <p class="text-[#667085] mt-0.5">
                    Centralized Public Grievance Redress and Monitoring System for artisan craft quality or dispatch concerns.
                  </p>
                </div>

                <div class="space-y-3">
                  <div>
                    <label for="grv-order" class="block font-semibold text-[#1D2939] mb-1">Related Order Number</label>
                    <select id="grv-order" class="w-full px-3 py-2 bg-[#F8F7F2] border border-slate-300 rounded-lg">
                      @for (o of market.orders(); track o.id) {
                        <option [value]="o.id">{{ o.id }} ({{ o.date }})</option>
                      }
                      <option value="other">General Platform Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label for="grv-category" class="block font-semibold text-[#1D2939] mb-1">Issue Category</label>
                    <select id="grv-category" class="w-full px-3 py-2 bg-[#F8F7F2] border border-slate-300 rounded-lg">
                      <option>Delivery Delay by Speed Post</option>
                      <option>Craft Item Replacement Request</option>
                      <option>GI Tag Verification Inquiry</option>
                      <option>Direct Benefit Payment Query</option>
                    </select>
                  </div>

                  <div>
                    <label for="grv-desc" class="block font-semibold text-[#1D2939] mb-1">Description of Grievance</label>
                    <textarea 
                      id="grv-desc"
                      rows="3" 
                      placeholder="Please describe your concern in detail..."
                      class="w-full px-3 py-2 bg-[#F8F7F2] border border-slate-300 rounded-lg focus:outline-none focus:border-[#176B45]"></textarea>
                  </div>

                  <button
                    type="button"
                    (click)="submitGrievance()"
                    class="px-5 py-2.5 bg-[#176B45] hover:bg-[#15365B] text-white font-bold rounded-lg transition-colors cursor-pointer">
                    Submit Formal Grievance
                  </button>
                </div>
              </div>
            }

          </div>

        </div>

      </div>
    }
  `
})
export class AccountModal {
  readonly market = inject(MarketplaceService);

  readonly activeTab = signal<'orders' | 'wishlist' | 'grievance'>('orders');
  readonly selectedOrder = signal<Order | null>(this.market.orders()[0] || null);

  readonly wishlistProducts = computed(() => {
    const ids = this.market.wishlistIds();
    return this.market.allProducts().filter(p => ids.includes(p.id));
  });

  addToCartFromWishlist(product: Product) {
    this.market.addToCart(product, 1);
  }

  submitGrievance() {
    this.market.showToast('Grievance logged under CPGRAMS Ticket #GR-2026-4410. Officer assigned.', 'success');
  }

  close() {
    this.market.toggleAccountModal(false);
  }
}
