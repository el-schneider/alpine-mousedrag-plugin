import type { Alpine } from 'alpinejs';

interface MouseDragOptions {
  disableInertia?: boolean;
  friction?: number;
  speedFactor?: number;
}

const DEFAULT_OPTIONS: MouseDragOptions = {
  disableInertia: false,
  friction: 0.9,
  speedFactor: 1.5,
};

/**
 * Alpine.js plugin that adds a mousedrag directive for scrolling elements with mouse drag and inertia
 */
const AlpineMouseDragPlugin = (Alpine: Alpine) => {
  Alpine.directive(
    'mousedrag',
    (
      el: HTMLElement,
      {
        modifiers,
        expression,
      }: {
        type: string;
        value: string;
        modifiers: string[];
        expression: string;
        original: string;
      },
    ): (() => void) => {
      // State variables
      let isPointerDown = false;
      let lastX = 0;
      let lastY = 0;
      let velocityX = 0;
      let velocityY = 0;
      let originalScrollSnap = '';

      // Parse directive options
      const options: MouseDragOptions = {
        ...DEFAULT_OPTIONS,
        disableInertia: modifiers.includes('disableinertia'),
      };

      if (expression && !isNaN(Number(expression))) {
        options.speedFactor = Number(expression);
      }

      const friction = options.disableInertia ? 1 : (options.friction ?? 0.9);
      const speedFactor = options.speedFactor ?? 1.5;

      // Apply non-linear speed adjustment based on distance
      const applySpeedCurve = (delta: number): number => {
        const absDelta = Math.abs(delta);
        return (
          (Math.sign(delta) * Math.pow(absDelta, speedFactor)) /
          Math.pow(10, speedFactor - 1)
        );
      };

      // Common pointer handling
      const handlePointerStart = (x: number, y: number, event?: Event) => {
        isPointerDown = true;
        lastX = x;
        lastY = y;

        originalScrollSnap = getComputedStyle(el).scrollSnapType;
        el.style.scrollSnapType = 'none';

        if (event) event.preventDefault?.();
      };

      const handlePointerMove = (x: number, y: number, event?: Event) => {
        if (!isPointerDown) return;

        const deltaX = x - lastX;
        const deltaY = y - lastY;

        lastX = x;
        lastY = y;

        const scaledDeltaX = applySpeedCurve(deltaX);
        const scaledDeltaY = applySpeedCurve(deltaY);

        velocityX = scaledDeltaX;
        velocityY = scaledDeltaY;

        el.scrollLeft -= scaledDeltaX;
        el.scrollTop -= scaledDeltaY;

        if (event) event.preventDefault?.();
      };

      const handlePointerEnd = () => {
        if (!isPointerDown) return;
        isPointerDown = false;

        if (friction < 1) {
          requestAnimationFrame(() => applyInertia());
        } else {
          el.style.scrollSnapType = originalScrollSnap;
        }
      };

      const applyInertia = () => {
        if (Math.abs(velocityX) > 1 || Math.abs(velocityY) > 1) {
          el.scrollLeft -= velocityX;
          el.scrollTop -= velocityY;
          velocityX *= friction;
          velocityY *= friction;
          requestAnimationFrame(applyInertia);
        } else {
          el.style.scrollSnapType = originalScrollSnap;
        }
      };

      // Mouse event handlers
      const onMouseDown = (e: MouseEvent) => {
        if (e.button !== 0) return; // Only left mouse button
        handlePointerStart(e.clientX, e.clientY);
      };

      const onMouseMove = (e: MouseEvent) => {
        handlePointerMove(e.clientX, e.clientY);
      };

      // Touch event handlers
      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length !== 1) return; // Only single touch
        handlePointerStart(e.touches[0].clientX, e.touches[0].clientY, e);
      };

      const onTouchMove = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY, e);
      };

      // Add event listeners
      el.addEventListener('mousedown', onMouseDown);
      el.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', handlePointerEnd);

      el.addEventListener('touchstart', onTouchStart, { passive: false });
      el.addEventListener('touchmove', onTouchMove, { passive: false });
      el.addEventListener('touchend', handlePointerEnd);

      // Return cleanup function
      return () => {
        el.removeEventListener('mousedown', onMouseDown);
        el.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', handlePointerEnd);

        el.removeEventListener('touchstart', onTouchStart);
        el.removeEventListener('touchmove', onTouchMove);
        el.removeEventListener('touchend', handlePointerEnd);
      };
    },
  );
};

export default AlpineMouseDragPlugin;
