import { DirectiveParameters } from "alpinejs";
type MouseDragModifiers = "disableinertia";

const AlpineMouseDragPlugin = (Alpine: any) => {
  Alpine.directive(
    "mousedrag",
    (_el: Node, { modifiers }: DirectiveParameters): (() => void) => {
      // gymnastics to get HTMLElement type
      const el = _el as HTMLElement;
      let isMouseDown = false;
      let lastX: number, lastY: number;
      let velocityX = 0;
      let velocityY = 0;
      const friction = modifiers.includes("disableinertia") ? 1 : 0.9;
      let originalScrollSnap: string;

      const onMouseDown = (e: MouseEvent) => {
        if (e.button !== 0) return; // Only left mouse button
        isMouseDown = true;
        lastX = e.clientX;
        lastY = e.clientY;

        // store and disable scroll-snap-type
        originalScrollSnap = getComputedStyle(el).scrollSnapType;
        el.style.scrollSnapType = "none";
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isMouseDown) return;
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;

        lastX = e.clientX;
        lastY = e.clientY;

        velocityX = deltaX;
        velocityY = deltaY;

        el.scrollLeft -= deltaX;
        el.scrollTop -= deltaY;
      };

      const onMouseUp = (e: MouseEvent) => {
        isMouseDown = false;
        if (friction < 1) {
          requestAnimationFrame(() => applyInertia(originalScrollSnap));
        } else {
          // Restore scroll-snap-type if no inertia
          el.style.scrollSnapType = originalScrollSnap;
        }
      };

      const applyInertia = (originalScrollSnap: string) => {
        if (Math.abs(velocityX) > 1 || Math.abs(velocityY) > 1) {
          el.scrollLeft -= velocityX;
          el.scrollTop -= velocityY;
          velocityX *= friction;
          velocityY *= friction;
          requestAnimationFrame(() => applyInertia(originalScrollSnap));
        } else {
          // Restore scroll-snap-type after inertia has settled
          el.style.scrollSnapType = originalScrollSnap;
        }
      };

      el.addEventListener("mousedown", onMouseDown);
      el.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);

      return () => {
        el.removeEventListener("mousedown", onMouseDown);
        el.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
    }
  );
};

export default AlpineMouseDragPlugin;
