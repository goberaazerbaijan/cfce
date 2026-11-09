// ==================== API KONFİQURASİYASI ====================
const API_URL = 'https://cfce-backend.onrender.com/api';

async function apiGet(endpoint, params = {}) {
  const url = new URL(`${API_URL}/${endpoint}`);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) url.searchParams.append(key, params[key]);
  });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) { console.error(`GET ${endpoint} xətası:`, error); return []; }
}

async function apiPost(endpoint, body) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) { console.error(`POST ${endpoint} xətası:`, error); return null; }
}

async function apiPut(endpoint, id, body) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) { console.error(`PUT ${endpoint}/${id} xətası:`, error); return null; }
}

async function apiDelete(endpoint, id) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return true;
  } catch (error) { console.error(`DELETE ${endpoint}/${id} xətası:`, error); return false; }
}

async function dbQuery(table, filters = {}) {
  if (Object.keys(filters).length > 0) return await apiGet(`${table}/filter`, filters);
  return await apiGet(table);
}

async function dbInsert(table, record) { return await apiPost(table, record); }
async function dbUpdate(table, id, update) { return await apiPut(table, id, update); }
async function dbDelete(table, id) { return await apiDelete(table, id); }

// ==================== DATA ====================
const EXAMS = { fce_full: { id:'fce_full', title:'FCE Full Practice Test', icon:'📚', description:'Tam FCE Reading & Use of English imtahanı (7 Part)', parts:['part1','part2','part3','part4','part5','part6','part7'] } };

const part1Data = { id:'part1',moduleNum:1,moduleTitle:"Part 1 — Multiple Choice Cloze",moduleSubtitle:"Hər boşluq üçün ən uyğun variantı seçin",title:"The world's deepest underwater cave?",subtitle:"Test 1 — Reading and Use of English",instructions:"For questions <strong>1–8</strong>, decide which answer (<strong>A, B, C or D</strong>) best fits each gap.",paragraphs:['Polish explorer Krzysztof Starnawski (0) [keeps] returning to Hranická Propast, an underwater cave in the Czech Republic. His fascination with the cave began during his first dive there, when he started to (1) _______ that it might be possible to go far deeper than any other dive had ever taken him before.','Returning a few years later, Starnawski dived to 200 m, but was stopped by a narrow passage in the rock that (2) _______ to a tunnel. He lowered a probe – a weight on the end of a long rope – and still didn\'t hit the bottom of the cave.','On his next visit, the following year, he found that the passage had widened (3) _______. He swam through it down to 265 m. Then Starnawski went back again, (4) _______ by a remotely-operated underwater robot, which (5) _______ its way to a record-breaking depth of 404 m.','Starnawski is (6) _______ to continue to explore this mysterious, (7) _______ unending cave, believing that it may (8) _______ out to be even deeper!'],questions:[{num:1,options:{A:"suspect",B:"wonder",C:"expect",D:"assess"},answer:"B",explanation:"'wonder' — düşünmək."},{num:2,options:{A:"guided",B:"led",C:"headed",D:"ran"},answer:"B",explanation:"'led to' — apardı."},{num:3,options:{A:"largely",B:"entirely",C:"excessively",D:"considerably"},answer:"D",explanation:"'considerably' — xeyli."},{num:4,options:{A:"attended",B:"provided",C:"accompanied",D:"supplied"},answer:"C",explanation:"'accompanied by'."},{num:5,options:{A:"broke",B:"made",C:"went",D:"gave"},answer:"B",explanation:"'made its way'."},{num:6,options:{A:"committed",B:"determined",C:"intended",D:"dedicated"},answer:"B",explanation:"'determined to'."},{num:7,options:{A:"apparently",B:"distinctly",C:"noticeably",D:"particularly"},answer:"A",explanation:"'apparently'."},{num:8,options:{A:"set",B:"end",C:"turn",D:"come"},answer:"D",explanation:"'come out to be'."}] };

