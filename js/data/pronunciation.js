/** 发音纠错 — 易混对比（第4关） */
window.PRONUNCIATION_DATA = {
  pairs: [
    {
      id: 'p1',
      left: { word: 'sheep', ipa: '/ʃiːp/', tip: '长元音 /iː/' },
      right: { word: 'ship', ipa: '/ʃɪp/', tip: '短元音 /ɪ/' },
      focus: '/iː/ vs /ɪ/',
      detail: 'sheep 口型更扁、音更长；ship 口型略松、音短促。中国学习者常把两者都发成「西」。',
      examples: [
        'I see a sheep. （我看见一只羊）',
        'The ship is big. （那艘船很大）'
      ],
      practice: 'Minimal pair drill: sheep — ship — sheep — ship'
    },
    {
      id: 'p2',
      left: { word: 'bad', ipa: '/bæd/', tip: '开口 /æ/' },
      right: { word: 'bed', ipa: '/bed/', tip: '半开 /e/' },
      focus: '/æ/ vs /e/',
      detail: 'bad 嘴巴张得更大，像微笑说「啊」；bed 口型较小。bad≠bed 是 PETS 听力易错点。',
      examples: [
        'This apple is bad. （这个苹果坏了）',
        'Go to bed early. （早点睡觉）'
      ],
      practice: 'Say: bad bed bad bed — feel the jaw drop on bad'
    },
    {
      id: 'p3',
      left: { word: 'think', ipa: '/θɪŋk/', tip: '清辅音 /θ/' },
      right: { word: 'this', ipa: '/ðɪs/', tip: '浊辅音 /ð/' },
      focus: '/θ/ vs /ð/',
      detail: '舌尖轻触上齿。think 只送气不振动；this 声带振动。切勿发成 /s/ 或 /z/。',
      examples: [
        'I think so. （我想是的）',
        'Look at this. （看这个）'
      ],
      practice: 'Put tongue between teeth: think — this — thank — that'
    },
    {
      id: 'p4',
      left: { word: 'walk', ipa: '/wɔːk/', tip: '长元音 /ɔː/' },
      right: { word: 'work', ipa: '/wɜːk/', tip: '长元音 /ɜː/' },
      focus: '/ɔː/ vs /ɜː/',
      detail: 'walk 嘴唇更圆；work 嘴唇更扁，舌中部抬起。中文里两者常被混成「握克」。',
      examples: [
        'I walk to school. （我走路去学校）',
        'I work at home. （我在家工作）'
      ],
      practice: 'Round lips for walk; flat smile for work'
    },
    {
      id: 'p5',
      left: { word: 'leave', ipa: '/liːv/', tip: '/iː/ + /v/' },
      right: { word: 'live', ipa: '/lɪv/', tip: '/ɪ/ + /v/' },
      focus: 'leave vs live',
      detail: '元音长短不同，词尾都是 /v/（上齿咬下唇并振动），不要发成 /w/。',
      examples: [
        'Please leave now. （请现在离开）',
        'I live in Shanghai. （我住在上海）'
      ],
      practice: 'leave (long) — live (short)'
    },
    {
      id: 'p6',
      left: { word: 'full', ipa: '/fʊl/', tip: '短 /ʊ/' },
      right: { word: 'fool', ipa: '/fuːl/', tip: '长 /uː/' },
      focus: '/ʊ/ vs /uː/',
      detail: 'full 短而松；fool 长而紧、唇更圆。',
      examples: [
        'The glass is full. （杯子满了）',
        "Don't be a fool. （别犯傻）"
      ],
      practice: 'full fool full fool'
    },
    {
      id: 'p7',
      left: { word: 'light', ipa: '/laɪt/', tip: '/l/ 清晰' },
      right: { word: 'night', ipa: '/naɪt/', tip: '/n/ 鼻音' },
      focus: '/l/ vs /n/',
      detail: 'light 气流从舌侧出；night 气流走鼻腔。词首不要互相替换。',
      examples: [
        'Turn on the light. （打开灯）',
        'Good night. （晚安）'
      ],
      practice: 'light night light night'
    },
    {
      id: 'p8',
      left: { word: 'price', ipa: '/praɪs/', tip: '/p/+/r/' },
      right: { word: 'prize', ipa: '/praɪz/', tip: '词尾 /z/' },
      focus: '/s/ vs /z/ 词尾',
      detail: 'price 词尾清辅音 /s/；prize 词尾浊辅音 /z/，声带振动。',
      examples: [
        "What's the price? （多少钱？）",
        'She won a prize. （她得了奖）'
      ],
      practice: 'price (hiss) — prize (buzz)'
    }
  ]
};
