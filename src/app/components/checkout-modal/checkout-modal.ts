import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';
import { Address, Order } from '../../models/marketplace.model';

@Component({
  selector: 'app-checkout-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (market.isCheckoutModalOpen()) {
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
          class="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[94vh]"
          (click)="$event.stopPropagation()"
          (keydown)="$event.stopPropagation()">

          <!-- Checkout Header & Step Progress Bar -->
          <div class="px-5 py-4 border-b border-slate-200 bg-[#F8F7F2]">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <mat-icon class="!w-5 !h-5 !text-[20px] text-[#176B45]">lock</mat-icon>
                <h2 class="text-base font-black text-[#15365B]">
                  Government Secure Checkout
                </h2>
              </div>
              <button
                type="button"
                (click)="close()"
                class="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
                aria-label="Close checkout">
                <mat-icon class="!w-4 !h-4 !text-[18px]">close</mat-icon>
              </button>
            </div>

            <!-- Steps Indicator -->
            <div class="grid grid-cols-4 gap-2 text-center text-xs">
              <div 
                [class.text-[#176B45]]="currentStep() >= 1"
                [class.font-bold]="currentStep() === 1"
                [class.text-[#667085]]="currentStep() < 1"
                class="flex flex-col items-center gap-1">
                <div 
                  [class.bg-[#176B45]]="currentStep() >= 1"
                  [class.text-white]="currentStep() >= 1"
                  [class.bg-slate-200]="currentStep() < 1"
                  class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold">1</div>
                <span class="text-[11px] truncate max-w-full">Address</span>
              </div>

              <div 
                [class.text-[#176B45]]="currentStep() >= 2"
                [class.font-bold]="currentStep() === 2"
                [class.text-[#667085]]="currentStep() < 2"
                class="flex flex-col items-center gap-1">
                <div 
                  [class.bg-[#176B45]]="currentStep() >= 2"
                  [class.text-white]="currentStep() >= 2"
                  [class.bg-slate-200]="currentStep() < 2"
                  class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold">2</div>
                <span class="text-[11px] truncate max-w-full">Review</span>
              </div>

              <div 
                [class.text-[#176B45]]="currentStep() >= 3"
                [class.font-bold]="currentStep() === 3"
                [class.text-[#667085]]="currentStep() < 3"
                class="flex flex-col items-center gap-1">
                <div 
                  [class.bg-[#176B45]]="currentStep() >= 3"
                  [class.text-white]="currentStep() >= 3"
                  [class.bg-slate-200]="currentStep() < 3"
                  class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold">3</div>
                <span class="text-[11px] truncate max-w-full">Payment</span>
              </div>

              <div 
                [class.text-[#176B45]]="currentStep() === 4"
                [class.font-bold]="currentStep() === 4"
                [class.text-[#667085]]="currentStep() < 4"
                class="flex flex-col items-center gap-1">
                <div 
                  [class.bg-[#176B45]]="currentStep() === 4"
                  [class.text-white]="currentStep() === 4"
                  [class.bg-slate-200]="currentStep() < 4"
                  class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold">4</div>
                <span class="text-[11px] truncate max-w-full">Success</span>
              </div>
            </div>
          </div>

          <!-- Checkout Body -->
          <div class="p-5 sm:p-6 overflow-y-auto flex-1">
            
            <!-- STEP 1: Address Selection & Form -->
            @if (currentStep() === 1) {
              <div class="space-y-4">
                <h3 class="text-sm font-bold text-[#15365B]">Select Delivery Address (India Post Speed Post)</h3>
                
                <!-- Saved Default Address Card -->
                <div class="p-4 rounded-xl border-2 border-[#176B45] bg-emerald-50/40 space-y-2 text-xs relative">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-[#15365B] text-sm">{{ address().fullName }}</span>
                    <span class="bg-[#176B45] text-white px-2 py-0.5 rounded text-[10px] font-bold">DEFAULT (HOME)</span>
                  </div>
                  <div class="text-[#1D2939] leading-relaxed">
                    {{ address().addressLine }}, {{ address().landmark ? address().landmark + ', ' : '' }}
                    {{ address().city }}, {{ address().state }} - <span class="font-bold">{{ address().pincode }}</span>
                  </div>
                  <div class="text-[#667085] flex items-center gap-1">
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">phone</mat-icon>
                    <span>Contact: {{ address().phone }}</span>
                  </div>
                </div>

                <!-- Add/Edit Address Form Toggle -->
                <button
                  type="button"
                  (click)="isEditingAddress.set(!isEditingAddress())"
                  class="text-xs font-semibold text-[#176B45] hover:underline flex items-center gap-1">
                  <mat-icon class="!w-4 !h-4 !text-[16px]">{{ isEditingAddress() ? 'close' : 'edit' }}</mat-icon>
                  <span>{{ isEditingAddress() ? 'Use Saved Address' : 'Change or Enter New Address' }}</span>
                </button>

                @if (isEditingAddress()) {
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <label for="chk-name" class="block font-semibold text-[#1D2939] mb-1">Full Name</label>
                      <input 
                        id="chk-name"
                        type="text" 
                        [value]="address().fullName"
                        (input)="updateAddressField('fullName', $any($event.target).value)"
                        class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#176B45]"/>
                    </div>
                    <div>
                      <label for="chk-phone" class="block font-semibold text-[#1D2939] mb-1">Mobile (for Delivery SMS)</label>
                      <input 
                        id="chk-phone"
                        type="text" 
                        [value]="address().phone"
                        (input)="updateAddressField('phone', $any($event.target).value)"
                        class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#176B45]"/>
                    </div>
                    <div>
                      <label for="chk-pin" class="block font-semibold text-[#1D2939] mb-1">PIN Code (6 digits)</label>
                      <input 
                        id="chk-pin"
                        type="text" 
                        [value]="address().pincode"
                        (input)="updateAddressField('pincode', $any($event.target).value)"
                        class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#176B45]"/>
                    </div>
                    <div>
                      <label for="chk-city" class="block font-semibold text-[#1D2939] mb-1">City / District</label>
                      <input 
                        id="chk-city"
                        type="text" 
                        [value]="address().city"
                        (input)="updateAddressField('city', $any($event.target).value)"
                        class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#176B45]"/>
                    </div>
                    <div class="sm:col-span-2">
                      <label for="chk-street" class="block font-semibold text-[#1D2939] mb-1">Flat, House no., Building, Street</label>
                      <input 
                        id="chk-street"
                        type="text" 
                        [value]="address().addressLine"
                        (input)="updateAddressField('addressLine', $any($event.target).value)"
                        class="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#176B45]"/>
                    </div>
                  </div>
                }

                <div class="pt-4 flex justify-end">
                  <button
                    type="button"
                    (click)="currentStep.set(2)"
                    class="px-6 py-2.5 bg-[#176B45] text-white text-xs font-bold rounded-lg hover:bg-[#15365B] transition-colors flex items-center gap-1.5 cursor-pointer">
                    <span>Continue to Order Review</span>
                    <mat-icon class="!w-4 !h-4 !text-[16px]">arrow_forward</mat-icon>
                  </button>
                </div>
              </div>
            }

            <!-- STEP 2: Order Review -->
            @if (currentStep() === 2) {
              <div class="space-y-4 text-xs">
                <h3 class="text-sm font-bold text-[#15365B]">Review Items & Direct Artisan Benefit</h3>
                
                <div class="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  @for (item of market.cartItems(); track item.product.id) {
                    <div class="p-3 bg-white flex items-center justify-between gap-3">
                      <div class="flex items-center gap-3">
                        <img [src]="item.product.primaryImage" alt="item" referrerpolicy="no-referrer" class="w-12 h-12 rounded object-cover"/>
                        <div>
                          <div class="font-bold text-[#15365B] line-clamp-1">{{ item.product.name }}</div>
                          <div class="text-[11px] text-[#667085]">Producer: {{ item.product.sellerName }} (Qty: {{ item.quantity }})</div>
                        </div>
                      </div>
                      <span class="font-bold tabular-nums">₹{{ item.product.price * item.quantity }}</span>
                    </div>
                  }
                </div>

                <!-- Transparency Breakdown Box -->
                <div class="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1 text-emerald-900">
                  <div class="font-bold flex items-center gap-1 text-[#176B45]">
                    <mat-icon class="!w-4 !h-4 !text-[16px]">check_circle</mat-icon>
                    <span>100% Direct Benefit Transfer (DBT) Assured</span>
                  </div>
                  <p class="text-[11px] leading-relaxed text-emerald-800">
                    ₹{{ market.cartGrandTotal() }} will be deposited directly to the registered producer's account under the National Rural Livelihood Mission with 0% platform commission deductions.
                  </p>
                </div>

                <div class="flex justify-between pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    (click)="currentStep.set(1)"
                    class="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold">
                    Back to Address
                  </button>
                  <button
                    type="button"
                    (click)="currentStep.set(3)"
                    class="px-6 py-2.5 bg-[#176B45] text-white font-bold rounded-lg hover:bg-[#15365B] transition-colors flex items-center gap-1.5 cursor-pointer">
                    <span>Proceed to Payment</span>
                    <mat-icon class="!w-4 !h-4 !text-[16px]">arrow_forward</mat-icon>
                  </button>
                </div>
              </div>
            }

            <!-- STEP 3: Payment Options -->
            @if (currentStep() === 3) {
              <div class="space-y-4 text-xs">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold text-[#15365B]">Select Official Payment Mode</h3>
                  <span class="text-sm font-black text-[#15365B] tabular-nums">Total: ₹{{ market.cartGrandTotal() }}</span>
                </div>

                <div class="space-y-2">
                  <!-- UPI Option -->
                  <label class="p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors"
                    [class.border-[#176B45]]="selectedPaymentMethod() === 'UPI'"
                    [class.bg-emerald-50/40]="selectedPaymentMethod() === 'UPI'">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="UPI" 
                      [checked]="selectedPaymentMethod() === 'UPI'"
                      (change)="selectedPaymentMethod.set('UPI')"
                      class="mt-0.5 text-[#176B45]"/>
                    <div class="flex-1">
                      <div class="font-bold text-[#15365B] flex items-center justify-between">
                        <span>BHIM UPI / Google Pay / PhonePe / Paytm</span>
                        <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">RECOMMENDED</span>
                      </div>
                      <div class="text-[11px] text-[#667085] mt-0.5">Instant verification with 0% gateway surcharge</div>
                      
                      @if (selectedPaymentMethod() === 'UPI') {
                        <div class="mt-3 p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-4">
                          <div class="w-20 h-20 bg-slate-100 rounded border border-slate-200 flex items-center justify-center p-1">
                            <mat-icon class="!w-12 !h-12 !text-[48px] text-[#15365B]">qr_code_2</mat-icon>
                          </div>
                          <div>
                            <div class="font-bold text-[#15365B]">Scan BHIM Bharat-QR</div>
                            <div class="text-[10px] text-[#667085]">Scan with any certified UPI app to pay ₹{{ market.cartGrandTotal() }}</div>
                            <div class="text-[10px] font-mono text-emerald-700 mt-1">VPA: bharatshilp&#64;sbi</div>
                          </div>
                        </div>
                      }
                    </div>
                  </label>

                  <!-- RuPay & Cards Option -->
                  <label class="p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors"
                    [class.border-[#176B45]]="selectedPaymentMethod() === 'Card'"
                    [class.bg-emerald-50/40]="selectedPaymentMethod() === 'Card'">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="Card" 
                      [checked]="selectedPaymentMethod() === 'Card'"
                      (change)="selectedPaymentMethod.set('Card')"
                      class="mt-0.5 text-[#176B45]"/>
                    <div class="flex-1">
                      <div class="font-bold text-[#15365B]">RuPay / Visa / Mastercard / Govt SBI Debit Cards</div>
                      <div class="text-[11px] text-[#667085] mt-0.5">Protected with 2-Factor RBI OTP authentication</div>
                    </div>
                  </label>

                  <!-- Net Banking Option -->
                  <label class="p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors"
                    [class.border-[#176B45]]="selectedPaymentMethod() === 'NetBanking'"
                    [class.bg-emerald-50/40]="selectedPaymentMethod() === 'NetBanking'">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="NetBanking" 
                      [checked]="selectedPaymentMethod() === 'NetBanking'"
                      (change)="selectedPaymentMethod.set('NetBanking')"
                      class="mt-0.5 text-[#176B45]"/>
                    <div class="flex-1">
                      <div class="font-bold text-[#15365B]">Net Banking (SBI, PNB, BoB, Canara, HDFC, ICICI)</div>
                      <div class="text-[11px] text-[#667085] mt-0.5">All 54 scheduled commercial & regional rural banks</div>
                    </div>
                  </label>

                  <!-- Cash on Delivery -->
                  <label class="p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors"
                    [class.border-[#176B45]]="selectedPaymentMethod() === 'COD'"
                    [class.bg-emerald-50/40]="selectedPaymentMethod() === 'COD'">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="COD" 
                      [checked]="selectedPaymentMethod() === 'COD'"
                      (change)="selectedPaymentMethod.set('COD')"
                      class="mt-0.5 text-[#176B45]"/>
                    <div class="flex-1">
                      <div class="font-bold text-[#15365B]">Cash on Delivery (Speed Post COD)</div>
                      <div class="text-[11px] text-[#667085] mt-0.5">Pay in cash to the India Post delivery postman upon delivery</div>
                    </div>
                  </label>
                </div>

                <div class="flex justify-between pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    (click)="currentStep.set(2)"
                    class="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold">
                    Back
                  </button>
                  <button
                    type="button"
                    (click)="completeOrder()"
                    class="px-6 py-2.5 bg-[#176B45] text-white font-bold rounded-lg hover:bg-[#15365B] transition-colors flex items-center gap-1.5 cursor-pointer shadow-md">
                    <mat-icon class="!w-4 !h-4 !text-[16px]">verified</mat-icon>
                    <span>Authorize & Place Order</span>
                  </button>
                </div>
              </div>
            }

            <!-- STEP 4: Order Confirmation / Success -->
            @if (currentStep() === 4 && confirmedOrder(); as ord) {
              <div class="text-center py-6 space-y-4">
                
                <!-- Success Checkmark Animation -->
                <div class="w-16 h-16 rounded-full bg-emerald-100 text-[#176B45] flex items-center justify-center mx-auto shadow-inner animate-in zoom-in-50 duration-300">
                  <mat-icon class="!w-10 !h-10 !text-[40px]">check_circle</mat-icon>
                </div>

                <div>
                  <h3 class="text-xl font-black text-[#15365B]">Order Confirmed! धन्यवाद</h3>
                  <p class="text-xs text-[#667085] mt-1">
                    Your order <span class="font-mono font-bold text-[#15365B]">{{ ord.id }}</span> has been routed to the respective artisan clusters.
                  </p>
                </div>

                <!-- Order Receipt Card -->
                <div class="max-w-md mx-auto p-4 bg-[#F8F7F2] rounded-xl border border-slate-200 text-xs text-left space-y-2">
                  <div class="flex justify-between border-b border-slate-200 pb-2">
                    <span class="text-[#667085]">Order Total:</span>
                    <span class="font-bold text-[#15365B] tabular-nums">₹{{ ord.total }} (Paid via {{ ord.paymentMethod }})</span>
                  </div>
                  <div class="flex justify-between border-b border-slate-200 pb-2">
                    <span class="text-[#667085]">Estimated Delivery:</span>
                    <span class="font-bold text-emerald-800">{{ ord.deliveryEstimate }}</span>
                  </div>
                  <div class="flex justify-between border-b border-slate-200 pb-2">
                    <span class="text-[#667085]">Delivering To:</span>
                    <span class="font-medium text-[#1D2939] truncate max-w-[200px]">{{ ord.address.city }} ({{ ord.address.pincode }})</span>
                  </div>
                  <div class="text-[11px] text-[#176B45] font-semibold pt-1 flex items-center gap-1">
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">sms</mat-icon>
                    <span>SMS tracking dispatch notice sent to {{ ord.address.phone }}</span>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    type="button"
                    (click)="trackOrder(ord)"
                    class="px-5 py-2.5 bg-[#176B45] hover:bg-[#15365B] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
                    <mat-icon class="!w-4 !h-4 !text-[16px]">local_shipping</mat-icon>
                    <span>Track Live Speed Post</span>
                  </button>

                  <button
                    type="button"
                    (click)="printInvoice()"
                    class="px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5">
                    <mat-icon class="!w-4 !h-4 !text-[16px]">download</mat-icon>
                    <span>Download Official Tax Invoice</span>
                  </button>

                  <button
                    type="button"
                    (click)="continueShopping()"
                    class="px-4 py-2.5 text-[#176B45] text-xs font-bold hover:underline">
                    Continue Shopping
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
export class CheckoutModal {
  readonly market = inject(MarketplaceService);

  readonly currentStep = signal<1 | 2 | 3 | 4>(1);
  readonly selectedPaymentMethod = signal<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  readonly isEditingAddress = signal<boolean>(false);
  readonly address = signal<Address>({ ...this.market.savedAddress() });
  readonly confirmedOrder = signal<Order | null>(null);

  updateAddressField<K extends keyof Address>(key: K, value: Address[K]) {
    this.address.update(a => ({ ...a, [key]: value }));
  }

  completeOrder() {
    const order = this.market.placeOrder(this.address(), this.selectedPaymentMethod());
    this.confirmedOrder.set(order);
    this.currentStep.set(4);
  }

  trackOrder(order: Order) {
    this.close();
    this.market.openOrderTracking(order);
  }

  printInvoice() {
    this.market.showToast('Generating official GST Tax Invoice PDF...', 'success');
  }

  continueShopping() {
    this.close();
    this.market.setView('catalogue');
  }

  close() {
    this.currentStep.set(1);
    this.market.toggleCheckoutModal(false);
  }
}
