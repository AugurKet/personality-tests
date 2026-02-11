// =============================
// 恋爱人格测试（甜甜版）
// 6种类型：SUN / MARSH / ROSE / CAT / BUNNY / SEA
// 15题，4选项，每题给某类型 +2
// 结果页：主类型、次类型、百分比条、最佳匹配、分享文案
// =============================

const TYPES = {
  SUN: "小太阳",
  MARSH: "棉花糖",
  ROSE: "玫瑰刺",
  CAT: "猫系",
  BUNNY: "兔系",
  SEA: "海盐系",
};

const TYPE_INFO = {
  SUN: {
    emoji: "☀️",
    name: "小太阳型恋人",
    tagline: "你把爱变成能量，越爱越亮～",
    vibe: "热情主动、表达直接、很会制造仪式感。",
    need: "被回应、被肯定、一起体验生活的快乐。",
    strengths: ["会主动表达爱意", "气氛担当，恋爱感强", "遇事愿意沟通解决"],
    blindspots: ["期待值高时会失落", "容易把对方当‘全世界’", "情绪起伏明显但来得快去得也快"],
    tips: ["把需求说具体：我想你抱抱/我想你陪我吃饭", "给彼此一点私人时间", "学会把快乐分散到生活，不全压在爱情上"],
    quote: "我是☀️小太阳型恋人：爱就要大声说出来！你敢不敢接住我的甜？",
    match: ["CAT", "SEA"],
    matchTip: "猫系/海盐系会给你稳定的回应与空间，你的热情会把他们融化～",
  },
  MARSH: {
    emoji: "🍡",
    name: "棉花糖型恋人",
    tagline: "软软的、甜甜的、让人想抱住。",
    vibe: "温柔体贴、共情力强、擅长照顾人感受。",
    need: "安全感、温柔的确定性、稳定的陪伴。",
    strengths: ["很会照顾对方情绪", "细节满分，温柔耐心", "愿意一起经营关系"],
    blindspots: ["容易委屈自己不说", "害怕冲突，选择忍", "过度投入会焦虑"],
    tips: ["练习把界限说出来：我也需要…", "冲突不是坏事，是对齐需求", "把‘照顾别人’留一部分给自己"],
    quote: "我是🍡棉花糖型恋人：想把我的温柔分你一半，你愿意慢慢靠近我吗？",
    match: ["SUN", "BUNNY"],
    matchTip: "小太阳会带你发光，兔系会用同频温柔把你稳稳接住。",
  },
  ROSE: {
    emoji: "🌹",
    name: "玫瑰刺型恋人",
    tagline: "外冷内热，喜欢你但不想太明显。",
    vibe: "标准高、很有原则、嘴硬心软。",
    need: "尊重、可靠、被认真对待。",
    strengths: ["爱得很认真", "边界清晰，不乱来", "关键时刻很可靠"],
    blindspots: ["不擅长示弱", "会用‘冷’保护自己", "容易误会对方不够在乎"],
    tips: ["用一句软话替代冷处理：我需要一点时间", "把期待讲清楚，不让对方猜", "给对方正反馈：你这样我很安心"],
    quote: "我是🌹玫瑰刺型恋人：我不轻易心动，但心动就很认真。",
    match: ["WARMER_NOT_EXIST"], // placeholder, will map later
    matchTip: "（小彩蛋）你适合‘稳定又主动’的类型：既尊重你，也愿意靠近你。",
  },
  CAT: {
    emoji: "🐱",
    name: "猫系型恋人",
    tagline: "需要空间，也会在意你的小情绪。",
    vibe: "慢热、含蓄、喜欢舒服自然的相处。",
    need: "空间感、被理解、不被控制。",
    strengths: ["相处舒服，不黏不闹", "情绪稳定，能给安全感", "爱在细节里，低调但长情"],
    blindspots: ["表达少，容易让人误会冷淡", "不喜欢被逼问", "生气会选择静音"],
    tips: ["给对方一点‘可见的在乎’：一句晚安也很甜", "把沉默换成说明：我不是不爱，是需要充电", "约定冲突规则：先暂停再复盘"],
    quote: "我是🐱猫系型恋人：我不太会说甜话，但我会把偏爱留给你。",
    match: ["SUN", "MARSH"],
    matchTip: "小太阳会把你带出壳，棉花糖会温柔到你愿意靠近～",
  },
  BUNNY: {
    emoji: "🐰",
    name: "兔系型恋人",
    tagline: "可爱敏感，需要被抱抱的那种。",
    vibe: "细腻、黏人一点点、很看重回应。",
    need: "被在乎的确认、稳定的联系、情绪安抚。",
    strengths: ["恋爱投入度高", "很会撒娇制造甜度", "对关系很用心"],
    blindspots: ["容易想太多", "消息晚回会焦虑", "把情绪憋成小委屈"],
    tips: ["用‘需求句’替代‘情绪句’：我想你多陪我", "给自己设一个‘冷静10分钟’", "把生活重心留给自己一点点"],
    quote: "我是🐰兔系型恋人：我不需要你完美，只想要你偏爱我一点点。",
    match: ["SEA", "SUN"],
    matchTip: "海盐系能安抚你，小太阳能给你高频甜度与安全确认。",
  },
  SEA: {
    emoji: "🧂🌊",
    name: "海盐系型恋人",
    tagline: "温柔克制，稳定得像拥抱。",
    vibe: "理性温柔、慢慢爱、但一旦认定就很稳。",
    need: "稳定、信任、彼此有边界的陪伴。",
    strengths: ["情绪稳定，能兜住关系", "不轻易说分开", "行动派的在乎：做给你看"],
    blindspots: ["不太会浪漫表达", "习惯自己扛", "被误会时会沉默"],
    tips: ["把爱说出来：我在乎你", "偶尔制造小仪式，甜度会翻倍", "遇到问题先说感受再说方案"],
    quote: "我是🧂🌊海盐系恋人：我不轰轰烈烈，但我会一直在你身边。",
    match: ["BUNNY", "SUN"],
    matchTip: "兔系需要你兜住情绪，小太阳需要你给稳定回应，你刚刚好。",
  },
};

