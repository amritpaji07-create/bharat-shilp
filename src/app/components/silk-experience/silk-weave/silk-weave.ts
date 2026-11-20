import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  inject,
  signal
} from '@angular/core';
import { SILK_SPOOLS, createSilkProduct } from '../../../data/silk-experience.data';
import { SilkSpool } from '../../../models/silk-experience.model';
import { MarketplaceService } from '../../../services/marketplace.service';

@Component({
  selector: 'app-silk-weave',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './silk-weave.html',
  styleUrl: './silk-weave.scss'
})
export class SilkWeaveComponent {
  readonly spools = SILK_SPOOLS;

  readonly activeStrand = signal<'A' | 'B' | 'C'>('A');
  readonly strandA = signal<SilkSpool>(this.spools[0]); // Muga Ivory Zari
  readonly strandB = signal<SilkSpool>(this.spools[1]); // Koorai Madras
  readonly strandC = signal<SilkSpool>(this.spools[2]); // Red Pit-Tassle

  readonly bespokePrice = computed(() => {
    return this.strandA().price + this.strandB().price + this.strandC().price;
  });

  readonly market = inject(MarketplaceService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  setActiveStrand(strand: 'A' | 'B' | 'C'): void {
    this.activeStrand.set(strand);
  }

  selectSpool(spool: SilkSpool): void {
    const cur = this.activeStrand();
    if (cur === 'A') {
      this.strandA.set(spool);
      this.activeStrand.set('B');
    } else if (cur === 'B') {
      this.strandB.set(spool);
      this.activeStrand.set('C');
    } else {
      this.strandC.set(spool);
      this.activeStrand.set('A');
    }
  }

  orderCustomWeave(): void {
    const sA = this.strandA();
    const sB = this.strandB();
    const sC = this.strandC();
    const name = `Bespoke Weave: ${sA.name} × ${sB.name} × ${sC.name}`;
    const price = this.bespokePrice();

    const product = createSilkProduct({
      id: `bespoke-${sA.id}-${sB.id}-${sC.id}`,
      name: name,
      price: price,
      image: 'assets/silk-experience/silk-rail/sarees/saree-01-royal-blue.png',
      category: 'Bespoke Custom Weave',
      description: `Custom woven silk saree blending Warp (${sA.name}), Weft (${sB.name}), and Zari Border (${sC.name}). Handcrafted on master pit-loom.`,
      origin: `${sA.origin} × ${sB.origin} × ${sC.origin}`
    });

    this.market.addToCart(product, 1);
  }
}
