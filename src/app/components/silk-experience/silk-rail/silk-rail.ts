import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
  computed,
  inject,
  signal
} from '@angular/core';
import { RAIL_CATEGORIES, SILK_RAIL, createSilkProduct } from '../../../data/silk-experience.data';
import { RailCategory, RailItem, RailSaree } from '../../../models/silk-experience.model';
import { MarketplaceService } from '../../../services/marketplace.service';
import { loadSilkGsap, SilkGsapRuntime } from '../../../shared/silk-gsap';
import { cancelSilkTrackScroll, smoothScrollSilkTrackBy } from '../../../shared/silk-track-scroll';

@Component({
  selector: 'app-silk-rail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './silk-rail.html',
  styleUrl: './silk-rail.scss'
})
export class SilkRailComponent implements AfterViewInit, OnDestroy {
  readonly categories: RailCategory[] = RAIL_CATEGORIES;
  readonly selectedCategory = signal<string>('all');
  readonly selectedIndex = signal<number>(0);
  readonly hoveredIndex = signal<number | null>(null);
  readonly focusIndex = computed(() => this.hoveredIndex() ?? this.selectedIndex());

  readonly allSarees: RailItem[] = SILK_RAIL;
  readonly displayedSarees = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.allSarees;
    const filtered = this.allSarees.filter(s => s.categoryType === cat);
    return filtered.length > 0 ? filtered : this.allSarees;
  });

  readonly activeSaree = computed(() => {
    const list = this.displayedSarees();
    const idx = this.selectedIndex();
    return list[idx] ?? list[0] ?? this.allSarees[0];
  });

  // Modal State for Rack Detail (Prompt 6)
  readonly isModalOpen = signal<boolean>(false);
  readonly modalItem = signal<RailItem | null>(null);
  readonly modalSide = signal<'front' | 'back'>('front');
  readonly selectedSize = signal<number | null>(null);
  readonly isModalLiked = signal<boolean>(false);

  readonly market = inject(MarketplaceService);
  readonly railImage = 'assets/silk-experience/shared/rail.svg';

  @ViewChild('section') private section?: ElementRef<HTMLElement>;
  @ViewChild('railTrack') private railTrack?: ElementRef<HTMLElement>;
  @ViewChildren('railCard') private railCards?: QueryList<ElementRef<HTMLButtonElement>>;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private destroyed = false;
  private runtime?: SilkGsapRuntime;
  private scrollFrame = 0;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.scrollCardIntoView(0);
    void this.initGsap();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.scrollFrame) {
      window.cancelAnimationFrame(this.scrollFrame);
    }
    cancelSilkTrackScroll(this.railTrack?.nativeElement);
  }

  @HostListener('window:keydown.escape')
  handleEscape(): void {
    if (this.isModalOpen()) {
      this.closeModal();
    }
  }

  private async initGsap(): Promise<void> {
    try {
      this.runtime = await loadSilkGsap();
      if (this.destroyed || !this.runtime || !this.section) return;
      const { gsap } = this.runtime;
      gsap.fromTo(
        this.section.nativeElement.querySelectorAll('.rail-saree-card'),
        { autoAlpha: 0.4 },
        { autoAlpha: 1, stagger: 0.04, duration: 0.5, ease: 'power2.out' }
      );
    } catch {
      // Fallback
    }
  }

  setCategory(categoryId: string): void {
    this.selectedCategory.set(categoryId);
    this.selectedIndex.set(0);
    this.scrollCardIntoView(0);
  }

  selectSaree(index: number): void {
    const total = this.displayedSarees().length;
    const safeIndex = (index + total) % total;
    this.selectedIndex.set(safeIndex);
    this.scrollCardIntoView(safeIndex);
  }

  onHover(index: number | null): void {
    this.hoveredIndex.set(index);
  }

  previousSaree(): void {
    this.selectSaree(this.selectedIndex() - 1);
  }

  nextSaree(): void {
    this.selectSaree(this.selectedIndex() + 1);
  }

  openModal(item: RailItem): void {
    this.modalItem.set(item);
    this.modalSide.set('front');
    this.selectedSize.set(null);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.modalItem.set(null);
  }

  toggleModalSide(side: 'front' | 'back'): void {
    this.modalSide.set(side);
  }

  selectSize(size: number): void {
    this.selectedSize.set(size);
  }

  toggleModalLike(): void {
    this.isModalLiked.update(v => !v);
  }

  modalNextItem(): void {
    const list = this.displayedSarees();
    const current = this.modalItem();
    if (!current) return;
    const idx = list.findIndex(s => s.id === current.id);
    const nextIdx = (idx + 1) % list.length;
    this.modalItem.set(list[nextIdx]);
    this.selectedIndex.set(nextIdx);
    this.scrollCardIntoView(nextIdx);
  }

  modalPreviousItem(): void {
    const list = this.displayedSarees();
    const current = this.modalItem();
    if (!current) return;
    const idx = list.findIndex(s => s.id === current.id);
    const prevIdx = (idx - 1 + list.length) % list.length;
    this.modalItem.set(list[prevIdx]);
    this.selectedIndex.set(prevIdx);
    this.scrollCardIntoView(prevIdx);
  }

  addToBag(saree: RailItem): void {
    const size = this.selectedSize();
    const nameWithSize = size ? `${saree.name} (Size ${size})` : saree.name;
    const product = createSilkProduct({
      id: `${saree.id}${size ? '-sz' + size : ''}`,
      name: nameWithSize,
      price: saree.price,
      image: saree.image,
      category: saree.category,
      description: saree.description
    });
    this.market.addToCart(product, 1);
    if (this.isModalOpen()) {
      this.closeModal();
    }
  }

  private scrollCardIntoView(index: number): void {
    if (!this.isBrowser) return;
    window.requestAnimationFrame(() => {
      if (this.destroyed) return;
      const cardEl = this.railCards?.get(index)?.nativeElement;
      const track = this.railTrack?.nativeElement;
      if (!cardEl || !track) return;

      cancelSilkTrackScroll(track);
      cardEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
        block: 'nearest'
      });
    });
  }

  onTrackWheel(event: WheelEvent): void {
    const track = this.railTrack?.nativeElement;
    if (!track) return;

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (!delta || !smoothScrollSilkTrackBy(track, delta)) return;

    event.preventDefault();
  }
}
