/**
 * U4L2 合作冒险题库 — Do you want some apple juice?
 * 主题：午餐+点餐
 * 新词汇：lunch, want, eat, drink, hamburger, salad, apple juice, glasses, help, some
 * 句型：What do you want to eat/drink? / I want a hamburger and a salad.
 *       Do you want some apple juice? Yes, I do! / Can I help you?
 */

var u4l2_coop = {
    id: "U4L2",
    title: "Do you want some apple juice?",
    theme: "lunch ordering",

    // ==================== 听力模块 ====================
    listening: {
        stations: [
            // ── 站点1：听音接力（easy）──
            {
                id: 1, name: "听音接力", icon: "🎧",
                difficulty: "easy",
                theoryTags: ["SLA", "Constructivism"],
                description: "A听音频选图片，B看图选中文",
                questions: [
                    {
                        type: "coop_listen_relay", audio: "hamburger", chinese: "汉堡", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/hamburger.png" width="70">', value: "hamburger" },
                                { html: '<img src="assets/images/salad.png" width="70">', value: "salad" },
                                { html: '<img src="assets/images/apple_juice.png" width="70">', value: "apple_juice" },
                                { html: '<img src="assets/images/lunch.png" width="70">', value: "lunch" }
                            ],
                            correct: "hamburger"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "hamburger":   { options: ["汉堡","沙拉","苹果汁","午餐"], correct: "汉堡" },
                                "salad":       { options: ["沙拉","汉堡","苹果汁","午餐"], correct: "沙拉" },
                                "apple_juice": { options: ["苹果汁","汉堡","沙拉","午餐"], correct: "苹果汁" },
                                "lunch":       { options: ["午餐","汉堡","沙拉","苹果汁"], correct: "午餐" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "salad", chinese: "沙拉", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/salad.png" width="70">', value: "salad" },
                                { html: '<img src="assets/images/hamburger.png" width="70">', value: "hamburger" },
                                { html: '<img src="assets/images/apple_juice.png" width="70">', value: "apple_juice" },
                                { html: '<img src="assets/images/egg.png" width="70">', value: "egg" }
                            ],
                            correct: "salad"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "salad":       { options: ["沙拉","汉堡","苹果汁","鸡蛋"], correct: "沙拉" },
                                "hamburger":   { options: ["汉堡","沙拉","苹果汁","鸡蛋"], correct: "汉堡" },
                                "apple_juice": { options: ["苹果汁","沙拉","汉堡","鸡蛋"], correct: "苹果汁" },
                                "egg":         { options: ["鸡蛋","沙拉","汉堡","苹果汁"], correct: "鸡蛋" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "apple juice", chinese: "苹果汁", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/apple_juice.png" width="70">', value: "apple_juice" },
                                { html: '<img src="assets/images/milk.png" width="70">', value: "milk" },
                                { html: '<img src="assets/images/hamburger.png" width="70">', value: "hamburger" },
                                { html: '<img src="assets/images/salad.png" width="70">', value: "salad" }
                            ],
                            correct: "apple_juice"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "apple_juice": { options: ["苹果汁","牛奶","汉堡","沙拉"], correct: "苹果汁" },
                                "milk":        { options: ["牛奶","苹果汁","汉堡","沙拉"], correct: "牛奶" },
                                "hamburger":   { options: ["汉堡","苹果汁","牛奶","沙拉"], correct: "汉堡" },
                                "salad":       { options: ["沙拉","苹果汁","牛奶","汉堡"], correct: "沙拉" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "lunch", chinese: "午餐", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/lunch.png" width="70">', value: "lunch" },
                                { html: '<img src="assets/images/breakfast.png" width="70">', value: "breakfast" },
                                { html: '<img src="assets/images/dinner.png" width="70">', value: "dinner" },
                                { html: '<img src="assets/images/hamburger.png" width="70">', value: "hamburger" }
                            ],
                            correct: "lunch"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "lunch":     { options: ["午餐","早餐","晚餐","汉堡"], correct: "午餐" },
                                "breakfast": { options: ["早餐","午餐","晚餐","汉堡"], correct: "早餐" },
                                "dinner":    { options: ["晚餐","午餐","早餐","汉堡"], correct: "晚餐" },
                                "hamburger": { options: ["汉堡","午餐","早餐","晚餐"], correct: "汉堡" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "eat", chinese: "吃", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选正确的词",
                            options: ["eat", "drink", "help", "want"],
                            correct: "eat"
                        },
                        stepB: {
                            instruction: "看A选的词，选中文意思",
                            optionsMap: {
                                "eat":   { options: ["吃","喝","帮助","想要"], correct: "吃" },
                                "drink": { options: ["喝","吃","帮助","想要"], correct: "喝" },
                                "help":  { options: ["帮助","吃","喝","想要"], correct: "帮助" },
                                "want":  { options: ["想要","吃","喝","帮助"], correct: "想要" }
                            }
                        }
                    }
                ]
            },

            // ── 站点2：听音判断（easy+medium）──
            {
                id: 2, name: "听音判断", icon: "✅",
                difficulty: "medium",
                theoryTags: ["CLT", "ZPD"],
                description: "A听音频判断图片对不对，B纠正错误",
                questions: [
                    {
                        type: "coop_listen_judge", audio: "hamburger", difficulty: "easy",
                        image: '<img src="assets/images/hamburger.png" width="90">',
                        isMatch: true, chinese: "汉堡",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/hamburger.png" width="60">', value: "hamburger" },
                                { html: '<img src="assets/images/salad.png" width="60">', value: "salad" },
                                { html: '<img src="assets/images/apple_juice.png" width="60">', value: "apple_juice" },
                                { html: '<img src="assets/images/lunch.png" width="60">', value: "lunch" }
                            ],
                            correct: "hamburger"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "salad", difficulty: "easy",
                        image: '<img src="assets/images/hamburger.png" width="90">',
                        isMatch: false, chinese: "沙拉",
                        correctImage: '<img src="assets/images/salad.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/salad.png" width="60">', value: "salad" },
                                { html: '<img src="assets/images/hamburger.png" width="60">', value: "hamburger" },
                                { html: '<img src="assets/images/apple_juice.png" width="60">', value: "apple_juice" },
                                { html: '<img src="assets/images/lunch.png" width="60">', value: "lunch" }
                            ],
                            correct: "salad"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "apple juice", difficulty: "medium",
                        image: '<img src="assets/images/apple_juice.png" width="90">',
                        isMatch: true, chinese: "苹果汁",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/apple_juice.png" width="60">', value: "apple_juice" },
                                { html: '<img src="assets/images/milk.png" width="60">', value: "milk" },
                                { html: '<img src="assets/images/hamburger.png" width="60">', value: "hamburger" },
                                { html: '<img src="assets/images/salad.png" width="60">', value: "salad" }
                            ],
                            correct: "apple_juice"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "lunch", difficulty: "medium",
                        image: '<img src="assets/images/dinner.png" width="90">',
                        isMatch: false, chinese: "午餐",
                        correctImage: '<img src="assets/images/lunch.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/lunch.png" width="60">', value: "lunch" },
                                { html: '<img src="assets/images/dinner.png" width="60">', value: "dinner" },
                                { html: '<img src="assets/images/breakfast.png" width="60">', value: "breakfast" },
                                { html: '<img src="assets/images/hamburger.png" width="60">', value: "hamburger" }
                            ],
                            correct: "lunch"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "hamburger", difficulty: "medium",
                        image: '<img src="assets/images/salad.png" width="90">',
                        isMatch: false, chinese: "汉堡",
                        correctImage: '<img src="assets/images/hamburger.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/hamburger.png" width="60">', value: "hamburger" },
                                { html: '<img src="assets/images/salad.png" width="60">', value: "salad" },
                                { html: '<img src="assets/images/apple_juice.png" width="60">', value: "apple_juice" },
                                { html: '<img src="assets/images/lunch.png" width="60">', value: "lunch" }
                            ],
                            correct: "hamburger"
                        }
                    }
                ]
            },

            // ── 站点3：听音排序（medium+hard）──
            {
                id: 3, name: "听音排序", icon: "🔢",
                difficulty: "hard",
                theoryTags: ["Play-based", "SLA"],
                description: "AB轮流按听到的顺序排列",
                questions: [
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["hamburger", "salad", "apple_juice"],
                        words: [
                            { html: '<img src="assets/images/hamburger.png" width="60">', value: "hamburger" },
                            { html: '<img src="assets/images/salad.png" width="60">', value: "salad" },
                            { html: '<img src="assets/images/apple_juice.png" width="60">', value: "apple_juice" }
                        ],
                        chinese: "hamburger → salad → apple juice"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["salad", "apple_juice", "hamburger"],
                        words: [
                            { html: '<img src="assets/images/salad.png" width="60">', value: "salad" },
                            { html: '<img src="assets/images/apple_juice.png" width="60">', value: "apple_juice" },
                            { html: '<img src="assets/images/hamburger.png" width="60">', value: "hamburger" }
                        ],
                        chinese: "salad → apple juice → hamburger"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["apple_juice", "hamburger", "salad"],
                        words: [
                            { html: '<img src="assets/images/apple_juice.png" width="55">', value: "apple_juice" },
                            { html: '<img src="assets/images/hamburger.png" width="55">', value: "hamburger" },
                            { html: '<img src="assets/images/salad.png" width="55">', value: "salad" }
                        ],
                        chinese: "apple juice → hamburger → salad"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["hamburger", "apple_juice", "salad"],
                        words: [
                            { html: '<img src="assets/images/hamburger.png" width="55">', value: "hamburger" },
                            { html: '<img src="assets/images/apple_juice.png" width="55">', value: "apple_juice" },
                            { html: '<img src="assets/images/salad.png" width="55">', value: "salad" }
                        ],
                        chinese: "hamburger → apple juice → salad"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["salad", "hamburger", "apple_juice", "milk"],
                        words: [
                            { html: '<img src="assets/images/salad.png" width="50">', value: "salad" },
                            { html: '<img src="assets/images/hamburger.png" width="50">', value: "hamburger" },
                            { html: '<img src="assets/images/apple_juice.png" width="50">', value: "apple_juice" },
                            { html: '<img src="assets/images/milk.png" width="50">', value: "milk" }
                        ],
                        chinese: "salad → hamburger → apple juice → milk"
                    }
                ]
            },

            // ── 站点4：情境听力（Problem-based）──
            {
                id: 4, name: "情境听力", icon: "🎯",
                difficulty: "hard",
                theoryTags: ["Problem-based", "Constructivism"],
                description: "A听条件，B做判断",
                questions: [
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "午餐时间，孩子们在餐厅点餐。有人想吃汉堡和沙拉。",
                        audio: "What do you want to eat? I want a hamburger and a salad.",
                        stepA: {
                            instruction: "听音频，他想吃什么？",
                            question: "想吃什么？",
                            options: ["hamburger and salad", "hamburger and juice", "salad and juice", "eggs and noodles"],
                            correct: "hamburger and salad"
                        },
                        stepB: {
                            instruction: "他说了想吃汉堡和沙拉，选正确的中文",
                            question: "选中文意思",
                            optionsMap: {
                                "hamburger and salad": { options: ["汉堡和沙拉", "汉堡和果汁", "沙拉和果汁", "鸡蛋和面条"], correct: "汉堡和沙拉" },
                                "hamburger and juice": { options: ["汉堡和果汁", "汉堡和沙拉", "沙拉和果汁", "鸡蛋和面条"], correct: "汉堡和果汁" },
                                "salad and juice":     { options: ["沙拉和果汁", "汉堡和沙拉", "汉堡和果汁", "鸡蛋和面条"], correct: "沙拉和果汁" },
                                "eggs and noodles":    { options: ["鸡蛋和面条", "汉堡和沙拉", "汉堡和果汁", "沙拉和果汁"], correct: "鸡蛋和面条" }
                            }
                        },
                        chinese: "想吃汉堡和沙拉"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "服务员问想喝什么，有人想喝苹果汁。",
                        audio: "What do you want to drink? Do you want some apple juice? Yes, I do!",
                        stepA: {
                            instruction: "听音频，他想喝什么？",
                            question: "想喝什么？",
                            options: ["apple juice", "milk", "water", "orange juice"],
                            correct: "apple juice"
                        },
                        stepB: {
                            instruction: "他说了Yes, I do!想喝苹果汁，怎么翻译？",
                            question: "选中文意思",
                            optionsMap: {
                                "apple juice":  { options: ["苹果汁", "牛奶", "水", "橙汁"], correct: "苹果汁" },
                                "milk":         { options: ["牛奶", "苹果汁", "水", "橙汁"], correct: "牛奶" },
                                "water":        { options: ["水", "苹果汁", "牛奶", "橙汁"], correct: "水" },
                                "orange juice": { options: ["橙汁", "苹果汁", "牛奶", "水"], correct: "橙汁" }
                            }
                        },
                        chinese: "想喝苹果汁"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "在餐厅，服务员说Can I help you? 客人要5个汉堡。",
                        audio: "Can I help you? We want five hamburgers, five salads and five glasses of apple juice.",
                        stepA: {
                            instruction: "听音频，他们要几个汉堡？",
                            question: "几个汉堡？",
                            options: ["5个", "3个", "4个", "2个"],
                            correct: "5个"
                        },
                        stepB: {
                            instruction: "他们要5个汉堡、5个沙拉、5杯苹果汁。他们一共几个人在吃？",
                            question: "提示：每人1个汉堡，几个人？",
                            optionsMap: {
                                "5个": { options: ["5个人", "3个人", "4个人", "2个人"], correct: "5个人" },
                                "3个": { options: ["3个人", "5个人", "4个人", "2个人"], correct: "3个人" },
                                "4个": { options: ["4个人", "5个人", "3个人", "2个人"], correct: "4个人" },
                                "2个": { options: ["2个人", "5个人", "3个人", "4个人"], correct: "2个人" }
                            }
                        },
                        chinese: "5个汉堡→5个人"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "问同学要不要苹果汁，同学说要。",
                        audio: "Do you want some apple juice? Yes, I do!",
                        stepA: {
                            instruction: "听音频，他要不要苹果汁？",
                            question: "他的回答是？",
                            options: ["Yes, I do!", "No, thank you.", "I want milk.", "I'm not hungry."],
                            correct: "Yes, I do!"
                        },
                        stepB: {
                            instruction: "他说Yes, I do!（要），那就给他苹果汁",
                            question: "怎么给他？",
                            optionsMap: {
                                "Yes, I do!":         { options: ["Here you are.", "No, thank you.", "I'm sorry.", "I want milk."], correct: "Here you are." },
                                "No, thank you.":     { options: ["OK!", "Here you are.", "I'm sorry.", "I want milk."], correct: "OK!" },
                                "I want milk.":       { options: ["给他牛奶", "Here you are.", "No, thank you.", "I'm sorry."], correct: "给他牛奶" },
                                "I'm not hungry.":    { options: ["OK!", "Here you are.", "No, thank you.", "I'm sorry."], correct: "OK!" }
                            }
                        },
                        chinese: "要苹果汁→给他"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "Sally和Ben在餐厅点餐，他们想吃汉堡和沙拉，想喝苹果汁。",
                        audio: "What do you want to eat, kids? I want a hamburger and a salad. What do you want to drink? Apple juice, please.",
                        stepA: {
                            instruction: "听音频，他们想吃什么？",
                            question: "想吃什么？",
                            options: ["hamburger and salad", "eggs and noodles", "bread and milk", "rice and soup"],
                            correct: "hamburger and salad"
                        },
                        stepB: {
                            instruction: "他们吃汉堡沙拉，那想喝什么？提示：Apple juice, please.",
                            question: "想喝什么？",
                            optionsMap: {
                                "hamburger and salad": { options: ["苹果汁", "牛奶", "水", "橙汁"], correct: "苹果汁" },
                                "eggs and noodles":    { options: ["苹果汁", "牛奶", "水", "橙汁"], correct: "苹果汁" },
                                "bread and milk":      { options: ["苹果汁", "牛奶", "水", "橙汁"], correct: "苹果汁" },
                                "rice and soup":       { options: ["苹果汁", "牛奶", "水", "橙汁"], correct: "苹果汁" }
                            }
                        },
                        chinese: "吃汉堡沙拉，喝苹果汁"
                    }
                ]
            }
        ]
    },

    // ==================== 阅读模块 ====================
    reading: {
        stations: [
            // ── 站点1：词义接力（easy）──
            {
                id: 1, name: "词义接力", icon: "📖",
                difficulty: "easy",
                theoryTags: ["SLA", "Constructivism"],
                description: "A看图选英文，B看英文选中文",
                questions: [
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/hamburger.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["hamburger", "salad", "apple juice", "lunch"],
                            correct: "hamburger"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "hamburger":   { options: ["汉堡","沙拉","苹果汁","午餐"], correct: "汉堡" },
                                "salad":       { options: ["沙拉","汉堡","苹果汁","午餐"], correct: "沙拉" },
                                "apple juice": { options: ["苹果汁","汉堡","沙拉","午餐"], correct: "苹果汁" },
                                "lunch":       { options: ["午餐","汉堡","沙拉","苹果汁"], correct: "午餐" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/salad.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["salad", "hamburger", "apple juice", "eggs"],
                            correct: "salad"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "salad":       { options: ["沙拉","汉堡","苹果汁","鸡蛋"], correct: "沙拉" },
                                "hamburger":   { options: ["汉堡","沙拉","苹果汁","鸡蛋"], correct: "汉堡" },
                                "apple juice": { options: ["苹果汁","沙拉","汉堡","鸡蛋"], correct: "苹果汁" },
                                "eggs":        { options: ["鸡蛋","沙拉","汉堡","苹果汁"], correct: "鸡蛋" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/apple_juice.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["apple juice", "milk", "salad", "hamburger"],
                            correct: "apple juice"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "apple juice": { options: ["苹果汁","牛奶","沙拉","汉堡"], correct: "苹果汁" },
                                "milk":        { options: ["牛奶","苹果汁","沙拉","汉堡"], correct: "牛奶" },
                                "salad":       { options: ["沙拉","苹果汁","牛奶","汉堡"], correct: "沙拉" },
                                "hamburger":   { options: ["汉堡","苹果汁","牛奶","沙拉"], correct: "汉堡" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/lunch.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["lunch", "breakfast", "dinner", "salad"],
                            correct: "lunch"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "lunch":     { options: ["午餐","早餐","晚餐","沙拉"], correct: "午餐" },
                                "breakfast": { options: ["早餐","午餐","晚餐","沙拉"], correct: "早餐" },
                                "dinner":    { options: ["晚餐","午餐","早餐","沙拉"], correct: "晚餐" },
                                "salad":     { options: ["沙拉","午餐","早餐","晚餐"], correct: "沙拉" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/hamburger.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["eat", "drink", "help", "want"],
                            correct: "eat"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "eat":   { options: ["吃","喝","帮助","想要"], correct: "吃" },
                                "drink": { options: ["喝","吃","帮助","想要"], correct: "喝" },
                                "help":  { options: ["帮助","吃","喝","想要"], correct: "帮助" },
                                "want":  { options: ["想要","吃","喝","帮助"], correct: "想要" }
                            }
                        }
                    }
                ]
            },

            // ── 站点2：翻牌配对（medium）──
            {
                id: 2, name: "翻牌配对", icon: "🃏",
                difficulty: "medium",
                theoryTags: ["Play-based", "CLT"],
                description: "A翻一张卡，B翻一张卡，找配对",
                questions: [
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "hamburger", match: '<img src="assets/images/hamburger.png" width="50">', chinese: "汉堡" },
                            { word: "salad", match: '<img src="assets/images/salad.png" width="50">', chinese: "沙拉" },
                            { word: "apple juice", match: '<img src="assets/images/apple_juice.png" width="50">', chinese: "苹果汁" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "lunch", match: '<img src="assets/images/lunch.png" width="50">', chinese: "午餐" },
                            { word: "hamburger", match: '<img src="assets/images/hamburger.png" width="50">', chinese: "汉堡" },
                            { word: "salad", match: '<img src="assets/images/salad.png" width="50">', chinese: "沙拉" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "apple juice", match: '<img src="assets/images/apple_juice.png" width="50">', chinese: "苹果汁" },
                            { word: "milk", match: '<img src="assets/images/milk.png" width="50">', chinese: "牛奶" },
                            { word: "hamburger", match: '<img src="assets/images/hamburger.png" width="50">', chinese: "汉堡" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "hamburger", match: '<img src="assets/images/hamburger.png" width="50">', chinese: "汉堡" },
                            { word: "salad", match: '<img src="assets/images/salad.png" width="50">', chinese: "沙拉" },
                            { word: "apple juice", match: '<img src="assets/images/apple_juice.png" width="50">', chinese: "苹果汁" },
                            { word: "lunch", match: '<img src="assets/images/lunch.png" width="50">', chinese: "午餐" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "salad", match: '<img src="assets/images/salad.png" width="50">', chinese: "沙拉" },
                            { word: "apple juice", match: '<img src="assets/images/apple_juice.png" width="50">', chinese: "苹果汁" },
                            { word: "milk", match: '<img src="assets/images/milk.png" width="50">', chinese: "牛奶" },
                            { word: "hamburger", match: '<img src="assets/images/hamburger.png" width="50">', chinese: "汉堡" }
                        ]
                    }
                ]
            },

            // ── 站点3：句意接力（medium）──
            {
                id: 3, name: "句意接力", icon: "📝",
                difficulty: "medium",
                theoryTags: ["CLT", "SLA"],
                description: "A看句子选意思，B选中文",
                questions: [
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/hamburger.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "What do you want to eat?", value: "What do you want to eat?" },
                                { html: "I want a hamburger.", value: "I want a hamburger." },
                                { html: "Can I help you?", value: "Can I help you?" },
                                { html: "Do you want some apple juice?", value: "Do you want some apple juice?" }
                            ],
                            correct: "What do you want to eat?"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "What do you want to eat?":          { options: ["你想吃什么？","我想要汉堡。","需要帮忙吗？","你要苹果汁吗？"], correct: "你想吃什么？" },
                                "I want a hamburger.":               { options: ["我想要汉堡。","你想吃什么？","需要帮忙吗？","你要苹果汁吗？"], correct: "我想要汉堡。" },
                                "Can I help you?":                   { options: ["需要帮忙吗？","你想吃什么？","我想要汉堡。","你要苹果汁吗？"], correct: "需要帮忙吗？" },
                                "Do you want some apple juice?":     { options: ["你要苹果汁吗？","你想吃什么？","我想要汉堡。","需要帮忙吗？"], correct: "你要苹果汁吗？" }
                            }
                        },
                        chinese: "你想吃什么？"
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/salad.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "I want a hamburger and a salad.", value: "I want a hamburger and a salad." },
                                { html: "I want some apple juice.", value: "I want some apple juice." },
                                { html: "Can I help you?", value: "Can I help you?" },
                                { html: "Good morning.", value: "Good morning." }
                            ],
                            correct: "I want a hamburger and a salad."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "I want a hamburger and a salad.": { options: ["我想要一个汉堡和一个沙拉。","我想要苹果汁。","需要帮忙吗？","早上好。"], correct: "我想要一个汉堡和一个沙拉。" },
                                "I want some apple juice.":        { options: ["我想要苹果汁。","我想要一个汉堡和一个沙拉。","需要帮忙吗？","早上好。"], correct: "我想要苹果汁。" },
                                "Can I help you?":                 { options: ["需要帮忙吗？","我想要一个汉堡和一个沙拉。","我想要苹果汁。","早上好。"], correct: "需要帮忙吗？" },
                                "Good morning.":                   { options: ["早上好。","我想要一个汉堡和一个沙拉。","我想要苹果汁。","需要帮忙吗？"], correct: "早上好。" }
                            }
                        },
                        chinese: "我想要一个汉堡和一个沙拉"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/apple_juice.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的回答",
                            options: [
                                { html: "Yes, I do!", value: "Yes, I do!" },
                                { html: "No, thank you.", value: "No, thank you." },
                                { html: "I want milk.", value: "I want milk." },
                                { html: "Good morning.", value: "Good morning." }
                            ],
                            correct: "Yes, I do!"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Yes, I do!":       { options: ["是的，我要！","不，谢谢。","我要牛奶。","早上好。"], correct: "是的，我要！" },
                                "No, thank you.":   { options: ["不，谢谢。","是的，我要！","我要牛奶。","早上好。"], correct: "不，谢谢。" },
                                "I want milk.":     { options: ["我要牛奶。","是的，我要！","不，谢谢。","早上好。"], correct: "我要牛奶。" },
                                "Good morning.":    { options: ["早上好。","是的，我要！","不，谢谢。","我要牛奶。"], correct: "早上好。" }
                            }
                        },
                        chinese: "是的，我要！"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/lunch.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的英文",
                            options: [
                                { html: "What do you want to drink?", value: "What do you want to drink?" },
                                { html: "What do you want to eat?", value: "What do you want to eat?" },
                                { html: "Can I help you?", value: "Can I help you?" },
                                { html: "I'm hungry.", value: "I'm hungry." }
                            ],
                            correct: "What do you want to drink?"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "What do you want to drink?": { options: ["你想喝什么？","你想吃什么？","需要帮忙吗？","我饿了。"], correct: "你想喝什么？" },
                                "What do you want to eat?":   { options: ["你想吃什么？","你想喝什么？","需要帮忙吗？","我饿了。"], correct: "你想吃什么？" },
                                "Can I help you?":            { options: ["需要帮忙吗？","你想喝什么？","你想吃什么？","我饿了。"], correct: "需要帮忙吗？" },
                                "I'm hungry.":                { options: ["我饿了。","你想喝什么？","你想吃什么？","需要帮忙吗？"], correct: "我饿了。" }
                            }
                        },
                        chinese: "你想喝什么？"
                    },
                    {
                        type: "coop_word_relay", difficulty: "hard",
                        image: '<img src="assets/images/lunch.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的英文",
                            options: [
                                { html: "Can I help you?", value: "Can I help you?" },
                                { html: "I'm hungry.", value: "I'm hungry." },
                                { html: "Good morning.", value: "Good morning." },
                                { html: "Thank you.", value: "Thank you." }
                            ],
                            correct: "Can I help you?"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Can I help you?": { options: ["需要帮忙吗？","我饿了。","早上好。","谢谢。"], correct: "需要帮忙吗？" },
                                "I'm hungry.":     { options: ["我饿了。","需要帮忙吗？","早上好。","谢谢。"], correct: "我饿了。" },
                                "Good morning.":   { options: ["早上好。","需要帮忙吗？","我饿了。","谢谢。"], correct: "早上好。" },
                                "Thank you.":      { options: ["谢谢。","需要帮忙吗？","我饿了。","早上好。"], correct: "谢谢。" }
                            }
                        },
                        chinese: "需要帮忙吗？"
                    }
                ]
            },

            // ── 站点4：情境阅读（Problem-based）──
            {
                id: 4, name: "情境阅读", icon: "🔍",
                difficulty: "hard",
                theoryTags: ["Problem-based", "Constructivism"],
                description: "A读描述，B根据描述做判断",
                questions: [
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "孩子们在餐厅点餐，想吃汉堡和沙拉",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "What do you want to eat, kids? I want a hamburger and a salad.",
                            question: "他们想吃什么？",
                            options: ["汉堡和沙拉", "鸡蛋和面条", "牛奶和面包", "米饭和汤"],
                            correct: "汉堡和沙拉"
                        },
                        stepB: {
                            instruction: "他们说了I want a hamburger and a salad，选正确的图片",
                            optionsMap: {
                                "汉堡和沙拉": { options: [
                                    { html: '<img src="assets/images/hamburger.png" width="40"> + <img src="assets/images/salad.png" width="40">', value: "hamburger_salad" },
                                    { html: '<img src="assets/images/egg.png" width="40"> + <img src="assets/images/noodle.png" width="40">', value: "egg_noodle" },
                                    { html: '<img src="assets/images/milk.png" width="40"> + <img src="assets/images/bread.png" width="40">', value: "milk_bread" },
                                    { html: '<img src="assets/images/rice.png" width="40"> + <img src="assets/images/soup.png" width="40">', value: "rice_soup" }
                                ], correct: "hamburger_salad" },
                                "鸡蛋和面条": { options: [
                                    { html: '<img src="assets/images/egg.png" width="40"> + <img src="assets/images/noodle.png" width="40">', value: "egg_noodle" },
                                    { html: '<img src="assets/images/hamburger.png" width="40"> + <img src="assets/images/salad.png" width="40">', value: "hamburger_salad" },
                                    { html: '<img src="assets/images/milk.png" width="40"> + <img src="assets/images/bread.png" width="40">', value: "milk_bread" },
                                    { html: '<img src="assets/images/rice.png" width="40"> + <img src="assets/images/soup.png" width="40">', value: "rice_soup" }
                                ], correct: "egg_noodle" },
                                "牛奶和面包": { options: [
                                    { html: '<img src="assets/images/milk.png" width="40"> + <img src="assets/images/bread.png" width="40">', value: "milk_bread" },
                                    { html: '<img src="assets/images/hamburger.png" width="40"> + <img src="assets/images/salad.png" width="40">', value: "hamburger_salad" },
                                    { html: '<img src="assets/images/egg.png" width="40"> + <img src="assets/images/noodle.png" width="40">', value: "egg_noodle" },
                                    { html: '<img src="assets/images/rice.png" width="40"> + <img src="assets/images/soup.png" width="40">', value: "rice_soup" }
                                ], correct: "milk_bread" },
                                "米饭和汤": { options: [
                                    { html: '<img src="assets/images/rice.png" width="40"> + <img src="assets/images/soup.png" width="40">', value: "rice_soup" },
                                    { html: '<img src="assets/images/hamburger.png" width="40"> + <img src="assets/images/salad.png" width="40">', value: "hamburger_salad" },
                                    { html: '<img src="assets/images/egg.png" width="40"> + <img src="assets/images/noodle.png" width="40">', value: "egg_noodle" },
                                    { html: '<img src="assets/images/milk.png" width="40"> + <img src="assets/images/bread.png" width="40">', value: "milk_bread" }
                                ], correct: "rice_soup" }
                            }
                        },
                        chinese: "想吃汉堡和沙拉"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "问同学要不要苹果汁",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Do you want some apple juice? Yes, I do! Me too!",
                            question: "他们要苹果汁吗？",
                            options: ["都要", "都不要", "只有一个人要", "不知道"],
                            correct: "都要"
                        },
                        stepB: {
                            instruction: "两个人都说要（Yes, I do! Me too!），需要几杯？",
                            optionsMap: {
                                "都要":       { options: ["2杯", "1杯", "3杯", "不需要"], correct: "2杯" },
                                "都不要":     { options: ["0杯", "1杯", "2杯", "3杯"], correct: "0杯" },
                                "只有一个人要": { options: ["1杯", "0杯", "2杯", "3杯"], correct: "1杯" },
                                "不知道":     { options: ["2杯", "1杯", "0杯", "3杯"], correct: "2杯" }
                            }
                        },
                        chinese: "两人都要苹果汁"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "服务员帮忙点餐",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Can I help you? We want five hamburgers, five salads and five glasses of apple juice.",
                            question: "他们要几个汉堡？",
                            options: ["5个", "3个", "4个", "2个"],
                            correct: "5个"
                        },
                        stepB: {
                            instruction: "他们要5个汉堡(five hamburgers)，沙拉也是5个，那苹果汁几杯？",
                            optionsMap: {
                                "5个": { options: ["5杯", "3杯", "4杯", "2杯"], correct: "5杯" },
                                "3个": { options: ["5杯", "3杯", "4杯", "2杯"], correct: "5杯" },
                                "4个": { options: ["5杯", "3杯", "4杯", "2杯"], correct: "5杯" },
                                "2个": { options: ["5杯", "3杯", "4杯", "2杯"], correct: "5杯" }
                            }
                        },
                        chinese: "5个汉堡+5个沙拉+5杯苹果汁"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "问想吃什么和想喝什么",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "What do you want to eat? I want a hamburger. What do you want to drink? Apple juice, please.",
                            question: "他想吃什么？",
                            options: ["hamburger", "salad", "eggs", "noodles"],
                            correct: "hamburger"
                        },
                        stepB: {
                            instruction: "他吃汉堡，那想喝什么？提示：Apple juice, please.",
                            optionsMap: {
                                "hamburger": { options: ["苹果汁", "牛奶", "水", "橙汁"], correct: "苹果汁" },
                                "salad":     { options: ["苹果汁", "牛奶", "水", "橙汁"], correct: "苹果汁" },
                                "eggs":      { options: ["苹果汁", "牛奶", "水", "橙汁"], correct: "苹果汁" },
                                "noodles":   { options: ["苹果汁", "牛奶", "水", "橙汁"], correct: "苹果汁" }
                            }
                        },
                        chinese: "吃汉堡，喝苹果汁"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "Sally想吃的和Ben想吃的不一样。Sally要汉堡，Ben要沙拉。",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Sally: I want a hamburger. Ben: I want a salad.",
                            question: "Sally想吃什么？",
                            options: ["hamburger", "salad", "apple juice", "noodles"],
                            correct: "hamburger"
                        },
                        stepB: {
                            instruction: "Sally要汉堡，那Ben呢？提示：Ben说I want a salad.",
                            optionsMap: {
                                "hamburger":   { options: ["沙拉", "汉堡", "苹果汁", "面条"], correct: "沙拉" },
                                "salad":       { options: ["沙拉", "汉堡", "苹果汁", "面条"], correct: "沙拉" },
                                "apple juice": { options: ["沙拉", "汉堡", "苹果汁", "面条"], correct: "沙拉" },
                                "noodles":     { options: ["沙拉", "汉堡", "苹果汁", "面条"], correct: "沙拉" }
                            }
                        },
                        chinese: "Sally要汉堡，Ben要沙拉"
                    }
                ]
            }
        ]
    },

    // ==================== 写作模块 ====================
    writing: {
        stations: [
            // ── 站点1：合作建句（easy）──
            {
                id: 1, name: "合作建句", icon: "✏️",
                difficulty: "easy",
                theoryTags: ["Constructivism", "SLA"],
                description: "A放前半句词块，B放后半句词块",
                questions: [
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "I want a hamburger.",
                        stepA: { words: ["I", "want"], instruction: "选前半句的词" },
                        stepB: { words: ["a", "hamburger."], instruction: "选后半句的词" },
                        chinese: "我想要一个汉堡。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "Can I help you?",
                        stepA: { words: ["Can", "I"], instruction: "选前半句的词" },
                        stepB: { words: ["help", "you?"], instruction: "选后半句的词" },
                        chinese: "需要帮忙吗？"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "I want a salad.",
                        stepA: { words: ["I", "want"], instruction: "选前半句的词" },
                        stepB: { words: ["a", "salad."], instruction: "选后半句的词" },
                        chinese: "我想要一个沙拉。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "What do you want to eat?",
                        stepA: { words: ["What", "do", "you"], instruction: "排好前半句" },
                        stepB: { words: ["want", "to", "eat?"], instruction: "排好后半句" },
                        chinese: "你想吃什么？"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "Do you want some apple juice?",
                        stepA: { words: ["Do", "you", "want"], instruction: "排好前半句" },
                        stepB: { words: ["some", "apple", "juice?"], instruction: "排好后半句" },
                        chinese: "你要苹果汁吗？"
                    }
                ]
            },

            // ── 站点2：接力填空（medium）──
            {
                id: 2, name: "接力填空", icon: "📝",
                difficulty: "medium",
                theoryTags: ["SLA", "ZPD"],
                description: "A填第1个空，B填第2个空",
                questions: [
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "What do you want to ___? I want a ___ and a salad.",
                        image: '<img src="assets/images/hamburger.png" width="70">',
                        stepA: { blank: 1, options: ["eat", "drink", "help", "like"], correct: "eat", instruction: "想吃什么？What do you want to ___，填第1个空" },
                        stepB: { blank: 2, options: ["hamburger", "salad", "milk", "egg"], correct: "hamburger", instruction: "图片是汉堡（hamburger），I want a ___，填第2个空" },
                        chinese: "What do you want to eat? I want a hamburger and a salad."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "Do you ___ some apple juice? Yes, I ___!",
                        image: '<img src="assets/images/apple_juice.png" width="70">',
                        stepA: { blank: 1, options: ["want", "like", "eat", "have"], correct: "want", instruction: "你要苹果汁吗？Do you ___ some...，填第1个空" },
                        stepB: { blank: 2, options: ["do", "am", "is", "are"], correct: "do", instruction: "回答【是的】：Yes, I ___!，填第2个空" },
                        chinese: "Do you want some apple juice? Yes, I do!"
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "___ I help you? We ___ five hamburgers.",
                        image: '<img src="assets/images/hamburger.png" width="70">',
                        stepA: { blank: 1, options: ["Can", "Do", "Is", "Are"], correct: "Can", instruction: "需要帮忙吗？___ I help you，填第1个空" },
                        stepB: { blank: 2, options: ["want", "like", "eat", "have"], correct: "want", instruction: "我们要5个汉堡：We ___ five hamburgers，填第2个空" },
                        chinese: "Can I help you? We want five hamburgers."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "What do you want to ___? ___ juice, please.",
                        image: '<img src="assets/images/apple_juice.png" width="70">',
                        stepA: { blank: 1, options: ["drink", "eat", "help", "like"], correct: "drink", instruction: "想喝什么？What do you want to ___，填第1个空" },
                        stepB: { blank: 2, options: ["Apple", "Orange", "Milk", "Water"], correct: "Apple", instruction: "图片是苹果汁，___ juice, please，填第2个空" },
                        chinese: "What do you want to drink? Apple juice, please."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "We want five ___ and five glasses of apple ___.",
                        image: '<img src="assets/images/lunch.png" width="70">',
                        stepA: { blank: 1, options: ["hamburgers", "eggs", "noodles", "breads"], correct: "hamburgers", instruction: "5个汉堡：five ___，填第1个空" },
                        stepB: { blank: 2, options: ["juice", "milk", "water", "tea"], correct: "juice", instruction: "5杯苹果汁：apple ___，填第2个空" },
                        chinese: "We want five hamburgers and five glasses of apple juice."
                    }
                ]
            },

            // ── 站点3：合作拼词（medium+hard）──
            {
                id: 3, name: "合作拼词", icon: "🔤",
                difficulty: "hard",
                theoryTags: ["Play-based", "SLA"],
                description: "A放前半字母，B放后半字母",
                questions: [
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "salad",
                        image: '<img src="assets/images/salad.png" width="60">',
                        stepA: { letters: ["s", "a", "l"], distractors: ["o", "e"], instruction: "拼前半：s____" },
                        stepB: { letters: ["a", "d"], distractors: ["t", "n"], instruction: "拼后半：___ad" },
                        chinese: "沙拉"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "lunch",
                        image: '<img src="assets/images/lunch.png" width="60">',
                        stepA: { letters: ["l", "u", "n"], distractors: ["a", "o"], instruction: "拼前半：l____" },
                        stepB: { letters: ["c", "h"], distractors: ["t", "d"], instruction: "拼后半：___ch" },
                        chinese: "午餐"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "drink",
                        image: '<img src="assets/images/apple_juice.png" width="60">',
                        stepA: { letters: ["d", "r", "i"], distractors: ["a", "o"], instruction: "拼前半：d____" },
                        stepB: { letters: ["n", "k"], distractors: ["t", "g"], instruction: "拼后半：___nk" },
                        chinese: "喝"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "hamburger",
                        image: '<img src="assets/images/hamburger.png" width="60">',
                        stepA: { letters: ["h", "a", "m", "b"], distractors: ["o", "e"], instruction: "拼前半：h________" },
                        stepB: { letters: ["u", "r", "g", "e", "r"], distractors: ["t", "n"], instruction: "拼后半：____urger" },
                        chinese: "汉堡"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "juice",
                        image: '<img src="assets/images/apple_juice.png" width="60">',
                        stepA: { letters: ["j", "u", "i"], distractors: ["a", "o"], instruction: "拼前半：j____" },
                        stepB: { letters: ["c", "e"], distractors: ["t", "n"], instruction: "拼后半：___ce" },
                        chinese: "果汁"
                    }
                ]
            },

            // ── 站点4：情境写作（Problem-based）──
            {
                id: 4, name: "情境写作", icon: "💌",
                difficulty: "hard",
                theoryTags: ["Problem-based", "Project"],
                description: "A选情境，B写句子，合作完成对话",
                questions: [
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "在餐厅点餐，服务员问你想吃什么（你想要汉堡和沙拉）",
                        stepA: {
                            instruction: "服务员问你想吃什么",
                            options: ["What do you want to eat?", "Can I help you?", "Good morning.", "I'm hungry."]
                        },
                        stepB: {
                            instruction: "你想要汉堡和沙拉，回答服务员",
                            optionsMap: {
                                "What do you want to eat?": { options: ["I want a hamburger and a salad.", "I want milk.", "Good morning.", "I'm hungry."], correct: "I want a hamburger and a salad." },
                                "Can I help you?":          { options: ["I want a hamburger and a salad.", "I want milk.", "Good morning.", "I'm hungry."], correct: "I want a hamburger and a salad." },
                                "Good morning.":            { options: ["Good morning!", "I want a hamburger.", "Can I help you?", "I'm hungry."], correct: "Good morning!" },
                                "I'm hungry.":              { options: ["What do you want to eat?", "Good morning.", "I want milk.", "Thank you."], correct: "What do you want to eat?" }
                            }
                        },
                        chinese: "点餐→汉堡和沙拉"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "问同学要不要苹果汁（同学说要）",
                        stepA: {
                            instruction: "问同学要不要苹果汁",
                            options: ["Do you want some apple juice?", "What do you want to eat?", "Can I help you?", "I'm hungry."]
                        },
                        stepB: {
                            instruction: "同学问你要不要苹果汁，你要！",
                            optionsMap: {
                                "Do you want some apple juice?": { options: ["Yes, I do!", "No, thank you.", "I want milk.", "Good morning."], correct: "Yes, I do!" },
                                "What do you want to eat?":      { options: ["I want a hamburger.", "Yes, I do!", "No, thank you.", "Good morning."], correct: "I want a hamburger." },
                                "Can I help you?":               { options: ["I want a hamburger and a salad.", "Yes, I do!", "No, thank you.", "Good morning."], correct: "I want a hamburger and a salad." },
                                "I'm hungry.":                   { options: ["What do you want to eat?", "Yes, I do!", "No, thank you.", "Good morning."], correct: "What do you want to eat?" }
                            }
                        },
                        chinese: "问苹果汁→要"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "服务员说Can I help you，你告诉他要5个汉堡",
                        stepA: {
                            instruction: "服务员说Can I help you",
                            options: ["Can I help you?", "What do you want?", "Good morning.", "I'm hungry."]
                        },
                        stepB: {
                            instruction: "服务员来帮忙了，告诉他要5个汉堡和5个沙拉",
                            optionsMap: {
                                "Can I help you?":     { options: ["We want five hamburgers and five salads.", "I want milk.", "Good morning.", "I'm hungry."], correct: "We want five hamburgers and five salads." },
                                "What do you want?":   { options: ["We want five hamburgers and five salads.", "I want milk.", "Good morning.", "I'm hungry."], correct: "We want five hamburgers and five salads." },
                                "Good morning.":       { options: ["Good morning!", "We want five hamburgers.", "I'm hungry.", "Thank you."], correct: "Good morning!" },
                                "I'm hungry.":         { options: ["What do you want to eat?", "Good morning.", "We want five hamburgers.", "Thank you."], correct: "What do you want to eat?" }
                            }
                        },
                        chinese: "帮忙→要5个汉堡5个沙拉"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "问想喝什么（Sally想喝苹果汁，Ben想喝牛奶）",
                        stepA: {
                            instruction: "问想喝什么",
                            options: ["What do you want to drink?", "What do you want to eat?", "Can I help you?", "Good morning."]
                        },
                        stepB: {
                            instruction: "记住：Sally要苹果汁，Ben要牛奶。Sally回答",
                            optionsMap: {
                                "What do you want to drink?": { options: ["Apple juice, please.", "Milk, please.", "I want a hamburger.", "Good morning."], correct: "Apple juice, please." },
                                "What do you want to eat?":   { options: ["I want a hamburger.", "Apple juice, please.", "Milk, please.", "Good morning."], correct: "I want a hamburger." },
                                "Can I help you?":            { options: ["Apple juice, please.", "I want a hamburger.", "Good morning.", "Milk, please."], correct: "Apple juice, please." },
                                "Good morning.":              { options: ["Good morning!", "Apple juice, please.", "I want a hamburger.", "Milk, please."], correct: "Good morning!" }
                            }
                        },
                        chinese: "Sally要苹果汁"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "完整点餐：A当服务员问吃什么喝什么，B当客人回答（汉堡+苹果汁）",
                        stepA: {
                            instruction: "你是服务员，先问客人想吃什么",
                            options: ["What do you want to eat?", "What do you want to drink?", "Can I help you?", "Good morning."]
                        },
                        stepB: {
                            instruction: "你是客人，想吃汉堡。回答服务员",
                            optionsMap: {
                                "What do you want to eat?":  { options: ["I want a hamburger.", "Apple juice, please.", "Can I help you?", "Good morning."], correct: "I want a hamburger." },
                                "What do you want to drink?":{ options: ["Apple juice, please.", "I want a hamburger.", "Can I help you?", "Good morning."], correct: "Apple juice, please." },
                                "Can I help you?":           { options: ["I want a hamburger and a salad.", "Apple juice, please.", "Good morning.", "Thank you."], correct: "I want a hamburger and a salad." },
                                "Good morning.":             { options: ["Good morning!", "I want a hamburger.", "Apple juice, please.", "Thank you."], correct: "Good morning!" }
                            }
                        },
                        chinese: "服务员问→客人答汉堡"
                    }
                ]
            }
        ]
    },

    // ==================== 口语模块 ====================
    speaking: {
        stations: [
            // ── 站点1：跟读模仿（easy）──
            {
                id: 1, name: "跟读模仿", icon: "🎤",
                difficulty: "easy",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A听音频跟读，B跟着读同一个",
                questions: [
                    { type: "coop_read_relay", word: "hamburger", chinese: "汉堡", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "salad", chinese: "沙拉", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "apple juice", chinese: "苹果汁", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "lunch", chinese: "午餐", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "drink", chinese: "喝", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "I want a hamburger", chinese: "我想要一个汉堡", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "What do you want to eat", chinese: "你想吃什么", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "Do you want some apple juice", chinese: "你要苹果汁吗", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "Can I help you", chinese: "需要帮忙吗", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "Yes I do", chinese: "是的，我要", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } }
                ]
            },

            // ── 站点2：看图说话（medium）──
            {
                id: 2, name: "看图说话", icon: "💬",
                difficulty: "medium",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "看图片和句型框架，说出完整句子",
                questions: [
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/hamburger.png" width="90">', answer: "I want a hamburger", chinese: "我想要一个汉堡", stepA: { instruction: "看图片，说出完整句子：I want a _____.", expected: "I want a hamburger", chinese: "我想要一个汉堡" }, stepB: { instruction: "你也看图说同一句话：I want a _____.", expected: "I want a hamburger", chinese: "我想要一个汉堡" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/salad.png" width="90">', answer: "I want a salad", chinese: "我想要一个沙拉", stepA: { instruction: "看图片，说出完整句子：I want a _____.", expected: "I want a salad", chinese: "我想要一个沙拉" }, stepB: { instruction: "你也看图说同一句话：I want a _____.", expected: "I want a salad", chinese: "我想要一个沙拉" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/apple_juice.png" width="90">', answer: "I want some apple juice", chinese: "我想要苹果汁", stepA: { instruction: "看图片，说出完整句子：I want some _____.", expected: "I want some apple juice", chinese: "我想要苹果汁" }, stepB: { instruction: "你也看图说同一句话：I want some _____.", expected: "I want some apple juice", chinese: "我想要苹果汁" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/hamburger.png" width="90">', answer: "What do you want to eat", chinese: "你想吃什么", stepA: { instruction: "看图片，说出完整句子：What do you want to _____?", expected: "What do you want to eat", chinese: "你想吃什么" }, stepB: { instruction: "你也看图说同一句话：What do you want to _____?", expected: "What do you want to eat", chinese: "你想吃什么" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/apple_juice.png" width="90">', answer: "What do you want to drink", chinese: "你想喝什么", stepA: { instruction: "看图片，说出完整句子：What do you want to _____?", expected: "What do you want to drink", chinese: "你想喝什么" }, stepB: { instruction: "你也看图说同一句话：What do you want to _____?", expected: "What do you want to drink", chinese: "你想喝什么" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/apple_juice.png" width="90">', answer: "Do you want some apple juice", chinese: "你要苹果汁吗", stepA: { instruction: "看图片，说出完整句子：Do you want some _____?", expected: "Do you want some apple juice", chinese: "你要苹果汁吗" }, stepB: { instruction: "你也看图说同一句话：Do you want some _____?", expected: "Do you want some apple juice", chinese: "你要苹果汁吗" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/lunch.png" width="90">', answer: "Can I help you", chinese: "需要帮忙吗", stepA: { instruction: "看图片，说出完整句子：Can I _____ you?", expected: "Can I help you", chinese: "需要帮忙吗" }, stepB: { instruction: "你也看图说同一句话：Can I _____ you?", expected: "Can I help you", chinese: "需要帮忙吗" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/hamburger.png" width="90">', answer: "I want a hamburger and a salad", chinese: "我想要汉堡和沙拉", stepA: { instruction: "看图片，说出完整句子：I want a _____ and a _____.", expected: "I want a hamburger and a salad", chinese: "我想要汉堡和沙拉" }, stepB: { instruction: "你也看图说同一句话：I want a _____ and a _____.", expected: "I want a hamburger and a salad", chinese: "我想要汉堡和沙拉" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/apple_juice.png" width="90">', answer: "Yes I do", chinese: "是的，我要", stepA: { instruction: "看图片，说出完整句子：Yes, I _____!", expected: "Yes I do", chinese: "是的，我要" }, stepB: { instruction: "你也看图说同一句话：Yes, I _____!", expected: "Yes I do", chinese: "是的，我要" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/apple_juice.png" width="90">', answer: "Apple juice please", chinese: "请给我苹果汁", stepA: { instruction: "看图片，说出完整句子：_____ juice, please.", expected: "Apple juice please", chinese: "请给我苹果汁" }, stepB: { instruction: "你也看图说同一句话：_____ juice, please.", expected: "Apple juice please", chinese: "请给我苹果汁" } }
                ]
            },

            // ── 站点3：合作对话（hard）──
            {
                id: 3, name: "合作对话", icon: "🗣️",
                difficulty: "hard",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A问想吃什么，B回答，合作完成对话",
                questions: [
                    { type: "coop_dialogue", difficulty: "hard", scenario: "问想吃什么", image: '<img src="assets/images/hamburger.png" width="90">', stepA: { instruction: "看示范句，问想吃什么", role: "服务员", line: "What do you want to eat", chinese: "你想吃什么？" }, stepB: { instruction: "看示范句，回答想吃汉堡", role: "客人", line: "I want a hamburger", chinese: "我想要一个汉堡。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "问想喝什么", image: '<img src="assets/images/apple_juice.png" width="90">', stepA: { instruction: "看示范句，问想喝什么", role: "服务员", line: "What do you want to drink", chinese: "你想喝什么？" }, stepB: { instruction: "看示范句，回答想喝苹果汁", role: "客人", line: "Apple juice please", chinese: "请给我苹果汁。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "问要不要苹果汁", image: '<img src="assets/images/apple_juice.png" width="90">', stepA: { instruction: "看示范句，问要不要", role: "提问者", line: "Do you want some apple juice", chinese: "你要苹果汁吗？" }, stepB: { instruction: "看示范句，回答要", role: "回答者", line: "Yes I do", chinese: "是的，我要！" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "服务员帮忙", image: '<img src="assets/images/lunch.png" width="90">', stepA: { instruction: "看示范句，问需要帮忙吗", role: "服务员", line: "Can I help you", chinese: "需要帮忙吗？" }, stepB: { instruction: "看示范句，说想吃的", role: "客人", line: "I want a hamburger and a salad", chinese: "我想要汉堡和沙拉。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "想吃汉堡和沙拉", image: '<img src="assets/images/salad.png" width="90">', stepA: { instruction: "看示范句，说想吃的", role: "客人A", line: "I want a hamburger", chinese: "我想要一个汉堡。" }, stepB: { instruction: "看示范句，说想吃的", role: "客人B", line: "I want a salad", chinese: "我想要一个沙拉。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "也要苹果汁", image: '<img src="assets/images/apple_juice.png" width="90">', stepA: { instruction: "看示范句，说想喝的", role: "客人A", line: "I want some apple juice", chinese: "我想要苹果汁。" }, stepB: { instruction: "看示范句，说也要", role: "客人B", line: "Me too", chinese: "我也要！" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "点5个汉堡", image: '<img src="assets/images/hamburger.png" width="90">', stepA: { instruction: "看示范句，点餐", role: "客人", line: "We want five hamburgers", chinese: "我们要5个汉堡。" }, stepB: { instruction: "看示范句，接着说", role: "客人", line: "and five salads", chinese: "和5个沙拉。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "完整点餐对话1", image: '<img src="assets/images/hamburger.png" width="90">', stepA: { instruction: "看示范句，问想吃什么", role: "服务员", line: "What do you want to eat", chinese: "你想吃什么？" }, stepB: { instruction: "看示范句，回答汉堡和沙拉", role: "客人", line: "I want a hamburger and a salad", chinese: "我想要汉堡和沙拉。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "完整点餐对话2", image: '<img src="assets/images/apple_juice.png" width="90">', stepA: { instruction: "看示范句，问想喝什么", role: "服务员", line: "What do you want to drink", chinese: "你想喝什么？" }, stepB: { instruction: "看示范句，回答苹果汁", role: "客人", line: "Apple juice please", chinese: "请给我苹果汁。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "问想吃沙拉吗", image: '<img src="assets/images/salad.png" width="90">', stepA: { instruction: "看示范句，问要不要沙拉", role: "提问者", line: "Do you want a salad", chinese: "你要沙拉吗？" }, stepB: { instruction: "看示范句，回答要", role: "回答者", line: "Yes I do", chinese: "是的，我要！" } }
                ]
            }
        ]
    }
};

if (typeof window !== 'undefined') {
    window.u4l2_coop = u4l2_coop;
}
