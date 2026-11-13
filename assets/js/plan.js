// Animated floor plan for the "Current Focus" section on the home page.
// A person wearing smart glasses walks a route; objects that fall inside the
// glasses' field of view are pinned to memory, and dialogue is attached to them.
(function () {
  var svg = document.getElementById('plan');
  if (!svg) return;

  var NS = 'http://www.w3.org/2000/svg';
  var route = document.getElementById('route');
  var walker = document.getElementById('walker');
  var speech = document.getElementById('speech');
  var link = document.getElementById('link');
  var pins = document.getElementById('pins');
  var memList = document.getElementById('mem-list');
  var dialog = document.getElementById('dialog');
  var toggle = document.getElementById('plan-toggle');

  var FOV_RADIUS = 92;
  var FOV_HALF = 34 * Math.PI / 180;
  var SPEED = 62;          // route units per second
  var HOLD = 4.5;          // seconds to hold the final state before looping
  var total = route.getTotalLength();
  var walkTime = total / SPEED;

  var places = {
    sofa: 'living room', table: 'living room', mug: 'on the table',
    lamp: 'living room', armchair: 'living room', shelf: 'storage', boxes: 'storage'
  };

  var objects = Array.prototype.map.call(svg.querySelectorAll('.obj'), function (g) {
    return { key: g.dataset.key, x: +g.dataset.x, y: +g.dataset.y, el: g };
  });
  function obj(key) { return objects.filter(function (o) { return o.key === key; })[0]; }

  // Dialogue: each line fires once the object it mentions has been seen.
  var script = [
    { after: 'mug', delay: 0.5, who: 'User', text: 'That’s Dana’s mug on the table.',
      attach: 'mug', note: 'Dana’s' },
    { after: 'boxes', delay: 0.4, who: 'User', text: 'These boxes go on the shelf.',
      attach: 'boxes', note: 'move to shelf' },
    { atEnd: true, delay: 0.3, who: 'User', text: 'Where did Dana leave her mug?', attach: 'mug' },
    { atEnd: true, delay: 1.6, who: 'Assistant', text: 'On the living-room table, in front of the sofa.',
      attach: 'mug', answer: true }
  ];

  var state;
  function reset() {
    state = { t: 0, seen: {}, seenAt: {}, fired: {}, linkUntil: 0, speakUntil: 0 };
    pins.textContent = '';
    memList.textContent = '';
    dialog.textContent = '';
    objects.forEach(function (o) { o.el.classList.remove('seen', 'hit'); });
    link.classList.remove('on');
    speech.classList.remove('on');
  }

  function addPin(o) {
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'pin');
    g.setAttribute('transform', 'translate(' + o.x + ' ' + o.y + ')');
    var ring = document.createElementNS(NS, 'circle');
    ring.setAttribute('class', 'pin-ring');
    ring.setAttribute('r', '10');
    var dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('class', 'pin-dot');
    dot.setAttribute('r', '3.2');
    g.appendChild(ring);
    g.appendChild(dot);
    pins.appendChild(g);
  }

  function addMemory(o) {
    var li = document.createElement('li');
    li.dataset.key = o.key;
    li.innerHTML = '<span class="mem-dot"></span><strong>' + o.key + '</strong>' +
      '<span class="mem-where">' + places[o.key] + '</span><span class="mem-note"></span>';
    memList.appendChild(li);
  }

  function see(o) {
    if (state.seen[o.key]) return;
    state.seen[o.key] = true;
    state.seenAt[o.key] = state.t;
    o.el.classList.add('seen');
    addPin(o);
    addMemory(o);
  }

  function say(line, pos) {
    var li = document.createElement('li');
    li.className = line.who === 'User' ? 'u' : 'a';
    li.innerHTML = '<span class="who">' + line.who + '</span>' + line.text;
    dialog.appendChild(li);
    while (dialog.children.length > 3) dialog.removeChild(dialog.firstChild);

    var o = obj(line.attach);
    if (line.note) {
      var m = memList.querySelector('[data-key="' + line.attach + '"] .mem-note');
      if (m) m.textContent = line.note;
    }
    var entry = memList.querySelector('[data-key="' + line.attach + '"]');
    if (entry) {
      entry.classList.remove('flash');
      void entry.offsetWidth;
      entry.classList.add('flash');
    }
    o.el.classList.remove('hit');
    void o.el.getBoundingClientRect();
    o.el.classList.add('hit');

    if (line.who === 'User') {
      link.setAttribute('x1', pos.x);
      link.setAttribute('y1', pos.y);
      link.setAttribute('x2', o.x);
      link.setAttribute('y2', o.y);
      link.classList.add('on');
      speech.classList.add('on');
      state.linkUntil = state.t + 2.2;
      state.speakUntil = state.t + 1.6;
    }
  }

  function pose(t) {
    var d = Math.min(t * SPEED, total);
    var p = route.getPointAtLength(d);
    var q = route.getPointAtLength(Math.min(d + 2, total));
    var r = route.getPointAtLength(Math.max(d - 2, 0));
    var ang = Math.atan2(q.y - r.y, q.x - r.x);
    return { x: p.x, y: p.y, a: ang };
  }

  function step(dt) {
    state.t += dt;
    var p = pose(state.t);
    walker.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) +
      ') rotate(' + (p.a * 180 / Math.PI).toFixed(1) + ')');
    speech.setAttribute('transform', 'translate(' + (p.x - 4).toFixed(1) + ' ' + (p.y - 24).toFixed(1) + ')');

    objects.forEach(function (o) {
      if (state.seen[o.key]) return;
      var dx = o.x - p.x, dy = o.y - p.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var diff = Math.atan2(dy, dx) - p.a;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      if (dist < FOV_RADIUS && Math.abs(diff) < FOV_HALF) see(o);
    });

    var ended = state.t >= walkTime;
    if (ended && state.endAt === undefined) state.endAt = state.t;
    script.forEach(function (line, i) {
      if (state.fired[i]) return;
      var ready = line.atEnd
        ? state.endAt !== undefined && state.t >= state.endAt + line.delay
        : state.seen[line.after] && state.t >= state.seenAt[line.after] + line.delay;
      if (ready) { state.fired[i] = true; say(line, p); }
    });

    if (state.t > state.linkUntil) link.classList.remove('on');
    if (state.t > state.speakUntil) speech.classList.remove('on');

    if (ended && state.t > state.endAt + 1.6 + HOLD) reset();
  }

  // Final state for reduced motion (and as a still frame).
  function showFinal() {
    reset();
    var p = pose(walkTime);
    walker.setAttribute('transform', 'translate(' + p.x + ' ' + p.y + ') rotate(' + (p.a * 180 / Math.PI) + ')');
    objects.forEach(see);
    say(script[0], p);
    say(script[1], p);
    say(script[2], p);
    say(script[3], p);
    link.classList.remove('on');
    speech.classList.remove('on');
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    showFinal();
    if (toggle) toggle.hidden = true;
    return;
  }

  reset();
  var visible = false, paused = false, last = null;
  function frame(now) {
    if (last !== null) step(Math.min((now - last) / 1000, 0.05));
    last = now;
    if (visible && !paused) requestAnimationFrame(frame);
    else last = null;
  }
  function play() { if (visible && !paused && last === null) requestAnimationFrame(frame); }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      play();
    }, { threshold: 0.2 }).observe(svg);
  } else {
    visible = true;
    play();
  }
  document.addEventListener('visibilitychange', function () {
    visible = !document.hidden && visible;
    if (!document.hidden) {
      var r = svg.getBoundingClientRect();
      visible = r.bottom > 0 && r.top < window.innerHeight;
      play();
    }
  });

  if (toggle) {
    toggle.addEventListener('click', function () {
      paused = !paused;
      toggle.textContent = paused ? 'Play' : 'Pause';
      toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
      play();
    });
  }
})();
