/** PETS-3 听力训练（浏览器语音朗读 + 理解题，完全离线可用） */
window.LISTENING_DATA = {
  tip: '点击「播放听力」使用系统语音朗读；听完作答。也可查看文本复盘。',
  items: [
    {
      id: 'l1',
      title: '听力1 · 预约挂号',
      type: '短对话',
      script: `Woman: Good morning. I'd like to make an appointment with Doctor Smith.
Man: Certainly. Would Thursday afternoon be all right?
Woman: Thursday is fine. What time?
Man: How about three o'clock?
Woman: Perfect. Thank you.`,
      questions: [
        { id: 'l1q1', q: 'Who does the woman want to see?', options: ['A teacher', 'Doctor Smith', 'A dentist', 'A nurse'], answer: 1 },
        { id: 'l1q2', q: 'When is the appointment?', options: ['Tuesday morning', 'Thursday at 3:00', 'Friday evening', 'Monday at noon'], answer: 1 }
      ]
    },
    {
      id: 'l2',
      title: '听力2 · 问路',
      type: '短对话',
      script: `Man: Excuse me, how can I get to the train station?
Woman: Go straight along this street, then turn left at the traffic lights. The station is next to the post office.
Man: Is it far from here?
Woman: About ten minutes' walk.`,
      questions: [
        { id: 'l2q1', q: 'Where does the man want to go?', options: ['Post office', 'Train station', 'Hospital', 'School'], answer: 1 },
        { id: 'l2q2', q: 'How long will it take on foot?', options: ['Two minutes', 'Ten minutes', 'Half an hour', 'One hour'], answer: 1 }
      ]
    },
    {
      id: 'l3',
      title: '听力3 · 周末计划',
      type: '短对话',
      script: `Woman: What are you going to do this weekend?
Man: I plan to finish my report on Saturday, and visit my parents on Sunday.
Woman: Would you like to see a movie with me on Saturday evening?
Man: Sorry, I have to prepare for Monday's meeting. Maybe next week.`,
      questions: [
        { id: 'l3q1', q: 'What will the man do on Sunday?', options: ['See a movie', 'Visit his parents', 'Finish a report', 'Attend a meeting'], answer: 1 },
        { id: 'l3q2', q: 'Why does the man refuse the movie?', options: ['He dislikes movies', 'He must prepare for a meeting', 'He is traveling', 'Tickets are sold out'], answer: 1 }
      ]
    },
    {
      id: 'l4',
      title: '听力4 · 天气与出行',
      type: '短文',
      script: `Good morning. Here is today's weather report. It will be cloudy in the morning, and rain is expected in the afternoon. The highest temperature will be 18 degrees. If you plan to go out, please take an umbrella. Traffic may be slower than usual because of the rain. Drive carefully.`,
      questions: [
        { id: 'l4q1', q: 'What will the weather be like in the afternoon?', options: ['Sunny', 'Rainy', 'Snowy', 'Windy only'], answer: 1 },
        { id: 'l4q2', q: 'What should people take?', options: ['Sunglasses', 'An umbrella', 'A swimsuit', 'A map only'], answer: 1 },
        { id: 'l4q3', q: 'Why may traffic be slower?', options: ['A holiday', 'The rain', 'Road work only', 'A sports game'], answer: 1 }
      ]
    },
    {
      id: 'l5',
      title: '听力5 · 图书馆通知',
      type: '短文',
      script: `Attention, please. The school library will change its opening hours next week. From Monday to Friday, it will open from 8 a.m. to 9 p.m. On weekends, it will open from 9 a.m. to 5 p.m. Students must show their library cards when borrowing books. Please return overdue books as soon as possible.`,
      questions: [
        { id: 'l5q1', q: 'When does the library close on weekdays next week?', options: ['5 p.m.', '8 p.m.', '9 p.m.', '10 p.m.'], answer: 2 },
        { id: 'l5q2', q: 'What must students show to borrow books?', options: ['ID card', 'Library card', 'Passport', 'Ticket'], answer: 1 },
        { id: 'l5q3', q: 'What are students asked to do?', options: ['Buy more books', 'Return overdue books', 'Close the library', 'Study outside'], answer: 1 }
      ]
    },
    {
      id: 'l6',
      title: '听力6 · 求职面试',
      type: '短对话',
      script: `Woman: Why do you want to work in our company?
Man: Because I am interested in marketing, and your company is a leader in this field. I also hope to use my English skills here.
Woman: Do you have any work experience?
Man: Yes. I worked as an assistant in a trading company for one year.`,
      questions: [
        { id: 'l6q1', q: 'What field is the man interested in?', options: ['Medicine', 'Marketing', 'Teaching', 'Law'], answer: 1 },
        { id: 'l6q2', q: 'How long did he work as an assistant?', options: ['One month', 'One year', 'Two years', 'Five years'], answer: 1 }
      ]
    },
    {
      id: 'l7',
      title: '听力7 · 健康建议',
      type: '短文',
      script: `Many people feel tired because of long working hours and little exercise. Doctors suggest three simple habits. First, sleep at least seven hours every night. Second, walk for thirty minutes each day. Third, eat more vegetables and less junk food. Small changes can improve your energy within a few weeks.`,
      questions: [
        { id: 'l7q1', q: 'How much sleep do doctors suggest?', options: ['Four hours', 'At least seven hours', 'Ten hours only', 'No sleep'], answer: 1 },
        { id: 'l7q2', q: 'How long should people walk each day?', options: ['10 minutes', '20 minutes', '30 minutes', '2 hours'], answer: 2 },
        { id: 'l7q3', q: 'What food advice is given?', options: ['More junk food', 'More vegetables', 'Only meat', 'No breakfast'], answer: 1 }
      ]
    },
    {
      id: 'l8',
      title: '听力8 · 旅游咨询',
      type: '短对话',
      script: `Man: I'd like some information about the city tour.
Woman: Sure. The tour starts at nine in the morning and ends at about four in the afternoon. It includes lunch and a guide.
Man: How much does it cost?
Woman: Thirty-five pounds per person. Children under twelve pay half price.`,
      questions: [
        { id: 'l8q1', q: 'When does the tour start?', options: ['8 a.m.', '9 a.m.', '4 p.m.', 'Noon'], answer: 1 },
        { id: 'l8q2', q: 'What is included?', options: ['Hotel only', 'Lunch and a guide', 'Flight tickets', 'Shopping coupons'], answer: 1 },
        { id: 'l8q3', q: 'How much for an adult?', options: ['£12', '£35', '£70', 'Free'], answer: 1 }
      ]
    }
  ]
};
