/* ============================================
   QUEST LOG — RPG TO-DO APP
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

const BANNED_NAMES = ['admin','moderator','support','official','questlog','system','root','owner'];

let state = {
  theme: 'cyberpunk',
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

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function saveLocal() {
  try {
    const data = { theme: state.theme, character: state.character, quests: state.quests, stats: state.stats, streak: state.streak, lastActive: state.lastActive, cosmetics: state.cosmetics, equipped: state.equipped };
    localStorage.setItem('questlog_data', JSON.stringify(data));
  } catch(e) { console.warn('localStorage save failed:', e); }
}

function loadLocal() {
  try {
    const raw = localStorage.getItem('questlog_data');
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data.theme) state.theme = data.theme;
    if (data.character) state.character = data.character;
    if (data.quests) state.quests = data.quests;
    if (data.stats
