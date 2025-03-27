const P = {
  disableInertia: !1,
  friction: 0.9,
  speedFactor: 1.5
}, I = (X) => {
  X.directive(
    "mousedrag",
    (e, {
      modifiers: Y,
      expression: u
    }) => {
      let s = !1, d = 0, p = 0, r = 0, a = 0, h = "";
      const i = {
        ...P,
        disableInertia: Y.includes("disableinertia")
      };
      u && !isNaN(Number(u)) && (i.speedFactor = Number(u));
      const m = i.disableInertia ? 1 : i.friction ?? 0.9, f = i.speedFactor ?? 1.5, v = (t) => {
        const n = Math.abs(t);
        return Math.sign(t) * Math.pow(n, f) / Math.pow(10, f - 1);
      }, L = (t, n, o) => {
        var l;
        s = !0, d = t, p = n, h = getComputedStyle(e).scrollSnapType, e.style.scrollSnapType = "none", o && ((l = o.preventDefault) == null || l.call(o));
      }, E = (t, n, o) => {
        var g;
        if (!s) return;
        const l = t - d, F = n - p;
        d = t, p = n;
        const T = v(l), D = v(F);
        r = T, a = D, e.scrollLeft -= T, e.scrollTop -= D, o && ((g = o.preventDefault) == null || g.call(o));
      }, c = () => {
        s && (s = !1, m < 1 ? requestAnimationFrame(() => M()) : e.style.scrollSnapType = h);
      }, M = () => {
        Math.abs(r) > 1 || Math.abs(a) > 1 ? (e.scrollLeft -= r, e.scrollTop -= a, r *= m, a *= m, requestAnimationFrame(M)) : e.style.scrollSnapType = h;
      }, b = (t) => {
        t.button === 0 && L(t.clientX, t.clientY);
      }, y = (t) => {
        E(t.clientX, t.clientY);
      }, S = (t) => {
        t.touches.length === 1 && L(t.touches[0].clientX, t.touches[0].clientY, t);
      }, w = (t) => {
        t.touches.length === 1 && E(t.touches[0].clientX, t.touches[0].clientY, t);
      };
      return e.addEventListener("mousedown", b), e.addEventListener("mousemove", y), window.addEventListener("mouseup", c), e.addEventListener("touchstart", S, { passive: !1 }), e.addEventListener("touchmove", w, { passive: !1 }), e.addEventListener("touchend", c), () => {
        e.removeEventListener("mousedown", b), e.removeEventListener("mousemove", y), window.removeEventListener("mouseup", c), e.removeEventListener("touchstart", S), e.removeEventListener("touchmove", w), e.removeEventListener("touchend", c);
      };
    }
  );
};
export {
  I as default
};
//# sourceMappingURL=alpine-mousedrag-plugin.js.map
