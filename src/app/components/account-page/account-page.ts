import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { Address, Order } from '../../models/marketplace.model';
import { MatIconModule } from '@angular/material/icon';

export interface GrievanceTicket {
  id: string;
  orderId: string;
  category: string;
  subject: string;
  date: string;
  status: 'In Progress' | 'Resolved' | 'Action Scheduled';
  response?: string;
}

@Component({
  selector: 'app-account-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="bg-[#FAF8F5] min-h-[80vh] py-6 sm:py-10 border-b border-[#E8E4DC]">
      <div class="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-6">
        
        <!-- Breadcrumbs & Back Navigation -->
        <nav class="flex items-center gap-2 text-xs text-[#667085]" aria-label="Breadcrumb">
          <button
            type="button"
            (click)="market.setView('home')"
            class="hover:text-[#15365B] flex items-center gap-1 cursor-pointer">
            <mat-icon class="!w-3.5 !h-3.5 !text-[15px]">home</mat-icon>
            <span>Home</span>
          </button>
          <span>/</span>
          <span class="text-[#0D5C3A] font-semibold">Citizen Portal</span>
          <span>/</span>
          <span class="text-[#15365B] font-bold">My Account</span>
        </nav>

        <!-- Citizen Profile Header Card -->
        <div class="bg-white rounded-2xl border border-[#E5E0D5] p-5 sm:p-6 shadow-xs relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0D5C3A] via-[#E2831E] to-[#15365B]"></div>

          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-1">
            <!-- Left: Citizen Avatar & Bio -->
            <div class="flex items-start sm:items-center gap-4">
              <div class="w-16 h-16 rounded-2xl bg-[#15365B] text-white flex items-center justify-center text-xl font-black shadow-sm shrink-0">
                YK
              </div>
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h1 class="text-xl sm:text-2xl font-black text-[#15365B] leading-tight">
                    {{ market.userProfile().name }}
                  </h1>
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#0D5C3A] border border-emerald-200 text-[11px] font-bold">
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">verified</mat-icon>
                    <span>Aadhaar e-KYC Verified</span>
                  </span>
                </div>

                <div class="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#667085]">
                  <span class="flex items-center gap-1">
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">email</mat-icon>
                    <span>{{ market.userProfile().email }}</span>
                  </span>
                  <span class="flex items-center gap-1">
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">call</mat-icon>
                    <span>{{ market.userProfile().phone }}</span>
                  </span>
                  <span class="flex items-center gap-1">
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">badge</mat-icon>
                    <span>Citizen ID: IND-84920</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Right: Quick Impact Summary Pills -->
            <div class="flex flex-wrap items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
              <div class="bg-[#FAF8F5] px-3.5 py-2 rounded-xl border border-stone-200/80 text-xs text-center min-w-[100px]">
                <div class="text-[10px] text-[#667085] uppercase font-bold tracking-wider">Orders</div>
                <div class="text-base font-black text-[#15365B] leading-tight">{{ market.orders().length }}</div>
                <div class="text-[10px] text-[#0D5C3A] font-semibold">Speed Post</div>
              </div>

              <div class="bg-[#FAF8F5] px-3.5 py-2 rounded-xl border border-stone-200/80 text-xs text-center min-w-[110px]">
                <div class="text-[10px] text-[#667085] uppercase font-bold tracking-wider">SHG Pledge</div>
                <div class="text-base font-black text-[#0D5C3A] leading-tight">₹480</div>
                <div class="text-[10px] text-[#667085]">Rural Corpus</div>
              </div>

              <div class="bg-[#FAF8F5] px-3.5 py-2 rounded-xl border border-stone-200/80 text-xs text-center min-w-[100px]">
                <div class="text-[10px] text-[#667085] uppercase font-bold tracking-wider">Saved Crafts</div>
                <div class="text-base font-black text-[#C25E00] leading-tight">{{ market.wishlistIds().length }}</div>
                <div class="text-[10px] text-[#667085]">GI Treasures</div>
              </div>
            </div>
          </div>
        </div>

        <!-- MAIN LAYOUT: Sidebar Tabs + Active Content Panel -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- LEFT SIDEBAR: Nav Links (Span 3) -->
          <div class="lg:col-span-3 bg-white rounded-2xl border border-[#E5E0D5] p-3 shadow-xs space-y-1">
            <button
              type="button"
              (click)="setTab('orders')"
              class="w-full px-3.5 py-3 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
              [class.bg-[#0D5C3A]]="currentTab() === 'orders'"
              [class.text-white]="currentTab() === 'orders'"
              [class.text-[#344054]]="currentTab() !== 'orders'"
              [class.hover:bg-stone-50]="currentTab() !== 'orders'">
              <div class="flex items-center gap-2.5">
                <mat-icon class="!w-4 !h-4 !text-[18px]">local_shipping</mat-icon>
                <span>Orders & Tracking</span>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold"
                [class.bg-white/20]="currentTab() === 'orders'"
                [class.text-white]="currentTab() === 'orders'"
                [class.bg-stone-100]="currentTab() !== 'orders'"
                [class.text-[#667085]]="currentTab() !== 'orders'">
                {{ market.orders().length }}
              </span>
            </button>

            <button
              type="button"
              (click)="setTab('profile')"
              class="w-full px-3.5 py-3 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer"
              [class.bg-[#0D5C3A]]="currentTab() === 'profile'"
              [class.text-white]="currentTab() === 'profile'"
              [class.text-[#344054]]="currentTab() !== 'profile'"
              [class.hover:bg-stone-50]="currentTab() !== 'profile'">
              <mat-icon class="!w-4 !h-4 !text-[18px]">person</mat-icon>
              <span>Profile & Aadhaar KYC</span>
            </button>

            <button
              type="button"
              (click)="setTab('addresses')"
              class="w-full px-3.5 py-3 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
              [class.bg-[#0D5C3A]]="currentTab() === 'addresses'"
              [class.text-white]="currentTab() === 'addresses'"
              [class.text-[#344054]]="currentTab() !== 'addresses'"
              [class.hover:bg-stone-50]="currentTab() !== 'addresses'">
              <div class="flex items-center gap-2.5">
                <mat-icon class="!w-4 !h-4 !text-[18px]">home_pin</mat-icon>
                <span>Saved Addresses</span>
              </div>
              <span class="text-[10px] text-[#667085]" [class.text-white/80]="currentTab() === 'addresses'">
                {{ market.savedAddresses().length }} Hubs
              </span>
            </button>

            <button
              type="button"
              (click)="setTab('payments')"
              class="w-full px-3.5 py-3 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer"
              [class.bg-[#0D5C3A]]="currentTab() === 'payments'"
              [class.text-white]="currentTab() === 'payments'"
              [class.text-[#344054]]="currentTab() !== 'payments'"
              [class.hover:bg-stone-50]="currentTab() !== 'payments'">
              <mat-icon class="!w-4 !h-4 !text-[18px]">account_balance_wallet</mat-icon>
              <span>BHIM UPI & Escrow</span>
            </button>

            <button
              type="button"
              (click)="setTab('impact')"
              class="w-full px-3.5 py-3 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer"
              [class.bg-[#0D5C3A]]="currentTab() === 'impact'"
              [class.text-white]="currentTab() === 'impact'"
              [class.text-[#344054]]="currentTab() !== 'impact'"
              [class.hover:bg-stone-50]="currentTab() !== 'impact'">
              <mat-icon class="!w-4 !h-4 !text-[18px]">military_tech</mat-icon>
              <span>Artisan Impact Certificate</span>
            </button>

            <button
              type="button"
              (click)="setTab('grievance')"
              class="w-full px-3.5 py-3 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
              [class.bg-[#0D5C3A]]="currentTab() === 'grievance'"
              [class.text-white]="currentTab() === 'grievance'"
              [class.text-[#344054]]="currentTab() !== 'grievance'"
              [class.hover:bg-stone-50]="currentTab() !== 'grievance'">
              <div class="flex items-center gap-2.5">
                <mat-icon class="!w-4 !h-4 !text-[18px]">support_agent</mat-icon>
                <span>CPGRAMS Redressal</span>
              </div>
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            </button>

            <div class="pt-3 border-t border-stone-100">
              <button
                type="button"
                (click)="onSignOut()"
                class="w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2.5 cursor-pointer">
                <mat-icon class="!w-4 !h-4 !text-[18px]">logout</mat-icon>
                <span>Sign Out / Switch User</span>
              </button>
            </div>
          </div>

          <!-- RIGHT PANEL: Tab Content (Span 9) -->
          <div class="lg:col-span-9 bg-white rounded-2xl border border-[#E5E0D5] p-5 sm:p-7 shadow-xs min-h-[500px]">
            
            <!-- ============================================== -->
            <!-- TAB 1: ORDERS & SPEED POST TRACKING            -->
            <!-- ============================================== -->
            @if (currentTab() === 'orders') {
              <div class="space-y-6">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
                  <div>
                    <h2 class="text-lg font-black text-[#15365B]">My Orders & Speed Post Tracking</h2>
                    <p class="text-xs text-[#667085]">
                      All dispatches are handled directly by regional artisan clusters via India Post.
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      (click)="market.setView('catalogue')"
                      class="px-3.5 py-1.5 bg-[#0D5C3A] hover:bg-[#09432A] text-white text-xs font-bold rounded-xl transition-all cursor-pointer">
                      Order More Crafts
                    </button>
                  </div>
                </div>

                <!-- Expanded Single Order Tracking Mode -->
                @if (selectedOrder(); as ord) {
                  <div class="p-5 bg-[#FAF8F5] rounded-2xl border border-stone-200/80 space-y-5 animate-fadeIn">
                    <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-black text-sm text-[#15365B]">Order #{{ ord.id }}</span>
                          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                            [class.bg-emerald-100]="ord.status === 'Confirmed' || ord.status === 'Delivered'"
                            [class.text-[#0D5C3A]="ord.status === 'Confirmed' || ord.status === 'Delivered'"
                            [class.bg-amber-100]="ord.status === 'Shipped'"
                            [class.text-amber-800]="ord.status === 'Shipped'">
                            {{ ord.status }}
                          </span>
                        </div>
                        <div class="text-[11px] text-[#667085] mt-0.5">
                          Placed on {{ ord.date }} · Payment via {{ ord.paymentMethod }} · Estimated: {{ ord.deliveryEstimate }}
                        </div>
                      </div>

                      <div class="flex items-center gap-2">
                        <button
                          type="button"
                          (click)="selectedOrder.set(null)"
                          class="px-3 py-1.5 text-xs font-bold text-[#15365B] bg-white border border-stone-200 rounded-lg hover:bg-stone-50 cursor-pointer">
                          Back to All Orders
                        </button>
                      </div>
                    </div>

                    <!-- Speed Post Consignment Bar -->
                    <div class="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div class="flex items-center gap-2">
                        <mat-icon class="!w-5 !h-5 !text-[20px] text-red-600">local_post_office</mat-icon>
                        <div>
                          <div class="font-bold text-[#15365B]">India Post Speed Post Tracking</div>
                          <div class="text-[11px] text-[#667085]">Consignment No: <span class="font-mono font-bold text-[#15365B]">ED849201948IN</span></div>
                        </div>
                      </div>
                      <button
                        type="button"
                        (click)="copyConsignmentNumber('ED849201948IN')"
                        class="px-2.5 py-1 text-[11px] font-bold text-[#0D5C3A] hover:bg-emerald-50 rounded border border-[#0D5C3A]/30 cursor-pointer">
                        Copy Tracking ID
                      </button>
                    </div>

                    <!-- Stepper Timeline -->
                    <div class="space-y-4 pt-1">
                      <div class="text-xs font-bold text-[#15365B] uppercase tracking-wider">
                        Live Postal Transit Journey
                      </div>

                      <div class="relative pl-6 space-y-4 border-l-2 border-[#0D5C3A]/30 ml-2 text-xs">
                        @for (step of ord.trackingSteps; track step.title) {
                          <div class="relative">
                            <div 
                              [class.bg-[#0D5C3A]]="step.completed"
                              [class.bg-stone-300]="!step.completed"
                              [class.ring-4]="step.current"
                              [class.ring-emerald-200]="step.current"
                              class="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white">
                            </div>

                            <div class="flex flex-col">
                              <span class="font-bold" [class.text-[#15365B]]="step.completed" [class.text-stone-400]="!step.completed">
                                {{ step.title }}
                              </span>
                              <span class="text-[11px] text-[#667085]">{{ step.location }}</span>
                              <span class="text-[10px] text-stone-400">{{ step.date }}</span>
                            </div>
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Items Included -->
                    <div class="pt-3 border-t border-stone-200 space-y-2 text-xs">
                      <div class="font-bold text-[#15365B]">Consignment Package Contents:</div>
                      @for (it of ord.items; track it.product.id) {
                        <div class="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200">
                          <div class="flex items-center gap-3 min-w-0">
                            <img
                              [src]="it.product.primaryImage"
                              [alt]="it.product.name"
                              class="w-12 h-12 rounded-lg object-cover border border-stone-100 shrink-0"
                              referrerpolicy="no-referrer"
                            />
                            <div class="truncate">
                              <div class="font-bold text-[#15365B] truncate">{{ it.product.name }}</div>
                              <div class="text-[11px] text-[#667085]">{{ it.product.sellerName }} · Qty: {{ it.quantity }}</div>
                            </div>
                          </div>
                          <div class="font-black text-[#15365B] text-sm shrink-0">
                            ₹{{ it.product.price * it.quantity }}
                          </div>
                        </div>
                      }
                    </div>

                    <!-- Actions -->
                    <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200 text-xs">
                      <div class="flex items-center gap-2">
                        <button
                          type="button"
                          (click)="downloadInvoice(ord.id)"
                          class="px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-[#15365B] font-bold rounded-lg flex items-center gap-1.5 cursor-pointer">
                          <mat-icon class="!w-4 !h-4 !text-[16px]">download</mat-icon>
                          <span>Official Tax Invoice (PDF)</span>
                        </button>
                        <button
                          type="button"
                          (click)="lodgeGrievanceForOrder(ord.id)"
                          class="px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-[#667085] hover:text-stone-900 font-bold rounded-lg flex items-center gap-1.5 cursor-pointer">
                          <mat-icon class="!w-4 !h-4 !text-[16px]">report_problem</mat-icon>
                          <span>Report Issue</span>
                        </button>
                      </div>

                      <div class="text-right">
                        <span class="text-[#667085]">Total Paid: </span>
                        <span class="font-black text-base text-[#15365B]">₹{{ ord.total }}</span>
                      </div>
                    </div>
                  </div>
                } @else {
                  <!-- Orders List -->
                  <div class="space-y-4">
                    @for (ord of market.orders(); track ord.id) {
                      <div class="p-4 sm:p-5 rounded-2xl border border-stone-200 hover:border-[#0D5C3A] transition-all bg-white space-y-3">
                        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
                          <div>
                            <div class="flex items-center gap-2">
                              <span class="font-black text-sm text-[#15365B]">#{{ ord.id }}</span>
                              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#0D5C3A] border border-emerald-200">
                                {{ ord.status }}
                              </span>
                            </div>
                            <div class="text-[11px] text-[#667085] mt-0.5">
                              Placed on {{ ord.date }} · Speed Post Delivery: {{ ord.deliveryEstimate }}
                            </div>
                          </div>

                          <div class="flex items-center gap-2">
                            <button
                              type="button"
                              (click)="viewOrderTracking(ord)"
                              class="px-3 py-1.5 bg-[#0D5C3A] hover:bg-[#09432A] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer">
                              <mat-icon class="!w-4 !h-4 !text-[16px]">local_shipping</mat-icon>
                              <span>Track Live Consignment</span>
                            </button>
                          </div>
                        </div>

                        <!-- Product Preview Row -->
                        <div class="flex flex-wrap items-center justify-between gap-4 pt-1">
                          <div class="flex items-center gap-3 overflow-x-auto">
                            @for (it of ord.items; track it.product.id) {
                              <div class="flex items-center gap-2 bg-[#FAF8F5] p-2 rounded-xl border border-stone-200/60 shrink-0">
                                <img
                                  [src]="it.product.primaryImage"
                                  [alt]="it.product.name"
                                  class="w-10 h-10 rounded-lg object-cover"
                                  referrerpolicy="no-referrer"
                                />
                                <div class="max-w-[140px] truncate text-xs">
                                  <div class="font-bold text-[#15365B] truncate">{{ it.product.name }}</div>
                                  <div class="text-[10px] text-[#667085]">Qty: {{ it.quantity }}</div>
                                </div>
                              </div>
                            }
                          </div>

                          <div class="text-right shrink-0">
                            <div class="text-[11px] text-[#667085]">Total Amount</div>
                            <div class="text-base font-black text-[#15365B]">₹{{ ord.total }}</div>
                          </div>
                        </div>
                      </div>
                    } @empty {
                      <div class="p-12 text-center text-xs text-[#667085] space-y-2">
                        <mat-icon class="!w-12 !h-12 !text-[48px] text-stone-300 mx-auto">shopping_bag</mat-icon>
                        <p class="font-bold text-[#15365B]">You haven't placed any orders yet.</p>
                        <button
                          type="button"
                          (click)="market.setView('catalogue')"
                          class="px-4 py-2 bg-[#0D5C3A] text-white rounded-xl font-bold cursor-pointer">
                          Explore Crafts
                        </button>
                      </div>
                    }
                  </div>
                }
              </div>
            }

            <!-- ============================================== -->
            <!-- TAB 2: PROFILE & PERSONAL DETAILS              -->
            <!-- ============================================== -->
            @if (currentTab() === 'profile') {
              <div class="space-y-6">
                <div class="pb-4 border-b border-stone-100">
                  <h2 class="text-lg font-black text-[#15365B]">Citizen Profile & Aadhaar Verification</h2>
                  <p class="text-xs text-[#667085]">
                    Manage your personal details for government subsidy tracking and certified GI delivery.
                  </p>
                </div>

                <div class="bg-emerald-50/60 border border-emerald-200/80 p-4 rounded-2xl flex items-start gap-3">
                  <mat-icon class="!w-5 !h-5 !text-[20px] text-[#0D5C3A] shrink-0 mt-0.5">verified_user</mat-icon>
                  <div class="text-xs space-y-0.5">
                    <span class="font-bold text-[#15365B]">Aadhaar e-KYC Verification Active</span>
                    <p class="text-[#475467] leading-relaxed">
                      Your identity is verified under the National e-Governance Services framework. Your purchases are eligible for state handloom subsidies.
                    </p>
                  </div>
                </div>

                <form (submit)="saveProfile($event)" class="space-y-4 max-w-xl text-xs">
                  <div>
                    <label for="prof-name" class="block font-bold text-[#344054] mb-1">Full Citizen Name</label>
                    <input
                      id="prof-name"
                      type="text"
                      [value]="profileForm().name"
                      (input)="updateProfileField('name', $any($event.target).value)"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#0D5C3A] focus:ring-1 focus:ring-[#0D5C3A]"
                      required
                    />
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label for="prof-email" class="block font-bold text-[#344054] mb-1">Email Address</label>
                      <input
                        id="prof-email"
                        type="email"
                        [value]="profileForm().email"
                        (input)="updateProfileField('email', $any($event.target).value)"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#0D5C3A] focus:ring-1 focus:ring-[#0D5C3A]"
                        required
                      />
                    </div>

                    <div>
                      <label for="prof-phone" class="block font-bold text-[#344054] mb-1">Mobile Number (Aadhaar Linked)</label>
                      <input
                        id="prof-phone"
                        type="tel"
                        [value]="profileForm().phone"
                        (input)="updateProfileField('phone', $any($event.target).value)"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#0D5C3A] focus:ring-1 focus:ring-[#0D5C3A]"
                        required
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label for="prof-state" class="block font-bold text-[#344054] mb-1">Primary State</label>
                      <input
                        id="prof-state"
                        type="text"
                        [value]="profileForm().state"
                        (input)="updateProfileField('state', $any($event.target).value)"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#0D5C3A] focus:ring-1 focus:ring-[#0D5C3A]"
                      />
                    </div>

                    <div>
                      <label for="prof-pincode" class="block font-bold text-[#344054] mb-1">Default Pincode</label>
                      <input
                        id="prof-pincode"
                        type="text"
                        [value]="profileForm().pincode"
                        (input)="updateProfileField('pincode', $any($event.target).value)"
                        class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#0D5C3A] focus:ring-1 focus:ring-[#0D5C3A]"
                      />
                    </div>
                  </div>

                  <div class="pt-2">
                    <button
                      type="submit"
                      class="px-5 py-2.5 bg-[#0D5C3A] hover:bg-[#09432A] text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer">
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            }

            <!-- ============================================== -->
            <!-- TAB 3: SAVED ADDRESSES                         -->
            <!-- ============================================== -->
            @if (currentTab() === 'addresses') {
              <div class="space-y-6">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
                  <div>
                    <h2 class="text-lg font-black text-[#15365B]">Delivery Addresses</h2>
                    <p class="text-xs text-[#667085]">
                      Addresses used for Speed Post parcel dispatches with PIN code validation.
                    </p>
                  </div>

                  <button
                    type="button"
                    (click)="showAddressForm.set(!showAddressForm())"
                    class="px-3.5 py-2 bg-[#0D5C3A] hover:bg-[#09432A] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto">
                    <mat-icon class="!w-4 !h-4 !text-[16px]">add</mat-icon>
                    <span>{{ showAddressForm() ? 'Cancel' : 'Add New Address' }}</span>
                  </button>
                </div>

                <!-- Add New Address Form Modal/Panel -->
                @if (showAddressForm()) {
                  <form (submit)="saveNewAddress($event)" class="p-5 bg-[#FAF8F5] rounded-2xl border border-stone-200 space-y-4 text-xs animate-fadeIn">
                    <h3 class="font-bold text-[#15365B] text-sm">Add New Postal Destination</h3>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label for="addr-fullname" class="block font-bold text-[#344054] mb-1">Full Recipient Name</label>
                        <input
                          id="addr-fullname"
                          type="text"
                          [value]="newAddress().fullName"
                          (input)="updateNewAddressField('fullName', $any($event.target).value)"
                          class="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#0D5C3A]"
                          required
                        />
                      </div>
                      <div>
                        <label for="addr-phone" class="block font-bold text-[#344054] mb-1">Phone Number</label>
                        <input
                          id="addr-phone"
                          type="tel"
                          [value]="newAddress().phone"
                          (input)="updateNewAddressField('phone', $any($event.target).value)"
                          class="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#0D5C3A]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label for="addr-line" class="block font-bold text-[#344054] mb-1">Street Address / House / Flat</label>
                      <input
                        id="addr-line"
                        type="text"
                        [value]="newAddress().addressLine"
                        (input)="updateNewAddressField('addressLine', $any($event.target).value)"
                        class="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#0D5C3A]"
                        required
                      />
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label for="addr-pin" class="block font-bold text-[#344054] mb-1">Pincode</label>
                        <input
                          id="addr-pin"
                          type="text"
                          [value]="newAddress().pincode"
                          (input)="updateNewAddressField('pincode', $any($event.target).value)"
                          class="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#0D5C3A]"
                          required
                        />
                      </div>
                      <div>
                        <label for="addr-city" class="block font-bold text-[#344054] mb-1">City</label>
                        <input
                          id="addr-city"
                          type="text"
                          [value]="newAddress().city"
                          (input)="updateNewAddressField('city', $any($event.target).value)"
                          class="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#0D5C3A]"
                          required
                        />
                      </div>
                      <div>
                        <label for="addr-state" class="block font-bold text-[#344054] mb-1">State</label>
                        <input
                          id="addr-state"
                          type="text"
                          [value]="newAddress().state"
                          (input)="updateNewAddressField('state', $any($event.target).value)"
                          class="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#0D5C3A]"
                          required
                        />
                      </div>
                      <div>
                        <label for="addr-type" class="block font-bold text-[#344054] mb-1">Type</label>
                        <select
                          id="addr-type"
                          [value]="newAddress().type"
                          (change)="updateNewAddressField('type', $any($event.target).value)"
                          class="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#0D5C3A]">
                          <option value="Home">Home</option>
                          <option value="Work">Work / Office</option>
                        </select>
                      </div>
                    </div>

                    <div class="flex items-center gap-2 pt-2">
                      <button
                        type="submit"
                        class="px-4 py-2 bg-[#0D5C3A] text-white font-bold rounded-xl cursor-pointer">
                        Save Address
                      </button>
                      <button
                        type="button"
                        (click)="showAddressForm.set(false)"
                        class="px-4 py-2 bg-stone-200 text-[#344054] font-bold rounded-xl cursor-pointer">
                        Cancel
                      </button>
                    </div>
                  </form>
                }

                <!-- Address Cards Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  @for (addr of market.savedAddresses(); track addr.id) {
                    <div class="p-4 sm:p-5 rounded-2xl border transition-all space-y-3 relative flex flex-col justify-between"
                      [class.border-[#0D5C3A]]="addr.isDefault"
                      [class.bg-[#0D5C3A]/5]="addr.isDefault"
                      [class.border-stone-200]="!addr.isDefault"
                      [class.bg-white]="!addr.isDefault">
                      
                      <div class="space-y-1.5">
                        <div class="flex items-center justify-between">
                          <span class="px-2 py-0.5 bg-stone-100 rounded text-[10px] font-bold text-[#344054]">
                            {{ addr.type }}
                          </span>
                          @if (addr.isDefault) {
                            <span class="text-[10px] font-bold text-[#0D5C3A] flex items-center gap-1">
                              <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">check_circle</mat-icon>
                              <span>Default Delivery Address</span>
                            </span>
                          }
                        </div>

                        <div class="font-bold text-sm text-[#15365B]">{{ addr.fullName }}</div>
                        <div class="text-xs text-[#475467] leading-relaxed">
                          {{ addr.addressLine }}
                          @if (addr.landmark) { <div>Near: {{ addr.landmark }}</div> }
                          <div>{{ addr.city }}, {{ addr.state }} — <span class="font-bold">{{ addr.pincode }}</span></div>
                          <div class="text-[11px] text-[#667085] mt-1">Contact: {{ addr.phone }}</div>
                        </div>
                      </div>

                      <div class="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs">
                        @if (!addr.isDefault) {
                          <button
                            type="button"
                            (click)="setDefaultAddress(addr.id)"
                            class="text-[#0D5C3A] hover:underline font-bold cursor-pointer">
                            Set as Default
                          </button>
                        } @else {
                          <span class="text-[11px] text-[#0D5C3A] font-semibold">Active Destination</span>
                        }

                        <button
                          type="button"
                          (click)="deleteAddress(addr.id)"
                          class="text-red-600 hover:text-red-800 text-[11px] font-semibold cursor-pointer">
                          Delete
                        </button>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- ============================================== -->
            <!-- TAB 4: BHIM UPI & ESCROW PAYMENTS              -->
            <!-- ============================================== -->
            @if (currentTab() === 'payments') {
              <div class="space-y-6">
                <div class="pb-4 border-b border-stone-100">
                  <h2 class="text-lg font-black text-[#15365B]">BHIM UPI & Government Escrow Protection</h2>
                  <p class="text-xs text-[#667085]">
                    RBI-regulated escrow account protects all artisan transactions until physical doorstep delivery.
                  </p>
                </div>

                <!-- Escrow Security Banner -->
                <div class="bg-gradient-to-r from-blue-900 to-[#15365B] text-white p-5 rounded-2xl space-y-2">
                  <div class="flex items-center gap-2">
                    <mat-icon class="!w-5 !h-5 !text-[22px] text-amber-300">security</mat-icon>
                    <span class="font-bold text-sm">Public Buyer Escrow Protection</span>
                  </div>
                  <p class="text-xs text-blue-100 leading-relaxed max-w-xl">
                    Payments are not disbursed to sellers immediately. They remain locked in an escrow account managed by National Informatics Center (NIC) until the India Post tracking system registers parcel receipt.
                  </p>
                </div>

                <div class="space-y-3">
                  <h3 class="text-xs font-bold uppercase tracking-wider text-[#667085]">Saved Direct Payment Methods</h3>
                  
                  <div class="p-4 rounded-xl border border-stone-200 bg-white flex items-center justify-between text-xs">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center font-black text-xs">
                        UPI
                      </div>
                      <div>
                        <div class="font-bold text-[#15365B]">BHIM UPI (Primary)</div>
                        <div class="text-[11px] text-[#667085] font-mono">yashdeep&#64;okhdfcbank</div>
                      </div>
                    </div>
                    <span class="text-[#0D5C3A] font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Verified
                    </span>
                  </div>

                  <div class="p-4 rounded-xl border border-stone-200 bg-white flex items-center justify-between text-xs">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xs">
                        CARD
                      </div>
                      <div>
                        <div class="font-bold text-[#15365B]">RuPay Platinum Debit Card</div>
                        <div class="text-[11px] text-[#667085] font-mono">•••• •••• •••• 4092</div>
                      </div>
                    </div>
                    <span class="text-[#0D5C3A] font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Zero Surcharge
                    </span>
                  </div>
                </div>
              </div>
            }

            <!-- ============================================== -->
            <!-- TAB 5: ARTISAN IMPACT CERTIFICATE              -->
            <!-- ============================================== -->
            @if (currentTab() === 'impact') {
              <div class="space-y-6">
                <div class="pb-4 border-b border-stone-100">
                  <h2 class="text-lg font-black text-[#15365B]">National Heritage Patronage Impact</h2>
                  <p class="text-xs text-[#667085]">
                    Trace the direct economic contribution of your purchases to rural master craftspeople.
                  </p>
                </div>

                <!-- Heritage Certificate Card -->
                <div class="p-6 sm:p-8 bg-[#FAF8F5] rounded-3xl border-2 border-[#D99A32]/60 relative text-center space-y-4">
                  <div class="w-16 h-16 rounded-full bg-[#15365B] text-amber-300 mx-auto flex items-center justify-center shadow-md">
                    <mat-icon class="!w-8 !h-8 !text-[36px]">military_tech</mat-icon>
                  </div>

                  <div class="space-y-1">
                    <div class="text-[10px] uppercase font-bold text-[#0D5C3A] tracking-widest">Certificate of Appreciation</div>
                    <h3 class="text-xl sm:text-2xl font-black text-[#15365B]">
                      Patron of Indian Traditional Crafts
                    </h3>
                    <p class="text-xs text-[#667085] max-w-md mx-auto">
                      Awarded to <span class="font-bold text-[#15365B]">Yashdeep Kumar</span> for sustaining India's living cultural heritage through direct purchases from GI clusters.
                    </p>
                  </div>

                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto text-xs pt-2">
                    <div class="p-2.5 bg-white rounded-xl border border-stone-200">
                      <div class="font-black text-[#0D5C3A] text-base">₹480</div>
                      <div class="text-[10px] text-[#667085]">SHG Welfare Corpus</div>
                    </div>
                    <div class="p-2.5 bg-white rounded-xl border border-stone-200">
                      <div class="font-black text-[#15365B] text-base">2 Cooperatives</div>
                      <div class="text-[10px] text-[#667085]">Directly Empowered</div>
                    </div>
                    <div class="p-2.5 bg-white rounded-xl border border-stone-200 col-span-2 sm:col-span-1">
                      <div class="font-black text-[#C25E00] text-base">100% Direct</div>
                      <div class="text-[10px] text-[#667085]">Middleman Free</div>
                    </div>
                  </div>

                  <div class="pt-2">
                    <button
                      type="button"
                      (click)="downloadCertificate()"
                      class="px-5 py-2.5 bg-[#15365B] hover:bg-[#0E2540] text-white text-xs font-bold rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer">
                      <mat-icon class="!w-4 !h-4 !text-[16px]">file_download</mat-icon>
                      <span>Download Certified e-Certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            }

            <!-- ============================================== -->
            <!-- TAB 6: CPGRAMS GRIEVANCE REDRESSAL             -->
            <!-- ============================================== -->
            @if (currentTab() === 'grievance') {
              <div class="space-y-6">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
                  <div>
                    <h2 class="text-lg font-black text-[#15365B]">CPGRAMS Citizen Grievance Portal</h2>
                    <p class="text-xs text-[#667085]">
                      Centralized Public Grievance Redress and Monitoring System for Government Artisan Marketplace.
                    </p>
                  </div>

                  <button
                    type="button"
                    (click)="showGrievanceForm.set(!showGrievanceForm())"
                    class="px-3.5 py-2 bg-[#0D5C3A] hover:bg-[#09432A] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto">
                    <mat-icon class="!w-4 !h-4 !text-[16px]">add_circle</mat-icon>
                    <span>{{ showGrievanceForm() ? 'Cancel' : 'Lodge New Grievance' }}</span>
                  </button>
                </div>

                <!-- Lodge Grievance Form -->
                @if (showGrievanceForm()) {
                  <form (submit)="submitGrievance($event)" class="p-5 bg-[#FAF8F5] rounded-2xl border border-stone-200 space-y-4 text-xs animate-fadeIn">
                    <h3 class="font-bold text-[#15365B] text-sm">Lodge Official Grievance</h3>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label for="grv-order" class="block font-bold text-[#344054] mb-1">Related Order Number</label>
                        <select
                          id="grv-order"
                          [value]="newGrievance().orderId"
                          (change)="updateGrievanceField('orderId', $any($event.target).value)"
                          class="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#0D5C3A]">
                          @for (ord of market.orders(); track ord.id) {
                            <option [value]="ord.id">{{ ord.id }} ({{ ord.date }})</option>
                          }
                        </select>
                      </div>

                      <div>
                        <label for="grv-cat" class="block font-bold text-[#344054] mb-1">Grievance Category</label>
                        <select
                          id="grv-cat"
                          [value]="newGrievance().category"
                          (change)="updateGrievanceField('category', $any($event.target).value)"
                          class="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#0D5C3A]">
                          <option value="Delivery Delay">Speed Post Transit Delay</option>
                          <option value="Product Authenticity">GI Tag Certificate Verification</option>
                          <option value="Damaged Item">Damaged in Transit Replacement</option>
                          <option value="Refund Escrow">Payment / Escrow Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label for="grv-sub" class="block font-bold text-[#344054] mb-1">Subject / Summary</label>
                      <input
                        id="grv-sub"
                        type="text"
                        [value]="newGrievance().subject"
                        (input)="updateGrievanceField('subject', $any($event.target).value)"
                        placeholder="e.g. Inquire about Speed Post dispatch date"
                        class="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-[#0D5C3A]"
                        required
                      />
                    </div>

                    <div class="flex items-center gap-2 pt-2">
                      <button
                        type="submit"
                        class="px-4 py-2 bg-[#0D5C3A] text-white font-bold rounded-xl cursor-pointer">
                        Submit Grievance
                      </button>
                      <button
                        type="button"
                        (click)="showGrievanceForm.set(false)"
                        class="px-4 py-2 bg-stone-200 text-[#344054] font-bold rounded-xl cursor-pointer">
                        Cancel
                      </button>
                    </div>
                  </form>
                }

                <!-- Existing Grievance Tickets -->
                <div class="space-y-3">
                  @for (t of grievances(); track t.id) {
                    <div class="p-4 rounded-xl border border-stone-200 bg-white space-y-2 text-xs">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                          <span class="font-bold text-[#15365B]">{{ t.id }}</span>
                          <span class="text-stone-400">·</span>
                          <span class="text-[#667085]">Order #{{ t.orderId }}</span>
                        </div>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold"
                          [class.bg-emerald-100]="t.status === 'Resolved'"
                          [class.text-[#0D5C3A]="t.status === 'Resolved'"
                          [class.bg-amber-100]="t.status !== 'Resolved'"
                          [class.text-amber-800]="t.status !== 'Resolved'">
                          {{ t.status }}
                        </span>
                      </div>

                      <div class="font-semibold text-[#1D2939]">{{ t.subject }}</div>
                      
                      @if (t.response) {
                        <div class="p-2.5 bg-[#FAF8F5] rounded-lg border border-stone-200/80 text-[11px] text-[#475467]">
                          <span class="font-bold text-[#0D5C3A]">CPGRAMS Response: </span>
                          <span>{{ t.response }}</span>
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
            }

          </div>

        </div>

      </div>
    </div>
  `
})
export class AccountPage {
  readonly market = inject(MarketplaceService);

  readonly currentTab = computed(() => this.market.activeAccountTab());
  readonly selectedOrder = signal<Order | null>(null);

  // Profile Form state
  readonly profileForm = signal({
    name: this.market.userProfile().name,
    email: this.market.userProfile().email,
    phone: this.market.userProfile().phone,
    state: this.market.userProfile().state,
    pincode: this.market.userProfile().pincode
  });

  // Address Form state
  readonly showAddressForm = signal<boolean>(false);
  readonly newAddress = signal<Partial<Address>>({
    fullName: '',
    phone: '',
    addressLine: '',
    pincode: '',
    city: '',
    state: '',
    type: 'Home'
  });

  // Grievances state
  readonly showGrievanceForm = signal<boolean>(false);
  readonly grievances = signal<GrievanceTicket[]>([
    {
      id: 'CPG-2026-08492',
      orderId: 'IN-SHG-2026-92810',
      category: 'Delivery Delay',
      subject: 'Speed Post RMS transit status query',
      date: '18 Oct 2026',
      status: 'Resolved',
      response: 'Dispatched through special festival express post; parcel delivered and verified with OTP.'
    }
  ]);

  readonly newGrievance = signal({
    orderId: 'IN-SHG-2026-92810',
    category: 'Delivery Delay',
    subject: ''
  });

  setTab(tab: 'orders' | 'profile' | 'addresses' | 'payments' | 'impact' | 'grievance') {
    this.market.activeAccountTab.set(tab);
    if (tab === 'orders') {
      this.selectedOrder.set(this.market.selectedOrder() || null);
    }
  }

  viewOrderTracking(order: Order) {
    this.selectedOrder.set(order);
    this.market.selectedOrder.set(order);
  }

  copyConsignmentNumber(trackingId: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(trackingId);
      this.market.showToast(`Copied Consignment #${trackingId}`, 'success');
    }
  }

  downloadInvoice(orderId: string) {
    this.market.showToast(`Downloading official GST invoice for #${orderId}...`, 'info');
  }

  lodgeGrievanceForOrder(orderId: string) {
    this.newGrievance.update(g => ({ ...g, orderId }));
    this.showGrievanceForm.set(true);
    this.setTab('grievance');
  }

  // Profile update
  updateProfileField(field: string, value: string) {
    this.profileForm.update(p => ({ ...p, [field]: value }));
  }

  saveProfile(e: Event) {
    e.preventDefault();
    const updated = this.profileForm();
    this.market.userProfile.update(u => ({ ...u, ...updated }));
    this.market.showToast('Citizen profile updated successfully!', 'success');
  }

  // Addresses
  updateNewAddressField(field: string, value: string) {
    this.newAddress.update(a => ({ ...a, [field]: value }));
  }

  saveNewAddress(e: Event) {
    e.preventDefault();
    const data = this.newAddress();
    if (!data.fullName || !data.addressLine || !data.pincode) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      fullName: data.fullName,
      phone: data.phone || this.market.userProfile().phone,
      addressLine: data.addressLine,
      pincode: data.pincode,
      district: data.city || 'District',
      city: data.city || 'City',
      state: data.state || 'State',
      type: (data.type as 'Home' | 'Work') || 'Home',
      isDefault: false
    };

    this.market.savedAddresses.update(all => [...all, newAddr]);
    this.showAddressForm.set(false);
    this.newAddress.set({ fullName: '', phone: '', addressLine: '', pincode: '', city: '', state: '', type: 'Home' });
    this.market.showToast('New delivery address saved!', 'success');
  }

  setDefaultAddress(id: string) {
    this.market.savedAddresses.update(all => 
      all.map(a => ({ ...a, isDefault: a.id === id }))
    );
    const def = this.market.savedAddresses().find(a => a.id === id);
    if (def) {
      this.market.savedAddress.set(def);
    }
    this.market.showToast('Default delivery address updated', 'info');
  }

  deleteAddress(id: string) {
    this.market.savedAddresses.update(all => all.filter(a => a.id !== id));
    this.market.showToast('Address removed', 'info');
  }

  downloadCertificate() {
    this.market.showToast('Generating official Certificate of Heritage Patronage (PDF)...', 'success');
  }

  // Grievance submit
  updateGrievanceField(field: string, value: string) {
    this.newGrievance.update(g => ({ ...g, [field]: value }));
  }

  submitGrievance(e: Event) {
    e.preventDefault();
    const g = this.newGrievance();
    if (!g.subject) return;

    const newTicket: GrievanceTicket = {
      id: `CPG-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      orderId: g.orderId,
      category: g.category,
      subject: g.subject,
      date: 'Today, ' + new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      status: 'Action Scheduled',
      response: 'CPGRAMS ticket acknowledged. Assigned to Department of Rural Development nodal officer.'
    };

    this.grievances.update(all => [newTicket, ...all]);
    this.showGrievanceForm.set(false);
    this.newGrievance.set({ orderId: this.market.orders()[0]?.id || '', category: 'Delivery Delay', subject: '' });
    this.market.showToast(`Grievance #${newTicket.id} lodged successfully on CPGRAMS`, 'success');
  }

  onSignOut() {
    this.market.showToast('Logged out of Citizen Portal. Switched to public guest mode.', 'info');
    this.market.setView('home');
  }
}
