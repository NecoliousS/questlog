/* ============================================
   QUEST LOG — RPG TO-DO APP (COMPLETE REWRITE)
   ============================================ */

const THEMES = {
  cyberpunk: {
    name: 'Cyberpunk',
    keywords: {
      high: ['exam','test','final','project','essay','presentation','interview','deadline','college application','scholarship'],
      medium: ['homework','study','workout','clean','organize','meeting','assignment','quiz','paper'],
      low: ['trash','dishes','laundry','room','walk','water','bed','shower','eat','call']
    },
    questNames: {
      high: ['Hack the {subject} Mainframe','Execute {subject} Protocol','Debug {subject} System','Override {subject} Firewall'],
      medium: ['Optimize {subject} Subroutine','Patch {subject} Module','Scan {subject} Network','Calibrate {subject} Sensors'],
      low: ['Run {subject} Cleanup','Recycle {subject} Data','Reboot {subject} Process','Flush {subject} Cache']
    }
  },
  medieval: {
    name: 'Medieval',
    keywords: {
      high: ['exam','test','final','project','essay','presentation','interview','deadline','college application','scholarship'],
      medium: ['homework','study','workout','clean','organize','meeting','assignment','quiz','paper'],
      low: ['trash','dishes','laundry','room','walk','water','bed','shower','eat','call']
    },
    questNames: {
      high: ['Slay the {subject} Dragon','Conquer the {subject} Citadel','Defeat the {subject} Necromancer','Retrieve the {subject} Grail'],
      medium: ['Train at the {subject} Dojo','Forage for {subject} Herbs','Patrol the {subject} Border','Craft {subject} Armor'],
      low: ['Purify the {subject} Chamber','Dispose of Goblin {subject}','Polish the {subject} Shield','Feed the {subject} Horses']
    }
  },
  pixel: {
    name: 'Pixel Classic',
    keywords: {
      high: ['exam','test','final','project','essay','presentation','interview','deadline','college application','scholarship'],
      medium: ['homework','study','workout','clean','organize','meeting','assignment','quiz','paper'],
      low: ['trash','dishes','laundry','room','walk','water','bed','shower','eat','call']
    },
    questNames: {
      high: ['{subject} Boss Battle','Final {subject} Dungeon','{subject} Castle Siege','Legendary {subject} Quest'],
      medium: ['{subject} Side Quest','{subject} Training Ground','{subject} Item Hunt','{subject} Patrol'],
      low: ['{subject} Cleanup','{subject} Errand','{subject} Delivery','Tidy {subject} Room']
    }
  }
};

const REWARDS = {
  high: { min: 50, max: 100, goldMin: 30, goldMax: 60 },
  medium: { min: 20, max: 49, goldMin: 10, goldMax: 25 },
  low: { min: 5, max: 19, goldMin: 3, goldMax: 8 }
};

const CATEGORIES = {
  school: { label: 'SCHOOL', color: 'badge-school', keywords: ['exam','test','homework','study','essay','project','quiz','paper','assignment','presentation','college','scholarship'] },
  work: { label: 'WORK', color: 'badge-work', keywords: ['meeting','interview','deadline','email','report','client','boss'] },
  health: { label: 'HEALTH', color: 'badge-health', keywords: ['workout','gym','run','walk','water','shower','eat','sleep','meditate','doctor'] },
  chores: { label: 'CHORES', color: 'badge-chores', keywords: ['clean','dishes','laundry','trash','room','organize','vacuum','mop'] },
  personal: { label: 'PERSONAL', color: 'badge-personal', keywords: ['call','text','friend','family','read','game','movie','hobby'] }
};

const BANNED_NAMES = ['admin','moderator','support','official','questlog','system','root','owner','staff','developer','dev','mod','owner','administrator','gm','game master'];
const PROFANITY_LIST = ['fuck','shit','bitch','asshole','damn','cunt','nigger','fag','retard','slut','whore','dick','cock','pussy','nigga'];

const SKIN_COLORS = ['#ffdbac','#f1c27d','#e0ac69','#8d5524','#c68642','#5c3a21'];
const HAIR_COLORS = ['#090806','#2c222b','#71635a','#b7a69e','#d6c4c2','#cabfb1','#dcd0ba','#fff5e1','#e6cea8','#e5c8a8','#a56b46','#91553d','#533d32','#3b3024','#554838','#4e433f','#504444','#6a4e42','#a7856a','#b55239','#8d4a43','#91553d','#533d32','#3b3024'];
const OUTFIT_COLORS = ['#cc0000','#00cc00','#0000cc','#cccc00','#cc00cc','#00cccc','#ff6600','#666666','#333333','#ffffff','#ff4444','#44ff44','#4444ff','#ffff44'];

