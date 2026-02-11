// =============================
// 校园生存风格测试（青少年版）
// 6类型：SOCIAL / OBSERVE / ACHIEVE / CREATIVE / FEELER / LEADER
// 12题，每题 +2
// =============================

const TYPES = {
  SOCIAL: "社交王者",
  OBSERVE: "安静观察者",
  ACHIEVE: "效率学霸",
  CREATIVE: "灵感玩家",
  FEELER: "情绪雷达",
  LEADER: "行动队长",
};

const INFO = {
  SOCIAL: {
    emoji:"🗣️",
    name:"社交王者",
    tag:"人群就是你的充电器。",
    pros:["会带气氛，容易交到朋友","表达直接，敢开口","资源整合力强：谁需要什么你都懂"],
    cons:["有时会分心，难专注一件事","容易答应太多","怕无聊所以拖延开始"],
    social:"你很强！但别把“朋友很多”当KPI。留2-3个真正能聊心事的就够。",
    study:"用“番茄钟25分钟”锁住注意力；做完再去社交，会更爽。",
    quote:"我测出来是🗣️社交王者：我不是爱玩，我是在经营人脉😎",
  },
  OBSERVE: {
    emoji:"👀",
    name:"安静观察者",
    tag:"你不抢话，但你看得最清楚。",
    pros:["观察力强，能看出细节和氛围","独立思考，不容易被带节奏","专注度不错，适合深度学习"],
    cons:["容易被误会高冷/难靠近","想太多但不说","被逼社交会很耗电"],
    social:"你不用变外向。只要选一个你舒服的方式：一对一聊天会更适合你。",
    study:"你适合“深度块学习”：一次专心40-60分钟，比碎片学更有效。",
    quote:"我测出来是👀安静观察者：我不吵，但我什么都知道。",
  },
  ACHIEVE: {
    emoji:"📚",
    name:"效率学霸",
    tag:"你喜欢把事情做成、做完、做对。",
    pros:["自律强，执行力稳","目标清晰，规划能力在线","抗干扰能力不错"],
    cons:["压力大时会焦虑","对自己太严格","不太会休息，越忙越累"],
    social:"给自己安排“放松配额”，你不是机器。休息=续航，不是偷懒。",
    study:"每周做一次复盘：这周最有效的方法是什么？下周继续用。",
    quote:"我测出来是📚效率学霸：卷不是目的，赢才是（开玩笑啦😂）",
  },
  CREATIVE: {
    emoji:"🎨",
    name:"灵感玩家",
    tag:"你脑子里永远有新点子。",
    pros:["创意多，思路跳跃","对新东西上手快","把无聊变有趣的能力很强"],
    cons:["容易三分钟热度","不喜欢重复练习","执行跟不上想法"],
    social:"你很有趣！但别一次开太多坑。选一个最想做的，先做到60分。",
    study:"用“最小行动”：先做5分钟。你一旦启动，就会越做越顺。",
    quote:"我测出来是🎨灵感玩家：我不是分心，我是在多线程加载⚡",
  },
  FEELER: {
    emoji:"💗",
    name:"情绪雷达",
    tag:"你很敏感，也很懂别人。",
    pros:["共情力强，朋友很信任你","能察觉细微变化","对关系很认真"],
    cons:["容易内耗","别人的情绪会影响你","怕冲突所以委屈自己"],
    social:"练习一句神句：『我需要想一下再回复你。』保护自己，不等于不善良。",
    study:"焦虑时先写下来：我能控制的是什么？只做可控那一块。",
    quote:"我测出来是💗情绪雷达：我不是玻璃心，我是高灵敏度天线。",
  },
  LEADER: {
    emoji:"🧩",
    name:"行动队长",
    tag:"你不爱空谈，你爱“搞定”。",
    pros:["行动快，执行强","遇事敢扛，靠谱","能带团队推进事情"],
    cons:["急的时候会没耐心","容易用“效率”压过感受","不太会求助"],
    social:"你可以更温柔一点：推进前先问一句『你OK吗？』队友会更愿意跟。",
    study:"把大目标拆成“今天就能完成的小任务”，你会越做越有成就感。",
    quote:"我测出来是🧩行动队长：别说了，开干！🔥",
  },
};

