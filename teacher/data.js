// data.js

const lessonObjectives = {
  // Unit 1: Animals 动物
  'U1L1': {

    title: 'Unit 1 Lesson 1: This is a bear.',
    vocabulary: [
      { word: 'animal', chinese: '动物' },
      { word: 'bear', chinese: '熊' },
      { word: 'horse', chinese: '马' },
      { word: 'bird', chinese: '鸟' },
      { word: 'panda', chinese: '熊猫' }
    ],
    sentences: [
      { en: 'This is a bear.', cn: '这是一只熊。' },
      { en: 'That is a panda.', cn: '那是一只熊猫。' },
      { en: "It's big.", cn: '它很大。' },
      { en: "It's cute.", cn: '它很可爱。' }
    ],
    objectives: [
      '能听懂并认读5个动物单词',
      '能用This is.../That is...介绍动物',
      '能用It\'s...描述动物特征'
    ],

    moduleObjectives: {
        listening: ['能听懂并辨认本课的核心动物词汇', '能根据录音选择正确的图片与对应场景'],
        reading: ['能认读本课的核心动物词汇', '能理解简单句子含义并完成图文匹配'],
        writing: ['能正确拼写核心动物单词', '能补全简单句子强化拼写记忆'],
        speaking: ['能正确朗读核心动物词汇', '能跟读核心句型并进行简单的口语问答']
    }
  },
  'U1L2': {

    title: 'Unit 1 Lesson 2: These are pandas.',
    vocabulary: [
      { word: 'small', chinese: '小的' },
      { word: 'ear', chinese: '耳朵' },
      { word: 'eye', chinese: '眼睛' },
      { word: 'baby', chinese: '宝宝' },
      { word: 'long', chinese: '长的' },
      { word: 'leg', chinese: '腿' },
      { word: 'these', chinese: '这些' },
      { word: 'those', chinese: '那些' }
    ],
    sentences: [
      { en: 'These are pandas. They have small ears and black eyes.', cn: '这些是熊猫。它们有小耳朵和黑眼睛。' },
      { en: 'Those are horses. They are brown. They have long legs.', cn: '那些是马。它们是棕色的。它们有长腿。' },
      { en: 'They like grass.', cn: '它们喜欢吃草。' },
      { en: 'Look, baby pandas. They are lovely.', cn: '看，熊猫宝宝。它们很可爱。' },
      { en: "Let's ride a horse.", cn: '我们骑马吧。' }
    ],
    objectives: [
      '能听懂并认读small, ear, eye, baby, long, leg等词汇',
      '能用These are.../Those are...介绍动物',
      '能用They have...描述动物特征'
    ],

    moduleObjectives: {
        listening: ['能听懂These/Those的区别用法', '能根据描述判断是哪种动物'],
        reading: ['能认读these, those等指示代词', '能理解动物特征描述句子'],
        writing: ['能正确拼写ear, eye, leg等身体部位单词', '能排列组合These are.../Those are...句型'],
        speaking: ['能朗读These are pandas等句子', '能跟读动物特征描述句']
    }
  },
  'U1L3': {

    title: 'Unit 1 Lesson 3: I have an animal friend.',
    vocabulary: [
      { word: 'jump', chinese: '跳' },
      { word: 'mouth', chinese: '嘴巴' },
      { word: 'meat', chinese: '肉' },
      { word: 'tiger', chinese: '老虎' },
      { word: 'no', chinese: '不' },
      { word: 'rabbit', chinese: '兔子' },
      { word: 'carrot', chinese: '胡萝卜' }
    ],
    sentences: [
      { en: 'I have an animal friend. Please guess!', cn: '我有一个动物朋友。请你猜！' },
      { en: 'Is it a rabbit? Yes, it is.', cn: '它是兔子吗？是的。' },
      { en: "Is it a cat? No, it isn't. It's a tiger!", cn: '它是猫吗？不，不是。它是老虎！' },
      { en: 'I can jump. My mouth is small. I like carrots.', cn: '我会跳。我的嘴巴小。我喜欢胡萝卜。' },
      { en: 'I can run fast. My mouth is big. I like meat.', cn: '我跑得很快。我的嘴巴大。我喜欢吃肉。' }
    ],
    objectives: [
      '能听懂并认读jump, mouth, meat, tiger, rabbit, carrot等词汇',
      '能用Is it a...?提问并回答Yes/No',
      '能用I can.../My mouth is.../I like...描述动物特征'
    ],

    moduleObjectives: {
        listening: ['能听懂动物特征描述并猜出动物', '能听懂Is it a...?问答句型'],
        reading: ['能认读动物猜谜的描述句', '能理解Yes, it is./No, it isn\'t.的含义'],
        writing: ['能拼写jump, mouth, meat等核心词汇', '能排列组合动物描述句子'],
        speaking: ['能朗读动物猜谜对话', '能跟读I can jump./I like carrots.等句子']
    }
  },
  'U1L4': {

    title: 'Unit 1 Lesson 4: Look! It\'s a cat.',
    vocabulary: [
      { word: 'draw', chinese: '画' },
      { word: 'nose', chinese: '鼻子' },
      { word: 'face', chinese: '脸' },
      { word: 'eye', chinese: '眼睛' },
      { word: 'ear', chinese: '耳朵' },
      { word: 'mouth', chinese: '嘴巴' }
    ],
    sentences: [
      { en: "Let's draw together!", cn: '我们一起画画吧！' },
      { en: 'This is a face. These are two eyes.', cn: '这是一张脸。这些是两只眼睛。' },
      { en: 'That is a face. Those are two eyes.', cn: '那是一张脸。那些是两只眼睛。' },
      { en: "Look! It's a cat.", cn: '看！是一只猫。' },
      { en: 'These are two ears. This is a nose and a mouth.', cn: '这些是两只耳朵。这是一个鼻子和一张嘴。' },
      { en: "Is it a panda? No, it isn't.", cn: '它是熊猫吗？不，不是。' }
    ],
    objectives: [
      '能听懂并认读draw, nose, face, eye, ear, mouth等词汇',
      '能用This is.../These are...描述五官',
      '能用That is.../Those are...描述五官'
    ],

    moduleObjectives: {
        listening: ['能听懂五官部位单词', '能根据描述判断画的是什么动物'],
        reading: ['能认读face, eye, ear, nose, mouth等词', '能理解This/These和That/Those的区别'],
        writing: ['能正确拼写五官单词', '能排列组合描述五官的句子'],
        speaking: ['能朗读Let\'s draw together!等句子', '能跟读五官描述句']
    }
  },
  // Unit 2: Colors 颜色
  'U2L1': {

    title: "Unit 2 Lesson 1: What size do you wear?",
    vocabulary: [
      { word: 'T-shirt', chinese: 'T恤' },
      { word: 'wear', chinese: '穿戴' },
      { word: 'big', chinese: '大的' },
      { word: 'small', chinese: '小的' }
    ],
    sentences: [
      { en: "What size do you wear?", cn: '你穿多大码？' },
      { en: "It's too big.", cn: '它太大了。' }
    ],
    objectives: [
      "能听懂并认读4个单词",
      "能用常用句型交流",
      "掌握相关模块应用"
    ],
    moduleObjectives: {
        "listening": ["能听懂衣服尺码及评价大小的表达", "根据录音选择对应的衣服图片"],
        "reading": ["能认读 T-shirt, size, big, small 等词句", "能将短语句子与服饰及动物特征图匹配"],
        "writing": ["能拼写常用衣物和形容词词汇", "补全What size... 句式"],
        "speaking": ["能朗读并对话询问衣服尺码", "能口头表达 It's too big/small"]
    }
  },
  'U2L2': {

    title: "Unit 2 Lesson 2: Whose shirt is this?",
    vocabulary: [
      { word: 'shirt', chinese: '衬衫' },
      { word: 'jacket', chinese: '夹克' },
      { word: 'whose', chinese: '谁的' },
      { word: 'clothes', chinese: '衣服' }
    ],
    sentences: [
      { en: "Whose shirt is this?", cn: '这是谁的衬衫？' },
      { en: "It's Yang Ming's shirt.", cn: '它是杨明的衬衫。' }
    ],
    objectives: [
      "能听懂并认读4个单词",
      "能用常用句型交流",
      "掌握相关模块应用"
    ],
    moduleObjectives: {
        "listening": ["能听懂询问物品归属的表达", "能根据录音选择对应的衣物"],
        "reading": ["能认读 shirt, jacket 等词", "理解 Whose...is this? 含义"],
        "writing": ["能拼写 shirt, jacket 等单词", "会写物品归属短语"],
        "speaking": ["能用口语询问物品主人", "能礼貌表达感谢"]
    }
  },
  'U2L3': {

    title: "Unit 2 Lesson 3: Where is my sweater?",
    vocabulary: [
      { word: 'sweater', chinese: '毛衣' },
      { word: 'bed', chinese: '床' },
      { word: 'chair', chinese: '椅子' },
      { word: 'schoolbag', chinese: '书包' }
    ],
    sentences: [
      { en: "Where is my sweater?", cn: '我的毛衣在哪里？' },
      { en: "Look! Your sweater is in your schoolbag!", cn: '看！你的毛衣在书包里！' }
    ],
    objectives: [
      "能听懂并认读4个单词",
      "能用常用句型交流",
      "掌握相关模块应用"
    ],
    moduleObjectives: {
        "listening": ["能听懂表示位置的介词短语", "根据录音匹配房间陈设"],
        "reading": ["能认读 sweater, bed, chair, schoolbag等词", "能理解表示方位的句子"],
        "writing": ["能拼写房间家具及方位词", "能书写方位问答句子"],
        "speaking": ["能口头询问物品位置", "能用在/下/里描述位置"]
    }
  },
  'U2L4': {

    title: "Unit 2 Lesson 4: Put on your sports shoes.",
    vocabulary: [
      { word: 'sports shoes', chinese: '运动鞋' },
      { word: 'shorts', chinese: '短裤' },
      { word: 'skirt', chinese: '裙子' },
      { word: 'shoe', chinese: '鞋子' }
    ],
    sentences: [
      { en: "Put on your sports shoes.", cn: '穿上你的运动鞋。' },
      { en: "I want my sports shoes, too.", cn: '我也想要我的运动鞋。' }
    ],
    objectives: [
      "能听懂并认读4个单词",
      "能用常用句型交流",
      "掌握相关模块应用"
    ],
    moduleObjectives: {
        "listening": ["能听懂下达穿戴衣物的指令", "能听懂衣物搭配表达"],
        "reading": ["能认读 sports shoes, shorts, skirt等", "理解 Put on... 祈使句"],
        "writing": ["能拼写常见下装及鞋类单词", "能拼写简单的衣物名称"],
        "speaking": ["能发出穿衣服的指令", "能描述自己想要穿什么"]
    }
  },
  // Unit 3: Numbers 数字
  'U3L1': {

    title: "Unit 3 Lesson 1: It's eleven o'clock in Beijing.",
    vocabulary: [
      { word: 'clock', chinese: '时钟' },
      { word: 'eleven', chinese: '十一' },
      { word: 'twelve', chinese: '十二' },
      { word: 'time', chinese: '时间' }
    ],
    sentences: [
      { en: "What's the time, Mom?", cn: '几点了，妈妈？' },
      { en: "It's eleven o'clock.", cn: '十一点钟了。' }
    ],
    objectives: [
      "能听懂并认读4个单词",
      "能用常用句型交流",
      "掌握相关模块应用"
    ],
    moduleObjectives: {
        "listening": ["能听懂整点时间的英文表达", "能根据录音选择正确的时钟"],
        "reading": ["能认读 clock及数字11、12等", "能理解时区及时间差异"],
        "writing": ["能拼写 time, clock等基础时间词汇", "能根据钟面写出时间"],
        "speaking": ["能口头提问并回答时间", "能报出整点时间"]
    }
  },
  'U3L2': {

    title: "Unit 3 Lesson 2: What's the time in New York?",
    vocabulary: [
      { word: 'read', chinese: '阅读' },
      { word: 'watch TV', chinese: '看电视' },
      { word: 'kid', chinese: '小孩' },
      { word: 'three', chinese: '三' }
    ],
    sentences: [
      { en: "What's the time in New York?", cn: '纽约现在几点？' },
      { en: "I'm reading.", cn: '我正在读书。' }
    ],
    objectives: [
      "能听懂并认读4个单词",
      "能用常用句型交流",
      "掌握相关模块应用"
    ],
    moduleObjectives: {
        "listening": ["能听懂带有地名的时间提问", "听懂现在进行时动作"],
        "reading": ["能认读 read, watch TV等动作词组", "能理解正在发生的行为讲述"],
        "writing": ["能拼写动作相关动词", "能写出现进行时的句子"],
        "speaking": ["能进行跨时区对话角色扮演", "能说出自己正在做的事"]
    }
  },
  'U3L3': {

    title: "Unit 3 Lesson 3: It's five twenty.",
    vocabulary: [
      { word: 'cook', chinese: '做饭' },
      { word: 'dinner', chinese: '晚餐' },
      { word: 'draw', chinese: '画画' },
      { word: 'twenty', chinese: '二十' }
    ],
    sentences: [
      { en: "What are you doing?", cn: '你在做什么？' },
      { en: "I'm cooking.", cn: '我在做饭。' }
    ],
    objectives: [
      "能听懂并认读4个单词",
      "能用常用句型交流",
      "掌握相关模块应用"
    ],
    moduleObjectives: {
        "listening": ["能听懂非整点时间", "能听懂做饭、吃饭等日常动词"],
        "reading": ["认读 cook, dinner及十三到二十等数字", "区分各种正在进行的动作"],
        "writing": ["能拼写常用数字", "能用现在进行时造短句"],
        "speaking": ["能流利报出具体时分", "能回答 What are you doing?"]
    }
  },
  'U3L4': {

    title: "Unit 3 Lesson 4: It's time to do my homework.",
    vocabulary: [
      { word: 'homework', chinese: '作业' },
      { word: 'sleep', chinese: '睡觉' },
      { word: 'picture', chinese: '图片' },
      { word: 'play', chinese: '玩耍' }
    ],
    sentences: [
      { en: "It's time to do my homework.", cn: '该做作业了。' },
      { en: "It's time to go to bed.", cn: '该上床睡觉了。' }
    ],
    objectives: [
      "能听懂并认读4个单词",
      "能用常用句型交流",
      "掌握相关模块应用"
    ],
    moduleObjectives: {
        "listening": ["能听懂该做什么事的句型表达", "听懂如睡觉、做作业的指令"],
        "reading": ["能认读 homework, play等", "能理解 It's time to... 句型"],
        "writing": ["能拼写 homework 等词汇", "能根据时间表写动作安排"],
        "speaking": ["能用 It's time to... 提示他人", "能描述自己的作息"]
    }
  },
  // Unit 4: Family 家庭
  'U4L1': {

    title: "Unit 4 Lesson 1: What do you like for breakfast?",
    vocabulary: [
      { word: 'milk', chinese: '牛奶' },
      { word: 'bread', chinese: '面包' },
      { word: 'egg', chinese: '鸡蛋' },
      { word: 'noodle', chinese: '面条' }
    ],
    sentences: [
      { en: "I'm hungry.", cn: '我饿了。' },
      { en: "What do you like for breakfast?", cn: '你早饭喜欢吃什么？' }
    ],
    objectives: [
      "能听懂并认读4个单词",
      "能用常用句型交流",
      "掌握相关模块应用"
    ],
    moduleObjectives: {
        "listening": ["能听懂早餐食物词汇", "听懂有关饥饿及喜好的询问"],
        "reading": ["能认读 milk, bread, egg, noodle等", "能理解对于喜好的问答语"],
        "writing": ["能拼写四种以上基础食物", "能补全早餐喜好句型"],
        "speaking": ["能口头说出自己喜欢的早餐", "能表达我饿了"]
    }
  },
  'U4L2': {

    title: "Unit 4 Lesson 2: Do you want some apple juice?",
    vocabulary: [
      { word: 'hamburger', chinese: '汉堡' },
      { word: 'salad', chinese: '沙拉' },
      { word: 'apple juice', chinese: '苹果汁' },
      { word: 'lunch', chinese: '午餐' }
    ],
    sentences: [
      { en: "What do you want to eat?", cn: '你想吃什么？' },
      { en: "Do you want some apple juice?", cn: '你想要些苹果汁吗？' }
    ],
    objectives: [
      "能听懂并认读4个单词",
      "能用常用句型交流",
      "掌握相关模块应用"
    ],
    moduleObjectives: {
        "listening": ["能听懂饮料种类和午餐食物词汇", "能听懂别人对于点单的确认语"],
        "reading": ["能认读 hamburger, salad, juice等词", "能分辨需要什么和吃什么的表达差异"],
        "writing": ["能拼写果汁及西式快餐单词", "能书写点单需求句子"],
        "speaking": ["能用口语点单食物和饮料", "能得体应答他人的询问"]
    }
  },
  'U4L3': {

    title: "Unit 4 Lesson 3: What's your favorite drink?",
    vocabulary: [
      { word: 'orange juice', chinese: '橙汁' },
      { word: 'banana', chinese: '香蕉' },
      { word: 'water', chinese: '水' },
      { word: 'fruit', chinese: '水果' }
    ],
    sentences: [
      { en: "What's your favorite drink?", cn: '你最喜欢的饮料是什么？' },
      { en: "I like bananas.", cn: '我喜欢香蕉。' }
    ],
    objectives: [
      "能听懂并认读4个单词",
      "能用常用句型交流",
      "掌握相关模块应用"
    ],
    moduleObjectives: {
        "listening": ["能听懂最喜爱事物的句点询问", "听懂水果词汇"],
        "reading": ["能认读 favorite, fruit, orange, banana", "能理解喜好强度的描述"],
        "writing": ["能拼写水果名词及 sweet 等形容词", "能用 favorite 造句"],
        "speaking": ["能口语交流最喜欢的食物", "能赞美食物味道"]
    }
  },
  'U4L4': {

    title: "Unit 4 Lesson 4: What's for dinner?",
    vocabulary: [
      { word: 'rice', chinese: '米饭' },
      { word: 'soup', chinese: '汤' },
      { word: 'chicken', chinese: '鸡肉' },
      { word: 'vegetable', chinese: '蔬菜' }
    ],
    sentences: [
      { en: "What's for dinner today?", cn: '今天晚饭吃什么？' },
      { en: "How about some Chinese food?", cn: '来点中餐怎么样？' }
    ],
    objectives: [
      "能听懂并认读4个单词",
      "能用常用句型交流",
      "掌握相关模块应用"
    ],
    moduleObjectives: {
        "listening": ["能听懂中餐及晚餐特色食物", "能听懂征求意见的句式"],
        "reading": ["能认读 rice, soup, chicken, vegetable", "能读懂晚餐有关的小短文"],
        "writing": ["能熟练拼写多类肉类及蔬菜单词", "能罗列出丰盛的晚餐清单"],
        "speaking": ["能用口语报出中餐菜名", "能询问今晚吃什么"]
    }
  }
};

