const el = (id) => document.getElementById(id);
el("year").textContent = new Date().getFullYear();

const btnTheme = el("btnTheme");
const search = el("search");
const grid = el("grid");

const modal = el("modal");
const btnClose = el("btnClose");
const btnCopy = el("btnCopy");
const btnWiki = el("btnWiki");

const mEmoji = el("mEmoji");
const mName  = el("mName");
const mDate  = el("mDate");
const mQuote = el("mQuote");

const mKeywords = el("mKeywords");
const mDrive = el("mDrive");
const mOuterInner = el("mOuterInner");
const mSafety = el("mSafety");

const mPros = el("mPros");
const mCons = el("mCons");
const mTriggers = el("mTriggers");
const mAtBest = el("mAtBest");

const mComm = el("mComm");
const mConflict = el("mConflict");
const mRepair = el("mRepair");
const mDontSay = el("mDontSay");

const mCrush = el("mCrush");
const mIntimacy = el("mIntimacy");
const mLoveMines = el("mLoveMines");
const mLovePlus = el("mLovePlus");

const mEnv = el("mEnv");
const mHack = el("mHack");
const mStuck = el("mStuck");
const mGrowth = el("mGrowth");

const mTips = el("mTips");
const mDo = el("mDo");
const mDont = el("mDont");
const mOneLiner = el("mOneLiner");

const mMatchGood = el("mMatchGood");
const mMatchHard = el("mMatchHard");
const mMatchNote = el("mMatchNote");

const panels = {
  overview: el("panelOverview"),
  deep: el("panelDeep"),
  talk: el("panelTalk"),
  love: el("panelLove"),
  work: el("panelWork"),
  tips: el("panelTips"),
  match: el("panelMatch"),
};

let activeFilter = "all";
let active = null;

const ELEMENT_LABEL = { fire:"火象", earth:"土象", air:"风象", water:"水象" };

