/**
 * U4L1 合作冒险题库 — What do you like for breakfast?
 * 主题：早餐食物
 * 新词汇：breakfast, hungry, milk, bread, eggs, noodles, like, eat, morning, kids, today
 * 句型：What do you like for breakfast? / I like eggs and noodles. / I like milk and bread.
 *       Good morning. / I'm hungry. / It's time for breakfast. / We have milk, bread, eggs and noodles.
 */

var u4l1_coop = {
    id: "U4L1",
    title: "What do you like for breakfast?",
    theme: "breakfast food",

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
                        type: "coop_listen_relay", audio: "milk", chinese: "牛奶", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/milk.png" width="70">', value: "milk" },
                                { html: '<img src="assets/images/bread.png" width="70">', value: "bread" },
                                { html: '<img src="assets/images/egg.png" width="70">', value: "egg" },
                                { html: '<img src="assets/images/noodle.png" width="70">', value: "noodle" }
                            ],
                            correct: "milk"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "milk":   { options: ["牛奶","面包","鸡蛋","面条"], correct: "牛奶" },
                                "bread":  { options: ["面包","牛奶","鸡蛋","面条"], correct: "面包" },
                                "egg":    { options: ["鸡蛋","牛奶","面包","面条"], correct: "鸡蛋" },
                                "noodle": { options: ["面条","牛奶","面包","鸡蛋"], correct: "面条" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "bread", chinese: "面包", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/bread.png" width="70">', value: "bread" },
                                { html: '<img src="assets/images/milk.png" width="70">', value: "milk" },
                                { html: '<img src="assets/images/egg.png" width="70">', value: "egg" },
                                { html: '<img src="assets/images/noodle.png" width="70">', value: "noodle" }
                            ],
                            correct: "bread"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "bread":  { options: ["面包","牛奶","鸡蛋","面条"], correct: "面包" },
                                "milk":   { options: ["牛奶","面包","鸡蛋","面条"], correct: "牛奶" },
                                "egg":    { options: ["鸡蛋","面包","牛奶","面条"], correct: "鸡蛋" },
                                "noodle": { options: ["面条","面包","牛奶","鸡蛋"], correct: "面条" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "eggs", chinese: "鸡蛋", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/egg.png" width="70">', value: "egg" },
                                { html: '<img src="assets/images/noodle.png" width="70">', value: "noodle" },
                                { html: '<img src="assets/images/milk.png" width="70">', value: "milk" },
                                { html: '<img src="assets/images/bread.png" width="70">', value: "bread" }
                            ],
                            correct: "egg"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "egg":    { options: ["鸡蛋","面条","牛奶","面包"], correct: "鸡蛋" },
                                "noodle": { options: ["面条","鸡蛋","牛奶","面包"], correct: "面条" },
                                "milk":   { options: ["牛奶","鸡蛋","面条","面包"], correct: "牛奶" },
                                "bread":  { options: ["面包","鸡蛋","面条","牛奶"], correct: "面包" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "noodles", chinese: "面条", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/noodle.png" width="70">', value: "noodle" },
                                { html: '<img src="assets/images/egg.png" width="70">', value: "egg" },
                                { html: '<img src="assets/images/bread.png" width="70">', value: "bread" },
                                { html: '<img src="assets/images/milk.png" width="70">', value: "milk" }
                            ],
                            correct: "noodle"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "noodle": { options: ["面条","鸡蛋","面包","牛奶"], correct: "面条" },
                                "egg":    { options: ["鸡蛋","面条","面包","牛奶"], correct: "鸡蛋" },
                                "bread":  { options: ["面包","面条","鸡蛋","牛奶"], correct: "面包" },
                                "milk":   { options: ["牛奶","面条","鸡蛋","面包"], correct: "牛奶" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "breakfast", chinese: "早餐", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/breakfast.png" width="70">', value: "breakfast" },
                                { html: '<img src="assets/images/lunch.png" width="70">', value: "lunch" },
                                { html: '<img src="assets/images/dinner.png" width="70">', value: "dinner" },
                                { html: '<img src="assets/images/milk.png" width="70">', value: "milk" }
                            ],
                            correct: "breakfast"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "breakfast": { options: ["早餐","午餐","晚餐","牛奶"], correct: "早餐" },
                                "lunch":     { options: ["午餐","早餐","晚餐","牛奶"], correct: "午餐" },
                                "dinner":    { options: ["晚餐","早餐","午餐","牛奶"], correct: "晚餐" },
                                "milk":      { options: ["牛奶","早餐","午餐","晚餐"], correct: "牛奶" }
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
                        type: "coop_listen_judge", audio: "milk", difficulty: "easy",
                        image: '<img src="assets/images/milk.png" width="90">',
                        isMatch: true, chinese: "牛奶",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/milk.png" width="60">', value: "milk" },
                                { html: '<img src="assets/images/bread.png" width="60">', value: "bread" },
                                { html: '<img src="assets/images/egg.png" width="60">', value: "egg" },
                                { html: '<img src="assets/images/noodle.png" width="60">', value: "noodle" }
                            ],
                            correct: "milk"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "bread", difficulty: "easy",
                        image: '<img src="assets/images/noodle.png" width="90">',
                        isMatch: false, chinese: "面包",
                        correctImage: '<img src="assets/images/bread.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/bread.png" width="60">', value: "bread" },
                                { html: '<img src="assets/images/noodle.png" width="60">', value: "noodle" },
                                { html: '<img src="assets/images/milk.png" width="60">', value: "milk" },
                                { html: '<img src="assets/images/egg.png" width="60">', value: "egg" }
                            ],
                            correct: "bread"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "eggs", difficulty: "medium",
                        image: '<img src="assets/images/egg.png" width="90">',
                        isMatch: true, chinese: "鸡蛋",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/egg.png" width="60">', value: "egg" },
                                { html: '<img src="assets/images/milk.png" width="60">', value: "milk" },
                                { html: '<img src="assets/images/bread.png" width="60">', value: "bread" },
                                { html: '<img src="assets/images/noodle.png" width="60">', value: "noodle" }
                            ],
                            correct: "egg"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "noodles", difficulty: "medium",
                        image: '<img src="assets/images/bread.png" width="90">',
                        isMatch: false, chinese: "面条",
                        correctImage: '<img src="assets/images/noodle.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/noodle.png" width="60">', value: "noodle" },
                                { html: '<img src="assets/images/bread.png" width="60">', value: "bread" },
                                { html: '<img src="assets/images/milk.png" width="60">', value: "milk" },
                                { html: '<img src="assets/images/egg.png" width="60">', value: "egg" }
                            ],
                            correct: "noodle"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "breakfast", difficulty: "medium",
                        image: '<img src="assets/images/lunch.png" width="90">',
                        isMatch: false, chinese: "早餐",
                        correctImage: '<img src="assets/images/breakfast.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/breakfast.png" width="60">', value: "breakfast" },
                                { html: '<img src="assets/images/lunch.png" width="60">', value: "lunch" },
                                { html: '<img src="assets/images/dinner.png" width="60">', value: "dinner" },
                                { html: '<img src="assets/images/milk.png" width="60">', value: "milk" }
                            ],
                            correct: "breakfast"
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
                        sequence: ["milk", "bread", "egg"],
                        words: [
                            { html: '<img src="assets/images/milk.png" width="60">', value: "milk" },
                            { html: '<img src="assets/images/bread.png" width="60">', value: "bread" },
                            { html: '<img src="assets/images/egg.png" width="60">', value: "egg" }
                        ],
                        chinese: "milk → bread → egg"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["noodle", "egg", "milk"],
                        words: [
                            { html: '<img src="assets/images/noodle.png" width="60">', value: "noodle" },
                            { html: '<img src="assets/images/egg.png" width="60">', value: "egg" },
                            { html: '<img src="assets/images/milk.png" width="60">', value: "milk" }
                        ],
                        chinese: "noodle → egg → milk"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["bread", "noodle", "milk"],
                        words: [
                            { html: '<img src="assets/images/bread.png" width="55">', value: "bread" },
                            { html: '<img src="assets/images/noodle.png" width="55">', value: "noodle" },
                            { html: '<img src="assets/images/milk.png" width="55">', value: "milk" }
                        ],
                        chinese: "bread → noodle → milk"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["egg", "milk", "bread"],
                        words: [
                            { html: '<img src="assets/images/egg.png" width="55">', value: "egg" },
                            { html: '<img src="assets/images/milk.png" width="55">', value: "milk" },
                            { html: '<img src="assets/images/bread.png" width="55">', value: "bread" }
                        ],
                        chinese: "egg → milk → bread"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["milk", "egg", "noodle", "bread"],
                        words: [
                            { html: '<img src="assets/images/milk.png" width="50">', value: "milk" },
                            { html: '<img src="assets/images/egg.png" width="50">', value: "egg" },
                            { html: '<img src="assets/images/noodle.png" width="50">', value: "noodle" },
                            { html: '<img src="assets/images/bread.png" width="50">', value: "bread" }
                        ],
                        chinese: "milk → egg → noodle → bread"
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
                        scenario: "早上杨明说他饿了，妈妈问杨明早餐想吃什么。杨明喜欢鸡蛋和面条。",
                        audio: "Good morning. I'm hungry. What do you like for breakfast? I like eggs and noodles.",
                        stepA: {
                            instruction: "听音频，杨明早餐喜欢吃什么？",
                            question: "杨明喜欢什么？",
                            options: ["eggs and noodles", "milk and bread", "eggs and milk", "bread and noodles"],
                            correct: "eggs and noodles"
                        },
                        stepB: {
                            instruction: "杨明说了喜欢鸡蛋和面条，帮他选早餐图片",
                            question: "给杨明准备什么？",
                            optionsMap: {
                                "eggs and noodles": { options: ["鸡蛋和面条", "牛奶和面包", "鸡蛋和牛奶", "面包和面条"], correct: "鸡蛋和面条" },
                                "milk and bread":   { options: ["牛奶和面包", "鸡蛋和面条", "鸡蛋和牛奶", "面包和面条"], correct: "牛奶和面包" },
                                "eggs and milk":    { options: ["鸡蛋和牛奶", "鸡蛋和面条", "牛奶和面包", "面包和面条"], correct: "鸡蛋和牛奶" },
                                "bread and noodles":{ options: ["面包和面条", "鸡蛋和面条", "牛奶和面包", "鸡蛋和牛奶"], correct: "面包和面条" }
                            }
                        },
                        chinese: "杨明喜欢鸡蛋和面条"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "杨帆也在吃早餐，她喜欢牛奶和面包。",
                        audio: "What do you like for breakfast, Yang Fan? I like milk and bread.",
                        stepA: {
                            instruction: "听音频，杨帆早餐喜欢什么？",
                            question: "杨帆喜欢什么？",
                            options: ["milk and bread", "eggs and noodles", "milk and noodles", "bread and eggs"],
                            correct: "milk and bread"
                        },
                        stepB: {
                            instruction: "杨帆说了喜欢牛奶和面包，帮她选早餐",
                            question: "给杨帆准备什么？",
                            optionsMap: {
                                "milk and bread":   { options: ["牛奶和面包", "鸡蛋和面条", "牛奶和面条", "面包和鸡蛋"], correct: "牛奶和面包" },
                                "eggs and noodles": { options: ["鸡蛋和面条", "牛奶和面包", "牛奶和面条", "面包和鸡蛋"], correct: "鸡蛋和面条" },
                                "milk and noodles": { options: ["牛奶和面条", "牛奶和面包", "鸡蛋和面条", "面包和鸡蛋"], correct: "牛奶和面条" },
                                "bread and eggs":   { options: ["面包和鸡蛋", "牛奶和面包", "鸡蛋和面条", "牛奶和面条"], correct: "面包和鸡蛋" }
                            }
                        },
                        chinese: "杨帆喜欢牛奶和面包"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "妈妈说今天有牛奶、面包、鸡蛋和面条。问孩子们想吃什么。",
                        audio: "It's time for breakfast. We have milk, bread, eggs and noodles today.",
                        stepA: {
                            instruction: "听音频，早餐有哪些食物？",
                            question: "早餐有几种食物？",
                            options: ["4种", "3种", "2种", "5种"],
                            correct: "4种"
                        },
                        stepB: {
                            instruction: "妈妈说有4种食物：牛奶、面包、鸡蛋、面条。哪个不在早餐里？",
                            question: "哪个不在早餐里？",
                            optionsMap: {
                                "4种": { options: ["hamburger（汉堡）", "milk（牛奶）", "bread（面包）", "eggs（鸡蛋）"], correct: "hamburger（汉堡）" },
                                "3种": { options: ["hamburger（汉堡）", "milk（牛奶）", "bread（面包）", "eggs（鸡蛋）"], correct: "hamburger（汉堡）" },
                                "2种": { options: ["hamburger（汉堡）", "milk（牛奶）", "bread（面包）", "eggs（鸡蛋）"], correct: "hamburger（汉堡）" },
                                "5种": { options: ["hamburger（汉堡）", "milk（牛奶）", "bread（面包）", "eggs（鸡蛋）"], correct: "hamburger（汉堡）" }
                            }
                        },
                        chinese: "早餐有牛奶、面包、鸡蛋、面条"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "早上好！该吃早餐了。杨明饿了。",
                        audio: "Good morning, kids. I'm hungry. It's time for breakfast.",
                        stepA: {
                            instruction: "听音频，谁饿了？",
                            question: "谁说I'm hungry？",
                            options: ["小朋友（杨明）", "妈妈", "老师", "杨帆"],
                            correct: "小朋友（杨明）"
                        },
                        stepB: {
                            instruction: "小朋友饿了，现在该做什么？提示：妈妈说It's time for breakfast",
                            question: "该做什么了？",
                            optionsMap: {
                                "小朋友（杨明）": { options: ["吃早餐", "吃午餐", "吃晚餐", "去上学"], correct: "吃早餐" },
                                "妈妈":           { options: ["吃早餐", "吃午餐", "吃晚餐", "去上学"], correct: "吃早餐" },
                                "老师":           { options: ["吃早餐", "吃午餐", "吃晚餐", "去上学"], correct: "吃早餐" },
                                "杨帆":           { options: ["吃早餐", "吃午餐", "吃晚餐", "去上学"], correct: "吃早餐" }
                            }
                        },
                        chinese: "饿了→吃早餐"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "杨明和杨帆的早餐选择不同。杨明要鸡蛋面条，杨帆要牛奶面包。",
                        audio: "What do you like for breakfast? I like eggs and noodles. What about you? I like milk and bread.",
                        stepA: {
                            instruction: "听音频，第一个人喜欢什么？",
                            question: "第一个人喜欢？",
                            options: ["eggs and noodles", "milk and bread", "eggs and bread", "milk and noodles"],
                            correct: "eggs and noodles"
                        },
                        stepB: {
                            instruction: "第一个人选了鸡蛋和面条，第二个人选了什么？提示：What about you? I like milk and bread.",
                            question: "第二个人喜欢？",
                            optionsMap: {
                                "eggs and noodles": { options: ["牛奶和面包", "鸡蛋和面条", "鸡蛋和面包", "牛奶和面条"], correct: "牛奶和面包" },
                                "milk and bread":   { options: ["鸡蛋和面条", "牛奶和面包", "鸡蛋和面包", "牛奶和面条"], correct: "鸡蛋和面条" },
                                "eggs and bread":   { options: ["牛奶和面包", "鸡蛋和面条", "鸡蛋和面包", "牛奶和面条"], correct: "牛奶和面包" },
                                "milk and noodles": { options: ["牛奶和面包", "鸡蛋和面条", "鸡蛋和面包", "牛奶和面条"], correct: "牛奶和面包" }
                            }
                        },
                        chinese: "两人早餐选择不同"
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
                        image: '<img src="assets/images/milk.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["milk", "bread", "eggs", "noodles"],
                            correct: "milk"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "milk":    { options: ["牛奶","面包","鸡蛋","面条"], correct: "牛奶" },
                                "bread":   { options: ["面包","牛奶","鸡蛋","面条"], correct: "面包" },
                                "eggs":    { options: ["鸡蛋","牛奶","面包","面条"], correct: "鸡蛋" },
                                "noodles": { options: ["面条","牛奶","面包","鸡蛋"], correct: "面条" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/bread.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["bread", "milk", "noodles", "eggs"],
                            correct: "bread"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "bread":   { options: ["面包","牛奶","面条","鸡蛋"], correct: "面包" },
                                "milk":    { options: ["牛奶","面包","面条","鸡蛋"], correct: "牛奶" },
                                "noodles": { options: ["面条","面包","牛奶","鸡蛋"], correct: "面条" },
                                "eggs":    { options: ["鸡蛋","面包","牛奶","面条"], correct: "鸡蛋" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/egg.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["eggs", "bread", "milk", "noodles"],
                            correct: "eggs"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "eggs":    { options: ["鸡蛋","面包","牛奶","面条"], correct: "鸡蛋" },
                                "bread":   { options: ["面包","鸡蛋","牛奶","面条"], correct: "面包" },
                                "milk":    { options: ["牛奶","鸡蛋","面包","面条"], correct: "牛奶" },
                                "noodles": { options: ["面条","鸡蛋","面包","牛奶"], correct: "面条" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/noodle.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["noodles", "eggs", "bread", "milk"],
                            correct: "noodles"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "noodles": { options: ["面条","鸡蛋","面包","牛奶"], correct: "面条" },
                                "eggs":    { options: ["鸡蛋","面条","面包","牛奶"], correct: "鸡蛋" },
                                "bread":   { options: ["面包","面条","鸡蛋","牛奶"], correct: "面包" },
                                "milk":    { options: ["牛奶","面条","鸡蛋","面包"], correct: "牛奶" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/breakfast.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["breakfast", "lunch", "dinner", "milk"],
                            correct: "breakfast"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "breakfast": { options: ["早餐","午餐","晚餐","牛奶"], correct: "早餐" },
                                "lunch":     { options: ["午餐","早餐","晚餐","牛奶"], correct: "午餐" },
                                "dinner":    { options: ["晚餐","早餐","午餐","牛奶"], correct: "晚餐" },
                                "milk":      { options: ["牛奶","早餐","午餐","晚餐"], correct: "牛奶" }
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
                            { word: "milk", match: '<img src="assets/images/milk.png" width="50">', chinese: "牛奶" },
                            { word: "bread", match: '<img src="assets/images/bread.png" width="50">', chinese: "面包" },
                            { word: "eggs", match: '<img src="assets/images/egg.png" width="50">', chinese: "鸡蛋" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "noodles", match: '<img src="assets/images/noodle.png" width="50">', chinese: "面条" },
                            { word: "milk", match: '<img src="assets/images/milk.png" width="50">', chinese: "牛奶" },
                            { word: "eggs", match: '<img src="assets/images/egg.png" width="50">', chinese: "鸡蛋" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "bread", match: '<img src="assets/images/bread.png" width="50">', chinese: "面包" },
                            { word: "noodles", match: '<img src="assets/images/noodle.png" width="50">', chinese: "面条" },
                            { word: "breakfast", match: '<img src="assets/images/breakfast.png" width="50">', chinese: "早餐" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "milk", match: '<img src="assets/images/milk.png" width="50">', chinese: "牛奶" },
                            { word: "bread", match: '<img src="assets/images/bread.png" width="50">', chinese: "面包" },
                            { word: "eggs", match: '<img src="assets/images/egg.png" width="50">', chinese: "鸡蛋" },
                            { word: "noodles", match: '<img src="assets/images/noodle.png" width="50">', chinese: "面条" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "breakfast", match: '<img src="assets/images/breakfast.png" width="50">', chinese: "早餐" },
                            { word: "eggs", match: '<img src="assets/images/egg.png" width="50">', chinese: "鸡蛋" },
                            { word: "milk", match: '<img src="assets/images/milk.png" width="50">', chinese: "牛奶" },
                            { word: "bread", match: '<img src="assets/images/bread.png" width="50">', chinese: "面包" }
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
                        image: '<img src="assets/images/breakfast.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "What do you like for breakfast?", value: "What do you like for breakfast?" },
                                { html: "I like eggs and noodles.", value: "I like eggs and noodles." },
                                { html: "Good morning.", value: "Good morning." },
                                { html: "I'm hungry.", value: "I'm hungry." }
                            ],
                            correct: "What do you like for breakfast?"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "What do you like for breakfast?": { options: ["你早餐喜欢吃什么？","我喜欢鸡蛋和面条。","早上好。","我饿了。"], correct: "你早餐喜欢吃什么？" },
                                "I like eggs and noodles.":        { options: ["我喜欢鸡蛋和面条。","你早餐喜欢吃什么？","早上好。","我饿了。"], correct: "我喜欢鸡蛋和面条。" },
                                "Good morning.":                   { options: ["早上好。","你早餐喜欢吃什么？","我喜欢鸡蛋和面条。","我饿了。"], correct: "早上好。" },
                                "I'm hungry.":                     { options: ["我饿了。","你早餐喜欢吃什么？","我喜欢鸡蛋和面条。","早上好。"], correct: "我饿了。" }
                            }
                        },
                        chinese: "你早餐喜欢吃什么？"
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/egg.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "I like eggs and noodles.", value: "I like eggs and noodles." },
                                { html: "I like milk and bread.", value: "I like milk and bread." },
                                { html: "It's time for breakfast.", value: "It's time for breakfast." },
                                { html: "Good morning, kids.", value: "Good morning, kids." }
                            ],
                            correct: "I like eggs and noodles."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "I like eggs and noodles.":   { options: ["我喜欢鸡蛋和面条。","我喜欢牛奶和面包。","该吃早餐了。","早上好，孩子们。"], correct: "我喜欢鸡蛋和面条。" },
                                "I like milk and bread.":     { options: ["我喜欢牛奶和面包。","我喜欢鸡蛋和面条。","该吃早餐了。","早上好，孩子们。"], correct: "我喜欢牛奶和面包。" },
                                "It's time for breakfast.":   { options: ["该吃早餐了。","我喜欢鸡蛋和面条。","我喜欢牛奶和面包。","早上好，孩子们。"], correct: "该吃早餐了。" },
                                "Good morning, kids.":        { options: ["早上好，孩子们。","我喜欢鸡蛋和面条。","我喜欢牛奶和面包。","该吃早餐了。"], correct: "早上好，孩子们。" }
                            }
                        },
                        chinese: "我喜欢鸡蛋和面条"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/milk.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的回答",
                            options: [
                                { html: "I like milk and bread.", value: "I like milk and bread." },
                                { html: "I like eggs and noodles.", value: "I like eggs and noodles." },
                                { html: "I'm hungry.", value: "I'm hungry." },
                                { html: "Good morning.", value: "Good morning." }
                            ],
                            correct: "I like milk and bread."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "I like milk and bread.":     { options: ["我喜欢牛奶和面包。","我喜欢鸡蛋和面条。","我饿了。","早上好。"], correct: "我喜欢牛奶和面包。" },
                                "I like eggs and noodles.":   { options: ["我喜欢鸡蛋和面条。","我喜欢牛奶和面包。","我饿了。","早上好。"], correct: "我喜欢鸡蛋和面条。" },
                                "I'm hungry.":                { options: ["我饿了。","我喜欢牛奶和面包。","我喜欢鸡蛋和面条。","早上好。"], correct: "我饿了。" },
                                "Good morning.":              { options: ["早上好。","我喜欢牛奶和面包。","我喜欢鸡蛋和面条。","我饿了。"], correct: "早上好。" }
                            }
                        },
                        chinese: "我喜欢牛奶和面包"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/breakfast.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的英文",
                            options: [
                                { html: "It's time for breakfast.", value: "It's time for breakfast." },
                                { html: "It's time for lunch.", value: "It's time for lunch." },
                                { html: "Good morning.", value: "Good morning." },
                                { html: "I'm hungry.", value: "I'm hungry." }
                            ],
                            correct: "It's time for breakfast."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "It's time for breakfast.": { options: ["该吃早餐了。","该吃午餐了。","早上好。","我饿了。"], correct: "该吃早餐了。" },
                                "It's time for lunch.":     { options: ["该吃午餐了。","该吃早餐了。","早上好。","我饿了。"], correct: "该吃午餐了。" },
                                "Good morning.":            { options: ["早上好。","该吃早餐了。","该吃午餐了。","我饿了。"], correct: "早上好。" },
                                "I'm hungry.":              { options: ["我饿了。","该吃早餐了。","该吃午餐了。","早上好。"], correct: "我饿了。" }
                            }
                        },
                        chinese: "该吃早餐了"
                    },
                    {
                        type: "coop_word_relay", difficulty: "hard",
                        image: '<img src="assets/images/breakfast.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的英文",
                            options: [
                                { html: "We have milk, bread, eggs and noodles.", value: "We have milk, bread, eggs and noodles." },
                                { html: "I like eggs and noodles.", value: "I like eggs and noodles." },
                                { html: "Good morning, kids.", value: "Good morning, kids." },
                                { html: "I'm hungry.", value: "I'm hungry." }
                            ],
                            correct: "We have milk, bread, eggs and noodles."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "We have milk, bread, eggs and noodles.": { options: ["我们有牛奶、面包、鸡蛋和面条。","我喜欢鸡蛋和面条。","早上好，孩子们。","我饿了。"], correct: "我们有牛奶、面包、鸡蛋和面条。" },
                                "I like eggs and noodles.":               { options: ["我喜欢鸡蛋和面条。","我们有牛奶、面包、鸡蛋和面条。","早上好，孩子们。","我饿了。"], correct: "我喜欢鸡蛋和面条。" },
                                "Good morning, kids.":                    { options: ["早上好，孩子们。","我们有牛奶、面包、鸡蛋和面条。","我喜欢鸡蛋和面条。","我饿了。"], correct: "早上好，孩子们。" },
                                "I'm hungry.":                            { options: ["我饿了。","我们有牛奶、面包、鸡蛋和面条。","我喜欢鸡蛋和面条。","早上好，孩子们。"], correct: "我饿了。" }
                            }
                        },
                        chinese: "我们有牛奶、面包、鸡蛋和面条"
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
                        scenario: "杨明说他喜欢鸡蛋和面条",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "What do you like for breakfast, Yang Ming? I like eggs and noodles.",
                            question: "杨明早餐喜欢什么？",
                            options: ["鸡蛋和面条", "牛奶和面包", "鸡蛋和牛奶", "面包和面条"],
                            correct: "鸡蛋和面条"
                        },
                        stepB: {
                            instruction: "杨明说了I like eggs and noodles，帮他选正确的图片",
                            optionsMap: {
                                "鸡蛋和面条": { options: [
                                    { html: '<img src="assets/images/egg.png" width="40"> + <img src="assets/images/noodle.png" width="40">', value: "eggs_noodles" },
                                    { html: '<img src="assets/images/milk.png" width="40"> + <img src="assets/images/bread.png" width="40">', value: "milk_bread" },
                                    { html: '<img src="assets/images/egg.png" width="40"> + <img src="assets/images/milk.png" width="40">', value: "eggs_milk" },
                                    { html: '<img src="assets/images/bread.png" width="40"> + <img src="assets/images/noodle.png" width="40">', value: "bread_noodles" }
                                ], correct: "eggs_noodles" },
                                "牛奶和面包": { options: [
                                    { html: '<img src="assets/images/milk.png" width="40"> + <img src="assets/images/bread.png" width="40">', value: "milk_bread" },
                                    { html: '<img src="assets/images/egg.png" width="40"> + <img src="assets/images/noodle.png" width="40">', value: "eggs_noodles" },
                                    { html: '<img src="assets/images/egg.png" width="40"> + <img src="assets/images/milk.png" width="40">', value: "eggs_milk" },
                                    { html: '<img src="assets/images/bread.png" width="40"> + <img src="assets/images/noodle.png" width="40">', value: "bread_noodles" }
                                ], correct: "milk_bread" },
                                "鸡蛋和牛奶": { options: [
                                    { html: '<img src="assets/images/egg.png" width="40"> + <img src="assets/images/milk.png" width="40">', value: "eggs_milk" },
                                    { html: '<img src="assets/images/egg.png" width="40"> + <img src="assets/images/noodle.png" width="40">', value: "eggs_noodles" },
                                    { html: '<img src="assets/images/milk.png" width="40"> + <img src="assets/images/bread.png" width="40">', value: "milk_bread" },
                                    { html: '<img src="assets/images/bread.png" width="40"> + <img src="assets/images/noodle.png" width="40">', value: "bread_noodles" }
                                ], correct: "eggs_milk" },
                                "面包和面条": { options: [
                                    { html: '<img src="assets/images/bread.png" width="40"> + <img src="assets/images/noodle.png" width="40">', value: "bread_noodles" },
                                    { html: '<img src="assets/images/egg.png" width="40"> + <img src="assets/images/noodle.png" width="40">', value: "eggs_noodles" },
                                    { html: '<img src="assets/images/milk.png" width="40"> + <img src="assets/images/bread.png" width="40">', value: "milk_bread" },
                                    { html: '<img src="assets/images/egg.png" width="40"> + <img src="assets/images/milk.png" width="40">', value: "eggs_milk" }
                                ], correct: "bread_noodles" }
                            }
                        },
                        chinese: "杨明喜欢鸡蛋和面条"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "杨帆说她喜欢牛奶和面包",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "What do you like for breakfast, Yang Fan? I like milk and bread.",
                            question: "杨帆早餐喜欢什么？",
                            options: ["牛奶和面包", "鸡蛋和面条", "鸡蛋和牛奶", "面包和面条"],
                            correct: "牛奶和面包"
                        },
                        stepB: {
                            instruction: "杨帆说了I like milk and bread，选正确的中文",
                            optionsMap: {
                                "牛奶和面包": { options: ["杨帆喜欢牛奶和面包", "杨帆喜欢鸡蛋和面条", "杨帆喜欢鸡蛋和牛奶", "杨帆喜欢面包和面条"], correct: "杨帆喜欢牛奶和面包" },
                                "鸡蛋和面条": { options: ["杨帆喜欢鸡蛋和面条", "杨帆喜欢牛奶和面包", "杨帆喜欢鸡蛋和牛奶", "杨帆喜欢面包和面条"], correct: "杨帆喜欢鸡蛋和面条" },
                                "鸡蛋和牛奶": { options: ["杨帆喜欢鸡蛋和牛奶", "杨帆喜欢牛奶和面包", "杨帆喜欢鸡蛋和面条", "杨帆喜欢面包和面条"], correct: "杨帆喜欢鸡蛋和牛奶" },
                                "面包和面条": { options: ["杨帆喜欢面包和面条", "杨帆喜欢牛奶和面包", "杨帆喜欢鸡蛋和面条", "杨帆喜欢鸡蛋和牛奶"], correct: "杨帆喜欢面包和面条" }
                            }
                        },
                        chinese: "杨帆喜欢牛奶和面包"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "妈妈告诉孩子们早餐有什么",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Good morning, kids. It's time for breakfast. We have milk, bread, eggs and noodles today.",
                            question: "早餐有几种食物？",
                            options: ["4种", "3种", "2种", "5种"],
                            correct: "4种"
                        },
                        stepB: {
                            instruction: "妈妈说有milk, bread, eggs and noodles四种，哪个不在早餐里？",
                            optionsMap: {
                                "4种": { options: ["hamburger（汉堡）", "milk（牛奶）", "eggs（鸡蛋）", "bread（面包）"], correct: "hamburger（汉堡）" },
                                "3种": { options: ["hamburger（汉堡）", "milk（牛奶）", "eggs（鸡蛋）", "bread（面包）"], correct: "hamburger（汉堡）" },
                                "2种": { options: ["hamburger（汉堡）", "milk（牛奶）", "eggs（鸡蛋）", "bread（面包）"], correct: "hamburger（汉堡）" },
                                "5种": { options: ["hamburger（汉堡）", "milk（牛奶）", "eggs（鸡蛋）", "bread（面包）"], correct: "hamburger（汉堡）" }
                            }
                        },
                        chinese: "早餐有4种食物"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "杨明饿了要吃早餐",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Good morning, Mom. I'm hungry. It's time for breakfast.",
                            question: "杨明怎么了？",
                            options: ["饿了", "渴了", "累了", "开心"],
                            correct: "饿了"
                        },
                        stepB: {
                            instruction: "杨明说I'm hungry（饿了），该做什么？提示：It's time for breakfast",
                            optionsMap: {
                                "饿了": { options: ["吃早餐", "吃午餐", "吃晚餐", "去睡觉"], correct: "吃早餐" },
                                "渴了": { options: ["喝牛奶", "吃早餐", "吃晚餐", "去睡觉"], correct: "喝牛奶" },
                                "累了": { options: ["去休息", "吃早餐", "吃晚餐", "喝牛奶"], correct: "去休息" },
                                "开心": { options: ["吃早餐", "去休息", "吃晚餐", "喝牛奶"], correct: "吃早餐" }
                            }
                        },
                        chinese: "杨明饿了→吃早餐"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "两个人的早餐选择不同。杨明选鸡蛋面条，杨帆选牛奶面包。",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Yang Ming: I like eggs and noodles. Yang Fan: I like milk and bread.",
                            question: "谁喜欢牛奶？",
                            options: ["Yang Fan", "Yang Ming", "妈妈", "都喜欢"],
                            correct: "Yang Fan"
                        },
                        stepB: {
                            instruction: "杨帆说了I like milk and bread，杨明说了I like eggs and noodles。谁喜欢面条？",
                            optionsMap: {
                                "Yang Fan":  { options: ["Yang Ming", "Yang Fan", "妈妈", "都喜欢"], correct: "Yang Ming" },
                                "Yang Ming": { options: ["Yang Ming", "Yang Fan", "妈妈", "都喜欢"], correct: "Yang Ming" },
                                "妈妈":      { options: ["Yang Ming", "Yang Fan", "妈妈", "都喜欢"], correct: "Yang Ming" },
                                "都喜欢":    { options: ["Yang Ming", "Yang Fan", "妈妈", "都喜欢"], correct: "Yang Ming" }
                            }
                        },
                        chinese: "杨帆喜欢牛奶，杨明喜欢面条"
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
                        sentence: "Good morning, Mom.",
                        stepA: { words: ["Good", "morning,"], instruction: "选前半句的词" },
                        stepB: { words: ["Mom."], instruction: "选后半句的词" },
                        chinese: "早上好，妈妈。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "I'm hungry.",
                        stepA: { words: ["I'm"], instruction: "选前半句的词" },
                        stepB: { words: ["hungry."], instruction: "选后半句的词" },
                        chinese: "我饿了。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "I like eggs and noodles.",
                        stepA: { words: ["I", "like"], instruction: "选前半句的词" },
                        stepB: { words: ["eggs", "and", "noodles."], instruction: "选后半句的词" },
                        chinese: "我喜欢鸡蛋和面条。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "I like milk and bread.",
                        stepA: { words: ["I", "like"], instruction: "选前半句的词" },
                        stepB: { words: ["milk", "and", "bread."], instruction: "选后半句的词" },
                        chinese: "我喜欢牛奶和面包。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "It's time for breakfast.",
                        stepA: { words: ["It's", "time"], instruction: "选前半句的词" },
                        stepB: { words: ["for", "breakfast."], instruction: "选后半句的词" },
                        chinese: "该吃早餐了。"
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
                        template: "What do you ___ for breakfast? I like ___ and noodles.",
                        image: '<img src="assets/images/egg.png" width="70">',
                        stepA: { blank: 1, options: ["like", "want", "eat", "have"], correct: "like", instruction: "填第1个空：What do you ___ for breakfast?" },
                        stepB: { blank: 2, options: ["eggs", "milk", "bread", "noodles"], correct: "eggs", instruction: "图片是鸡蛋（eggs），I like ___ and noodles，填第2个空" },
                        chinese: "What do you like for breakfast? I like eggs and noodles."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "I ___ milk and ___.",
                        image: '<img src="assets/images/bread.png" width="70">',
                        stepA: { blank: 1, options: ["like", "want", "eat", "have"], correct: "like", instruction: "填第1个空：I ___ milk and..." },
                        stepB: { blank: 2, options: ["bread", "eggs", "noodles", "milk"], correct: "bread", instruction: "图片是面包（bread），I like milk and ___，填第2个空" },
                        chinese: "I like milk and bread."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "Good ___, kids. I'm ___.",
                        image: '<img src="assets/images/breakfast.png" width="70">',
                        stepA: { blank: 1, options: ["morning", "afternoon", "evening", "night"], correct: "morning", instruction: "早上好！Good ___，填第1个空" },
                        stepB: { blank: 2, options: ["hungry", "happy", "sorry", "good"], correct: "hungry", instruction: "肚子饿了！I'm ___，填第2个空" },
                        chinese: "Good morning, kids. I'm hungry."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "We ___ milk, bread, eggs and ___ today.",
                        image: '<img src="assets/images/noodle.png" width="70">',
                        stepA: { blank: 1, options: ["have", "like", "want", "eat"], correct: "have", instruction: "我们有...：We ___ milk, bread...，填第1个空" },
                        stepB: { blank: 2, options: ["noodles", "eggs", "milk", "bread"], correct: "noodles", instruction: "图片是面条（noodles），...eggs and ___，填第2个空" },
                        chinese: "We have milk, bread, eggs and noodles today."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "It's ___ for ___.",
                        image: '<img src="assets/images/breakfast.png" width="70">',
                        stepA: { blank: 1, options: ["time", "good", "my", "your"], correct: "time", instruction: "该...了：It's ___ for...，填第1个空" },
                        stepB: { blank: 2, options: ["breakfast", "lunch", "dinner", "morning"], correct: "breakfast", instruction: "图片是早餐，It's time for ___，填第2个空" },
                        chinese: "It's time for breakfast."
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
                        word: "milk",
                        image: '<img src="assets/images/milk.png" width="60">',
                        stepA: { letters: ["m", "i"], distractors: ["a", "o"], instruction: "拼前半：m___" },
                        stepB: { letters: ["l", "k"], distractors: ["n", "d"], instruction: "拼后半：___lk" },
                        chinese: "牛奶"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "bread",
                        image: '<img src="assets/images/bread.png" width="60">',
                        stepA: { letters: ["b", "r", "e"], distractors: ["a", "o"], instruction: "拼前半：b____" },
                        stepB: { letters: ["a", "d"], distractors: ["t", "n"], instruction: "拼后半：___ad" },
                        chinese: "面包"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "eggs",
                        image: '<img src="assets/images/egg.png" width="60">',
                        stepA: { letters: ["e", "g"], distractors: ["a", "o"], instruction: "拼前半：e___" },
                        stepB: { letters: ["g", "s"], distractors: ["t", "n"], instruction: "拼后半：___gs" },
                        chinese: "鸡蛋"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "noodles",
                        image: '<img src="assets/images/noodle.png" width="60">',
                        stepA: { letters: ["n", "o", "o", "d"], distractors: ["a", "u"], instruction: "拼前半：n______" },
                        stepB: { letters: ["l", "e", "s"], distractors: ["t", "r"], instruction: "拼后半：____les" },
                        chinese: "面条"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "hungry",
                        image: '<img src="assets/images/breakfast.png" width="60">',
                        stepA: { letters: ["h", "u", "n"], distractors: ["a", "o"], instruction: "拼前半：h_____" },
                        stepB: { letters: ["g", "r", "y"], distractors: ["t", "d"], instruction: "拼后半：____gry" },
                        chinese: "饿的"
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
                        scenario: "早上妈妈问你早餐想吃什么（你喜欢鸡蛋和面条）",
                        stepA: {
                            instruction: "妈妈问你早餐想吃什么，怎么问？",
                            options: ["What do you like for breakfast?", "Good morning.", "I'm hungry.", "It's time for lunch."]
                        },
                        stepB: {
                            instruction: "你喜欢鸡蛋和面条，回答妈妈",
                            optionsMap: {
                                "What do you like for breakfast?": { options: ["I like eggs and noodles.", "I like milk.", "Good morning.", "I'm hungry."], correct: "I like eggs and noodles." },
                                "Good morning.":                   { options: ["Good morning, Mom.", "I like eggs.", "I'm hungry.", "Thank you."], correct: "Good morning, Mom." },
                                "I'm hungry.":                     { options: ["It's time for breakfast.", "Good morning.", "I like eggs.", "Thank you."], correct: "It's time for breakfast." },
                                "It's time for lunch.":            { options: ["OK!", "Good morning.", "I like eggs.", "Thank you."], correct: "OK!" }
                            }
                        },
                        chinese: "问早餐→回答喜欢鸡蛋面条"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "杨帆喜欢牛奶和面包，问她早餐想吃什么",
                        stepA: {
                            instruction: "问杨帆早餐喜欢什么",
                            options: ["What do you like for breakfast?", "I like milk and bread.", "Good morning.", "I'm hungry."]
                        },
                        stepB: {
                            instruction: "杨帆喜欢牛奶和面包，帮她回答",
                            optionsMap: {
                                "What do you like for breakfast?": { options: ["I like milk and bread.", "I like eggs and noodles.", "Good morning.", "I'm hungry."], correct: "I like milk and bread." },
                                "I like milk and bread.":          { options: ["OK!", "Good morning.", "I'm hungry.", "Thank you."], correct: "OK!" },
                                "Good morning.":                   { options: ["Good morning!", "I like milk.", "I'm hungry.", "Thank you."], correct: "Good morning!" },
                                "I'm hungry.":                     { options: ["It's time for breakfast.", "Good morning.", "OK!", "Thank you."], correct: "It's time for breakfast." }
                            }
                        },
                        chinese: "问杨帆→牛奶面包"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "早上和妈妈打招呼，然后说饿了",
                        stepA: {
                            instruction: "早上和妈妈打招呼",
                            options: ["Good morning, Mom.", "Good afternoon.", "Good evening.", "Good night."]
                        },
                        stepB: {
                            instruction: "A说了早上好，接下来说饿了",
                            optionsMap: {
                                "Good morning, Mom.": { options: ["I'm hungry.", "I'm happy.", "I'm sorry.", "Thank you."], correct: "I'm hungry." },
                                "Good afternoon.":    { options: ["I'm hungry.", "Good morning.", "I'm sorry.", "Thank you."], correct: "I'm hungry." },
                                "Good evening.":      { options: ["I'm hungry.", "Good morning.", "I'm sorry.", "Thank you."], correct: "I'm hungry." },
                                "Good night.":        { options: ["I'm hungry.", "Good morning.", "I'm sorry.", "Thank you."], correct: "I'm hungry." }
                            }
                        },
                        chinese: "早上好→我饿了"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "妈妈说该吃早餐了，告诉孩子今天有什么（牛奶、面包、鸡蛋、面条）",
                        stepA: {
                            instruction: "妈妈说该吃早餐了",
                            options: ["It's time for breakfast.", "It's time for lunch.", "Good morning.", "I'm hungry."]
                        },
                        stepB: {
                            instruction: "妈妈说了该吃早餐了，接着说今天有牛奶、面包、鸡蛋和面条",
                            optionsMap: {
                                "It's time for breakfast.": { options: ["We have milk, bread, eggs and noodles.", "I like eggs.", "Good morning.", "I'm hungry."], correct: "We have milk, bread, eggs and noodles." },
                                "It's time for lunch.":     { options: ["We have milk, bread, eggs and noodles.", "I like eggs.", "Good morning.", "I'm hungry."], correct: "We have milk, bread, eggs and noodles." },
                                "Good morning.":            { options: ["It's time for breakfast.", "I like eggs.", "We have milk.", "I'm hungry."], correct: "It's time for breakfast." },
                                "I'm hungry.":              { options: ["It's time for breakfast.", "I like eggs.", "Good morning.", "We have milk."], correct: "It's time for breakfast." }
                            }
                        },
                        chinese: "该吃早餐了→告诉有什么食物"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "完整早餐对话：妈妈问→杨明回答鸡蛋面条→妈妈问杨帆→杨帆回答牛奶面包",
                        stepA: {
                            instruction: "选一个人物，问他/她早餐喜欢什么",
                            options: [
                                { html: "问Yang Ming", value: "Yang Ming" },
                                { html: "问Yang Fan", value: "Yang Fan" }
                            ]
                        },
                        stepB: {
                            instruction: "记住：Yang Ming喜欢鸡蛋和面条，Yang Fan喜欢牛奶和面包。替A选的人回答",
                            optionsMap: {
                                "Yang Ming": { options: ["I like eggs and noodles.", "I like milk and bread.", "I'm hungry.", "Good morning."], correct: "I like eggs and noodles." },
                                "Yang Fan":  { options: ["I like milk and bread.", "I like eggs and noodles.", "I'm hungry.", "Good morning."], correct: "I like milk and bread." }
                            }
                        },
                        chinese: "问人物→按角色回答"
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
                    {
                        type: "coop_read_relay", word: "milk", chinese: "牛奶", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "bread", chinese: "面包", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "eggs", chinese: "鸡蛋", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "noodles", chinese: "面条", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "breakfast", chinese: "早餐", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "Good morning", chinese: "早上好", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "I'm hungry", chinese: "我饿了", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "I like eggs and noodles", chinese: "我喜欢鸡蛋和面条", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "I like milk and bread", chinese: "我喜欢牛奶和面包", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "What do you like for breakfast", chinese: "你早餐喜欢吃什么", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    }
                ]
            },

            // ── 站点2：看图说话（medium）──
            {
                id: 2, name: "看图说话", icon: "💬",
                difficulty: "medium",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "看图片和句型框架，说出完整句子",
                questions: [
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/egg.png" width="90">',
                        answer: "I like eggs",
                        chinese: "我喜欢鸡蛋",
                        stepA: {
                            instruction: "看图片，说出完整句子：I like _____.",
                            expected: "I like eggs",
                            chinese: "我喜欢鸡蛋"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I like _____.",
                            expected: "I like eggs",
                            chinese: "我喜欢鸡蛋"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/noodle.png" width="90">',
                        answer: "I like noodles",
                        chinese: "我喜欢面条",
                        stepA: {
                            instruction: "看图片，说出完整句子：I like _____.",
                            expected: "I like noodles",
                            chinese: "我喜欢面条"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I like _____.",
                            expected: "I like noodles",
                            chinese: "我喜欢面条"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/milk.png" width="90">',
                        answer: "I like milk",
                        chinese: "我喜欢牛奶",
                        stepA: {
                            instruction: "看图片，说出完整句子：I like _____.",
                            expected: "I like milk",
                            chinese: "我喜欢牛奶"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I like _____.",
                            expected: "I like milk",
                            chinese: "我喜欢牛奶"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/bread.png" width="90">',
                        answer: "I like bread",
                        chinese: "我喜欢面包",
                        stepA: {
                            instruction: "看图片，说出完整句子：I like _____.",
                            expected: "I like bread",
                            chinese: "我喜欢面包"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I like _____.",
                            expected: "I like bread",
                            chinese: "我喜欢面包"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/egg.png" width="90">',
                        answer: "I like eggs and noodles",
                        chinese: "我喜欢鸡蛋和面条",
                        stepA: {
                            instruction: "看图片，说出完整句子：I like _____ and _____.",
                            expected: "I like eggs and noodles",
                            chinese: "我喜欢鸡蛋和面条"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I like _____ and _____.",
                            expected: "I like eggs and noodles",
                            chinese: "我喜欢鸡蛋和面条"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/milk.png" width="90">',
                        answer: "I like milk and bread",
                        chinese: "我喜欢牛奶和面包",
                        stepA: {
                            instruction: "看图片，说出完整句子：I like _____ and _____.",
                            expected: "I like milk and bread",
                            chinese: "我喜欢牛奶和面包"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I like _____ and _____.",
                            expected: "I like milk and bread",
                            chinese: "我喜欢牛奶和面包"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/breakfast.png" width="90">',
                        answer: "What do you like for breakfast",
                        chinese: "你早餐喜欢吃什么",
                        stepA: {
                            instruction: "看图片，说出完整句子：What do you like for _____?",
                            expected: "What do you like for breakfast",
                            chinese: "你早餐喜欢吃什么"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：What do you like for _____?",
                            expected: "What do you like for breakfast",
                            chinese: "你早餐喜欢吃什么"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/breakfast.png" width="90">',
                        answer: "It's time for breakfast",
                        chinese: "该吃早餐了",
                        stepA: {
                            instruction: "看图片，说出完整句子：It's time for _____.",
                            expected: "It's time for breakfast",
                            chinese: "该吃早餐了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：It's time for _____.",
                            expected: "It's time for breakfast",
                            chinese: "该吃早餐了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/breakfast.png" width="90">',
                        answer: "Good morning",
                        chinese: "早上好",
                        stepA: {
                            instruction: "看图片，说出完整句子：Good _____.",
                            expected: "Good morning",
                            chinese: "早上好"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Good _____.",
                            expected: "Good morning",
                            chinese: "早上好"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/breakfast.png" width="90">',
                        answer: "I'm hungry",
                        chinese: "我饿了",
                        stepA: {
                            instruction: "看图片，说出完整句子：I'm _____.",
                            expected: "I'm hungry",
                            chinese: "我饿了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I'm _____.",
                            expected: "I'm hungry",
                            chinese: "我饿了"
                        }
                    }
                ]
            },

            // ── 站点3：合作对话（hard）──
            {
                id: 3, name: "合作对话", icon: "🗣️",
                difficulty: "hard",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A问早餐喜欢什么，B回答，合作完成对话",
                questions: [
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问杨明早餐喜欢什么",
                        image: '<img src="assets/images/egg.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问早餐喜欢什么",
                            role: "提问者",
                            line: "What do you like for breakfast",
                            chinese: "你早餐喜欢吃什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答喜欢鸡蛋和面条",
                            role: "回答者",
                            line: "I like eggs and noodles",
                            chinese: "我喜欢鸡蛋和面条。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问杨帆早餐喜欢什么",
                        image: '<img src="assets/images/milk.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问早餐喜欢什么",
                            role: "提问者",
                            line: "What do you like for breakfast",
                            chinese: "你早餐喜欢吃什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答喜欢牛奶和面包",
                            role: "回答者",
                            line: "I like milk and bread",
                            chinese: "我喜欢牛奶和面包。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "早上打招呼",
                        image: '<img src="assets/images/breakfast.png" width="90">',
                        stepA: {
                            instruction: "看示范句，打招呼",
                            role: "孩子",
                            line: "Good morning Mom",
                            chinese: "早上好，妈妈。"
                        },
                        stepB: {
                            instruction: "看示范句，回应",
                            role: "妈妈",
                            line: "Good morning kids",
                            chinese: "早上好，孩子们。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "说饿了，该吃早餐了",
                        image: '<img src="assets/images/breakfast.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说饿了",
                            role: "孩子",
                            line: "I'm hungry",
                            chinese: "我饿了。"
                        },
                        stepB: {
                            instruction: "看示范句，说该吃早餐了",
                            role: "妈妈",
                            line: "It's time for breakfast",
                            chinese: "该吃早餐了。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "妈妈告诉有什么食物",
                        image: '<img src="assets/images/breakfast.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说今天有什么",
                            role: "妈妈",
                            line: "We have milk bread eggs and noodles",
                            chinese: "我们有牛奶、面包、鸡蛋和面条。"
                        },
                        stepB: {
                            instruction: "看示范句，说喜欢什么",
                            role: "孩子",
                            line: "I like eggs and noodles",
                            chinese: "我喜欢鸡蛋和面条。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问杨帆喜欢什么",
                        image: '<img src="assets/images/bread.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问杨帆",
                            role: "妈妈",
                            line: "What about you Yang Fan",
                            chinese: "你呢，杨帆？"
                        },
                        stepB: {
                            instruction: "看示范句，杨帆回答",
                            role: "杨帆",
                            line: "I like milk and bread",
                            chinese: "我喜欢牛奶和面包。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "说喜欢鸡蛋",
                        image: '<img src="assets/images/egg.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说喜欢鸡蛋",
                            role: "学生A",
                            line: "I like eggs",
                            chinese: "我喜欢鸡蛋。"
                        },
                        stepB: {
                            instruction: "看示范句，说喜欢面条",
                            role: "学生B",
                            line: "I like noodles",
                            chinese: "我喜欢面条。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "说喜欢牛奶",
                        image: '<img src="assets/images/milk.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说喜欢牛奶",
                            role: "学生A",
                            line: "I like milk",
                            chinese: "我喜欢牛奶。"
                        },
                        stepB: {
                            instruction: "看示范句，说喜欢面包",
                            role: "学生B",
                            line: "I like bread",
                            chinese: "我喜欢面包。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "完整早餐对话1",
                        image: '<img src="assets/images/breakfast.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问早餐喜欢什么",
                            role: "提问者",
                            line: "What do you like for breakfast",
                            chinese: "你早餐喜欢吃什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答喜欢鸡蛋和面条",
                            role: "回答者",
                            line: "I like eggs and noodles",
                            chinese: "我喜欢鸡蛋和面条。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "完整早餐对话2",
                        image: '<img src="assets/images/breakfast.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问早餐喜欢什么",
                            role: "提问者",
                            line: "What do you like for breakfast",
                            chinese: "你早餐喜欢吃什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答喜欢牛奶和面包",
                            role: "回答者",
                            line: "I like milk and bread",
                            chinese: "我喜欢牛奶和面包。"
                        }
                    }
                ]
            }
        ]
    }
};

// 导出（兼容直接 script 引入）
if (typeof window !== 'undefined') {
    window.u4l1_coop = u4l1_coop;
}