const observationGroups = [
  [
    {id: 1, name: '张宇豪'}, {id: 2, name: '张佳寒'}, {id: 3, name: '张睿渊'}, 
    {id: 4, name: '张羽韬'}, {id: 5, name: '张美茹'}, {id: 6, name: '张嘉钦'}, 
    {id: 7, name: '卢梦婷'}
  ],
  [
    {id: 8, name: '张悦萱'}, {id: 9, name: '张语涵'}, {id: 10, name: '张英豪'}, 
    {id: 11, name: '张志鹏'}, {id: 12, name: '张智杰'}, {id: 13, name: '张梓婷'}, 
    {id: 14, name: '张品琪'}
  ],
  [
    {id: 15, name: '张诺依'}, {id: 16, name: '张雨泽'}, {id: 17, name: '张依彤'}, 
    {id: 18, name: '张艺楠'}, {id: 19, name: '张思彤'}, {id: 20, name: '张子豪'}, 
    {id: 21, name: '张梓亦'}
  ],
  [
    {id: 22, name: '张皓鑫'}, {id: 23, name: '张雨欣'}, {id: 24, name: '张如欣'}, 
    {id: 25, name: '张柏涵'}, {id: 26, name: '张梓纯'}, {id: 27, name: '张泽鑫'}
  ]
];

// Calculate which group is active based on the day of the year
function getTodayObservationGroup() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    return observationGroups[dayOfYear % 4];
}
