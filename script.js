(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // theme
  try {
    const saved = localStorage.getItem('theme');
    if (saved) root.dataset.theme = saved;
  } catch (e) {}
  document.querySelector('.theme-toggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // split hero headline into animated words (keeps <em> styling)
  const h1 = document.querySelector('.split');
  let idx = 0;
  const wrap = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((t) => {
          if (!t) return;
          if (/^\s+$/.test(t)) return frag.append(' ');
          const w = document.createElement('span');
          w.className = 'w';
          const inner = document.createElement('span');
          inner.style.setProperty('--i', idx++);
          inner.textContent = t;
          w.append(inner);
          frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) wrap(n);
    });
  };
  wrap(h1);
  requestAnimationFrame(() => requestAnimationFrame(() => h1.classList.add('in')));

  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // scroll progress
  const bar = document.querySelector('.progress');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // footer year
  document.querySelector('.year').textContent = new Date().getFullYear();

  // page slider: a rail you can drag to scrub down the page, with a stop for each section
  const pg = document.querySelector('#pg');
  if (pg) {
    const thumb = pg.querySelector('.pg-thumb'), label = pg.querySelector('.pg-label'), fill = pg.querySelector('.pg-fill');
    const stops = [...pg.querySelectorAll('.pg-stop')].map((el) => ({ el, name: el.textContent.trim(), y: 0, p: 0 }));
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const NAV = 64; // the fixed header covers the top of a section unless we stop a little above it
    const glide = reduce ? 'auto' : 'smooth';
    let current = -1;

    function update() {
      const f = clamp(scrollY / maxScroll(), 0, 1);
      thumb.style.top = f * 100 + '%';
      fill.style.height = f * 100 + '%';
      let at = 0;
      stops.forEach((s, i) => { if (scrollY >= s.y - innerHeight * 0.3) at = i; }); // the last section we've reached
      if (at !== current) {
        current = at; label.textContent = stops[at].name;
        stops.forEach((s, i) => s.el.classList.toggle('on', i === at));
      }
      thumb.setAttribute('aria-valuenow', Math.round(f * 100));
      thumb.setAttribute('aria-valuetext', stops[at].name + ' section');
    }
    function layout() { // place each stop where its section starts; run again when the page height changes
      const max = maxScroll();
      stops.forEach((s) => {
        const to = s.el.dataset.to;
        s.y = to === 'top' ? 0 : clamp(document.querySelector(to).getBoundingClientRect().top + scrollY - NAV, 0, max);
        s.p = s.y / max;
        s.el.style.top = s.p * 100 + '%';
      });
      pg.classList.toggle('off', document.documentElement.scrollHeight - innerHeight < 120); // nothing to scroll
      update();
    }

    // dragging: the dot follows the pointer, and gently snaps onto a section as it passes
    let dragging = false, savedBehavior = '';
    const fracAt = (clientY) => { const r = pg.getBoundingClientRect(); return clamp((clientY - r.top) / r.height, 0, 1); };
    const snap = (f) => { for (const s of stops) if (Math.abs(f - s.p) < 0.022) return s.p; return f; };
    const scrub = (clientY) => window.scrollTo({ top: snap(fracAt(clientY)) * maxScroll(), behavior: 'instant' });
    const endDrag = () => {
      if (!dragging) return;
      dragging = false; pg.classList.remove('drag'); document.documentElement.style.scrollBehavior = savedBehavior;
    };
    pg.addEventListener('pointerdown', (e) => {
      if (e.button > 0 || e.target.closest('.pg-stop')) return; // the circles are buttons of their own
      dragging = true; pg.classList.add('drag'); pg.setPointerCapture(e.pointerId);
      savedBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto'; // the page is set to glide; dragging must not lag behind
      scrub(e.clientY); thumb.focus({ preventScroll: true }); e.preventDefault();
    });
    pg.addEventListener('pointermove', (e) => { if (dragging) scrub(e.clientY); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((t) => pg.addEventListener(t, endDrag));

    stops.forEach((s) => s.el.addEventListener('click', () => window.scrollTo({ top: s.y, behavior: glide })));

    thumb.addEventListener('keydown', (e) => { // arrow keys nudge, Page keys jump, Home and End go to the ends
      const steps = { ArrowDown: .05, ArrowUp: -.05, PageDown: .2, PageUp: -.2 };
      if (e.key in steps) { e.preventDefault(); window.scrollBy({ top: steps[e.key] * maxScroll(), behavior: glide }); }
      else if (e.key === 'Home') { e.preventDefault(); window.scrollTo({ top: 0, behavior: glide }); }
      else if (e.key === 'End') { e.preventDefault(); window.scrollTo({ top: maxScroll(), behavior: glide }); }
    });

    let queued = false;
    addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; update(); }); } }, { passive: true });
    addEventListener('resize', layout);
    addEventListener('load', layout);
    new ResizeObserver(layout).observe(document.body); // fonts and images change the page height
    layout();
  }

  if (!fine || reduce) return;

  // custom cursor
  const cur = document.querySelector('.cursor');
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
  addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    cx += (mx - cx) * .2;
    cy += (my - cy) * .2;
    cur.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('[data-cursor], .art').forEach((el) => { // links and project artwork, not whole text blocks
    el.addEventListener('pointerenter', () => cur.classList.add('big'));
    el.addEventListener('pointerleave', () => cur.classList.remove('big'));
  });

  // magnetic buttons
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * .25;
      const y = (e.clientY - r.top - r.height / 2) * .35;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });

  // 3D tilt on project art
  document.querySelectorAll('.art').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) scale(1.015)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
})();