const part2Data = { id:'part2',moduleNum:2,moduleTitle:"Part 2 — Open Cloze",moduleSubtitle:"Boşluqları uyğun sözlərlə doldurun",title:"Plastic roads",instructions:"For questions <strong>9–16</strong>, think of the word which best fits each gap. Use only <strong>one word</strong>.",paragraphs:['The amount of plastic waste produced around the world is growing (0) ALL the time. But one man sees this as an opportunity rather than a problem. Dr Rajagopalan Vasudevan, a professor of chemistry from the Indian city of Madurai has (9) up with a way to re-use plastic waste, as (10) as improving road quality. His method, (11) he first developed in 2001, requires hardly (12) changes to existing road-laying techniques.','The method involves breaking plastic (13) small pieces, then combining them (14) the traditional road-building components in order to produce a strong, long-lasting material. All kinds of plastic can be used, even plastic that is normally considered (15) costly to be worth recycling.','There are now over 5,000 km of Dr Vasudevan\'s plastic roads in use in rural India. He travels throughout the country instructing engineers on exactly (16) to build roads in this way.'],gaps:[{num:9,answer:"COME",explanation:"'come up with'."},{num:10,answer:"WELL",explanation:"'as well as'."},{num:11,answer:"WHICH",explanation:"Nisbi əvəzlik."},{num:12,answer:"ANY",explanation:"'hardly any'."},{num:13,answer:"INTO",explanation:"'break into'."},{num:14,answer:"WITH",explanation:"'combine with'."},{num:15,answer:"TOO",explanation:"'too costly'."},{num:16,answer:"HOW",explanation:"'how to build'."}] };

const part3Data = { id:'part3',moduleNum:3,moduleTitle:"Part 3 — Word Formation",moduleSubtitle:"Verilən sözdən yeni söz düzəldin",title:"Is chess a sport?",instructions:"For questions <strong>17–24</strong>, use the word given in capitals to form a word that fits in the gap.",keywords:[{num:17,word:"CRITIC"},{num:18,word:"CHAMPION"},{num:19,word:"ENERGY"},{num:20,word:"COMPETE"},{num:21,word:"INTELLECT"},{num:22,word:"WILLING"},{num:23,word:"ADMIRE"},{num:24,word:"STRONG"}],paragraphs:['Should chess be considered a sport, (0) SUITABLE to be included in events like the Olympic games? In my view, there\'s no doubt about it. The point of sport is to test people\'s physical ability. So, I\'m not (17) chess as a game and I have great respect for players who take part in chess (18). I\'m just saying it\'s not a sport.','There are certainly other sports which don\'t require athletes to be (19) – target shooting is one. But there\'s a significant difference between shooting and playing chess. In chess, the physical actions themselves are not what the (20) are trying to be good at.','Instead, chess makes enormous (21) demands on players. Just look at the skill displayed by the grandmasters. So, my (22) to describe chess as a sport does not affect my (23) for it. Chess calls for extreme mental (24) and is a very enjoyable activity.'],gaps:[{num:17,answer:"CRITICISING",given:"CRITIC",explanation:"Present participle."},{num:18,answer:"CHAMPIONSHIPS",given:"CHAMPION",explanation:"Cəm isim."},{num:19,answer:"ENERGETIC",given:"ENERGY",explanation:"Sifət."},{num:20,answer:"COMPETITORS",given:"COMPETE",explanation:"Cəm isim."},{num:21,answer:"INTELLECTUAL",given:"INTELLECT",explanation:"Sifət."},{num:22,answer:"UNWILLINGNESS",given:"WILLING",explanation:"Mənfi prefiks + isim."},{num:23,answer:"ADMIRATION",given:"ADMIRE",explanation:"İsim."},{num:24,answer:"STRENGTH",given:"STRONG",explanation:"İsim."}] };