const QUESTIONS = [
  { q:"上课老师提问，你更像？", a:[
    {t:"SOCIAL", txt:"我敢答，答错也不尴尬"},
    {t:"OBSERVE", txt:"我会想好再说，不想抢话"},
    {t:"ACHIEVE", txt:"我喜欢答对的题，有把握才出手"},
    {t:"CREATIVE", txt:"我会用很奇怪但可能对的角度回答"},
  ]},
  { q:"团体作业分工，你通常？", a:[
    {t:"LEADER", txt:"我来分工+推进，别拖"},
    {t:"SOCIAL", txt:"我负责沟通协调，气氛我来"},
    {t:"ACHIEVE", txt:"我负责关键部分，质量要稳"},
    {t:"OBSERVE", txt:"我先看看大家能力，再选适合我的部分"},
  ]},
  { q:"你最怕的学校瞬间是？", a:[
    {t:"FEELER", txt:"被误会/被孤立那种氛围"},
    {t:"ACHIEVE", txt:"考试失常，努力白费"},
    {t:"SOCIAL", txt:"全场尴尬冷场"},
    {t:"CREATIVE", txt:"无聊到爆的重复练习"},
  ]},
  { q:"放学后你更想？", a:[
    {t:"SOCIAL", txt:"约人吃东西/聊天/玩"},
    {t:"OBSERVE", txt:"一个人安静做喜欢的事"},
    {t:"ACHIEVE", txt:"把作业赶完，心里舒服"},
    {t:"CREATIVE", txt:"搞点新东西：剪视频/画画/做项目"},
  ]},
  { q:"当你压力大，你会？", a:[
    {t:"FEELER", txt:"容易想很多，情绪起伏"},
    {t:"ACHIEVE", txt:"更拼命：计划排满"},
    {t:"OBSERVE", txt:"先躲一会儿，自己消化"},
    {t:"SOCIAL", txt:"找人吐槽一下就好多了"},
  ]},
  { q:"你更像哪种朋友？", a:[
    {t:"SOCIAL", txt:"信息中心：哪里好玩我知道"},
    {t:"FEELER", txt:"情绪支持：你难过我在"},
    {t:"LEADER", txt:"行动派：我帮你搞定"},
    {t:"OBSERVE", txt:"智囊团：我给你冷静建议"},
  ]},
  { q:"复习时你更像？", a:[
    {t:"ACHIEVE", txt:"按表执行，稳稳推进"},
    {t:"CREATIVE", txt:"找更有趣的方法学"},
    {t:"OBSERVE", txt:"安静刷题/看书，没人别吵我"},
    {t:"SOCIAL", txt:"组队学习，互相监督"},
  ]},
  { q:"有人突然找你帮忙，你会？", a:[
    {t:"LEADER", txt:"行，直接说要我做什么"},
    {t:"FEELER", txt:"我会先关心他怎么了"},
    {t:"OBSERVE", txt:"我先判断：我能不能做到"},
    {t:"SOCIAL", txt:"我会顺便拉个更会的人一起"},
  ]},
  { q:"你对“规则”更像？", a:[
    {t:"LEADER", txt:"规则是用来推进事情的"},
    {t:"ACHIEVE", txt:"规则能提高稳定性，我喜欢"},
    {t:"CREATIVE", txt:"规则太死我会不爽"},
    {t:"SOCIAL", txt:"看情况，能通融就通融"},
  ]},
  { q:"你更容易被别人评价为？", a:[
    {t:"SOCIAL", txt:"好聊、有趣、很会说"},
    {t:"OBSERVE", txt:"安静、有想法、很稳"},
    {t:"ACHIEVE", txt:"认真、靠谱、很自律"},
    {t:"FEELER", txt:"敏感、温柔、很会共情"},
  ]},
  { q:"当你有一个新想法，你通常？", a:[
    {t:"CREATIVE", txt:"立刻兴奋，想开干"},
    {t:"LEADER", txt:"先想最小可行方案，直接做"},
    {t:"ACHIEVE", txt:"先规划路径，确保能成"},
    {t:"OBSERVE", txt:"先观察别人怎么看，再决定"},
  ]},
  { q:"你最想提升的是？", a:[
    {t:"OBSERVE", txt:"更敢表达自己"},
    {t:"FEELER", txt:"更少内耗"},
    {t:"ACHIEVE", txt:"更轻松但效率不掉"},
    {t:"SOCIAL", txt:"更专注不分心"},
  ]},
];

const el = (id)=>document.getElementById(id);
const home = el("home");
const quiz = el("quiz");
const result = el("result");

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

const rEmoji = el("rEmoji");
const rName = el("rName");
const rTag = el("rTag");
const rPros = el("rPros");
const rCons = el("rCons");
const rSocial = el("rSocial");
const rStudy = el("rStudy");
const rQuote = el("rQuote");

document.getElementById("year").textContent = new Date().getFullYear();

