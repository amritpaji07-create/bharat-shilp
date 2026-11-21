import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PickASilkComponent } from '../pick-a-silk/pick-a-silk';
import { SilkRailComponent } from '../silk-rail/silk-rail';
import { SilkReelsComponent } from '../silk-reels/silk-reels';
import { SilkWeaveComponent } from '../silk-weave/silk-weave';
import { TryTheLookComponent } from '../try-the-look/try-the-look';

@Component({
  selector: 'app-silk-studio',
  standalone: true,
  imports: [
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
export class SilkStudioComponent {}
