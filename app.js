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
const part1Data = { id:'part1',moduleNum:1,moduleTitle: "Part 1 — Multiple Choice Cloze ",moduleSubtitle: "Hər boşluq üçün ən uyğun variantı seçin ",title: "The world's deepest underwater cave? ",subtitle: "Test 1 — Reading and Use of English ",instructions: "For questions  <strong >1–8 </strong >, decide which answer ( <strong >A, B, C or D </strong >) best fits each gap. ",paragraphs:['Polish explorer Krzysztof Starnawski (0) [keeps] returning to Hranická Propast, an underwater cave in the Czech Republic. His fascination with the cave began during  his first dive there, when he started to (1) _______ that it might be possible to go far deeper than any other dive had ever taken him before.','Returning a few years later, Starna wski dived to 200 m, but was stopped by a narrow passage in the rock that (2) _______ to a tunnel. He lowered a probe – a weight on the end of a long rope – and still didn't hit th e bottom of the cave.','On his next visit, the following year, he found that the passage had widened (3) _______. He swam through it down to 265 m. Then Starnawski went back again,  (4) _______ by a remotely-operated underwater robot, which (5) _______ its way to a record-breaking depth of 404 m.','Starnawski is (6) _______ to continue to explore this mysteri ous, (7) _______ unending cave, believing that it may (8) _______ out to be even deeper!'],questions:[{num:1,options:{A: "suspect ",B: "wonder ",C: "expect ",D: "assess "},answer: "B ",explanation: "'wonder' — düşünmək. "},{num:2,options:{A: "guided ",B: "led ",C: "headed ",D: "ran "},answer: "B ",explanation: "'led to' — apardı. "},{num:3,options:{A: "largely ",B: "entirely ",C: "excessively ",D: "considerably "},answer: "D ",explanation: "'considerably' — xeyli. "},{num:4,options:{A: "attended ",B: "provided ",C: "accompanied ",D: "supplied "},answer: "C ",explanation: "'accompanied by'. "},{num:5,options:{A: "broke ",B: "made ",C: "went ",D: "gave "},answer: "B ",explanation: "'made its way'. "},{num:6,options:{A: "committed ",B: "determined ",C: "intended ",D: "dedicated "},answer: "B ",explanation: "'determined to'. "},{num:7,options:{A: "apparently ",B: "distinctly ",C: "noticeably ",D: "particularly "},answer: "A ",explanation: "'apparently'. "},{num:8,options:{A: "set ",B: "end ",C: "turn ",D: "come "},answer: "D ",explanation: "'come out to be'. "}] };
const part2Data = { id:'part2',moduleNum:2,moduleTitle: "Part 2 — Open Cloze ",moduleSubtitle: "Boşluqları uyğun sözlərlə doldurun ",title: "Plastic roads ",instructions: "For questions  <strong >9–16 </strong >, think of the word which best fits each gap. Use only  <strong >one word </strong >. ",paragraphs:['The amount of plastic waste produced around the world is growing (0) ALL the time. But one man sees this as an opportunity rather than a problem. Dr Rajagopalan Vasu devan, a professor of chemistry from the Indian city of Madurai has (9) up with a way to re-use plastic waste, as (10) as improving road quality. His method, (11) he first develope d in 2001, requires hardly (12) changes to existing road-laying techniques.','The method involves breaking plastic (13) small pieces, then combining them (14) the traditional road-building components in order to produce a strong, long-lasting material. All kinds of plastic can be used, even plastic that is normally considered (15) costly to be worth recyclin g.','There are now over 5,000 km of Dr Vasudevan's plastic roads in use in rural India. He travels throughout the country instructing engineers on exactly (16) to build roads in th is way.'],gaps:[{num:9,answer: "COME ",explanation: "'come up with'. "},{num:10,answer: "WELL ",explanation: "'as well as'. "},{num:11,answer: "WHICH ",explanation: "Nisbi əvəzlik. "},{num:12,answer: "ANY ",explanation: "'hardly any'. "},{num:13,answer: "INTO ",explanation: "'break into'. "},{num:14,answer: "WITH ",explanation: "'combine with'. "},{num:15,answer: "TOO ",explanation: "'too costly'. "},{num:16,answer: "HOW ",explanation: "'how to build'. "}] };
const part3Data = { id:'part3',moduleNum:3,moduleTitle: "Part 3 — Word Formation ",moduleSubtitle: "Verilən sözdən yeni söz düzəldin ",title: "Is chess a sport? ",instructions: "For questions  <strong >17–24 </strong >, use the word given in capitals to form a word that fits in the gap. ",keywords:[{num:17,word: "CRITIC "},{num:18,word: "CHAMPION "},{num:19,word: "ENERGY "},{num:20,word: "COMPETE "},{num:21,word: "INTELLECT "},{num:22,word: "WILLING "},{num:23,word: "ADMIRE "},{num:24,word: "STRONG "}],paragraphs:['Should chess be considered a sport, (0) SUITABLE to be included in events like the Olympic games? In my view, there's no doubt about it. The point of sport is to t est people's physical ability. So, I'm not (17) chess as a game and I have great respect for players who take part in chess (18). I'm just saying it's not a sport.','There are cert ainly other sports which don't require athletes to be (19) – target shooting is one. But there's a significant difference between shooting and playing chess. In chess, the physical  actions themselves are not what the (20) are trying to be good at.','Instead, chess makes enormous (21) demands on players. Just look at the skill displayed by the grandmasters. S o, my (22) to describe chess as a sport does not affect my (23) for it. Chess calls for extreme mental (24) and is a very enjoyable activity.'],gaps:[{num:17,answer: "CRITICISING ",given: "CRITIC ",explanation: "Present participle. "},{num:18,answer: "CHAMPIONSHIPS ",given: "CHAMPION ",explanation: "Cəm isim. "},{num:19,answer: "ENERGETIC ",given: "ENERGY ",explanation: "Sifət. "},{num:20,answer: "COMPETITORS ",given: "COMPETE ",explanation: "Cəm isim. "},{num:21,answer: "INTELLECTUAL ",given: "INTELLECT ",explanation: "Sifət. "},{num:22,answer: "UNWILLINGNESS ",given: "WILLING ",explanation: "Mənfi prefiks + isim. "},{num:23,answer: "ADMIRATION ",given: "ADMIRE ",explanation: "İsim. "},{num:24,answer: "STRENGTH ",given: "STRONG ",explanation: "İsim. "}] };
const part4Data = { id:'part4',moduleNum:4,moduleTitle: "Part 4 — Key Word Transformation ",moduleSubtitle: "İkinci cümləni birinci ilə eyni mənalı edin ",instructions: "For questions  <strong >25–30 </strong >, complete the second sentence using the word given. Use between  <strong >two and five words </strong >. Write in  <strong >CAPITAL LETTERS </strong >. ",questions:[{num:25,original: "I bought these dance shoes two weeks ago and I've only just started to feel comfortable in them. ",keyword: "USED ",sentenceStart: "It's taken me two weeks ",sentenceEnd: "wearing these dance shoes. ",answer: "TO GET USED TO ",explanation: "'get used to'. "},{num:26,original: "That boy's sister won an Olympic medal! ",keyword: "WHOSE ",sentenceStart: "That's ",sentenceEnd: "won an Olympic medal! ",answer: "THE BOY WHOSE SISTER ",explanation: "'whose' — aidiyyət. "},{num:27,original: "Can you look after my bag for me for a moment? ",keyword: "EYE ",sentenceStart: "Can you ",sentenceEnd: "my bag for me for a moment? ",answer: "KEEP AN EYE ON ",explanation: "'keep an eye on'. "},{num:28,original: "The teacher advised us against bringing too much money. ",keyword: "NOT ",sentenceStart: "The teacher's advice ",sentenceEnd: "too much money. ",answer: "WAS NOT TO BRING ",explanation: "Məsləhət etməmək. "},{num:29,original: "Let's go straight to the main stage when we get to the festival. ",keyword: "SOON ",sentenceStart: "Let's go to the main stage ",sentenceEnd: "at the festival. ",answer: "AS SOON AS WE ARRIVE ",explanation: "'as soon as'. "},{num:30,original: "I really don't mind which day we have the party on. ",keyword: "CONCERNED ",sentenceStart: "As ",sentenceEnd: ", we can have the party on any day. ",answer: "FAR AS I'M CONCERNED ",explanation: "'as far as I'm concerned'. "}] };
const part5Data = { id:'part5',moduleNum:5,moduleTitle: "Part 5 — Reading ",moduleSubtitle: "Mətni oxuyun və cavab verin ",title: "A Career in Music ",subtitle: "Reporter Eamonn Forde met UK songwriter Jamie Scott. ",instructions: "For questions  <strong >31–36 </strong >, choose the answer ( <strong >A, B, C or D </strong >) which fits best. ",paragraphs:['Jamie Scott has written and produced some of the biggest hits in the UK music business. He says his mother was 'an amazing singer' who also got him interested in the  guitar. The only radio he heard in his house was a local radio station for middle-aged people, which goes some way to explaining what influenced him as he was growing up. He says  he was 12 before he heard a contemporary song. At about the same time, he had to choose between tennis, which he played at national level, and music – he was spending his lunchtime s in the music room at school working out songs on the piano. 'With the tennis playing, I was at quite a high level,' he says. 'But it was not what I wanted to do for the rest of m y life. It was just too much hard work.'','At 17, he left school to try to make it as a performer. He was part of a duo with a friend who, while not sharing his enthusiasm for maki ng a career out of performing, was a reasonably accomplished guitarist. 'I went to my parents and I just broke down,' he recalls. 'I told them this is what I wanted to do, that I h ad been writing lyrics in economics lessons and I had been playing the piano every day when everyone else was out playing.' His dad was understanding and gave him 18 months to try  and make it; but if he didn't, he would have to get a job. After a few near misses with record labels, he was signed to a music publisher when he was 19, off the back of one song.  However, record labels were only interested in him as a solo act and so he had to split with his friend.','In the end, it was behind the scenes rather than on stage where he would  make his name. After a difficult period signed to a record label in the UK, he asked them to let him go and he switched to another label to release a new album. Fame and fortune di d not follow. 'It feels like to me in my own artist career that I've been in the wrong place at the wrong time for most of that time,' he says. 'But as a writer I've been in the ri ght place at the right time.'','Writing for others is where he was to find his feet. 'I'd like to think that I am one of the main writers in the UK that UK labels look to send up-a nd-coming artists to,' he says. This, he believes, helps launch their careers.','Sometimes he has to explain to the artists he's helping that writing with an eye on the charts – wr iting something that's likely to sell well – is nothing to be ashamed of. 'Why? Why don't you want to? Don't you want 10 million people streaming your music next month? I'm not say ing that they should write a bad song, but we should get to something that they think is amazing and that I think is amazing.'','It is refreshing in an age of false modesty in the  world of pop music to hear someone speak so bluntly about wanting to write huge songs that go to number one. There is no sense of arrogance or entitlement with Scott; he just reali sed long ago that he wants to write number ones and that he has a natural ability to do it. So, rather than tie himself in knots trying to make himself sound acceptable to other pe ople, he just gets on with it.',''That's the endgame for when I go into the studio with someone,' he says. 'Whatever happens, we need to state that this is on the global level and  that we need to write the best music of next year. It's not just about what's cool. We want to write classic modern pop songs.''],questions:[{num:31,text: "What do we learn about Jamie Scott's childhood in the first paragraph? ",options:{A: "It was clear to him that he would work in the music industry. ",B: "He wished he had had access to more musical instruments at home. ",C: "He regretted having to give up the idea of playing sport professionally. ",D: "The music of a previous generation was an inspiration to him. "},answer: "D ",explanation: "Mətn: 'local radio station for middle-aged people... influenced him'. "},{num:32,text: "What is emphasised about Scott in the second paragraph? ",options:{A: "how determined he was ",B: "how little support he had ",C: "how quickly his talent was recognised ",D: "how much better a musician he was than his friend "},answer: "A ",explanation: "Qətiyyətini göstərir. "},{num:33,text: "What does Scott suggest in the third paragraph? ",options:{A: "It was his decision to become a songwriter. ",B: "It is more difficult to become a performer than a songwriter. ",C: "Bad luck prevented him from becoming a successful performer. ",D: "He was unprepared for the challenges. "},answer: "C ",explanation: "'wrong place at the wrong time'. "},{num:34,text: "What opinion does Scott express in the fifth paragraph? ",options:{A: "Few writers are able to write a song that will appeal to large numbers. ",B: "Only a song that has had a great deal of work can succeed. ",C: "Unless he likes a song himself other people are unlikely to buy it. ",D: "Just because a song is popular does not mean it lacks quality. "},answer: "D ",explanation: "Populyar = keyfiyyətsiz deyil. "},{num:35,text: "What is the reporter's attitude towards Scott in the sixth paragraph? ",options:{A: "He appreciates the quality of his song-writing. ",B: "He respects his commitment to his work. ",C: "He admires him for his honesty. ",D: "He approves of his ambition. "},answer: "C ",explanation: "Dürüstlüyünü təqdir edir. "},{num:36,text: "What does 'this' refer to in line 64? ",options:{A: "the place where they are recording ",B: "the work they are doing ",C: "the style of their music ",D: "the plan they have for the future "},answer: "B ",explanation: "Etdikləri iş. "}] };
const sentences={A:"Narukawa's concept first divides the globe into ninety-six equal triangles.",B:"This explains why such a strange-looking map is actually the most proportionate depiction of our planet ever seen.",C:"While this makes it easier to appreciate the relative size of continents and oceans, it doesn't completely solve the problem.",D:"Whether it will be adopted more widely than this remains to be seen.",E:"The continents curve upwards towards the edges of the map instead of going straight across it.",F:"The reason for differences like this has to do with the challenge of transforming a three-dimensional globe into a two-dimensional flat map.",G:"There was, however, a suggestion that the accuracy could be increased further in the future by cutting the world into even smaller chunks."};
const part6Data = { id:'part6',moduleNum:6,moduleTitle: "Part 6 — Gapped Text ",moduleSubtitle: "A–G arasından uyğun cümləni seçin ",title: "A new map of the world ",subtitle: "Six sentences have been removed. ",instructions: "For questions  <strong >37–42 </strong >, choose from the sentences  <strong >A–G </strong > the one which fits each gap. One extra sentence. ",paragraphs:['The decision to present the 2016 Good Design Award, one of Japan's most famous design honours, to Hajime Narukawa, the maker of the AuthaGraph World Map, came as a s urprise to many. Given that previous winners have tended to be inventors of exciting new gadgets, people wondered what had impressed the judges about the design of a map.','The wor ld map with which most of us are familiar uses what is known as the Mercator projection, a mapping technique developed in 1569 by map maker Gerardus Mercator. Though it is excellen t for navigation, it significantly changes the size and proportion of areas of land and oceans. So while North America and Africa appear to be equal in size, in reality North Ameri ca could fit inside Africa with plenty of room to spare. Similarly, though Brazil is more than five times larger than Alaska, it appears considerably smaller than it really is. [37 ]______ It is a task that is surprisingly hard to do accurately.','Over the years, there have been numerous attempts to deal with the issue. The Gall-Peters projection, for example , reduces the size of the regions near the poles. [38]______ This is because certain places appear oddly stretched. A similar change to the shapes of the continents occurs in the M ollweide projection, which attempts to show them more accurately by bending the lines of longitude. The Boggs eumorphic projection shows the correct shapes and sizes of everything  on the map by cutting the globe into sections, but doing this means that vital information such as the distance between continents is not so clear, making the map impractical for n avigation.','The AuthaGraph World Map appears to have solved these issues through the use of geometrical shapes. [39]______ These are then transferred onto the surface of what's ca lled a tetrahedron, which is really just a four-sided pyramid. The tetrahedron can then be unfolded to form a flat rectangle. Doing this creates a two-dimensional map, which closel y resembles the surface of the original globe.','The result is a world map unlike any other in its accuracy. [40]______ This makes Africa appear to be tilted on its side. Also the  longitude and latitude lines are similarly distorted. Although these differences make the map look strangely unfamiliar, this is the closest anyone has ever come to capturing clear ly and accurately the size and proportions of the Earth's surface.','In their announcement declaring the AuthaGraph World Map the overall winner, the officials at Good Design Award  said it was selected because it 'faithfully represents all oceans and continents, including the neglected Antarctica,' and provides 'an advanced, precise perspective of our planet .' [41]______ This would involve some tricky mathematical calculations, but might well be something for map designers to consider.','While the AuthaGraph World Map is not ideal for  navigation, it does have some practical applications, like helping us better understand how aeroplane flight paths are affected by the way the Earth's surface is curved. The map i s also well suited to classroom use and has already been incorporated into Japanese textbooks. [42]______ Meanwhile, those eager to observe the world more accurately can purchase t he map directly from the creator's website.'],gaps:[{num:37,answer: "F ",explanation: "Ölçü fərqlərinin səbəbi. "},{num:38,answer: "C ",explanation: "Mənfi tərəf. "},{num:39,answer: "A ",explanation: "'geometrical shapes' → triangles. "},{num:40,answer: "E ",explanation: "Qeyri-adi görünüş. "},{num:41,answer: "G ",explanation: "Gələcək təklifi. "},{num:42,answer: "D ",explanation: "Daha geniş qəbul. "}] };
const part7Data = { id:'part7',moduleNum:7,moduleTitle: "Part 7 — Multiple Matching ",moduleSubtitle: "Hansı şəxs bu fikri deyir? ",title: "Young ballet dancers ",subtitle: "For questions 43–52, choose from the people (A–D). ",instructions: "For questions  <strong >43–52 </strong >, choose from the people  <strong >A–D </strong >. The people may be chosen more than once. ",people:{A:{name: "Maria Duncan ",text: "I was four when I reluctantly attended my first ballet class. I didn't take to it initially and there was little sign that I'd ever develop a genuine passion for it. I eventually  began to show some promise, but my parents weren't happy with the dance school, and invested time and energy into finding a new one. I didn't see what the fuss was about because I  got on well with my teacher and I was disappointed when the new one turned out to be much stricter. For ballet dancers, the reality is that artistic perfection can never be achieve d. This used to frustrate me, but I've learnt to respond more positively to negative comments I get. Even people who've never tried ballet know how tough it is. From an early age,  my mother instilled in me the importance of discipline and I appreciate that now, because I wouldn't have developed it independently. "},B:{name: "Leon Robson ",text: "It's hard to imagine something that makes more demands on your muscles and joints than ballet. Ask anyone who's attended a few classes as a hobby. They'll be aching afterwards in  places they didn't know existed – and that includes fitness fanatics! There are lots of rather silly misconceptions about ballet dancers, and I think some things are exaggerated by  the media. For a start, we don't all live in isolation, only mixing with other dancers. Anyway, the highlight of any dancer's life is taking part in a performance. I used to get v ery nervous beforehand, though, to the point where I could barely perform, but I've since learnt a few strategies I can apply, to good effect. And after a show, I take ages to unwi nd. I'm still buzzing and I tend to relive the excitement of the experience. I don't dwell on my errors too much, though. "},C:{name: "Melanie Haig ",text: "I started young, as most ballet dancers do, and seemed to show an aptitude for it more or less immediately. I remember being taken by my teacher to visit a professional ballet sch ool and being intimidated by how good the girls were there, almost to the point of giving up. I sometimes think that the appeal of ballet to audiences is that they understand there 's no way to achieve elegance and beauty without exceptional discipline, training and even physical pain. Ballet is challenging because a dancer is doing a number of things at any  given moment to create something that seems effortless. Some of these, like lifting the stomach up while tensing leg muscles and relaxing the neck, can feel unnatural, and others,  like standing on your toes, can even cause injury if repeated time and time again – as they inevitably are. "},D:{name: "Peter Moreno ",text: "While most people, including even the best ballet dancers, might think the routine of having to train for several hours every day is tough, I find it strangely reassuring and comf orting rather than boring or restrictive. And it's not as if training ends when I leave the ballet school. At home I find myself doing basic exercises even while I'm watching TV or  brushing my teeth. Ballet dominates your whole life – that was certainly my experience. I don't regret missing out on doing sport and not going to parties, though – I'm a far bett er dancer as a result. I've got loads of videos of top ballet dancers performing, some of them from many years ago and others more contemporary. I don't have a particular role mode l I'm obsessed with or think stands out for me. I pick up ideas from a range of dancers and styles. "}},questions:[{num:43,text: "says that they get their inspiration from different sources? ",answer: "D ",explanation: "Peter: 'I pick up ideas from a range of dancers and styles.' "},{num:44,text: "is irritated by the inaccurate ideas people have about ballet dancers? ",answer: "B ",explanation: "Leon: 'silly misconceptions... exaggerated by the media.' "},{num:45,text: "says that the sacrifices they made were worth it? ",answer: "D ",explanation: "Peter: 'I don't regret missing out... I'm a far better dancer.' "},{num:46,text: "describes how they felt about a change that was forced on them? ",answer: "A ",explanation: "Maria: 'disappointed when the new one turned out to be much stricter.' "},{num:47,text: "explains how ballet involves combining several actions simultaneously? ",answer: "C ",explanation: "Melanie: 'doing a number of things at any given moment.' "},{num:48,text: "says that they have changed their attitude to criticism? ",answer: "A ",explanation: "Maria: 'learnt to respond more positively to negative comments.' "},{num:49,text: "believes that their attitude to training makes them untypical? ",answer: "B ",explanation: "Leon: 'I find it strangely reassuring and comforting.' "},{num:50,text: "describes how they were put off ballet by seeing the talent of others? ",answer: "C ",explanation: "Melanie: 'intimidated by how good the girls were there.' "},{num:51,text: "says that it took a while for them to demonstrate their potential? ",answer: "A ",explanation: "Maria: 'I didn't take to it initially... eventually began to show some promise.' "},{num:52,text: "says that they have found a way of dealing with their feelings prior to going on stage? ",answer: "B ",explanation: "Leon: 'learnt a few strategies I can apply, to good effect.' "}] };
const MODULES = {part1:part1Data,part2:part2Data,part3:part3Data,part4:part4Data,part5:part5Data,part6:part6Data,part7:part7Data};
const MODULE_ORDER = ['part1','part2','part3','part4','part5','part6','part7'];
let currentUser = null;
let currentExamId = null, currentModuleId = null, currentQ = 0, timerInterval, seconds = 0, autoAdvanceTimer = null, isTransitioning = false;
function getSession(){ try { return JSON.parse(localStorage.getItem('fce_current')); } catch(e){ return null; } }
function saveSession(user){ localStorage.setItem('fce_current', JSON.stringify(user)); }
function clearSession(){ localStorage.removeItem('fce_current'); }
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
function switchAuthTab(tab){
document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
event.target.classList.add('active');
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
if(!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)){ showAuthError('Düzgün email daxil edin'); return; }
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
container.innerHTML = `<div class="marker-stat-card"><div class="stat-label">👥 Şagird Sayı</div><div class="stat-value">${totalStudents}</div></div> <div class="marker-stat-card"><div class="stat-label">📝 Tamamlanan İmtahan</div><div class="stat-value">${totalExams}</div></div> <div class="marker-stat-card"><div class="stat-label">️ Redaktə Edilmiş</div><div class="stat-value">${totalEdited}</div></div>`;
}
async function renderMarkerStudentList(){
const container = document.getElementById('markerStudentList');
const students = await dbQuery('users', { role: 'student' });
if(students. length === 0){ container.innerHTML = ' <div class= "no-data " >Heç bir şagird yoxdur </div >'; return; }
let html = '';
for(const user of students){
const scores = await dbQuery('scores', { user_id: user.id });
const totalPoints = scores.reduce((sum, s) = > sum + (s.total_points || 0), 0);
const maxPoints = scores.reduce((sum, s) = > sum + (s.max_points || 0), 0);
html +=  `<div class="marker-student-item"> <div class="student-header"><div class="student-name">${user.name}</div><div class="student-email">${user.email}</div></div> <div class="student-info">Tamamlanan imtahan: ${scores.length} • Ümumi bal: <strong>${totalPoints}/${maxPoints}</strong></div>` ;
if(scores.length  > 0){
html +=  `<div style="margin-top:10px">` ;
for(const sc of scores){
const exam = EXAMS[sc.exam_id];
html +=  `<button class="marker-exam-btn" onclick="viewCarnetFromAdmin('${user.email}','${sc.exam_id}')">📜 ${exam?.title || sc.exam_id} — ${sc.total_points}/${sc.max_points} (${sc.percent}%)</button>` ;
}
html +=  `</div>` ;
} else {
html +=  `<div style="margin-top:10px;font-size:13px;color:#9ca3af;font-style:italic">Hələ nəticə yoxdur</div>` ;
}
html +=  `</div>` ;
}
container.innerHTML = html;
}
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
// ✅ 1. İMTAHANI BİTİR DÜYMƏSİ ƏLAVƏ EDİLDİ
html += `<button class="result-nav-btn btn-finish-exam" onclick="finishExam()">🏁 İmtahanı bitir</button>`;
html += `<button class="result-nav-btn" onclick="showCarnetFromCurrent()">📜 Nəticəyə bax</button>`;
container.innerHTML = html;
container.classList.add('show');
}
// ✅ 2. İMTAHANI BİTİR FUNKSİYASI ƏLAVƏ EDİLDİ
function finishExam(){
if(!confirm('İmtahanı bitirmək istədiyinizə əminsiniz? Cavablarınız yadda saxlanılacaq.')) return;
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
async function showExamList(){
document.getElementById('examPage').classList.add('hidden');
document.getElementById('carnetPage').classList.add('hidden');
document.getElementById(' adminPage').classList.add('hidden');
document.getElementById('markerDashboard').classList.add('hidden');
document.getElementById('examListPage').classList.remove('hidden');
hideExa mNavButtons();
const grid = document.getElementById('examGrid');
grid.innerHTML = '';
const scores = await dbQuery('scores', { user_id: currentUser.id });
const scoresMap = {};
sco res.forEach(s = > { scoresMap[s.exam_id] = s; });
Object.values(EXAMS).forEach(exam = > {
const score = scoresMap[exam.id];
let statusHtml = ' <span class= "status status-new " >Yeni </span >';
if(score){
const pct = Math.round(score.percent || 0);
statusHtml = pct  >= 100 ?  `<span class="status status-done">✅ ${pct}%</span>`  :  `<span class="status status-partial"> ${pct}%</span>` ;
}
const totalQ = exam.parts.reduce((s, pid) = > s + (MODULES[pid].questions?.length || MODULES[pid].gaps?.length || 0), 0);
const card = document.createElement('div');
card.className = 'exam-card';
card.onclick = () = > startExam(exam.id);
card.innerHTML =  `<div class="exam-icon">${exam.icon}</div><h3>${exam.title}</h3><p>${exam.description}</p><div class="exam-meta"><span>${exam.parts.length} Part • ${totalQ} sual</span>${statusHtml}</div>` ;
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
const transitionHTML = `<div class="transition-screen" id="transitionScreen"><div class="transition-card"><div class="transition-icon"></div><div class="transition-title" id="tTitle">Modul Tamamlandı!</div><div class="transition-text" id="tText"></div><div class="transition-stats"><div class="stats-title">📊 İCMAL</div><div class="stats-grid"><div class="stat-box"><div class="stat-value" id="statAnswered">0</div><div class="stat-label">Cavablanan</div></div><div class="stat-box"><div class="stat-value" id="statRemaining">0</div><div class="stat-label">Boş</div></div><div class="stat-box"><div class="stat-value" id="statModule">—</div><div class="stat-label">Modul</div></div></div></div><div class="transition-buttons"><button class="btn-review" onclick="reviewCurrent()">↻ Geri Qayıt</button><button class="btn-continue" id="btnContinue" onkeypress="if(event.key==='Enter')continueToNext()">Növbəti Parta Keç →</button></div></div></div>`;
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
items.forEach((item, idx) => {
const num = item.num;
const answered = answers[num];
const isCurrent = idx === currentQ;
let cls = 'q-num';
if(answered) cls += ' answered';
if(isCurrent) cls += ' current';
html += `<div class="${cls}" onclick="goToQuestion(${idx})">${num}</div>`;
});
html += '</div>';
container.innerHTML = html;
}
function goToQuestion(idx){ currentQ = idx; renderQuestion(); }
function renderText(){
const mod = getCurrentModule();
const answers = getAnswers();
const panel = document.getElementById('leftPanel');
let html =  `<h2>${mod.title}</h2>` ;
if(mod.subtitle) html +=  `<div class="subtitle">${mod.subtitle}</div>` ;
html +=  `<div class="instructions">${mod.instructions}</div>` ;
if(currentModuleId==='part1'){
html +=  `<div class="article">` ;
mod.paragraphs.forEach(p = > {
let text = p.replace(/(0) [keeps]/g, ' <span class= "gap-inline " > <span class= "gap-num " style= "background:#9ca3af " >0 </span > <span class= "gap-box example " >keeps </span > </span >');
mod.questions.forEach(q = > {
const regex = new RegExp( `\\(${q.num}\\)\\s*_______` , 'g');
const val = answers[q.num] || '';
let cls = val ? 'gap-box filled' : 'gap-box empty';
let numCls = q.num === mod.questions[currentQ]?.num ? 'gap-num active-gap' : 'gap-num' ;
text = text.replace(regex,  `<span class="gap-inline"><span class="${numCls}">${q.num}</span><span class="${cls}">${val || '___'}</span></span>` );
});
html +=  `<p>${text}</p>` ;
});
html +=  `</div>` ;
} else if(currentModuleId==='part2'){
html +=  `<div class="article">` ;
mod.paragraphs.forEach(p = > {
let text = p.replace(/(0) ALL/g, ' <span class= "gap-inline " > <span class= "gap-num " style= "background:#9ca3af " >0 </span > <span class= "gap-box example " >ALL </span > </span >');
mod.gaps.forEach(g = > {
const regex = new RegExp( `\\(${g.num}\\)` , 'g');
const val = answers[g.num] || '';
let cls = val ? 'gap-box filled' : 'gap-box empty';
let numCls = g.num === mod.gaps[currentQ]?.num ? 'gap-num active-gap' : 'gap-num';
tex t = text.replace(regex,  `<span class="gap-inline"><span class="${numCls}">${g.num}</span><span class="${cls}">${val || '___'}</span></span>` );
});
html +=  `<p>${text}</p>` ;
});
html +=  `</div>` ;
} else if(currentModuleId==='part3'){
html +=  `<div style="background:linear-gradient(135deg,#1a1a2e 0%,#2d2d4e 100%);border-radius:10px;padding:18px 22px;margin-bottom:22px;color:#fff;"><h4 style="font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#fbbf24;margin-bottom:12px;font-weight:700;">📋 Key Words</h4><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">` ;
mod.keywords.forEach(k = > { html +=  `<div style="background:rgba(255,255,255,0.1);border-radius:6px;padding:6px 10px;display:flex;align-items:center;gap:8px;font-size:13px;"><div style="background:#fbbf24;color:#1a1a2e;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;">${k.num}</div><div style="font-weight:700;">${k.word}</div></div>` ; });
html +=  `</div></div><div class="article">` ;
mod.paragraphs.forEach(p = > {
let text = p.replace(/(0) SUITABLE/g, ' <span class= "gap-inline " > <span class= "gap-num " style= "background:#9ca3af " >0 </span > <span class= "gap-box example " >SUITABLE </span > </span >');
mod.gaps.forEach(g = > {
const regex = new RegExp( `\\(${g.num}\\)` , 'g');
const val = answers[g.num] || '';
let cls = val ? 'gap-box filled' : 'gap-box empty';
let numCls = g.num === mod.gaps[currentQ]?.num ? 'gap-num active-gap' : 'gap-num';
tex t = text.replace(regex,  `<span class="gap-inline"><span class="${numCls}">${g.num}</span><span class="${cls}">${val || '___'}</span></span>` );
});
html +=  `<p>${text}</p>` ;
});
html +=  `</div>` ;
} else if(currentModuleId==='part4'){
html +=  `<div class="article">` ;
mod.questions.forEach(q = > {
const val = answers[q.num] || '';
let cls = val ? 'gap-box filled' : 'gap-box empty';
let numCls = q.num === mod.questions[currentQ]?.num ? 'gap-num active-gap' : 'gap-num';
ht ml +=  `<p style="margin-bottom:12px;"><strong style="color:#1a1a2e;">${q.num}.</strong> ${q.original}<br><span style="display:inline-block;background:#1a1a2e;color:#fbbf24;padding:3px 14px;border-radius:3px;font-weight:bold;font-size:14px;margin:6px 0;letter-spacing:1px;">${q.keyword}</span><br>${q.sentenceStart} <span class="gap-inline"><span class="${numCls}">${q.num}</span><span class="${cls}">${val || '___'}</span></span> ${q.sentenceEnd}</p>` ;
});
html +=  `</div>` ;
} else if(currentModuleId==='part5'){
html +=  `<div class="article">` ;
mod.paragraphs.forEach((p, idx) = > { html +=  `<p><span style="display:inline-block;background:#1a1a2e;color:#fbbf24;font-size:10px;font-weight:700;padding:2px 7px;border-radius:3px;margin-right:6px;vertical-align:middle;">§${idx+1}</span>${p}</p>` ; });
html +=  `</div>` ;
} else if(currentModuleId==='part6'){
html +=  `<div class="article">` ;
mod.paragraphs.forEach(p = > {
let text = p;
mod.gaps.forEach(g = > {
const regex = new RegExp( `\\[${g.num}\\]______` , 'g');
const val = answers[g.num] || '';
let cls = val ? 'gap-box filled' : 'gap-box empty';
let numCls = g.num === mod.gaps[currentQ]?.num ? 'gap-num active-gap' : 'gap-num';
tex t = text.replace(regex,  `<span class="gap-inline"><span class="${numCls}">${g.num}</span><span class="${cls}">${val || '___'}</span></span>` );
});
html +=  `<p>${text}</p>` ;
});
html +=  `</div>` ;
} else if(currentModuleId==='part7'){
const q = mod.questions[currentQ];
const val = answers[q.num] || '';
html +=  `<div style="background:#fff;border:2px solid #e5e7eb;border-radius:12px;padding:20px 24px;margin-top:10px;"><div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;"><div style="background:#1a1a2e;color:#fbbf24;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;">${q.num}</div><div style="font-size:15px;font-weight:600;color:#1a1a2e;line-height:1.4;">${q.text}</div></div><div style="display:flex;gap:10px;padding-left:44px;">` ;
['A','B','C','D'].forEach(l = > {
let bg = val===l ? '#2563eb' : '#fff', br = val===l ? '#2563eb' : '#e5e7eb', co = val===l ? '#fff' : '#6b7280';
html +=  `<div onclick="selectPerson(${q.num},'${l}')" style="width:44px;height:44px;border:2px solid ${br};border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;color:${co};cursor:pointer;transition:all 0.15s;background:${bg};">${l}</div>` ;
});
html +=  `</div></div>` ;
}
panel.innerHTML = html;
}
function renderQuestion(){
const mod = getCurrentModule();
const answers = getAnswers();
const container = document.getElementById('qContent');
if(currentModuleId==='part1' || curr entModuleId==='part5'){
const q = mod.questions[currentQ];
const val = answers[q.num] || '';
const titleText = currentModuleId==='part5' ? q.text : 'Boşluq üçün ən uyğun variantı s eçin';
let html =  `<div class="q-card"><div class="q-card-header"><div class="q-number">${q.num}</div><div class="q-title">${titleText}</div></div><ul class="q-options">` ;
Object.entries(q.options).forEach(([letter, text]) = > {
let cls = val===letter ? 'q-option selected' : 'q-option';
html +=  `<li class="${cls}" onclick="selectOption('${letter}')"><div class="opt-radio"></div><span class="opt-letter">${letter}</span><span class="opt-text">${text}</span></li>` ;
});
html +=  `</ul></div>` ;
container.innerHTML = html;
} else if(currentModuleId==='part2' || currentModuleId==='part3'){
const g = mod.gaps[currentQ];
const val = answers[g.num] || '';
let ctx = '';
mod.p aragraphs.forEach(p = > {
const regex = new RegExp( `\\(${g.num}\\)` );
if(regex.test(p)){
p.split('. ').forEach(s = > {
if(regex.test(s)){
ctx = s.replace(/(\d+)/g, '___').replace(new RegExp( `\\(${g.num}\\)` , 'g'), ' <span class= "context-gap " >___ </span >');
if(!ctx.endsWith('.')) ctx += '.';
}
});
}
});
let html =  `<div class="q-card"><div class="q-card-header"><div class="q-number">${g.num}</div><div class="q-title">${currentModuleId==='part2' ? 'Boşluğu doldurun (1 söz)' : 'Verilən sözdən yeni söz düzəldin'}</div></div><div class="q-context">${ctx}</div>` ;
if(currentModuleId==='part3'  & & g.given) html +=  `<div class="q-word-given"><span class="kw-label">Verilən söz:</span>${g.given}</div>` ;
// ✅ 3. ƏL İLƏ YAZMA DÜYMƏSİ ƏLAVƏ EDİLDİ
html +=  `<div class="q-input-area"><label>Cavabınız</label><input type="text" class="q-main-input" id="mainInput" value="${val}" placeholder="cavabı yazın..." autocomplete="off" spellcheck="false" oninput="onInput(this.value)" onkeydown="onKeydown(event)"><div class="q-hint-text">${currentModuleId==='part2' ? '💡 Yalnız 1 söz yazın' : '💡 Verilən sözdən kök dəyişərək yeni söz düzəldin'}</div><button class="btn-handwriting" onclick="openWritingCanvas(${g.num})" style="margin-top:10px;padding:8px 16px;background:#fbbf24;color:#1a1a2e;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer">✍️ Əl ilə yaz</button></div></div>` ;
container.innerHTML = html;
setTimeout(() = > { const inp = document.getElementById('mainInput'); if(inp){ inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); } }, 50);
} else if(currentModuleId==='part4' ){
const q = mod.questions[currentQ];
const val = answers[q.num] || '';
let html =  `<div class="q-card"><div class="q-card-header"><div class="q-number">${q.num}</div><div class="q-title">İkinci cümləni tamamlayın</div></div><div class="q-context" style="font-style:italic;">"${q.original}"</div><div style="text-align:center;margin-bottom:16px;"><span style="display:inline-block;background:#1a1a2e;color:#fbbf24;padding:4px 14px;border-radius:6px;font-weight:700;font-size:15px;letter-spacing:1px;">${q.keyword}</span></div><div class="q-input-area"><label>Cavabınız (2-5 söz, böyük hərflərlə)</label><input type="text" class="q-main-input" id="mainInput" value="${val}" placeholder="cavabı yazın..." autocomplete="off" spellcheck="false" oninput="onInput(this.value)" onkeydown="onKeydown(event)"><div class="q-hint-text">💡 2-5 söz, böyük hərflərlə</div><button class="btn-handwriting" onclick="openWritingCanvas(${q.num})" style="margin-top:10px;padding:8px 16px;background:#fbbf24;color:#1a1a2e;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer">✍️ Əl ilə yaz</button></div><div style="background:#f9fafb;padding:12px;border-radius:8px;font-size:13px;color:#555;line-height:1.6;margin-bottom:12px;">${q.sentenceStart} <strong style="color:#1a1a2e;">[___]</strong> ${q.sentenceEnd}</div></div>` ;
container.innerHTML = html;
setTimeout(() = > { const inp = document.getElementById('mainInput'); if(inp){ inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); } }, 50);
} else if(currentModuleId==='part6' ){
const g = mod.gaps[currentQ];
const val = answers[g.num] || '';
let html =  `<div class="q-card"><div class="q-card-header"><div class="q-number">${g.num}</div><div class="q-title">Boşluq üçün cümlə seçin</div></div><div class="q-context">Mətndəki <strong>[${g.num}]</strong> nömrəli boşluğa hansı cümlə uyğundur?</div><ul class="q-options">` ;
Object.entries(sentences).forEach(([letter, text]) = > {
let cls = val===letter ? 'q-option selected' : 'q-option';
html +=  `<li class="${cls}" onclick="selectSentence('${letter}')"><div class="opt-radio"></div><span class="opt-letter">${letter}</span><span class="opt-text">${text}</span></li>` ;
});
html +=  `</ul></div>` ;
container.innerHTML = html;
} else if(currentModuleId==='part7'){
const q = mod.questions[currentQ];
const val = answers[q.num] || '';
const rp = document.getElementById('rightPa nelScroll');
let rhtml =  `<h3 style="font-family:'Merriweather',serif;font-size:15px;color:#1a1a2e;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #1a1a2e;">👤 Şəxslər <span style="font-size:11px;color:#9ca3af;font-weight:400;margin-left:8px;font-family:'Inter',sans-serif;">(kardı klikləyin)</span></h3>` ;
Object.entries(mod.people).forEach(([letter, person]) = > {
let bc='transparent', blc='#1a1a2e', bg='#fff', bs='0 2px 8px rgba(0,0,0,0.05)', lb='#1a1a2e', lc='#fbbf24';
if(val===letter){ bc='#2563eb'; blc='#2563eb'; bg='#eff6ff'; bs='0  4px 12px rgba(37,99,235,0.15)'; lb='#2563eb'; lc='#fff'; }
rhtml +=  `<div onclick="selectPersonFromCard(${q.num},'${letter}')" style="background:${bg};border-radius:10px;padding:14px;margin-bottom:12px;box-shadow:${bs};border:2px solid ${bc};border-left:4px solid ${blc};cursor:pointer;transition:all 0.2s;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;"><span style="display:inline-flex;align-items:center;justify-content:center;background:${lb};color:${lc};width:26px;height:26px;border-radius:50%;font-weight:800;font-size:12px;">${letter}</span><span style="font-weight:700;font-size:14px;color:#1a1a2e;">${person.name}</span></div><div style="font-family:'Merriweather',serif;font-size:12px;line-height:1.6;color:#444;">${person.text}</div></div>` ;
});
rp.innerHTML = rhtml;
}
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
if(btnPrev) btnPrev.disabled = currentQ === 0; 
if(btnNext){
const totalQ = getTotalQuestions(mod);
if(currentQ === totalQ - 1){ btnNext.textContent = 'Modulu Bitir ✓'; btnNext.className = 'nav-btn btn-finish'; }
else { btnNext .textContent = 'Növbəti →'; btnNext.className = 'nav-btn btn-next'; }
}
renderQuestionNumbers();
document.getElementById('moduleNum').textContent = mod.moduleNum;
document.getEleme ntById('moduleTitle').textContent = mod.moduleTitle;
document.getElementById('moduleSubtitle').textContent = mod.moduleSubtitle;
const totalQ = getTotalQuestions(mod);
const answer ed = getAnsweredCount(mod);
document.getElementById('progressFill').style.width = ((answered/totalQ)*100) + '%';
document.getElementById('progressText').textContent =  `${answered}/${totalQ}` ;
}
function getTotalQuestions(mod){ return (mod.questions || mod.gaps || []).length; }
function getAnsweredCount(mod){ const answers = getAnswers(); const items = mod.questions || mod.gaps || []; return items.filter(it => answers[it.num]).length; }
function selectOption(letter){
if(isTransitioning) return;
const mod = getCurrentModule();
const q = mod.questions[currentQ];
const answers = getAnswers();
if(answers[q.num] === letter) return;
answers[q.num] = letter;
saveSession(currentUser);
renderText(); renderQuestion();
clearTimeout(autoAdvanceTimer);
autoAdvanceTimer = setTimeout(() => {
if(currentQ === mod.questions.length - 1) showTransitionConfirmation();
else { currentQ++; renderQuestion(); }
}, 300);
}
function selectSentence(letter){
if(isTransitioning) return;
const mod = getCurrentModule();
const g = mod.gaps[currentQ];
const answers = getAnswers();
if(answers[g.num] === letter) return;
answers[g.num] = letter;
saveSession(currentUser);
renderText(); renderQuestion();
clearTimeout(autoAdvanceTimer);
autoAdvanceTimer = setTimeout(() => {
if(currentQ === mod.gaps.length - 1) showTransitionConfirmation();
else { currentQ++; renderQuestion(); }
}, 300);
}
function selectPerson(qNum, letter){
const answers = getAnswers();
if(answers[qNum] === letter) return;
answers[qNum] = letter;
saveSession(currentUser);
renderText(); renderQuestion();
const mod = getCurrentModule();
clearTimeout(autoAdvanceTimer);
autoAdvanceTimer = setTimeout(() => {
if(currentQ === mod.questions.length - 1) showTransitionConfirmation();
else { currentQ++; renderText(); renderQuestion(); }
}, 400);
}
function selectPersonFromCard(q, l){ selectPerson(q, l); }
function onInput(val){
const mod = getCurrentModule();
const num = (mod.questions || mod.gaps)[currentQ].num;
const answers = getAnswers();
answers[num] = val;
saveSession(currentUser);
renderText();
}
function onKeydown(e){ if(e.key === 'Enter'){ e.preventDefault(); nextQuestion(); } }
function nextQuestion(){
const mod = getCurrentModule();
const totalQ = getTotalQuestions(mod);
if(currentQ === totalQ - 1) showTransitionConfirmation();
else { currentQ++; renderQuestion(); if(currentModuleId === 'part7') renderText(); }
}
function prevQuestion(){
clearTimeout(autoAdvanceTimer);
if(currentQ > 0){ currentQ--; renderQuestion(); if(currentModuleId === 'part7') renderText(); }
}
function getNextModuleId(){
const examParts = EXAMS[currentExamId].parts;
const curIdx = examParts.indexOf(currentModuleId);
if(curIdx < examParts.length - 1) return examParts[curIdx + 1];
return null;
}
function showTransitionConfirmation(){
const mod = getCurrentModule();
const totalQ = getTotalQuestions(mod);
const answered = getAnsweredCount(mod);
const nextId = getNextModuleId ();
document.getElementById('statAnswered').textContent = answered;
document.getElementById('statRemaining').textContent = totalQ - answered;
document.getElementById('statModule'). textContent =  `${mod.moduleNum}/7` ;
if(nextId){
const nextMod = MODULES[nextId];
document.getElementById('tTitle').textContent =  `Part ${mod.moduleNum} Tamamlandı!` ;
document.getElementById('tText').textContent =  `Part ${mod.moduleNum}-i bitirdiniz. Part ${nextMod.moduleNum}-yə keçmək istəyirsiniz?` ;
document.getElementById('btnContinue').textContent =  `Part ${nextMod.moduleNum}-yə Keç →` ;
document.getElementById('btnContinue').onclick = continueToNext;
} else {
document.getElementById('tTitle').textContent =  `İmtahan Tamamlandı!` ;
document.getElementById('tText').textContent =  `Bütün partlar tamamlandı! Nəticələri görmək istəyirsiniz?` ;
document.getElementById('btnContinue').textContent = 'Nəticələri Gör →';
document.getElementById('btnContinue').onclick = showFinalResults;
}
document.getElementById('transitionS creen').classList.add('show');
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
pointsData. forEach(p = > {
if(!pointsMap[p.part_id]) pointsMap[p.part_id] = {};
pointsMap[p.part_id][p.question_num] = p.points;
});
let totalCorrect = 0, totalPoints = 0, earnedPoints = 0, totalQ = 0;
c onst breakdown = [], review = [];
for(const pid of exam.parts){
const m = MODULES[pid];
const answers = currentUser.answers?.[currentExamId]?.[pid] || {};
const items = m.questions  || m.gaps || [];
let pCorrect = 0, pEarned = 0;
for(const it of items){
totalQ++;
const pt = pointsMap[pid]?.[it.num] ?? 1;
totalPoints += pt;
let correct = false;
if(m.questions  & & m.questions.includes(it)) correct = answers[it.num] === it.answer;
else if(m.gaps  & & m.gaps.includes(it)) correct = normalizeAnswer(answers[it.num]) === it.answer;
if(correct){ pCorrect++; pEarned += pt; totalCorrect++; }
review.push({ part: pid, num: it.num, use rAns: answers[it.num] || '—', correct: correct, answer: it.answer, points: pt, earned: correct ? pt : 0, given: it.given, personName: pid === 'part7' ? m.people[it.answer]?.name :  null, explanation: it.explanation });
}
breakdown.push({ label:  `Part ${m.moduleNum}` , score: pCorrect, total: items.length, points: pEarned, maxPoints: items.reduce((s, it) = > s + (pointsMap[pid]?.[it.num] ?? 1), 0) });
earnedPoints += pEarned;
}
const pct = totalPoints  > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
let grade, gradeText;
if(pct  >= 90){ grade = 5; gradeText = 'Əla'; }
else if(pct  >= 75){ grade = 4; gradeText = 'Yaxşı'; }
else if(pct  >= 60){ grade = 3; gradeText = 'Orta'; }
else if(pct  >= 40){ grade = 2; gradeText = 'Qənaətbəxş'; }
else { grade = 1; gradeText = 'Qeyri-qənaətbəxş'; }
const scoreRecord = await dbInsert('scores', { user_id: currentUser.id, exam_id:  currentExamId, total_points: earnedPoints, max_points: totalPoints, percent: pct, correct_count: totalCorrect, total_questions: totalQ, grade: grade, grade_text: gradeText });
if(s coreRecord){
const answerRecords = review.map(r = > ({ score_id: scoreRecord.id, part_id: r.part, question_num: r.num, user_answer: r.userAns, correct_answer: r.answer, is_correct: r.correct, points: r.earned, max_points: r.points  }));
if(answerRecords.length  > 0) await apiPost('answers', answerRecords);
}
if(!currentUser.scores) currentUser.scores = {};
currentUser.scores[currentExamId] = { correct: totalCorrect, total: totalQ, points:  earnedPoints, maxPoints: totalPoints, percent: pct, grade: grade, gradeText: gradeText, date: Date.now(), breakdown: breakdown, review: review };
saveSession(currentUser);
let emo ji, msg;
if(pct  >= 90){ emoji = '🏆'; msg = 'Mükəmməl nəticə!'; }
else if(pct  >= 75){ emoji = '🎉'; msg = 'Əla iş!'; }
else if(pct  >= 60){ emoji = '💪'; msg = 'Yaxşı nəticə!'; }
else if(pct  >= 40){ emoji = '📚'; msg = 'Orta səviyyə.'; }
else { emoji = '💪'; msg = 'Daha çox çalışın!'; }
document.getElementById('rEmoji').textContent = emoji;
document.getElementById('rTi tle').textContent = 'İmtahan Tamamlandı!';
document.getElementById('rScore').textContent =  `${earnedPoints}` ;
document.getElementById('rTotal').textContent =  `${totalPoints} bal (${pct}%)` ;
document.getElementById('rMsg').textContent =  `${msg} Qiymət: ${grade} (${gradeText})` ;
let bhtml = '';
breakdown.forEach(b = > { bhtml +=  `<div class="breakdown-item"><div class="b-label">${b.label}</div><div class="b-score"><span>${b.points}</span>/${b.maxPoints}</div></div>` ; });
document.getElementById('rBreakdown').innerHTML = bhtml;
let rhtml = '';
exam.parts.forEach(pid = > {
const m = MODULES[pid];
const partReview = review.filter(r = > r.part === pid);
rhtml +=  `<div class="final-review-section"><h4>Part ${m.moduleNum} — ${partReview.filter(r => r.correct).length}/${partReview.length}</h4>` ;
partReview.forEach(r = > {
rhtml +=  `<div class="final-review-item ${r.correct ? 'correct' : 'incorrect'}"><span class="fr-num">${r.num}</span><span class="fr-icon">${r.correct ? '✅' : '❌'}</span>` ;
if(r.correct) rhtml +=  `<span class="fr-user" style="color:#16a34a">${r.answer}${r.personName ? ' — ' + r.personName : ''}</span>` ;
else rhtml +=  `<span class="fr-user wrong">${r.userAns}</span><span style="color:#999">→</span><span class="fr-correct">${r.answer}${r.personName ? ' — ' + r.personName : ''}</span><div style="font-size:11px;color:#f59e0b;margin-top:4px">💡 ${r.explanation || ''}</div>` ;
rhtml +=  `</div>` ;
});
rhtml +=  `</div>` ;
});
document.getElementById('finalReview').innerHTML = rhtml;
document.getElementById('resultsScreen').classList.add('show');
stopTimer();
}
async function showCarnet(){
document.getElementById('resultsScreen').classList.remove('show');
document.getElementById('examPage').classList.add('hidden');
document.getElementById('carnetPage').classList.remove('hidden');
hideExamNavButtons();
let examId = currentExamId;
if(!examId){
const scores = await dbQuery('scores', { user_id: currentUser.id });
if(scores.length > 0) examId = scores[scores.length - 1].exam_id;
}
if(!examId){ alert('Nəticə tapılmadı!'); backToExams(); return; }
currentExamId = examId;
const scores = await dbQuery('scores', { user_id: currentUser.id, exam_id: examId });
if(scores.length === 0){ alert('Nəticə tapılmadı!'); backToExams(); return; }
const score = scores[0];
const answers = await dbQuery('answers', { score_id: score.id });
const exam = EXAMS[examId];
const date = new Date(score.created_at).toLocaleString('az-AZ');
let html = `<div class="carnet-card"><div class="carnet-header"><div class="school">CAMBRIDGE FCE PLATFORM</div><h1> NƏTİCƏ VƏRƏQİ</h1><div style="font-size:14px;color:#6b7280;margin-top:6px">${exam.title}</div></div><div class="carnet-student"><div><strong>Ad Soyad:</strong> ${currentUser.name}</div><div><strong>Email:</strong> ${currentUser.email}</div><div><strong>Tarix:</strong> ${date}</div></div><div class="carnet-total"><div class="total-label">Nəticə</div><div class="grade-badge grade-${score.grade}" style="font-size:24px">${score.total_points}/${score.max_points} (${score.percent}%)</div></div><table class="carnet-table"><thead><tr><th>Part</th><th>Sual</th><th>Cavab</th><th>Düzgün</th><th>Bal</th></tr></thead><tbody>`;
answers.forEach(a => {
const m = MODULES[a.part_id];
const rowClass = a.is_correct ? 'correct-row' : 'incorrect-row';
// ✅ 4. ƏL İLƏ YAZILAN CAVABLARIN GÖSTƏRİLMƏSİ (SVG/Kiçik formatda)
let answerCell = a.user_answer || '—';
if(a.handwriting_svg){
answerCell = `<div style="text-align:center"><svg viewBox="0 0 400 150" style="width:100px;height:38px;border:1px solid #e5e7eb;border-radius:4px;background:#fff">${a.handwriting_svg}</svg></div>`;
} else if(a.handwriting_data){
// Əgər köhnə base64 formatdırsa
answerCell = `<div style="text-align:center"><img src="${a.handwriting_data}" style="max-width:100px;max-height:40px;border:1px solid #e5e7eb;border-radius:4px" /></div>`;
}
html += `<tr class="${rowClass}"><td>Part ${m.moduleNum}</td><td>${a.question_num}</td><td>${answerCell}</td><td>${a.correct_answer}</td><td><strong>${a.points}/${a.max_points}</strong></td></tr>`;
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
function switchAdminTab(tab){
document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
event.target.classList.add('active');
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
for(let i = 1; i <= pdf.numPages; i++){
const page = await pdf.getPage(i);
const textContent = await page.getTextContent();
const pageText = textContent.items.map(item => item.str).join(' ');
fullText += pageText + '\n';
}
statusEl.textContent = `✅ PDF uğurla oxundu! (${pdf.numPages} səhifə, ${fullText.length} simvol)`;
parsePDFAndCreateExam(fullText);
} catch(err){
console.error(err);
statusEl.textContent = '❌ Xəta: PDF oxuna bilmədi.';
}
}
function parsePDFAndCreateExam(text) {
console.log('PDF mətni:', text);
if (!text || text.trim().length === 0) {
alert('❌ PDF-dən mətn çıxarıla bilmədi. Fayl düzgün formatda deyil.');
return;
}
const preview = text.substring(0, 1000);
console.log('İlk 1000 simvol:', preview);
const message = `✅ PDF uğurla oxundu!\n\n` +
`📝 Mətn uzunluğu: ${text.length} simvol\n\n` +
`📋 İlk 500 simvol:\n${preview.substring(0, 500)}...\n\n` +
`⚠️ Qeyd: Tam avtomatik PDF parsing hələ hazırlanmayıb.\n` +
`İmtahanı manual olaraq əlavə etmək üçün "İmtahanlar" bölməsindən istifadə edin.`;
alert(message);
}
async function renderAdminUsers(){
const tbody = document.getElementById('usersTableBody');
const users = await dbQuery('users');
tbody.innerHTML = '';
for(const u of users){
const  scores = await dbQuery('scores', { user_id: u.id });
const completed = scores.length;
const totalEarned = scores.reduce((sum, s) = > sum + (s.total_points || 0), 0);
const totalMax = scores.reduce((sum, s) = > sum + (s.max_points || 0), 0);
const balText = completed  > 0 ?  `${totalEarned}/${totalMax}`  : '—';
const tr = document.createElement('tr');
tr.innerHTML =  `<td>${u.name}</td><td>${u.email}</td><td><span class="user-role ${u.role==='admin' ? 'role-admin' : u.role==='marker' ? 'role-marker' : 'role-student'}">${u.role}</span></td><td>${completed} imtahan</td><td><strong style="color:#1a1a2e">${balText}</strong></td><td>${u.role !== 'admin' ?` <button class= "btn-sm btn-view " onclick= "viewUserAnswers('${u.email}') " >Cavablar </button > <button class= "btn-sm btn-del " onclick= "deleteUser('${u.email}') " >Sil </button > `: ''}</td>` ;
tbody.appendChild(tr);
}
}
async function deleteUser(email){
if(email === 'admin@fce.com'){ alert('Admin silinə bilməz!'); return; }
if(!confirm('Bu istifadəçini silmək istədiyinizə əminsiniz?')) return;
const users = await dbQuery('users', { email: email });
if(users.length > 0) await dbDelete('users', users[0].id);
renderAdminUsers();
}
async function viewUserAnswers(email){
const users = await dbQuery('users', { email: email });
if(users.length === 0) return;
const user = users[0];
const scores = await dbQuery('s cores', { user_id: user.id });
if(scores.length === 0){ alert('Bu istifadəçinin hələ nəticəsi yoxdur.'); return; }
let html =  `<div style="padding:20px"><h4 style="margin-bottom:16px;color:#1a1a2e">${user.name} — Cavablar</h4>` ;
for(const sc of scores){
const exam = EXAMS[sc.exam_id];
const answers = await dbQuery('answers', { score_id: sc.id });
html +=  `<div style="margin-bottom:16px;padding:12px;background:#fff;border-radius:8px;border:1px solid #e5e7eb"><strong>${exam?.title || sc.exam_id}</strong> — ${sc.total_points}/${sc.max_points} bal (${sc.percent}%) — Qiymət: ${sc.grade}<br><small>${new Date(sc.created_at).toLocaleString('az-AZ')}</small>` ;
if(answers.length  > 0){
html +=  `<div style="margin-top:10px;max-height:300px;overflow-y:auto">` ;
answers.forEach(a = > {
let answerDisplay = a.user_answer || '—';
// Əl ilə yazılan cavabları göstər
if(a.handwriting_svg){
answerDisplay = `<svg viewBox="0 0 400 150" style="width:80px;height:30px;vertical-align:middle;border:1px solid #e5e7eb;border-radius:4px">${a.handwriting_svg}</svg>`;
} else if(a.handwriting_data){
answerDisplay = `<img src="${a.handwriting_data}" style="max-width:80px;max-height:30px;vertical-align:middle;border:1px solid #e5e7eb;border-radius:4px" />`;
}
html +=  `<div style="display:flex;justify-content:space-between;padding:6px;border-bottom:1px solid #e5e7eb;font-size:13px"><span style="font-weight:700;min-width:60px">${a.part_id}#${a.question_num}</span><span style="flex:1;color:${a.is_correct ? '#16a34a' : '#dc2626'};${a.is_correct ? '' : 'text-decoration:line-through'}">${answerDisplay}</span><span style="color:#16a34a;font-weight:700">${a.correct_answer} (${a.points}/${a.max_points})</span></div>` ;
});
html +=  `</div>` ;
}
html +=  `</div>` ;
}
html +=  `</div>` ;
const w = window.open('', '_blank', 'width:700,height:600');
w.document.write( `<html><head><title>${user.name} — Cavablar</title><style>body{font-family:Inter,sans-serif;padding:0;background:#f0f0eb}</style></head><body>${html}</body></html>` );
}
function renderAdminExams(){
const tbody = document.getElementById('examsTableBody');
tbody.innerHTML = '';
Object.values(EXAMS).forEach(exam => {
const totalQ = exam.parts.reduce((s, pid) => s + (MODULES[pid].questions?.length || MODULES[pid].gaps?.length || 0), 0);
const tr = document.createElement('tr');
tr.innerHTML = `<td><strong>${exam.id}</strong></td><td>${exam.title}</td><td>${exam.parts.length} Part</td><td>${totalQ} sual</td>`;
tbody.appendChild(tr);
});
}
function renderPointsExamSelect(){
const sel = document.getElementById('pointsExamSelect');
sel.innerHTML = '';
Object.values(EXAMS).forEach(exam => { sel.innerHTML += `<option value="${exam.id}">${exam.title}</option>`; });
renderPointsEditor();
}
async function renderPointsEditor(){
const examId = document.getElementById('pointsExamSelect').value;
const exam = EXAMS[examId];
const pointsData = await dbQuery('exam_points', { exam_id: examId });
const pointsMap = {};
pointsData.forEach(p => {
if(!pointsMap[p.part_id]) pointsMap[p.part_id] = {};
pointsMap[p.part_id][p.question_num] = p.points;
});
const container = document.getElementById('pointsEditor');
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
if(student s.length === 0){ container.innerHTML = ' <div class= "no-data " >Heç bir şagird yoxdur </div >'; return; }
let html = ' <div style= "display:grid;gap:16px " >';
for(const user of students){
const scores = await dbQuery('scores', { user_id: user.id });
const totalPoints = scores.reduce((sum, s) = > sum + (s.total_points || 0), 0);
const maxPoints = scores.reduce((sum, s) = > sum + (s.max_points || 0), 0);
html +=  `<div style="background:#f9fafb;padding:16px;border-radius:10px;border-left:4px solid #2563eb"> <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"> <strong style="font-size:16px">${user.name}</strong> <span style="font-size:13px;color:#666">${user.email}</span> </div> <div style="font-size:13px;color:#666;margin-bottom:8px">Tamamlanan imtahan: ${scores.length} • Ümumi bal: <strong style="color:#1a1a2e">${totalPoints}/${maxPoints}</strong></div>` ;
if(scores.length  > 0){
html +=  `<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">` ;
scores.forEach(sc = > {
const exam = EXAMS[sc.exam_id];
html +=  `<button class="btn-sm btn-view" onclick="viewCarnetFromAdmin('${user.email}','${sc.exam_id}')">📜 ${exam?.title || sc.exam_id} — ${sc.total_points}/${sc.max_points} (${sc.percent}%)</button>` ;
});
html +=  `</div>` ;
} else {
html +=  `<div style="margin-top:10px;font-size:13px;color:#9ca3af;font-style:italic">Hələ nəticə yoxdur</div>` ;
}
html +=  `</div>` ;
}
html += ' </div >';
container.innerHTML = html;
}
async function viewCarnetFromAdmin(email, examId){
const users = await dbQuery('users', { email: email });
if(users.length === 0) return;
const user = users[0];
const scores = awai t dbQuery('scores', { user_id: user.id, exam_id: examId });
if(scores.length === 0) return;
const score = scores[0];
const answers = await dbQuery('answers', { score_id: score.id } );
const exam = EXAMS[examId];
const date = new Date(score.created_at).toLocaleString('az-AZ');
const isMarker = currentUser  & & currentUser.role === 'marker';
const isAdmin = currentUser  & & currentUser.role === 'admin';
const canEdit = isMarker || isAdmin;
let html =  `<div style="padding:20px"> <div style="background:#fff;border-radius:16px;padding:30px;box-shadow:0 4px 20px rgba(0,0,0,0.1)"> <div style="text-align:center;border-bottom:3px double #1a1a2e;padding-bottom:20px;margin-bottom:24px"> <div style="font-size:12px;color:#6b7280;letter-spacing:2px;text-transform:uppercase">CAMBRIDGE FCE PLATFORM — ${canEdit ? 'Marker/Admin' : 'Admin'} baxış</div> <h1 style="font-family:Merriweather,serif;color:#1a1a2e">📜 NƏTİCƏ VƏRƏQİ</h1> <div style="font-size:14px;color:#6b7280;margin-top:6px">${exam.title}</div> </div> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;padding:16px;background:#f9fafb;border-radius:10px"> <div><strong>Ad:</strong> ${user.name}</div> <div><strong>Email:</strong> ${user.email}</div> <div><strong>Tarix:</strong> ${date}</div> <div><strong>Nəticə:</strong> <span id="carnetTotalDisplay">${score.total_points}/${score.max_points} (${score.percent}%)</span></div> </div> <div style="background:linear-gradient(135deg,#1a1a2e,#2d2d4e);color:#fff;padding:24px;border-radius:12px;text-align:center;margin-bottom:24px"> <div style="font-size:14px;opacity:0.8;margin-bottom:8px">Yekun Nəticə</div> <div id="carnetGradeBadge" style="display:inline-block;padding:16px 32px;border-radius:12px;font-size:28px;font-weight:900;background:#dc2626;color:#fff">${score.total_points}/${score.max_points} (${score.percent}%)</div> </div> <table style="width:100%;border-collapse:collapse" id="carnetTable"> <thead> <tr> <th style="padding:12px;text-align:left;background:#1a1a2e;color:#fbbf24;font-weight:700">Part</th> <th style="padding:12px;text-align:left;background:#1a1a2e;color:#fbbf24;font-weight:700">Sual</th> <th style="padding:12px;text-align:left;background:#1a1a2e;color:#fbbf24;font-weight:700">Cavab</th> <th style="padding:12px;text-align:left;background:#1a1a2e;color:#fbbf24;font-weight:700">Düzgün</th> <th style="padding:12px;text-align:left;background:#1a1a2e;color:#fbbf24;font-weight:700">Status</th> <th style="padding:12px;text-align:left;background:#1a1a2e;color:#fbbf24;font-weight:700">Bal</th> </tr> </thead> <tbody>` ;
answers.forEach((a, idx) = > {
const m = MODULES[a.part_id];
// Əl ilə yazılan cavabları göstər
let answerDisplay = a.user_answer || '—';
if(a.handwriting_svg){
answerDisplay = `<svg viewBox="0 0 400 150" style="width:100px;height:38px;border:1px solid #e5e7eb;border-radius:4px;background:#fff">${a.handwriting_svg}</svg>`;
} else if(a.handwriting_data){
answerDisplay = `<img src="${a.handwriting_data}" style="max-width:100px;max-height:40px;border:1px solid #e5e7eb;border-radius:4px" />`;
}
html +=  `<tr style="background:${a.is_correct ? '#dcfce7' : '#fee2e2'}" id="reviewRow_${idx}"> <td style="padding:12px;border-bottom:1px solid #e5e7eb">Part ${m.moduleNum}</td> <td style="padding:12px;border-bottom:1px solid #e5e7eb">${a.question_num}</td> <td style="padding:12px;border-bottom:1px solid #e5e7eb">${answerDisplay}</td> <td style="padding:12px;border-bottom:1px solid #e5e7eb">${a.correct_answer}</td> <td style="padding:12px;border-bottom:1px solid #e5e7eb">${a.is_correct ? '✅ Düzgün' : '❌ Səhv'}</td> <td style="padding:12px;border-bottom:1px solid #e5e7eb">` ;
if(canEdit){
html +=  `<input type="number" class="marker-score-input" data-idx="${idx}" data-answer-id="${a.id}" data-score-id="${score.id}" data-user-email="${email}" data-exam="${examId}" value="${a.points}" min="0" max="${a.max_points}" step="0.5" style="width:70px;padding:6px;border:2px solid #e5e7eb;border-radius:6px;text-align:center;font-weight:700" onchange="window.opener.updateReviewScore(this)"><span style="font-size:11px;color:#666">/${a.max_points}</span>` ;
} else {
html +=  `<strong>${a.points}/${a.max_points}</strong>` ;
}
html +=  `</td></tr>` ;
});
html +=  `</tbody></table>` ;
if(canEdit){
html +=  `<div style="margin-top:20px;text-align:center"> <button onclick="window.opener.recalculateAndSaveScore('${email}','${examId}','${score.id}')" style="padding:14px 32px;background:#16a34a;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif">💾 Balları Yenilə və Yadda Saxla</button> <p style="font-size:12px;color:#666;margin-top:8px">⚠️ Diqqət: Bu əməliyyat şagirdin ümumi balını və qiymətini yeniləyəcək.</p> </div>` ;
}
html +=  `</div></div>` ;
const w = window.open('', '_blank', 'width=900,height:800');
w.document.write( `<html><head><title>NƏTİCƏ VƏRƏQİ — ${user.name}</title><style>body{font-family:'Inter',sans-serif;padding:0;background:#f0f0eb}</style></head><body>${html}</body></html>` );
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
let totalEarned = 0, totalMax = 0, correctCount = 0 ;
answers.forEach(a = > {
totalMax += (a.max_points || 1);
totalEarned += (a.points || 0);
if(a.is_correct) correctCount++;
});
const pct = totalMax  > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
let grade, gradeText;
if(pct  >= 90){ grade = 5; gradeText = 'Əla'; }
else if(pct  >= 75){ grade = 4; gradeText = 'Yaxşı'; }
else if(pct  >= 60){ grade = 3; gradeText = 'Orta'; }
else if(pct  >= 40){ grade = 2; gradeText = 'Qənaətbəxş'; }
else { grade = 1; gradeText = 'Qeyri-qənaətbəxş'; }
await dbUpdate('scores', scoreId, {
total_points: totalEarned, max_points: totalM ax, percent: pct,
correct_count: correctCount, grade: grade, grade_text: gradeText,
marker_edited: true, marker_name: currentUser?.name || 'Marker',
marker_edited_at: new Date().to ISOString()
});
try {
const openerDoc = window.opener?.document;
if(openerDoc){
const totalDisplay = openerDoc.getElementById('carnetTotalDisplay');
if(totalDisplay) totalDisplay.t extContent =  `${totalEarned}/${totalMax} (${pct}%)` ;
const gradeBadge = openerDoc.getElementById('carnetGradeBadge');
if(gradeBadge){
const colors = {5:'#16a34a', 4:'#2563eb', 3:'#fbbf24', 2:'#f97316', 1:'#dc2626'};
gradeBadge.styl e.background = colors[grade] || '#dc2626';
gradeBadge.style.color = grade === 3 ? '#1a1a2e' : '#fff';
gradeBadge.textContent =  `${totalEarned}/${totalMax} (${pct}%)` ;
}
if(openerDoc.getElementById('adminResults')?.classList.contains('active')) openerDoc.renderStudentResultsList();
if(openerDoc.getElementById('markerStudentList')){ openerDoc.re nderMarkerStudentList(); openerDoc.renderMarkerStats(); }
}
} catch(e){ console.error('UI yeniləmə xətası:', e); }
alert( `✅ Yaddaşa verildi!\n\nYeni bal: ${totalEarned}/${totalMax} (${pct}%)\nQiymət: ${grade} (${gradeText})` );
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
if(markers.length === 0){  container.innerHTML = ' <div class= "no-data " >Heç bir marker yoxdur </div >'; return; }
let html = ' <h4 style= "margin-bottom:12px " >Aktiv Markerlər: </h4 > <div style= "display:grid;gap:8px " >';
markers.forEach(m = > {
html +=  `<div style="background:#fef3c7;padding:12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center"><span><strong>${m.name}</strong> <span style="font-size:12px;color:#666">(${m.email})</span></span><button class="btn-sm btn-del" onclick="removeMarker('${m.email}')">Markerlikdən Çıxar</button></div>` ;
});
html += ' </div >';
container.innerHTML = html;
}
async function removeMarker(email){
if(!confirm('Bu istifadəçini markerlikdən çıxarmaq istədiyinizə əminsiniz?')) return;
const users = await dbQuery('users', { email: email });
if(users.length === 0) return;
await dbUpdate('users', users[0].id, { role: 'student' });
renderMarkersList(); renderMarkerUserSelect(); renderAdminUsers();
}
// ✅ 5. ƏL İLƏ YAZMA ÜÇÜN SVG DESTEYI
let currentCanvasNum = null;
function openWritingCanvas(num){
currentCanvasNum = num;
const modal = document.createElement('div');
modal.id = 'writingModal';
modal.className = 'writing-modal';
modal.innerHTML = `<div class="writing-modal-content"><h3>✍️ Sual ${num} — Əl ilə cavab yazın</h3><canvas id="writingCanvas" width="400" height="150" style="border:2px solid #1a1a2e;border-radius:8px;background:#fff;cursor:crosshair"></canvas><div class="writing-controls"><button onclick="clearWritingCanvas()" class="btn-clear">🗑️ Təmizlə</button><button onclick="saveWritingCanvasSVG()" class="btn-save">💾 SVG olaraq yadda saxla</button><button onclick="closeWritingCanvas()" class="btn-close">✖ Bağla</button></div><p style="font-size:12px;color:#666;margin-top:10px">💡 Qeyd: SVG formatında yadda saxlanılacaq (az yer tutur)</p></div>`;
document.body.appendChild(modal);
setTimeout(() => {
const canvas = document.getElementById('writingCanvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#1a1a2e';
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
let drawing = false;
let lastX = 0, lastY = 0;
function getPos(e){
const rect = canvas.getBoundingClientRect();
const clientX = e.touches ? e.touches[0].clientX : e.clientX;
const clientY = e.touches ? e.touches[0].clientY : e.clientY;
return { x: (clientX - rect.left) * (canvas.width / rect.width), y: (clientY - rect.top) * (canvas.height / rect.height) };
}
canvas.addEventListener('mousedown', (e) => { drawing = true; const pos = getPos(e); lastX = pos.x; lastY = pos.y; });
canvas.addEventListener('mousemove', (e) => { if(!drawing) return; const pos = getPos(e); ctx.beginPath(); ctx.moveTo(lastX, lastY); ctx.lineTo(pos.x, pos.y); ctx.stroke(); lastX = pos.x; lastY = pos.y; });
canvas.addEventListener('mouseup', () => { drawing = false; });
canvas.addEventListener('mouseout', () => { drawing = false; });
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); drawing = true; const pos = getPos(e); lastX = pos.x; lastY = pos.y; });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if(!drawing) return; const pos = getPos(e); ctx.beginPath(); ctx.moveTo(lastX, lastY); ctx.lineTo(pos.x, pos.y); ctx.stroke(); lastX = pos.x; lastY = pos.y; });
canvas.addEventListener('touchend', () => { drawing = false; });
}, 100);
}
// SVG olaraq yadda saxla (az yer tutur)
function saveWritingCanvasSVG(){
const canvas = document.getElementById('writingCanvas');
const answers = getAnswers();
const num = currentCanvasNum;
// Canvas-dan SVG-yə çevir
const svgData = canvasToSVG(canvas);
const existingVal = answers[num] || '';
answers[num] = { text: typeof existingVal === 'object' ? existingVal.text : existingVal, handwriting_svg: svgData };
saveSession(currentUser);
closeWritingCanvas();
renderQuestion();
alert('✅ Əl ilə yazılan cavab SVG formatında yadda saxlanıldı!');
}
// Canvas-dan SVG-ə çevirən funksiya
function canvasToSVG(canvas) {
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const imageData = ctx.getImageData(0, 0, width, height);
const data = imageData.data;
let paths = [];
let inPath = false;
let pathData = '';
for(let y = 0; y < height; y += 2) {
for(let x = 0; x < width; x += 2) {
const i = (y * width + x) * 4;
const alpha = data[i + 3];
if(alpha > 128) {
if(!inPath) {
pathData += `M ${x} ${y} `;
inPath = true;
} else {
pathData += `L ${x} ${y} `;
}
} else {
if(inPath) {
paths.push(`<path d="${pathData.trim()}" fill="none" stroke="#1a1a2e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`);
pathData = '';
inPath = false;
}
}
}
}
if(inPath && pathData.trim()) {
paths.push(`<path d="${pathData.trim()}" fill="none" stroke="#1a1a2e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`);
}
return paths.join('');
}
function clearWritingCanvas(){
const canvas = document.getElementById('writingCanvas');
const ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function closeWritingCanvas(){
const modal = document.getElementById('writingModal');
if(modal) modal.remove();
}
initDB().then(() => { if(currentUser) enterApp(); });