const part4Data = { id:'part4',moduleNum:4,moduleTitle:"Part 4 — Key Word Transformation",moduleSubtitle:"İkinci cümləni birinci ilə eyni mənalı edin",instructions:"For questions <strong>25–30</strong>, complete the second sentence using the word given. Use between <strong>two and five words</strong>. Write in <strong>CAPITAL LETTERS</strong>.",questions:[{num:25,original:"I bought these dance shoes two weeks ago and I've only just started to feel comfortable in them.",keyword:"USED",sentenceStart:"It's taken me two weeks",sentenceEnd:"wearing these dance shoes.",answer:"TO GET USED TO",explanation:"'get used to'."},{num:26,original:"That boy's sister won an Olympic medal!",keyword:"WHOSE",sentenceStart:"That's",sentenceEnd:"won an Olympic medal!",answer:"THE BOY WHOSE SISTER",explanation:"'whose' — aidiyyət."},{num:27,original:"Can you look after my bag for me for a moment?",keyword:"EYE",sentenceStart:"Can you",sentenceEnd:"my bag for me for a moment?",answer:"KEEP AN EYE ON",explanation:"'keep an eye on'."},{num:28,original:"The teacher advised us against bringing too much money.",keyword:"NOT",sentenceStart:"The teacher's advice",sentenceEnd:"too much money.",answer:"WAS NOT TO BRING",explanation:"Məsləhət etməmək."},{num:29,original:"Let's go straight to the main stage when we get to the festival.",keyword:"SOON",sentenceStart:"Let's go to the main stage",sentenceEnd:"at the festival.",answer:"AS SOON AS WE ARRIVE",explanation:"'as soon as'."},{num:30,original:"I really don't mind which day we have the party on.",keyword:"CONCERNED",sentenceStart:"As",sentenceEnd:", we can have the party on any day.",answer:"FAR AS I'M CONCERNED",explanation:"'as far as I'm concerned'."}] };

