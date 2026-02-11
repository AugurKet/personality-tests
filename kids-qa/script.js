// =============================
// Kids -> Parents Q&A（温柔小纸条）
// 12题，选项映射到“主题标签”，最终生成：
// - 我希望爸妈知道（3条）
// - 我更需要的支持（3条）
// - 一封小纸条（可复制）
// =============================

const THEMES = {
  LISTEN: { name:"被听见", know:"有时候我不是想顶嘴，我只是想被听见。", need:"你可以先听完，再给建议。" },
  TRUST:  { name:"被信任", know:"我想证明我可以自己处理一些事。", need:"你可以给我一点点选择权/空间。" },
  PRESS:  { name:"压力",   know:"当我压力很大时，我会更敏感、更容易烦。", need:"你可以先问我：现在最难的是哪一部分？" },
  PRAISE: { name:"肯定",   know:"我很在意你们看到我的努力。", need:"你可以多说一句：我看见你已经很努力了。" },
  BOUND:  { name:"边界",   know:"我需要清楚的规则，但也想知道为什么。", need:"你可以规则少一点、讲清楚原因、稳定执行。" },
  SAFE:   { name:"安全感", know:"我害怕被骂/被比较时，会更不敢说真话。", need:"你可以用更温柔的语气，我会更愿意靠近。" },
  TIME:   { name:"陪伴",   know:"我最想要的不是礼物，是你们的时间。", need:"哪怕10分钟专心陪我，也很有用。" },
  FAIR:   { name:"公平",   know:"我希望被公平对待，而不是一上来就否定。", need:"你可以先问清楚发生什么，再做判断。" },
};

