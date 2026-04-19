/**
 * U3L4 合作冒险题库 — It's time to do my homework.
 * 主题：日常作息
 * 新词汇：get up, go to school, go to bed, picture, tick tock, play
 * 句型：It's time to ___. (do my homework / draw a picture / play / go to bed / get up / go to school)
 *       It's 7:00 p.m. It's time to ___.
 *
 * 每道题拆成 stepA（蓝色）→ stepB（橙色），B依赖A的结果
 */

var u3l4_coop = {
    id: "U3L4",
    title: "It's time to do my homework.",
    theme: "daily schedule",

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
                        type: "coop_listen_relay", audio: "get up", chinese: "起床", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/clock.png" width="70">', value: "get up" },
                                { html: '<img src="assets/images/bed.png" width="70">', value: "go to bed" },
                                { html: '<img src="assets/images/homework.png" width="70">', value: "homework" },
                                { html: '<img src="assets/images/play.png" width="70">', value: "play" }
                            ],
                            correct: "get up"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "get up":   { options: ["起床","上床睡觉","做作业","玩耍"], correct: "起床" },
                                "go to bed":{ options: ["上床睡觉","起床","做作业","玩耍"], correct: "上床睡觉" },
                                "homework": { options: ["做作业","起床","上床睡觉","玩耍"], correct: "做作业" },
                                "play":     { options: ["玩耍","起床","上床睡觉","做作业"], correct: "玩耍" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "go to bed", chinese: "上床睡觉", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/bed.png" width="70">', value: "go to bed" },
                                { html: '<img src="assets/images/clock.png" width="70">', value: "get up" },
                                { html: '<img src="assets/images/play.png" width="70">', value: "play" },
                                { html: '<img src="assets/images/sleeping.png" width="70">', value: "sleeping" }
                            ],
                            correct: "go to bed"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "go to bed": { options: ["上床睡觉","起床","玩耍","睡觉"], correct: "上床睡觉" },
                                "get up":    { options: ["起床","上床睡觉","玩耍","睡觉"], correct: "起床" },
                                "play":      { options: ["玩耍","上床睡觉","起床","睡觉"], correct: "玩耍" },
                                "sleeping":  { options: ["睡觉","上床睡觉","起床","玩耍"], correct: "睡觉" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "play", chinese: "玩耍", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/play.png" width="70">', value: "play" },
                                { html: '<img src="assets/images/bed.png" width="70">', value: "go to bed" },
                                { html: '<img src="assets/images/homework.png" width="70">', value: "homework" },
                                { html: '<img src="assets/images/drawing.png" width="70">', value: "drawing" }
                            ],
                            correct: "play"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "play":     { options: ["玩耍","上床睡觉","做作业","画画"], correct: "玩耍" },
                                "go to bed":{ options: ["上床睡觉","玩耍","做作业","画画"], correct: "上床睡觉" },
                                "homework": { options: ["做作业","玩耍","上床睡觉","画画"], correct: "做作业" },
                                "drawing":  { options: ["画画","玩耍","上床睡觉","做作业"], correct: "画画" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "draw a picture", chinese: "画画", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/drawing.png" width="70">', value: "drawing" },
                                { html: '<img src="assets/images/play.png" width="70">', value: "play" },
                                { html: '<img src="assets/images/homework.png" width="70">', value: "homework" },
                                { html: '<img src="assets/images/bed.png" width="70">', value: "go to bed" }
                            ],
                            correct: "drawing"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "drawing":  { options: ["画画","玩耍","做作业","上床睡觉"], correct: "画画" },
                                "play":     { options: ["玩耍","画画","做作业","上床睡觉"], correct: "玩耍" },
                                "homework": { options: ["做作业","画画","玩耍","上床睡觉"], correct: "做作业" },
                                "go to bed":{ options: ["上床睡觉","画画","玩耍","做作业"], correct: "上床睡觉" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "do my homework", chinese: "做作业", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/homework.png" width="70">', value: "homework" },
                                { html: '<img src="assets/images/play.png" width="70">', value: "play" },
                                { html: '<img src="assets/images/drawing.png" width="70">', value: "drawing" },
                                { html: '<img src="assets/images/bed.png" width="70">', value: "go to bed" }
                            ],
                            correct: "homework"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "homework": { options: ["做作业","玩耍","画画","上床睡觉"], correct: "做作业" },
                                "play":     { options: ["玩耍","做作业","画画","上床睡觉"], correct: "玩耍" },
                                "drawing":  { options: ["画画","做作业","玩耍","上床睡觉"], correct: "画画" },
                                "go to bed":{ options: ["上床睡觉","做作业","玩耍","画画"], correct: "上床睡觉" }
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
                        type: "coop_listen_judge", audio: "It's time to get up", difficulty: "easy",
                        image: '<img src="assets/images/clock.png" width="90">',
                        isMatch: true, chinese: "起床时间到了",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/clock.png" width="60">', value: "get up" },
                                { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" },
                                { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                { html: '<img src="assets/images/play.png" width="60">', value: "play" }
                            ],
                            correct: "get up"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "It's time to go to bed", difficulty: "easy",
                        image: '<img src="assets/images/play.png" width="90">',
                        isMatch: false, chinese: "睡觉时间到了",
                        correctImage: '<img src="assets/images/bed.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" },
                                { html: '<img src="assets/images/play.png" width="60">', value: "play" },
                                { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                { html: '<img src="assets/images/clock.png" width="60">', value: "get up" }
                            ],
                            correct: "go to bed"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "It's time to play", difficulty: "medium",
                        image: '<img src="assets/images/play.png" width="90">',
                        isMatch: true, chinese: "玩耍时间到了",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/play.png" width="60">', value: "play" },
                                { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" },
                                { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                            ],
                            correct: "play"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "It's time to do my homework", difficulty: "medium",
                        image: '<img src="assets/images/bed.png" width="90">',
                        isMatch: false, chinese: "做作业时间到了",
                        correctImage: '<img src="assets/images/homework.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" },
                                { html: '<img src="assets/images/play.png" width="60">', value: "play" },
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                            ],
                            correct: "homework"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "It's time to draw a picture", difficulty: "medium",
                        image: '<img src="assets/images/homework.png" width="90">',
                        isMatch: false, chinese: "画画时间到了",
                        correctImage: '<img src="assets/images/drawing.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                { html: '<img src="assets/images/play.png" width="60">', value: "play" },
                                { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" }
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
                        sequence: ["get up", "go to school", "homework"],
                        words: [
                            { html: '<img src="assets/images/clock.png" width="60">', value: "get up" },
                            { html: '<img src="assets/images/homework.png" width="60">', value: "go to school" },
                            { html: '<img src="assets/images/homework.png" width="60">', value: "homework" }
                        ],
                        chinese: "get up → go to school → homework"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["play", "homework", "go to bed"],
                        words: [
                            { html: '<img src="assets/images/play.png" width="60">', value: "play" },
                            { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                            { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" }
                        ],
                        chinese: "play → homework → go to bed"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["homework", "play", "drawing"],
                        words: [
                            { html: '<img src="assets/images/homework.png" width="55">', value: "homework" },
                            { html: '<img src="assets/images/play.png" width="55">', value: "play" },
                            { html: '<img src="assets/images/drawing.png" width="55">', value: "drawing" }
                        ],
                        chinese: "homework → play → drawing"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["drawing", "go to bed", "get up"],
                        words: [
                            { html: '<img src="assets/images/drawing.png" width="55">', value: "drawing" },
                            { html: '<img src="assets/images/bed.png" width="55">', value: "go to bed" },
                            { html: '<img src="assets/images/clock.png" width="55">', value: "get up" }
                        ],
                        chinese: "drawing → go to bed → get up"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["get up", "homework", "play", "go to bed"],
                        words: [
                            { html: '<img src="assets/images/clock.png" width="50">', value: "get up" },
                            { html: '<img src="assets/images/homework.png" width="50">', value: "homework" },
                            { html: '<img src="assets/images/play.png" width="50">', value: "play" },
                            { html: '<img src="assets/images/bed.png" width="50">', value: "go to bed" }
                        ],
                        chinese: "get up → homework → play → go to bed"
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
                        scenario: "7点钟时间到了",
                        audio: "It's 7:00 p.m. It's time to do my homework.",
                        stepA: {
                            instruction: "听音频，现在几点？",
                            question: "现在几点？",
                            options: ["七点", "七点三十", "九点", "八点"],
                            correct: "七点"
                        },
                        stepB: {
                            instruction: "A听到音频说7点该做作业，选正确的活动",
                            question: "时间到了，该做什么？",
                            optionsMap: {
                                "七点":     { options: ["做作业", "玩耍", "画画", "睡觉"], correct: "做作业" },
                                "七点三十": { options: ["做作业", "玩耍", "画画", "睡觉"], correct: "做作业" },
                                "九点":     { options: ["做作业", "玩耍", "画画", "睡觉"], correct: "做作业" },
                                "八点":     { options: ["做作业", "玩耍", "画画", "睡觉"], correct: "做作业" }
                            }
                        },
                        chinese: "七点做作业"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "七点三十画画时间",
                        audio: "It's 7:30 p.m. It's time to draw a picture.",
                        stepA: {
                            instruction: "听音频，现在几点？",
                            question: "现在几点？",
                            options: ["七点三十", "七点", "八点", "九点"],
                            correct: "七点三十"
                        },
                        stepB: {
                            instruction: "A听到时间，根据日程选活动（7点→做作业，7:30→画画，9点→睡觉）",
                            question: "时间到了，该做什么？",
                            optionsMap: {
                                "七点三十": { options: ["画画", "做作业", "玩耍", "睡觉"], correct: "画画" },
                                "七点":     { options: ["做作业", "画画", "玩耍", "睡觉"], correct: "做作业" },
                                "八点":     { options: ["画画", "做作业", "玩耍", "睡觉"], correct: "画画" },
                                "九点":     { options: ["睡觉", "画画", "做作业", "玩耍"], correct: "睡觉" }
                            }
                        },
                        chinese: "七点三十画画"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "九点睡觉时间",
                        audio: "It's 9:00 p.m. It's time to go to bed.",
                        stepA: {
                            instruction: "听音频，该做什么了？",
                            question: "该做什么？",
                            options: ["睡觉", "做作业", "画画", "玩耍"],
                            correct: "睡觉"
                        },
                        stepB: {
                            instruction: "根据听到的，选正确的图片",
                            question: "哪张图是对的？",
                            optionsMap: {
                                "睡觉": { options: [
                                    { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" },
                                    { html: '<img src="assets/images/play.png" width="60">', value: "play" }
                                ], correct: "go to bed" },
                                "做作业": { options: [
                                    { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                    { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" }
                                ], correct: "homework" },
                                "画画": { options: [
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                    { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" }
                                ], correct: "drawing" },
                                "玩耍": { options: [
                                    { html: '<img src="assets/images/play.png" width="60">', value: "play" },
                                    { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" }
                                ], correct: "play" }
                            }
                        },
                        chinese: "九点睡觉"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "Tick Tock起床歌",
                        audio: "Tick, tock, tick, tock. It's time to get up.",
                        stepA: {
                            instruction: "听音频，该做什么？",
                            question: "Tick tock说该做什么？",
                            options: ["起床", "睡觉", "玩耍", "做作业"],
                            correct: "起床"
                        },
                        stepB: {
                            instruction: "起床了，然后要做什么？",
                            question: "起床之后通常做什么？",
                            optionsMap: {
                                "起床": { options: ["上学", "睡觉", "画画", "玩耍"], correct: "上学" },
                                "睡觉": { options: ["睡觉", "起床", "画画", "玩耍"], correct: "睡觉" },
                                "玩耍": { options: ["玩耍", "睡觉", "画画", "做作业"], correct: "玩耍" },
                                "做作业": { options: ["做作业", "睡觉", "画画", "玩耍"], correct: "做作业" }
                            }
                        },
                        chinese: "起床去上学"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "玩耍时间",
                        audio: "It's time to play. Oh, no! My homework!",
                        stepA: {
                            instruction: "听音频，他先说该做什么？",
                            question: "他先说该做什么？",
                            options: ["玩耍", "做作业", "睡觉", "画画"],
                            correct: "玩耍"
                        },
                        stepB: {
                            instruction: "他担心什么？",
                            question: "Oh, no! 他忘了什么？",
                            optionsMap: {
                                "玩耍": { options: ["作业", "睡觉", "画画", "起床"], correct: "作业" },
                                "做作业": { options: ["作业", "睡觉", "画画", "起床"], correct: "作业" },
                                "睡觉": { options: ["作业", "玩耍", "画画", "起床"], correct: "作业" },
                                "画画": { options: ["作业", "玩耍", "睡觉", "起床"], correct: "作业" }
                            }
                        },
                        chinese: "玩耍但忘了作业"
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
                            instruction: "看图片，选英文词组",
                            options: ["get up", "go to bed", "play", "homework"],
                            correct: "get up"
                        },
                        stepB: {
                            instruction: "看A选的词组，选中文意思",
                            optionsMap: {
                                "get up":   { options: ["起床","上床睡觉","玩耍","作业"], correct: "起床" },
                                "go to bed":{ options: ["上床睡觉","起床","玩耍","作业"], correct: "上床睡觉" },
                                "play":     { options: ["玩耍","起床","上床睡觉","作业"], correct: "玩耍" },
                                "homework": { options: ["作业","起床","上床睡觉","玩耍"], correct: "作业" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/bed.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文词组",
                            options: ["go to bed", "get up", "play", "go to school"],
                            correct: "go to bed"
                        },
                        stepB: {
                            instruction: "看A选的词组，选中文意思",
                            optionsMap: {
                                "go to bed":    { options: ["上床睡觉","起床","玩耍","去上学"], correct: "上床睡觉" },
                                "get up":       { options: ["起床","上床睡觉","玩耍","去上学"], correct: "起床" },
                                "play":         { options: ["玩耍","上床睡觉","起床","去上学"], correct: "玩耍" },
                                "go to school": { options: ["去上学","上床睡觉","起床","玩耍"], correct: "去上学" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/play.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["play", "get up", "go to bed", "homework"],
                            correct: "play"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "play":     { options: ["玩耍","起床","上床睡觉","作业"], correct: "玩耍" },
                                "get up":   { options: ["起床","玩耍","上床睡觉","作业"], correct: "起床" },
                                "go to bed":{ options: ["上床睡觉","玩耍","起床","作业"], correct: "上床睡觉" },
                                "homework": { options: ["作业","玩耍","起床","上床睡觉"], correct: "作业" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/homework.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文词组",
                            options: ["do my homework", "draw a picture", "play", "go to bed"],
                            correct: "do my homework"
                        },
                        stepB: {
                            instruction: "看A选的词组，选中文意思",
                            optionsMap: {
                                "do my homework": { options: ["做我的作业","画画","玩耍","上床睡觉"], correct: "做我的作业" },
                                "draw a picture": { options: ["画画","做我的作业","玩耍","上床睡觉"], correct: "画画" },
                                "play":           { options: ["玩耍","做我的作业","画画","上床睡觉"], correct: "玩耍" },
                                "go to bed":      { options: ["上床睡觉","做我的作业","画画","玩耍"], correct: "上床睡觉" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文词组",
                            options: ["draw a picture", "do my homework", "play", "get up"],
                            correct: "draw a picture"
                        },
                        stepB: {
                            instruction: "看A选的词组，选中文意思",
                            optionsMap: {
                                "draw a picture": { options: ["画画","做作业","玩耍","起床"], correct: "画画" },
                                "do my homework": { options: ["做作业","画画","玩耍","起床"], correct: "做作业" },
                                "play":           { options: ["玩耍","画画","做作业","起床"], correct: "玩耍" },
                                "get up":         { options: ["起床","画画","做作业","玩耍"], correct: "起床" }
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
                            { word: "get up", match: '<img src="assets/images/clock.png" width="50">', chinese: "起床" },
                            { word: "go to bed", match: '<img src="assets/images/bed.png" width="50">', chinese: "上床睡觉" },
                            { word: "play", match: '<img src="assets/images/play.png" width="50">', chinese: "玩耍" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "homework", match: '<img src="assets/images/homework.png" width="50">', chinese: "作业" },
                            { word: "picture", match: '<img src="assets/images/drawing.png" width="50">', chinese: "图画" },
                            { word: "sleeping", match: '<img src="assets/images/sleeping.png" width="50">', chinese: "睡觉" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "get up", match: '<img src="assets/images/clock.png" width="50">', chinese: "起床" },
                            { word: "play", match: '<img src="assets/images/play.png" width="50">', chinese: "玩耍" },
                            { word: "homework", match: '<img src="assets/images/homework.png" width="50">', chinese: "作业" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "go to bed", match: '<img src="assets/images/bed.png" width="50">', chinese: "上床睡觉" },
                            { word: "picture", match: '<img src="assets/images/drawing.png" width="50">', chinese: "图画" },
                            { word: "play", match: '<img src="assets/images/play.png" width="50">', chinese: "玩耍" },
                            { word: "get up", match: '<img src="assets/images/clock.png" width="50">', chinese: "起床" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "homework", match: '<img src="assets/images/homework.png" width="50">', chinese: "作业" },
                            { word: "sleeping", match: '<img src="assets/images/sleeping.png" width="50">', chinese: "睡觉" },
                            { word: "picture", match: '<img src="assets/images/drawing.png" width="50">', chinese: "图画" },
                            { word: "play", match: '<img src="assets/images/play.png" width="50">', chinese: "玩耍" }
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
                        image: '<img src="assets/images/homework.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "It's time to do my homework.", value: "It's time to do my homework." },
                                { html: "It's time to play.", value: "It's time to play." },
                                { html: "It's time to go to bed.", value: "It's time to go to bed." },
                                { html: "It's time to get up.", value: "It's time to get up." }
                            ],
                            correct: "It's time to do my homework."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "It's time to do my homework.": { options: ["该做作业了。","该玩耍了。","该睡觉了。","该起床了。"], correct: "该做作业了。" },
                                "It's time to play.":           { options: ["该玩耍了。","该做作业了。","该睡觉了。","该起床了。"], correct: "该玩耍了。" },
                                "It's time to go to bed.":      { options: ["该睡觉了。","该做作业了。","该玩耍了。","该起床了。"], correct: "该睡觉了。" },
                                "It's time to get up.":         { options: ["该起床了。","该做作业了。","该玩耍了。","该睡觉了。"], correct: "该起床了。" }
                            }
                        },
                        chinese: "该做作业了"
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/bed.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "It's time to go to bed.", value: "It's time to go to bed." },
                                { html: "It's time to get up.", value: "It's time to get up." },
                                { html: "It's time to play.", value: "It's time to play." },
                                { html: "It's time to do my homework.", value: "It's time to do my homework." }
                            ],
                            correct: "It's time to go to bed."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "It's time to go to bed.":      { options: ["该睡觉了。","该起床了。","该玩耍了。","该做作业了。"], correct: "该睡觉了。" },
                                "It's time to get up.":         { options: ["该起床了。","该睡觉了。","该玩耍了。","该做作业了。"], correct: "该起床了。" },
                                "It's time to play.":           { options: ["该玩耍了。","该睡觉了。","该起床了。","该做作业了。"], correct: "该玩耍了。" },
                                "It's time to do my homework.": { options: ["该做作业了。","该睡觉了。","该起床了。","该玩耍了。"], correct: "该做作业了。" }
                            }
                        },
                        chinese: "该睡觉了"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "It's time to draw a picture.", value: "It's time to draw a picture." },
                                { html: "It's time to go to bed.", value: "It's time to go to bed." },
                                { html: "It's time to play.", value: "It's time to play." },
                                { html: "It's time to do my homework.", value: "It's time to do my homework." }
                            ],
                            correct: "It's time to draw a picture."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "It's time to draw a picture.":  { options: ["该画画了。","该睡觉了。","该玩耍了。","该做作业了。"], correct: "该画画了。" },
                                "It's time to go to bed.":       { options: ["该睡觉了。","该画画了。","该玩耍了。","该做作业了。"], correct: "该睡觉了。" },
                                "It's time to play.":            { options: ["该玩耍了。","该画画了。","该睡觉了。","该做作业了。"], correct: "该玩耍了。" },
                                "It's time to do my homework.":  { options: ["该做作业了。","该画画了。","该睡觉了。","该玩耍了。"], correct: "该做作业了。" }
                            }
                        },
                        chinese: "该画画了"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/clock.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "It's 7:00 p.m. It's time to do my homework.", value: "It's 7:00 p.m. It's time to do my homework." },
                                { html: "It's 9:00 p.m. It's time to go to bed.", value: "It's 9:00 p.m. It's time to go to bed." },
                                { html: "It's time to play.", value: "It's time to play." },
                                { html: "It's time to get up.", value: "It's time to get up." }
                            ],
                            correct: "It's 7:00 p.m. It's time to do my homework."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "It's 7:00 p.m. It's time to do my homework.": { options: ["七点了，该做作业了。","九点了，该睡觉了。","该玩耍了。","该起床了。"], correct: "七点了，该做作业了。" },
                                "It's 9:00 p.m. It's time to go to bed.":      { options: ["九点了，该睡觉了。","七点了，该做作业了。","该玩耍了。","该起床了。"], correct: "九点了，该睡觉了。" },
                                "It's time to play.":                           { options: ["该玩耍了。","七点了，该做作业了。","九点了，该睡觉了。","该起床了。"], correct: "该玩耍了。" },
                                "It's time to get up.":                         { options: ["该起床了。","七点了，该做作业了。","九点了，该睡觉了。","该玩耍了。"], correct: "该起床了。" }
                            }
                        },
                        chinese: "七点做作业"
                    },
                    {
                        type: "coop_word_relay", difficulty: "hard",
                        image: '<img src="assets/images/play.png" width="90">',
                        stepA: {
                            instruction: "选正确的回应句",
                            options: [
                                { html: "It's time to play!", value: "It's time to play!" },
                                { html: "Oh, no! My homework!", value: "Oh, no! My homework!" },
                                { html: "It's time to go to bed.", value: "It's time to go to bed." },
                                { html: "It's time to get up.", value: "It's time to get up." }
                            ],
                            correct: "It's time to play!"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "It's time to play!":       { options: ["该玩耍了！","哦不，我的作业！","该睡觉了。","该起床了。"], correct: "该玩耍了！" },
                                "Oh, no! My homework!":     { options: ["哦不，我的作业！","该玩耍了！","该睡觉了。","该起床了。"], correct: "哦不，我的作业！" },
                                "It's time to go to bed.":  { options: ["该睡觉了。","该玩耍了！","哦不，我的作业！","该起床了。"], correct: "该睡觉了。" },
                                "It's time to get up.":     { options: ["该起床了。","该玩耍了！","哦不，我的作业！","该睡觉了。"], correct: "该起床了。" }
                            }
                        },
                        chinese: "该玩耍了"
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
                        scenario: "七点该做什么",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "It's 7:00 p.m. It's time to do my homework.",
                            question: "现在几点？",
                            options: ["七点", "七点三十", "九点", "八点"],
                            correct: "七点"
                        },
                        stepB: {
                            instruction: "A读到文段说7点该做作业，选正确活动",
                            optionsMap: {
                                "七点":     { options: ["做作业", "玩耍", "画画", "睡觉"], correct: "做作业" },
                                "七点三十": { options: ["做作业", "玩耍", "画画", "睡觉"], correct: "做作业" },
                                "九点":     { options: ["做作业", "玩耍", "画画", "睡觉"], correct: "做作业" },
                                "八点":     { options: ["做作业", "玩耍", "画画", "睡觉"], correct: "做作业" }
                            }
                        },
                        chinese: "七点做作业"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "九点该睡觉了",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "It's 9:00 p.m. It's time to go to bed.",
                            question: "该做什么？",
                            options: ["睡觉", "做作业", "玩耍", "画画"],
                            correct: "睡觉"
                        },
                        stepB: {
                            instruction: "九点了，选正确的图片",
                            optionsMap: {
                                "睡觉": { options: [
                                    { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" },
                                    { html: '<img src="assets/images/play.png" width="60">', value: "play" },
                                    { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                                ], correct: "go to bed" },
                                "做作业": { options: [
                                    { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                    { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" },
                                    { html: '<img src="assets/images/play.png" width="60">', value: "play" },
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                                ], correct: "homework" },
                                "玩耍": { options: [
                                    { html: '<img src="assets/images/play.png" width="60">', value: "play" },
                                    { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" },
                                    { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                                ], correct: "play" },
                                "画画": { options: [
                                    { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" },
                                    { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" },
                                    { html: '<img src="assets/images/play.png" width="60">', value: "play" },
                                    { html: '<img src="assets/images/homework.png" width="60">', value: "homework" }
                                ], correct: "drawing" }
                            }
                        },
                        chinese: "九点睡觉→选图"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "tick tock起床上学",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Tick, tock, tick, tock. It's time to get up. It's time to go to school.",
                            question: "先做什么？",
                            options: ["起床", "上学", "做作业", "睡觉"],
                            correct: "起床"
                        },
                        stepB: {
                            instruction: "起床之后做什么？",
                            optionsMap: {
                                "起床":   { options: ["去上学", "睡觉", "画画", "做作业"], correct: "去上学" },
                                "上学":   { options: ["去上学", "睡觉", "画画", "做作业"], correct: "去上学" },
                                "做作业": { options: ["去上学", "睡觉", "画画", "做作业"], correct: "去上学" },
                                "睡觉":   { options: ["起床", "睡觉", "画画", "做作业"], correct: "起床" }
                            }
                        },
                        chinese: "起床去上学"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "看图说时间和活动",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "It's 7:30 p.m. It's time to draw a picture.",
                            question: "几点？",
                            options: ["七点三十", "七点", "九点", "八点"],
                            correct: "七点三十"
                        },
                        stepB: {
                            instruction: "A读到文段说7:30该画画，根据日程选活动（7点→做作业，7:30→画画，9点→睡觉）",
                            optionsMap: {
                                "七点三十": { options: ["画画", "做作业", "玩耍", "睡觉"], correct: "画画" },
                                "七点":     { options: ["做作业", "画画", "玩耍", "睡觉"], correct: "做作业" },
                                "九点":     { options: ["睡觉", "画画", "玩耍", "做作业"], correct: "睡觉" },
                                "八点":     { options: ["画画", "做作业", "玩耍", "睡觉"], correct: "画画" }
                            }
                        },
                        chinese: "七点三十画画"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "玩耍忘了作业",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "It's time to play. Oh, no! My homework!",
                            question: "他忘了什么？",
                            options: ["作业", "画画", "玩耍", "睡觉"],
                            correct: "作业"
                        },
                        stepB: {
                            instruction: "他忘了作业，应该怎么办？",
                            optionsMap: {
                                "作业": { options: ["It's time to do my homework.", "It's time to play.", "It's time to go to bed.", "It's time to get up."], correct: "It's time to do my homework." },
                                "画画": { options: ["It's time to draw a picture.", "It's time to play.", "It's time to go to bed.", "It's time to get up."], correct: "It's time to draw a picture." },
                                "玩耍": { options: ["It's time to play.", "It's time to do my homework.", "It's time to go to bed.", "It's time to get up."], correct: "It's time to play." },
                                "睡觉": { options: ["It's time to go to bed.", "It's time to do my homework.", "It's time to play.", "It's time to get up."], correct: "It's time to go to bed." }
                            }
                        },
                        chinese: "该做作业了"
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
                        sentence: "It's time to get up.",
                        stepA: { words: ["It's", "time"], instruction: "选前半句的词" },
                        stepB: { words: ["to", "get up."], instruction: "选后半句的词" },
                        chinese: "该起床了。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "It's time to play.",
                        stepA: { words: ["It's", "time"], instruction: "选前半句的词" },
                        stepB: { words: ["to", "play."], instruction: "选后半句的词" },
                        chinese: "该玩耍了。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "It's time to go to bed.",
                        stepA: { words: ["It's", "time"], instruction: "选前半句的词" },
                        stepB: { words: ["to", "go to bed."], instruction: "选后半句的词" },
                        chinese: "该睡觉了。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "It's time to do my homework.",
                        stepA: { words: ["It's", "time", "to"], instruction: "选前半句的词" },
                        stepB: { words: ["do", "my", "homework."], instruction: "选后半句的词" },
                        chinese: "该做作业了。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "It's time to draw a picture.",
                        stepA: { words: ["It's", "time", "to"], instruction: "选前半句的词" },
                        stepB: { words: ["draw", "a", "picture."], instruction: "选后半句的词" },
                        chinese: "该画画了。"
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
                        template: "It's ___ to do my homework.",
                        image: '<img src="assets/images/homework.png" width="70">',
                        stepA: { blank: 1, options: ["time", "name", "clock", "six"], correct: "time", instruction: "填第1个空" },
                        stepB: { blank: 2, options: [], correct: "", instruction: "说出完整句子" },
                        chinese: "It's time to do my homework."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "It's 7:00 p.m. It's time to ___ my homework.",
                        image: '<img src="assets/images/clock.png" width="70">',
                        stepA: { blank: 1, options: ["do", "play", "draw", "go"], correct: "do", instruction: "填第1个空" },
                        stepB: { blank: 2, options: [], correct: "", instruction: "说出完整句子" },
                        chinese: "It's 7:00 p.m. It's time to do my homework."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "It's time to ___ a picture.",
                        image: '<img src="assets/images/drawing.png" width="70">',
                        stepA: { blank: 1, options: ["draw", "do", "play", "go"], correct: "draw", instruction: "填第1个空" },
                        stepB: { blank: 2, options: [], correct: "", instruction: "说出完整句子" },
                        chinese: "It's time to draw a picture."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "It's ___ p.m. It's time to go to ___.",
                        image: '<img src="assets/images/bed.png" width="70">',
                        stepA: { blank: 1, options: ["9:00", "7:00", "7:30", "8:00"], correct: "9:00", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["bed", "school", "play", "draw"], correct: "bed", instruction: "填第2个空" },
                        chinese: "It's 9:00 p.m. It's time to go to bed."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "Tick, tock. It's time to ___ ___.",
                        image: '<img src="assets/images/clock.png" width="70">',
                        stepA: { blank: 1, options: ["get", "go", "do", "draw"], correct: "get", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["up", "bed", "school", "picture"], correct: "up", instruction: "填第2个空" },
                        chinese: "Tick, tock. It's time to get up."
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
                        word: "play",
                        image: '<img src="assets/images/play.png" width="60">',
                        stepA: { letters: ["p", "l"], distractors: ["b", "s"], instruction: "拼前半：p___" },
                        stepB: { letters: ["a", "y"], distractors: ["e", "t"], instruction: "拼后半：__ay" },
                        chinese: "玩耍"
                    },
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
                        word: "picture",
                        image: '<img src="assets/images/drawing.png" width="60">',
                        stepA: { letters: ["p", "i", "c"], distractors: ["a", "o"], instruction: "拼前半：p______" },
                        stepB: { letters: ["t", "u", "r", "e"], distractors: ["n", "s"], instruction: "拼后半：___ture" },
                        chinese: "图画"
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
                        word: "sleeping",
                        image: '<img src="assets/images/sleeping.png" width="60">',
                        stepA: { letters: ["s", "l", "e", "e"], distractors: ["a", "o"], instruction: "拼前半：s_______" },
                        stepB: { letters: ["p", "i", "n", "g"], distractors: ["t", "r"], instruction: "拼后半：___ping" },
                        chinese: "睡觉"
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
                        scenario: "告诉同学该做什么了",
                        stepA: {
                            instruction: "选一句话告诉同学该做什么了",
                            options: ["It's time to do my homework.", "It's time to play.", "It's time to go to bed.", "It's time to get up."]
                        },
                        stepB: {
                            instruction: "回应A",
                            optionsMap: {
                                "It's time to do my homework.": { options: ["OK! Let me do my homework.", "It's time to play.", "It's time to go to bed.", "Oh, no!"], correct: "OK! Let me do my homework." },
                                "It's time to play.":           { options: ["Great! Let's play!", "It's time to do my homework.", "It's time to go to bed.", "Oh, no!"], correct: "Great! Let's play!" },
                                "It's time to go to bed.":      { options: ["OK. Good night.", "It's time to play.", "It's time to do my homework.", "Oh, no!"], correct: "OK. Good night." },
                                "It's time to get up.":         { options: ["OK. Good morning!", "It's time to go to bed.", "It's time to play.", "Oh, no!"], correct: "OK. Good morning!" }
                            }
                        },
                        chinese: "告诉同学时间到了"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "七点的日程（日程提示：7点→做作业，7:30→画画，9点→睡觉）",
                        stepA: {
                            instruction: "选正确的时间句",
                            options: ["It's 7:00 p.m.", "It's 9:00 p.m.", "It's 7:30 p.m.", "It's time to play."]
                        },
                        stepB: {
                            instruction: "根据A的时间，说该做什么（提示：7点→做作业，7:30→画画，9点→睡觉）",
                            optionsMap: {
                                "It's 7:00 p.m.":       { options: ["It's time to do my homework.", "It's time to go to bed.", "It's time to play.", "It's time to get up."], correct: "It's time to do my homework." },
                                "It's 9:00 p.m.":       { options: ["It's time to go to bed.", "It's time to do my homework.", "It's time to play.", "It's time to get up."], correct: "It's time to go to bed." },
                                "It's 7:30 p.m.":       { options: ["It's time to draw a picture.", "It's time to go to bed.", "It's time to play.", "It's time to get up."], correct: "It's time to draw a picture." },
                                "It's time to play.":   { options: ["It's time to play!", "It's time to go to bed.", "It's time to do my homework.", "It's time to get up."], correct: "It's time to play!" }
                            }
                        },
                        chinese: "看时间说活动"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "选图说活动时间",
                        stepA: {
                            instruction: "选图片",
                            options: [
                                { html: '<img src="assets/images/homework.png" width="60">', value: "homework" },
                                { html: '<img src="assets/images/play.png" width="60">', value: "play" },
                                { html: '<img src="assets/images/bed.png" width="60">', value: "go to bed" },
                                { html: '<img src="assets/images/drawing.png" width="60">', value: "drawing" }
                            ]
                        },
                        stepB: {
                            instruction: "根据A选的图，说出句子",
                            optionsMap: {
                                "homework":   { options: ["It's time to do my homework.", "It's time to play.", "It's time to go to bed.", "It's time to draw a picture."], correct: "It's time to do my homework." },
                                "play":       { options: ["It's time to play.", "It's time to do my homework.", "It's time to go to bed.", "It's time to draw a picture."], correct: "It's time to play." },
                                "go to bed":  { options: ["It's time to go to bed.", "It's time to do my homework.", "It's time to play.", "It's time to draw a picture."], correct: "It's time to go to bed." },
                                "drawing":    { options: ["It's time to draw a picture.", "It's time to do my homework.", "It's time to play.", "It's time to go to bed."], correct: "It's time to draw a picture." }
                            }
                        },
                        chinese: "选图说活动时间"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "Oh no! 忘了作业",
                        stepA: {
                            instruction: "选正确的情境句",
                            options: ["Oh, no! My homework!", "It's time to play.", "It's time to go to bed.", "It's time to get up."]
                        },
                        stepB: {
                            instruction: "回应A",
                            optionsMap: {
                                "Oh, no! My homework!":    { options: ["It's time to do your homework!", "It's time to play.", "It's time to go to bed.", "It's time to get up."], correct: "It's time to do your homework!" },
                                "It's time to play.":      { options: ["Great! Let's play!", "Oh, no! My homework!", "It's time to go to bed.", "It's time to get up."], correct: "Great! Let's play!" },
                                "It's time to go to bed.": { options: ["OK. Good night.", "Oh, no! My homework!", "It's time to play.", "It's time to get up."], correct: "OK. Good night." },
                                "It's time to get up.":    { options: ["OK. Good morning!", "Oh, no! My homework!", "It's time to go to bed.", "It's time to play."], correct: "OK. Good morning!" }
                            }
                        },
                        chinese: "忘了作业怎么办"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "一天的日程安排",
                        stepA: {
                            instruction: "选早上的活动",
                            options: ["get up", "go to bed", "play", "do my homework"]
                        },
                        stepB: {
                            instruction: "选晚上的活动",
                            optionsMap: {
                                "get up":          { options: ["go to bed", "get up", "go to school", "draw a picture"], correct: "go to bed" },
                                "go to bed":       { options: ["get up", "go to bed", "play", "do my homework"], correct: "get up" },
                                "play":            { options: ["go to bed", "get up", "play", "go to school"], correct: "go to bed" },
                                "do my homework":  { options: ["go to bed", "get up", "go to school", "draw a picture"], correct: "go to bed" }
                            }
                        },
                        chinese: "早晚活动对比"
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
                        type: "coop_read_relay", word: "get up", chinese: "起床", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "go to bed", chinese: "上床睡觉", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "play", chinese: "玩耍", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "picture", chinese: "图画", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "homework", chinese: "作业", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "It's time to get up", chinese: "该起床了。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "It's time to go to bed", chinese: "该睡觉了。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "It's time to do my homework", chinese: "该做作业了。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "It's time to draw a picture", chinese: "该画画了。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "It's time to play", chinese: "该玩耍了。", difficulty: "medium",
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
                        image: '<img src="assets/images/clock.png" width="90">',
                        answer: "It's time to get up",
                        chinese: "该起床了",
                        stepA: {
                            instruction: "看图片，说出完整句子：It's time to _____.",
                            expected: "It's time to get up",
                            chinese: "该起床了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：It's time to _____.",
                            expected: "It's time to get up",
                            chinese: "该起床了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/homework.png" width="90">',
                        answer: "It's time to do my homework",
                        chinese: "该做作业了",
                        stepA: {
                            instruction: "看图片，说出完整句子：It's time to _____.",
                            expected: "It's time to do my homework",
                            chinese: "该做作业了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：It's time to _____.",
                            expected: "It's time to do my homework",
                            chinese: "该做作业了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        answer: "It's time to draw a picture",
                        chinese: "该画画了",
                        stepA: {
                            instruction: "看图片，说出完整句子：It's time to _____.",
                            expected: "It's time to draw a picture",
                            chinese: "该画画了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：It's time to _____.",
                            expected: "It's time to draw a picture",
                            chinese: "该画画了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/play.png" width="90">',
                        answer: "It's time to play",
                        chinese: "该玩耍了",
                        stepA: {
                            instruction: "看图片，说出完整句子：It's time to _____.",
                            expected: "It's time to play",
                            chinese: "该玩耍了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：It's time to _____.",
                            expected: "It's time to play",
                            chinese: "该玩耍了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/bed.png" width="90">',
                        answer: "It's time to go to bed",
                        chinese: "该睡觉了",
                        stepA: {
                            instruction: "看图片，说出完整句子：It's time to _____.",
                            expected: "It's time to go to bed",
                            chinese: "该睡觉了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：It's time to _____.",
                            expected: "It's time to go to bed",
                            chinese: "该睡觉了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/homework.png" width="90">',
                        answer: "It's 7:00 p.m",
                        chinese: "晚上七点",
                        stepA: {
                            instruction: "说出时间：It's _____ p.m.",
                            expected: "It's 7:00 p.m",
                            chinese: "晚上七点"
                        },
                        stepB: {
                            instruction: "你也说：It's _____ p.m.",
                            expected: "It's 7:00 p.m",
                            chinese: "晚上七点"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/bed.png" width="90">',
                        answer: "It's 9:00 p.m",
                        chinese: "晚上九点",
                        stepA: {
                            instruction: "说出时间：It's _____ p.m.",
                            expected: "It's 9:00 p.m",
                            chinese: "晚上九点"
                        },
                        stepB: {
                            instruction: "你也说：It's _____ p.m.",
                            expected: "It's 9:00 p.m",
                            chinese: "晚上九点"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/clock.png" width="90">',
                        answer: "Tick tock tick tock",
                        chinese: "滴答滴答",
                        stepA: {
                            instruction: "读一读：Tick, tock, _____, _____.",
                            expected: "Tick tock tick tock",
                            chinese: "滴答滴答"
                        },
                        stepB: {
                            instruction: "你也读：Tick, tock, _____, _____.",
                            expected: "Tick tock tick tock",
                            chinese: "滴答滴答"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        answer: "It's time to draw a picture",
                        chinese: "该画画了",
                        stepA: {
                            instruction: "说出完整句子：It's time to _____.",
                            expected: "It's time to draw a picture",
                            chinese: "该画画了"
                        },
                        stepB: {
                            instruction: "你也说：It's time to _____.",
                            expected: "It's time to draw a picture",
                            chinese: "该画画了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/sleeping.png" width="90">',
                        answer: "It's time to go to bed",
                        chinese: "该睡觉了",
                        stepA: {
                            instruction: "说出完整句子：It's time to _____.",
                            expected: "It's time to go to bed",
                            chinese: "该睡觉了"
                        },
                        stepB: {
                            instruction: "你也说：It's time to _____.",
                            expected: "It's time to go to bed",
                            chinese: "该睡觉了"
                        }
                    }
                ]
            },

            // ── 站点3：合作对话（hard）— 完整示范句+中文，AB说不同的话 ──
            {
                id: 3, name: "合作对话", icon: "🗣️",
                difficulty: "hard",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A说时间，B说该做什么，合作完成对话",
                questions: [
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "七点做作业",
                        image: '<img src="assets/images/homework.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说出时间",
                            role: "报时者",
                            line: "It's 7:00 p.m",
                            chinese: "晚上七点。"
                        },
                        stepB: {
                            instruction: "看示范句，说该做什么",
                            role: "提示者",
                            line: "It's time to do my homework",
                            chinese: "该做作业了。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "九点睡觉",
                        image: '<img src="assets/images/bed.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说出时间",
                            role: "报时者",
                            line: "It's 9:00 p.m",
                            chinese: "晚上九点。"
                        },
                        stepB: {
                            instruction: "看示范句，说该睡觉了",
                            role: "提示者",
                            line: "It's time to go to bed",
                            chinese: "该睡觉了。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "该起床了",
                        image: '<img src="assets/images/clock.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说Tick tock",
                            role: "时钟",
                            line: "Tick tock tick tock",
                            chinese: "滴答滴答。"
                        },
                        stepB: {
                            instruction: "看示范句，说该起床了",
                            role: "提示者",
                            line: "It's time to get up",
                            chinese: "该起床了。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "七点三十画画",
                        image: '<img src="assets/images/drawing.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说出时间",
                            role: "报时者",
                            line: "It's 7:30 p.m",
                            chinese: "晚上七点三十。"
                        },
                        stepB: {
                            instruction: "看示范句，说该画画了",
                            role: "提示者",
                            line: "It's time to draw a picture",
                            chinese: "该画画了。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "玩耍时间",
                        image: '<img src="assets/images/play.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说该玩耍了",
                            role: "提示者",
                            line: "It's time to play",
                            chinese: "该玩耍了！"
                        },
                        stepB: {
                            instruction: "看示范句，说哦不忘了作业",
                            role: "学生",
                            line: "Oh no My homework",
                            chinese: "哦不，我的作业！"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "去上学时间",
                        image: '<img src="assets/images/clock.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说Tick tock",
                            role: "时钟",
                            line: "Tick tock tick tock",
                            chinese: "滴答滴答。"
                        },
                        stepB: {
                            instruction: "看示范句，说该去上学了",
                            role: "提示者",
                            line: "It's time to go to school",
                            chinese: "该去上学了。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "做作业时间",
                        image: '<img src="assets/images/homework.png" width="90">',
                        stepA: {
                            instruction: "看示范句，提醒做作业",
                            role: "提示者",
                            line: "It's time to do your homework",
                            chinese: "该做作业了。"
                        },
                        stepB: {
                            instruction: "看示范句，答应去做",
                            role: "学生",
                            line: "OK Let me do my homework",
                            chinese: "好的，我去做作业。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "睡觉前互道晚安",
                        image: '<img src="assets/images/sleeping.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说该睡觉了",
                            role: "提示者",
                            line: "It's time to go to bed",
                            chinese: "该睡觉了。"
                        },
                        stepB: {
                            instruction: "看示范句，道晚安",
                            role: "回应者",
                            line: "OK Good night",
                            chinese: "好的，晚安。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "早上问好起床",
                        image: '<img src="assets/images/clock.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说该起床了",
                            role: "提示者",
                            line: "It's time to get up",
                            chinese: "该起床了。"
                        },
                        stepB: {
                            instruction: "看示范句，回应早上好",
                            role: "回应者",
                            line: "OK Good morning",
                            chinese: "好的，早上好。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "玩耍后做作业",
                        image: '<img src="assets/images/homework.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说玩耍时间到了",
                            role: "提示者",
                            line: "It's time to play",
                            chinese: "该玩耍了。"
                        },
                        stepB: {
                            instruction: "看示范句，说不，该做作业了",
                            role: "学生",
                            line: "No It's time to do my homework",
                            chinese: "不，该做作业了。"
                        }
                    }
                ]
            }
        ]
    }
};

// 导出（兼容直接 script 引入）
if (typeof window !== 'undefined') {
    window.u3l4_coop = u3l4_coop;
}
