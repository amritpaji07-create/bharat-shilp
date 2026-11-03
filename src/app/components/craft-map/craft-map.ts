import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { ArtisanCluster } from '../../models/marketplace.model';
import { MatIconModule } from '@angular/material/icon';

export interface CraftTrail {
  id: string;
  name: string;
  hindiName: string;
  subtitle: string;
  color: string;
  theme: string;
  clusterIds: string[];
}

@Component({
  selector: 'app-craft-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="bg-[#FAF8F5] py-8 sm:py-12 border-b border-[#E8E4DC]">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <!-- Header Banner & Title -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D5C3A] uppercase tracking-wider mb-1.5">
              <mat-icon class="!w-4 !h-4 !text-[16px]">map</mat-icon>
              <span>{{ market.currentLanguage() === 'hi' ? 'राष्ट्रीय भौगोलिक संकेत (GI) शिल्प मानचित्रावली' : 'National Geographical Indication (GI) & Artisan Atlas' }}</span>
              <span class="px-2 py-0.5 bg-[#0D5C3A]/10 text-[#0D5C3A] rounded-full text-[10px] font-black uppercase">Live Interactive</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-[#15365B] tracking-tight">
              {{ market.currentLanguage() === 'hi' ? 'भारत शिल्प मानचित्रावली: अपनी जड़ों से जुड़ें' : 'Bharat Craft Atlas: Trace Authentic Artisan Roots Across India' }}
            </h2>
            <p class="text-xs sm:text-sm text-[#475467] mt-1.5 max-w-3xl leading-relaxed">
              Explore 12 government-certified GI craft clusters and tribal cooperatives on an interactive Google Map. 
              Embark on curated Heritage Trails, locate the nearest master craftsperson to your city, and inspect traditional fabrication techniques.
            </p>
          </div>

          <!-- Quick Action Buttons: Near Me & Virtual Trails -->
          <div class="flex flex-wrap items-center gap-2 self-start lg:self-auto shrink-0">
            <button
              type="button"
              (click)="locateUserPosition()"
              [disabled]="locatingUser()"
              class="px-3.5 py-2 bg-white hover:bg-stone-50 border border-stone-200 text-[#15365B] rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50">
              <mat-icon class="!w-4 !h-4 !text-[16px] text-blue-600" [class.animate-spin]="locatingUser()">my_location</mat-icon>
              <span>{{ userCoords() ? 'Near Me Active (' + nearestClusterDistance() + ')' : 'Find Closest Hub to Me' }}</span>
            </button>

            <button
              type="button"
              (click)="resetMapView()"
              class="px-3.5 py-2 bg-[#0D5C3A] hover:bg-[#09432A] text-white rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer">
              <mat-icon class="!w-4 !h-4 !text-[16px]">center_focus_strong</mat-icon>
              <span>Reset Map View</span>
            </button>
          </div>
        </div>

        <!-- National Craft Impact Metrics Ribbon -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E5E0D5] shadow-xs">
          <div class="flex items-center gap-3 p-2">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D5C3A] flex items-center justify-center shrink-0">
              <mat-icon class="!w-5 !h-5 !text-[20px]">verified</mat-icon>
            </div>
            <div>
              <div class="text-lg font-black text-[#15365B] leading-none">12 Mapped</div>
              <div class="text-[11px] text-[#667085] mt-0.5">GI Heritage Clusters</div>
            </div>
          </div>

          <div class="flex items-center gap-3 p-2 sm:border-l border-stone-200">
            <div class="w-10 h-10 rounded-xl bg-amber-50 text-[#C25E00] flex items-center justify-center shrink-0">
              <mat-icon class="!w-5 !h-5 !text-[20px]">groups</mat-icon>
            </div>
            <div>
              <div class="text-lg font-black text-[#15365B] leading-none">1,842+ Artisans</div>
              <div class="text-[11px] text-[#667085] mt-0.5">SHG &amp; Guild Members</div>
            </div>
          </div>

          <div class="flex items-center gap-3 p-2 sm:border-l border-stone-200">
            <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <mat-icon class="!w-5 !h-5 !text-[20px]">payments</mat-icon>
            </div>
            <div>
              <div class="text-lg font-black text-[#15365B] leading-none">100% Direct</div>
              <div class="text-[11px] text-[#667085] mt-0.5">Zero Middleman Fee</div>
            </div>
          </div>
        </div>

        <!-- Filter & Search Control Bar -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#E5E0D5]">
          <!-- Real-Time Search Bar -->
          <div class="relative flex-1 max-w-md">
            <mat-icon class="absolute left-3 top-2.5 !w-4 !h-4 !text-[18px] text-[#667085]">search</mat-icon>
            <input
              type="text"
              [value]="searchQuery()"
              (input)="onSearchInput($event)"
              placeholder="Search by craft, state, district or GI tag..."
              class="w-full pl-9 pr-8 py-2 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#0D5C3A] focus:ring-1 focus:ring-[#0D5C3A]"
            />
            @if (searchQuery()) {
              <button
                type="button"
                (click)="clearSearch()"
                class="absolute right-2.5 top-2.5 text-[#667085] hover:text-stone-900 cursor-pointer">
                <mat-icon class="!w-4 !h-4 !text-[16px]">close</mat-icon>
              </button>
            }
          </div>

          <!-- Category Chips -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 max-w-full">
            @for (cat of craftCategories; track cat.id) {
              <button
                type="button"
                (click)="setCategory(cat.id)"
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer"
                [class.bg-[#0D5C3A]]="selectedCategory() === cat.id"
                [class.text-white]="selectedCategory() === cat.id"
                [class.text-[#667085]]="selectedCategory() !== cat.id"
                [class.bg-stone-50]="selectedCategory() !== cat.id"
                [class.hover:bg-stone-100]="selectedCategory() !== cat.id">
                {{ cat.label }}
              </button>
            }
          </div>
        </div>

        <!-- MAIN MAP & CLUSTER EXPLORER GRID -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <!-- LEFT: Interactive Google Map Canvas (Span 8) -->
          <div class="lg:col-span-8 bg-white rounded-2xl border border-[#E5E0D5] shadow-xs overflow-hidden flex flex-col relative min-h-[500px] sm:min-h-[580px] lg:min-h-[640px]">
            
            <!-- Map Top Overlay Control Bar -->
            <div class="p-3 bg-white/95 backdrop-blur-sm border-b border-[#E5E0D5] flex flex-wrap items-center justify-between gap-3 text-xs z-10">
              <!-- Cluster & Route Status -->
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="font-bold text-[#15365B]">
                  @if (selectedTrail()) {
                    <span>Trail: {{ selectedTrail()?.name }} ({{ selectedTrailClusters().length }} Stops)</span>
                  } @else {
                    <span>Live GI Cluster Map</span>
                  }
                </span>
                <span class="text-[#667085] text-[11px]">
                  ({{ filteredClusters().length }} shown)
                </span>
              </div>

              <!-- Map View Type Toggles (Roadmap, Satellite, Terrain) -->
              <div class="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg text-[11px] font-bold">
                <button
                  type="button"
                  (click)="setMapType('roadmap')"
                  class="px-2.5 py-1 rounded-md transition-all cursor-pointer"
                  [class.bg-white]="mapType() === 'roadmap'"
                  [class.text-[#15365B]]="mapType() === 'roadmap'"
                  [class.shadow-xs]="mapType() === 'roadmap'"
                  [class.text-[#667085]]="mapType() !== 'roadmap'">
                  Roadmap
                </button>
                <button
                  type="button"
                  (click)="setMapType('satellite')"
                  class="px-2.5 py-1 rounded-md transition-all cursor-pointer"
                  [class.bg-white]="mapType() === 'satellite'"
                  [class.text-[#15365B]]="mapType() === 'satellite'"
                  [class.shadow-xs]="mapType() === 'satellite'"
                  [class.text-[#667085]]="mapType() !== 'satellite'">
                  Satellite
                </button>
                <button
                  type="button"
                  (click)="setMapType('terrain')"
                  class="px-2.5 py-1 rounded-md transition-all cursor-pointer"
                  [class.bg-white]="mapType() === 'terrain'"
                  [class.text-[#15365B]]="mapType() === 'terrain'"
                  [class.shadow-xs]="mapType() === 'terrain'"
                  [class.text-[#667085]]="mapType() !== 'terrain'">
                  Terrain
                </button>
              </div>
            </div>

            <!-- Active Trail Stop Navigation Bar (When a trail is selected) -->
            @if (selectedTrail()) {
              <div class="px-4 py-2 bg-stone-900 text-white flex items-center justify-between text-xs z-10 border-b border-stone-800">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full" [style.background-color]="selectedTrail()?.color"></span>
                  <span class="font-bold text-amber-300">Stop {{ currentTrailStopIndex() + 1 }} of {{ selectedTrailClusters().length }}:</span>
                  @if (currentTrailCluster(); as currCluster) {
                    <span class="truncate max-w-[200px] sm:max-w-xs font-semibold">{{ currCluster.name }} ({{ currCluster.craftName }})</span>
                  }
                </div>

                <div class="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    (click)="prevTrailStop()"
                    [disabled]="currentTrailStopIndex() <= 0"
                    class="p-1 rounded bg-stone-800 hover:bg-stone-700 disabled:opacity-40 cursor-pointer"
                    title="Previous Stop">
                    <mat-icon class="!w-4 !h-4 !text-[16px]">chevron_left</mat-icon>
                  </button>
                  <button
                    type="button"
                    (click)="nextTrailStop()"
                    [disabled]="currentTrailStopIndex() >= selectedTrailClusters().length - 1"
                    class="p-1 rounded bg-stone-800 hover:bg-stone-700 disabled:opacity-40 cursor-pointer"
                    title="Next Stop">
                    <mat-icon class="!w-4 !h-4 !text-[16px]">chevron_right</mat-icon>
                  </button>
                </div>
              </div>
            }

            <!-- Google Map DOM Container -->
            <div #mapContainer class="flex-1 w-full h-full min-h-[440px] bg-[#EAE8E2] relative">
              @if (mapLoading()) {
                <div class="absolute inset-0 flex flex-col items-center justify-center bg-stone-100/90 text-slate-600 gap-3 z-20">
                  <mat-icon class="!w-8 !h-8 !text-[32px] animate-spin text-[#0D5C3A]">sync</mat-icon>
                  <span class="text-xs font-semibold">Loading Bharat Artisan Google Map...</span>
                </div>
              }
            </div>

            <!-- Mandatory Attribution Footer Bar -->
            <div class="px-4 py-2.5 bg-stone-50 border-t border-[#E5E0D5] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#667085]">
              <div class="flex items-center gap-3">
                <span class="flex items-center gap-1">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#0D5C3A] inline-block"></span>
                  <span>Handloom & Textiles</span>
                </span>
                <span class="flex items-center gap-1">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#C25E00] inline-block"></span>
                  <span>Tribal & Metalcraft</span>
                </span>
                <span class="flex items-center gap-1">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#15365B] inline-block"></span>
                  <span>Handicrafts & Art</span>
                </span>
                <span class="flex items-center gap-1">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                  <span>Your Location</span>
                </span>
              </div>
              <span class="font-medium">Google Maps</span>
            </div>

          </div>

          <!-- RIGHT: Cluster Details & Directory Panel (Span 4) -->
          <div class="lg:col-span-4 flex flex-col gap-4">
            
            <!-- Selected Cluster Deep Spotlight Card -->
            @if (activeCluster(); as cluster) {
              <div class="p-5 bg-white rounded-2xl border border-[#0D5C3A]/40 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
                <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0D5C3A] via-[#E2831E] to-[#15365B]"></div>

                <div class="space-y-3">
                  <!-- Badges Strip -->
                  <div class="flex items-center justify-between gap-2">
                    <span class="px-2.5 py-0.5 bg-[#0D5C3A]/10 text-[#0D5C3A] rounded-md text-[11px] font-bold">
                      {{ cluster.specialtyTag }}
                    </span>
                    @if (cluster.giTagNumber) {
                      <span class="text-[10px] font-bold text-[#15365B] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {{ cluster.giTagNumber }} (Est. {{ cluster.giYear || 2008 }})
                      </span>
                    }
                  </div>

                  <!-- Image & Name -->
                  <div class="flex items-start gap-3">
                    <img
                      [src]="cluster.image"
                      [alt]="cluster.name"
                      class="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0 shadow-xs"
                      referrerpolicy="no-referrer"
                    />
                    <div>
                      <h3 class="text-base font-black text-[#15365B] leading-tight">
                        {{ cluster.name }}
                      </h3>
                      <div class="text-xs font-semibold text-[#0D5C3A] mt-0.5">
                        {{ cluster.craftName }}
                      </div>
                      <div class="text-[11px] text-[#667085] flex items-center gap-1 mt-0.5">
                        <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">place</mat-icon>
                        <span>{{ cluster.district }}, {{ cluster.state }}</span>
                        @if (cluster.distanceKm !== undefined) {
                          <span class="font-bold text-blue-600">({{ cluster.distanceKm }} km away)</span>
                        }
                      </div>
                    </div>
                  </div>

                  <p class="text-xs text-[#475467] leading-relaxed line-clamp-2">
                    {{ cluster.description }}
                  </p>

                  <!-- Cooperative & Artisan Count -->
                  <div class="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200/80 space-y-1.5 text-xs">
                    <div class="flex items-center justify-between">
                      <span class="text-[#667085]">Cooperative/SHG:</span>
                      <span class="font-bold text-[#15365B] text-right truncate max-w-[170px]">{{ cluster.cooperativeName }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-[#667085]">Active Artisans:</span>
                      <span class="font-bold text-[#0D5C3A]">{{ cluster.artisanCount }} Craftspeople</span>
                    </div>
                    @if (cluster.masterArtisanName) {
                      <div class="flex items-center justify-between pt-1 border-t border-stone-200/60">
                        <span class="text-[#667085]">Master Artisan:</span>
                        <span class="font-bold text-[#15365B] text-right truncate max-w-[170px]">{{ cluster.masterArtisanName }}</span>
                      </div>
                    }
                  </div>
                </div>

                <!-- Action Buttons: Story Modal & Products -->
                <div class="pt-2 space-y-2">
                  <button
                    type="button"
                    (click)="openStoryModal(cluster)"
                    class="w-full py-2 px-3 bg-stone-100 hover:bg-stone-200 text-[#15365B] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                    <mat-icon class="!w-4 !h-4 !text-[16px] text-[#0D5C3A]">auto_stories</mat-icon>
                    <span>View Artisan Story & Heritage Process</span>
                  </button>

                  <button
                    type="button"
                    (click)="exploreClusterProducts(cluster)"
                    class="w-full py-2.5 px-4 bg-[#0D5C3A] hover:bg-[#09432A] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                    <mat-icon class="!w-4 !h-4 !text-[16px]">shopping_bag</mat-icon>
                    <span>Explore Products from this Cluster</span>
                  </button>
                </div>
              </div>
            }

            <!-- Cluster Directory List (Filtered & Searchable) -->
            <div class="bg-white rounded-2xl border border-[#E5E0D5] p-4 flex-1 flex flex-col space-y-3">
              <div class="flex items-center justify-between text-xs font-bold text-[#15365B]">
                <div class="flex items-center gap-1.5">
                  <span>Regional Craft Centers</span>
                  @if (userCoords()) {
                    <span class="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold">Sorted by Proximity</span>
                  }
                </div>
                <span class="text-[#667085]">{{ filteredClusters().length }} Hubs</span>
              </div>

              <!-- Cluster Rows -->
              <div class="space-y-2 overflow-y-auto max-h-[300px] pr-1">
                @for (item of filteredClusters(); track item.id) {
                  <button
                    type="button"
                    (click)="selectCluster(item)"
                    class="w-full p-2.5 rounded-xl text-left border transition-all flex items-center justify-between gap-3 cursor-pointer group"
                    [class.border-[#0D5C3A]]="activeCluster()?.id === item.id"
                    [class.bg-[#0D5C3A]/5]="activeCluster()?.id === item.id"
                    [class.border-stone-200]="activeCluster()?.id !== item.id"
                    [class.hover:border-[#0D5C3A]/60]="activeCluster()?.id !== item.id">
                    
                    <div class="flex items-center gap-2.5 min-w-0">
                      <img
                        [src]="item.image"
                        [alt]="item.name"
                        class="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                        referrerpolicy="no-referrer"
                      />
                      <div class="truncate">
                        <div class="text-xs font-bold text-[#15365B] truncate group-hover:text-[#0D5C3A] transition-colors">
                          {{ item.craftName }}
                        </div>
                        <div class="text-[11px] text-[#667085] truncate flex items-center gap-1">
                          <span>{{ item.district }}, {{ item.state }}</span>
                          @if (item.distanceKm !== undefined) {
                            <span class="text-blue-600 font-semibold">• {{ item.distanceKm }} km</span>
                          }
                        </div>
                      </div>
                    </div>

                    <mat-icon class="!w-4 !h-4 !text-[18px] text-[#0D5C3A] shrink-0">
                      {{ activeCluster()?.id === item.id ? 'check_circle' : 'chevron_right' }}
                    </mat-icon>
                  </button>
                } @empty {
                  <div class="p-4 text-center text-xs text-[#667085]">
                    No craft clusters match your search "{{ searchQuery() }}".
                  </div>
                }
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>

    <!-- DETAILED MASTER ARTISAN STORY & HERITAGE MODAL -->
    @if (storyModalCluster(); as modalCluster) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
        <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col">
          
          <!-- Modal Close Button -->
          <button
            type="button"
            (click)="closeStoryModal()"
            class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md flex items-center justify-center cursor-pointer">
            <mat-icon class="!w-5 !h-5 !text-[20px]">close</mat-icon>
          </button>

          <!-- Modal Top Hero Image Banner -->
          <div class="relative h-48 sm:h-56 w-full overflow-hidden shrink-0">
            <img
              [src]="modalCluster.image"
              [alt]="modalCluster.name"
              class="w-full h-full object-cover"
              referrerpolicy="no-referrer"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
            
            <div class="absolute bottom-4 left-6 right-6 text-white space-y-1">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 bg-amber-400 text-stone-900 rounded-md text-[10px] font-black uppercase tracking-wider">
                  {{ modalCluster.specialtyTag }}
                </span>
                @if (modalCluster.giTagNumber) {
                  <span class="px-2.5 py-0.5 bg-white/20 backdrop-blur-sm text-white rounded-md text-[10px] font-bold">
                    {{ modalCluster.giTagNumber }}
                  </span>
                }
              </div>
              <h3 class="text-xl sm:text-2xl font-black">{{ modalCluster.craftName }}</h3>
              <p class="text-xs text-stone-200 flex items-center gap-1">
                <mat-icon class="!w-3.5 !h-3.5 !text-[15px] text-amber-300">place</mat-icon>
                <span>{{ modalCluster.district }}, {{ modalCluster.state }} — {{ modalCluster.cooperativeName }}</span>
              </p>
            </div>
          </div>

          <!-- Modal Body Content -->
          <div class="p-6 space-y-6">
            
            <!-- Master Artisan Quote Block -->
            @if (modalCluster.masterArtisanQuote) {
              <div class="p-4 bg-[#FAF8F5] rounded-2xl border-l-4 border-[#0D5C3A] text-xs space-y-1">
                <div class="font-bold text-[#15365B] flex items-center gap-1.5">
                  <mat-icon class="!w-4 !h-4 !text-[16px] text-[#0D5C3A]">format_quote</mat-icon>
                  <span>{{ modalCluster.masterArtisanName }}</span>
                </div>
                <p class="italic text-[#475467] leading-relaxed">
                  "{{ modalCluster.masterArtisanQuote }}"
                </p>
              </div>
            }

            <!-- Cultural History & Description -->
            <div class="space-y-1.5">
              <h4 class="text-xs font-bold uppercase tracking-wider text-[#667085]">Artisan Heritage & Significance</h4>
              <p class="text-xs sm:text-sm text-[#344054] leading-relaxed">
                {{ modalCluster.description }}
              </p>
            </div>

            <!-- 4-Step Craft Making Technique Timeline -->
            @if (modalCluster.craftHeritageSteps?.length) {
              <div class="space-y-3">
                <h4 class="text-xs font-bold uppercase tracking-wider text-[#667085]">
                  Authentic 4-Step Handcrafting Process
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  @for (step of modalCluster.craftHeritageSteps; track step.title; let idx = $index) {
                    <div class="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="w-5 h-5 rounded-full bg-[#0D5C3A] text-white flex items-center justify-center text-[10px] font-black shrink-0">
                          {{ idx + 1 }}
                        </span>
                        <span class="font-bold text-[#15365B] truncate">{{ step.title }}</span>
                      </div>
                      <p class="text-[11px] text-[#667085] leading-relaxed">
                        {{ step.desc }}
                      </p>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Bottom Actions -->
            <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-100">
              <button
                type="button"
                (click)="focusOnMapFromModal(modalCluster)"
                class="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-[#15365B] bg-stone-100 hover:bg-stone-200 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                <mat-icon class="!w-4 !h-4 !text-[16px] text-blue-600">travel_explore</mat-icon>
                <span>Fly to Location on Map</span>
              </button>

              <button
                type="button"
                (click)="exploreClusterProductsFromModal(modalCluster)"
                class="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-[#0D5C3A] hover:bg-[#09432A] rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                <mat-icon class="!w-4 !h-4 !text-[16px]">storefront</mat-icon>
                <span>Browse Products from {{ modalCluster.name }}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    }
  `
})
export class CraftMap implements OnInit, OnDestroy {
  readonly market = inject(MarketplaceService);

  readonly mapContainer = viewChild<ElementRef<HTMLDivElement>>('mapContainer');

  readonly mapLoading = signal<boolean>(true);
  readonly selectedCategory = signal<string>('all');
  readonly searchQuery = signal<string>('');
  readonly activeCluster = signal<ArtisanCluster | null>(null);
  readonly selectedTrail = signal<CraftTrail | null>(null);
  readonly currentTrailStopIndex = signal<number>(0);
  readonly mapType = signal<string>('roadmap');
  readonly storyModalCluster = signal<ArtisanCluster | null>(null);

  // User Geolocation Radar
  readonly locatingUser = signal<boolean>(false);
  readonly userCoords = signal<{ lat: number; lng: number } | null>(null);
  readonly nearestClusterDistance = signal<string>('');

  private googleMapInstance: google.maps.Map | null = null;
  private markersMap = new Map<string, unknown>();
  private userLocationMarker: unknown = null;
  private infoWindowInstance: google.maps.InfoWindow | null = null;
  private activePolyline: google.maps.Polyline | null = null;

  readonly craftCategories = [
    { id: 'all', label: 'All Crafts' },
    { id: 'handloom-textiles', label: 'Handloom & Silk' },
    { id: 'tribal-metalcraft', label: 'Tribal Metalcraft' },
    { id: 'handicrafts-pottery', label: 'Pottery & Lacquer' },
    { id: 'traditional-art', label: 'Folk & Canvas Art' },
    { id: 'organic-food', label: 'Forest & Organic' }
  ];

  readonly craftTrails: CraftTrail[] = [
    {
      id: 'trail-weaves',
      name: 'The Royal Weaves & Silk Trail',
      hindiName: 'शाही बुनाई एवं रेशम मार्ग',
      subtitle: '4 Historic Weaving Capitals across 2,850 km Heritage Corridor',
      color: '#0D5C3A',
      theme: 'Handloom',
      clusterIds: ['cluster-kashmir', 'cluster-kullu', 'cluster-chanderi', 'cluster-assam']
    },
    {
      id: 'trail-metal-earth',
      name: 'Ancient Metallurgy & Clay Trail',
      hindiName: 'प्राचीन धातुशिल्प एवं मृत्तिका मार्ग',
      subtitle: '4 Ancient Craft Centers spanning 4,000 Years of Metallurgy',
      color: '#C25E00',
      theme: 'Metalcraft & Pottery',
      clusterIds: ['cluster-jaipur', 'cluster-uttarakhand', 'cluster-bastar', 'cluster-thanjavur']
    },
    {
      id: 'trail-folk-tribal',
      name: 'Folk Epics & Forest Earth Art Trail',
      hindiName: 'लोकगाथा एवं वन शिल्प मार्ग',
      subtitle: '4 Indigenous Art Traditions of Living Vernacular Heritage',
      color: '#15365B',
      theme: 'Folk Art',
      clusterIds: ['cluster-kutch', 'cluster-madhubani', 'cluster-ranchi', 'cluster-channapatna']
    }
  ];

  readonly selectedTrailClusters = computed(() => {
    const trail = this.selectedTrail();
    if (!trail) return [];
    const all = this.market.allClusters();
    return trail.clusterIds
      .map(id => all.find(c => c.id === id))
      .filter((c): c is ArtisanCluster => !!c);
  });

  readonly currentTrailCluster = computed(() => {
    const list = this.selectedTrailClusters();
    const idx = this.currentTrailStopIndex();
    return list[idx] || null;
  });

  readonly filteredClusters = computed(() => {
    let list = this.market.allClusters();
    const cat = this.selectedCategory();
    const query = this.searchQuery().trim().toLowerCase();
    const trail = this.selectedTrail();
    const user = this.userCoords();

    if (trail) {
      list = list.filter(c => trail.clusterIds.includes(c.id));
    } else if (cat !== 'all') {
      list = list.filter(c => c.categorySlug === cat);
    }

    if (query) {
      list = list.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.craftName.toLowerCase().includes(query) ||
        c.state.toLowerCase().includes(query) ||
        c.district.toLowerCase().includes(query) ||
        (c.giTagNumber && c.giTagNumber.toLowerCase().includes(query)) ||
        c.specialtyTag.toLowerCase().includes(query)
      );
    }

    if (user) {
      list = list.map(c => ({
        ...c,
        distanceKm: Math.round(this.calculateHaversineDistance(user.lat, user.lng, c.lat, c.lng))
      })).sort((a, b) => (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999));
    }

    return list;
  });

  ngOnInit() {
    this.activeCluster.set(this.market.selectedCluster() || this.market.allClusters()[0] || null);
    this.initializeMap();
  }

  ngOnDestroy() {
    this.markersMap.clear();
    if (this.activePolyline) {
      this.activePolyline.setMap(null);
      this.activePolyline = null;
    }
  }

  private async initializeMap() {
    try {
      if (typeof window === 'undefined') return;

      let attempts = 0;
      while ((typeof google === 'undefined' || !google?.maps?.importLibrary) && attempts < 25) {
        await new Promise(r => setTimeout(r, 150));
        attempts++;
      }

      if (typeof google === 'undefined' || !google?.maps?.importLibrary) {
        this.mapLoading.set(false);
        return;
      }

      const { Map, InfoWindow } = await google.maps.importLibrary('maps');
      const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary('marker');

      const el = this.mapContainer()?.nativeElement;
      if (!el) {
        this.mapLoading.set(false);
        return;
      }

      this.googleMapInstance = new Map(el, {
        center: { lat: 22.9734, lng: 78.6569 },
        zoom: 5,
        mapId: 'DEMO_MAP_ID',
        internalUsageAttributionIds: ['gmp_mcp_codeassist_v1_aistudio'],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      });

      this.infoWindowInstance = new InfoWindow();

      // Render Markers
      const clusters = this.market.allClusters();
      clusters.forEach(cluster => {
        let pinBackground = '#0D5C3A';
        if (cluster.categorySlug === 'tribal-metalcraft') pinBackground = '#C25E00';
        else if (cluster.categorySlug === 'handicrafts-pottery' || cluster.categorySlug === 'traditional-art') pinBackground = '#15365B';

        const pin = new PinElement({
          background: pinBackground,
          borderColor: '#FFFFFF',
          glyphColor: '#FFFFFF',
          scale: 1.05
        });

        const marker = new AdvancedMarkerElement({
          map: this.googleMapInstance,
          position: { lat: cluster.lat, lng: cluster.lng },
          title: cluster.name,
          content: pin.element
        });

        marker.addListener('click', () => {
          this.selectCluster(cluster);
        });

        this.markersMap.set(cluster.id, marker);
      });

      this.mapLoading.set(false);

      const current = this.activeCluster();
      if (current) {
        this.panToCluster(current);
      }
    } catch {
      this.mapLoading.set(false);
    }
  }

  setMapType(typeId: 'roadmap' | 'satellite' | 'terrain') {
    this.mapType.set(typeId);
    if (!this.googleMapInstance) return;
    this.googleMapInstance.setMapTypeId(typeId);
  }

  selectCluster(cluster: ArtisanCluster) {
    this.activeCluster.set(cluster);
    this.market.selectedCluster.set(cluster);
    this.panToCluster(cluster);
  }

  private panToCluster(cluster: ArtisanCluster) {
    if (!this.googleMapInstance) return;

    this.googleMapInstance.panTo({ lat: cluster.lat, lng: cluster.lng });
    this.googleMapInstance.setZoom(7);

    if (this.infoWindowInstance) {
      const distanceNotice = cluster.distanceKm !== undefined ? `<div style="font-size: 10px; color: #15365B; font-weight: bold; margin-top: 3px;">📍 ${cluster.distanceKm} km from you</div>` : '';
      const content = `
        <div style="font-family: inherit; padding: 4px; max-width: 210px;">
          <div style="font-size: 10px; font-weight: bold; color: #0D5C3A; text-transform: uppercase;">${cluster.state} • ${cluster.giTagNumber || 'GI Heritage'}</div>
          <div style="font-size: 13px; font-weight: bold; color: #15365B; margin-top: 2px;">${cluster.craftName}</div>
          <div style="font-size: 11px; color: #667085; margin-top: 2px;">${cluster.cooperativeName}</div>
          <div style="margin-top: 6px; font-size: 11px; color: #0D5C3A; font-weight: bold;">${cluster.artisanCount} Master Artisans</div>
          ${distanceNotice}
        </div>
      `;
      this.infoWindowInstance.setContent(content);

      const marker = this.markersMap.get(cluster.id);
      if (marker) {
        this.infoWindowInstance.open({
          anchor: marker as google.maps.marker.AdvancedMarkerElement,
          map: this.googleMapInstance,
        });
      }
    }
  }

  setCategory(catId: string) {
    this.selectedCategory.set(catId);
    this.selectedTrail.set(null);
    const list = this.filteredClusters();
    if (list.length > 0) {
      this.selectCluster(list[0]);
    }
  }

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  // --- TRAIL NAVIGATION & POLYLINE ---

  async toggleTrail(trail: CraftTrail) {
    if (this.selectedTrail()?.id === trail.id) {
      this.clearTrail();
      return;
    }

    this.selectedTrail.set(trail);
    this.currentTrailStopIndex.set(0);

    const stops = this.selectedTrailClusters();
    if (stops.length > 0) {
      this.selectCluster(stops[0]);
    }

    await this.renderTrailPolyline(trail, stops);
  }

  private async renderTrailPolyline(trail: CraftTrail, stops: ArtisanCluster[]) {
    if (!this.googleMapInstance) return;

    if (this.activePolyline) {
      this.activePolyline.setMap(null);
      this.activePolyline = null;
    }

    const { Polyline } = await google.maps.importLibrary('maps');
    const path = stops.map(s => ({ lat: s.lat, lng: s.lng }));

    this.activePolyline = new Polyline({
      path,
      geodesic: true,
      strokeColor: trail.color,
      strokeOpacity: 0.9,
      strokeWeight: 4,
      map: this.googleMapInstance,
    });

    const bounds = new google.maps.LatLngBounds();
    path.forEach(p => bounds.extend(p));
    this.googleMapInstance.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
  }

  nextTrailStop() {
    const stops = this.selectedTrailClusters();
    const curr = this.currentTrailStopIndex();
    if (curr < stops.length - 1) {
      this.currentTrailStopIndex.set(curr + 1);
      this.selectCluster(stops[curr + 1]);
    }
  }

  prevTrailStop() {
    const stops = this.selectedTrailClusters();
    const curr = this.currentTrailStopIndex();
    if (curr > 0) {
      this.currentTrailStopIndex.set(curr - 1);
      this.selectCluster(stops[curr - 1]);
    }
  }

  clearTrail() {
    this.selectedTrail.set(null);
    if (this.activePolyline) {
      this.activePolyline.setMap(null);
      this.activePolyline = null;
    }
    this.resetMapView();
  }

  // --- USER GEOLOCATION RADAR ---

  async locateUserPosition() {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      return;
    }

    this.locatingUser.set(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        this.userCoords.set(coords);

        const clusters = this.market.allClusters();
        let closest: ArtisanCluster | null = null;
        let minDist = Infinity;

        clusters.forEach(c => {
          const d = this.calculateHaversineDistance(coords.lat, coords.lng, c.lat, c.lng);
          if (d < minDist) {
            minDist = d;
            closest = c;
          }
        });

        this.nearestClusterDistance.set(`${Math.round(minDist)} km`);
        this.locatingUser.set(false);

        await this.renderUserMarker(coords);

        if (closest) {
          this.selectCluster(closest);
        }
      },
      () => {
        const defaultCoords = { lat: 28.6139, lng: 77.2090 };
        this.userCoords.set(defaultCoords);
        this.nearestClusterDistance.set('Est. from New Delhi');
        this.locatingUser.set(false);
        this.renderUserMarker(defaultCoords);
      },
      { timeout: 7000, enableHighAccuracy: false }
    );
  }

  private async renderUserMarker(coords: { lat: number; lng: number }) {
    if (!this.googleMapInstance) return;

    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary('marker');

    if (this.userLocationMarker) {
      (this.userLocationMarker as google.maps.marker.AdvancedMarkerElement).map = null;
    }

    const userPin = new PinElement({
      background: '#2563EB',
      borderColor: '#FFFFFF',
      glyphColor: '#FFFFFF',
      scale: 1.15
    });

    this.userLocationMarker = new AdvancedMarkerElement({
      map: this.googleMapInstance,
      position: coords,
      title: 'Your Location',
      content: userPin.element
    });
  }

  private calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // --- STORY MODAL ---

  openStoryModal(cluster: ArtisanCluster) {
    this.storyModalCluster.set(cluster);
  }

  closeStoryModal() {
    this.storyModalCluster.set(null);
  }

  focusOnMapFromModal(cluster: ArtisanCluster) {
    this.closeStoryModal();
    this.selectCluster(cluster);
  }

  exploreClusterProductsFromModal(cluster: ArtisanCluster) {
    this.closeStoryModal();
    this.market.selectCategory(cluster.categorySlug);
  }

  resetMapView() {
    if (!this.googleMapInstance) return;
    this.googleMapInstance.panTo({ lat: 22.9734, lng: 78.6569 });
    this.googleMapInstance.setZoom(5);
    if (this.infoWindowInstance) {
      this.infoWindowInstance.close();
    }
  }

  exploreClusterProducts(cluster: ArtisanCluster) {
    this.market.selectCategory(cluster.categorySlug);
  }
}
