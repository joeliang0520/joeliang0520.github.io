// Show and hide the abstract / BibTeX panel under each publication.
document.addEventListener('click', function (e) {
  var btn = e.target.closest('button.toggle');
  if (!btn) return;
  var panel = document.getElementById(btn.getAttribute('aria-controls'));
  if (!panel) return;
  var open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', open ? 'false' : 'true');
  panel.hidden = open;
});
