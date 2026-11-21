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
import { animateSilkCardImage } from '../../../shared/silk-card-animation';
import { loadSilkGsap, SilkGsapRuntime } from '../../../shared/silk-gsap';
import { cancelSilkTrackScroll, smoothScrollSilkTrackBy } from '../../../shared/silk-track-scroll';

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
  private scrollFrame = 0;
  private cardZoomAnimation?: Animation;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    void this.initGsap();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.scrollFrame) {
      window.cancelAnimationFrame(this.scrollFrame);
    }
    cancelSilkTrackScroll(this.categoryTrack?.nativeElement);
    this.cardZoomAnimation?.cancel();
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
    this.animateCategoryImage(safeIndex);
  }

  onCategoryWheel(event: WheelEvent): void {
    const track = this.categoryTrack?.nativeElement;
    if (!track) return;

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (!delta || !smoothScrollSilkTrackBy(track, delta)) return;

    event.preventDefault();
  }

  onCategoryTrackScroll(): void {
    const track = this.categoryTrack?.nativeElement;
    const buttons = this.categoryButtons?.toArray();
    if (!this.isBrowser || !track || !buttons?.length || this.scrollFrame) return;

    this.scrollFrame = window.requestAnimationFrame(() => {
      this.scrollFrame = 0;
      const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      buttons.forEach((button, index) => {
        const rect = button.nativeElement.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - trackCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== this.selectedIndex()) {
        this.selectedIndex.set(closestIndex);
      }
    });
  }

  previousCategory(): void {
    this.scrollCategoryPage(-1);
  }

  nextCategory(): void {
    this.scrollCategoryPage(1);
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
    const track = this.categoryTrack?.nativeElement;
    if (el && track) {
      cancelSilkTrackScroll(track);
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
        block: 'nearest'
      });
    }
  }

  private animateCategoryImage(index: number): void {
    const image = this.categoryButtons?.get(index)?.nativeElement
      .querySelector<HTMLElement>('.category-model-img');
    this.cardZoomAnimation?.cancel();
    this.cardZoomAnimation = animateSilkCardImage(image ?? null);
  }

  private scrollCategoryPage(direction: -1 | 1): void {
    const track = this.categoryTrack?.nativeElement;
    if (!track) return;
    cancelSilkTrackScroll(track);

    const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    if (!maxScrollLeft) return;

    const atBoundary = direction > 0
      ? track.scrollLeft >= maxScrollLeft - 1
      : track.scrollLeft <= 1;
    const left = atBoundary
      ? direction > 0 ? 0 : maxScrollLeft
      : Math.max(0, Math.min(maxScrollLeft, track.scrollLeft + direction * track.clientWidth));

    track.scrollTo({ left, behavior: 'smooth' });
  }
}
