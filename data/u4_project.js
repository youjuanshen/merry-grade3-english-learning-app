/**
 * u4_project.js — U4 餐厅菜单 Project
 * 所有词汇严格来自三年级下册U4课本
 * 分区：早餐 / 午餐 / 饮料水果 / 晚餐
 */
var u4_project = {
    id: "U4P",
    title: "餐厅菜单",
    emoji: "🍽️",
    welcome: {
        role: "餐厅大厨",
        message: "欢迎来到英语餐厅！帮大厨准备早餐、午餐、饮料水果和晚餐，用英文认识所有美食！"
    },

    zones: [
        {
            id: "breakfast", name: "早餐", emoji: "🍳",
            bgGradient: "linear-gradient(180deg,#FFF9C4,#FFFDE7)",
            story: "早上好！早餐吃什么呢？",
            animals: [
                { id: "milk", word: "milk", image: "assets/images/milk.png", label: "牛奶",
                  descriptions: [
                    { chinese: "我喜欢牛奶", english: "I like milk." },
                    { chinese: "我想要牛奶", english: "I want milk." }
                  ]
                },
                { id: "bread", word: "bread", image: "assets/images/bread.png", label: "面包",
                  descriptions: [
                    { chinese: "我喜欢面包", english: "I like bread." },
                    { chinese: "吃面包", english: "I want some bread." }
                  ]
                },
                { id: "egg_food", word: "egg", image: "assets/images/egg.png", label: "鸡蛋",
                  descriptions: [
                    { chinese: "我喜欢鸡蛋", english: "I like eggs." },
                    { chinese: "吃鸡蛋", english: "I want some eggs." }
                  ]
                },
                { id: "noodle", word: "noodles", image: "assets/images/noodle.png", label: "面条",
                  descriptions: [
                    { chinese: "我喜欢面条", english: "I like noodles." },
                    { chinese: "面条很好吃", english: "Noodles are nice." }
                  ]
                }
            ],
            distractorAnimals: ["hamburger", "rice", "chicken", "fish"],
            decorations: [
                { emoji: "🍊", word: "orange" }, { emoji: "🍌", word: "banana" },
                { emoji: "🎂", word: "cake" }
            ],
            rareDecoration: { emoji: "🐟", word: "fish" },
            sentenceFills: [
                { sentence: "I like ___.", blank: "milk", chinese: "我喜欢牛奶。", options: ["milk", "bread", "egg", "noodles"], animalId: "milk" },
                { sentence: "I want some ___.", blank: "bread", chinese: "我想要一些面包。", options: ["bread", "milk", "egg", "noodles"], animalId: "bread" },
                { sentence: "___ are nice.", blank: "Noodles", chinese: "面条很好吃。", options: ["Noodles", "Milk", "Bread", "Egg"], animalId: "noodle" }
            ]
        },
        {
            id: "lunch", name: "午餐", emoji: "🍔",
            bgGradient: "linear-gradient(180deg,#C8E6C9,#DCEDC8)",
            story: "午餐时间到了！你想吃什么？",
            animals: [
                { id: "hamburger", word: "hamburger", image: "assets/images/hamburger.png", label: "汉堡",
                  descriptions: [
                    { chinese: "我想要汉堡", english: "I want a hamburger." },
                    { chinese: "我喜欢汉堡", english: "I like hamburgers." }
                  ]
                },
                { id: "salad", word: "salad", image: "assets/images/salad.png", label: "沙拉",
                  descriptions: [
                    { chinese: "我想要沙拉", english: "I want a salad." },
                    { chinese: "我喜欢沙拉", english: "I like salad." }
                  ]
                }
            ],
            distractorAnimals: ["milk", "bread", "rice", "chicken"],
            decorations: [
                { emoji: "🥛", word: "milk" }, { emoji: "🍞", word: "bread" },
                { emoji: "🥚", word: "egg" }
            ],
            rareDecoration: { emoji: "🎂", word: "cake" },
            sentenceFills: [
                { sentence: "I want a ___.", blank: "hamburger", chinese: "我想要一个汉堡。", options: ["hamburger", "salad", "rice", "chicken"], animalId: "hamburger" },
                { sentence: "I like ___.", blank: "salad", chinese: "我喜欢沙拉。", options: ["salad", "hamburger", "rice", "soup"], animalId: "salad" },
                { sentence: "I like ___.", blank: "hamburgers", chinese: "我喜欢汉堡。", options: ["hamburgers", "noodles", "bread", "eggs"], animalId: "hamburger" }
            ]
        },
        {
            id: "drinks_fruits", name: "饮料水果", emoji: "🥤",
            bgGradient: "linear-gradient(180deg,#B3E5FC,#E1F5FE)",
            story: "口渴了！选一杯饮料和一些水果吧！",
            animals: [
                { id: "apple_juice", word: "apple juice", image: "assets/images/apple_juice.png", label: "苹果汁",
                  descriptions: [
                    { chinese: "我最爱苹果汁", english: "My favourite drink is apple juice." },
                    { chinese: "想要苹果汁吗", english: "Do you want some apple juice?" }
                  ]
                },
                { id: "orange_juice", word: "orange juice", image: "assets/images/orange_juice.png", label: "橙汁",
                  descriptions: [
                    { chinese: "我最爱橙汁", english: "My favourite drink is orange juice." },
                    { chinese: "想要橙汁吗", english: "Do you want some orange juice?" }
                  ]
                },
                { id: "banana_fruit", word: "banana", image: "assets/images/banana.png", label: "香蕉",
                  descriptions: [
                    { chinese: "我喜欢香蕉", english: "I like bananas." },
                    { chinese: "香蕉是水果", english: "Bananas are fruits." }
                  ]
                }
            ],
            distractorAnimals: ["milk", "water", "hamburger"],
            decorations: [
                { emoji: "🍞", word: "bread" }, { emoji: "🥚", word: "egg" },
                { emoji: "🥛", word: "milk" }
            ],
            rareDecoration: { emoji: "🍊", word: "orange" },
            sentenceFills: [
                { sentence: "My favourite drink is apple ___.", blank: "juice", chinese: "我最爱喝苹果汁。", options: ["juice", "milk", "water", "soup"], animalId: "apple_juice" },
                { sentence: "Do you want some orange ___?", blank: "juice", chinese: "你想要一些橙汁吗？", options: ["juice", "milk", "water", "bread"], animalId: "orange_juice" },
                { sentence: "I like ___.", blank: "bananas", chinese: "我喜欢香蕉。", options: ["bananas", "apples", "oranges", "bread"], animalId: "banana_fruit" }
            ]
        },
        {
            id: "dinner", name: "晚餐", emoji: "🍚",
            bgGradient: "linear-gradient(180deg,#F8BBD0,#FCE4EC)",
            story: "晚餐来点中国菜怎么样？",
            animals: [
                { id: "rice", word: "rice", image: "assets/images/rice.png", label: "米饭",
                  descriptions: [
                    { chinese: "我喜欢米饭", english: "I like rice." },
                    { chinese: "来点中国菜", english: "How about some Chinese food?" }
                  ]
                },
                { id: "chicken", word: "chicken", image: "assets/images/chicken.png", label: "鸡肉",
                  descriptions: [
                    { chinese: "我喜欢鸡肉", english: "I like chicken." },
                    { chinese: "鸡肉很好吃", english: "Chicken is nice." }
                  ]
                },
                { id: "fish_food", word: "fish", image: "assets/images/fish.png", label: "鱼",
                  descriptions: [
                    { chinese: "我喜欢鱼", english: "I like fish." },
                    { chinese: "鱼很好吃", english: "Fish is nice." }
                  ]
                },
                { id: "soup", word: "soup", image: "assets/images/soup.png", label: "汤",
                  descriptions: [
                    { chinese: "来点汤", english: "We have some soup." },
                    { chinese: "汤很好喝", english: "Soup is nice." }
                  ]
                },
                { id: "vegetable", word: "vegetables", image: "assets/images/vegetable.png", label: "蔬菜",
                  descriptions: [
                    { chinese: "想要蔬菜吗", english: "Can we have some vegetables?" },
                    { chinese: "蔬菜很好吃", english: "Vegetables are nice." }
                  ]
                }
            ],
            distractorAnimals: ["hamburger", "milk", "bread", "salad"],
            decorations: [
                { emoji: "🍎", word: "apple" }, { emoji: "🍌", word: "banana" },
                { emoji: "🥛", word: "milk" }
            ],
            rareDecoration: { emoji: "🎂", word: "cake" },
            sentenceFills: [
                { sentence: "I like ___.", blank: "rice", chinese: "我喜欢米饭。", options: ["rice", "chicken", "fish", "soup"], animalId: "rice" },
                { sentence: "___ is nice.", blank: "Chicken", chinese: "鸡肉很好吃。", options: ["Chicken", "Rice", "Fish", "Soup"], animalId: "chicken" },
                { sentence: "Can we have some ___?", blank: "vegetables", chinese: "我们能来点蔬菜吗？", options: ["vegetables", "chicken", "rice", "soup"], animalId: "vegetable" }
            ]
        }
    ],

    allAnimals: {
        "milk":         { image: "assets/images/milk.png",         label: "牛奶" },
        "bread":        { image: "assets/images/bread.png",        label: "面包" },
        "egg_food":     { image: "assets/images/egg.png",          label: "鸡蛋" },
        "noodle":       { image: "assets/images/noodle.png",       label: "面条" },
        "hamburger":    { image: "assets/images/hamburger.png",    label: "汉堡" },
        "salad":        { image: "assets/images/salad.png",        label: "沙拉" },
        "apple_juice":  { image: "assets/images/apple_juice.png",  label: "苹果汁" },
        "orange_juice": { image: "assets/images/orange_juice.png", label: "橙汁" },
        "banana_fruit": { image: "assets/images/banana.png",       label: "香蕉" },
        "rice":         { image: "assets/images/rice.png",         label: "米饭" },
        "chicken":      { image: "assets/images/chicken.png",      label: "鸡肉" },
        "fish_food":    { image: "assets/images/fish.png",         label: "鱼" },
        "soup":         { image: "assets/images/soup.png",         label: "汤" },
        "vegetable":    { image: "assets/images/vegetable.png",    label: "蔬菜" },
        "water":        { image: "assets/images/water.png",        label: "水" }
    }
};
if (typeof window !== 'undefined') { window.u4_project = u4_project; }
