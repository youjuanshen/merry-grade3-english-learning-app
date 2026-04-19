/**
 * U1L2 合作冒险题库 — These are pandas.
 * 主题：动物特征描述（复数）
 * 新词汇：these, those, they, have, small, big, ears, eyes, long, legs, like, grass, brown, lovely, dog, cat, white, black
 * 累积词汇（from L1）：bear, horse, bird, panda, rabbit, monkey, duck, big, cute, fast, fly, run, this, that, it
 * 句型：These are ___s. / Those are ___s. / They have ___. / They are ___. / They like ___.
 *
 * 每道题拆成 stepA（蓝色）→ stepB（橙色），B依赖A的结果
 * 知识点清单：docs/U1_词汇累积池.md
 */

var u1l2_coop = {
    id: "U1L2",
    title: "These are pandas.",
    theme: "animal features",

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
                        type: "coop_listen_relay", audio: "panda", chinese: "熊猫", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/panda.png" width="70">', value: "panda" },
                                { html: '<img src="assets/images/horse.png" width="70">', value: "horse" },
                                { html: '<img src="assets/images/dog.png" width="70">', value: "dog" },
                                { html: '<img src="assets/images/cat.png" width="70">', value: "cat" }
                            ],
                            correct: "panda"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "panda": { options: ["熊猫","马","狗","猫"], correct: "熊猫" },
                                "horse": { options: ["马","熊猫","狗","猫"], correct: "马" },
                                "dog":   { options: ["狗","熊猫","马","猫"], correct: "狗" },
                                "cat":   { options: ["猫","熊猫","马","狗"], correct: "猫" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "horse", chinese: "马", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/horse.png" width="70">', value: "horse" },
                                { html: '<img src="assets/images/panda.png" width="70">', value: "panda" },
                                { html: '<img src="assets/images/rabbit.png" width="70">', value: "rabbit" },
                                { html: '<img src="assets/images/dog.png" width="70">', value: "dog" }
                            ],
                            correct: "horse"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "horse":  { options: ["马","熊猫","兔子","狗"], correct: "马" },
                                "panda":  { options: ["熊猫","马","兔子","狗"], correct: "熊猫" },
                                "rabbit": { options: ["兔子","马","熊猫","狗"], correct: "兔子" },
                                "dog":    { options: ["狗","马","熊猫","兔子"], correct: "狗" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "dog", chinese: "狗", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/dog.png" width="70">', value: "dog" },
                                { html: '<img src="assets/images/cat.png" width="70">', value: "cat" },
                                { html: '<img src="assets/images/bear.png" width="70">', value: "bear" },
                                { html: '<img src="assets/images/panda.png" width="70">', value: "panda" }
                            ],
                            correct: "dog"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "dog":   { options: ["狗","猫","熊","熊猫"], correct: "狗" },
                                "cat":   { options: ["猫","狗","熊","熊猫"], correct: "猫" },
                                "bear":  { options: ["熊","狗","猫","熊猫"], correct: "熊" },
                                "panda": { options: ["熊猫","狗","猫","熊"], correct: "熊猫" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "cat", chinese: "猫", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/cat.png" width="70">', value: "cat" },
                                { html: '<img src="assets/images/dog.png" width="70">', value: "dog" },
                                { html: '<img src="assets/images/horse.png" width="70">', value: "horse" },
                                { html: '<img src="assets/images/rabbit.png" width="70">', value: "rabbit" }
                            ],
                            correct: "cat"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "cat":    { options: ["猫","狗","马","兔子"], correct: "猫" },
                                "dog":    { options: ["狗","猫","马","兔子"], correct: "狗" },
                                "horse":  { options: ["马","猫","狗","兔子"], correct: "马" },
                                "rabbit": { options: ["兔子","猫","狗","马"], correct: "兔子" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "rabbit", chinese: "兔子", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/rabbit.png" width="70">', value: "rabbit" },
                                { html: '<img src="assets/images/bear.png" width="70">', value: "bear" },
                                { html: '<img src="assets/images/dog.png" width="70">', value: "dog" },
                                { html: '<img src="assets/images/cat.png" width="70">', value: "cat" }
                            ],
                            correct: "rabbit"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "rabbit": { options: ["兔子","熊","狗","猫"], correct: "兔子" },
                                "bear":   { options: ["熊","兔子","狗","猫"], correct: "熊" },
                                "dog":    { options: ["狗","兔子","熊","猫"], correct: "狗" },
                                "cat":    { options: ["猫","兔子","熊","狗"], correct: "猫" }
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
                        type: "coop_listen_judge", audio: "panda", difficulty: "easy",
                        image: '<img src="assets/images/panda.png" width="90">',
                        isMatch: true, chinese: "熊猫",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/panda.png" width="60">', value: "panda" },
                                { html: '<img src="assets/images/horse.png" width="60">', value: "horse" },
                                { html: '<img src="assets/images/dog.png" width="60">', value: "dog" },
                                { html: '<img src="assets/images/cat.png" width="60">', value: "cat" }
                            ],
                            correct: "panda"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "dog", difficulty: "easy",
                        image: '<img src="assets/images/cat.png" width="90">',
                        isMatch: false, chinese: "狗",
                        correctImage: '<img src="assets/images/dog.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/dog.png" width="60">', value: "dog" },
                                { html: '<img src="assets/images/cat.png" width="60">', value: "cat" },
                                { html: '<img src="assets/images/panda.png" width="60">', value: "panda" },
                                { html: '<img src="assets/images/horse.png" width="60">', value: "horse" }
                            ],
                            correct: "dog"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "horse", difficulty: "medium",
                        image: '<img src="assets/images/horse.png" width="90">',
                        isMatch: true, chinese: "马",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/horse.png" width="60">', value: "horse" },
                                { html: '<img src="assets/images/dog.png" width="60">', value: "dog" },
                                { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" },
                                { html: '<img src="assets/images/bear.png" width="60">', value: "bear" }
                            ],
                            correct: "horse"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "cat", difficulty: "medium",
                        image: '<img src="assets/images/dog.png" width="90">',
                        isMatch: false, chinese: "猫",
                        correctImage: '<img src="assets/images/cat.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/cat.png" width="60">', value: "cat" },
                                { html: '<img src="assets/images/dog.png" width="60">', value: "dog" },
                                { html: '<img src="assets/images/bear.png" width="60">', value: "bear" },
                                { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" }
                            ],
                            correct: "cat"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "rabbit", difficulty: "medium",
                        image: '<img src="assets/images/bear.png" width="90">',
                        isMatch: false, chinese: "兔子",
                        correctImage: '<img src="assets/images/rabbit.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" },
                                { html: '<img src="assets/images/bear.png" width="60">', value: "bear" },
                                { html: '<img src="assets/images/panda.png" width="60">', value: "panda" },
                                { html: '<img src="assets/images/dog.png" width="60">', value: "dog" }
                            ],
                            correct: "rabbit"
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
                        sequence: ["panda", "horse", "dog"],
                        words: [
                            { html: '<img src="assets/images/panda.png" width="60">', value: "panda" },
                            { html: '<img src="assets/images/horse.png" width="60">', value: "horse" },
                            { html: '<img src="assets/images/dog.png" width="60">', value: "dog" }
                        ],
                        chinese: "panda → horse → dog"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["cat", "rabbit", "bear"],
                        words: [
                            { html: '<img src="assets/images/cat.png" width="60">', value: "cat" },
                            { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" },
                            { html: '<img src="assets/images/bear.png" width="60">', value: "bear" }
                        ],
                        chinese: "cat → rabbit → bear"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["dog", "panda", "horse"],
                        words: [
                            { html: '<img src="assets/images/dog.png" width="55">', value: "dog" },
                            { html: '<img src="assets/images/panda.png" width="55">', value: "panda" },
                            { html: '<img src="assets/images/horse.png" width="55">', value: "horse" }
                        ],
                        chinese: "dog → panda → horse"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["cat", "bear", "rabbit"],
                        words: [
                            { html: '<img src="assets/images/cat.png" width="55">', value: "cat" },
                            { html: '<img src="assets/images/bear.png" width="55">', value: "bear" },
                            { html: '<img src="assets/images/rabbit.png" width="55">', value: "rabbit" }
                        ],
                        chinese: "cat → bear → rabbit"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["panda", "dog", "horse", "cat"],
                        words: [
                            { html: '<img src="assets/images/panda.png" width="50">', value: "panda" },
                            { html: '<img src="assets/images/dog.png" width="50">', value: "dog" },
                            { html: '<img src="assets/images/horse.png" width="50">', value: "horse" },
                            { html: '<img src="assets/images/cat.png" width="50">', value: "cat" }
                        ],
                        chinese: "panda → dog → horse → cat"
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
                        scenario: "你在动物园，想看有小耳朵的动物",
                        audio: "These are pandas. They have small ears.",
                        stepA: {
                            instruction: "听音频，告诉B你听到了什么动物",
                            question: "你听到了什么动物？",
                            options: ["panda", "horse", "dog", "cat"],
                            correct: "panda"
                        },
                        stepB: {
                            instruction: "你想看有小耳朵的动物，A听到的动物对吗？",
                            question: "这些动物有小耳朵吗？",
                            optionsMap: {
                                "panda": { options: ["对！pandas有小耳朵", "不对，耳朵不小"], correct: "对！pandas有小耳朵" },
                                "horse": { options: ["对！horses有小耳朵", "不对，horses耳朵不小"], correct: "不对，horses耳朵不小" },
                                "dog":   { options: ["对！dogs有小耳朵", "不对，dogs耳朵不小"], correct: "不对，dogs耳朵不小" },
                                "cat":   { options: ["对！cats有小耳朵", "不对，cats耳朵不小"], correct: "不对，cats耳朵不小" }
                            }
                        },
                        chinese: "pandas有小耳朵"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "你想找有长腿的动物",
                        audio: "Those are horses. They have long legs.",
                        stepA: {
                            instruction: "听音频，告诉B你听到了什么动物",
                            question: "你听到了什么动物？",
                            options: ["horse", "panda", "dog", "rabbit"],
                            correct: "horse"
                        },
                        stepB: {
                            instruction: "你想看有长腿的动物，A听到的动物对吗？",
                            question: "这些动物有长腿吗？",
                            optionsMap: {
                                "horse":  { options: ["对！horses有长腿", "不对，腿不长"], correct: "对！horses有长腿" },
                                "panda":  { options: ["对！pandas有长腿", "不对，pandas腿不长"], correct: "不对，pandas腿不长" },
                                "dog":    { options: ["对！dogs有长腿", "不对，dogs腿不长"], correct: "不对，dogs腿不长" },
                                "rabbit": { options: ["对！rabbits有长腿", "不对，rabbits腿不长"], correct: "不对，rabbits腿不长" }
                            }
                        },
                        chinese: "horses有长腿"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "你想看可爱的动物",
                        audio: "These are pandas. They are lovely.",
                        stepA: {
                            instruction: "听音频，告诉B你听到了什么",
                            question: "你听到了什么动物？",
                            options: ["panda", "horse", "bear", "dog"],
                            correct: "panda"
                        },
                        stepB: {
                            instruction: "你想看可爱的动物，A听到的这些动物可爱吗？",
                            question: "这些动物可爱吗？",
                            optionsMap: {
                                "panda": { options: ["可爱！pandas很lovely", "不可爱"], correct: "可爱！pandas很lovely" },
                                "horse": { options: ["可爱！", "不太可爱，horses很strong"], correct: "不太可爱，horses很strong" },
                                "bear":  { options: ["可爱！", "不太可爱，bears很big"], correct: "不太可爱，bears很big" },
                                "dog":   { options: ["可爱！dogs很lovely", "不可爱"], correct: "可爱！dogs很lovely" }
                            }
                        },
                        chinese: "pandas很lovely"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "你想看棕色的动物",
                        audio: "Those are horses. They are brown.",
                        stepA: {
                            instruction: "听音频，这些是什么动物？",
                            question: "你听到了什么动物？",
                            options: ["horse", "panda", "dog", "cat"],
                            correct: "horse"
                        },
                        stepB: {
                            instruction: "你想看棕色的动物，A听到的对吗？",
                            question: "这些动物是棕色的吗？",
                            optionsMap: {
                                "horse": { options: ["对！horses是brown", "不是棕色的"], correct: "对！horses是brown" },
                                "panda": { options: ["对！pandas是brown", "不是，pandas是black and white"], correct: "不是，pandas是black and white" },
                                "dog":   { options: ["对！dogs是brown", "不一定，dogs颜色不固定"], correct: "不一定，dogs颜色不固定" },
                                "cat":   { options: ["对！cats是brown", "不是，cats不一定是brown"], correct: "不是，cats不一定是brown" }
                            }
                        },
                        chinese: "horses是brown"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "你想找爱吃草的动物",
                        audio: "Those are horses. They like grass.",
                        stepA: {
                            instruction: "听音频，这些是什么动物？",
                            question: "你听到了什么动物？",
                            options: ["horse", "panda", "cat", "bear"],
                            correct: "horse"
                        },
                        stepB: {
                            instruction: "你想找爱吃草的动物，A听到的对吗？",
                            question: "这些动物吃草吗？",
                            optionsMap: {
                                "horse": { options: ["对！horses吃grass", "不吃草"], correct: "对！horses吃grass" },
                                "panda": { options: ["对！pandas吃grass", "不对，pandas不主要吃grass"], correct: "不对，pandas不主要吃grass" },
                                "cat":   { options: ["对！cats吃grass", "不对，cats不吃grass"], correct: "不对，cats不吃grass" },
                                "bear":  { options: ["对！bears吃grass", "不对，bears不主要吃grass"], correct: "不对，bears不主要吃grass" }
                            }
                        },
                        chinese: "horses吃grass"
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
                        image: '<img src="assets/images/panda.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["panda", "horse", "dog", "cat"],
                            correct: "panda"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "panda": { options: ["熊猫","马","狗","猫"], correct: "熊猫" },
                                "horse": { options: ["马","熊猫","狗","猫"], correct: "马" },
                                "dog":   { options: ["狗","熊猫","马","猫"], correct: "狗" },
                                "cat":   { options: ["猫","熊猫","马","狗"], correct: "猫" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/horse.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["horse", "panda", "rabbit", "dog"],
                            correct: "horse"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "horse":  { options: ["马","熊猫","兔子","狗"], correct: "马" },
                                "panda":  { options: ["熊猫","马","兔子","狗"], correct: "熊猫" },
                                "rabbit": { options: ["兔子","马","熊猫","狗"], correct: "兔子" },
                                "dog":    { options: ["狗","马","熊猫","兔子"], correct: "狗" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/dog.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["dog", "cat", "bear", "panda"],
                            correct: "dog"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "dog":   { options: ["狗","猫","熊","熊猫"], correct: "狗" },
                                "cat":   { options: ["猫","狗","熊","熊猫"], correct: "猫" },
                                "bear":  { options: ["熊","狗","猫","熊猫"], correct: "熊" },
                                "panda": { options: ["熊猫","狗","猫","熊"], correct: "熊猫" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/cat.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["cat", "dog", "rabbit", "bird"],
                            correct: "cat"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "cat":    { options: ["猫","狗","兔子","鸟"], correct: "猫" },
                                "dog":    { options: ["狗","猫","兔子","鸟"], correct: "狗" },
                                "rabbit": { options: ["兔子","猫","狗","鸟"], correct: "兔子" },
                                "bird":   { options: ["鸟","猫","狗","兔子"], correct: "鸟" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/bear.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["bear", "horse", "dog", "panda"],
                            correct: "bear"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "bear":  { options: ["熊","马","狗","熊猫"], correct: "熊" },
                                "horse": { options: ["马","熊","狗","熊猫"], correct: "马" },
                                "dog":   { options: ["狗","熊","马","熊猫"], correct: "狗" },
                                "panda": { options: ["熊猫","熊","马","狗"], correct: "熊猫" }
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
                            { word: "panda", match: '<img src="assets/images/panda.png" width="50">', chinese: "熊猫" },
                            { word: "horse", match: '<img src="assets/images/horse.png" width="50">', chinese: "马" },
                            { word: "dog", match: '<img src="assets/images/dog.png" width="50">', chinese: "狗" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "cat", match: '<img src="assets/images/cat.png" width="50">', chinese: "猫" },
                            { word: "rabbit", match: '<img src="assets/images/rabbit.png" width="50">', chinese: "兔子" },
                            { word: "bear", match: '<img src="assets/images/bear.png" width="50">', chinese: "熊" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "dog", match: '<img src="assets/images/dog.png" width="50">', chinese: "狗" },
                            { word: "panda", match: '<img src="assets/images/panda.png" width="50">', chinese: "熊猫" },
                            { word: "bird", match: '<img src="assets/images/bird.png" width="50">', chinese: "鸟" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "horse", match: '<img src="assets/images/horse.png" width="50">', chinese: "马" },
                            { word: "cat", match: '<img src="assets/images/cat.png" width="50">', chinese: "猫" },
                            { word: "rabbit", match: '<img src="assets/images/rabbit.png" width="50">', chinese: "兔子" },
                            { word: "bear", match: '<img src="assets/images/bear.png" width="50">', chinese: "熊" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "panda", match: '<img src="assets/images/panda.png" width="50">', chinese: "熊猫" },
                            { word: "dog", match: '<img src="assets/images/dog.png" width="50">', chinese: "狗" },
                            { word: "cat", match: '<img src="assets/images/cat.png" width="50">', chinese: "猫" },
                            { word: "horse", match: '<img src="assets/images/horse.png" width="50">', chinese: "马" }
                        ]
                    }
                ]
            },

            // ── 站点3：句意接力（medium）──
            {
                id: 3, name: "句意接力", icon: "📝",
                difficulty: "medium",
                theoryTags: ["CLT", "SLA"],
                description: "A看图选英文句子，B选中文意思",
                questions: [
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/panda.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "These are pandas.", value: "These are pandas." },
                                { html: "Those are horses.", value: "Those are horses." },
                                { html: "These are dogs.", value: "These are dogs." },
                                { html: "Those are cats.", value: "Those are cats." }
                            ],
                            correct: "These are pandas."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "These are pandas.": { options: ["这些是熊猫。", "那些是马。", "这些是狗。", "那些是猫。"], correct: "这些是熊猫。" },
                                "Those are horses.": { options: ["那些是马。", "这些是熊猫。", "这些是狗。", "那些是猫。"], correct: "那些是马。" },
                                "These are dogs.":   { options: ["这些是狗。", "这些是熊猫。", "那些是马。", "那些是猫。"], correct: "这些是狗。" },
                                "Those are cats.":   { options: ["那些是猫。", "这些是熊猫。", "那些是马。", "这些是狗。"], correct: "那些是猫。" }
                            }
                        },
                        chinese: "pandas=熊猫"
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/horse.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "Those are horses.", value: "Those are horses." },
                                { html: "These are pandas.", value: "These are pandas." },
                                { html: "These are dogs.", value: "These are dogs." },
                                { html: "Those are bears.", value: "Those are bears." }
                            ],
                            correct: "Those are horses."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Those are horses.": { options: ["那些是马。", "这些是熊猫。", "这些是狗。", "那些是熊。"], correct: "那些是马。" },
                                "These are pandas.": { options: ["这些是熊猫。", "那些是马。", "这些是狗。", "那些是熊。"], correct: "这些是熊猫。" },
                                "These are dogs.":   { options: ["这些是狗。", "那些是马。", "这些是熊猫。", "那些是熊。"], correct: "这些是狗。" },
                                "Those are bears.":  { options: ["那些是熊。", "那些是马。", "这些是熊猫。", "这些是狗。"], correct: "那些是熊。" }
                            }
                        },
                        chinese: "horses=马"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/dog.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "These are dogs.", value: "These are dogs." },
                                { html: "Those are cats.", value: "Those are cats." },
                                { html: "These are rabbits.", value: "These are rabbits." },
                                { html: "Those are birds.", value: "Those are birds." }
                            ],
                            correct: "These are dogs."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "These are dogs.":    { options: ["这些是狗。", "那些是猫。", "这些是兔子。", "那些是鸟。"], correct: "这些是狗。" },
                                "Those are cats.":    { options: ["那些是猫。", "这些是狗。", "这些是兔子。", "那些是鸟。"], correct: "那些是猫。" },
                                "These are rabbits.": { options: ["这些是兔子。", "这些是狗。", "那些是猫。", "那些是鸟。"], correct: "这些是兔子。" },
                                "Those are birds.":   { options: ["那些是鸟。", "这些是狗。", "那些是猫。", "这些是兔子。"], correct: "那些是鸟。" }
                            }
                        },
                        chinese: "dogs=狗"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/panda.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "They have small ears.", value: "They have small ears." },
                                { html: "They have long legs.", value: "They have long legs." },
                                { html: "They have big ears.", value: "They have big ears." },
                                { html: "They have black eyes.", value: "They have black eyes." }
                            ],
                            correct: "They have small ears."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "They have small ears.": { options: ["它们有小耳朵。", "它们有长腿。", "它们有大耳朵。", "它们有黑眼睛。"], correct: "它们有小耳朵。" },
                                "They have long legs.":  { options: ["它们有长腿。", "它们有小耳朵。", "它们有大耳朵。", "它们有黑眼睛。"], correct: "它们有长腿。" },
                                "They have big ears.":   { options: ["它们有大耳朵。", "它们有小耳朵。", "它们有长腿。", "它们有黑眼睛。"], correct: "它们有大耳朵。" },
                                "They have black eyes.": { options: ["它们有黑眼睛。", "它们有小耳朵。", "它们有长腿。", "它们有大耳朵。"], correct: "它们有黑眼睛。" }
                            }
                        },
                        chinese: "panda有小耳朵"
                    },
                    {
                        type: "coop_word_relay", difficulty: "hard",
                        image: '<img src="assets/images/horse.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "Those are horses. They have long legs.", value: "Those are horses. They have long legs." },
                                { html: "These are pandas. They have small ears.", value: "These are pandas. They have small ears." },
                                { html: "These are dogs. They are white.", value: "These are dogs. They are white." },
                                { html: "Those are cats. They are lovely.", value: "Those are cats. They are lovely." }
                            ],
                            correct: "Those are horses. They have long legs."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Those are horses. They have long legs.":   { options: ["那些是马。它们有长腿。", "这些是熊猫。它们有小耳朵。", "这些是狗。它们是白色的。", "那些是猫。它们很可爱。"], correct: "那些是马。它们有长腿。" },
                                "These are pandas. They have small ears.":  { options: ["这些是熊猫。它们有小耳朵。", "那些是马。它们有长腿。", "这些是狗。它们是白色的。", "那些是猫。它们很可爱。"], correct: "这些是熊猫。它们有小耳朵。" },
                                "These are dogs. They are white.":          { options: ["这些是狗。它们是白色的。", "那些是马。它们有长腿。", "这些是熊猫。它们有小耳朵。", "那些是猫。它们很可爱。"], correct: "这些是狗。它们是白色的。" },
                                "Those are cats. They are lovely.":         { options: ["那些是猫。它们很可爱。", "那些是马。它们有长腿。", "这些是熊猫。它们有小耳朵。", "这些是狗。它们是白色的。"], correct: "那些是猫。它们很可爱。" }
                            }
                        },
                        chinese: "horses有长腿"
                    }
                ]
            },

            // ── 站点4：情境阅读（Problem-based）──
            {
                id: 4, name: "情境阅读", icon: "🔍",
                difficulty: "hard",
                theoryTags: ["Problem-based", "Constructivism"],
                description: "A读描述，B根据描述找动物",
                questions: [
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜是什么动物？",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "They have small ears. They are black and white.",
                            question: "这些动物有什么特点？",
                            options: ["小耳朵，黑白色", "长腿，棕色", "大耳朵，白色", "小耳朵，棕色"],
                            correct: "小耳朵，黑白色"
                        },
                        stepB: {
                            instruction: "根据A的描述，选正确的动物",
                            optionsMap: {
                                "小耳朵，黑白色": { options: [
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'dog', value: "dog" },
                                    { html: 'cat', value: "cat" }
                                ], correct: "panda" },
                                "长腿，棕色": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'dog', value: "dog" },
                                    { html: 'bear', value: "bear" }
                                ], correct: "horse" },
                                "大耳朵，白色": { options: [
                                    { html: 'dog', value: "dog" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'cat', value: "cat" }
                                ], correct: "dog" },
                                "小耳朵，棕色": { options: [
                                    { html: 'bear', value: "bear" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'dog', value: "dog" }
                                ], correct: "bear" }
                            }
                        },
                        chinese: "小耳朵，黑白色→panda"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜是什么动物？",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "They have long legs. They like grass.",
                            question: "这些动物有什么特点？",
                            options: ["长腿，吃草", "小耳朵，可爱", "大耳朵，白色", "长腿，可爱"],
                            correct: "长腿，吃草"
                        },
                        stepB: {
                            instruction: "根据A的描述，选正确的动物",
                            optionsMap: {
                                "长腿，吃草": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'dog', value: "dog" },
                                    { html: 'cat', value: "cat" }
                                ], correct: "horse" },
                                "小耳朵，可爱": { options: [
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'dog', value: "dog" },
                                    { html: 'rabbit', value: "rabbit" }
                                ], correct: "panda" },
                                "大耳朵，白色": { options: [
                                    { html: 'dog', value: "dog" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'cat', value: "cat" }
                                ], correct: "dog" },
                                "长腿，可爱": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'dog', value: "dog" }
                                ], correct: "horse" }
                            }
                        },
                        chinese: "长腿，吃草→horse"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜是什么动物？",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "These are pandas. They are lovely.",
                            question: "这段话在说什么动物？",
                            options: ["熊猫", "马", "狗", "猫"],
                            correct: "熊猫"
                        },
                        stepB: {
                            instruction: "根据A选的中文，找正确的英文动物",
                            optionsMap: {
                                "熊猫": { options: [
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'dog', value: "dog" },
                                    { html: 'cat', value: "cat" }
                                ], correct: "panda" },
                                "马": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'dog', value: "dog" },
                                    { html: 'bear', value: "bear" }
                                ], correct: "horse" },
                                "狗": { options: [
                                    { html: 'dog', value: "dog" },
                                    { html: 'cat', value: "cat" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "dog" },
                                "猫": { options: [
                                    { html: 'cat', value: "cat" },
                                    { html: 'dog', value: "dog" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "cat" }
                            }
                        },
                        chinese: "These are pandas. They are lovely.→panda"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜是什么动物？",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Those are horses. They are brown.",
                            question: "这段话在说什么动物？",
                            options: ["马", "熊猫", "狗", "熊"],
                            correct: "马"
                        },
                        stepB: {
                            instruction: "根据A选的中文，找正确的英文动物",
                            optionsMap: {
                                "马": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'dog', value: "dog" },
                                    { html: 'bear', value: "bear" }
                                ], correct: "horse" },
                                "熊猫": { options: [
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'dog', value: "dog" },
                                    { html: 'cat', value: "cat" }
                                ], correct: "panda" },
                                "狗": { options: [
                                    { html: 'dog', value: "dog" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'cat', value: "cat" }
                                ], correct: "dog" },
                                "熊": { options: [
                                    { html: 'bear', value: "bear" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'dog', value: "dog" }
                                ], correct: "bear" }
                            }
                        },
                        chinese: "Those are horses. They are brown.→horse"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜是什么动物？",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "They have big ears. They are cute.",
                            question: "这些动物有什么特点？",
                            options: ["大耳朵，可爱", "小耳朵，可爱", "长腿，棕色", "大耳朵，棕色"],
                            correct: "大耳朵，可爱"
                        },
                        stepB: {
                            instruction: "根据A的描述，选正确的动物",
                            optionsMap: {
                                "大耳朵，可爱": { options: [
                                    { html: 'dog', value: "dog" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'cat', value: "cat" }
                                ], correct: "dog" },
                                "小耳朵，可爱": { options: [
                                    { html: 'panda', value: "panda" },
                                    { html: 'dog', value: "dog" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'cat', value: "cat" }
                                ], correct: "panda" },
                                "长腿，棕色": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'dog', value: "dog" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'bear', value: "bear" }
                                ], correct: "horse" },
                                "大耳朵，棕色": { options: [
                                    { html: 'dog', value: "dog" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'bear', value: "bear" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "dog" }
                            }
                        },
                        chinese: "大耳朵，可爱→dog"
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
                        sentence: "These are pandas.",
                        stepA: { words: ["These", "are"], instruction: "选前半句的词" },
                        stepB: { words: ["pandas."], instruction: "选后半句的词" },
                        chinese: "这些是熊猫。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "Those are horses.",
                        stepA: { words: ["Those", "are"], instruction: "选前半句的词" },
                        stepB: { words: ["horses."], instruction: "选后半句的词" },
                        chinese: "那些是马。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "These are dogs.",
                        stepA: { words: ["These", "are"], instruction: "选前半句的词" },
                        stepB: { words: ["dogs."], instruction: "选后半句的词" },
                        chinese: "这些是狗。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "They are lovely.",
                        stepA: { words: ["They", "are"], instruction: "选前半句的词" },
                        stepB: { words: ["lovely."], instruction: "选后半句的词" },
                        chinese: "它们很可爱。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "They have small ears.",
                        stepA: { words: ["They", "have"], instruction: "选前半句的词" },
                        stepB: { words: ["small", "ears."], instruction: "选后半句的词" },
                        chinese: "它们有小耳朵。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "They have long legs.",
                        stepA: { words: ["They", "have"], instruction: "选前半句的词" },
                        stepB: { words: ["long", "legs."], instruction: "选后半句的词" },
                        chinese: "它们有长腿。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "These are pandas. They are lovely.",
                        stepA: { words: ["These", "are", "pandas."], instruction: "排好第一句" },
                        stepB: { words: ["They", "are", "lovely."], instruction: "排好第二句" },
                        chinese: "这些是熊猫。它们很可爱。"
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
                        template: "These are ___. They are ___.",
                        image: '<img src="assets/images/panda.png" width="70">',
                        stepA: { blank: 1, options: ["pandas", "horses", "dogs", "cats"], correct: "pandas", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["lovely", "brown", "white", "big"], correct: "lovely", instruction: "pandas是什么样的？填第2个空" },
                        chinese: "These are pandas. They are lovely."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "Those are ___. They have long ___.",
                        image: '<img src="assets/images/horse.png" width="70">',
                        stepA: { blank: 1, options: ["horses", "pandas", "dogs", "rabbits"], correct: "horses", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["legs", "ears", "eyes", "arms"], correct: "legs", instruction: "horses有什么特点？填第2个空" },
                        chinese: "Those are horses. They have long legs."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "These are ___. They have big ___.",
                        image: '<img src="assets/images/dog.png" width="70">',
                        stepA: { blank: 1, options: ["dogs", "cats", "pandas", "bears"], correct: "dogs", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["ears", "legs", "eyes", "arms"], correct: "ears", instruction: "dogs有什么特点？填第2个空" },
                        chinese: "These are dogs. They have big ears."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "Those are ___. They are ___.",
                        image: '<img src="assets/images/horse.png" width="70">',
                        stepA: { blank: 1, options: ["horses", "pandas", "cats", "birds"], correct: "horses", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["brown", "white", "lovely", "cute"], correct: "brown", instruction: "horses是什么颜色？填第2个空" },
                        chinese: "Those are horses. They are brown."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "These are ___. They have black ___.",
                        image: '<img src="assets/images/panda.png" width="70">',
                        stepA: { blank: 1, options: ["pandas", "dogs", "cats", "bears"], correct: "pandas", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["eyes", "ears", "legs", "arms"], correct: "eyes", instruction: "课本里说'They have black eyes.'（熊猫有黑色的眼睛）。填第2个空" },
                        chinese: "These are pandas. They have black eyes."
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
                        word: "panda",
                        image: '<img src="assets/images/panda.png" width="60">',
                        stepA: { letters: ["p", "a", "n"], distractors: ["b", "e"], instruction: "拼前半：p____" },
                        stepB: { letters: ["d", "a"], distractors: ["t", "o"], instruction: "拼后半：___da" },
                        chinese: "熊猫"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "horse",
                        image: '<img src="assets/images/horse.png" width="60">',
                        stepA: { letters: ["h", "o", "r"], distractors: ["a", "u"], instruction: "拼前半：h____" },
                        stepB: { letters: ["s", "e"], distractors: ["t", "n"], instruction: "拼后半：___se" },
                        chinese: "马"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "dog",
                        image: '<img src="assets/images/dog.png" width="60">',
                        stepA: { letters: ["d"], distractors: ["b", "p"], instruction: "拼前半：d__" },
                        stepB: { letters: ["o", "g"], distractors: ["a", "t"], instruction: "拼后半：_og" },
                        chinese: "狗"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "cat",
                        image: '<img src="assets/images/cat.png" width="60">',
                        stepA: { letters: ["c"], distractors: ["k", "s"], instruction: "拼前半：c__" },
                        stepB: { letters: ["a", "t"], distractors: ["o", "n"], instruction: "拼后半：_at" },
                        chinese: "猫"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "rabbit",
                        image: '<img src="assets/images/rabbit.png" width="60">',
                        stepA: { letters: ["r", "a", "b"], distractors: ["e", "o"], instruction: "拼前半：r_____" },
                        stepB: { letters: ["b", "i", "t"], distractors: ["n", "d"], instruction: "拼后半：___bit" },
                        chinese: "兔子"
                    }
                ]
            },

            // ── 站点4：情境写作（Problem-based）──
            {
                id: 4, name: "情境写作", icon: "💌",
                difficulty: "hard",
                theoryTags: ["Problem-based", "Project"],
                description: "A选动物，B写描述，合作完成动物介绍",
                questions: [
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "给动物园做一张动物群介绍卡",
                        stepA: {
                            instruction: "选一种动物做卡片",
                            options: [
                                { html: 'panda', value: "panda" },
                                { html: 'horse', value: "horse" },
                                { html: 'dog', value: "dog" },
                                { html: 'cat', value: "cat" }
                            ]
                        },
                        stepB: {
                            instruction: "给A选的动物写一句介绍",
                            optionsMap: {
                                "panda": { options: ["These are pandas. They are lovely.", "Those are horses. They are brown.", "These are dogs. They are white.", "Those are cats. They are cute."], correct: "These are pandas. They are lovely." },
                                "horse": { options: ["Those are horses. They have long legs.", "These are pandas. They have small ears.", "These are dogs. They have big ears.", "Those are cats. They are lovely."], correct: "Those are horses. They have long legs." },
                                "dog":   { options: ["These are dogs. They have big ears.", "Those are horses. They are brown.", "These are pandas. They are lovely.", "Those are cats. They are cute."], correct: "These are dogs. They have big ears." },
                                "cat":   { options: ["Those are cats. They are cute.", "These are pandas. They are lovely.", "Those are horses. They are brown.", "These are dogs. They have big ears."], correct: "Those are cats. They are cute." }
                            }
                        },
                        chinese: "做动物群介绍卡"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "给朋友介绍你在动物园看到的一群动物",
                        stepA: {
                            instruction: "你看到了什么动物？用These/Those开头",
                            options: ["These are pandas.", "Those are horses.", "These are dogs.", "Those are bears."]
                        },
                        stepB: {
                            instruction: "给A看到的动物加一句描述",
                            optionsMap: {
                                "These are pandas.": { options: ["They have small ears.", "They have long legs.", "They are brown.", "They are white."], correct: "They have small ears." },
                                "Those are horses.": { options: ["They have long legs.", "They have small ears.", "They are lovely.", "They are white."], correct: "They have long legs." },
                                "These are dogs.":   { options: ["They have big ears.", "They have small ears.", "They have long legs.", "They are brown."], correct: "They have big ears." },
                                "Those are bears.":  { options: ["They are big.", "They have long legs.", "They are lovely.", "They are white."], correct: "They are big." }
                            }
                        },
                        chinese: "介绍一群动物"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "帮动物园写一块动物展示牌",
                        stepA: {
                            instruction: "选一组动物写展示牌",
                            options: [
                                { html: 'panda', value: "panda" },
                                { html: 'horse', value: "horse" },
                                { html: 'dog', value: "dog" },
                                { html: 'rabbit', value: "rabbit" }
                            ]
                        },
                        stepB: {
                            instruction: "给A选的动物选一句最有代表性的特征（熊猫→黑眼睛，马→爱吃草，狗→大耳朵，兔子→可爱）",
                            optionsMap: {
                                "panda":  { options: ["They have black eyes.", "They have long legs.", "They have big ears.", "They are brown."], correct: "They have black eyes." },
                                "horse":  { options: ["They like grass.", "They have small ears.", "They are lovely.", "They have black eyes."], correct: "They like grass." },
                                "dog":    { options: ["They have big ears.", "They have long legs.", "They have black eyes.", "They like grass."], correct: "They have big ears." },
                                "rabbit": { options: ["They are cute.", "They have long legs.", "They like grass.", "They are brown."], correct: "They are cute." }
                            }
                        },
                        chinese: "写动物展示牌"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "告诉小朋友这些动物是什么颜色",
                        stepA: {
                            instruction: "选一组动物",
                            options: ["These are pandas.", "Those are horses.", "These are dogs.", "Those are cats."]
                        },
                        stepB: {
                            instruction: "说说A选的动物是什么颜色（提示：熊猫→黑白色，马→棕色，课本里的狗→白色，课本里的猫→黑色）",
                            optionsMap: {
                                "These are pandas.": { options: ["They are black and white.", "They are brown.", "They are white.", "They are black."], correct: "They are black and white." },
                                "Those are horses.": { options: ["They are brown.", "They are black and white.", "They are white.", "They are black."], correct: "They are brown." },
                                "These are dogs.":   { options: ["They are white.", "They are brown.", "They are black and white.", "They are black."], correct: "They are white." },
                                "Those are cats.":   { options: ["They are black.", "They are brown.", "They are white.", "They are black and white."], correct: "They are black." }
                            }
                        },
                        chinese: "描述动物颜色"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "给妈妈发消息，说说你最喜欢的动物群",
                        stepA: {
                            instruction: "你最喜欢哪群动物？选一个开头",
                            options: ["These are pandas.", "Those are horses.", "These are dogs.", "Those are rabbits."]
                        },
                        stepB: {
                            instruction: "给A说的动物加一句描述（提示：熊猫→lovely，马→棕色brown，狗→cute，兔子→cute）",
                            optionsMap: {
                                "These are pandas.":  { options: ["They are lovely.", "They are brown.", "They have long legs.", "They like grass."], correct: "They are lovely." },
                                "Those are horses.":  { options: ["They are brown.", "They are lovely.", "They have small ears.", "They have black eyes."], correct: "They are brown." },
                                "These are dogs.":    { options: ["They are cute.", "They are brown.", "They have long legs.", "They have black eyes."], correct: "They are cute." },
                                "Those are rabbits.": { options: ["They are cute.", "They are brown.", "They have long legs.", "They like grass."], correct: "They are cute." }
                            }
                        },
                        chinese: "发消息介绍动物群"
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
                        type: "coop_read_relay", word: "panda", chinese: "熊猫", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "horse", chinese: "马", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "dog", chinese: "狗", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "cat", chinese: "猫", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "rabbit", chinese: "兔子", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "These are pandas.", chinese: "这些是熊猫。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "Those are horses.", chinese: "那些是马。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "They have small ears.", chinese: "它们有小耳朵。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "They have long legs.", chinese: "它们有长腿。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "They like grass.", chinese: "它们喜欢草。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    }
                ]
            },

            // ── 站点2：看图说话（medium）— 图片+句型框架+中文提示，没有音频 ──
            {
                id: 2, name: "看图说话", icon: "💬",
                difficulty: "medium",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "看图片和句型框架，说出完整句子",
                questions: [
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/panda.png" width="90">',
                        answer: "These are pandas",
                        chinese: "这些是熊猫",
                        stepA: {
                            instruction: "看图片，说出完整句子：These are _____.",
                            expected: "These are pandas",
                            chinese: "这些是熊猫"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：These are _____.",
                            expected: "These are pandas",
                            chinese: "这些是熊猫"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/horse.png" width="90">',
                        answer: "Those are horses",
                        chinese: "那些是马",
                        stepA: {
                            instruction: "看图片，说出完整句子：Those are _____.",
                            expected: "Those are horses",
                            chinese: "那些是马"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Those are _____.",
                            expected: "Those are horses",
                            chinese: "那些是马"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/dog.png" width="90">',
                        answer: "These are dogs",
                        chinese: "这些是狗",
                        stepA: {
                            instruction: "看图片，说出完整句子：These are _____.",
                            expected: "These are dogs",
                            chinese: "这些是狗"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：These are _____.",
                            expected: "These are dogs",
                            chinese: "这些是狗"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/panda.png" width="90">',
                        answer: "They have small ears",
                        chinese: "它们有小耳朵",
                        stepA: {
                            instruction: "看图片，说出完整句子：They have _____ ears.",
                            expected: "They have small ears",
                            chinese: "它们有小耳朵"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：They have _____ ears.",
                            expected: "They have small ears",
                            chinese: "它们有小耳朵"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/horse.png" width="90">',
                        answer: "They have long legs",
                        chinese: "它们有长腿",
                        stepA: {
                            instruction: "看图片，说出完整句子：They have _____ legs.",
                            expected: "They have long legs",
                            chinese: "它们有长腿"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：They have _____ legs.",
                            expected: "They have long legs",
                            chinese: "它们有长腿"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/cat.png" width="90">',
                        answer: "These are cats",
                        chinese: "这些是猫",
                        stepA: {
                            instruction: "看图片，说出完整句子：These are _____.",
                            expected: "These are cats",
                            chinese: "这些是猫"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：These are _____.",
                            expected: "These are cats",
                            chinese: "这些是猫"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        answer: "These are rabbits",
                        chinese: "这些是兔子",
                        stepA: {
                            instruction: "看图片，说出完整句子：These are _____.",
                            expected: "These are rabbits",
                            chinese: "这些是兔子"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：These are _____.",
                            expected: "These are rabbits",
                            chinese: "这些是兔子"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/panda.png" width="90">',
                        answer: "They have black eyes",
                        chinese: "它们有黑眼睛",
                        stepA: {
                            instruction: "看图片，说出完整句子：They have _____ eyes.",
                            expected: "They have black eyes",
                            chinese: "它们有黑眼睛"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：They have _____ eyes.",
                            expected: "They have black eyes",
                            chinese: "它们有黑眼睛"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/horse.png" width="90">',
                        answer: "They are brown",
                        chinese: "它们是棕色的",
                        stepA: {
                            instruction: "看图片，说出完整句子：They are _____.",
                            expected: "They are brown",
                            chinese: "它们是棕色的"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：They are _____.",
                            expected: "They are brown",
                            chinese: "它们是棕色的"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/panda.png" width="90">',
                        answer: "They are lovely",
                        chinese: "它们很可爱",
                        stepA: {
                            instruction: "看图片，说出完整句子：They are _____.",
                            expected: "They are lovely",
                            chinese: "它们很可爱"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：They are _____.",
                            expected: "They are lovely",
                            chinese: "它们很可爱"
                        }
                    }
                ]
            },

            // ── 站点3：合作对话（hard）— 完整示范句+中文，AB说不同的话 ──
            {
                id: 3, name: "合作对话", icon: "🗣️",
                difficulty: "hard",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A介绍动物，B描述特征，合作完成对话",
                questions: [
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "看图介绍动物",
                        image: '<img src="assets/images/panda.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这些动物",
                            role: "介绍者",
                            line: "These are pandas",
                            chinese: "这些是熊猫。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它们的特点",
                            role: "描述者",
                            line: "They are lovely",
                            chinese: "它们很可爱。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "看图介绍动物",
                        image: '<img src="assets/images/horse.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这些动物",
                            role: "介绍者",
                            line: "Those are horses",
                            chinese: "那些是马。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它们的特点",
                            role: "描述者",
                            line: "They have long legs",
                            chinese: "它们有长腿。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "看图介绍动物",
                        image: '<img src="assets/images/dog.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这些动物",
                            role: "介绍者",
                            line: "These are dogs",
                            chinese: "这些是狗。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它们的特点",
                            role: "描述者",
                            line: "They have big ears",
                            chinese: "它们有大耳朵。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "看图介绍动物",
                        image: '<img src="assets/images/panda.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这些动物",
                            role: "介绍者",
                            line: "They have small ears",
                            chinese: "它们有小耳朵。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它们的特点",
                            role: "描述者",
                            line: "They have black eyes",
                            chinese: "它们有黑眼睛。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "看图介绍动物",
                        image: '<img src="assets/images/horse.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这些动物",
                            role: "介绍者",
                            line: "Those are horses",
                            chinese: "那些是马。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它们的特点",
                            role: "描述者",
                            line: "They like grass",
                            chinese: "它们喜欢草。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "看图介绍动物",
                        image: '<img src="assets/images/dog.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这些动物",
                            role: "介绍者",
                            line: "These are dogs",
                            chinese: "这些是狗。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它们的特点",
                            role: "描述者",
                            line: "They are cute",
                            chinese: "它们很可爱。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "看图介绍动物",
                        image: '<img src="assets/images/cat.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这些动物",
                            role: "介绍者",
                            line: "These are cats",
                            chinese: "这些是猫。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它们的特点",
                            role: "描述者",
                            line: "They are lovely",
                            chinese: "它们很可爱。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "看图介绍动物",
                        image: '<img src="assets/images/panda.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这些动物",
                            role: "介绍者",
                            line: "These are pandas",
                            chinese: "这些是熊猫。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它们的特点",
                            role: "描述者",
                            line: "They are black and white",
                            chinese: "它们是黑白色的。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "看图介绍动物",
                        image: '<img src="assets/images/horse.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这些动物",
                            role: "介绍者",
                            line: "Those are horses",
                            chinese: "那些是马。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它们的特点",
                            role: "描述者",
                            line: "They are brown",
                            chinese: "它们是棕色的。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "看图介绍动物",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这些动物",
                            role: "介绍者",
                            line: "These are rabbits",
                            chinese: "这些是兔子。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它们的特点",
                            role: "描述者",
                            line: "They are cute",
                            chinese: "它们很可爱。"
                        }
                    }
                ]
            }
        ]
    }
};

// 导出（兼容直接 script 引入）
if (typeof window !== 'undefined') {
    window.u1l2_coop = u1l2_coop;
}