// 深度数据结构（示范：白羊/金牛）
const ZODIAC = [
  {
    key:"aries", cn:"白羊座", en:"Aries", emoji:"♈︎", date:"3/21 - 4/19", elem:"fire",
    quote:"直球第一名：喜欢就冲，讨厌就走，最怕磨叽。",
    keywords:["行动","热血","直接","好胜","快节奏"],
    drive:"想赢、想快、想证明“我可以”。核心不是冲动，而是对生命力与主导感的渴望。",
    outerInner:[
      "外在：很强势、很快、很敢。/ 内在：其实怕被否定、怕浪费时间。",
      "外在：不拐弯抹角。/ 内在：希望对方也坦诚，不要玩心理战。"
    ],
    safety:[
      "说清楚规则与边界，让TA知道“怎么做才算对”",
      "给选择题，不要给无限拖延：‘要A还是B？’",
      "认可行动与勇气：比夸结果更能稳住TA"
    ],
    pros:[
      "启动快、抗拒拖延：能把事情推起来",
      "遇事敢扛，勇于承担",
      "表达直接，关系里少暗箭"
    ],
    cons:[
      "容易上头：先冲再补救",
      "耐心较短：对慢节奏会烦",
      "不爱被控制：越管越反弹"
    ],
    triggers:[
      "被羞辱/被当众否定",
      "被拖着不做决定",
      "被怀疑动机：‘你是不是故意的？’"
    ],
    atBest:[
      "有挑战、有舞台、有反馈",
      "目标清晰、节奏快",
      "被信任：自己能做主"
    ],
    comm:[
      "喜欢直说：重点先讲结论，再讲原因",
      "更吃“明确回应”：可以/不行/什么时候",
      "沟通时别绕圈：会被判定为浪费时间"
    ],
    conflict:[
      "吵架像短跑：爆发快、结束也快",
      "气头上会说狠话，但不一定记仇",
      "需要‘下台阶’：给个面子就能和好"
    ],
    repair:"先承认情绪（我知道你很火）→ 再给选项（我们现在要A还是B）→ 最后落行动（我先做X）。",
    dontSay:[
      "“你能不能成熟一点？”",
      "“随便你啦”（白羊会被气到更上头）",
      "“我不想跟你讲”（会被理解为冷战）"
    ],
    crush:"喜欢一个人会变得很主动：找你、约你、保护你，‘直球’就是他的浪漫。",
    intimacy:[
      "要被尊重：别管太细、别查岗式控制",
      "要一起行动：一起运动/旅行/做项目更亲密",
      "要肯定：认可TA的努力与勇气"
    ],
    loveMines:[
      "冷处理、消失、不回信息",
      "反复试探、玩暧昧拉扯",
      "公开拆台/挖苦"
    ],
    lovePlus:"给TA一个挑战目标（一起进步）+ 给TA明确偏爱（我选你）+ 保留一点空间（你去冲，我在）。",
    env:[
      "快节奏、结果导向、能尝试新东西的环境",
      "允许试错与快速迭代",
      "权责清晰：少扯皮"
    ],
    hack:[
      "拆成短冲刺：25–40分钟一轮，立刻见成果",
      "先做最难的：越拖越烦",
      "公开承诺：对外说了就更容易做到"
    ],
    stuck:[
      "长期重复、没有挑战的任务",
      "需要长时间等待反馈的工作",
      "被微管理：细节被管会烦"
    ],
    growth:"练习‘慢一点也不会输’：先停3秒再回应，会让你更强而不是更弱。",
    tips:"跟白羊相处：少绕弯子、多行动；给明确回应与尊重空间，关系会非常顺。",
    do:[
      "用明确句：可以/不行/什么时候",
      "夸行动力与担当",
      "给空间但保持回应"
    ],
    dont:[
      "冷战/不解释就消失",
      "用羞辱方式纠错",
      "无限拖延不做决定"
    ],
    oneLiner:"白羊不是没脑子，是太快；他要的是直球、尊重、和一起冲的伙伴。",
    matchGood:[
      "火象/风象更容易合拍：节奏快、沟通直",
      "能给空间的人：不黏但稳定",
      "敢一起做事的人：一起成长最稳"
    ],
    matchHard:[
      "强控制型：越管越炸",
      "长期冷处理型：会直接判定‘不爱了’",
      "极慢节奏又不沟通：会被白羊嫌弃"
    ],
    matchNote:"‘合拍’不是星座决定，而是节奏与沟通方式。白羊最需要：明确+尊重+行动。",
    wiki:"https://zh.wikipedia.org/wiki/%E7%99%BD%E7%BE%8A%E5%BA%A7"
  },

  {
    key:"taurus", cn:"金牛座", en:"Taurus", emoji:"♉︎", date:"4/20 - 5/20", elem:"earth",
    quote:"慢热但很稳：一旦认定，会用行动把你放进生活里。",
    keywords:["稳定","务实","耐心","享受","安全感"],
    drive:"想稳、想确定、想掌控生活的节奏。核心不是固执，而是害怕不确定。",
    outerInner:[
      "外在：慢、淡定。/ 内在：其实非常在意是否可靠、是否可持续。",
      "外在：不说甜话。/ 内在：会用行动照顾你，把你纳入生活规划。"
    ],
    safety:[
      "承诺要可兑现：说到做到",
      "节奏可预期：提前讲计划，不临时变卦",
      "尊重TA的界限与习惯：别硬改"
    ],
    pros:[
      "稳定可靠，抗压强",
      "长期主义：会把事情做扎实",
      "生活能力强：会把日子过好"
    ],
    cons:[
      "启动慢：被催会更慢",
      "固执：改主意成本高",
      "不舒服时会‘冷’：用沉默自保"
    ],
    triggers:[
      "突然变化/临时通知",
      "反复失信：说了不做",
      "被轻视努力：‘这很简单啊’"
    ],
    atBest:[
      "有稳定节奏 + 清晰目标",
      "被信任、被依赖",
      "环境舒适：吃得好睡得好更强"
    ],
    comm:[
      "喜欢具体：别空口画饼",
      "更信行动：少说多做",
      "沟通要给时间：不要逼立刻答"
    ],
    conflict:[
      "不吵但会记：忍到极限会一次爆",
      "争吵点多与‘原则/价值’有关",
      "需要‘慢慢谈’：越逼越关机"
    ],
    repair:"先稳定节奏（我不会消失）→ 承认影响（我这次确实让你不安）→ 给可兑现承诺（下次我会提前说）。",
    dontSay:[
      "“你怎么这么慢？”",
      "“你太固执了”（会更固执）",
      "“随便啦，算了”（金牛会当你不在乎）"
    ],
    crush:"心动是‘越来越常出现在你生活里’：会照顾、会安排、会把你当自己人。",
    intimacy:[
      "要稳定与确定：不喜欢忽冷忽热",
      "要生活层面的陪伴：一起吃饭、一起过日子",
      "要尊重：别公开让TA难堪"
    ],
    loveMines:[
      "反复试探与不确定承诺",
      "临时变卦、放鸽子",
      "嘲笑TA的坚持/习惯"
    ],
    lovePlus:"用可兑现的小承诺累积信任 + 给舒适高质量陪伴（吃饭/旅行/仪式感）+ 不逼但持续稳定。",
    env:[
      "稳定、规则清晰的环境",
      "能沉淀与积累的岗位",
      "少变更、少折腾"
    ],
    hack:[
      "固定时间块：让节奏可预期",
      "先做最确定的部分：逐步推进",
      "用清单：越可见越安心"
    ],
    stuck:[
      "频繁变更需求",
      "没有边界的加塞任务",
      "只讲理想不讲资源"
    ],
    growth:"练习‘小范围尝试’：每次改变一点点，你会更自由，而不是更不安。",
    tips:"跟金牛相处：别催、别飘、别失信；稳定与兑现就是最大的浪漫。",
    do:[
      "提前说计划，少临时变卦",
      "用行动兑现承诺",
      "给舒适感与仪式感"
    ],
    dont:[
      "用催促当管理",
      "失信/放鸽子",
      "当众让TA难堪"
    ],
    oneLiner:"金牛不难哄：你稳定、你兑现、你尊重，他就会把你当一辈子的人。",
    matchGood:[
      "能稳定输出的人：节奏一致更安心",
      "尊重边界的人：不逼不控",
      "愿意一起经营生活的人"
    ],
    matchHard:[
      "太飘太变的人：金牛会焦虑",
      "不兑现的人：信任塌一次就很难修",
      "喜欢刺激但不负责的人"
    ],
    matchNote:"金牛的核心不是慢，是‘可靠’。你可靠，他就非常深情。",
    wiki:"https://zh.wikipedia.org/wiki/%E9%87%91%E7%89%9B%E5%BA%A7"
  },

  // TODO：把其他10个星座按同样结构补齐
];

