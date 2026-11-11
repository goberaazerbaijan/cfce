// ==================== API KONFİQURASİYASI ====================
const API_URL = 'https://cfce-backend.onrender.com/api';

async function apiGet(endpoint, params = {}) {
  const url = new URL(`${API_URL}/${endpoint}`);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(`GET ${endpoint} xətası:`, error);
    return [];
  }
}

async function apiPost(endpoint, body) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(`POST ${endpoint} xətası:`, error);
    return null;
  }
}

async function apiPut(endpoint, id, body) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(`PUT ${endpoint}/${id} xətası:`, error);
    return null;
  }
}

async function apiDelete(endpoint, id) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return true;
  } catch (error) {
    console.error(`DELETE ${endpoint}/${id} xətası:`, error);
    return false;
  }
}

async function dbQuery(table, filters = {}) {
  if (Object.keys(filters).length > 0) {
    return await apiGet(`${table}/filter`, filters);
  }
  return await apiGet(table);
}

async function dbInsert(table, record) { return await apiPost(table, record); }
async function dbUpdate(table, id, update) { return await apiPut(table, id, update); }
async function dbDelete(table, id) { return await apiDelete(table, id); }

// ==================== DATA ====================
const EXAMS = { fce_full: { id:'fce_full', title:'FCE Full Practice Test', icon:'📚', description:'Tam FCE Reading & Use of English imtahanı (7 Part)', parts:['part1','part2','part3','part4','part5','part6','part7'] } };

const part1Data = {
  id:'part1', moduleNum:1, moduleTitle:"Part 1 — Multiple Choice Cloze", moduleSubtitle:"Hər boşluq üçün ən uyğun variantı seçin",
  title:"The world's deepest underwater cave?", subtitle:"Test 1 — Reading and Use of English",
  instructions:"For questions <strong>1–8</strong>, decide which answer (<strong>A, B, C or D</strong>) best fits each gap.",
  paragraphs:[
    "Polish explorer Krzysztof Starnawski (0) [keeps] returning to Hranická Propast, an underwater cave in the Czech Republic. His fascination with the cave began during his first dive there, when he started to (1) _______ that it might be possible to go far deeper than any other dive had ever taken him before.",
    "Returning a few years later, Starnawski dived to 200 m, but was stopped by a narrow passage in the rock that (2) _______ to a tunnel. He lowered a probe – a weight on the end of a long rope – and still didn't hit the bottom of the cave.",
    "On his next visit, the following year, he found that the passage had widened (3) _______. He swam through it down to 265 m. Then Starnawski went back again, (4) _______ by a remotely-operated underwater robot, which (5) _______ its way to a record-breaking depth of 404 m.",
    "Starnawski is (6) _______ to continue to explore this mysterious, (7) _______ unending cave, believing that it may (8) _______ out to be even deeper!"
  ],
  questions:[
    {num:1,options:{A:"suspect",B:"wonder",C:"expect",D:"assess"},answer:"B",explanation:"'wonder' — düşünmək."},
    {num:2,options:{A:"guided",B:"led",C:"headed",D:"ran"},answer:"B",explanation:"'led to' — apardı."},
    {num:3,options:{A:"largely",B:"entirely",C:"excessively",D:"considerably"},answer:"D",explanation:"'considerably' — xeyli."},
    {num:4,options:{A:"attended",B:"provided",C:"accompanied",D:"supplied"},answer:"C",explanation:"'accompanied by'."},
    {num:5,options:{A:"broke",B:"made",C:"went",D:"gave"},answer:"B",explanation:"'made its way'."},
    {num:6,options:{A:"committed",B:"determined",C:"intended",D:"dedicated"},answer:"B",explanation:"'determined to'."},
    {num:7,options:{A:"apparently",B:"distinctly",C:"noticeably",D:"particularly"},answer:"A",explanation:"'apparently'."},
    {num:8,options:{A:"set",B:"end",C:"turn",D:"come"},answer:"D",explanation:"'come out to be'."}
  ]
};

const part2Data = {
  id:'part2', moduleNum:2, moduleTitle:"Part 2 — Open Cloze", moduleSubtitle:"Boşluqları uyğun sözlərlə doldurun",
  title:"Plastic roads",
  instructions:"For questions <strong>9–16</strong>, think of the word which best fits each gap. Use only <strong>one word</strong>.",
  paragraphs:[
    "The amount of plastic waste produced around the world is growing (0) ALL the time. But one man sees this as an opportunity rather than a problem. Dr Rajagopalan Vasudevan, a professor of chemistry from the Indian city of Madurai has (9) up with a way to re-use plastic waste, as (10) as improving road quality. His method, (11) he first developed in 2001, requires hardly (12) changes to existing road-laying techniques.",
    "The method involves breaking plastic (13) small pieces, then combining them (14) the traditional road-building components in order to produce a strong, long-lasting material. All kinds of plastic can be used, even plastic that is normally considered (15) costly to be worth recycling.",
    "There are now over 5,000 km of Dr Vasudevan's plastic roads in use in rural India. He travels throughout the country instructing engineers on exactly (16) to build roads in this way."
  ],
  gaps:[
    {num:9,answer:"COME",explanation:"'come up with'."},
    {num:10,answer:"WELL",explanation:"'as well as'."},
    {num:11,answer:"WHICH",explanation:"Nisbi əvəzlik."},
    {num:12,answer:"ANY",explanation:"'hardly any'."},
    {num:13,answer:"INTO",explanation:"'break into'."},
    {num:14,answer:"WITH",explanation:"'combine with'."},
    {num:15,answer:"TOO",explanation:"'too costly'."},
    {num:16,answer:"HOW",explanation:"'how to build'."}
  ]
};

const part3Data = {
  id:'part3', moduleNum:3, moduleTitle:"Part 3 — Word Formation", moduleSubtitle:"Verilən sözdən yeni söz düzəldin",
  title:"The mini-monkeys of Madagascar",
  instructions:"For questions <strong>17–24</strong>, read the text below. Use the word given in capitals at the end of some of the lines to form a word that fits in the gap.",
  paragraphs:[
    "Mouse lemurs, the smallest group of primates in the (0) WORLD, are only found in Madagascar. Until recently, scientists believed that only two types of these tiny tree-dwellers existed. However, thanks to the work of a team of (17) _______, there are now thought to be over 20.",
    "A research expedition to the island resulted in the (18) _______ of two new species. There are very few (19) _______ between mouse lemur species, but genetic analysis confirmed they were (20) _______ different.",
    "At around 27 cm in length, Madame Berthe's mouse lemur is the smallest. They are nocturnal and (21) _______, sleeping in nests made from leaves. Their diet consists of fruit and flowers, but they will also catch insects if the (22) _______ arises.",
    "Sadly, mouse lemurs are in (23) _______ due to deforestation. It is (24) _______ that 90% of Madagascar's forests have been lost, meaning conservation efforts are crucial."
  ],
  gaps:[
    {num:17,given:"BIOLOGY",answer:"BIOLOGISTS",explanation:"'biologists' — bioloqlar."},
    {num:18,given:"DISCOVER",answer:"DISCOVERY",explanation:"'discovery' — kəşf."},
    {num:19,given:"DIFFER",answer:"DIFFERENCES",explanation:"'differences' — fərqlər."},
    {num:20,given:"SIGNIFY",answer:"SIGNIFICANTLY",explanation:"'significantly' — əhəmiyyətli dərəcədə."},
    {num:21,given:"SECRET",answer:"SECRETIVE",explanation:"'secretive' — gizli."},
    {num:22,given:"OPPORTUNE",answer:"OPPORTUNITY",explanation:"'opportunity' — imkan/fürsət."},
    {num:23,given:"DANGEROUS",answer:"DANGER",explanation:"'in danger' — təhlükədə."},
    {num:24,given:"ESTIMATE",answer:"ESTIMATED",explanation:"'estimated' — təxmin edilir."}
  ]
};

const part4Data = {
  id:'part4', moduleNum:4, moduleTitle:"Part 4 — Key Word Transformation", moduleSubtitle:"Açar sözlə cümləni yenidən qurun (2-5 söz)",
  title:"Key Word Transformation",
  instructions:"For questions <strong>25–30</strong>, complete the second sentence so that it has a similar meaning to the first, using the word given. Do not change the word. Use between <strong>two and five words</strong>.",
  questions:[
    {num:25,first:"'I'm sorry I'm late,' said James.",keyword:"APOLOGISED",secondPre:"James",secondPost:"late.",answer:"APOLOGISED FOR BEING",explanation:"'apologise for doing sth'."},
    {num:26,first:"The film was so boring that I fell asleep.",keyword:"SUCH",secondPre:"It was",secondPost:"that I fell asleep.",answer:"SUCH A BORING FILM",explanation:"'such a/an + adj + noun'."},
    {num:27,first:"You must not open this door under any circumstances.",keyword:"ACCOUNT",secondPre:"On",secondPost:"this door be opened.",answer:"NO ACCOUNT MUST",explanation:"İnversiya: 'on no account must...'"},
    {num:28,first:"I don't think it's a good idea to go there alone.",keyword:"WERE",secondPre:"If I",secondPost:"not go there alone.",answer:"WERE YOU I WOULD",explanation:"'If I were you, I would...'"},
    {num:29,first:"She started working here three years ago.",keyword:"BEEN",secondPre:"She",secondPost:"three years.",answer:"HAS BEEN WORKING HERE FOR",explanation:"Present Perfect Continuous."},
    {num:30,first:"It was impossible for us to see the stage.",keyword:"COULD",secondPre:"We",secondPost:"the stage.",answer:"COULD NOT SEE",explanation:"'could not see'."}
  ]
};

