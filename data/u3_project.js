/**
 * u3_project.js — U3 我的一天 Project
 * 所有词汇严格来自三年级下册U3课本
 * 分区：早上 / 上午 / 下午 / 晚上
 */
var u3_project = {
    id: "U3P",
    title: "我的一天",
    emoji: "⏰",
    welcome: {
        role: "时间管理员",
        message: "欢迎来安排你的一天！从早上到晚上，看看每个时间段都在做什么，用英文记录下来！"
    },

    zones: [
        {
            id: "morning", name: "早上", emoji: "🌅",
            bgGradient: "linear-gradient(180deg,#FFE082,#FFF8E1)",
            story: "新的一天开始了！早上都在做什么？",
            animals: [
                { id: "clock_7", word: "seven o'clock", image: "assets/images/clock.png", label: "七点",
                  descriptions: [
                    { chinese: "起床时间", english: "It's time to get up." },
                    { chinese: "去上学", english: "It's time to go to school." }
                  ]
                }
            ],
            distractorAnimals: ["twelve o'clock", "three o'clock", "nine o'clock"],
            decorations: [
                { emoji: "1️⃣", word: "one" }, { emoji: "2️⃣", word: "two" },
                { emoji: "3️⃣", word: "three" }
            ],
            rareDecoration: { emoji: "⭐", word: "star" },
            sentenceFills: [
                { sentence: "It's time to get ___.", blank: "up", chinese: "该起床了。", options: ["up", "go", "bed", "school"], animalId: "clock_7" },
                { sentence: "It's time to go to ___.", blank: "school", chinese: "该去上学了。", options: ["school", "bed", "home", "play"], animalId: "clock_7" },
                { sentence: "It's ___ o'clock.", blank: "seven", chinese: "现在七点。", options: ["seven", "three", "twelve", "nine"], animalId: "clock_7" }
            ]
        },
        {
            id: "late_morning", name: "上午", emoji: "☀️",
            bgGradient: "linear-gradient(180deg,#B3E5FC,#E1F5FE)",
            story: "在学校里，大家在做什么？",
            animals: [
                { id: "reading_act", word: "reading", image: "assets/images/reading.png", label: "读书",
                  descriptions: [
                    { chinese: "在读书", english: "I'm reading." },
                    { chinese: "现在几点", english: "What's the time?" }
                  ]
                },
                { id: "drawing_act", word: "drawing", image: "assets/images/drawing.png", label: "画画",
                  descriptions: [
                    { chinese: "在画画", english: "I'm drawing." },
                    { chinese: "在画画吗", english: "Is she drawing?" }
                  ]
                }
            ],
            distractorAnimals: ["cooking", "sleeping", "writing"],
            decorations: [
                { emoji: "4️⃣", word: "four" }, { emoji: "5️⃣", word: "five" },
                { emoji: "6️⃣", word: "six" }
            ],
            rareDecoration: { emoji: "🌸", word: "flower" },
            sentenceFills: [
                { sentence: "I'm ___.", blank: "reading", chinese: "我在读书。", options: ["reading", "drawing", "cooking", "sleeping"], animalId: "reading_act" },
                { sentence: "What's the ___?", blank: "time", chinese: "现在几点了？", options: ["time", "name", "this", "that"], animalId: "reading_act" },
                { sentence: "Is she ___?", blank: "drawing", chinese: "她在画画吗？", options: ["drawing", "reading", "cooking", "sleeping"], animalId: "drawing_act" }
            ]
        },
        {
            id: "afternoon", name: "下午", emoji: "🌆",
            bgGradient: "linear-gradient(180deg,#C8E6C9,#DCEDC8)",
            story: "下午放学了，做点什么好呢？",
            animals: [
                { id: "play_act", word: "playing", image: "assets/images/play.png", label: "玩耍",
                  descriptions: [
                    { chinese: "在玩", english: "I'm playing." },
                    { chinese: "该玩了", english: "It's time to play." }
                  ]
                },
                { id: "homework_act", word: "homework", image: "assets/images/homework.png", label: "作业",
                  descriptions: [
                    { chinese: "做作业", english: "It's time to do my homework." },
                    { chinese: "在做作业", english: "I'm doing my homework." }
                  ]
                }
            ],
            distractorAnimals: ["reading", "sleeping", "drawing"],
            decorations: [
                { emoji: "7️⃣", word: "seven" }, { emoji: "8️⃣", word: "eight" },
                { emoji: "9️⃣", word: "nine" }
            ],
            rareDecoration: { emoji: "⭐", word: "star" },
            sentenceFills: [
                { sentence: "I'm ___.", blank: "playing", chinese: "我在玩耍。", options: ["playing", "reading", "cooking", "drawing"], animalId: "play_act" },
                { sentence: "It's time to ___.", blank: "play", chinese: "该玩了。", options: ["play", "read", "cook", "sleep"], animalId: "play_act" },
                { sentence: "It's time to do my ___.", blank: "homework", chinese: "该做作业了。", options: ["homework", "reading", "drawing", "playing"], animalId: "homework_act" }
            ]
        },
        {
            id: "evening", name: "晚上", emoji: "🌙",
            bgGradient: "linear-gradient(180deg,#90CAF9,#BBDEFB)",
            story: "天黑了，晚上做什么呢？",
            animals: [
                { id: "cooking_act", word: "cooking", image: "assets/images/cooking.png", label: "做饭",
                  descriptions: [
                    { chinese: "在做饭", english: "I'm cooking." },
                    { chinese: "该吃晚饭了", english: "It's time for dinner." }
                  ]
                },
                { id: "sleeping_act", word: "sleeping", image: "assets/images/sleeping.png", label: "睡觉",
                  descriptions: [
                    { chinese: "该睡觉了", english: "It's time to go to bed." },
                    { chinese: "在睡觉吗", english: "Are you sleeping?" }
                  ]
                }
            ],
            distractorAnimals: ["reading", "playing", "drawing"],
            decorations: [
                { emoji: "🔟", word: "ten" }, { emoji: "⭐", word: "star" },
                { emoji: "❤️", word: "red" }
            ],
            rareDecoration: { emoji: "🌸", word: "flower" },
            sentenceFills: [
                { sentence: "I'm ___.", blank: "cooking", chinese: "我在做饭。", options: ["cooking", "reading", "playing", "drawing"], animalId: "cooking_act" },
                { sentence: "It's time to go to ___.", blank: "bed", chinese: "该去睡觉了。", options: ["bed", "school", "home", "play"], animalId: "sleeping_act" },
                { sentence: "It's time for ___.", blank: "dinner", chinese: "该吃晚饭了。", options: ["dinner", "school", "homework", "bed"], animalId: "cooking_act" }
            ]
        }
    ],

    allAnimals: {
        "clock_7":      { image: "assets/images/clock.png",      label: "七点" },
        "clock_12":     { image: "assets/images/clock_12.png",   label: "十二点" },
        "clock_3":      { image: "assets/images/clock_3.png",    label: "三点" },
        "reading":      { image: "assets/images/reading.png",    label: "读书" },
        "drawing":      { image: "assets/images/drawing.png",    label: "画画" },
        "playing":      { image: "assets/images/play.png",       label: "玩耍" },
        "homework":     { image: "assets/images/homework.png",   label: "作业" },
        "cooking":      { image: "assets/images/cooking.png",    label: "做饭" },
        "sleeping":     { image: "assets/images/sleeping.png",   label: "睡觉" }
    }
};
if (typeof window !== 'undefined') { window.u3_project = u3_project; }