// --------- Helpers ----------
function normalize(s){ return (s||"").toLowerCase().replace(/\s+/g,""); }
function fillList(ul, arr){
  ul.innerHTML = "";
  (arr || []).forEach(x => {
    const li = document.createElement("li");
    li.textContent = x;
    ul.appendChild(li);
  });
}
function fillChips(box, arr){
  box.innerHTML = (arr || []).map(k => `<span class="chip">${k}</span>`).join("");
}

// --------- Tabs ----------
function showTab(tab){
  document.querySelectorAll(".tabBtn").forEach(b=>b.classList.remove("active"));
  document.querySelector(`.tabBtn[data-tab="${tab}"]`)?.classList.add("active");

  Object.values(panels).forEach(p=>p.classList.add("hidden"));
  panels[tab]?.classList.remove("hidden");
}

// --------- Grid ----------
function renderGrid(list){
  grid.innerHTML = "";
  list.forEach(z => {
    const div = document.createElement("div");
    div.className = "card";
    div.tabIndex = 0;
    div.setAttribute("role","button");
    div.innerHTML = `
      <div class="cardTop">
        <div class="zEmoji">${z.emoji}</div>
        <div class="zElem"><span class="dot ${z.elem}"></span>${ELEMENT_LABEL[z.elem]}</div>
      </div>
      <div class="zName">${z.cn} <span class="muted">· ${z.en}</span></div>
      <div class="zMeta">${z.date}</div>
    `;
    const open = ()=>openModal(z.key);
    div.onclick = open;
    div.onkeydown = (e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); open(); } };
    grid.appendChild(div);
  });
}