const part5Data = {
  id:'part5', moduleNum:5, moduleTitle:"Part 5 — Multiple Choice", moduleSubtitle:"Mətn əsasında düzgün variantı seçin",
  title:"The joys and challenges of working from home",
  instructions:"For questions <strong>31–36</strong>, choose the answer (<strong>A, B, C or D</strong>) which you think fits best according to the text.",
  paragraphs:[
    "When I first started working from home, I imagined days filled with calm productivity. No daily commute, no office distractions, and total control over my schedule. The reality, as I quickly discovered, was somewhat more complex.",
    "In the beginning, the sheer flexibility was intoxicating. I could wake up five minutes before starting work, wear whatever I liked, and take breaks whenever I chose. But within a few weeks, the lack of boundary between professional and personal life began to take its toll.",
    "One of the biggest hurdles was self-discipline. Without the social pressure of an office environment, procrastination became an easy trap. The laundry, the dishes, even reorganising my bookshelves suddenly seemed far more urgent than replying to clients.",
    "Isolation was another unexpected factor. I had always considered myself an introvert, yet I found myself genuinely missing the casual interactions with colleagues – the quick chat by the coffee machine, the shared laughter over a silly mistake.",
    "Eventually, I realised that thriving as a remote worker required creating artificial structures. I designated a specific corner of my living room as 'the office' and strictly forbade myself from working from the sofa.",
    "Now, three years into this arrangement, I can honestly say I wouldn't trade it for anything. It took time, mistakes, and deliberate effort, but working from home has finally become the liberating experience I had hoped for."
  ],
  questions:[
    {num:31,text:"What did the writer anticipate about working from home?",options:{A:"It would require extensive adjustments.",B:"It would offer a stress-free environment.",C:"It would be more challenging than expected.",D:"It would harm their career prospects."},answer:"B",explanation:"'imagined days filled with calm productivity'."},
    {num:32,text:"What problem did the writer face in the early weeks?",options:{A:"Inability to separate work from personal life.",B:"Excessive demands from colleagues.",C:"Difficulty staying awake during work hours.",D:"Technical issues with equipment."},answer:"A",explanation:"'the lack of boundary between professional and personal life began to take its toll'."},
    {num:33,text:"Why does the writer mention doing household chores?",options:{A:"To show how clean their home became.",B:"To illustrate how they delayed working.",C:"To explain their daily morning routine.",D:"To criticise standard office hours."},answer:"B",explanation:"'procrastination became an easy trap'."},
    {num:34,text:"How did the writer feel about working without colleagues?",options:{A:"Relieved to avoid office politics.",B:"Surprised to miss casual conversations.",C:"Indifferent, as they were introverted.",D:"Eager to meet clients in person instead."},answer:"B",explanation:"'found myself genuinely missing the casual interactions'."},
    {num:35,text:"What solution did the writer implement to improve productivity?",options:{A:"Returning to a shared workspace.",B:"Working exclusively from comfortable areas.",C:"Establishing dedicated physical work zones.",D:"Decreasing overall weekly working hours."},answer:"C",explanation:"'designated a specific corner of my living room as the office'."},
    {num:36,text:"What is the writer's overall attitude now?",options:{A:"They regret leaving the traditional office.",B:"They feel remote work is overrated.",C:"They are satisfied after adapting to it.",D:"They plan to seek hybrid employment."},answer:"C",explanation:"'I wouldn't trade it for anything'."}
  ]
};

const part6Data = {
  id:'part6', moduleNum:6, moduleTitle:"Part 6 — Gapped Text", moduleSubtitle:"Boşluqlara uyğun gələn cümləni seçin (A-G)",
  title:"The secret world of underground fungi",
  instructions:"For questions <strong>37–42</strong>, choose from the sentences <strong>A–G</strong> the one which fits each gap. There is one extra sentence.",
  paragraphs:[
    "Beneath the forest floor lies a vast, intricate network that rivals the complexity of our own nervous systems. Known as the mycorrhizal network, it connects trees and plants through microscopic fungal threads. (37) _______ This underground system allows plants to communicate and share vital resources in ways that were once considered pure fantasy.",
    "Through these fungal connections, older 'mother trees' can nourish younger seedlings that grow in their shade. (38) _______ Studies show that shaded seedlings receiving support through the network have significantly higher survival rates.",
    "The network is not merely a pipeline for nutrients; it functions as an information highway. When a tree is attacked by insects, it can send chemical warning signals through the fungal threads to its neighbours. (39) _______ This early preparation drastically reduces damage across the forest canopy.",
    "However, the system is not entirely altruistic. Fungi demand payment for their services, claiming up to thirty percent of the sugars produced by trees through photosynthesis. (40) _______ If a plant fails to provide enough carbon, fungi may reduce nutrient delivery or redirect resources elsewhere.",
    "Scientists are now beginning to understand how human activities threaten this subterranean web. Intensive forestry and soil disruption can sever fungal networks that took decades to develop. (41) _______ Without this invisible infrastructure, forests become far more vulnerable to disease and climate extremes.",
    "Protecting these underground partnerships may prove essential in the fight against climate change. Healthy fungal networks help soil store immense amounts of carbon. (42) _______ Preserving the world beneath our feet is therefore just as urgent as protecting the trees above."
  ],
  options:{
    A:"They do this by transferring water and carbon compounds directly to them.",
    B:"In return, the neighbouring trees begin producing defensive chemicals before the pests even arrive.",
    C:"It is sometimes referred to as the 'wood wide web'.",
    D:"It is a reciprocal relationship where both partners hold each other accountable.",
    E:"Forests with damaged fungal networks take significantly longer to regenerate after fires.",
    F:"In fact, they are among the most effective carbon sinks on the planet.",
    G:"Some trees, however, deliberately sever their connections during winter."
  },
  questions:[
    {num:37,answer:"C",explanation:"'wood wide web' mətndəki internet şəbəkəsi analogiyasını tamamlayır."},
    {num:38,answer:"A",explanation:"Ana ağacların cavan fidanları qidalandırması üsulunu izah edir."},
    {num:39,answer:"B",explanation:"Zərərverici həşəratlara qarşı qonşu ağacların öncədən müdafiə kimyəviləri hazırlaması."},
    {num:40,answer:"D",explanation:"Ağac və göbələk arasındakı qarşılıqlı alver və asılılıq əlaqəsini təsvir edir."},
    {num:41,answer:"E",explanation:"İnsan müdaxiləsi və torpaq dağıntısının meşənin bərpasına mənfi təsiri."},
    {num:42,answer:"F",explanation:"İqlim dəyişikliyi kontekstində karbon qazının torpaqda saxlanılması."}
  ]
};

const part7Data = {
  id:'part7', moduleNum:7, moduleTitle:"Part 7 — Multiple Matching", moduleSubtitle:"Hər sualın hansı şəxsə aid olduğunu tapın (A, B, C, D)",
  title:"A life in ballet",
  instructions:"For questions <strong>43–52</strong>, choose from the four dancers (<strong>A–D</strong>). Dancers may be chosen more than once.",
  people:{
    A:{name:"Maria",text:"I didn't take to ballet initially; my mother enrolled me to improve my posture. I was rather clumsy, but eventually began to show some promise. When our school changed artistic directors, I was deeply disappointed because the new one was far stricter. Looking back, though, it forced me to develop thick skin. I learnt to respond more positively to negative comments rather than taking everything personally."},
    B:{name:"Leon",text:"People have all sorts of silly misconceptions about ballet dancers, mostly exaggerated by the media – that we eat nothing and have no life outside the studio. In truth, the rigorous routine is tough, yet I find it strangely reassuring and comforting. Pre-performance jitters used to paralyze me, but over the years I've learnt a few strategies I can apply to good effect before stepping onto the stage."},
    C:{name:"Melanie",text:"When I won a scholarship to the national academy, I was thoroughly intimidated by how good the other girls were there. The hardest part for me was the mental multitasking – ballet involves doing a number of things at any given moment, from keeping your shoulders down to tracking the rhythm and maintaining eye contact with the audience."},
    D:{name:"Peter",text:"I don't regret missing out on normal teenage parties and outings because the sacrifices I made ultimately paid off. I'm a far better dancer today because of that single-minded focus. In terms of choreography, I don't restrict myself to classical traditions; I pick up ideas from a range of dancers and styles, which makes my own performances unique."}
  },
  questions:[
    {num:43,text:"says that they get their inspiration from different sources?",answer:"D",explanation:"Peter: 'I pick up ideas from a range of dancers and styles.'"},
    {num:44,text:"is irritated by the inaccurate ideas people have about ballet dancers?",answer:"B",explanation:"Leon: 'silly misconceptions... exaggerated by the media.'"},
    {num:45,text:"says that the sacrifices they made were worth it?",answer:"D",explanation:"Peter: 'I don't regret missing out... I'm a far better dancer.'"},
    {num:46,text:"describes how they felt about a change that was forced on them?",answer:"A",explanation:"Maria: 'disappointed when the new one turned out to be much stricter.'"},
    {num:47,text:"explains how ballet involves combining several actions simultaneously?",answer:"C",explanation:"Melanie: 'doing a number of things at any given moment.'"},
    {num:48,text:"says that they have changed their attitude to criticism?",answer:"A",explanation:"Maria: 'learnt to respond more positively to negative comments.'"},
    {num:49,text:"believes that their attitude to training makes them untypical?",answer:"B",explanation:"Leon: 'I find it strangely reassuring and comforting.'"},
    {num:50,text:"describes how they were put off ballet by seeing the talent of others?",answer:"C",explanation:"Melanie: 'intimidated by how good the girls were there.'"},
    {num:51,text:"says that it took a while for them to demonstrate their potential?",answer:"A",explanation:"Maria: 'I didn't take to it initially... eventually began to show some promise.'"},
    {num:52,text:"says that they have found a way of dealing with their feelings prior to going on stage?",answer:"B",explanation:"Leon: 'learnt a few strategies I can apply, to good effect.'"}
  ]
};

const MODULES = {part1:part1Data,part2:part2Data,part3:part3Data,part4:part4Data,part5:part5Data,part6:part6Data,part7:part7Data};
const MODULE_ORDER = ['part1','part2','part3','part4','part5','part6','part7'];

