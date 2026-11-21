import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, PLATFORM_ID, ViewChild, inject, computed, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MarketplaceService } from './services/marketplace.service';
import { AnnouncementBar } from './components/announcement-bar/announcement-bar';
import { Header } from './components/header/header';
import { HeroCarousel } from './components/hero-carousel/hero-carousel';
import { CategoryGrid } from './components/category-grid/category-grid';
import { ProductCard } from './components/product-card/product-card';
import { ProductCatalogue } from './components/product-catalogue/product-catalogue';
import { SellerDirectory } from './components/seller-directory/seller-directory';
import { InitiativeSection } from './components/initiative-section/initiative-section';
import { AboutSection } from './components/about-section/about-section';
import { ProductDetailPage } from './components/product-detail-page/product-detail-page';
import { ProductPreviewDialog } from './components/product-preview-dialog/product-preview-dialog';
import { CraftMap } from './components/craft-map/craft-map';
import { CartDrawer } from './components/cart-drawer/cart-drawer';
import { CheckoutModal } from './components/checkout-modal/checkout-modal';
import { AccountPage } from './components/account-page/account-page';
import { TrustFooter } from './components/trust-footer/trust-footer';
import { MobileNav } from './components/mobile-nav/mobile-nav';
import { ToastContainer } from './components/toast-container/toast-container';
import { SupportModal } from './components/support-modal/support-modal';
import { SilkStudioComponent } from './components/silk-experience/silk-studio/silk-studio';
import { TryTheLookComponent } from './components/silk-experience/try-the-look/try-the-look';
import { HoneyStudioComponent } from './components/craft-studios/honey-studio/honey-studio';
import { PotteryStudioComponent } from './components/craft-studios/pottery-studio/pottery-studio';
import { CoconutStudioComponent } from './components/craft-studios/coconut-studio/coconut-studio';
import { AgarbattiStudioComponent } from './components/craft-studios/agarbatti-studio/agarbatti-studio';
import { MatIconModule } from '@angular/material/icon';
import { BRASS_DHOKRA_IMAGE, HANDLOOM_IMAGE, HERO_IMAGE, ORGANIC_HONEY_IMAGE } from './data/mock-data';
import { Product } from './models/marketplace.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    AnnouncementBar,
    Header,
    HeroCarousel,
    CategoryGrid,
    ProductCard,
    ProductCatalogue,
    SellerDirectory,
    InitiativeSection,
    AboutSection,
    ProductDetailPage,
    ProductPreviewDialog,
    CraftMap,
    AccountPage,
    CartDrawer,
    CheckoutModal,
    TrustFooter,
    MobileNav,
    ToastContainer,
    SupportModal,
    SilkStudioComponent,
    TryTheLookComponent,
    HoneyStudioComponent,
    PotteryStudioComponent,
    CoconutStudioComponent,
    AgarbattiStudioComponent,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  readonly market = inject(MarketplaceService);
  readonly heritageCardsVisible = signal(false);
  readonly agarbattiVisible = signal(false);
  readonly selectedTreasureId = signal<string | null>(null);
  readonly selectedTreasure = computed(() =>
    this.artisanTreasures.find(treasure => treasure.id === this.selectedTreasureId()) ?? null
  );

  @ViewChild('heritageSection') private heritageSection?: ElementRef<HTMLElement>;
  @ViewChild('agarbattiSection')
  set agarbattiSection(section: ElementRef<HTMLElement> | undefined) {
    this.agarbattiObserver?.disconnect();
    this.agarbattiObserver = undefined;

    if (!section || !this.isBrowser) {
      this.agarbattiVisible.set(false);
      this.agarbattiVideo?.nativeElement.pause();
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.agarbattiVisible.set(true);
      this.playAgarbattiVideo();
      return;
    }

    this.agarbattiObserver = new IntersectionObserver(([entry]) => {
      const isVisible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.18);
      this.agarbattiVisible.set(isVisible);
      if (isVisible) {
        this.playAgarbattiVideo();
      } else {
        this.agarbattiVideo?.nativeElement.pause();
      }
    }, { threshold: 0.18 });
    this.agarbattiObserver.observe(section.nativeElement);
  }

  @ViewChild('agarbattiVideo') private agarbattiVideo?: ElementRef<HTMLVideoElement>;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private heritageObserver?: IntersectionObserver;
  private agarbattiObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.heritageSection) {
      if (typeof IntersectionObserver === 'undefined') {
        this.heritageCardsVisible.set(true);
      } else {
        this.heritageObserver = new IntersectionObserver(([entry]) => {
          if (entry?.isIntersecting) {
            this.heritageCardsVisible.set(true);
            this.heritageObserver?.disconnect();
            this.heritageObserver = undefined;
          }
        }, { threshold: 0.2 });
        this.heritageObserver.observe(this.heritageSection.nativeElement);
      }
    }

  }

  ngOnDestroy(): void {
    this.heritageObserver?.disconnect();
    this.agarbattiObserver?.disconnect();
  }

  readonly brassImage = BRASS_DHOKRA_IMAGE;
  readonly handloomImage = HANDLOOM_IMAGE;
  readonly heroImage = HERO_IMAGE;
  readonly honeyImage = ORGANIC_HONEY_IMAGE;

  readonly wishlistProducts = computed(() => {
    const ids = this.market.wishlistIds();
    return this.market.allProducts().filter(p => ids.includes(p.id));
  });

  readonly topSellers = computed(() => {
    return this.market.allSellers().slice(0, 3);
  });

  readonly bestsellingProductIds = [
    'prod-001',
    'prod-010',
    'prod-003',
    'prod-004',
    'prod-009',
    'prod-011',
    'prod-012',
    'prod-013'
  ];

  readonly bestsellingProducts = computed(() => {
    const products = this.market.allProducts();
    return this.bestsellingProductIds
      .map(id => products.find(product => product.id === id))
      .filter((product): product is Product => product !== undefined);
  });

  readonly heritageCards = [
    {
      title: 'Source to Table',
      description: 'Direct relationships with coastal coconut artisan clusters, crafting polished tableware by hand.',
      image: 'assets/images/coconut.png',
      alt: 'Handcrafted coconut shell crafts'
    },
    {
      title: 'Time-Honored Techniques',
      description: 'Slow quartz-stone grinding, traditional hand-shaping, and authentic cobalt blue firing.',
      image: 'assets/images/pot.png',
      alt: 'Jaipur Blue Pottery workbench'
    },
    {
      title: 'Unwavering Purity',
      description: 'Raw, unheated wild forest honey gathered sustainably from pristine forest sanctuaries.',
      image: 'assets/images/honey.png',
      alt: 'Pure wild forest honey and herbs'
    },
    {
      title: 'Commitment to Community',
      description: 'Direct support to handloom weavers, safeguarding GI-tagged Chanderi weaving clusters.',
      image: 'assets/images/saree.jpg',
      alt: 'Royal Blue Chanderi handloom saree'
    }
  ];

  readonly artisanTreasures = [
    {
      id: 'handloom-sarees',
      title: 'Handloom Sarees',
      hindiTitle: 'हथकरघा साड़ियां',
      eyebrow: '100% Authentic Weave',
      image: 'assets/images/saree.jpg',
      video: 'assets/images/saree video.mp4',
      description: 'Pure handwoven sarees from traditional Indian weaving clusters, with natural fibres and GI-backed provenance.',
      accent: '#7A1F45',
      benefits: ['Natural & breathable fibres', 'Handwoven by master artisans', 'GI-backed regional provenance'],
      variants: [
        { name: 'Cotton Handloom', price: 2499 },
        { name: 'Silk Zari', price: 3499 },
        { name: 'Premium Kadhua', price: 6890 }
      ]
    },
    {
      id: 'traditional-pottery',
      title: 'Traditional Pottery',
      hindiTitle: 'पारंपरिक मिट्टी के बर्तन',
      eyebrow: 'Hand-shaped & Natural',
      image: 'assets/images/pot.png',
      video: 'assets/images/pot video.mp4',
      description: 'Hand-shaped clay and blue pottery crafted by regional artisans using traditional techniques and mineral pigments.',
      accent: '#1D5A6F',
      benefits: ['Made with natural clay and minerals', 'Hand-shaped, no mass moulding', 'Safe, lead-conscious artisan finish'],
      variants: [
        { name: 'Blue Pottery Vase', price: 1120 },
        { name: 'Ceremonial Vase', price: 1850 },
        { name: 'Collector Piece', price: 2490 }
      ]
    },
    {
      id: 'forest-honey',
      title: 'Forest Honey',
      hindiTitle: 'वन शहद',
      eyebrow: 'Pure & Naturally Harvested',
      image: 'assets/images/honey.png',
      video: 'assets/images/honey video.mp4',
      description: 'Raw, unheated forest honey gathered sustainably by tribal communities and packed without artificial additives.',
      accent: '#A66A18',
      benefits: ['Raw and naturally unprocessed', 'No added sugar or preservatives', 'Rich in natural pollen and enzymes'],
      variants: [
        { name: 'Wild Honey 250g', price: 380 },
        { name: 'Forest Honey 500g', price: 460 },
        { name: 'Herbal Honey 1kg', price: 799 }
      ]
    },
    {
      id: 'natural-coconut',
      title: 'Natural Coconut',
      hindiTitle: 'प्राकृतिक नारियल',
      eyebrow: 'Farm Fresh & 100% Natural',
      image: 'assets/images/coconut.png',
      video: 'assets/images/coconut video.mp4',
      description: 'Fresh, farm-sourced coconut and coconut products made naturally in small batches by coastal producer groups.',
      accent: '#4B7134',
      benefits: ['Naturally sourced from farms', 'No artificial flavour or colour', 'Small-batch coastal produce'],
      variants: [
        { name: 'Tender Coconut', price: 120 },
        { name: 'Coconut Oil 500ml', price: 320 },
        { name: 'Virgin Oil 1L', price: 590 }
      ]
    }
  ];

  toggleTreasureDescription(id: string): void {
    this.selectedTreasureId.update(current => current === id ? null : id);
  }

  openTreasure(id: string): void {
    if (id === 'handloom-sarees') {
      this.selectedTreasureId.set(null);
      this.market.setView('silk-studio', 'instant');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      });
    } else if (id === 'forest-honey') {
      this.selectedTreasureId.set(null);
      this.market.setView('honey-studio', 'instant');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      });
    } else if (id === 'traditional-pottery') {
      this.selectedTreasureId.set(null);
      this.market.setView('pottery-studio', 'instant');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      });
    } else if (id === 'natural-coconut') {
      this.selectedTreasureId.set(null);
      this.market.setView('coconut-studio', 'instant');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      });
    } else {
      this.selectedTreasureId.set(id);
    }
  }

  playTreasureVideo(video: HTMLVideoElement): void {
    video.muted = true;
    void video.play().catch(() => undefined);
  }

  pauseTreasureVideo(video: HTMLVideoElement): void {
    video.pause();
    video.currentTime = 0;
  }

  private playAgarbattiVideo(): void {
    const video = this.agarbattiVideo?.nativeElement;
    if (video) {
      video.muted = true;
      void video.play().catch(() => undefined);
    }
  }
}
