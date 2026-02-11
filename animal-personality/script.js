// =============================
// 动物人格测试（15题）
// 计分模型：8个类型（LION/OWL/DOLPHIN/WOLF/FOX/PANDA/TIGER/TURTLE）
// =============================

const TYPES = {
  LION: "狮子",
  OWL: "猫头鹰",
  DOLPHIN: "海豚",
  WOLF: "狼",
  FOX: "狐狸",
  PANDA: "熊猫",
  TIGER: "老虎",
  TURTLE: "乌龟",
};

const TYPE_INFO = {
  LION: {
    emoji: "🦁",
    name: "狮子型（领导与决断）",
    tagline: "目标感强，喜欢掌控节奏，敢拍板。",
    vibe: "你给人的感觉：有主见、干脆、气场强，做事讲结果。",
    drive: "驱动力：成就、影响力、把事情推进到位。",
    strengths: ["行动快，能扛责任", "目标清晰，带队能力强", "敢说敢做，不怕冲突"],
    blindspots: ["容易急、压迫感强", "有时忽略他人感受", "不耐烦重复与细节"],
    tips: ["每次拍板前留30秒听不同意见", "把“结果”拆成可执行步骤，让团队跟得上", "练习用“我理解你”开场再给指令"],
  },
  OWL: {
    emoji: "🦉",
    name: "猫头鹰型（理性与洞察）",
    tagline: "思考周密，喜欢数据与逻辑，稳中求胜。",
    vibe: "你给人的感觉：冷静、靠谱、话不多但一针见血。",
    drive: "驱动力：准确、秩序、做正确的决定。",
    strengths: ["分析强，判断有依据", "做事有规划，风险意识高", "独立思考，不容易被带节奏"],
    blindspots: ["容易想太久导致拖延", "过度挑错，显得不近人情", "不擅长表达情绪需求"],
    tips: ["设定“决策截止时间”，避免无限优化", "用‘先肯定再补充’的沟通方式", "每周做一次‘不完美也要交付’练习"],
  },
  DOLPHIN: {
    emoji: "🐬",
    name: "海豚型（共情与连接）",
    tagline: "擅长沟通，重视氛围，是团队黏合剂。",
    vibe: "你给人的感觉：好相处、会照顾人、很会带动气氛。",
    drive: "驱动力：关系、认可、一起变好。",
    strengths: ["高共情，能读懂人", "沟通强，善于协作", "能化解尴尬与冲突"],
    blindspots: ["容易讨好、难拒绝", "怕冲突而憋着", "情绪受环境影响大"],
    tips: ["练习‘温和但坚定’地说不", "把需求说具体（我希望…）", "设一个‘情绪缓冲’：累了就先暂停"],
  },
  WOLF: {
    emoji: "🐺",
    name: "狼型（原则与执行）",
    tagline: "重规则与忠诚，抗压强，执行到底。",
    vibe: "你给人的感觉：可靠、讲义气、有底线，能扛硬仗。",
    drive: "驱动力：秩序、信任、把承诺做到。",
    strengths: ["自律强，执行力高", "守信用，值得托付", "抗压强，能在混乱中稳住"],
    blindspots: ["有时过于固执", "对不守规矩的人容忍度低", "情绪表达偏克制，容易累积"],
    tips: ["遇到分歧先问：对方的‘担忧点’是什么", "允许‘80分方案先跑’", "给自己安排固定的放松出口（运动/独处）"],
  },
  FOX: {
    emoji: "🦊",
    name: "狐狸型（创意与机智）",
    tagline: "点子多，反应快，善于随机应变。",
    vibe: "你给人的感觉：聪明、有趣、有办法，总能找到捷径。",
    drive: "驱动力：新鲜感、自由度、解决难题的快感。",
    strengths: ["创意强，思路灵活", "学习快，适应力强", "擅长资源整合与说服"],
    blindspots: ["容易分心，三分钟热度", "讨厌重复，后期收尾弱", "有时显得太“会算计”"],
    tips: ["用‘短冲刺’完成任务：25分钟专注", "把大目标拆成3个最小行动", "找一个稳定型搭档做收尾与细节"],
  },
  PANDA: {
    emoji: "🐼",
    name: "熊猫型（平衡与享受）",
    tagline: "温和松弛，追求舒适与稳定的快乐。",
    vibe: "你给人的感觉：不急不躁，给人安全感，很会享受生活。",
    drive: "驱动力：舒适、稳定、人际和谐。",
    strengths: ["情绪稳定，包容度高", "擅长缓和矛盾", "生活感强，懂得取悦自己"],
    blindspots: ["容易拖延，缺乏紧迫感", "不喜欢变化，抗拒风险", "被推着走时会不开心"],
    tips: ["设定‘最小行动’：每天只做10分钟也算完成", "把目标和‘奖励’绑定（完成→奖励）", "练习在安全范围内尝试新东西"],
  },
  TIGER: {
    emoji: "🐯",
    name: "老虎型（野心与冲劲）",
    tagline: "竞争意识强，敢挑战，越难越兴奋。",
    vibe: "你给人的感觉：有冲劲、有企图心，喜欢赢。",
    drive: "驱动力：胜利、突破、证明自己。",
    strengths: ["爆发力强，敢拼敢冲", "目标高，愿意挑战", "能快速带起士气"],
    blindspots: ["容易焦躁、急于求成", "对自己与他人要求过高", "压力大时容易硬扛"],
    tips: ["把胜负心转成‘长期主义’：坚持比爆发更关键", "学会补给（睡眠/运动/复盘）", "给团队留空间：允许不同节奏"],
  },
  TURTLE: {
    emoji: "🐢",
    name: "乌龟型（谨慎与踏实）",
    tagline: "慢但稳，重安全，做事不喜欢冒险。",
    vibe: "你给人的感觉：沉稳、踏实，靠谱但略慢热。",
    drive: "驱动力：安全感、可预测、一步一个脚印。",
    strengths: ["细致严谨，出错率低", "耐心强，能长期坚持", "做事稳，不被情绪带走"],
    blindspots: ["害怕变化，错过机会", "需要很久才下决定", "不善于主动表达与争取"],
    tips: ["把‘大变化’拆成可控小实验", "为每个决定设‘最坏情况预案’", "练习主动表达：我想要/我需要…"],
  }
};