// 修正 ROSE 的匹配（稳定又主动：SEA 或 SUN）
TYPE_INFO.ROSE.match = ["SEA", "SUN"];
TYPE_INFO.ROSE.matchTip = "海盐系给你可靠，太阳系给你主动与热度：你会被认真对待，也不缺甜。";

// 15题
const QUESTIONS = [
  { q:"对你来说，恋爱里最重要的是？", a:[
    {t:"MARSH", txt:"安全感与被照顾的感觉"},
    {t:"SUN",   txt:"快乐与仪式感，像在发光"},
    {t:"SEA",   txt:"稳定与信任，细水长流"},
    {t:"ROSE",  txt:"尊重与认真，不要随便"},
  ]},
  { q:"对方很忙回消息慢，你会？", a:[
    {t:"BUNNY", txt:"会有点慌：是不是不在乎我了？"},
    {t:"SEA",   txt:"理解，忙完回就好"},
    {t:"ROSE",  txt:"不说，但会记在心里"},
    {t:"SUN",   txt:"发个可爱消息：忙完记得想我～"},
  ]},
  { q:"约会更偏好哪种风格？", a:[
    {t:"SUN",   txt:"惊喜与小浪漫：安排起来！"},
    {t:"CAT",   txt:"舒服自然：散步、咖啡、电影"},
    {t:"SEA",   txt:"一起做日常：吃饭逛超市也很幸福"},
    {t:"FOX_NO",txt:"（不用）"},
  ]},
  { q:"吵架时你更像？", a:[
    {t:"MARSH", txt:"先软下来：我们别互相伤害"},
    {t:"ROSE",  txt:"先冷静：别冲动说重话"},
    {t:"SUN",   txt:"立刻沟通：讲清楚就好了"},
    {t:"CAT",   txt:"先沉默一下，我需要充电"},
  ]},
  { q:"你表达爱意更倾向？", a:[
    {t:"SUN",   txt:"直接说：我喜欢你/我想你"},
    {t:"SEA",   txt:"行动表达：我为你做点什么"},
    {t:"CAT",   txt:"细节暗示：记得你爱吃的"},
    {t:"ROSE",  txt:"不轻易说，但说了就很认真"},
  ]},
  { q:"你最吃哪一套？", a:[
    {t:"MARSH", txt:"温柔耐心，被哄着"},
    {t:"SUN",   txt:"浪漫主动，被宠着"},
    {t:"SEA",   txt:"靠谱稳定，被护着"},
    {t:"ROSE",  txt:"尊重边界，被认真对待"},
  ]},
  { q:"对方说“我需要一点空间”，你会？", a:[
    {t:"CAT",   txt:"懂！我也需要空间（舒服）"},
    {t:"SEA",   txt:"OK，给你空间，但我在"},
    {t:"BUNNY", txt:"会有点难过：是不是我不好？"},
    {t:"SUN",   txt:"可以呀，等你回来我们再甜甜"},
  ]},
  { q:"恋爱里你最怕？", a:[
    {t:"BUNNY", txt:"忽冷忽热、突然消失"},
    {t:"ROSE",  txt:"不被尊重、被敷衍"},
    {t:"SEA",   txt:"信任被破坏、说谎"},
    {t:"SUN",   txt:"不回应、不互动、太无聊"},
  ]},
  { q:"你理想的相处频率是？", a:[
    {t:"BUNNY", txt:"高频联系，每天都想黏一点"},
    {t:"SEA",   txt:"稳定联系，忙也别失联"},
    {t:"CAT",   txt:"不用太密，舒服最重要"},
    {t:"SUN",   txt:"看心情：甜的时候就多一点"},
  ]},
  { q:"你更容易被哪种人吸引？", a:[
    {t:"SUN",   txt:"会主动，会带我快乐的人"},
    {t:"SEA",   txt:"稳重可靠，有安全感的人"},
    {t:"ROSE",  txt:"有原则、有分寸的人"},
    {t:"MARSH", txt:"温柔细腻，懂我情绪的人"},
  ]},
  { q:"你更像“恋爱中的你”是哪句？", a:[
    {t:"SUN",   txt:"我要把喜欢变成每天的小惊喜"},
    {t:"SEA",   txt:"我会默默守护，让关系更稳"},
    {t:"CAT",   txt:"我慢热，但我会越来越在乎"},
    {t:"BUNNY", txt:"我需要你抱抱和回应～"},
  ]},
  { q:"当你不开心，你希望对方？", a:[
    {t:"MARSH", txt:"先听我说，陪我一下"},
    {t:"SEA",   txt:"给我一个解决方案 + 安抚"},
    {t:"SUN",   txt:"哄哄我，带我去开心"},
    {t:"ROSE",  txt:"尊重我的情绪，别逼我立刻好"},
  ]},
  { q:"对你来说，承诺是什么？", a:[
    {t:"SEA",   txt:"言出必行，靠行动证明"},
    {t:"ROSE",  txt:"一旦给了就要认真负责"},
    {t:"SUN",   txt:"让彼此安心，也让恋爱更甜"},
    {t:"MARSH", txt:"是‘你不会丢下我’的感觉"},
  ]},
  { q:"遇到暧昧期，你会？", a:[
    {t:"SUN",   txt:"主动推进：我喜欢就表达"},
    {t:"CAT",   txt:"慢慢观察：别太快"},
    {t:"ROSE",  txt:"先看对方是否认真靠谱"},
    {t:"MARSH", txt:"先确认对方的态度再靠近"},
  ]},
  { q:"你觉得最甜的瞬间是？", a:[
    {t:"SUN",   txt:"对方突然安排小惊喜"},
    {t:"MARSH", txt:"对方温柔哄我、抱抱我"},
    {t:"SEA",   txt:"对方默默为我解决麻烦"},
    {t:"CAT",   txt:"对方懂我，不打扰但一直在"},
  ]},
];