// ==================== STATE ====================
let currentUser = null;
let currentExamId = null, currentModuleId = null, currentQ = 0, timerInterval, seconds = 0, autoAdvanceTimer = null, isTransitioning = false;

function getSession(){ try { return JSON.parse(localStorage.getItem('fce_current')); } catch(e){ return null; } }
function saveSession(user){ try { localStorage.setItem('fce_current', JSON.stringify(user)); } catch(e){ console.warn('LocalStorage full', e); } }
function clearSession(){ localStorage.removeItem('fce_current'); }

// ==================== INIT ====================
async function initDB(){
  const admins = await dbQuery('users', { email: 'admin@fce.com' });
  if(admins.length === 0){
    await dbInsert('users', { name: 'Admin', email: 'admin@fce.com', password: 'admin123', role: 'admin' });
    console.log('✅ Admin istifadəçisi yaradıldı');
  }
  const points = await dbQuery('exam_points', { exam_id: 'fce_full' });
  if(points.length === 0){
    const defaultPoints = [];
    MODULE_ORDER.forEach(pid => {
      const m = MODULES[pid];
      const items = m.questions || m.gaps || [];
      items.forEach(it => {
        defaultPoints.push({ exam_id: 'fce_full', part_id: pid, question_num: it.num, points: 1 });
      });
    });
    if(defaultPoints.length > 0){
      await apiPost('exam_points', defaultPoints);
      console.log('✅ Default ballar yaradıldı');
    }
  }
  const session = getSession();
  if(session){
    const users = await dbQuery('users', { id: session.id });
    if(users.length > 0) currentUser = users[0];
  }
}

// ==================== AUTH ====================
function switchAuthTab(tab, event){
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  if(event) event.target.classList.add('active');
  document.getElementById('loginForm').classList.toggle('hidden', tab!=='login');
  document.getElementById('registerForm').classList.toggle('hidden', tab!=='register');
  document.getElementById('authError').style.display='none';
  document.getElementById('authSuccess').style.display='none';
}

function showAuthError(msg){
  const e = document.getElementById('authError');
  e.textContent = msg;
  e.style.display = 'block';
  document.getElementById('authSuccess').style.display = 'none';
}

function showAuthSuccess(msg){
  const e = document.getElementById('authSuccess');
  e.textContent = msg;
  e.style.display = 'block';
  document.getElementById('authError').style.display = 'none';
}

async function doLogin(){
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass = document.getElementById('loginPassword').value;
  if(!email || !pass){ showAuthError('Email və parol daxil edin'); return; }
  const users = await dbQuery('users', { email: email });
  const user = users.find(u => u.password === pass);
  if(!user){ showAuthError('Email və ya parol yanlışdır'); return; }
  currentUser = user;
  saveSession(user);
  enterApp();
}

async function doRegister(){
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const pass = document.getElementById('regPassword').value;
  if(!name || !email || !pass){ showAuthError('Bütün sahələri doldurun'); return; }
  if(pass.length < 6){ showAuthError('Parol minimum 6 simvol olmalıdır'); return; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showAuthError('Düzgün email daxil edin'); return; }
  const users = await dbQuery('users', { email: email });
  if(users.length > 0){ showAuthError('Bu email artıq qeydiyyatdan keçib'); return; }
  const newUser = await dbInsert('users', { name: name, email: email, password: pass, role: 'student' });
  if(!newUser){ showAuthError('Xəta baş verdi'); return; }
  showAuthSuccess('Qeydiyyat uğurlu! İndi giriş edin.');
  setTimeout(() => {
    document.querySelectorAll('.auth-tab')[0].click();
    document.getElementById('loginEmail').value = email;
  }, 1000);
}

function doLogout(){
  currentUser = null;
  clearSession();
  document.getElementById('mainApp').classList.add('hidden');
  document.getElementById('authPage').classList.remove('hidden');
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
  hideExamNavButtons();
}

function enterApp(){
  if(!currentUser) return;
  document.getElementById('authPage').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');
  document.getElementById('userDisplay').textContent = `${currentUser.name} (${currentUser.role==='admin'?'Admin':currentUser.role==='marker'?'Marker':'Şagird'})`;
  if(currentUser.role === 'admin') showAdmin();
  else if(currentUser.role === 'marker') showMarkerDashboard();
  else showExamList();
}

// ==================== MARKER DASHBOARD ====================
async function showMarkerDashboard(){
  document.getElementById('examListPage').classList.add('hidden');
  document.getElementById('examPage').classList.add('hidden');
  document.getElementById('carnetPage').classList.add('hidden');
  document.getElementById('adminPage').classList.add('hidden');
  document.getElementById('markerDashboard').classList.remove('hidden');
  hideExamNavButtons();
  document.getElementById('markerName').textContent = currentUser.name;
  await renderMarkerStats();
  await renderMarkerStudentList();
}

async function renderMarkerStats(){
  const container = document.getElementById('markerStats');
  const students = await dbQuery('users', { role: 'student' });
  const totalStudents = students.length;
  let totalExams = 0, totalEdited = 0;
  for(const student of students){
    const scores = await dbQuery('scores', { user_id: student.id });
    totalExams += scores.length;
    scores.forEach(s => { if(s.marker_edited) totalEdited++; });
  }
  container.innerHTML = `<div class="marker-stat-card"><div class="stat-label">👥 Şagird Sayı</div><div class="stat-value">${totalStudents}</div></div><div class="marker-stat-card"><div class="stat-label">📝 Tamamlanan İmtahan</div><div class="stat-value">${totalExams}</div></div><div class="marker-stat-card"><div class="stat-label">✏️ Redaktə Edilmiş</div><div class="stat-value">${totalEdited}</div></div>`;
}

async function renderMarkerStudentList(){
  const container = document.getElementById('markerStudentList');
  const students = await dbQuery('users', { role: 'student' });
  if(students.length === 0){ container.innerHTML = '<div class="no-data">Heç bir şagird yoxdur</div>'; return; }
  let html = '';
  for(const user of students){
    const scores = await dbQuery('scores', { user_id: user.id });
    const totalPoints = scores.reduce((sum, s) => sum + (s.total_points || 0), 0);
    const maxPoints = scores.reduce((sum, s) => sum + (s.max_points || 0), 0);
    html += `<div class="marker-student-item"><div class="student-header"><div class="student-name">${user.name}</div><div class="student-email">${user.email}</div></div><div class="student-info">Tamamlanan imtahan: ${scores.length} • Ümumi bal: <strong>${totalPoints}/${maxPoints}</strong></div>`;
    if(scores.length > 0){
      html += `<div style="margin-top:10px">`;
      for(const sc of scores){
        const exam = EXAMS[sc.exam_id];
        html += `<button class="marker-exam-btn" onclick="viewCarnetFromAdmin('${user.email}','${sc.exam_id}')">📜 ${exam?.title || sc.exam_id} — ${sc.total_points}/${sc.max_points} (${sc.percent}%)</button>`;
      }
      html += `</div>`;
    } else {
      html += `<div style="margin-top:10px;font-size:13px;color:#9ca3af;font-style:italic">Hələ nəticə yoxdur</div>`;
    }
    html += `</div>`;
  }
  container.innerHTML = html;
}

// ==================== EXAM NAV BUTTONS ====================
function renderExamNavButtons(){
  const container = document.getElementById('examNavButtons');
  if(!container) return;
  if(!currentExamId || !EXAMS[currentExamId]){ container.innerHTML = ''; container.classList.remove('show'); return; }
  let html = '';
  EXAMS[currentExamId].parts.forEach((pid) => {
    const m = MODULES[pid];
    const isActive = pid === currentModuleId;
    html += `<button class="part-nav-btn ${isActive ? 'active' : ''}" onclick="goToPart('${pid}')">Part ${m.moduleNum}</button>`;
  });
  html += `<button class="result-nav-btn btn-finish-exam" onclick="finishExam()">🏁 İmtahanı bitir</button>`;
  html += `<button class="result-nav-btn" onclick="showCarnetFromCurrent()">📜 Nəticəyə bax</button>`;
  container.innerHTML = html;
  container.classList.add('show');
}

function finishExam(){
  if(!confirm('İmtahanı vaxtından əvvəl yekunlaşdırmaq və nəticələri hesablamaq istəyirsiniz?')) return;
  showFinalResults();
}

function hideExamNavButtons(){
  const container = document.getElementById('examNavButtons');
  if(container){ container.innerHTML = ''; container.classList.remove('show'); }
}

function goToPart(pid){
  if(!currentExamId || !EXAMS[currentExamId]) return;
  if(!EXAMS[currentExamId].parts.includes(pid)) return;
  if(pid === currentModuleId) return;
  currentModuleId = pid; currentQ = 0;
  renderLayout(); renderText(); renderQuestion(); renderExamNavButtons();
}

function showCarnetFromCurrent(){
  if(!currentUser.scores || Object.keys(currentUser.scores).length === 0){
    alert('Hələ nəticə yoxdur! İmtahanı tamamlayın.');
    return;
  }
  let examId = currentExamId;
  if(!examId || !currentUser.scores[examId]){
    const scoreKeys = Object.keys(currentUser.scores);
    examId = scoreKeys[scoreKeys.length - 1];
  }
  currentExamId = examId;
  showCarnet();
}

