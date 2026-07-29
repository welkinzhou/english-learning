/** PETS-3 真题风格阅读理解 */
window.READING_DATA = {
  passages: [
    {
      id: 'r1',
      title: '阅读1 · 远程办公',
      difficulty: '基础',
      minutes: 6,
      text: `More and more companies allow employees to work from home. This change became especially popular after the pandemic. Working from home has clear advantages. People save time on commuting and can have a better balance between work and family life. Many workers say they feel less stressed and can concentrate better in a quiet environment.

However, remote work also brings problems. Some people find it hard to separate work from personal life. Without face-to-face communication, teamwork can become more difficult. Loneliness is another common complaint.

Experts suggest that a mixed model may be the best choice: employees work from home on some days and go to the office on others. In this way, people can enjoy flexibility while still keeping good relationships with colleagues.`,
      questions: [
        { id: 'r1q1', q: 'What is one advantage of working from home?', options: ['Longer commuting time', 'Better work-life balance', 'More face-to-face talks', 'More loneliness'], answer: 1 },
        { id: 'r1q2', q: 'What problem is mentioned about remote work?', options: ['Higher salary', 'Harder teamwork', 'Shorter working hours', 'Free lunch'], answer: 1 },
        { id: 'r1q3', q: 'What do experts suggest?', options: ['Never go to the office', 'Always work from home', 'A mixed working model', 'Stop using computers'], answer: 2 },
        { id: 'r1q4', q: 'The word "concentrate" is closest to _____.', options: ['sleep', 'focus', 'travel', 'complain'], answer: 1 }
      ]
    },
    {
      id: 'r2',
      title: '阅读2 · 塑料污染',
      difficulty: '基础',
      minutes: 6,
      text: `Plastic products are everywhere in daily life: bottles, bags, and packaging. They are cheap and useful, but they cause serious pollution. Plastic can stay in the environment for hundreds of years. Every year, millions of tons of plastic waste enter the ocean and harm sea animals.

Governments and organizations are trying to reduce plastic use. Some cities ban free plastic bags in shops. Many people now carry reusable bags and bottles. Recycling is also important, but it cannot solve the problem alone.

Scientists are developing new materials that can break down more easily. Still, the most effective action is to use less plastic. Small changes in daily habits can make a big difference if millions of people take part.`,
      questions: [
        { id: 'r2q1', q: 'Why is plastic pollution serious?', options: ['Plastic is expensive', 'Plastic lasts a very long time', 'Plastic is rare', 'Plastic is heavy'], answer: 1 },
        { id: 'r2q2', q: 'What have some cities done?', options: ['Banned free plastic bags', 'Stopped recycling', 'Closed all shops', 'Increased plastic production'], answer: 0 },
        { id: 'r2q3', q: 'According to the text, the most effective action is to _____.', options: ['buy more plastic', 'use less plastic', 'ignore the problem', 'only recycle paper'], answer: 1 },
        { id: 'r2q4', q: 'What are scientists developing?', options: ['Heavier plastics', 'Materials that break down more easily', 'More ocean waste', 'Free plastic bags'], answer: 1 }
      ]
    },
    {
      id: 'r3',
      title: '阅读3 · 终身学习',
      difficulty: '中等',
      minutes: 7,
      text: `In the past, many people believed that education ended after graduation. Today, that idea is no longer true. Technology and the job market change quickly, so lifelong learning has become necessary.

Lifelong learning means continuing to gain knowledge and skills throughout life. It can happen in many ways: online courses, workplace training, reading, or joining interest groups. Adults who keep learning are more likely to find better jobs and adapt to new challenges.

Some people worry that they are too old to learn. Research shows, however, that the brain can keep developing when we practice new skills. The key is curiosity and regular practice, not age.

Companies also benefit when employees keep learning. A learning culture helps organizations stay competitive and creative.`,
      questions: [
        { id: 'r3q1', q: 'Why is lifelong learning necessary?', options: ['Schools are closing', 'Jobs and technology change fast', 'Books are free', 'People live shorter lives'], answer: 1 },
        { id: 'r3q2', q: 'Lifelong learning can include _____.', options: ['only university degrees', 'online courses and reading', 'stopping work', 'avoiding new skills'], answer: 1 },
        { id: 'r3q3', q: 'What does research say about age and learning?', options: ['Old people cannot learn', 'Only children can learn', 'The brain can keep developing with practice', 'Learning stops at 30'], answer: 2 },
        { id: 'r3q4', q: 'How do companies benefit?', options: ['They pay less tax', 'They become more competitive', 'They need fewer workers', 'They close training programs'], answer: 1 }
      ]
    },
    {
      id: 'r4',
      title: '阅读4 · 城市与乡村',
      difficulty: '中等',
      minutes: 7,
      text: `Choosing where to live is an important decision. City life offers many opportunities: better jobs, hospitals, schools, and entertainment. Public transport is usually convenient, and people can enjoy museums, theaters, and restaurants.

However, cities are often crowded and noisy. Housing prices are high, and air quality can be poor. Many city residents feel stressed because of the fast pace of life.

Country life is quieter and closer to nature. The air is fresher, and neighbors may know each other better. On the other hand, rural areas may have fewer job choices and weaker public services.

There is no single best answer. Young people seeking careers often prefer cities, while families or retirees may enjoy the countryside. The right choice depends on personal needs and values.`,
      questions: [
        { id: 'r4q1', q: 'What is an advantage of city life?', options: ['Lower housing prices', 'More job opportunities', 'Less noise', 'Fresher air'], answer: 1 },
        { id: 'r4q2', q: 'What problem do cities often have?', options: ['No schools', 'Crowding and noise', 'No hospitals', 'Too much farmland'], answer: 1 },
        { id: 'r4q3', q: 'Who may prefer the countryside?', options: ['Only students', 'Families or retirees', 'All young workers', 'Nobody'], answer: 1 },
        { id: 'r4q4', q: 'The author’s attitude is _____.', options: ['completely for cities', 'completely for countryside', 'balanced', 'angry'], answer: 2 }
      ]
    },
    {
      id: 'r5',
      title: '阅读5 · 智能手机',
      difficulty: '中等',
      minutes: 7,
      text: `Smartphones have become essential tools for communication, study, and entertainment. Students can look up information instantly and join online classes. Workers can reply to emails anywhere. Navigation apps help people travel more easily.

Yet smartphones also create new problems. Many people check their phones too often and sleep less. Students may lose focus in class. Online information is not always reliable, so users need to think critically.

Parents and teachers often discuss screen time limits. Experts suggest setting phone-free periods, especially before bedtime. Using phones with a clear purpose—rather than endless scrolling—can help people enjoy benefits without losing control.

In short, smartphones are neither purely good nor purely bad. How we use them decides their effect on our lives.`,
      questions: [
        { id: 'r5q1', q: 'What can smartphones help students do?', options: ['Sleep more', 'Look up information quickly', 'Avoid classes', 'Stop reading'], answer: 1 },
        { id: 'r5q2', q: 'What problem is mentioned?', options: ['Phones are too cheap', 'People may sleep less', 'No navigation apps', 'Emails disappeared'], answer: 1 },
        { id: 'r5q3', q: 'What do experts suggest?', options: ['Use phones all night', 'Set phone-free periods', 'Believe all online news', 'Ban all apps'], answer: 1 },
        { id: 'r5q4', q: 'The main idea is that _____.', options: ['phones are always harmful', 'phones are always helpful', 'phone use determines the effect', 'phones will disappear'], answer: 2 }
      ]
    },
    {
      id: 'r6',
      title: '阅读6 · 志愿服务',
      difficulty: '提高',
      minutes: 8,
      text: `Volunteering means offering time and skills to help others without pay. In many countries, students and adults join volunteer activities in hospitals, schools, libraries, and environmental projects.

Volunteering benefits both society and volunteers themselves. Communities receive needed support, while volunteers gain experience, confidence, and a sense of purpose. Some young people also find that volunteering helps them choose a future career.

Of course, volunteering requires commitment. People should choose activities that match their abilities and available time. Training is sometimes necessary, especially when working with children or patients.

Schools and companies increasingly encourage volunteering. They believe that helping others builds responsibility and teamwork. Even one hour a week can create meaningful change.`,
      questions: [
        { id: 'r6q1', q: 'Volunteering means _____.', options: ['working for high pay', 'helping without pay', 'only planting trees', 'studying abroad'], answer: 1 },
        { id: 'r6q2', q: 'What can volunteers gain?', options: ['Only money', 'Experience and confidence', 'Less responsibility', 'No free time'], answer: 1 },
        { id: 'r6q3', q: 'What should people consider when choosing activities?', options: ['Only fashion', 'Ability and free time', 'Only salary', 'Only travel'], answer: 1 },
        { id: 'r6q4', q: 'Why do schools encourage volunteering?', options: ['To reduce homework', 'To build responsibility and teamwork', 'To cancel exams', 'To sell products'], answer: 1 }
      ]
    }
  ]
};
