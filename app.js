/* ============================================
   QUEST LOG — RPG TO-DO APP
   ============================================ */

// ============================================
// CONFIG & DATA
// ============================================

const THEMES = {
  cyberpunk: {
    name: 'Cyberpunk',
    keywords: {
      high: ['exam','test','final','project','essay','presentation','interview','deadline','college application','scholarship'],
      medium: ['homework','study','workout','clean','organize','meeting','assignment','quiz','paper'],
      low: ['trash','dishes','laundry','room','walk','water','bed','shower','eat','call']
    },
    questNames: {
      high: ['Hack the {subject} Mainframe','Execute {subject} Protocol','Debug {subject} System','Override {subject} Firewall','Decrypt {subject} Database'],
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
      high: ['{subject} Boss Battle','Final {subject} Dungeon','{subject} Castle Siege','Epic {subject} Quest'],
      medium: ['{subject} Side Quest','{subject} Mini-Game','{subject} Puzzle Room','{subject} Training Ground'],
      low: ['{subject} Cleanup','{subject} Errand','{subject} Fetch Quest','Daily {subject} Task']
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
      { q: 'What is Newton's First Law called?', a: 'inertia', type: 'text' }
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
      { q: 'What is the most abundant gas in Earth's atmosphere?', a: 'nitrogen', type: 'text' },
      { q: 'What is the pH of pure water?', options: ['0','7','14','1'], a: 1, type: 'choice' },
      { q: 'What organelle contains DNA?', a: 'nucleus', type: 'text' }
    ],
    english: [
      { q: 'What is a foil character?', a: 'contrast to protagonist', type: 'text' },
      { q: 'What point of view uses "I"?', options: ['First','Second','Third','Omniscient'], a: 0, type: 'choice' }
    ],
    history: [
      { q: 'What treaty ended WWI?', a: 'treaty of versailles', type: 'text' },
      { q: 'What was the Great Depression's start year?', options: ['1929','1933','1919','1941'], a: 0, type: 'choice' }
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
      { q: 'What is Heisenberg's Uncertainty Principle about?', a: 'position and momentum', type: 'text' },
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

const BANNED_NAMES = ['admin','moderator','support','official','questlog','system','root','owner'];

// ============================================
// STATE
// ============================================

let state = {
  theme: 'pixel',
  user: null,
  isGuest: false,
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
  lbTime: 'all'
};

// ============================================
// UTILITIES
// ============================================

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function saveLocal() {
  const data = { theme: state.theme, character: state.character, quests: state.quests, stats: state.stats, streak: state.streak, lastActive: state.lastActive, cosmetics: state.cosmetics, equipped: state.equipped };
  localStorage.setItem('questlog_data', JSON.stringify(data));
}

function loadLocal() {
  const raw = localStorage.getItem('questlog_data');
  if (!raw) return false;
  try {
    const data = JSON.parse(raw);
    if (data.theme) state.theme = data.theme;
    if (data.character) state.character = data.character;
    if (data.quests) state.quests = data.quests;
    if (data.stats) state.stats = { ...state.stats, ...data.stats };
    if (data.streak) state.streak = data.streak;
    if (data.lastActive) state.lastActive = data.lastActive;
    if (data.cosmetics) state.cosmetics = data.cosmetics;
    if (data.equipped) state.equipped = data.equipped;
    return true;
  } catch(e) { return false; }
}

function showToast(msg) {
  const t = $('#overlay-toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2500);
}

function profanityCheck(name) {
  const bad = ['damn','hell','crap','stupid','idiot','loser','noob','trash'];
  return !bad.some(w => name.toLowerCase().includes(w));
}

function isBanned(name) {
  return BANNED_NAMES.some(b => name.toLowerCase().includes(b));
}

function checkStreak() {
  const today = new Date().toDateString();
  if (!state.lastActive) { state.streak = 1; }
  else {
    const last = new Date(state.lastActive);
    const diff = Math.floor((new Date() - last) / (1000*60*60*24));
    if (diff === 1) state.streak++;
    else if (diff > 1) state.streak = 1;
  }
  state.lastActive = new Date().toISOString();
}

// ============================================
// AVATAR RENDERER
// ============================================

const SKIN_COLORS = ['#ffdbac','#f1c27d','#e0ac69','#8d5524','#c68642','#5c3a21'];
const HAIR_COLORS = ['#000000','#4a3000','#ffd700','#ff0000','#ffffff','#9932cc','#ff69b4'];
const OUTFIT_COLORS = ['#ff0000','#0000ff','#008000','#ffff00','#800080','#ff6600','#00ffff','#ff1493'];

function renderAvatar(container, opts, scale = 1) {
  const { skin = '#ffdbac', hairColor = '#000000', hairStyle = 0, outfit = '#0000ff', gender = 'female' } = opts;
  const cell = 8 * scale;
  const grid = document.createElement('div');
  grid.className = 'pixel-avatar';
  grid.style.gridTemplateColumns = `repeat(12, ${cell}px)`;
  grid.style.gridTemplateRows = `repeat(16, ${cell}px)`;

  const px = (r, c, color) => {
    const d = document.createElement('div');
    d.className = 'px';
    d.style.backgroundColor = color;
    d.style.width = d.style.height = cell + 'px';
    grid.appendChild(d);
  };

  // Build 12x16 avatar pixel by pixel
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 12; col++) {
      let color = null;

      // Head (rows 0-5)
      if (row >= 0 && row <= 5) {
        if (row === 0) {
          if (hairStyle == 0) { if (col >= 2 && col <= 9) color = hairColor; }
          else if (hairStyle == 1) { if (col >= 1 && col <= 10) color = hairColor; }
          else if (hairStyle == 2) { if (col >= 2 && col <= 9) color = hairColor; }
        }
        else if (row === 1) {
          if (hairStyle == 0) { if (col >= 1 && col <= 10) color = hairColor; }
          else if (hairStyle == 1) { if (col >= 0 && col <= 11) color = hairColor; }
          else if (hairStyle == 2) { if (col >= 1 && col <= 10) color = hairColor; }
        }
        else if (row === 2) {
          if (hairStyle == 0) { if (col >= 1 && col <= 10) color = hairColor; }
          else if (hairStyle == 1) { if (col >= 0 && col <= 11) color = hairColor; }
          else if (hairStyle == 2) { if (col >= 0 && col <= 11) color = hairColor; }
        }
        else if (row >= 3 && row <= 5) {
          if (col >= 2 && col <= 9) color = skin;
          // Eyes
          if (row === 4 && (col === 4 || col === 7)) color = '#000000';
        }
        // Hair sides for style 1
        if (hairStyle == 1) {
          if (row >= 3 && row <= 5 && (col === 1 || col === 10)) color = hairColor;
        }
        // Spiky hair
        if (hairStyle == 2 && row === 2) {
          if (col === 1 || col === 10) color = hairColor;
        }
      }

      // Body (rows 6-11)
      else if (row >= 6 && row <= 11) {
        if (col >= 3 && col <= 8) color = outfit;
        // Arms
        if (row >= 7 && row <= 9) {
          if (col === 2 || col === 9) color = skin;
        }
        // Neck
        if (row === 6 && col >= 4 && col <= 7) color = skin;
      }

      // Legs (rows 12-15)
      else if (row >= 12 && row <= 15) {
        if (col >= 4 && col <= 5) color = outfit;
        if (col >= 6 && col <= 7) color = outfit;
        // Shoes
        if (row === 15 && (col === 4 || col === 5 || col === 6 || col === 7)) color = '#333333';
      }

      // Cosmetics
      if (state.equipped.hat && row >= 0 && row <= 2) {
        if (col >= 2 && col <= 9) {
          const hat = COSMETICS.find(c => c.id === state.equipped.hat);
          if (hat && row === 0) color = hat.color;
        }
      }

      px(row, col, color || 'transparent');
    }
  }

  container.innerHTML = '';
  container.appendChild(grid);
}

function renderEnemy(container, enemy) {
  const grid = document.createElement('div');
  grid.className = `enemy-sprite ${enemy.type}`;

  const patterns = {
    slime: [
      '........',
      '...XX...',
      '..XXXX..',
      '.XXXXXX.',
      '.XXXXXX.',
      'XXXXXXXX',
      'XXXXXXXX',
      '..XXXX..'
    ],
    skeleton: [
      '...XX...',
      '..XXXX..',
      '...XX...',
      '..XXXX..',
      '.X.XX.X.',
      '.X.XX.X.',
      '..XXXX..',
      '...XX...',
      '..X..X..',
      '.XX..XX.'
    ],
    robot: [
      '..XXXX..',
      '.X....X.',
      'X.XX.XX.',
      'X.XX.XX.',
      '.XXXXXX.',
      '.X.XX.X.',
      '.X.XX.X.',
      '..XXXX..',
      '.XX..XX.',
      '.XX..XX.'
    ],
    dragon: [
      '...X.........',
      '..XXX...XXX..',
      '.XXXXX.XXXXX.',
      'XXXXXXXXXXXXX',
      'XX.XXXXXXX.XX',
      'XX.X.XXX.X.XX',
      '.XXX.XXX.XXX.',
      '..XXXXXXXXX..',
      '...XX.X.XX...',
      '...XX...XX...'
    ]
  };

  const pat = patterns[enemy.type] || patterns.slime;
  pat.forEach(row => {
    for (let ch of row) {
      const d = document.createElement('div');
      d.className = 'px';
      d.style.backgroundColor = ch === 'X' ? enemy.color : 'transparent';
      grid.appendChild(d);
    }
  });

  container.innerHTML = '';
  container.appendChild(grid);
}

// ============================================
// FIREBASE SYNC
// ============================================

async function syncToCloud() {
  if (!state.user || state.isGuest) return;
  try {
    const { doc, setDoc, serverTimestamp } = window.fb;
    await setDoc(doc(window.fbDb, 'users', state.user.uid), {
      character: state.character,
      stats: state.stats,
      quests: state.quests,
      streak: state.streak,
      lastActive: state.lastActive,
      cosmetics: state.cosmetics,
      equipped: state.equipped,
      updatedAt: serverTimestamp()
    });
  } catch(e) { console.error('Sync failed', e); }
}

async function syncFromCloud() {
  if (!state.user || state.isGuest) return false;
  try {
    const { doc, getDoc } = window.fb;
    const snap = await getDoc(doc(window.fbDb, 'users', state.user.uid));
    if (snap.exists()) {
      const data = snap.data();
      if (data.character) state.character = data.character;
      if (data.stats) state.stats = { ...state.stats, ...data.stats };
      if (data.quests) state.quests = data.quests;
      if (data.streak) state.streak = data.streak;
      if (data.lastActive) state.lastActive = data.lastActive;
      if (data.cosmetics) state.cosmetics = data.cosmetics;
      if (data.equipped) state.equipped = data.equipped;
      return true;
    }
  } catch(e) { console.error('Load failed', e); }
  return false;
}

async function updateLeaderboard() {
  if (!state.user || state.isGuest) return;
  try {
    const { doc, setDoc, serverTimestamp } = window.fb;
    await setDoc(doc(window.fbDb, 'leaderboard', state.user.uid), {
      username: state.character?.name || 'Hero',
      level: state.stats.level,
      questsCompleted: state.quests.filter(q => q.done).length,
      gold: state.stats.gold,
      streak: state.streak,
      updatedAt: serverTimestamp()
    });
  } catch(e) { console.error('LB update failed', e); }
}

async function fetchLeaderboard(category = 'level', time = 'all') {
  try {
    const { collection, query, orderBy, limit, getDocs } = window.fb;
    const fieldMap = { level: 'level', quests: 'questsCompleted', gold: 'gold', streak: 'streak' };
    const field = fieldMap[category] || 'level';
    const q = query(collection(window.fbDb, 'leaderboard'), orderBy(field, 'desc'), limit(50));
    const snap = await getDocs(q);
    const results = [];
    snap.forEach(d => results.push({ id: d.id, ...d.data() }));
    return results;
  } catch(e) {
    // Return mock data if Firebase not ready
    return generateMockLB(category);
  }
}

function generateMockLB(category) {
  const names = ['PixelKnight','DragonSlayer','CodeWizard','QuestMaster','RetroHero','8BitWarrior','BossHunter','GoldHoarder','StreakKing','LevelLord'];
  const data = [];
  for (let i = 0; i < 20; i++) {
    const base = { username: names[i % names.length] + (i > 9 ? i : ''), level: rand(1, 50), questsCompleted: rand(0, 200), gold: rand(0, 5000), streak: rand(0, 30) };
    data.push(base);
  }
  const fieldMap = { level: 'level', quests: 'questsCompleted', gold: 'gold', streak: 'streak' };
  data.sort((a, b) => b[fieldMap[category]] - a[fieldMap[category]]);
  return data;
}

// ============================================
// AUTH
// ============================================

function initAuth() {
  const { onAuthStateChanged } = window.fb;
  onAuthStateChanged(window.fbAuth, async (user) => {
    if (user) {
      state.user = user;
      state.isGuest = false;
      const loaded = await syncFromCloud();
      if (!loaded) saveLocal();
      if (state.character) showView('main');
      else showView('character-create');
    } else {
      state.user = null;
    }
  });
}

async function loginEmail() {
  const email = $('#login-email').value;
  const pass = $('#login-password').value;
  if (!email || !pass) { showToast('ENTER EMAIL AND PASSWORD'); return; }
  try {
    await window.fb.signInWithEmailAndPassword(window.fbAuth, email, pass);
    showToast('WELCOME BACK, HERO!');
  } catch(e) { showToast('LOGIN FAILED: ' + e.message); }
}

async function registerEmail() {
  const username = $('#reg-username').value.trim();
  const email = $('#reg-email').value;
  const pass = $('#reg-password').value;

  if (!username || !email || !pass) { showToast('FILL ALL FIELDS'); return; }
  if (username.length < 3) { showToast('USERNAME TOO SHORT'); return; }
  if (isBanned(username)) { showToast('USERNAME NOT ALLOWED'); return; }
  if (!profanityCheck(username)) { showToast('USERNAME CONTAINS BAD WORDS'); return; }
  if (pass.length < 6) { showToast('PASSWORD TOO SHORT'); return; }

  try {
    const cred = await window.fb.createUserWithEmailAndPassword(window.fbAuth, email, pass);
    state.user = cred.user;
    state.character = { name: username, gender: 'female', skin: SKIN_COLORS[0], hairColor: HAIR_COLORS[0], hairStyle: 0, outfit: OUTFIT_COLORS[0] };
    showView('character-create');
    showToast('ACCOUNT CREATED!');
  } catch(e) { showToast('REGISTER FAILED: ' + e.message); }
}

async function loginGoogle() {
  try {
    await window.fb.signInWithPopup(window.fbAuth, window.fbGoogle);
    showToast('GOOGLE LOGIN SUCCESS!');
  } catch(e) { showToast('GOOGLE LOGIN FAILED'); }
}

async function logout() {
  try {
    await window.fb.signOut(window.fbAuth);
    state.user = null;
    state.isGuest = false;
    localStorage.removeItem('questlog_data');
    location.reload();
  } catch(e) { showToast('LOGOUT ERROR'); }
}

function playAsGuest() {
  state.isGuest = true;
  state.user = null;
  if (state.character) showView('main');
  else showView('character-create');
  showToast('PLAYING AS GUEST');
}

// ============================================
// CHARACTER
// ============================================

function initCharacterCreate() {
  const skinRow = $('#skin-colors');
  SKIN_COLORS.forEach((c, i) => {
    const d = document.createElement('div');
    d.className = 'color-swatch' + (i === 0 ? ' active' : '');
    d.style.backgroundColor = c;
    d.dataset.color = c;
    d.dataset.type = 'skin';
    skinRow.appendChild(d);
  });

  const hairRow = $('#hair-colors');
  HAIR_COLORS.forEach((c, i) => {
    const d = document.createElement('div');
    d.className = 'color-swatch' + (i === 0 ? ' active' : '');
    d.style.backgroundColor = c;
    d.dataset.color = c;
    d.dataset.type = 'hairColor';
    hairRow.appendChild(d);
  });

  const outfitRow = $('#outfit-colors');
  OUTFIT_COLORS.forEach((c, i) => {
    const d = document.createElement('div');
    d.className = 'color-swatch' + (i === 0 ? ' active' : '');
    d.style.backgroundColor = c;
    d.dataset.color = c;
    d.dataset.type = 'outfit';
    outfitRow.appendChild(d);
  });

  updateCharPreview();
}

function updateCharPreview() {
  const name = $('#char-name').value || 'Hero';
  const gender = $('.opt-btn[data-opt="gender"].active')?.dataset.val || 'female';
  const skin = $('.color-swatch[data-type="skin"].active')?.dataset.color || SKIN_COLORS[0];
  const hairColor = $('.color-swatch[data-type="hairColor"].active')?.dataset.color || HAIR_COLORS[0];
  const hairStyle = parseInt($('.opt-btn[data-opt="hairStyle"].active')?.dataset.val || '0');
  const outfit = $('.color-swatch[data-type="outfit"].active')?.dataset.color || OUTFIT_COLORS[0];

  state.character = { name, gender, skin, hairColor, hairStyle, outfit };
  renderAvatar($('#avatar-preview'), state.character);
}

function startAdventure() {
  if (!state.character || !state.character.name) { showToast('ENTER A NAME'); return; }
  checkStreak();
  saveLocal();
  syncToCloud();
  showView('main');
  updateAllUI();
  showToast('WELCOME, ' + state.character.name.toUpperCase() + '!');
}

// ============================================
// QUESTS
// ============================================

function analyzeTask(text) {
  const lower = text.toLowerCase();
  let severity = 'low';
  let category = 'personal';

  for (const [sev, words] of Object.entries(THEMES[state.theme].keywords)) {
    if (words.some(w => lower.includes(w))) { severity = sev; break; }
  }

  for (const [cat, info] of Object.entries(CATEGORIES)) {
    if (info.keywords.some(w => lower.includes(w))) { category = cat; break; }
  }

  const r = REWARDS[severity];
  const exp = rand(r.min, r.max);
  const gold = rand(r.goldMin, r.goldMax);

  // Generate quest name
  const names = THEMES[state.theme].questNames[severity];
  const template = names[rand(0, names.length - 1)];
  const subject = text.split(' ').slice(0, 2).join(' ');
  const questName = template.replace('{subject}', subject);

  return { severity, category, exp, gold, questName };
}

function addQuest() {
  const input = $('#quest-input');
  const text = input.value.trim();
  if (!text) return;

  const analysis = analyzeTask(text);
  const quest = {
    id: Date.now().toString(),
    text,
    title: analysis.questName,
    severity: analysis.severity,
    category: analysis.category,
    exp: analysis.exp,
    gold: analysis.gold,
    done: false,
    created: new Date().toISOString(),
    due: null
  };

  state.quests.unshift(quest);
  input.value = '';
  saveLocal();
  syncToCloud();
  renderQuests();
  updateDashboard();
  showToast('QUEST ADDED: ' + quest.title);
}

function toggleQuest(id) {
  const q = state.quests.find(x => x.id === id);
  if (!q) return;
  q.done = !q.done;

  if (q.done) {
    state.stats.exp += q.exp;
    state.stats.gold += q.gold;
    checkLevelUp();
    saveLocal();
    syncToCloud();
    updateLeaderboard();
    showToast('+' + q.exp + ' EXP  +' + q.gold + ' GOLD');

    // 30% battle trigger
    if (Math.random() < 0.3) {
      setTimeout(() => startBattle(), 800);
    }
  } else {
    state.stats.exp = Math.max(0, state.stats.exp - q.exp);
    state.stats.gold = Math.max(0, state.stats.gold - q.gold);
    saveLocal();
    syncToCloud();
  }

  renderQuests();
  updateDashboard();
  updateStatsUI();
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
      updateDashboard();
    }, 500);
  }
}

function renderQuests() {
  const list = $('#quest-list');
  list.innerHTML = '';

  let filtered = state.quests;
  if (state.filter === 'active') filtered = state.quests.filter(q => !q.done);
  else if (state.filter === 'done') filtered = state.quests.filter(q => q.done);
  else if (CATEGORIES[state.filter]) filtered = state.quests.filter(q => q.category === state.filter);

  if (filtered.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--accent);font-size:10px;">NO QUESTS FOUND</div>';
    return;
  }

  filtered.forEach(q => {
    const cat = CATEGORIES[q.category];
    const card = document.createElement('div');
    card.className = 'quest-card' + (q.done ? ' done' : '') + (isOverdue(q) ? ' overdue' : '');
    card.dataset.id = q.id;
    card.draggable = true;

    const stars = '★'.repeat(q.severity === 'high' ? 3 : q.severity === 'medium' ? 2 : 1);

    card.innerHTML = `
      <div class="quest-header">
        <div class="quest-title">${q.title}</div>
        <div class="quest-badges">
          <span class="badge ${cat.color}">${cat.label}</span>
        </div>
      </div>
      <div class="quest-meta">
        <span class="stars">${stars}</span>
        <div class="quest-rewards">
          <span class="reward">⚡ ${q.exp} EXP</span>
          <span class="reward">◆ ${q.gold} GOLD</span>
        </div>
      </div>
      <div class="quest-actions">
        <button class="pixel-btn small" onclick="toggleQuest('${q.id}')">${q.done ? 'UNDO' : 'COMPLETE'}</button>
        <button class="pixel-btn small ghost" onclick="deleteQuest('${q.id}')">DELETE</button>
      </div>
    `;

    card.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', q.id); card.style.opacity = '0.5'; });
    card.addEventListener('dragend', () => { card.style.opacity = '1'; });
    card.addEventListener('dragover', e => e.preventDefault());
    card.addEventListener('drop', e => {
      e.preventDefault();
      const fromId = e.dataTransfer.getData('text/plain');
      reorderQuests(fromId, q.id);
    });

    list.appendChild(card);
  });
}

function isOverdue(q) {
  if (!q.due || q.done) return false;
  return new Date(q.due) < new Date();
}

function reorderQuests(fromId, toId) {
  const fromIdx = state.quests.findIndex(q => q.id === fromId);
  const toIdx = state.quests.findIndex(q => q.id === toId);
  if (fromIdx === -1 || toIdx === -1) return;
  const [moved] = state.quests.splice(fromIdx, 1);
  state.quests.splice(toIdx, 0, moved);
  saveLocal();
  syncToCloud();
  renderQuests();
}

// ============================================
// LEVEL UP
// ============================================

function checkLevelUp() {
  while (state.stats.exp >= state.stats.maxExp) {
    state.stats.exp -= state.stats.maxExp;
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
    showLevelUp();
  }
}

function showLevelUp() {
  const overlay = $('#overlay-levelup');
  $('#levelup-text').textContent = 'You reached Level ' + state.stats.level + '!';
  $('#levelup-stats').innerHTML = `
    <div>HP +10  MP +5</div>
    <div>STR +${state.stats.str}  INT +${state.stats.int}</div>
    <div>AGI +${state.stats.agi}  DEF +${state.stats.def}</div>
  `;
  overlay.classList.remove('hidden');
  spawnConfetti();
}

function closeLevelUp() {
  $('#overlay-levelup').classList.add('hidden');
}

function spawnConfetti() {
  for (let i = 0; i < 30; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = rand(0, 100) + 'vw';
    c.style.backgroundColor = ['#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff'][rand(0,4)];
    c.style.animationDelay = (rand(0, 1000) / 1000) + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2500);
  }
}

// ============================================
// BATTLE
// ============================================

function startBattle() {
  const enemyTemplate = ENEMIES[rand(0, ENEMIES.length - 1)];
  state.battle = {
    enemy: { ...enemyTemplate, maxHp: enemyTemplate.hp },
    turn: 'player',
    log: [],
    auto: false,
    defending: false
  };

  $('#battle-start').style.display = 'none';
  $('#battle-screen').classList.add('active');
  renderEnemy($('#enemy-sprite'), state.battle.enemy);
  $('#enemy-name').textContent = state.battle.enemy.name.toUpperCase();
  renderAvatar($('#battle-avatar'), state.character);
  $('#battle-hero-name').textContent = state.character.name.toUpperCase();
  updateBattleUI();
  addBattleLog('A wild ' + state.battle.enemy.name + ' appears!');

  // Flash effect
  const flash = $('#overlay-battle');
  flash.classList.remove('hidden');
  setTimeout(() => flash.classList.add('hidden'), 300);
}

function updateBattleUI() {
  const b = state.battle;
  if (!b) return;

  const hpPct = (state.stats.hp / state.stats.maxHp) * 100;
  const enemyHpPct = (b.enemy.hp / b.enemy.maxHp) * 100;

  $('#battle-hp-bar').style.width = hpPct + '%';
  $('#enemy-hp-bar').style.width = enemyHpPct + '%';

  const btns = $$('.battle-btn');
  btns.forEach(btn => btn.disabled = b.turn !== 'player');
}

function addBattleLog(msg) {
  if (!state.battle) return;
  state.battle.log.push(msg);
  const logEl = $('#battle-log');
  const line = document.createElement('div');
  line.textContent = '> ' + msg;
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight;
}

function doBattleAction(action) {
  if (!state.battle || state.battle.turn !== 'player') return;
  const b = state.battle;
  b.defending = false;

  if (action === 'flee') {
    if (rand(1, 100) <= 50) {
      addBattleLog('You fled successfully!');
      setTimeout(endBattle, 1000);
    } else {
      addBattleLog('Failed to flee!');
      b.turn = 'enemy';
      setTimeout(enemyTurn, 800);
    }
    return;
  }

  let dmg = 0;
  let msg = '';

  if (action === 'attack') {
    dmg = Math.max(1, state.stats.str + rand(2, 8) - b.enemy.def);
    msg = 'You attack for ' + dmg + ' damage!';
    $('#battle-avatar').classList.add('lunge');
    setTimeout(() => $('#battle-avatar').classList.remove('lunge'), 300);
    $('#enemy-sprite').classList.add('hit-flash');
    setTimeout(() => $('#enemy-sprite').classList.remove('hit-flash'), 300);
  } else if (action === 'magic') {
    if (state.stats.mp < 5) { addBattleLog('Not enough MP!'); return; }
    state.stats.mp -= 5;
    dmg = Math.max(1, state.stats.int + rand(5, 15) - Math.floor(b.enemy.def / 2));
    msg = 'You cast magic for ' + dmg + ' damage!';
  } else if (action === 'defend') {
    b.defending = true;
    msg = 'You brace for impact!';
  } else if (action === 'item') {
    if (state.stats.hp < state.stats.maxHp) {
      const heal = 20;
      state.stats.hp = Math.min(state.stats.maxHp, state.stats.hp + heal);
      msg = 'You used a potion! +' + heal + ' HP';
    } else {
      msg = 'HP is already full!';
    }
  }

  if (dmg > 0) {
    b.enemy.hp -= dmg;
    $('#enemy-sprite').classList.add('shake');
    setTimeout(() => $('#enemy-sprite').classList.remove('shake'), 400);
  }

  addBattleLog(msg);
  updateBattleUI();
  updateStatsUI();

  if (b.enemy.hp <= 0) {
    setTimeout(() => winBattle(), 500);
    return;
  }

  b.turn = 'enemy';
  setTimeout(enemyTurn, 800);
}

function enemyTurn() {
  const b = state.battle;
  if (!b) return;

  let dmg = Math.max(1, b.enemy.atk + rand(1, 5) - state.stats.def);
  if (b.defending) dmg = Math.floor(dmg / 2);

  state.stats.hp -= dmg;
  addBattleLog(b.enemy.name + ' attacks for ' + dmg + ' damage!');

  $('#battle-avatar').classList.add('shake');
  setTimeout(() => $('#battle-avatar').classList.remove('shake'), 400);

  updateBattleUI();
  updateStatsUI();

  if (state.stats.hp <= 0) {
    setTimeout(() => loseBattle(), 500);
    return;
  }

  b.turn = 'player';
  updateBattleUI();

  if (b.auto && $('#auto-battle').checked) {
    setTimeout(() => doBattleAction('attack'), 600);
  }
}

function winBattle() {
  const b = state.battle;
  const gold = b.enemy.gold + rand(0, 10);
  const exp = b.enemy.exp + rand(0, 5);
  state.stats.gold += gold;
  state.stats.exp += exp;

  addBattleLog('Victory! +' + exp + ' EXP, +' + gold + ' GOLD');
  spawnConfetti();
  checkLevelUp();
  saveLocal();
  syncToCloud();
  updateLeaderboard();

  setTimeout(() => {
    endBattle();
    showToast('BATTLE WON! +' + exp + ' EXP');
  }, 1500);
}

function loseBattle() {
  addBattleLog('You were defeated...');
  state.stats.hp = 1;

  const screen = document.createElement('div');
  screen.className = 'gameover-screen';
  screen.innerHTML = `
    <h1>GAME OVER</h1>
    <p style="font-size:10px;margin-bottom:20px;">You were defeated by ${state.battle.enemy.name}</p>
    <button class="pixel-btn primary" onclick="this.parentElement.remove();endBattle();">CONTINUE</button>
  `;
  $('#battle-screen').appendChild(screen);

  saveLocal();
  syncToCloud();
}

function endBattle() {
  state.battle = null;
  $('#battle-screen').classList.remove('active');
  $('#battle-start').style.display = 'block';
  $('#battle-log').innerHTML = '';
  const go = $('.gameover-screen');
  if (go) go.remove();
}

// ============================================
// PRACTICE
// ============================================

function startPractice() {
  const grade = parseInt($('.opt-btn[data-grade].active')?.dataset.grade || '5');
  const subject = $('.opt-btn[data-subject].active')?.dataset.subject || 'math';
  state.practice.grade = grade;
  state.practice.subject = subject;

  const pool = PRACTICE_QUESTIONS[grade]?.[subject] || [];
  if (pool.length === 0) { showToast('NO QUESTIONS AVAILABLE'); return; }

  const q = pool[rand(0, pool.length - 1)];
  state.practice.current = q;

  $('#practice-setup').classList.add('hidden');
  $('#practice-area').classList.remove('hidden');

  // Typewriter effect
  const el = $('#practice-question');
  el.textContent = '';
  let i = 0;
  const txt = q.q;
  const typeInterval = setInterval(() => {
    el.textContent += txt[i];
    i++;
    if (i >= txt.length) clearInterval(typeInterval);
  }, 30);

  const optsEl = $('#practice-options');
  const inputEl = $('#practice-answer');
  const submitBtn = $('#btn-submit-answer');
  optsEl.innerHTML = '';
  inputEl.classList.add('hidden');
  submitBtn.classList.add('hidden');

  if (q.type === 'choice') {
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'practice-opt-btn';
      btn.textContent = opt;
      btn.onclick = () => submitPractice(idx);
      optsEl.appendChild(btn);
    });
  } else {
    inputEl.classList.remove('hidden');
    submitBtn.classList.remove('hidden');
    inputEl.value = '';
    inputEl.focus();
    submitBtn.onclick = () => submitPractice(inputEl.value.trim());
  }
}

