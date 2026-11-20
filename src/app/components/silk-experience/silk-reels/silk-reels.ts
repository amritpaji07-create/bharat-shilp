import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
  computed,
  inject,
  signal
} from '@angular/core';
import { SILK_REELS, createSilkProduct } from '../../../data/silk-experience.data';
import { SilkReel } from '../../../models/silk-experience.model';
import { MarketplaceService } from '../../../services/marketplace.service';

@Component({
  selector: 'app-silk-reels',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './silk-reels.html',
  styleUrl: './silk-reels.scss'
})
export class SilkReelsComponent implements AfterViewInit, OnDestroy {
  readonly reels = SILK_REELS;
  readonly selectedIndex = signal(0);
  readonly isMuted = signal(true);
  readonly isPlaying = signal(true);
  readonly activeReel = computed(() => this.reels[this.selectedIndex()]);

  readonly market = inject(MarketplaceService);

  @ViewChildren('reelVideo') private reelVideos?: QueryList<ElementRef<HTMLVideoElement>>;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.syncActiveVideo();
    }
  }

  ngOnDestroy(): void {}

  selectReel(index: number): void {
    const total = this.reels.length;
    const safeIndex = (index + total) % total;
    this.selectedIndex.set(safeIndex);
    this.isPlaying.set(true);
    setTimeout(() => this.syncActiveVideo(), 50);
  }

  previousReel(): void {
    this.selectReel(this.selectedIndex() - 1);
  }

  nextReel(): void {
    this.selectReel(this.selectedIndex() + 1);
  }

  togglePlay(): void {
    this.isPlaying.update(p => !p);
    const video = this.reelVideos?.get(this.selectedIndex())?.nativeElement;
    if (video) {
      if (this.isPlaying()) {
        void video.play();
      } else {
        video.pause();
      }
    }
  }

  toggleSound(): void {
    this.isMuted.update(m => !m);
    const video = this.reelVideos?.get(this.selectedIndex())?.nativeElement;
    if (video) {
      video.muted = this.isMuted();
    }
  }

  private syncActiveVideo(): void {
    if (!this.reelVideos) return;
    this.reelVideos.forEach((vRef, idx) => {
      const v = vRef.nativeElement;
      if (idx === this.selectedIndex()) {
        v.muted = this.isMuted();
        if (this.isPlaying()) {
          void v.play().catch(() => {});
        }
      } else {
        v.pause();
      }
    });
  }

  addToBag(reel: SilkReel): void {
    const product = createSilkProduct({
      id: reel.id,
      name: `${reel.title} Handloom Silk`,
      price: reel.price,
      image: reel.avatar ?? 'assets/silk-experience/silk-reels/reel-01-ponni.png',
      category: 'Silk Reel',
      description: reel.subtitle ?? reel.title
    });
    this.market.addToCart(product, 1);
  }
}
