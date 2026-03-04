// ============================================
// chatbot.js — AI Chatbot for campus queries
// ============================================

class CampusChatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.addWelcomeMessage();
  }

  setupEventListeners() {
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const sendBtn = document.getElementById('chatSend');
    const input = document.getElementById('chatInput');

    chatToggle?.addEventListener('click', () => this.toggle());
    chatClose?.addEventListener('click', () => this.close());
    sendBtn?.addEventListener('click', () => this.sendMessage());
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    const widget = document.getElementById('chatWidget');
    widget?.classList.add('active');
    this.isOpen = true;
    document.getElementById('chatInput')?.focus();
  }

  close() {
    const widget = document.getElementById('chatWidget');
    widget?.classList.remove('active');
    this.isOpen = false;
  }

  sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input?.value.trim();

    if (!text) return;

    // Add user message
    this.addMessage('user', text);
    input.value = '';

    // Get bot response
    setTimeout(() => {
      const response = this.getResponse(text);
      this.addMessage('bot', response);
    }, 500);
  }

  addMessage(sender, text) {
    this.messages.push({ sender, text });
    this.renderMessages();
    this.scrollToBottom();
  }

  renderMessages() {
    const body = document.getElementById('chatBody');
    if (!body) return;

    body.innerHTML = this.messages.map(msg => `
      <div class="chat-message ${msg.sender}">
        <div class="chat-bubble">${this.escapeHtml(msg.text)}</div>
      </div>
    `).join('');
  }

  scrollToBottom() {
    const body = document.getElementById('chatBody');
    if (body) {
      setTimeout(() => {
        body.scrollTop = body.scrollHeight;
      }, 0);
    }
  }

  addWelcomeMessage() {
    this.messages.push({
      sender: 'bot',
      text: 'Hi! 👋 I\'m your Campus Guide. Ask me about buildings, facilities, routes, timings, or anything about Anna University!'
    });
  }

  getResponse(query) {
    const q = query.toLowerCase();

    // ---- BUS TRACKING ----
    if (q.includes('bus') || q.includes('transport') || q.includes('shuttle')) {
      return this.getBusInfo(q);
    }

    // ---- CROWD LEVEL ----
    if (q.includes('crowd') || q.includes('busy') || q.includes('occupancy')) {
      return this.getCrowdInfo(q);
    }

    // ---- ACCESSIBILITY ----
    if (q.includes('wheel') || q.includes('disabled') || q.includes('accessible')) {
      return '♿ We have wheelchair-friendly routes throughout campus! Check the Accessibility section for:\n✓ Suggested wheelchair-friendly routes\n✓ Elevator locations in all buildings\n✓ Accessible entrances & ramps\n✓ Level walkways & facilities';
    }

    // ---- BUILDINGS ----
    if (q.includes('building') || q.includes('where is') || q.includes('locate')) {
      return this.findBuilding(q);
    }

    // ---- HOURS & TIMING ----
    if (q.includes('hour') || q.includes('open') || q.includes('close') || q.includes('timing')) {
      return this.getBuildingHours(q);
    }

    // ---- FACILITIES ----
    if (q.includes('facility') || q.includes('cafe') || q.includes('gym') || q.includes('sports')) {
      return this.findFacility(q);
    }

    // ---- ROUTES & DIRECTIONS ----
    if (q.includes('route') || q.includes('direction') || q.includes('how to go') || q.includes('navigate')) {
      return this.getRouteInfo(q);
    }

    // ---- CAPACITY & INFO ----
    if (q.includes('capacity') || q.includes('floor') || q.includes('size')) {
      return this.getBuildingInfo(q);
    }

    // ---- EMERGENCY ----
    if (q.includes('emergency') || q.includes('help') || q.includes('danger')) {
      return '🚨 Emergency: Call security at ext. 100 or visit Health Center (HCN-01) immediately. Campus Emergency: +91-XXX-XXXX-XXXX';
    }

    // ---- GREETINGS ----
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return 'Hello! 👋 How can I help you navigate campus today?';
    }

    // ---- THANKS ----
    if (q.includes('thank') || q.includes('thanks') || q.includes('appreciate')) {
      return 'You\'re welcome! 😊 Let me know if you need help with anything else!';
    }

    // ---- HELP ----
    if (q.includes('help') && !q.includes('emergency')) {
      return 'I can help with:\n🏢 Building locations & info\n⏰ Operating hours\n🎯 Directions & routes\n🍽️ Facilities\n🚌 Bus tracking & schedules\n♿ Wheelchair routes\n🚨 Emergency contacts\n👥 Campus crowd levels';
    }

    // ---- DEFAULT ----
    return 'I can help with campus navigation, buildings, buses, accessibility routes, facilities, and safety info. Try asking about a building, bus schedule, or accessibility!';
  }

  getBusInfo(query) {
    const buses = BUSES || [];
    if (buses.length === 0) return 'Bus system information not available.';

    const match = buses.find(b =>
      query.includes(b.id.toLowerCase()) ||
      query.includes(b.route.toLowerCase().split('(')[0])
    );

    if (match) {
      return `🚌 **${match.route}** (${match.id})\n📍 Current Location: ${match.currentLocation}\n⏱️ Next Arrival: ${match.nextArrival}\n📊 Crowd Level: ${match.crowdLevel}\n👥 Passengers: ${match.passengers}`;
    }

    return `🚌 Live bus tracking available! We have ${buses.length} bus routes:\n${buses.map(b => `• ${b.id}: ${b.route}`).join('\n')}\n\nCheck the Live Bus Tracking section for real-time updates!`;
  }

  getCrowdInfo(query) {
    const crowds = CROWD_DENSITY || [];
    const match = crowds.find(c =>
      query.includes(c.location.toLowerCase())
    );

    if (match) {
      return `👥 **${match.location}**\n📊 Crowd Level: ${match.crowdLevel.toUpperCase()}\n📈 Capacity: ${match.percentage}%\n👤 People: ${match.currentCount}/${match.capacity}\n📉 Trend: ${match.trend}`;
    }

    return '👥 Check our Campus Crowd Detector to see real-time occupancy levels across all buildings. We update every minute!';
  }

  findBuilding(query) {
    const buildings = BUILDINGS || [];
    const match = buildings.find(b =>
      query.includes(b.name.toLowerCase()) ||
      query.includes(b.code.toLowerCase())
    );

    if (match) {
      return `📍 **${match.name}** (${match.code})\n🏷️ Type: ${match.type}\n👥 Capacity: ${match.capacity}\n📍 Status: ${match.status === 'open' ? '🟢 Open' : '🔴 Closed'}`;
    }

    // List some popular buildings
    return 'Popular buildings: Science Block (SCI-01), Library (LIB-01), Engineering Block (ENG-02), Student Union (SU-01). Which one interests you?';
  }

  getBuildingHours(query) {
    const buildings = BUILDINGS || [];
    const match = buildings.find(b =>
      query.includes(b.name.toLowerCase()) ||
      query.includes(b.code.toLowerCase())
    );

    if (match) {
      return `⏰ **${match.name}** is open\n🕐 Hours: ${match.hours}`;
    }

    return 'Most buildings are open 7am–10pm. Which building would you like to know about?';
  }

  getBuildingInfo(query) {
    const buildings = BUILDINGS || [];
    const match = buildings.find(b =>
      query.includes(b.name.toLowerCase()) ||
      query.includes(b.code.toLowerCase())
    );

    if (match) {
      return `📊 **${match.name}** Info:\n🏢 Floors: ${match.floors}\n👥 Capacity: ${match.capacity}\n⏰ Hours: ${match.hours}`;
    }

    return 'Tell me which building you\'d like to know more about!';
  }

  findFacility(query) {
    const facilities = FACILITIES || [];
    const match = facilities.find(f =>
      query.includes(f.name.toLowerCase())
    );

    if (match) {
      return `🎯 **${match.name}** ${match.icon}\n📊 Count: ${match.count}\n📍 Status: ${match.status}`;
    }

    return 'Popular facilities: Cafeteria, Library, Sports Complex, Health Center, Parking. What interests you?';
  }

  getRouteInfo(query) {
    return '🗺️ For detailed directions, use the interactive map with the route finder. You can select "From" and "To" locations, and I\'ll show you the best path!';
  }

  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.chatbot = new CampusChatbot();
});
