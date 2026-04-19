/**
 * U1L3 合作冒险题库 — I have an animal friend.
 * 主题：猜动物谜语（动物描述 + 问答）
 * 新词汇：I, my, an, friend, too, please, guess, jump, mouth, carrots, meat, yellow, tiger, four, two, hello, hi
 * 累积词汇（from L1+L2）：bear, horse, bird, panda, rabbit, monkey, duck, dog, cat, big, small, cute, fast, run, fly, this, that, these, those, they, have, ears, eyes, legs, long, like, grass, brown, lovely, white, black
 * 句型：I have an animal friend. / I am ___. / I can ___. / My mouth is ___. / I have two long ears. / I like ___. / Is it a ___? / Yes, it is. / No, it isn't.
 *
 * 每道题拆成 stepA（蓝色）→ stepB（橙色），B依赖A的结果
 * 知识点清单：docs/U1_词汇累积池.md
 */

var u1l3_coop = {
    id: "U1L3",
    title: "I have an animal friend.",
    theme: "animal riddle",

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
                        type: "coop_listen_relay", audio: "tiger", chinese: "老虎", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/tiger.png" width="70">', value: "tiger" },
                                { html: '<img src="assets/images/rabbit.png" width="70">', value: "rabbit" },
                                { html: '<img src="assets/images/cat.png" width="70">', value: "cat" },
                                { html: '<img src="assets/images/bear.png" width="70">', value: "bear" }
                            ],
                            correct: "tiger"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "tiger":  { options: ["老虎","兔子","猫","熊"], correct: "老虎" },
                                "rabbit": { options: ["兔子","老虎","猫","熊"], correct: "兔子" },
                                "cat":    { options: ["猫","老虎","兔子","熊"], correct: "猫" },
                                "bear":   { options: ["熊","老虎","兔子","猫"], correct: "熊" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "rabbit", chinese: "兔子", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/rabbit.png" width="70">', value: "rabbit" },
                                { html: '<img src="assets/images/tiger.png" width="70">', value: "tiger" },
                                { html: '<img src="assets/images/panda.png" width="70">', value: "panda" },
                                { html: '<img src="assets/images/horse.png" width="70">', value: "horse" }
                            ],
                            correct: "rabbit"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "rabbit": { options: ["兔子","老虎","熊猫","马"], correct: "兔子" },
                                "tiger":  { options: ["老虎","兔子","熊猫","马"], correct: "老虎" },
                                "panda":  { options: ["熊猫","兔子","老虎","马"], correct: "熊猫" },
                                "horse":  { options: ["马","兔子","老虎","熊猫"], correct: "马" }
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
                                { html: '<img src="assets/images/tiger.png" width="70">', value: "tiger" },
                                { html: '<img src="assets/images/rabbit.png" width="70">', value: "rabbit" }
                            ],
                            correct: "cat"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "cat":    { options: ["猫","狗","老虎","兔子"], correct: "猫" },
                                "dog":    { options: ["狗","猫","老虎","兔子"], correct: "狗" },
                                "tiger":  { options: ["老虎","猫","狗","兔子"], correct: "老虎" },
                                "rabbit": { options: ["兔子","猫","狗","老虎"], correct: "兔子" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "panda", chinese: "熊猫", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/panda.png" width="70">', value: "panda" },
                                { html: '<img src="assets/images/tiger.png" width="70">', value: "tiger" },
                                { html: '<img src="assets/images/dog.png" width="70">', value: "dog" },
                                { html: '<img src="assets/images/horse.png" width="70">', value: "horse" }
                            ],
                            correct: "panda"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "panda": { options: ["熊猫","老虎","狗","马"], correct: "熊猫" },
                                "tiger": { options: ["老虎","熊猫","狗","马"], correct: "老虎" },
                                "dog":   { options: ["狗","熊猫","老虎","马"], correct: "狗" },
                                "horse": { options: ["马","熊猫","老虎","狗"], correct: "马" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "horse", chinese: "马", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/horse.png" width="70">', value: "horse" },
                                { html: '<img src="assets/images/rabbit.png" width="70">', value: "rabbit" },
                                { html: '<img src="assets/images/cat.png" width="70">', value: "cat" },
                                { html: '<img src="assets/images/tiger.png" width="70">', value: "tiger" }
                            ],
                            correct: "horse"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "horse":  { options: ["马","兔子","猫","老虎"], correct: "马" },
                                "rabbit": { options: ["兔子","马","猫","老虎"], correct: "兔子" },
                                "cat":    { options: ["猫","马","兔子","老虎"], correct: "猫" },
                                "tiger":  { options: ["老虎","马","兔子","猫"], correct: "老虎" }
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
                        type: "coop_listen_judge", audio: "tiger", difficulty: "easy",
                        image: '<img src="assets/images/tiger.png" width="90">',
                        isMatch: true, chinese: "老虎",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/tiger.png" width="60">', value: "tiger" },
                                { html: '<img src="assets/images/cat.png" width="60">', value: "cat" },
                                { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" },
                                { html: '<img src="assets/images/bear.png" width="60">', value: "bear" }
                            ],
                            correct: "tiger"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "rabbit", difficulty: "easy",
                        image: '<img src="assets/images/cat.png" width="90">',
                        isMatch: false, chinese: "兔子",
                        correctImage: '<img src="assets/images/rabbit.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" },
                                { html: '<img src="assets/images/cat.png" width="60">', value: "cat" },
                                { html: '<img src="assets/images/tiger.png" width="60">', value: "tiger" },
                                { html: '<img src="assets/images/horse.png" width="60">', value: "horse" }
                            ],
                            correct: "rabbit"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "cat", difficulty: "medium",
                        image: '<img src="assets/images/cat.png" width="90">',
                        isMatch: true, chinese: "猫",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/cat.png" width="60">', value: "cat" },
                                { html: '<img src="assets/images/tiger.png" width="60">', value: "tiger" },
                                { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" },
                                { html: '<img src="assets/images/panda.png" width="60">', value: "panda" }
                            ],
                            correct: "cat"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "tiger", difficulty: "medium",
                        image: '<img src="assets/images/bear.png" width="90">',
                        isMatch: false, chinese: "老虎",
                        correctImage: '<img src="assets/images/tiger.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/tiger.png" width="60">', value: "tiger" },
                                { html: '<img src="assets/images/bear.png" width="60">', value: "bear" },
                                { html: '<img src="assets/images/dog.png" width="60">', value: "dog" },
                                { html: '<img src="assets/images/panda.png" width="60">', value: "panda" }
                            ],
                            correct: "tiger"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "horse", difficulty: "medium",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        isMatch: false, chinese: "马",
                        correctImage: '<img src="assets/images/horse.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/horse.png" width="60">', value: "horse" },
                                { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" },
                                { html: '<img src="assets/images/tiger.png" width="60">', value: "tiger" },
                                { html: '<img src="assets/images/cat.png" width="60">', value: "cat" }
                            ],
                            correct: "horse"
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
                        sequence: ["tiger", "rabbit", "cat"],
                        words: [
                            { html: '<img src="assets/images/tiger.png" width="60">', value: "tiger" },
                            { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" },
                            { html: '<img src="assets/images/cat.png" width="60">', value: "cat" }
                        ],
                        chinese: "tiger → rabbit → cat"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["horse", "tiger", "panda"],
                        words: [
                            { html: '<img src="assets/images/horse.png" width="60">', value: "horse" },
                            { html: '<img src="assets/images/tiger.png" width="60">', value: "tiger" },
                            { html: '<img src="assets/images/panda.png" width="60">', value: "panda" }
                        ],
                        chinese: "horse → tiger → panda"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["cat", "horse", "tiger"],
                        words: [
                            { html: '<img src="assets/images/cat.png" width="55">', value: "cat" },
                            { html: '<img src="assets/images/horse.png" width="55">', value: "horse" },
                            { html: '<img src="assets/images/tiger.png" width="55">', value: "tiger" }
                        ],
                        chinese: "cat → horse → tiger"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["rabbit", "panda", "bear"],
                        words: [
                            { html: '<img src="assets/images/rabbit.png" width="55">', value: "rabbit" },
                            { html: '<img src="assets/images/panda.png" width="55">', value: "panda" },
                            { html: '<img src="assets/images/bear.png" width="55">', value: "bear" }
                        ],
                        chinese: "rabbit → panda → bear"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["tiger", "cat", "rabbit", "horse"],
                        words: [
                            { html: '<img src="assets/images/tiger.png" width="50">', value: "tiger" },
                            { html: '<img src="assets/images/cat.png" width="50">', value: "cat" },
                            { html: '<img src="assets/images/rabbit.png" width="50">', value: "rabbit" },
                            { html: '<img src="assets/images/horse.png" width="50">', value: "horse" }
                        ],
                        chinese: "tiger → cat → rabbit → horse"
                    }
                ]
            },

            // ── 站点4：情境听力（Problem-based）──
            {
                id: 4, name: "情境听力", icon: "🎯",
                difficulty: "hard",
                theoryTags: ["Problem-based", "Constructivism"],
                description: "A听动物自我介绍，B猜动物",
                questions: [
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "猜猜我是什么动物？",
                        audio: "I am white. I can jump. My mouth is small. I like carrots.",
                        stepA: {
                            instruction: "听音频，告诉B你听到了什么线索",
                            question: "这个动物是什么颜色？",
                            options: ["白色", "黑黄色", "黑白色", "棕色"],
                            correct: "白色"
                        },
                        stepB: {
                            instruction: "根据A的线索，猜猜是什么动物",
                            question: "白色、会跳、嘴小、爱吃胡萝卜，是什么？",
                            optionsMap: {
                                "白色":   { options: ["rabbit", "tiger", "cat", "panda"], correct: "rabbit" },
                                "黑黄色": { options: ["tiger", "rabbit", "cat", "panda"], correct: "tiger" },
                                "黑白色": { options: ["panda", "rabbit", "tiger", "cat"], correct: "panda" },
                                "棕色":   { options: ["horse", "rabbit", "tiger", "cat"], correct: "horse" }
                            }
                        },
                        chinese: "白色+跳+小嘴+胡萝卜→rabbit"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "猜猜我是什么动物？",
                        audio: "I am black and yellow. I can run fast. My mouth is big. I like meat.",
                        stepA: {
                            instruction: "听音频，告诉B你听到了什么线索",
                            question: "这个动物爱吃什么？",
                            options: ["肉", "胡萝卜", "草", "鱼"],
                            correct: "肉"
                        },
                        stepB: {
                            instruction: "根据A的线索，猜猜是什么动物",
                            question: "黑黄色、跑得快、大嘴、爱吃肉，是什么？",
                            optionsMap: {
                                "肉":     { options: ["tiger", "rabbit", "horse", "panda"], correct: "tiger" },
                                "胡萝卜": { options: ["rabbit", "tiger", "horse", "panda"], correct: "rabbit" },
                                "草":     { options: ["horse", "tiger", "rabbit", "panda"], correct: "horse" },
                                "鱼":     { options: ["cat", "tiger", "rabbit", "horse"], correct: "cat" }
                            }
                        },
                        chinese: "黑黄色+快+大嘴+肉→tiger"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "猜猜我是什么动物？",
                        audio: "I have four long legs. I can run fast. I like grass.",
                        stepA: {
                            instruction: "听音频，这个动物有什么特点？",
                            question: "这个动物能做什么？",
                            options: ["跑得快", "跳", "飞", "游泳"],
                            correct: "跑得快"
                        },
                        stepB: {
                            instruction: "根据A的线索，猜猜是什么动物",
                            question: "四条长腿、跑得快、爱吃草，是什么？",
                            optionsMap: {
                                "跑得快": { options: ["horse", "tiger", "rabbit", "dog"], correct: "horse" },
                                "跳":     { options: ["rabbit", "horse", "tiger", "dog"], correct: "rabbit" },
                                "飞":     { options: ["bird", "horse", "tiger", "rabbit"], correct: "bird" },
                                "游泳":   { options: ["duck", "horse", "tiger", "rabbit"], correct: "duck" }
                            }
                        },
                        chinese: "四长腿+快+草→horse"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "猜猜我是什么动物？",
                        audio: "I have two long ears. I am white. I can jump. I like carrots.",
                        stepA: {
                            instruction: "听音频，这个动物有什么特点？",
                            question: "这个动物的耳朵怎样？",
                            options: ["两只长耳朵", "两只小耳朵", "两只大耳朵", "没有耳朵"],
                            correct: "两只长耳朵"
                        },
                        stepB: {
                            instruction: "根据A的线索，猜猜是什么动物",
                            question: "长耳朵、白色、会跳、吃胡萝卜，是什么？",
                            optionsMap: {
                                "两只长耳朵": { options: ["rabbit", "tiger", "cat", "horse"], correct: "rabbit" },
                                "两只小耳朵": { options: ["panda", "rabbit", "tiger", "horse"], correct: "panda" },
                                "两只大耳朵": { options: ["dog", "rabbit", "tiger", "panda"], correct: "dog" },
                                "没有耳朵":   { options: ["bird", "rabbit", "tiger", "panda"], correct: "bird" }
                            }
                        },
                        chinese: "长耳朵+白+跳+胡萝卜→rabbit"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "你的朋友在猜动物",
                        audio: "I have an animal friend. It is black and white. It has small ears.",
                        stepA: {
                            instruction: "听音频，这个动物朋友是什么颜色？",
                            question: "这个动物朋友是什么颜色？",
                            options: ["黑白色", "黑黄色", "白色", "棕色"],
                            correct: "黑白色"
                        },
                        stepB: {
                            instruction: "根据A的线索，猜猜是什么动物",
                            question: "黑白色、小耳朵，是什么动物？",
                            optionsMap: {
                                "黑白色": { options: ["panda", "tiger", "rabbit", "horse"], correct: "panda" },
                                "黑黄色": { options: ["tiger", "panda", "rabbit", "horse"], correct: "tiger" },
                                "白色":   { options: ["rabbit", "panda", "tiger", "horse"], correct: "rabbit" },
                                "棕色":   { options: ["horse", "panda", "tiger", "rabbit"], correct: "horse" }
                            }
                        },
                        chinese: "黑白+小耳朵→panda"
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
                        image: '<img src="assets/images/tiger.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["tiger", "cat", "rabbit", "bear"],
                            correct: "tiger"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "tiger":  { options: ["老虎","猫","兔子","熊"], correct: "老虎" },
                                "cat":    { options: ["猫","老虎","兔子","熊"], correct: "猫" },
                                "rabbit": { options: ["兔子","老虎","猫","熊"], correct: "兔子" },
                                "bear":   { options: ["熊","老虎","猫","兔子"], correct: "熊" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/mouth.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["mouth", "ear", "eye", "leg"],
                            correct: "mouth"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "mouth": { options: ["嘴巴","耳朵","眼睛","腿"], correct: "嘴巴" },
                                "ear":   { options: ["耳朵","嘴巴","眼睛","腿"], correct: "耳朵" },
                                "eye":   { options: ["眼睛","嘴巴","耳朵","腿"], correct: "眼睛" },
                                "leg":   { options: ["腿","嘴巴","耳朵","眼睛"], correct: "腿" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["rabbit", "tiger", "horse", "dog"],
                            correct: "rabbit"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "rabbit": { options: ["兔子","老虎","马","狗"], correct: "兔子" },
                                "tiger":  { options: ["老虎","兔子","马","狗"], correct: "老虎" },
                                "horse":  { options: ["马","兔子","老虎","狗"], correct: "马" },
                                "dog":    { options: ["狗","兔子","老虎","马"], correct: "狗" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/ear.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["ear", "eye", "mouth", "leg"],
                            correct: "ear"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "ear":   { options: ["耳朵","眼睛","嘴巴","腿"], correct: "耳朵" },
                                "eye":   { options: ["眼睛","耳朵","嘴巴","腿"], correct: "眼睛" },
                                "mouth": { options: ["嘴巴","耳朵","眼睛","腿"], correct: "嘴巴" },
                                "leg":   { options: ["腿","耳朵","眼睛","嘴巴"], correct: "腿" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/cat.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["cat", "tiger", "rabbit", "panda"],
                            correct: "cat"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "cat":    { options: ["猫","老虎","兔子","熊猫"], correct: "猫" },
                                "tiger":  { options: ["老虎","猫","兔子","熊猫"], correct: "老虎" },
                                "rabbit": { options: ["兔子","猫","老虎","熊猫"], correct: "兔子" },
                                "panda":  { options: ["熊猫","猫","老虎","兔子"], correct: "熊猫" }
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
                            { word: "tiger", match: '<img src="assets/images/tiger.png" width="50">', chinese: "老虎" },
                            { word: "rabbit", match: '<img src="assets/images/rabbit.png" width="50">', chinese: "兔子" },
                            { word: "cat", match: '<img src="assets/images/cat.png" width="50">', chinese: "猫" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "mouth", match: '<img src="assets/images/mouth.png" width="50">', chinese: "嘴巴" },
                            { word: "ear", match: '<img src="assets/images/ear.png" width="50">', chinese: "耳朵" },
                            { word: "eye", match: '<img src="assets/images/eye.png" width="50">', chinese: "眼睛" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "horse", match: '<img src="assets/images/horse.png" width="50">', chinese: "马" },
                            { word: "tiger", match: '<img src="assets/images/tiger.png" width="50">', chinese: "老虎" },
                            { word: "panda", match: '<img src="assets/images/panda.png" width="50">', chinese: "熊猫" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "tiger", match: '<img src="assets/images/tiger.png" width="50">', chinese: "老虎" },
                            { word: "rabbit", match: '<img src="assets/images/rabbit.png" width="50">', chinese: "兔子" },
                            { word: "cat", match: '<img src="assets/images/cat.png" width="50">', chinese: "猫" },
                            { word: "horse", match: '<img src="assets/images/horse.png" width="50">', chinese: "马" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "mouth", match: '<img src="assets/images/mouth.png" width="50">', chinese: "嘴巴" },
                            { word: "ear", match: '<img src="assets/images/ear.png" width="50">', chinese: "耳朵" },
                            { word: "tiger", match: '<img src="assets/images/tiger.png" width="50">', chinese: "老虎" },
                            { word: "rabbit", match: '<img src="assets/images/rabbit.png" width="50">', chinese: "兔子" }
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
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "I am white. I can jump.", value: "I am white. I can jump." },
                                { html: "I am black and yellow.", value: "I am black and yellow." },
                                { html: "I have four long legs.", value: "I have four long legs." },
                                { html: "I am big.", value: "I am big." }
                            ],
                            correct: "I am white. I can jump."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "I am white. I can jump.":    { options: ["我是白色的。我会跳。", "我是黑黄色的。", "我有四条长腿。", "我很大。"], correct: "我是白色的。我会跳。" },
                                "I am black and yellow.":     { options: ["我是黑黄色的。", "我是白色的。我会跳。", "我有四条长腿。", "我很大。"], correct: "我是黑黄色的。" },
                                "I have four long legs.":     { options: ["我有四条长腿。", "我是白色的。我会跳。", "我是黑黄色的。", "我很大。"], correct: "我有四条长腿。" },
                                "I am big.":                  { options: ["我很大。", "我是白色的。我会跳。", "我是黑黄色的。", "我有四条长腿。"], correct: "我很大。" }
                            }
                        },
                        chinese: "rabbit自我介绍"
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/tiger.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "My mouth is big. I like meat.", value: "My mouth is big. I like meat." },
                                { html: "My mouth is small. I like carrots.", value: "My mouth is small. I like carrots." },
                                { html: "I have long legs. I like grass.", value: "I have long legs. I like grass." },
                                { html: "I have small ears.", value: "I have small ears." }
                            ],
                            correct: "My mouth is big. I like meat."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "My mouth is big. I like meat.":      { options: ["我的嘴巴大。我爱吃肉。", "我的嘴巴小。我爱吃胡萝卜。", "我有长腿。我爱吃草。", "我有小耳朵。"], correct: "我的嘴巴大。我爱吃肉。" },
                                "My mouth is small. I like carrots.": { options: ["我的嘴巴小。我爱吃胡萝卜。", "我的嘴巴大。我爱吃肉。", "我有长腿。我爱吃草。", "我有小耳朵。"], correct: "我的嘴巴小。我爱吃胡萝卜。" },
                                "I have long legs. I like grass.":    { options: ["我有长腿。我爱吃草。", "我的嘴巴大。我爱吃肉。", "我的嘴巴小。我爱吃胡萝卜。", "我有小耳朵。"], correct: "我有长腿。我爱吃草。" },
                                "I have small ears.":                 { options: ["我有小耳朵。", "我的嘴巴大。我爱吃肉。", "我的嘴巴小。我爱吃胡萝卜。", "我有长腿。我爱吃草。"], correct: "我有小耳朵。" }
                            }
                        },
                        chinese: "tiger自我介绍"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/horse.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "I have four long legs. I like grass.", value: "I have four long legs. I like grass." },
                                { html: "I have two long ears. I like carrots.", value: "I have two long ears. I like carrots." },
                                { html: "My mouth is big. I like meat.", value: "My mouth is big. I like meat." },
                                { html: "I am black and white.", value: "I am black and white." }
                            ],
                            correct: "I have four long legs. I like grass."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "I have four long legs. I like grass.":    { options: ["我有四条长腿。我爱吃草。", "我有两只长耳朵。我爱吃胡萝卜。", "我的嘴巴大。我爱吃肉。", "我是黑白色的。"], correct: "我有四条长腿。我爱吃草。" },
                                "I have two long ears. I like carrots.":   { options: ["我有两只长耳朵。我爱吃胡萝卜。", "我有四条长腿。我爱吃草。", "我的嘴巴大。我爱吃肉。", "我是黑白色的。"], correct: "我有两只长耳朵。我爱吃胡萝卜。" },
                                "My mouth is big. I like meat.":           { options: ["我的嘴巴大。我爱吃肉。", "我有四条长腿。我爱吃草。", "我有两只长耳朵。我爱吃胡萝卜。", "我是黑白色的。"], correct: "我的嘴巴大。我爱吃肉。" },
                                "I am black and white.":                   { options: ["我是黑白色的。", "我有四条长腿。我爱吃草。", "我有两只长耳朵。我爱吃胡萝卜。", "我的嘴巴大。我爱吃肉。"], correct: "我是黑白色的。" }
                            }
                        },
                        chinese: "horse自我介绍"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "I have two long ears. I like carrots.", value: "I have two long ears. I like carrots." },
                                { html: "I have four long legs. I like grass.", value: "I have four long legs. I like grass." },
                                { html: "My mouth is big. I like meat.", value: "My mouth is big. I like meat." },
                                { html: "I have small ears. I am lovely.", value: "I have small ears. I am lovely." }
                            ],
                            correct: "I have two long ears. I like carrots."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "I have two long ears. I like carrots.": { options: ["我有两只长耳朵。我爱吃胡萝卜。", "我有四条长腿。我爱吃草。", "我的嘴巴大。我爱吃肉。", "我有小耳朵。我很可爱。"], correct: "我有两只长耳朵。我爱吃胡萝卜。" },
                                "I have four long legs. I like grass.":  { options: ["我有四条长腿。我爱吃草。", "我有两只长耳朵。我爱吃胡萝卜。", "我的嘴巴大。我爱吃肉。", "我有小耳朵。我很可爱。"], correct: "我有四条长腿。我爱吃草。" },
                                "My mouth is big. I like meat.":         { options: ["我的嘴巴大。我爱吃肉。", "我有两只长耳朵。我爱吃胡萝卜。", "我有四条长腿。我爱吃草。", "我有小耳朵。我很可爱。"], correct: "我的嘴巴大。我爱吃肉。" },
                                "I have small ears. I am lovely.":       { options: ["我有小耳朵。我很可爱。", "我有两只长耳朵。我爱吃胡萝卜。", "我有四条长腿。我爱吃草。", "我的嘴巴大。我爱吃肉。"], correct: "我有小耳朵。我很可爱。" }
                            }
                        },
                        chinese: "rabbit特征描述"
                    },
                    {
                        type: "coop_word_relay", difficulty: "hard",
                        image: '<img src="assets/images/panda.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "I am black and white. I have small ears.", value: "I am black and white. I have small ears." },
                                { html: "I am black and yellow. My mouth is big.", value: "I am black and yellow. My mouth is big." },
                                { html: "I am white. I have two long ears.", value: "I am white. I have two long ears." },
                                { html: "I am brown. I have four long legs.", value: "I am brown. I have four long legs." }
                            ],
                            correct: "I am black and white. I have small ears."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "I am black and white. I have small ears.":  { options: ["我是黑白色的。我有小耳朵。", "我是黑黄色的。我嘴巴大。", "我是白色的。我有两只长耳朵。", "我是棕色的。我有四条长腿。"], correct: "我是黑白色的。我有小耳朵。" },
                                "I am black and yellow. My mouth is big.":   { options: ["我是黑黄色的。我嘴巴大。", "我是黑白色的。我有小耳朵。", "我是白色的。我有两只长耳朵。", "我是棕色的。我有四条长腿。"], correct: "我是黑黄色的。我嘴巴大。" },
                                "I am white. I have two long ears.":         { options: ["我是白色的。我有两只长耳朵。", "我是黑白色的。我有小耳朵。", "我是黑黄色的。我嘴巴大。", "我是棕色的。我有四条长腿。"], correct: "我是白色的。我有两只长耳朵。" },
                                "I am brown. I have four long legs.":        { options: ["我是棕色的。我有四条长腿。", "我是黑白色的。我有小耳朵。", "我是黑黄色的。我嘴巴大。", "我是白色的。我有两只长耳朵。"], correct: "我是棕色的。我有四条长腿。" }
                            }
                        },
                        chinese: "panda自我介绍"
                    }
                ]
            },

            // ── 站点4：情境阅读（Problem-based）──
            {
                id: 4, name: "情境阅读", icon: "🔍",
                difficulty: "hard",
                theoryTags: ["Problem-based", "Constructivism"],
                description: "A读动物谜语，B猜是什么动物",
                questions: [
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜是什么动物？",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "I am white. I can jump. My mouth is small. I have two long ears. I like carrots.",
                            question: "这个动物是什么颜色？",
                            options: ["白色", "黑黄色", "黑白色", "棕色"],
                            correct: "白色"
                        },
                        stepB: {
                            instruction: "根据A的描述，猜猜是什么动物",
                            optionsMap: {
                                "白色":   { options: [
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "rabbit" },
                                "黑黄色": { options: [
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "tiger" },
                                "黑白色": { options: [
                                    { html: 'panda', value: "panda" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "panda" },
                                "棕色": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "horse" }
                            }
                        },
                        chinese: "白色+跳+小嘴+长耳朵+胡萝卜→rabbit"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜是什么动物？",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "I am black and yellow. I can run fast. My mouth is big. I like meat.",
                            question: "这个动物的嘴巴怎样？",
                            options: ["嘴巴大", "嘴巴小", "没有嘴巴", "嘴巴长"],
                            correct: "嘴巴大"
                        },
                        stepB: {
                            instruction: "根据A的描述，猜猜是什么动物",
                            optionsMap: {
                                "嘴巴大": { options: [
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "tiger" },
                                "嘴巴小": { options: [
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'cat', value: "cat" }
                                ], correct: "rabbit" },
                                "没有嘴巴": { options: [
                                    { html: 'bird', value: "bird" },
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "bird" },
                                "嘴巴长": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "horse" }
                            }
                        },
                        chinese: "黑黄色+快+大嘴+肉→tiger"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜是什么动物？",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "I have four long legs. I can run fast. I like grass.",
                            question: "这个动物吃什么？",
                            options: ["草", "肉", "胡萝卜", "竹子"],
                            correct: "草"
                        },
                        stepB: {
                            instruction: "根据A的描述，猜猜是什么动物",
                            optionsMap: {
                                "草": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'cat', value: "cat" }
                                ], correct: "horse" },
                                "肉": { options: [
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "tiger" },
                                "胡萝卜": { options: [
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'cat', value: "cat" }
                                ], correct: "rabbit" },
                                "竹子": { options: [
                                    { html: 'panda', value: "panda" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'rabbit', value: "rabbit" }
                                ], correct: "panda" }
                            }
                        },
                        chinese: "四长腿+快+草→horse"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "朋友在猜动物",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "I have an animal friend. It is black and white. It has small ears. It is lovely.",
                            question: "这段话在说什么动物？",
                            options: ["熊猫", "老虎", "兔子", "马"],
                            correct: "熊猫"
                        },
                        stepB: {
                            instruction: "根据A选的中文，找正确的英文动物",
                            optionsMap: {
                                "熊猫": { options: [
                                    { html: 'panda', value: "panda" },
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "panda" },
                                "老虎": { options: [
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "tiger" },
                                "兔子": { options: [
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "rabbit" },
                                "马": { options: [
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'rabbit', value: "rabbit" }
                                ], correct: "horse" }
                            }
                        },
                        chinese: "黑白+小耳朵+可爱→panda"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "Is it a ___?",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "I am black and yellow. My mouth is big. I can run fast. I like meat. What am I?",
                            question: "Is it a rabbit?",
                            options: ["No, it isn't.", "Yes, it is."],
                            correct: "No, it isn't."
                        },
                        stepB: {
                            instruction: "不是rabbit，那是什么？",
                            optionsMap: {
                                "No, it isn't.": { options: [
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "tiger" },
                                "Yes, it is.": { options: [
                                    { html: 'rabbit', value: "rabbit" },
                                    { html: 'tiger', value: "tiger" },
                                    { html: 'horse', value: "horse" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "rabbit" }
                            }
                        },
                        chinese: "黑黄+大嘴+快+肉→tiger (不是rabbit)"
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
                        sentence: "I am white.",
                        stepA: { words: ["I", "am"], instruction: "选前半句的词" },
                        stepB: { words: ["white."], instruction: "选后半句的词" },
                        chinese: "我是白色的。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "I can jump.",
                        stepA: { words: ["I", "can"], instruction: "选前半句的词" },
                        stepB: { words: ["jump."], instruction: "选后半句的词" },
                        chinese: "我会跳。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "My mouth is small.",
                        stepA: { words: ["My", "mouth"], instruction: "选前半句的词" },
                        stepB: { words: ["is", "small."], instruction: "选后半句的词" },
                        chinese: "我的嘴巴小。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "I like carrots.",
                        stepA: { words: ["I", "like"], instruction: "选前半句的词" },
                        stepB: { words: ["carrots."], instruction: "选后半句的词" },
                        chinese: "我喜欢胡萝卜。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "I have two long ears.",
                        stepA: { words: ["I", "have"], instruction: "选前半句的词" },
                        stepB: { words: ["two", "long", "ears."], instruction: "选后半句的词" },
                        chinese: "我有两只长耳朵。"
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
                        template: "I am ___. I can ___.",
                        image: '<img src="assets/images/rabbit.png" width="70">',
                        stepA: { blank: 1, options: ["white", "black and yellow", "brown", "big"], correct: "white", instruction: "看图填第1个空（颜色）" },
                        stepB: { blank: 2, options: ["jump", "run fast", "fly", "swim"], correct: "jump", instruction: "rabbit会做什么？课本里说rabbit会跳（jump）。填第2个空" },
                        chinese: "I am white. I can jump."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "I am ___. I can ___.",
                        image: '<img src="assets/images/tiger.png" width="70">',
                        stepA: { blank: 1, options: ["black and yellow", "white", "brown", "black and white"], correct: "black and yellow", instruction: "看图填第1个空（颜色）" },
                        stepB: { blank: 2, options: ["run fast", "jump", "fly", "swim"], correct: "run fast", instruction: "tiger会做什么？课本里说tiger跑得快（run fast）。填第2个空" },
                        chinese: "I am black and yellow. I can run fast."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "My mouth is ___. I like ___.",
                        image: '<img src="assets/images/rabbit.png" width="70">',
                        stepA: { blank: 1, options: ["small", "big", "long", "cute"], correct: "small", instruction: "rabbit的嘴巴怎样？填第1个空" },
                        stepB: { blank: 2, options: ["carrots", "meat", "grass", "fish"], correct: "carrots", instruction: "rabbit爱吃什么？填第2个空" },
                        chinese: "My mouth is small. I like carrots."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "My mouth is ___. I like ___.",
                        image: '<img src="assets/images/tiger.png" width="70">',
                        stepA: { blank: 1, options: ["big", "small", "long", "cute"], correct: "big", instruction: "tiger的嘴巴怎样？填第1个空" },
                        stepB: { blank: 2, options: ["meat", "carrots", "grass", "fish"], correct: "meat", instruction: "tiger爱吃什么？填第2个空" },
                        chinese: "My mouth is big. I like meat."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "I have ___ long ___.",
                        image: '<img src="assets/images/horse.png" width="70">',
                        stepA: { blank: 1, options: ["four", "two", "one", "three"], correct: "four", instruction: "horse有几条腿？填第1个空" },
                        stepB: { blank: 2, options: ["legs", "ears", "eyes", "arms"], correct: "legs", instruction: "horse的什么是长的？填第2个空" },
                        chinese: "I have four long legs."
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
                        word: "tiger",
                        image: '<img src="assets/images/tiger.png" width="60">',
                        stepA: { letters: ["t", "i", "g"], distractors: ["a", "o"], instruction: "拼前半：t____" },
                        stepB: { letters: ["e", "r"], distractors: ["a", "n"], instruction: "拼后半：___er" },
                        chinese: "老虎"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "mouth",
                        image: '<img src="assets/images/mouth.png" width="60">',
                        stepA: { letters: ["m", "o", "u"], distractors: ["a", "e"], instruction: "拼前半：m____" },
                        stepB: { letters: ["t", "h"], distractors: ["n", "s"], instruction: "拼后半：___th" },
                        chinese: "嘴巴"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "jump",
                        image: '<img src="assets/images/jump.png" width="60">',
                        stepA: { letters: ["j", "u"], distractors: ["a", "i"], instruction: "拼前半：j___" },
                        stepB: { letters: ["m", "p"], distractors: ["n", "b"], instruction: "拼后半：__mp" },
                        chinese: "跳"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "rabbit",
                        image: '<img src="assets/images/rabbit.png" width="60">',
                        stepA: { letters: ["r", "a", "b"], distractors: ["e", "o"], instruction: "拼前半：r_____" },
                        stepB: { letters: ["b", "i", "t"], distractors: ["n", "d"], instruction: "拼后半：___bit" },
                        chinese: "兔子"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "friend",
                        image: '<img src="assets/images/panda.png" width="60">',
                        stepA: { letters: ["f", "r", "i"], distractors: ["a", "u"], instruction: "拼前半：f_____" },
                        stepB: { letters: ["e", "n", "d"], distractors: ["t", "s"], instruction: "拼后半：___end" },
                        chinese: "朋友"
                    }
                ]
            },

            // ── 站点4：情境写作（Problem-based）──
            {
                id: 4, name: "情境写作", icon: "💌",
                difficulty: "hard",
                theoryTags: ["Problem-based", "Project"],
                description: "A选动物，B写动物谜语描述",
                questions: [
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "给同学出一个动物谜语",
                        stepA: {
                            instruction: "选一个动物来出谜语",
                            options: [
                                { html: 'rabbit', value: "rabbit" },
                                { html: 'tiger', value: "tiger" },
                                { html: 'horse', value: "horse" },
                                { html: 'panda', value: "panda" }
                            ]
                        },
                        stepB: {
                            instruction: "给A选的动物写一句描述",
                            optionsMap: {
                                "rabbit": { options: ["I am white. I can jump.", "I am black and yellow. I can run fast.", "I have four long legs.", "I am black and white."], correct: "I am white. I can jump." },
                                "tiger":  { options: ["I am black and yellow. I can run fast.", "I am white. I can jump.", "I have four long legs.", "I am black and white."], correct: "I am black and yellow. I can run fast." },
                                "horse":  { options: ["I have four long legs. I like grass.", "I am white. I can jump.", "I am black and yellow. I like meat.", "I am black and white."], correct: "I have four long legs. I like grass." },
                                "panda":  { options: ["I am black and white. I have small ears.", "I am white. I can jump.", "I am black and yellow. I like meat.", "I have four long legs."], correct: "I am black and white. I have small ears." }
                            }
                        },
                        chinese: "出动物谜语"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "告诉朋友你的动物朋友长什么样",
                        stepA: {
                            instruction: "你的动物朋友是谁？选一句开头",
                            options: ["I have an animal friend. It is a rabbit.", "I have an animal friend. It is a tiger.", "I have an animal friend. It is a horse.", "I have an animal friend. It is a cat."]
                        },
                        stepB: {
                            instruction: "给A的动物朋友加一句描述",
                            optionsMap: {
                                "I have an animal friend. It is a rabbit.": { options: ["My mouth is small. I like carrots.", "My mouth is big. I like meat.", "I have four long legs.", "I have small ears."], correct: "My mouth is small. I like carrots." },
                                "I have an animal friend. It is a tiger.":  { options: ["My mouth is big. I like meat.", "My mouth is small. I like carrots.", "I have four long legs.", "I have two long ears."], correct: "My mouth is big. I like meat." },
                                "I have an animal friend. It is a horse.":  { options: ["I have four long legs. I like grass.", "My mouth is small. I like carrots.", "My mouth is big. I like meat.", "I have two long ears."], correct: "I have four long legs. I like grass." },
                                "I have an animal friend. It is a cat.":    { options: ["I am cute. I am lovely.", "My mouth is big. I like meat.", "I have four long legs.", "I have two long ears."], correct: "I am cute. I am lovely." }
                            }
                        },
                        chinese: "描述动物朋友"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "帮动物写自我介绍卡",
                        stepA: {
                            instruction: "选一个动物写自我介绍",
                            options: [
                                { html: 'rabbit', value: "rabbit" },
                                { html: 'tiger', value: "tiger" },
                                { html: 'horse', value: "horse" },
                                { html: 'cat', value: "cat" }
                            ]
                        },
                        stepB: {
                            instruction: "给A选的动物选一句最典型的介绍（兔子→小嘴，老虎→大嘴，马→四条长腿，猫→可爱）",
                            optionsMap: {
                                "rabbit": { options: ["My mouth is small.", "My mouth is big.", "I have long legs.", "I have small ears."], correct: "My mouth is small." },
                                "tiger":  { options: ["My mouth is big.", "My mouth is small.", "I have long legs.", "I have long ears."], correct: "My mouth is big." },
                                "horse":  { options: ["I have four long legs.", "My mouth is small.", "My mouth is big.", "I have long ears."], correct: "I have four long legs." },
                                "cat":    { options: ["I am cute.", "My mouth is big.", "I have long legs.", "I have long ears."], correct: "I am cute." }
                            }
                        },
                        chinese: "写动物自我介绍卡"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "猜动物游戏：你来出题",
                        stepA: {
                            instruction: "选一个动物的颜色线索",
                            options: ["I am white.", "I am black and yellow.", "I am black and white.", "I am brown."]
                        },
                        stepB: {
                            instruction: "给A的线索加一句能力描述",
                            optionsMap: {
                                "I am white.":            { options: ["I can jump. I like carrots.", "I can run fast. I like meat.", "I like grass.", "I have small ears."], correct: "I can jump. I like carrots." },
                                "I am black and yellow.": { options: ["I can run fast. I like meat.", "I can jump. I like carrots.", "I like grass.", "I have small ears."], correct: "I can run fast. I like meat." },
                                "I am black and white.":  { options: ["I have small ears. I am lovely.", "I can run fast. I like meat.", "I can jump. I like carrots.", "I like grass."], correct: "I have small ears. I am lovely." },
                                "I am brown.":            { options: ["I have four long legs. I like grass.", "I can run fast. I like meat.", "I can jump. I like carrots.", "I have small ears."], correct: "I have four long legs. I like grass." }
                            }
                        },
                        chinese: "出猜动物谜语"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "Is it a ___? 猜动物对话",
                        stepA: {
                            instruction: "读谜语选一个问句",
                            options: ["Is it a rabbit?", "Is it a tiger?", "Is it a horse?", "Is it a cat?"]
                        },
                        stepB: {
                            instruction: "谜语说'I am black and yellow. I like meat.'，选正确的回答",
                            optionsMap: {
                                "Is it a rabbit?": { options: ["No, it isn't. It's a tiger.", "Yes, it is.", "No, it isn't. It's a horse.", "No, it isn't. It's a panda."], correct: "No, it isn't. It's a tiger." },
                                "Is it a tiger?":  { options: ["Yes, it is.", "No, it isn't. It's a rabbit.", "No, it isn't. It's a horse.", "No, it isn't. It's a panda."], correct: "Yes, it is." },
                                "Is it a horse?":  { options: ["No, it isn't. It's a tiger.", "Yes, it is.", "No, it isn't. It's a rabbit.", "No, it isn't. It's a panda."], correct: "No, it isn't. It's a tiger." },
                                "Is it a cat?":    { options: ["No, it isn't. It's a tiger.", "Yes, it is.", "No, it isn't. It's a rabbit.", "No, it isn't. It's a horse."], correct: "No, it isn't. It's a tiger." }
                            }
                        },
                        chinese: "猜动物问答"
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
                        type: "coop_read_relay", word: "tiger", chinese: "老虎", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "rabbit", chinese: "兔子", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "mouth", chinese: "嘴巴", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "friend", chinese: "朋友", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "carrots", chinese: "胡萝卜", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "I am white", chinese: "我是白色的。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "I can jump", chinese: "我会跳。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "My mouth is small", chinese: "我的嘴巴小。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "I have two long ears", chinese: "我有两只长耳朵。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "I like carrots", chinese: "我喜欢胡萝卜。", difficulty: "medium",
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
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        answer: "I am white",
                        chinese: "我是白色的",
                        stepA: {
                            instruction: "看图片，说出完整句子：I am _____.",
                            expected: "I am white",
                            chinese: "我是白色的"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I am _____.",
                            expected: "I am white",
                            chinese: "我是白色的"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/tiger.png" width="90">',
                        answer: "I am black and yellow",
                        chinese: "我是黑黄色的",
                        stepA: {
                            instruction: "看图片，说出完整句子：I am _____.",
                            expected: "I am black and yellow",
                            chinese: "我是黑黄色的"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I am _____.",
                            expected: "I am black and yellow",
                            chinese: "我是黑黄色的"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        answer: "I can jump",
                        chinese: "我会跳",
                        stepA: {
                            instruction: "看图片，说出完整句子：I can _____.",
                            expected: "I can jump",
                            chinese: "我会跳"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I can _____.",
                            expected: "I can jump",
                            chinese: "我会跳"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        answer: "My mouth is small",
                        chinese: "我的嘴巴小",
                        stepA: {
                            instruction: "看图片，说出完整句子：My mouth is _____.",
                            expected: "My mouth is small",
                            chinese: "我的嘴巴小"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：My mouth is _____.",
                            expected: "My mouth is small",
                            chinese: "我的嘴巴小"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/tiger.png" width="90">',
                        answer: "My mouth is big",
                        chinese: "我的嘴巴大",
                        stepA: {
                            instruction: "看图片，说出完整句子：My mouth is _____.",
                            expected: "My mouth is big",
                            chinese: "我的嘴巴大"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：My mouth is _____.",
                            expected: "My mouth is big",
                            chinese: "我的嘴巴大"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        answer: "I have two long ears",
                        chinese: "我有两只长耳朵",
                        stepA: {
                            instruction: "看图片，说出完整句子：I have two long _____.",
                            expected: "I have two long ears",
                            chinese: "我有两只长耳朵"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I have two long _____.",
                            expected: "I have two long ears",
                            chinese: "我有两只长耳朵"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/horse.png" width="90">',
                        answer: "I have four long legs",
                        chinese: "我有四条长腿",
                        stepA: {
                            instruction: "看图片，说出完整句子：I have four long _____.",
                            expected: "I have four long legs",
                            chinese: "我有四条长腿"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I have four long _____.",
                            expected: "I have four long legs",
                            chinese: "我有四条长腿"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        answer: "I like carrots",
                        chinese: "我喜欢胡萝卜",
                        stepA: {
                            instruction: "看图片，说出完整句子：I like _____.",
                            expected: "I like carrots",
                            chinese: "我喜欢胡萝卜"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I like _____.",
                            expected: "I like carrots",
                            chinese: "我喜欢胡萝卜"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/tiger.png" width="90">',
                        answer: "I like meat",
                        chinese: "我喜欢肉",
                        stepA: {
                            instruction: "看图片，说出完整句子：I like _____.",
                            expected: "I like meat",
                            chinese: "我喜欢肉"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I like _____.",
                            expected: "I like meat",
                            chinese: "我喜欢肉"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/horse.png" width="90">',
                        answer: "I like grass",
                        chinese: "我喜欢草",
                        stepA: {
                            instruction: "看图片，说出完整句子：I like _____.",
                            expected: "I like grass",
                            chinese: "我喜欢草"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：I like _____.",
                            expected: "I like grass",
                            chinese: "我喜欢草"
                        }
                    }
                ]
            },

            // ── 站点3：合作对话（hard）— 完整示范句+中文，AB说不同的话 ──
            {
                id: 3, name: "合作对话", icon: "🗣️",
                difficulty: "hard",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A出谜语描述，B猜动物回答，合作完成对话",
                questions: [
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "猜动物谜语",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说谜语线索",
                            role: "出题者",
                            line: "I am white. I can jump",
                            chinese: "我是白色的。我会跳。"
                        },
                        stepB: {
                            instruction: "看示范句，猜动物",
                            role: "猜题者",
                            line: "Is it a rabbit",
                            chinese: "是兔子吗？"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "猜动物谜语",
                        image: '<img src="assets/images/tiger.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说谜语线索",
                            role: "出题者",
                            line: "I am black and yellow. I like meat",
                            chinese: "我是黑黄色的。我爱吃肉。"
                        },
                        stepB: {
                            instruction: "看示范句，猜动物",
                            role: "猜题者",
                            line: "Is it a tiger",
                            chinese: "是老虎吗？"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "猜动物谜语",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说特征",
                            role: "出题者",
                            line: "My mouth is small. I like carrots",
                            chinese: "我嘴巴小。我爱吃胡萝卜。"
                        },
                        stepB: {
                            instruction: "看示范句，回答",
                            role: "猜题者",
                            line: "Yes, it is. It is a rabbit",
                            chinese: "是的。是兔子。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "猜动物谜语",
                        image: '<img src="assets/images/tiger.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说特征",
                            role: "出题者",
                            line: "My mouth is big. I can run fast",
                            chinese: "我嘴巴大。我跑得快。"
                        },
                        stepB: {
                            instruction: "看示范句，回答",
                            role: "猜题者",
                            line: "No, it isn't. It is a tiger",
                            chinese: "不是。是老虎。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "介绍动物朋友",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍你的动物朋友",
                            role: "介绍者",
                            line: "I have an animal friend. I have two long ears",
                            chinese: "我有一个动物朋友。我有两只长耳朵。"
                        },
                        stepB: {
                            instruction: "看示范句，猜并问",
                            role: "猜题者",
                            line: "Is it a rabbit. Yes, it is",
                            chinese: "是兔子吗？是的。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "介绍动物朋友",
                        image: '<img src="assets/images/horse.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍动物",
                            role: "介绍者",
                            line: "Hello. I have four long legs. I like grass",
                            chinese: "你好。我有四条长腿。我爱吃草。"
                        },
                        stepB: {
                            instruction: "看示范句，回应",
                            role: "猜题者",
                            line: "Hi. Is it a horse. Yes, it is",
                            chinese: "你好。是马吗？是的。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "猜动物谜语",
                        image: '<img src="assets/images/panda.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说谜语",
                            role: "出题者",
                            line: "I am black and white. I have small ears",
                            chinese: "我是黑白色的。我有小耳朵。"
                        },
                        stepB: {
                            instruction: "看示范句，猜动物",
                            role: "猜题者",
                            line: "Is it a panda. Yes, it is",
                            chinese: "是熊猫吗？是的。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "猜动物谜语",
                        image: '<img src="assets/images/tiger.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说特征",
                            role: "出题者",
                            line: "I am black and yellow. My mouth is big",
                            chinese: "我是黑黄色的。我嘴巴大。"
                        },
                        stepB: {
                            instruction: "看示范句，问并猜错再纠正",
                            role: "猜题者",
                            line: "Is it a cat. No, it isn't. It is a tiger",
                            chinese: "是猫吗？不是。是老虎。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "介绍动物朋友",
                        image: '<img src="assets/images/cat.png" width="90">',
                        stepA: {
                            instruction: "看示范句，介绍动物朋友",
                            role: "介绍者",
                            line: "I have an animal friend too. It is cute",
                            chinese: "我也有一个动物朋友。它很可爱。"
                        },
                        stepB: {
                            instruction: "看示范句，猜动物",
                            role: "猜题者",
                            line: "Is it a cat. Yes, it is",
                            chinese: "是猫吗？是的。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "动物自我介绍",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        stepA: {
                            instruction: "看示范句，扮演动物做自我介绍",
                            role: "动物",
                            line: "Hello. I am a rabbit. I am white",
                            chinese: "你好。我是兔子。我是白色的。"
                        },
                        stepB: {
                            instruction: "看示范句，回应并赞美",
                            role: "小朋友",
                            line: "Hi. You are cute",
                            chinese: "你好。你好可爱。"
                        }
                    }
                ]
            }
        ]
    }
};

// 导出（兼容直接 script 引入）
if (typeof window !== 'undefined') {
    window.u1l3_coop = u1l3_coop;
}