function submitPractice(answer) {
  const q = state.practice.current;
  if (!q) return;

  let correct = false;
  if (q.type === 'choice') {
    correct = answer === q.a;
    const btns = $$('.practice-opt-btn');
    btns[q.a].classList.add('correct');
    if (!correct && typeof answer === 'number') btns[answer].classList.add('wrong');
  } else {
    correct = answer.toLowerCase().replace(/\s/g, '') === q.a.toLowerCase().replace(/\s/g, '');
  }

  if (correct) {
    state.practice.streak++;
    const exp = 10 + state.practice.streak * 2;
    const gold = 5 + state.practice.streak;
    state.stats.exp += exp;
    state.stats.gold += gold;
    showToast('CORRECT! +' + exp + ' EXP');
    checkLevelUp();
  } else {
    state.practice.streak = 0;
    showToast('WRONG! STREAK RESET');
  }

  $('#practice-streak').textContent = state.practice.streak;
  saveLocal();
  syncToCloud();
  updateStatsUI();

  setTimeout(() => {
    startPractice();
  }, 1200);
}

// ============================================
// LEADERBOARD
// ============================================

async function renderLeaderboard() {
  const tbody = $('#lb-body');
  tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:20px;">LOADING...</td></tr>';

  const data = await fetchLeaderboard(state.lbFilter, state.lbTime);
  tbody.innerHTML = '';

  data.forEach((entry, i) => {
    const tr = document.createElement('tr');
    const rankClass = i < 3 ? 'rank-' + (i + 1) : '';
    const scoreMap = { level: entry.level, quests: entry.questsCompleted, gold: entry.gold, streak: entry.streak };
    tr.innerHTML = `
      <td class="${rankClass}">${i + 1}</td>
      <td>${entry.username}</td>
      <td>${entry.level}</td>
      <td>${scoreMap[state.lbFilter]}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ============================================
// COSMETICS SHOP
// ============================================

function renderShop() {
  const grid = $('#cosmetic-shop');
  grid.innerHTML = '';

  COSMETICS.forEach(item => {
    const owned = state.cosmetics.includes(item.id);
    const div = document.createElement('div');
    div.className = 'shop-item' + (owned ? ' owned' : '');
    div.innerHTML = `
      <div style="font-size:10px;margin-bottom:5px;">${item.name}</div>
      <div class="item-price">${owned ? 'OWNED' : item.price + ' GOLD'}</div>
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
      showToast('UNEQUIPPED');
    } else {
      state.equipped[item.type] = item.id;
      showToast('EQUIPPED: ' + item.name);
    }
  } else {
    if (state.stats.gold < item.price) { showToast('NOT ENOUGH GOLD'); return; }
    state.stats.gold -= item.price;
    state.cosmetics.push(item.id);
    state.equipped[item.type] = item.id;
    showToast('PURCHASED: ' + item.name);
  }

  saveLocal();
  syncToCloud();
  renderShop();
  updateStatsUI();
  if (state.character) {
    renderAvatar($('#char-big-avatar'), state.character);
    renderAvatar($('#mini-avatar'), state.character);
  }
}

