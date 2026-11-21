import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BRIDAL_COLLECTION, createSilkProduct } from '../../../data/silk-experience.data';
import { BridalSaree } from '../../../models/silk-experience.model';
import { MarketplaceService } from '../../../services/marketplace.service';

@Component({
  selector: 'app-bridal-collection',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bridal-collection.html',
  styleUrl: './bridal-collection.scss'
})
export class BridalCollectionComponent {
  readonly sarees: BridalSaree[] = BRIDAL_COLLECTION;
  readonly selectedIndex = signal<number>(0);
  readonly activeSaree = computed(() => this.sarees[this.selectedIndex()] ?? this.sarees[0]);
  readonly likedIds = signal<Set<string>>(new Set());
  readonly market = inject(MarketplaceService);

  selectSaree(index: number): void {
    const total = this.sarees.length;
    const safeIndex = (index + total) % total;
    this.selectedIndex.set(safeIndex);
  }

  previousSaree(): void {
    this.selectSaree(this.selectedIndex() - 1);
  }

  nextSaree(): void {
    this.selectSaree(this.selectedIndex() + 1);
  }

  toggleLike(id: string): void {
    this.likedIds.update(set => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  isLiked(id: string): boolean {
    return this.likedIds().has(id);
  }

  addToCart(saree: BridalSaree): void {
    const product = createSilkProduct({
      id: saree.id,
      name: saree.name,
      price: saree.price,
      image: saree.image,
      category: 'Bridal Kanjivaram',
      description: `${saree.name} - ${saree.fabric}. ${saree.palluNote}.`
    });
    this.market.addToCart(product, 1);
  }
}
