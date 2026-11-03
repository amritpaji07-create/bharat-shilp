import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-initiative-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Government Initiatives Showcase -->
    <section class="bg-[#15365B] text-white py-12 sm:py-16" aria-labelledby="initiatives-heading">
      <div class="max-w-[1320px] mx-auto px-4 sm:px-6">
        
        <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">policy</mat-icon>
            <span>Government of India Schemes</span>
          </div>
          <h2 id="initiatives-heading" class="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            Empowering Rural India Through Digital Commerce
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Bharat Shilp unites flagship national missions on a single secure public e-marketplace, eliminating commission layers and giving rural producers direct market access.
          </p>
        </div>

        <!-- 4 Major Government Scheme Pillars -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div class="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors space-y-3">
            <div class="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
              <mat-icon class="!w-5 !h-5 !text-[20px]">hub</mat-icon>
            </div>
            <h3 class="text-base font-bold text-white">One District One Product (ODOP)</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Fosters balanced regional development across all 766 districts of India by unlocking unique indigenous crafts and agrarian specialties.
            </p>
            <div class="text-[11px] text-amber-300 font-semibold pt-1">
              766 Districts Covered
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-colors space-y-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold">
              <mat-icon class="!w-5 !h-5 !text-[20px]">groups_3</mat-icon>
            </div>
            <h3 class="text-base font-bold text-white">DAY-NRLM (Aajeevika)</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Deendayal Antyodaya Yojana mobilizes over 9.5 crore rural women into Self Help Groups (SHGs) for economic self-reliance and entrepreneurship.
            </p>
            <div class="text-[11px] text-emerald-300 font-semibold pt-1">
              48,000+ Verified SHG Clusters
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/40 transition-colors space-y-3">
            <div class="w-10 h-10 rounded-xl bg-sky-400/20 text-sky-300 flex items-center justify-center font-bold">
              <mat-icon class="!w-5 !h-5 !text-[20px]">nature_people</mat-icon>
            </div>
            <h3 class="text-base font-bold text-white">TRIFED (Tribal Livelihoods)</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Ministry of Tribal Affairs federation protecting forest produce gatherers and tribal bell-metal craftsmen from middlemen exploitation.
            </p>
            <div class="text-[11px] text-sky-300 font-semibold pt-1">
              100% Minimum Support Price Assured
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-400/40 transition-colors space-y-3">
            <div class="w-10 h-10 rounded-xl bg-rose-400/20 text-rose-300 flex items-center justify-center font-bold">
              <mat-icon class="!w-5 !h-5 !text-[20px]">local_shipping</mat-icon>
            </div>
            <h3 class="text-base font-bold text-white">Department of Posts Integration</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Dak Ghar Niryat Kendra enables rural post offices to pick up packaged crafts straight from remote villages and deliver across India.
            </p>
            <div class="text-[11px] text-rose-300 font-semibold pt-1">
              19,100+ Pin Codes Connected
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- Why Choose Bharat Shilp / Trust Strip -->
    <section class="max-w-[1320px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div class="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div class="text-center max-w-xl mx-auto mb-8">
          <h3 class="text-xl sm:text-2xl font-black text-[#15365B]">
            Why Citizens Trust Bharat Shilp
          </h3>
          <p class="text-xs sm:text-sm text-[#667085] mt-1">
            Built on official public digital infrastructure designed for maximum transparency and community impact.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div class="flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-[#176B45] flex items-center justify-center shrink-0">
              <mat-icon class="!w-5 !h-5 !text-[22px]">verified_user</mat-icon>
            </div>
            <div>
              <h4 class="font-bold text-sm text-[#15365B]">Geographical Indication (GI) Protected</h4>
              <p class="text-[#667085] mt-1 leading-relaxed">
                Every product carries recognized government intellectual property credentials preventing powerloom counterfeits and preserving heritage.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-amber-50 text-[#D99A32] flex items-center justify-center shrink-0">
              <mat-icon class="!w-5 !h-5 !text-[22px]">payments</mat-icon>
            </div>
            <div>
              <h4 class="font-bold text-sm text-[#15365B]">0% Middleman Margin</h4>
              <p class="text-[#667085] mt-1 leading-relaxed">
                Commercial marketplaces deduct 25-40% cuts. Bharat Shilp is a zero-profit government digital utility where 100% of fair value reaches rural families.
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center shrink-0">
              <mat-icon class="!w-5 !h-5 !text-[22px]">gavel</mat-icon>
            </div>
            <div>
              <h4 class="font-bold text-sm text-[#15365B]">7-Day Guaranteed Redressal</h4>
              <p class="text-[#667085] mt-1 leading-relaxed">
                Backed by CPGRAMS consumer protection protocols. Any transit damages or craftsmanship issues are promptly resolved with speed post pickup.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Verified Citizen Testimonials -->
    <section class="max-w-[1320px] mx-auto px-4 sm:px-6 pb-12 sm:pb-16" aria-labelledby="testimonial-heading">
      <div class="flex items-end justify-between mb-8">
        <div>
          <div class="text-xs font-bold text-[#176B45] uppercase tracking-wider">Citizen Experiences</div>
          <h3 id="testimonial-heading" class="text-xl sm:text-2xl font-black text-[#15365B] mt-0.5">
            What Our Patrons Say Across India
          </h3>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between text-xs space-y-3">
          <div class="space-y-2">
            <div class="flex items-center text-amber-500">
              @for (s of [1,2,3,4,5]; track s) {
                <mat-icon class="!w-3.5 !h-3.5 !text-[15px]">star</mat-icon>
              }
            </div>
            <p class="text-[#1D2939] leading-relaxed italic">
              "The Chanderi saree arrived in an exquisite mulberry leaf box with a QR certificate stamped by the Weavers Service Centre. The sheer drape and authenticity cannot be matched by commercial brands."
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div class="font-bold text-[#15365B]">Dr. Priya Swaminathan</div>
              <div class="text-[11px] text-[#667085]">Bengaluru · Purchased Chanderi Zari Saree</div>
            </div>
            <span class="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">Verified Citizen</span>
          </div>
        </div>

        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between text-xs space-y-3">
          <div class="space-y-2">
            <div class="flex items-center text-amber-500">
              @for (s of [1,2,3,4,5]; track s) {
                <mat-icon class="!w-3.5 !h-3.5 !text-[15px]">star</mat-icon>
              }
            </div>
            <p class="text-[#1D2939] leading-relaxed italic">
              "The Bastar Dhokra elephant figurine is genuine bell metal with heavy weight and stunning rustic lost-wax texture. Knowing the payment went straight to the Bastar tribal SHG is the best part."
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div class="font-bold text-[#15365B]">Vikramaditya Rathore</div>
              <div class="text-[11px] text-[#667085]">Jaipur · Purchased Bastar Dhokra Diya</div>
            </div>
            <span class="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">Verified Citizen</span>
          </div>
        </div>

        <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between text-xs space-y-3">
          <div class="space-y-2">
            <div class="flex items-center text-amber-500">
              @for (s of [1,2,3,4,5]; track s) {
                <mat-icon class="!w-3.5 !h-3.5 !text-[15px]">star</mat-icon>
              }
            </div>
            <p class="text-[#1D2939] leading-relaxed italic">
              "The raw wild forest honey has a complex floral fragrance that commercial supermarket syrups never possess. Delivery took 3 days via Speed Post right to our doorstep."
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div class="font-bold text-[#15365B]">Meera Sen</div>
              <div class="text-[11px] text-[#667085]">Kolkata · Purchased Raw Wild Honey</div>
            </div>
            <span class="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">Verified Citizen</span>
          </div>
        </div>

      </div>
    </section>

    <!-- Citizen Newsletter Subscription -->
    <section class="max-w-[1320px] mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
      <div class="bg-gradient-to-r from-[#15365B] to-[#176B45] text-white p-8 sm:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div class="space-y-1 text-center md:text-left max-w-lg">
          <h3 class="text-xl sm:text-2xl font-black">Stay Connected with Indian Heritage</h3>
          <p class="text-xs sm:text-sm text-slate-200">
            Receive monthly updates on newly onboarded artisan clusters, ODOP exhibitions, and seasonal harvests.
          </p>
        </div>

        <div class="flex items-center gap-2 w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email address..."
            class="px-4 py-2.5 text-xs bg-white text-[#1D2939] rounded-lg focus:outline-none w-full sm:w-72"
          />
          <button
            type="button"
            (click)="onSubscribe()"
            class="px-5 py-2.5 bg-[#D99A32] hover:bg-amber-600 text-white font-bold text-xs rounded-lg transition-colors shrink-0 cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  `
})
export class InitiativeSection {
  readonly market = inject(MarketplaceService);

  onSubscribe() {
    this.market.showToast('Subscribed to Bharat Shilp official updates!', 'success');
  }
}