const part5Data = { id:'part5',moduleNum:5,moduleTitle:"Part 5 — Reading",moduleSubtitle:"Mətni oxuyun və cavab verin",title:"A Career in Music",subtitle:"Reporter Eamonn Forde met UK songwriter Jamie Scott.",instructions:"For questions <strong>31–36</strong>, choose the answer (<strong>A, B, C or D</strong>) which fits best.",paragraphs:['Jamie Scott has written and produced some of the biggest hits in the UK music business. He says his mother was \'an amazing singer\' who also got him interested in the guitar. The only radio he heard in his house was a local radio station for middle-aged people, which goes some way to explaining what influenced him as he was growing up. He says he was 12 before he heard a contemporary song. At about the same time, he had to choose between tennis, which he played at national level, and music – he was spending his lunchtimes in the music room at school working out songs on the piano. \'With the tennis playing, I was at quite a high level,\' he says. \'But it was not what I wanted to do for the rest of my life. It was just too much hard work.\'','At 17, he left school to try to make it as a performer. He was part of a duo with a friend who, while not sharing his enthusiasm for making a career out of performing, was a reasonably accomplished guitarist. \'I went to my parents and I just broke down,\' he recalls. \'I told them this is what I wanted to do, that I had been writing lyrics in economics lessons and I had been playing the piano every day when everyone else was out playing.\' His dad was understanding and gave him 18 months to try and make it; but if he didn\'t, he would have to get a job. After a few near misses with record labels, he was signed to a music publisher when he was 19, off the back of one song. However, record labels were only interested in him as a solo act and so he had to split with his friend.','In the end, it was behind the scenes rather than on stage where he would make his name. After a difficult period signed to a record label in the UK, he asked them to let him go and he switched to another label to release a new album. Fame and fortune did not follow. \'It feels like to me in my own artist career that I\'ve been in the wrong place at the wrong time for most of that time,\' he says. \'But as a writer I\'ve been in the right place at the right time.\'','Writing for others is where he was to find his feet. \'I\'d like to think that I am one of the main writers in the UK that UK labels look to send up-and-coming artists to,\' he says. This, he believes, helps launch their careers.','Sometimes he has to explain to the artists he\'s helping that writing with an eye on the charts – writing something that\'s likely to sell well – is nothing to be ashamed of. \'Why? Why don\'t you want to? Don\'t you want 10 million people streaming your music next month? I\'m not saying that they should write a bad song, but we should get to something that they think is amazing and that I think is amazing.\'','It is refreshing in an age of false modesty in the world of pop music to hear someone speak so bluntly about wanting to write huge songs that go to number one. There is no sense of arrogance or entitlement with Scott; he just realised long ago that he wants to write number ones and that he has a natural ability to do it. So, rather than tie himself in knots trying to make himself sound acceptable to other people, he just gets on with it.','\'That\'s the endgame for when I go into the studio with someone,\' he says. \'Whatever happens, we need to state that this is on the global level and that we need to write the best music of next year. It\'s not just about what\'s cool. We want to write classic modern pop songs.\''],questions:[{num:31,text:"What do we learn about Jamie Scott's childhood in the first paragraph?",options:{A:"It was clear to him that he would work in the music industry.",B:"He wished he had had access to more musical instruments at home.",C:"He regretted having to give up the idea of playing sport professionally.",D:"The music of a previous generation was an inspiration to him."},answer:"D",explanation:"Mətn: 'local radio station for middle-aged people... influenced him'."},{num:32,text:"What is emphasised about Scott in the second paragraph?",options:{A:"how determined he was",B:"how little support he had",C:"how quickly his talent was recognised",D:"how much better a musician he was than his friend"},answer:"A",explanation:"Qətiyyətini göstərir."},{num:33,text:"What does Scott suggest in the third paragraph?",options:{A:"It was his decision to become a songwriter.",B:"It is more difficult to become a performer than a songwriter.",C:"Bad luck prevented him from becoming a successful performer.",D:"He was unprepared for the challenges."},answer:"C",explanation:"'wrong place at the wrong time'."},{num:34,text:"What opinion does Scott express in the fifth paragraph?",options:{A:"Few writers are able to write a song that will appeal to large numbers.",B:"Only a song that has had a great deal of work can succeed.",C:"Unless he likes a song himself other people are unlikely to buy it.",D:"Just because a song is popular does not mean it lacks quality."},answer:"D",explanation:"Populyar = keyfiyyətsiz deyil."},{num:35,text:"What is the reporter's attitude towards Scott in the sixth paragraph?",options:{A:"He appreciates the quality of his song-writing.",B:"He respects his commitment to his work.",C:"He admires him for his honesty.",D:"He approves of his ambition."},answer:"C",explanation:"Dürüstlüyünü təqdir edir."},{num:36,text:"What does 'this' refer to in line 64?",options:{A:"the place where they are recording",B:"the work they are doing",C:"the style of their music",D:"the plan they have for the future"},answer:"B",explanation:"Etdikləri iş."}] };

const sentences={A:"Narukawa's concept first divides the globe into ninety-six equal triangles.",B:"This explains why such a strange-looking map is actually the most proportionate depiction of our planet ever seen.",C:"While this makes it easier to appreciate the relative size of continents and oceans, it doesn't completely solve the problem.",D:"Whether it will be adopted more widely than this remains to be seen.",E:"The continents curve upwards towards the edges of the map instead of going straight across it.",F:"The reason for differences like this has to do with the challenge of transforming a three-dimensional globe into a two-dimensional flat map.",G:"There was, however, a suggestion that the accuracy could be increased further in the future by cutting the world into even smaller chunks."};

