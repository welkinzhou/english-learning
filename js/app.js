/** PETS-3 备考打卡 App */
(() => {
  'use strict';

  let state = Storage.load();
  let timerOn = false;
  let timerTick = null;
  let sessionStart = 0;
  let vocabUnit = VOCAB_DATA.units[0].id;
  let flashIdx = 0;
  let quizMode = false;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function persist() { Storage.save(state); }

  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('on');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('on'), 1800);
  }

  function fmtTime(sec) {
    const h = String(Math.floor(sec / 3600)).padStart(2, '0');
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  function todaySec() {
    const k = Storage.todayKey();
    return state.studySeconds[k] || 0;
  }

  function addStudySeconds(n) {
    const k = Storage.todayKey();
    state.studySeconds[k] = (state.studySeconds[k] || 0) + n;
    persist();
    refreshTimerUI();
  }

  function navTo(id) {
    $$('.section').forEach((el) => el.classList.toggle('on', el.id === `sec-${id}`));
    $$('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.nav === id));
    location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === 'vocab') renderVocab();
    if (id === 'grammar') renderGrammarList();
    if (id === 'reading') renderReadingList();
    if (id === 'listening') renderListenList();
    if (id === 'writing') renderWriteList();
    if (id === 'progress') renderProgress();
    if (id === 'me') renderMe();
    if (id === 'home') renderHome();
  }

  function markDaily(key, val = true) {
    const day = Storage.ensureDaily(state);
    day[key] = val;
    if (Storage.isDayComplete(day)) day.checked = true;
    Storage.recalcStreak(state);
    persist();
  }

  function addWrong(item) {
    state.wrongBook = state.wrongBook.filter((w) => w.id !== item.id);
    state.wrongBook.unshift({ ...item, at: Date.now() });
    if (state.wrongBook.length > 80) state.wrongBook.length = 80;
  }

  /* —— 首页 —— */
  function renderHome() {
    Storage.ensureDaily(state);
    Storage.recalcStreak(state);
    persist();
    $('#streak').textContent = state.streak;
    refreshTimerUI();

    const known = Object.values(state.vocab).filter((v) => v.status === 'known').length;
    $('#s-vocab').textContent = known;
    $('#s-grammar').textContent = Object.keys(state.grammar).length;
    $('#s-reading').textContent = Object.keys(state.reading).length;
    $('#s-listen').textContent = Object.keys(state.listening).length;

    const day = Storage.ensureDaily(state);
    const tasks = [
      { key: 'vocab', title: '背单词', desc: `完成今日 ${state.settings.dailyVocabTarget} 词目标或一轮闪卡` },
      { key: 'grammar', title: '语法专项', desc: '完成一个语法专题练习' },
      { key: 'reading', title: '阅读练习', desc: '完成一篇阅读理解' },
      { key: 'listening', title: '听力训练', desc: '完成一则听力作答' },
      { key: 'writing', title: '写作练习', desc: '提交或保存一篇作文' }
    ];
    $('#daily-tasks').innerHTML = tasks.map((t) => `
      <button type="button" class="task ${day[t.key] ? 'done' : ''}" data-task="${t.key}">
        <span class="box"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
        <span><strong>${t.title}</strong><small>${t.desc}</small></span>
      </button>`).join('');

    $('#daily-tasks').onclick = (e) => {
      const btn = e.target.closest('[data-task]');
      if (!btn) return;
      const k = btn.dataset.task;
      const d = Storage.ensureDaily(state);
      d[k] = !d[k];
      persist();
      renderHome();
      toast(d[k] ? '已勾选' : '已取消');
    };

    const done = tasks.filter((t) => day[t.key]).length;
    $('#daily-bar').style.width = `${(done / 5) * 100}%`;
  }

  function refreshTimerUI() {
    let sec = todaySec();
    if (timerOn) sec += Math.floor((Date.now() - sessionStart) / 1000);
    $('#today-time').textContent = fmtTime(sec);
    const btn = $('#btn-timer');
    if (btn) btn.textContent = timerOn ? '暂停计时' : '开始计时';
  }

  function toggleTimer() {
    if (timerOn) {
      const gained = Math.floor((Date.now() - sessionStart) / 1000);
      timerOn = false;
      clearInterval(timerTick);
      addStudySeconds(gained);
      toast(`已记录 ${gained} 秒`);
    } else {
      timerOn = true;
      sessionStart = Date.now();
      timerTick = setInterval(refreshTimerUI, 1000);
      toast('计时开始');
      refreshTimerUI();
    }
  }

  /* —— 单词 —— */
  function vocabKnownCount() {
    return Object.values(state.vocab).filter((v) => v.status === 'known').length;
  }

  function renderVocab() {
    $('#vocab-pill').textContent = `${vocabKnownCount()}/${VOCAB_DATA.all().length}`;
    $('#vocab-tabs').innerHTML = VOCAB_DATA.units.map((u) =>
      `<button type="button" class="tab ${u.id === vocabUnit ? 'on' : ''}" data-u="${u.id}">${u.title.replace('单元', 'U')}</button>`
    ).join('');
    $('#vocab-tabs').onclick = (e) => {
      const t = e.target.closest('[data-u]');
      if (!t) return;
      vocabUnit = t.dataset.u;
      flashIdx = 0;
      quizMode = false;
      renderVocab();
    };

    const unit = VOCAB_DATA.units.find((u) => u.id === vocabUnit);
    const words = unit.words;
    const panel = $('#vocab-panel');

    if (quizMode) {
      const w = words[flashIdx % words.length];
      const options = shuffle([w.meaning, ...sampleMeanings(w.id, 3)]);
      const correctIdx = options.indexOf(w.meaning);
      panel.innerHTML = `
        <h2>自测 · ${unit.title}</h2>
        <p class="sub">${flashIdx + 1}/${words.length} · 选出正确中文意思</p>
        <div class="q-card" id="vq">
          <div class="q">${w.word} <span style="color:var(--muted);font-weight:500">${w.phonetic}</span></div>
          ${options.map((op, i) => `<button type="button" class="opt" data-i="${i}">${op}</button>`).join('')}
        </div>
        <div class="btn-row">
          <button type="button" class="btn btn-ghost" id="vq-back">返回闪卡</button>
          <button type="button" class="btn btn-primary" id="vq-next">下一词</button>
        </div>`;
      $('#vq').onclick = (e) => {
        const opt = e.target.closest('.opt');
        if (!opt || $('#vq').classList.contains('revealed')) return;
        $('#vq').classList.add('revealed');
        const pick = Number(opt.dataset.i);
        const ok = pick === correctIdx;
        $$('.opt', $('#vq')).forEach((o) => {
          if (Number(o.dataset.i) === correctIdx) o.classList.add('right');
        });
        opt.classList.add(ok ? 'right' : 'wrong');
        ensureVocab(w.id);
        if (ok) {
          state.vocab[w.id].correct = (state.vocab[w.id].correct || 0) + 1;
          if (state.vocab[w.id].correct >= 2) state.vocab[w.id].status = 'known';
          else state.vocab[w.id].status = 'learning';
        } else {
          state.vocab[w.id].wrong = (state.vocab[w.id].wrong || 0) + 1;
          state.vocab[w.id].status = 'learning';
          addWrong({ id: w.id, module: '单词', prompt: w.word, answer: w.meaning });
        }
        persist();
        maybeMarkVocabDaily();
        $('#vocab-pill').textContent = `${vocabKnownCount()}/${VOCAB_DATA.all().length}`;
      };
      $('#vq-back').onclick = () => { quizMode = false; renderVocab(); };
      $('#vq-next').onclick = () => { flashIdx = (flashIdx + 1) % words.length; renderVocab(); };
      return;
    }

    const w = words[flashIdx % words.length];
    const st = state.vocab[w.id]?.status || 'new';
    panel.innerHTML = `
      <h2>${unit.title}</h2>
      <p class="sub">${flashIdx + 1}/${words.length} · 点击卡片显示释义 · 当前：${statusLabel(st)}</p>
      <div class="flash" id="flash">
        <div class="word">${w.word}</div>
        <div class="phon">${w.phonetic}</div>
        <div class="mean">${w.meaning}</div>
        <div class="ex">${w.example}</div>
        <div class="hint">点击显示释义与例句</div>
      </div>
      <div class="btn-row">
        <button type="button" class="btn btn-ghost" id="v-prev">上一个</button>
        <button type="button" class="btn btn-primary" id="v-next">下一个</button>
        <button type="button" class="btn btn-ok" id="v-known">标记已会</button>
        <button type="button" class="btn btn-ghost" id="v-quiz">开始自测</button>
      </div>`;
    $('#flash').onclick = () => $('#flash').classList.toggle('show');
    $('#v-prev').onclick = () => { flashIdx = (flashIdx - 1 + words.length) % words.length; renderVocab(); };
    $('#v-next').onclick = () => {
      flashIdx = (flashIdx + 1) % words.length;
      ensureVocab(w.id);
      if (state.vocab[w.id].status === 'new') state.vocab[w.id].status = 'learning';
      persist();
      maybeMarkVocabDaily();
      renderVocab();
    };
    $('#v-known').onclick = () => {
      ensureVocab(w.id);
      state.vocab[w.id].status = 'known';
      persist();
      maybeMarkVocabDaily();
      toast('已掌握');
      flashIdx = (flashIdx + 1) % words.length;
      renderVocab();
    };
    $('#v-quiz').onclick = () => { quizMode = true; flashIdx = 0; renderVocab(); };
  }

  function ensureVocab(id) {
    if (!state.vocab[id]) state.vocab[id] = { status: 'new', wrong: 0, correct: 0 };
  }

  function maybeMarkVocabDaily() {
    const reviewed = Object.keys(state.vocab).length;
    const knownTodayish = reviewed >= Math.min(state.settings.dailyVocabTarget, 10);
    if (knownTodayish) markDaily('vocab');
  }

  function statusLabel(s) {
    return { new: '未学', learning: '学习中', known: '已会' }[s] || s;
  }

  function sampleMeanings(excludeId, n) {
    const all = VOCAB_DATA.all().filter((w) => w.id !== excludeId);
    return shuffle(all).slice(0, n).map((w) => w.meaning);
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* —— 语法 —— */
  function renderGrammarList() {
    $('#grammar-pill').textContent = `${Object.keys(state.grammar).length}/${GRAMMAR_DATA.topics.length}`;
    $('#grammar-panel').style.display = 'none';
    const list = $('#grammar-list');
    list.style.display = 'block';
    list.innerHTML = `<h2>专题列表</h2><p class="sub">覆盖公三高频考点</p>` +
      GRAMMAR_DATA.topics.map((t) => {
        const done = state.grammar[t.id];
        return `<button type="button" class="list-item" data-g="${t.id}">
          <span><strong>${t.title}</strong><small>${t.focus}</small></span>
          <span class="badge ${done ? 'ok' : ''}">${done ? `${done.score}/${done.total}` : '未做'}</span>
        </button>`;
      }).join('');
    list.onclick = (e) => {
      const b = e.target.closest('[data-g]');
      if (b) openGrammar(b.dataset.g);
    };
  }

  function openGrammar(id) {
    const topic = GRAMMAR_DATA.topics.find((t) => t.id === id);
    $('#grammar-list').style.display = 'none';
    const panel = $('#grammar-panel');
    panel.style.display = 'block';
    const answers = {};
    panel.innerHTML = `
      <button type="button" class="btn btn-ghost" id="g-back">← 返回列表</button>
      <h2 style="margin-top:12px">${topic.title}</h2>
      <p class="sub">${topic.focus}</p>
      <ul class="points">${topic.points.map((p) => `<li>${p}</li>`).join('')}</ul>
      ${topic.questions.map((q, i) => `
        <div class="q-card" data-qid="${q.id}">
          <div class="q">${i + 1}. ${q.q}</div>
          ${q.options.map((op, oi) => `<button type="button" class="opt" data-oi="${oi}">${String.fromCharCode(65 + oi)}. ${op}</button>`).join('')}
          <div class="explain">${q.explain}</div>
        </div>`).join('')}
      <button type="button" class="btn btn-primary btn-block" id="g-submit">提交本专题</button>`;

    panel.onclick = (e) => {
      const opt = e.target.closest('.opt');
      if (!opt) return;
      const card = opt.closest('.q-card');
      if (card.classList.contains('revealed')) return;
      $$('.opt', card).forEach((o) => o.classList.remove('pick'));
      opt.classList.add('pick');
      answers[card.dataset.qid] = Number(opt.dataset.oi);
    };

    $('#g-back').onclick = () => renderGrammarList();
    $('#g-submit').onclick = () => {
      let score = 0;
      topic.questions.forEach((q) => {
        const card = panel.querySelector(`[data-qid="${q.id}"]`);
        card.classList.add('revealed');
        const pick = answers[q.id];
        $$('.opt', card).forEach((o) => {
          const oi = Number(o.dataset.oi);
          if (oi === q.answer) o.classList.add('right');
          if (pick === oi && oi !== q.answer) o.classList.add('wrong');
        });
        if (pick === q.answer) score += 1;
        else addWrong({ id: q.id, module: '语法', prompt: q.q, answer: q.options[q.answer] });
      });
      state.grammar[id] = { done: true, score, total: topic.questions.length };
      markDaily('grammar');
      persist();
      toast(`得分 ${score}/${topic.questions.length}`);
      $('#grammar-pill').textContent = `${Object.keys(state.grammar).length}/${GRAMMAR_DATA.topics.length}`;
    };
  }

  /* —— 阅读 —— */
  function renderReadingList() {
    $('#reading-pill').textContent = `${Object.keys(state.reading).length}/${READING_DATA.passages.length}`;
    $('#reading-panel').style.display = 'none';
    const list = $('#reading-list');
    list.style.display = 'block';
    list.innerHTML = `<h2>篇章列表</h2><p class="sub">建议计时阅读后作答</p>` +
      READING_DATA.passages.map((p) => {
        const done = state.reading[p.id];
        return `<button type="button" class="list-item" data-r="${p.id}">
          <span><strong>${p.title}</strong><small>${p.difficulty} · 约${p.minutes}分钟</small></span>
          <span class="badge ${done ? 'ok' : ''}">${done ? `${done.score}/${done.total}` : '未做'}</span>
        </button>`;
      }).join('');
    list.onclick = (e) => {
      const b = e.target.closest('[data-r]');
      if (b) openReading(b.dataset.r);
    };
  }

  function openReading(id) {
    const p = READING_DATA.passages.find((x) => x.id === id);
    $('#reading-list').style.display = 'none';
    const panel = $('#reading-panel');
    panel.style.display = 'block';
    const answers = {};
    panel.innerHTML = `
      <button type="button" class="btn btn-ghost" id="r-back">← 返回列表</button>
      <h2 style="margin-top:12px">${p.title}</h2>
      <p class="sub">${p.difficulty} · 建议 ${p.minutes} 分钟</p>
      <div class="passage">${p.text}</div>
      ${p.questions.map((q, i) => `
        <div class="q-card" data-qid="${q.id}">
          <div class="q">${i + 1}. ${q.q}</div>
          ${q.options.map((op, oi) => `<button type="button" class="opt" data-oi="${oi}">${String.fromCharCode(65 + oi)}. ${op}</button>`).join('')}
        </div>`).join('')}
      <button type="button" class="btn btn-primary btn-block" id="r-submit">提交答案</button>`;
    panel.onclick = (e) => {
      const opt = e.target.closest('.opt');
      if (!opt) return;
      const card = opt.closest('.q-card');
      if (card.classList.contains('revealed')) return;
      $$('.opt', card).forEach((o) => o.classList.remove('pick'));
      opt.classList.add('pick');
      answers[card.dataset.qid] = Number(opt.dataset.oi);
    };
    $('#r-back').onclick = () => renderReadingList();
    $('#r-submit').onclick = () => {
      let score = 0;
      p.questions.forEach((q) => {
        const card = panel.querySelector(`[data-qid="${q.id}"]`);
        card.classList.add('revealed');
        const pick = answers[q.id];
        $$('.opt', card).forEach((o) => {
          const oi = Number(o.dataset.oi);
          if (oi === q.answer) o.classList.add('right');
          if (pick === oi && oi !== q.answer) o.classList.add('wrong');
        });
        if (pick === q.answer) score += 1;
        else addWrong({ id: q.id, module: '阅读', prompt: q.q, answer: q.options[q.answer] });
      });
      state.reading[id] = { done: true, score, total: p.questions.length, answers };
      markDaily('reading');
      persist();
      toast(`阅读得分 ${score}/${p.questions.length}`);
      $('#reading-pill').textContent = `${Object.keys(state.reading).length}/${READING_DATA.passages.length}`;
    };
  }

  /* —— 听力 —— */
  function speak(text) {
    if (!window.speechSynthesis) {
      toast('当前浏览器不支持语音朗读，请查看文本练习');
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  function renderListenList() {
    $('#listen-tip').textContent = LISTENING_DATA.tip;
    $('#listen-pill').textContent = `${Object.keys(state.listening).length}/${LISTENING_DATA.items.length}`;
    $('#listen-panel').style.display = 'none';
    const list = $('#listen-list');
    list.style.display = 'block';
    list.innerHTML = `<h2>听力列表</h2><p class="sub">播放后作答，可展开原文复盘</p>` +
      LISTENING_DATA.items.map((it) => {
        const done = state.listening[it.id];
        return `<button type="button" class="list-item" data-l="${it.id}">
          <span><strong>${it.title}</strong><small>${it.type}</small></span>
          <span class="badge ${done ? 'ok' : ''}">${done ? `${done.score}/${done.total}` : '未做'}</span>
        </button>`;
      }).join('');
    list.onclick = (e) => {
      const b = e.target.closest('[data-l]');
      if (b) openListen(b.dataset.l);
    };
  }

  function openListen(id) {
    const it = LISTENING_DATA.items.find((x) => x.id === id);
    $('#listen-list').style.display = 'none';
    const panel = $('#listen-panel');
    panel.style.display = 'block';
    const answers = {};
    panel.innerHTML = `
      <button type="button" class="btn btn-ghost" id="l-back">← 返回列表</button>
      <h2 style="margin-top:12px">${it.title}</h2>
      <p class="sub">${it.type}</p>
      <div class="btn-row">
        <button type="button" class="btn btn-primary" id="l-play">播放听力</button>
        <button type="button" class="btn btn-ghost" id="l-stop">停止</button>
        <button type="button" class="btn btn-ghost" id="l-script">显示/隐藏原文</button>
      </div>
      <div class="script-box" id="l-text">${it.script}</div>
      ${it.questions.map((q, i) => `
        <div class="q-card" data-qid="${q.id}" style="margin-top:10px">
          <div class="q">${i + 1}. ${q.q}</div>
          ${q.options.map((op, oi) => `<button type="button" class="opt" data-oi="${oi}">${String.fromCharCode(65 + oi)}. ${op}</button>`).join('')}
        </div>`).join('')}
      <button type="button" class="btn btn-primary btn-block" id="l-submit">提交答案</button>`;
    $('#l-back').onclick = () => { window.speechSynthesis && window.speechSynthesis.cancel(); renderListenList(); };
    $('#l-play').onclick = () => speak(it.script);
    $('#l-stop').onclick = () => window.speechSynthesis && window.speechSynthesis.cancel();
    $('#l-script').onclick = () => $('#l-text').classList.toggle('on');
    panel.onclick = (e) => {
      const opt = e.target.closest('.opt');
      if (!opt) return;
      const card = opt.closest('.q-card');
      if (card.classList.contains('revealed')) return;
      $$('.opt', card).forEach((o) => o.classList.remove('pick'));
      opt.classList.add('pick');
      answers[card.dataset.qid] = Number(opt.dataset.oi);
    };
    $('#l-submit').onclick = () => {
      let score = 0;
      it.questions.forEach((q) => {
        const card = panel.querySelector(`[data-qid="${q.id}"]`);
        card.classList.add('revealed');
        const pick = answers[q.id];
        $$('.opt', card).forEach((o) => {
          const oi = Number(o.dataset.oi);
          if (oi === q.answer) o.classList.add('right');
          if (pick === oi && oi !== q.answer) o.classList.add('wrong');
        });
        if (pick === q.answer) score += 1;
        else addWrong({ id: q.id, module: '听力', prompt: q.q, answer: q.options[q.answer] });
      });
      state.listening[id] = { done: true, score, total: it.questions.length };
      markDaily('listening');
      persist();
      toast(`听力得分 ${score}/${it.questions.length}`);
      $('#listen-pill').textContent = `${Object.keys(state.listening).length}/${LISTENING_DATA.items.length}`;
    };
  }

  /* —— 写作 —— */
  function renderWriteList() {
    $('#write-tips').innerHTML = WRITING_DATA.tips.map((t) => `<li>${t}</li>`).join('');
    $('#write-pill').textContent = `${Object.keys(state.writing).filter((k) => state.writing[k].submitted).length}/${WRITING_DATA.topics.length}`;
    $('#write-panel').style.display = 'none';
    const list = $('#write-list');
    list.style.display = 'block';
    list.innerHTML = `<h2>题目列表</h2>` +
      WRITING_DATA.topics.map((t) => {
        const w = state.writing[t.id];
        return `<button type="button" class="list-item" data-w="${t.id}">
          <span><strong>${t.title}</strong><small>${t.type}</small></span>
          <span class="badge ${w?.submitted ? 'ok' : ''}">${w?.submitted ? '已提交' : w?.draft ? '有草稿' : '未写'}</span>
        </button>`;
      }).join('');
    list.onclick = (e) => {
      const b = e.target.closest('[data-w]');
      if (b) openWrite(b.dataset.w);
    };
  }

  function openWrite(id) {
    const t = WRITING_DATA.topics.find((x) => x.id === id);
    const saved = state.writing[id] || {};
    $('#write-list').style.display = 'none';
    const panel = $('#write-panel');
    panel.style.display = 'block';
    panel.innerHTML = `
      <button type="button" class="btn btn-ghost" id="w-back">← 返回列表</button>
      <h2 style="margin-top:12px">${t.title}</h2>
      <p class="sub">${t.type}</p>
      <div class="passage" style="white-space:normal">${t.prompt}</div>
      <p class="sub" style="margin-top:10px">提纲：${t.outline.join(' → ')}</p>
      <textarea class="write-area" id="w-draft" placeholder="在此写作文…">${saved.draft || ''}</textarea>
      <div class="btn-row">
        <button type="button" class="btn btn-ghost" id="w-save">保存草稿</button>
        <button type="button" class="btn btn-primary" id="w-submit">提交练习</button>
        <button type="button" class="btn btn-ok" id="w-model">对照范文</button>
      </div>
      <div class="model-box" id="w-model-box">${t.model}</div>`;
    $('#w-back').onclick = () => renderWriteList();
    $('#w-save').onclick = () => {
      state.writing[id] = { ...(state.writing[id] || {}), draft: $('#w-draft').value, at: Date.now() };
      persist();
      toast('草稿已保存');
    };
    $('#w-submit').onclick = () => {
      const draft = $('#w-draft').value.trim();
      if (draft.length < 40) { toast('请先写够基本内容再提交'); return; }
      state.writing[id] = { draft, submitted: true, at: Date.now() };
      markDaily('writing');
      persist();
      toast('已提交，可对照范文复盘');
      $('#write-pill').textContent = `${Object.keys(state.writing).filter((k) => state.writing[k].submitted).length}/${WRITING_DATA.topics.length}`;
    };
    $('#w-model').onclick = () => $('#w-model-box').classList.toggle('on');
  }

  /* —— 进度 —— */
  function renderProgress() {
    const timeChart = $('#time-chart');
    const cols = [];
    let maxM = 1;
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = Storage.todayKey(d);
      const m = Math.round((state.studySeconds[k] || 0) / 60);
      maxM = Math.max(maxM, m);
      cols.push({ label: `${d.getMonth() + 1}/${d.getDate()}`, m });
    }
    timeChart.innerHTML = cols.map((c) =>
      `<div class="col"><i style="height:${Math.max(4, (c.m / maxM) * 80)}px"></i><span>${c.label}</span></div>`
    ).join('');

    const checkChart = $('#check-chart');
    const ccols = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = Storage.todayKey(d);
      const day = state.daily[k];
      const ok = day && (day.checked || Storage.isDayComplete(day));
      ccols.push({ label: `${d.getDate()}`, ok });
    }
    checkChart.innerHTML = ccols.map((c) =>
      `<div class="col"><i style="height:${c.ok ? 48 : 8}px;background:${c.ok ? 'var(--ok)' : 'var(--bg2)'}"></i><span>${c.label}</span></div>`
    ).join('');

    const mods = [
      ['单词掌握', vocabKnownCount(), VOCAB_DATA.all().length],
      ['语法专题', Object.keys(state.grammar).length, GRAMMAR_DATA.topics.length],
      ['阅读篇章', Object.keys(state.reading).length, READING_DATA.passages.length],
      ['听力练习', Object.keys(state.listening).length, LISTENING_DATA.items.length],
      ['作文提交', Object.values(state.writing).filter((w) => w.submitted).length, WRITING_DATA.topics.length]
    ];
    $('#module-progress').innerHTML = mods.map(([name, a, b]) => `
      <div style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;font-size:.78rem;margin-bottom:4px">
          <span>${name}</span><span>${a}/${b}</span>
        </div>
        <div class="bar"><i style="width:${(a / b) * 100}%"></i></div>
      </div>`).join('');

    const wl = $('#wrong-list');
    if (!state.wrongBook.length) wl.innerHTML = '<div class="empty">暂无错题</div>';
    else wl.innerHTML = state.wrongBook.slice(0, 30).map((w) => `
      <div style="padding:10px 0;border-bottom:1px solid var(--line)">
        <strong style="font-size:.84rem">[${w.module}] ${w.prompt}</strong>
        <div style="font-size:.78rem;color:var(--ok);margin-top:4px">${w.answer}</div>
      </div>`).join('');
  }

  /* —— 我的 —— */
  function renderMe() {
    $('#app-ver').textContent = APP_VERSION;
    $('#set-minutes').value = state.settings.dailyGoalMinutes;
    $('#set-vocab').value = state.settings.dailyVocabTarget;
    $('#set-remind').value = state.settings.remindHour;
    $('#set-remind-on').checked = !!state.settings.remindEnabled;
  }

  function saveSettings() {
    state.settings.dailyGoalMinutes = Number($('#set-minutes').value) || 45;
    state.settings.dailyVocabTarget = Number($('#set-vocab').value) || 20;
    state.settings.remindHour = Number($('#set-remind').value) || 20;
    state.settings.remindEnabled = $('#set-remind-on').checked;
    persist();
    if (state.settings.remindEnabled) setupReminder();
    toast('设置已保存');
  }

  function setupReminder() {
    if (!('Notification' in window)) return;
    Notification.requestPermission().then((p) => {
      if (p !== 'granted') return;
      scheduleReminderCheck();
    });
  }

  function scheduleReminderCheck() {
    // 页面打开时检查：若到了提醒小时且今日未打卡，弹通知
    const hour = new Date().getHours();
    if (!state.settings.remindEnabled) return;
    if (hour !== state.settings.remindHour) return;
    const day = Storage.ensureDaily(state);
    if (day.checked || Storage.isDayComplete(day)) return;
    const key = `reminded-${Storage.todayKey()}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
    try {
      new Notification('公三备考提醒', { body: '今天的五项备考任务还没完成，打开 App 打卡吧。', icon: './icons/icon-192.svg' });
    } catch (_) {}
  }

  /* —— 版本更新重置 —— */
  function checkVersion() {
    if (state.appVersion === APP_VERSION) return;
    $('#modal-ver').textContent = APP_VERSION;
    $('#version-modal').classList.add('on');
    $('#ver-reset').onclick = () => {
      state = Storage.defaultState();
      state.appVersion = APP_VERSION;
      persist();
      Storage.clearOldOralQuest();
      $('#version-modal').classList.remove('on');
      toast('进度已重置');
      boot();
    };
    $('#ver-keep').onclick = () => {
      state.appVersion = APP_VERSION;
      persist();
      $('#version-modal').classList.remove('on');
      toast('已保留进度并更新版本号');
    };
  }

  function resetAll() {
    if (!confirm('确定清空全部学习进度、打卡与作文草稿？')) return;
    const settings = { ...state.settings };
    state = Storage.defaultState();
    state.settings = settings;
    state.appVersion = APP_VERSION;
    persist();
    toast('已全部重置');
    boot();
  }

  function resetToday() {
    const k = Storage.todayKey();
    state.daily[k] = { vocab: false, grammar: false, reading: false, listening: false, writing: false, checked: false };
    persist();
    renderHome();
    toast('今日打卡已重置');
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `pets3-backup-${Storage.todayKey()}.json`;
    a.click();
    toast('已导出');
  }

  function boot() {
    Storage.ensureDaily(state);
    state.lastActiveDate = Storage.todayKey();
    persist();
    renderHome();
    $$('.nav-btn').forEach((b) => { b.onclick = () => navTo(b.dataset.nav); });
    $$('[data-goto]').forEach((b) => { b.onclick = () => navTo(b.dataset.goto); });
    $('#btn-timer').onclick = toggleTimer;
    $('#btn-checkin').onclick = () => {
      const day = Storage.ensureDaily(state);
      if (!Storage.isDayComplete(day)) {
        toast('请先完成五项任务（可手动勾选）');
        return;
      }
      day.checked = true;
      Storage.recalcStreak(state);
      persist();
      renderHome();
      toast(`打卡成功！连续 ${state.streak} 天`);
    };
    $('#btn-save-set').onclick = saveSettings;
    $('#btn-export').onclick = exportData;
    $('#btn-reset-soft').onclick = resetToday;
    $('#btn-reset-all').onclick = resetAll;
    $('#wrong-clear').onclick = () => {
      state.wrongBook = [];
      persist();
      renderProgress();
      toast('错题已清空');
    };

    const hash = (location.hash || '#home').slice(1);
    const ok = ['home', 'vocab', 'grammar', 'reading', 'listening', 'writing', 'progress', 'me'];
    navTo(ok.includes(hash) ? hash : 'home');
    scheduleReminderCheck();
    checkVersion();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && timerOn) {
      const gained = Math.floor((Date.now() - sessionStart) / 1000);
      timerOn = false;
      clearInterval(timerTick);
      addStudySeconds(gained);
      refreshTimerUI();
    }
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }

  boot();
})();
