/** 零基础英语口语闯关学习工作台 — 主逻辑 */
(() => {
  'use strict';

  let state = Storage.load();
  let deferredPrompt = null;
  let currentPhCat = 'long';
  let currentQuizLevel = 0;
  let currentSpeakLevel = 0;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function persist() {
    Storage.save(state);
  }

  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('show'), 1800);
  }

  function navTo(id) {
    $$('.section').forEach((s) => s.classList.toggle('active', s.id === `sec-${id}`));
    $$('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.nav === id));
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* —— 金句 —— */
  function renderQuote() {
    const list = window.QUOTES_DATA;
    const day = Math.floor(Date.now() / 86400000) % list.length;
    const q = list[day];
    $('#quote-en').textContent = q.en;
    $('#quote-zh').textContent = q.zh;
  }

  /* —— 打卡 —— */
  function renderCheckin() {
    const today = Storage.getTodayCheckin(state);
    Storage.recalcStreak(state);
    persist();

    const tasks = [
      { key: 'phonetics', title: '音标练习', desc: '完成今日音标跟读/点亮' },
      { key: 'shadow', title: '短句跟读', desc: '跟读今日金句与万能句' },
      { key: 'quest', title: '口语闯关', desc: '完成任意一关口语任务' },
      { key: 'review', title: '录音复盘', desc: '自测后回听并标记掌握' }
    ];

    const list = $('#checkin-list');
    list.innerHTML = tasks
      .map((t) => {
        const done = !!today[t.key];
        return `
        <div class="checkin-item ${done ? 'done' : ''}" data-task="${t.key}" role="checkbox" aria-checked="${done}">
          <div class="check-box"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="check-info"><strong>${t.title}</strong><small>${t.desc}</small></div>
        </div>`;
      })
      .join('');

    list.onclick = (e) => {
      const item = e.target.closest('.checkin-item');
      if (!item) return;
      const key = item.dataset.task;
      const day = Storage.getTodayCheckin(state);
      day[key] = !day[key];
      if (Storage.isFullyChecked(day)) {
        state.lastCheckinDate = Storage.todayKey();
        Storage.recalcStreak(state);
        toast(`今日打卡完成！连续 ${state.streak} 天`);
      } else {
        Storage.recalcStreak(state);
        toast(day[key] ? '已勾选 ✓' : '已取消');
      }
      persist();
      renderCheckin();
      renderHomeStats();
    };

    const doneCount = tasks.filter((t) => today[t.key]).length;
    $('#checkin-count').textContent = `${doneCount}/4`;
    $('#checkin-fill').style.width = `${(doneCount / 4) * 100}%`;
    $('#streak-num').textContent = state.streak;

    // 近7天
    const strip = $('#calendar-strip');
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = Storage.todayKey(d);
      const full = Storage.isFullyChecked(state.checkins[k]);
      const isToday = i === 0;
      days.push(`
        <div class="day-chip ${full ? 'done' : ''} ${isToday ? 'today' : ''}">
          ${['日', '一', '二', '三', '四', '五', '六'][d.getDay()]}
          <span class="d">${d.getDate()}</span>
        </div>`);
    }
    strip.innerHTML = days.join('');
  }

  /* —— 音标 —— */
  function renderPhonetics() {
    const tabs = $('#ph-tabs');
    tabs.innerHTML = PHONETICS_DATA.categories
      .map(
        (c) =>
          `<button type="button" class="ph-tab ${c.id === currentPhCat ? 'active' : ''}" data-cat="${c.id}">${c.name}</button>`
      )
      .join('');

    tabs.onclick = (e) => {
      const btn = e.target.closest('.ph-tab');
      if (!btn) return;
      currentPhCat = btn.dataset.cat;
      renderPhonetics();
    };

    const items = PHONETICS_DATA.items.filter((i) => i.cat === currentPhCat);
    const grid = $('#ph-grid');
    grid.innerHTML = items
      .map((item) => {
        const mastered = state.phoneticsMastered.includes(item.id);
        return `
        <button type="button" class="ph-card ${mastered ? 'mastered' : ''} ${item.hard ? 'hard' : ''}" data-id="${item.id}">
          <div class="ph-symbol">${item.symbol}${item.hard ? '<span class="hard-tag">易错</span>' : ''}</div>
          <div class="ph-name">${item.name}</div>
          <div class="ph-example"><em>${item.example}</em></div>
          <div class="ph-tip">${item.tip}<br><span style="color:var(--primary);font-weight:600">点击再次切换 · 长按标记掌握</span></div>
        </button>`;
      })
      .join('');

    grid.querySelectorAll('.ph-card').forEach((card) => {
      let timer;
      card.addEventListener('click', () => card.classList.toggle('open'));
      card.addEventListener('pointerdown', () => {
        timer = setTimeout(() => {
          const id = card.dataset.id;
          const idx = state.phoneticsMastered.indexOf(id);
          if (idx >= 0) state.phoneticsMastered.splice(idx, 1);
          else state.phoneticsMastered.push(id);
          persist();
          toast(idx >= 0 ? '取消掌握' : '已标记掌握');
          renderPhonetics();
          renderHomeStats();
        }, 550);
      });
      card.addEventListener('pointerup', () => clearTimeout(timer));
      card.addEventListener('pointerleave', () => clearTimeout(timer));
    });

    $('#ph-progress').textContent = `${state.phoneticsMastered.length}/48`;
  }

  /* —— 抢答 —— */
  function renderQuiz() {
    const levels = QUIZ_DATA.levels;
    const level = levels[currentQuizLevel];
    $('#quiz-level-title').textContent = level.title;
    $('#quiz-level-desc').textContent = level.desc;

    const known = level.items.filter((i) => state.quizDone[i.id] === 'known').length;
    $('#quiz-progress').textContent = `${known}/${level.items.length}`;

    const sel = $('#quiz-level-select');
    sel.innerHTML = levels.map((l, i) => `<option value="${i}">${l.title}</option>`).join('');
    sel.value = String(currentQuizLevel);
    sel.onchange = () => {
      currentQuizLevel = Number(sel.value);
      renderQuiz();
    };

    const box = $('#quiz-list');
    box.innerHTML = level.items
      .map((item) => {
        const status = state.quizDone[item.id];
        return `
        <div class="quiz-item" data-id="${item.id}">
          <div class="quiz-zh">${item.zh}</div>
          <div class="quiz-hint">点击显示英文 · ${item.tip}${status === 'known' ? ' · ✓已会' : status === 'wrong' ? ' · 已入错题本' : ''}</div>
          <div class="quiz-en">${item.en}</div>
          <div class="quiz-actions">
            <button type="button" class="btn btn-accent" data-act="known">我会了</button>
            <button type="button" class="btn btn-danger" data-act="wrong">加入错题本</button>
          </div>
        </div>`;
      })
      .join('');

    box.onclick = (e) => {
      const act = e.target.closest('[data-act]');
      const itemEl = e.target.closest('.quiz-item');
      if (!itemEl) return;
      const id = itemEl.dataset.id;
      const data = level.items.find((x) => x.id === id);

      if (act) {
        e.stopPropagation();
        if (act.dataset.act === 'known') {
          state.quizDone[id] = 'known';
          state.wrongBook = state.wrongBook.filter((w) => w.id !== id);
          toast('已掌握');
        } else {
          state.quizDone[id] = 'wrong';
          addWrong({ id, type: '抢答', prompt: data.zh, answer: data.en });
          toast('已加入错题本');
        }
        persist();
        renderQuiz();
        renderWrong();
        renderHomeStats();
        return;
      }
      itemEl.classList.toggle('revealed');
    };
  }

  function addWrong({ id, type, prompt, answer }) {
    state.wrongBook = state.wrongBook.filter((w) => w.id !== id);
    state.wrongBook.unshift({ id, type, prompt, answer, at: Date.now() });
    if (state.wrongBook.length > 100) state.wrongBook.length = 100;
  }

  /* —— 口语 —— */
  function renderSpeaking() {
    const levels = SPEAKING_DATA.levels;
    const level = levels[currentSpeakLevel];
    $('#speak-level-title').textContent = level.title;
    $('#speak-level-desc').textContent = level.desc;

    const done = level.items.filter((i) => state.speakingDone[i.id]).length;
    $('#speak-progress').textContent = `${done}/${level.items.length}`;

    const sel = $('#speak-level-select');
    sel.innerHTML = levels.map((l, i) => `<option value="${i}">${l.title}</option>`).join('');
    sel.value = String(currentSpeakLevel);
    sel.onchange = () => {
      currentSpeakLevel = Number(sel.value);
      renderSpeaking();
    };

    const shuffled = [...level.items].sort(() => Math.random() - 0.5);
    const box = $('#speak-list');
    box.innerHTML = shuffled
      .map((item, idx) => {
        const ok = state.speakingDone[item.id];
        return `
        <div class="speak-card" data-id="${item.id}">
          <div class="speak-q-num">题目 ${idx + 1}${ok ? ' · 已练过' : ''}</div>
          <div class="speak-q">${item.en}</div>
          <div class="speak-q-zh">${item.zh}</div>
          <div class="btn-row">
            <button type="button" class="btn btn-primary" data-act="toggle">展开参考答案</button>
            <button type="button" class="btn btn-accent" data-act="done">练过了</button>
            <button type="button" class="btn btn-danger" data-act="wrong">加入错题本</button>
          </div>
          <div class="speak-answer">
            <h4>参考作答</h4>
            <p>${item.sampleEn}</p>
            <p class="zh">${item.sampleZh}</p>
          </div>
        </div>`;
      })
      .join('');

    box.onclick = (e) => {
      const act = e.target.closest('[data-act]');
      const card = e.target.closest('.speak-card');
      if (!act || !card) return;
      const id = card.dataset.id;
      const data = level.items.find((x) => x.id === id);
      if (act.dataset.act === 'toggle') {
        card.classList.toggle('open');
        act.textContent = card.classList.contains('open') ? '收起答案' : '展开参考答案';
      } else if (act.dataset.act === 'done') {
        state.speakingDone[id] = true;
        persist();
        toast('已记录练习');
        renderSpeaking();
        renderHomeStats();
      } else if (act.dataset.act === 'wrong') {
        addWrong({ id, type: '口语', prompt: data.en + ' / ' + data.zh, answer: data.sampleEn });
        persist();
        toast('已加入错题本');
        renderWrong();
      }
    };

    $('#speak-shuffle').onclick = () => {
      renderSpeaking();
      toast('已重新随机题目');
    };
  }

  /* —— 发音 —— */
  function renderPronounce() {
    const box = $('#pair-list');
    box.innerHTML = PRONUNCIATION_DATA.pairs
      .map((p) => {
        const done = state.pronounceDone.includes(p.id);
        return `
        <div class="pair-card ${done ? '' : ''}" data-id="${p.id}">
          <div class="pair-words">
            <div class="pair-word"><strong>${p.left.word}</strong><span>${p.left.ipa} · ${p.left.tip}</span></div>
            <div class="pair-vs">VS</div>
            <div class="pair-word"><strong>${p.right.word}</strong><span>${p.right.ipa} · ${p.right.tip}</span></div>
          </div>
          <div style="text-align:center;margin-top:8px;font-size:0.72rem;color:var(--text-3)">
            ${p.focus}${done ? ' · ✓已掌握' : ' · 点击展开'}
          </div>
          <div class="pair-detail">
            <p>${p.detail}</p>
            <div class="mini-examples">${p.examples.map((ex) => `<code>${ex}</code>`).join('')}</div>
            <p style="margin-top:8px"><strong>练习：</strong>${p.practice}</p>
            <button type="button" class="btn btn-accent btn-block" data-act="master">${done ? '取消掌握' : '标记掌握'}</button>
          </div>
        </div>`;
      })
      .join('');

    box.onclick = (e) => {
      const card = e.target.closest('.pair-card');
      if (!card) return;
      const act = e.target.closest('[data-act]');
      const id = card.dataset.id;
      if (act) {
        e.stopPropagation();
        const idx = state.pronounceDone.indexOf(id);
        if (idx >= 0) state.pronounceDone.splice(idx, 1);
        else state.pronounceDone.push(id);
        persist();
        toast(idx >= 0 ? '已取消' : '已掌握');
        renderPronounce();
        renderHomeStats();
        return;
      }
      card.classList.toggle('open');
    };

    $('#pron-progress').textContent = `${state.pronounceDone.length}/${PRONUNCIATION_DATA.pairs.length}`;
  }

  /* —— 错题本 —— */
  function renderWrong() {
    const box = $('#wrong-list');
    if (!state.wrongBook.length) {
      box.innerHTML = '<div class="empty-state">暂无错题。在抢答或口语关卡点击「加入错题本」即可记录。</div>';
      return;
    }
    box.innerHTML = state.wrongBook
      .map(
        (w) => `
      <div class="wrong-item" data-id="${w.id}">
        <div class="meta">
          <strong>${w.prompt}</strong>
          <small>${w.type} · ${new Date(w.at).toLocaleDateString()}</small>
          <div class="quiz-en" style="display:block;margin-top:6px;border:none;padding:0;font-size:0.85rem">${w.answer}</div>
        </div>
        <button type="button" class="btn btn-ghost" data-act="del">删除</button>
      </div>`
      )
      .join('');

    box.onclick = (e) => {
      const btn = e.target.closest('[data-act=del]');
      if (!btn) return;
      const id = btn.closest('.wrong-item').dataset.id;
      state.wrongBook = state.wrongBook.filter((w) => w.id !== id);
      persist();
      renderWrong();
      toast('已删除');
    };

    $('#wrong-clear').onclick = () => {
      if (!state.wrongBook.length) return;
      state.wrongBook = [];
      persist();
      renderWrong();
      toast('错题本已清空');
    };
  }

  /* —— 三个月计划 —— */
  function renderCurriculum() {
    const box = $('#week-list');
    box.innerHTML = CURRICULUM_DATA.weeks
      .map((w) => {
        const done = state.weekDone.includes(w.week);
        return `
        <div class="week-card ${done ? '' : ''}" data-week="${w.week}">
          <button type="button" class="week-head">
            <div>
              <strong>${w.title}${done ? ' ✓' : ''}</strong>
              <small>${w.focus}</small>
            </div>
            <span style="color:var(--text-3);font-size:1.2rem">›</span>
          </button>
          <div class="week-body">
            <p><strong>本周目标：</strong>${w.goals.join(' · ')}</p>
            <p style="margin-top:8px"><strong>核心词汇（20）：</strong></p>
            <div class="chip-row">${w.vocab.map((v) => `<span class="chip">${v}</span>`).join('')}</div>
            <p style="margin-top:8px"><strong>必会句型：</strong></p>
            <ul>${w.sentences.map((s) => `<li>${s}</li>`).join('')}</ul>
            <p style="margin-top:8px"><strong>闯关任务：</strong>${w.tasks}</p>
            <button type="button" class="btn ${done ? 'btn-ghost' : 'btn-accent'} btn-block" data-act="week">${done ? '取消完成' : '标记本周完成'}</button>
          </div>
        </div>`;
      })
      .join('');

    box.onclick = (e) => {
      const card = e.target.closest('.week-card');
      if (!card) return;
      const act = e.target.closest('[data-act=week]');
      if (act) {
        const week = Number(card.dataset.week);
        const idx = state.weekDone.indexOf(week);
        if (idx >= 0) state.weekDone.splice(idx, 1);
        else state.weekDone.push(week);
        persist();
        renderCurriculum();
        renderHomeStats();
        toast(idx >= 0 ? '已取消' : `第${week}周完成！`);
        return;
      }
      if (e.target.closest('.week-head')) card.classList.toggle('open');
    };

    $('#pets-tips').innerHTML = CURRICULUM_DATA.pets3Tips.map((t) => `<li>${t}</li>`).join('');
  }

  /* —— 首页统计 —— */
  function renderHomeStats() {
    Storage.recalcStreak(state);
    $('#stat-streak').textContent = state.streak;
    $('#stat-ph').textContent = state.phoneticsMastered.length;
    $('#stat-quiz').textContent = Object.values(state.quizDone).filter((v) => v === 'known').length;
    $('#stat-wrong').textContent = state.wrongBook.length;
    $('#home-week').textContent = `${state.weekDone.length}/12 周`;
  }

  /* —— 安装横幅 —— */
  function setupInstall() {
    const banner = $('#install-banner');
    if (state.installDismissed) return;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      banner.classList.add('show');
    });

    // iOS 提示
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    if (isIOS && !isStandalone && !state.installDismissed) {
      banner.classList.add('show');
      $('#install-text').textContent = '点击 Safari 分享按钮 →「添加到主屏幕」，像 App 一样使用';
      $('#install-btn').textContent = '知道了';
    }

    $('#install-btn').onclick = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
      }
      banner.classList.remove('show');
      state.installDismissed = true;
      persist();
    };

    $('#install-close')?.addEventListener('click', () => {
      banner.classList.remove('show');
      state.installDismissed = true;
      persist();
    });
  }

  /* —— 导出/重置 —— */
  function setupTools() {
    $('#btn-export')?.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `oral-quest-backup-${Storage.todayKey()}.json`;
      a.click();
      toast('进度已导出');
    });

    $('#btn-reset')?.addEventListener('click', () => {
      if (!confirm('确定清空所有学习记录？此操作不可恢复。')) return;
      state = Storage.defaultState();
      persist();
      boot();
      toast('已重置');
    });
  }

  function boot() {
    renderQuote();
    renderCheckin();
    renderPhonetics();
    renderQuiz();
    renderSpeaking();
    renderPronounce();
    renderWrong();
    renderCurriculum();
    renderHomeStats();

    $$('.nav-btn').forEach((btn) => {
      btn.onclick = () => navTo(btn.dataset.nav);
    });

    $$('[data-goto]').forEach((el) => {
      el.onclick = () => navTo(el.dataset.goto);
    });

    const hash = (location.hash || '#home').slice(1);
    const valid = ['home', 'checkin', 'phonetics', 'quiz', 'speaking', 'pronounce', 'wrong', 'plan'];
    navTo(valid.includes(hash) ? hash : 'home');
  }

  // SW
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  setupInstall();
  setupTools();
  boot();
})();
