// Research questions page: the four "How should it..." question cards beside the floor plan.
// - Each card's text gets its own vector mark, drawn per wrapped line:
//   brackets -> viewfinder corners + a scan sweep   (understand surroundings)
//   timeline -> a line with day markers             (remember multi-day interactions)
//   converge -> two strokes that merge into one     (stay aligned)
//   wave     -> a speech-like wave ending in a spark (present information)
// - story.js plays one continuous animation beside the cards and reports which
//   part it is in; that card becomes active (its mini scene plays, its mark
//   redraws) while the others fade back. Clicking a card jumps the story there.
(function () {
  var root = document.getElementById('asks');
  if (!root || !document.documentElement.classList.contains('js')) return;
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var asks = Array.prototype.slice.call(root.querySelectorAll('.ask'));
  var svg; // the overlay currently being drawn into (one per card)

  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    (parent || svg).appendChild(n);
    return n;
  }

  function fragments(text) {
    var base = text.getBoundingClientRect();
    var range = document.createRange();
    range.selectNodeContents(text.firstChild);
    // One rect per wrapped line (merge any that share a line).
    var lines = [];
    Array.prototype.slice.call(range.getClientRects()).forEach(function (r) {
      if (r.width <= 2) return;
      var last = lines[lines.length - 1];
      if (last && Math.abs(last.top - r.top) < 4) {
        last.left = Math.min(last.left, r.left);
        last.right = Math.max(last.right, r.right);
        last.top = Math.min(last.top, r.top);
        last.bottom = Math.max(last.bottom, r.bottom);
      } else {
        lines.push({ left: r.left, right: r.right, top: r.top, bottom: r.bottom });
      }
    });
    return lines.map(function (r) {
      return { x: r.left - base.left, y: r.top - base.top, w: r.right - r.left,
               h: r.bottom - r.top, b: r.bottom - base.top };
    });
  }

  // Each builder returns a list of steps: {node, len} strokes drawn in order,
  // or {dot} markers that pop in at a moment in the sequence.
  var shapes = {
    brackets: function (frags, g) {
      var steps = [];
      frags.forEach(function (f) {
        var p = 4, x0 = f.x - p, x1 = f.x + f.w + p, y0 = f.y + 1, y1 = f.b + 1;
        var c = Math.min(11, f.w / 4, (y1 - y0) / 2.2);
        var d = 'M' + x0 + ' ' + (y0 + c) + 'V' + y0 + 'H' + (x0 + c) +
                'M' + (x1 - c) + ' ' + y0 + 'H' + x1 + 'V' + (y0 + c) +
                'M' + x1 + ' ' + (y1 - c) + 'V' + y1 + 'H' + (x1 - c) +
                'M' + (x0 + c) + ' ' + y1 + 'H' + x0 + 'V' + (y1 - c);
        steps.push({ node: el('path', { d: d }, g), len: c * 8 });
        steps.push({ scan: el('line', { x1: x0 + 3, x2: x1 - 3, y1: y0 + 2, y2: y0 + 2, 'class': 'scan' }, g),
                     dy: y1 - y0 - 4 });
      });
      return steps;
    },
    timeline: function (frags, g) {
      var steps = [], total = 0;
      frags.forEach(function (f) { total += f.w; });
      var gap = Math.max(46, total / 6), next = gap * 0.35;
      frags.forEach(function (f) {
        var y = f.b + 1;
        steps.push({ node: el('path', { d: 'M' + f.x + ' ' + y + 'H' + (f.x + f.w) }, g), len: f.w });
        for (; next < f.w; next += gap) {
          steps.push({ dot: el('circle', { cx: f.x + next, cy: y, r: 3.2, 'class': 'dot' }, g) });
        }
        next -= f.w;
      });
      return steps;
    },
    converge: function (frags, g) {
      var total = 0, done = 0, a = [], b = [];
      frags.forEach(function (f) { total += f.w; });
      frags.forEach(function (f) {
        var y = f.b, da = '', db = '';
        for (var i = 0; i <= 24; i++) {
          var x = f.x + f.w * i / 24, t = (done + f.w * i / 24) / total;
          var off = 4 * Math.pow(1 - t, 1.6);
          da += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + (y - off).toFixed(1);
          db += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + (y + off).toFixed(1);
        }
        done += f.w;
        a.push({ node: el('path', { d: da }, g), len: f.w * 1.02 });
        b.push({ node: el('path', { d: db, opacity: .55 }, g), len: f.w * 1.02 });
      });
      // Draw both strands together, fragment by fragment.
      return a.map(function (s, i) { return { pair: [s, b[i]], len: s.len }; });
    },
    wave: function (frags, g) {
      var steps = [];
      frags.forEach(function (f) {
        var y = f.b + 1, d = 'M' + f.x + ' ' + y, wl = 11, amp = 2.4;
        for (var x = 0; x < f.w; x += wl / 2) {
          var x2 = Math.min(x + wl / 2, f.w), dir = (x / (wl / 2)) % 2 ? 1 : -1;
          d += 'Q' + (f.x + (x + x2) / 2).toFixed(1) + ' ' + (y + dir * amp * 2 * (x2 - x) / (wl / 2)).toFixed(1) +
               ' ' + (f.x + x2).toFixed(1) + ' ' + y;
        }
        steps.push({ node: el('path', { d: d }, g), len: f.w * 1.25 });
      });
      var last = frags[frags.length - 1];
      if (last) {
        var cx = last.x + last.w + 1, cy = last.b + 1, d = '';
        [[0.7, -0.7], [1, 0], [0.7, 0.7]].forEach(function (v) {
          d += 'M' + (cx + v[0] * 4) + ' ' + (cy + v[1] * 4) + 'l' + v[0] * 4.5 + ' ' + v[1] * 4.5;
        });
        steps.push({ node: el('path', { d: d }, g), len: 40 });
      }
      return steps;
    }
  };

  function prime(node, len) {
    node.style.strokeDasharray = len;
    node.style.strokeDashoffset = len;
  }

  function play(steps, delay, animate) {
    var t = delay, SPEED = 0.55; // px per ms
    steps.forEach(function (s) {
      var nodes = s.pair ? [s.pair[0].node, s.pair[1].node] : s.node ? [s.node] : [];
      if (!animate) {
        if (s.dot) s.dot.classList.add('on');
        if (s.scan) s.scan.style.opacity = 0;
        return;
      }
      if (s.dot) {
        setTimeout(function () { s.dot.classList.add('on'); }, t);
        return;
      }
      if (s.scan) {
        s.scan.style.opacity = 0;
        s.scan.animate([
          { opacity: 0, transform: 'translateY(0)' },
          { opacity: .7, offset: .15 },
          { opacity: .7, offset: .8 },
          { opacity: 0, transform: 'translateY(' + s.dy + 'px)' }
        ], { duration: 900, delay: t, easing: 'ease-in-out' });
        return;
      }
      var dur = Math.max(160, s.len / SPEED);
      nodes.forEach(function (n) {
        prime(n, s.len);
        var anim = n.animate([{ strokeDashoffset: s.len }, { strokeDashoffset: 0 }],
                  { duration: dur, delay: t, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'backwards' });
        n.style.strokeDashoffset = 0; // final state once the animation ends
        anim.onfinish = function () { n.style.strokeDasharray = ''; };
      });
      t += dur * 0.85;
    });
  }

  function draw(ask, delay, animate) {
    var text = ask.querySelector('.ask-text');
    svg = text.querySelector('.hl-marks');
    if (!svg) {
      svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('class', 'hl-marks');
      svg.setAttribute('aria-hidden', 'true');
      text.appendChild(svg);
    }
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var g = el('g', {});
    var color = getComputedStyle(text).color;
    g.setAttribute('stroke', color);
    g.setAttribute('fill', color);
    var steps = (shapes[ask.getAttribute('data-shape')] || shapes.wave)(fragments(text), g);
    play(steps, delay, animate);
  }

  function build(animate) {
    asks.forEach(function (ask, i) {
      var delay = 150 + i * 420;
      if (animate) setTimeout(function () { ask.classList.add('on'); }, delay);
      else ask.classList.add('on');
      draw(ask, delay + 380, animate);
    });
  }

  // ---- The story (story.js) decides which card is active; clicking a card seeks it ----
  var canAnimate = !reduce && typeof root.animate === 'function';
  var CAPTIONS = [
    'Day 1, through the glasses: the assistant recognizes the parts of the room — sofa, table, mug, door, shelf and boxes.',
    'Zooming out, what it saw is pinned to a map of the home, and each day adds memories in the room where they happened. On day 3, a question is answered from day 1.',
    'Back in the living room on day 3: the assistant proposes a plan, the user corrects it, and the assistant keeps the preference.',
    'Into the glasses: labels follow the user’s gaze, and the reminder arrives right when Dana does.'
  ];
  var capNum = document.getElementById('stage-num');
  var capText = document.getElementById('stage-text');
  var current = -1;

  function setActive(i) {
    if (i === current) return;
    current = i;
    root.classList.add('playing');
    asks.forEach(function (a, k) { a.classList.toggle('active', k === i); });
    if (started) draw(asks[i], 0, canAnimate);
    if (capNum) capNum.textContent = '0' + (i + 1);
    if (capText) {
      capText.classList.add('swap');
      setTimeout(function () {
        capText.textContent = CAPTIONS[i];
        capText.classList.remove('swap');
      }, canAnimate ? 250 : 0);
    }
  }

  // Clicking (or pressing Enter/Space on) a card jumps the story to that part.
  function jump(k) { if (window.story) window.story.seek(k); else setActive(k); }
  asks.forEach(function (a, k) {
    a.setAttribute('tabindex', '0');
    a.setAttribute('aria-controls', 'stage');
    a.addEventListener('click', function () { jump(k); });
    a.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jump(k); }
    });
  });

  var started = false, timer;
  function start() {
    if (started) return;
    build(canAnimate);
    started = true;
    // Begin at the card named in the URL (#see, #remember, ...) if any.
    var hashed = asks.indexOf(document.getElementById(location.hash.slice(1)));
    var first = hashed >= 0 ? hashed : 0;
    if (window.story) {
      window.story.onSegment = setActive;
      window.story.start(first);
    } else {
      setActive(first);
    }
    // Re-layout (resize, late font swap) redraws the marks in place without animating.
    if ('ResizeObserver' in window) {
      var w = root.offsetWidth;
      new ResizeObserver(function () {
        if (root.offsetWidth === w) return;
        w = root.offsetWidth;
        clearTimeout(timer);
        timer = setTimeout(function () { build(false); }, 120);
      }).observe(root);
    }
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(start);
    setTimeout(start, 1500);
  } else {
    start();
  }
})();
