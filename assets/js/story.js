// One continuous animated story for the research questions page (questions.html).
// A single clock drives three stacked layers inside #stage:
//   #pov  first-person view through the glasses (Day 1 scan, Day 3 HUD)
//   #map  a floor-plan "camera" that tilts, zooms and pans across three days
//   #hud  screen-space overlays (chat panel, day badge)
// render(t) is a pure function of time, so seeking (card clicks), looping and
// reduced motion all reuse it. hero.js listens via story.onSegment.
(function () {
  var stage = document.getElementById('stage');
  if (!stage) return;
  var map = document.getElementById('map');
  var badge = document.getElementById('day-badge');
  var toggle = document.getElementById('story-toggle');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var LOOP = 58.5;                 // seconds
  var ASPECT = 460 / 300;
  var STARTS = [0, 11, 27, 43];    // where each question card's part begins
  var STILLS = [8.6, 25.5, 42.8, 56];  // representative frames for reduced motion

  function ease(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }
  // keys: [[time, value], ...]; holds before the first and after the last key.
  function kf(t, keys) {
    if (t <= keys[0][0]) return keys[0][1];
    for (var i = 1; i < keys.length; i++) {
      if (t <= keys[i][0]) {
        var a = keys[i - 1], b = keys[i];
        var p = b[0] === a[0] ? 1 : ease((t - a[0]) / (b[0] - a[0]));
        return a[1] + (b[1] - a[1]) * p;
      }
    }
    return keys[keys.length - 1][1];
  }
  function all(sel) { return Array.prototype.slice.call(stage.querySelectorAll(sel)); }

  var tracks = [];
  function op(sel, keys) {
    var els = all(sel);
    tracks.push(function (t) { var v = kf(t, keys); els.forEach(function (e) { e.style.opacity = v; }); });
  }
  function draw(sel, keys) {
    var els = all(sel);
    tracks.push(function (t) { var v = kf(t, keys); els.forEach(function (e) { e.style.strokeDashoffset = v; }); });
  }
  function move(sel, kx, ky) {
    var els = all(sel);
    tracks.push(function (t) {
      var v = 'translate(' + kf(t, kx).toFixed(2) + 'px,' + kf(t, ky).toFixed(2) + 'px)';
      els.forEach(function (e) { e.style.transform = v; });
    });
  }
  function rise(sel, a, b) {   // fade in while sliding up a few units
    op(sel, [[a, 0], [b, 1]]);
    move(sel, [[a, 0], [b, 0]], [[a, 6], [b, 0]]);
  }

  // ---- 01 Day 1, first person: scan the room and label its parts ----
  op('#pov', [[0, 1], [10, 1], [11, 0], [44.8, 0], [45.5, 1]]);
  op('.pv-d1', [[44.5, 1], [44.6, 0]]);
  op('.pv-d3', [[44.5, 0], [44.6, 1]]);
  op('.hudA', [[0, 1], [9.4, 1], [10.3, 0]]);
  op('.scanA', [[0.4, 0], [0.6, 1], [2.8, 1], [3.1, 0]]);
  move('.scanA', [[0, 0]], [[0.5, 0], [3, 290]]);
  for (var i = 0; i < 6; i++) op('.det' + i, [[3 + i * 0.7, 0], [3.35 + i * 0.7, 1]]);
  op('.roomchip', [[7.4, 0], [7.9, 1]]);

  // ---- 01 -> 02: dissolve into a tilted map, pins replace the labels, pull back ----
  op('#map-wrap', [[9.8, 0], [10.8, 1], [44.4, 1], [45.1, 0]]);
  op('.pins1', [[10.6, 0], [11.4, 1]]);
  op('.tags1', [[10.6, 0], [11.4, 1], [13, 1], [14.2, 0]]);
  draw('.tr1', [[11, 1], [13, 0]]);
  op('.walker1', [[13.4, 1], [14.4, 0]]);
  op('.rm', [[13, 1], [14.4, 0], [28.4, 0], [29.6, 1]]);

  // ---- 02 three days on a timeline ----
  op('#day1', [[27.5, 1], [29.2, 0]]);
  op('#day2', [[13.8, 0], [15.2, 1], [27.5, 1], [29.2, 0]]);
  op('#day3', [[13.8, 0], [15.2, 1]]);
  op('.tl', [[14.6, 0], [15.8, 1], [26.8, 1], [28.2, 0]]);
  op('.cap1', [[15.6, 0], [16.2, 1]]);
  draw('.tr2', [[16.6, 1], [18.2, 0]]);
  op('.keys', [[18, 0], [18.4, 1]]);
  op('.cap2', [[18, 0], [18.6, 1]]);
  draw('.tr3', [[19.4, 1], [21, 0]]);
  op('.user3', [[20.6, 0], [21, 1]]);
  op('.cap3', [[21, 0], [21.6, 1]]);
  op('.recall', [[22.2, 0], [22.4, 1], [26.8, 1], [28, 0]]);
  draw('.recall', [[22.3, 1], [24, 0]]);
  op('.halo', [[23.8, 0], [24.2, 1], [26.8, 1], [28, 0]]);
  op('.recall-cap', [[24, 0], [24.6, 1], [26.8, 1], [28, 0]]);

  // ---- 03 back into the Day 3 living room: dialogue and a corrected plan ----
  op('.bot3', [[29.6, 0], [30.2, 1]]);
  op('.chat', [[29.8, 0], [30.3, 1], [43, 1], [43.6, 0]]);
  rise('.s1', 30.5, 30.9);
  op('.tu', [[30.4, 0], [30.6, 1], [31.6, 0], [36, 0], [36.2, 1], [37.2, 0]]);
  rise('.s2', 33, 33.4);
  op('.tb', [[33, 0], [33.2, 1], [34.2, 0], [39, 0], [39.2, 1], [40.2, 0]]);
  op('.p12', [[33.5, 0], [34, 1], [39.6, 1], [40, 0]]);
  op('.p3', [[33.5, 0], [34, 1], [36.6, 1], [37, 0]]);
  rise('.s3', 36, 36.4);
  op('.nope', [[36.6, 0], [37, 1], [39.6, 1], [40, 0]]);
  op('.gift', [[36.8, 0], [37.2, 1]]);
  rise('.pref', 37.4, 37.8);
  rise('.s4', 39, 39.4);
  move('.bx1', [[40, 0], [41.6, -14]], [[40, 0], [41.6, -68]]);
  move('.bx2', [[40.2, 0], [41.8, 1]], [[40.2, 0], [41.8, -88]]);
  move('.bx3', [[40.4, 0], [42, -53]], [[40.4, 0], [42, -102]]);
  op('.chk', [[42.2, 0], [42.6, 1]]);

  // ---- 04 zoom into the user, then through the glasses ----
  op('.hudD', [[44.9, 0], [45.6, 1]]);
  op('.frameD', [[44.9, 0], [45.6, 1]]);
  var frame = all('.frameD');
  tracks.push(function (t) {
    var s = kf(t, [[45, 1.35], [46.2, 1]]);
    frame.forEach(function (e) { e.style.transform = 'scale(' + s.toFixed(3) + ')'; });
  });
  move('.gaze', [[45.6, 148], [47.8, 148], [48.6, 409], [50.4, 409], [51.2, 283]],
                [[45.6, 176], [47.8, 176], [48.6, 116], [50.4, 116], [51.2, 202]]);
  op('.l1', [[46.3, 0], [46.8, 1], [48.6, 1], [49.1, 0.35]]);
  op('.l2', [[48.9, 0], [49.4, 1], [51.2, 1], [51.7, 0.35]]);
  op('.l3', [[51.5, 0], [52, 1]]);
  op('.bell', [[52.6, 0], [52.8, 1], [53.1, 0.1], [53.4, 1], [53.7, 0.1], [54, 1], [54.4, 0]]);
  rise('.note', 54.4, 55);
  op('.badge', [[44.4, 1], [44.9, 0], [57.6, 0], [58.4, 1]]);

  // White flashes cover the jump into the glasses and the loop back to Day 1.
  var flash = all('.flash');
  tracks.push(function (t) {
    var v = Math.max(kf(t, [[44.4, 0], [45, 0.85], [45.7, 0]]), kf(t, [[57.4, 0], [58.5, 1]]), kf(t, [[0, 1], [0.7, 0]]));
    flash.forEach(function (e) { e.style.opacity = v; });
  });

  // Camera over the map: [time, centre x, centre y, width, tilt in degrees].
  var CAM = [
    [10, 130, 132, 300, 40],
    [11, 130, 132, 300, 40],
    [13.5, 230, 123, 520, 0],
    [15.8, 730, 100, 1560, 0],
    [27, 730, 100, 1560, 0],
    [29.5, 1128, 110, 340, 30],
    [43, 1128, 110, 340, 30],
    [45, 1130, 206, 26, 55]
  ];
  function camera(t) {
    var a = CAM[0], b = CAM[0];
    if (t <= CAM[0][0]) b = a;
    else if (t >= CAM[CAM.length - 1][0]) a = b = CAM[CAM.length - 1];
    else for (var k = 1; k < CAM.length; k++) if (t <= CAM[k][0]) { a = CAM[k - 1]; b = CAM[k]; break; }
    var p = b[0] === a[0] ? 1 : ease((t - a[0]) / (b[0] - a[0]));
    var w = Math.exp(Math.log(a[3]) + (Math.log(b[3]) - Math.log(a[3])) * p);
    return { x: a[1] + (b[1] - a[1]) * p, y: a[2] + (b[2] - a[2]) * p, w: w, tilt: a[4] + (b[4] - a[4]) * p };
  }

  function segment(t) { return t < STARTS[1] ? 0 : t < STARTS[2] ? 1 : t < STARTS[3] ? 2 : 3; }

  var seg = -1, api;
  function render(t) {
    var c = camera(t), h = c.w / ASPECT;
    map.setAttribute('viewBox', (c.x - c.w / 2).toFixed(2) + ' ' + (c.y - h / 2).toFixed(2) + ' ' +
      c.w.toFixed(2) + ' ' + h.toFixed(2));
    map.style.transform = 'perspective(900px) rotateX(' + c.tilt.toFixed(2) + 'deg) scale(' + (1 + c.tilt / 110).toFixed(3) + ')';
    for (var k = 0; k < tracks.length; k++) tracks[k](t);
    if (badge) badge.textContent = t < 13.5 ? 'DAY 1' : t < 27.5 ? 'DAY 1 → 3' : 'DAY 3';
    var s = segment(t);
    if (s !== seg) { seg = s; if (api.onSegment) api.onSegment(s); }
  }

  // ---- Clock ----
  var time = 0, raf = null, last = null, paused = false, visible = true;
  function frameLoop(now) {
    if (last !== null) {
      time += Math.min((now - last) / 1000, 0.05);
      if (time >= LOOP) time -= LOOP;
      render(time);
    }
    last = now;
    raf = requestAnimationFrame(frameLoop);
  }
  function run() {
    if (reduce || paused || !visible || raf) return;
    last = null;
    raf = requestAnimationFrame(frameLoop);
  }
  function halt() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  }

  api = window.story = {
    onSegment: null,
    start: function (i) {
      time = reduce ? STILLS[i || 0] : STARTS[i || 0];
      seg = -1;
      render(time);
      run();
    },
    at: function (t) { time = t; render(t); },   // jump to an exact moment (handy for testing)
    seek: function (i) {
      time = reduce ? STILLS[i] : STARTS[i];
      seg = -1;
      render(time);
    }
  };

  if (toggle) {
    if (reduce) toggle.hidden = true;
    toggle.addEventListener('click', function () {
      paused = !paused;
      toggle.textContent = paused ? 'Play' : 'Pause';
      toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
      if (paused) halt(); else run();
    });
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) run(); else halt();
    }, { threshold: 0.15 }).observe(stage);
  }
  render(0);
})();