// ==================== EXAM LIST ====================
async function showExamList(){
  document.getElementById('examPage').classList.add('hidden');
  document.getElementById('carnetPage').classList.add('hidden');
  document.getElementById('adminPage').classList.add('hidden');
  document.getElementById('markerDashboard').classList.add('hidden');
  document.getElementById('examListPage').classList.remove('hidden');
  hideExamNavButtons();
  const grid = document.getElementById('examGrid');
  grid.innerHTML = '';
  const scores = await dbQuery('scores', { user_id: currentUser.id });
  const scoresMap = {};
  scores.forEach(s => { scoresMap[s.exam_id] = s; });
  Object.values(EXAMS).forEach(exam => {
    const score = scoresMap[exam.id];
    let statusHtml = '<span class="status status-new">Yeni</span>';
    if(score){
      const pct = Math.round(score.percent || 0);
      statusHtml = pct >= 100 ? `<span class="status status-done">✅ ${pct}%</span>` : `<span class="status status-partial">⏳ ${pct}%</span>`;
    }
    const totalQ = exam.parts.reduce((s, pid) => s + (MODULES[pid].questions?.length || MODULES[pid].gaps?.length || 0), 0);
    const card = document.createElement('div');
    card.className = 'exam-card';
    card.onclick = () => startExam(exam.id);
    card.innerHTML = `<div class="exam-icon">${exam.icon}</div><h3>${exam.title}</h3><p>${exam.description}</p><div class="exam-meta"><span>${exam.parts.length} Part • ${totalQ} sual</span>${statusHtml}</div>`;
    grid.appendChild(card);
  });
}

function startExam(examId){
  currentExamId = examId;
  currentModuleId = EXAMS[examId].parts[0];
  currentQ = 0; seconds = 0;
  document.getElementById('examListPage').classList.add('hidden');
  document.getElementById('examPage').classList.remove('hidden');
  document.getElementById('carnetPage').classList.add('hidden');
  document.getElementById('adminPage').classList.add('hidden');
  document.getElementById('markerDashboard').classList.add('hidden');
  renderLayout(); renderText(); renderQuestion(); startTimer(); renderExamNavButtons();
}

function getCurrentModule(){ return MODULES[currentModuleId]; }

function getAnswers(){
  if(!currentUser) return {};
  if(!currentUser.answers) currentUser.answers = {};
  if(!currentUser.answers[currentExamId]) currentUser.answers[currentExamId] = {};
  if(!currentUser.answers[currentExamId][currentModuleId]) currentUser.answers[currentExamId][currentModuleId] = {};
  return currentUser.answers[currentExamId][currentModuleId];
}

function renderLayout(){
  const layout = document.getElementById('mainLayout');
  if(currentModuleId==='part1' || currentModuleId==='part5'){
    layout.innerHTML = `<div class="left-panel" id="leftPanel"></div><div class="right-panel"><div class="q-content" id="qContent"></div><div class="q-nav"><button class="nav-btn btn-prev" id="btnPrev" onclick="prevQuestion()">← Əvvəlki</button><div class="question-numbers" id="questionNumbers"></div><button class="nav-btn btn-next" id="btnNext" onclick="nextQuestion()">Növbəti →</button></div></div>`;
  } else if(['part2','part3','part4'].includes(currentModuleId)){
    layout.innerHTML = `<div class="left-panel" id="leftPanel"></div><div class="right-panel"><div class="q-content" id="qContent"></div><div class="q-nav"><button class="nav-btn btn-prev" id="btnPrev" onclick="prevQuestion()">← Əvvəlki</button><div class="question-numbers" id="questionNumbers"></div><button class="nav-btn btn-next" id="btnNext" onclick="nextQuestion()">Növbəti →</button></div></div>`;
  } else if(currentModuleId==='part6'){
    layout.innerHTML = `<div class="left-panel" id="leftPanel"></div><div class="right-panel"><div class="q-content" id="qContent"></div><div class="q-nav"><button class="nav-btn btn-prev" id="btnPrev" onclick="prevQuestion()">← Əvvəlki</button><div class="question-numbers" id="questionNumbers"></div><button class="nav-btn btn-next" id="btnNext" onclick="nextQuestion()">Növbəti →</button></div></div>`;
  } else if(currentModuleId==='part7'){
    layout.innerHTML = `<div class="left-panel" id="leftPanel"></div><div class="right-panel"><div class="right-panel-scroll" id="rightPanelScroll"></div><div class="q-nav"><button class="nav-btn btn-prev" id="btnPrev" onclick="prevQuestion()">← Əvvəlki</button><div class="question-numbers" id="questionNumbers"></div><button class="nav-btn btn-next" id="btnNext" onclick="nextQuestion()">Növbəti →</button></div></div>`;
  }
  const transitionHTML = `<div class="transition-screen" id="transitionScreen"><div class="transition-card"><div class="transition-icon">🎯</div><div class="transition-title" id="tTitle">Modul Tamamlandı!</div><div class="transition-text" id="tText"></div><div class="transition-stats"><div class="stats-title">📊 İCMAL</div><div class="stats-grid"><div class="stat-box"><div class="stat-value" id="statAnswered">0</div><div class="stat-label">Cavablanan</div></div><div class="stat-box"><div class="stat-value" id="statRemaining">0</div><div class="stat-label">Boş</div></div><div class="stat-box"><div class="stat-value" id="statModule">—</div><div class="stat-label">Modul</div></div></div></div><div class="transition-buttons"><button class="btn-review" onclick="reviewCurrent()">↻ Geri Qayıt</button><button class="btn-continue" id="btnContinue" onkeypress="if(event.key==='Enter')continueToNext()">Növbəti Parta Keç →</button></div></div></div>`;
  const resultsHTML = `<div class="results-screen" id="resultsScreen"><div class="results-card"><div class="results-emoji" id="rEmoji">🏆</div><div class="results-title" id="rTitle">İmtahan Tamamlandı!</div><div class="results-score"><span id="rScore">0</span>/<span id="rTotal">0</span></div><div class="results-msg" id="rMsg"></div><div class="results-breakdown" id="rBreakdown"></div><div class="final-review" id="finalReview"></div><button class="btn-carnet" onclick="showCarnet()" onkeypress="if(event.key==='Enter')showCarnet()">📜 NƏTİCƏ VƏRƏQİ</button><button class="btn-restart" onclick="backToExams()" onkeypress="if(event.key==='Enter')backToExams()">🏠 İmtahanlara Qayıt</button></div></div>`;
  layout.insertAdjacentHTML('beforeend', transitionHTML);
  layout.insertAdjacentHTML('beforeend', resultsHTML);
}