// 15题：每题4选项，每个选项给一个type加分（2分）
const QUESTIONS = [
  {
    q: "当你要开始一个新项目，你通常会先做什么？",
    a: [
      { t: "LION", txt: "先定目标和里程碑，马上动起来" },
      { t: "OWL", txt: "先做信息收集和风险评估" },
      { t: "FOX", txt: "先想一堆可能方案，挑最有趣的" },
      { t: "PANDA", txt: "先把节奏放稳，慢慢推进最舒服" },
    ],
  },
  {
    q: "朋友临时约你出门，你会？",
    a: [
      { t: "DOLPHIN", txt: "走！见人聊天很开心" },
      { t: "TURTLE", txt: "看情况…更想待在自己的空间" },
      { t: "FOX", txt: "如果够新鲜有趣就去" },
      { t: "WOLF", txt: "先确认计划细节，再决定" },
    ],
  },
  {
    q: "你最受不了团队里哪种情况？",
    a: [
      { t: "WOLF", txt: "没原则、说话不算话" },
      { t: "LION", txt: "拖拖拉拉、没人负责" },
      { t: "DOLPHIN", txt: "气氛差、互相攻击" },
      { t: "OWL", txt: "拍脑袋决策、缺少依据" },
    ],
  },
  {
    q: "面对压力，你通常会？",
    a: [
      { t: "TIGER", txt: "越压越冲，狠狠干" },
      { t: "OWL", txt: "冷静分析，找最优解" },
      { t: "PANDA", txt: "先休息一下，保持状态" },
      { t: "DOLPHIN", txt: "找人聊聊，情绪会好很多" },
    ],
  },
  {
    q: "你更像哪种决策方式？",
    a: [
      { t: "OWL", txt: "数据/逻辑优先" },
      { t: "DOLPHIN", txt: "考虑人和关系的影响" },
      { t: "LION", txt: "抓关键点，快速拍板" },
      { t: "TURTLE", txt: "谨慎比较，稳一点再说" },
    ],
  },
  {
    q: "别人夸你，你最希望听到的是？",
    a: [
      { t: "LION", txt: "你很有魄力/很能带队" },
      { t: "DOLPHIN", txt: "和你相处很舒服/你很懂我" },
      { t: "OWL", txt: "你思路很清晰/判断很准" },
      { t: "FOX", txt: "你很聪明/点子很多" },
    ],
  },
  {
    q: "你做事最常卡在？",
    a: [
      { t: "OWL", txt: "想太多，迟迟不开始" },
      { t: "FOX", txt: "灵感很多，收尾很痛苦" },
      { t: "PANDA", txt: "拖一拖也没关系（然后真拖了）" },
      { t: "LION", txt: "太急，别人跟不上" },
    ],
  },
  {
    q: "你更喜欢哪种生活节奏？",
    a: [
      { t: "PANDA", txt: "舒服稳定，有时间享受" },
      { t: "TIGER", txt: "快节奏、有挑战才爽" },
      { t: "TURTLE", txt: "慢一点，但很踏实" },
      { t: "FOX", txt: "变化多一点，别无聊" },
    ],
  },
  {
    q: "冲突出现时，你通常？",
    a: [
      { t: "DOLPHIN", txt: "先安抚情绪，再找共识" },
      { t: "LION", txt: "直接讲清楚，解决问题" },
      { t: "OWL", txt: "先把事实与逻辑理清" },
      { t: "TURTLE", txt: "先退一步，避免正面冲突" },
    ],
  },
  {
    q: "你在朋友圈里更像？",
    a: [
      { t: "DOLPHIN", txt: "气氛担当/情绪支援" },
      { t: "FOX", txt: "有梗的人/点子王" },
      { t: "WOLF", txt: "靠谱的人/说到做到" },
      { t: "PANDA", txt: "随和的人/好相处" },
    ],
  },
  {
    q: "如果你要提升自己，你更愿意？",
    a: [
      { t: "OWL", txt: "系统学习，建立方法论" },
      { t: "TIGER", txt: "设高目标，逼自己突破" },
      { t: "FOX", txt: "尝试很多新东西，学得快" },
      { t: "TURTLE", txt: "一步一步来，稳扎稳打" },
    ],
  },
  {
    q: "你最看重的“底层价值”是？",
    a: [
      { t: "WOLF", txt: "信任与原则" },
      { t: "LION", txt: "结果与效率" },
      { t: "DOLPHIN", txt: "关系与温度" },
      { t: "TURTLE", txt: "安全与稳定" },
    ],
  },
  {
    q: "如果计划被打乱，你会？",
    a: [
      { t: "FOX", txt: "临场应变，反而更兴奋" },
      { t: "OWL", txt: "重排方案，找最合理路径" },
      { t: "LION", txt: "立刻做决定，继续推进" },
      { t: "TURTLE", txt: "先缓一缓，确认不会失控" },
    ],
  },
  {
    q: "你更像哪种“能量来源”？",
    a: [
      { t: "DOLPHIN", txt: "和人互动会更有能量" },
      { t: "TURTLE", txt: "独处充电，安静最治愈" },
      { t: "TIGER", txt: "挑战和竞争让我亢奋" },
      { t: "PANDA", txt: "舒服的生活与小确幸" },
    ],
  },
  {
    q: "你更喜欢别人怎么和你合作？",
    a: [
      { t: "WOLF", txt: "说清规则，各自负责" },
      { t: "DOLPHIN", txt: "多沟通，彼此支持" },
      { t: "LION", txt: "快速对齐目标，执行到位" },
      { t: "FOX", txt: "给我自由度，让我发挥创意" },
    ],
  },
];

