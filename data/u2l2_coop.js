/**
 * U2L2 合作冒险题库 — Whose shirt is this?
 * 主题：谁的衣服
 * 新词汇：whose, shirt, jacket, my, your, here, thank you, you're welcome, sorry
 * 累积词汇：U1全部 + U2L1全部（size, S, M, L, XL, wear, T-shirt, too, small, big, put on, team, please, boys, girls）
 * 句型：Whose ___ is this? / It's ___'s. / Is this your ___? / Yes, it is. / No, it isn't. / This is my ___. / Thank you. / You're welcome. / Here you are.
 */

var u2l2_coop = {
    id: "U2L2",
    title: "Whose shirt is this?",
    theme: "whose clothes",

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
                        type: "coop_listen_relay", audio: "shirt", chinese: "衬衫", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/shirt.png" width="70">', value: "shirt" },
                                { html: '<img src="assets/images/jacket.png" width="70">', value: "jacket" },
                                { html: '<img src="assets/images/T-shirt.png" width="70">', value: "T-shirt" },
                                { html: '<img src="assets/images/sweater.png" width="70">', value: "sweater" }
                            ],
                            correct: "shirt"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "shirt":   { options: ["衬衫","夹克","T恤","毛衣"], correct: "衬衫" },
                                "jacket":  { options: ["夹克","衬衫","T恤","毛衣"], correct: "夹克" },
                                "T-shirt": { options: ["T恤","衬衫","夹克","毛衣"], correct: "T恤" },
                                "sweater": { options: ["毛衣","衬衫","夹克","T恤"], correct: "毛衣" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "jacket", chinese: "夹克", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/jacket.png" width="70">', value: "jacket" },
                                { html: '<img src="assets/images/shirt.png" width="70">', value: "shirt" },
                                { html: '<img src="assets/images/sweater.png" width="70">', value: "sweater" },
                                { html: '<img src="assets/images/shorts.png" width="70">', value: "shorts" }
                            ],
                            correct: "jacket"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "jacket":  { options: ["夹克","衬衫","毛衣","短裤"], correct: "夹克" },
                                "shirt":   { options: ["衬衫","夹克","毛衣","短裤"], correct: "衬衫" },
                                "sweater": { options: ["毛衣","夹克","衬衫","短裤"], correct: "毛衣" },
                                "shorts":  { options: ["短裤","夹克","衬衫","毛衣"], correct: "短裤" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "T-shirt", chinese: "T恤", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/T-shirt.png" width="70">', value: "T-shirt" },
                                { html: '<img src="assets/images/shirt.png" width="70">', value: "shirt" },
                                { html: '<img src="assets/images/jacket.png" width="70">', value: "jacket" },
                                { html: '<img src="assets/images/skirt.png" width="70">', value: "skirt" }
                            ],
                            correct: "T-shirt"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "T-shirt": { options: ["T恤","衬衫","夹克","裙子"], correct: "T恤" },
                                "shirt":   { options: ["衬衫","T恤","夹克","裙子"], correct: "衬衫" },
                                "jacket":  { options: ["夹克","T恤","衬衫","裙子"], correct: "夹克" },
                                "skirt":   { options: ["裙子","T恤","衬衫","夹克"], correct: "裙子" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "sweater", chinese: "毛衣", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/sweater.png" width="70">', value: "sweater" },
                                { html: '<img src="assets/images/T-shirt.png" width="70">', value: "T-shirt" },
                                { html: '<img src="assets/images/shirt.png" width="70">', value: "shirt" },
                                { html: '<img src="assets/images/jacket.png" width="70">', value: "jacket" }
                            ],
                            correct: "sweater"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "sweater": { options: ["毛衣","T恤","衬衫","夹克"], correct: "毛衣" },
                                "T-shirt": { options: ["T恤","毛衣","衬衫","夹克"], correct: "T恤" },
                                "shirt":   { options: ["衬衫","毛衣","T恤","夹克"], correct: "衬衫" },
                                "jacket":  { options: ["夹克","毛衣","T恤","衬衫"], correct: "夹克" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "skirt", chinese: "裙子", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/skirt.png" width="70">', value: "skirt" },
                                { html: '<img src="assets/images/shorts.png" width="70">', value: "shorts" },
                                { html: '<img src="assets/images/shirt.png" width="70">', value: "shirt" },
                                { html: '<img src="assets/images/jacket.png" width="70">', value: "jacket" }
                            ],
                            correct: "skirt"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "skirt":   { options: ["裙子","短裤","衬衫","夹克"], correct: "裙子" },
                                "shorts":  { options: ["短裤","裙子","衬衫","夹克"], correct: "短裤" },
                                "shirt":   { options: ["衬衫","裙子","短裤","夹克"], correct: "衬衫" },
                                "jacket":  { options: ["夹克","裙子","短裤","衬衫"], correct: "夹克" }
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
                        type: "coop_listen_judge", audio: "shirt", difficulty: "easy",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        isMatch: true, chinese: "衬衫",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                            ],
                            correct: "shirt"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "jacket", difficulty: "easy",
                        image: '<img src="assets/images/sweater.png" width="90">',
                        isMatch: false, chinese: "夹克",
                        correctImage: '<img src="assets/images/jacket.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" },
                                { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" }
                            ],
                            correct: "jacket"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "T-shirt", difficulty: "medium",
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        isMatch: true, chinese: "T恤",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                            ],
                            correct: "T-shirt"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "sweater", difficulty: "medium",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        isMatch: false, chinese: "毛衣",
                        correctImage: '<img src="assets/images/sweater.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" },
                                { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" }
                            ],
                            correct: "sweater"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "skirt", difficulty: "medium",
                        image: '<img src="assets/images/shorts.png" width="90">',
                        isMatch: false, chinese: "裙子",
                        correctImage: '<img src="assets/images/skirt.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/skirt.png" width="60">', value: "skirt" },
                                { html: '<img src="assets/images/shorts.png" width="60">', value: "shorts" },
                                { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" }
                            ],
                            correct: "skirt"
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
                        sequence: ["shirt", "jacket", "T-shirt"],
                        words: [
                            { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                            { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                            { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" }
                        ],
                        chinese: "shirt → jacket → T-shirt"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["sweater", "shirt", "skirt"],
                        words: [
                            { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" },
                            { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                            { html: '<img src="assets/images/skirt.png" width="60">', value: "skirt" }
                        ],
                        chinese: "sweater → shirt → skirt"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["jacket", "sweater", "shirt"],
                        words: [
                            { html: '<img src="assets/images/jacket.png" width="55">', value: "jacket" },
                            { html: '<img src="assets/images/sweater.png" width="55">', value: "sweater" },
                            { html: '<img src="assets/images/shirt.png" width="55">', value: "shirt" }
                        ],
                        chinese: "jacket → sweater → shirt"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["T-shirt", "skirt", "jacket"],
                        words: [
                            { html: '<img src="assets/images/T-shirt.png" width="55">', value: "T-shirt" },
                            { html: '<img src="assets/images/skirt.png" width="55">', value: "skirt" },
                            { html: '<img src="assets/images/jacket.png" width="55">', value: "jacket" }
                        ],
                        chinese: "T-shirt → skirt → jacket"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["shirt", "jacket", "sweater", "T-shirt"],
                        words: [
                            { html: '<img src="assets/images/shirt.png" width="50">', value: "shirt" },
                            { html: '<img src="assets/images/jacket.png" width="50">', value: "jacket" },
                            { html: '<img src="assets/images/sweater.png" width="50">', value: "sweater" },
                            { html: '<img src="assets/images/T-shirt.png" width="50">', value: "T-shirt" }
                        ],
                        chinese: "shirt → jacket → sweater → T-shirt"
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
                        scenario: "操场上捡到一件衬衫，要找主人",
                        audio: "Whose shirt is this? It's Yang Ming's shirt.",
                        stepA: {
                            instruction: "听音频，这是谁的衬衫？",
                            question: "衬衫是谁的？",
                            options: ["Yang Ming's", "Wang Tao's", "Li Li's", "老师的"],
                            correct: "Yang Ming's"
                        },
                        stepB: {
                            instruction: "A听到了主人，把衣服还给他",
                            question: "怎么还衣服？",
                            optionsMap: {
                                "Yang Ming's": { options: ["Yang Ming, here you are.", "Thank you.", "It's my shirt.", "You're welcome."], correct: "Yang Ming, here you are." },
                                "Wang Tao's":  { options: ["Wang Tao, here you are.", "Thank you.", "It's my shirt.", "You're welcome."], correct: "Wang Tao, here you are." },
                                "Li Li's":     { options: ["Li Li, here you are.", "Thank you.", "It's my shirt.", "You're welcome."], correct: "Li Li, here you are." },
                                "老师的":       { options: ["老师, here you are.", "Thank you.", "It's my shirt.", "You're welcome."], correct: "老师, here you are." }
                            }
                        },
                        chinese: "Yang Ming的衬衫"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "问同学这是不是他的夹克",
                        audio: "Is this your jacket? No, it isn't. It's Wang Tao's jacket.",
                        stepA: {
                            instruction: "听音频，这是谁的夹克？",
                            question: "夹克是谁的？",
                            options: ["Wang Tao's", "Yang Ming's", "我的", "Li Li's"],
                            correct: "Wang Tao's"
                        },
                        stepB: {
                            instruction: "找到了主人，怎么说？",
                            question: "把夹克还给主人",
                            optionsMap: {
                                "Wang Tao's":  { options: ["Wang Tao, this is your jacket.", "This is my jacket.", "Thank you.", "It's too big."], correct: "Wang Tao, this is your jacket." },
                                "Yang Ming's": { options: ["Yang Ming, this is your jacket.", "This is my jacket.", "Thank you.", "It's too big."], correct: "Yang Ming, this is your jacket." },
                                "我的":         { options: ["This is my jacket.", "Thank you.", "Here you are.", "It's too big."], correct: "This is my jacket." },
                                "Li Li's":     { options: ["Li Li, this is your jacket.", "This is my jacket.", "Thank you.", "It's too big."], correct: "Li Li, this is your jacket." }
                            }
                        },
                        chinese: "Wang Tao的夹克"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "有人把衣服还给你",
                        audio: "This is your shirt. Here you are. Thank you. You're welcome.",
                        stepA: {
                            instruction: "听音频，别人还了什么衣服？",
                            question: "还了什么衣服？",
                            options: ["shirt", "jacket", "T-shirt", "sweater"],
                            correct: "shirt"
                        },
                        stepB: {
                            instruction: "别人还了衣服，你怎么回答？",
                            question: "怎么说谢谢？",
                            optionsMap: {
                                "shirt":   { options: ["Thank you!", "You're welcome.", "I'm sorry.", "It's too big."], correct: "Thank you!" },
                                "jacket":  { options: ["Thank you!", "You're welcome.", "I'm sorry.", "It's too big."], correct: "Thank you!" },
                                "T-shirt": { options: ["Thank you!", "You're welcome.", "I'm sorry.", "It's too big."], correct: "Thank you!" },
                                "sweater": { options: ["Thank you!", "You're welcome.", "I'm sorry.", "It's too big."], correct: "Thank you!" }
                            }
                        },
                        chinese: "还衬衫，说谢谢"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "操场上找衣服主人",
                        audio: "Whose jacket is this? Is this your jacket? Yes, it is. This is my jacket.",
                        stepA: {
                            instruction: "听音频，衣服找到主人了吗？",
                            question: "主人说什么？",
                            options: ["Yes, it is.", "No, it isn't.", "I'm sorry.", "Thank you."],
                            correct: "Yes, it is."
                        },
                        stepB: {
                            instruction: "找到主人了，把衣服给他",
                            question: "怎么把衣服给他？",
                            optionsMap: {
                                "Yes, it is.":  { options: ["Here you are.", "I'm sorry.", "It's too big.", "No, it isn't."], correct: "Here you are." },
                                "No, it isn't.": { options: ["继续找主人", "Here you are.", "Thank you.", "It's too big."], correct: "继续找主人" },
                                "I'm sorry.":   { options: ["没关系", "Here you are.", "Thank you.", "It's too big."], correct: "没关系" },
                                "Thank you.":   { options: ["You're welcome.", "Here you are.", "I'm sorry.", "It's too big."], correct: "You're welcome." }
                            }
                        },
                        chinese: "找到夹克主人了"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "这不是我的衣服",
                        audio: "Is this your shirt? No, it isn't. I'm sorry.",
                        stepA: {
                            instruction: "听音频，这是他的衬衫吗？",
                            question: "是他的吗？",
                            options: ["No, it isn't.", "Yes, it is.", "Thank you.", "Here you are."],
                            correct: "No, it isn't."
                        },
                        stepB: {
                            instruction: "不是他的，你怎么说？",
                            question: "继续找主人怎么问？",
                            optionsMap: {
                                "No, it isn't.": { options: ["Whose shirt is this?", "Thank you.", "It's too big.", "Here you are."], correct: "Whose shirt is this?" },
                                "Yes, it is.":   { options: ["Here you are.", "Whose shirt is this?", "Thank you.", "I'm sorry."], correct: "Here you are." },
                                "Thank you.":    { options: ["You're welcome.", "Whose shirt is this?", "Here you are.", "I'm sorry."], correct: "You're welcome." },
                                "Here you are.": { options: ["Thank you.", "Whose shirt is this?", "I'm sorry.", "You're welcome."], correct: "Thank you." }
                            }
                        },
                        chinese: "不是他的衬衫"
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
                        image: '<img src="assets/images/shirt.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["shirt", "jacket", "T-shirt", "sweater"],
                            correct: "shirt"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "shirt":   { options: ["衬衫","夹克","T恤","毛衣"], correct: "衬衫" },
                                "jacket":  { options: ["夹克","衬衫","T恤","毛衣"], correct: "夹克" },
                                "T-shirt": { options: ["T恤","衬衫","夹克","毛衣"], correct: "T恤" },
                                "sweater": { options: ["毛衣","衬衫","夹克","T恤"], correct: "毛衣" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["jacket", "shirt", "sweater", "shorts"],
                            correct: "jacket"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "jacket":  { options: ["夹克","衬衫","毛衣","短裤"], correct: "夹克" },
                                "shirt":   { options: ["衬衫","夹克","毛衣","短裤"], correct: "衬衫" },
                                "sweater": { options: ["毛衣","夹克","衬衫","短裤"], correct: "毛衣" },
                                "shorts":  { options: ["短裤","夹克","衬衫","毛衣"], correct: "短裤" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["T-shirt", "shirt", "jacket", "skirt"],
                            correct: "T-shirt"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "T-shirt": { options: ["T恤","衬衫","夹克","裙子"], correct: "T恤" },
                                "shirt":   { options: ["衬衫","T恤","夹克","裙子"], correct: "衬衫" },
                                "jacket":  { options: ["夹克","T恤","衬衫","裙子"], correct: "夹克" },
                                "skirt":   { options: ["裙子","T恤","衬衫","夹克"], correct: "裙子" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/sweater.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["sweater", "jacket", "shirt", "T-shirt"],
                            correct: "sweater"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "sweater": { options: ["毛衣","夹克","衬衫","T恤"], correct: "毛衣" },
                                "jacket":  { options: ["夹克","毛衣","衬衫","T恤"], correct: "夹克" },
                                "shirt":   { options: ["衬衫","毛衣","夹克","T恤"], correct: "衬衫" },
                                "T-shirt": { options: ["T恤","毛衣","夹克","衬衫"], correct: "T恤" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/skirt.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["skirt", "shorts", "shirt", "sweater"],
                            correct: "skirt"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "skirt":   { options: ["裙子","短裤","衬衫","毛衣"], correct: "裙子" },
                                "shorts":  { options: ["短裤","裙子","衬衫","毛衣"], correct: "短裤" },
                                "shirt":   { options: ["衬衫","裙子","短裤","毛衣"], correct: "衬衫" },
                                "sweater": { options: ["毛衣","裙子","短裤","衬衫"], correct: "毛衣" }
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
                            { word: "shirt", match: '<img src="assets/images/shirt.png" width="50">', chinese: "衬衫" },
                            { word: "jacket", match: '<img src="assets/images/jacket.png" width="50">', chinese: "夹克" },
                            { word: "T-shirt", match: '<img src="assets/images/T-shirt.png" width="50">', chinese: "T恤" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "sweater", match: '<img src="assets/images/sweater.png" width="50">', chinese: "毛衣" },
                            { word: "skirt", match: '<img src="assets/images/skirt.png" width="50">', chinese: "裙子" },
                            { word: "shorts", match: '<img src="assets/images/shorts.png" width="50">', chinese: "短裤" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "shirt", match: '<img src="assets/images/shirt.png" width="50">', chinese: "衬衫" },
                            { word: "sweater", match: '<img src="assets/images/sweater.png" width="50">', chinese: "毛衣" },
                            { word: "jacket", match: '<img src="assets/images/jacket.png" width="50">', chinese: "夹克" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "T-shirt", match: '<img src="assets/images/T-shirt.png" width="50">', chinese: "T恤" },
                            { word: "shirt", match: '<img src="assets/images/shirt.png" width="50">', chinese: "衬衫" },
                            { word: "jacket", match: '<img src="assets/images/jacket.png" width="50">', chinese: "夹克" },
                            { word: "sweater", match: '<img src="assets/images/sweater.png" width="50">', chinese: "毛衣" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "skirt", match: '<img src="assets/images/skirt.png" width="50">', chinese: "裙子" },
                            { word: "shorts", match: '<img src="assets/images/shorts.png" width="50">', chinese: "短裤" },
                            { word: "shirt", match: '<img src="assets/images/shirt.png" width="50">', chinese: "衬衫" },
                            { word: "jacket", match: '<img src="assets/images/jacket.png" width="50">', chinese: "夹克" }
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
                        image: '<img src="assets/images/shirt.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "Whose shirt is this?", value: "Whose shirt is this?" },
                                { html: "Whose jacket is this?", value: "Whose jacket is this?" },
                                { html: "This is my T-shirt.", value: "This is my T-shirt." },
                                { html: "Put on your sweater.", value: "Put on your sweater." }
                            ],
                            correct: "Whose shirt is this?"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Whose shirt is this?":  { options: ["这是谁的衬衫？","这是谁的夹克？","这是我的T恤。","穿上你的毛衣。"], correct: "这是谁的衬衫？" },
                                "Whose jacket is this?": { options: ["这是谁的夹克？","这是谁的衬衫？","这是我的T恤。","穿上你的毛衣。"], correct: "这是谁的夹克？" },
                                "This is my T-shirt.":   { options: ["这是我的T恤。","这是谁的衬衫？","这是谁的夹克？","穿上你的毛衣。"], correct: "这是我的T恤。" },
                                "Put on your sweater.":  { options: ["穿上你的毛衣。","这是谁的衬衫？","这是谁的夹克？","这是我的T恤。"], correct: "穿上你的毛衣。" }
                            }
                        },
                        chinese: "这是谁的衬衫？"
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "Is this your jacket?", value: "Is this your jacket?" },
                                { html: "Is this your shirt?", value: "Is this your shirt?" },
                                { html: "This is my jacket.", value: "This is my jacket." },
                                { html: "Whose shirt is this?", value: "Whose shirt is this?" }
                            ],
                            correct: "Is this your jacket?"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Is this your jacket?": { options: ["这是你的夹克吗？","这是你的衬衫吗？","这是我的夹克。","这是谁的衬衫？"], correct: "这是你的夹克吗？" },
                                "Is this your shirt?":  { options: ["这是你的衬衫吗？","这是你的夹克吗？","这是我的夹克。","这是谁的衬衫？"], correct: "这是你的衬衫吗？" },
                                "This is my jacket.":   { options: ["这是我的夹克。","这是你的夹克吗？","这是你的衬衫吗？","这是谁的衬衫？"], correct: "这是我的夹克。" },
                                "Whose shirt is this?": { options: ["这是谁的衬衫？","这是你的夹克吗？","这是你的衬衫吗？","这是我的夹克。"], correct: "这是谁的衬衫？" }
                            }
                        },
                        chinese: "这是你的夹克吗？"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的回答",
                            options: [
                                { html: "Yes, it is.", value: "Yes, it is." },
                                { html: "No, it isn't.", value: "No, it isn't." },
                                { html: "Thank you.", value: "Thank you." },
                                { html: "You're welcome.", value: "You're welcome." }
                            ],
                            correct: "Yes, it is."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Yes, it is.":      { options: ["是的。","不是。","谢谢。","不客气。"], correct: "是的。" },
                                "No, it isn't.":    { options: ["不是。","是的。","谢谢。","不客气。"], correct: "不是。" },
                                "Thank you.":       { options: ["谢谢。","是的。","不是。","不客气。"], correct: "谢谢。" },
                                "You're welcome.":  { options: ["不客气。","是的。","不是。","谢谢。"], correct: "不客气。" }
                            }
                        },
                        chinese: "是的"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的英文",
                            options: [
                                { html: "This is my jacket.", value: "This is my jacket." },
                                { html: "This is your jacket.", value: "This is your jacket." },
                                { html: "Whose jacket is this?", value: "Whose jacket is this?" },
                                { html: "Here you are.", value: "Here you are." }
                            ],
                            correct: "This is my jacket."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "This is my jacket.":    { options: ["这是我的夹克。","这是你的夹克。","这是谁的夹克？","给你。"], correct: "这是我的夹克。" },
                                "This is your jacket.":  { options: ["这是你的夹克。","这是我的夹克。","这是谁的夹克？","给你。"], correct: "这是你的夹克。" },
                                "Whose jacket is this?": { options: ["这是谁的夹克？","这是我的夹克。","这是你的夹克。","给你。"], correct: "这是谁的夹克？" },
                                "Here you are.":         { options: ["给你。","这是我的夹克。","这是你的夹克。","这是谁的夹克？"], correct: "给你。" }
                            }
                        },
                        chinese: "这是我的夹克"
                    },
                    {
                        type: "coop_word_relay", difficulty: "hard",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        stepA: {
                            instruction: "读对话，选正确的回答",
                            options: [
                                { html: "It's Yang Ming's shirt.", value: "It's Yang Ming's shirt." },
                                { html: "It's my shirt.", value: "It's my shirt." },
                                { html: "Thank you.", value: "Thank you." },
                                { html: "Here you are.", value: "Here you are." }
                            ],
                            correct: "It's Yang Ming's shirt."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "It's Yang Ming's shirt.": { options: ["这是Yang Ming的衬衫。","这是我的衬衫。","谢谢。","给你。"], correct: "这是Yang Ming的衬衫。" },
                                "It's my shirt.":          { options: ["这是我的衬衫。","这是Yang Ming的衬衫。","谢谢。","给你。"], correct: "这是我的衬衫。" },
                                "Thank you.":              { options: ["谢谢。","这是Yang Ming的衬衫。","这是我的衬衫。","给你。"], correct: "谢谢。" },
                                "Here you are.":           { options: ["给你。","这是Yang Ming的衬衫。","这是我的衬衫。","谢谢。"], correct: "给你。" }
                            }
                        },
                        chinese: "这是Yang Ming的衬衫"
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
                        scenario: "操场上找衣服主人",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Whose shirt is this? Is this your shirt? No, it isn't.",
                            question: "这是他的衬衫吗？",
                            options: ["不是他的", "是他的", "不知道", "是我的"],
                            correct: "不是他的"
                        },
                        stepB: {
                            instruction: "根据A的描述，接下来怎么办？",
                            optionsMap: {
                                "不是他的": { options: ["继续问别人Whose shirt is this?", "扔掉", "穿上", "It's too big."], correct: "继续问别人Whose shirt is this?" },
                                "是他的":   { options: ["Here you are.", "继续找", "扔掉", "It's too big."], correct: "Here you are." },
                                "不知道":   { options: ["再问一次", "Here you are.", "扔掉", "It's too big."], correct: "再问一次" },
                                "是我的":   { options: ["This is my shirt.", "Here you are.", "扔掉", "It's too big."], correct: "This is my shirt." }
                            }
                        },
                        chinese: "不是他的衬衫→继续找"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "还衣服给同学",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Yang Ming, this is your shirt! Here you are. Thank you. You're welcome.",
                            question: "Yang Ming说了什么？",
                            options: ["Thank you.", "You're welcome.", "I'm sorry.", "It's too big."],
                            correct: "Thank you."
                        },
                        stepB: {
                            instruction: "Yang Ming说谢谢，你怎么回答？",
                            optionsMap: {
                                "Thank you.":      { options: ["You're welcome.", "Thank you.", "I'm sorry.", "It's too big."], correct: "You're welcome." },
                                "You're welcome.": { options: ["不用客气", "Thank you.", "I'm sorry.", "It's too big."], correct: "不用客气" },
                                "I'm sorry.":      { options: ["没关系", "Thank you.", "You're welcome.", "It's too big."], correct: "没关系" },
                                "It's too big.":   { options: ["换小一号", "Thank you.", "You're welcome.", "I'm sorry."], correct: "换小一号" }
                            }
                        },
                        chinese: "Thank you → You're welcome"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "找到衣服主人了",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Whose jacket is this? It's Wang Tao's jacket.",
                            question: "夹克是谁的？",
                            options: ["Wang Tao的", "Yang Ming的", "Li Li的", "我的"],
                            correct: "Wang Tao的"
                        },
                        stepB: {
                            instruction: "根据A的描述，还给主人",
                            optionsMap: {
                                "Wang Tao的":  { options: ["Wang Tao, here you are.", "Thank you.", "This is my jacket.", "It's too small."], correct: "Wang Tao, here you are." },
                                "Yang Ming的": { options: ["Yang Ming, here you are.", "Thank you.", "This is my jacket.", "It's too small."], correct: "Yang Ming, here you are." },
                                "Li Li的":     { options: ["Li Li, here you are.", "Thank you.", "This is my jacket.", "It's too small."], correct: "Li Li, here you are." },
                                "我的":         { options: ["This is my jacket.", "Here you are.", "Thank you.", "It's too small."], correct: "This is my jacket." }
                            }
                        },
                        chinese: "Wang Tao的夹克→还给他"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "问同学这是不是他的衣服",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Is this your shirt? Yes, it is. This is my shirt.",
                            question: "这是他的衬衫吗？",
                            options: ["是的", "不是", "不知道", "是别人的"],
                            correct: "是的"
                        },
                        stepB: {
                            instruction: "确认是他的，怎么说？",
                            optionsMap: {
                                "是的":     { options: ["Here you are.", "I'm sorry.", "It's too big.", "Whose shirt is this?"], correct: "Here you are." },
                                "不是":     { options: ["继续问别人", "Here you are.", "I'm sorry.", "It's too big."], correct: "继续问别人" },
                                "不知道":   { options: ["再问一次", "Here you are.", "I'm sorry.", "It's too big."], correct: "再问一次" },
                                "是别人的": { options: ["找别人还", "Here you are.", "I'm sorry.", "It's too big."], correct: "找别人还" }
                            }
                        },
                        chinese: "是他的衬衫→给他"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "读对话判断",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Is this your jacket? No, it isn't. It's Wang Tao's jacket.",
                            question: "这是谁的夹克？",
                            options: ["Wang Tao的", "我的", "Yang Ming的", "老师的"],
                            correct: "Wang Tao的"
                        },
                        stepB: {
                            instruction: "根据A的描述，选正确的图片",
                            optionsMap: {
                                "Wang Tao的": { options: [
                                    { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                    { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                    { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                    { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                                ], correct: "jacket" },
                                "我的": { options: [
                                    { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                    { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                    { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                    { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                                ], correct: "jacket" },
                                "Yang Ming的": { options: [
                                    { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                    { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                    { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                    { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                                ], correct: "jacket" },
                                "老师的": { options: [
                                    { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                    { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                    { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                    { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                                ], correct: "jacket" }
                            }
                        },
                        chinese: "Wang Tao的夹克"
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
                        sentence: "Whose shirt is this?",
                        stepA: { words: ["Whose", "shirt"], instruction: "选前半句的词" },
                        stepB: { words: ["is", "this?"], instruction: "选后半句的词" },
                        chinese: "这是谁的衬衫？"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "This is my jacket.",
                        stepA: { words: ["This", "is"], instruction: "选前半句的词" },
                        stepB: { words: ["my", "jacket."], instruction: "选后半句的词" },
                        chinese: "这是我的夹克。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "Is this your shirt?",
                        stepA: { words: ["Is", "this"], instruction: "选前半句的词" },
                        stepB: { words: ["your", "shirt?"], instruction: "选后半句的词" },
                        chinese: "这是你的衬衫吗？"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "Here you are. Thank you.",
                        stepA: { words: ["Here", "you", "are."], instruction: "排好第一句" },
                        stepB: { words: ["Thank", "you."], instruction: "排好第二句" },
                        chinese: "给你。谢谢。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "No, it isn't. It's Yang Ming's.",
                        stepA: { words: ["No,", "it", "isn't."], instruction: "排好第一句" },
                        stepB: { words: ["It's", "Yang", "Ming's."], instruction: "排好第二句" },
                        chinese: "不是。是Yang Ming的。"
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
                        template: "Whose ___ is this? It's Yang Ming's ___.",
                        image: '<img src="assets/images/shirt.png" width="70">',
                        stepA: { blank: 1, options: ["shirt", "jacket", "T-shirt", "sweater"], correct: "shirt", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["shirt", "jacket", "T-shirt", "sweater"], correct: "shirt", instruction: "图片是衬衫（shirt），填第2个空" },
                        chinese: "Whose shirt is this? It's Yang Ming's shirt."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "Is this ___ jacket? No, it ___.",
                        image: '<img src="assets/images/jacket.png" width="70">',
                        stepA: { blank: 1, options: ["your", "my", "his", "her"], correct: "your", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["isn't", "is", "are", "aren't"], correct: "isn't", instruction: "不是他的夹克！No, it ___，填第2个空" },
                        chinese: "Is this your jacket? No, it isn't."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "This is ___ shirt. Thank ___.",
                        image: '<img src="assets/images/shirt.png" width="70">',
                        stepA: { blank: 1, options: ["my", "your", "his", "her"], correct: "my", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["you", "me", "him", "her"], correct: "you", instruction: "填第2个空" },
                        chinese: "This is my shirt. Thank you."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "___ jacket is this? It's Wang Tao's ___.",
                        image: '<img src="assets/images/jacket.png" width="70">',
                        stepA: { blank: 1, options: ["Whose", "What", "Where", "Who"], correct: "Whose", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["jacket", "shirt", "T-shirt", "sweater"], correct: "jacket", instruction: "填第2个空" },
                        chinese: "Whose jacket is this? It's Wang Tao's jacket."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "Here you ___. You're ___.",
                        image: '<img src="assets/images/scenario_clothes.png" width="70">',
                        stepA: { blank: 1, options: ["are", "is", "am", "be"], correct: "are", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["welcome", "sorry", "good", "big"], correct: "welcome", instruction: "A说了给你（Here you are），你说不客气：You're ___，填第2个空" },
                        chinese: "Here you are. You're welcome."
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
                        word: "whose",
                        image: '<img src="assets/images/shirt.png" width="60">',
                        stepA: { letters: ["w", "h", "o"], distractors: ["a", "e"], instruction: "拼前半：w____" },
                        stepB: { letters: ["s", "e"], distractors: ["t", "n"], instruction: "拼后半：___se" },
                        chinese: "谁的"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "shirt",
                        image: '<img src="assets/images/shirt.png" width="60">',
                        stepA: { letters: ["s", "h", "i"], distractors: ["a", "o"], instruction: "拼前半：s____" },
                        stepB: { letters: ["r", "t"], distractors: ["n", "d"], instruction: "拼后半：___rt" },
                        chinese: "衬衫"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "jacket",
                        image: '<img src="assets/images/jacket.png" width="60">',
                        stepA: { letters: ["j", "a", "c"], distractors: ["o", "u"], instruction: "拼前半：j_____" },
                        stepB: { letters: ["k", "e", "t"], distractors: ["n", "d"], instruction: "拼后半：___ket" },
                        chinese: "夹克"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "sweater",
                        image: '<img src="assets/images/sweater.png" width="60">',
                        stepA: { letters: ["s", "w", "e", "a"], distractors: ["o", "u"], instruction: "拼前半：s______" },
                        stepB: { letters: ["t", "e", "r"], distractors: ["n", "d"], instruction: "拼后半：____ter" },
                        chinese: "毛衣"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "shorts",
                        image: '<img src="assets/images/shorts.png" width="60">',
                        stepA: { letters: ["s", "h", "o"], distractors: ["a", "e"], instruction: "拼前半：s_____" },
                        stepB: { letters: ["r", "t", "s"], distractors: ["n", "d"], instruction: "拼后半：___rts" },
                        chinese: "短裤"
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
                        scenario: "在操场上找衣服主人",
                        stepA: {
                            instruction: "你捡到一件衬衫，问问是谁的",
                            options: ["Whose shirt is this?", "This is my shirt.", "Put on your shirt.", "It's too small."]
                        },
                        stepB: {
                            instruction: "回答A的问题",
                            optionsMap: {
                                "Whose shirt is this?": { options: ["It's Yang Ming's shirt.", "Thank you.", "It's too big.", "Size M."], correct: "It's Yang Ming's shirt." },
                                "This is my shirt.":    { options: ["OK!", "It's Yang Ming's shirt.", "Thank you.", "Size M."], correct: "OK!" },
                                "Put on your shirt.":   { options: ["OK!", "It's Yang Ming's shirt.", "Thank you.", "Size M."], correct: "OK!" },
                                "It's too small.":      { options: ["换大一号", "It's Yang Ming's shirt.", "Thank you.", "OK!"], correct: "换大一号" }
                            }
                        },
                        chinese: "找衬衫主人"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "问同学这是不是他的夹克",
                        stepA: {
                            instruction: "问同学这是不是他的夹克",
                            options: ["Is this your jacket?", "Whose jacket is this?", "This is my jacket.", "Put on your jacket."]
                        },
                        stepB: {
                            instruction: "回答A的问题",
                            optionsMap: {
                                "Is this your jacket?":  { options: ["No, it isn't. It's Wang Tao's.", "Thank you.", "Size L.", "It's too big."], correct: "No, it isn't. It's Wang Tao's." },
                                "Whose jacket is this?": { options: ["It's Wang Tao's jacket.", "Thank you.", "Size L.", "It's too big."], correct: "It's Wang Tao's jacket." },
                                "This is my jacket.":    { options: ["OK!", "Thank you.", "Size L.", "It's too big."], correct: "OK!" },
                                "Put on your jacket.":   { options: ["OK!", "Thank you.", "Size L.", "It's too big."], correct: "OK!" }
                            }
                        },
                        chinese: "问是不是他的夹克"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "把衣服还给同学",
                        stepA: {
                            instruction: "把衣服还给同学",
                            options: ["Here you are.", "Thank you.", "I'm sorry.", "You're welcome."]
                        },
                        stepB: {
                            instruction: "同学还你衣服，你怎么说？",
                            optionsMap: {
                                "Here you are.":    { options: ["Thank you.", "You're welcome.", "I'm sorry.", "It's too big."], correct: "Thank you." },
                                "Thank you.":       { options: ["You're welcome.", "Thank you.", "I'm sorry.", "It's too big."], correct: "You're welcome." },
                                "I'm sorry.":       { options: ["没关系", "Thank you.", "You're welcome.", "It's too big."], correct: "没关系" },
                                "You're welcome.":  { options: ["OK!", "Thank you.", "I'm sorry.", "It's too big."], correct: "OK!" }
                            }
                        },
                        chinese: "还衣服→谢谢"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "确认衣服主人（衬衫=Yang Ming，夹克=Wang Tao，T恤=Li Li，毛衣=Yang Ming）",
                        stepA: {
                            instruction: "选一件衣服问主人",
                            options: [
                                { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                            ]
                        },
                        stepB: {
                            instruction: "记住：衬衫→Yang Ming，夹克→Wang Tao，T恤→Li Li，毛衣→Yang Ming。说出A选的衣服的主人",
                            optionsMap: {
                                "shirt":   { options: ["It's Yang Ming's shirt.", "It's my jacket.", "Thank you.", "Size M."], correct: "It's Yang Ming's shirt." },
                                "jacket":  { options: ["It's Wang Tao's jacket.", "It's my shirt.", "Thank you.", "Size M."], correct: "It's Wang Tao's jacket." },
                                "T-shirt": { options: ["It's Li Li's T-shirt.", "It's my jacket.", "Thank you.", "Size M."], correct: "It's Li Li's T-shirt." },
                                "sweater": { options: ["It's Yang Ming's sweater.", "It's my shirt.", "Thank you.", "Size M."], correct: "It's Yang Ming's sweater." }
                            }
                        },
                        chinese: "找衣服主人"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "完成找衣服的对话（衬衫=Yang Ming，夹克=Wang Tao；B扮衣服主人时说Yes, it is）",
                        stepA: {
                            instruction: "问这是谁的衣服",
                            options: ["Whose shirt is this?", "Whose jacket is this?", "Is this your shirt?", "Is this your jacket?"]
                        },
                        stepB: {
                            instruction: "Whose shirt→Yang Ming；Whose jacket→Wang Tao；Is this your___?→你是主人，说Yes, it is. Thank you.",
                            optionsMap: {
                                "Whose shirt is this?":  { options: ["It's Yang Ming's. Here you are.", "Thank you.", "You're welcome.", "It's too big."], correct: "It's Yang Ming's. Here you are." },
                                "Whose jacket is this?": { options: ["It's Wang Tao's. Here you are.", "Thank you.", "You're welcome.", "It's too big."], correct: "It's Wang Tao's. Here you are." },
                                "Is this your shirt?":   { options: ["Yes, it is. Thank you.", "No, it isn't.", "You're welcome.", "It's too big."], correct: "Yes, it is. Thank you." },
                                "Is this your jacket?":  { options: ["Yes, it is. Thank you.", "No, it isn't.", "You're welcome.", "It's too big."], correct: "Yes, it is. Thank you." }
                            }
                        },
                        chinese: "找衣服主人的完整对话"
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
                        type: "coop_read_relay", word: "whose", chinese: "谁的", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "shirt", chinese: "衬衫", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "jacket", chinese: "夹克", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "sorry", chinese: "对不起", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "welcome", chinese: "欢迎/不客气", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "Whose shirt is this", chinese: "这是谁的衬衫？", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "This is my jacket", chinese: "这是我的夹克。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "Is this your shirt", chinese: "这是你的衬衫吗？", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "Here you are", chinese: "给你。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "You're welcome", chinese: "不客气。", difficulty: "medium",
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
                        image: '<img src="assets/images/shirt.png" width="90">',
                        answer: "Whose shirt is this",
                        chinese: "这是谁的衬衫",
                        stepA: {
                            instruction: "看图片，说出完整句子：Whose _____ is this?",
                            expected: "Whose shirt is this",
                            chinese: "这是谁的衬衫"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Whose _____ is this?",
                            expected: "Whose shirt is this",
                            chinese: "这是谁的衬衫"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        answer: "Whose jacket is this",
                        chinese: "这是谁的夹克",
                        stepA: {
                            instruction: "看图片，说出完整句子：Whose _____ is this?",
                            expected: "Whose jacket is this",
                            chinese: "这是谁的夹克"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Whose _____ is this?",
                            expected: "Whose jacket is this",
                            chinese: "这是谁的夹克"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        answer: "This is my shirt",
                        chinese: "这是我的衬衫",
                        stepA: {
                            instruction: "看图片，说出完整句子：This is my _____.",
                            expected: "This is my shirt",
                            chinese: "这是我的衬衫"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：This is my _____.",
                            expected: "This is my shirt",
                            chinese: "这是我的衬衫"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        answer: "This is my jacket",
                        chinese: "这是我的夹克",
                        stepA: {
                            instruction: "看图片，说出完整句子：This is my _____.",
                            expected: "This is my jacket",
                            chinese: "这是我的夹克"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：This is my _____.",
                            expected: "This is my jacket",
                            chinese: "这是我的夹克"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        answer: "Is this your shirt",
                        chinese: "这是你的衬衫吗",
                        stepA: {
                            instruction: "看图片，说出完整句子：Is this your _____?",
                            expected: "Is this your shirt",
                            chinese: "这是你的衬衫吗"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Is this your _____?",
                            expected: "Is this your shirt",
                            chinese: "这是你的衬衫吗"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        answer: "Is this your jacket",
                        chinese: "这是你的夹克吗",
                        stepA: {
                            instruction: "看图片，说出完整句子：Is this your _____?",
                            expected: "Is this your jacket",
                            chinese: "这是你的夹克吗"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Is this your _____?",
                            expected: "Is this your jacket",
                            chinese: "这是你的夹克吗"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        answer: "Whose T-shirt is this",
                        chinese: "这是谁的T恤",
                        stepA: {
                            instruction: "看图片，说出完整句子：Whose _____ is this?",
                            expected: "Whose T-shirt is this",
                            chinese: "这是谁的T恤"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Whose _____ is this?",
                            expected: "Whose T-shirt is this",
                            chinese: "这是谁的T恤"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/sweater.png" width="90">',
                        answer: "This is my sweater",
                        chinese: "这是我的毛衣",
                        stepA: {
                            instruction: "看图片，说出完整句子：This is my _____.",
                            expected: "This is my sweater",
                            chinese: "这是我的毛衣"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：This is my _____.",
                            expected: "This is my sweater",
                            chinese: "这是我的毛衣"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/scenario_clothes.png" width="90">',
                        answer: "Here you are",
                        chinese: "给你",
                        stepA: {
                            instruction: "看图片，说出完整句子：Here you _____.",
                            expected: "Here you are",
                            chinese: "给你"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Here you _____.",
                            expected: "Here you are",
                            chinese: "给你"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/scenario_clothes.png" width="90">',
                        answer: "Thank you",
                        chinese: "谢谢",
                        stepA: {
                            instruction: "看图片，说出完整句子：Thank _____.",
                            expected: "Thank you",
                            chinese: "谢谢"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Thank _____.",
                            expected: "Thank you",
                            chinese: "谢谢"
                        }
                    }
                ]
            },

            // ── 站点3：合作对话（hard）──
            {
                id: 3, name: "合作对话", icon: "🗣️",
                difficulty: "hard",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A问衣服主人，B回答，合作完成对话",
                questions: [
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "找衬衫主人",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问是谁的",
                            role: "提问者",
                            line: "Whose shirt is this",
                            chinese: "这是谁的衬衫？"
                        },
                        stepB: {
                            instruction: "看示范句，回答是谁的",
                            role: "回答者",
                            line: "It's Yang Ming's shirt",
                            chinese: "这是Yang Ming的衬衫。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "找夹克主人",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问是谁的",
                            role: "提问者",
                            line: "Whose jacket is this",
                            chinese: "这是谁的夹克？"
                        },
                        stepB: {
                            instruction: "看示范句，回答是谁的",
                            role: "回答者",
                            line: "It's Wang Tao's jacket",
                            chinese: "这是Wang Tao的夹克。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问是不是你的衬衫",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问同学",
                            role: "提问者",
                            line: "Is this your shirt",
                            chinese: "这是你的衬衫吗？"
                        },
                        stepB: {
                            instruction: "看示范句，回答",
                            role: "回答者",
                            line: "Yes it is",
                            chinese: "是的。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问是不是你的夹克",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问同学",
                            role: "提问者",
                            line: "Is this your jacket",
                            chinese: "这是你的夹克吗？"
                        },
                        stepB: {
                            instruction: "看示范句，回答",
                            role: "回答者",
                            line: "No it isn't",
                            chinese: "不是。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "还衣服给同学",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        stepA: {
                            instruction: "看示范句，还衣服",
                            role: "归还者",
                            line: "Here you are",
                            chinese: "给你。"
                        },
                        stepB: {
                            instruction: "看示范句，说谢谢",
                            role: "感谢者",
                            line: "Thank you",
                            chinese: "谢谢。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "同学说谢谢",
                        image: '<img src="assets/images/scenario_clothes.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说谢谢",
                            role: "感谢者",
                            line: "Thank you",
                            chinese: "谢谢。"
                        },
                        stepB: {
                            instruction: "看示范句，回应",
                            role: "回应者",
                            line: "You're welcome",
                            chinese: "不客气。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "说这是我的衬衫",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        stepA: {
                            instruction: "看示范句，认领衣服",
                            role: "主人",
                            line: "This is my shirt",
                            chinese: "这是我的衬衫。"
                        },
                        stepB: {
                            instruction: "看示范句，还给他",
                            role: "归还者",
                            line: "Here you are",
                            chinese: "给你。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "说这是我的夹克",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        stepA: {
                            instruction: "看示范句，认领衣服",
                            role: "主人",
                            line: "This is my jacket",
                            chinese: "这是我的夹克。"
                        },
                        stepB: {
                            instruction: "看示范句，还给他",
                            role: "归还者",
                            line: "Here you are",
                            chinese: "给你。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "不是我的衣服",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问是不是他的",
                            role: "提问者",
                            line: "Is this your jacket",
                            chinese: "这是你的夹克吗？"
                        },
                        stepB: {
                            instruction: "看示范句，说不是",
                            role: "回答者",
                            line: "No it isn't I'm sorry",
                            chinese: "不是。对不起。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "找T恤主人",
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问是谁的",
                            role: "提问者",
                            line: "Whose T-shirt is this",
                            chinese: "这是谁的T恤？"
                        },
                        stepB: {
                            instruction: "看示范句，回答是谁的",
                            role: "回答者",
                            line: "It's Li Li's T-shirt",
                            chinese: "这是Li Li的T恤。"
                        }
                    }
                ]
            }
        ]
    }
};

// 导出（兼容直接 script 引入）
if (typeof window !== 'undefined') {
    window.u2l2_coop = u2l2_coop;
}
