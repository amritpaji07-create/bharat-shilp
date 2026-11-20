import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace.service';
import { PickASilkComponent } from '../pick-a-silk/pick-a-silk';
import { SilkRailComponent } from '../silk-rail/silk-rail';
import { SilkReelsComponent } from '../silk-reels/silk-reels';
import { SilkWeaveComponent } from '../silk-weave/silk-weave';
import { SixMoodsComponent } from '../six-moods/six-moods';
import { TryTheLookComponent } from '../try-the-look/try-the-look';

@Component({
  selector: 'app-silk-studio',
  standalone: true,
  imports: [
    SixMoodsComponent,
    TryTheLookComponent,
    PickASilkComponent,
    SilkRailComponent,
    SilkReelsComponent,
    SilkWeaveComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './silk-studio.html',
  styleUrl: './silk-studio.scss'
})
export class SilkStudioComponent {
  readonly market = inject(MarketplaceService);

  readonly heroImage = 'assets/silk-experience/hero/noolam-showroom-hero.png';

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