function renderQuestionNumbers(){
  const mod = getCurrentModule();
  const answers = getAnswers();
  const items = mod.questions || mod.gaps || [];
  const container = document.getElementById('questionNumbers');
  if(!container) return;
  let html = '<div class="q-numbers-grid">';
  items.forEach((it, idx) => {
    const isAnswered = answers[it.num] !== undefined && answers[it.num] !== '';
    const isCurrent = idx === currentQ;
    html += `<div class="q-num ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}" onclick="goToQuestion(${idx})">${it.num}</div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

function goToQuestion(idx){ currentQ = idx; renderQuestion(); renderText(); }

function renderText(){
  const mod = getCurrentModule();
  const left = document.getElementById('leftPanel');
  if(!left) return;
  let html = '';
  if(mod.title) html += `<h2>${mod.title}</h2>`;
  if(mod.subtitle) html += `<div class="subtitle">${mod.subtitle}</div>`;
  if(mod.instructions) html += `<div class="instructions">${mod.instructions}</div>`;
  if(currentModuleId==='part1'){
    html += '<div class="article">';
    mod.paragraphs.forEach(p => {
      let t = p.replace(/\((\d+)\)\s*_{3,}/g, (match, num) => {
        const answers = getAnswers();
        const ans = answers[num];
        const isCurrent = mod.questions[currentQ]?.num === parseInt(num);
        return `<span class="gap-inline"><span class="gap-num ${isCurrent ? 'active-gap' : ''}">${num}</span><span class="gap-box ${ans ? 'filled' : 'empty'}">${ans || '___'}</span></span>`;
      });
      html += `<p>${t}</p>`;
    });
    html += '</div>';
  } else if(['part2','part3'].includes(currentModuleId)){
    html += '<div class="article">';
    mod.paragraphs.forEach(p => {
      let t = p.replace(/\((\d+)\)\s*_{3,}/g, (match, num) => {
        const answers = getAnswers();
        const ans = answers[num];
        const isCurrent = mod.gaps[currentQ]?.num === parseInt(num);
        return `<span class="gap-inline"><span class="gap-num ${isCurrent ? 'active-gap' : ''}">${num}</span><span class="gap-box ${ans ? 'filled' : 'empty'}">${ans || '___'}</span></span>`;
      });
      html += `<p>${t}</p>`;
    });
    html += '</div>';
  } else if(currentModuleId==='part4'){
    html += '<div class="article"><p style="font-size:14px;color:#666">Hər sual üçün açar sözdən istifadə edərək cümləni tamamlayın.</p></div>';
  } else if(currentModuleId==='part5'){
    html += '<div class="article">';
    mod.paragraphs.forEach(p => { html += `<p>${p}</p>`; });
    html += '</div>';
  } else if(currentModuleId==='part6'){
    html += '<div class="article">';
    mod.paragraphs.forEach(p => {
      let t = p.replace(/\((\d+)\)\s*_{3,}/g, (match, num) => {
        const answers = getAnswers();
        const ans = answers[num];
        const isCurrent = mod.questions[currentQ]?.num === parseInt(num);
        return `<span class="gap-inline"><span class="gap-num ${isCurrent ? 'active-gap' : ''}">${num}</span><span class="gap-box ${ans ? 'filled' : 'empty'}">${ans || '___'}</span></span>`;
      });
      html += `<p>${t}</p>`;
    });
    html += '</div>';
  } else if(currentModuleId==='part7'){
    html += '<div class="article">';
    Object.entries(mod.people).forEach(([key, person]) => {
      html += `<div style="margin-bottom:20px;padding:15px;background:#f9fafb;border-radius:8px;border-left:4px solid #1a1a2e"><h4 style="font-family:'Merriweather',serif;color:#1a1a2e;margin-bottom:8px">${person.name} (${key})</h4><p style="font-size:14px;line-height:1.7;color:#444">${person.text}</p></div>`;
    });
    html += '</div>';
  }
  left.innerHTML = html;
}

function renderQuestion(){
  const mod = getCurrentModule();
  document.getElementById('moduleNum').textContent = mod.moduleNum;
  document.getElementById('moduleTitle').textContent = `Part ${mod.moduleNum}`;
  document.getElementById('moduleSubtitle').textContent = mod.moduleSubtitle || '';
  if(currentModuleId==='part7'){ renderPart7(); return; }
  const qContent = document.getElementById('qContent');
  if(!qContent) return;
  const items = mod.questions || mod.gaps;
  const item = items[currentQ];
  const answers = getAnswers();
  let html = `<div class="q-card"><div class="q-card-header"><div class="q-number">${item.num}</div><div class="q-title">${item.text || mod.moduleTitle}</div></div>`;
  if(currentModuleId==='part1'){
    html += `<ul class="q-options">`;
    Object.entries(item.options).forEach(([optKey, optText]) => {
      const isSelected = answers[item.num] === optKey;
      html += `<li class="q-option ${isSelected ? 'selected' : ''}" onclick="selectOption('${optKey}')"><div class="opt-radio"></div><span class="opt-letter">${optKey}</span><span class="opt-text">${optText}</span></li>`;
    });
    html += `</ul>`;
  } else if(['part2','part3'].includes(currentModuleId)){
    if(item.given) html += `<div class="q-word-given"><span class="kw-label">Açar söz:</span> ${item.given}</div>`;
    html += `<div class="q-input-area"><label>Cavabınız:</label><input type="text" class="q-main-input" id="gapInput" value="${answers[item.num] || ''}" oninput="handleInput(this.value)" placeholder="CAVAB"></div>`;
  } else if(currentModuleId==='part4'){
    html += `<div style="background:#f9fafb;padding:15px;border-radius:8px;margin-bottom:15px"><div style="font-size:14px;color:#333;margin-bottom:10px">${item.first}</div><div class="q-word-given"><span class="kw-label">Açar söz:</span> ${item.keyword}</div><div style="font-size:14px;color:#333">${item.secondPre} <span style="font-weight:700;color:#2563eb">[ ... ]</span> ${item.secondPost}</div></div><div class="q-input-area"><label>Tamamlayın (2-5 söz):</label><input type="text" class="q-main-input" id="gapInput" value="${answers[item.num] || ''}" oninput="handleInput(this.value)" placeholder="BURAYA YAZIN"></div>`;
  } else if(currentModuleId==='part5'){
    html += `<ul class="q-options">`;
    Object.entries(item.options).forEach(([optKey, optText]) => {
      const isSelected = answers[item.num] === optKey;
      html += `<li class="q-option ${isSelected ? 'selected' : ''}" onclick="selectOption('${optKey}')"><div class="opt-radio"></div><span class="opt-letter">${optKey}</span><span class="opt-text">${optText}</span></li>`;
    });
    html += `</ul>`;
  } else if(currentModuleId==='part6'){
    html += `<div style="font-size:13px;color:#666;margin-bottom:12px">Boşluq üçün uyğun cümləni seçin:</div><ul class="q-options">`;
    Object.entries(mod.options).forEach(([optKey, optText]) => {
      const isSelected = answers[item.num] === optKey;
      html += `<li class="q-option ${isSelected ? 'selected' : ''}" onclick="selectOption('${optKey}')"><div class="opt-radio"></div><span class="opt-letter">${optKey}</span><span class="opt-text">${optText}</span></li>`;
    });
    html += `</ul>`;
  }
  html += `</div>`;
  qContent.innerHTML = html;
  const inp = document.getElementById('gapInput');
  if(inp){ inp.focus(); }
  updateNav(); renderQuestionNumbers(); updateProgress();
}

function renderPart7(){
  const mod = getCurrentModule();
  const scroll = document.getElementById('rightPanelScroll');
  if(!scroll) return;
  const answers = getAnswers();
  let html = `<div style="display:flex;flex-direction:column;gap:15px">`;
  mod.questions.forEach((q, idx) => {
    const ans = answers[q.num];
    html += `<div class="q-card" style="padding:15px"><div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px"><div class="q-number" style="width:32px;height:32px;font-size:13px">${q.num}</div><div style="font-size:13px;font-weight:600;color:#1a1a2e;line-height:1.4">${q.text}</div></div><div style="display:flex;gap:6px">`;
    ['A','B','C','D'].forEach(opt => {
      const isSelected = ans === opt;
      html += `<button class="nav-btn ${isSelected ? 'btn-next' : 'btn-prev'}" style="padding:6px 12px;font-size:12px" onclick="selectPart7Option(${q.num}, '${opt}')">${opt}</button>`;
    });
    html += `</div></div>`;
  });
  html += `</div>`;
  scroll.innerHTML = html;
  updateNav(); renderQuestionNumbers(); updateProgress();
}

function selectPart7Option(qNum, opt){
  const answers = getAnswers();
  answers[qNum] = opt;
  saveSession(currentUser);
  renderPart7(); renderText();
  if(isModuleComplete()) showTransitionScreen();
}

function selectOption(optKey){
  const mod = getCurrentModule();
  const items = mod.questions || mod.gaps;
  const item = items[currentQ];
  const answers = getAnswers();
  answers[item.num] = optKey;
  saveSession(currentUser);
  renderQuestion(); renderText();
  clearTimeout(autoAdvanceTimer);
  if(currentQ < items.length - 1){
    autoAdvanceTimer = setTimeout(() => { nextQuestion(); }, 400);
  } else {
    if(isModuleComplete()) setTimeout(showTransitionScreen, 500);
  }
}

function handleInput(val){
  const mod = getCurrentModule();
  const items = mod.questions || mod.gaps;
  const item = items[currentQ];
  const answers = getAnswers();
  answers[item.num] = val.toUpperCase();
  saveSession(currentUser);
  renderText(); updateProgress(); renderQuestionNumbers();
}

function updateNav(){
  const mod = getCurrentModule();
  const items = mod.questions || mod.gaps;
  const prevBtn = document.getElementById('btnPrev');
  const nextBtn = document.getElementById('btnNext');
  if(!prevBtn || !nextBtn) return;
  prevBtn.disabled = currentQ === 0;
  if(currentQ === items.length - 1){
    const nextId = getNextModuleId();
    nextBtn.textContent = nextId ? 'Növbəti Part →' : 'Tamamla 🏁';
    nextBtn.className = 'nav-btn btn-finish';
  } else {
    nextBtn.textContent = 'Növbəti →';
    nextBtn.className = 'nav-btn btn-next';
  }
}

function prevQuestion(){ if(currentQ > 0){ currentQ--; renderQuestion(); renderText(); } }

function nextQuestion(){
  const mod = getCurrentModule();
  const items = mod.questions || mod.gaps;
  if(currentQ < items.length - 1){
    currentQ++; renderQuestion(); renderText();
  } else {
    showTransitionScreen();
  }
}

function updateProgress(){
  const mod = getCurrentModule();
  const items = mod.questions || mod.gaps;
  const answers = getAnswers();
  const answered = items.filter(it => answers[it.num] !== undefined && answers[it.num] !== '').length;
  const total = items.length;
  const pct = Math.round((answered / total) * 100);
  const fill = document.getElementById('progressFill');
  const text = document.getElementById('progressText');
  if(fill) fill.style.width = `${pct}%`;
  if(text) text.textContent = `${answered}/${total}`;
}

function isModuleComplete(){
  const mod = getCurrentModule();
  const items = mod.questions || mod.gaps;
  const answers = getAnswers();
  return items.every(it => answers[it.num] !== undefined && answers[it.num] !== '');
}

function getNextModuleId(){
  const exam = EXAMS[currentExamId];
  const idx = exam.parts.indexOf(currentModuleId);
  return idx < exam.parts.length - 1 ? exam.parts[idx + 1] : null;
}

function showTransitionScreen(){
  const mod = getCurrentModule();
  const items = mod.questions || mod.gaps;
  const answers = getAnswers();
  const answered = items.filter(it => answers[it.num] !== undefined && answers[it.num] !== '').length;
  const remaining = items.length - answered;
  document.getElementById('statAnswered').textContent = answered;
  document.getElementById('statRemaining').textContent = remaining;
  document.getElementById('statModule').textContent = `Part ${mod.moduleNum}`;
  const nextId = getNextModuleId();
  if(nextId){
    const nextMod = MODULES[nextId];
    document.getElementById('tTitle').textContent = `Part ${mod.moduleNum} Tamamlandı!`;
    document.getElementById('tText').textContent = `Növbəti: Part ${nextMod.moduleNum} — ${nextMod.moduleTitle}`;
    document.getElementById('btnContinue').textContent = `Part ${nextMod.moduleNum}-ə Keç →`;
    document.getElementById('btnContinue').onclick = continueToNext;
  } else {
    document.getElementById('tTitle').textContent = `İmtahan Tamamlandı!`;
    document.getElementById('tText').textContent = `Bütün partlar tamamlandı! Nəticələri görmək istəyirsiniz?`;
    document.getElementById('btnContinue').textContent = 'Nəticələri Gör →';
    document.getElementById('btnContinue').onclick = showFinalResults;
  }
  document.getElementById('transitionScreen').classList.add('show');
}

function reviewCurrent(){
  document.getElementById('transitionScreen').classList.remove('show');
  currentQ = 0;
  renderText(); renderQuestion();
}

function continueToNext(){
  document.getElementById('transitionScreen').classList.remove('show');
  const nextId = getNextModuleId();
  if(nextId){ currentModuleId = nextId; currentQ = 0; renderLayout(); renderText(); renderQuestion(); renderExamNavButtons(); }
  else showFinalResults();
}

function normalizeAnswer(t){ return t ? t.trim().toUpperCase().replace(/\s+/g, ' ') : ''; }

