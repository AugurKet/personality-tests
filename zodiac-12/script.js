const el = (id) => document.getElementById(id);

const YEAR = new Date().getFullYear();
el("year").textContent = YEAR;

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
const mPros = el("mPros");
const mCons = el("mCons");
const mLove = el("mLove");
const mWork = el("mWork");
const mTips = el("mTips");

let activeFilter = "all";
let active = null;

const ELEMENT_LABEL = {
  fire: "火象",
  earth: "土象",
  air: "风象",
  water: "水象",
};

const ZODIAC = [
  {
    key:"aries", cn:"白羊座", en:"Aries", emoji:"♈︎", date:"3/21 - 4/19", elem:"fire",
    quote:"直球第一名：喜欢就冲，讨厌就走，最怕磨叽。",
    keywords:["行动","热血","直接","好胜","三分钟热度"],
    pros:["启动快、说干就干","有冲劲，能带动团队","爱憎分明，不玩暗的"],
    cons:["急、容易上头","不爱被管","热情来得快去得也快"],
    love:"恋爱像开加速：喜欢会很明显，但需要被尊重空间与节奏。",
    work:"适合冲锋型任务、开荒项目；不适合无止境重复与拖拉流程。",
    tips:"跟白羊相处：少绕弯子，多给明确选项；夸TA的行动力比夸颜值更有效。",
    wiki:"https://zh.wikipedia.org/wiki/%E7%99%BD%E7%BE%8A%E5%BA%A7"
  },
  {
    key:"taurus", cn:"金牛座", en:"Taurus", emoji:"♉︎", date:"4/20 - 5/20", elem:"earth",
    quote:"慢热但很稳：一旦认定，会用行动把你放进生活里。",
    keywords:["稳定","务实","享受","固执","安全感"],
    pros:["靠谱，承诺感强","很会把日子过好","抗压稳，不轻易崩"],
    cons:["慢、很难被催动","固执，改主意不容易","不喜欢被打断节奏"],
    love:"需要安全感与确定性；在一起后会越来越照顾人，但不爱被逼表态。",
    work:"擅长长期积累型工作、财务/运营/流程；不爱频繁变更需求。",
    tips:"跟金牛相处：别用嘴催，用“清晰计划+可兑现承诺”；偶尔来点高质量陪伴会加分。",
    wiki:"https://zh.wikipedia.org/wiki/%E9%87%91%E7%89%9B%E5%BA%A7"
  },
  {
    key:"gemini", cn:"双子座", en:"Gemini", emoji:"♊︎", date:"5/21 - 6/21", elem:"air",
    quote:"脑子像开了多标签：好奇心驱动，讨厌无聊。",
    keywords:["好奇","表达","反差","机灵","三心二意(误)"],
    pros:["沟通能力强","学习快，适应力强","自带趣味，社交润滑剂"],
    cons:["注意力容易跳","情绪变化快","不喜欢被贴标签/束缚"],
    love:"需要交流与新鲜感；你越有趣，双子越认真。",
    work:"适合内容、销售、产品、媒体；不适合长期单一重复任务。",
    tips:"跟双子相处：多聊、多新鲜、多给空间；别用“你到底想怎样”逼死TA。",
    wiki:"https://zh.wikipedia.org/wiki/%E5%8F%8C%E5%AD%90%E5%BA%A7"
  },
  {
    key:"cancer", cn:"巨蟹座", en:"Cancer", emoji:"♋︎", date:"6/22 - 7/22", elem:"water",
    quote:"外表软，内心很强：在乎的人才看得到TA的敏感与温柔。",
    keywords:["顾家","敏感","保护","情绪","念旧"],
    pros:["很会照顾人","共情力强","对关系认真且有耐心"],
    cons:["容易想太多","安全感不足会退缩","受伤后记很久"],
    love:"需要被珍惜与被回应；稳定、细节与仪式感很重要。",
    work:"适合服务、教育、护理、HR；在有温度的团队里会超强。",
    tips:"跟巨蟹相处：别冷处理；一句“我在”胜过十句道理。",
    wiki:"https://zh.wikipedia.org/wiki/%E5%B7%A8%E8%9F%B9%E5%BA%A7"
  },
  {
    key:"leo", cn:"狮子座", en:"Leo", emoji:"♌︎", date:"7/23 - 8/22", elem:"fire",
    quote:"要面子也要里子：被认可会开挂，被否定会炸毛。",
    keywords:["自信","舞台","热情","慷慨","自尊"],
    pros:["领导感强","讲义气，护短但护得住","能把场子撑起来"],
    cons:["爱面子，不爱示弱","情绪来得快","不喜欢被忽视"],
    love:"喜欢明确的偏爱与欣赏；被崇拜不等于被纵容，边界也要讲清楚。",
    work:"适合带队、对外、表达型岗位；关键是“让TA有成就感”。",
    tips:"跟狮子相处：夸要真诚具体；公开给面子，私下讲道理。",
    wiki:"https://zh.wikipedia.org/wiki/%E7%8B%AE%E5%AD%90%E5%BA%A7"
  },
  {
    key:"virgo", cn:"处女座", en:"Virgo", emoji:"♍︎", date:"8/23 - 9/22", elem:"earth",
    quote:"细节控不是挑刺，是认真：想把事情做对，也想把你照顾好。",
    keywords:["细节","标准","效率","克制","焦虑"],
    pros:["靠谱、执行强","会优化流程","对自己负责也对别人负责"],
    cons:["容易紧绷","表达不够甜但很实在","对不确定很敏感"],
    love:"爱是服务与行动；嘴不甜但会默默把你生活打理顺。",
    work:"适合分析、运营、工程、医药；在规则清晰的环境最强。",
    tips:"跟处女相处：别只说“放轻松”，给“可执行方案”；认可TA的努力很重要。",
    wiki:"https://zh.wikipedia.org/wiki/%E5%A4%84%E5%A5%B3%E5%BA%A7"
  },
  {
    key:"libra", cn:"天秤座", en:"Libra", emoji:"♎︎", date:"9/23 - 10/23", elem:"air",
    quote:"优雅与公平的代言：不喜欢冲突，但不代表没立场。",
    keywords:["平衡","审美","社交","犹豫","公平"],
    pros:["会照顾气氛","审美在线","善于协调与谈判"],
    cons:["选择困难","讨厌撕破脸","容易为了和谐委屈自己"],
    love:"需要舒服的相处与尊重；浪漫与体面很加分。",
    work:"适合公关、设计、法律、HR；擅长在复杂关系里找平衡点。",
    tips:"跟天秤相处：给选项别给难题；别逼TA立刻决定，给一点时间会更有效。",
    wiki:"https://zh.wikipedia.org/wiki/%E5%A4%A9%E7%A7%A4%E5%BA%A7"
  },
  {
    key:"scorpio", cn:"天蝎座", en:"Scorpio", emoji:"♏︎", date:"10/24 - 11/22", elem:"water",
    quote:"深度玩家：要么不开始，一开始就很认真。",
    keywords:["深度","直觉","占有欲","边界","极致"],
    pros:["专注、韧性强","洞察力强","对在乎的人非常护短"],
    cons:["不爱示弱","猜来猜去容易累","受伤会记仇(其实是自保)"],
    love:"需要忠诚与信任；你越真诚，天蝎越温柔。",
    work:"适合研究、金融、风控、侦查类；能把复杂问题咬到解决。",
    tips:"跟天蝎相处：别玩套路；说到做到，尊重隐私边界。",
    wiki:"https://zh.wikipedia.org/wiki/%E5%A4%A9%E8%9D%8E%E5%BA%A7"
  },
  {
    key:"sagittarius", cn:"射手座", en:"Sagittarius", emoji:"♐︎", date:"11/23 - 12/21", elem:"fire",
    quote:"自由派：人生是旷野，不是轨道。",
    keywords:["自由","乐观","探索","直率","不爱被管"],
    pros:["正能量强","视野开阔","很会带你去看更大的世界"],
    cons:["不喜欢束缚","承诺需要时间","容易一时兴起又跳频道"],
    love:"需要空间与共同成长；越是“给自由”，越可能留下来。",
    work:"适合出差、内容、教育、市场；不适合微管理与无意义汇报。",
    tips:"跟射手相处：少查岗，多约体验；把规则说清楚，但别用控制当爱。",
    wiki:"https://zh.wikipedia.org/wiki/%E5%B0%84%E6%89%8B%E5%BA%A7"
  },
  {
    key:"capricorn", cn:"摩羯座", en:"Capricorn", emoji:"♑︎", date:"12/22 - 1/19", elem:"earth",
    quote:"把责任当浪漫：不说“我爱你”，但会说“我来扛”。",
    keywords:["目标","克制","责任","长期主义","慢热"],
    pros:["抗压强、能扛事","目标清晰","靠谱到让人安心"],
    cons:["不太会表达情绪","容易把自己逼太紧","需要时间热起来"],
    love:"爱是稳定与兑现；需要被理解“他不说不代表不在乎”。",
    work:"适合管理、策略、运营、工程；在长期赛道里更容易赢。",
    tips:"跟摩羯相处：别只要情绪价值，也要给现实支持；认可TA的付出，会更愿意柔软。",
    wiki:"https://zh.wikipedia.org/wiki/%E6%91%A9%E7%BE%AF%E5%BA%A7"
  },
  {
    key:"aquarius", cn:"水瓶座", en:"Aquarius", emoji:"♒︎", date:"1/20 - 2/18", elem:"air",
    quote:"人间观察员：你越想定义TA，TA越想逃。",
    keywords:["独立","脑洞","理性","反传统","界限感"],
    pros:["思路新","尊重差异","朋友感强，不黏但很真"],
    cons:["情绪表达少","忽冷忽热（其实是需要空间）","不喜欢被控制"],
    love:"需要精神共鸣与自由；像朋友一样相爱最稳。",
    work:"适合创新、科技、产品、研究；讨厌无脑规则与形式主义。",
    tips:"跟水瓶相处：别PUA别控制；多聊观点、少逼情绪，给空间反而更靠近。",
    wiki:"https://zh.wikipedia.org/wiki/%E6%B0%B4%E7%93%B6%E5%BA%A7"
  },
  {
    key:"pisces", cn:"双鱼座", en:"Pisces", emoji:"♓︎", date:"2/19 - 3/20", elem:"water",
    quote:"浪漫与共情的集合体：你一句话，TA能脑补一整部剧。",
    keywords:["浪漫","共情","想象力","逃避","柔软"],
    pros:["很会理解人","创意强","氛围感王者"],
    cons:["容易受环境影响","不开心会躲起来","边界感不足会累"],
    love:"需要温柔与安全感；被理解是最大的浪漫。",
    work:"适合创意、艺术、咨询、助人行业；需要清晰边界与节奏。",
    tips:"跟双鱼相处：多肯定、多温柔；同时帮TA把“梦”落到“计划”。",
    wiki:"https://zh.wikipedia.org/wiki/%E5%8F%8C%E9%B1%BC%E5%BA%A7"
  },
];