// ============================================
// UI UPDATES
// ============================================

function updateStatsUI() {
  $('#stat-level').textContent = state.stats.level;
  $('#stat-gold').textContent = state.stats.gold;
  $('#val-hp').textContent = state.stats.hp + '/' + state.stats.maxHp;
  $('#val-mp').textContent = state.stats.mp + '/' + state.stats.maxMp;
  $('#val-exp').textContent = state.stats.exp + '/' + state.stats.maxExp;

  $('#bar-hp').style.width = (state.stats.hp / state.stats.maxHp * 100) + '%';
  $('#bar-mp').style.width = (state.stats.mp / state.stats.maxMp * 100) + '%';
  $('#bar-exp').style.width = (state.stats.exp / state.stats.maxExp * 100) + '%';

  $('#stat-str').textContent = state.stats.str;
  $('#stat-int').textContent = state.stats.int;
  $('#stat-agi').textContent = state.stats.agi;
  $('#stat-def').textContent = state.stats.def;

  // Character page
  $('#big-level').textContent = state.stats.level;
  $('#big-exp').textContent = state.stats.exp + '/' + state.stats.maxExp;
  $('#big-gold').textContent = state.stats.gold;
  $('#big-quests').textContent = state.quests.filter(q => q.done).length;
  $('#char-display-name').textContent = state.character?.name || 'HERO';

  $('#val-str').textContent = state.stats.str;
  $('#val-int').textContent = state.stats.int;
  $('#val-agi').textContent = state.stats.agi;
  $('#val-def').textContent = state.stats.def;

  $('#bar-str').style.width = Math.min(100, state.stats.str * 5) + '%';
  $('#bar-int').style.width = Math.min(100, state.stats.int * 5) + '%';
  $('#bar-agi').style.width = Math.min(100, state.stats.agi * 5) + '%';
  $('#bar-def').style.width = Math.min(100, state.stats.def * 5) + '%';
}

