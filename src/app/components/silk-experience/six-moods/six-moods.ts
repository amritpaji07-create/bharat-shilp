import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SIX_MOODS } from '../../../data/silk-experience.data';
import { SilkMood } from '../../../models/silk-experience.model';

@Component({
  selector: 'app-six-moods',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './six-moods.html',
  styleUrl: './six-moods.scss'
})
export class SixMoodsComponent {
  readonly moods: SilkMood[] = SIX_MOODS;
}
