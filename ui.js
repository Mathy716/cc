// ============================================
// js/ui.js — Render all dynamic UI sections
// ============================================

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ---- Sidebar ----
function renderSidebar() {
  document.getElementById('mapSidebar').innerHTML = BUILDINGS.map(b => `
    <div class="building-item" data-id="${b.id}" onclick="handleBuildingClick(${b.id})">
      <div class="bi-code">${b.code}</div>
      <div class="bi-name">${b.name}</div>
      <div class="bi-meta">
        <span>${b.floors} floors</span>
        <span class="sbadge ${b.status}">${cap(b.status)}</span>
      </div>
    </div>
  `).join('');
}

// ---- Facilities ----
function renderFacilities() {
  document.getElementById('facilitiesGrid').innerHTML = FACILITIES.map(f => `
    <div class="facility-card">
      <div class="fac-icon">${f.icon}</div>
      <div class="fac-name">${f.name}</div>
      <div class="fac-count">${f.count}</div>
      <span class="sbadge ${f.status}">${cap(f.status)}</span>
    </div>
  `).join('');
}

// ---- Routes ----
function renderRoutes() {
  document.getElementById('routesGrid').innerHTML = ROUTES.map(r => `
    <div class="route-card">
      <div class="rc-header">
        <div class="rc-mode">${r.mode}</div>
        <span class="rc-time">${r.time}</span>
      </div>
      <div class="rc-path">
        <span>${r.from}</span>
        <span class="rc-arrow"></span>
        <span>${r.to}</span>
      </div>
      <ul class="rc-steps">${r.steps.map(s => `<li>${s}</li>`).join('')}</ul>
    </div>
  `).join('');
}

// ---- Alerts ----
function renderAlerts() {
  document.getElementById('alertsList').innerHTML = ALERTS.map(a => `
    <div class="alert-item ${a.type}">
      <div class="ai-icon">${a.icon}</div>
      <div class="ai-body">
        <div class="ai-title">${a.title}</div>
        <div class="ai-desc">${a.desc}</div>
      </div>
      <div class="ai-time">${a.time}</div>
    </div>
  `).join('');
}

// ---- Modal ----
function openModal(b) {
  document.getElementById('modalType').textContent     = b.type;
  document.getElementById('modalName').textContent     = b.name;
  document.getElementById('modalCode').textContent     = b.code;
  document.getElementById('modalFloors').textContent   = b.floors;
  document.getElementById('modalHours').textContent    = b.hours;
  document.getElementById('modalCapacity').textContent = b.capacity;
  const s = document.getElementById('modalStatus');
  s.textContent = cap(b.status);
  s.className = b.status;
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function handleBuildingClick(id) {
  const b = BUILDINGS.find(b => b.id === id);
  if (b) { openModal(b); highlightSidebarItem(id); }
}

// ---- Toast ----
function showToast(msg, duration = 3500) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ---- Scroll animate ----
function initScrollAnimate() {
  const els = document.querySelectorAll('.facility-card, .route-card, .alert-item, .building-item, .ci-item');
  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .45s ${i * 0.05}s ease, transform .45s ${i * 0.05}s ease`;
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}