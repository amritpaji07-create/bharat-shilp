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
import { SILK_CATEGORIES, createSilkProduct } from '../../../data/silk-experience.data';
import { SilkCategory } from '../../../models/silk-experience.model';
import { MarketplaceService } from '../../../services/marketplace.service';
import { loadSilkGsap, SilkGsapRuntime } from '../../../shared/silk-gsap';

@Component({
  selector: 'app-pick-a-silk',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pick-a-silk.html',
  styleUrl: './pick-a-silk.scss'
})
export class PickASilkComponent implements AfterViewInit, OnDestroy {
  readonly categories = SILK_CATEGORIES;
  readonly selectedIndex = signal(0);
  readonly activeCategory = computed(() => this.categories[this.selectedIndex()] ?? this.categories[0]);
  readonly likedCategories = signal<Set<string>>(new Set());
  readonly market = inject(MarketplaceService);

  @ViewChild('section') private section?: ElementRef<HTMLElement>;
  @ViewChild('categoryTrack') private categoryTrack?: ElementRef<HTMLElement>;
  @ViewChildren('categoryButton') private categoryButtons?: QueryList<ElementRef<HTMLButtonElement>>;

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
        this.section.nativeElement.querySelectorAll('.silk-category-card'),
        { y: 20 },
        { y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out' }
      );
    } catch {
      // Fallback
    }
  }

  selectCategory(index: number): void {
    const total = this.categories.length;
    const safeIndex = (index + total) % total;
    this.selectedIndex.set(safeIndex);
    this.scrollCategoryIntoView(safeIndex);
  }

  previousCategory(): void {
    this.selectCategory(this.selectedIndex() - 1);
  }

  nextCategory(): void {
    this.selectCategory(this.selectedIndex() + 1);
  }

  toggleLike(categoryId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.likedCategories.update(set => {
      const next = new Set(set);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }

  isLiked(categoryId: string): boolean {
    return this.likedCategories().has(categoryId);
  }

  addCategoryToBag(category: SilkCategory, event: MouseEvent): void {
    event.stopPropagation();
    const product = createSilkProduct({
      id: `pick-${category.id}`,
      name: category.name,
      price: category.price,
      image: category.image,
      category: category.colorName || 'Silk Saree',
      description: category.note || `${category.name} pure handloom silk saree.`
    });
    this.market.addToCart(product, 1);
  }

  onMouseMove(event: MouseEvent, card: HTMLButtonElement): void {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  }

  onMouseLeave(card: HTMLButtonElement): void {
    card.style.transform = '';
  }

  private scrollCategoryIntoView(index: number): void {
    const el = this.categoryButtons?.get(index)?.nativeElement;
    if (el && this.categoryTrack?.nativeElement) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }
}