// 把误用的 FOX_NO 选项映射到 CAT（避免崩）
QUESTIONS.forEach(q=>{
  q.a.forEach(opt=>{
    if(opt.t === "FOX_NO") opt.t = "CAT";
  });
});

const el = (id) => document.getElementById(id);

const screenHome = el("screenHome");
const screenQuiz = el("screenQuiz");
const screenResult = el("screenResult");

const btnStart = el("btnStart");
const btnHow = el("btnHow");
const howBox = el("howBox");
const btnBack = el("btnBack");
const btnSkip = el("btnSkip");
const btnShare = el("btnShare");
const btnRetry = el("btnRetry");
const btnTheme = el("btnTheme");

const qTitle = el("qTitle");
const optionsBox = el("options");
const qNow = el("qNow");
const qTotal = el("qTotal");
const progressFill = el("progressFill");

const resultEmoji = el("resultEmoji");
const resultName = el("resultName");
const resultTagline = el("resultTagline");
const resultVibe = el("resultVibe");
const resultNeed = el("resultNeed");
const resultStrengths = el("resultStrengths");
const resultBlindspots = el("resultBlindspots");
const resultTips = el("resultTips");
const resultSecond = el("resultSecond");
const resultQuote = el("resultQuote");
const resultMatch = el("resultMatch");
const resultMatchTip = el("resultMatchTip");
const bars = el("bars");

