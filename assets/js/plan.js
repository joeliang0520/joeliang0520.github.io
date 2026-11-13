// Scene 01 on the research questions page (questions.html): a person wearing
// smart glasses walks the floor plan, and every object that falls inside the
// glasses' field of view is pinned to memory. hero.js starts and stops it via
// window.sceneWalk when the "understand your surroundings" card is active.
(function () {
  var svg = document.getElementById('plan');
  if (!svg) return;

  var NS = 'http://www.w3.org/2000/svg';
  var route = document.getElementById('route');
  var walker = document.getElementById('walker');
  var pins = document.getElementById('pins');

  var FOV_RADIUS = 92;
  var FOV_HALF = 34 * Math.PI / 180;
  var DURATION = 8;        // seconds for the whole walk
  var total = route.getTotalLength();
  var speed = total / DURATION;

  var objects = Array.prototype.map.call(svg.querySelectorAll('.obj'), function (g) {
    return { key: g.dataset.key, x: +g.dataset.x, y: +g.dataset.y, el: g };
  });

  var t = 0, seen = {};
  function reset() {
    t = 0;
    seen = {};
    pins.textContent = '';
    objects.forEach(function (o) { o.el.classList.remove('seen'); });
  }

  function see(o) {
    if (seen[o.key]) return;
    seen[o.key] = true;
    o.el.classList.add('seen');
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'pin');
    g.setAttribute('transform', 'translate(' + o.x + ' ' + o.y + ')');
    g.innerHTML = '<circle class="pin-ring" r="10"></circle><circle class="pin-dot" r="3.2"></circle>';
    pins.appendChild(g);
  }

  function pose(time) {
    var d = Math.min(time * speed, total);
    var p = route.getPointAtLength(d);
    var q = route.getPointAtLength(Math.min(d + 2, total));
    var r = route.getPointAtLength(Math.max(d - 2, 0));
    return { x: p.x, y: p.y, a: Math.atan2(q.y - r.y, q.x - r.x) };
  }

  function place(p) {
    walker.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) +
      ') rotate(' + (p.a * 180 / Math.PI).toFixed(1) + ')');
  }

  function step(dt) {
    t += dt;
    var p = pose(t);
    place(p);
    objects.forEach(function (o) {
      if (seen[o.key]) return;
      var dx = o.x - p.x, dy = o.y - p.y;
      var diff = Math.atan2(dy, dx) - p.a;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      if (Math.sqrt(dx * dx + dy * dy) < FOV_RADIUS && Math.abs(diff) < FOV_HALF) see(o);
    });
  }

  var raf = null, last = null;
  function frame(now) {
    if (last !== null) step(Math.min((now - last) / 1000, 0.05));
    last = now;
    raf = t < DURATION ? requestAnimationFrame(frame) : null;
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    last = null;
  }

  // Still frame: walk finished, everything pinned.
  function final() {
    stop();
    reset();
    for (var s = 0; s <= DURATION; s += 0.05) step(0.05);
  }

  window.sceneWalk = {
    play: function () { stop(); reset(); place(pose(0)); raf = requestAnimationFrame(frame); },
    stop: stop,
    final: final
  };
  final();
})();
