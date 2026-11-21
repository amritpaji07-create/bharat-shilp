import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace.service';
import { PickASilkComponent } from '../pick-a-silk/pick-a-silk';
import { SilkRailComponent } from '../silk-rail/silk-rail';
import { SixMoodsComponent } from '../six-moods/six-moods';

@Component({
  selector: 'app-silk-studio',
  standalone: true,
  imports: [
    SixMoodsComponent,
    PickASilkComponent,
    SilkRailComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './silk-studio.html',
  styleUrl: './silk-studio.scss'
})
export class SilkStudioComponent {
  readonly market = inject(MarketplaceService);

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
