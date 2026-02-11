// =============================
// 亲子互动风格测验（温柔鼓励版）
// 4类型：GUIDE / PROTECT / RULE / FRIEND
// 15题，4选项，每题给某类型 +2分
// 输出：主类型 + 次类型 + 优势/盲点/孩子感受/建议/分享
// =============================

const TYPES = {
  GUIDE: "引导型",
  PROTECT: "保护型",
  RULE: "规则型",
  FRIEND: "朋友型",
};

const TYPE_INFO = {
  GUIDE: {
    emoji:"🌿",
    name:"引导型父母（温柔且有边界）",
    tagline:"你重视理解与边界：既关心感受，也教会方法。",
    vibe:"孩子会感觉：我被理解，也知道该怎么做。",
    focus:"重点：情绪先被接住，然后一起把问题解决。",
    strengths:["能先共情再引导","愿意教方法而不只是批评","边界清楚，规则更容易被接受"],
    blindspots:["有时会讲太多道理","当你很累时可能突然变严厉","容易把‘解释’当成‘孩子已经懂了’"],
    childFeel:"孩子可能会更敢表达，也更愿意跟你讨论，但在你疲惫时会感觉落差。",
    tip:"一句话：先“抱一抱/听一听”，再“问一问：我们下一次怎么做会更好？”",
  },
  PROTECT: {
    emoji:"🧸",
    name:"保护型父母（高关心·低冲突）",
    tagline:"你很在意孩子的情绪，希望他少受伤。",
    vibe:"孩子会感觉：我被爱着，但有时也会更依赖你。",
    focus:"重点：先安抚、先照顾，避免孩子难过。",
    strengths:["温柔体贴，情绪照顾强","孩子更愿意靠近你","能营造安全的家庭氛围"],
    blindspots:["不太敢设界限，容易反复","可能替孩子扛太多","孩子遇挫的练习机会变少"],
    childFeel:"孩子会觉得你很温暖，但有时也会害怕独立决定或面对挫折。",
    tip:"一句话：安抚之后加一步——“我相信你能做到，我在旁边陪你练一次。”",
  },
  RULE: {
    emoji:"🧭",
    name:"规则型父母（重秩序·重标准）",
    tagline:"你相信规则带来安全：清楚、稳定、可预期。",
    vibe:"孩子会感觉：家里有秩序，但我需要更小心别出错。",
    focus:"重点：建立习惯与纪律，让事情按正确方式发生。",
    strengths:["规则清晰，家里更有秩序","能培养自律与责任感","遇事不慌，处理干脆"],
    blindspots:["情绪回应不足时孩子会‘关机’","容易先纠错后理解","孩子可能怕犯错不敢尝试"],
    childFeel:"孩子会更守规矩，但也可能更紧张、较少表达真实感受。",
    tip:"一句话：在纠正前先说一句——“我知道你不是故意的，我们一起想办法。”",
  },
  FRIEND: {
    emoji:"🌈",
    name:"朋友型父母（亲近·开放）",
    tagline:"你希望孩子信任你：你像队友，也像朋友。",
    vibe:"孩子会感觉：我可以跟你聊很多，但有时也会试探边界。",
    focus:"重点：关系连结与沟通顺畅，减少对立。",
    strengths:["沟通氛围好，孩子愿意分享","更懂孩子的兴趣与世界","适合带青春期孩子保持连结"],
    blindspots:["规则不稳定，孩子会困惑","容易‘说了但没落实’","当需要严肃时会难以切换"],
    childFeel:"孩子会更愿意亲近你，但也可能不确定哪些是必须遵守的底线。",
    tip:"一句话：保持亲近，同时设1-2条铁规则——“少而清晰，永远执行”。",
  },
};