const PRACTICE_QUESTIONS = {
  5: {
    math: [
      { q: 'What is 7 × 8?', a: '56', type: 'text' },
      { q: 'What is 1/2 + 1/4?', a: '3/4', type: 'text' },
      { q: 'What is the perimeter of a square with side 5?', a: '20', type: 'text' },
      { q: 'What is 100 ÷ 4?', a: '25', type: 'text' },
      { q: 'Which is greater: 3/4 or 2/3?', options: ['3/4','2/3','Equal','Cannot tell'], a: 0, type: 'choice' }
    ],
    science: [
      { q: 'What planet is closest to the Sun?', a: 'mercury', type: 'text' },
      { q: 'What do plants need for photosynthesis?', options: ['Sunlight & Water','Only Water','Only Soil','Only Air'], a: 0, type: 'choice' },
      { q: 'What is the boiling point of water in °F?', a: '212', type: 'text' },
      { q: 'How many bones does an adult human have?', a: '206', type: 'text' }
    ],
    english: [
      { q: 'What is the opposite of "happy"?', a: 'sad', type: 'text' },
      { q: 'Which is a noun?', options: ['Run','Quickly','Dog','Beautiful'], a: 2, type: 'choice' },
      { q: 'What punctuation ends a question?', a: 'question mark', type: 'text' }
    ],
    history: [
      { q: 'Who was the first President of the USA?', a: 'george washington', type: 'text' },
      { q: 'In which year did Columbus sail?', options: ['1492','1776','1812','1607'], a: 0, type: 'choice' },
      { q: 'What ancient wonder was in Egypt?', a: 'pyramids', type: 'text' }
    ]
  },
  6: {
    math: [
      { q: 'What is the LCM of 4 and 6?', a: '12', type: 'text' },
      { q: 'What is 15% of 200?', a: '30', type: 'text' },
      { q: 'Solve: 3x + 5 = 14', a: '3', type: 'text' },
      { q: 'What is the area of a rectangle 8×5?', a: '40', type: 'text' }
    ],
    science: [
      { q: 'What gas do plants absorb?', a: 'carbon dioxide', type: 'text' },
      { q: 'What is the largest organ in the human body?', options: ['Heart','Liver','Skin','Brain'], a: 2, type: 'choice' },
      { q: 'What type of rock is formed from lava?', a: 'igneous', type: 'text' }
    ],
    english: [
      { q: 'What is a synonym for "big"?', a: 'large', type: 'text' },
      { q: 'What is the past tense of "go"?', options: ['Goed','Went','Gone','Going'], a: 1, type: 'choice' }
    ],
    history: [
      { q: 'Which war was fought between the North and South USA?', a: 'civil war', type: 'text' },
      { q: 'Who wrote the Declaration of Independence?', options: ['Washington','Jefferson','Franklin','Adams'], a: 1, type: 'choice' }
    ]
  },
  7: {
    math: [
      { q: 'What is the square root of 144?', a: '12', type: 'text' },
      { q: 'If a = 3 and b = 4, what is a² + b²?', a: '25', type: 'text' },
      { q: 'What is 2/5 as a decimal?', a: '0.4', type: 'text' },
      { q: 'Solve: 2(x + 3) = 14', a: '4', type: 'text' }
    ],
    science: [
      { q: 'What is the chemical formula for water?', a: 'h2o', type: 'text' },
      { q: 'What is the powerhouse of the cell?', options: ['Nucleus','Mitochondria','Ribosome','Chloroplast'], a: 1, type: 'choice' },
      { q: 'What layer of Earth is liquid?', a: 'outer core', type: 'text' }
    ],
    english: [
      { q: 'What literary device compares using "like" or "as"?', a: 'simile', type: 'text' },
      { q: 'What is the main idea of a story called?', options: ['Theme','Plot','Setting','Character'], a: 0, type: 'choice' }
    ],
    history: [
      { q: 'What empire built the Colosseum?', a: 'roman', type: 'text' },
      { q: 'Which event started in 1914?', options: ['WWI','WWII','Cold War','Vietnam War'], a: 0, type: 'choice' }
    ]
  },
  8: {
    math: [
      { q: 'What is the slope of y = 3x + 2?', a: '3', type: 'text' },
      { q: 'What is the Pythagorean theorem?', a: 'a²+b²=c²', type: 'text' },
      { q: 'Simplify: (2³)²', a: '64', type: 'text' },
      { q: 'What is the volume of a cube with side 3?', a: '27', type: 'text' }
    ],
    science: [
      { q: 'What is the atomic number of Carbon?', a: '6', type: 'text' },
      { q: 'What type of bond shares electrons?', options: ['Ionic','Covalent','Hydrogen','Metallic'], a: 1, type: 'choice' },
      { q: 'What is Newton\'s First Law called?', a: 'inertia', type: 'text' }
    ],
    english: [
      { q: 'What is a protagonist?', a: 'main character', type: 'text' },
      { q: 'Which is an example of irony?', options: ['A fire station burns down','It rains during a storm','A cat meows','The sun is hot'], a: 0, type: 'choice' }
    ],
    history: [
      { q: 'What was the Renaissance a rebirth of?', a: 'art and learning', type: 'text' },
      { q: 'Who painted the Mona Lisa?', options: ['Michelangelo','Da Vinci','Raphael','Donatello'], a: 1, type: 'choice' }
    ]
  },
  9: {
    math: [
      { q: 'Factor: x² - 9', a: '(x+3)(x-3)', type: 'text' },
      { q: 'What is the quadratic formula?', a: 'x=(-b±√(b²-4ac))/2a', type: 'text' },
      { q: 'Solve: |x - 3| = 5', a: '8,-2', type: 'text' },
      { q: 'What is the domain of f(x) = √x?', a: 'x≥0', type: 'text' }
    ],
    science: [
      { q: 'What is the most abundant gas in Earth\'s atmosphere?', a: 'nitrogen', type: 'text' },
      { q: 'What is the pH of pure water?', options: ['0','7','14','1'], a: 1, type: 'choice' },
      { q: 'What organelle contains DNA?', a: 'nucleus', type: 'text' }
    ],
    english: [
      { q: 'What is a foil character?', a: 'contrast to protagonist', type: 'text' },
      { q: 'What point of view uses "I"?', options: ['First','Second','Third','Omniscient'], a: 0, type: 'choice' }
    ],
    history: [
      { q: 'What treaty ended WWI?', a: 'treaty of versailles', type: 'text' },
      { q: 'What was the Great Depression\'s start year?', options: ['1929','1933','1919','1941'], a: 0, type: 'choice' }
    ]
  },
  10: {
    math: [
      { q: 'What is the derivative of x³?', a: '3x²', type: 'text' },
      { q: 'What is sin(90°)?', a: '1', type: 'text' },
      { q: 'What is the sum of angles in a triangle?', a: '180', type: 'text' },
      { q: 'Solve: log₂(64)', a: '6', type: 'text' }
    ],
    science: [
      { q: 'What is the speed of light (m/s)?', a: '299792458', type: 'text' },
      { q: 'What is the unit of electrical resistance?', options: ['Volt','Ampere','Ohm','Watt'], a: 2, type: 'choice' },
      { q: 'What process makes ATP?', a: 'cellular respiration', type: 'text' }
    ],
    english: [
      { q: 'What is dramatic irony?', a: 'audience knows more', type: 'text' },
      { q: 'What is a tragic flaw called?', options: ['Hubris','Hamartia','Catharsis','Pathos'], a: 1, type: 'choice' }
    ],
    history: [
      { q: 'What was the Cold War primarily about?', a: 'usa vs ussr', type: 'text' },
      { q: 'When did the Berlin Wall fall?', options: ['1987','1989','1991','1993'], a: 1, type: 'choice' }
    ]
  },
  11: {
    math: [
      { q: 'What is the integral of 2x?', a: 'x²+c', type: 'text' },
      { q: 'What is the period of sin(x)?', a: '2π', type: 'text' },
      { q: 'What is the determinant of [[1,2],[3,4]]?', a: '-2', type: 'text' },
      { q: 'What is e^(iπ) + 1?', a: '0', type: 'text' }
    ],
    science: [
      { q: 'What is the strong nuclear force?', a: 'holds nucleus together', type: 'text' },
      { q: 'What is the ideal gas law?', options: ['PV=nRT','E=mc²','F=ma','V=IR'], a: 0, type: 'choice' },
      { q: 'What is meiosis?', a: 'cell division for gametes', type: 'text' }
    ],
    english: [
      { q: 'What is stream of consciousness?', a: 'inner thoughts narrative', type: 'text' },
      { q: 'Who wrote "The Great Gatsby"?', options: ['Hemingway','Fitzgerald','Steinbeck','Faulkner'], a: 1, type: 'choice' }
    ],
    history: [
      { q: 'What was the Marshall Plan?', a: 'us aid to europe', type: 'text' },
      { q: 'What year did the Vietnam War end?', options: ['1973','1975','1969','1980'], a: 1, type: 'choice' }
    ]
  },
  12: {
    math: [
      { q: 'What is the derivative of ln(x)?', a: '1/x', type: 'text' },
      { q: 'What is the Taylor series of e^x at 0?', a: 'Σxⁿ/n!', type: 'text' },
      { q: 'What is the cross product of i × j?', a: 'k', type: 'text' },
      { q: 'Solve the differential equation: dy/dx = y', a: 'y=ce^x', type: 'text' }
    ],
    science: [
      { q: 'What is Heisenberg\'s Uncertainty Principle about?', a: 'position and momentum', type: 'text' },
      { q: 'What is the second law of thermodynamics?', options: ['Energy conserved','Entropy increases','Heat flows cold to hot','Perpetual motion possible'], a: 1, type: 'choice' },
      { q: 'What is CRISPR used for?', a: 'gene editing', type: 'text' }
    ],
    english: [
      { q: 'What is postmodernism in literature?', a: 'fragmentation metafiction', type: 'text' },
      { q: 'Who wrote "Waiting for Godot"?', options: ['Beckett','Pinter','Ionesco','Albee'], a: 0, type: 'choice' }
    ],
    history: [
      { q: 'What was the Truman Doctrine?', a: 'contain communism', type: 'text' },
      { q: 'When did the Soviet Union dissolve?', options: ['1989','1990','1991','1992'], a: 2, type: 'choice' }
    ]
  }
};

const ENEMIES = [
  { name: 'Slime', hp: 30, atk: 5, def: 2, exp: 15, gold: 10, type: 'slime', color: '#00ff00' },
  { name: 'Skeleton', hp: 50, atk: 8, def: 3, exp: 25, gold: 18, type: 'skeleton', color: '#dddddd' },
  { name: 'Robot', hp: 70, atk: 12, def: 5, exp: 40, gold: 30, type: 'robot', color: '#888888' },
  { name: 'Dragon', hp: 120, atk: 18, def: 8, exp: 80, gold: 60, type: 'dragon', color: '#ff4400' }
];

