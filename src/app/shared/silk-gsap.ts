export interface SilkGsapRuntime {
  gsap: typeof import('gsap').gsap;
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
}

let runtimePromise: Promise<SilkGsapRuntime> | undefined;

export function loadSilkGsap(): Promise<SilkGsapRuntime> {
  if (!runtimePromise) {
    runtimePromise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([core, scrollTrigger]) => {
        core.gsap.registerPlugin(scrollTrigger.ScrollTrigger);
        return { gsap: core.gsap, ScrollTrigger: scrollTrigger.ScrollTrigger };
      })
      .catch((error: unknown) => {
        runtimePromise = undefined;
        throw error;
      });
  }
  return runtimePromise;
}
