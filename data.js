// ============================================
// data.js — Campus data definitions
// ============================================

const BUILDINGS = [
  // numbers correspond to the SVG `data-id` values
  {
    id: 0,
    code: 'SCI-01',
    name: 'Science Block',
    type: 'Academic',
    floors: 4,
    hours: '7am–10pm',
    capacity: 800,
    status: 'open'
  },
  {
    id: 1,
    code: 'LIB-01',
    name: 'Main Library',
    type: 'Library',
    floors: 4,
    hours: '8am–9pm',
    capacity: 500,
    status: 'open'
  },
  {
    id: 2,
    code: 'ENG-02',
    name: 'Engineering Block',
    type: 'Academic',
    floors: 6,
    hours: '7am–10pm',
    capacity: 1200,
    status: 'open'
  },
  {
    id: 3,
    code: 'SU-01',
    name: 'Student Union',
    type: 'Amenity',
    floors: 1,
    hours: '8am–11pm',
    capacity: 400,
    status: 'open'
  },
  {
    id: 4,
    code: 'SPT-01',
    name: 'Sports Complex',
    type: 'Facility',
    floors: 3,
    hours: '6am–10pm',
    capacity: 2000,
    status: 'open'
  },
  {
    id: 5,
    code: 'ADM-01',
    name: 'Administration Block',
    type: 'Administrative',
    floors: 5,
    hours: '9am–5pm',
    capacity: 200,
    status: 'open'
  },
  {
    id: 6,
    code: 'MED-01',
    name: 'Health Center',
    type: 'Medical',
    floors: 2,
    hours: '8am–5pm',
    capacity: 100,
    status: 'closed'
  },
  {
    id: 7,
    code: 'CAF-01',
    name: 'Cafeteria',
    type: 'Amenity',
    floors: 2,
    hours: '7am–8pm',
    capacity: 600,
    status: 'open'
  },
  // parking is not shown on map but kept for completeness
  {
    id: 8,
    code: 'PARK-01',
    name: 'Parking Lot A',
    type: 'Facility',
    floors: 1,
    hours: '24/7',
    capacity: 500,
    status: 'open'
  }
];

const FACILITIES = [
  { icon: '📚', name: 'Libraries', count: 3, status: 'open' },
  { icon: '🍽️', name: 'Cafeterias', count: 5, status: 'open' },
  { icon: '⚽', name: 'Sports', count: 8, status: 'open' },
  { icon: '🏥', name: 'Medical', count: 2, status: 'closed' }
];

const ROUTES = [
  {
    mode: '🚶 Walk',
    time: '12 min',
    from: 'Main Gate',
    to: 'Science Block',
    steps: ['Exit main gate', 'Walk through central path', 'Turn right at library', 'Science Block on left']
  },
  {
    mode: '🚴 Cycle',
    time: '5 min',
    from: 'Admin Building',
    to: 'Sports Complex',
    steps: ['Exit admin building', 'Take bike path north', 'Pass engineering block', 'Sports complex on right']
  },
  {
    mode: ' 🚵 Bike',
    time: '8 min',
    from: 'Library',
    to: 'Cafeteria',
    steps: ['Exit library building', 'Head east', 'Cross courtyard', 'Cafeteria entrance ahead']
  }
];

const ALERTS = [
  {
    type: 'warning',
    icon: '⚠️',
    title: 'Health Center Closed',
    desc: 'Health center will remain closed until 5 PM for maintenance.',
    time: '2 hours ago'
  },
  {
    type: 'info',
    icon: 'ℹ️',
    title: 'New Lab Equipment',
    desc: 'Science Block Lab 203 now has updated microscopy equipment.',
    time: '4 hours ago'
  },
  {
    type: 'success',
    icon: '✅',
    title: 'Cafeteria Reopened',
    desc: 'Main cafeteria is now open with extended hours.',
    time: '1 day ago'
  }
];

