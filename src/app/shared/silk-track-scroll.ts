interface TrackScrollState {
  target: number;
  frame: number;
}

const activeScrolls = new WeakMap<HTMLElement, TrackScrollState>();

export function smoothScrollSilkTrackBy(track: HTMLElement, delta: number): boolean {
  if (!Number.isFinite(delta) || delta === 0) return false;

  const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
  const state = activeScrolls.get(track);
  const currentTarget = state?.target ?? track.scrollLeft;
  const target = Math.max(0, Math.min(maxScrollLeft, currentTarget + delta));
  if (target === currentTarget) return false;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cancelSilkTrackScroll(track);
    track.scrollLeft = target;
    return true;
  }

  const nextState = state ?? { target: track.scrollLeft, frame: 0 };
  nextState.target = target;
  if (!state) activeScrolls.set(track, nextState);
  if (!nextState.frame) {
    nextState.frame = window.requestAnimationFrame(() => animateTrackScroll(track, nextState));
  }
  return true;
}

export function cancelSilkTrackScroll(track: HTMLElement | undefined): void {
  if (!track) return;

  const state = activeScrolls.get(track);
  if (!state) return;

  if (state.frame) window.cancelAnimationFrame(state.frame);
  activeScrolls.delete(track);
}

function animateTrackScroll(track: HTMLElement, state: TrackScrollState): void {
  const distance = state.target - track.scrollLeft;
  if (Math.abs(distance) < 0.75) {
    track.scrollLeft = state.target;
    activeScrolls.delete(track);
    return;
  }

  track.scrollLeft += distance * 0.4;
  state.frame = window.requestAnimationFrame(() => animateTrackScroll(track, state));
}