const part6Data = { id:'part6',moduleNum:6,moduleTitle:"Part 6 — Gapped Text",moduleSubtitle:"A–G arasından uyğun cümləni seçin",title:"A new map of the world",subtitle:"Six sentences have been removed.",instructions:"For questions <strong>37–42</strong>, choose from the sentences <strong>A–G</strong> the one which fits each gap. One extra sentence.",paragraphs:['The decision to present the 2016 Good Design Award, one of Japan\'s most famous design honours, to Hajime Narukawa, the maker of the AuthaGraph World Map, came as a surprise to many. Given that previous winners have tended to be inventors of exciting new gadgets, people wondered what had impressed the judges about the design of a map.','The world map with which most of us are familiar uses what is known as the Mercator projection, a mapping technique developed in 1569 by map maker Gerardus Mercator. Though it is excellent for navigation, it significantly changes the size and proportion of areas of land and oceans. So while North America and Africa appear to be equal in size, in reality North America could fit inside Africa with plenty of room to spare. Similarly, though Brazil is more than five times larger than Alaska, it appears considerably smaller than it really is. [37]______ It is a task that is surprisingly hard to do accurately.','Over the years, there have been numerous attempts to deal with the issue. The Gall-Peters projection, for example, reduces the size of the regions near the poles. [38]______ This is because certain places appear oddly stretched. A similar change to the shapes of the continents occurs in the Mollweide projection, which attempts to show them more accurately by bending the lines of longitude. The Boggs eumorphic projection shows the correct shapes and sizes of everything on the map by cutting the globe into sections, but doing this means that vital information such as the distance between continents is not so clear, making the map impractical for navigation.','The AuthaGraph World Map appears to have solved these issues through the use of geometrical shapes. [39]______ These are then transferred onto the surface of what\'s called a tetrahedron, which is really just a four-sided pyramid. The tetrahedron can then be unfolded to form a flat rectangle. Doing this creates a two-dimensional map, which closely resembles the surface of the original globe.','The result is a world map unlike any other in its accuracy. [40]______ This makes Africa appear to be tilted on its side. Also the longitude and latitude lines are similarly distorted. Although these differences make the map look strangely unfamiliar, this is the closest anyone has ever come to capturing clearly and accurately the size and proportions of the Earth\'s surface.','In their announcement declaring the AuthaGraph World Map the overall winner, the officials at Good Design Award said it was selected because it \'faithfully represents all oceans and continents, including the neglected Antarctica,\' and provides \'an advanced, precise perspective of our planet.\' [41]______ This would involve some tricky mathematical calculations, but might well be something for map designers to consider.','While the AuthaGraph World Map is not ideal for navigation, it does have some practical applications, like helping us better understand how aeroplane flight paths are affected by the way the Earth\'s surface is curved. The map is also well suited to classroom use and has already been incorporated into Japanese textbooks. [42]______ Meanwhile, those eager to observe the world more accurately can purchase the map directly from the creator\'s website.'],gaps:[{num:37,answer:"F",explanation:"Ölçü fərqlərinin səbəbi."},{num:38,answer:"C",explanation:"Mənfi tərəf."},{num:39,answer:"A",explanation:"'geometrical shapes' → triangles."},{num:40,answer:"E",explanation:"Qeyri-adi görünüş."},{num:41,answer:"G",explanation:"Gələcək təklifi."},{num:42,answer:"D",explanation:"Daha geniş qəbul."}] };