const ROUTE_POINTS = {
  // center of map for when using "Current Location" fallback
  '': { cx: 300, cy: 250, label: 'Current Location' },
  // approximate gate position (top‑left corner of viewport)
  'main-gate': { cx: 150, cy: 100, label: 'Main Gate' },
  // building centres (calculated from rect x/y,width/height in SVG)
  'science-block': { cx: 98, cy: 87, label: 'Science Block' },
  'library':       { cx: 299, cy: 87, label: 'Main Library' },
  'engineering':   { cx: 499, cy: 87, label: 'Engineering Block' },
  'admin':         { cx: 698, cy: 87, label: 'Administration Block' },
  'student-union': { cx: 98, cy: 320, label: 'Student Union' },
  'sports':        { cx: 499, cy: 332, label: 'Sports Complex' },
  'health':        { cx: 698, cy: 320, label: 'Health Center' },
  'cafeteria':     { cx: 299, cy: 447, label: 'Cafeteria' },
  'parking':       { cx: 698, cy: 447, label: 'Parking Lot A' }
};

// ============================================
// BUS SYSTEM — Live Bus Tracking
// ============================================
const BUSES = [
  {
    id: 'BUS-101',
    route: 'Route A (Main Campus Loop)',
    status: 'running',
    currentLocation: 'Near Engineering Block',
    crowdLevel: 'moderate',
    passengers: '35/50',
    nextStop: 'Science Block (2 min)',
    nextArrival: '2 minutes',
    lastLocation: { cx: 520, cy: 100 },
    schedule: [
      { stop: 'Main Gate', time: '8:00 AM, 9:00 AM, 10:00 AM' },
      { stop: 'Science Block', time: '8:03 AM, 9:03 AM, 10:03 AM' },
      { stop: 'Student Union', time: '8:08 AM, 9:08 AM, 10:08 AM' },
      { stop: 'Cafeteria', time: '8:12 AM, 9:12 AM, 10:12 AM' }
    ]
  },
  {
    id: 'BUS-102',
    route: 'Route B (North Campus)',
    status: 'delayed',
    currentLocation: 'At Main Gate',
    crowdLevel: 'low',
    passengers: '15/50',
    nextStop: 'Engineering Block (8 min)',
    nextArrival: '8 minutes',
    lastLocation: { cx: 150, cy: 100 },
    schedule: [
      { stop: 'Main Gate', time: '8:15 AM, 9:15 AM, 10:15 AM' },
      { stop: 'Engineering Block', time: '8:23 AM, 9:23 AM, 10:23 AM' },
      { stop: 'Admin Block', time: '8:28 AM, 9:28 AM, 10:28 AM' }
    ]
  },
  {
    id: 'BUS-103',
    route: 'Route C (South Campus)',
    status: 'running',
    currentLocation: 'Health Center',
    crowdLevel: 'high',
    passengers: '48/50',
    nextStop: 'Parking Lot (3 min)',
    nextArrival: '3 minutes',
    lastLocation: { cx: 700, cy: 320 },
    schedule: [
      { stop: 'Library', time: '8:30 AM, 9:30 AM, 10:30 AM' },
      { stop: 'Health Center', time: '8:35 AM, 9:35 AM, 10:35 AM' },
      { stop: 'Parking Lot', time: '8:38 AM, 9:38 AM, 10:38 AM' }
    ]
  }
];

// ============================================
// ACCESSIBILITY & WHEELCHAIR ROUTES
// ============================================
const WHEELCHAIR_ROUTES = [
  {
    id: 'WR-001',
    name: 'Accessible Route: Main Gate → Engineering Block',
    from: 'Main Gate',
    to: 'Engineering Block',
    distance: '450m',
    time: '15 min',
    accessibility: 'FullyAccessible',
    path: 'Smooth paved path, ramps at all level changes, accessible entrance',
    difficulty: 'Easy',
    features: ['Ramped Entry', 'Wide Corridors', 'Accessible Restrooms', 'No Stairs']
  },
  {
    id: 'WR-002',
    name: 'Accessible Route: Library → Cafeteria',
    from: 'Main Library',
    to: 'Cafeteria',
    distance: '380m',
    time: '12 min',
    accessibility: 'FullyAccessible',
    path: 'Level walkway through central plaza, elevator access to cafeteria',
    difficulty: 'Easy',
    features: ['Level Surface', 'Accessible Entrance', 'Elevator Available', 'Parking Nearby']
  },
  {
    id: 'WR-003',
    name: 'Accessible Route: Science Block → Sports Complex',
    from: 'Science Block',
    to: 'Sports Complex',
    distance: '520m',
    time: '18 min',
    accessibility: 'PartiallyAccessible',
    path: 'Paved path with minor slope, accessible entrance with gentle ramp',
    difficulty: 'Moderate',
    features: ['Accessible Ramp', 'Level Floors', 'Wide Doors', 'Elevator Available']
  }
];

