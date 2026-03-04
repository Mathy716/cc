// ============================================
// js/main.js — App init & event listeners
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // Render all sections
  renderSidebar();
  renderFacilities();
  renderRoutes();
  renderAlerts();
  initScrollAnimate();

  // Navbar scroll shadow
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
  });

  // Hamburger menu
  const ham   = document.getElementById('hamburger');
  const navL  = document.getElementById('navLinks');
  ham.addEventListener('click', () => navL.classList.toggle('open'));
  navL.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navL.classList.remove('open')));

  // Modal close
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ---- Find Route ----
  document.getElementById('findRoute').addEventListener('click', () => {
    const fromVal = document.getElementById('from').value;
    const toVal   = document.getElementById('to').value;

    if (!toVal) { showToast('⚠️ Please select a destination first!'); return; }
    if (fromVal === toVal) { showToast('⚠️ From and To cannot be the same!'); return; }

    const result = drawRoute(fromVal, toVal);
    if (!result) { showToast('⚠️ Destination not found on map.'); return; }

    const { from, to } = result;
    const dist = Math.round(Math.sqrt(Math.pow(to.cx - from.cx, 2) + Math.pow(to.cy - from.cy, 2)) * 1.8 / 60);

    // Update route indicator
    document.getElementById('riTitle').textContent = `Route: ${from.label} → ${to.label}`;
    document.getElementById('riDesc').textContent  = `Estimated walk: ~${dist} min · Route highlighted on map below`;
    document.getElementById('riSteps').innerHTML   = `
      <span class="ri-step">📍 ${from.label}</span>
      <span class="ri-arrow">→</span>
      <span class="ri-step">🎯 ${to.label}</span>
    `;
    document.getElementById('routeIndicator').classList.add('show');

    // Scroll to map after short delay
    setTimeout(() => document.getElementById('map').scrollIntoView({ behavior: 'smooth' }), 300);
    showToast(`✅ Route found: ${from.label} → ${to.label}`);
  });

  // ---- Star Rating ----
  let selectedRating = 0;
  document.querySelectorAll('.star').forEach(s => {
    s.addEventListener('click', () => {
      selectedRating = parseInt(s.dataset.v);
      updateStars(selectedRating);
    });
    s.addEventListener('mouseenter', () => updateStars(parseInt(s.dataset.v), true));
    s.addEventListener('mouseleave', () => updateStars(selectedRating));
  });

  function updateStars(val, hover = false) {
    document.querySelectorAll('.star').forEach(st => {
      const active = parseInt(st.dataset.v) <= val;
      st.textContent = active ? '★' : '☆';
      st.style.color = active ? '#f59e0b' : 'var(--accent)';
    });
  }

  // ---- Contact Form ----
  document.getElementById('submitContact').addEventListener('click', () => {
    const name  = document.getElementById('cFirstName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const msg   = document.getElementById('cMessage').value.trim();
    if (!name || !email || !msg) { showToast('⚠️ Please fill all required fields.'); return; }
    showToast("✅ Message sent! We'll respond within 24 hours.");
    ['cFirstName','cLastName','cEmail','cMessage'].forEach(id => document.getElementById(id).value = '');
  });

  // ---- Feedback Form ----
  document.getElementById('submitFeedback').addEventListener('click', () => {
    const name  = document.getElementById('fbName').value.trim();
    const email = document.getElementById('fbEmail').value.trim();
    const msg   = document.getElementById('fbMessage').value.trim();
    const cat   = document.getElementById('fbCategory').value;
    if (!name || !email || !msg || !cat) { showToast('⚠️ Please fill all required fields.'); return; }

    document.getElementById('feedbackFormWrap').innerHTML = `
      <div class="form-success">
        <div class="form-success-icon">🎉</div>
        <h4>Thank you, ${name}!</h4>
        <p>We've received your feedback and our team will review it shortly.<br/>
        Your input helps us make Campus Compass better for everyone at Anna University.</p>
        <br/>
        <button class="btn-primary" onclick="location.reload()" style="margin:0 auto">Submit Another</button>
      </div>
    `;
  });

});