const part7Data = { id:'part7',moduleNum:7,moduleTitle:"Part 7 — Multiple Matching",moduleSubtitle:"Hansı şəxs bu fikri deyir?",title:"Young ballet dancers",subtitle:"For questions 43–52, choose from the people (A–D).",instructions:"For questions <strong>43–52</strong>, choose from the people <strong>A–D</strong>. The people may be chosen more than once.",people:{A:{name:"Maria Duncan",text:"I was four when I reluctantly attended my first ballet class. I didn't take to it initially and there was little sign that I'd ever develop a genuine passion for it. I eventually began to show some promise, but my parents weren't happy with the dance school, and invested time and energy into finding a new one. I didn't see what the fuss was about because I got on well with my teacher and I was disappointed when the new one turned out to be much stricter. For ballet dancers, the reality is that artistic perfection can never be achieved. This used to frustrate me, but I've learnt to respond more positively to negative comments I get. Even people who've never tried ballet know how tough it is. From an early age, my mother instilled in me the importance of discipline and I appreciate that now, because I wouldn't have developed it independently."},B:{name:"Leon Robson",text:"It's hard to imagine something that makes more demands on your muscles and joints than ballet. Ask anyone who's attended a few classes as a hobby. They'll be aching afterwards in places they didn't know existed – and that includes fitness fanatics! There are lots of rather silly misconceptions about ballet dancers, and I think some things are exaggerated by the media. For a start, we don't all live in isolation, only mixing with other dancers. Anyway, the highlight of any dancer's life is taking part in a performance. I used to get very nervous beforehand, though, to the point where I could barely perform, but I've since learnt a few strategies I can apply, to good effect. And after a show, I take ages to unwind. I'm still buzzing and I tend to relive the excitement of the experience. I don't dwell on my errors too much, though."},C:{name:"Melanie Haig",text:"I started young, as most ballet dancers do, and seemed to show an aptitude for it more or less immediately. I remember being taken by my teacher to visit a professional ballet school and being intimidated by how good the girls were there, almost to the point of giving up. I sometimes think that the appeal of ballet to audiences is that they understand there's no way to achieve elegance and beauty without exceptional discipline, training and even physical pain. Ballet is challenging because a dancer is doing a number of things at any given moment to create something that seems effortless. Some of these, like lifting the stomach up while tensing leg muscles and relaxing the neck, can feel unnatural, and others, like standing on your toes, can even cause injury if repeated time and time again – as they inevitably are."},D:{name:"Peter Moreno",text:"While most people, including even the best ballet dancers, might think the routine of having to train for several hours every day is tough, I find it strangely reassuring and comforting rather than boring or restrictive. And it's not as if training ends when I leave the ballet school. At home I find myself doing basic exercises even while I'm watching TV or brushing my teeth. Ballet dominates your whole life – that was certainly my experience. I don't regret missing out on doing sport and not going to parties, though – I'm a far better dancer as a result. I've got loads of videos of top ballet dancers performing, some of them from many years ago and others more contemporary. I don't have a particular role model I'm obsessed with or think stands out for me. I pick up ideas from a range of dancers and styles."}},questions:[{num:43,text:"says that they get their inspiration from different sources?",answer:"D",explanation:"Peter: 'I pick up ideas from a range of dancers and styles.'"},{num:44,text:"is irritated by the inaccurate ideas people have about ballet dancers?",answer:"B",explanation:"Leon: 'silly misconceptions... exaggerated by the media.'"},{num:45,text:"says that the sacrifices they made were worth it?",answer:"D",explanation:"Peter: 'I don't regret missing out... I'm a far better dancer.'"},{num:46,text:"describes how they felt about a change that was forced on them?",answer:"A",explanation:"Maria: 'disappointed when the new one turned out to be much stricter.'"},{num:47,text:"explains how ballet involves combining several actions simultaneously?",answer:"C",explanation:"Melanie: 'doing a number of things at any given moment.'"},{num:48,text:"says that they have changed their attitude to criticism?",answer:"A",explanation:"Maria: 'learnt to respond more positively to negative comments.'"},{num:49,text:"believes that their attitude to training makes them untypical?",answer:"B",explanation:"Leon: 'I find it strangely reassuring and comforting.'"},{num:50,text:"describes how they were put off ballet by seeing the talent of others?",answer:"C",explanation:"Melanie: 'intimidated by how good the girls were there.'"},{num:51,text:"says that it took a while for them to demonstrate their potential?",answer:"A",explanation:"Maria: 'I didn't take to it initially... eventually began to show some promise.'"},{num:52,text:"says that they have found a way of dealing with their feelings prior to going on stage?",answer:"B",explanation:"Leon: 'learnt a few strategies I can apply, to good effect.'"}] };