// ============================================
// ELEVATORS IN BUILDINGS
// ============================================
const BUILDING_ELEVATORS = {
  'science-block': {
    building: 'Science Block',
    elevators: [
      { id: 'EL-SCI-01', location: 'Main Entrance', floors: '1-4', capacity: 10, status: 'operational', accessibility: 'wheelchair-accessible' },
      { id: 'EL-SCI-02', location: 'West Wing', floors: '1-3', capacity: 8, status: 'operational', accessibility: 'wheelchair-accessible' }
    ],
    totalFloors: 4,
    hasAccessibleRamp: true,
    wheelchairAccessible: true
  },
  'library': {
    building: 'Main Library',
    elevators: [
      { id: 'EL-LIB-01', location: 'Central Atrium', floors: '1-4', capacity: 12, status: 'operational', accessibility: 'wheelchair-accessible' }
    ],
    totalFloors: 4,
    hasAccessibleRamp: true,
    wheelchairAccessible: true
  },
  'engineering': {
    building: 'Engineering Block',
    elevators: [
      { id: 'EL-ENG-01', location: 'Main Entrance', floors: '1-6', capacity: 12, status: 'operational', accessibility: 'wheelchair-accessible' },
      { id: 'EL-ENG-02', location: 'East Wing', floors: '1-6', capacity: 10, status: 'operational', accessibility: 'wheelchair-accessible' },
      { id: 'EL-ENG-03', location: 'Central Block', floors: '2-6', capacity: 8, status: 'maintenance', accessibility: 'wheelchair-accessible' }
    ],
    totalFloors: 6,
    hasAccessibleRamp: true,
    wheelchairAccessible: true
  },
  'admin': {
    building: 'Administration Block',
    elevators: [
      { id: 'EL-ADM-01', location: 'Main Entrance', floors: '1-5', capacity: 10, status: 'operational', accessibility: 'wheelchair-accessible' }
    ],
    totalFloors: 5,
    hasAccessibleRamp: true,
    wheelchairAccessible: true
  },
  'sports': {
    building: 'Sports Complex',
    elevators: [
      { id: 'EL-SPT-01', location: 'Main Entrance', floors: '1-3', capacity: 15, status: 'operational', accessibility: 'wheelchair-accessible' }
    ],
    totalFloors: 3,
    hasAccessibleRamp: true,
    wheelchairAccessible: true
  },
  'cafeteria': {
    building: 'Cafeteria',
    elevators: [
      { id: 'EL-CAF-01', location: 'Main Hall', floors: '1-2', capacity: 12, status: 'operational', accessibility: 'wheelchair-accessible' }
    ],
    totalFloors: 2,
    hasAccessibleRamp: true,
    wheelchairAccessible: true
  }
};