// 15题
const QUESTIONS = [
  { q:"孩子犯错（比如打翻东西）时，你更常先做什么？", a:[
    {t:"GUIDE", txt:"先问发生了什么，再一起收拾并讨论下次怎么做"},
    {t:"RULE", txt:"先指出问题并要求立刻纠正，避免再犯"},
    {t:"PROTECT", txt:"先安抚：没关系别怕，再慢慢处理"},
    {t:"FRIEND", txt:"先开个玩笑缓和气氛，再一起处理"},
  ]},
  { q:"孩子发脾气/哭闹时，你通常？", a:[
    {t:"PROTECT", txt:"先抱抱安抚，等他稳定再说"},
    {t:"GUIDE", txt:"先共情：我知道你很难受，然后引导表达需求"},
    {t:"RULE", txt:"先让他停止哭闹：冷静了再谈"},
    {t:"FRIEND", txt:"像朋友一样聊：你想要什么？我们怎么谈？"},
  ]},
  { q:"孩子不愿做作业/拖延，你会？", a:[
    {t:"RULE", txt:"明确时间与规则：现在开始，完成再做别的"},
    {t:"GUIDE", txt:"一起拆任务：先做10分钟，再休息"},
    {t:"PROTECT", txt:"担心他累：先让他休息，晚点再说"},
    {t:"FRIEND", txt:"协商：你想怎么安排？我们一起定个计划"},
  ]},
  { q:"孩子和你顶嘴时，你更像？", a:[
    {t:"RULE", txt:"立刻制止：不可以这样讲话"},
    {t:"GUIDE", txt:"先稳住语气：你可以不认同，但要好好说"},
    {t:"PROTECT", txt:"先不硬碰：怕他更激动"},
    {t:"FRIEND", txt:"像讨论一样：你为什么这样想？"},
  ]},
  { q:"孩子想尝试新活动但你有点担心，你会？", a:[
    {t:"PROTECT", txt:"更倾向阻止：怕受伤或失败"},
    {t:"GUIDE", txt:"允许尝试，但先做安全规则与预演"},
    {t:"RULE", txt:"看规则是否清楚：不符合就不去"},
    {t:"FRIEND", txt:"鼓励：去玩！回来跟我分享"},
  ]},
  { q:"当孩子说“你不懂我”，你会？", a:[
    {t:"GUIDE", txt:"先听他说完：那你教教我怎么理解你"},
    {t:"FRIEND", txt:"说：我想懂你，我们像朋友一样聊"},
    {t:"RULE", txt:"强调尊重：可以表达，但别这样否定"},
    {t:"PROTECT", txt:"心疼：是不是我做得不够好？先抱抱"},
  ]},
  { q:"你更看重亲子关系中的？", a:[
    {t:"FRIEND", txt:"沟通与信任：什么都能聊"},
    {t:"RULE", txt:"规矩与习惯：该怎样就怎样"},
    {t:"PROTECT", txt:"快乐与情绪：别让孩子太受委屈"},
    {t:"GUIDE", txt:"理解+成长：情绪被接住，也学会方法"},
  ]},
  { q:"当孩子考试没考好，你会更像？", a:[
    {t:"PROTECT", txt:"先安慰：没关系你已经很努力"},
    {t:"RULE", txt:"先复盘错误并制定计划，避免再发生"},
    {t:"GUIDE", txt:"先问感受再问原因，然后一起调整策略"},
    {t:"FRIEND", txt:"一起吐槽一下压力，然后再想办法"},
  ]},
  { q:"你在家里定规则的方式是？", a:[
    {t:"RULE", txt:"规则清晰写出来，必须执行"},
    {t:"GUIDE", txt:"规则少但关键，会解释原因并一起遵守"},
    {t:"FRIEND", txt:"比较弹性：看情况调整"},
    {t:"PROTECT", txt:"不太想定太多：怕孩子压力大"},
  ]},
  { q:"当你很累很烦时，孩子来闹你，你会？", a:[
    {t:"RULE", txt:"先让他停止：别吵，去做你该做的"},
    {t:"PROTECT", txt:"会内疚：但还是先哄他一下"},
    {t:"FRIEND", txt:"说：给我5分钟，我们等下再玩"},
    {t:"GUIDE", txt:"说清楚状态：我需要休息10分钟，然后我会陪你"},
  ]},
  { q:"你更愿意孩子学会？", a:[
    {t:"RULE", txt:"纪律与责任：说到做到"},
    {t:"GUIDE", txt:"自我管理：知道怎么做更好"},
    {t:"PROTECT", txt:"情绪稳定：别太难过、别太辛苦"},
    {t:"FRIEND", txt:"表达与沟通：敢说、会说"},
  ]},
  { q:"孩子和同学冲突了，你会？", a:[
    {t:"GUIDE", txt:"先听两边，再教他怎么表达与解决"},
    {t:"PROTECT", txt:"先保护孩子：你没错，别怕"},
    {t:"RULE", txt:"先讲原则：谁不对谁道歉"},
    {t:"FRIEND", txt:"像伙伴一样复盘：下次怎么说更帅"},
  ]},
  { q:"你更像是孩子的？", a:[
    {t:"FRIEND", txt:"队友/朋友"},
    {t:"GUIDE", txt:"教练/引导者"},
    {t:"PROTECT", txt:"守护者"},
    {t:"RULE", txt:"管理者/规则制定者"},
  ]},
  { q:"当孩子不听话时，你通常用？", a:[
    {t:"RULE", txt:"明确后果：不做就没有某项权限"},
    {t:"GUIDE", txt:"选择题：你要现在做还是5分钟后做？"},
    {t:"PROTECT", txt:"担心关系变差：会先软下来"},
    {t:"FRIEND", txt:"协商：我们谈个双方都OK的办法"},
  ]},
  { q:"你希望孩子长大后怎么评价你？", a:[
    {t:"GUIDE", txt:"你让我变得更会面对问题"},
    {t:"PROTECT", txt:"你给了我很多爱与安全感"},
    {t:"RULE", txt:"你让我有自律与底线"},
    {t:"FRIEND", txt:"你一直懂我、支持我"},
  ]},
];

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
const resultFocus = el("resultFocus");
const resultStrengths = el("resultStrengths");
const resultBlindspots = el("resultBlindspots");
const resultChildFeel = el("resultChildFeel");
const resultTip = el("resultTip");
const resultSecond = el("resultSecond");

