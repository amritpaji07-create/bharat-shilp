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
  readonly selectedIndex = signal(0);
  readonly activeLook = computed(() => this.looks[this.selectedIndex()]);
  readonly market = inject(MarketplaceService);

  @ViewChild('section') private section?: ElementRef<HTMLElement>;
  @ViewChild('modelTrack') private modelTrack?: ElementRef<HTMLElement>;
  @ViewChildren('lookButton') private lookButtons?: QueryList<ElementRef<HTMLButtonElement>>;

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
      gsap.from(this.section.nativeElement.querySelectorAll('.look-model-card'), {
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
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