const MODULES = {part1:part1Data,part2:part2Data,part3:part3Data,part4:part4Data,part5:part5Data,part6:part6Data,part7:part7Data};
const MODULE_ORDER = ['part1','part2','part3','part4','part5','part6','part7'];

// ==================== STATE ====================
let currentUser = null;
let currentExamId = null, currentModuleId = null, currentQ = 0, timerInterval, seconds = 0, autoAdvanceTimer = null, isTransitioning = false;

function getSession(){ try { return JSON.parse(localStorage.getItem('fce_current')); } catch(e){ return null; } }
function saveSession(user){ localStorage.setItem('fce_current', JSON.stringify(user)); }
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
      items.forEach(it => { defaultPoints.push({ exam_id: 'fce_full', part_id: pid, question_num: it.num, points: 1 }); });
    });
    if(defaultPoints.length > 0){ await apiPost('exam_points', defaultPoints); console.log('✅ Default ballar yaradıldı'); }
  }
  const session = getSession();
  if(session){
    const users = await dbQuery('users', { id: session.id });
    if(users.length > 0) currentUser = users[0];
  }
}

// ==================== AUTH ====================
function switchAuthTab(tab){
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('loginForm').classList.toggle('hidden', tab!=='login');
  document.getElementById('registerForm').classList.toggle('hidden', tab!=='register');
  document.getElementById('authError').style.display='none';
  document.getElementById('authSuccess').style.display='none';
}

function showAuthError(msg){ const e=document.getElementById('authError'); e.textContent=msg; e.style.display='block'; document.getElementById('authSuccess').style.display='none'; }
function showAuthSuccess(msg){ const e=document.getElementById('authSuccess'); e.textContent=msg; e.style.display='block'; document.getElementById('authError').style.display='none'; }

async function doLogin(){
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass = document.getElementById('loginPassword').value;
  if(!email || !pass){ showAuthError('Email və parol daxil edin'); return; }
  const users = await dbQuery('users', { email: email });
  const user = users.find(u => u.password === pass);
  if(!user){ showAuthError('Email və ya parol yanlışdır'); return; }
  currentUser = user; saveSession(user); enterApp();
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
  setTimeout(() => { document.querySelectorAll('.auth-tab')[0].click(); document.getElementById('loginEmail').value = email; }, 1000);
}

function doLogout(){
  currentUser = null; clearSession();
  document.getElementById('mainApp').classList.add('hidden');
  document.getElementById('authPage').classList.remove('hidden');
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
  hideExamNavButtons();
}

// ✅ DÜZƏLDİLMİŞ: enterApp() funksiyası
function enterApp(){
  if(!currentUser) return;
  document.getElementById('authPage').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');
  document.getElementById('userDisplay').textContent = `${currentUser.name} (${currentUser.role==='admin'?'Admin':currentUser.role==='marker'?'Marker':'Şagird'})`;
  if(currentUser.role === 'admin') showAdmin();
  else if(currentUser.role === 'marker') showMarkerDashboard();
  else showStudentDashboard(); // ✅ DƏYİŞDİ: showExamList() əvəzinə
}

// ✅ YENİ: Şagird dashboard-u
function showStudentDashboard(){
  document.getElementById('examPage').classList.add('hidden');
  document.getElementById('carnetPage').classList.add('hidden');
  document.getElementById('adminPage').classList.add('hidden');
  document.getElementById('markerDashboard').classList.add('hidden');
  document.getElementById('studentDashboard').classList.remove('hidden');
  hideExamNavButtons();
  document.getElementById('studentName').textContent = currentUser.name;
  switchDashTab('exams');
}

