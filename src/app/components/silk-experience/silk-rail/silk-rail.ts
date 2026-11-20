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
import { RAIL_CATEGORIES, SILK_RAIL, createSilkProduct } from '../../../data/silk-experience.data';
import { RailCategory, RailSaree } from '../../../models/silk-experience.model';
import { MarketplaceService } from '../../../services/marketplace.service';
import { loadSilkGsap, SilkGsapRuntime } from '../../../shared/silk-gsap';

@Component({
  selector: 'app-silk-rail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './silk-rail.html',
  styleUrl: './silk-rail.scss'
})
export class SilkRailComponent implements AfterViewInit, OnDestroy {
  readonly categories = RAIL_CATEGORIES;
  readonly selectedCategory = signal<string>('all');
  readonly selectedIndex = signal<number>(0);
  readonly hoveredIndex = signal<number | null>(null);

  readonly allSarees = SILK_RAIL;
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

  readonly market = inject(MarketplaceService);
  readonly railImage = 'assets/silk-experience/shared/rail.svg';

  @ViewChild('section') private section?: ElementRef<HTMLElement>;
  @ViewChild('railTrack') private railTrack?: ElementRef<HTMLElement>;
  @ViewChildren('railCard') private railCards?: QueryList<ElementRef<HTMLButtonElement>>;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private destroyed = false;
  private runtime?: SilkGsapRuntime;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    void this.initGsap();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  private async initGsap(): Promise<void> {
    try {
      this.runtime = await loadSilkGsap();
      if (this.destroyed || !this.runtime || !this.section) return;
      const { gsap } = this.runtime;
      gsap.fromTo(
        this.section.nativeElement.querySelectorAll('.rail-saree-card'),
        { y: 20 },
        { y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out' }
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

  private scrollCardIntoView(index: number): void {
    const cardEl = this.railCards?.get(index)?.nativeElement;
    if (cardEl && this.railTrack?.nativeElement) {
      cardEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }

  addToBag(saree: RailSaree): void {
    const catalogProduct = saree.catalogueProductId
      ? this.market.allProducts().find(p => p.id === saree.catalogueProductId)
      : null;

    if (catalogProduct) {
      this.market.addToCart(catalogProduct, 1);
    } else {
      const product = createSilkProduct({
        id: saree.id,
        name: saree.name,
        price: saree.price,
        image: saree.image,
        category: saree.category,
        description: saree.description
      });
      this.market.addToCart(product, 1);
    }
  }

  tryThisLook(saree: RailSaree): void {
    const lookEl = document.getElementById('try-the-look-heading');
    if (lookEl) {
      lookEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
