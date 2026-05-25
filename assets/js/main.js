/* ===========================================
   Joe Liang — shared site script
   - theme toggle (persisted)
   - mobile nav
   - scroll reveal
   - hero particle constellation
   - publication expand + bibtex copy
   =========================================== */

(function () {
  'use strict';

  // ---- theme ----
  const THEME_KEY = 'joe-theme';
  const root = document.documentElement;
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.setAttribute('data-theme', 'dark');
  }

  function setTheme(t) {
    if (t === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    localStorage.setItem(THEME_KEY, t);
  }

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-theme-toggle]');
    if (!t) return;
    const isDark = root.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });

  // ---- nav scrolled + mobile ----
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-mobile-toggle]');
    if (!t) return;
    document.querySelector('.nav-links')?.classList.toggle('open');
  });

  // close mobile nav after link click
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.addEventListener('click', () => document.querySelector('.nav-links')?.classList.remove('open'));
  });

  // ---- scroll reveal ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach((el) => io.observe(el));

  // ---- hero canvas constellation ----
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) initConstellation(heroCanvas);

  function initConstellation(canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr, points = [];
    const target = { x: 0, y: 0, active: false };

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = rect.width * dpr;
      h = canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      const count = Math.min(80, Math.floor((rect.width * rect.height) / 16000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25 * dpr,
        vy: (Math.random() - 0.5) * 0.25 * dpr,
        r: (Math.random() * 1.4 + 0.4) * dpr,
      }));
    }
    resize();
    window.addEventListener('resize', resize);

    canvas.parentElement.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      target.x = (e.clientX - rect.left) * dpr;
      target.y = (e.clientY - rect.top) * dpr;
      target.active = true;
    });
    canvas.parentElement.addEventListener('pointerleave', () => (target.active = false));

    const linkDist = 130 * (window.devicePixelRatio || 1);
    function inkColor() {
      const isDark = root.getAttribute('data-theme') === 'dark';
      return isDark ? '244, 239, 228' : '19, 17, 13';
    }
    function accentColor() {
      const isDark = root.getAttribute('data-theme') === 'dark';
      return isDark ? '255, 107, 61' : '210, 76, 44';
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      const ink = inkColor();
      const acc = accentColor();

      // move
      for (const p of points) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // links
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        // mouse pull
        if (target.active) {
          const dx = target.x - p.x, dy = target.y - p.y;
          const d2 = dx*dx + dy*dy;
          if (d2 < 28000) {
            p.vx += dx * 0.00002;
            p.vy += dy * 0.00002;
          }
        }
        // cap velocity
        p.vx = Math.max(-0.6 * dpr, Math.min(0.6 * dpr, p.vx));
        p.vy = Math.max(-0.6 * dpr, Math.min(0.6 * dpr, p.vy));

        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const a = 1 - d / linkDist;
            ctx.strokeStyle = `rgba(${ink},${a * 0.18})`;
            ctx.lineWidth = 1 * dpr * a;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // dots
      for (const p of points) {
        let useAcc = false;
        if (target.active) {
          const dx = target.x - p.x, dy = target.y - p.y;
          if (dx*dx + dy*dy < 14000) useAcc = true;
        }
        ctx.fillStyle = useAcc ? `rgba(${acc}, 0.95)` : `rgba(${ink}, 0.65)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ---- publication expand ----
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-expand]');
    if (!btn) return;
    const target = btn.getAttribute('data-expand');
    const pub = btn.closest('.pub');
    if (!pub) return;
    pub.querySelectorAll('.pub-expand').forEach((el) => {
      if (el.getAttribute('data-panel') === target) {
        el.classList.toggle('open');
      } else {
        el.classList.remove('open');
      }
    });
  });

  // ---- copy bibtex ----
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    const pre = btn.parentElement.querySelector('pre');
    if (!pre) return;
    navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(() => (btn.textContent = orig), 1400);
    });
  });

  // ---- publications filter ----
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-filter]');
    if (!chip) return;
    const filter = chip.getAttribute('data-filter');
    document.querySelectorAll('[data-filter]').forEach((c) => c.classList.toggle('active', c === chip));
    document.querySelectorAll('.pub').forEach((p) => {
      const tags = (p.getAttribute('data-tags') || '').split(' ');
      const show = filter === 'all' || tags.includes(filter);
      p.style.display = show ? '' : 'none';
    });
  });

  // ---- magnetic effect for primary buttons (mild) ----
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });

  // ---- current year ----
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
})();
