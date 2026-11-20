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
import { SILK_LOOKS, createSilkProduct } from '../../../data/silk-experience.data';
import { SilkLook, SilkPiece } from '../../../models/silk-experience.model';
import { MarketplaceService } from '../../../services/marketplace.service';
import { loadSilkGsap, SilkGsapRuntime } from '../../../shared/silk-gsap';

@Component({
  selector: 'app-try-the-look',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './try-the-look.html',
  styleUrl: './try-the-look.scss'
})
export class TryTheLookComponent implements AfterViewInit, OnDestroy {
  readonly looks = SILK_LOOKS;
  // Default to index 6 (Look 7: Ivory Elephant matching NOOLAM spec 03-try-the-look.png)
  readonly selectedIndex = signal(6);
  readonly activeLook = computed(() => this.looks[this.selectedIndex()] ?? this.looks[0]);
  readonly likedPieces = signal<Set<string>>(new Set());
  readonly market = inject(MarketplaceService);

  @ViewChild('section') private section?: ElementRef<HTMLElement>;
  @ViewChild('modelTrack') private modelTrack?: ElementRef<HTMLElement>;
  @ViewChildren('lookButton') private lookButtons?: QueryList<ElementRef<HTMLButtonElement>>;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private destroyed = false;
  private runtime?: SilkGsapRuntime;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.scrollModelIntoView(this.selectedIndex());
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
        this.section.nativeElement.querySelectorAll('.look-model-card'),
        { y: 20 },
        { y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out' }
      );
    } catch {
      // Fallback
    }
  }

  selectLook(index: number): void {
    const total = this.looks.length;
    const safeIndex = (index + total) % total;
    this.selectedIndex.set(safeIndex);
    this.scrollModelIntoView(safeIndex);
  }

  previousLook(): void {
    this.selectLook(this.selectedIndex() - 1);
  }

  nextLook(): void {
    this.selectLook(this.selectedIndex() + 1);
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

  private scrollModelIntoView(index: number): void {
    const el = this.lookButtons?.get(index)?.nativeElement;
    if (el && this.modelTrack?.nativeElement) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }

  addSareeOnly(look: SilkLook): void {
    const sareePiece = look.pieces.find(p => p.type === 'Saree') ?? look.pieces[0];
    const product = createSilkProduct({
      id: `${look.id}-saree`,
      name: sareePiece.name,
      price: sareePiece.price,
      image: look.productImage,
      category: look.category,
      description: look.description
    });
    this.market.addToCart(product, 1);
  }

  addEntireLook(look: SilkLook): void {
    for (const piece of look.pieces) {
      const product = createSilkProduct({
        id: `${look.id}-${piece.type.toLowerCase()}`,
        name: piece.name,
        price: piece.price,
        image: piece.image,
        category: look.category,
        description: piece.description ?? look.description
      });
      this.market.addToCart(product, 1);
    }
  }

  addIndividualPiece(piece: SilkPiece, look: SilkLook): void {
    const product = createSilkProduct({
      id: `${look.id}-${piece.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: piece.name,
      price: piece.price,
      image: piece.image,
      category: look.category,
      description: piece.description ?? look.description
    });
    this.market.addToCart(product, 1);
  }
}