el("year").textContent = new Date().getFullYear();

let idx = 0;
let answers = Array(QUESTIONS.length).fill(null);
let scores = resetScores();

function resetScores(){
  return Object.keys(TYPES).reduce((acc,k)=> (acc[k]=0, acc), {});
}

function show(screen){
  [screenHome, screenQuiz, screenResult].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function renderQuestion(){
  const total = QUESTIONS.length;
  qTotal.textContent = total;
  qNow.textContent = (idx + 1);

  const pct = Math.round((idx / total) * 100);
  progressFill.style.width = `${pct}%`;

  const item = QUESTIONS[idx];
  qTitle.textContent = item.q;

  optionsBox.innerHTML = "";
  const letters = ["A","B","C","D"];

  item.a.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "optionBtn";
    btn.type = "button";
    btn.innerHTML = `<span class="optKey">${letters[i]}</span>${opt.txt}`;
    btn.addEventListener("click", () => choose(i));
    optionsBox.appendChild(btn);
  });

  btnBack.disabled = idx === 0;
}

function applyScore(typeKey, delta){
  scores[typeKey] = (scores[typeKey] || 0) + delta;
}

function choose(optionIndex){
  const item = QUESTIONS[idx];

  const prev = answers[idx];
  if (prev !== null){
    const prevType = item.a[prev].t;
    applyScore(prevType, -2);
  }

  answers[idx] = optionIndex;
  const typeKey = item.a[optionIndex].t;
  applyScore(typeKey, +2);

  if (idx < QUESTIONS.length - 1){
    idx++;
    renderQuestion();
  } else {
    progressFill.style.width = "100%";
    showResult();
  }
}

function skip(){
  if (idx < QUESTIONS.length - 1){
    idx++;
    renderQuestion();
  } else {
    progressFill.style.width = "100%";
    showResult();
  }
}

function back(){
  if (idx === 0) return;
  idx--;
  renderQuestion();
}

function getRanked(){
  return Object.entries(scores)
    .map(([k,v]) => ({ key:k, score:v }))
    .sort((a,b)=> b.score - a.score);
}

function toPercentMap(){
  const totalPossible = QUESTIONS.length * 2; // 每题最高2分，且只给某一类型
  const map = {};
  Object.keys(TYPES).forEach(k=>{
    map[k] = Math.round((scores[k] / totalPossible) * 100);
  });
  return map;
}

function fillList(ul, arr){
  ul.innerHTML = "";
  arr.forEach(t=>{
    const li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });
}

