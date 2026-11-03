import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-announcement-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <aside 
      aria-label="Official Government Announcement"
      class="bg-[#0F3E37] text-white/95 text-xs border-b border-white/10 transition-colors duration-200">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        
        <!-- Left: Official Government of India & Missions -->
        <div class="flex items-center gap-2.5 flex-wrap">
          <!-- Indian Emblem & Text -->
          <div class="flex items-center gap-2">
            <!-- Lion Capital emblem representation -->
            <div class="w-5 h-6 flex flex-col justify-center items-center text-amber-300" title="National Emblem of India" aria-hidden="true">
              <mat-icon class="!w-5 !h-5 !text-[20px] leading-none">account_balance</mat-icon>
            </div>
            <div class="flex flex-col leading-none">
              <span class="font-bold text-[11px] tracking-wide text-white">भारत सरकार</span>
              <span class="text-[9px] text-white/80 font-medium">Government of India</span>
            </div>
          </div>

          <span class="text-white/30 hidden sm:inline">|</span>

          <!-- Mission statement pillars -->
          <div class="hidden md:flex items-center gap-3 text-[11px] text-white/85 font-normal">
            <span>Empowering Local Communities</span>
            <span class="text-white/30">|</span>
            <span>Supporting Self Help Groups</span>
            <span class="text-white/30">|</span>
            <span class="text-amber-200 font-medium">Promoting Indian Products</span>
          </div>
        </div>

        <!-- Right: Language & Accessibility -->
        <div class="flex items-center gap-3.5 text-xs font-medium ml-auto">
          
          <!-- Language Switcher: हिन्दी | English -->
          <div class="flex items-center gap-1.5 text-[11px]">
            <button 
              type="button"
              (click)="market.currentLanguage.set('hi')"
              [class.text-amber-300]="market.currentLanguage() === 'hi'"
              [class.font-bold]="market.currentLanguage() === 'hi'"
              [class.text-white/80]="market.currentLanguage() !== 'hi'"
              class="hover:text-amber-200 transition-colors cursor-pointer">
              हिन्दी
            </button>
            <span class="text-white/40">|</span>
            <button 
              type="button"
              (click)="market.currentLanguage.set('en')"
              [class.text-amber-300]="market.currentLanguage() === 'en'"
              [class.font-bold]="market.currentLanguage() === 'en'"
              [class.text-white/80]="market.currentLanguage() !== 'en'"
              class="hover:text-amber-200 transition-colors cursor-pointer">
              English
            </button>
          </div>

          <span class="text-white/30">|</span>

          <!-- Accessibility Font Sizer -->
          <div class="flex items-center gap-1 text-[11px]" title="Accessibility Font Size">
            <span class="text-white/70 hidden sm:inline">Accessibility:</span>
            <button 
              type="button"
              (click)="market.setFontScale('normal')"
              [class.text-amber-300]="market.fontScale() === 'normal'"
              [class.font-bold]="market.fontScale() === 'normal'"
              class="hover:text-white px-1">A</button>
            <button 
              type="button"
              (click)="market.setFontScale('large')"
              [class.text-amber-300]="market.fontScale() === 'large'"
              [class.font-bold]="market.fontScale() === 'large'"
              class="hover:text-white px-1 font-bold">A+</button>
          </div>

          <span class="text-white/30 hidden sm:inline">|</span>

          <!-- Help & Support -->
          <button 
            type="button"
            (click)="market.toggleAccountModal(true)"
            class="flex items-center gap-1 text-[11px] text-white/90 hover:text-amber-200 transition-colors cursor-pointer">
            <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">headset_mic</mat-icon>
            <span>Help & Support</span>
          </button>
        </div>

      </div>
    </aside>
  `
})
export class AnnouncementBar {
  readonly market = inject(MarketplaceService);
}
