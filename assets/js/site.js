(function () {
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Abstract / BibTeX panels, BibTeX copy, news toggle ----
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('button.toggle');
    if (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.hidden = open;
      return;
    }

    var copy = e.target.closest('button.copy');
    if (copy) {
      var text = copy.parentNode.querySelector('pre').textContent;
      var done = function () {
        copy.textContent = 'Copied';
        setTimeout(function () { copy.textContent = 'Copy'; }, 1500);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
      return;
    }

    var more = e.target.closest('#news-toggle');
    if (more) {
      var list = document.getElementById('news');
      var expanded = more.getAttribute('aria-expanded') === 'true';
      list.classList.toggle('expanded', !expanded);
      more.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      more.textContent = expanded ? 'Show all news' : 'Show fewer';
      return;
    }

    var thumb = e.target.closest('.pub-thumb');
    if (thumb) openLightbox(thumb);
  });

  // ---- Figure lightbox ----
  var box;
  function openLightbox(thumb) {
    if (!box) {
      box = document.createElement('dialog');
      box.className = 'lightbox';
      box.innerHTML = '<figure><img alt=""><figcaption></figcaption></figure>' +
        '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>';
      document.body.appendChild(box);
      box.addEventListener('click', function (e) {
        if (e.target === box || e.target.closest('.lightbox-close')) box.close();
      });
    }
    var pub = thumb.closest('.pub');
    var img = box.querySelector('img');
    img.src = thumb.dataset.full;
    img.alt = thumb.querySelector('img').alt;
    box.querySelector('figcaption').textContent = pub.querySelector('.pub-title').textContent;
    if (box.showModal) box.showModal(); else window.open(thumb.dataset.full);
  }

  // ---- Topic filter (publications page) ----
  var chips = document.querySelectorAll('.filters button');
  Array.prototype.forEach.call(chips, function (chip) {
    chip.addEventListener('click', function () {
      var topic = chip.dataset.topic;
      Array.prototype.forEach.call(chips, function (c) {
        c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
      });
      var shown = 0;
      Array.prototype.forEach.call(document.querySelectorAll('.pub-section .pub'), function (p) {
        var match = topic === 'all' || (' ' + p.dataset.topics + ' ').indexOf(' ' + topic + ' ') > -1;
        p.classList.toggle('filtered-out', !match);
        if (match) shown++;
      });
      Array.prototype.forEach.call(document.querySelectorAll('.year-group, .pub-section'), function (g) {
        g.classList.toggle('empty', !g.querySelector('.pub:not(.filtered-out)'));
      });
      var count = document.getElementById('filter-count');
      if (count) count.textContent = shown + (shown === 1 ? ' paper' : ' papers');
    });
  });

  // ---- Line-drawing icons: compute stroke lengths for the draw-in effect ----
  Array.prototype.forEach.call(document.querySelectorAll('svg.draw'), function (svg) {
    Array.prototype.forEach.call(svg.querySelectorAll('path, rect, circle, line'), function (el) {
      if (el.getTotalLength) {
        var len = Math.ceil(el.getTotalLength()) + 1;
        el.style.setProperty('--len', len);
      }
    });
  });

  // ---- Gentle reveal on scroll ----
  var targets = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (t) { t.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  Array.prototype.forEach.call(targets, function (t) { io.observe(t); });
})();
