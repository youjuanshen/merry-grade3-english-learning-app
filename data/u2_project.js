/**
 * u2_project.js — U2 穿搭秀 Project
 * 所有词汇严格来自三年级下册U2课本
 * 分区：衣服架 / 尺码区 / 房间区 / 运动区
 */
var u2_project = {
    id: "U2P",
    title: "穿搭秀",
    emoji: "👕",
    welcome: {
        role: "时尚设计师",
        message: "欢迎来到穿搭工作室！帮同学们找到合适的衣服，搭配尺码，整理房间，准备运动装备！"
    },

    zones: [
        {
            id: "clothes_rack", name: "衣服架", emoji: "👕",
            bgGradient: "linear-gradient(180deg,#F8BBD0,#FCE4EC)",
            story: "衣服们乱成一团了！帮它们找到英文名字！",
            animals: [
                { id: "shirt", word: "shirt", image: "assets/images/shirt.png", label: "衬衫",
                  descriptions: [
                    { chinese: "这是我的衬衫", english: "This is my shirt." },
                    { chinese: "很好看", english: "It's nice." }
                  ]
                },
                { id: "jacket", word: "jacket", image: "assets/images/jacket.png", label: "夹克",
                  descriptions: [
                    { chinese: "这是我的夹克", english: "This is my jacket." },
                    { chinese: "很好看", english: "It's nice." }
                  ]
                },
                { id: "sweater", word: "sweater", image: "assets/images/sweater.png", label: "毛衣",
                  descriptions: [
                    { chinese: "穿上毛衣", english: "Put on your sweater." },
                    { chinese: "很好看", english: "It's nice." }
                  ]
                },
                { id: "skirt", word: "skirt", image: "assets/images/skirt.png", label: "裙子",
                  descriptions: [
                    { chinese: "这是我的裙子", english: "This is my skirt." },
                    { chinese: "很好看", english: "It's nice." }
                  ]
                }
            ],
            distractorAnimals: ["shorts", "T-shirt", "sports shoes"],
            decorations: [
                { emoji: "❤️", word: "red" }, { emoji: "💙", word: "blue" },
                { emoji: "💛", word: "yellow" }, { emoji: "💚", word: "green" }
            ],
            rareDecoration: { emoji: "🖤", word: "black" },
            sentenceFills: [
                { sentence: "This is my ___.", blank: "shirt", chinese: "这是我的衬衫。", options: ["shirt", "jacket", "sweater", "skirt"], animalId: "shirt" },
                { sentence: "It's ___.", blank: "nice", chinese: "它很好看。", options: ["nice", "big", "small", "new"], animalId: "jacket" },
                { sentence: "Put on your ___.", blank: "jacket", chinese: "穿上你的夹克。", options: ["jacket", "shirt", "skirt", "sweater"], animalId: "jacket" }
            ]
        },
        {
            id: "size_area", name: "尺码区", emoji: "📏",
            bgGradient: "linear-gradient(180deg,#B3E5FC,#E1F5FE)",
            story: "同学们要穿队服！帮他们找到合适的尺码！",
            animals: [
                { id: "T-shirt", word: "T-shirt", image: "assets/images/T-shirt.png", label: "T恤",
                  descriptions: [
                    { chinese: "太小了", english: "It's too small." },
                    { chinese: "太大了", english: "It's too big." }
                  ]
                },
                { id: "shorts", word: "shorts", image: "assets/images/shorts.png", label: "短裤",
                  descriptions: [
                    { chinese: "穿上短裤", english: "Put on your shorts." },
                    { chinese: "很好看", english: "It's nice." }
                  ]
                }
            ],
            distractorAnimals: ["shirt", "jacket", "sweater", "skirt"],
            decorations: [
                { emoji: "💙", word: "blue" }, { emoji: "💛", word: "yellow" },
                { emoji: "💚", word: "green" }
            ],
            rareDecoration: { emoji: "💗", word: "pink" },
            sentenceFills: [
                { sentence: "It's too ___.", blank: "small", chinese: "它太小了。", options: ["small", "big", "nice", "new"], animalId: "T-shirt" },
                { sentence: "Put on your ___.", blank: "shorts", chinese: "穿上你的短裤。", options: ["shorts", "T-shirt", "shirt", "jacket"], animalId: "shorts" },
                { sentence: "It's ___.", blank: "nice", chinese: "它很好看。", options: ["nice", "small", "big", "blue"], animalId: "T-shirt" }
            ]
        },
        {
            id: "room", name: "房间区", emoji: "🏠",
            bgGradient: "linear-gradient(180deg,#C8E6C9,#DCEDC8)",
            story: "衣服找不到了！它们在房间的什么地方？",
            animals: [
                { id: "bed", word: "bed", image: "assets/images/bed.png", label: "床",
                  descriptions: [
                    { chinese: "在床上", english: "It's on the bed." },
                    { chinese: "给你", english: "Here you are." }
                  ]
                },
                { id: "chair", word: "chair", image: "assets/images/chair.png", label: "椅子",
                  descriptions: [
                    { chinese: "在椅子下", english: "It's under the chair." },
                    { chinese: "不在这里", english: "No, it isn't." }
                  ]
                },
                { id: "schoolbag", word: "schoolbag", image: "assets/images/schoolbag.png", label: "书包",
                  descriptions: [
                    { chinese: "在书包里", english: "It's in the schoolbag." },
                    { chinese: "找到了", english: "Here you are." }
                  ]
                }
            ],
            distractorAnimals: ["shirt", "jacket", "T-shirt"],
            decorations: [
                { emoji: "❤️", word: "red" }, { emoji: "💛", word: "yellow" },
                { emoji: "💚", word: "green" }, { emoji: "🖤", word: "black" }
            ],
            rareDecoration: { emoji: "💙", word: "blue" },
            sentenceFills: [
                { sentence: "It's on the ___.", blank: "bed", chinese: "它在床上面。", options: ["bed", "chair", "schoolbag", "desk"], animalId: "bed" },
                { sentence: "It's under the ___.", blank: "chair", chinese: "它在椅子下面。", options: ["chair", "bed", "desk", "table"], animalId: "chair" },
                { sentence: "It's in the ___.", blank: "schoolbag", chinese: "它在书包里面。", options: ["schoolbag", "bed", "chair", "desk"], animalId: "schoolbag" }
            ]
        },
        {
            id: "sports", name: "运动区", emoji: "🏃",
            bgGradient: "linear-gradient(180deg,#FFF9C4,#FFFDE7)",
            story: "体育课到了！穿上你的运动装备！",
            animals: [
                { id: "sports_shoes", word: "sports shoes", image: "assets/images/sports_shoes.png", label: "运动鞋",
                  descriptions: [
                    { chinese: "穿上运动鞋", english: "Put on your sports shoes." },
                    { chinese: "太大了", english: "They are too big." }
                  ]
                },
                { id: "T-shirt_sport", word: "T-shirt", image: "assets/images/T-shirt.png", label: "T恤",
                  descriptions: [
                    { chinese: "穿上T恤", english: "Put on your T-shirt." },
                    { chinese: "很好看", english: "It's nice." }
                  ]
                }
            ],
            distractorAnimals: ["shirt", "jacket", "sweater"],
            decorations: [
                { emoji: "💙", word: "blue" }, { emoji: "💛", word: "yellow" },
                { emoji: "❤️", word: "red" }
            ],
            rareDecoration: { emoji: "💚", word: "green" },
            sentenceFills: [
                { sentence: "Put on your ___.", blank: "sports shoes", chinese: "穿上你的运动鞋。", options: ["sports shoes", "shirt", "jacket", "sweater"], animalId: "sports_shoes" },
                { sentence: "It's too ___.", blank: "big", chinese: "它太大了。", options: ["big", "small", "nice", "new"], animalId: "sports_shoes" },
                { sentence: "Put on your ___.", blank: "T-shirt", chinese: "穿上你的T恤。", options: ["T-shirt", "shirt", "shorts", "skirt"], animalId: "T-shirt" }
            ]
        }
    ],

    allAnimals: {
        "shirt":        { image: "assets/images/shirt.png",        label: "衬衫" },
        "jacket":       { image: "assets/images/jacket.png",       label: "夹克" },
        "sweater":      { image: "assets/images/sweater.png",      label: "毛衣" },
        "skirt":        { image: "assets/images/skirt.png",        label: "裙子" },
        "T-shirt":      { image: "assets/images/T-shirt.png",      label: "T恤" },
        "shorts":       { image: "assets/images/shorts.png",       label: "短裤" },
        "sports_shoes": { image: "assets/images/sports_shoes.png", label: "运动鞋" },
        "bed":          { image: "assets/images/bed.png",          label: "床" },
        "chair":        { image: "assets/images/chair.png",        label: "椅子" },
        "schoolbag":    { image: "assets/images/schoolbag.png",    label: "书包" }
    }
};
if (typeof window !== 'undefined') { window.u2_project = u2_project; }