async function showFinalResults(){
  const exam = EXAMS[currentExamId];
  const pointsData = await dbQuery('exam_points', { exam_id: currentExamId });
  const pointsMap = {};
  pointsData.forEach(p => {
    if(!pointsMap[p.part_id]) pointsMap[p.part_id] = {};
    pointsMap[p.part_id][p.question_num] = parseFloat(p.points) || 1;
  });
  let totalCorrect = 0, totalPoints = 0, earnedPoints = 0, totalQ = 0;
  const breakdown = [], review = [];
  for(const pid of exam.parts){
    const m = MODULES[pid];
    const answers = currentUser.answers?.[currentExamId]?.[pid] || {};
    const items = m.questions || m.gaps || [];
    let pCorrect = 0, pEarned = 0;
    for(const it of items){
      totalQ++;
      const pt = parseFloat(pointsMap[pid]?.[it.num]) || 1;
      totalPoints += pt;
      let correct = false;
      if(m.questions && m.questions.includes(it)) correct = answers[it.num] === it.answer;
      else if(m.gaps && m.gaps.includes(it)) correct = normalizeAnswer(answers[it.num]) === it.answer;
      if(correct){ pCorrect++; pEarned += pt; totalCorrect++; }
      review.push({ part: pid, num: it.num, userAns: answers[it.num] || '—', correct: correct, answer: it.answer, points: pt, earned: correct ? pt : 0, given: it.given, personName: pid === 'part7' ? m.people[it.answer]?.name : null, explanation: it.explanation });
    }
    breakdown.push({ label: `Part ${m.moduleNum}`, score: pCorrect, total: items.length, points: pEarned, maxPoints: items.reduce((s, it) => s + (parseFloat(pointsMap[pid]?.[it.num]) || 1), 0) });
    earnedPoints += pEarned;
  }
  const pct = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  let grade, gradeText;
  if(pct >= 90){ grade = 5; gradeText = 'Əla'; }
  else if(pct >= 75){ grade = 4; gradeText = 'Yaxşı'; }
  else if(pct >= 60){ grade = 3; gradeText = 'Orta'; }
  else if(pct >= 40){ grade = 2; gradeText = 'Qənaətbəxş'; }
  else { grade = 1; gradeText = 'Qeyri-qənaətbəxş'; }
  const scoreRecord = await dbInsert('scores', { user_id: currentUser.id, exam_id: currentExamId, total_points: earnedPoints, max_points: totalPoints, percent: pct, correct_count: totalCorrect, total_questions: totalQ, grade: grade, grade_text: gradeText });
  if(scoreRecord){
    const answerRecords = review.map(r => ({ score_id: scoreRecord.id, part_id: r.part, question_num: r.num, user_answer: r.userAns, correct_answer: r.answer, is_correct: r.correct, points: r.earned, max_points: r.points }));
    if(answerRecords.length > 0) await apiPost('answers', answerRecords);
  }
  if(!currentUser.scores) currentUser.scores = {};
  currentUser.scores[currentExamId] = { correct: totalCorrect, total: totalQ, points: earnedPoints, maxPoints: totalPoints, percent: pct, grade: grade, gradeText: gradeText, date: Date.now(), breakdown: breakdown, review: review };
  saveSession(currentUser);
  let emoji, msg;
  if(pct >= 90){ emoji = '🏆'; msg = 'Mükəmməl nəticə!'; }
  else if(pct >= 75){ emoji = '🎉'; msg = 'Əla iş!'; }
  else if(pct >= 60){ emoji = '💪'; msg = 'Yaxşı nəticə!'; }
  else if(pct >= 40){ emoji = '📚'; msg = 'Orta səviyyə.'; }
  else { emoji = '💪'; msg = 'Daha çox çalışın!'; }
  document.getElementById('rEmoji').textContent = emoji;
  document.getElementById('rTitle').textContent = 'İmtahan Tamamlandı!';
  document.getElementById('rScore').textContent = `${earnedPoints}`;
  document.getElementById('rTotal').textContent = `${totalPoints} bal (${pct}%)`;
  document.getElementById('rMsg').textContent = `${msg} Qiymət: ${grade} (${gradeText})`;
  let bhtml = '';
  breakdown.forEach(b => { bhtml += `<div class="breakdown-item"><div class="b-label">${b.label}</div><div class="b-score"><span>${b.points}</span>/${b.maxPoints}</div></div>`; });
  document.getElementById('rBreakdown').innerHTML = bhtml;
  let rhtml = '';
  exam.parts.forEach(pid => {
    const m = MODULES[pid];
    const partReview = review.filter(r => r.part === pid);
    rhtml += `<div class="final-review-section"><h4>Part ${m.moduleNum} — ${partReview.filter(r => r.correct).length}/${partReview.length}</h4>`;
    partReview.forEach(r => {
      rhtml += `<div class="final-review-item ${r.correct ? 'correct' : 'incorrect'}"><span class="fr-num">${r.num}</span><span class="fr-icon">${r.correct ? '✅' : '❌'}</span>`;
      if(r.correct) rhtml += `<span class="fr-user" style="color:#16a34a">${r.answer}${r.personName ? ' — ' + r.personName : ''}</span>`;
      else rhtml += `<span class="fr-user wrong">${r.userAns}</span><span style="color:#999">→</span><span class="fr-correct">${r.answer}${r.personName ? ' — ' + r.personName : ''}</span><div style="font-size:11px;color:#f59e0b;margin-top:4px">💡 ${r.explanation || ''}</div>`;
      rhtml += `</div>`;
    });
    rhtml += `</div>`;
  });
  document.getElementById('finalReview').innerHTML = rhtml;
  document.getElementById('resultsScreen').classList.add('show');
  stopTimer();
}

async function showCarnet(){
  document.getElementById('resultsScreen')?.classList.remove('show');
  document.getElementById('examPage')?.classList.add('hidden');
  document.getElementById('carnetPage')?.classList.remove('hidden');
  hideExamNavButtons();
  let examId = currentExamId;
  if(!examId){
    const scores = await dbQuery('scores', { user_id: currentUser.id });
    if(scores.length > 0) examId = scores[scores.length - 1].exam_id;
  }
  if(!examId){ alert('Nəticə tapılmadı!'); backToExams(); return; }
  currentExamId = examId;
  let scores = await dbQuery('scores', { user_id: currentUser.id, exam_id: examId });
  let score = scores.length > 0 ? scores[0] : null;
  if(!score && currentUser.scores && currentUser.scores[examId]){
    const sc = currentUser.scores[examId];
    score = { id: 'local_' + examId, user_id: currentUser.id, exam_id: examId, total_points: sc.points, max_points: sc.maxPoints, percent: sc.percent, grade: sc.grade, created_at: new Date(sc.date).toISOString() };
  }
  if(!score){ alert('Nəticə tapılmadı!'); backToExams(); return; }
  let answers = await dbQuery('answers', { score_id: score.id });
  if((!answers || answers.length === 0) && currentUser.scores && currentUser.scores[examId]?.review){
    answers = currentUser.scores[examId].review.map(r => ({
      part_id: r.part,
      question_num: r.num,
      user_answer: r.userAns,
      correct_answer: r.answer,
      is_correct: r.correct,
      points: r.earned,
      max_points: r.points
    }));
  }
  const exam = EXAMS[examId];
  const date = new Date(score.created_at).toLocaleString('az-AZ');
  let html = `<div class="carnet-card"><div class="carnet-header"><div class="school">CAMBRIDGE FCE PLATFORM</div><h1>📜 NƏTİCƏ VƏRƏQİ</h1><div style="font-size:14px;color:#6b7280;margin-top:6px">${exam.title}</div></div><div class="carnet-student"><div><strong>Ad Soyad:</strong> ${currentUser.name}</div><div><strong>Email:</strong> ${currentUser.email}</div><div><strong>Tarix:</strong> ${date}</div></div><div class="carnet-total"><div class="total-label">Nəticə</div><div class="grade-badge grade-${score.grade}" style="font-size:24px">${score.total_points}/${score.max_points} (${score.percent}%)</div></div><table class="carnet-table"><thead><tr><th>Part</th><th>Sual</th><th>Cavab</th><th>Düzgün</th><th>Bal</th></tr></thead><tbody>`;
  answers.forEach(a => {
    const m = MODULES[a.part_id];
    const rowClass = a.is_correct ? 'correct-row' : 'incorrect-row';
    html += `<tr class="${rowClass}"><td>Part ${m.moduleNum}</td><td>${a.question_num}</td><td>${a.user_answer || '—'}</td><td>${a.correct_answer}</td><td><strong>${a.points}/${a.max_points}</strong></td></tr>`;
  });
  html += `</tbody></table></div><div class="carnet-actions"><button class="btn-restart" onclick="backToExams()" onkeypress="if(event.key==='Enter')backToExams()">🏠 İmtahanlara Qayıt</button><button class="btn-carnet" onclick="window.print()" onkeypress="if(event.key==='Enter')window.print()">🖨️ Çap et</button></div>`;
  document.getElementById('carnetPage').innerHTML = html;
}

function backToExams(){
  document.getElementById('examPage').classList.add('hidden');
  document.getElementById('carnetPage').classList.add('hidden');
  document.getElementById('adminPage').classList.add('hidden');
  document.getElementById('markerDashboard').classList.add('hidden');
  document.getElementById('resultsScreen')?.classList.remove('show');
  hideExamNavButtons();
  showExamList();
}

function startTimer(){
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    seconds++;
    const m = Math.floor(seconds/60).toString().padStart(2, '0');
    const s = (seconds%60).toString().padStart(2, '0');
    const timerEl = document.getElementById('timerDisplay');
    if(timerEl) timerEl.textContent = `${m}:${s}`;
  }, 1000);
}
function stopTimer(){ clearInterval(timerInterval); }

