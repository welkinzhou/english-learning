/** PETS-3 备考 App — 版本与本地持久化 */
window.APP_VERSION = '2.0.0';
window.APP_NAME = '公三备考打卡';

const Storage = (() => {
  const KEY = 'pets3-prep-v2';

  const defaultState = () => ({
    appVersion: window.APP_VERSION,
    // 每日任务 { 'YYYY-MM-DD': { vocab, grammar, reading, listening, writing, checked } }
    daily: {},
    // 学习时长秒数 { 'YYYY-MM-DD': number }
    studySeconds: {},
    streak: 0,
    // 单词 { wordId: { status: 'new'|'learning'|'known', wrong: n, correct: n } }
    vocab: {},
    // 语法 { topicId: { done: true, score, total } }
    grammar: {},
    // 阅读 { passageId: { done, score, total, answers } }
    reading: {},
    // 听力 { itemId: { done, score, total } }
    listening: {},
    // 写作 { topicId: { draft, submitted, at } }
    writing: {},
    // 错题 [{ id, module, prompt, answer, at }]
    wrongBook: [],
    settings: {
      dailyGoalMinutes: 45,
      dailyVocabTarget: 20,
      remindHour: 20,
      remindEnabled: true
    },
    lastActiveDate: null,
    installDismissed: false,
    versionPromptDone: false
  });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      return deepMerge(defaultState(), JSON.parse(raw));
    } catch {
      return defaultState();
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('storage error', e);
    }
  }

  function deepMerge(base, patch) {
    const out = { ...base };
    for (const k of Object.keys(patch || {})) {
      if (patch[k] && typeof patch[k] === 'object' && !Array.isArray(patch[k]) && typeof base[k] === 'object' && base[k] && !Array.isArray(base[k])) {
        out[k] = deepMerge(base[k], patch[k]);
      } else {
        out[k] = patch[k];
      }
    }
    return out;
  }

  function todayKey(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function ensureDaily(state, key = todayKey()) {
    if (!state.daily[key]) {
      state.daily[key] = {
        vocab: false,
        grammar: false,
        reading: false,
        listening: false,
        writing: false,
        checked: false
      };
    }
    if (state.studySeconds[key] == null) state.studySeconds[key] = 0;
    return state.daily[key];
  }

  function isDayComplete(day) {
    return day && day.vocab && day.grammar && day.reading && day.listening && day.writing;
  }

  function recalcStreak(state) {
    let streak = 0;
    const d = new Date();
    for (;;) {
      const k = todayKey(d);
      const day = state.daily[k];
      const ok = day && (day.checked || isDayComplete(day));
      if (!ok) {
        if (streak === 0 && k === todayKey()) {
          d.setDate(d.getDate() - 1);
          continue;
        }
        break;
      }
      streak += 1;
      d.setDate(d.getDate() - 1);
    }
    state.streak = streak;
    return streak;
  }

  function clearOldOralQuest() {
    try {
      localStorage.removeItem('oral-quest-v1');
    } catch (_) {}
  }

  return {
    KEY,
    load,
    save,
    todayKey,
    ensureDaily,
    isDayComplete,
    recalcStreak,
    defaultState,
    clearOldOralQuest
  };
})();
