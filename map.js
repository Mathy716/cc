// ============================================
// js/map.js — SVG map: zoom + building hover
// ============================================

(function () {
  let scale = 1;
  const MIN = 0.7, MAX = 2.4, STEP = 0.2;
  const svg = document.getElementById('campusSvg');

  function applyZoom() {
    svg.style.transform = `scale(${scale})`;
    svg.style.transformOrigin = 'center center';
    svg.style.transition = 'transform 0.25s ease';
  }

  document.getElementById('zoomIn').addEventListener('click', () => {
    if (scale < MAX) { scale = Math.min(MAX, scale + STEP); applyZoom(); }
  });

  document.getElementById('zoomOut').addEventListener('click', () => {
    if (scale > MIN) { scale = Math.max(MIN, scale - STEP); applyZoom(); }
  });

  // Hover effect on SVG buildings
  document.querySelectorAll('.svg-building').forEach(g => {
    const rect = g.querySelector('rect');
    g.addEventListener('mouseenter', () => rect.setAttribute('fill', '#ddd6fe'));
    g.addEventListener('mouseleave', () => rect.setAttribute('fill', '#ede9f8'));
    g.addEventListener('click', () => {
      const id = parseInt(g.dataset.id, 10);
      const building = BUILDINGS.find(b => b.id === id);
      if (building) {
        openModal(building);
        highlightSidebarItem(id);
      }
    });
  });

  // Expose highlight for use in ui.js
  window.highlightSidebarItem = function (id) {
    document.querySelectorAll('.building-item').forEach(el => {
      el.classList.toggle('active', parseInt(el.dataset.id, 10) === id);
    });
    const target = document.querySelector(`.building-item[data-id="${id}"]`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // Draw route path on SVG
  window.drawRoute = function (fromVal, toVal) {
    const polyline  = document.getElementById('routePolyline');
    const startDot  = document.getElementById('routeStart');
    const endDot    = document.getElementById('routeEnd');

    // figure out lookup values; fall back to "current location" if
    // starting point is empty or unknown.
    const from = ROUTE_POINTS[fromVal] || ROUTE_POINTS[''];
    const to   = ROUTE_POINTS[toVal];

    // clear the graphic when the destination can't be found
    if (!to) {
      polyline.setAttribute('points', '');
      startDot.setAttribute('r', '0');
      endDot.setAttribute('r', '0');
      return null;
    }

    const midX = (from.cx + to.cx) / 2;
    const midY = (from.cy + to.cy) / 2 - 50; // slight upward curve

    // update path and endpoints
    polyline.setAttribute('points', `${from.cx},${from.cy} ${midX},${midY} ${to.cx},${to.cy}`);
    startDot.setAttribute('cx', from.cx);
    startDot.setAttribute('cy', from.cy);
    startDot.setAttribute('r', '8');
    endDot.setAttribute('cx', to.cx);
    endDot.setAttribute('cy', to.cy);
    endDot.setAttribute('r', '8');

    // restart dash animation by resetting offset first
    polyline.style.strokeDashoffset = '1000';
    polyline.animate(
      [{ strokeDashoffset: '1000' }, { strokeDashoffset: '0' }],
      { duration: 900, fill: 'forwards', easing: 'ease-out' }
    );

    return { from, to };
  };
})();