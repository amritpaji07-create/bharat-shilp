import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
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
import { SILK_LOOKS, createSilkProduct } from '../../../data/silk-experience.data';
import { SilkLook, SilkPiece } from '../../../models/silk-experience.model';
import { MarketplaceService } from '../../../services/marketplace.service';
import { cancelSilkTrackScroll, smoothScrollSilkTrackBy } from '../../../shared/silk-track-scroll';

@Component({
  selector: 'app-try-the-look',
  standalone: true,
  imports: [UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './try-the-look.html',
  styleUrl: './try-the-look.scss'
})
export class TryTheLookComponent implements AfterViewInit, OnDestroy {
  readonly looks = SILK_LOOKS;
  readonly selectedIndex = signal<number>(0);
  readonly activeLook = computed(() => this.looks[this.selectedIndex()] ?? this.looks[0]);
  readonly likedPieces = signal<Set<string>>(new Set());
  readonly likedLooks = signal<Set<string>>(new Set());
  readonly market = inject(MarketplaceService);

  @ViewChild('modelTrack') private modelTrack?: ElementRef<HTMLElement>;
  @ViewChildren('lookItem') private lookItems?: QueryList<ElementRef<HTMLElement>>;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private destroyed = false;
  private scrollFrame = 0;
  private isInitialScroll = true;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    setTimeout(() => {
      this.scrollModelIntoView(0, false);
      setTimeout(() => {
        this.isInitialScroll = false;
      }, 400);
    }, 150);
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.scrollFrame) {
      window.cancelAnimationFrame(this.scrollFrame);
    }
    cancelSilkTrackScroll(this.modelTrack?.nativeElement);
  }

  getDistance(index: number): number {
    return Math.abs(this.selectedIndex() - index);
  }

  selectLook(index: number): void {
    const total = this.looks.length;
    const safeIndex = (index + total) % total;
    this.selectedIndex.set(safeIndex);
    this.scrollModelIntoView(safeIndex, true);
  }

  onTrackScroll(): void {
    if (!this.isBrowser || this.isInitialScroll || this.scrollFrame) return;

    this.scrollFrame = window.requestAnimationFrame(() => {
      this.scrollFrame = 0;
      this.updateSelectionFromScroll();
    });
  }

  onTrackWheel(event: WheelEvent): void {
    const track = this.modelTrack?.nativeElement;
    if (!track) return;

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (!delta || !smoothScrollSilkTrackBy(track, delta)) return;

    event.preventDefault();
  }

  private updateSelectionFromScroll(): void {
    const track = this.modelTrack?.nativeElement;
    const items = this.lookItems?.toArray();
    if (!track || !items?.length) return;

    const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDist = Number.POSITIVE_INFINITY;

    items.forEach((itemRef, idx) => {
      const rect = itemRef.nativeElement.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(itemCenter - trackCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = idx;
      }
    });

    if (closestIndex !== this.selectedIndex()) {
      this.selectedIndex.set(closestIndex);
    }
  }

  private scrollModelIntoView(index: number, smooth: boolean): void {
    const track = this.modelTrack?.nativeElement;
    const items = this.lookItems?.toArray();
    if (!track || !items || !items[index]) return;

    const targetEl = items[index].nativeElement;
    const trackRect = track.getBoundingClientRect();
    const itemRect = targetEl.getBoundingClientRect();

    const currentScroll = track.scrollLeft;
    const targetOffset = currentScroll + (itemRect.left - trackRect.left) - (track.clientWidth / 2 - itemRect.width / 2);

    cancelSilkTrackScroll(track);
    track.scrollTo({
      left: targetOffset,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  toggleLikePiece(pieceId: string): void {
    this.likedPieces.update(set => {
      const next = new Set(set);
      if (next.has(pieceId)) {
        next.delete(pieceId);
      } else {
        next.add(pieceId);
      }
      return next;
    });
  }

  isPieceLiked(pieceId: string): boolean {
    return this.likedPieces().has(pieceId);
  }

  toggleLookLike(lookId: string): void {
    this.likedLooks.update(set => {
      const next = new Set(set);
      if (next.has(lookId)) {
        next.delete(lookId);
      } else {
        next.add(lookId);
      }
      return next;
    });
  }

  isLookLiked(lookId: string): boolean {
    return this.likedLooks().has(lookId);
  }

  addIndividualPiece(piece: SilkPiece, look: SilkLook): void {
    const product = createSilkProduct({
      id: `${look.id}-${piece.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: piece.name,
      price: piece.price,
      image: piece.image,
      category: look.category,
      description: piece.description ?? `${piece.name} - Handcrafted pure silk ensemble piece.`
    });
    this.market.addToCart(product, 1);
  }

  addEntireLook(look: SilkLook): void {
    for (const piece of look.pieces) {
      const product = createSilkProduct({
        id: `${look.id}-${piece.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: piece.name,
        price: piece.price,
        image: piece.image,
        category: look.category,
        description: piece.description ?? `${piece.name} - Part of ${look.name} styled look.`
      });
      this.market.addToCart(product, 1);
    }
  }
}