const COSMETICS = [
  { id: 'hat_red', name: 'Red Cap', price: 50, type: 'hat', color: '#ff0000' },
  { id: 'hat_blue', name: 'Blue Cap', price: 50, type: 'hat', color: '#0000ff' },
  { id: 'sword', name: 'Iron Sword', price: 100, type: 'weapon', color: '#cccccc' },
  { id: 'shield', name: 'Wood Shield', price: 80, type: 'shield', color: '#8b4513' },
  { id: 'crown', name: 'Gold Crown', price: 200, type: 'hat', color: '#ffd700' },
  { id: 'wand', name: 'Magic Wand', price: 150, type: 'weapon', color: '#9932cc' }
];

let state = {
  theme: 'cyberpunk',
  user: null,
  isGuest: false,
  username: '',
  character: null,
  quests: [],
  stats: { level: 1, hp: 100, maxHp: 100, mp: 50, maxMp: 50, exp: 0, maxExp: 100, gold: 0, str: 5, int: 5, agi: 5, def: 5 },
  streak: 0,
  lastActive: null,
  cosmetics: [],
  equipped: {},
  battle: null,
  practice: { grade: 5, subject: 'math', streak: 0, current: null },
  filter: 'all',
  lbFilter: 'level',
  lbTime: 'all',
  pendingGoogleUser: null
};

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function saveLocal() {
  try {
    const data = {
      theme: state.theme,
      username: state.username,
      character: state.character,
      quests: state.quests,
      stats: state.stats,
      streak: state.streak,
      lastActive: state.lastActive,
      cosmetics: state.cosmetics,
      equipped: state.equipped
    };
    localStorage.setItem('questlog_data', JSON.stringify(data));
  } catch(e) { console.warn('localStorage save failed:', e); }
}

function loadLocal() {
  try {
    const raw = localStorage.getItem('questlog_data');
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data.theme) state.theme = data.theme;
    if (data.username) state.username = data.username;
    if (data.character) state.character = data.character;
    if (data.quests) state.quests = data.quests;
    if (data.stats) state.stats = { ...state.stats, ...data.stats };
    if (data.streak !== undefined) state.streak = data.streak;
    if (data.lastActive) state.lastActive = data.lastActive;
    if (data.cosmetics) state.cosmetics = data.cosmetics;
    if (data.equipped) state.equipped = data.equipped;
    return true;
  } catch(e) { return false; }
}

function clearLocal() {
  localStorage.removeItem('questlog_data');
}

