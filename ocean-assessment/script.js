// =============================
// OCEAN 五大人格测评（高端心理学风）
// 20题，1-5量表：非常不同意(1)~非常同意(5)
// 每维度4题，其中2题为反向计分（R）
// 输出0-100：((sum - min)/(max-min))*100
// =============================

const DIMS = {
  O: { name: "开放性 (Openness)", short: "O", desc: "对新体验、想象力与审美的开放程度。" },
  C: { name: "尽责性 (Conscientiousness)", short: "C", desc: "自律、计划性、目标导向与可靠性。" },
  E: { name: "外向性 (Extraversion)", short: "E", desc: "社交能量、主动性与刺激偏好。" },
  A: { name: "宜人性 (Agreeableness)", short: "A", desc: "合作、同理心、信任与亲社会倾向。" },
  N: { name: "神经质 (Neuroticism)", short: "N", desc: "对压力、威胁与负面情绪的敏感度。" },
};

const LIKERT_LABELS = ["非常不同意","不同意","一般","同意","非常同意"];

// 20题：每题属于一个维度 dim，reverse=true 表示反向计分
const QUESTIONS = [
  // O (4)
  { dim:"O", reverse:false, text:"我喜欢探索陌生领域，即使一开始不擅长。" },
  { dim:"O", reverse:false, text:"我常被新点子、新观点激发灵感。" },
  { dim:"O", reverse:true,  text:"我更偏好固定套路，不太喜欢变化与新尝试。" },
  { dim:"O", reverse:true,  text:"我很少对艺术、设计或审美类事物产生兴趣。" },

  // C (4)
  { dim:"C", reverse:false, text:"我会按计划推进任务，并尽量按时完成。" },
  { dim:"C", reverse:false, text:"我做事注重细节，愿意把质量做到位。" },
  { dim:"C", reverse:true,  text:"我经常拖到最后一刻才开始处理重要事情。" },
  { dim:"C", reverse:true,  text:"我做事随性，计划经常被我自己打乱。" },

  // E (4)
  { dim:"E", reverse:false, text:"在社交场合我通常比较主动，愿意开启话题。" },
  { dim:"E", reverse:false, text:"我从与人互动中获得能量与动力。" },
  { dim:"E", reverse:true,  text:"长时间社交会让我非常疲惫，想尽快离开。" },
  { dim:"E", reverse:true,  text:"我更喜欢低刺激的环境，避免热闹与人群。" },

  // A (4)
  { dim:"A", reverse:false, text:"我会优先考虑他人感受，尽量避免伤害。" },
  { dim:"A", reverse:false, text:"我倾向于信任别人，并愿意合作达成目标。" },
  { dim:"A", reverse:true,  text:"我常常怀疑别人的动机，认为他们未必可靠。" },
  { dim:"A", reverse:true,  text:"我在冲突中更倾向于强硬推进，而不是妥协。" },

  // N (4)
  { dim:"N", reverse:false, text:"我容易因为不确定性而焦虑或想太多。" },
  { dim:"N", reverse:false, text:"压力下我更容易出现情绪波动或烦躁。" },
  { dim:"N", reverse:true,  text:"遇到突发状况时，我通常能保持冷静并迅速恢复。" },
  { dim:"N", reverse:true,  text:"即使出现小问题，我也很少持续担心。" },
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
const qNow = el("qNow");
const qTotal = el("qTotal");
const progressFill = el("progressFill");
const qDimBadge = el("qDimBadge");
const qDimName = el("qDimName");
const likertBtns = el("likertBtns");

const scoreBars = el("scoreBars");
const resultTagline = el("resultTagline");
const resultHighlights = el("resultHighlights");
const resultRisks = el("resultRisks");
const dimensionCards = el("dimensionCards");
const resultTips = el("resultTips");
const resultShareText = el("resultShareText");

el("year").textContent = new Date().getFullYear();

let idx = 0;
let answers = Array(QUESTIONS.length).fill(null); // 1..5 or null

function show(screen){
  [screenHome, screenQuiz, screenResult].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function renderLikert(selected){
  likertBtns.innerHTML = "";
  for (let i=1;i<=5;i++){
    const b = document.createElement("button");
    b.type = "button";
    b.className = "lbtn" + (selected===i ? " active" : "");
    b.textContent = i;
    b.title = LIKERT_LABELS[i-1];
    b.addEventListener("click", ()=> choose(i));
    likertBtns.appendChild(b);
  }
}

function renderQuestion(){
  const total = QUESTIONS.length;
  qTotal.textContent = total;
  qNow.textContent = (idx + 1);

  const pct = Math.round((idx / total) * 100);
  progressFill.style.width = `${pct}%`;

  const item = QUESTIONS[idx];
  qTitle.textContent = item.text;

  qDimBadge.textContent = item.dim;
  qDimName.textContent = DIMS[item.dim].name;

  renderLikert(answers[idx]);

  btnBack.disabled = idx === 0;
}

function choose(value){
  answers[idx] = value;
  renderLikert(value);

  // 自动下一题（更流畅）
  setTimeout(()=>{
    if (idx < QUESTIONS.length - 1){
      idx++;
      renderQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      progressFill.style.width = "100%";
      showResult();
    }
  }, 120);
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

function scoreDims(){
  // 每维度4题 -> 最低4，最高20
  const sums = { O:0, C:0, E:0, A:0, N:0 };
  const counts = { O:0, C:0, E:0, A:0, N:0 };

  for (let i=0;i<QUESTIONS.length;i++){
    const q = QUESTIONS[i];
    let v = answers[i];

    // 跳过未答：给中位值 3（保持稳定、减少空白影响）
    if (v === null) v = 3;

    // 反向计分
    if (q.reverse) v = 6 - v;

    sums[q.dim] += v;
    counts[q.dim] += 1;
  }

  const scores = {};
  Object.keys(sums).forEach(dim=>{
    const min = counts[dim] * 1;
    const max = counts[dim] * 5;
    const pct = Math.round(((sums[dim] - min) / (max - min)) * 100);
    scores[dim] = pct;
  });

  return scores;
}

function levelOf(p){
  if (p >= 67) return "高";
  if (p <= 33) return "低";
  return "中";
}

function barRow(dim, pct){
  const short = DIMS[dim].short;
  const label = DIMS[dim].name;
  return `
    <div class="barRow">
      <div class="barTop">${short} · ${label} <span>${pct}%（${levelOf(pct)}）</span></div>
      <div class="barTrack"><div class="barFill" data-p="${pct}"></div></div>
    </div>
  `;
}

function fillList(ul, arr){
  ul.innerHTML = "";
  arr.forEach(t=>{
    const li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });
}

function buildDimCard(dim, pct){
  const lvl = levelOf(pct);
  const base = DIMS[dim].desc;

  const explain = {
    O: {
      高: "对新事物接受度高，偏好探索、创意与跨界思考。",
      中: "在创新与稳定之间较平衡，既能尝试也能落地。",
      低: "更偏好熟悉路径，重可控与实用，适应变化需要时间。"
    },
    C: {
      高: "自律与计划性强，可靠、注重标准，能长期坚持。",
      中: "有一定规划能力，也能保持弹性，通常表现稳定。",
      低: "更随性灵活，但易拖延或低估执行成本。"
    },
    E: {
      高: "社交能量较高，倾向主动、外显、喜欢互动与刺激。",
      中: "能社交也能独处，视场景调整自己的参与度。",
      低: "更内向保留，偏好低刺激环境，社交后需要恢复。"
    },
    A: {
      高: "合作与共情倾向强，重关系与和谐，愿意体谅他人。",
      中: "能合作也能坚持立场，通常较务实平衡。",
      低: "更直接强硬，重结果与原则，但可能被感受为不够柔和。"
    },
    N: {
      高: "对压力较敏感，容易担心与反复思考，但也更警觉。",
      中: "情绪反应适中，面对压力有起伏但通常可恢复。",
      低: "情绪稳定、抗压较强，不易被小问题持续影响。"
    }
  };

  return `
    <div class="dimCard">
      <div class="dimHead">
        <strong>${DIMS[dim].short} · ${DIMS[dim].name}</strong>
        <div class="dimLevel">${pct}% · ${lvl}</div>
      </div>
      <p class="muted" style="margin:10px 0 6px;">${base}</p>
      <p class="muted" style="margin:0;">${explain[dim][lvl]}</p>
    </div>
  `;
}

function deriveSummary(scores){
  // 找最高与最低维度
  const entries = Object.entries(scores).sort((a,b)=> b[1]-a[1]);
  const top = entries[0];
  const low = entries[entries.length-1];

  const nameMap = { O:"开放性", C:"尽责性", E:"外向性", A:"宜人性", N:"神经质" };
  const topLvl = levelOf(top[1]);
  const lowLvl = levelOf(low[1]);

  // 高端一句话总结（偏报告语气）
  const tagline = `整体画像：${nameMap[top[0]]}偏${topLvl}，${nameMap[low[0]]}偏${lowLvl}；其余维度分布相对均衡。`;

  // 高光点与风险点（规则化生成）
  const highlights = [];
  const risks = [];
  const tips = [];

  if (scores.C >= 67) highlights.push("执行与自律优势明显：更容易形成长期稳定的输出。");
  if (scores.O >= 67) highlights.push("探索与学习驱动强：对新方法、新概念的吸收速度快。");
  if (scores.E >= 67) highlights.push("互动能量较高：适合需要沟通推进与外部协作的场景。");
  if (scores.A >= 67) highlights.push("合作与共情倾向强：更容易建立信任与良好关系网络。");
  if (scores.N <= 33) highlights.push("情绪稳定度较高：压力下能保持冷静与恢复速度。");

  if (scores.C <= 33) risks.push("计划与收尾可能波动：容易出现‘想做很多但落地不足’。");
  if (scores.O <= 33) risks.push("变化适应成本较高：面对新规则/新环境需要更长热身。");
  if (scores.E <= 33) risks.push("外向表达较克制：在需要强输出/强曝光场景可能不占优势。");
  if (scores.A <= 33) risks.push("沟通风格偏直接：在高敏感关系中可能被误读为强硬。");
  if (scores.N >= 67) risks.push("对压力较敏感：在不确定时期更容易反复担心与内耗。");

  // 通用建议（可执行）
  tips.push("把你的最高维度当作‘优势杠杆’，用于选择更适配的工作/合作方式。");
  tips.push("为你的最低维度设计‘补偿机制’：例如用流程、提醒、伙伴协作来弥补短板。");
  tips.push("遇到压力时先做‘可控清单’：列出能做的3件事，避免陷入空转思考。");

  // 若条目不足，补齐一些高质量通用句
  while (highlights.length < 3) highlights.push("整体结构均衡：可在不同场景中切换策略与角色。");
  while (risks.length < 3) risks.push("在极端压力或快速变化情境下，表现可能与日常略有偏差。");

  return { tagline, highlights: highlights.slice(0,3), risks: risks.slice(0,3), tips: tips.slice(0,3) };
}

function showResult(){
  const scores = scoreDims();
  const summary = deriveSummary(scores);

  resultTagline.textContent = summary.tagline;
  fillList(resultHighlights, summary.highlights);
  fillList(resultRisks, summary.risks);
  fillList(resultTips, summary.tips);

  // bars
  const order = ["O","C","E","A","N"];
  scoreBars.innerHTML = order.map(d => barRow(d, scores[d])).join("");

  requestAnimationFrame(()=>{
    scoreBars.querySelectorAll(".barFill").forEach(f=>{
      const p = f.getAttribute("data-p") || "0";
      f.style.width = `${p}%`;
    });
  });

  // dimension cards
  dimensionCards.innerHTML = order.map(d => buildDimCard(d, scores[d])).join("");

  // share text
  const shareLine = `我的 OCEAN 五维：O${scores.O} C${scores.C} E${scores.E} A${scores.A} N${scores.N}（0-100）`;
  resultShareText.textContent = `${shareLine}\n${summary.tagline}\n你也来测：`;

  show(screenResult);
  window.scrollTo({ top: 0, behavior: "smooth" });

  window.__ocean = { scores, summary };
}

async function share(){
  const data = window.__ocean;
  const url = location.href;

  const text = data
    ? `OCEAN 五大人格测评结果：\nO${data.scores.O} C${data.scores.C} E${data.scores.E} A${data.scores.A} N${data.scores.N}\n${data.summary.tagline}\n来测测：`
    : `来做 OCEAN 五大人格测评：`;

  if (navigator.share){
    try{
      await navigator.share({ title:"OCEAN 五大人格测评", text, url });
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
  show(screenHome);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleTheme(){
  const root = document.documentElement;
  const isLight = root.getAttribute("data-theme") === "light";
  root.setAttribute("data-theme", isLight ? "" : "light");
  btnTheme.textContent = isLight ? "🌙" : "☀️";
  try{ localStorage.setItem("ocean_theme", isLight ? "dark" : "light"); }catch(_){}
}

function loadTheme(){
  try{
    const saved = localStorage.getItem("ocean_theme");
    if (saved === "light"){
      document.documentElement.setAttribute("data-theme","light");
      btnTheme.textContent = "☀️";
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