function openModal(key){
  const z = ZODIAC.find(x=>x.key===key);
  if(!z) return;
  active = z;

  mEmoji.textContent = z.emoji;
  mName.textContent  = `${z.cn} ${z.en}`;
  mDate.textContent  = `${z.date} · ${ELEMENT_LABEL[z.elem]}`;
  mQuote.textContent = z.quote;

  fillChips(mKeywords, z.keywords);
  mDrive.textContent = z.drive || "";
  fillList(mOuterInner, z.outerInner);
  fillList(mSafety, z.safety);

  fillList(mPros, z.pros);
  fillList(mCons, z.cons);
  fillList(mTriggers, z.triggers);
  fillList(mAtBest, z.atBest);

  fillList(mComm, z.comm);
  fillList(mConflict, z.conflict);
  mRepair.textContent = z.repair || "";
  fillList(mDontSay, z.dontSay);

  mCrush.textContent = z.crush || "";
  fillList(mIntimacy, z.intimacy);
  fillList(mLoveMines, z.loveMines);
  mLovePlus.textContent = z.lovePlus || "";

  fillList(mEnv, z.env);
  fillList(mHack, z.hack);
  fillList(mStuck, z.stuck);
  mGrowth.textContent = z.growth || "";

  mTips.textContent = z.tips || "";
  fillList(mDo, z.do);
  fillList(mDont, z.dont);
  mOneLiner.textContent = z.oneLiner || "";

  fillList(mMatchGood, z.matchGood);
  fillList(mMatchHard, z.matchHard);
  mMatchNote.textContent = z.matchNote || "";

  btnWiki.href = z.wiki || "#";

  modal.classList.remove("hidden");
  document.body.style.overflow="hidden";

  showTab("overview");
}

function closeModal(){
  modal.classList.add("hidden");
  document.body.style.overflow="";
  active = null;
}

// close events
btnClose.onclick = closeModal;
modal.onclick = (e)=>{ if(e.target === modal) closeModal(); };
document.addEventListener("keydown",(e)=>{ if(e.key==="Escape" && !modal.classList.contains("hidden")) closeModal(); });

// tab events
document.querySelectorAll(".tabBtn").forEach(btn=>{
  btn.addEventListener("click", ()=> showTab(btn.dataset.tab));
});

// copy share
btnCopy.addEventListener("click", async ()=>{
  if(!active) return;
  const z = active;
  const text =
`【${z.cn} ${z.en}】${z.emoji}
元素：${ELEMENT_LABEL[z.elem]}｜日期：${z.date}
核心驱动力：${z.drive}
一句话：${z.quote}
相处建议：${z.tips}

#关键词：${(z.keywords||[]).join(" / ")}
你也来看看：${location.href}`;

  if(navigator.share){
    try{ await navigator.share({ title:`${z.cn}深度讲解`, text, url: location.href }); return; }catch(_){}
  }
  try{ await navigator.clipboard.writeText(text); alert("已复制分享文案 ✅"); }
  catch(e){ prompt("复制下面内容：", text); }
});

// search + filter
function apply(){
  const q = normalize(search.value);
  const list = ZODIAC.filter(z=>{
    const okElem = (activeFilter==="all") || (z.elem===activeFilter);
    if(!okElem) return false;
    if(!q) return true;
    const hay = normalize([
      z.cn,z.en,z.date,ELEMENT_LABEL[z.elem],
      (z.keywords||[]).join(" "),
      (z.quote||""),
      (z.drive||""),
    ].join(" "));
    return hay.includes(q);
  });
  renderGrid(list);
}
search.addEventListener("input", apply);

document.querySelectorAll(".segBtn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".segBtn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    apply();
  });
});

// theme
function applyTheme(mode){
  const root = document.documentElement;
  if(mode==="light"){ root.setAttribute("data-theme","light"); btnTheme.textContent="☀️"; }
  else { root.setAttribute("data-theme",""); btnTheme.textContent="🌙"; }
}
function loadTheme(){
  try{
    const saved = localStorage.getItem("zodiac_theme");
    applyTheme(saved==="light" ? "light" : "dark");
  }catch(_){ applyTheme("dark"); }
}
btnTheme.onclick = ()=>{
  const isLight = document.documentElement.getAttribute("data-theme")==="light";
  const next = isLight ? "dark" : "light";
  try{ localStorage.setItem("zodiac_theme", next); }catch(_){}
  applyTheme(next);
};

// init
loadTheme();
renderGrid(ZODIAC);