function switchDashTab(tab){
  document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
  document.getElementById('dash' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
  if(tab === 'exams') showExamList();
  if(tab === 'results') showMyResults();
}

async function showMyResults(){
  const container = document.getElementById('myResultsList');
  const scores = await dbQuery('scores', { user_id: currentUser.id });
  if(scores.length === 0){
    container.innerHTML = '<div class="no-data">Hələ nəticəniz yoxdur. İmtahan verin!</div>';
    return;
  }
  let html = '<div style="display:grid;gap:12px">';
  scores.forEach(sc => {
    const exam = EXAMS[sc.exam_id];
    const date = new Date(sc.created_at).toLocaleString('az-AZ');
    html += `<div class="my-result-item">
      <div class="result-info">
        <strong>${exam?.title || sc.exam_id}</strong>
        <div class="result-date">${date}</div>
      </div>
      <div class="result-score">${sc.total_points}/${sc.max_points} <span class="pct">(${sc.percent}%)</span></div>
      <button onclick="viewMyResult('${sc.exam_id}')" style="padding:8px 16px;background:#2563eb;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600">📜 Nəticəyə bax</button>
    </div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

async function viewMyResult(examId){
  currentExamId = examId;
  document.getElementById('studentDashboard').classList.add('hidden');
  document.getElementById('carnetPage').classList.remove('hidden');
  hideExamNavButtons();
  await showCarnet();
}

// ==================== EXAM LIST ====================
async function showExamList(){
  const grid = document.getElementById('examGrid');
  grid.innerHTML = '';
  const scores = await dbQuery('scores', { user_id: currentUser.id });
  const scoresMap = {};
  scores.forEach(s => { scoresMap[s.exam_id] = s; });
  Object.values(EXAMS).forEach(exam => {
    const score = scoresMap[exam.id];
    const alreadyTaken = !!score;
    let statusHtml = '<span class="status status-new">Yeni</span>';
    if(score){
      const pct = Math.round(score.percent || 0);
      statusHtml = pct >= 100 ? `<span class="status status-done">✅ ${pct}%</span>` : `<span class="status status-partial">⏳ ${pct}%</span>`;
    }
    const totalQ = exam.parts.reduce((s, pid) => s + (MODULES[pid].questions?.length || MODULES[pid].gaps?.length || 0), 0);
    const card = document.createElement('div');
    card.className = 'exam-card' + (alreadyTaken ? ' exam-card-taken' : '');
    if(alreadyTaken){
      card.onclick = () => viewMyResult(exam.id);
    } else {
      card.onclick = () => startExam(exam.id);
    }
    card.innerHTML = `<div class="exam-icon">${exam.icon}</div><h3>${exam.title}</h3><p>${exam.description}</p><div class="exam-meta"><span>${exam.parts.length} Part • ${totalQ} sual</span>${statusHtml}</div>${alreadyTaken ? '<div style="margin-top:10px;font-size:12px;color:#2563eb;font-weight:600">📜 Nəticəni görmək üçün klikləyin</div>' : ''}`;
    grid.appendChild(card);
  });
}

function startExam(examId){
  if(currentUser.scores && currentUser.scores[examId]){
    alert('⚠️ Siz bu imtahanı artıq tamamlamısınız. Hər şagird bir imtahana yalnız 1 dəfə girə bilər.');
    return;
  }
  currentExamId = examId;
  currentModuleId = EXAMS[examId].parts[0];
  currentQ = 0; seconds = 0;
  document.getElementById('studentDashboard').classList.add('hidden');
  document.getElementById('examPage').classList.remove('hidden');
  document.getElementById('carnetPage').classList.add('hidden');
  renderLayout(); renderText(); renderQuestion(); startTimer(); renderExamNavButtons();
}

// Qalan bütün funksiyalar əvvəlki tam versiyadakı kimi qalır...
// (renderLayout, renderQuestion, renderText, selectOption, showFinalResults, showCarnet, və s.)

// ==================== INIT ====================
initDB().then(() => { if(currentUser) enterApp(); });