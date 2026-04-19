/**
 * U3L1 合作冒险题库 — It's eleven o'clock in Beijing.
 * 主题：看时间
 * 新词汇：time, o'clock, clock, eleven, twelve, three, nine, ten, morning, wolf, run, away
 * 句型：What's the time? / It's ___ o'clock. / Good morning. / Is it ___ o'clock? / Yes, it is. / No, it isn't.
 *
 * 每道题拆成 stepA（蓝色）→ stepB（橙色），B依赖A的结果
 */

var u3l1_coop = {
    id: "U3L1",
    title: "It's eleven o'clock in Beijing.",
    theme: "telling time",

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
                        type: "coop_listen_relay", audio: "eleven o'clock", chinese: "十一点", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/clock_11.png" width="70">', value: "eleven" },
                                { html: '<img src="assets/images/clock_12.png" width="70">', value: "twelve" },
                                { html: '<img src="assets/images/clock_3.png" width="70">', value: "three" },
                                { html: '<img src="assets/images/clock.png" width="70">', value: "clock" }
                            ],
                            correct: "eleven"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "eleven": { options: ["十一点","十二点","三点","时钟"], correct: "十一点" },
                                "twelve": { options: ["十二点","十一点","三点","时钟"], correct: "十二点" },
                                "three":  { options: ["三点","十一点","十二点","时钟"], correct: "三点" },
                                "clock":  { options: ["时钟","十一点","十二点","三点"], correct: "时钟" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "twelve o'clock", chinese: "十二点", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/clock_12.png" width="70">', value: "twelve" },
                                { html: '<img src="assets/images/clock_11.png" width="70">', value: "eleven" },
                                { html: '<img src="assets/images/clock_3.png" width="70">', value: "three" },
                                { html: '<img src="assets/images/clock.png" width="70">', value: "clock" }
                            ],
                            correct: "twelve"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "twelve":  { options: ["十二点","十一点","三点","时钟"], correct: "十二点" },
                                "eleven":  { options: ["十一点","十二点","三点","时钟"], correct: "十一点" },
                                "three":   { options: ["三点","十二点","十一点","时钟"], correct: "三点" },
                                "clock":   { options: ["时钟","十二点","十一点","三点"], correct: "时钟" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "three o'clock", chinese: "三点", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/clock_3.png" width="70">', value: "three" },
                                { html: '<img src="assets/images/clock_11.png" width="70">', value: "eleven" },
                                { html: '<img src="assets/images/clock_12.png" width="70">', value: "twelve" },
                                { html: '<img src="assets/images/clock.png" width="70">', value: "clock" }
                            ],
                            correct: "three"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "three":   { options: ["三点","十一点","十二点","九点"], correct: "三点" },
                                "eleven":  { options: ["十一点","三点","十二点","九点"], correct: "十一点" },
                                "twelve":  { options: ["十二点","三点","十一点","九点"], correct: "十二点" },
                                "clock":   { options: ["时钟","三点","十一点","十二点"], correct: "时钟" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "nine o'clock", chinese: "九点", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/nine.png" width="70">', value: "nine" },
                                { html: '<img src="assets/images/clock_3.png" width="70">', value: "three" },
                                { html: '<img src="assets/images/clock_11.png" width="70">', value: "eleven" },
                                { html: '<img src="assets/images/ten.png" width="70">', value: "ten" }
                            ],
                            correct: "nine"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "nine":    { options: ["九点","三点","十一点","十点"], correct: "九点" },
                                "three":   { options: ["三点","九点","十一点","十点"], correct: "三点" },
                                "eleven":  { options: ["十一点","九点","三点","十点"], correct: "十一点" },
                                "ten":     { options: ["十点","九点","三点","十一点"], correct: "十点" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "ten o'clock", chinese: "十点", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/ten.png" width="70">', value: "ten" },
                                { html: '<img src="assets/images/nine.png" width="70">', value: "nine" },
                                { html: '<img src="assets/images/clock_12.png" width="70">', value: "twelve" },
                                { html: '<img src="assets/images/clock_3.png" width="70">', value: "three" }
                            ],
                            correct: "ten"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "ten":     { options: ["十点","九点","十二点","三点"], correct: "十点" },
                                "nine":    { options: ["九点","十点","十二点","三点"], correct: "九点" },
                                "twelve":  { options: ["十二点","十点","九点","三点"], correct: "十二点" },
                                "three":   { options: ["三点","十点","九点","十二点"], correct: "三点" }
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
                        type: "coop_listen_judge", audio: "eleven o'clock", difficulty: "easy",
                        image: '<img src="assets/images/clock_11.png" width="90">',
                        isMatch: true, chinese: "十一点",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/clock_11.png" width="60">', value: "eleven" },
                                { html: '<img src="assets/images/clock_12.png" width="60">', value: "twelve" },
                                { html: '<img src="assets/images/clock_3.png" width="60">', value: "three" },
                                { html: '<img src="assets/images/nine.png" width="60">', value: "nine" }
                            ],
                            correct: "eleven"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "twelve o'clock", difficulty: "easy",
                        image: '<img src="assets/images/clock_3.png" width="90">',
                        isMatch: false, chinese: "十二点",
                        correctImage: '<img src="assets/images/clock_12.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/clock_12.png" width="60">', value: "twelve" },
                                { html: '<img src="assets/images/clock_3.png" width="60">', value: "three" },
                                { html: '<img src="assets/images/clock_11.png" width="60">', value: "eleven" },
                                { html: '<img src="assets/images/nine.png" width="60">', value: "nine" }
                            ],
                            correct: "twelve"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "three o'clock", difficulty: "medium",
                        image: '<img src="assets/images/clock_3.png" width="90">',
                        isMatch: true, chinese: "三点",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/clock_3.png" width="60">', value: "three" },
                                { html: '<img src="assets/images/clock_11.png" width="60">', value: "eleven" },
                                { html: '<img src="assets/images/clock_12.png" width="60">', value: "twelve" },
                                { html: '<img src="assets/images/ten.png" width="60">', value: "ten" }
                            ],
                            correct: "three"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "nine o'clock", difficulty: "medium",
                        image: '<img src="assets/images/clock_11.png" width="90">',
                        isMatch: false, chinese: "九点",
                        correctImage: '<img src="assets/images/nine.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/nine.png" width="60">', value: "nine" },
                                { html: '<img src="assets/images/clock_11.png" width="60">', value: "eleven" },
                                { html: '<img src="assets/images/clock_12.png" width="60">', value: "twelve" },
                                { html: '<img src="assets/images/ten.png" width="60">', value: "ten" }
                            ],
                            correct: "nine"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "ten o'clock", difficulty: "medium",
                        image: '<img src="assets/images/clock_12.png" width="90">',
                        isMatch: false, chinese: "十点",
                        correctImage: '<img src="assets/images/ten.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/ten.png" width="60">', value: "ten" },
                                { html: '<img src="assets/images/clock_12.png" width="60">', value: "twelve" },
                                { html: '<img src="assets/images/clock_3.png" width="60">', value: "three" },
                                { html: '<img src="assets/images/nine.png" width="60">', value: "nine" }
                            ],
                            correct: "ten"
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
                        sequence: ["three", "nine", "twelve"],
                        words: [
                            { html: '<img src="assets/images/clock_3.png" width="60">', value: "three" },
                            { html: '<img src="assets/images/nine.png" width="60">', value: "nine" },
                            { html: '<img src="assets/images/clock_12.png" width="60">', value: "twelve" }
                        ],
                        chinese: "three → nine → twelve"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["eleven", "ten", "three"],
                        words: [
                            { html: '<img src="assets/images/clock_11.png" width="60">', value: "eleven" },
                            { html: '<img src="assets/images/ten.png" width="60">', value: "ten" },
                            { html: '<img src="assets/images/clock_3.png" width="60">', value: "three" }
                        ],
                        chinese: "eleven → ten → three"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["twelve", "three", "eleven"],
                        words: [
                            { html: '<img src="assets/images/clock_12.png" width="55">', value: "twelve" },
                            { html: '<img src="assets/images/clock_3.png" width="55">', value: "three" },
                            { html: '<img src="assets/images/clock_11.png" width="55">', value: "eleven" }
                        ],
                        chinese: "twelve → three → eleven"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["nine", "eleven", "ten"],
                        words: [
                            { html: '<img src="assets/images/nine.png" width="55">', value: "nine" },
                            { html: '<img src="assets/images/clock_11.png" width="55">', value: "eleven" },
                            { html: '<img src="assets/images/ten.png" width="55">', value: "ten" }
                        ],
                        chinese: "nine → eleven → ten"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["ten", "twelve", "nine", "three"],
                        words: [
                            { html: '<img src="assets/images/ten.png" width="50">', value: "ten" },
                            { html: '<img src="assets/images/clock_12.png" width="50">', value: "twelve" },
                            { html: '<img src="assets/images/nine.png" width="50">', value: "nine" },
                            { html: '<img src="assets/images/clock_3.png" width="50">', value: "three" }
                        ],
                        chinese: "ten → twelve → nine → three"
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
                        scenario: "在酒店大厅看到很多时钟，妈妈问时间",
                        audio: "What's the time? It's eleven o'clock.",
                        stepA: {
                            instruction: "听音频，现在几点？",
                            question: "现在几点？",
                            options: ["十一点", "十二点", "三点", "九点"],
                            correct: "十一点"
                        },
                        stepB: {
                            instruction: "根据时间，选正确的时钟",
                            question: "哪个时钟是对的？",
                            optionsMap: {
                                "十一点": { options: [
                                    { html: '<img src="assets/images/clock_11.png" width="60">', value: "clock_11" },
                                    { html: '<img src="assets/images/clock_12.png" width="60">', value: "clock_12" }
                                ], correct: "clock_11" },
                                "十二点": { options: [
                                    { html: '<img src="assets/images/clock_12.png" width="60">', value: "clock_12" },
                                    { html: '<img src="assets/images/clock_11.png" width="60">', value: "clock_11" }
                                ], correct: "clock_12" },
                                "三点": { options: [
                                    { html: '<img src="assets/images/clock_3.png" width="60">', value: "clock_3" },
                                    { html: '<img src="assets/images/clock_11.png" width="60">', value: "clock_11" }
                                ], correct: "clock_3" },
                                "九点": { options: [
                                    { html: '<img src="assets/images/nine.png" width="60">', value: "nine" },
                                    { html: '<img src="assets/images/clock_11.png" width="60">', value: "clock_11" }
                                ], correct: "nine" }
                            }
                        },
                        chinese: "现在十一点"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "伦敦现在几点？",
                        audio: "Is it twelve o'clock in London? No, it isn't. It's three o'clock.",
                        stepA: {
                            instruction: "听音频，伦敦现在几点？",
                            question: "伦敦现在几点？",
                            options: ["三点", "十二点", "十一点", "九点"],
                            correct: "三点"
                        },
                        stepB: {
                            instruction: "A听到的时间对吗？",
                            question: "是十二点吗？",
                            optionsMap: {
                                "三点":   { options: ["不是，是三点", "是，是十二点"], correct: "不是，是三点" },
                                "十二点": { options: ["是，是十二点", "不是，是三点"], correct: "是，是十二点" },
                                "十一点": { options: ["不是，是十一点", "是，是十二点"], correct: "不是，是十一点" },
                                "九点":   { options: ["不是，是九点", "是，是十二点"], correct: "不是，是九点" }
                            }
                        },
                        chinese: "伦敦三点"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "早上问好",
                        audio: "Good morning. What's the time? It's nine o'clock.",
                        stepA: {
                            instruction: "听音频，现在是什么时候？",
                            question: "现在是早上还是晚上？",
                            options: ["早上", "晚上", "中午", "下午"],
                            correct: "早上"
                        },
                        stepB: {
                            instruction: "A听到音频说了时间，音频里说的是九点，选正确的时间",
                            question: "现在几点？",
                            optionsMap: {
                                "早上": { options: ["九点", "十二点", "三点", "十一点"], correct: "九点" },
                                "晚上": { options: ["九点", "十二点", "三点", "十一点"], correct: "九点" },
                                "中午": { options: ["九点", "十二点", "三点", "十一点"], correct: "九点" },
                                "下午": { options: ["九点", "十二点", "三点", "十一点"], correct: "九点" }
                            }
                        },
                        chinese: "早上九点"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "玩Mr. Wolf游戏",
                        audio: "What's the time, Mr. Wolf? It's twelve o'clock. Run!",
                        stepA: {
                            instruction: "听音频，狼先生说几点了？",
                            question: "狼先生说几点？",
                            options: ["十二点", "十一点", "三点", "九点"],
                            correct: "十二点"
                        },
                        stepB: {
                            instruction: "十二点了要怎么做？",
                            question: "同学们应该怎么做？",
                            optionsMap: {
                                "十二点": { options: ["快跑！", "继续玩", "坐下来", "睡觉"], correct: "快跑！" },
                                "十一点": { options: ["继续问时间", "快跑！", "坐下来", "睡觉"], correct: "继续问时间" },
                                "三点":   { options: ["继续问时间", "快跑！", "坐下来", "睡觉"], correct: "继续问时间" },
                                "九点":   { options: ["继续问时间", "快跑！", "坐下来", "睡觉"], correct: "继续问时间" }
                            }
                        },
                        chinese: "十二点快跑"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "北京现在几点",
                        audio: "It's eleven o'clock in Beijing.",
                        stepA: {
                            instruction: "听音频，北京几点？",
                            question: "北京现在几点？",
                            options: ["十一点", "十二点", "三点", "十点"],
                            correct: "十一点"
                        },
                        stepB: {
                            instruction: "北京十一点，是上午还是下午？",
                            question: "十一点是什么时候？",
                            optionsMap: {
                                "十一点": { options: ["上午", "下午", "晚上", "半夜"], correct: "上午" },
                                "十二点": { options: ["中午", "上午", "晚上", "半夜"], correct: "中午" },
                                "三点":   { options: ["下午", "上午", "晚上", "半夜"], correct: "下午" },
                                "十点":   { options: ["上午", "下午", "晚上", "半夜"], correct: "上午" }
                            }
                        },
                        chinese: "北京十一点上午"
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
                        image: '<img src="assets/images/clock.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["clock", "time", "morning", "wolf"],
                            correct: "clock"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "clock":   { options: ["时钟","时间","早上","狼"], correct: "时钟" },
                                "time":    { options: ["时间","时钟","早上","狼"], correct: "时间" },
                                "morning": { options: ["早上","时钟","时间","狼"], correct: "早上" },
                                "wolf":    { options: ["狼","时钟","时间","早上"], correct: "狼" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/time.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["time", "clock", "run", "morning"],
                            correct: "time"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "time":    { options: ["时间","时钟","跑","早上"], correct: "时间" },
                                "clock":   { options: ["时钟","时间","跑","早上"], correct: "时钟" },
                                "run":     { options: ["跑","时间","时钟","早上"], correct: "跑" },
                                "morning": { options: ["早上","时间","时钟","跑"], correct: "早上" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/clock_11.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文",
                            options: ["eleven", "twelve", "three", "nine"],
                            correct: "eleven"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "eleven": { options: ["十一","十二","三","九"], correct: "十一" },
                                "twelve": { options: ["十二","十一","三","九"], correct: "十二" },
                                "three":  { options: ["三","十一","十二","九"], correct: "三" },
                                "nine":   { options: ["九","十一","十二","三"], correct: "九" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/clock_12.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文",
                            options: ["twelve", "eleven", "ten", "three"],
                            correct: "twelve"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "twelve":  { options: ["十二","十一","十","三"], correct: "十二" },
                                "eleven":  { options: ["十一","十二","十","三"], correct: "十一" },
                                "ten":     { options: ["十","十二","十一","三"], correct: "十" },
                                "three":   { options: ["三","十二","十一","十"], correct: "三" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/clock_3.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文",
                            options: ["three", "nine", "ten", "twelve"],
                            correct: "three"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "three":  { options: ["三","九","十","十二"], correct: "三" },
                                "nine":   { options: ["九","三","十","十二"], correct: "九" },
                                "ten":    { options: ["十","三","九","十二"], correct: "十" },
                                "twelve": { options: ["十二","三","九","十"], correct: "十二" }
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
                            { word: "eleven", match: '<img src="assets/images/clock_11.png" width="50">', chinese: "十一" },
                            { word: "twelve", match: '<img src="assets/images/clock_12.png" width="50">', chinese: "十二" },
                            { word: "three", match: '<img src="assets/images/clock_3.png" width="50">', chinese: "三" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "clock", match: '<img src="assets/images/clock.png" width="50">', chinese: "时钟" },
                            { word: "time", match: '<img src="assets/images/time.png" width="50">', chinese: "时间" },
                            { word: "nine", match: '<img src="assets/images/nine.png" width="50">', chinese: "九" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "ten", match: '<img src="assets/images/ten.png" width="50">', chinese: "十" },
                            { word: "eleven", match: '<img src="assets/images/clock_11.png" width="50">', chinese: "十一" },
                            { word: "twelve", match: '<img src="assets/images/clock_12.png" width="50">', chinese: "十二" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "three", match: '<img src="assets/images/clock_3.png" width="50">', chinese: "三" },
                            { word: "nine", match: '<img src="assets/images/nine.png" width="50">', chinese: "九" },
                            { word: "ten", match: '<img src="assets/images/ten.png" width="50">', chinese: "十" },
                            { word: "twelve", match: '<img src="assets/images/clock_12.png" width="50">', chinese: "十二" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "eleven", match: '<img src="assets/images/clock_11.png" width="50">', chinese: "十一" },
                            { word: "clock", match: '<img src="assets/images/clock.png" width="50">', chinese: "时钟" },
                            { word: "time", match: '<img src="assets/images/time.png" width="50">', chinese: "时间" },
                            { word: "three", match: '<img src="assets/images/clock_3.png" width="50">', chinese: "三" }
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
                        image: '<img src="assets/images/clock_11.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "It's eleven o'clock.", value: "It's eleven o'clock." },
                                { html: "It's twelve o'clock.", value: "It's twelve o'clock." },
                                { html: "It's three o'clock.", value: "It's three o'clock." },
                                { html: "It's nine o'clock.", value: "It's nine o'clock." }
                            ],
                            correct: "It's eleven o'clock."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "It's eleven o'clock.": { options: ["十一点了。","十二点了。","三点了。","九点了。"], correct: "十一点了。" },
                                "It's twelve o'clock.": { options: ["十二点了。","十一点了。","三点了。","九点了。"], correct: "十二点了。" },
                                "It's three o'clock.":  { options: ["三点了。","十一点了。","十二点了。","九点了。"], correct: "三点了。" },
                                "It's nine o'clock.":   { options: ["九点了。","十一点了。","十二点了。","三点了。"], correct: "九点了。" }
                            }
                        },
                        chinese: "十一点了"
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/time.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的英文",
                            options: [
                                { html: "What's the time?", value: "What's the time?" },
                                { html: "Good morning.", value: "Good morning." },
                                { html: "It's twelve o'clock.", value: "It's twelve o'clock." },
                                { html: "Run away!", value: "Run away!" }
                            ],
                            correct: "What's the time?"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "What's the time?":      { options: ["几点了？","早上好。","十二点了。","快跑！"], correct: "几点了？" },
                                "Good morning.":         { options: ["早上好。","几点了？","十二点了。","快跑！"], correct: "早上好。" },
                                "It's twelve o'clock.":  { options: ["十二点了。","几点了？","早上好。","快跑！"], correct: "十二点了。" },
                                "Run away!":             { options: ["快跑！","几点了？","早上好。","十二点了。"], correct: "快跑！" }
                            }
                        },
                        chinese: "几点了？"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/clock_12.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的英文",
                            options: [
                                { html: "Is it twelve o'clock?", value: "Is it twelve o'clock?" },
                                { html: "Is it eleven o'clock?", value: "Is it eleven o'clock?" },
                                { html: "It's three o'clock.", value: "It's three o'clock." },
                                { html: "Good morning.", value: "Good morning." }
                            ],
                            correct: "Is it twelve o'clock?"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Is it twelve o'clock?":  { options: ["是十二点吗？","是十一点吗？","三点了。","早上好。"], correct: "是十二点吗？" },
                                "Is it eleven o'clock?":  { options: ["是十一点吗？","是十二点吗？","三点了。","早上好。"], correct: "是十一点吗？" },
                                "It's three o'clock.":    { options: ["三点了。","是十二点吗？","是十一点吗？","早上好。"], correct: "三点了。" },
                                "Good morning.":          { options: ["早上好。","是十二点吗？","是十一点吗？","三点了。"], correct: "早上好。" }
                            }
                        },
                        chinese: "是十二点吗？"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/scenario_time.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的英文",
                            options: [
                                { html: "Yes, it is.", value: "Yes, it is." },
                                { html: "No, it isn't.", value: "No, it isn't." },
                                { html: "Good morning.", value: "Good morning." },
                                { html: "Run away!", value: "Run away!" }
                            ],
                            correct: "Yes, it is."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Yes, it is.":    { options: ["是的。","不是。","早上好。","快跑！"], correct: "是的。" },
                                "No, it isn't.":  { options: ["不是。","是的。","早上好。","快跑！"], correct: "不是。" },
                                "Good morning.":  { options: ["早上好。","是的。","不是。","快跑！"], correct: "早上好。" },
                                "Run away!":      { options: ["快跑！","是的。","不是。","早上好。"], correct: "快跑！" }
                            }
                        },
                        chinese: "是的"
                    },
                    {
                        type: "coop_word_relay", difficulty: "hard",
                        image: '<img src="assets/images/clock_3.png" width="90">',
                        stepA: {
                            instruction: "读对话，选正确的回答",
                            options: [
                                { html: "No, it isn't. It's three o'clock.", value: "No, it isn't. It's three o'clock." },
                                { html: "Yes, it is.", value: "Yes, it is." },
                                { html: "Good morning.", value: "Good morning." },
                                { html: "It's eleven o'clock.", value: "It's eleven o'clock." }
                            ],
                            correct: "No, it isn't. It's three o'clock."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "No, it isn't. It's three o'clock.": { options: ["不是，是三点。","是的。","早上好。","十一点了。"], correct: "不是，是三点。" },
                                "Yes, it is.":                       { options: ["是的。","不是，是三点。","早上好。","十一点了。"], correct: "是的。" },
                                "Good morning.":                     { options: ["早上好。","不是，是三点。","是的。","十一点了。"], correct: "早上好。" },
                                "It's eleven o'clock.":              { options: ["十一点了。","不是，是三点。","是的。","早上好。"], correct: "十一点了。" }
                            }
                        },
                        chinese: "不是，是三点"
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
                        scenario: "看时钟回答时间",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "What's the time? It's eleven o'clock.",
                            question: "现在几点？",
                            options: ["十一点", "十二点", "三点", "九点"],
                            correct: "十一点"
                        },
                        stepB: {
                            instruction: "根据A的选择，选正确的时钟",
                            optionsMap: {
                                "十一点": { options: [
                                    { html: '<img src="assets/images/clock_11.png" width="60">', value: "clock_11" },
                                    { html: '<img src="assets/images/clock_12.png" width="60">', value: "clock_12" },
                                    { html: '<img src="assets/images/clock_3.png" width="60">', value: "clock_3" },
                                    { html: '<img src="assets/images/nine.png" width="60">', value: "nine" }
                                ], correct: "clock_11" },
                                "十二点": { options: [
                                    { html: '<img src="assets/images/clock_12.png" width="60">', value: "clock_12" },
                                    { html: '<img src="assets/images/clock_11.png" width="60">', value: "clock_11" },
                                    { html: '<img src="assets/images/clock_3.png" width="60">', value: "clock_3" },
                                    { html: '<img src="assets/images/nine.png" width="60">', value: "nine" }
                                ], correct: "clock_12" },
                                "三点": { options: [
                                    { html: '<img src="assets/images/clock_3.png" width="60">', value: "clock_3" },
                                    { html: '<img src="assets/images/clock_11.png" width="60">', value: "clock_11" },
                                    { html: '<img src="assets/images/clock_12.png" width="60">', value: "clock_12" },
                                    { html: '<img src="assets/images/nine.png" width="60">', value: "nine" }
                                ], correct: "clock_3" },
                                "九点": { options: [
                                    { html: '<img src="assets/images/nine.png" width="60">', value: "nine" },
                                    { html: '<img src="assets/images/clock_11.png" width="60">', value: "clock_11" },
                                    { html: '<img src="assets/images/clock_12.png" width="60">', value: "clock_12" },
                                    { html: '<img src="assets/images/clock_3.png" width="60">', value: "clock_3" }
                                ], correct: "nine" }
                            }
                        },
                        chinese: "十一点→选时钟"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "问伦敦的时间",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Is it twelve o'clock in London? No, it isn't. It's three o'clock.",
                            question: "伦敦几点？",
                            options: ["三点", "十二点", "十一点", "九点"],
                            correct: "三点"
                        },
                        stepB: {
                            instruction: "根据A的选择，回答问题",
                            optionsMap: {
                                "三点":   { options: ["No, it isn't.", "Yes, it is."], correct: "No, it isn't." },
                                "十二点": { options: ["Yes, it is.", "No, it isn't."], correct: "Yes, it is." },
                                "十一点": { options: ["No, it isn't.", "Yes, it is."], correct: "No, it isn't." },
                                "九点":   { options: ["No, it isn't.", "Yes, it is."], correct: "No, it isn't." }
                            }
                        },
                        chinese: "伦敦三点不是十二点"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "早上好",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Good morning. What's the time? It's nine o'clock.",
                            question: "现在几点？",
                            options: ["九点", "十点", "十一点", "十二点"],
                            correct: "九点"
                        },
                        stepB: {
                            instruction: "早上九点应该怎么打招呼？",
                            optionsMap: {
                                "九点":   { options: ["Good morning.", "Run away!", "No, it isn't.", "It's twelve o'clock."], correct: "Good morning." },
                                "十点":   { options: ["Good morning.", "Run away!", "No, it isn't.", "It's twelve o'clock."], correct: "Good morning." },
                                "十一点": { options: ["Good morning.", "Run away!", "No, it isn't.", "It's twelve o'clock."], correct: "Good morning." },
                                "十二点": { options: ["Good morning.", "Run away!", "No, it isn't.", "It's nine o'clock."], correct: "Good morning." }
                            }
                        },
                        chinese: "九点→Good morning"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "Mr. Wolf游戏",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "What's the time, Mr. Wolf? It's twelve o'clock.",
                            question: "狼先生说几点了？",
                            options: ["十二点", "十一点", "三点", "九点"],
                            correct: "十二点"
                        },
                        stepB: {
                            instruction: "十二点了，同学们应该怎么做？",
                            optionsMap: {
                                "十二点": { options: ["Run away!", "Good morning.", "Yes, it is.", "It's three o'clock."], correct: "Run away!" },
                                "十一点": { options: ["继续问时间", "Run away!", "Good morning.", "Yes, it is."], correct: "继续问时间" },
                                "三点":   { options: ["继续问时间", "Run away!", "Good morning.", "Yes, it is."], correct: "继续问时间" },
                                "九点":   { options: ["继续问时间", "Run away!", "Good morning.", "Yes, it is."], correct: "继续问时间" }
                            }
                        },
                        chinese: "十二点→快跑"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "读北京时间",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "It's eleven o'clock in Beijing. Is it twelve o'clock in London? No, it isn't.",
                            question: "北京几点？",
                            options: ["十一点", "十二点", "三点", "九点"],
                            correct: "十一点"
                        },
                        stepB: {
                            instruction: "伦敦是十二点吗？",
                            optionsMap: {
                                "十一点": { options: ["No, it isn't.", "Yes, it is."], correct: "No, it isn't." },
                                "十二点": { options: ["Yes, it is.", "No, it isn't."], correct: "Yes, it is." },
                                "三点":   { options: ["No, it isn't.", "Yes, it is."], correct: "No, it isn't." },
                                "九点":   { options: ["No, it isn't.", "Yes, it is."], correct: "No, it isn't." }
                            }
                        },
                        chinese: "北京十一点伦敦不是十二点"
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
                        sentence: "What's the time?",
                        stepA: { words: ["What's", "the"], instruction: "选前半句的词" },
                        stepB: { words: ["time?"], instruction: "选后半句的词" },
                        chinese: "几点了？"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "It's eleven o'clock.",
                        stepA: { words: ["It's", "eleven"], instruction: "选前半句的词" },
                        stepB: { words: ["o'clock."], instruction: "选后半句的词" },
                        chinese: "十一点了。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "Good morning.",
                        stepA: { words: ["Good"], instruction: "选前半句的词" },
                        stepB: { words: ["morning."], instruction: "选后半句的词" },
                        chinese: "早上好。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "Is it twelve o'clock?",
                        stepA: { words: ["Is", "it"], instruction: "选前半句的词" },
                        stepB: { words: ["twelve", "o'clock?"], instruction: "选后半句的词" },
                        chinese: "是十二点吗？"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "No, it isn't. It's three o'clock.",
                        stepA: { words: ["No,", "it", "isn't."], instruction: "选前半句的词" },
                        stepB: { words: ["It's", "three", "o'clock."], instruction: "选后半句的词" },
                        chinese: "不是，三点了。"
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
                        template: "What's the ___? It's eleven ___.",
                        image: '<img src="assets/images/clock_11.png" width="70">',
                        stepA: { blank: 1, options: ["time", "name", "color", "size"], correct: "time", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["o'clock", "morning", "wolf", "run"], correct: "o'clock", instruction: "填第2个空" },
                        chinese: "What's the time? It's eleven o'clock."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "Is it ___ o'clock? No, it ___.",
                        image: '<img src="assets/images/clock_3.png" width="70">',
                        stepA: { blank: 1, options: ["twelve", "eleven", "three", "nine"], correct: "twelve", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["isn't", "is", "am", "are"], correct: "isn't", instruction: "填第2个空" },
                        chinese: "Is it twelve o'clock? No, it isn't."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "___ morning. It's ___ o'clock.",
                        image: '<img src="assets/images/clock.png" width="70">',
                        stepA: { blank: 1, options: ["Good", "Run", "What", "Is"], correct: "Good", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["nine", "wolf", "away", "run"], correct: "nine", instruction: "填第2个空" },
                        chinese: "Good morning. It's nine o'clock."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "It's ___ o'clock in ___.",
                        image: '<img src="assets/images/clock_11.png" width="70">',
                        stepA: { blank: 1, options: ["eleven", "twelve", "three", "nine"], correct: "eleven", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["Beijing", "London", "Tokyo", "Paris"], correct: "Beijing", instruction: "填城市名" },
                        chinese: "It's eleven o'clock in Beijing."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "What's the ___, Mr. ___?",
                        image: '<img src="assets/images/scenario_time.png" width="70">',
                        stepA: { blank: 1, options: ["time", "name", "clock", "morning"], correct: "time", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["Wolf", "Bear", "Dog", "Cat"], correct: "Wolf", instruction: "填第2个空" },
                        chinese: "What's the time, Mr. Wolf?"
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
                        word: "time",
                        image: '<img src="assets/images/time.png" width="60">',
                        stepA: { letters: ["t", "i"], distractors: ["a", "o"], instruction: "拼前半：t___" },
                        stepB: { letters: ["m", "e"], distractors: ["n", "r"], instruction: "拼后半：__me" },
                        chinese: "时间"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "clock",
                        image: '<img src="assets/images/clock.png" width="60">',
                        stepA: { letters: ["c", "l"], distractors: ["k", "a"], instruction: "拼前半：c____" },
                        stepB: { letters: ["o", "c", "k"], distractors: ["e", "t"], instruction: "拼后半：___ock" },
                        chinese: "时钟"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "nine",
                        image: '<img src="assets/images/nine.png" width="60">',
                        stepA: { letters: ["n", "i"], distractors: ["a", "o"], instruction: "拼前半：n___" },
                        stepB: { letters: ["n", "e"], distractors: ["m", "t"], instruction: "拼后半：__ne" },
                        chinese: "九"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "eleven",
                        image: '<img src="assets/images/clock_11.png" width="60">',
                        stepA: { letters: ["e", "l", "e"], distractors: ["a", "o"], instruction: "拼前半：e_____" },
                        stepB: { letters: ["v", "e", "n"], distractors: ["r", "t"], instruction: "拼后半：___ven" },
                        chinese: "十一"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "twelve",
                        image: '<img src="assets/images/clock_12.png" width="60">',
                        stepA: { letters: ["t", "w", "e"], distractors: ["a", "o"], instruction: "拼前半：t_____" },
                        stepB: { letters: ["l", "v", "e"], distractors: ["r", "n"], instruction: "拼后半：___lve" },
                        chinese: "十二"
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
                        scenario: "问同学现在几点",
                        stepA: {
                            instruction: "你想知道时间，选一句话问",
                            options: ["What's the time?", "Good morning.", "It's eleven o'clock.", "Run away!"]
                        },
                        stepB: {
                            instruction: "回答A的问题",
                            optionsMap: {
                                "What's the time?":       { options: ["It's eleven o'clock.", "Good morning.", "Run away!", "No, it isn't."], correct: "It's eleven o'clock." },
                                "Good morning.":          { options: ["Good morning.", "It's eleven o'clock.", "Run away!", "No, it isn't."], correct: "Good morning." },
                                "It's eleven o'clock.":   { options: ["Yes, it is.", "Good morning.", "Run away!", "What's the time?"], correct: "Yes, it is." },
                                "Run away!":              { options: ["OK!", "Good morning.", "It's eleven o'clock.", "No, it isn't."], correct: "OK!" }
                            }
                        },
                        chinese: "问时间并回答"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "确认是不是十二点（提示：时钟显示三点）",
                        stepA: {
                            instruction: "你想确认时间",
                            options: ["Is it twelve o'clock?", "What's the time?", "Good morning.", "It's nine o'clock."]
                        },
                        stepB: {
                            instruction: "回答A的问题（提示：时钟显示三点，不是十二点）",
                            optionsMap: {
                                "Is it twelve o'clock?": { options: ["No, it isn't. It's three o'clock.", "Yes, it is.", "Good morning.", "Run away!"], correct: "No, it isn't. It's three o'clock." },
                                "What's the time?":      { options: ["It's three o'clock.", "No, it isn't.", "Good morning.", "Run away!"], correct: "It's three o'clock." },
                                "Good morning.":         { options: ["Good morning.", "No, it isn't.", "It's three o'clock.", "Run away!"], correct: "Good morning." },
                                "It's nine o'clock.":    { options: ["Yes, it is.", "No, it isn't.", "Good morning.", "Run away!"], correct: "Yes, it is." }
                            }
                        },
                        chinese: "确认时间"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "玩Mr. Wolf游戏（提示：时钟显示十二点）",
                        stepA: {
                            instruction: "你是学生，问狼先生时间",
                            options: ["What's the time, Mr. Wolf?", "Good morning, Mr. Wolf.", "It's twelve o'clock.", "Run away!"]
                        },
                        stepB: {
                            instruction: "你是狼先生，回答时间（提示：时钟显示十二点，十二点要让大家跑！）",
                            optionsMap: {
                                "What's the time, Mr. Wolf?": { options: ["It's twelve o'clock.", "Good morning.", "Run away!", "No, it isn't."], correct: "It's twelve o'clock." },
                                "Good morning, Mr. Wolf.":    { options: ["Good morning.", "It's twelve o'clock.", "Run away!", "No, it isn't."], correct: "Good morning." },
                                "It's twelve o'clock.":       { options: ["Run away!", "Good morning.", "No, it isn't.", "Yes, it is."], correct: "Run away!" },
                                "Run away!":                  { options: ["OK!", "Good morning.", "It's twelve o'clock.", "No, it isn't."], correct: "OK!" }
                            }
                        },
                        chinese: "问狼先生时间"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "早上问好并问时间（提示：时钟显示九点）",
                        stepA: {
                            instruction: "早上见到同学，先问好",
                            options: ["Good morning.", "What's the time?", "Run away!", "No, it isn't."]
                        },
                        stepB: {
                            instruction: "回应A（提示：时钟显示九点，Good morning后加时间）",
                            optionsMap: {
                                "Good morning.":     { options: ["Good morning. It's nine o'clock.", "Run away!", "No, it isn't.", "It's twelve o'clock."], correct: "Good morning. It's nine o'clock." },
                                "What's the time?":  { options: ["It's nine o'clock.", "Good morning.", "Run away!", "No, it isn't."], correct: "It's nine o'clock." },
                                "Run away!":         { options: ["OK!", "Good morning.", "It's nine o'clock.", "No, it isn't."], correct: "OK!" },
                                "No, it isn't.":     { options: ["It's three o'clock.", "Good morning.", "Run away!", "OK!"], correct: "It's three o'clock." }
                            }
                        },
                        chinese: "早上问好"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "告诉同学北京的时间",
                        stepA: {
                            instruction: "选一个时间告诉同学",
                            options: [
                                { html: '<img src="assets/images/clock_11.png" width="60">', value: "clock_11" },
                                { html: '<img src="assets/images/clock_12.png" width="60">', value: "clock_12" },
                                { html: '<img src="assets/images/clock_3.png" width="60">', value: "clock_3" },
                                { html: '<img src="assets/images/nine.png" width="60">', value: "nine" }
                            ]
                        },
                        stepB: {
                            instruction: "根据A选的时钟，说出时间",
                            optionsMap: {
                                "clock_11": { options: ["It's eleven o'clock.", "It's twelve o'clock.", "It's three o'clock.", "It's nine o'clock."], correct: "It's eleven o'clock." },
                                "clock_12": { options: ["It's twelve o'clock.", "It's eleven o'clock.", "It's three o'clock.", "It's nine o'clock."], correct: "It's twelve o'clock." },
                                "clock_3":  { options: ["It's three o'clock.", "It's eleven o'clock.", "It's twelve o'clock.", "It's nine o'clock."], correct: "It's three o'clock." },
                                "nine":     { options: ["It's nine o'clock.", "It's eleven o'clock.", "It's twelve o'clock.", "It's three o'clock."], correct: "It's nine o'clock." }
                            }
                        },
                        chinese: "看图说时间"
                    }
                ]
            }
        ]
    },

    // ==================== 口语模块 ====================
    speaking: {
        stations: [
            // ── 站点1：跟读模仿（easy）— 音频+文字+中文+图片全给 ──
            {
                id: 1, name: "跟读模仿", icon: "🎤",
                difficulty: "easy",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A听音频跟读，B跟着读同一个（词和句混合，从易到难）",
                questions: [
                    {
                        type: "coop_read_relay", word: "time", chinese: "时间", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "clock", chinese: "时钟", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "eleven", chinese: "十一", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "twelve", chinese: "十二", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "morning", chinese: "早上", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "What's the time", chinese: "几点了？", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "It's eleven o'clock", chinese: "十一点了。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "Good morning", chinese: "早上好。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "Is it twelve o'clock", chinese: "是十二点吗？", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "No it isn't", chinese: "不是。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    }
                ]
            },

            // ── 站点2：看图说话（medium）— 图片+句型框架+中文提示 ──
            {
                id: 2, name: "看图说话", icon: "💬",
                difficulty: "medium",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "看图片和句型框架，说出完整句子",
                questions: [
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/clock_11.png" width="90">',
                        answer: "It's eleven o'clock",
                        chinese: "十一点了",
                        stepA: {
                            instruction: "看图片，说出完整句子：It's _____ o'clock.",
                            expected: "It's eleven o'clock",
                            chinese: "十一点了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：It's _____ o'clock.",
                            expected: "It's eleven o'clock",
                            chinese: "十一点了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/clock_12.png" width="90">',
                        answer: "It's twelve o'clock",
                        chinese: "十二点了",
                        stepA: {
                            instruction: "看图片，说出完整句子：It's _____ o'clock.",
                            expected: "It's twelve o'clock",
                            chinese: "十二点了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：It's _____ o'clock.",
                            expected: "It's twelve o'clock",
                            chinese: "十二点了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/clock_3.png" width="90">',
                        answer: "It's three o'clock",
                        chinese: "三点了",
                        stepA: {
                            instruction: "看图片，说出完整句子：It's _____ o'clock.",
                            expected: "It's three o'clock",
                            chinese: "三点了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：It's _____ o'clock.",
                            expected: "It's three o'clock",
                            chinese: "三点了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/nine.png" width="90">',
                        answer: "It's nine o'clock",
                        chinese: "九点了",
                        stepA: {
                            instruction: "看图片，说出完整句子：It's _____ o'clock.",
                            expected: "It's nine o'clock",
                            chinese: "九点了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：It's _____ o'clock.",
                            expected: "It's nine o'clock",
                            chinese: "九点了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/ten.png" width="90">',
                        answer: "It's ten o'clock",
                        chinese: "十点了",
                        stepA: {
                            instruction: "看图片，说出完整句子：It's _____ o'clock.",
                            expected: "It's ten o'clock",
                            chinese: "十点了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：It's _____ o'clock.",
                            expected: "It's ten o'clock",
                            chinese: "十点了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/time.png" width="90">',
                        answer: "What's the time",
                        chinese: "几点了",
                        stepA: {
                            instruction: "看图片，说出完整句子：What's the _____?",
                            expected: "What's the time",
                            chinese: "几点了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：What's the _____?",
                            expected: "What's the time",
                            chinese: "几点了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/clock.png" width="90">',
                        answer: "Good morning",
                        chinese: "早上好",
                        stepA: {
                            instruction: "早上好！说出来：Good _____.",
                            expected: "Good morning",
                            chinese: "早上好"
                        },
                        stepB: {
                            instruction: "你也说：Good _____.",
                            expected: "Good morning",
                            chinese: "早上好"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/clock_12.png" width="90">',
                        answer: "Is it twelve o'clock",
                        chinese: "是十二点吗",
                        stepA: {
                            instruction: "看图片，问一问：Is it _____ o'clock?",
                            expected: "Is it twelve o'clock",
                            chinese: "是十二点吗"
                        },
                        stepB: {
                            instruction: "你也问一问：Is it _____ o'clock?",
                            expected: "Is it twelve o'clock",
                            chinese: "是十二点吗"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/scenario_time.png" width="90">',
                        answer: "No it isn't",
                        chinese: "不是",
                        stepA: {
                            instruction: "回答问题：No, it _____.",
                            expected: "No it isn't",
                            chinese: "不是"
                        },
                        stepB: {
                            instruction: "你也说：No, it _____.",
                            expected: "No it isn't",
                            chinese: "不是"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/scenario_time.png" width="90">',
                        answer: "Yes it is",
                        chinese: "是的",
                        stepA: {
                            instruction: "回答问题：Yes, it _____.",
                            expected: "Yes it is",
                            chinese: "是的"
                        },
                        stepB: {
                            instruction: "你也说：Yes, it _____.",
                            expected: "Yes it is",
                            chinese: "是的"
                        }
                    }
                ]
            },

            // ── 站点3：合作对话（hard）— 完整示范句+中文，AB说不同的话 ──
            {
                id: 3, name: "合作对话", icon: "🗣️",
                difficulty: "hard",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A问时间，B回答，合作完成对话",
                questions: [
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问现在几点",
                        image: '<img src="assets/images/clock_11.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问时间",
                            role: "提问者",
                            line: "What's the time",
                            chinese: "几点了？"
                        },
                        stepB: {
                            instruction: "看示范句，回答时间",
                            role: "回答者",
                            line: "It's eleven o'clock",
                            chinese: "十一点了。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问现在几点",
                        image: '<img src="assets/images/clock_12.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问时间",
                            role: "提问者",
                            line: "What's the time",
                            chinese: "几点了？"
                        },
                        stepB: {
                            instruction: "看示范句，回答时间",
                            role: "回答者",
                            line: "It's twelve o'clock",
                            chinese: "十二点了。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问现在几点",
                        image: '<img src="assets/images/clock_3.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问时间",
                            role: "提问者",
                            line: "What's the time",
                            chinese: "几点了？"
                        },
                        stepB: {
                            instruction: "看示范句，回答时间",
                            role: "回答者",
                            line: "It's three o'clock",
                            chinese: "三点了。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "确认时间",
                        image: '<img src="assets/images/clock_12.png" width="90">',
                        stepA: {
                            instruction: "看示范句，确认时间",
                            role: "提问者",
                            line: "Is it twelve o'clock",
                            chinese: "是十二点吗？"
                        },
                        stepB: {
                            instruction: "看示范句，肯定回答",
                            role: "回答者",
                            line: "Yes it is",
                            chinese: "是的。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "确认时间",
                        image: '<img src="assets/images/clock_3.png" width="90">',
                        stepA: {
                            instruction: "看示范句，确认时间",
                            role: "提问者",
                            line: "Is it twelve o'clock",
                            chinese: "是十二点吗？"
                        },
                        stepB: {
                            instruction: "看示范句，否定回答",
                            role: "回答者",
                            line: "No it isn't",
                            chinese: "不是。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "早上问好再问时间",
                        image: '<img src="assets/images/clock.png" width="90">',
                        stepA: {
                            instruction: "看示范句，跟同学问好",
                            role: "问好者",
                            line: "Good morning",
                            chinese: "早上好。"
                        },
                        stepB: {
                            instruction: "看示范句，问好并问时间",
                            role: "回应者",
                            line: "Good morning What's the time",
                            chinese: "早上好，几点了？"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "玩Mr. Wolf游戏",
                        image: '<img src="assets/images/scenario_time.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问狼先生时间",
                            role: "学生",
                            line: "What's the time Mr Wolf",
                            chinese: "狼先生几点了？"
                        },
                        stepB: {
                            instruction: "看示范句，你是狼先生",
                            role: "狼先生",
                            line: "It's twelve o'clock",
                            chinese: "十二点了。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问现在几点",
                        image: '<img src="assets/images/nine.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问时间",
                            role: "提问者",
                            line: "What's the time",
                            chinese: "几点了？"
                        },
                        stepB: {
                            instruction: "看示范句，回答时间",
                            role: "回答者",
                            line: "It's nine o'clock",
                            chinese: "九点了。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "确认是不是十一点",
                        image: '<img src="assets/images/clock_11.png" width="90">',
                        stepA: {
                            instruction: "看示范句，确认时间",
                            role: "提问者",
                            line: "Is it eleven o'clock",
                            chinese: "是十一点吗？"
                        },
                        stepB: {
                            instruction: "看示范句，肯定回答",
                            role: "回答者",
                            line: "Yes it is",
                            chinese: "是的。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问现在几点",
                        image: '<img src="assets/images/ten.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问时间",
                            role: "提问者",
                            line: "What's the time",
                            chinese: "几点了？"
                        },
                        stepB: {
                            instruction: "看示范句，回答时间",
                            role: "回答者",
                            line: "It's ten o'clock",
                            chinese: "十点了。"
                        }
                    }
                ]
            }
        ]
    }
};

// 导出（兼容直接 script 引入）
if (typeof window !== 'undefined') {
    window.u3l1_coop = u3l1_coop;
}
