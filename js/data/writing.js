/** PETS-3 作文范文与写作练习 */
window.WRITING_DATA = {
  tips: [
    '审题：明确体裁（书信/议论文/记叙），抓住关键词。',
    '结构：开头点题 → 中间 2–3 点展开 → 结尾总结。',
    '字数：公三写作一般 100 词以上，建议 120–150。',
    '卷面：简单句写对，再用 and/but/because/however 连接。'
  ],
  topics: [
    {
      id: 'wr1',
      title: '书面表达1 · 邀请信',
      type: '应用文',
      prompt: '你朋友李华下周过生日。写一封信邀请他来你家参加聚会，说明时间、地点和活动安排。',
      outline: ['说明写信目的：邀请', '时间地点', '活动内容', '期待回复'],
      model: `Dear Li Hua,

I am writing to invite you to my birthday party next Saturday. It will begin at 6 p.m. at my home.

We will have a big dinner and then play some games. There will also be a birthday cake. I am sure we will have a wonderful time together.

Please let me know if you can come. I look forward to seeing you.

Yours,
Zhang Wei`
    },
    {
      id: 'wr2',
      title: '书面表达2 · 建议信',
      type: '应用文',
      prompt: '你的笔友英语听力较差。给他写一封信，提出至少两条提高听力的建议。',
      outline: ['表示理解与鼓励', '建议1：每天听短音频', '建议2：跟读与复述', '结尾鼓励'],
      model: `Dear Tom,

I am sorry to hear that you find English listening difficult. Here are two suggestions for you.

First, listen to short English audio for about fifteen minutes every day. Second, try to repeat after the speaker and retell what you hear. Practice makes progress.

I believe you will improve soon if you keep practicing. Good luck!

Yours,
Li Ming`
    },
    {
      id: 'wr3',
      title: '书面表达3 · 环境保护',
      type: '议论文',
      prompt: '以 “Protecting the Environment” 为题，谈谈为什么要保护环境，以及个人能做什么。',
      outline: ['点明环境重要', '原因：健康与未来', '个人行动：节约、回收', '总结号召'],
      model: `Protecting the Environment

Protecting the environment is important for everyone. A clean environment keeps us healthy and also helps future generations.

Pollution from cars and plastic waste is becoming more serious. If we do nothing, our life quality will fall.

As individuals, we can take buses more often, use fewer plastic bags, and recycle waste. Small actions can make a big difference.

In conclusion, we should all take responsibility for protecting the environment.`
    },
    {
      id: 'wr4',
      title: '书面表达4 · 网络学习',
      type: '议论文',
      prompt: '谈谈网络学习的优点与不足，并给出你的看法。',
      outline: ['引出话题', '优点：灵活方便', '不足：自律与互动', '个人观点'],
      model: `Online Learning

Online learning has become popular in recent years. It allows students to study anytime and anywhere.

One advantage is flexibility. People can choose courses according to their needs and save time on commuting. However, online learning also has disadvantages. Some students lack self-discipline, and there is less face-to-face communication.

In my opinion, online learning is useful, but it works best when combined with classroom study.`
    },
    {
      id: 'wr5',
      title: '书面表达5 · 健康生活方式',
      type: '说明文',
      prompt: '写一篇短文介绍如何保持健康，至少写出三条建议。',
      outline: ['主题句', '饮食', '运动', '睡眠/心态', '总结'],
      model: `How to Keep Healthy

Health is more important than wealth. Here are some useful tips.

First, eat more vegetables and fruit, and drink enough water. Second, exercise at least three times a week. Third, sleep early and try to reduce stress by listening to music or talking with friends.

If we follow these habits, we can keep healthy and enjoy life more.`
    },
    {
      id: 'wr6',
      title: '书面表达6 · 通知',
      type: '应用文',
      prompt: '英语角活动：本周五晚 7 点在教学楼 301，主题为 Travel。写一则通知。',
      outline: ['活动名称与目的', '时间地点', '主题与对象', '欢迎参加'],
      model: `Notice

In order to improve students' spoken English, an English Corner will be held at 7 p.m. this Friday in Room 301 of the teaching building.

The topic is Travel. All students who are interested are welcome to join us and share your ideas.

The Students' Union
Monday`
    },
    {
      id: 'wr7',
      title: '书面表达7 · 求职信片段',
      type: '应用文',
      prompt: '应聘公司销售助理。写一封求职信，介绍教育背景、能力与求职意愿。',
      outline: ['获知招聘信息', '教育与能力', '相关经历', '希望面试'],
      model: `Dear Sir or Madam,

I am writing to apply for the position of sales assistant advertised in the newspaper.

I graduated from a business college and I am good at English communication. Last summer I worked as an assistant in a trading company, so I have some relevant experience.

I would be grateful if you could give me an interview. I look forward to your reply.

Yours faithfully,
Wang Fang`
    },
    {
      id: 'wr8',
      title: '书面表达8 · 城市生活',
      type: '议论文',
      prompt: '有人喜欢城市，有人喜欢乡村。谈谈你的选择并说明理由。',
      outline: ['表明选择', '理由1', '理由2', '让步一句', '总结'],
      model: `City Life or Country Life?

I prefer city life. First, cities provide more job opportunities and better schools. Second, public transport and hospitals are more convenient.

Of course, the countryside is quieter and the air is fresher. However, for a young person like me, development opportunities matter more.

Therefore, I would rather live in the city at present.`
    }
  ]
};
