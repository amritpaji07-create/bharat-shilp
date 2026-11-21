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
import {
  POTTERY_ARCHIVE_CATEGORIES,
  POTTERY_ENSEMBLES,
  POTTERY_PICK_VARIETIES,
  POTTERY_REELS,
  POTTERY_SHELF_FILTERS,
  POTTERY_SHELF_ITEMS,
  createCraftProduct
} from '../../../data/craft-studios.data';
import {
  CraftArchiveCategory,
  CraftEnsemble,
  CraftPiece,
  CraftReel,
  CraftShelfItem
} from '../../../models/craft-studio.model';
import { MarketplaceService } from '../../../services/marketplace.service';

@Component({
  selector: 'app-pottery-studio',
  standalone: true,
  imports: [UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pottery-studio.html',
  styleUrl: './pottery-studio.scss'
})
export class PotteryStudioComponent implements AfterViewInit, OnDestroy {
  readonly market = inject(MarketplaceService);

  readonly archiveCategories = POTTERY_ARCHIVE_CATEGORIES;
  readonly ensembles = POTTERY_ENSEMBLES;
  readonly pickVarieties = POTTERY_PICK_VARIETIES;
  readonly shelfFilters = POTTERY_SHELF_FILTERS;
  readonly shelfItems = POTTERY_SHELF_ITEMS;
  readonly reels = POTTERY_REELS;

  // Selected Ensemble in "Curate the Hearth"
  readonly selectedIndex = signal<number>(0);
  readonly activeEnsemble = computed(() => this.ensembles[this.selectedIndex()] ?? this.ensembles[0]);

  // Shelf Filter & Modal
  readonly activeShelfFilter = signal<string>('all');
  readonly filteredShelfItems = computed(() => {
    const f = this.activeShelfFilter();
    if (f === 'all') return this.shelfItems;
    return this.shelfItems.filter(item => item.category === f);
  });
  readonly selectedShelfItem = signal<CraftShelfItem | null>(null);

  // Likes
  readonly likedPieces = signal<Set<string>>(new Set());
  readonly likedEnsembles = signal<Set<string>>(new Set());

  @ViewChild('modelTrack') private modelTrack?: ElementRef<HTMLElement>;
  @ViewChildren('ensembleItem') private ensembleItems?: QueryList<ElementRef<HTMLElement>>;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private destroyed = false;
  private scrollFrame = 0;
  private isInitialScroll = true;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    setTimeout(() => {
      this.scrollEnsembleIntoView(0, false);
      setTimeout(() => {
        this.isInitialScroll = false;
      }, 300);
    }, 150);
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.scrollFrame) {
      window.cancelAnimationFrame(this.scrollFrame);
    }
  }

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  getDistance(index: number): number {
    return Math.abs(this.selectedIndex() - index);
  }

  selectEnsemble(index: number): void {
    const total = this.ensembles.length;
    const safeIndex = (index + total) % total;
    this.selectedIndex.set(safeIndex);
    this.scrollEnsembleIntoView(safeIndex, true);
  }

  onTrackScroll(): void {
    if (!this.isBrowser || this.isInitialScroll || this.scrollFrame) return;

    this.scrollFrame = window.requestAnimationFrame(() => {
      this.scrollFrame = 0;
      this.updateSelectionFromScroll();
    });
  }

  private updateSelectionFromScroll(): void {
    const track = this.modelTrack?.nativeElement;
    const items = this.ensembleItems?.toArray();
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

  private scrollEnsembleIntoView(index: number, smooth: boolean): void {
    const track = this.modelTrack?.nativeElement;
    const items = this.ensembleItems?.toArray();
    if (!track || !items || !items[index]) return;

    const targetEl = items[index].nativeElement;
    const trackRect = track.getBoundingClientRect();
    const itemRect = targetEl.getBoundingClientRect();

    const currentScroll = track.scrollLeft;
    const targetOffset = currentScroll + (itemRect.left - trackRect.left) - (track.clientWidth / 2 - itemRect.width / 2);

    track.scrollTo({
      left: targetOffset,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  toggleLikePiece(pieceId: string): void {
    this.likedPieces.update(set => {
      const next = new Set(set);
      if (next.has(pieceId)) next.delete(pieceId);
      else next.add(pieceId);
      return next;
    });
  }

  isPieceLiked(pieceId: string): boolean {
    return this.likedPieces().has(pieceId);
  }

  toggleEnsembleLike(id: string): void {
    this.likedEnsembles.update(set => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  isEnsembleLiked(id: string): boolean {
    return this.likedEnsembles().has(id);
  }

  addIndividualPiece(piece: CraftPiece, ensemble: CraftEnsemble): void {
    const product = createCraftProduct({
      id: `${ensemble.id}-${piece.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: piece.name,
      price: piece.price,
      image: piece.image,
      category: 'Artisanal Pottery & Ceramics',
      artisanName: piece.brand || 'KUMBH HERITAGE',
      badge: 'Hand-thrown Ceramic'
    });
    this.market.addToCart(product, 1);
  }

  addEntireEnsemble(ensemble: CraftEnsemble): void {
    const bundleProduct = createCraftProduct({
      id: `${ensemble.id}-complete-ensemble`,
      name: `${ensemble.name} (Full 6-Piece Table Set)`,
      price: ensemble.bundlePrice,
      originalPrice: ensemble.totalPrice,
      image: ensemble.image,
      category: 'Living Earth Kitchen Suite',
      badge: 'Curated 6-Piece Pottery Set'
    });
    this.market.addToCart(bundleProduct, 1);
  }

  addPickVariety(variety: { id: string; title: string; price: number; image: string; subtitle: string }): void {
    const product = createCraftProduct({
      id: variety.id,
      name: `${variety.title} Ceramic Creation`,
      price: variety.price,
      image: variety.image,
      category: 'Regional Clay Craft',
      description: variety.subtitle
    });
    this.market.addToCart(product, 1);
  }

  addShelfItem(item: CraftShelfItem): void {
    const product = createCraftProduct({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.categoryLabel || 'Studio Pottery Ware',
      description: item.description,
      state: item.origin
    });
    this.market.addToCart(product, 1);
  }

  openShelfModal(item: CraftShelfItem): void {
    this.selectedShelfItem.set(item);
  }

  closeShelfModal(): void {
    this.selectedShelfItem.set(null);
  }
}
