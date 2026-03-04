// ============================================
// accessibility-emergency.js — Accessible Routes & Emergency
// ============================================

class AccessibilityManager {
  constructor() {
    this.wheelchairRoutes = WHEELCHAIR_ROUTES || [];
    this.buildingElevators = BUILDING_ELEVATORS || {};
    this.emergencyExits = EMERGENCY_EXITS || [];
    this.securityContacts = SECURITY_CONTACTS || [];
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Accessibility routes
    const wheelchairContainer = document.getElementById('wheelchairRoutesContainer');
    if (wheelchairContainer) {
      wheelchairContainer.addEventListener('click', (e) => {
        if (e.target.closest('.route-suggestion')) {
          const routeId = e.target.closest('.route-suggestion').dataset.routeId;
          this.showRouteDetails(routeId);
        }
      });
    }

    // Elevators
    const elevatorContainer = document.getElementById('elevatorStatusContainer');
    if (elevatorContainer) {
      elevatorContainer.addEventListener('click', (e) => {
        if (e.target.closest('.elevator-building')) {
          const buildingId = e.target.closest('.elevator-building').dataset.buildingId;
          this.showElevatorDetails(buildingId);
        }
      });
    }

    // Emergency
    const emergencyBtn = document.getElementById('emergencyInfoBtn');
    if (emergencyBtn) {
      emergencyBtn.addEventListener('click', () => this.showEmergencyInfo());
    }
  }

