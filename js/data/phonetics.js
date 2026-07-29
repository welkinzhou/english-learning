/** 48个国际音标 + 例词 + 易错提示（覆盖零基础→PETS-3） */
window.PHONETICS_DATA = {
  categories: [
    { id: 'long', name: '长元音', count: 5 },
    { id: 'short', name: '短元音', count: 7 },
    { id: 'diph', name: '双元音', count: 8 },
    { id: 'voiceless', name: '清辅音', count: 11 },
    { id: 'voiced', name: '浊辅音', count: 17 }
  ],
  items: [
    // 长元音
    { id: 'iː', cat: 'long', symbol: '/iː/', name: '长元音 ee', example: 'see / see', tip: '嘴角向两侧拉开，舌尖抵下齿，音拉长。勿发成中文「衣」。', hard: false },
    { id: 'ɜː', cat: 'long', symbol: '/ɜː/', name: '长元音 er', example: 'bird / her', tip: '舌中部抬起，嘴唇自然，类似「鹅」但更扁更长。', hard: true },
    { id: 'ɑː', cat: 'long', symbol: '/ɑː/', name: '长元音 ah', example: 'car / father', tip: '口张大，舌放平，音拉长。别发成「啊」带鼻音。', hard: false },
    { id: 'ɔː', cat: 'long', symbol: '/ɔː/', name: '长元音 or', example: 'door / law', tip: '双唇收圆向前，舌后缩。易与 /ɒ/ 混淆。', hard: true },
    { id: 'uː', cat: 'long', symbol: '/uː/', name: '长元音 oo', example: 'food / blue', tip: '双唇收圆突出，舌后抬。勿发成「乌」过短。', hard: false },

    // 短元音
    { id: 'ɪ', cat: 'short', symbol: '/ɪ/', name: '短元音 i', example: 'sit / ship', tip: '比 /iː/ 短且松。sheep≠ship 经典易错！', hard: true },
    { id: 'e', cat: 'short', symbol: '/e/', name: '短元音 e', example: 'bed / pen', tip: '口半开，舌前中。易与 /æ/ 混淆：bed≠bad。', hard: true },
    { id: 'æ', cat: 'short', symbol: '/æ/', name: '短元音 a', example: 'cat / bad', tip: '口张大、舌低前，像微笑说「啊」。中国学习者常发成 /e/。', hard: true },
    { id: 'ʌ', cat: 'short', symbol: '/ʌ/', name: '短元音 u', example: 'cup / love', tip: '口半开，舌中央。别发成 /ɑː/。', hard: false },
    { id: 'ɒ', cat: 'short', symbol: '/ɒ/', name: '短元音 o', example: 'hot / dog', tip: '口圆、舌后低。美音常发成 /ɑː/。', hard: false },
    { id: 'ʊ', cat: 'short', symbol: '/ʊ/', name: '短元音 oo短', example: 'book / put', tip: '比 /uː/ 短松。book≠boot。', hard: true },
    { id: 'ə', cat: 'short', symbol: '/ə/', name: '中元音 schwa', example: 'about / teacher', tip: '最常见弱读音，嘴唇放松，几乎不用力。', hard: true },

    // 双元音
    { id: 'eɪ', cat: 'diph', symbol: '/eɪ/', name: '双元音 ay', example: 'day / make', tip: '从 /e/ 滑向 /ɪ/，后半稍轻。', hard: false },
    { id: 'aɪ', cat: 'diph', symbol: '/aɪ/', name: '双元音 eye', example: 'my / time', tip: '从开到合，口型变化明显。', hard: false },
    { id: 'ɔɪ', cat: 'diph', symbol: '/ɔɪ/', name: '双元音 oy', example: 'boy / join', tip: '从圆唇 /ɔ/ 滑向 /ɪ/。', hard: false },
    { id: 'əʊ', cat: 'diph', symbol: '/əʊ/', name: '双元音 oh', example: 'go / home', tip: '从 /ə/ 滑向 /ʊ/。美音多为 /oʊ/。', hard: false },
    { id: 'aʊ', cat: 'diph', symbol: '/aʊ/', name: '双元音 ow', example: 'now / house', tip: '口从大到圆，勿发成单元音。', hard: false },
    { id: 'ɪə', cat: 'diph', symbol: '/ɪə/', name: '双元音 ear', example: 'here / near', tip: '英式常见；美式多发 /ɪr/。', hard: false },
    { id: 'eə', cat: 'diph', symbol: '/eə/', name: '双元音 air', example: 'hair / care', tip: '从 /e/ 滑向 /ə/。', hard: false },
    { id: 'ʊə', cat: 'diph', symbol: '/ʊə/', name: '双元音 ure', example: 'tour / pure', tip: '较少用；可弱化为 /ɔː/。', hard: false },

    // 清辅音
    { id: 'p', cat: 'voiceless', symbol: '/p/', name: '清辅音 p', example: 'pen / map', tip: '双唇紧闭后爆破，送气。', hard: false },
    { id: 't', cat: 'voiceless', symbol: '/t/', name: '清辅音 t', example: 'tea / cat', tip: '舌尖抵上齿龈后爆破。词尾勿加元音。', hard: false },
    { id: 'k', cat: 'voiceless', symbol: '/k/', name: '清辅音 k', example: 'key / back', tip: '舌后抵软腭爆破。', hard: false },
    { id: 'f', cat: 'voiceless', symbol: '/f/', name: '清辅音 f', example: 'fan / life', tip: '上齿轻咬下唇，送气。', hard: false },
    { id: 'θ', cat: 'voiceless', symbol: '/θ/', name: '清辅音 th清', example: 'think / bath', tip: '舌尖轻触上齿，送气。勿发成 /s/！', hard: true },
    { id: 's', cat: 'voiceless', symbol: '/s/', name: '清辅音 s', example: 'sun / miss', tip: '舌尖近上齿龈，气流窄缝。', hard: false },
    { id: 'ʃ', cat: 'voiceless', symbol: '/ʃ/', name: '清辅音 sh', example: 'she / fish', tip: '双唇略圆突出，类似「嘘」。', hard: false },
    { id: 'h', cat: 'voiceless', symbol: '/h/', name: '清辅音 h', example: 'hat / hello', tip: '声门轻送气，勿发成「喝」。', hard: false },
    { id: 'tʃ', cat: 'voiceless', symbol: '/tʃ/', name: '清辅音 ch', example: 'chair / watch', tip: '/t/+/ʃ/ 合成。勿拆开。', hard: false },
    { id: 'ts', cat: 'voiceless', symbol: '/ts/', name: '清辅音 ts', example: 'cats / students', tip: '词尾常见，轻快带过。', hard: false },
    { id: 'tr', cat: 'voiceless', symbol: '/tr/', name: '清辅音 tr', example: 'tree / try', tip: '舌尖抵齿龈后快速滑向 /r/。', hard: false },

    // 浊辅音
    { id: 'b', cat: 'voiced', symbol: '/b/', name: '浊辅音 b', example: 'book / cab', tip: '同 /p/ 但声带振动，送气弱。', hard: false },
    { id: 'd', cat: 'voiced', symbol: '/d/', name: '浊辅音 d', example: 'dog / bed', tip: '同 /t/ 但振动。词尾勿加元音。', hard: false },
    { id: 'g', cat: 'voiced', symbol: '/g/', name: '浊辅音 g', example: 'go / big', tip: '同 /k/ 但振动。', hard: false },
    { id: 'v', cat: 'voiced', symbol: '/v/', name: '浊辅音 v', example: 'very / love', tip: '同 /f/ 但振动。勿发成 /w/！', hard: true },
    { id: 'ð', cat: 'voiced', symbol: '/ð/', name: '浊辅音 th浊', example: 'this / mother', tip: '同 /θ/ 但振动。think≠this。', hard: true },
    { id: 'z', cat: 'voiced', symbol: '/z/', name: '浊辅音 z', example: 'zoo / busy', tip: '同 /s/ 但振动。', hard: false },
    { id: 'ʒ', cat: 'voiced', symbol: '/ʒ/', name: '浊辅音 zh', example: 'vision / usually', tip: '同 /ʃ/ 但振动。中文无此音。', hard: true },
    { id: 'dʒ', cat: 'voiced', symbol: '/dʒ/', name: '浊辅音 j', example: 'job / bridge', tip: '/d/+/ʒ/。勿发成「知」。', hard: false },
    { id: 'dz', cat: 'voiced', symbol: '/dz/', name: '浊辅音 dz', example: 'beds / words', tip: '词尾浊化复数。', hard: false },
    { id: 'dr', cat: 'voiced', symbol: '/dr/', name: '浊辅音 dr', example: 'dream / drive', tip: '浊化的 /tr/。', hard: false },
    { id: 'm', cat: 'voiced', symbol: '/m/', name: '鼻音 m', example: 'me / time', tip: '双唇闭，气流走鼻腔。', hard: false },
    { id: 'n', cat: 'voiced', symbol: '/n/', name: '鼻音 n', example: 'no / sun', tip: '舌尖抵上齿龈，鼻腔出气。', hard: false },
    { id: 'ŋ', cat: 'voiced', symbol: '/ŋ/', name: '鼻音 ng', example: 'sing / think', tip: '舌后抵软腭。勿加 /g/ 音。', hard: true },
    { id: 'l', cat: 'voiced', symbol: '/l/', name: '边音 l', example: 'like / feel', tip: '词尾 dark l 舌后抬。中国学习者常漏发。', hard: true },
    { id: 'r', cat: 'voiced', symbol: '/r/', name: '近音 r', example: 'red / car(美)', tip: '舌尖卷起不碰上颚。英式词尾常不卷。', hard: false },
    { id: 'j', cat: 'voiced', symbol: '/j/', name: '近音 y', example: 'yes / you', tip: '类似「衣」起音，立刻滑向后接元音。', hard: false },
    { id: 'w', cat: 'voiced', symbol: '/w/', name: '近音 w', example: 'we / what', tip: '双唇圆，勿与 /v/ 混淆。', hard: true }
  ]
};
