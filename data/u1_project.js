/**
 * u1_project.js — U1 动物园 Project
 * 所有词汇严格来自三年级上册+下册U1课本
 * 动物分区符合常识
 */
var u1_project = {
    id: "U1P",
    title: "我的动物园",

    emoji: "🦁",
    welcome: {
        role: "动物园园长",
        message: "欢迎来到你们的动物园！一起探索4个区域，认识动物朋友，给它们加上描述，再用漂亮的装饰布置好！"
    },

    zones: [
        {
            id: "sky", name: "天空区", emoji: "☁️",
            bgGradient: "linear-gradient(180deg,#90CAF9,#BBDEFB)",
            story: "小鸟迷路了！它忘记了自己叫什么名字，帮它找回来！",
            animals: [
                { id: "bird", word: "bird", image: "assets/images/bird.png", label: "鸟",
                  descriptions: [
                    { chinese: "会飞", english: "It can fly." },
                    { chinese: "很小", english: "It's small." },
                    { chinese: "很可爱", english: "It's cute." }
                  ]
                }
            ],
            distractorAnimals: ["bear", "horse", "rabbit"],
            decorations: [
                { emoji: "⭐", word: "star" }, { emoji: "🌸", word: "flower" },
                { emoji: "🍎", word: "apple" }
            ],
            rareDecoration: { emoji: "🎂", word: "cake" },
            sentenceFills: [
                { sentence: "It can ___.", blank: "fly", chinese: "它会飞。", options: ["fly", "run", "is", "big"], animalId: "bird" },
                { sentence: "It's ___.", blank: "small", chinese: "它很小。", options: ["small", "big", "cute", "fast"], animalId: "bird" },
                { sentence: "This is a ___.", blank: "bird", chinese: "这是一只鸟。", options: ["bird", "bear", "horse", "rabbit"], animalId: "bird" }
            ]
        },
        {
            id: "forest", name: "森林区", emoji: "🌲",
            bgGradient: "linear-gradient(180deg,#A5D6A7,#C8E6C9)",
            story: "森林里好安静...动物们都躲起来了！用英文叫出它们的名字！",
            animals: [
                { id: "bear", word: "bear", image: "assets/images/bear.png", label: "熊",
                  descriptions: [
                    { chinese: "很大", english: "It's big." },
                    { chinese: "棕色的", english: "It's brown." }
                  ]
                },
                { id: "tiger", word: "tiger", image: "assets/images/tiger.png", label: "老虎",
                  descriptions: [
                    { chinese: "跑得快", english: "It can run fast." },
                    { chinese: "嘴巴大", english: "Its mouth is big." }
                  ]
                },
                { id: "panda", word: "panda", image: "assets/images/panda.png", label: "熊猫",
                  descriptions: [
                    { chinese: "小耳朵", english: "It has small ears." },
                    { chinese: "黑白色", english: "It's black and white." }
                  ]
                },
                { id: "monkey", word: "monkey", image: "assets/images/monkey.png", label: "猴子",
                  descriptions: [
                    { chinese: "很可爱", english: "It's cute." },
                    { chinese: "很小", english: "It's small." }
                  ]
                }
            ],
            distractorAnimals: ["bird", "rabbit", "duck", "dog"],
            decorations: [
                { emoji: "🌸", word: "flower" }, { emoji: "🍌", word: "banana" },
                { emoji: "🍊", word: "orange" }, { emoji: "🍎", word: "apple" }
            ],
            rareDecoration: { emoji: "⭐", word: "star" },
            sentenceFills: [
                { sentence: "It's ___.", blank: "big", chinese: "它很大。", options: ["big", "small", "cute", "fast"], animalId: "bear" },
                { sentence: "It can ___.", blank: "run", chinese: "它会跑。", options: ["run", "fly", "is", "jump"], animalId: "tiger" },
                { sentence: "This is a ___.", blank: "bear", chinese: "这是一只熊。", options: ["bear", "panda", "monkey", "bird"], animalId: "bear" }
            ]
        },
        {
            id: "grass", name: "草地区", emoji: "🌿",
            bgGradient: "linear-gradient(180deg,#C5E1A5,#DCEDC8)",
            story: "草地上的动物饿了，告诉大家它们喜欢吃什么！",
            animals: [
                { id: "horse", word: "horse", image: "assets/images/horse.png", label: "马",
                  descriptions: [
                    { chinese: "长腿", english: "It has long legs." },
                    { chinese: "吃草", english: "It likes grass." }
                  ]
                },
                { id: "rabbit", word: "rabbit", image: "assets/images/rabbit.png", label: "兔子",
                  descriptions: [
                    { chinese: "长耳朵", english: "It has two long ears." },
                    { chinese: "会跳", english: "It can jump." }
                  ]
                },
                { id: "lion", word: "lion", image: "assets/images/lion.png", label: "狮子",
                  descriptions: [
                    { chinese: "很大", english: "It's big." },
                    { chinese: "跑得快", english: "It can run fast." }
                  ]
                },
                { id: "dog", word: "dog", image: "assets/images/dog.png", label: "狗",
                  descriptions: [
                    { chinese: "很可爱", english: "It's cute." },
                    { chinese: "大耳朵", english: "It has big ears." }
                  ]
                },
                { id: "cat", word: "cat", image: "assets/images/cat.png", label: "猫",
                  descriptions: [
                    { chinese: "很可爱", english: "It's cute." },
                    { chinese: "很小", english: "It's small." }
                  ]
                }
            ],
            distractorAnimals: ["bear", "bird", "tiger", "panda"],
            decorations: [
                { emoji: "🌸", word: "flower" }, { emoji: "🍎", word: "apple" },
                { emoji: "⭐", word: "star" }, { emoji: "🍊", word: "orange" }
            ],
            rareDecoration: { emoji: "🍌", word: "banana" },
            sentenceFills: [
                { sentence: "It's ___.", blank: "cute", chinese: "它很可爱。", options: ["cute", "big", "fast", "small"], animalId: "dog" },
                { sentence: "It can ___.", blank: "run", chinese: "它会跑。", options: ["run", "fly", "jump", "is"], animalId: "lion" },
                { sentence: "This is a ___.", blank: "rabbit", chinese: "这是一只兔子。", options: ["rabbit", "horse", "dog", "cat"], animalId: "rabbit" }
            ]
        },
        {
            id: "pond", name: "水塘区", emoji: "💧",
            bgGradient: "linear-gradient(180deg,#81D4FA,#B3E5FC)",
            story: "水塘边来了新朋友，给大家介绍一下它们！",
            animals: [
                { id: "duck", word: "duck", image: "assets/images/duck.png", label: "鸭子",
                  descriptions: [
                    { chinese: "很可爱", english: "It's cute." },
                    { chinese: "很小", english: "It's small." }
                  ]
                },
                { id: "mouse", word: "mouse", image: "assets/images/mouse.png", label: "老鼠",
                  descriptions: [
                    { chinese: "很小", english: "It's small." },
                    { chinese: "很可爱", english: "It's cute." }
                  ]
                }
            ],
            distractorAnimals: ["horse", "tiger", "bear", "lion"],
            decorations: [
                { emoji: "🐟", word: "fish" }, { emoji: "⭐", word: "star" },
                { emoji: "🌸", word: "flower" }, { emoji: "🥚", word: "egg" }
            ],
            rareDecoration: { emoji: "🍎", word: "apple" },
            sentenceFills: [
                { sentence: "It's ___.", blank: "cute", chinese: "它很可爱。", options: ["cute", "big", "fast", "small"], animalId: "duck" },
                { sentence: "This is a ___.", blank: "duck", chinese: "这是一只鸭子。", options: ["duck", "mouse", "bird", "rabbit"], animalId: "duck" },
                { sentence: "It can ___.", blank: "fly", chinese: "它会飞。", options: ["fly", "run", "jump", "is"], animalId: "duck" }
            ]
        }
    ],

    allAnimals: {
        "bear":   { image: "assets/images/bear.png",   label: "熊" },
        "bird":   { image: "assets/images/bird.png",   label: "鸟" },
        "horse":  { image: "assets/images/horse.png",  label: "马" },
        "rabbit": { image: "assets/images/rabbit.png", label: "兔子" },
        "panda":  { image: "assets/images/panda.png",  label: "熊猫" },
        "tiger":  { image: "assets/images/tiger.png",  label: "老虎" },
        "dog":    { image: "assets/images/dog.png",    label: "狗" },
        "duck":   { image: "assets/images/duck.png",   label: "鸭子" },
        "cat":    { image: "assets/images/cat.png",    label: "猫" },
        "lion":   { image: "assets/images/lion.png",   label: "狮子" },
        "monkey": { image: "assets/images/monkey.png", label: "猴子" },
        "mouse":  { image: "assets/images/mouse.png",  label: "老鼠" }
    }
};
if (typeof window !== 'undefined') { window.u1_project = u1_project; }