function showView(id) {
  $$('.view').forEach(v => v.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

function showMainView(id) {
  $$('.main-view').forEach(v => v.classList.add('hidden'));
  const el = document.getElementById('view-' + id);
  if (el) el.classList.remove('hidden');
  $$('.nav-btn').forEach(n => n.classList.remove('active'));
  const nav = $(`.nav-btn[data-view="${id}"]`);
  if (nav) nav.classList.add('active');
}

function toast(msg) {
  const t = $('#overlay-toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2500);
}

function setTheme(t) {
  state.theme = t;
  document.body.setAttribute('data-theme', t);
  saveLocal();
}

function isProfane(name) {
  const lower = name.toLowerCase();
  return PROFANITY_LIST.some(p => lower.includes(p));
}

function isBanned(name) {
  const lower = name.toLowerCase();
  return BANNED_NAMES.some(b => lower === b || lower.includes(b));
}

function isValidUsername(name) {
  if (!name || name.length < 3 || name.length > 16) return 'Must be 3–16 characters.';
  if (!/^[a-zA-Z0-9_]+$/.test(name)) return 'Letters, numbers, underscores only.';
  if (isBanned(name)) return 'That name is reserved.';
  if (isProfane(name)) return 'Keep it clean, hero.';
  return null;
}

/* ================= AVATAR ================= */

function buildAvatarGrid(container, size = 8) {
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'pixel-avatar';
  grid.style.gridTemplateColumns = `repeat(12, ${size}px)`;
  grid.style.gridTemplateRows = `repeat(16, ${size}px)`;
  for (let i = 0; i < 192; i++) {
    const cell = document.createElement('div');
    cell.className = 'px';
    cell.style.width = size + 'px';
    cell.style.height = size + 'px';
    grid.appendChild(cell);
  }
  container.appendChild(grid);
  return grid;
}

function renderAvatar(container, char, size = 8) {
  const grid = buildAvatarGrid(container, size);
  const cells = grid.querySelectorAll('.px');
  const c = char || state.character || { skin: SKIN_COLORS[0], hairColor: HAIR_COLORS[0], hairStyle: 0, outfit: OUTFIT_COLORS[0], gender: 'female' };
  
  const skin = c.skin;
  const hair = c.hairColor;
  const outfit = c.outfit;
  const hairStyle = parseInt(c.hairStyle || 0);
  
  const empty = 'transparent';
  
  // 12x16 grid index helper
  const idx = (x, y) => y * 12 + x;
  
  // Clear
  cells.forEach(cell => cell.style.backgroundColor = empty);
  
  // HEAD (rows 1-5)
  for (let y = 1; y <= 5; y++) {
    for (let x = 3; x <= 8; x++) {
      cells[idx(x, y)].style.backgroundColor = skin;
    }
  }
  
  // HAIR
  if (hairStyle === 0) { // Short
    for (let x = 3; x <= 8; x++) { cells[idx(x, 0)].style.backgroundColor = hair; cells[idx(x, 1)].style.backgroundColor = hair; }
    cells[idx(2, 1)].style.backgroundColor = hair; cells[idx(9, 1)].style.backgroundColor = hair;
    cells[idx(2, 2)].style.backgroundColor = hair; cells[idx(9, 2)].style.backgroundColor = hair;
  } else if (hairStyle === 1) { // Long
    for (let x = 2; x <= 9; x++) { cells[idx(x, 0)].style.backgroundColor = hair; cells[idx(x, 1)].style.backgroundColor = hair; }
    for (let y = 2; y <= 6; y++) { cells[idx(2, y)].style.backgroundColor = hair; cells[idx(9, y)].style.backgroundColor = hair; }
    cells[idx(1, 3)].style.backgroundColor = hair; cells[idx(10, 3)].style.backgroundColor = hair;
  } else { // Spiky
    for (let x = 3; x <= 8; x++) cells[idx(x, 1)].style.backgroundColor = hair;
    cells[idx(2, 0)].style.backgroundColor = hair; cells[idx(4, 0)].style.backgroundColor = hair;
    cells[idx(6, 0)].style.backgroundColor = hair; cells[idx(8, 0)].style.backgroundColor = hair;
    cells[idx(9, 0)].style.backgroundColor = hair; cells[idx(3, 0)].style.backgroundColor = hair;
    cells[idx(5, 0)].style.backgroundColor = hair; cells[idx(7, 0)].style.backgroundColor = hair;
    cells[idx(9, 1)].style.backgroundColor = hair; cells[idx(2, 1)].style.backgroundColor = hair;
  }
  
  // EYES
  cells[idx(4, 3)].style.backgroundColor = '#000';
  cells[idx(7, 3)].style.backgroundColor = '#000';
  
  // BODY / OUTFIT (rows 6-11)
  for (let y = 6; y <= 11; y++) {
    for (let x = 3; x <= 8; x++) {
      cells[idx(x, y)].style.backgroundColor = outfit;
    }
  }
  // Arms
  for (let y = 7; y <= 9; y++) {
    cells[idx(2, y)].style.backgroundColor = skin;
    cells[idx(9, y)].style.backgroundColor = skin;
  }
  
  // LEGS (rows 12-15)
  for (let y = 12; y <= 15; y++) {
    cells[idx(4, y)].style.backgroundColor = skin;
    cells[idx(5, y)].style.backgroundColor = skin;
    cells[idx(6, y)].style.backgroundColor = skin;
    cells[idx(7, y)].style.backgroundColor = skin;
  }
  // Shoes
  cells[idx(4, 15)].style.backgroundColor = '#333';
  cells[idx(5, 15)].style.backgroundColor = '#333';
  cells[idx(6, 15)].style.backgroundColor = '#333';
  cells[idx(7, 15)].style.backgroundColor = '#333';
  
  // EQUIPMENT
  if (c.equipped) {
    if (c.equipped.hat === 'hat_red') {
      for (let x = 3; x <= 8; x++) cells[idx(x, 0)].style.backgroundColor = '#ff0000';
    } else if (c.equipped.hat === 'hat_blue') {
      for (let x = 3; x <= 8; x++) cells[idx(x, 0)].style.backgroundColor = '#0000ff';
    } else if (c.equipped.hat === 'crown') {
      for (let x = 3; x <= 8; x++) cells[idx(x, 0)].style.backgroundColor = '#ffd700';
      cells[idx(4, 0)].style.backgroundColor = '#fff'; cells[idx(7, 0)].style.backgroundColor = '#fff';
    }
    if (c.equipped.weapon === 'sword') {
      cells[idx(10, 7)].style.backgroundColor = '#ccc'; cells[idx(10, 8)].style.backgroundColor = '#ccc';
      cells[idx(10, 9)].style.backgroundColor = '#ccc'; cells[idx(10, 10)].style.backgroundColor = '#8b4513';
    } else if (c.equipped.weapon === 'wand') {
      cells[idx(10, 6)].style.backgroundColor = '#9932cc'; cells[idx(10, 7)].style.backgroundColor = '#9932cc';
      cells[idx(10, 8)].style.backgroundColor = '#9932cc';
    }
    if (c.equipped.shield === 'shield') {
      cells[idx(1, 7)].style.backgroundColor = '#8b4513'; cells[idx(1, 8)].style.backgroundColor = '#8b4513';
      cells[idx(1, 9)].style.backgroundColor = '#8b4513';
    }
  }
}

function renderEnemy(container, enemy) {
  container.innerHTML = '';
  const type = enemy.type;
  const w = type === 'slime' ? 8 : type === 'dragon' ? 14 : 10;
  const h = type === 'slime' ? 8 : type === 'skeleton' ? 12 : 10;
  const grid = document.createElement('div');
  grid.className = `enemy-sprite ${type}`;
  grid.style.gridTemplateColumns = `repeat(${w}, 8px)`;
  grid.style.gridTemplateRows = `repeat(${h}, 8px)`;
  
  const cells = [];
  for (let i = 0; i < w * h; i++) {
    const cell = document.createElement('div');
    cell.className = 'px';
    grid.appendChild(cell);
    cells.push(cell);
  }
  container.appendChild(grid);
  
  const idx = (x, y) => y * w + x;
  const c = enemy.color;
  
  if (type === 'slime') {
    for (let y = 3; y <= 6; y++) {
      for (let x = 2; x <= 5; x++) cells[idx(x, y)].style.backgroundColor = c;
    }
    cells[idx(1, 5)].style.backgroundColor = c; cells[idx(6, 5)].style.backgroundColor = c;
    cells[idx(2, 2)].style.backgroundColor = c; cells[idx(5, 2)].style.backgroundColor = c;
    cells[idx(3, 7)].style.backgroundColor = c; cells[idx(4, 7)].style.backgroundColor = c;
    cells[idx(3, 4)].style.backgroundColor = '#000'; cells[idx(4, 4)].style.backgroundColor = '#000';
  } else if (type === 'skeleton') {
    for (let y = 1; y <= 10; y++) cells[idx(4, y)].style.backgroundColor = c;
    cells[idx(3, 2)].style.backgroundColor = c; cells[idx(5, 2)].style.backgroundColor = c;
    cells[idx(2, 3)].style.backgroundColor = c; cells[idx(6, 3)].style.backgroundColor = c;
    cells[idx(1, 5)].style.backgroundColor = c; cells[idx(7, 5)].style.backgroundColor = c;
    cells[idx(2, 7)].style.backgroundColor = c; cells[idx(6, 7)].style.backgroundColor = c;
    cells[idx(3, 9)].style.backgroundColor = c; cells[idx(5, 9)].style.backgroundColor = c;
    cells[idx(3, 3)].style.backgroundColor = '#000'; cells[idx(5, 3)].style.backgroundColor = '#000';
  } else if (type === 'robot') {
    for (let y = 2; y <= 7; y++) {
      for (let x = 3; x <= 6; x++) cells[idx(x, y)].style.backgroundColor = c;
    }
    cells[idx(2, 3)].style.backgroundColor = c; cells[idx(7, 3)].style.backgroundColor = c;
    cells[idx(2, 4)].style.backgroundColor = c; cells[idx(7, 4)].style.backgroundColor = c;
    cells[idx(4, 5)].style.backgroundColor = '#ff0000';
    cells[idx(1, 6)].style.backgroundColor = '#555'; cells[idx(8, 6)].style.backgroundColor = '#555';
    cells[idx(3, 8)].style.backgroundColor = '#555'; cells[idx(6, 8)].style.backgroundColor = '#555';
  } else if (type === 'dragon') {
    for (let x = 4; x <= 9; x++) cells[idx(x, 3)].style.backgroundColor = c;
    for (let y = 3; y <= 7; y++) {
      for (let x = 5; x <= 8; x++) cells[idx(x, y)].style.backgroundColor = c;
    }
    cells[idx(3, 4)].style.backgroundColor = c; cells[idx(10, 4)].style.backgroundColor = c;
    cells[idx(2, 5)].style.backgroundColor = c; cells[idx(11, 5)].style.backgroundColor = c;
    cells[idx(1, 4)].style.backgroundColor = c; cells[idx(1, 5)].style.backgroundColor = c;
    cells[idx(6, 2)].style.backgroundColor = c; cells[idx(7, 2)].style.backgroundColor = c;
    cells[idx(5, 8)].style.backgroundColor = c; cells[idx(8, 8)].style.backgroundColor = c;
    cells[idx(4, 9)].style.backgroundColor = c; cells[idx(9, 9)].style.backgroundColor = c;
    cells[idx(6, 4)].style.backgroundColor = '#ffff00'; cells[idx(7, 4)].style.backgroundColor = '#ffff00';
  }
}

/* ================= SETUP ================= */

function initColorPickers() {
  const skinRow = $('#skin-colors');
  const hairRow = $('#hair-colors');
  const outfitRow = $('#outfit-colors');
  
  skinRow.innerHTML = '';
  hairRow.innerHTML = '';
  outfitRow.innerHTML = '';
  
  SKIN_COLORS.forEach((c, i) => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch' + (i === 0 ? ' active' : '');
    swatch.style.backgroundColor = c;
    swatch.dataset.color = c;
    swatch.dataset.type = 'skin';
    swatch.onclick = () => pickColor(swatch, 'skin');
    skinRow.appendChild(swatch);
  });
  
  [0, 3, 6, 9, 12, 15, 18, 21].forEach(i => {
    const c = HAIR_COLORS[i] || HAIR_COLORS[0];
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch' + (i === 0 ? ' active' : '');
    swatch.style.backgroundColor = c;
    swatch.dataset.color = c;
    swatch.dataset.type = 'hair';
    swatch.onclick = () => pickColor(swatch, 'hair');
    hairRow.appendChild(swatch);
  });
  
  OUTFIT_COLORS.forEach((c, i) => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch' + (i === 0 ? ' active' : '');
    swatch.style.backgroundColor = c;
    swatch.dataset.color = c;
    swatch.dataset.type = 'outfit';
    swatch.onclick = () => pickColor(swatch, 'outfit');
    outfitRow.appendChild(swatch);
  });
}

function pickColor(el, type) {
  $$(`.color-swatch[data-type="${type}"]`).forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  updateCharPreview();
}

function getActiveColor(type) {
  const el = $(`.color-swatch[data-type="${type}"].active`);
  return el ? el.dataset.color : (type === 'skin' ? SKIN_COLORS[0] : type === 'hair' ? HAIR_COLORS[0] : OUTFIT_COLORS[0]);
}

function getActiveOpt(type) {
  const el = $(`.opt-btn[data-opt="${type}"].active`);
  return el ? el.dataset.val : 'female';
}

function updateCharPreview() {
  const char = {
    name: $('#char-name').value || 'Hero',
    gender: getActiveOpt('gender'),
    skin: getActiveColor('skin'),
    hairColor: getActiveColor('hair'),
    hairStyle: getActiveOpt('hairStyle'),
    outfit: getActiveColor('outfit')
  };
  renderAvatar($('#avatar-preview'), char, 10);
}

/* ================= FIREBASE / AUTH ================= */

async function syncToCloud() {
  if (state.isGuest || !state.user || !window.fb) return;
  try {
    const { db, doc, setDoc, serverTimestamp } = window.fb;
    const ref = doc(db, 'users', state.user.uid);
    await setDoc(ref, {
      username: state.username,
      theme: state.theme,
      character: state.character,
      stats: state.stats,
      quests: state.quests,
      streak: state.streak,
      lastActive: state.lastActive,
      cosmetics: state.cosmetics,
      equipped: state.equipped,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch(e) { console.warn('Cloud sync failed:', e); }
}

async function loadFromCloud() {
  if (state.isGuest || !state.user || !window.fb) return false;
  try {
    const { db, doc, getDoc } = window.fb;
    const ref = doc(db, 'users', state.user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      if (data.username) state.username = data.username;
      if (data.theme) state.theme = data.theme;
      if (data.character) state.character = data.character;
      if (data.stats) state.stats = { ...state.stats, ...data.stats };
      if (data.quests) state.quests = data.quests;
      if (data.streak !== undefined) state.streak = data.streak;
      if (data.lastActive) state.lastActive = data.lastActive;
      if (data.cosmetics) state.cosmetics = data.cosmetics;
      if (data.equipped) state.equipped = data.equipped;
      return true;
    }
  } catch(e) { console.warn('Cloud load failed:', e); }
  return false;
}

async function updateLeaderboard() {
  if (state.isGuest || !state.user || !window.fb) return;
  try {
    const { db, doc, setDoc, serverTimestamp } = window.fb;
    await setDoc(doc(db, 'leaderboard', state.user.uid), {
      username: state.username,
      level: state.stats.level,
      quests: state.quests.filter(q => q.done).length,
      gold: state.stats.gold,
      streak: state.streak,
      updatedAt: serverTimestamp()
    });
  } catch(e) { console.warn('Leaderboard update failed:', e); }
}

async function checkUsernameExists(username) {
  if (!window.fb) return false;
  try {
    const { db, collection, query, where, getDocs } = window.fb;
    const q = query(collection(db, 'users'), where('username', '==', username));
    const snap = await getDocs(q);
    return !snap.empty;
  } catch(e) { return false; }
}

/* ================= FLOW ================= */

function initAuth() {
  if (!window.fb) {
    setTimeout(initAuth, 500);
    return;
  }
  
  const { auth, onAuthStateChanged } = window.fb;
  
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      state.user = user;
      state.isGuest = false;
      
      // Try load from cloud first
      const hasCloud = await loadFromCloud();
      
      if (!hasCloud) {
        // New user — check if they need username
        const hasLocal = loadLocal();
        if (!state.username) {
          showView('view-username');
          return;
        }
      }
      
      // Check if setup complete
      if (!state.theme) {
        showView('view-theme');
        return;
      }
      if (!state.character) {
        initColorPickers();
        updateCharPreview();
        showView('view-character');
        return;
      }
      
      // All set — go to main
      document.body.setAttribute('data-theme', state.theme);
      enterMainApp();
      
    } else {
      // Not signed in
      state.user = null;
      state.isGuest = false;
      showView('view-landing');
    }
  });
}

function enterMainApp() {
  showView('view-main');
  showMainView('dashboard');
  updateUI();
  renderQuests();
  renderShop();
  renderLeaderboard();
}

/* ================= EVENT LISTENERS ================= */

function bindEvents() {
  // Landing
  $('#btn-google-signin').onclick = async () => {
    if (!window.fb) return toast('Firebase not ready yet...');
    try {
      const { auth, googleProvider, signInWithPopup } = window.fb;
      await signInWithPopup(auth, googleProvider);
    } catch(e) {
      toast('Google sign-in failed: ' + (e.message || e.code));
    }
  };
  
  $('#btn-email-toggle').onclick = () => {
    $('#email-form').classList.toggle('hidden');
  };
  
  $$('.auth-tab').forEach(tab => {
    tab.onclick = () => {
      $$('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const etab = tab.dataset.etab;
      $('#email-login').classList.toggle('hidden', etab !== 'login');
      $('#email-register').classList.toggle('hidden', etab !== 'register');
    };
  });
  
  $('#btn-email-login').onclick = async () => {
    const email = $('#e-login-email').value.trim();
    const pass = $('#e-login-pass').value;
    if (!email || !pass) return toast('Enter email and password.');
    try {
      const { auth, signInWithEmailAndPassword } = window.fb;
      await signInWithEmailAndPassword(auth, email, pass);
    } catch(e) {
      toast('Login failed: ' + (e.message || e.code));
    }
  };
  
  $('#btn-email-register').onclick = async () => {
    const email = $('#e-reg-email').value.trim();
    const pass = $('#e-reg-pass').value;
    if (!email || !pass || pass.length < 6) return toast('Enter valid email and 6+ char password.');
    try {
      const { auth, createUserWithEmailAndPassword } = window.fb;
      await createUserWithEmailAndPassword(auth, email, pass);
    } catch(e) {
      toast('Register failed: ' + (e.message || e.code));
    }
  };
  
  $('#btn-guest').onclick = () => {
    state.isGuest = true;
    state.user = null;
    loadLocal();
    if (!state.theme) {
      showView('view-theme');
    } else if (!state.character) {
      initColorPickers();
      updateCharPreview();
      showView('view-character');
    } else {
      document.body.setAttribute('data-theme', state.theme);
      enterMainApp();
    }
  };
  
  // Username
  $('#btn-save-username').onclick = async () => {
    const input = $('#username-input');
    const name = input.value.trim();
    const err = isValidUsername(name);
    const errEl = $('#username-error');
    
    if (err) {
      errEl.textContent = err;
      return;
    }
    
    // Check if taken
    const taken = await checkUsernameExists(name);
    if (taken && name.toLowerCase() !== (state.username || '').toLowerCase()) {
      errEl.textContent = 'That name is already taken.';
      return;
    }
    
    state.username = name;
    errEl.textContent = '';
    saveLocal();
    await syncToCloud();
    
    // Next: theme select
    showView('view-theme');
  };
  
  // Theme
  $$('.theme-btn').forEach(btn => {
    btn.onclick = () => {
      setTheme(btn.dataset.theme);
      initColorPickers();
      updateCharPreview();
      showView('view-character');
    };
  });
  
  // Character
  $$('.opt-btn[data-opt="gender"]').forEach(btn => {
    btn.onclick = () => {
      $$('.opt-btn[data-opt="gender"]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateCharPreview();
    };
  });
  
  $$('.opt-btn[data-opt="hairStyle"]').forEach(btn => {
    btn.onclick = () => {
      $$('.opt-btn[data-opt="hairStyle"]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateCharPreview();
    };
  });
  
  $('#char-name').oninput = updateCharPreview;
  
  $('#btn-start-adventure').onclick = async () => {
    state.character = {
      name: $('#char-name').value.trim() || 'Hero',
      gender: getActiveOpt('gender'),
      skin: getActiveColor('skin'),
      hairColor: getActiveColor('hair'),
      hairStyle: getActiveOpt('hairStyle'),
      outfit: getActiveColor('outfit')
    };
    saveLocal();
    await syncToCloud();
    enterMainApp();
  };
  
  // Logout
  $('#btn-logout').onclick = async () => {
    if (!state.isGuest && window.fb) {
      try { await window.fb.signOut(window.fb.auth); } catch(e) {}
    }
    clearLocal();
    location.reload();
  };
  
  // Nav
  $$('.nav-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      showMainView(btn.dataset.view);
      if (btn.dataset.view === 'leaderboard') renderLeaderboard();
      if (btn.dataset.view === 'character') {
        renderAvatar($('#char-big-avatar'), state.character, 12);
        updateCharPage();
      }
      if (btn.dataset.view === 'battle') updateBattleView();
    };
  });
  
  // Quests
  $('#btn-add-quest').onclick = addQuest;
  $('#quest-input').onkeydown = (e) => { if (e.key === 'Enter') addQuest(); };
  
  $$('.filter-btn').forEach(btn => {
    btn.onclick = () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filter = btn.dataset.filter;
      renderQuests();
    };
  });
  
  // Practice
  $$('.opt-btn[data-grade]').forEach(btn => {
    btn.onclick = () => {
      $$('.opt-btn[data-grade]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.practice.grade = parseInt(btn.dataset.grade);
    };
  });
  
  $$('.opt-btn[data-subject]').forEach(btn => {
    btn.onclick = () => {
      $$('.opt-btn[data-subject]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.practice.subject = btn.dataset.subject;
    };
  });
  
  $('#btn-start-practice').onclick = startPractice;
  $('#btn-submit-answer').onclick = submitPracticeAnswer;
  $('#practice-answer').onkeydown = (e) => { if (e.key === 'Enter') submitPracticeAnswer(); };
  
  // Battle
  $$('.battle-btn').forEach(btn => {
    btn.onclick = () => doBattleAction(btn.dataset.action);
  });
  
  $('#btn-start-battle').onclick = startBattle;
  
  // Leaderboard
  $$('.lb-tab').forEach(btn => {
    btn.onclick = () => {
      $$('.lb-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.lbFilter = btn.dataset.lb;
      renderLeaderboard();
    };
  });
  
  $$('.lb-time-btn').forEach(btn => {
    btn.onclick = () => {
      $$('.lb-time-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.lbTime = btn.dataset.time;
      renderLeaderboard();
    };
  });
}

/* ================= QUEST SYSTEM ================= */

function detectCategory(text) {
  const lower = text.toLowerCase();
  for (const [key, cat] of Object.entries(CATEGORIES)) {
    if (cat.keywords.some(k => lower.includes(k))) return key;
  }
  return 'personal';
}

function detectSeverity(text) {
  const lower = text.toLowerCase();
  const theme = THEMES[state.theme] || THEMES.cyberpunk;
  if (theme.keywords.high.some(k => lower.includes(k))) return 'high';
  if (theme.keywords.medium.some(k => lower.includes(k))) return 'medium';
  return 'low';
}

function generateQuestName(text, category) {
  const theme = THEMES[state.theme] || THEMES.cyberpunk;
  const sev = detectSeverity(text);
  const pool = theme.questNames[sev];
  const tmpl = pool[rand(0, pool.length - 1)];
  const subj = text.split(' ').slice(0, 2).join(' ');
  return tmpl.replace('{subject}', subj);
}

function addQuest() {
  const input = $('#quest-input');
  const text = input.value.trim();
  if (!text) return;
  
  const cat = detectCategory(text);
  const sev = detectSeverity(text);
  const rew = REWARDS[sev];
  const exp = rand(rew.min, rew.max);
  const gold = rand(rew.goldMin, rew.goldMax);
  const stars = sev === 'high' ? '★★★' : sev === 'medium' ? '★★☆' : '★☆☆';
  
  const quest = {
    id: Date.now().toString(),
    text: text,
    title: generateQuestName(text, cat),
    category: cat,
    severity: sev,
    exp: exp,
    gold: gold,
    stars: stars,
    done: false,
    created: Date.now(),
    due: Date.now() + 86400000
  };
  
  state.quests.unshift(quest);
  input.value = '';
  saveLocal();
  syncToCloud();
  renderQuests();
  updateUI();
  toast(`Quest Added: ${quest.title}`);
}

function toggleQuest(id) {
  const q = state.quests.find(x => x.id === id);
  if (!q) return;
  q.done = !q.done;
  
  if (q.done) {
    addExp(q.exp);
    addGold(q.gold);
    toast(`+${q.exp} EXP  +${q.gold} GOLD`);
    
    // 30% battle trigger
    if (Math.random() < 0.3) {
      setTimeout(() => {
        showMainView('battle');
        startBattle();
      }, 800);
    }
  }
  
  saveLocal();
  syncToCloud();
  updateLeaderboard();
  renderQuests();
  updateUI();
}

function deleteQuest(id) {
  const card = $(`.quest-card[data-id="${id}"]`);
  if (card) {
    card.classList.add('poof');
    setTimeout(() => {
      state.quests = state.quests.filter(q => q.id !== id);
      saveLocal();
      syncToCloud();
      renderQuests();
      updateUI();
    }, 500);
  }
}

function renderQuests() {
  const list = $('#quest-list');
  list.innerHTML = '';
  
  let filtered = state.quests;
  if (state.filter === 'active') filtered = state.quests.filter(q => !q.done);
  else if (state.filter === 'done') filtered = state.quests.filter(q => q.done);
  else if (['school','work','health','chores','personal'].includes(state.filter)) filtered = state.quests.filter(q => q.category === state.filter);
  
  const now = Date.now();
  
  filtered.forEach(q => {
    const div = document.createElement('div');
    div.className = 'quest-card' + (q.done ? ' done' : '') + (q.due < now && !q.done ? ' overdue' : '');
    div.dataset.id = q.id;
    
    const catInfo = CATEGORIES[q.category] || CATEGORIES.personal;
    
    div.innerHTML = `
      <div class="quest-header">
        <div class="quest-title">${q.title}</div>
        <div class="quest-badges">
          <span class="badge ${catInfo.color}">${catInfo.label}</span>
        </div>
      </div>
      <div class="quest-meta">
        <span class="stars">${q.stars}</span>
        <div class="quest-rewards">
          <span class="reward">⚡ ${q.exp}</span>
          <span class="reward">◆ ${q.gold}</span>
        </div>
      </div>
      <div class="quest-actions">
        <button class="pixel-btn small">${q.done ? 'UNDO' : 'COMPLETE'}</button>
        <button class="pixel-btn small secondary">DELETE</button>
      </div>
    `;
    
    const [completeBtn, deleteBtn] = div.querySelectorAll('.pixel-btn');
    completeBtn.onclick = () => toggleQuest(q.id);
    deleteBtn.onclick = () => deleteQuest(q.id);
    
    list.appendChild(div);
  });
  
  if (filtered.length === 0) {
    list.innerHTML = '<p style="text-align:center;color:var(--accent);font-size:10px;padding:20px;">NO QUESTS FOUND</p>';
  }
  
  // Dashboard mini list
  const dash = $('#dash-quests');
  if (dash) {
    dash.innerHTML = '';
    const active = state.quests.filter(q => !q.done).slice(0, 5);
    active.forEach(q => {
      const mini = document.createElement('div');
      mini.className = 'mini-quest';
      mini.innerHTML = `<span>${q.title}</span>`;
      mini.onclick = () => showMainView('quests');
      dash.appendChild(mini);
    });
    if (active.length === 0) dash.innerHTML = '<p style="font-size:8px;color:var(--accent);">All quests complete!</p>';
  }
}

/* ================= STATS & LEVELING ================= */

function addExp(amount) {
  state.stats.exp += amount;
  while (state.stats.exp >= state.stats.maxExp) {
    state.stats.exp -= state.stats.maxExp;
    levelUp();
  }
  updateUI();
}

function addGold(amount) {
  state.stats.gold += amount;
  updateUI();
}

function levelUp() {
  state.stats.level++;
  state.stats.maxExp = Math.floor(state.stats.maxExp * 1.5);
  state.stats.maxHp += 10;
  state.stats.hp = state.stats.maxHp;
  state.stats.maxMp += 5;
  state.stats.mp = state.stats.maxMp;
  state.stats.str += rand(1, 3);
  state.stats.int += rand(1, 3);
  state.stats.agi += rand(1, 3);
  state.stats.def += rand(1, 3);
  
  $('#levelup-text').textContent = `You reached Level ${state.stats.level}!`;
  $('#levelup-stats').innerHTML = `
    <div>HP +10 | MP +5</div>
    <div>STR +${state.stats.str} | INT +${state.stats.int}</div>
    <div>AGI +${state.stats.agi} | DEF +${state.stats.def}</div>
  `;
  $('#overlay-levelup').classList.remove('hidden');
  
  saveLocal();
  syncToCloud();
  updateLeaderboard();
}

window.closeLevelUp = function() {
  $('#overlay-levelup').classList.add('hidden');
};

function updateUI() {
  const s = state.stats;
  $('#stat-level').textContent = s.level;
  $('#stat-gold').textContent = s.gold;
  $('#val-hp').textContent = `${s.hp}/${s.maxHp}`;
  $('#val-mp').textContent = `${s.mp}/${s.maxMp}`;
  $('#val-exp').textContent = `${s.exp}/${s.maxExp}`;
  $('#bar-hp').style.width = Math.round((s.hp / s.maxHp) * 100) + '%';
  $('#bar-mp').style.width = Math.round((s.mp / s.maxMp) * 100) + '%';
  $('#bar-exp').style.width = Math.round((s.exp / s.maxExp) * 100) + '%';
  
  $('#stat-str').textContent = s.str;
  $('#stat-int').textContent = s.int;
  $('#stat-agi').textContent = s.agi;
  $('#stat-def').textContent = s.def;
  
  $('#streak-count').textContent = state.streak;
  
  const total = state.quests.length;
  const done = state.quests.filter(q => q.done).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  $('#daily-bar').style.width = pct + '%';
  $('#daily-pct').textContent = pct + '%';
  
  renderAvatar($('#mini-avatar'), state.character, 4);
}

function updateCharPage() {
  const s = state.stats;
  $('#char-display-name').textContent = state.character?.name || 'Hero';
  $('#big-level').textContent = s.level;
  $('#big-exp').textContent = `${s.exp}/${s.maxExp}`;
  $('#big-gold').textContent = s.gold;
  $('#big-quests').textContent = state.quests.filter(q => q.done).length;
  
  $('#val-str').textContent = s.str;
  $('#val-int').textContent = s.int;
  $('#val-agi').textContent = s.agi;
  $('#val-def').textContent = s.def;
  
  $('#bar-str').style.width = Math.min(100, s.str * 5) + '%';
  $('#bar-int').style.width = Math.min(100, s.int * 5) + '%';
  $('#bar-agi').style.width = Math.min(100, s.agi * 5) + '%';
  $('#bar-def').style.width = Math.min(100, s.def * 5) + '%';
}

/* ================= PRACTICE ================= */

function startPractice() {
  const pool = PRACTICE_QUESTIONS[state.practice.grade]?.[state.practice.subject] || [];
  if (pool.length === 0) return toast('No questions available.');
  
  const q = pool[rand(0, pool.length - 1)];
  state.practice.current = q;
  
  $('#practice-setup').classList.add('hidden');
  $('#practice-area').classList.remove('hidden');
  $('#practice-question').textContent = q.q;
  
  const optsDiv = $('#practice-options');
  optsDiv.innerHTML = '';
  $('#practice-answer').classList.add('hidden');
  $('#btn-submit-answer').classList.add('hidden');
  
  if (q.type === 'choice') {
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'practice-opt-btn';
      btn.textContent = opt;
      btn.onclick = () => submitPracticeChoice(i, btn);
      optsDiv.appendChild(btn);
    });
  } else {
    $('#practice-answer').classList.remove('hidden');
    $('#practice-answer').value = '';
    $('#btn-submit-answer').classList.remove('hidden');
    $('#practice-answer').focus();
  }
}

function submitPracticeChoice(idx, btn) {
  const q = state.practice.current;
  const correct = idx === q.a;
  $$('.practice-opt-btn').forEach(b => b.disabled = true);
  
  if (correct) {
    btn.classList.add('correct');
    handlePracticeCorrect();
  } else {
    btn.classList.add('wrong');
    const correctBtn = $$('.practice-opt-btn')[q.a];
    if (correctBtn) correctBtn.classList.add('correct');
    handlePracticeWrong();
  }
}

function submitPracticeAnswer() {
  const input = $('#practice-answer');
  const val = input.value.trim().toLowerCase().replace(/\s/g, '');
  const correct = state.practice.current.a.toLowerCase().replace(/\s/g, '');
  
  if (val === correct) {
    handlePracticeCorrect();
  } else {
    handlePracticeWrong();
  }
}

function handlePracticeCorrect() {
  state.practice.streak++;
  $('#practice-streak').textContent = state.practice.streak;
  const exp = 10 + state.practice.streak * 2;
  const gold = 5 + state.practice.streak;
  addExp(exp);
  addGold(gold);
  toast(`Correct! +${exp} EXP  +${gold} GOLD`);
  setTimeout(startPractice, 1200);
}

function handlePracticeWrong() {
  state.practice.streak = 0;
  $('#practice-streak').textContent = '0';
  toast('Wrong! Streak reset.');
  setTimeout(startPractice, 1500);
}

/* ================= BATTLE ================= */

function startBattle() {
  const enemyTemplate = ENEMIES[rand(0, ENEMIES.length - 1)];
  state.battle = {
    enemy: { ...enemyTemplate, maxHp: enemyTemplate.hp },
    heroHp: state.stats.hp,
    heroMp: state.stats.mp,
    turn: 0,
    log: [],
    over: false
  };
  
  $('#battle-start').classList.add('hidden');
  $('#battle-screen').classList.remove('hidden');
  $('#overlay-battle').classList.remove('hidden');
  setTimeout(() => $('#overlay-battle').classList.add('hidden'), 300);
  
  renderEnemy($('#enemy-sprite'), state.battle.enemy);
  $('#battle-hero-name').textContent = state.character?.name || 'Hero';
  $('#enemy-name').textContent = state.battle.enemy.name;
  renderAvatar($('#battle-avatar'), state.character, 8);
  
  updateBattleUI();
  battleLog(`A wild ${state.battle.enemy.name} appears!`);
  
  if ($('#auto-battle').checked) {
    setTimeout(autoBattleTurn, 800);
  }
}

function updateBattleView() {
  if (!state.battle || state.battle.over) {
    $('#battle-start').classList.remove('hidden');
    $('#battle-screen').classList.add('hidden');
  } else {
    $('#battle-start').classList.add('hidden');
    $('#battle-screen').classList.remove('hidden');
    updateBattleUI();
  }
}

function updateBattleUI() {
  if (!state.battle) return;
  const b = state.battle;
  $('#battle-hp-bar').style.width = Math.round((b.heroHp / state.stats.maxHp) * 100) + '%';
  $('#enemy-hp-bar').style.width = Math.round((b.enemy.hp / b.enemy.maxHp) * 100) + '%';
  
  $$('.battle-btn').forEach(btn => btn.disabled = b.over);
}

function battleLog(msg) {
  const log = $('#battle-log');
  const line = document.createElement('div');
  line.textContent = `> ${msg}`;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

function doBattleAction(action) {
  if (!state.battle || state.battle.over) return;
  const b = state.battle;
  
  // Hero turn
  let heroDmg = 0;
  let msg = '';
  
  if (action === 'attack') {
    heroDmg = Math.max(1, state.stats.str + rand(2, 6) - b.enemy.def);
    msg = `You attacked for ${heroDmg} damage!`;
    $('#battle-avatar').classList.add('lunge');
    setTimeout(() => $('#battle-avatar').classList.remove('lunge'), 300);
  } else if (action === 'magic') {
    if (b.heroMp < 5) {
      battleLog('Not enough MP!');
      return;
    }
    b.heroMp -= 5;
    heroDmg = Math.max(1, state.stats.int + rand(5, 12));
    msg = `You cast magic for ${heroDmg} damage!`;
  } else if (action === 'defend') {
    msg = 'You brace for impact!';
  } else if (action === 'item') {
    if (state.stats.gold >= 10) {
      state.stats.gold -= 10;
      const heal = 20;
      b.heroHp = Math.min(state.stats.maxHp, b.heroHp + heal);
      msg = `Used potion! Recovered ${heal} HP.`;
      updateUI();
    } else {
      battleLog('Not enough gold for potion!');
      return;
    }
  } else if (action === 'flee') {
    if (rand(1, 100) > 50) {
      battleLog('You fled successfully!');
      endBattle(false);
      return;
    } else {
      msg = 'Failed to flee!';
    }
  }
  
  b.enemy.hp -= heroDmg;
  if (heroDmg > 0) {
    $('#enemy-sprite').classList.add('hit-flash');
    setTimeout(() => $('#enemy-sprite').classList.remove('hit-flash'), 300);
  }
  battleLog(msg);
  
  if (b.enemy.hp <= 0) {
    b.enemy.hp = 0;
    updateBattleUI();
    setTimeout(() => winBattle(), 500);
    return;
  }
  
  updateBattleUI();
  
  // Enemy turn
  setTimeout(() => {
    if (b.over) return;
    let dmg = Math.max(1, b.enemy.atk + rand(1, 4) - (action === 'defend' ? state.stats.def + 5 : state.stats.def));
    if (dmg < 1) dmg = 1;
    b.heroHp -= dmg;
    
    $('#battle-avatar').classList.add('shake');
    setTimeout(() => $('#battle-avatar').classList.remove('shake'), 400);
    
    battleLog(`${b.enemy.name} attacks for ${dmg} damage!`);
    
    if (b.heroHp <= 0) {
      b.heroHp = 0;
      updateBattleUI();
      setTimeout(() => loseBattle(), 500);
      return;
    }
    
    updateBattleUI();
    
    if ($('#auto-battle').checked) {
      setTimeout(autoBattleTurn, 800);
    }
  }, 600);
}

function autoBattleTurn() {
  if (!state.battle || state.battle.over) return;
  if (state.battle.heroMp >= 5 && state.stats.int > state.stats.str) {
    doBattleAction('magic');
  } else {
    doBattleAction('attack');
  }
}

function winBattle() {
  const b = state.battle;
  const exp = b.enemy.exp;
  const gold = b.enemy.gold;
  addExp(exp);
  addGold(gold);
  state.stats.hp = b.heroHp;
  state.stats.mp = b.heroMp;
  
  battleLog(`Victory! +${exp} EXP  +${gold} GOLD`);
  spawnConfetti();
  saveLocal();
  syncToCloud();
  updateLeaderboard();
  
  setTimeout(() => {
    endBattle(false);
    toast(`Battle Won! +${exp} EXP  +${gold} GOLD`);
  }, 1500);
}

function loseBattle() {
  state.stats.hp = 1;
  state.stats.mp = Math.max(0, state.stats.mp - 10);
  battleLog('You were defeated...');
  saveLocal();
  syncToCloud();
  
  setTimeout(() => {
    $('#battle-screen').innerHTML = `
      <div class="gameover-screen">
        <h1>DEFEATED</h1>
        <p>You limp back to town...</p>
        <button class="pixel-btn primary" onclick="endBattle(true)">CONTINUE</button>
      </div>
    `;
  }, 1000);
}

function endBattle(reload) {
  state.battle = null;
  if (reload) location.reload();
  else {
    $('#battle-screen').classList.add('hidden');
    $('#battle-start').classList.remove('hidden');
    $('#battle-screen').innerHTML = `
      <div class="battle-arena">
        <div class="battle-hero">
          <div id="battle-avatar"></div>
          <div class="battle-name" id="battle-hero-name">HERO</div>
          <div class="pixel-bar hp small"><div class="bar-track"><div id="battle-hp-bar" class="bar-fill"></div></div></div>
        </div>
        <div class="battle-vs">VS</div>
        <div class="battle-enemy">
          <div id="enemy-sprite"></div>
          <div class="battle-name" id="enemy-name">SLIME</div>
          <div class="pixel-bar hp small enemy"><div class="bar-track"><div id="enemy-hp-bar" class="bar-fill"></div></div></div>
        </div>
      </div>
      <div id="battle-log" class="battle-log"></div>
      <div id="battle-actions" class="battle-actions">
        <button class="battle-btn" data-action="attack">⚔️ ATTACK</button>
        <button class="battle-btn" data-action="magic">⭐ MAGIC</button>
        <button class="battle-btn" data-action="defend">🛡️ DEFEND</button>
        <button class="battle-btn" data-action="item">🧪 ITEM</button>
        <button class="battle-btn" data-action="flee">👢 FLEE</button>
      </div>
      <div class="auto-battle">
        <label><input type="checkbox" id="auto-battle"> AUTO-BATTLE</label>
      </div>
    `;
    // Rebind battle buttons
    setTimeout(() => {
      $$('.battle-btn').forEach(btn => {
        btn.onclick = () => doBattleAction(btn.dataset.action);
      });
    }, 100);
  }
}

function spawnConfetti() {
  for (let i = 0; i < 20; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = rand(0, 100) + 'vw';
    c.style.backgroundColor = ['#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff'][rand(0,4)];
    c.style.animationDelay = (i * 0.05) + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2500);
  }
}

/* ================= SHOP ================= */

function renderShop() {
  const grid = $('#cosmetic-shop');
  if (!grid) return;
  grid.innerHTML = '';
  
  COSMETICS.forEach(item => {
    const owned = state.cosmetics.includes(item.id);
    const div = document.createElement('div');
    div.className = 'shop-item' + (owned ? ' owned' : '');
    div.innerHTML = `
      <div style="font-size:10px;color:var(--primary);">${item.name}</div>
      <div class="item-price">${owned ? 'OWNED' : '◆ ' + item.price}</div>
    `;
    div.onclick = () => buyCosmetic(item);
    grid.appendChild(div);
  });
}

function buyCosmetic(item) {
  if (state.cosmetics.includes(item.id)) {
    // Equip/unequip
    if (state.equipped[item.type] === item.id) {
      delete state.equipped[item.type];
      toast(`Unequipped ${item.name}`);
    } else {
      state.equipped[item.type] = item.id;
      toast(`Equipped ${item.name}`);
    }
  } else if (state.stats.gold >= item.price) {
    state.stats.gold -= item.price;
    state.cosmetics.push(item.id);
    state.equipped[item.type] = item.id;
    toast(`Purchased ${item.name}!`);
    updateUI();
  } else {
    toast('Not enough gold!');
  }
  
  if (state.character) {
    state.character.equipped = state.equipped;
  }
  saveLocal();
  syncToCloud();
  renderShop();
  renderAvatar($('#char-big-avatar'), state.character, 12);
}

/* ================= LEADERBOARD ================= */

async function renderLeaderboard() {
  const tbody = $('#lb-body');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Loading...</td></tr>';
  
  if (state.isGuest || !window.fb) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Sign in to view global leaderboard</td></tr>';
    return;
  }
  
  try {
    const { db, collection, query, orderBy, limit, getDocs } = window.fb;
    let field = 'level';
    if (state.lbFilter === 'quests') field = 'quests';
    if (state.lbFilter === 'gold') field = 'gold';
    if (state.lbFilter === 'streak') field = 'streak';
    
    const q = query(collection(db, 'leaderboard'), orderBy(field, 'desc'), limit(50));
    const snap = await getDocs(q);
    
    tbody.innerHTML = '';
    let rank = 1;
    snap.forEach(doc => {
      const d = doc.data();
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="rank-${rank}">#${rank}</td>
        <td>${d.username || 'Unknown'}</td>
        <td>${d.level || 1}</td>
        <td>${d[field] || 0}</td>
      `;
      tbody.appendChild(tr);
      rank++;
    });
    
    if (rank === 1) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No data yet. Be the first!</td></tr>';
    }
  } catch(e) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Error loading leaderboard</td></tr>';
  }
}

/* ================= INIT ================= */

function init() {
  document.body.setAttribute('data-theme', state.theme);
  bindEvents();
  initAuth();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
