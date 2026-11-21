export function animateSilkCardImage(image: HTMLElement | null): Animation | undefined {
  if (!image || typeof image.animate !== 'function' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  return image.animate(
    [
      { transform: 'scale(0.88) translateY(18px)', opacity: 0.82 },
      { transform: 'scale(1.06) translateY(-5px)', opacity: 1, offset: 0.72 },
      { transform: 'scale(1) translateY(0)', opacity: 1 }
    ],
    { duration: 560, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
  );
}
