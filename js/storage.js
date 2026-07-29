/** localStorage 持久化 — 手机重复打开可恢复进度 */
const Storage = (() => {
  const KEY = 'oral-quest-v1';

  const defaultState = () => ({
    version: 1,
    checkins: {},          // { 'YYYY-MM-DD': { phonetics, shadow, quest, review } }
    streak: 0,
    lastCheckinDate: null,
    phoneticsMastered: [], // symbol ids
    quizDone: {},          // { itemId: 'known'|'wrong' }
    speakingDone: {},      // { itemId: true }
    pronounceDone: [],     // pair ids
    wrongBook: [],         // [{id, type, prompt, answer, at}]
    weekDone: [],          // week numbers marked complete
    installDismissed: false
  });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return { ...defaultState(), ...parsed };
    } catch {
      return defaultState();
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('storage full or blocked', e);
    }
  }

  function todayKey(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function getTodayCheckin(state) {
    const k = todayKey();
    if (!state.checkins[k]) {
      state.checkins[k] = { phonetics: false, shadow: false, quest: false, review: false };
    }
    return state.checkins[k];
  }

  function recalcStreak(state) {
    let streak = 0;
    const d = new Date();
    for (;;) {
      const k = todayKey(d);
      const c = state.checkins[k];
      const done = c && c.phonetics && c.shadow && c.quest && c.review;
      if (!done) {
        // 允许今天尚未完成时，从昨天开始算连续
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

  function isFullyChecked(dayObj) {
    return dayObj && dayObj.phonetics && dayObj.shadow && dayObj.quest && dayObj.review;
  }

  return {
    KEY,
    load,
    save,
    todayKey,
    getTodayCheckin,
    recalcStreak,
    isFullyChecked,
    defaultState
  };
})();
