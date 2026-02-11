// =============================
// 孩子对父母Q&A -> 生成小报告
// 维度：理解/边界/陪伴/沟通/学习压力
// 每题选择会给某类“需求标签”加分
// 最终拼成温柔、不指责的报告（可编辑）
// =============================

const TAGS = {
  LISTEN:  { name:"先听我说完", emoji:"👂" },
  TRUST:   { name:"多一点信任", emoji:"🤝" },
  BOUND:   { name:"清楚但温柔的规则", emoji:"🧭" },
  TIME:    { name:"更稳定的陪伴", emoji:"⏳" },
  PRAISE:  { name:"多看到我的努力", emoji:"🌟" },
  STRESS:  { name:"学习压力的支持", emoji:"📚" },
};

const QUESTIONS = [
  { type:"choice", q:"当我做错事时，我最希望爸妈先…", hint:"选你最想要的那种反应", a:[
    {t:["LISTEN","TRUST"], txt:"先问发生了什么，听我解释"},
    {t:["BOUND"], txt:"先说清楚规则和后果，但语气不要凶"},
    {t:["TIME","PRAISE"], txt:"先安抚一下，再一起解决"},
    {t:["STRESS"], txt:"先告诉我怎么补救，不要一直翻旧账"},
  ]},
  { type:"choice", q:"爸妈最容易让我难受的一句话是…", hint:"不是要怪谁，是在描述你的感受", a:[
    {t:["PRAISE"], txt:"“你怎么这么不努力？”"},
    {t:["TRUST"], txt:"“我不信你能做到。”"},
    {t:["LISTEN"], txt:"“别顶嘴，闭嘴。”"},
    {t:["STRESS"], txt:"“你看看别人家孩子。”"},
  ]},
  { type:"choice", q:"当我心情不好时，我更希望爸妈…", hint:"你希望被怎么对待？", a:[
    {t:["LISTEN","TIME"], txt:"先陪我一下，听我说说"},
    {t:["TRUST"], txt:"给我一点空间，但让我知道你在"},
    {t:["PRAISE"], txt:"抱抱/安慰我：我已经做得不错了"},
    {t:["BOUND"], txt:"先让我冷静，再一起聊（但别冷处理）"},
  ]},
  { type:"choice", q:"关于手机/游戏/娱乐，我更能接受的是…", hint:"你希望规则长什么样", a:[
    {t:["BOUND","TRUST"], txt:"规则少而清晰，而且说到做到"},
    {t:["LISTEN"], txt:"可以谈：我解释我的需求，你说你的担心"},
    {t:["TIME"], txt:"先陪我玩/聊一会儿，再谈规则"},
    {t:["STRESS"], txt:"看我最近压力：压力大时给我一点出口"},
  ]},
  { type:"choice", q:"我最希望爸妈夸我的方式是…", hint:"你喜欢哪种鼓励？", a:[
    {t:["PRAISE"], txt:"看到努力：你很认真、你有进步"},
    {t:["TRUST"], txt:"相信我：我知道你能处理好"},
    {t:["TIME"], txt:"一起庆祝：带我吃点好吃/一起做点事"},
    {t:["BOUND"], txt:"具体反馈：哪一点做对了，下次怎么更好"},
  ]},
  { type:"choice", q:"当爸妈生气时，我更希望…", hint:"冲突时的偏好", a:[
    {t:["BOUND"], txt:"可以生气，但别骂人/别人身攻击"},
    {t:["LISTEN"], txt:"先让我把话说完"},
    {t:["TRUST"], txt:"别一上来就认定我故意的"},
    {t:["TIME"], txt:"吵完也要和好，不要冷战很久"},
  ]},
  { type:"choice", q:"我最需要爸妈帮我的事情是…", hint:"选最贴近你现状的", a:[
    {t:["STRESS"], txt:"学习/考试压力：帮我一起拆解任务"},
    {t:["LISTEN"], txt:"情绪：让我能放心说，不会被笑"},
    {t:["TRUST"], txt:"选择：给我一点决定权"},
    {t:["BOUND"], txt:"习惯：和我一起定规则、一起执行"},
  ]},
  { type:"choice", q:"我觉得“被尊重”的感觉是…", hint:"你怎么理解尊重？", a:[
    {t:["LISTEN"], txt:"我说话时你认真听"},
    {t:["TRUST"], txt:"你愿意给我尝试的机会"},
    {t:["BOUND"], txt:"规则提前讲清楚，不临时加码"},
    {t:["PRAISE"], txt:"你看到我做得好的地方"},
  ]},
  { type:"choice", q:"我希望家里多一点…", hint:"家庭氛围偏好", a:[
    {t:["TIME"], txt:"一起吃饭/聊天的时间"},
    {t:["PRAISE"], txt:"轻松和肯定，不要一直批评"},
    {t:["BOUND"], txt:"清楚的作息和节奏"},
    {t:["LISTEN"], txt:"可以谈心，不用装坚强"},
  ]},
  { type:"choice", q:"如果我能对爸妈提一个小愿望，会是…", hint:"选最想要的那个", a:[
    {t:["LISTEN"], txt:"别急着讲道理，先听我说完"},
    {t:["TRUST"], txt:"别把我当小孩，给我一点信任"},
    {t:["PRAISE"], txt:"少比较，多鼓励"},
    {t:["TIME"], txt:"忙也能留一点稳定的陪伴时间"},
  ]},
  { type:"open", q:"（可选）有一句话我想对爸妈说，但平时不太敢说：", hint:"写“我希望…”会更容易被听见", tag:"LISTEN" },
  { type:"open", q:"（可选）最近让我压力最大的事是：", hint:"可以很短，比如“考试、朋友、身体、情绪…”", tag:"STRESS" },
];