// ============================================
// EMERGENCY EXITS & SECURITY
// ============================================
const EMERGENCY_EXITS = [
  {
    building: 'Science Block',
    exits: [
      { id: 'EXIT-SCI-01', name: 'Main Exit (Front)', location: 'Ground Floor, Front', accessible: true },
      { id: 'EXIT-SCI-02', name: 'Emergency Exit (Rear)', location: 'All Floors, Rear Staircase', accessible: false },
      { id: 'EXIT-SCI-03', name: 'Side Exit', location: 'Ground Floor, East Side', accessible: true }
    ],
    assemblyPoint: 'Open ground near main gate (120m away)',
    emergencyContact: 'Ext. 100'
  },
  {
    building: 'Engineering Block',
    exits: [
      { id: 'EXIT-ENG-01', name: 'Main Exit (Front)', location: 'Ground Floor, Front', accessible: true },
      { id: 'EXIT-ENG-02', name: 'Emergency Exit Left', location: 'All Floors, West Staircase', accessible: false },
      { id: 'EXIT-ENG-03', name: 'Emergency Exit Right', location: 'All Floors, East Staircase', accessible: false }
    ],
    assemblyPoint: 'Sports ground (180m away)',
    emergencyContact: 'Ext. 100'
  },
  {
    building: 'Main Library',
    exits: [
      { id: 'EXIT-LIB-01', name: 'Main Exit (Front)', location: 'Ground Floor, Front', accessible: true },
      { id: 'EXIT-LIB-02', name: 'Emergency Exit (Rear)', location: 'All Floors, Rear Staircase', accessible: false }
    ],
    assemblyPoint: 'Central plaza courtyard (100m away)',
    emergencyContact: 'Ext. 100'
  }
];

const SECURITY_CONTACTS = [
  {
    type: 'Security',
    name: 'Campus Security Office',
    phone: '+91-XXXX-XXXX-100',
    ext: '100',
    email: 'security@annauniversity.ac.in',
    location: 'Main Gate Security Post',
    hours: '24/7',
    services: ['Emergency Response', 'Lost & Found', 'Vehicle Passes']
  },
  {
    type: 'Medical Emergency',
    name: 'Health Center',
    phone: '+91-XXXX-XXXX-200',
    ext: '200',
    email: 'health@annauniversity.ac.in',
    location: 'Health Center Building',
    hours: '8am–5pm (Emergency 24/7)',
    services: ['First Aid', 'Medical Consultation', 'Ambulance']
  },
  {
    type: 'Campus Police',
    name: 'Police Control Room',
    phone: '+91-XXXX-XXXX-101',
    ext: '101',
    email: 'police@annauniversity.ac.in',
    location: 'Security Control Room',
    hours: '24/7',
    services: ['Law Enforcement', 'Traffic Control', 'Lost & Found']
  },
  {
    type: 'Campus Helpline',
    name: 'Student Support Center',
    phone: '+91-XXXX-XXXX-300',
    ext: '300',
    email: 'support@annauniversity.ac.in',
    location: 'Student Union Building',
    hours: '8am–6pm (Weekdays)',
    services: ['Information', 'Lost & Found', 'Campus Services']
  }
];

// ============================================
// CROWD DETECTION SYSTEM
// ============================================
const CROWD_DENSITY = [
  {
    location: 'Science Block',
    crowdLevel: 'moderate',
    percentage: 65,
    capacity: 800,
    currentCount: 520,
    lastUpdate: '2 min ago',
    trend: 'increasing',
    safetyStatus: 'safe'
  },
  {
    location: 'Library',
    crowdLevel: 'low',
    percentage: 35,
    capacity: 500,
    currentCount: 175,
    lastUpdate: '3 min ago',
    trend: 'stable',
    safetyStatus: 'safe'
  },
  {
    location: 'Cafeteria',
    crowdLevel: 'high',
    percentage: 85,
    capacity: 600,
    currentCount: 510,
    lastUpdate: '1 min ago',
    trend: 'increasing',
    safetyStatus: 'crowded'
  },
  {
    location: 'Engineering Block',
    crowdLevel: 'moderate',
    percentage: 70,
    capacity: 1200,
    currentCount: 840,
    lastUpdate: '2 min ago',
    trend: 'stable',
    safetyStatus: 'safe'
  },
  {
    location: 'Sports Complex',
    crowdLevel: 'low',
    percentage: 40,
    capacity: 2000,
    currentCount: 800,
    lastUpdate: '5 min ago',
    trend: 'increasing',
    safetyStatus: 'safe'
  }
];