  // ---- WHEELCHAIR ROUTES ----
  renderWheelchairRoutes() {
    const container = document.getElementById('wheelchairRoutesContainer');
    if (!container) return;

    container.innerHTML = this.wheelchairRoutes.map(route => `
      <div class="route-suggestion" data-route-id="${route.id}">
        <div class="route-header">
          <h4>♿ ${route.name}</h4>
          <span class="accessibility-badge ${route.accessibility.toLowerCase()}">${route.accessibility}</span>
        </div>
        <div class="route-meta">
          <span>📏 ${route.distance}</span>
          <span>⏱️ ${route.time}</span>
          <span>📊 ${route.difficulty}</span>
        </div>
        <p class="route-description">${route.path}</p>
        <div class="route-features">
          ${route.features.map(f => `<span class="feature-tag">✓ ${f}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  showRouteDetails(routeId) {
    const route = this.wheelchairRoutes.find(r => r.id === routeId);
    if (!route) return;

    const content = `
      <div style="padding: 20px 0;">
        <h3 style="margin-bottom: 16px; font-family: 'Cormorant Garamond', serif; font-size: 1.5rem;">♿ ${route.name}</h3>
        <div style="margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #e8dff8;">
          <label style="color: #8b7aaa; font-size: 0.85rem; font-weight: 600;">From:</label>
          <p style="margin: 4px 0; color: #1c1033;">${route.from}</p>
        </div>
        <div style="margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #e8dff8;">
          <label style="color: #8b7aaa; font-size: 0.85rem; font-weight: 600;">To:</label>
          <p style="margin: 4px 0; color: #1c1033;">${route.to}</p>
        </div>
        <div style="margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #e8dff8;">
          <label style="color: #8b7aaa; font-size: 0.85rem; font-weight: 600;">Distance:</label>
          <p style="margin: 4px 0; color: #1c1033;">${route.distance}</p>
        </div>
        <div style="margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #e8dff8;">
          <label style="color: #8b7aaa; font-size: 0.85rem; font-weight: 600;">Estimated Time:</label>
          <p style="margin: 4px 0; color: #1c1033;">${route.time}</p>
        </div>
        <div style="margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #e8dff8;">
          <label style="color: #8b7aaa; font-size: 0.85rem; font-weight: 600;">Description:</label>
          <p style="margin: 4px 0; color: #1c1033;">${route.path}</p>
        </div>
        <div style="margin-top: 16px;">
          <label style="color: #8b7aaa; font-size: 0.85rem; font-weight: 600;">Features:</label>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
            ${route.features.map(f => `<span style="display: inline-block; background: #f5f0fe; color: #7c3aed; padding: 5px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: 500;">✓ ${f}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    showModalContent(content, `Accessible Route Details`);
  }

  // ---- ELEVATORS ----
  renderElevators() {
    const container = document.getElementById('elevatorStatusContainer');
    if (!container) return;

    const buildingIds = ['science-block', 'library', 'engineering', 'admin', 'sports', 'cafeteria'];
    
    container.innerHTML = buildingIds.map(id => {
      const data = this.buildingElevators[id];
      if (!data) return '';

      return `
        <div class="elevator-building" data-building-id="${id}">
          <div class="elevator-building-header">
            <h4>🏢 ${data.building}</h4>
            <span class="accessibility-badge">♿ Wheelchair Accessible</span>
          </div>
          <div class="elevator-list">
            ${data.elevators.map(el => `
              <div class="elevator-item ${el.status}">
                <div class="elevator-info">
                  <span class="elevator-id">${el.id}</span>
                  <span class="elevator-location">${el.location}</span>
                </div>
                <div class="elevator-specs">
                  <span>📊 Floors: ${el.floors}</span>
                  <span>👥 Capacity: ${el.capacity}</span>
                  <span class="status-${el.status}">${el.status === 'operational' ? '🟢 Operational' : '🔴 Maintenance'}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  showElevatorDetails(buildingId) {
    const data = this.buildingElevators[buildingId];
    if (!data) return;

    const content = `
      <div style="padding: 20px 0;">
        <h3 style="margin-bottom: 16px; font-family: 'Cormorant Garamond', serif; font-size: 1.5rem;">🏢 ${data.building} - Elevator Information</h3>
        <div style="margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #e8dff8;">
          <label style="color: #8b7aaa; font-size: 0.85rem; font-weight: 600;">Total Floors:</label>
          <p style="margin: 4px 0; color: #1c1033;">${data.totalFloors}</p>
        </div>
        <div style="margin-bottom: 12px; padding: 8px 0; border-bottom: 1px solid #e8dff8;">
          <label style="color: #8b7aaa; font-size: 0.85rem; font-weight: 600;">Wheelchair Accessible:</label>
          <p style="margin: 4px 0; color: #1c1033;">${data.wheelchairAccessible ? '✅ Yes' : '❌ No'}</p>
        </div>
        <div style="margin-bottom: 16px; padding: 8px 0; border-bottom: 1px solid #e8dff8;">
          <label style="color: #8b7aaa; font-size: 0.85rem; font-weight: 600;">Accessible Ramp:</label>
          <p style="margin: 4px 0; color: #1c1033;">${data.hasAccessibleRamp ? '✅ Available' : '❌ Not Available'}</p>
        </div>
        <div>
          <label style="color: #8b7aaa; font-size: 0.85rem; font-weight: 600;">Elevators:</label>
          <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
            ${data.elevators.map(el => `
              <div style="padding: 10px; background: #f5f0fe; border-radius: 8px; border-left: 3px solid #7c3aed;">
                <strong style="color: #5b21b6;">${el.id}</strong>
                <p style="margin: 4px 0; color: #4c3d6b;">Location: ${el.location}</p>
                <p style="margin: 4px 0; color: #4c3d6b;">Floors: ${el.floors}</p>
                <p style="margin: 4px 0; color: #4c3d6b;">Capacity: ${el.capacity} persons</p>
                <p style="margin: 4px 0; color: #4c3d6b;">Status: ${el.status === 'operational' ? '🟢 Operational' : '🔴 Maintenance'}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    showModalContent(content, `${data.building} - Elevator Information`);
  }

  // ---- EMERGENCY EXITS ----
  showEmergencyInfo() {
    const content = `
      <div style="padding: 20px 0;">
        <h3 style="margin-bottom: 20px; font-family: 'Cormorant Garamond', serif; font-size: 1.5rem;">🚨 Emergency Information</h3>
        
        <div style="margin-bottom: 24px;">
          <h4 style="color: #5b21b6; margin-bottom: 12px;">Emergency Contacts</h4>
          <div style="display: grid; grid-template-columns: 1fr; gap: 12px; max-height: 400px; overflow-y: auto;">
            ${this.securityContacts.map(contact => `
              <div style="padding: 12px; background: #f5f0fe; border-left: 4px solid #7c3aed; border-radius: 6px;">
                <h5 style="margin: 0 0 8px; color: #5b21b6;">${contact.type}</h5>
                <p style="margin: 4px 0; color: #1c1033;"><strong>${contact.name}</strong></p>
                <p style="margin: 4px 0; color: #4c3d6b;">📞 Phone: ${contact.phone}</p>
                <p style="margin: 4px 0; color: #4c3d6b;">📠 Extension: ${contact.ext}</p>
                <p style="margin: 4px 0; color: #4c3d6b;">🕐 Hours: ${contact.hours}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="color: #5b21b6; margin-bottom: 12px;">⚠️ In Case of Emergency</h4>
          <ol style="margin: 0; padding-left: 20px; color: #1c1033; line-height: 1.8;">
            <li>Locate nearest emergency exit</li>
            <li>Evacuate immediately to assembly point</li>
            <li>Call security extension 100 or police 101</li>
            <li>Do not use elevators - use stairs only</li>
            <li>Wait for further instructions</li>
          </ol>
        </div>

        <div>
          <h4 style="color: #5b21b6; margin-bottom: 12px;">Emergency Exits by Building</h4>
          <div style="display: flex; flex-direction: column; gap: 12px; max-height: 400px; overflow-y: auto;">
            ${this.emergencyExits.map(exit => `
              <div style="padding: 12px; background: #f5f0fe; border-radius: 6px;">
                <h5 style="margin: 0 0 8px; color: #5b21b6;">${exit.building}</h5>
                <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 8px;">
                  ${exit.exits.map(e => `
                    <div style="padding: 6px; background: white; border-radius: 4px; border-left: 2px solid #7c3aed;">
                      <span style="font-weight: 600; color: #1c1033;">${e.name}</span>
                      <span style="margin-left: 8px; color: #4c3d6b;">📍 ${e.location}</span>
                      <span style="margin-left: 8px; color: #10b981; font-weight: 600;">${e.accessible ? '♿ Accessible' : 'Not Accessible'}</span>
                    </div>
                  `).join('')}
                </div>
                <p style="margin: 8px 0 0; color: #4c3d6b; font-size: 0.9rem;"><strong>Assembly Point:</strong> ${exit.assemblyPoint}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    showModalContent(content, 'Emergency Information & Contacts');
  }
}

// ---- CROWD DETECTOR ----
class CrowdDetector {
  constructor() {
    this.crowdData = CROWD_DENSITY || [];
    this.init();
  }

  init() {
    this.renderCrowdStatus();
    // Update every minute
    setInterval(() => {
      this.updateCrowdData();
      this.renderCrowdStatus();
    }, 60000);
  }

  updateCrowdData() {
    this.crowdData.forEach(location => {
      const variation = (Math.random() - 0.5) * 100;
      location.currentCount = Math.max(0, Math.min(location.capacity, location.currentCount + variation));
      location.percentage = Math.round((location.currentCount / location.capacity) * 100);
      location.lastUpdate = 'just now';
    });
  }

  renderCrowdStatus() {
    const container = document.getElementById('crowdDetectorContainer');
    if (!container) return;

    container.innerHTML = this.crowdData.map(location => `
      <div class="crowd-card ${location.safetyStatus}">
        <div class="crowd-header">
          <h4>${location.location}</h4>
          <span class="crowd-level-badge ${location.crowdLevel}">${location.crowdLevel.toUpperCase()}</span>
        </div>
        <div class="crowd-bar-container">
          <div class="crowd-bar" style="width: ${location.percentage}%"></div>
        </div>
        <div class="crowd-stats">
          <span>${location.percentage}% capacity</span>
          <span>${location.currentCount}/${location.capacity} people</span>
          <span class="trend ${location.trend}">${location.trend === 'increasing' ? '📈' : location.trend === 'decreasing' ? '📉' : '📊'} ${location.trend}</span>
        </div>
        <p class="safety-status ${location.safetyStatus}">Status: ${location.safetyStatus.toUpperCase()}</p>
      </div>
    `).join('');
  }
}

// Utility function to show modal content
function showModalContent(content, title) {
  const overlay = document.getElementById('modalOverlay');
  const modal = overlay?.querySelector('.modal');
  
  if (!modal) {
    alert(title + '\n\n' + content.replace(/<[^>]*>/g, ''));
    return;
  }
  
  // Clear existing custom content
  const existingContent = modal.querySelector('[data-custom-content]');
  if (existingContent) {
    existingContent.remove();
  }
  
  // Create and add new content
  const contentDiv = document.createElement('div');
  contentDiv.setAttribute('data-custom-content', 'true');
  contentDiv.style.cssText = `
    max-height: 60vh;
    overflow-y: auto;
    padding: 20px 0;
  `;
  contentDiv.innerHTML = content;
  
  // Insert after the modal close button
  modal.appendChild(contentDiv);
  
  // Make sure modal is closeable
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn && !closeBtn.hasAttribute('data-listener-added')) {
    closeBtn.setAttribute('data-listener-added', 'true');
  }
  
  overlay.classList.add('open');
}

// Initialize managers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.accessibilityManager = new AccessibilityManager();
  window.crowdDetector = new CrowdDetector();
  
  // Render initial data
  window.accessibilityManager.renderWheelchairRoutes();
  window.accessibilityManager.renderElevators();
});
