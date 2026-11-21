import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject,
  signal
} from '@angular/core';
import {
  HONEY_ARCHIVE_CATEGORIES,
  HONEY_PICK_VARIETIES,
  HONEY_SHELF_FILTERS,
  HONEY_SHELF_ITEMS,
  createCraftProduct
} from '../../../data/craft-studios.data';
import { CraftShelfItem } from '../../../models/craft-studio.model';
import { MarketplaceService } from '../../../services/marketplace.service';

@Component({
  selector: 'app-honey-studio',
  standalone: true,
  imports: [UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './honey-studio.html',
  styleUrl: './honey-studio.scss'
})
export class HoneyStudioComponent {
  readonly market = inject(MarketplaceService);

  readonly archiveCategories = HONEY_ARCHIVE_CATEGORIES;
  readonly pickVarieties = HONEY_PICK_VARIETIES;
  readonly shelfFilters = HONEY_SHELF_FILTERS;
  readonly shelfItems = HONEY_SHELF_ITEMS;

  // Section 1: Archive state
  readonly archiveIndex = signal<number>(0);

  // Section 2: Pick a Nectar state
  readonly pickIndex = signal<number>(0);
  readonly activePickVariety = computed(() => this.pickVarieties[this.pickIndex()] ?? this.pickVarieties[0]);
  readonly likedPicks = signal<Set<string>>(new Set());

  // Section 3: Cellar Shelf state
  readonly activeShelfFilter = signal<string>('all');
  readonly shelfIndex = signal<number>(0);
  readonly filteredShelfItems = computed(() => {
    const f = this.activeShelfFilter();
    if (f === 'all') return this.shelfItems;
    return this.shelfItems.filter(item => item.category === f);
  });
  readonly activeShelfItem = computed(() => this.filteredShelfItems()[this.shelfIndex()] ?? this.filteredShelfItems()[0]);
  readonly selectedShelfItem = signal<CraftShelfItem | null>(null);

  @ViewChild('archiveTrack') private archiveTrack?: ElementRef<HTMLElement>;
  @ViewChild('pickTrack') private pickTrack?: ElementRef<HTMLElement>;
  @ViewChild('shelfTrack') private shelfTrack?: ElementRef<HTMLElement>;

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  // Section 1 Controls
  prevArchive(): void {
    const total = this.archiveCategories.length;
    const nextIdx = (this.archiveIndex() - 1 + total) % total;
    this.selectArchive(nextIdx);
  }

  nextArchive(): void {
    const total = this.archiveCategories.length;
    const nextIdx = (this.archiveIndex() + 1) % total;
    this.selectArchive(nextIdx);
  }

  selectArchive(idx: number): void {
    this.archiveIndex.set(idx);
    const track = this.archiveTrack?.nativeElement;
    if (track) {
      const card = track.children[idx] as HTMLElement;
      card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  // Section 2 Controls
  prevPick(): void {
    const total = this.pickVarieties.length;
    const nextIdx = (this.pickIndex() - 1 + total) % total;
    this.selectPick(nextIdx);
  }

  nextPick(): void {
    const total = this.pickVarieties.length;
    const nextIdx = (this.pickIndex() + 1) % total;
    this.selectPick(nextIdx);
  }

  selectPick(idx: number): void {
    this.pickIndex.set(idx);
    const track = this.pickTrack?.nativeElement;
    if (track) {
      const card = track.children[idx] as HTMLElement;
      card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  togglePickLike(id: string, event: Event): void {
    event.stopPropagation();
    this.likedPicks.update(set => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  isPickLiked(id: string): boolean {
    return this.likedPicks().has(id);
  }

  addPickVariety(variety: { id: string; title: string; price: number; image: string; subtitle: string }, event?: Event): void {
    event?.stopPropagation();
    const product = createCraftProduct({
      id: variety.id,
      name: `${variety.title} Wild Flora Forest Honey 500g`,
      price: variety.price,
      image: variety.image,
      category: 'Single Origin Wild Honey',
      description: variety.subtitle
    });
    this.market.addToCart(product, 1);
  }

  // Section 3 Controls
  setShelfFilter(filterId: string): void {
    this.activeShelfFilter.set(filterId);
    this.shelfIndex.set(0);
  }

  prevShelf(): void {
    const total = this.filteredShelfItems().length;
    if (total === 0) return;
    const nextIdx = (this.shelfIndex() - 1 + total) % total;
    this.selectShelfItem(nextIdx);
  }

  nextShelf(): void {
    const total = this.filteredShelfItems().length;
    if (total === 0) return;
    const nextIdx = (this.shelfIndex() + 1) % total;
    this.selectShelfItem(nextIdx);
  }

  selectShelfItem(idx: number): void {
    this.shelfIndex.set(idx);
    const track = this.shelfTrack?.nativeElement;
    if (track) {
      const card = track.children[idx] as HTMLElement;
      card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  addShelfItem(item: CraftShelfItem): void {
    const product = createCraftProduct({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.categoryLabel || 'Pantry Reserve Honey',
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