// ============ UI wiring ============
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
const resultDrive = el("resultDrive");
const resultStrengths = el("resultStrengths");
const resultBlindspots = el("resultBlindspots");
const resultTips = el("resultTips");
const resultSecond = el("resultSecond");

el("year").textContent = new Date().getFullYear();

let idx = 0;
let answers = Array(QUESTIONS.length).fill(null); // store chosen option index
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

  const pct = Math.round(((idx) / total) * 100);
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

  // if previously answered, remove previous score
  const prev = answers[idx];
  if (prev !== null){
    const prevType = item.a[prev].t;
    applyScore(prevType, -2);
  }

  answers[idx] = optionIndex;
  const typeKey = item.a[optionIndex].t;
  applyScore(typeKey, +2);

  // next
  if (idx < QUESTIONS.length - 1){
    idx++;
    renderQuestion();
  } else {
    // finish
    progressFill.style.width = "100%";
    showResult();
  }
}

function skip(){
  // treat as no answer; just advance
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

function getRankedTypes(){
  const entries = Object.entries(scores)
    .map(([k,v]) => ({ key:k, score:v }))
    .sort((a,b) => b.score - a.score);

  return entries;
}

function showResult(){
  const ranked = getRankedTypes();

  // 如果有人全跳过，分数全是0：给默认
  const top = ranked[0].score === 0 ? { key:"PANDA", score:0 } : ranked[0];
  const second = ranked.find(x => x.key !== top.key) || ranked[1] || top;

  const info = TYPE_INFO[top.key];

  resultEmoji.textContent = info.emoji;
  resultName.textContent = info.name;
  resultTagline.textContent = info.tagline;
  resultVibe.textContent = info.vibe;
  resultDrive.textContent = info.drive;

  fillList(resultStrengths, info.strengths);
  fillList(resultBlindspots, info.blindspots);
  fillList(resultTips, info.tips);

  resultSecond.textContent = `${TYPES[second.key]}倾向（${second.score}分） · 你在某些场景会表现出这个类型的特质`;

  show(screenResult);
  window.scrollTo({ top: 0, behavior: "smooth" });

  // 存一下，方便分享
  window.__lastResult = { topKey: top.key, secondKey: second.key };
}

function fillList(ul, arr){
  ul.innerHTML = "";
  arr.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });
}

