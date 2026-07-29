/** PETS-3 考点语法专项 */
window.GRAMMAR_DATA = {
  topics: [
    {
      id: 'g1',
      title: '时态专项',
      focus: '一般现在/过去/将来 + 现在完成',
      points: [
        '一般现在：习惯、事实 — He works in Beijing.',
        '一般过去：过去发生 — She visited Paris last year.',
        '一般将来：will / be going to — I will call you tonight.',
        '现在完成：have/has + 过去分词，强调结果或经历 — I have finished my homework.'
      ],
      questions: [
        { id: 'g1q1', q: 'She _____ to work by bus every day.', options: ['go', 'goes', 'went', 'gone'], answer: 1, explain: '习惯用一般现在，主语第三人称单数加 s。' },
        { id: 'g1q2', q: 'I _____ this book already.', options: ['read', 'reads', 'have read', 'am reading'], answer: 2, explain: 'already 常与现在完成连用。' },
        { id: 'g1q3', q: 'They _____ a meeting yesterday afternoon.', options: ['have', 'had', 'has', 'are having'], answer: 1, explain: 'yesterday 提示一般过去。' },
        { id: 'g1q4', q: 'Look at the clouds! It _____ rain.', options: ['will', 'is going to', 'goes to', 'going'], answer: 1, explain: '有迹象预示即将发生用 be going to。' },
        { id: 'g1q5', q: 'How long _____ you _____ English?', options: ['do; study', 'have; studied', 'did; study', 'are; studying'], answer: 1, explain: 'How long 问持续到现在，用现在完成。' }
      ]
    },
    {
      id: 'g2',
      title: '被动语态',
      focus: 'be + 过去分词',
      points: [
        '结构：主语 + be + 过去分词 (+ by…)',
        '时态体现在 be 上：is/was/will be/have been + V-ed',
        '不知道或不必说出动作发出者时常用被动。'
      ],
      questions: [
        { id: 'g2q1', q: 'The letter _____ yesterday.', options: ['sends', 'sent', 'was sent', 'is sending'], answer: 2, explain: '过去被动：was/were + V-ed。' },
        { id: 'g2q2', q: 'English _____ widely in the world.', options: ['speaks', 'is spoken', 'spoke', 'speaking'], answer: 1, explain: '一般现在被动：is/are + V-ed。' },
        { id: 'g2q3', q: 'A new school _____ next year.', options: ['will build', 'will be built', 'builds', 'is building'], answer: 1, explain: '将来被动：will be + V-ed。' },
        { id: 'g2q4', q: 'The windows _____ already.', options: ['cleaned', 'have cleaned', 'have been cleaned', 'are cleaning'], answer: 2, explain: '现在完成被动：have/has been + V-ed。' },
        { id: 'g2q5', q: 'The problem _____ at the meeting.', options: ['discussed', 'was discussed', 'discussing', 'discusses'], answer: 1, explain: '问题被讨论，用被动。' }
      ]
    },
    {
      id: 'g3',
      title: '从句入门',
      focus: '宾语从句 / 定语从句 / 状语从句',
      points: [
        '宾语从句：I think (that) he is right. 注意陈述语序。',
        '定语从句：who/which/that 修饰名词 — the book that I bought',
        '状语从句：because / if / when / although 引导原因、条件、时间、让步。'
      ],
      questions: [
        { id: 'g3q1', q: 'Do you know _____ he lives?', options: ['where', 'what', 'which', 'whose'], answer: 0, explain: '宾语从句缺地点状语，用 where。' },
        { id: 'g3q2', q: 'This is the book _____ I need.', options: ['who', 'whom', 'that', 'where'], answer: 2, explain: '修饰物可用 that/which。' },
        { id: 'g3q3', q: 'I will call you _____ I arrive.', options: ['until', 'when', 'although', 'because'], answer: 1, explain: '时间状语用 when。' },
        { id: 'g3q4', q: '_____ it rained, we still went out.', options: ['Because', 'If', 'Although', 'So'], answer: 2, explain: '让步用 although。' },
        { id: 'g3q5', q: 'She asked me _____ I was free.', options: ['that', 'if', 'what', 'which'], answer: 1, explain: '一般疑问转化用 if/whether。' }
      ]
    },
    {
      id: 'g4',
      title: '非谓语动词',
      focus: 'to do / doing / done',
      points: [
        '不定式 to do：表目的、将来 — I want to learn English.',
        '动名词 doing：作主语/宾语 — Reading helps a lot. / enjoy doing',
        '过去分词 done：被动或完成意义 — the broken window'
      ],
      questions: [
        { id: 'g4q1', q: 'He enjoys _____ football.', options: ['play', 'to play', 'playing', 'played'], answer: 2, explain: 'enjoy 后接动名词。' },
        { id: 'g4q2', q: 'I decided _____ early.', options: ['leave', 'to leave', 'leaving', 'left'], answer: 1, explain: 'decide 后接不定式。' },
        { id: 'g4q3', q: '_____ is good for health.', options: ['Swim', 'To swimming', 'Swimming', 'Swam'], answer: 2, explain: '动名词作主语。' },
        { id: 'g4q4', q: 'The _____ glass is dangerous.', options: ['break', 'breaking', 'broken', 'broke'], answer: 2, explain: '过去分词作定语表被动完成。' },
        { id: 'g4q5', q: 'She stopped _____ a rest.', options: ['have', 'to have', 'having', 'had'], answer: 1, explain: 'stop to do = 停下（别的事）去做某事。' }
      ]
    },
    {
      id: 'g5',
      title: '情态动词',
      focus: 'can / must / should / may / have to',
      points: [
        'can：能力、许可；could 更委婉',
        'must：必须、肯定推测；mustn’t 禁止',
        'have to：客观需要；should 建议',
        'may/might：可能、许可'
      ],
      questions: [
        { id: 'g5q1', q: 'You _____ smoke here. It is not allowed.', options: ['must', "mustn't", 'should', 'can'], answer: 1, explain: '禁止用 mustn’t。' },
        { id: 'g5q2', q: '_____ I borrow your pen?', options: ['Must', 'Need', 'May', 'Should'], answer: 2, explain: '请求许可用 May/Can。' },
        { id: 'g5q3', q: 'Students _____ wear uniforms at this school.', options: ['can', 'have to', 'may', 'might'], answer: 1, explain: '校规要求用 have to。' },
        { id: 'g5q4', q: 'You look tired. You _____ take a rest.', options: ['should', 'mustn’t', 'can’t', 'needn’t'], answer: 0, explain: '建议用 should。' },
        { id: 'g5q5', q: 'He _____ be at home. I saw him just now.', options: ['must', 'can’t', 'may', 'might'], answer: 1, explain: '刚看见人不在家，否定推测用 can’t。' }
      ]
    },
    {
      id: 'g6',
      title: '比较等级',
      focus: '比较级 / 最高级',
      points: [
        '比较级：-er / more + adj. + than',
        '最高级：the -est / the most + adj.',
        '特殊：good-better-best；bad-worse-worst；many/much-more-most'
      ],
      questions: [
        { id: 'g6q1', q: 'This book is _____ than that one.', options: ['interesting', 'more interesting', 'most interesting', 'interestinger'], answer: 1, explain: '多音节比较级用 more。' },
        { id: 'g6q2', q: 'She is the _____ student in our class.', options: ['tall', 'taller', 'tallest', 'most tall'], answer: 2, explain: '三者以上最高级。' },
        { id: 'g6q3', q: 'He runs _____ than me.', options: ['fast', 'faster', 'fastest', 'more fast'], answer: 1, explain: '副词比较级 faster。' },
        { id: 'g6q4', q: 'Today is _____ day of the week.', options: ['hot', 'hotter', 'the hottest', 'hottest'], answer: 2, explain: '最高级前通常加 the。' },
        { id: 'g6q5', q: 'This is _____ problem of all.', options: ['bad', 'worse', 'the worst', 'worst'], answer: 2, explain: 'bad 的最高级 the worst。' }
      ]
    },
    {
      id: 'g7',
      title: '虚拟与条件',
      focus: 'if 真实/非真实条件（公三基础）',
      points: [
        '真实条件：If it rains, we will stay home.',
        '现在非真实：If I were you, I would…',
        '口试写作常用：If I had more time, I would…'
      ],
      questions: [
        { id: 'g7q1', q: 'If it _____ tomorrow, we will cancel the trip.', options: ['rain', 'rains', 'rained', 'will rain'], answer: 1, explain: '真实条件从句用一般现在。' },
        { id: 'g7q2', q: 'If I _____ you, I would accept the offer.', options: ['am', 'was', 'were', 'be'], answer: 2, explain: '虚拟语气常用 If I were you。' },
        { id: 'g7q3', q: 'If I had more money, I _____ a car.', options: ['buy', 'bought', 'will buy', 'would buy'], answer: 3, explain: '主句用 would + 动词原形。' },
        { id: 'g7q4', q: '_____ you free, please call me.', options: ['If', 'Unless', 'Although', 'Because'], answer: 0, explain: '条件用 If。' },
        { id: 'g7q5', q: 'We won’t start _____ everyone arrives.', options: ['if', 'until', 'because', 'so'], answer: 1, explain: '直到…才，用 until。' }
      ]
    },
    {
      id: 'g8',
      title: '主谓一致与代词',
      focus: '公三高频易错点',
      points: [
        '主语单数 → 动词单数；复数 → 复数',
        'everyone / each / nobody 作主语，谓语用单数',
        'either…or / neither…nor 就近原则'
      ],
      questions: [
        { id: 'g8q1', q: 'Everyone _____ ready for the exam.', options: ['are', 'is', 'be', 'were'], answer: 1, explain: 'everyone 作主语用单数。' },
        { id: 'g8q2', q: 'The news _____ surprising.', options: ['are', 'is', 'were', 'be'], answer: 1, explain: 'news 形复意单，谓语用单数。' },
        { id: 'g8q3', q: 'Neither Tom nor his friends _____ at home.', options: ['is', 'are', 'was', 'be'], answer: 1, explain: '就近原则，friends 为复数。' },
        { id: 'g8q4', q: 'This is _____ book, not mine.', options: ['she', 'her', 'hers', 'herself'], answer: 1, explain: '形容词性物主代词 her + 名词。' },
        { id: 'g8q5', q: 'The team _____ practicing hard these days.', options: ['is', 'are', 'be', 'been'], answer: 0, explain: 'team 视为整体常用单数（英式可复数，公三选 is）。' }
      ]
    }
  ]
};