function renderBars(percentMap, ranked){
  bars.innerHTML = "";
  ranked.forEach(({key})=>{
    const row = document.createElement("div");
    row.className = "barRow";
    row.innerHTML = `
      <div class="barTop">${TYPES[key]} <span>${percentMap[key]}%</span></div>
      <div class="barTrack"><div class="barFill" data-p="${percentMap[key]}"></div></div>
    `;
    bars.appendChild(row);
  });

  // 动画
  requestAnimationFrame(()=>{
    bars.querySelectorAll(".barFill").forEach(f=>{
      const p = f.getAttribute("data-p") || "0";
      f.style.width = `${p}%`;
    });
  });
}

function showResult(){
  const ranked = getRanked();

  const top = ranked[0].score === 0 ? { key:"MARSH", score:0 } : ranked[0];
  const second = ranked.find(x => x.key !== top.key) || ranked[1] || top;

  const info = TYPE_INFO[top.key];

  resultEmoji.textContent = info.emoji;
  resultName.textContent = info.name;
  resultTagline.textContent = info.tagline;
  resultVibe.textContent = info.vibe;
  resultNeed.textContent = info.need;

  fillList(resultStrengths, info.strengths);
  fillList(resultBlindspots, info.blindspots);
  fillList(resultTips, info.tips);

  const percentMap = toPercentMap();
  renderBars(percentMap, ranked);

  // 匹配
  const m1 = info.match?.[0];
  const m2 = info.match?.[1];
  const matchText = `💞 ${TYPES[m1] || "稳定型"} / ${TYPES[m2] || "温柔型"} 更适合你`;
  resultMatch.textContent = matchText;
  resultMatchTip.textContent = info.matchTip || "";

  // 次类型
  resultSecond.textContent = `${TYPES[second.key]}倾向（${second.score}分）· 你在某些场景会表现出这个类型的特质`;

  // 甜甜文案
  resultQuote.textContent = info.quote;

  show(screenResult);
  window.scrollTo({ top: 0, behavior: "smooth" });

  window.__lastResult = { topKey: top.key, secondKey: second.key };
}

async function share(){
  const r = window.__lastResult || { topKey:"MARSH", secondKey:"SUN" };
  const topInfo = TYPE_INFO[r.topKey];

  const text = `我测出来是「${topInfo.name}」${topInfo.emoji}\n${topInfo.tagline}\n甜甜文案：${topInfo.quote}\n来测测你：`;
  const url = location.href;

  if (navigator.share){
    try{
      await navigator.share({ title: "恋爱人格测试·甜甜版", text, url });
      return;
    }catch(e){}
  }

  const payload = `${text}\n${url}`;
  try{
    await navigator.clipboard.writeText(payload);
    alert("已复制分享文案到剪贴板 ✅\n直接粘贴到 WhatsApp/朋友圈即可！");
  }catch(e){
    prompt("复制下面内容分享：", payload);
  }
}

function retry(){
  idx = 0;
  answers = Array(QUESTIONS.length).fill(null);
  scores = resetScores();
  show(screenHome);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleTheme(){
  const root = document.documentElement;
  const isLight = root.getAttribute("data-theme") === "light";
  root.setAttribute("data-theme", isLight ? "" : "light");
  btnTheme.textContent = isLight ? "🌙" : "☀️";
  try{ localStorage.setItem("pt_theme2", isLight ? "dark" : "light"); }catch(_){}
}

function loadTheme(){
  try{
    const saved = localStorage.getItem("pt_theme2");
    if (saved === "light"){
      document.documentElement.setAttribute("data-theme","light");
      btnTheme.textContent = "☀️";
    }
  }catch(_){}
}

// events
btnStart.addEventListener("click", () => {
  show(screenQuiz);
  idx = 0;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
btnHow.addEventListener("click", () => howBox.classList.toggle("hidden"));
btnBack.addEventListener("click", back);
btnSkip.addEventListener("click", skip);
btnShare.addEventListener("click", share);
btnRetry.addEventListener("click", retry);
btnTheme.addEventListener("click", toggleTheme);

loadTheme();
