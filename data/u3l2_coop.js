/**
 * U3L2 合作冒险题库 — What's the time in New York?
 * 主题：不同时区+正在做什么
 * 新词汇：reading, playing, watching TV, sleeping, drawing, toys, calling, grandpa, grandma, a.m., p.m., thirty
 * 句型：What's the time in ___? / It's 8:30 a.m./p.m. / I'm reading/playing/watching TV/sleeping/drawing.
 *       Is ___ watching TV? / No, she isn't. She is reading. / What are you doing? / He/She is ___(doing).
 *
 * 每道题拆成 stepA（蓝色）→ stepB（橙色），B依赖A的结果
 */

var u3l2_coop = {
    id: "U3L2",
    title: "What's the time in New York?",
    theme: "time zones and activities",

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
                        type: "coop_listen_relay", audio: "reading", chinese: "正在读书", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/reading.png" width="70">', value: "reading" },
                                { html: '<img src="assets/images/play.png" width="70">', value: "playing" },
                                { html: '<img src="assets/images/watching_tv.png" width="70">', value: "watching TV" },
                                { html: '<img src="assets/images/sleeping.png" width="70">', value: "sleeping" }
                            ],
                            correct: "reading"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "reading":     { options: ["正在读书","正在玩","正在看电视","正在睡觉"], correct: "正在读书" },
                                "playing":     { options: ["正在玩","正在读书","正在看电视","正在睡觉"], correct: "正在玩" },
                                "watching TV": { options: ["正在看电视","正在读书","正在玩","正在睡觉"], correct: "正在看电视" },
                                "sleeping":    { options: ["正在睡觉","正在读书","正在玩","正在看电视"], correct: "正在睡觉" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "playing", chinese: "正在玩", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/play.png" width="70">', value: "playing" },
                                { html: '<img src="assets/images/reading.png" width="70">', value: "reading" },
                                { html: '<img src="assets/images/drawing.png" width="70">', value: "drawing" },
                                { html: '<img src="assets/images/sleeping.png" width="70">', value: "sleeping" }
                            ],
                            correct: "playing"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "playing":  { options: ["正在玩","正在读书","正在画画","正在睡觉"], correct: "正在玩" },
                                "reading":  { options: ["正在读书","正在玩","正在画画","正在睡觉"], correct: "正在读书" },
                                "drawing":  { options: ["正在画画","正在玩","正在读书","正在睡觉"], correct: "正在画画" },
                                "sleeping": { options: ["正在睡觉","正在玩","正在读书","正在画画"], correct: "正在睡觉" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "watching TV", chinese: "正在看电视", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/watching_tv.png" width="70">', value: "watching TV" },
                                { html: '<img src="assets/images/reading.png" width="70">', value: "reading" },
                                { html: '<img src="assets/images/play.png" width="70">', value: "playing" },
                                { html: '<img src="assets/images/drawing.png" width="70">', value: "drawing" }
                            ],
                            correct: "watching TV"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "watching TV": { options: ["正在看电视","正在读书","正在玩","正在画画"], correct: "正在看电视" },
                                "reading":     { options: ["正在读书","正在看电视","正在玩","正在画画"], correct: "正在读书" },
                                "playing":     { options: ["正在玩","正在看电视","正在读书","正在画画"], correct: "正在玩" },
                                "drawing":     { options: ["正在画画","正在看电视","正在读书","正在玩"], correct: "正在画画" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "sleeping", chinese: "正在睡觉", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/sleeping.png" width="70">', value: "sleeping" },
                                { html: '<img src="assets/images/watching_tv.png" width="70">', value: "watching TV" },
                                { html: '<img src="assets/images/reading.png" width="70">', value: "reading" },
                                { html: '<img src="assets/images/play.png" width="70">', value: "playing" }
                            ],
                            correct: "sleeping"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "sleeping":    { options: ["正在睡觉","正在看电视","正在读书","正在玩"], correct: "正在睡觉" },
                                "watching TV": { options: ["正在看电视","正在睡觉","正在读书","正在玩"], correct: "正在看电视" },
                                "reading":     { options: ["正在读书","正在睡觉","正在看电视","正在玩"], correct: "正在读书" },
                                "playing":     { options: ["正在玩","正在睡觉","正在看电视","正在读书"], correct: "正在玩" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "drawing", chinese: "正在画画", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/drawing.png" width="70">', value: "drawing" },
                                { html: '<img src="assets/images/sleeping.png" width="70">', value: "sleeping" },
                                { html: '<img src="assets/images/play.png" width="70">', value: "playing" },
                                { html: '<img src="assets/images/reading.png" width="70">', value: "reading" }
                            ],
                            correct: "drawing"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "drawing":  { options: ["正在画画","正在睡觉","正在玩","正在读书"], correct: "正在画画" },
                                "sleeping": { options: ["正在睡觉","正在画画","正在玩","正在读书"], correct: "正在睡觉" },
                                "playing":  { options: ["正在玩","正在画画","正在睡觉","正在读书"], correct: "正在玩" },
                                "reading":  { options: ["正在读书","正在画画","正在睡觉","正在玩"], correct: "正在读书" }
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
                        type: "coop_listen_judge", audio: "reading", difficulty: "easy",
                        image: '<img src="assets/images/reading.png" width="90">',
                        isMatch: true, chinese: "正在读书",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                { html: '<img src="assets/images/play.png" width="60">', value: "playing" },
                                { html: '<img src="assets/images/watching_tv.png" width="60">', value: "watching TV" },
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                            ],
                            correct: "reading"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "watching TV", difficulty: "easy",
                        image: '<img src="assets/images/sleeping.png" width="90">',
                        isMatch: false, chinese: "正在看电视",
                        correctImage: '<img src="assets/images/watching_tv.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/watching_tv.png" width="60">', value: "watching TV" },
                                { html: '<img src="assets/images/sleeping.png" width="60">', value: "sleeping" },
                                { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                { html: '<img src="assets/images/play.png" width="60">', value: "playing" }
                            ],
                            correct: "watching TV"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "sleeping", difficulty: "medium",
                        image: '<img src="assets/images/sleeping.png" width="90">',
                        isMatch: true, chinese: "正在睡觉",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/sleeping.png" width="60">', value: "sleeping" },
                                { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                { html: '<img src="assets/images/play.png" width="60">', value: "playing" },
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                            ],
                            correct: "sleeping"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "playing", difficulty: "medium",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        isMatch: false, chinese: "正在玩",
                        correctImage: '<img src="assets/images/play.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/play.png" width="60">', value: "playing" },
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                { html: '<img src="assets/images/watching_tv.png" width="60">', value: "watching TV" }
                            ],
                            correct: "playing"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "drawing", difficulty: "medium",
                        image: '<img src="assets/images/reading.png" width="90">',
                        isMatch: false, chinese: "正在画画",
                        correctImage: '<img src="assets/images/drawing.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                { html: '<img src="assets/images/sleeping.png" width="60">', value: "sleeping" },
                                { html: '<img src="assets/images/play.png" width="60">', value: "playing" }
                            ],
                            correct: "drawing"
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
                        sequence: ["reading", "playing", "sleeping"],
                        words: [
                            { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                            { html: '<img src="assets/images/play.png" width="60">', value: "playing" },
                            { html: '<img src="assets/images/sleeping.png" width="60">', value: "sleeping" }
                        ],
                        chinese: "reading → playing → sleeping"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["watching TV", "drawing", "reading"],
                        words: [
                            { html: '<img src="assets/images/watching_tv.png" width="60">', value: "watching TV" },
                            { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                            { html: '<img src="assets/images/reading.png" width="60">', value: "reading" }
                        ],
                        chinese: "watching TV → drawing → reading"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["sleeping", "reading", "playing"],
                        words: [
                            { html: '<img src="assets/images/sleeping.png" width="55">', value: "sleeping" },
                            { html: '<img src="assets/images/reading.png" width="55">', value: "reading" },
                            { html: '<img src="assets/images/play.png" width="55">', value: "playing" }
                        ],
                        chinese: "sleeping → reading → playing"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["drawing", "watching TV", "sleeping"],
                        words: [
                            { html: '<img src="assets/images/drawing.png" width="55">', value: "drawing" },
                            { html: '<img src="assets/images/watching_tv.png" width="55">', value: "watching TV" },
                            { html: '<img src="assets/images/sleeping.png" width="55">', value: "sleeping" }
                        ],
                        chinese: "drawing → watching TV → sleeping"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["reading", "drawing", "watching TV", "sleeping"],
                        words: [
                            { html: '<img src="assets/images/reading.png" width="50">', value: "reading" },
                            { html: '<img src="assets/images/drawing.png" width="50">', value: "drawing" },
                            { html: '<img src="assets/images/watching_tv.png" width="50">', value: "watching TV" },
                            { html: '<img src="assets/images/sleeping.png" width="50">', value: "sleeping" }
                        ],
                        chinese: "reading → drawing → watching TV → sleeping"
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
                        scenario: "Sally打电话给爷爷，问纽约几点",
                        audio: "What's the time in New York? It's 7:30 p.m. I'm reading.",
                        stepA: {
                            instruction: "听音频，纽约几点？",
                            question: "纽约现在几点？",
                            options: ["7:30 p.m.", "8:30 a.m.", "10:30 a.m.", "7:30 a.m."],
                            correct: "7:30 p.m."
                        },
                        stepB: {
                            instruction: "爷爷在干什么？",
                            question: "爷爷在做什么？",
                            optionsMap: {
                                "7:30 p.m.":  { options: ["正在读书", "正在看电视", "正在睡觉", "正在玩"], correct: "正在读书" },
                                "8:30 a.m.":  { options: ["正在读书", "正在看电视", "正在睡觉", "正在玩"], correct: "正在读书" },
                                "10:30 a.m.": { options: ["正在读书", "正在看电视", "正在睡觉", "正在玩"], correct: "正在读书" },
                                "7:30 a.m.":  { options: ["正在读书", "正在看电视", "正在睡觉", "正在玩"], correct: "正在读书" }
                            }
                        },
                        chinese: "纽约7:30 p.m.在读书"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "问奶奶在干什么",
                        audio: "Is Grandma watching TV? No, she isn't. She is reading.",
                        stepA: {
                            instruction: "听音频，奶奶在看电视吗？",
                            question: "奶奶在看电视吗？",
                            options: ["不是", "是的"],
                            correct: "不是"
                        },
                        stepB: {
                            instruction: "奶奶在做什么？",
                            question: "奶奶其实在做什么？",
                            optionsMap: {
                                "不是": { options: ["正在读书", "正在看电视", "正在睡觉", "正在画画"], correct: "正在读书" },
                                "是的": { options: ["正在看电视", "正在读书", "正在睡觉", "正在画画"], correct: "正在看电视" }
                            }
                        },
                        chinese: "奶奶在读书不在看电视"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "Ben和Kate在做什么",
                        audio: "What are the kids doing? Ben and Kate are playing with toys.",
                        stepA: {
                            instruction: "听音频，孩子们在做什么？",
                            question: "Ben和Kate在干什么？",
                            options: ["在玩玩具", "在看电视", "在读书", "在睡觉"],
                            correct: "在玩玩具"
                        },
                        stepB: {
                            instruction: "他们在玩什么？",
                            question: "他们在玩什么？",
                            optionsMap: {
                                "在玩玩具": { options: ["玩具", "书", "电视", "画笔"], correct: "玩具" },
                                "在看电视": { options: ["电视", "玩具", "书", "画笔"], correct: "电视" },
                                "在读书":   { options: ["书", "玩具", "电视", "画笔"], correct: "书" },
                                "在睡觉":   { options: ["什么都没做", "玩具", "书", "画笔"], correct: "什么都没做" }
                            }
                        },
                        chinese: "Ben和Kate在玩玩具"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "问伦敦几点",
                        audio: "What's the time in London, Grandpa? It's 10:30 a.m. I'm watching TV.",
                        stepA: {
                            instruction: "听音频，伦敦几点？",
                            question: "伦敦现在几点？",
                            options: ["10:30 a.m.", "7:30 p.m.", "8:30 a.m.", "10:30 p.m."],
                            correct: "10:30 a.m."
                        },
                        stepB: {
                            instruction: "爷爷在做什么？",
                            question: "爷爷在做什么？",
                            optionsMap: {
                                "10:30 a.m.": { options: ["正在看电视", "正在读书", "正在睡觉", "正在画画"], correct: "正在看电视" },
                                "7:30 p.m.":  { options: ["正在看电视", "正在读书", "正在睡觉", "正在画画"], correct: "正在看电视" },
                                "8:30 a.m.":  { options: ["正在看电视", "正在读书", "正在睡觉", "正在画画"], correct: "正在看电视" },
                                "10:30 p.m.": { options: ["正在看电视", "正在读书", "正在睡觉", "正在画画"], correct: "正在看电视" }
                            }
                        },
                        chinese: "伦敦10:30 a.m.爷爷在看电视"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "你在做什么",
                        audio: "What are you doing? I'm drawing.",
                        stepA: {
                            instruction: "听音频，他在做什么？",
                            question: "他在干什么？",
                            options: ["正在画画", "正在读书", "正在玩", "正在睡觉"],
                            correct: "正在画画"
                        },
                        stepB: {
                            instruction: "选正确的图片",
                            question: "哪张图是对的？",
                            optionsMap: {
                                "正在画画": { options: [
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" }
                                ], correct: "drawing" },
                                "正在读书": { options: [
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                                ], correct: "reading" },
                                "正在玩": { options: [
                                    { html: '<img src="assets/images/play.png" width="60">', value: "playing" },
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                                ], correct: "playing" },
                                "正在睡觉": { options: [
                                    { html: '<img src="assets/images/sleeping.png" width="60">', value: "sleeping" },
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                                ], correct: "sleeping" }
                            }
                        },
                        chinese: "正在画画"
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
                        image: '<img src="assets/images/reading.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["reading", "playing", "drawing", "sleeping"],
                            correct: "reading"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "reading":  { options: ["正在读书","正在玩","正在画画","正在睡觉"], correct: "正在读书" },
                                "playing":  { options: ["正在玩","正在读书","正在画画","正在睡觉"], correct: "正在玩" },
                                "drawing":  { options: ["正在画画","正在读书","正在玩","正在睡觉"], correct: "正在画画" },
                                "sleeping": { options: ["正在睡觉","正在读书","正在玩","正在画画"], correct: "正在睡觉" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/play.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["playing", "reading", "watching TV", "drawing"],
                            correct: "playing"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "playing":     { options: ["正在玩","正在读书","正在看电视","正在画画"], correct: "正在玩" },
                                "reading":     { options: ["正在读书","正在玩","正在看电视","正在画画"], correct: "正在读书" },
                                "watching TV": { options: ["正在看电视","正在玩","正在读书","正在画画"], correct: "正在看电视" },
                                "drawing":     { options: ["正在画画","正在玩","正在读书","正在看电视"], correct: "正在画画" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/watching_tv.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文",
                            options: ["watching TV", "sleeping", "reading", "playing"],
                            correct: "watching TV"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "watching TV": { options: ["正在看电视","正在睡觉","正在读书","正在玩"], correct: "正在看电视" },
                                "sleeping":    { options: ["正在睡觉","正在看电视","正在读书","正在玩"], correct: "正在睡觉" },
                                "reading":     { options: ["正在读书","正在看电视","正在睡觉","正在玩"], correct: "正在读书" },
                                "playing":     { options: ["正在玩","正在看电视","正在睡觉","正在读书"], correct: "正在玩" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/sleeping.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["sleeping", "drawing", "playing", "reading"],
                            correct: "sleeping"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "sleeping": { options: ["正在睡觉","正在画画","正在玩","正在读书"], correct: "正在睡觉" },
                                "drawing":  { options: ["正在画画","正在睡觉","正在玩","正在读书"], correct: "正在画画" },
                                "playing":  { options: ["正在玩","正在睡觉","正在画画","正在读书"], correct: "正在玩" },
                                "reading":  { options: ["正在读书","正在睡觉","正在画画","正在玩"], correct: "正在读书" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["drawing", "sleeping", "watching TV", "reading"],
                            correct: "drawing"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "drawing":     { options: ["正在画画","正在睡觉","正在看电视","正在读书"], correct: "正在画画" },
                                "sleeping":    { options: ["正在睡觉","正在画画","正在看电视","正在读书"], correct: "正在睡觉" },
                                "watching TV": { options: ["正在看电视","正在画画","正在睡觉","正在读书"], correct: "正在看电视" },
                                "reading":     { options: ["正在读书","正在画画","正在睡觉","正在看电视"], correct: "正在读书" }
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
                            { word: "reading", match: '<img src="assets/images/reading.png" width="50">', chinese: "读书" },
                            { word: "playing", match: '<img src="assets/images/play.png" width="50">', chinese: "玩" },
                            { word: "sleeping", match: '<img src="assets/images/sleeping.png" width="50">', chinese: "睡觉" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "watching TV", match: '<img src="assets/images/watching_tv.png" width="50">', chinese: "看电视" },
                            { word: "drawing", match: '<img src="assets/images/drawing.png" width="50">', chinese: "画画" },
                            { word: "reading", match: '<img src="assets/images/reading.png" width="50">', chinese: "读书" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "sleeping", match: '<img src="assets/images/sleeping.png" width="50">', chinese: "睡觉" },
                            { word: "playing", match: '<img src="assets/images/play.png" width="50">', chinese: "玩" },
                            { word: "drawing", match: '<img src="assets/images/drawing.png" width="50">', chinese: "画画" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "reading", match: '<img src="assets/images/reading.png" width="50">', chinese: "读书" },
                            { word: "watching TV", match: '<img src="assets/images/watching_tv.png" width="50">', chinese: "看电视" },
                            { word: "sleeping", match: '<img src="assets/images/sleeping.png" width="50">', chinese: "睡觉" },
                            { word: "drawing", match: '<img src="assets/images/drawing.png" width="50">', chinese: "画画" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "playing", match: '<img src="assets/images/play.png" width="50">', chinese: "玩" },
                            { word: "reading", match: '<img src="assets/images/reading.png" width="50">', chinese: "读书" },
                            { word: "watching TV", match: '<img src="assets/images/watching_tv.png" width="50">', chinese: "看电视" },
                            { word: "sleeping", match: '<img src="assets/images/sleeping.png" width="50">', chinese: "睡觉" }
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
                        image: '<img src="assets/images/reading.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "I'm reading.", value: "I'm reading." },
                                { html: "I'm playing.", value: "I'm playing." },
                                { html: "I'm sleeping.", value: "I'm sleeping." },
                                { html: "I'm drawing.", value: "I'm drawing." }
                            ],
                            correct: "I'm reading."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "I'm reading.":  { options: ["我在读书。","我在玩。","我在睡觉。","我在画画。"], correct: "我在读书。" },
                                "I'm playing.":  { options: ["我在玩。","我在读书。","我在睡觉。","我在画画。"], correct: "我在玩。" },
                                "I'm sleeping.": { options: ["我在睡觉。","我在读书。","我在玩。","我在画画。"], correct: "我在睡觉。" },
                                "I'm drawing.":  { options: ["我在画画。","我在读书。","我在玩。","我在睡觉。"], correct: "我在画画。" }
                            }
                        },
                        chinese: "我在读书"
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/watching_tv.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "She is watching TV.", value: "She is watching TV." },
                                { html: "She is reading.", value: "She is reading." },
                                { html: "She is sleeping.", value: "She is sleeping." },
                                { html: "She is drawing.", value: "She is drawing." }
                            ],
                            correct: "She is watching TV."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "She is watching TV.": { options: ["她在看电视。","她在读书。","她在睡觉。","她在画画。"], correct: "她在看电视。" },
                                "She is reading.":     { options: ["她在读书。","她在看电视。","她在睡觉。","她在画画。"], correct: "她在读书。" },
                                "She is sleeping.":    { options: ["她在睡觉。","她在看电视。","她在读书。","她在画画。"], correct: "她在睡觉。" },
                                "She is drawing.":     { options: ["她在画画。","她在看电视。","她在读书。","她在睡觉。"], correct: "她在画画。" }
                            }
                        },
                        chinese: "她在看电视"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/time.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的英文",
                            options: [
                                { html: "What are you doing?", value: "What are you doing?" },
                                { html: "What's the time?", value: "What's the time?" },
                                { html: "I'm reading.", value: "I'm reading." },
                                { html: "She is sleeping.", value: "She is sleeping." }
                            ],
                            correct: "What are you doing?"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "What are you doing?": { options: ["你在做什么？","几点了？","我在读书。","她在睡觉。"], correct: "你在做什么？" },
                                "What's the time?":    { options: ["几点了？","你在做什么？","我在读书。","她在睡觉。"], correct: "几点了？" },
                                "I'm reading.":        { options: ["我在读书。","你在做什么？","几点了？","她在睡觉。"], correct: "我在读书。" },
                                "She is sleeping.":    { options: ["她在睡觉。","你在做什么？","几点了？","我在读书。"], correct: "她在睡觉。" }
                            }
                        },
                        chinese: "你在做什么？"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/clock.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的英文",
                            options: [
                                { html: "What's the time in New York?", value: "What's the time in New York?" },
                                { html: "What are you doing?", value: "What are you doing?" },
                                { html: "I'm watching TV.", value: "I'm watching TV." },
                                { html: "He is playing.", value: "He is playing." }
                            ],
                            correct: "What's the time in New York?"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "What's the time in New York?": { options: ["纽约几点了？","你在做什么？","我在看电视。","他在玩。"], correct: "纽约几点了？" },
                                "What are you doing?":          { options: ["你在做什么？","纽约几点了？","我在看电视。","他在玩。"], correct: "你在做什么？" },
                                "I'm watching TV.":             { options: ["我在看电视。","纽约几点了？","你在做什么？","他在玩。"], correct: "我在看电视。" },
                                "He is playing.":               { options: ["他在玩。","纽约几点了？","你在做什么？","我在看电视。"], correct: "他在玩。" }
                            }
                        },
                        chinese: "纽约几点了？"
                    },
                    {
                        type: "coop_word_relay", difficulty: "hard",
                        image: '<img src="assets/images/reading.png" width="90">',
                        stepA: {
                            instruction: "读对话，选正确的回答",
                            options: [
                                { html: "No, she isn't. She is reading.", value: "No, she isn't. She is reading." },
                                { html: "Yes, she is.", value: "Yes, she is." },
                                { html: "I'm watching TV.", value: "I'm watching TV." },
                                { html: "He is playing.", value: "He is playing." }
                            ],
                            correct: "No, she isn't. She is reading."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "No, she isn't. She is reading.": { options: ["不，她在读书。","是的。","我在看电视。","他在玩。"], correct: "不，她在读书。" },
                                "Yes, she is.":                    { options: ["是的。","不，她在读书。","我在看电视。","他在玩。"], correct: "是的。" },
                                "I'm watching TV.":                { options: ["我在看电视。","不，她在读书。","是的。","他在玩。"], correct: "我在看电视。" },
                                "He is playing.":                  { options: ["他在玩。","不，她在读书。","是的。","我在看电视。"], correct: "他在玩。" }
                            }
                        },
                        chinese: "不，她在读书"
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
                        scenario: "Sally的家人在做什么",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "It's 8:30 a.m. in Fuzhou. I'm reading.",
                            question: "她在做什么？",
                            options: ["正在读书", "正在玩", "正在看电视", "正在睡觉"],
                            correct: "正在读书"
                        },
                        stepB: {
                            instruction: "选正确的图片",
                            optionsMap: {
                                "正在读书": { options: [
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                    { html: '<img src="assets/images/play.png" width="60">', value: "playing" },
                                    { html: '<img src="assets/images/watching_tv.png" width="60">', value: "watching_tv" },
                                    { html: '<img src="assets/images/sleeping.png" width="60">', value: "sleeping" }
                                ], correct: "reading" },
                                "正在玩": { options: [
                                    { html: '<img src="assets/images/play.png" width="60">', value: "playing" },
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                    { html: '<img src="assets/images/watching_tv.png" width="60">', value: "watching_tv" },
                                    { html: '<img src="assets/images/sleeping.png" width="60">', value: "sleeping" }
                                ], correct: "playing" },
                                "正在看电视": { options: [
                                    { html: '<img src="assets/images/watching_tv.png" width="60">', value: "watching_tv" },
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                    { html: '<img src="assets/images/play.png" width="60">', value: "playing" },
                                    { html: '<img src="assets/images/sleeping.png" width="60">', value: "sleeping" }
                                ], correct: "watching_tv" },
                                "正在睡觉": { options: [
                                    { html: '<img src="assets/images/sleeping.png" width="60">', value: "sleeping" },
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                    { html: '<img src="assets/images/play.png" width="60">', value: "playing" },
                                    { html: '<img src="assets/images/watching_tv.png" width="60">', value: "watching_tv" }
                                ], correct: "sleeping" }
                            }
                        },
                        chinese: "8:30 a.m.在读书"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "奶奶在做什么",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Is Grandma watching TV? No, she isn't. She is reading.",
                            question: "奶奶在做什么？",
                            options: ["在读书", "在看电视", "在睡觉", "在画画"],
                            correct: "在读书"
                        },
                        stepB: {
                            instruction: "奶奶没在看电视，回答正确吗？",
                            optionsMap: {
                                "在读书":   { options: ["No, she isn't.", "Yes, she is."], correct: "No, she isn't." },
                                "在看电视": { options: ["Yes, she is.", "No, she isn't."], correct: "Yes, she is." },
                                "在睡觉":   { options: ["No, she isn't.", "Yes, she is."], correct: "No, she isn't." },
                                "在画画":   { options: ["No, she isn't.", "Yes, she is."], correct: "No, she isn't." }
                            }
                        },
                        chinese: "奶奶在读书不在看电视"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "不同地方的时间",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "What's the time in New York? It's 7:30 p.m.",
                            question: "纽约几点？",
                            options: ["7:30 p.m.", "8:30 a.m.", "10:30 a.m.", "7:30 a.m."],
                            correct: "7:30 p.m."
                        },
                        stepB: {
                            instruction: "7:30 p.m.是上午还是下午？",
                            optionsMap: {
                                "7:30 p.m.":  { options: ["下午/晚上", "上午"], correct: "下午/晚上" },
                                "8:30 a.m.":  { options: ["上午", "下午/晚上"], correct: "上午" },
                                "10:30 a.m.": { options: ["上午", "下午/晚上"], correct: "上午" },
                                "7:30 a.m.":  { options: ["上午", "下午/晚上"], correct: "上午" }
                            }
                        },
                        chinese: "纽约7:30 p.m.是晚上"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "Ben在做什么",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Ben and Kate are playing with toys.",
                            question: "他们在做什么？",
                            options: ["在玩玩具", "在看电视", "在读书", "在画画"],
                            correct: "在玩玩具"
                        },
                        stepB: {
                            instruction: "选正确的图片",
                            optionsMap: {
                                "在玩玩具": { options: [
                                    { html: '<img src="assets/images/play.png" width="60">', value: "playing" },
                                    { html: '<img src="assets/images/watching_tv.png" width="60">', value: "watching_tv" }
                                ], correct: "playing" },
                                "在看电视": { options: [
                                    { html: '<img src="assets/images/watching_tv.png" width="60">', value: "watching_tv" },
                                    { html: '<img src="assets/images/play.png" width="60">', value: "playing" }
                                ], correct: "watching_tv" },
                                "在读书": { options: [
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                    { html: '<img src="assets/images/play.png" width="60">', value: "playing" }
                                ], correct: "reading" },
                                "在画画": { options: [
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                    { html: '<img src="assets/images/play.png" width="60">', value: "playing" }
                                ], correct: "drawing" }
                            }
                        },
                        chinese: "Ben和Kate在玩玩具"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "爷爷在做什么",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "What's the time in London, Grandpa? It's 10:30 a.m. I'm watching TV.",
                            question: "爷爷在做什么？",
                            options: ["在看电视", "在读书", "在睡觉", "在画画"],
                            correct: "在看电视"
                        },
                        stepB: {
                            instruction: "伦敦几点了？",
                            optionsMap: {
                                "在看电视": { options: ["10:30 a.m.", "7:30 p.m.", "8:30 a.m.", "10:30 p.m."], correct: "10:30 a.m." },
                                "在读书":   { options: ["10:30 a.m.", "7:30 p.m.", "8:30 a.m.", "10:30 p.m."], correct: "10:30 a.m." },
                                "在睡觉":   { options: ["10:30 a.m.", "7:30 p.m.", "8:30 a.m.", "10:30 p.m."], correct: "10:30 a.m." },
                                "在画画":   { options: ["10:30 a.m.", "7:30 p.m.", "8:30 a.m.", "10:30 p.m."], correct: "10:30 a.m." }
                            }
                        },
                        chinese: "伦敦10:30 a.m.爷爷在看电视"
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
                        sentence: "I'm reading.",
                        stepA: { words: ["I'm"], instruction: "选前半句的词" },
                        stepB: { words: ["reading."], instruction: "选后半句的词" },
                        chinese: "我在读书。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "She is watching TV.",
                        stepA: { words: ["She", "is"], instruction: "选前半句的词" },
                        stepB: { words: ["watching", "TV."], instruction: "选后半句的词" },
                        chinese: "她在看电视。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "What are you doing?",
                        stepA: { words: ["What", "are"], instruction: "选前半句的词" },
                        stepB: { words: ["you", "doing?"], instruction: "选后半句的词" },
                        chinese: "你在做什么？"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "He is playing with toys.",
                        stepA: { words: ["He", "is"], instruction: "选前半句的词" },
                        stepB: { words: ["playing", "with", "toys."], instruction: "选后半句的词" },
                        chinese: "他在玩玩具。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "What's the time in New York?",
                        stepA: { words: ["What's", "the", "time"], instruction: "选前半句的词" },
                        stepB: { words: ["in", "New", "York?"], instruction: "选后半句的词" },
                        chinese: "纽约几点了？"
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
                        template: "What are you ___? I'm ___.",
                        image: '<img src="assets/images/reading.png" width="70">',
                        stepA: { blank: 1, options: ["doing", "time", "name", "playing"], correct: "doing", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["reading", "sleeping", "playing", "drawing"], correct: "reading", instruction: "看图填第2个空" },
                        chinese: "What are you doing? I'm reading."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "She is ___ TV. He is ___.",
                        image: '<img src="assets/images/watching_tv.png" width="70">',
                        stepA: { blank: 1, options: ["watching", "reading", "playing", "sleeping"], correct: "watching", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["playing", "watching", "reading", "sleeping"], correct: "playing", instruction: "填第2个空" },
                        chinese: "She is watching TV. He is playing."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "Is Grandma ___ TV? No, she ___.",
                        image: '<img src="assets/images/grandma.png" width="70">',
                        stepA: { blank: 1, options: ["watching", "reading", "playing", "sleeping"], correct: "watching", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["isn't", "is", "am", "are"], correct: "isn't", instruction: "填第2个空" },
                        chinese: "Is Grandma watching TV? No, she isn't."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "What's the time in ___? It's 7:30 ___.",
                        image: '<img src="assets/images/clock.png" width="70">',
                        stepA: { blank: 1, options: ["New York", "Beijing", "London", "Tokyo"], correct: "New York", instruction: "填城市名" },
                        stepB: { blank: 2, options: ["p.m.", "a.m.", "o'clock", "thirty"], correct: "p.m.", instruction: "填上午还是下午" },
                        chinese: "What's the time in New York? It's 7:30 p.m."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "No, she isn't. She is ___. He is ___ with toys.",
                        image: '<img src="assets/images/reading.png" width="70">',
                        stepA: { blank: 1, options: ["reading", "watching", "sleeping", "drawing"], correct: "reading", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["playing", "reading", "watching", "sleeping"], correct: "playing", instruction: "填第2个空" },
                        chinese: "No, she isn't. She is reading. He is playing with toys."
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
                        word: "read",
                        image: '<img src="assets/images/reading.png" width="60">',
                        stepA: { letters: ["r", "e"], distractors: ["a", "o"], instruction: "拼前半：r___" },
                        stepB: { letters: ["a", "d"], distractors: ["n", "t"], instruction: "拼后半：__ad" },
                        chinese: "读"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "play",
                        image: '<img src="assets/images/play.png" width="60">',
                        stepA: { letters: ["p", "l"], distractors: ["r", "n"], instruction: "拼前半：p___" },
                        stepB: { letters: ["a", "y"], distractors: ["e", "i"], instruction: "拼后半：__ay" },
                        chinese: "玩"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "draw",
                        image: '<img src="assets/images/drawing.png" width="60">',
                        stepA: { letters: ["d", "r"], distractors: ["b", "t"], instruction: "拼前半：d___" },
                        stepB: { letters: ["a", "w"], distractors: ["e", "n"], instruction: "拼后半：__aw" },
                        chinese: "画"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "sleep",
                        image: '<img src="assets/images/sleeping.png" width="60">',
                        stepA: { letters: ["s", "l", "e"], distractors: ["a", "o"], instruction: "拼前半：s____" },
                        stepB: { letters: ["e", "p"], distractors: ["t", "n"], instruction: "拼后半：___ep" },
                        chinese: "睡觉"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "watch",
                        image: '<img src="assets/images/watching_tv.png" width="60">',
                        stepA: { letters: ["w", "a", "t"], distractors: ["e", "o"], instruction: "拼前半：w____" },
                        stepB: { letters: ["c", "h"], distractors: ["k", "n"], instruction: "拼后半：___ch" },
                        chinese: "看"
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
                        scenario: "问同学在做什么",
                        stepA: {
                            instruction: "你想知道同学在做什么，选一句话问",
                            options: ["What are you doing?", "What's the time?", "I'm reading.", "She is sleeping."]
                        },
                        stepB: {
                            instruction: "回答A的问题",
                            optionsMap: {
                                "What are you doing?": { options: ["I'm reading.", "What's the time?", "She is sleeping.", "No, she isn't."], correct: "I'm reading." },
                                "What's the time?":    { options: ["It's 8:30 a.m.", "I'm reading.", "She is sleeping.", "No, she isn't."], correct: "It's 8:30 a.m." },
                                "I'm reading.":        { options: ["Me too!", "What are you doing?", "She is sleeping.", "No, she isn't."], correct: "Me too!" },
                                "She is sleeping.":    { options: ["OK.", "I'm reading.", "What are you doing?", "No, she isn't."], correct: "OK." }
                            }
                        },
                        chinese: "问在做什么"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "问纽约几点了（提示：纽约现在7:30 p.m.）",
                        stepA: {
                            instruction: "你想知道纽约几点",
                            options: ["What's the time in New York?", "What are you doing?", "I'm playing.", "She is reading."]
                        },
                        stepB: {
                            instruction: "回答A的问题（提示：纽约现在7:30 p.m.）",
                            optionsMap: {
                                "What's the time in New York?": { options: ["It's 7:30 p.m.", "I'm reading.", "She is sleeping.", "What are you doing?"], correct: "It's 7:30 p.m." },
                                "What are you doing?":          { options: ["I'm playing.", "It's 7:30 p.m.", "She is sleeping.", "What's the time?"], correct: "I'm playing." },
                                "I'm playing.":                 { options: ["Me too!", "It's 7:30 p.m.", "She is sleeping.", "What's the time?"], correct: "Me too!" },
                                "She is reading.":              { options: ["OK.", "It's 7:30 p.m.", "I'm playing.", "What's the time?"], correct: "OK." }
                            }
                        },
                        chinese: "问纽约时间"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "问奶奶是不是在看电视（提示：奶奶其实在读书，没有看电视）",
                        stepA: {
                            instruction: "问问奶奶在不在看电视",
                            options: ["Is Grandma watching TV?", "What are you doing?", "What's the time?", "I'm drawing."]
                        },
                        stepB: {
                            instruction: "回答A的问题（提示：奶奶没在看电视，她在读书）",
                            optionsMap: {
                                "Is Grandma watching TV?": { options: ["No, she isn't. She is reading.", "Yes, she is.", "I'm drawing.", "What's the time?"], correct: "No, she isn't. She is reading." },
                                "What are you doing?":     { options: ["I'm drawing.", "No, she isn't.", "Yes, she is.", "What's the time?"], correct: "I'm drawing." },
                                "What's the time?":        { options: ["It's 10:30 a.m.", "No, she isn't.", "I'm drawing.", "Yes, she is."], correct: "It's 10:30 a.m." },
                                "I'm drawing.":            { options: ["Me too!", "No, she isn't.", "Yes, she is.", "What's the time?"], correct: "Me too!" }
                            }
                        },
                        chinese: "奶奶没在看电视"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "选一张图片说他在做什么",
                        stepA: {
                            instruction: "选一张图片",
                            options: [
                                { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                { html: '<img src="assets/images/play.png" width="60">', value: "playing" },
                                { html: '<img src="assets/images/watching_tv.png" width="60">', value: "watching TV" },
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                            ]
                        },
                        stepB: {
                            instruction: "根据图片写句子",
                            optionsMap: {
                                "reading":     { options: ["He is reading.", "He is playing.", "He is watching TV.", "He is drawing."], correct: "He is reading." },
                                "playing":     { options: ["He is playing.", "He is reading.", "He is watching TV.", "He is drawing."], correct: "He is playing." },
                                "watching TV": { options: ["He is watching TV.", "He is reading.", "He is playing.", "He is drawing."], correct: "He is watching TV." },
                                "drawing":     { options: ["He is drawing.", "He is reading.", "He is playing.", "He is watching TV."], correct: "He is drawing." }
                            }
                        },
                        chinese: "看图写句子"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "打电话给爷爷（提示：伦敦现在10:30 a.m.，爷爷正在看电视）",
                        stepA: {
                            instruction: "打电话问伦敦几点",
                            options: ["What's the time in London, Grandpa?", "What are you doing?", "I'm sleeping.", "She is watching TV."]
                        },
                        stepB: {
                            instruction: "你是爷爷，回答时间（提示：伦敦现在10:30 a.m.，你在看电视）",
                            optionsMap: {
                                "What's the time in London, Grandpa?": { options: ["It's 10:30 a.m. I'm watching TV.", "I'm reading.", "She is sleeping.", "What are you doing?"], correct: "It's 10:30 a.m. I'm watching TV." },
                                "What are you doing?":                  { options: ["I'm watching TV.", "It's 10:30 a.m.", "She is sleeping.", "What's the time?"], correct: "I'm watching TV." },
                                "I'm sleeping.":                        { options: ["Good night.", "It's 10:30 a.m.", "She is sleeping.", "What's the time?"], correct: "Good night." },
                                "She is watching TV.":                  { options: ["OK.", "It's 10:30 a.m.", "I'm sleeping.", "What are you doing?"], correct: "OK." }
                            }
                        },
                        chinese: "问伦敦时间"
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
                description: "A听音频跟读，B跟着读同一个（词和句混合，从易到难）",
                questions: [
                    {
                        type: "coop_read_relay", word: "reading", chinese: "正在读书", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "playing", chinese: "正在玩", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "sleeping", chinese: "正在睡觉", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "drawing", chinese: "正在画画", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "watching TV", chinese: "正在看电视", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "What are you doing", chinese: "你在做什么？", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "I'm reading", chinese: "我在读书。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "She is watching TV", chinese: "她在看电视。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "He is playing", chinese: "他在玩。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "No she isn't She is reading", chinese: "不，她在读书。", difficulty: "medium",
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
                        image: '<img src="assets/images/reading.png" width="90">',
                        answer: "I'm reading",
                        chinese: "我在读书",
                        stepA: {
                            instruction: "看图片，说出完整句子：I'm _____.",
                            expected: "I'm reading",
                            chinese: "我在读书"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I'm _____.",
                            expected: "I'm reading",
                            chinese: "我在读书"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/play.png" width="90">',
                        answer: "I'm playing",
                        chinese: "我在玩",
                        stepA: {
                            instruction: "看图片，说出完整句子：I'm _____.",
                            expected: "I'm playing",
                            chinese: "我在玩"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I'm _____.",
                            expected: "I'm playing",
                            chinese: "我在玩"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/watching_tv.png" width="90">',
                        answer: "I'm watching TV",
                        chinese: "我在看电视",
                        stepA: {
                            instruction: "看图片，说出完整句子：I'm _____ TV.",
                            expected: "I'm watching TV",
                            chinese: "我在看电视"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I'm _____ TV.",
                            expected: "I'm watching TV",
                            chinese: "我在看电视"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/sleeping.png" width="90">',
                        answer: "She is sleeping",
                        chinese: "她在睡觉",
                        stepA: {
                            instruction: "看图片，说出完整句子：She is _____.",
                            expected: "She is sleeping",
                            chinese: "她在睡觉"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：She is _____.",
                            expected: "She is sleeping",
                            chinese: "她在睡觉"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        answer: "He is drawing",
                        chinese: "他在画画",
                        stepA: {
                            instruction: "看图片，说出完整句子：He is _____.",
                            expected: "He is drawing",
                            chinese: "他在画画"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：He is _____.",
                            expected: "He is drawing",
                            chinese: "他在画画"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/reading.png" width="90">',
                        answer: "She is reading",
                        chinese: "她在读书",
                        stepA: {
                            instruction: "看图片，说出完整句子：She is _____.",
                            expected: "She is reading",
                            chinese: "她在读书"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：She is _____.",
                            expected: "She is reading",
                            chinese: "她在读书"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/play.png" width="90">',
                        answer: "He is playing with toys",
                        chinese: "他在玩玩具",
                        stepA: {
                            instruction: "看图片，说出完整句子：He is _____ with toys.",
                            expected: "He is playing with toys",
                            chinese: "他在玩玩具"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：He is _____ with toys.",
                            expected: "He is playing with toys",
                            chinese: "他在玩玩具"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/watching_tv.png" width="90">',
                        answer: "She is watching TV",
                        chinese: "她在看电视",
                        stepA: {
                            instruction: "看图片，说出完整句子：She is _____ TV.",
                            expected: "She is watching TV",
                            chinese: "她在看电视"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：She is _____ TV.",
                            expected: "She is watching TV",
                            chinese: "她在看电视"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/time.png" width="90">',
                        answer: "What are you doing",
                        chinese: "你在做什么",
                        stepA: {
                            instruction: "问一问：What are you _____?",
                            expected: "What are you doing",
                            chinese: "你在做什么"
                        },
                        stepB: {
                            instruction: "你也问：What are you _____?",
                            expected: "What are you doing",
                            chinese: "你在做什么"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/clock.png" width="90">',
                        answer: "What's the time in New York",
                        chinese: "纽约几点了",
                        stepA: {
                            instruction: "问一问：What's the time in _____?",
                            expected: "What's the time in New York",
                            chinese: "纽约几点了"
                        },
                        stepB: {
                            instruction: "你也问：What's the time in _____?",
                            expected: "What's the time in New York",
                            chinese: "纽约几点了"
                        }
                    }
                ]
            },

            // ── 站点3：合作对话（hard）──
            {
                id: 3, name: "合作对话", icon: "🗣️",
                difficulty: "hard",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A问活动，B回答，合作完成对话",
                questions: [
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问同学在做什么",
                        image: '<img src="assets/images/reading.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问同学在做什么",
                            role: "提问者",
                            line: "What are you doing",
                            chinese: "你在做什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答",
                            role: "回答者",
                            line: "I'm reading",
                            chinese: "我在读书。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问同学在做什么",
                        image: '<img src="assets/images/play.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问同学在做什么",
                            role: "提问者",
                            line: "What are you doing",
                            chinese: "你在做什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答",
                            role: "回答者",
                            line: "I'm playing",
                            chinese: "我在玩。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问同学在做什么",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问同学在做什么",
                            role: "提问者",
                            line: "What are you doing",
                            chinese: "你在做什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答",
                            role: "回答者",
                            line: "I'm drawing",
                            chinese: "我在画画。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问奶奶在不在看电视",
                        image: '<img src="assets/images/reading.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问奶奶在不在看电视",
                            role: "提问者",
                            line: "Is Grandma watching TV",
                            chinese: "奶奶在看电视吗？"
                        },
                        stepB: {
                            instruction: "看示范句，否定回答",
                            role: "回答者",
                            line: "No she isn't She is reading",
                            chinese: "不，她在读书。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问纽约几点",
                        image: '<img src="assets/images/clock.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问纽约几点",
                            role: "提问者",
                            line: "What's the time in New York",
                            chinese: "纽约几点了？"
                        },
                        stepB: {
                            instruction: "看示范句，回答时间和活动",
                            role: "回答者",
                            line: "It's 7:30 p.m. I'm reading",
                            chinese: "晚上7:30，我在读书。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问伦敦几点",
                        image: '<img src="assets/images/watching_tv.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问伦敦几点",
                            role: "提问者",
                            line: "What's the time in London Grandpa",
                            chinese: "伦敦几点了爷爷？"
                        },
                        stepB: {
                            instruction: "看示范句，回答时间和活动",
                            role: "爷爷",
                            line: "It's 10:30 a.m. I'm watching TV",
                            chinese: "上午10:30，我在看电视。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问同学在做什么",
                        image: '<img src="assets/images/watching_tv.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问同学在做什么",
                            role: "提问者",
                            line: "What are you doing",
                            chinese: "你在做什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答",
                            role: "回答者",
                            line: "I'm watching TV",
                            chinese: "我在看电视。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "她在做什么",
                        image: '<img src="assets/images/sleeping.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说说她在做什么",
                            role: "描述者",
                            line: "She is sleeping",
                            chinese: "她在睡觉。"
                        },
                        stepB: {
                            instruction: "看示范句，问几点了",
                            role: "提问者",
                            line: "What's the time",
                            chinese: "几点了？"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "他在做什么",
                        image: '<img src="assets/images/play.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说说他在做什么",
                            role: "描述者",
                            line: "He is playing with toys",
                            chinese: "他在玩玩具。"
                        },
                        stepB: {
                            instruction: "看示范句，回应",
                            role: "回应者",
                            line: "I'm playing too",
                            chinese: "我也在玩。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问同学在做什么",
                        image: '<img src="assets/images/sleeping.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问同学在做什么",
                            role: "提问者",
                            line: "What are you doing",
                            chinese: "你在做什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答",
                            role: "回答者",
                            line: "I'm sleeping",
                            chinese: "我在睡觉。"
                        }
                    }
                ]
            }
        ]
    }
};

// 导出（兼容直接 script 引入）
if (typeof window !== 'undefined') {
    window.u3l2_coop = u3l2_coop;
}
