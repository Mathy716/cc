// ============================================
// bus-tracking.js — Live Bus Tracking & Schedule
// ============================================

class BusTracker {
  constructor() {
    this.buses = BUSES || [];
    this.selectedBus = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startLiveTracking();
  }

  setupEventListeners() {
    const busContainer = document.getElementById('busTrackerContainer');
    if (!busContainer) return;

    busContainer.addEventListener('click', (e) => {
      if (e.target.closest('.bus-card')) {
        const busId = e.target.closest('.bus-card').dataset.busId;
        this.showBusDetails(busId);
      }
    });
  }

  startLiveTracking() {
    this.renderBuses();
    // Simulate live updates every 30 seconds
    setInterval(() => {
      this.updateBusLocations();
      this.renderBuses();
    }, 30000);
  }

  updateBusLocations() {
    this.buses.forEach(bus => {
      // Simulate movement
      if (bus.status === 'running') {
        const moveX = (Math.random() - 0.5) * 50;
        const moveY = (Math.random() - 0.5) * 50;
        bus.lastLocation.cx = Math.max(100, Math.min(700, bus.lastLocation.cx + moveX));
        bus.lastLocation.cy = Math.max(80, Math.min(450, bus.lastLocation.cy + moveY));
      }
    });
  }

  renderBuses() {
    const container = document.getElementById('busTrackerContainer');
    if (!container) return;

    container.innerHTML = this.buses.map(bus => `
      <div class="bus-card" data-bus-id="${bus.id}">
        <div class="bus-header">
          <div class="bus-route-info">
            <span class="bus-id">${bus.id}</span>
            <h4>${bus.route}</h4>
          </div>
          <span class="bus-status ${bus.status}">${bus.status === 'running' ? '🚌 Running' : '⏱️ Delayed'}</span>
        </div>
        <div class="bus-details-grid">
          <div class="bus-detail-item">
            <label>📍 Current Location</label>
            <p>${bus.currentLocation}</p>
          </div>
          <div class="bus-detail-item">
            <label>⏱️ Next Arrival</label>
            <p><strong>${bus.nextArrival}</strong></p>
          </div>
          <div class="bus-detail-item">
            <label>👥 Passengers</label>
            <p>${bus.passengers}</p>
          </div>
          <div class="bus-detail-item">
            <label>📊 Crowd Level</label>
            <span class="crowd-badge ${bus.crowdLevel}">${bus.crowdLevel.toUpperCase()}</span>
          </div>
        </div>
        <div class="bus-progress">
          <span>${bus.nextStop}</span>
        </div>
      </div>
    `).join('');
  }

  showBusDetails(busId) {
    const bus = this.buses.find(b => b.id === busId);
    if (!bus) return;

    const detailsContent = `
      <div style="padding: 20px 0;">
        <h3 style="margin-bottom: 16px; font-family: 'Cormorant Garamond', serif; font-size: 1.5rem;">${bus.route}</h3>
        <div style="margin-bottom: 20px;">
          <h4 style="margin-bottom: 12px; color: #5b21b6;">📍 Current Status</h4>
          <p><strong>Location:</strong> ${bus.currentLocation}</p>
          <p><strong>Status:</strong> ${bus.status === 'running' ? '🟢 Running' : '🟡 Delayed'}</p>
          <p><strong>Passengers:</strong> ${bus.passengers}</p>
          <p><strong>Next Stop:</strong> ${bus.nextStop}</p>
        </div>
        <div>
          <h4 style="margin-bottom: 12px; color: #5b21b6;">📅 Schedule</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${bus.schedule.map(s => `
              <div style="padding: 8px; background: #f5f0fe; border-radius: 8px;">
                <span style="font-weight: 600;">${s.stop}</span>
                <span style="margin-left: 8px; color: #8b7aaa;">${s.time}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    const overlay = document.getElementById('modalOverlay');
    const modal = overlay?.querySelector('.modal');
    
    if (!modal) {
      alert(`Bus ${bus.id} Details\n\n${bus.route}\n\nLocation: ${bus.currentLocation}\n\nNext Stop: ${bus.nextStop}`);
      return;
    }
    
    const existingContent = modal.querySelector('[data-custom-content]');
    if (existingContent) {
      existingContent.remove();
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('data-custom-content', 'true');
    contentDiv.innerHTML = detailsContent;
    modal.appendChild(contentDiv);
    
    overlay.classList.add('open');
  }
}

// Initialize bus tracker when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.busTracker = new BusTracker();
});