document.getElementById("year").textContent = new Date().getFullYear();

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
  qNow.textContent = idx + 1;

  const pct = Math.round((idx / total) * 100);
  progressFill.style.width = `${pct}%`;

  const item = QUESTIONS[idx];
  qTitle.textContent = item.q;

  optionsBox.innerHTML = "";
  const letters = ["A","B","C","D"];

  item.a.forEach((opt, i)=>{
    const btn = document.createElement("button");
    btn.className = "optionBtn";
    btn.type = "button";
    btn.innerHTML = `<span class="optKey">${letters[i]}</span>${opt.txt}`;
    btn.addEventListener("click", ()=> choose(i));
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
    applyScore(item.a[prev].t, -2);
  }

  answers[idx] = optionIndex;
  applyScore(item.a[optionIndex].t, +2);

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

function fillList(ul, arr){
  ul.innerHTML = "";
  arr.forEach(t=>{
    const li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });
}

function getRanked(){
  return Object.entries(scores)
    .map(([k,v])=>({key:k, score:v}))
    .sort((a,b)=> b.score - a.score);
}

function showResult(){
  const ranked = getRanked();
  const top = ranked[0].score === 0 ? { key:"GUIDE", score:0 } : ranked[0];
  const second = ranked.find(x => x.key !== top.key) || ranked[1] || top;

  const info = TYPE_INFO[top.key];

  resultEmoji.textContent = info.emoji;
  resultName.textContent = info.name;
  resultTagline.textContent = info.tagline;
  resultVibe.textContent = info.vibe;
  resultFocus.textContent = info.focus;

  fillList(resultStrengths, info.strengths);
  fillList(resultBlindspots, info.blindspots);

  resultChildFeel.textContent = info.childFeel;
  resultTip.textContent = info.tip;

  resultSecond.textContent = `${TYPES[second.key]}倾向（${second.score}分）· 你在某些场景会表现出这个风格的特质`;

  show(screenResult);
  window.scrollTo({ top: 0, behavior: "smooth" });

  window.__last = { topKey: top.key, secondKey: second.key };
}

async function share(){
  const r = window.__last || { topKey:"GUIDE", secondKey:"PROTECT" };
  const info = TYPE_INFO[r.topKey];
  const text = `我的亲子互动风格是「${info.name}」${info.emoji}\n${info.tagline}\n温柔建议：${info.tip}\n你也来测：`;
  const url = location.href;

  if (navigator.share){
    try{
      await navigator.share({ title:"亲子互动风格测验", text, url });
      return;
    }catch(e){}
  }

  const payload = `${text}\n${url}`;
  try{
    await navigator.clipboard.writeText(payload);
    alert("已复制分享文案到剪贴板 ✅");
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
  try{ localStorage.setItem("pt_parent_theme", isLight ? "dark" : "light"); }catch(_){}
}
function loadTheme(){
  try{
    const saved = localStorage.getItem("pt_parent_theme");
    if (saved === "light"){
      document.documentElement.setAttribute("data-theme","light");
      btnTheme.textContent="☀️";
    }
  }catch(_){}
}

// events
btnStart.addEventListener("click", ()=>{
  show(screenQuiz);
  idx = 0;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
btnHow.addEventListener("click", ()=> howBox.classList.toggle("hidden"));
btnBack.addEventListener("click", back);
btnSkip.addEventListener("click", skip);
btnShare.addEventListener("click", share);
btnRetry.addEventListener("click", retry);
btnTheme.addEventListener("click", toggleTheme);

loadTheme();