let idx = 0;
let answers = Array(QUESTIONS.length).fill(null);
let scores = resetScores();

function resetScores(){
  return Object.keys(TYPES).reduce((acc,k)=>(acc[k]=0,acc),{});
}
function show(which){
  [home,quiz,result].forEach(s=>s.classList.add("hidden"));
  which.classList.remove("hidden");
}
function renderQuestion(){
  const total = QUESTIONS.length;
  qTotal.textContent = total;
  qNow.textContent = idx+1;
  progressFill.style.width = `${Math.round((idx/total)*100)}%`;

  const item = QUESTIONS[idx];
  qTitle.textContent = item.q;

  optionsBox.innerHTML = "";
  const letters=["A","B","C","D"];
  item.a.forEach((opt,i)=>{
    const b=document.createElement("button");
    b.type="button";
    b.className="optionBtn";
    b.innerHTML=`<span class="optKey">${letters[i]}</span>${opt.txt}`;
    b.onclick=()=>choose(i);
    optionsBox.appendChild(b);
  });

  btnBack.disabled = idx===0;
}
function applyScore(t,delta){ scores[t]=(scores[t]||0)+delta; }
function choose(optIndex){
  const item = QUESTIONS[idx];
  const prev = answers[idx];
  if(prev!==null) applyScore(item.a[prev].t,-2);

  answers[idx]=optIndex;
  applyScore(item.a[optIndex].t,+2);

  if(idx<QUESTIONS.length-1){ idx++; renderQuestion(); }
  else { progressFill.style.width="100%"; showResult(); }
}
function skip(){
  if(idx<QUESTIONS.length-1){ idx++; renderQuestion(); }
  else { progressFill.style.width="100%"; showResult(); }
}
function back(){ if(idx===0) return; idx--; renderQuestion(); }

function fillList(ul, arr){
  ul.innerHTML="";
  arr.forEach(t=>{
    const li=document.createElement("li");
    li.textContent=t;
    ul.appendChild(li);
  });
}
function ranked(){
  return Object.entries(scores).map(([k,v])=>({k,v})).sort((a,b)=>b.v-a.v);
}

function showResult(){
  const r = ranked();
  const top = r[0].v===0 ? {k:"OBSERVE",v:0}:r[0];
  const info = INFO[top.k];

  rEmoji.textContent = info.emoji;
  rName.textContent = info.name;
  rTag.textContent = info.tag;

  fillList(rPros, info.pros);
  fillList(rCons, info.cons);
  rSocial.textContent = info.social;
  rStudy.textContent = info.study;
  rQuote.textContent = info.quote;

  show(result);
  window.scrollTo({top:0,behavior:"smooth"});
  window.__teen = { key: top.k };
}

async function share(){
  const key = (window.__teen && window.__teen.key) || "OBSERVE";
  const info = INFO[key];
  const text = `我测出来是「${info.name}」${info.emoji}\n${info.tag}\n${info.quote}\n来测测你：`;
  const url = location.href;

  if(navigator.share){
    try{ await navigator.share({title:"校园生存风格测试", text, url}); return; }catch(e){}
  }
  const payload = `${text}\n${url}`;
  try{ await navigator.clipboard.writeText(payload); alert("已复制分享文案 ✅"); }
  catch(e){ prompt("复制下面内容分享：", payload); }
}

function retry(){
  idx=0;
  answers=Array(QUESTIONS.length).fill(null);
  scores=resetScores();
  show(home);
  window.scrollTo({top:0,behavior:"smooth"});
}

function toggleTheme(){
  const root=document.documentElement;
  const isLight=root.getAttribute("data-theme")==="light";
  root.setAttribute("data-theme", isLight? "" : "light");
  btnTheme.textContent = isLight ? "🌙" : "☀️";
  try{ localStorage.setItem("teen_theme", isLight? "dark":"light"); }catch(_){}
}
function loadTheme(){
  try{
    const saved=localStorage.getItem("teen_theme");
    if(saved==="light"){
      document.documentElement.setAttribute("data-theme","light");
      btnTheme.textContent="☀️";
    }
  }catch(_){}
}

// events
btnStart.onclick=()=>{ show(quiz); idx=0; renderQuestion(); window.scrollTo({top:0,behavior:"smooth"}); };
btnHow.onclick=()=>howBox.classList.toggle("hidden");
btnBack.onclick=back;
btnSkip.onclick=skip;
btnShare.onclick=share;
btnRetry.onclick=retry;
btnTheme.onclick=toggleTheme;
loadTheme();
