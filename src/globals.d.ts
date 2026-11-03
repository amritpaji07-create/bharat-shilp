/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace google {
  export namespace maps {
    export function importLibrary(libraryName: string): Promise<any>;
    export class Map {
      constructor(mapDiv: HTMLElement, opts?: any);
      setCenter(latLng: any): void;
      setZoom(zoom: number): void;
      setOptions(options: any): void;
      panTo(latLng: any): void;
      setMapTypeId(mapTypeId: string): void;
      fitBounds(bounds: any, padding?: any): void;
      addListener(eventName: string, handler: (...args: any[]) => void): any;
    }
    export class InfoWindow {
      constructor(opts?: any);
      setContent(content: string | Node): void;
      open(options?: any): void;
      close(): void;
    }
    export class Polyline {
      constructor(opts?: any);
      setMap(map: any): void;
      setPath(path: any): void;
    }
    export class LatLngBounds {
      constructor(sw?: any, ne?: any);
      extend(point: any): LatLngBounds;
    }
    export class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }
    export namespace marker {
      export class AdvancedMarkerElement {
        constructor(opts?: any);
        map: any;
        position: any;
        title: string;
        content: any;
        addListener(event: string, handler: () => void): any;
      }
      export class PinElement {
        constructor(opts?: any);
        element: HTMLElement;
      }
    }
  }
}
