import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';
import { PRODUCTS } from '../../data/mock-data';

interface CommunityReview {
  id: string;
  image: string;
  bubblePosition: 'right' | 'left';
  userName: string;
  city: string;
  state: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  productName: string;
}

const VERIFIED_REVIEWS = PRODUCTS.flatMap(product =>
  product.reviews
    .filter(review => review.verifiedPurchase)
    .map(review => ({ ...review, productName: product.name }))
);

function verifiedReview(id: string, image: string, bubblePosition: CommunityReview['bubblePosition']): CommunityReview {
  const review = VERIFIED_REVIEWS.find(item => item.id === id);
  if (!review) {
    throw new Error(`Verified review not found: ${id}`);
  }
  return { ...review, image, bubblePosition };
}

function sampleReview(
  id: string,
  image: string,
  bubblePosition: CommunityReview['bubblePosition'],
  userName: string,
  city: string,
  state: string,
  productName: string,
  comment: string
): CommunityReview {
  return {
    id,
    image,
    bubblePosition,
    userName,
    city,
    state,
    rating: 5,
    date: 'Illustrative example',
    comment,
    verifiedPurchase: false,
    productName
  };
}

@Component({
  selector: 'app-initiative-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  styles: [`
    @keyframes customerTrackUp {
      from { transform: translateY(0); }
      to { transform: translateY(-50%); }
    }
    @keyframes customerTrackDown {
      from { transform: translateY(-50%); }
      to { transform: translateY(0); }
    }
    .customer-track-up { animation: customerTrackUp 28s linear infinite; }
    .customer-track-down { animation: customerTrackDown 32s linear infinite; }
    .customer-network:hover .customer-track-up,
    .customer-network:hover .customer-track-down { animation-play-state: paused; }
  `],
  template: `
    <!-- Community Reviews -->
    <section
      class="relative bg-gradient-to-b from-[#F6FAF7] to-white py-12 pb-20 sm:py-16 sm:pb-24"
      aria-labelledby="trust-heading"
      (click)="dismissReview()">
      <div class="mx-auto max-w-[1480px] px-4 sm:px-6">
        <div class="mx-auto mb-7 max-w-2xl text-center sm:mb-9">
          <div class="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#0D5C3A]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#176B45] sm:text-xs">
            <mat-icon class="!h-3.5 !w-3.5 !text-[14px]">groups</mat-icon>
            <span>Community voices</span>
          </div>
          <h3 id="trust-heading" class="text-xl font-black tracking-tight text-[#123B36] sm:text-2xl lg:text-3xl">
            Made with care. Loved at home.
          </h3>
          <p class="mt-1 text-xs leading-relaxed text-[#667085] sm:text-sm">
            Hover or tap a portrait to read the buyer's experience.
          </p>
        </div>

        <div class="relative isolate mx-auto max-w-[1480px] overflow-visible rounded-[36px] border border-[#E7ECE9] bg-white/35 px-3 py-5 backdrop-blur-sm sm:px-6 sm:py-7" aria-label="Community reviews">
          <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[36px]" aria-hidden="true">
            <span class="absolute -left-16 top-6 h-56 w-56 rounded-full bg-[#D8D6E0]/65 blur-3xl"></span>
            <span class="absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-[#CDE4D7]/70 blur-3xl"></span>
            <span class="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F0E7D7]/55 blur-3xl"></span>
          </div>

          <div class="relative grid grid-cols-2 gap-x-3 gap-y-14 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4 xl:grid-cols-5">
            @for (review of communityReviews; track review.id) {
              <article
                class="relative h-[320px] rounded-[26px] border border-white/80 bg-white/35 px-2.5 pt-3 backdrop-blur-sm transition duration-300 hover:bg-white/55 sm:h-[340px] sm:px-3"
                [class.z-50]="activeReview()?.id === review.id"
                [class.blur-sm]="activeReview() !== null && activeReview()?.id !== review.id"
                [class.opacity-50]="activeReview() !== null && activeReview()?.id !== review.id"
                (mouseenter)="showReview(review)"
                (mouseleave)="hideReview(review.id)">
                @if (activeReview()?.id === review.id) {
                  <div
                    id="review-bubble-{{ review.id }}"
                    class="absolute top-3 z-50 w-[calc(100%-24px)] rotate-[-1deg] rounded-[22px] border-[3px] border-[#111] bg-white p-2.5 text-left shadow-[6px_7px_0_#111] sm:rounded-[24px] sm:p-3"
                    [style.left]="review.bubblePosition === 'left' ? '12px' : null"
                    [style.right]="review.bubblePosition === 'right' ? '12px' : null"
                    role="status">
                    <svg class="pointer-events-none absolute -left-3 -top-3 h-7 w-7" viewBox="0 0 40 40" aria-hidden="true">
                      <path d="M35 3 C20 5 9 16 5 31 M39 11 C27 13 19 22 15 34" fill="none" stroke="#111" stroke-linecap="round" stroke-width="1.6" />
                    </svg>
                    <div class="flex items-center justify-between gap-1">
                      <div class="flex shrink-0 text-amber-500" role="img" aria-label="{{ review.rating }} out of 5 stars">
                        @for (star of [1, 2, 3, 4, 5]; track star) {
                          <mat-icon class="!h-3 !w-3 !text-[12px] sm:!h-3.5 sm:!w-3.5 sm:!text-[14px]">{{ star <= review.rating ? 'star' : 'star_outline' }}</mat-icon>
                        }
                      </div>
                      <span
                        class="shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold leading-none sm:px-2 sm:text-[9px]"
                        [class.bg-[#ECFDF3]]="review.verifiedPurchase"
                        [class.text-[#176B45]]="review.verifiedPurchase"
                        [class.bg-slate-100]="!review.verifiedPurchase"
                        [class.text-slate-600]="!review.verifiedPurchase">
                        {{ review.verifiedPurchase ? 'Verified purchase' : 'Sample review' }}
                      </span>
                    </div>
                    <blockquote class="mt-1.5 text-[9px] leading-relaxed text-[#344054] sm:mt-2 sm:text-[11px]">
                      “{{ review.comment }}”
                    </blockquote>
                    <div class="mt-1.5 border-t border-slate-100 pt-1.5 sm:mt-2 sm:pt-2">
                      <p class="line-clamp-1 text-[9px] font-bold text-[#15365B] sm:text-[10px]">{{ review.productName }}</p>
                      <p class="mt-0.5 text-[8px] text-[#667085] sm:text-[9px]">{{ review.date }}</p>
                    </div>
                    <svg
                      class="pointer-events-none absolute -bottom-5 h-7 w-8"
                      [class.left-4]="review.bubblePosition === 'left'"
                      [class.right-4]="review.bubblePosition === 'right'"
                      viewBox="0 0 32 30"
                      aria-hidden="true">
                      <path d="M2 1 Q12 8 10 27 L28 4" [attr.transform]="review.bubblePosition === 'right' ? 'translate(32, 0) scale(-1, 1) translate(3, 3)' : 'translate(3, 3)'" fill="#111" stroke="#111" stroke-width="2" stroke-linejoin="round" />
                      <path
                        d="M2 1 Q12 8 10 27 L28 4"
                        [attr.transform]="review.bubblePosition === 'right' ? 'translate(32, 0) scale(-1, 1)' : null"
                        fill="white"
                        stroke="#111"
                        stroke-width="2"
                        stroke-linejoin="round">
                      </path>
                    </svg>
                  </div>
                }

                <span class="pointer-events-none absolute -bottom-4 left-1/2 z-10 h-32 w-32 -translate-x-1/2 rounded-full bg-[#D8D6E0]/85 blur-2xl lg:h-48 lg:w-48" aria-hidden="true"></span>
                <button
                  type="button"
                  class="absolute -bottom-4 left-1/2 z-20 h-[108px] w-[108px] -translate-x-1/2 overflow-hidden rounded-full border-[8px] border-white bg-[#D9D7DE] shadow-[0_14px_32px_rgba(9,43,32,0.24)] ring-2 ring-[#B9BBC4] transition duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(9,43,32,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D5C3A] sm:h-[136px] sm:w-[136px] lg:h-[160px] lg:w-[160px]"
                  [class.z-30]="activeReview()?.id === review.id"
                  [attr.aria-label]="'Read review from ' + review.userName"
                  [attr.aria-expanded]="activeReview()?.id === review.id"
                  [attr.aria-describedby]="activeReview()?.id === review.id ? 'review-bubble-' + review.id : null"
                  (focus)="showReview(review)"
                  (blur)="hideReview(review.id)"
                  (click)="showReview(review); $event.stopPropagation()">
                  <img [src]="review.image" alt="" class="h-full w-full scale-110 object-cover object-top" loading="lazy" />
                </button>
                <div class="absolute -bottom-12 left-1/2 z-20 w-[calc(100%-12px)] -translate-x-1/2 text-center">
                  <p class="truncate text-[10px] font-bold text-[#15365B] sm:text-xs">{{ review.userName }}</p>
                  <p class="truncate text-[8px] text-[#667085] sm:text-[10px]">{{ review.city }}, {{ review.state }}</p>
                </div>
              </article>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Connected Customer Network -->
    <section class="customer-network relative isolate h-[520px] overflow-hidden bg-[#F8FAFC] sm:h-[610px]" aria-labelledby="network-heading">
      <div class="absolute inset-0" aria-hidden="true">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1)_0%,rgba(255,255,255,0.98)_16%,rgba(255,255,255,0.78)_34%,rgba(248,250,252,0.26)_58%,rgba(248,250,252,0.98)_100%)]"></div>
        <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.98)_0%,rgba(248,250,252,0.82)_7%,transparent_19%,transparent_81%,rgba(248,250,252,0.82)_93%,rgba(248,250,252,0.98)_100%),linear-gradient(180deg,rgba(248,250,252,0.96)_0%,rgba(248,250,252,0.38)_5%,transparent_18%,transparent_82%,rgba(248,250,252,0.38)_95%,rgba(248,250,252,0.96)_100%)]"></div>
        <div class="absolute inset-x-0 -top-1 h-40 bg-gradient-to-b from-white via-white/90 to-transparent"></div>
        <div class="absolute inset-x-0 -bottom-1 h-40 bg-gradient-to-t from-white via-white/90 to-transparent"></div>
      </div>

      <div class="pointer-events-none absolute inset-0 grid grid-cols-4 gap-3 px-3 opacity-75 sm:grid-cols-6 sm:gap-4 sm:px-6 lg:grid-cols-8" aria-hidden="true">
        <div class="h-full overflow-hidden">
          <div class="customer-track-up flex flex-col gap-4">
            @for (image of ['/assets/images/T1.jpg', '/assets/images/T5.jpg', '/assets/images/T9.jpg', '/assets/images/T1.jpg', '/assets/images/T5.jpg']; track $index) {
              <img [src]="image" alt="" loading="lazy" class="h-32 w-full rounded-2xl object-cover object-top opacity-[0.10] grayscale-[85%] sm:h-40" />
            }
          </div>
        </div>
        <div class="mt-8 h-full overflow-hidden">
          <div class="customer-track-down flex flex-col gap-4">
            @for (image of ['/assets/images/T2.jpg', '/assets/images/T6.jpg', '/assets/images/T10.jpg', '/assets/images/T2.jpg', '/assets/images/T6.jpg']; track $index) {
              <img [src]="image" alt="" loading="lazy" class="h-36 w-full rounded-2xl object-cover object-top opacity-[0.10] grayscale-[85%] sm:h-44" />
            }
          </div>
        </div>
        <div class="h-full overflow-hidden">
          <div class="customer-track-up flex flex-col gap-4">
            @for (image of ['/assets/images/T3.jpg', '/assets/images/T7.jpg', '/assets/images/T1.jpg', '/assets/images/T3.jpg', '/assets/images/T7.jpg']; track $index) {
              <img [src]="image" alt="" loading="lazy" class="h-32 w-full rounded-2xl object-cover object-top opacity-[0.10] grayscale-[85%] sm:h-40" />
            }
          </div>
        </div>
        <div class="mt-12 h-full overflow-hidden">
          <div class="customer-track-down flex flex-col gap-4">
            @for (image of ['/assets/images/T4.jpg', '/assets/images/T8.jpg', '/assets/images/T2.jpg', '/assets/images/T4.jpg', '/assets/images/T8.jpg']; track $index) {
              <img [src]="image" alt="" loading="lazy" class="h-36 w-full rounded-2xl object-cover object-top opacity-[0.10] grayscale-[85%] sm:h-44" />
            }
          </div>
        </div>
        <div class="hidden h-full overflow-hidden sm:block">
          <div class="customer-track-up flex flex-col gap-4">
            @for (image of ['/assets/images/T5.jpg', '/assets/images/T9.jpg', '/assets/images/T3.jpg', '/assets/images/T5.jpg', '/assets/images/T9.jpg']; track $index) {
              <img [src]="image" alt="" loading="lazy" class="h-40 w-full rounded-2xl object-cover object-top opacity-[0.10] grayscale-[85%]" />
            }
          </div>
        </div>
        <div class="hidden h-full overflow-hidden sm:block">
          <div class="customer-track-down mt-10 flex flex-col gap-4">
            @for (image of ['/assets/images/T6.jpg', '/assets/images/T10.jpg', '/assets/images/T4.jpg', '/assets/images/T6.jpg', '/assets/images/T10.jpg']; track $index) {
              <img [src]="image" alt="" loading="lazy" class="h-44 w-full rounded-2xl object-cover object-top opacity-[0.10] grayscale-[85%]" />
            }
          </div>
        </div>
        <div class="hidden h-full overflow-hidden lg:block">
          <div class="customer-track-up flex flex-col gap-4">
            @for (image of ['/assets/images/T7.jpg', '/assets/images/T1.jpg', '/assets/images/T5.jpg', '/assets/images/T7.jpg', '/assets/images/T1.jpg']; track $index) {
              <img [src]="image" alt="" loading="lazy" class="h-40 w-full rounded-2xl object-cover object-top opacity-[0.10] grayscale-[85%]" />
            }
          </div>
        </div>
        <div class="hidden h-full overflow-hidden lg:block">
          <div class="customer-track-down mt-8 flex flex-col gap-4">
            @for (image of ['/assets/images/T8.jpg', '/assets/images/T2.jpg', '/assets/images/T6.jpg', '/assets/images/T8.jpg', '/assets/images/T2.jpg']; track $index) {
              <img [src]="image" alt="" loading="lazy" class="h-44 w-full rounded-2xl object-cover object-top opacity-[0.10] grayscale-[85%]" />
            }
          </div>
        </div>
      </div>

      <div class="absolute inset-0 z-10 flex items-center justify-center px-5 text-center">
        <div class="max-w-4xl">
          <div class="mb-4 inline-flex items-center rounded-full border border-[#D8DFF8] bg-[#EEF2FF]/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#4F5FC7] backdrop-blur-sm sm:text-xs">
            The Shreem marketplace
          </div>
          <h2 id="network-heading" class="text-6xl font-black leading-none tracking-[-0.055em] text-[#182F88] sm:text-8xl lg:text-[112px]">
            2,400+
          </h2>
          <p class="mt-2 text-2xl font-black tracking-tight text-[#15365B] sm:text-4xl lg:text-[46px]">
            shoppers choosing <span class="font-medium italic text-[#15365B]">handmade treasures.</span>
          </p>
          <p class="mx-auto mt-4 max-w-2xl text-xs leading-6 text-[#667085] sm:text-sm">
            Shop handloom textiles, tribal crafts, home accents and regional specialties—thoughtfully made by artisans across India.
          </p>
          <button
            type="button"
            (click)="market.setView('catalogue')"
            class="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#15365B] px-5 py-3 text-xs font-bold text-white shadow-[0_12px_28px_rgba(21,54,91,0.18)] transition hover:bg-[#176B45]">
            <span>Explore the collection</span>
            <mat-icon class="!h-4 !w-4 !text-[16px]">arrow_forward</mat-icon>
          </button>
        </div>
      </div>
    </section>

  `
})
export class InitiativeSection {
  readonly market = inject(MarketplaceService);
  readonly activeReview = signal<CommunityReview | null>(null);
  readonly communityReviews: CommunityReview[] = [
    verifiedReview('rev-01', '/assets/images/T1.jpg', 'left'),
    verifiedReview('rev-02', '/assets/images/T2.jpg', 'right'),
    verifiedReview('rev-04', '/assets/images/T3.jpg', 'left'),
    verifiedReview('rev-06', '/assets/images/T4.jpg', 'right'),
    sampleReview(
      'sample-01',
      '/assets/images/T5.jpg',
      'left',
      'Naina Kapoor',
      'Jaipur',
      'Rajasthan',
      'Hand-painted Blue Pottery Vase',
      'The blue floral finish adds a lovely handmade touch to my entryway.'
    ),
    verifiedReview('rev-03', '/assets/images/T6.jpg', 'left'),
    verifiedReview('rev-05', '/assets/images/T7.jpg', 'right'),
    sampleReview(
      'sample-02',
      '/assets/images/T8.jpg',
      'left',
      'Aarav Menon',
      'Bengaluru',
      'Karnataka',
      'Bastar Dhokra Brass Elephant',
      'The fine metal details and warm finish make this a memorable piece for our home.'
    ),
    sampleReview(
      'sample-03',
      '/assets/images/T9.jpg',
      'right',
      'Kabir Joshi',
      'Mumbai',
      'Maharashtra',
      'Handwoven Chanderi Stole',
      'Lightweight, beautifully woven, and easy to pair with festive outfits.'
    ),
    sampleReview(
      'sample-04',
      '/assets/images/T10.jpg',
      'left',
      'Ishaan Bhatt',
      'Ahmedabad',
      'Gujarat',
      'Handmade Artisanal Home Decor',
      'The colours are cheerful and the finishing feels thoughtful and personal.'
    )
  ];

  showReview(review: CommunityReview) {
    this.activeReview.set(review);
  }

  hideReview(id: string) {
    if (this.activeReview()?.id === id) {
      this.dismissReview();
    }
  }

  dismissReview() {
    this.activeReview.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.dismissReview();
  }

}