async function share(){
  const r = window.__lastResult || { topKey:"PANDA", secondKey:"OWL" };
  const topInfo = TYPE_INFO[r.topKey];
  const text = `我测出来是「${topInfo.name}」 ${topInfo.emoji}\n一句话：${topInfo.tagline}\n你也来测：`;

  const url = location.href;

  // Web Share API（手机更好用）
  if (navigator.share){
    try{
      await navigator.share({ title: "动物人格测试", text, url });
      return;
    }catch(e){
      // 用户取消也没关系
    }
  }

  // fallback: copy to clipboard
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
  try{
    localStorage.setItem("pt_theme", isLight ? "dark" : "light");
  }catch(_){}
}

function loadTheme(){
  try{
    const saved = localStorage.getItem("pt_theme");
    if (saved === "light"){
      document.documentElement.setAttribute("data-theme","light");
      btnTheme.textContent = "☀️";
    }
  }catch(_){}
}

// ============ Events ============
btnStart.addEventListener("click", () => {
  show(screenQuiz);
  idx = 0;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

btnHow.addEventListener("click", () => {
  howBox.classList.toggle("hidden");
});

btnBack.addEventListener("click", back);
btnSkip.addEventListener("click", skip);
btnShare.addEventListener("click", share);
btnRetry.addEventListener("click", retry);
btnTheme.addEventListener("click", toggleTheme);

loadTheme();
