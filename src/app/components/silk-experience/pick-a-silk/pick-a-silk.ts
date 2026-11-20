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
import { SILK_CATEGORIES } from '../../../data/silk-experience.data';
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
  readonly activeCategory = computed(() => this.categories[this.selectedIndex()]);
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
      gsap.from(this.section.nativeElement.querySelectorAll('.silk-category-card'), {
        y: 40,
        opacity: 0,
        stagger: 0.07,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: this.section.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
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

  exploreCategory(): void {
    const catalogEl = document.getElementById('handloom-catalog') || document.querySelector('app-product-catalogue');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