// ==================== ADMIN ====================
async function showAdmin(){
  document.getElementById('examListPage').classList.add('hidden');
  document.getElementById('examPage').classList.add('hidden');
  document.getElementById('carnetPage').classList.add('hidden');
  document.getElementById('markerDashboard').classList.add('hidden');
  document.getElementById('adminPage').classList.remove('hidden');
  hideExamNavButtons();
  await renderAdminUsers();
  renderAdminExams();
  renderPointsExamSelect();
  await renderStudentResultsList();
  renderMarkersList();
  renderMarkerUserSelect();
  const pdfInput = document.getElementById('pdfUpload');
  if(pdfInput) pdfInput.addEventListener('change', handlePDFUpload);
}

function switchAdminTab(tab, event){
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  if(event) event.target.classList.add('active');
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.getElementById('admin' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
  if(tab === 'users') renderAdminUsers();
  if(tab === 'exams') renderAdminExams();
  if(tab === 'upload') renderPDFUpload();
  if(tab === 'points') renderPointsExamSelect();
  if(tab === 'results') renderStudentResultsList();
  if(tab === 'markers'){ renderMarkersList(); renderMarkerUserSelect(); }
}

function renderPDFUpload(){
  document.getElementById('uploadStatus').textContent = 'PDF faylını seçin və yükləyin.';
}

async function handlePDFUpload(event){
  const file = event.target.files[0];
  if(!file) return;
  const statusEl = document.getElementById('uploadStatus');
  statusEl.textContent = 'PDF oxunur...';
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for(let i=1; i<=pdf.numPages; i++){
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    statusEl.textContent = 'İmtahan yaradılır...';
    const newExamId = 'exam_' + Date.now();
    const examData = parsePDFAndCreateExam(fullText, newExamId, file.name);
    EXAMS[newExamId] = examData;
    statusEl.textContent = `✅ İmtahan uğurla yükləndi: ${examData.title}`;
    renderAdminExams(); renderPointsExamSelect();
  } catch(error){
    console.error('PDF oxuma xətası:', error);
    statusEl.textContent = '❌ Xəta baş verdi: PDF oxunmadı.';
  }
}

function parsePDFAndCreateExam(text, examId, fileName){
  const title = fileName.replace('.pdf', '') || 'Yeni İmtahan';
  return { id: examId, title: title, icon: '📄', description: 'Yüklənmiş PDF imtahanı', parts: ['part1','part2','part3','part4','part5','part6','part7'] };
}

async function renderAdminUsers(){
  const tbody = document.getElementById('usersTableBody');
  const users = await dbQuery('users');
  tbody.innerHTML = '';
  for(const user of users){
    const scores = await dbQuery('scores', { user_id: user.id });
    const totalPoints = scores.reduce((sum, s) => sum + (s.total_points || 0), 0);
    const maxPoints = scores.reduce((sum, s) => sum + (s.max_points || 0), 0);
    const roleBadge = user.role === 'admin' ? '<span class="user-role role-admin">Admin</span>' : user.role === 'marker' ? '<span class="user-role role-marker">Marker</span>' : '<span class="user-role role-student">Şagird</span>';
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><strong>${user.name}</strong></td><td>${user.email}</td><td>${roleBadge}</td><td>${scores.length} imtahan</td><td>${totalPoints}/${maxPoints}</td><td><button class="btn-sm btn-view" onclick="viewUserResults('${user.email}')">Nəticələr</button>${user.email !== 'admin@fce.com' ? `<button class="btn-sm btn-del" onclick="deleteUser('${user.id}')">Sil</button>` : ''}</td>`;
    tbody.appendChild(tr);
  }
}

async function viewUserResults(email){
  const users = await dbQuery('users', { email: email });
  if(users.length === 0) return;
  const user = users[0];
  const scores = await dbQuery('scores', { user_id: user.id });
  if(scores.length === 0){ alert(`${user.name} hələ heç bir imtahan verməyib.`); return; }
  let msg = `📊 ${user.name} (${user.email})\n\n`;
  scores.forEach(s => {
    const exam = EXAMS[s.exam_id];
    msg += `• ${exam?.title || s.exam_id}: ${s.total_points}/${s.max_points} (${s.percent}%) — Qiymət: ${s.grade}\n`;
  });
  alert(msg);
}

async function deleteUser(userId){
  if(!confirm('Bu istifadəçini silmək istədiyinizə əminsiniz?')) return;
  await dbDelete('users', userId);
  renderAdminUsers();
}

function renderAdminExams(){
  const tbody = document.getElementById('examsTableBody');
  tbody.innerHTML = '';
  Object.values(EXAMS).forEach(exam => {
    const totalQ = exam.parts.reduce((s, pid) => s + (MODULES[pid].questions?.length || MODULES[pid].gaps?.length || 0), 0);
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><code>${exam.id}</code></td><td><strong>${exam.icon} ${exam.title}</strong></td><td>${exam.parts.length} Part</td><td>${totalQ} sual</td>`;
    tbody.appendChild(tr);
  });
}

function renderPointsExamSelect(){
  const sel = document.getElementById('pointsExamSelect');
  sel.innerHTML = '';
  Object.values(EXAMS).forEach(exam => {
    sel.innerHTML += `<option value="${exam.id}">${exam.title}</option>`;
  });
  renderPointsEditor();
}

async function renderPointsEditor(){
  const examId = document.getElementById('pointsExamSelect').value;
  const exam = EXAMS[examId];
  if(!exam) return;
  const container = document.getElementById('pointsEditor');
  const pointsData = await dbQuery('exam_points', { exam_id: examId });
  const pointsMap = {};
  pointsData.forEach(p => {
    if(!pointsMap[p.part_id]) pointsMap[p.part_id] = {};
    pointsMap[p.part_id][p.question_num] = parseFloat(p.points) || 1;
  });
  let html = '';
  exam.parts.forEach(pid => {
    const m = MODULES[pid];
    const items = m.questions || m.gaps || [];
    if(!pointsMap[pid]) pointsMap[pid] = {};
    html += `<div style="margin-bottom:20px"><h4 style="font-family:'Merriweather',serif;color:#1a1a2e;margin-bottom:12px">Part ${m.moduleNum} — ${m.moduleTitle}</h4><table class="exams-table"><thead><tr><th>Sual №</th><th>Düzgün cavab</th><th>Bal</th></tr></thead><tbody>`;
    items.forEach(it => {
      const pt = pointsMap[pid][it.num] ?? 1;
      html += `<tr><td><strong>${it.num}</strong></td><td>${it.answer}</td><td><input type="number" class="points-input" data-pid="${pid}" data-num="${it.num}" value="${pt}" min="0" max="10" step="0.5"></td></tr>`;
    });
    html += `</tbody></table><button class="save-points-btn" onclick="savePointsForPart('${examId}','${pid}')">💾 Bütün Balları Yadda Saxla</button></div>`;
  });
  container.innerHTML = html;
}

async function savePointsForPart(examId, pid){
  const inputs = document.querySelectorAll(`.points-input[data-pid="${pid}"]`);
  for(const inp of inputs){
    const num = parseInt(inp.dataset.num);
    const val = parseFloat(inp.value) || 0;
    const existing = await dbQuery('exam_points', { exam_id: examId, part_id: pid, question_num: num });
    if(existing.length > 0) await dbUpdate('exam_points', existing[0].id, { points: val });
    else await dbInsert('exam_points', { exam_id: examId, part_id: pid, question_num: num, points: val });
  }
  alert('✅ Ballar uğurla yadda saxlanıldı!');
}

async function renderStudentResultsList(){
  const container = document.getElementById('studentResultsList');
  const students = await dbQuery('users', { role: 'student' });
  if(students.length === 0){ container.innerHTML = '<div class="no-data">Heç bir şagird yoxdur</div>'; return; }
  let html = '<div style="display:grid;gap:16px">';
  for(const user of students){
    const scores = await dbQuery('scores', { user_id: user.id });
    const totalPoints = scores.reduce((sum, s) => sum + (s.total_points || 0), 0);
    const maxPoints = scores.reduce((sum, s) => sum + (s.max_points || 0), 0);
    html += `<div style="background:#f9fafb;padding:16px;border-radius:10px;border-left:4px solid #2563eb"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><strong style="font-size:16px">${user.name}</strong><span style="font-size:13px;color:#666">${user.email}</span></div><div style="font-size:13px;color:#666;margin-bottom:8px">Tamamlanan imtahan: ${scores.length} • Ümumi bal: <strong style="color:#1a1a2e">${totalPoints}/${maxPoints}</strong></div>`;
    if(scores.length > 0){
      html += `<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">`;
      scores.forEach(sc => {
        const exam = EXAMS[sc.exam_id];
        html += `<button class="btn-sm btn-view" onclick="viewCarnetFromAdmin('${user.email}','${sc.exam_id}')">📜 ${exam?.title || sc.exam_id} — ${sc.total_points}/${sc.max_points} (${sc.percent}%)</button>`;
      });
      html += `</div>`;
    } else {
      html += `<div style="margin-top:10px;font-size:13px;color:#9ca3af;font-style:italic">Hələ nəticə yoxdur</div>`;
    }
    html += `</div>`;
  }
  html += '</div>';
  container.innerHTML = html;
}

