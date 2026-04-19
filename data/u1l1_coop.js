/**
 * U1L1 合作冒险题库 — This is a bear.
 * 主题：动物 Animals
 * 词汇：bear, horse, bird, panda, rabbit
 * 句型：This is a ___. / That is a ___. / It's big/cute. / It can run fast.
 *
 * 每道题拆成 stepA（蓝色）→ stepB（橙色），B依赖A的结果
 * 知识点清单：docs/知识点清单_U1L1.md
 */

var u1l1_coop = {
    id: "U1L1",
    title: "This is a bear.",
    theme: "animals",

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
                        type: "coop_listen_relay", audio: "bear", chinese: "熊", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/bear.png" width="70">', value: "bear" },
                                { html: '<img src="assets/images/horse.png" width="70">', value: "horse" },
                                { html: '<img src="assets/images/bird.png" width="70">', value: "bird" },
                                { html: '<img src="assets/images/panda.png" width="70">', value: "panda" }
                            ],
                            correct: "bear"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "bear":  { options: ["熊","马","鸟","熊猫"], correct: "熊" },
                                "horse": { options: ["马","熊","鸟","熊猫"], correct: "马" },
                                "bird":  { options: ["鸟","熊","马","熊猫"], correct: "鸟" },
                                "panda": { options: ["熊猫","熊","马","鸟"], correct: "熊猫" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "horse", chinese: "马", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/horse.png" width="70">', value: "horse" },
                                { html: '<img src="assets/images/bear.png" width="70">', value: "bear" },
                                { html: '<img src="assets/images/rabbit.png" width="70">', value: "rabbit" },
                                { html: '<img src="assets/images/bird.png" width="70">', value: "bird" }
                            ],
                            correct: "horse"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "horse":  { options: ["马","熊","兔子","鸟"], correct: "马" },
                                "bear":   { options: ["熊","马","兔子","鸟"], correct: "熊" },
                                "rabbit": { options: ["兔子","马","熊","鸟"], correct: "兔子" },
                                "bird":   { options: ["鸟","马","熊","兔子"], correct: "鸟" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "bird", chinese: "鸟", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/bird.png" width="70">', value: "bird" },
                                { html: '<img src="assets/images/rabbit.png" width="70">', value: "rabbit" },
                                { html: '<img src="assets/images/panda.png" width="70">', value: "panda" },
                                { html: '<img src="assets/images/duck.png" width="70">', value: "duck" }
                            ],
                            correct: "bird"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "bird":   { options: ["鸟","兔子","熊猫","鸭子"], correct: "鸟" },
                                "rabbit": { options: ["兔子","鸟","熊猫","鸭子"], correct: "兔子" },
                                "panda":  { options: ["熊猫","鸟","兔子","鸭子"], correct: "熊猫" },
                                "duck":   { options: ["鸭子","鸟","兔子","熊猫"], correct: "鸭子" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "panda", chinese: "熊猫", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/panda.png" width="70">', value: "panda" },
                                { html: '<img src="assets/images/rabbit.png" width="70">', value: "rabbit" },
                                { html: '<img src="assets/images/bear.png" width="70">', value: "bear" },
                                { html: '<img src="assets/images/horse.png" width="70">', value: "horse" }
                            ],
                            correct: "panda"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "panda":  { options: ["熊猫","兔子","熊","马"], correct: "熊猫" },
                                "rabbit": { options: ["兔子","熊猫","熊","马"], correct: "兔子" },
                                "bear":   { options: ["熊","熊猫","兔子","马"], correct: "熊" },
                                "horse":  { options: ["马","熊猫","兔子","熊"], correct: "马" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "rabbit", chinese: "兔子", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/rabbit.png" width="70">', value: "rabbit" },
                                { html: '<img src="assets/images/horse.png" width="70">', value: "horse" },
                                { html: '<img src="assets/images/bird.png" width="70">', value: "bird" },
                                { html: '<img src="assets/images/monkey.png" width="70">', value: "monkey" }
                            ],
                            correct: "rabbit"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "rabbit": { options: ["兔子","马","鸟","猴子"], correct: "兔子" },
                                "horse":  { options: ["马","兔子","鸟","猴子"], correct: "马" },
                                "bird":   { options: ["鸟","兔子","马","猴子"], correct: "鸟" },
                                "monkey": { options: ["猴子","兔子","马","鸟"], correct: "猴子" }
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
                        type: "coop_listen_judge", audio: "bear", difficulty: "easy",
                        image: '<img src="assets/images/bear.png" width="90">',
                        isMatch: true, chinese: "熊",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/bear.png" width="60">', value: "bear" },
                                { html: '<img src="assets/images/horse.png" width="60">', value: "horse" },
                                { html: '<img src="assets/images/panda.png" width="60">', value: "panda" },
                                { html: '<img src="assets/images/bird.png" width="60">', value: "bird" }
                            ],
                            correct: "bear"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "panda", difficulty: "easy",
                        image: '<img src="assets/images/bear.png" width="90">',
                        isMatch: false, chinese: "熊猫",
                        correctImage: '<img src="assets/images/panda.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/panda.png" width="60">', value: "panda" },
                                { html: '<img src="assets/images/bear.png" width="60">', value: "bear" },
                                { html: '<img src="assets/images/bird.png" width="60">', value: "bird" },
                                { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" }
                            ],
                            correct: "panda"
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
                                { html: '<img src="assets/images/bird.png" width="60">', value: "bird" },
                                { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" },
                                { html: '<img src="assets/images/duck.png" width="60">', value: "duck" }
                            ],
                            correct: "horse"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "bird", difficulty: "medium",
                        image: '<img src="assets/images/panda.png" width="90">',
                        isMatch: false, chinese: "鸟",
                        correctImage: '<img src="assets/images/bird.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/bird.png" width="60">', value: "bird" },
                                { html: '<img src="assets/images/panda.png" width="60">', value: "panda" },
                                { html: '<img src="assets/images/bear.png" width="60">', value: "bear" },
                                { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" }
                            ],
                            correct: "bird"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "rabbit", difficulty: "medium",
                        image: '<img src="assets/images/horse.png" width="90">',
                        isMatch: false, chinese: "兔子",
                        correctImage: '<img src="assets/images/rabbit.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" },
                                { html: '<img src="assets/images/horse.png" width="60">', value: "horse" },
                                { html: '<img src="assets/images/bird.png" width="60">', value: "bird" },
                                { html: '<img src="assets/images/duck.png" width="60">', value: "duck" }
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
                        sequence: ["bear", "bird", "rabbit"],
                        words: [
                            { html: '<img src="assets/images/bear.png" width="60">', value: "bear" },
                            { html: '<img src="assets/images/bird.png" width="60">', value: "bird" },
                            { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" }
                        ],
                        chinese: "bear → bird → rabbit"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["horse", "panda", "bear"],
                        words: [
                            { html: '<img src="assets/images/horse.png" width="60">', value: "horse" },
                            { html: '<img src="assets/images/panda.png" width="60">', value: "panda" },
                            { html: '<img src="assets/images/bear.png" width="60">', value: "bear" }
                        ],
                        chinese: "horse → panda → bear"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["bird", "bear", "panda"],
                        words: [
                            { html: '<img src="assets/images/bird.png" width="55">', value: "bird" },
                            { html: '<img src="assets/images/bear.png" width="55">', value: "bear" },
                            { html: '<img src="assets/images/panda.png" width="55">', value: "panda" }
                        ],
                        chinese: "bird → bear → panda"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["horse", "rabbit", "bird"],
                        words: [
                            { html: '<img src="assets/images/horse.png" width="55">', value: "horse" },
                            { html: '<img src="assets/images/rabbit.png" width="55">', value: "rabbit" },
                            { html: '<img src="assets/images/bird.png" width="55">', value: "bird" }
                        ],
                        chinese: "horse → rabbit → bird"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["panda", "horse", "bird", "bear"],
                        words: [
                            { html: '<img src="assets/images/panda.png" width="50">', value: "panda" },
                            { html: '<img src="assets/images/horse.png" width="50">', value: "horse" },
                            { html: '<img src="assets/images/bird.png" width="50">', value: "bird" },
                            { html: '<img src="assets/images/bear.png" width="50">', value: "bear" }
                        ],
                        chinese: "panda → horse → bird → bear"
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
                        scenario: "你在动物园，想看一个很大的动物",
                        audio: "This is a bear. It's big.",
                        stepA: {
                            instruction: "听音频，告诉B你听到了什么动物",
                            question: "你听到了什么动物？",
                            options: ["bear", "bird", "rabbit", "horse"],
                            correct: "bear"
                        },
                        stepB: {
                            instruction: "A说听到了一个动物。你想看大的动物，选对吗？",
                            question: "这个动物大吗？适合去看吗？",
                            optionsMap: {
                                "bear":   { options: ["适合！bear很大", "不适合，太小了"], correct: "适合！bear很大" },
                                "bird":   { options: ["适合！bird很大", "不适合，bird很小"], correct: "不适合，bird很小" },
                                "rabbit": { options: ["适合！rabbit很大", "不适合，rabbit很小"], correct: "不适合，rabbit很小" }
                            }
                        },
                        chinese: "bear很大，适合看"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "你想找一个可爱的动物",
                        audio: "That is a panda. It's cute.",
                        stepA: {
                            instruction: "听音频，告诉B你听到了什么",
                            question: "你听到了什么动物？",
                            options: ["panda", "horse", "bear", "rabbit"],
                            correct: "panda"
                        },
                        stepB: {
                            instruction: "你想找可爱的动物，A听到的这个动物可爱吗？",
                            question: "这个动物可爱吗？",
                            optionsMap: {
                                "panda": { options: ["可爱！panda很cute", "不可爱"], correct: "可爱！panda很cute" },
                                "horse": { options: ["可爱！horse很cute", "不太可爱，horse很fast"], correct: "不太可爱，horse很fast" },
                                "bear":  { options: ["可爱！bear很cute", "不太可爱，bear很big"], correct: "不太可爱，bear很big" }
                            }
                        },
                        chinese: "panda很可爱"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "你想看跑得快的动物",
                        audio: "This is a horse. It can run fast.",
                        stepA: {
                            instruction: "听音频，这个动物跑得快吗？",
                            question: "你听到了什么动物？",
                            options: ["horse", "panda", "rabbit", "duck"],
                            correct: "horse"
                        },
                        stepB: {
                            instruction: "你想看跑得快的动物，A听到的这个行吗？",
                            question: "这个动物跑得快吗？",
                            optionsMap: {
                                "horse":  { options: ["跑得快！horse can run fast", "跑不快"], correct: "跑得快！horse can run fast" },
                                "panda":  { options: ["跑得快！", "跑不快，panda很慢"], correct: "跑不快，panda很慢" },
                                "rabbit": { options: ["跑得快！", "跑不快，rabbit跑得慢"], correct: "跑不快，rabbit跑得慢" }
                            }
                        },
                        chinese: "horse跑得快"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "你朋友想看会飞的动物",
                        audio: "Look! That is a bird. It can fly.",
                        stepA: {
                            instruction: "听音频，这是什么动物？",
                            question: "你听到了什么动物？",
                            options: ["bird", "bear", "horse", "panda"],
                            correct: "bird"
                        },
                        stepB: {
                            instruction: "你朋友想看会飞的动物。A听到的这个行吗？",
                            question: "这个动物会飞吗？",
                            optionsMap: {
                                "bird":  { options: ["会飞！bird can fly", "不会飞"], correct: "会飞！bird can fly" },
                                "bear":  { options: ["会飞！", "不会飞，bear不会飞"], correct: "不会飞，bear不会飞" },
                                "horse": { options: ["会飞！", "不会飞，horse不会飞"], correct: "不会飞，horse不会飞" }
                            }
                        },
                        chinese: "会飞的bird"
                    }
                ]
            },

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
                        image: '<img src="assets/images/bear.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["bear", "bird", "horse", "panda"],
                            correct: "bear"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "bear":  { options: ["熊","鸟","马","熊猫"], correct: "熊" },
                                "bird":  { options: ["鸟","熊","马","熊猫"], correct: "鸟" },
                                "horse": { options: ["马","熊","鸟","熊猫"], correct: "马" },
                                "panda": { options: ["熊猫","熊","鸟","马"], correct: "熊猫" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/horse.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["horse", "panda", "bird", "rabbit"],
                            correct: "horse"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "horse":  { options: ["马","熊猫","鸟","兔子"], correct: "马" },
                                "panda":  { options: ["熊猫","马","鸟","兔子"], correct: "熊猫" },
                                "bird":   { options: ["鸟","马","熊猫","兔子"], correct: "鸟" },
                                "rabbit": { options: ["兔子","马","熊猫","鸟"], correct: "兔子" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/panda.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["panda", "bear", "duck", "monkey"],
                            correct: "panda"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "panda":  { options: ["熊猫","熊","鸭子","猴子"], correct: "熊猫" },
                                "bear":   { options: ["熊","熊猫","鸭子","猴子"], correct: "熊" },
                                "duck":   { options: ["鸭子","熊猫","熊","猴子"], correct: "鸭子" },
                                "monkey": { options: ["猴子","熊猫","熊","鸭子"], correct: "猴子" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["rabbit", "bird", "bear", "panda"],
                            correct: "rabbit"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "rabbit": { options: ["兔子","鸟","熊","熊猫"], correct: "兔子" },
                                "bird":   { options: ["鸟","兔子","熊","熊猫"], correct: "鸟" },
                                "bear":   { options: ["熊","兔子","鸟","熊猫"], correct: "熊" },
                                "panda":  { options: ["熊猫","兔子","鸟","熊"], correct: "熊猫" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/bird.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["bird", "horse", "bear", "rabbit"],
                            correct: "bird"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "bird":   { options: ["鸟","马","熊","兔子"], correct: "鸟" },
                                "horse":  { options: ["马","鸟","熊","兔子"], correct: "马" },
                                "bear":   { options: ["熊","鸟","马","兔子"], correct: "熊" },
                                "rabbit": { options: ["兔子","鸟","马","熊"], correct: "兔子" }
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
                            { word: "bear", match: '<img src="assets/images/bear.png" width="50">', chinese: "熊" },
                            { word: "bird", match: '<img src="assets/images/bird.png" width="50">', chinese: "鸟" },
                            { word: "horse", match: '<img src="assets/images/horse.png" width="50">', chinese: "马" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "panda", match: '<img src="assets/images/panda.png" width="50">', chinese: "熊猫" },
                            { word: "horse", match: '<img src="assets/images/horse.png" width="50">', chinese: "马" },
                            { word: "rabbit", match: '<img src="assets/images/rabbit.png" width="50">', chinese: "兔子" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "bird", match: '<img src="assets/images/bird.png" width="50">', chinese: "鸟" },
                            { word: "bear", match: '<img src="assets/images/bear.png" width="50">', chinese: "熊" },
                            { word: "panda", match: '<img src="assets/images/panda.png" width="50">', chinese: "熊猫" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "rabbit", match: '<img src="assets/images/rabbit.png" width="50">', chinese: "兔子" },
                            { word: "horse", match: '<img src="assets/images/horse.png" width="50">', chinese: "马" },
                            { word: "bird", match: '<img src="assets/images/bird.png" width="50">', chinese: "鸟" },
                            { word: "panda", match: '<img src="assets/images/panda.png" width="50">', chinese: "熊猫" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "bear", match: '<img src="assets/images/bear.png" width="50">', chinese: "熊" },
                            { word: "rabbit", match: '<img src="assets/images/rabbit.png" width="50">', chinese: "兔子" },
                            { word: "horse", match: '<img src="assets/images/horse.png" width="50">', chinese: "马" },
                            { word: "bird", match: '<img src="assets/images/bird.png" width="50">', chinese: "鸟" }
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
                        image: '<img src="assets/images/bear.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "This is a bear.", value: "This is a bear." },
                                { html: "That is a bird.", value: "That is a bird." },
                                { html: "This is a horse.", value: "This is a horse." },
                                { html: "That is a panda.", value: "That is a panda." }
                            ],
                            correct: "This is a bear."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "This is a bear.": { options: ["这是一只熊。", "那是一只鸟。", "这是一匹马。", "那是一只熊猫。"], correct: "这是一只熊。" },
                                "That is a bird.": { options: ["那是一只鸟。", "这是一只熊。", "那是一只熊猫。", "这是一匹马。"], correct: "那是一只鸟。" },
                                "This is a horse.": { options: ["这是一匹马。", "这是一只熊。", "那是一只鸟。", "那是一只兔子。"], correct: "这是一匹马。" },
                                "That is a panda.": { options: ["那是一只熊猫。", "这是一只熊。", "那是一只鸟。", "这是一匹马。"], correct: "那是一只熊猫。" }
                            }
                        },
                        chinese: "bear=熊"
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/bird.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "That is a bird.", value: "That is a bird." },
                                { html: "This is a bear.", value: "This is a bear." },
                                { html: "This is a rabbit.", value: "This is a rabbit." },
                                { html: "That is a horse.", value: "That is a horse." }
                            ],
                            correct: "That is a bird."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "That is a bird.": { options: ["那是一只鸟。", "这是一只熊。", "这是一只兔子。", "那是一匹马。"], correct: "那是一只鸟。" },
                                "This is a bear.": { options: ["这是一只熊。", "那是一只鸟。", "那是一只熊猫。", "这是一匹马。"], correct: "这是一只熊。" },
                                "This is a rabbit.": { options: ["这是一只兔子。", "那是一只鸟。", "这是一只熊。", "那是一匹马。"], correct: "这是一只兔子。" },
                                "That is a horse.": { options: ["那是一匹马。", "这是一只熊。", "那是一只鸟。", "这是一只兔子。"], correct: "那是一匹马。" }
                            }
                        },
                        chinese: "bird=鸟"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "This is a rabbit.", value: "This is a rabbit." },
                                { html: "That is a panda.", value: "That is a panda." },
                                { html: "This is a bear.", value: "This is a bear." },
                                { html: "That is a bird.", value: "That is a bird." }
                            ],
                            correct: "This is a rabbit."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "This is a rabbit.": { options: ["这是一只兔子。", "那是一只熊猫。", "这是一只熊。", "那是一只鸟。"], correct: "这是一只兔子。" },
                                "That is a panda.": { options: ["那是一只熊猫。", "这是一只兔子。", "这是一只熊。", "那是一只鸟。"], correct: "那是一只熊猫。" },
                                "This is a bear.": { options: ["这是一只熊。", "这是一只兔子。", "那是一只熊猫。", "那是一匹马。"], correct: "这是一只熊。" },
                                "That is a bird.": { options: ["那是一只鸟。", "这是一只兔子。", "那是一只熊猫。", "这是一只熊。"], correct: "那是一只鸟。" }
                            }
                        },
                        chinese: "rabbit=兔子"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/horse.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "This is a horse.", value: "This is a horse." },
                                { html: "That is a bear.", value: "That is a bear." },
                                { html: "This is a rabbit.", value: "This is a rabbit." },
                                { html: "That is a duck.", value: "That is a duck." }
                            ],
                            correct: "This is a horse."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "This is a horse.": { options: ["这是一匹马。", "那是一只熊。", "这是一只兔子。", "那是一只鸭子。"], correct: "这是一匹马。" },
                                "That is a bear.": { options: ["那是一只熊。", "这是一匹马。", "这是一只兔子。", "那是一只鸭子。"], correct: "那是一只熊。" },
                                "This is a rabbit.": { options: ["这是一只兔子。", "这是一匹马。", "那是一只熊。", "那是一只鸭子。"], correct: "这是一只兔子。" },
                                "That is a duck.": { options: ["那是一只鸭子。", "这是一匹马。", "那是一只熊。", "这是一只兔子。"], correct: "那是一只鸭子。" }
                            }
                        },
                        chinese: "horse=马"
                    },
                    {
                        type: "coop_word_relay", difficulty: "hard",
                        image: '<img src="assets/images/panda.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "That is a panda. It's cute.", value: "That is a panda. It's cute." },
                                { html: "This is a bear. It's big.", value: "This is a bear. It's big." },
                                { html: "That is a bird. It can fly.", value: "That is a bird. It can fly." },
                                { html: "This is a horse. It can run fast.", value: "This is a horse. It can run fast." }
                            ],
                            correct: "That is a panda. It's cute."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "That is a panda. It's cute.": { options: ["那是一只熊猫。它很可爱。", "这是一只熊。它很大。", "那是一只鸟。它会飞。", "这是一匹马。它跑得快。"], correct: "那是一只熊猫。它很可爱。" },
                                "This is a bear. It's big.": { options: ["这是一只熊。它很大。", "那是一只熊猫。它很可爱。", "那是一只鸟。它会飞。", "这是一匹马。它跑得快。"], correct: "这是一只熊。它很大。" },
                                "That is a bird. It can fly.": { options: ["那是一只鸟。它会飞。", "这是一只熊。它很大。", "那是一只熊猫。它很可爱。", "这是一匹马。它跑得快。"], correct: "那是一只鸟。它会飞。" },
                                "This is a horse. It can run fast.": { options: ["这是一匹马。它跑得快。", "这是一只熊。它很大。", "那是一只鸟。它会飞。", "那是一只熊猫。它很可爱。"], correct: "这是一匹马。它跑得快。" }
                            }
                        },
                        chinese: "panda=熊猫，cute=可爱"
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
                        scenario: "动物园里有一些动物，读描述找到对的那个",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "It's big. It can run fast.",
                            question: "这个动物有什么特点？",
                            options: ["大，跑得快", "大，会飞", "可爱，会跳", "小，可爱"],
                            correct: "大，跑得快"
                        },
                        stepB: {
                            instruction: "根据A的描述，选正确的动物",
                            optionsMap: {
                                "大，跑得快": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'bird', value: "bird" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "horse" },
                                "大，会飞": { options: [
                                    { html: 'bird', value: "bird" },
                                    { html: 'bear', value: "bear" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'rabbit', value: "rabbit" }
                                ], correct: "bird" },
                                "可爱，会跳": { options: [
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'bear', value: "bear" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "rabbit" },
                                "小，可爱": { options: [
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'bear', value: "bear" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "rabbit" }
                            }
                        },
                        chinese: "大，跑得快→horse"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜是什么动物？",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "It's cute. It can fly.",
                            question: "这个动物有什么特点？",
                            options: ["可爱，会飞", "大，跑得快", "可爱，不会飞", "很大，不会飞"],
                            correct: "可爱，会飞"
                        },
                        stepB: {
                            instruction: "根据A的描述，选正确的动物",
                            optionsMap: {
                                "可爱，会飞": { options: [
                                    { html: 'bird', value: "bird" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'bear', value: "bear" }
                                ], correct: "bird" },
                                "大，跑得快": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'bird', value: "bird" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'rabbit', value: "rabbit" }
                                ], correct: "horse" },
                                "可爱，不会飞": { options: [
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'bird', value: "bird" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "rabbit" },
                                "很大，不会飞": { options: [
                                    { html: 'bear', value: "bear" },
                                    { html: 'bird', value: "bird" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "bear" }
                            }
                        },
                        chinese: "可爱，会飞→bird"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜是什么动物？",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "This is a bear. It's big.",
                            question: "这段话在说什么动物？",
                            options: ["熊", "马", "兔子", "鸟"],
                            correct: "熊"
                        },
                        stepB: {
                            instruction: "根据A选的中文，找正确的英文动物",
                            optionsMap: {
                                "熊": { options: [
                                    { html: 'bear', value: "bear" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'bird', value: "bird" }
                                ], correct: "bear" },
                                "马": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'bear', value: "bear" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'duck', value: "duck" }
                                ], correct: "horse" },
                                "兔子": { options: [
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'bear', value: "bear" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "rabbit" },
                                "鸟": { options: [
                                    { html: 'bird', value: "bird" },
                                    { html: 'bear', value: "bear" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "bird" }
                            }
                        },
                        chinese: "This is a bear. It's big.→bear"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜是什么动物？",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "That is a panda. It's cute.",
                            question: "这段话在说什么动物？",
                            options: ["熊猫", "兔子", "熊", "马"],
                            correct: "熊猫"
                        },
                        stepB: {
                            instruction: "根据A选的中文，找正确的英文动物",
                            optionsMap: {
                                "熊猫": { options: [
                                    { html: 'panda', value: "panda" },
                                    { html: 'bear', value: "bear" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "panda" },
                                "兔子": { options: [
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'bear', value: "bear" },
                                    { html: 'bird', value: "bird" }
                                ], correct: "rabbit" },
                                "熊": { options: [
                                    { html: 'bear', value: "bear" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'bird', value: "bird" }
                                ], correct: "bear" },
                                "马": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'bear', value: "bear" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'rabbit', value: "rabbit" }
                                ], correct: "horse" }
                            }
                        },
                        chinese: "That is a panda. It's cute.→panda"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜是什么动物？",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "That is a rabbit. It's cute.",
                            question: "这段话在说什么动物？",
                            options: ["兔子", "熊猫", "鸟", "熊"],
                            correct: "兔子"
                        },
                        stepB: {
                            instruction: "根据A选的中文，找正确的英文动物",
                            optionsMap: {
                                "兔子": { options: [
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'bird', value: "bird" },
                                    { html: 'bear', value: "bear" }
                                ], correct: "rabbit" },
                                "熊猫": { options: [
                                    { html: 'panda', value: "panda" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'bear', value: "bear" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "panda" },
                                "鸟": { options: [
                                    { html: 'bird', value: "bird" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "bird" },
                                "熊": { options: [
                                    { html: 'bear', value: "bear" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "bear" }
                            }
                        },
                        chinese: "That is a rabbit. It's cute.→rabbit"
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
                        sentence: "This is a bear.",
                        stepA: { words: ["This", "is"], instruction: "选前半句的词" },
                        stepB: { words: ["a", "bear."], instruction: "选后半句的词" },
                        chinese: "这是一只熊。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "That is a horse.",
                        stepA: { words: ["That", "is"], instruction: "选前半句的词" },
                        stepB: { words: ["a", "horse."], instruction: "选后半句的词" },
                        chinese: "那是一匹马。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "This is a bird.",
                        stepA: { words: ["This", "is"], instruction: "选前半句的词" },
                        stepB: { words: ["a", "bird."], instruction: "选后半句的词" },
                        chinese: "这是一只鸟。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "That is a panda.",
                        stepA: { words: ["That", "is"], instruction: "选前半句的词" },
                        stepB: { words: ["a", "panda."], instruction: "选后半句的词" },
                        chinese: "那是一只熊猫。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "This is a bear. It's big.",
                        stepA: { words: ["This", "is", "a", "bear."], instruction: "排好第一句" },
                        stepB: { words: ["It's", "big."], instruction: "排好第二句" },
                        chinese: "这是一只熊。它很大。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "This is a rabbit.",
                        stepA: { words: ["This", "is"], instruction: "选前半句的词" },
                        stepB: { words: ["a", "rabbit."], instruction: "选后半句的词" },
                        chinese: "这是一只兔子。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "That is a horse. It can run fast.",
                        stepA: { words: ["That", "is", "a", "horse."], instruction: "排好第一句" },
                        stepB: { words: ["It", "can", "run", "fast."], instruction: "排好第二句" },
                        chinese: "那是一匹马。它跑得快。"
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
                        template: "This is a ___. It's ___.",
                        image: '<img src="assets/images/bear.png" width="70">',
                        stepA: { blank: 1, options: ["bear", "bird", "horse", "rabbit"], correct: "bear", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["big", "cute", "fast", "small"], correct: "big", instruction: "bear是什么样的？填第2个空" },
                        chinese: "This is a bear. It's big."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "That is a ___. It's ___.",
                        image: '<img src="assets/images/panda.png" width="70">',
                        stepA: { blank: 1, options: ["panda", "bear", "rabbit", "bird"], correct: "panda", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["cute", "big", "fast", "small"], correct: "cute", instruction: "panda是什么样的？填第2个空" },
                        chinese: "That is a panda. It's cute."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "This is a ___. It can run ___.",
                        image: '<img src="assets/images/horse.png" width="70">',
                        stepA: { blank: 1, options: ["horse", "bear", "rabbit", "duck"], correct: "horse", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["fast", "big", "cute", "small"], correct: "fast", instruction: "horse跑得怎么样？填第2个空" },
                        chinese: "This is a horse. It can run fast."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "Look! ___ are birds. It's ___.",
                        stepA: { blank: 1, options: ["They", "It", "This", "That"], correct: "They", instruction: "很多鸟用什么词？" },
                        stepB: { blank: 2, options: ["cute", "big", "fast", "small"], correct: "cute", instruction: "课本图里的小鸟很小巧，看起来怎么样？（提示：选cute）" },
                        chinese: "看！它们是鸟。这只很可爱。"
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
                        word: "bear",
                        image: '<img src="assets/images/bear.png" width="60">',
                        stepA: { letters: ["b", "e"], distractors: ["d", "p"], instruction: "拼前半：b___" },
                        stepB: { letters: ["a", "r"], distractors: ["n", "t"], instruction: "拼后半：__ar" },
                        chinese: "熊"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "bird",
                        image: '<img src="assets/images/bird.png" width="60">',
                        stepA: { letters: ["b", "i"], distractors: ["d", "a"], instruction: "拼前半：b___" },
                        stepB: { letters: ["r", "d"], distractors: ["n", "g"], instruction: "拼后半：__rd" },
                        chinese: "鸟"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "horse",
                        image: '<img src="assets/images/horse.png" width="60">',
                        stepA: { letters: ["h", "o", "r"], distractors: ["a", "u"], instruction: "拼前半：h____" },
                        stepB: { letters: ["s", "e"], distractors: ["t", "n"], instruction: "拼后半：___se" },
                        chinese: "马"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "panda",
                        image: '<img src="assets/images/panda.png" width="60">',
                        stepA: { letters: ["p", "a", "n"], distractors: ["b", "e"], instruction: "拼前半：p____" },
                        stepB: { letters: ["d", "a"], distractors: ["t", "o"], instruction: "拼后半：___da" },
                        chinese: "熊猫"
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
                description: "A选动物，B写描述，合作完成动物卡片",
                questions: [
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "给动物园做一张动物介绍卡",
                        stepA: {
                            instruction: "选一个动物做卡片",
                            options: [
                                { html: 'bear', value: "bear" },
                                { html: 'panda', value: "panda" },
                                { html: 'horse', value: "horse" },
                                { html: 'rabbit', value: "rabbit" }
                            ]
                        },
                        stepB: {
                            instruction: "给A选的动物写一句介绍",
                            optionsMap: {
                                "bear":   { options: ["This is a bear. It's big.", "That is a bird. It can fly.", "This is a rabbit.", "That is a panda. It's cute."], correct: "This is a bear. It's big." },
                                "panda":  { options: ["That is a panda. It's cute.", "This is a horse. It's fast.", "That is a bear.", "This is a bird. It can fly."], correct: "That is a panda. It's cute." },
                                "horse":  { options: ["This is a horse. It can run fast.", "That is a panda. It's cute.", "This is a bird.", "That is a bear. It's big."], correct: "This is a horse. It can run fast." },
                                "rabbit": { options: ["That is a rabbit. It's cute.", "This is a bear. It's big.", "That is a panda.", "This is a horse. It can run fast."], correct: "That is a rabbit. It's cute." }
                            }
                        },
                        chinese: "做动物介绍卡"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "给朋友介绍你在动物园看到的动物",
                        stepA: {
                            instruction: "你看到了什么动物？用This/That开头",
                            options: ["This is a bear.", "That is a bird.", "This is a rabbit.", "That is a horse."]
                        },
                        stepB: {
                            instruction: "给A看到的动物加一句描述",
                            optionsMap: {
                                "This is a bear.":    { options: ["It's big.", "It's cute.", "It can fly.", "It can run fast."], correct: "It's big." },
                                "That is a bird.":    { options: ["It can fly.", "It's big.", "It can run fast.", "It's cute."], correct: "It can fly." },
                                "This is a rabbit.":  { options: ["It's cute.", "It's big.", "It can run fast.", "It can fly."], correct: "It's cute." },
                                "That is a horse.":   { options: ["It can run fast.", "It's big.", "It's cute.", "It can fly."], correct: "It can run fast." }
                            }
                        },
                        chinese: "介绍动物"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "帮动物园写一块动物展示牌",
                        stepA: {
                            instruction: "选一个动物写展示牌",
                            options: [
                                { html: 'bird', value: "bird" },
                                { html: 'panda', value: "panda" },
                                { html: 'bear', value: "bear" },
                                { html: 'horse', value: "horse" }
                            ]
                        },
                        stepB: {
                            instruction: "给A选的动物选一句介绍",
                            optionsMap: {
                                "bird":  { options: ["That is a bird. It can fly.", "This is a bear. It's big.", "That is a panda. It's cute.", "This is a horse. It can run fast."], correct: "That is a bird. It can fly." },
                                "panda": { options: ["This is a panda. It's cute.", "That is a bird. It can fly.", "This is a bear. It's big.", "That is a rabbit. It's cute."], correct: "This is a panda. It's cute." },
                                "bear":  { options: ["That is a bear. It's big.", "This is a bird. It can fly.", "That is a rabbit. It's cute.", "This is a horse. It can run fast."], correct: "That is a bear. It's big." },
                                "horse": { options: ["This is a horse. It can run fast.", "That is a bear. It's big.", "This is a panda. It's cute.", "That is a bird. It can fly."], correct: "This is a horse. It can run fast." }
                            }
                        },
                        chinese: "写动物展示牌"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "给小朋友介绍农场里的动物",
                        stepA: {
                            instruction: "农场里有哪个动物？选一个",
                            options: ["This is a horse.", "That is a bear.", "This is a panda.", "That is a rabbit."]
                        },
                        stepB: {
                            instruction: "给A说的动物加一句特点",
                            optionsMap: {
                                "This is a horse.":  { options: ["It can run fast.", "It can fly.", "It's cute.", "It's big."], correct: "It can run fast." },
                                "That is a bear.":   { options: ["It's big.", "It can fly.", "It's cute.", "It can run fast."], correct: "It's big." },
                                "This is a panda.":  { options: ["It's cute.", "It can run fast.", "It's big.", "It can fly."], correct: "It's cute." },
                                "That is a rabbit.": { options: ["It's cute.", "It's big.", "It can fly.", "It can run fast."], correct: "It's cute." }
                            }
                        },
                        chinese: "介绍农场动物"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "给妈妈发消息，说说你最喜欢的动物",
                        stepA: {
                            instruction: "你最喜欢哪个动物？选一个开头",
                            options: ["This is a bird.", "That is a panda.", "This is a rabbit.", "That is a horse."]
                        },
                        stepB: {
                            instruction: "给A说的动物加一句描述",
                            optionsMap: {
                                "This is a bird.":    { options: ["It can fly.", "It's big.", "It can run fast.", "It's cute."], correct: "It can fly." },
                                "That is a panda.":   { options: ["It's cute.", "It can fly.", "It's big.", "It can run fast."], correct: "It's cute." },
                                "This is a rabbit.":  { options: ["It's cute.", "It's big.", "It can fly.", "It can run fast."], correct: "It's cute." },
                                "That is a horse.":   { options: ["It can run fast.", "It's cute.", "It can fly.", "It's big."], correct: "It can run fast." }
                            }
                        },
                        chinese: "发消息介绍动物"
                    }
                ]
            }
        ]
    },

    // ==================== 口语模块 ====================
    speaking: {
        stations: [
            // ── 站点1：跟读模仿（全支架）— 音频+文字+中文+图片全给（easy）──
            {
                id: 1, name: "跟读模仿", icon: "🎤",
                difficulty: "easy",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A听音频跟读，B跟着读同一个",
                questions: [
                    {
                        type: "coop_read_relay", word: "bear", chinese: "熊", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "bird", chinese: "鸟", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "horse", chinese: "马", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "panda", chinese: "熊猫", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "rabbit", chinese: "兔子", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "This is a bear.", chinese: "这是一只熊。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "That is a bird.", chinese: "那是一只鸟。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "This is a horse.", chinese: "这是一匹马。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "That is a panda.", chinese: "那是一只熊猫。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "This is a rabbit.", chinese: "这是一只兔子。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    }
                ]
            },

            // ── 站点2：看图说话（重支架）— 图片+句型框架+中文提示，没有音频（medium）──
            {
                id: 2, name: "看图说话", icon: "💬",
                difficulty: "medium",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "看图片，按句型框架说出完整句子",
                questions: [
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/bear.png" width="90">',
                        answer: "This is a bear",
                        chinese: "这是一只熊",
                        stepA: {
                            instruction: "看图片，说出完整句子：This is a _____.",
                            expected: "This is a bear",
                            chinese: "这是一只熊"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：This is a _____.",
                            expected: "This is a bear",
                            chinese: "这是一只熊"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/bird.png" width="90">',
                        answer: "That is a bird",
                        chinese: "那是一只鸟",
                        stepA: {
                            instruction: "看图片，说出完整句子：That is a _____.",
                            expected: "That is a bird",
                            chinese: "那是一只鸟"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：That is a _____.",
                            expected: "That is a bird",
                            chinese: "那是一只鸟"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/horse.png" width="90">',
                        answer: "This is a horse",
                        chinese: "这是一匹马",
                        stepA: {
                            instruction: "看图片，说出完整句子：This is a _____.",
                            expected: "This is a horse",
                            chinese: "这是一匹马"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：This is a _____.",
                            expected: "This is a horse",
                            chinese: "这是一匹马"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/panda.png" width="90">',
                        answer: "That is a panda. It's cute",
                        chinese: "那是一只熊猫。它很可爱。",
                        stepA: {
                            instruction: "看图片，说出完整句子：That is a _____. It's _____.",
                            expected: "That is a panda. It's cute",
                            chinese: "那是一只熊猫。它很可爱。"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：That is a _____. It's _____.",
                            expected: "That is a panda. It's cute",
                            chinese: "那是一只熊猫。它很可爱。"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        answer: "This is a rabbit. It's cute",
                        chinese: "这是一只兔子。它很可爱。",
                        stepA: {
                            instruction: "看图片，说出完整句子：This is a _____. It's _____.",
                            expected: "This is a rabbit. It's cute",
                            chinese: "这是一只兔子。它很可爱。"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：This is a _____. It's _____.",
                            expected: "This is a rabbit. It's cute",
                            chinese: "这是一只兔子。它很可爱。"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/monkey.png" width="90">',
                        answer: "This is a monkey",
                        chinese: "这是一只猴子",
                        stepA: {
                            instruction: "看图片，说出完整句子：This is a _____.",
                            expected: "This is a monkey",
                            chinese: "这是一只猴子"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：This is a _____.",
                            expected: "This is a monkey",
                            chinese: "这是一只猴子"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/duck.png" width="90">',
                        answer: "That is a duck",
                        chinese: "那是一只鸭子",
                        stepA: {
                            instruction: "看图片，说出完整句子：That is a _____.",
                            expected: "That is a duck",
                            chinese: "那是一只鸭子"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：That is a _____.",
                            expected: "That is a duck",
                            chinese: "那是一只鸭子"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/bear.png" width="90">',
                        answer: "This is a bear. It's big",
                        chinese: "这是一只熊。它很大。",
                        stepA: {
                            instruction: "看图片，说出完整句子：This is a _____. It's _____.",
                            expected: "This is a bear. It's big",
                            chinese: "这是一只熊。它很大。"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：This is a _____. It's _____.",
                            expected: "This is a bear. It's big",
                            chinese: "这是一只熊。它很大。"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/horse.png" width="90">',
                        answer: "That is a horse. It can run fast",
                        chinese: "那是一匹马。它跑得快。",
                        stepA: {
                            instruction: "看图片，说出完整句子：That is a _____. It can _____.",
                            expected: "That is a horse. It can run fast",
                            chinese: "那是一匹马。它跑得快。"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：That is a _____. It can _____.",
                            expected: "That is a horse. It can run fast",
                            chinese: "那是一匹马。它跑得快。"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/bird.png" width="90">',
                        answer: "That is a bird. It can fly",
                        chinese: "那是一只鸟。它会飞。",
                        stepA: {
                            instruction: "看图片，说出完整句子：That is a _____. It can _____.",
                            expected: "That is a bird. It can fly",
                            chinese: "那是一只鸟。它会飞。"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：That is a _____. It can _____.",
                            expected: "That is a bird. It can fly",
                            chinese: "那是一只鸟。它会飞。"
                        }
                    }
                ]
            },

            // ── 站点3：合作对话（中支架）— 完整示范句+中文，AB说不同的话（hard）──
            {
                id: 3, name: "合作对话", icon: "🗣️",
                difficulty: "hard",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A介绍动物，B描述特点",
                questions: [
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        image: '<img src="assets/images/bear.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这个动物",
                            role: "介绍者",
                            line: "This is a bear",
                            chinese: "这是一只熊。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它的特点",
                            role: "描述者",
                            line: "It's big",
                            chinese: "它很大。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        image: '<img src="assets/images/bird.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这个动物",
                            role: "介绍者",
                            line: "That is a bird",
                            chinese: "那是一只鸟。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它的特点",
                            role: "描述者",
                            line: "It can fly",
                            chinese: "它会飞。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        image: '<img src="assets/images/horse.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这个动物",
                            role: "介绍者",
                            line: "This is a horse",
                            chinese: "这是一匹马。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它的特点",
                            role: "描述者",
                            line: "It can run fast",
                            chinese: "它跑得快。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        image: '<img src="assets/images/panda.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这个动物",
                            role: "介绍者",
                            line: "That is a panda",
                            chinese: "那是一只熊猫。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它的特点",
                            role: "描述者",
                            line: "It's cute",
                            chinese: "它很可爱。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍这个动物",
                            role: "介绍者",
                            line: "This is a rabbit",
                            chinese: "这是一只兔子。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它的特点",
                            role: "描述者",
                            line: "It's cute",
                            chinese: "它很可爱。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        image: '<img src="assets/images/monkey.png" width="90">',
                        scenario: "看图介绍动物",
                        stepA: {
                            instruction: "看示范句，介绍这个动物",
                            role: "介绍者",
                            line: "This is a monkey",
                            chinese: "这是一只猴子。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它的特点",
                            role: "描述者",
                            line: "It's cute",
                            chinese: "它很可爱。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        image: '<img src="assets/images/duck.png" width="90">',
                        scenario: "看图介绍动物",
                        stepA: {
                            instruction: "看示范句，介绍这个动物",
                            role: "介绍者",
                            line: "That is a duck",
                            chinese: "那是一只鸭子。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它的特点",
                            role: "描述者",
                            line: "It's cute",
                            chinese: "它很可爱。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        image: '<img src="assets/images/bear.png" width="90">',
                        scenario: "看图介绍动物",
                        stepA: {
                            instruction: "看示范句，介绍这个动物",
                            role: "介绍者",
                            line: "Look! This is a bear",
                            chinese: "看！这是一只熊。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它的特点",
                            role: "描述者",
                            line: "It's big",
                            chinese: "它很大。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        image: '<img src="assets/images/bird.png" width="90">',
                        scenario: "看图介绍动物",
                        stepA: {
                            instruction: "看示范句，介绍这个动物",
                            role: "介绍者",
                            line: "Look! That is a bird",
                            chinese: "看！那是一只鸟。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它的特点",
                            role: "描述者",
                            line: "It can fly",
                            chinese: "它会飞。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        image: '<img src="assets/images/horse.png" width="90">',
                        scenario: "看图介绍动物",
                        stepA: {
                            instruction: "看示范句，介绍这个动物",
                            role: "介绍者",
                            line: "Look! This is a horse",
                            chinese: "看！这是一匹马。"
                        },
                        stepB: {
                            instruction: "看示范句，描述它的特点",
                            role: "描述者",
                            line: "It can run fast",
                            chinese: "它跑得快。"
                        }
                    }
                ]
            }
        ]
    }
};

// 导出（兼容直接 script 引入）
if (typeof window !== 'undefined') {
    window.u1l1_coop = u1l1_coop;
}