const QUESTIONS = [
  { q:"当爸妈开始讲道理/训话时，我通常会…", a:[
    {k:"LISTEN", txt:"我会想解释，但常常被打断"},
    {k:"SAFE",   txt:"我会沉默，因为怕越讲越糟"},
    {k:"BOUND",  txt:"我会不服气：为什么一定要这样？"},
    {k:"PRESS",  txt:"我会烦：我已经很累了"},
  ]},
  { q:"我最希望爸妈理解我的…", a:[
    {k:"PRESS",  txt:"压力（作业/考试/同学/未来）"},
    {k:"TIME",   txt:"需要被陪伴，而不是被管住"},
    {k:"TRUST",  txt:"我想自己做决定、自己负责"},
    {k:"SAFE",   txt:"我需要被尊重，不想被骂"},
  ]},
  { q:"当我做错事时，我更希望爸妈…", a:[
    {k:"FAIR",   txt:"先听我解释，再决定怎么处理"},
    {k:"SAFE",   txt:"先别骂，我会更愿意承认"},
    {k:"BOUND",  txt:"告诉我规则/后果，下次怎么做"},
    {k:"PRAISE", txt:"先肯定我愿意面对错误"},
  ]},
  { q:"当我成绩不理想时，我更需要…", a:[
    {k:"PRAISE", txt:"先肯定努力，再一起想方法"},
    {k:"PRESS",  txt:"不要立刻加压，我会更崩"},
    {k:"TRUST",  txt:"给我一点时间，我会调整"},
    {k:"TIME",   txt:"你们陪我把计划拆小一点"},
  ]},
  { q:"我最讨厌爸妈做的一件事是…", a:[
    {k:"SAFE",   txt:"拿我跟别人比较"},
    {k:"LISTEN", txt:"我还没说完就下结论"},
    {k:"TRUST",  txt:"什么都不放心、什么都要管"},
    {k:"BOUND",  txt:"规则变来变去，说了不算"},
  ]},
  { q:"如果我心情不好，我更可能…", a:[
    {k:"SAFE",   txt:"躲起来，不想被问"},
    {k:"LISTEN", txt:"想说，但不知道怎么开口"},
    {k:"TIME",   txt:"希望你们陪我做点轻松的事"},
    {k:"PRESS",  txt:"变得敏感/易怒"},
  ]},
  { q:"我最想从爸妈那里得到…", a:[
    {k:"TRUST",  txt:"信任：让我试试、让我负责"},
    {k:"PRAISE", txt:"肯定：你们看见我的努力"},
    {k:"TIME",   txt:"陪伴：哪怕每天10分钟"},
    {k:"SAFE",   txt:"安全感：别用骂/嘲讽"},
  ]},
  { q:"当爸妈问我‘怎么了’时，我更希望你们…", a:[
    {k:"LISTEN", txt:"先听，不要马上给解决方案"},
    {k:"SAFE",   txt:"语气温柔点，我才敢说"},
    {k:"FAIR",   txt:"别先站队/先怪我"},
    {k:"TIME",   txt:"愿意真的坐下来聊一会儿"},
  ]},
  { q:"对我来说，最有效的沟通方式是…", a:[
    {k:"LISTEN", txt:"我说，你们先听完再回应"},
    {k:"BOUND",  txt:"规则少一点但清晰稳定"},
    {k:"TRUST",  txt:"给选择题：让我参与决定"},
    {k:"SAFE",   txt:"语气温和+不翻旧账"},
  ]},
  { q:"如果让我许一个愿望，我希望家里…", a:[
    {k:"SAFE",   txt:"少一点吼叫/讽刺/比较"},
    {k:"TIME",   txt:"多一点一起吃饭/聊天/散步"},
    {k:"FAIR",   txt:"发生冲突时更公平、先听原因"},
    {k:"PRAISE", txt:"多一点鼓励和认可"},
  ]},
  { q:"当我做得不错时，我希望爸妈…", a:[
    {k:"PRAISE", txt:"直接夸我：我会更有动力"},
    {k:"TIME",   txt:"陪我庆祝一下（哪怕小小的）"},
    {k:"TRUST",  txt:"多给一点自由作为奖励"},
    {k:"LISTEN", txt:"听我分享过程，而不是只看结果"},
  ]},
  { q:"我想对爸妈说的一句真心话是…", a:[
    {k:"LISTEN", txt:"请先听我说完，再评价"},
    {k:"TRUST",  txt:"请相信我可以慢慢变好"},
    {k:"SAFE",   txt:"请温柔一点，我会更愿意靠近"},
    {k:"PRESS",  txt:"我压力真的很大，我需要支持"},
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
const btnCopy = el("btnCopy");
const btnRetry = el("btnRetry");
const btnTheme = el("btnTheme");

const qNow = el("qNow");
const qTotal = el("qTotal");
const progressFill = el("progressFill");
const qTitle = el("qTitle");
const optionsBox = el("options");

const resultTag = el("resultTag");
const knowList = el("knowList");
const needList = el("needList");
const letterText = el("letterText");

el("year").textContent = new Date().getFullYear();

let idx = 0;
let answers = Array(QUESTIONS.length).fill(null);
let scores = resetScores();

function resetScores(){
  return Object.keys(THEMES).reduce((acc,k)=>(acc[k]=0,acc),{});
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

  optionsBox.innerHTML="";
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

function applyScore(k,delta){ scores[k]=(scores[k]||0)+delta; }

function choose(optIndex){
  const item = QUESTIONS[idx];
  const prev = answers[idx];
  if(prev!==null) applyScore(item.a[prev].k, -2);

  answers[idx]=optIndex;
  applyScore(item.a[optIndex].k, +2);

  if(idx<QUESTIONS.length-1){ idx++; renderQuestion(); }
  else { progressFill.style.width="100%"; showResult(); }
}

function skip(){
  if(idx<QUESTIONS.length-1){ idx++; renderQuestion(); }
  else { progressFill.style.width="100%"; showResult(); }
}

function back(){
  if(idx===0) return;
  idx--;
  renderQuestion();
}

function fillList(ul, arr){
  ul.innerHTML="";
  arr.forEach(t=>{
    const li=document.createElement("li");
    li.textContent=t;
    ul.appendChild(li);
  });
}

function rankedThemes(){
  return Object.entries(scores)
    .map(([k,v])=>({k,v}))
    .sort((a,b)=>b.v-a.v);
}

function pickUniqueSentences(arr, n){
  const out=[];
  for(const s of arr){
    if(!out.includes(s)) out.push(s);
    if(out.length>=n) break;
  }
  return out;
}

function showResult(){
  const r = rankedThemes();
  // 如果全跳过，给默认
  if(r[0].v===0){
    r[0] = {k:"LISTEN", v:0};
    r[1] = {k:"SAFE", v:0};
    r[2] = {k:"PRAISE", v:0};
  }

  const top3 = r.slice(0,3).map(x=>x.k);

  const know = top3.map(k=>THEMES[k].know);
  const need = top3.map(k=>THEMES[k].need);

  fillList(knowList, know);
  fillList(needList, need);

  const summary = `我的重点：${top3.map(k=>THEMES[k].name).join(" / ")}`;
  resultTag.textContent = summary;

  // 生成小纸条（温柔、不对立）
  const lines = [];
  lines.push("爸妈：");
  lines.push("我想用比较温柔的方式把心里话说清楚。");
  lines.push("");
  lines.push("我希望你们知道：");
  pickUniqueSentences(know, 3).forEach((t,i)=> lines.push(`- ${t}`));
  lines.push("");
  lines.push("我更需要的支持是：");
  pickUniqueSentences(need, 3).forEach((t,i)=> lines.push(`- ${t}`));
  lines.push("");
  lines.push("我不是不爱你们，只是有时候表达得不好。");
  lines.push("如果你们愿意，我们可以找一个不赶时间的晚上，好好聊一次。");
  lines.push("");
  lines.push("（来自：你们的孩子）");

  letterText.textContent = lines.join("\n");

  show(result);
  window.scrollTo({top:0,behavior:"smooth"});
  window.__letter = lines.join("\n");
}

async function copyLetter(){
  const text = window.__letter || letterText.textContent || "";
  try{
    await navigator.clipboard.writeText(text);
    alert("已复制 ✅ 你可以粘贴发给爸妈");
  }catch(e){
    prompt("复制下面内容：", text);
  }
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
  try{ localStorage.setItem("kidsqa_theme", isLight? "dark":"light"); }catch(_){}
}
function loadTheme(){
  try{
    const saved=localStorage.getItem("kidsqa_theme");
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
btnCopy.onclick=copyLetter;
btnRetry.onclick=retry;
btnTheme.onclick=toggleTheme;

loadTheme();
