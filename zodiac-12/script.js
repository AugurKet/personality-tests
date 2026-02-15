/* =========================================================
   Zodiac App - Final script.js (Robust)
   Requires: zodiac-data.js defines global const ZODIAC = [...]
========================================================= */

(function () {
  "use strict";

  // ---------- Helpers ----------
  const el = (id) => document.getElementById(id);
  const normalize = (s) => (s || "").toLowerCase().replace(/\s+/g, "");

  function showFatal(msg) {
    // 尽量把错误显示在页面上（手机看不到 console 时很有用）
    const wrap = document.querySelector(".wrap") || document.body;
    const box = document.createElement("div");
    box.style.cssText =
      "margin:14px auto;max-width:1000px;padding:12px 14px;" +
      "border:1px solid rgba(255,80,80,.35);border-radius:14px;" +
      "background: rgba(255,80,80,.10);color:#fff;font-weight:800;";
    box.textContent = "❌ " + msg;
    wrap.prepend(box);
  }

  // ---------- Data check ----------
  function getZodiacSafe() {
    // 这里不要直接引用 ZODIAC 变量（如果没定义会 ReferenceError）
    const z = window.ZODIAC;
    if (!Array.isArray(z)) return null;
    if (!z.length) return [];
    return z;
  }

  // ---------- Main ----------
  function main() {
    // Footer year
    const yearEl = el("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Elements
    const btnTheme = el("btnTheme");
    const search = el("search");
    const grid = el("grid");

    const modal = el("modal");
    const btnClose = el("btnClose");
    const btnCopy = el("btnCopy");
    const btnWiki = el("btnWiki");

    // Modal fields
    const mEmoji = el("mEmoji");
    const mName = el("mName");
    const mDate = el("mDate");
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

    let active = null;

    const ELEMENT_LABEL = {
      fire: "火象",
      earth: "土象",
      air: "风象",
      water: "水象",
    };

    function fillList(ul, arr) {
      if (!ul) return;
      ul.innerHTML = "";
      (arr || []).forEach((x) => {
        const li = document.createElement("li");
        li.textContent = x;
        ul.appendChild(li);
      });
    }

    function fillChips(box, arr) {
      if (!box) return;
      box.innerHTML = (arr || [])
        .map((k) => `<span class="chip">${k}</span>`)
        .join("");
    }

    function showTab(tab) {
      document.querySelectorAll(".tabBtn").forEach((b) =>
        b.classList.remove("active")
      );
      const t = document.querySelector(`.tabBtn[data-tab="${tab}"]`);
      if (t) t.classList.add("active");

      Object.values(panels).forEach((p) => p && p.classList.add("hidden"));
      if (panels[tab]) panels[tab].classList.remove("hidden");
    }

    function renderGrid(list) {
      if (!grid) return;
      grid.innerHTML = "";

      list.forEach((z) => {
        const card = document.createElement("div");
        card.className = "card";
        card.tabIndex = 0;

        card.innerHTML = `
          <div class="cardTop">
            <div class="zEmoji">${z.emoji || ""}</div>
            <div class="zElem">
              <span class="dot ${z.elem || ""}"></span>${ELEMENT_LABEL[z.elem] || ""}
            </div>
          </div>
          <div class="zName">${z.cn || ""} <span class="muted">· ${z.en || ""}</span></div>
          <div class="zMeta">${z.date || ""}</div>
        `;

        const open = () => openModal(z.key);
        card.onclick = open;
        card.onkeydown = (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
          }
        };
        grid.appendChild(card);
      });
    }

    function openModal(key) {
      const data = getZodiacSafe() || [];
      const z = data.find((x) => x.key === key);
      if (!z) return;
      active = z;

      mEmoji.textContent = z.emoji || "";
      mName.textContent = `${z.cn || ""} ${z.en || ""}`;
      mDate.textContent = `${z.date || ""} · ${ELEMENT_LABEL[z.elem] || ""}`;
      mQuote.textContent = z.quote || "";

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

      if (btnWiki) btnWiki.href = z.wiki || "#";

      if (modal) modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      showTab("overview");
    }

    function closeModal() {
      if (modal) modal.classList.add("hidden");
      document.body.style.overflow = "";
      active = null;
    }

    // Events
    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
        closeModal();
      }
    });
    document.querySelectorAll(".tabBtn").forEach((btn) => {
      btn.addEventListener("click", () => showTab(btn.dataset.tab));
    });

    // Copy share
    if (btnCopy) {
      btnCopy.addEventListener("click", async () => {
        if (!active) return;
        const z = active;
        const text = `【${z.cn} ${z.en}】${z.emoji}
元素：${ELEMENT_LABEL[z.elem]}｜日期：${z.date}

核心驱动力：${z.drive}
一句话：${z.quote}

相处建议：${z.tips}

#${(z.keywords || []).join(" #")}
${location.href}`;

        try {
          await navigator.clipboard.writeText(text);
          alert("已复制分享文案 ✅");
        } catch {
          prompt("复制以下内容：", text);
        }
      });
    }

    // Search
    function applySearch() {
      const data = getZodiacSafe();
      if (!Array.isArray(data)) return;

      const q = normalize(search ? search.value : "");
      const list = data.filter((z) => {
        if (!q) return true;
        const hay = normalize(
          [
            z.cn,
            z.en,
            z.date,
            ELEMENT_LABEL[z.elem],
            (z.keywords || []).join(" "),
            z.quote,
            z.drive,
          ].join(" ")
        );
        return hay.includes(q);
      });
      renderGrid(list);
    }
    if (search) search.addEventListener("input", applySearch);

    // Theme
    function applyTheme(mode) {
      const root = document.documentElement;
      if (mode === "light") {
        root.setAttribute("data-theme", "light");
        if (btnTheme) btnTheme.textContent = "☀️";
      } else {
        root.removeAttribute("data-theme");
        if (btnTheme) btnTheme.textContent = "🌙";
      }
    }
    if (btnTheme) {
      btnTheme.addEventListener("click", () => {
        const isLight =
          document.documentElement.getAttribute("data-theme") === "light";
        applyTheme(isLight ? "dark" : "light");
      });
    }

    // Init
    applyTheme("dark");

    const data = getZodiacSafe();
    if (data === null) {
      showFatal("ZODIAC 未定义或不是数组。请确认 zodiac-data.js 末尾没有 export，并且已定义 const ZODIAC = [...];");
      return;
    }
    if (data.length === 0) {
      showFatal("ZODIAC 数组为空（len=0）。请确认已放入 12 个星座对象。");
      return;
    }

    renderGrid(data);
  }

  // 等 DOM ready（更稳，避免某些机型加载顺序问题）
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
})();