async function viewCarnetFromAdmin(email, examId){
  const users = await dbQuery('users', { email: email });
  if(users.length === 0) return;
  const user = users[0];
  const scores = await dbQuery('scores', { user_id: user.id, exam_id: examId });
  if(scores.length === 0) return;
  const score = scores[0];
  const answers = await dbQuery('answers', { score_id: score.id });
  const exam = EXAMS[examId];
  const date = new Date(score.created_at).toLocaleString('az-AZ');
  const isMarker = currentUser && currentUser.role === 'marker';
  const isAdmin = currentUser && currentUser.role === 'admin';
  const canEdit = isMarker || isAdmin;
  let html = `<div style="padding:20px"><div style="background:#fff;border-radius:16px;padding:30px;box-shadow:0 4px 20px rgba(0,0,0,0.1)"><div style="text-align:center;border-bottom:3px double #1a1a2e;padding-bottom:20px;margin-bottom:24px"><div style="font-size:12px;color:#6b7280;letter-spacing:2px;text-transform:uppercase">CAMBRIDGE FCE PLATFORM — ${canEdit ? 'Marker/Admin' : 'Admin'} baxış</div><h1 style="font-family:Merriweather,serif;color:#1a1a2e">📜 NƏTİCƏ VƏRƏQİ</h1><div style="font-size:14px;color:#6b7280;margin-top:6px">${exam.title}</div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;padding:16px;background:#f9fafb;border-radius:10px"><div><strong>Ad:</strong> ${user.name}</div><div><strong>Email:</strong> ${user.email}</div><div><strong>Tarix:</strong> ${date}</div><div><strong>Nəticə:</strong> <span id="carnetTotalDisplay">${score.total_points}/${score.max_points} (${score.percent}%)</span></div></div><div style="background:linear-gradient(135deg,#1a1a2e,#2d2d4e);color:#fff;padding:24px;border-radius:12px;text-align:center;margin-bottom:24px"><div style="font-size:14px;opacity:0.8;margin-bottom:8px">Yekun Nəticə</div><div id="carnetGradeBadge" style="display:inline-block;padding:16px 32px;border-radius:12px;font-size:28px;font-weight:900;background:#dc2626;color:#fff">${score.total_points}/${score.max_points} (${score.percent}%)</div></div><table style="width:100%;border-collapse:collapse" id="carnetTable"><thead><tr><th style="padding:12px;text-align:left;background:#1a1a2e;color:#fbbf24;font-weight:700">Part</th><th style="padding:12px;text-align:left;background:#1a1a2e;color:#fbbf24;font-weight:700">Sual</th><th style="padding:12px;text-align:left;background:#1a1a2e;color:#fbbf24;font-weight:700">Cavab</th><th style="padding:12px;text-align:left;background:#1a1a2e;color:#fbbf24;font-weight:700">Düzgün</th><th style="padding:12px;text-align:left;background:#1a1a2e;color:#fbbf24;font-weight:700">Status</th><th style="padding:12px;text-align:left;background:#1a1a2e;color:#fbbf24;font-weight:700">Bal</th></tr></thead><tbody>`;
  answers.forEach((a, idx) => {
    const m = MODULES[a.part_id];
    html += `<tr style="background:${a.is_correct ? '#dcfce7' : '#fee2e2'}" id="reviewRow_${idx}"><td style="padding:12px;border-bottom:1px solid #e5e7eb">Part ${m.moduleNum}</td><td style="padding:12px;border-bottom:1px solid #e5e7eb">${a.question_num}</td><td style="padding:12px;border-bottom:1px solid #e5e7eb">${a.user_answer || '—'}</td><td style="padding:12px;border-bottom:1px solid #e5e7eb">${a.correct_answer}</td><td style="padding:12px;border-bottom:1px solid #e5e7eb">${a.is_correct ? '✅ Düzgün' : '❌ Səhv'}</td><td style="padding:12px;border-bottom:1px solid #e5e7eb">`;
    if(canEdit){
      html += `<input type="number" class="marker-score-input" data-idx="${idx}" data-answer-id="${a.id}" data-score-id="${score.id}" data-user-email="${email}" data-exam="${examId}" value="${a.points}" min="0" max="${a.max_points}" step="0.5" style="width:70px;padding:6px;border:2px solid #e5e7eb;border-radius:6px;text-align:center;font-weight:700" onchange="(window.opener || window).updateReviewScore(this)"><span style="font-size:11px;color:#666">/${a.max_points}</span>`;
    } else {
      html += `<strong>${a.points}/${a.max_points}</strong>`;
    }
    html += `</td></tr>`;
  });
  html += `</tbody></table>`;
  if(canEdit){
    html += `<div style="margin-top:20px;text-align:center"><button onclick="(window.opener || window).recalculateAndSaveScore('${email}','${examId}','${score.id}')" style="padding:14px 32px;background:#16a34a;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif">💾 Balları Yenilə və Yadda Saxla</button><p style="font-size:12px;color:#666;margin-top:8px">⚠️ Diqqət: Bu əməliyyat şagirdin ümumi balını və qiymətini yeniləyəcək.</p></div>`;
  }
  html += `</div></div>`;
  const w = window.open('', '_blank', 'width=900,height=800');
  w.document.write(`<html><head><title>NƏTİCƏ VƏRƏQİ — ${user.name}</title><style>body{font-family:'Inter',sans-serif;padding:0;background:#f0f0eb}</style></head><body>${html}</body></html>`);
  w.document.close();
}

async function updateReviewScore(input){
  const idx = parseInt(input.dataset.idx);
  const answerId = input.dataset.answerId;
  const newScore = parseFloat(input.value) || 0;
  const maxPt = parseFloat(input.max) || 1;
  if(newScore > maxPt){ alert(`Maksimum bal ${maxPt}-dir!`); input.value = 0; return; }
  if(newScore < 0){ alert(`Bal mənfi ola bilməz!`); input.value = 0; return; }
  const isCorrect = (newScore === maxPt);
  await dbUpdate('answers', answerId, { points: newScore, is_correct: isCorrect });
  const row = input.closest('tr');
  if(row){
    row.style.background = isCorrect ? '#dcfce7' : '#fee2e2';
    const statusCell = row.cells[4];
    if(statusCell) statusCell.textContent = isCorrect ? '✅ Düzgün' : '❌ Səhv';
  }
}

async function recalculateAndSaveScore(email, examId, scoreId){
  const answers = await dbQuery('answers', { score_id: scoreId });
  let totalEarned = 0, totalMax = 0, correctCount = 0;
  answers.forEach(a => {
    totalMax += (parseFloat(a.max_points) || 1);
    totalEarned += (parseFloat(a.points) || 0);
    if(a.is_correct) correctCount++;
  });
  const pct = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
  let grade, gradeText;
  if(pct >= 90){ grade = 5; gradeText = 'Əla'; }
  else if(pct >= 75){ grade = 4; gradeText = 'Yaxşı'; }
  else if(pct >= 60){ grade = 3; gradeText = 'Orta'; }
  else if(pct >= 40){ grade = 2; gradeText = 'Qənaətbəxş'; }
  else { grade = 1; gradeText = 'Qeyri-qənaətbəxş'; }
  await dbUpdate('scores', scoreId, {
    total_points: totalEarned, max_points: totalMax, percent: pct,
    correct_count: correctCount, grade: grade, grade_text: gradeText,
    marker_edited: true, marker_name: currentUser?.name || 'Marker',
    marker_edited_at: new Date().toISOString()
  });
  try {
    const openerDoc = (window.opener || window)?.document;
    if(openerDoc){
      const totalDisplay = openerDoc.getElementById('carnetTotalDisplay');
      if(totalDisplay) totalDisplay.textContent = `${totalEarned}/${totalMax} (${pct}%)`;
      const gradeBadge = openerDoc.getElementById('carnetGradeBadge');
      if(gradeBadge){
        const colors = {5:'#16a34a', 4:'#2563eb', 3:'#fbbf24', 2:'#f97316', 1:'#dc2626'};
        gradeBadge.style.background = colors[grade] || '#dc2626';
        gradeBadge.style.color = grade === 3 ? '#1a1a2e' : '#fff';
        gradeBadge.textContent = `${totalEarned}/${totalMax} (${pct}%)`;
      }
      if(openerDoc.getElementById('adminResults')?.classList.contains('active')) openerDoc.renderStudentResultsList();
      if(openerDoc.getElementById('markerStudentList')){ openerDoc.renderMarkerStudentList(); openerDoc.renderMarkerStats(); }
    }
  } catch(e){ console.error('UI yeniləmə xətası:', e); }
  alert(`✅ Yaddaşa verildi!\n\nYeni bal: ${totalEarned}/${totalMax} (${pct}%)\nQiymət: ${grade} (${gradeText})`);
}

function renderMarkerUserSelect(){
  const sel = document.getElementById('markerUserSelect');
  sel.innerHTML = '<option value="">— Şagird seçin —</option>';
  dbQuery('users', { role: 'student' }).then(students => {
    students.forEach(u => { sel.innerHTML += `<option value="${u.email}">${u.name} (${u.email})</option>`; });
  });
}

async function makeMarker(){
  const email = document.getElementById('markerUserSelect').value;
  if(!email){ alert('Zəhmət olmasa şagird seçin'); return; }
  const users = await dbQuery('users', { email: email });
  if(users.length === 0){ alert('İstifadəçi tapılmadı'); return; }
  await dbUpdate('users', users[0].id, { role: 'marker' });
  alert(`✅ ${users[0].name} marker təyin olundu!`);
  renderMarkerUserSelect(); renderMarkersList(); renderAdminUsers();
}

async function renderMarkersList(){
  const container = document.getElementById('markersList');
  const markers = await dbQuery('users', { role: 'marker' });
  if(markers.length === 0){ container.innerHTML = '<div class="no-data">Heç bir marker yoxdur</div>'; return; }
  let html = '<h4 style="margin-bottom:12px">Aktiv Markerlər:</h4><div style="display:grid;gap:8px">';
  markers.forEach(m => {
    html += `<div style="background:#fef3c7;padding:12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center"><span><strong>${m.name}</strong> <span style="font-size:12px;color:#666">(${m.email})</span></span><button class="btn-sm btn-del" onclick="removeMarker('${m.email}')">Markerlikdən Çıxar</button></div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

async function removeMarker(email){
  if(!confirm('Bu istifadəçini markerlikdən çıxarmaq istədiyinizə əminsiniz?')) return;
  const users = await dbQuery('users', { email: email });
  if(users.length === 0) return;
  await dbUpdate('users', users[0].id, { role: 'student' });
  renderMarkersList(); renderMarkerUserSelect(); renderAdminUsers();
}

// ==================== INIT ====================
initDB().then(() => { if(currentUser) enterApp(); });