function updateDashboard() {
  $('#streak-count').textContent = state.streak;

  const total = state.quests.length;
  const done = state.quests.filter(q => q.done).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  $('#daily-bar').style.width = pct + '%';
  $('#daily-pct').textContent = pct + '%';

  const dash = $('#dash-quests');
  dash.innerHTML = '';
  const active = state.quests.filter(q => !q.done).slice(0, 5);
  if (active.length === 0) {
    dash.innerHTML = '<div style="font-size:8px;color:var(--accent);padding:10px;">NO ACTIVE QUESTS</div>';
  }
  active.forEach(q => {
    const div = document.createElement('div');
    div.className = 'mini-quest';
    div.textContent = q.title;
    div.onclick = () => { location.hash = '#quests'; };
    dash.appendChild(div);
  });
}

function updateAllUI() {
  updateStatsUI();
  updateDashboard();
  renderQuests();
  renderShop();
  if (state.character) {
    renderAvatar($('#mini-avatar'), state.character, 0.5);
    renderAvatar($('#char-big-avatar'), state.character, 1.5);
  }
}

// ============================================
// ROUTER
// ============================================

function showView(viewName) {
  $$('.view').forEach(v => v.classList.add('hidden'));
  $$('.main-view').forEach(v => v.classList.add('hidden'));

  if (viewName === 'main') {
    $('#view-main').classList.remove('hidden');
    const hash = location.hash.replace('#', '') || 'dashboard';
    showMainView(hash);
  } else {
    $('#view-' + viewName).classList.remove('hidden');
  }
}

