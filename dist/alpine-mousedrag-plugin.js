"use strict";
(() => {
  // src/index.ts
  var AlpineMouseDragPlugin = (Alpine) => {
    Alpine.directive(
      "mousedrag",
      (_el, { modifiers }) => {
        const el = _el;
        let isMouseDown = false;
        let lastX, lastY;
        let velocityX = 0;
        let velocityY = 0;
        const friction = modifiers.includes("disableinertia") ? 1 : 0.9;
        let originalScrollSnap;
        const onMouseDown = (e) => {
          if (e.button !== 0)
            return;
          isMouseDown = true;
          lastX = e.clientX;
          lastY = e.clientY;
          originalScrollSnap = getComputedStyle(el).scrollSnapType;
          el.style.scrollSnapType = "none";
        };
        const onMouseMove = (e) => {
          if (!isMouseDown)
            return;
          const deltaX = e.clientX - lastX;
          const deltaY = e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;
          velocityX = deltaX;
          velocityY = deltaY;
          el.scrollLeft -= deltaX;
          el.scrollTop -= deltaY;
        };
        const onMouseUp = (e) => {
          isMouseDown = false;
          if (friction < 1) {
            requestAnimationFrame(() => applyInertia(originalScrollSnap));
          } else {
            el.style.scrollSnapType = originalScrollSnap;
          }
        };
        const applyInertia = (originalScrollSnap2) => {
          if (Math.abs(velocityX) > 1 || Math.abs(velocityY) > 1) {
            el.scrollLeft -= velocityX;
            el.scrollTop -= velocityY;
            velocityX *= friction;
            velocityY *= friction;
            requestAnimationFrame(() => applyInertia(originalScrollSnap2));
          } else {
            el.style.scrollSnapType = originalScrollSnap2;
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
  var src_default = AlpineMouseDragPlugin;
})();
