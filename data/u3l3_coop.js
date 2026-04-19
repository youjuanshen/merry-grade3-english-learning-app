/**
 * U3L3 合作冒险题库 — It's five twenty.
 * 主题：数字13-20+日常活动
 * 新词汇：thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty, cooking, homework, doing, drawing, reading
 * 句型：It's five twenty. / It's six thirty. / What are you doing? / I'm cooking/doing my homework/drawing/reading. / ___ is reading/drawing.
 *
 * 每道题拆成 stepA（蓝色）→ stepB（橙色），B依赖A的结果
 */

var u3l3_coop = {
    id: "U3L3",
    title: "It's five twenty.",
    theme: "numbers 13-20 and activities",

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
                        type: "coop_listen_relay", audio: "cooking", chinese: "做饭", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/cooking.png" width="70">', value: "cooking" },
                                { html: '<img src="assets/images/reading.png" width="70">', value: "reading" },
                                { html: '<img src="assets/images/drawing.png" width="70">', value: "drawing" },
                                { html: '<img src="assets/images/homework.png" width="70">', value: "homework" }
                            ],
                            correct: "cooking"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "cooking":  { options: ["做饭","读书","画画","做作业"], correct: "做饭" },
                                "reading":  { options: ["读书","做饭","画画","做作业"], correct: "读书" },
                                "drawing":  { options: ["画画","做饭","读书","做作业"], correct: "画画" },
                                "homework": { options: ["做作业","做饭","读书","画画"], correct: "做作业" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "reading", chinese: "读书", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/reading.png" width="70">', value: "reading" },
                                { html: '<img src="assets/images/cooking.png" width="70">', value: "cooking" },
                                { html: '<img src="assets/images/drawing.png" width="70">', value: "drawing" },
                                { html: '<img src="assets/images/homework.png" width="70">', value: "homework" }
                            ],
                            correct: "reading"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "reading":  { options: ["读书","做饭","画画","做作业"], correct: "读书" },
                                "cooking":  { options: ["做饭","读书","画画","做作业"], correct: "做饭" },
                                "drawing":  { options: ["画画","读书","做饭","做作业"], correct: "画画" },
                                "homework": { options: ["做作业","读书","做饭","画画"], correct: "做作业" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "drawing", chinese: "画画", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/drawing.png" width="70">', value: "drawing" },
                                { html: '<img src="assets/images/cooking.png" width="70">', value: "cooking" },
                                { html: '<img src="assets/images/reading.png" width="70">', value: "reading" },
                                { html: '<img src="assets/images/homework.png" width="70">', value: "homework" }
                            ],
                            correct: "drawing"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "drawing":  { options: ["画画","做饭","读书","做作业"], correct: "画画" },
                                "cooking":  { options: ["做饭","画画","读书","做作业"], correct: "做饭" },
                                "reading":  { options: ["读书","画画","做饭","做作业"], correct: "读书" },
                                "homework": { options: ["做作业","画画","做饭","读书"], correct: "做作业" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "doing my homework", chinese: "做作业", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/homework.png" width="70">', value: "homework" },
                                { html: '<img src="assets/images/cooking.png" width="70">', value: "cooking" },
                                { html: '<img src="assets/images/reading.png" width="70">', value: "reading" },
                                { html: '<img src="assets/images/drawing.png" width="70">', value: "drawing" }
                            ],
                            correct: "homework"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "homework": { options: ["做作业","做饭","读书","画画"], correct: "做作业" },
                                "cooking":  { options: ["做饭","做作业","读书","画画"], correct: "做饭" },
                                "reading":  { options: ["读书","做作业","做饭","画画"], correct: "读书" },
                                "drawing":  { options: ["画画","做作业","做饭","读书"], correct: "画画" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "five twenty", chinese: "五点二十", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/clock.png" width="70">', value: "clock" },
                                { html: '<img src="assets/images/cooking.png" width="70">', value: "cooking" },
                                { html: '<img src="assets/images/reading.png" width="70">', value: "reading" },
                                { html: '<img src="assets/images/time.png" width="70">', value: "time" }
                            ],
                            correct: "clock"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "clock":   { options: ["时钟","做饭","读书","时间"], correct: "时钟" },
                                "cooking": { options: ["做饭","时钟","读书","时间"], correct: "做饭" },
                                "reading": { options: ["读书","时钟","做饭","时间"], correct: "读书" },
                                "time":    { options: ["时间","时钟","做饭","读书"], correct: "时间" }
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
                        type: "coop_listen_judge", audio: "cooking", difficulty: "easy",
                        image: '<img src="assets/images/cooking.png" width="90">',
                        isMatch: true, chinese: "做饭",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" },
                                { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                { html: '<img src="assets/images/homework.png" width="60">', value: "homework" }
                            ],
                            correct: "cooking"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "reading", difficulty: "easy",
                        image: '<img src="assets/images/cooking.png" width="90">',
                        isMatch: false, chinese: "读书",
                        correctImage: '<img src="assets/images/reading.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" },
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                { html: '<img src="assets/images/homework.png" width="60">', value: "homework" }
                            ],
                            correct: "reading"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "drawing", difficulty: "medium",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        isMatch: true, chinese: "画画",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" },
                                { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                { html: '<img src="assets/images/homework.png" width="60">', value: "homework" }
                            ],
                            correct: "drawing"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "doing my homework", difficulty: "medium",
                        image: '<img src="assets/images/reading.png" width="90">',
                        isMatch: false, chinese: "做作业",
                        correctImage: '<img src="assets/images/homework.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" },
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                            ],
                            correct: "homework"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "cooking", difficulty: "medium",
                        image: '<img src="assets/images/homework.png" width="90">',
                        isMatch: false, chinese: "做饭",
                        correctImage: '<img src="assets/images/cooking.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" },
                                { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                            ],
                            correct: "cooking"
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
                        sequence: ["cooking", "reading", "drawing"],
                        words: [
                            { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" },
                            { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                            { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                        ],
                        chinese: "cooking → reading → drawing"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["drawing", "homework", "cooking"],
                        words: [
                            { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                            { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                            { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" }
                        ],
                        chinese: "drawing → homework → cooking"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["reading", "cooking", "drawing"],
                        words: [
                            { html: '<img src="assets/images/reading.png" width="55">', value: "reading" },
                            { html: '<img src="assets/images/cooking.png" width="55">', value: "cooking" },
                            { html: '<img src="assets/images/drawing.png" width="55">', value: "drawing" }
                        ],
                        chinese: "reading → cooking → drawing"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["homework", "reading", "cooking"],
                        words: [
                            { html: '<img src="assets/images/homework.png" width="55">', value: "homework" },
                            { html: '<img src="assets/images/reading.png" width="55">', value: "reading" },
                            { html: '<img src="assets/images/cooking.png" width="55">', value: "cooking" }
                        ],
                        chinese: "homework → reading → cooking"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["cooking", "drawing", "homework", "reading"],
                        words: [
                            { html: '<img src="assets/images/cooking.png" width="50">', value: "cooking" },
                            { html: '<img src="assets/images/drawing.png" width="50">', value: "drawing" },
                            { html: '<img src="assets/images/homework.png" width="50">', value: "homework" },
                            { html: '<img src="assets/images/reading.png" width="50">', value: "reading" }
                        ],
                        chinese: "cooking → drawing → homework → reading"
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
                        scenario: "杨明打电话问妈妈在做什么",
                        audio: "What are you doing? I'm cooking.",
                        stepA: {
                            instruction: "听音频，妈妈在做什么？",
                            question: "妈妈在做什么？",
                            options: ["做饭", "读书", "画画", "做作业"],
                            correct: "做饭"
                        },
                        stepB: {
                            instruction: "根据听到的活动，选正确的图片",
                            question: "哪张图是对的？",
                            optionsMap: {
                                "做饭": { options: [
                                    { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" },
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" }
                                ], correct: "cooking" },
                                "读书": { options: [
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                    { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" }
                                ], correct: "reading" },
                                "画画": { options: [
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                    { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" }
                                ], correct: "drawing" },
                                "做作业": { options: [
                                    { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                    { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" }
                                ], correct: "homework" }
                            }
                        },
                        chinese: "妈妈在做饭"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "问杨帆在做什么",
                        audio: "What are you doing, Yang Fan? I'm drawing.",
                        stepA: {
                            instruction: "听音频，杨帆在做什么？",
                            question: "杨帆在做什么？",
                            options: ["画画", "读书", "做饭", "做作业"],
                            correct: "画画"
                        },
                        stepB: {
                            instruction: "杨帆在画画，选正确的图片",
                            question: "哪张图是对的？",
                            optionsMap: {
                                "画画": { options: [
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" }
                                ], correct: "drawing" },
                                "读书": { options: [
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                                ], correct: "reading" },
                                "做饭": { options: [
                                    { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" },
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                                ], correct: "cooking" },
                                "做作业": { options: [
                                    { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                                ], correct: "homework" }
                            }
                        },
                        chinese: "杨帆在画画"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "问现在几点并问在做什么",
                        audio: "It's six thirty. What are you doing? I'm doing my homework.",
                        stepA: {
                            instruction: "听音频，现在几点？",
                            question: "现在几点？",
                            options: ["六点三十", "五点二十", "六点整", "五点整"],
                            correct: "六点三十"
                        },
                        stepB: {
                            instruction: "A听到音频说他在做作业，选正确的活动",
                            question: "他在做什么？",
                            optionsMap: {
                                "六点三十": { options: ["做作业", "做饭", "画画", "读书"], correct: "做作业" },
                                "五点二十": { options: ["做作业", "做饭", "画画", "读书"], correct: "做作业" },
                                "六点整":   { options: ["做作业", "做饭", "画画", "读书"], correct: "做作业" },
                                "五点整":   { options: ["做作业", "做饭", "画画", "读书"], correct: "做作业" }
                            }
                        },
                        chinese: "六点三十在做作业"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "杨帆是在读书吗？",
                        audio: "Is Yang Fan reading? No. Yang Fan is drawing.",
                        stepA: {
                            instruction: "听音频，杨帆在读书吗？",
                            question: "杨帆在读书吗？",
                            options: ["不是", "是的", "在做饭", "在做作业"],
                            correct: "不是"
                        },
                        stepB: {
                            instruction: "A听到音频说杨帆在画画，选正确的活动",
                            question: "杨帆在做什么？",
                            optionsMap: {
                                "不是":   { options: ["画画", "读书", "做饭", "做作业"], correct: "画画" },
                                "是的":   { options: ["读书", "画画", "做饭", "做作业"], correct: "读书" },
                                "在做饭": { options: ["做饭", "画画", "读书", "做作业"], correct: "做饭" },
                                "在做作业": { options: ["做作业", "画画", "读书", "做饭"], correct: "做作业" }
                            }
                        },
                        chinese: "杨帆在画画"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "It's five twenty",
                        audio: "It's five twenty. What are you doing? I'm reading.",
                        stepA: {
                            instruction: "听音频，现在几点？",
                            question: "现在几点？",
                            options: ["五点二十", "六点三十", "五点整", "六点整"],
                            correct: "五点二十"
                        },
                        stepB: {
                            instruction: "A听到音频说他在读书，选正确的活动",
                            question: "他在做什么？",
                            optionsMap: {
                                "五点二十": { options: ["读书", "做饭", "画画", "做作业"], correct: "读书" },
                                "六点三十": { options: ["读书", "做饭", "画画", "做作业"], correct: "读书" },
                                "五点整":   { options: ["读书", "做饭", "画画", "做作业"], correct: "读书" },
                                "六点整":   { options: ["读书", "做饭", "画画", "做作业"], correct: "读书" }
                            }
                        },
                        chinese: "五点二十在读书"
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
                        image: '<img src="assets/images/cooking.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["cooking", "reading", "drawing", "homework"],
                            correct: "cooking"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "cooking":  { options: ["做饭","读书","画画","作业"], correct: "做饭" },
                                "reading":  { options: ["读书","做饭","画画","作业"], correct: "读书" },
                                "drawing":  { options: ["画画","做饭","读书","作业"], correct: "画画" },
                                "homework": { options: ["作业","做饭","读书","画画"], correct: "作业" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/reading.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["reading", "cooking", "drawing", "homework"],
                            correct: "reading"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "reading":  { options: ["读书","做饭","画画","作业"], correct: "读书" },
                                "cooking":  { options: ["做饭","读书","画画","作业"], correct: "做饭" },
                                "drawing":  { options: ["画画","读书","做饭","作业"], correct: "画画" },
                                "homework": { options: ["作业","读书","做饭","画画"], correct: "作业" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["drawing", "cooking", "reading", "homework"],
                            correct: "drawing"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "drawing":  { options: ["画画","做饭","读书","作业"], correct: "画画" },
                                "cooking":  { options: ["做饭","画画","读书","作业"], correct: "做饭" },
                                "reading":  { options: ["读书","画画","做饭","作业"], correct: "读书" },
                                "homework": { options: ["作业","画画","做饭","读书"], correct: "作业" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/homework.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["homework", "cooking", "reading", "drawing"],
                            correct: "homework"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "homework": { options: ["作业","做饭","读书","画画"], correct: "作业" },
                                "cooking":  { options: ["做饭","作业","读书","画画"], correct: "做饭" },
                                "reading":  { options: ["读书","作业","做饭","画画"], correct: "读书" },
                                "drawing":  { options: ["画画","作业","做饭","读书"], correct: "画画" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/clock.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["clock", "time", "cooking", "reading"],
                            correct: "clock"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "clock":   { options: ["时钟","时间","做饭","读书"], correct: "时钟" },
                                "time":    { options: ["时间","时钟","做饭","读书"], correct: "时间" },
                                "cooking": { options: ["做饭","时钟","时间","读书"], correct: "做饭" },
                                "reading": { options: ["读书","时钟","时间","做饭"], correct: "读书" }
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
                            { word: "cooking", match: '<img src="assets/images/cooking.png" width="50">', chinese: "做饭" },
                            { word: "reading", match: '<img src="assets/images/reading.png" width="50">', chinese: "读书" },
                            { word: "drawing", match: '<img src="assets/images/drawing.png" width="50">', chinese: "画画" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "homework", match: '<img src="assets/images/homework.png" width="50">', chinese: "作业" },
                            { word: "clock", match: '<img src="assets/images/clock.png" width="50">', chinese: "时钟" },
                            { word: "time", match: '<img src="assets/images/time.png" width="50">', chinese: "时间" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "cooking", match: '<img src="assets/images/cooking.png" width="50">', chinese: "做饭" },
                            { word: "drawing", match: '<img src="assets/images/drawing.png" width="50">', chinese: "画画" },
                            { word: "homework", match: '<img src="assets/images/homework.png" width="50">', chinese: "作业" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "reading", match: '<img src="assets/images/reading.png" width="50">', chinese: "读书" },
                            { word: "cooking", match: '<img src="assets/images/cooking.png" width="50">', chinese: "做饭" },
                            { word: "clock", match: '<img src="assets/images/clock.png" width="50">', chinese: "时钟" },
                            { word: "drawing", match: '<img src="assets/images/drawing.png" width="50">', chinese: "画画" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "homework", match: '<img src="assets/images/homework.png" width="50">', chinese: "作业" },
                            { word: "time", match: '<img src="assets/images/time.png" width="50">', chinese: "时间" },
                            { word: "reading", match: '<img src="assets/images/reading.png" width="50">', chinese: "读书" },
                            { word: "drawing", match: '<img src="assets/images/drawing.png" width="50">', chinese: "画画" }
                        ]
                    }
                ]
            },

            // ── 站点3：句意接力（medium）──
            {
                id: 3, name: "句意接力", icon: "📝",
                difficulty: "medium",
                theoryTags: ["CLT", "SLA"],
                description: "A看图选句子，B选中文意思",
                questions: [
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/cooking.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "I'm cooking.", value: "I'm cooking." },
                                { html: "I'm reading.", value: "I'm reading." },
                                { html: "I'm drawing.", value: "I'm drawing." },
                                { html: "I'm doing my homework.", value: "I'm doing my homework." }
                            ],
                            correct: "I'm cooking."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "I'm cooking.":           { options: ["我在做饭。","我在读书。","我在画画。","我在做作业。"], correct: "我在做饭。" },
                                "I'm reading.":           { options: ["我在读书。","我在做饭。","我在画画。","我在做作业。"], correct: "我在读书。" },
                                "I'm drawing.":           { options: ["我在画画。","我在做饭。","我在读书。","我在做作业。"], correct: "我在画画。" },
                                "I'm doing my homework.": { options: ["我在做作业。","我在做饭。","我在读书。","我在画画。"], correct: "我在做作业。" }
                            }
                        },
                        chinese: "我在做饭"
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/reading.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "Yang Fan is reading.", value: "Yang Fan is reading." },
                                { html: "Yang Fan is cooking.", value: "Yang Fan is cooking." },
                                { html: "Yang Fan is drawing.", value: "Yang Fan is drawing." },
                                { html: "What are you doing?", value: "What are you doing?" }
                            ],
                            correct: "Yang Fan is reading."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Yang Fan is reading.": { options: ["杨帆在读书。","杨帆在做饭。","杨帆在画画。","你在做什么？"], correct: "杨帆在读书。" },
                                "Yang Fan is cooking.": { options: ["杨帆在做饭。","杨帆在读书。","杨帆在画画。","你在做什么？"], correct: "杨帆在做饭。" },
                                "Yang Fan is drawing.": { options: ["杨帆在画画。","杨帆在读书。","杨帆在做饭。","你在做什么？"], correct: "杨帆在画画。" },
                                "What are you doing?":  { options: ["你在做什么？","杨帆在读书。","杨帆在做饭。","杨帆在画画。"], correct: "你在做什么？" }
                            }
                        },
                        chinese: "杨帆在读书"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/clock.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "What are you doing?", value: "What are you doing?" },
                                { html: "What's the time?", value: "What's the time?" },
                                { html: "I'm cooking.", value: "I'm cooking." },
                                { html: "It's five twenty.", value: "It's five twenty." }
                            ],
                            correct: "What are you doing?"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "What are you doing?": { options: ["你在做什么？","几点了？","我在做饭。","五点二十。"], correct: "你在做什么？" },
                                "What's the time?":    { options: ["几点了？","你在做什么？","我在做饭。","五点二十。"], correct: "几点了？" },
                                "I'm cooking.":        { options: ["我在做饭。","你在做什么？","几点了？","五点二十。"], correct: "我在做饭。" },
                                "It's five twenty.":   { options: ["五点二十。","你在做什么？","几点了？","我在做饭。"], correct: "五点二十。" }
                            }
                        },
                        chinese: "你在做什么？"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/homework.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "I'm doing my homework.", value: "I'm doing my homework." },
                                { html: "I'm drawing.", value: "I'm drawing." },
                                { html: "I'm cooking.", value: "I'm cooking." },
                                { html: "I'm reading.", value: "I'm reading." }
                            ],
                            correct: "I'm doing my homework."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "I'm doing my homework.": { options: ["我在做作业。","我在画画。","我在做饭。","我在读书。"], correct: "我在做作业。" },
                                "I'm drawing.":           { options: ["我在画画。","我在做作业。","我在做饭。","我在读书。"], correct: "我在画画。" },
                                "I'm cooking.":           { options: ["我在做饭。","我在做作业。","我在画画。","我在读书。"], correct: "我在做饭。" },
                                "I'm reading.":           { options: ["我在读书。","我在做作业。","我在画画。","我在做饭。"], correct: "我在读书。" }
                            }
                        },
                        chinese: "我在做作业"
                    },
                    {
                        type: "coop_word_relay", difficulty: "hard",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "No. I'm drawing.", value: "No. I'm drawing." },
                                { html: "Yes. I'm reading.", value: "Yes. I'm reading." },
                                { html: "I'm cooking.", value: "I'm cooking." },
                                { html: "I'm doing my homework.", value: "I'm doing my homework." }
                            ],
                            correct: "No. I'm drawing."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "No. I'm drawing.":       { options: ["不，我在画画。","是的，我在读书。","我在做饭。","我在做作业。"], correct: "不，我在画画。" },
                                "Yes. I'm reading.":      { options: ["是的，我在读书。","不，我在画画。","我在做饭。","我在做作业。"], correct: "是的，我在读书。" },
                                "I'm cooking.":           { options: ["我在做饭。","不，我在画画。","是的，我在读书。","我在做作业。"], correct: "我在做饭。" },
                                "I'm doing my homework.": { options: ["我在做作业。","不，我在画画。","是的，我在读书。","我在做饭。"], correct: "我在做作业。" }
                            }
                        },
                        chinese: "不，我在画画"
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
                        scenario: "妈妈在做什么",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "What are you doing? I'm cooking.",
                            question: "妈妈在做什么？",
                            options: ["做饭", "读书", "画画", "做作业"],
                            correct: "做饭"
                        },
                        stepB: {
                            instruction: "根据A的选择，选正确的图片",
                            optionsMap: {
                                "做饭": { options: [
                                    { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" },
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                    { html: '<img src="assets/images/homework.png" width="60">', value: "homework" }
                                ], correct: "cooking" },
                                "读书": { options: [
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                    { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" },
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                    { html: '<img src="assets/images/homework.png" width="60">', value: "homework" }
                                ], correct: "reading" },
                                "画画": { options: [
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                    { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" },
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                    { html: '<img src="assets/images/homework.png" width="60">', value: "homework" }
                                ], correct: "drawing" },
                                "做作业": { options: [
                                    { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                    { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" },
                                    { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                                ], correct: "homework" }
                            }
                        },
                        chinese: "妈妈做饭→选图"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "杨帆在画画吗",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Is Yang Fan reading? No. Yang Fan is drawing.",
                            question: "杨帆在读书吗？",
                            options: ["不是", "是的", "在做饭", "在做作业"],
                            correct: "不是"
                        },
                        stepB: {
                            instruction: "那杨帆在做什么？",
                            optionsMap: {
                                "不是":   { options: ["drawing", "reading", "cooking", "homework"], correct: "drawing" },
                                "是的":   { options: ["reading", "drawing", "cooking", "homework"], correct: "reading" },
                                "在做饭": { options: ["cooking", "drawing", "reading", "homework"], correct: "cooking" },
                                "在做作业": { options: ["homework", "drawing", "reading", "cooking"], correct: "homework" }
                            }
                        },
                        chinese: "杨帆在画画"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "现在几点在做什么",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "It's five twenty. What are you doing? I'm reading.",
                            question: "现在几点？",
                            options: ["五点二十", "六点三十", "五点整", "六点整"],
                            correct: "五点二十"
                        },
                        stepB: {
                            instruction: "他在做什么？",
                            optionsMap: {
                                "五点二十": { options: ["reading", "cooking", "drawing", "homework"], correct: "reading" },
                                "六点三十": { options: ["reading", "cooking", "drawing", "homework"], correct: "reading" },
                                "五点整":   { options: ["reading", "cooking", "drawing", "homework"], correct: "reading" },
                                "六点整":   { options: ["reading", "cooking", "drawing", "homework"], correct: "reading" }
                            }
                        },
                        chinese: "五点二十在读书"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "六点三十在做什么",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "It's six thirty. Are you having dinner, Yang Fan? No. I'm drawing.",
                            question: "杨帆在做什么？",
                            options: ["画画", "吃饭", "读书", "做作业"],
                            correct: "画画"
                        },
                        stepB: {
                            instruction: "选正确的图片",
                            optionsMap: {
                                "画画":   { options: ["No. I'm drawing.", "Yes. I'm having dinner.", "I'm reading.", "I'm cooking."], correct: "No. I'm drawing." },
                                "吃饭":   { options: ["Yes. I'm having dinner.", "No. I'm drawing.", "I'm reading.", "I'm cooking."], correct: "Yes. I'm having dinner." },
                                "读书":   { options: ["I'm reading.", "No. I'm drawing.", "Yes. I'm having dinner.", "I'm cooking."], correct: "I'm reading." },
                                "做作业": { options: ["I'm doing my homework.", "No. I'm drawing.", "Yes. I'm having dinner.", "I'm reading."], correct: "I'm doing my homework." }
                            }
                        },
                        chinese: "杨帆在画画"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "数字13到20",
                        stepA: {
                            instruction: "读一读，十三加七等于多少？",
                            text: "Thirteen and seven is twenty. Fourteen and six is twenty.",
                            question: "thirteen + seven = ?",
                            options: ["twenty", "thirteen", "fourteen", "fifteen"],
                            correct: "twenty"
                        },
                        stepB: {
                            instruction: "twenty是多少？",
                            optionsMap: {
                                "twenty":    { options: ["二十", "十三", "十四", "十五"], correct: "二十" },
                                "thirteen":  { options: ["十三", "二十", "十四", "十五"], correct: "十三" },
                                "fourteen":  { options: ["十四", "二十", "十三", "十五"], correct: "十四" },
                                "fifteen":   { options: ["十五", "二十", "十三", "十四"], correct: "十五" }
                            }
                        },
                        chinese: "twenty=二十"
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
                        sentence: "What are you doing?",
                        stepA: { words: ["What", "are"], instruction: "选前半句的词" },
                        stepB: { words: ["you", "doing?"], instruction: "选后半句的词" },
                        chinese: "你在做什么？"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "I'm cooking.",
                        stepA: { words: ["I'm"], instruction: "选前半句的词" },
                        stepB: { words: ["cooking."], instruction: "选后半句的词" },
                        chinese: "我在做饭。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "I'm reading.",
                        stepA: { words: ["I'm"], instruction: "选前半句的词" },
                        stepB: { words: ["reading."], instruction: "选后半句的词" },
                        chinese: "我在读书。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "I'm doing my homework.",
                        stepA: { words: ["I'm", "doing"], instruction: "选前半句的词" },
                        stepB: { words: ["my", "homework."], instruction: "选后半句的词" },
                        chinese: "我在做作业。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "Yang Fan is drawing.",
                        stepA: { words: ["Yang", "Fan"], instruction: "选前半句的词" },
                        stepB: { words: ["is", "drawing."], instruction: "选后半句的词" },
                        chinese: "杨帆在画画。"
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
                        template: "What ___ you doing? I'm ___.",
                        image: '<img src="assets/images/cooking.png" width="70">',
                        stepA: { blank: 1, options: ["are", "is", "am", "do"], correct: "are", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["cooking", "reading", "drawing", "homework"], correct: "cooking", instruction: "填第2个空" },
                        chinese: "What are you doing? I'm cooking."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "It's ___ twenty. I'm ___.",
                        image: '<img src="assets/images/reading.png" width="70">',
                        stepA: { blank: 1, options: ["five", "six", "seven", "eight"], correct: "five", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["reading", "cooking", "drawing", "sleeping"], correct: "reading", instruction: "填第2个空" },
                        chinese: "It's five twenty. I'm reading."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "Yang Fan ___ ___.",
                        image: '<img src="assets/images/drawing.png" width="70">',
                        stepA: { blank: 1, options: ["is", "are", "am", "do"], correct: "is", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["drawing", "cooking", "reading", "sleeping"], correct: "drawing", instruction: "填第2个空" },
                        chinese: "Yang Fan is drawing."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "I'm doing my ___. It's ___ thirty.",
                        image: '<img src="assets/images/homework.png" width="70">',
                        stepA: { blank: 1, options: ["homework", "reading", "drawing", "cooking"], correct: "homework", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["six", "five", "seven", "eight"], correct: "six", instruction: "填第2个空" },
                        chinese: "I'm doing my homework. It's six thirty."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "___ are you doing? I'm ___ my homework.",
                        image: '<img src="assets/images/clock.png" width="70">',
                        stepA: { blank: 1, options: ["What", "Who", "Where", "When"], correct: "What", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["doing", "reading", "drawing", "cooking"], correct: "doing", instruction: "填第2个空" },
                        chinese: "What are you doing? I'm doing my homework."
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
                        word: "cooking",
                        image: '<img src="assets/images/cooking.png" width="60">',
                        stepA: { letters: ["c", "o", "o"], distractors: ["a", "u"], instruction: "拼前半：c______" },
                        stepB: { letters: ["k", "i", "n", "g"], distractors: ["e", "t"], instruction: "拼后半：___king" },
                        chinese: "做饭"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "reading",
                        image: '<img src="assets/images/reading.png" width="60">',
                        stepA: { letters: ["r", "e", "a"], distractors: ["o", "i"], instruction: "拼前半：r______" },
                        stepB: { letters: ["d", "i", "n", "g"], distractors: ["t", "s"], instruction: "拼后半：___ding" },
                        chinese: "读书"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "drawing",
                        image: '<img src="assets/images/drawing.png" width="60">',
                        stepA: { letters: ["d", "r", "a"], distractors: ["o", "e"], instruction: "拼前半：d______" },
                        stepB: { letters: ["w", "i", "n", "g"], distractors: ["t", "s"], instruction: "拼后半：___wing" },
                        chinese: "画画"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "homework",
                        image: '<img src="assets/images/homework.png" width="60">',
                        stepA: { letters: ["h", "o", "m", "e"], distractors: ["a", "u"], instruction: "拼前半：h_______" },
                        stepB: { letters: ["w", "o", "r", "k"], distractors: ["n", "t"], instruction: "拼后半：___work" },
                        chinese: "作业"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "twenty",
                        image: '<img src="assets/images/clock.png" width="60">',
                        stepA: { letters: ["t", "w", "e"], distractors: ["a", "o"], instruction: "拼前半：t_____" },
                        stepB: { letters: ["n", "t", "y"], distractors: ["r", "s"], instruction: "拼后半：___nty" },
                        chinese: "二十"
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
                            options: ["What are you doing?", "I'm cooking.", "It's five twenty.", "Yang Fan is reading."]
                        },
                        stepB: {
                            instruction: "回答A的问题",
                            optionsMap: {
                                "What are you doing?":    { options: ["I'm cooking.", "What are you doing?", "It's five twenty.", "Yang Fan is reading."], correct: "I'm cooking." },
                                "I'm cooking.":           { options: ["Are you cooking?", "I'm cooking.", "It's five twenty.", "Yang Fan is reading."], correct: "Are you cooking?" },
                                "It's five twenty.":      { options: ["What are you doing?", "I'm cooking.", "Are you cooking?", "Yang Fan is reading."], correct: "What are you doing?" },
                                "Yang Fan is reading.":   { options: ["Yes. Yang Fan is reading.", "I'm cooking.", "What are you doing?", "It's five twenty."], correct: "Yes. Yang Fan is reading." }
                            }
                        },
                        chinese: "问在做什么并回答"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "告诉同学时间（A说时间后，B好奇在做什么）",
                        stepA: {
                            instruction: "告诉同学现在几点",
                            options: ["It's five twenty.", "What are you doing?", "I'm reading.", "Yang Fan is drawing."]
                        },
                        stepB: {
                            instruction: "A告诉你时间，你好奇他在做什么，选合适的回应",
                            optionsMap: {
                                "It's five twenty.":    { options: ["What are you doing?", "It's five twenty.", "I'm reading.", "Yang Fan is drawing."], correct: "What are you doing?" },
                                "What are you doing?":  { options: ["I'm reading.", "It's five twenty.", "What are you doing?", "Yang Fan is drawing."], correct: "I'm reading." },
                                "I'm reading.":         { options: ["Yang Fan is drawing.", "It's five twenty.", "What are you doing?", "I'm reading."], correct: "Yang Fan is drawing." },
                                "Yang Fan is drawing.": { options: ["Yes. Yang Fan is drawing.", "It's five twenty.", "What are you doing?", "I'm reading."], correct: "Yes. Yang Fan is drawing." }
                            }
                        },
                        chinese: "说时间问活动"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "描述杨帆在做什么",
                        stepA: {
                            instruction: "选图片",
                            options: [
                                { html: '<img src="assets/images/reading.png" width="60">', value: "reading" },
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                { html: '<img src="assets/images/cooking.png" width="60">', value: "cooking" },
                                { html: '<img src="assets/images/homework.png" width="60">', value: "homework" }
                            ]
                        },
                        stepB: {
                            instruction: "根据A选的图，说出句子",
                            optionsMap: {
                                "reading":  { options: ["Yang Fan is reading.", "Yang Fan is drawing.", "Yang Fan is cooking.", "I'm doing my homework."], correct: "Yang Fan is reading." },
                                "drawing":  { options: ["Yang Fan is drawing.", "Yang Fan is reading.", "Yang Fan is cooking.", "I'm doing my homework."], correct: "Yang Fan is drawing." },
                                "cooking":  { options: ["Yang Fan is cooking.", "Yang Fan is reading.", "Yang Fan is drawing.", "I'm doing my homework."], correct: "Yang Fan is cooking." },
                                "homework": { options: ["I'm doing my homework.", "Yang Fan is reading.", "Yang Fan is drawing.", "Yang Fan is cooking."], correct: "I'm doing my homework." }
                            }
                        },
                        chinese: "描述杨帆的活动"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "六点三十在做什么（日程提示：五点二十读书，六点三十做作业）",
                        stepA: {
                            instruction: "选正确的时间句",
                            options: ["It's six thirty.", "It's five twenty.", "What are you doing?", "I'm cooking."]
                        },
                        stepB: {
                            instruction: "根据A的时间，回答在做什么（提示：五点二十→读书，六点三十→做作业）",
                            optionsMap: {
                                "It's six thirty.":    { options: ["I'm doing my homework.", "I'm cooking.", "I'm drawing.", "I'm reading."], correct: "I'm doing my homework." },
                                "It's five twenty.":   { options: ["I'm reading.", "I'm cooking.", "I'm drawing.", "I'm doing my homework."], correct: "I'm reading." },
                                "What are you doing?": { options: ["I'm cooking.", "It's six thirty.", "It's five twenty.", "Yang Fan is drawing."], correct: "I'm cooking." },
                                "I'm cooking.":        { options: ["Are you cooking?", "It's six thirty.", "It's five twenty.", "Yang Fan is drawing."], correct: "Are you cooking?" }
                            }
                        },
                        chinese: "六点三十做作业"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "数一数13到20",
                        stepA: {
                            instruction: "选数字顺序的开头",
                            options: ["thirteen", "fourteen", "fifteen", "sixteen"]
                        },
                        stepB: {
                            instruction: "选下一个数字",
                            optionsMap: {
                                "thirteen": { options: ["fourteen", "twelve", "fifteen", "twenty"], correct: "fourteen" },
                                "fourteen": { options: ["fifteen", "thirteen", "sixteen", "twenty"], correct: "fifteen" },
                                "fifteen":  { options: ["sixteen", "fourteen", "seventeen", "twenty"], correct: "sixteen" },
                                "sixteen":  { options: ["seventeen", "fifteen", "eighteen", "twenty"], correct: "seventeen" }
                            }
                        },
                        chinese: "数字13到20"
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
                        type: "coop_read_relay", word: "cooking", chinese: "做饭", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "reading", chinese: "读书", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "drawing", chinese: "画画", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "homework", chinese: "作业", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "twenty", chinese: "二十", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "What are you doing", chinese: "你在做什么？", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "I'm cooking", chinese: "我在做饭。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "I'm doing my homework", chinese: "我在做作业。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "It's five twenty", chinese: "五点二十。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "Yang Fan is drawing", chinese: "杨帆在画画。", difficulty: "medium",
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
                        image: '<img src="assets/images/cooking.png" width="90">',
                        answer: "I'm cooking",
                        chinese: "我在做饭",
                        stepA: {
                            instruction: "看图片，说出完整句子：I'm _____.",
                            expected: "I'm cooking",
                            chinese: "我在做饭"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I'm _____.",
                            expected: "I'm cooking",
                            chinese: "我在做饭"
                        }
                    },
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
                        image: '<img src="assets/images/drawing.png" width="90">',
                        answer: "I'm drawing",
                        chinese: "我在画画",
                        stepA: {
                            instruction: "看图片，说出完整句子：I'm _____.",
                            expected: "I'm drawing",
                            chinese: "我在画画"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I'm _____.",
                            expected: "I'm drawing",
                            chinese: "我在画画"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/homework.png" width="90">',
                        answer: "I'm doing my homework",
                        chinese: "我在做作业",
                        stepA: {
                            instruction: "看图片，说出完整句子：I'm doing my _____.",
                            expected: "I'm doing my homework",
                            chinese: "我在做作业"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I'm doing my _____.",
                            expected: "I'm doing my homework",
                            chinese: "我在做作业"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/clock.png" width="90">',
                        answer: "What are you doing",
                        chinese: "你在做什么",
                        stepA: {
                            instruction: "看图片，问一问：What are you _____?",
                            expected: "What are you doing",
                            chinese: "你在做什么"
                        },
                        stepB: {
                            instruction: "你也问一问：What are you _____?",
                            expected: "What are you doing",
                            chinese: "你在做什么"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/time.png" width="90">',
                        answer: "It's five twenty",
                        chinese: "五点二十",
                        stepA: {
                            instruction: "看图片，说出时间：It's five _____.",
                            expected: "It's five twenty",
                            chinese: "五点二十"
                        },
                        stepB: {
                            instruction: "你也说：It's five _____.",
                            expected: "It's five twenty",
                            chinese: "五点二十"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/reading.png" width="90">',
                        answer: "Yang Fan is reading",
                        chinese: "杨帆在读书",
                        stepA: {
                            instruction: "描述杨帆：Yang Fan is _____.",
                            expected: "Yang Fan is reading",
                            chinese: "杨帆在读书"
                        },
                        stepB: {
                            instruction: "你也说：Yang Fan is _____.",
                            expected: "Yang Fan is reading",
                            chinese: "杨帆在读书"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        answer: "Yang Fan is drawing",
                        chinese: "杨帆在画画",
                        stepA: {
                            instruction: "描述杨帆：Yang Fan is _____.",
                            expected: "Yang Fan is drawing",
                            chinese: "杨帆在画画"
                        },
                        stepB: {
                            instruction: "你也说：Yang Fan is _____.",
                            expected: "Yang Fan is drawing",
                            chinese: "杨帆在画画"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/clock.png" width="90">',
                        answer: "It's six thirty",
                        chinese: "六点三十",
                        stepA: {
                            instruction: "看图片，说出时间：It's six _____.",
                            expected: "It's six thirty",
                            chinese: "六点三十"
                        },
                        stepB: {
                            instruction: "你也说：It's six _____.",
                            expected: "It's six thirty",
                            chinese: "六点三十"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/cooking.png" width="90">',
                        answer: "I'm cooking",
                        chinese: "我在做饭",
                        stepA: {
                            instruction: "回答问题：I'm _____.",
                            expected: "I'm cooking",
                            chinese: "我在做饭"
                        },
                        stepB: {
                            instruction: "你也回答：I'm _____.",
                            expected: "I'm cooking",
                            chinese: "我在做饭"
                        }
                    }
                ]
            },

            // ── 站点3：合作对话（hard）— 完整示范句+中文，AB说不同的话 ──
            {
                id: 3, name: "合作对话", icon: "🗣️",
                difficulty: "hard",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A问在做什么，B回答，合作完成对话",
                questions: [
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问妈妈在做什么",
                        image: '<img src="assets/images/cooking.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问在做什么",
                            role: "提问者",
                            line: "What are you doing",
                            chinese: "你在做什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答在做饭",
                            role: "回答者",
                            line: "I'm cooking",
                            chinese: "我在做饭。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问杨帆在做什么",
                        image: '<img src="assets/images/reading.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问在做什么",
                            role: "提问者",
                            line: "What are you doing",
                            chinese: "你在做什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答在读书",
                            role: "回答者",
                            line: "I'm reading",
                            chinese: "我在读书。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问在做什么",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问在做什么",
                            role: "提问者",
                            line: "What are you doing",
                            chinese: "你在做什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答在画画",
                            role: "回答者",
                            line: "I'm drawing",
                            chinese: "我在画画。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "告诉时间再问活动",
                        image: '<img src="assets/images/clock.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说出时间",
                            role: "报时者",
                            line: "It's five twenty",
                            chinese: "五点二十。"
                        },
                        stepB: {
                            instruction: "看示范句，问在做什么",
                            role: "提问者",
                            line: "What are you doing",
                            chinese: "你在做什么？"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "做作业对话",
                        image: '<img src="assets/images/homework.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问在做什么",
                            role: "提问者",
                            line: "What are you doing",
                            chinese: "你在做什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答在做作业",
                            role: "回答者",
                            line: "I'm doing my homework",
                            chinese: "我在做作业。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "杨帆在画画",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问杨帆在做什么",
                            role: "提问者",
                            line: "What is Yang Fan doing",
                            chinese: "杨帆在做什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答杨帆在画画",
                            role: "回答者",
                            line: "Yang Fan is drawing",
                            chinese: "杨帆在画画。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "六点三十做作业",
                        image: '<img src="assets/images/homework.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说出时间",
                            role: "报时者",
                            line: "It's six thirty",
                            chinese: "六点三十。"
                        },
                        stepB: {
                            instruction: "看示范句，说在做作业",
                            role: "回答者",
                            line: "I'm doing my homework",
                            chinese: "我在做作业。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "杨帆在读书",
                        image: '<img src="assets/images/reading.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问杨帆在做什么",
                            role: "提问者",
                            line: "What is Yang Fan doing",
                            chinese: "杨帆在做什么？"
                        },
                        stepB: {
                            instruction: "看示范句，回答杨帆在读书",
                            role: "回答者",
                            line: "Yang Fan is reading",
                            chinese: "杨帆在读书。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "不，我在画画",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问是不是在读书",
                            role: "提问者",
                            line: "Are you reading",
                            chinese: "你在读书吗？"
                        },
                        stepB: {
                            instruction: "看示范句，否定并说画画",
                            role: "回答者",
                            line: "No I'm drawing",
                            chinese: "不，我在画画。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "五点二十在做饭",
                        image: '<img src="assets/images/cooking.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说出时间",
                            role: "报时者",
                            line: "It's five twenty",
                            chinese: "五点二十。"
                        },
                        stepB: {
                            instruction: "看示范句，说在做饭",
                            role: "回答者",
                            line: "I'm cooking",
                            chinese: "我在做饭。"
                        }
                    }
                ]
            }
        ]
    }
};

// 导出（兼容直接 script 引入）
if (typeof window !== 'undefined') {
    window.u3l3_coop = u3l3_coop;
}