function showMainView(view) {
  $$('.main-view').forEach(v => v.classList.add('hidden'));
  $$('.nav-btn').forEach(n => n.classList.remove('active'));

  const target = $('#view-' + view);
  if (target) target.classList.remove('hidden');

  const nav = $(`.nav-btn[data-view="${view}"]`);
  if (nav) nav.classList.add('active');

  if (view === 'leaderboard') renderLeaderboard();
  if (view === 'character') renderShop();
}

function handleRoute() {
  const hash = location.hash.replace('#', '') || 'dashboard';
  const mainViews = ['dashboard','quests','practice','battle','leaderboard','character'];

  if (!$('#view-main').classList.contains('hidden') && mainViews.includes(hash)) {
    showMainView(hash);
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

function initEvents() {
  // Theme selection
  $$('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.theme = btn.dataset.theme;
      document.body.dataset.theme = state.theme;
      saveLocal();
      showView('auth');
    });
  });

  // Auth tabs
  $$('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      $$('.auth-form').forEach(f => f.classList.add('hidden'));
      $('#auth-' + tab.dataset.tab).classList.remove('hidden');
    });
  });

  $('#btn-login').addEventListener('click', loginEmail);
  $('#btn-register').addEventListener('click', registerEmail);
  $('#btn-google').addEventListener('click', loginGoogle);
  $('#btn-guest').addEventListener('click', playAsGuest);
  $('#btn-logout').addEventListener('click', logout);

  // Character creation
  $$('.opt-btn[data-opt="gender"]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.opt-btn[data-opt="gender"]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateCharPreview();
    });
  });

  $$('.opt-btn[data-opt="hairStyle"]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.opt-btn[data-opt="hairStyle"]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateCharPreview();
    });
  });

  $('#char-name').addEventListener('input', updateCharPreview);

  document.addEventListener('click', e => {
    if (e.target.classList.contains('color-swatch')) {
      const type = e.target.dataset.type;
      $$(`.color-swatch[data-type="${type}"]`).forEach(s => s.classList.remove('active'));
      e.target.classList.add('active');
      updateCharPreview();
    }
  });

  $('#btn-start-adventure').addEventListener('click', startAdventure);

  // Quests
  $('#btn-add-quest').addEventListener('click', addQuest);
  $('#quest-input').addEventListener('keypress', e => { if (e.key === 'Enter') addQuest(); });

  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filter = btn.dataset.filter;
      renderQuests();
    });
  });

  // Practice
  $$('.opt-btn[data-grade]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.opt-btn[data-grade]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  $$('.opt-btn[data-subject]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.opt-btn[data-subject]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  $('#btn-start-practice').addEventListener('click', startPractice);
  $('#practice-answer').addEventListener('keypress', e => { if (e.key === 'Enter') submitPractice($('#practice-answer').value.trim()); });

  // Battle
  $$('.battle-btn').forEach(btn => {
    btn.addEventListener('click', () => doBattleAction(btn.dataset.action));
  });

  // Leaderboard
  $$('.lb-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.lb-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.lbFilter = tab.dataset.lb;
      renderLeaderboard();
    });
  });

  $$('.lb-time-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.lb-time-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.lbTime = btn.dataset.time;
      renderLeaderboard();
    });
  });

  // Hash routing
  window.addEventListener('hashchange', handleRoute);
}

// ============================================
// INIT
// ============================================

function init() {
  loadLocal();
  document.body.dataset.theme = state.theme;
  initCharacterCreate();
  initEvents();
  initAuth();

  // Check if we have saved data
  if (state.character) {
    if (state.user) showView('main');
    else showView('auth');
  } else {
    showView('onboarding');
  }

  updateAllUI();
}

// Wait for Firebase module to load
setTimeout(init, 500);