// ---------- UI ----------
function renderGrid(list){
  grid.innerHTML = "";
  list.forEach(z => {
    const div = document.createElement("div");
    div.className = "card";
    div.tabIndex = 0;
    div.setAttribute("role", "button");
    div.setAttribute("aria-label", `${z.cn} ${z.en} 详情`);

    div.innerHTML = `
      <div class="cardTop">
        <div class="zEmoji">${z.emoji}</div>
        <div class="zElem"><span class="dot ${z.elem}"></span>${ELEMENT_LABEL[z.elem]}</div>
      </div>
      <div class="zName">${z.cn} <span class="muted">· ${z.en}</span></div>
      <div class="zMeta">${z.date}</div>
    `;

    const open = () => openModal(z.key);
    div.addEventListener("click", open);
    div.addEventListener("keydown", (e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); open(); } });

    grid.appendChild(div);
  });
}

function openModal(key){
  const z = ZODIAC.find(x => x.key === key);
  if(!z) return;
  active = z;

  mEmoji.textContent = z.emoji;
  mName.textContent  = `${z.cn} ${z.en}`;
  mDate.textContent  = `${z.date} · ${ELEMENT_LABEL[z.elem]}`;
  mQuote.textContent = z.quote;

  mKeywords.innerHTML = z.keywords.map(k => `<span class="chip">${k}</span>`).join("");
  mPros.innerHTML = z.pros.map(x => `<li>${x}</li>`).join("");
  mCons.innerHTML = z.cons.map(x => `<li>${x}</li>`).join("");
  mLove.textContent = z.love;
  mWork.textContent = z.work;
  mTips.textContent = z.tips;

  btnWiki.href = z.wiki;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modal.classList.add("hidden");
  document.body.style.overflow = "";
  active = null;
}

btnClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });
document.addEventListener("keydown", (e)=>{ if(e.key === "Escape" && !modal.classList.contains("hidden")) closeModal(); });

btnCopy.addEventListener("click", async ()=>{
  if(!active) return;
  const text =
`我看了「${active.cn} ${active.en}」${active.emoji}
元素：${ELEMENT_LABEL[active.elem]}｜日期：${active.date}
关键词：${active.keywords.join(" / ")}
一句话：${active.quote}
相处建议：${active.tips}

你也来看看：${location.href}`;

  if(navigator.share){
    try{ await navigator.share({ title:`${active.cn}讲解`, text, url: location.href }); return; }catch(_){}
  }
  try{
    await navigator.clipboard.writeText(text);
    alert("已复制分享文案 ✅");
  }catch(e){
    prompt("复制下面内容：", text);
  }
});

// ---------- Search + Filter ----------
function normalize(s){ return (s||"").toLowerCase().replace(/\s+/g,""); }

function apply(){
  const q = normalize(search.value);
  const list = ZODIAC.filter(z => {
    const hitElem = (activeFilter === "all") || (z.elem === activeFilter);
    if(!hitElem) return false;
    if(!q) return true;

    const hay = normalize([
      z.cn, z.en, z.date, ELEMENT_LABEL[z.elem],
      z.keywords.join(" "), z.pros.join(" "), z.cons.join(" ")
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

// ---------- Theme ----------
function applyTheme(mode){
  const root = document.documentElement;
  if(mode==="light"){
    root.setAttribute("data-theme","light");
    btnTheme.textContent="☀️";
  }else{
    root.setAttribute("data-theme","");
    btnTheme.textContent="🌙";
  }
}
function loadTheme(){
  try{
    const saved = localStorage.getItem("zodiac_theme");
    applyTheme(saved==="light" ? "light" : "dark");
  }catch(_){ applyTheme("dark"); }
}
btnTheme.addEventListener("click", ()=>{
  const isLight = document.documentElement.getAttribute("data-theme")==="light";
  const next = isLight ? "dark" : "light";
  try{ localStorage.setItem("zodiac_theme", next); }catch(_){}
  applyTheme(next);
});

// init
loadTheme();
renderGrid(ZODIAC);
