import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MarketplaceService } from '../../services/marketplace.service';

@Component({
  selector: 'app-trust-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <footer class="bg-[#8BDEFA] text-xs text-[#102719]">
      <div class="relative">
        <img
          src="assets/images/footer.png"
          alt=""
          class="block h-auto w-full"
        />

        <div class="relative z-10 mx-auto max-w-[1480px] px-5 py-8 sm:px-8 lg:absolute lg:inset-x-0 lg:top-0 lg:bottom-[27%] lg:flex lg:flex-col lg:justify-between lg:px-12 lg:pt-[2%] lg:pb-[1%]">
          <div class="mx-auto max-w-3xl text-center">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#153B25] shadow-sm backdrop-blur-sm sm:text-xs">
              <mat-icon class="!h-5 !w-5 !text-[20px] text-[#176B45]">eco</mat-icon>
              Made by many hands
            </span>
            <h2 class="mt-3 text-3xl font-black leading-tight tracking-tight text-[#101B18] sm:text-4xl lg:text-5xl">
              Every piece carries a place with it.
            </h2>
            <p class="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-[#152923] sm:text-base">
              Discover thoughtful work from India's artisan communities, made slowly and shared directly.
            </p>
          </div>

          <div class="mt-8 grid gap-8 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4 lg:gap-6 xl:gap-10">
            <nav aria-label="Explore marketplace" class="space-y-3">
              <h3 class="text-sm font-black uppercase tracking-wide text-[#12452A]">Explore</h3>
              <ul class="space-y-2.5 text-sm font-medium leading-relaxed text-[#14251E]">
                <li><button type="button" (click)="market.setView('catalogue')" class="transition-colors hover:text-[#176B45]">All products</button></li>
                <li><button type="button" (click)="market.selectCategory('handloom-textiles')" class="transition-colors hover:text-[#176B45]">Handloom &amp; textiles</button></li>
                <li><button type="button" (click)="market.selectCategory('tribal-metalcraft')" class="transition-colors hover:text-[#176B45]">Tribal &amp; brass crafts</button></li>
                <li><button type="button" (click)="market.selectCategory('organic-food')" class="transition-colors hover:text-[#176B45]">Forest produce</button></li>
                <li><button type="button" (click)="market.setView('sellers')" class="transition-colors hover:text-[#176B45]">Meet the makers</button></li>
              </ul>
            </nav>

            <nav aria-label="Customer support" class="space-y-3">
              <h3 class="text-sm font-black uppercase tracking-wide text-[#12452A]">Need a hand?</h3>
              <ul class="space-y-2.5 text-sm font-medium leading-relaxed text-[#14251E]">
                <li><button type="button" (click)="market.openAccount('orders')" class="transition-colors hover:text-[#176B45]">Track an order</button></li>
                <li><button type="button" (click)="openHelp()" class="transition-colors hover:text-[#176B45]">Shipping &amp; dispatch</button></li>
                <li><button type="button" (click)="openHelp()" class="transition-colors hover:text-[#176B45]">Returns &amp; replacements</button></li>
                <li><button type="button" (click)="market.openAccount('grievance')" class="transition-colors hover:text-[#176B45]">Raise a grievance</button></li>
              </ul>
              <span class="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-[#E8F7CB]/90 px-3 py-2 text-xs font-extrabold text-[#123B25] shadow-sm">
                <mat-icon class="!h-4 !w-4 !text-[16px]">call</mat-icon>
                Artisan helpline: 1800-11-2026
              </span>
            </nav>

            <div class="space-y-3">
              <h3 class="text-sm font-black uppercase tracking-wide text-[#12452A]">Trust &amp; care</h3>
              <ul class="space-y-3 text-sm font-medium leading-relaxed text-[#14251E]">
                <li class="flex items-center gap-2.5"><mat-icon class="!h-5 !w-5 !text-[20px] text-[#176B45]">gpp_good</mat-icon><span>National GI Registry</span></li>
                <li class="flex items-center gap-2.5"><mat-icon class="!h-5 !w-5 !text-[20px] text-[#176B45]">workspace_premium</mat-icon><span>Silk Mark certification</span></li>
                <li class="flex items-center gap-2.5"><mat-icon class="!h-5 !w-5 !text-[20px] text-[#176B45]">eco</mat-icon><span>FSSAI organic standards</span></li>
                <li class="flex items-center gap-2.5"><mat-icon class="!h-5 !w-5 !text-[20px] text-[#176B45]">accessibility_new</mat-icon><span>Accessibility standards</span></li>
              </ul>
            </div>

            <div class="space-y-3">
              <h3 class="text-sm font-black uppercase tracking-wide text-[#12452A]">Stay connected</h3>
              <form (submit)="onSubscribe($event)" class="flex items-center gap-2 rounded-full border border-white/80 bg-white/95 p-1.5 pl-3 shadow-[0_8px_24px_rgba(20,66,43,0.12)]">
                <mat-icon class="!h-5 !w-5 !text-[20px] shrink-0 text-[#176B45]">mail_outline</mat-icon>
                <input
                  type="email"
                  required
                  aria-label="Email address for newsletter"
                  placeholder="Your email address"
                  class="min-w-0 flex-1 bg-transparent py-2 text-xs text-[#1E3D2D] outline-none placeholder:text-[#68766D]"
                />
                <button
                  type="submit"
                  class="shrink-0 rounded-full bg-[#07532F] px-4 py-2.5 text-xs font-extrabold text-white transition-colors hover:bg-[#0D7041] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07532F]">
                  Subscribe
                </button>
              </form>
              <p class="text-center text-xs font-semibold leading-relaxed text-[#263B31]">
                Thoughtful updates from artisan communities.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative z-10 border-t border-white/70 bg-[#FFF8E9]/90 px-5 py-3.5 text-[#202B24] backdrop-blur-sm sm:px-8 lg:px-12">
        <div class="mx-auto flex max-w-[1480px] flex-col items-center justify-between gap-2 text-center text-[10px] font-medium sm:flex-row sm:text-left">
          <p>© {{ currentYear }} Ministry of Rural Development, Government of India. All rights reserved.</p>
          <p class="flex items-center gap-1.5">
            <mat-icon class="!h-4 !w-4 !text-[16px] text-[#176B45]">favorite</mat-icon>
            A marketplace for Indian artisans, powered by community.
          </p>
        </div>
      </div>
    </footer>
  `
})
export class TrustFooter {
  readonly market = inject(MarketplaceService);
  readonly currentYear = new Date().getFullYear();

  onSubscribe(event: Event) {
    event.preventDefault();
    this.market.showToast('Subscribed to Shreem official updates!', 'success');
  }

  openHelp() {
    this.market.showToast('Official Shreem Shipping & Returns Policy: All fragile crafts insured by India Post Speed Post with 7-day replacement.', 'info');
  }
}
