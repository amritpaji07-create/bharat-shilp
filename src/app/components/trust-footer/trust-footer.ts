import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-trust-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <footer class="bg-[#15365B] text-white border-t border-white/10 pt-12 pb-24 md:pb-12 text-xs">
      <div class="max-w-[1320px] mx-auto px-4 sm:px-6">
        
        <!-- 4-Column Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          
          <!-- Column 1 & 2: Brand Lockup & Mission -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                <mat-icon class="!w-5 !h-5 !text-[22px]">storefront</mat-icon>
              </div>
              <div>
                <span class="text-xl font-black tracking-tight text-white">BHARAT SHILP</span>
                <div class="text-[10px] text-amber-300 font-medium">National Government Marketplace for Artisans & SHGs</div>
              </div>
            </div>

            <p class="text-slate-300 leading-relaxed text-xs max-w-sm">
              An official public digital platform connecting rural master craftspeople, women-led Self Help Groups (DAY-NRLM), and tribal forest gatherers directly with consumers across India.
            </p>

            <div class="flex items-center gap-3 pt-1 text-slate-300">
              <span class="text-[11px] font-semibold text-white">Partner Initiatives:</span>
              <span class="bg-white/10 px-2 py-0.5 rounded text-[10px]">ODOP</span>
              <span class="bg-white/10 px-2 py-0.5 rounded text-[10px]">DAY-NRLM</span>
              <span class="bg-white/10 px-2 py-0.5 rounded text-[10px]">TRIFED</span>
              <span class="bg-white/10 px-2 py-0.5 rounded text-[10px]">India Post</span>
            </div>
          </div>

          <!-- Column 3: Quick Links -->
          <div class="space-y-3">
            <h4 class="font-bold text-sm text-white uppercase tracking-wider text-[11px]">Explore Marketplace</h4>
            <ul class="space-y-2 text-slate-300">
              <li>
                <button type="button" (click)="market.setView('catalogue')" class="hover:text-amber-300 transition-colors cursor-pointer">
                  All Certified Products
                </button>
              </li>
              <li>
                <button type="button" (click)="market.selectCategory('handloom-textiles')" class="hover:text-amber-300 transition-colors cursor-pointer">
                  Handloom & Textiles
                </button>
              </li>
              <li>
                <button type="button" (click)="market.selectCategory('tribal-metalcraft')" class="hover:text-amber-300 transition-colors cursor-pointer">
                  Tribal & Brass Metalcraft
                </button>
              </li>
              <li>
                <button type="button" (click)="market.selectCategory('organic-food')" class="hover:text-amber-300 transition-colors cursor-pointer">
                  Organic Forest Honey & Produce
                </button>
              </li>
              <li>
                <button type="button" (click)="market.setView('sellers')" class="hover:text-amber-300 transition-colors cursor-pointer">
                  Verified Producer Groups
                </button>
              </li>
            </ul>
          </div>

          <!-- Column 4: Citizen Support -->
          <div class="space-y-3">
            <h4 class="font-bold text-sm text-white uppercase tracking-wider text-[11px]">Citizen Support</h4>
            <ul class="space-y-2 text-slate-300">
              <li>
                <button type="button" (click)="market.openAccount('orders')" class="hover:text-amber-300 transition-colors cursor-pointer">
                  Track Speed Post Consignment
                </button>
              </li>
              <li>
                <button type="button" (click)="openHelp()" class="hover:text-amber-300 transition-colors cursor-pointer">
                  Shipping & Dispatch Guidelines
                </button>
              </li>
              <li>
                <button type="button" (click)="openHelp()" class="hover:text-amber-300 transition-colors cursor-pointer">
                  7-Day Return & Replacement Policy
                </button>
              </li>
              <li>
                <button type="button" (click)="market.openAccount('grievance')" class="hover:text-amber-300 transition-colors cursor-pointer">
                  CPGRAMS Grievance Portal
                </button>
              </li>
              <li>
                <span class="text-amber-300 font-semibold block pt-1">Artisan Toll-Free: 1800-11-2026</span>
              </li>
            </ul>
          </div>

          <!-- Column 5: Legal & Trust -->
          <div class="space-y-3">
            <h4 class="font-bold text-sm text-white uppercase tracking-wider text-[11px]">Government Compliance</h4>
            <ul class="space-y-2 text-slate-300">
              <li><span class="hover:text-white cursor-pointer">National GI Registry Compliance</span></li>
              <li><span class="hover:text-white cursor-pointer">Silk Mark Certification Act</span></li>
              <li><span class="hover:text-white cursor-pointer">FSSAI Organic Regulations</span></li>
              <li><span class="hover:text-white cursor-pointer">GIGW 3.0 Accessibility Standards</span></li>
              <li><span class="hover:text-white cursor-pointer">Terms & Conditions of Sale</span></li>
            </ul>
          </div>

        </div>

        <!-- Bottom Row: Disclaimer & Official Payment Badges -->
        <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {{ currentYear }} Bharat Shilp · Ministry of Rural Development, Government of India. All rights reserved.
          </div>

          <div class="flex items-center gap-4 text-xs font-semibold text-white/90">
            <span class="flex items-center gap-1 text-emerald-300">
              <mat-icon class="!w-4 !h-4 !text-[16px]">verified</mat-icon>
              <span>100% Direct DBT</span>
            </span>
            <span>·</span>
            <span class="flex items-center gap-1 text-amber-300">
              <mat-icon class="!w-4 !h-4 !text-[16px]">qr_code</mat-icon>
              <span>BHIM UPI Enabled</span>
            </span>
            <span>·</span>
            <span class="flex items-center gap-1 text-sky-300">
              <mat-icon class="!w-4 !h-4 !text-[16px]">markunread_mailbox</mat-icon>
              <span>India Post Logistics</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class TrustFooter {
  readonly market = inject(MarketplaceService);
  readonly currentYear = new Date().getFullYear();

  openHelp() {
    this.market.showToast('Official Bharat Shilp Shipping & Returns Policy: All fragile crafts insured by India Post Speed Post with 7-day replacement.', 'info');
  }
}