const el = (id) => document.getElementById(id);

const home = el("home");
const qa = el("qa");
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
const qHint = el("qHint");
const optionsBox = el("options");

const openBox = el("openBox");
const openInput = el("openInput");

const tagline = el("tagline");
const reportText = el("reportText");
const needList = el("needList");
const cooperateList = el("cooperateList");

document.getElementById("year").textContent = new Date().getFullYear();

let idx = 0;
let answers = Array(QUESTIONS.length).fill(null); // for choice: index; for open: string
let scores = resetScores();

function resetScores(){
  return Object.keys(TAGS).reduce((acc,k)=>(acc[k]=0,acc),{});
}

function show(screen){
  [home, qa, result].forEach(s=>s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function addTags(tagArr, delta){
  tagArr.forEach(t => scores[t] = (scores[t]||0) + delta);
}

function render(){
  const total = QUESTIONS.length;
  qTotal.textContent = total;
  qNow.textContent = idx + 1;
  progressFill.style.width = `${Math.round((idx/total)*100)}%`;

  const item = QUESTIONS[idx];
  qTitle.textContent = item.q;
  qHint.textContent = item.hint || "";

  optionsBox.innerHTML = "";
  openBox.classList.add("hidden");
  openInput.value = "";

  if(item.type === "choice"){
    const letters = ["A","B","C","D"];
    item.a.forEach((opt,i)=>{
      const b=document.createElement("button");
      b.type="button";
      b.className="optionBtn";
      b.innerHTML=`<span class="optKey">${letters[i]}</span>${opt.txt}`;
      b.onclick=()=>chooseChoice(i);
      optionsBox.appendChild(b);
    });
  }else{
    openBox.classList.remove("hidden");
    openInput.value = (answers[idx] || "");
    openInput.oninput = () => { answers[idx] = openInput.value; };
  }

  btnBack.disabled = idx === 0;
}

function chooseChoice(choiceIndex){
  const item = QUESTIONS[idx];

  // 如果这一题之前选过，要先扣分
  const prev = answers[idx];
  if(prev !== null){
    addTags(item.a[prev].t, -2);
  }

  answers[idx] = choiceIndex;
  addTags(item.a[choiceIndex].t, +2);

  next();
}

function next(){
  if(idx < QUESTIONS.length - 1){
    idx++;
    render();
    window.scrollTo({top:0, behavior:"smooth"});
  }else{
    progressFill.style.width = "100%";
    buildReport();
  }
}

function back(){
  if(idx === 0) return;
  idx--;
  render();
}

function skip(){
  next();
}

function rankedTags(){
  return Object.entries(scores)
    .map(([k,v])=>({k,v}))
    .sort((a,b)=>b.v-a.v);
}

function fillList(ul, items){
  ul.innerHTML = "";
  items.forEach(t=>{
    const li=document.createElement("li");
    li.textContent=t;
    ul.appendChild(li);
  });
}

function buildReport(){
  const r = rankedTags();
  const top1 = r[0] || {k:"LISTEN", v:0};
  const top2 = r[1] || {k:"TRUST", v:0};
  const need = [top1.k, top2.k];

  const open1 = answers.find((ans, i)=> QUESTIONS[i].type==="open" && QUESTIONS[i].tag==="LISTEN" && (ans||"").trim().length>0);
  const open2 = answers.find((ans, i)=> QUESTIONS[i].type==="open" && QUESTIONS[i].tag==="STRESS" && (ans||"").trim().length>0);

  const needLines = need.map(k => `${TAGS[k].emoji} ${TAGS[k].name}`);

  tagline.textContent = `你最在意的是：${needLines.join(" · ")}`;

  const suggestCoop = {
    LISTEN: "先听我说完，再给建议（不要一上来就判断对错）。",
    TRUST: "给我一点尝试的空间：我做错了也会学到东西。",
    BOUND: "规则少但清晰：提前讲好，执行一致，我会更配合。",
    TIME: "每天/每周固定一点点时间只属于我们（哪怕10分钟）。",
    PRAISE: "多看到我的努力：一句肯定会让我更愿意继续做。",
    STRESS: "压力大时别只问分数：先问我卡在哪里，我们一起拆解。",
  };

  const coopList = need.map(k => suggestCoop[k]);

  const report = [
    "爸妈好～我做了一个小问答，想把我的感受说得更温柔一点。",
    "",
    `最近我最需要你们的支持是：${needLines.join("、")}。`,
    "",
    "如果你们愿意这样做，我会更配合：",
    `- ${coopList[0]}`,
    `- ${coopList[1]}`,
    "",
    open2 ? `我最近压力比较大的事情是：${open2}` : "",
    open1 ? `我想对你们说的一句话是：${open1}` : "",
    "",
    "我不是要和你们对抗，我是希望我们更好沟通。谢谢你们愿意看完。❤️"
  ].filter(Boolean).join("\n");

  reportText.value = report;

  fillList(needList, needLines);
  fillList(cooperateList, coopList);

  show(result);
  window.scrollTo({top:0, behavior:"smooth"});
}

async function copyReport(){
  const text = reportText.value + "\n\n" + location.href;
  try{
    await navigator.clipboard.writeText(text);
    alert("已复制 ✅ 你可以直接发给爸妈了");
  }catch(e){
    prompt("复制下面内容：", text);
  }
}

function retry(){
  idx = 0;
  answers = Array(QUESTIONS.length).fill(null);
  scores = resetScores();
  show(home);
  window.scrollTo({top:0, behavior:"smooth"});
}

function toggleTheme(){
  const root=document.documentElement;
  const isLight=root.getAttribute("data-theme")==="light";
  root.setAttribute("data-theme", isLight ? "" : "light");
  btnTheme.textContent = isLight ? "🌙" : "☀️";
  try{ localStorage.setItem("kidqa_theme", isLight ? "dark":"light"); }catch(_){}
}
function loadTheme(){
  try{
    const saved=localStorage.getItem("kidqa_theme");
    if(saved==="light"){
      document.documentElement.setAttribute("data-theme","light");
      btnTheme.textContent="☀️";
    }
  }catch(_){}
}

// events
btnStart.onclick=()=>{ show(qa); idx=0; render(); window.scrollTo({top:0,behavior:"smooth"}); };
btnHow.onclick=()=>howBox.classList.toggle("hidden");
btnBack.onclick=back;
btnSkip.onclick=skip;
btnCopy.onclick=copyReport;
btnRetry.onclick=retry;
btnTheme.onclick=toggleTheme;

loadTheme();
