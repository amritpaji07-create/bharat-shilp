import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { SILK_CATEGORIES } from '../../../data/silk-experience.data';
import { SilkCategory } from '../../../models/silk-experience.model';
import { animateSilkCardImage } from '../../../shared/silk-card-animation';
import { loadSilkGsap, SilkGsapRuntime } from '../../../shared/silk-gsap';
import { cancelSilkTrackScroll } from '../../../shared/silk-track-scroll';

@Component({
  selector: 'app-six-moods',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './six-moods.html',
  styleUrl: './six-moods.scss'
})
export class SixMoodsComponent implements AfterViewInit, OnDestroy {
  readonly sarees: SilkCategory[] = SILK_CATEGORIES;
  readonly activeIndex = signal(0);

  @ViewChild('section') private section?: ElementRef<HTMLElement>;
  @ViewChild('sareeTrack') private sareeTrack?: ElementRef<HTMLElement>;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private destroyed = false;
  private runtime?: SilkGsapRuntime;
  private animationCleanup?: () => void;
  private scrollFrame = 0;
  private cardZoomAnimation?: Animation;
  private wheelScroll?: { track: HTMLElement; target: number };

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    void this.initGsap();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.scrollFrame) {
      window.cancelAnimationFrame(this.scrollFrame);
    }
    const track = this.sareeTrack?.nativeElement;
    cancelSilkTrackScroll(track);
    if (track) this.runtime?.gsap.killTweensOf(track, 'scrollLeft');
    this.wheelScroll = undefined;
    this.cardZoomAnimation?.cancel();
    this.animationCleanup?.();
  }

  selectSaree(index: number, card: HTMLElement): void {
    this.activeIndex.set(index);
    this.cardZoomAnimation?.cancel();
    this.cardZoomAnimation = animateSilkCardImage(card.querySelector<HTMLElement>('.arch-img') ?? null);
  }

  previousPage(): void {
    this.scrollByPage(-1);
  }

  nextPage(): void {
    this.scrollByPage(1);
  }

  onTrackWheel(event: WheelEvent): void {
    const track = this.sareeTrack?.nativeElement;
    if (!track) return;

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (!delta) return;

    const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    const currentTarget = this.wheelScroll?.track === track ? this.wheelScroll.target : track.scrollLeft;
    const target = Math.max(0, Math.min(maxScrollLeft, currentTarget + delta));
    if (target === currentTarget) return;

    cancelSilkTrackScroll(track);
    this.runtime?.gsap.killTweensOf(track, 'scrollLeft');
    event.preventDefault();

    if (!this.runtime) {
      track.scrollTo({ left: target, behavior: 'smooth' });
      return;
    }

    const wheelScroll = { track, target };
    this.wheelScroll = wheelScroll;
    this.runtime.gsap.to(track, {
      scrollLeft: target,
      duration: 0.32,
      ease: 'power2.out',
      onComplete: () => {
        if (this.wheelScroll === wheelScroll) this.wheelScroll = undefined;
      },
      onInterrupt: () => {
        if (this.wheelScroll === wheelScroll) this.wheelScroll = undefined;
      }
    });
  }

  onTrackScroll(): void {
    const track = this.sareeTrack?.nativeElement;
    if (!this.isBrowser || !track || this.scrollFrame) return;

    this.scrollFrame = window.requestAnimationFrame(() => {
      this.scrollFrame = 0;
      const trackStart = track.getBoundingClientRect().left + track.clientLeft;
      const cards = track.querySelectorAll<HTMLElement>('.mood-card');
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - trackStart);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      this.activeIndex.set(closestIndex);
    });
  }

  private async initGsap(): Promise<void> {
    this.runtime = await loadSilkGsap();
    const section = this.section?.nativeElement;
    const track = this.sareeTrack?.nativeElement;
    if (this.destroyed || !this.runtime || !section || !track) return;

    const { gsap } = this.runtime;
    const context = gsap.context(() => {
      gsap.fromTo(
        track.querySelectorAll('.mood-card'),
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true
          }
        }
      );
    }, section);

    this.animationCleanup = () => context.revert();
  }

  private scrollByPage(direction: -1 | 1): void {
    const track = this.sareeTrack?.nativeElement;
    if (!track) return;
    cancelSilkTrackScroll(track);
    this.wheelScroll = undefined;

    const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    if (!maxScrollLeft) return;

    const atBoundary = direction > 0
      ? track.scrollLeft >= maxScrollLeft - 1
      : track.scrollLeft <= 1;
    const target = atBoundary
      ? direction > 0 ? 0 : maxScrollLeft
      : Math.max(0, Math.min(maxScrollLeft, track.scrollLeft + direction * track.clientWidth));

    if (this.runtime) {
      this.runtime.gsap.to(track, {
        scrollLeft: target,
        duration: 0.75,
        ease: 'power3.out',
        overwrite: 'auto'
      });
      return;
    }

    track.scrollTo({ left: target, behavior: 'smooth' });
  }
}
