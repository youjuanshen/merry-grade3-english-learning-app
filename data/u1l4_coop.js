/**
 * U1L4 合作冒险题库 — Look! It's a cat.
 * 主题：动物身体部位 + 画动物（祈使句大量出现）
 * 新词汇：lion, mouse, nose, face, draw, touch, close, open, cover, together, step, afternoon
 * 累积词汇（from L1+L2+L3）：bear, horse, bird, panda, rabbit, monkey, duck, dog, cat, tiger, big, small, cute, fast, run, fly, jump, this, that, these, those, they, have, ears, eyes, legs, mouth, long, like, grass, brown, lovely, white, black, yellow, I, my, an, friend, two, four, meat, carrots
 * 句型：These are two ___. / This is a ___. / Let's draw together! / Touch your ___. / Close your ___. / Open your ___. / Cover your ___. / Good afternoon. / Is it a ___? / No, it isn't. / Look! It's a ___.
 *
 * 每道题拆成 stepA（蓝色）→ stepB（橙色），B依赖A的结果
 * 知识点清单：docs/U1_词汇累积池.md
 */

var u1l4_coop = {
    id: "U1L4",
    title: "Look! It's a cat.",
    theme: "body parts & drawing",

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
                        type: "coop_listen_relay", audio: "lion", chinese: "狮子", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/lion.png" width="70">', value: "lion" },
                                { html: '<img src="assets/images/tiger.png" width="70">', value: "tiger" },
                                { html: '<img src="assets/images/bear.png" width="70">', value: "bear" },
                                { html: '<img src="assets/images/cat.png" width="70">', value: "cat" }
                            ],
                            correct: "lion"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "lion":  { options: ["狮子","老虎","熊","猫"], correct: "狮子" },
                                "tiger": { options: ["老虎","狮子","熊","猫"], correct: "老虎" },
                                "bear":  { options: ["熊","狮子","老虎","猫"], correct: "熊" },
                                "cat":   { options: ["猫","狮子","老虎","熊"], correct: "猫" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "mouse", chinese: "老鼠", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/mouse.png" width="70">', value: "mouse" },
                                { html: '<img src="assets/images/rabbit.png" width="70">', value: "rabbit" },
                                { html: '<img src="assets/images/cat.png" width="70">', value: "cat" },
                                { html: '<img src="assets/images/dog.png" width="70">', value: "dog" }
                            ],
                            correct: "mouse"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "mouse":  { options: ["老鼠","兔子","猫","狗"], correct: "老鼠" },
                                "rabbit": { options: ["兔子","老鼠","猫","狗"], correct: "兔子" },
                                "cat":    { options: ["猫","老鼠","兔子","狗"], correct: "猫" },
                                "dog":    { options: ["狗","老鼠","兔子","猫"], correct: "狗" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "nose", chinese: "鼻子", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/nose.png" width="70">', value: "nose" },
                                { html: '<img src="assets/images/mouth.png" width="70">', value: "mouth" },
                                { html: '<img src="assets/images/ear.png" width="70">', value: "ear" },
                                { html: '<img src="assets/images/eye.png" width="70">', value: "eye" }
                            ],
                            correct: "nose"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "nose":  { options: ["鼻子","嘴巴","耳朵","眼睛"], correct: "鼻子" },
                                "mouth": { options: ["嘴巴","鼻子","耳朵","眼睛"], correct: "嘴巴" },
                                "ear":   { options: ["耳朵","鼻子","嘴巴","眼睛"], correct: "耳朵" },
                                "eye":   { options: ["眼睛","鼻子","嘴巴","耳朵"], correct: "眼睛" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "tiger", chinese: "老虎", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/tiger.png" width="70">', value: "tiger" },
                                { html: '<img src="assets/images/lion.png" width="70">', value: "lion" },
                                { html: '<img src="assets/images/mouse.png" width="70">', value: "mouse" },
                                { html: '<img src="assets/images/panda.png" width="70">', value: "panda" }
                            ],
                            correct: "tiger"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "tiger": { options: ["老虎","狮子","老鼠","熊猫"], correct: "老虎" },
                                "lion":  { options: ["狮子","老虎","老鼠","熊猫"], correct: "狮子" },
                                "mouse": { options: ["老鼠","老虎","狮子","熊猫"], correct: "老鼠" },
                                "panda": { options: ["熊猫","老虎","狮子","老鼠"], correct: "熊猫" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "cat", chinese: "猫", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/cat.png" width="70">', value: "cat" },
                                { html: '<img src="assets/images/mouse.png" width="70">', value: "mouse" },
                                { html: '<img src="assets/images/lion.png" width="70">', value: "lion" },
                                { html: '<img src="assets/images/rabbit.png" width="70">', value: "rabbit" }
                            ],
                            correct: "cat"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "cat":    { options: ["猫","老鼠","狮子","兔子"], correct: "猫" },
                                "mouse":  { options: ["老鼠","猫","狮子","兔子"], correct: "老鼠" },
                                "lion":   { options: ["狮子","猫","老鼠","兔子"], correct: "狮子" },
                                "rabbit": { options: ["兔子","猫","老鼠","狮子"], correct: "兔子" }
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
                        type: "coop_listen_judge", audio: "lion", difficulty: "easy",
                        image: '<img src="assets/images/lion.png" width="90">',
                        isMatch: true, chinese: "狮子",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/lion.png" width="60">', value: "lion" },
                                { html: '<img src="assets/images/tiger.png" width="60">', value: "tiger" },
                                { html: '<img src="assets/images/cat.png" width="60">', value: "cat" },
                                { html: '<img src="assets/images/mouse.png" width="60">', value: "mouse" }
                            ],
                            correct: "lion"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "mouse", difficulty: "easy",
                        image: '<img src="assets/images/rabbit.png" width="90">',
                        isMatch: false, chinese: "老鼠",
                        correctImage: '<img src="assets/images/mouse.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/mouse.png" width="60">', value: "mouse" },
                                { html: '<img src="assets/images/rabbit.png" width="60">', value: "rabbit" },
                                { html: '<img src="assets/images/cat.png" width="60">', value: "cat" },
                                { html: '<img src="assets/images/lion.png" width="60">', value: "lion" }
                            ],
                            correct: "mouse"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "nose", difficulty: "medium",
                        image: '<img src="assets/images/nose.png" width="90">',
                        isMatch: true, chinese: "鼻子",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/nose.png" width="60">', value: "nose" },
                                { html: '<img src="assets/images/mouth.png" width="60">', value: "mouth" },
                                { html: '<img src="assets/images/ear.png" width="60">', value: "ear" },
                                { html: '<img src="assets/images/eye.png" width="60">', value: "eye" }
                            ],
                            correct: "nose"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "lion", difficulty: "medium",
                        image: '<img src="assets/images/tiger.png" width="90">',
                        isMatch: false, chinese: "狮子",
                        correctImage: '<img src="assets/images/lion.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/lion.png" width="60">', value: "lion" },
                                { html: '<img src="assets/images/tiger.png" width="60">', value: "tiger" },
                                { html: '<img src="assets/images/bear.png" width="60">', value: "bear" },
                                { html: '<img src="assets/images/cat.png" width="60">', value: "cat" }
                            ],
                            correct: "lion"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "mouth", difficulty: "medium",
                        image: '<img src="assets/images/ear.png" width="90">',
                        isMatch: false, chinese: "嘴巴",
                        correctImage: '<img src="assets/images/mouth.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/mouth.png" width="60">', value: "mouth" },
                                { html: '<img src="assets/images/ear.png" width="60">', value: "ear" },
                                { html: '<img src="assets/images/nose.png" width="60">', value: "nose" },
                                { html: '<img src="assets/images/eye.png" width="60">', value: "eye" }
                            ],
                            correct: "mouth"
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
                        sequence: ["lion", "mouse", "cat"],
                        words: [
                            { html: '<img src="assets/images/lion.png" width="60">', value: "lion" },
                            { html: '<img src="assets/images/mouse.png" width="60">', value: "mouse" },
                            { html: '<img src="assets/images/cat.png" width="60">', value: "cat" }
                        ],
                        chinese: "lion → mouse → cat"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["nose", "mouth", "ear"],
                        words: [
                            { html: '<img src="assets/images/nose.png" width="60">', value: "nose" },
                            { html: '<img src="assets/images/mouth.png" width="60">', value: "mouth" },
                            { html: '<img src="assets/images/ear.png" width="60">', value: "ear" }
                        ],
                        chinese: "nose → mouth → ear"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["mouse", "lion", "tiger"],
                        words: [
                            { html: '<img src="assets/images/mouse.png" width="55">', value: "mouse" },
                            { html: '<img src="assets/images/lion.png" width="55">', value: "lion" },
                            { html: '<img src="assets/images/tiger.png" width="55">', value: "tiger" }
                        ],
                        chinese: "mouse → lion → tiger"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["eye", "nose", "mouth"],
                        words: [
                            { html: '<img src="assets/images/eye.png" width="55">', value: "eye" },
                            { html: '<img src="assets/images/nose.png" width="55">', value: "nose" },
                            { html: '<img src="assets/images/mouth.png" width="55">', value: "mouth" }
                        ],
                        chinese: "eye → nose → mouth"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["lion", "cat", "mouse", "tiger"],
                        words: [
                            { html: '<img src="assets/images/lion.png" width="50">', value: "lion" },
                            { html: '<img src="assets/images/cat.png" width="50">', value: "cat" },
                            { html: '<img src="assets/images/mouse.png" width="50">', value: "mouse" },
                            { html: '<img src="assets/images/tiger.png" width="50">', value: "tiger" }
                        ],
                        chinese: "lion → cat → mouse → tiger"
                    }
                ]
            },

            // ── 站点4：情境听力（Problem-based）──
            {
                id: 4, name: "情境听力", icon: "🎯",
                difficulty: "hard",
                theoryTags: ["Problem-based", "Constructivism"],
                description: "A听画画指令，B判断画的是什么",
                questions: [
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "同学在画动物，猜猜画的是什么",
                        audio: "These are two eyes. This is a nose. This is a mouth. These are two ears.",
                        stepA: {
                            instruction: "听音频，画了哪些身体部位？",
                            question: "听到了哪些身体部位？",
                            options: ["眼睛+鼻子+嘴+耳朵", "眼睛+鼻子+嘴", "眼睛+耳朵", "鼻子+嘴"],
                            correct: "眼睛+鼻子+嘴+耳朵"
                        },
                        stepB: {
                            instruction: "根据A的线索，猜猜画的是什么动物",
                            question: "Is it a panda?",
                            optionsMap: {
                                "眼睛+鼻子+嘴+耳朵": { options: ["可能是！有全部五官", "不可能，缺了东西"], correct: "可能是！有全部五官" },
                                "眼睛+鼻子+嘴":       { options: ["不完整，还少耳朵", "可能是"], correct: "不完整，还少耳朵" },
                                "眼睛+耳朵":           { options: ["不完整，少鼻子和嘴", "可能是"], correct: "不完整，少鼻子和嘴" },
                                "鼻子+嘴":             { options: ["不完整，少眼睛和耳朵", "可能是"], correct: "不完整，少眼睛和耳朵" }
                            }
                        },
                        chinese: "画了眼睛鼻子嘴耳朵→完整的脸"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "老师说了一个指令",
                        audio: "Touch your nose.",
                        stepA: {
                            instruction: "听音频，老师让摸哪里？",
                            question: "Touch your ___?",
                            options: ["鼻子", "嘴巴", "耳朵", "眼睛"],
                            correct: "鼻子"
                        },
                        stepB: {
                            instruction: "A听到了指令，选正确的英文",
                            question: "选正确的指令",
                            optionsMap: {
                                "鼻子": { options: ["Touch your nose.", "Touch your mouth.", "Touch your ear.", "Touch your eye."], correct: "Touch your nose." },
                                "嘴巴": { options: ["Touch your mouth.", "Touch your nose.", "Touch your ear.", "Touch your eye."], correct: "Touch your mouth." },
                                "耳朵": { options: ["Touch your ear.", "Touch your nose.", "Touch your mouth.", "Touch your eye."], correct: "Touch your ear." },
                                "眼睛": { options: ["Touch your eye.", "Touch your nose.", "Touch your mouth.", "Touch your ear."], correct: "Touch your eye." }
                            }
                        },
                        chinese: "Touch your nose→摸鼻子"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "老师说了一个指令",
                        audio: "Close your eyes.",
                        stepA: {
                            instruction: "听音频，老师让做什么？",
                            question: "Close your ___?",
                            options: ["眼睛", "嘴巴", "耳朵", "鼻子"],
                            correct: "眼睛"
                        },
                        stepB: {
                            instruction: "A听到了指令，选正确的英文",
                            question: "选正确的指令",
                            optionsMap: {
                                "眼睛": { options: ["Close your eyes.", "Open your eyes.", "Touch your eyes.", "Cover your eyes."], correct: "Close your eyes." },
                                "嘴巴": { options: ["Close your mouth.", "Open your mouth.", "Touch your mouth.", "Cover your mouth."], correct: "Close your mouth." },
                                "耳朵": { options: ["Cover your ears.", "Close your ears.", "Touch your ears.", "Open your ears."], correct: "Cover your ears." },
                                "鼻子": { options: ["Touch your nose.", "Close your nose.", "Open your nose.", "Cover your nose."], correct: "Touch your nose." }
                            }
                        },
                        chinese: "Close your eyes→闭眼睛"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "老师在说画画步骤",
                        audio: "This is a face. These are two eyes. This is a nose. This is a mouth. Look! It's a cat.",
                        stepA: {
                            instruction: "听音频，最后画出来的是什么？",
                            question: "Look! It's a ___?",
                            options: ["cat", "panda", "lion", "mouse"],
                            correct: "cat"
                        },
                        stepB: {
                            instruction: "A听到画了一只猫，选正确的步骤",
                            question: "画猫先画什么？",
                            optionsMap: {
                                "cat":   { options: ["先画脸，再画眼睛鼻子嘴", "先画耳朵，再画脸", "先画腿，再画脸", "先画嘴，再画鼻子"],   correct: "先画脸，再画眼睛鼻子嘴" },
                                "panda": { options: ["先画脸，再画眼睛鼻子嘴", "先画耳朵，再画脸", "先画腿，再画脸", "先画嘴，再画鼻子"], correct: "先画脸，再画眼睛鼻子嘴" },
                                "lion":  { options: ["先画脸，再画眼睛鼻子嘴", "先画耳朵，再画脸", "先画腿，再画脸", "先画嘴，再画鼻子"], correct: "先画脸，再画眼睛鼻子嘴" },
                                "mouse": { options: ["先画脸，再画眼睛鼻子嘴", "先画耳朵，再画脸", "先画腿，再画脸", "先画嘴，再画鼻子"], correct: "先画脸，再画眼睛鼻子嘴" }
                            }
                        },
                        chinese: "画猫：脸→眼→鼻→嘴→cat"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "老师说了一个指令",
                        audio: "Open your mouth.",
                        stepA: {
                            instruction: "听音频，老师让做什么？",
                            question: "Open your ___?",
                            options: ["嘴巴", "眼睛", "耳朵", "鼻子"],
                            correct: "嘴巴"
                        },
                        stepB: {
                            instruction: "A听到了指令，选正确的英文",
                            question: "选正确的指令",
                            optionsMap: {
                                "嘴巴": { options: ["Open your mouth.", "Close your mouth.", "Touch your mouth.", "Cover your mouth."], correct: "Open your mouth." },
                                "眼睛": { options: ["Open your eyes.", "Close your eyes.", "Touch your eyes.", "Cover your eyes."], correct: "Open your eyes." },
                                "耳朵": { options: ["Cover your ears.", "Open your ears.", "Touch your ears.", "Close your ears."], correct: "Cover your ears." },
                                "鼻子": { options: ["Touch your nose.", "Open your nose.", "Close your nose.", "Cover your nose."], correct: "Touch your nose." }
                            }
                        },
                        chinese: "Open your mouth→张嘴"
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
                        image: '<img src="assets/images/lion.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["lion", "tiger", "bear", "cat"],
                            correct: "lion"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "lion":  { options: ["狮子","老虎","熊","猫"], correct: "狮子" },
                                "tiger": { options: ["老虎","狮子","熊","猫"], correct: "老虎" },
                                "bear":  { options: ["熊","狮子","老虎","猫"], correct: "熊" },
                                "cat":   { options: ["猫","狮子","老虎","熊"], correct: "猫" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/mouse.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["mouse", "rabbit", "cat", "dog"],
                            correct: "mouse"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "mouse":  { options: ["老鼠","兔子","猫","狗"], correct: "老鼠" },
                                "rabbit": { options: ["兔子","老鼠","猫","狗"], correct: "兔子" },
                                "cat":    { options: ["猫","老鼠","兔子","狗"], correct: "猫" },
                                "dog":    { options: ["狗","老鼠","兔子","猫"], correct: "狗" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/nose.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["nose", "mouth", "ear", "eye"],
                            correct: "nose"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "nose":  { options: ["鼻子","嘴巴","耳朵","眼睛"], correct: "鼻子" },
                                "mouth": { options: ["嘴巴","鼻子","耳朵","眼睛"], correct: "嘴巴" },
                                "ear":   { options: ["耳朵","鼻子","嘴巴","眼睛"], correct: "耳朵" },
                                "eye":   { options: ["眼睛","鼻子","嘴巴","耳朵"], correct: "眼睛" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/eye.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["eye", "ear", "nose", "mouth"],
                            correct: "eye"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "eye":   { options: ["眼睛","耳朵","鼻子","嘴巴"], correct: "眼睛" },
                                "ear":   { options: ["耳朵","眼睛","鼻子","嘴巴"], correct: "耳朵" },
                                "nose":  { options: ["鼻子","眼睛","耳朵","嘴巴"], correct: "鼻子" },
                                "mouth": { options: ["嘴巴","眼睛","耳朵","鼻子"], correct: "嘴巴" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/ear.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["ear", "eye", "nose", "mouth"],
                            correct: "ear"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "ear":   { options: ["耳朵","眼睛","鼻子","嘴巴"], correct: "耳朵" },
                                "eye":   { options: ["眼睛","耳朵","鼻子","嘴巴"], correct: "眼睛" },
                                "nose":  { options: ["鼻子","耳朵","眼睛","嘴巴"], correct: "鼻子" },
                                "mouth": { options: ["嘴巴","耳朵","眼睛","鼻子"], correct: "嘴巴" }
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
                            { word: "lion", match: '<img src="assets/images/lion.png" width="50">', chinese: "狮子" },
                            { word: "mouse", match: '<img src="assets/images/mouse.png" width="50">', chinese: "老鼠" },
                            { word: "cat", match: '<img src="assets/images/cat.png" width="50">', chinese: "猫" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "nose", match: '<img src="assets/images/nose.png" width="50">', chinese: "鼻子" },
                            { word: "mouth", match: '<img src="assets/images/mouth.png" width="50">', chinese: "嘴巴" },
                            { word: "ear", match: '<img src="assets/images/ear.png" width="50">', chinese: "耳朵" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "eye", match: '<img src="assets/images/eye.png" width="50">', chinese: "眼睛" },
                            { word: "lion", match: '<img src="assets/images/lion.png" width="50">', chinese: "狮子" },
                            { word: "mouse", match: '<img src="assets/images/mouse.png" width="50">', chinese: "老鼠" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "lion", match: '<img src="assets/images/lion.png" width="50">', chinese: "狮子" },
                            { word: "mouse", match: '<img src="assets/images/mouse.png" width="50">', chinese: "老鼠" },
                            { word: "nose", match: '<img src="assets/images/nose.png" width="50">', chinese: "鼻子" },
                            { word: "ear", match: '<img src="assets/images/ear.png" width="50">', chinese: "耳朵" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "eye", match: '<img src="assets/images/eye.png" width="50">', chinese: "眼睛" },
                            { word: "mouth", match: '<img src="assets/images/mouth.png" width="50">', chinese: "嘴巴" },
                            { word: "lion", match: '<img src="assets/images/lion.png" width="50">', chinese: "狮子" },
                            { word: "cat", match: '<img src="assets/images/cat.png" width="50">', chinese: "猫" }
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
                        image: '<img src="assets/images/eye.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "These are two eyes.", value: "These are two eyes." },
                                { html: "These are two ears.", value: "These are two ears." },
                                { html: "This is a nose.", value: "This is a nose." },
                                { html: "This is a mouth.", value: "This is a mouth." }
                            ],
                            correct: "These are two eyes."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "These are two eyes.": { options: ["这是两只眼睛。", "这是两只耳朵。", "这是一个鼻子。", "这是一张嘴。"], correct: "这是两只眼睛。" },
                                "These are two ears.": { options: ["这是两只耳朵。", "这是两只眼睛。", "这是一个鼻子。", "这是一张嘴。"], correct: "这是两只耳朵。" },
                                "This is a nose.":     { options: ["这是一个鼻子。", "这是两只眼睛。", "这是两只耳朵。", "这是一张嘴。"], correct: "这是一个鼻子。" },
                                "This is a mouth.":    { options: ["这是一张嘴。", "这是两只眼睛。", "这是两只耳朵。", "这是一个鼻子。"], correct: "这是一张嘴。" }
                            }
                        },
                        chinese: "两只眼睛"
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/ear.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "These are two ears.", value: "These are two ears." },
                                { html: "These are two eyes.", value: "These are two eyes." },
                                { html: "This is a nose.", value: "This is a nose." },
                                { html: "This is a face.", value: "This is a face." }
                            ],
                            correct: "These are two ears."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "These are two ears.": { options: ["这是两只耳朵。", "这是两只眼睛。", "这是一个鼻子。", "这是一张脸。"], correct: "这是两只耳朵。" },
                                "These are two eyes.": { options: ["这是两只眼睛。", "这是两只耳朵。", "这是一个鼻子。", "这是一张脸。"], correct: "这是两只眼睛。" },
                                "This is a nose.":     { options: ["这是一个鼻子。", "这是两只耳朵。", "这是两只眼睛。", "这是一张脸。"], correct: "这是一个鼻子。" },
                                "This is a face.":     { options: ["这是一张脸。", "这是两只耳朵。", "这是两只眼睛。", "这是一个鼻子。"], correct: "这是一张脸。" }
                            }
                        },
                        chinese: "两只耳朵"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/nose.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文指令",
                            options: [
                                { html: "Touch your nose.", value: "Touch your nose." },
                                { html: "Touch your mouth.", value: "Touch your mouth." },
                                { html: "Close your eyes.", value: "Close your eyes." },
                                { html: "Cover your ears.", value: "Cover your ears." }
                            ],
                            correct: "Touch your nose."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Touch your nose.":  { options: ["摸你的鼻子。", "摸你的嘴巴。", "闭上你的眼睛。", "捂住你的耳朵。"], correct: "摸你的鼻子。" },
                                "Touch your mouth.": { options: ["摸你的嘴巴。", "摸你的鼻子。", "闭上你的眼睛。", "捂住你的耳朵。"], correct: "摸你的嘴巴。" },
                                "Close your eyes.":  { options: ["闭上你的眼睛。", "摸你的鼻子。", "摸你的嘴巴。", "捂住你的耳朵。"], correct: "闭上你的眼睛。" },
                                "Cover your ears.":  { options: ["捂住你的耳朵。", "摸你的鼻子。", "摸你的嘴巴。", "闭上你的眼睛。"], correct: "捂住你的耳朵。" }
                            }
                        },
                        chinese: "Touch your nose"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/eye.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文指令",
                            options: [
                                { html: "Close your eyes.", value: "Close your eyes." },
                                { html: "Open your mouth.", value: "Open your mouth." },
                                { html: "Touch your nose.", value: "Touch your nose." },
                                { html: "Cover your ears.", value: "Cover your ears." }
                            ],
                            correct: "Close your eyes."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Close your eyes.":  { options: ["闭上你的眼睛。", "张开你的嘴巴。", "摸你的鼻子。", "捂住你的耳朵。"], correct: "闭上你的眼睛。" },
                                "Open your mouth.":  { options: ["张开你的嘴巴。", "闭上你的眼睛。", "摸你的鼻子。", "捂住你的耳朵。"], correct: "张开你的嘴巴。" },
                                "Touch your nose.":  { options: ["摸你的鼻子。", "闭上你的眼睛。", "张开你的嘴巴。", "捂住你的耳朵。"], correct: "摸你的鼻子。" },
                                "Cover your ears.":  { options: ["捂住你的耳朵。", "闭上你的眼睛。", "张开你的嘴巴。", "摸你的鼻子。"], correct: "捂住你的耳朵。" }
                            }
                        },
                        chinese: "Close your eyes"
                    },
                    {
                        type: "coop_word_relay", difficulty: "hard",
                        image: '<img src="assets/images/cat.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "Look! It's a cat.", value: "Look! It's a cat." },
                                { html: "Look! It's a lion.", value: "Look! It's a lion." },
                                { html: "Look! It's a mouse.", value: "Look! It's a mouse." },
                                { html: "Look! It's a panda.", value: "Look! It's a panda." }
                            ],
                            correct: "Look! It's a cat."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Look! It's a cat.":   { options: ["看！是一只猫。", "看！是一只狮子。", "看！是一只老鼠。", "看！是一只熊猫。"], correct: "看！是一只猫。" },
                                "Look! It's a lion.":  { options: ["看！是一只狮子。", "看！是一只猫。", "看！是一只老鼠。", "看！是一只熊猫。"], correct: "看！是一只狮子。" },
                                "Look! It's a mouse.": { options: ["看！是一只老鼠。", "看！是一只猫。", "看！是一只狮子。", "看！是一只熊猫。"], correct: "看！是一只老鼠。" },
                                "Look! It's a panda.": { options: ["看！是一只熊猫。", "看！是一只猫。", "看！是一只狮子。", "看！是一只老鼠。"], correct: "看！是一只熊猫。" }
                            }
                        },
                        chinese: "Look! It's a cat."
                    }
                ]
            },

            // ── 站点4：情境阅读（Problem-based）──
            {
                id: 4, name: "情境阅读", icon: "🔍",
                difficulty: "hard",
                theoryTags: ["Problem-based", "Constructivism"],
                description: "A读画画步骤，B猜画的是什么动物",
                questions: [
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜画的是什么动物？",
                        stepA: {
                            instruction: "读一读画画步骤",
                            text: "This is a face. These are two eyes. This is a nose. This is a mouth. These are two ears. Look! It's a cat.",
                            question: "画出来的是什么？",
                            options: ["猫", "熊猫", "狮子", "老鼠"],
                            correct: "猫"
                        },
                        stepB: {
                            instruction: "根据A选的中文，找正确的英文",
                            optionsMap: {
                                "猫":   { options: [
                                    { html: 'cat', value: "cat" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'lion', value: "lion" },
                                    { html: 'mouse', value: "mouse" }
                                ], correct: "cat" },
                                "熊猫": { options: [
                                    { html: 'panda', value: "panda" },
                                    { html: 'cat', value: "cat" },
                                    { html: 'lion', value: "lion" },
                                    { html: 'mouse', value: "mouse" }
                                ], correct: "panda" },
                                "狮子": { options: [
                                    { html: 'lion', value: "lion" },
                                    { html: 'cat', value: "cat" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'mouse', value: "mouse" }
                                ], correct: "lion" },
                                "老鼠": { options: [
                                    { html: 'mouse', value: "mouse" },
                                    { html: 'cat', value: "cat" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'lion', value: "lion" }
                                ], correct: "mouse" }
                            }
                        },
                        chinese: "画猫步骤→cat"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "读指令，做动作",
                        stepA: {
                            instruction: "读一读这个指令",
                            text: "Touch your face. Close your eyes. Open your mouth. Cover your ears.",
                            question: "一共有几个动作？",
                            options: ["四个", "三个", "两个", "一个"],
                            correct: "四个"
                        },
                        stepB: {
                            instruction: "选出第一个动作是什么",
                            optionsMap: {
                                "四个": { options: ["摸脸", "闭眼", "张嘴", "捂耳朵"], correct: "摸脸" },
                                "三个": { options: ["闭眼", "摸脸", "张嘴", "捂耳朵"], correct: "摸脸" },
                                "两个": { options: ["摸脸", "闭眼", "张嘴", "捂耳朵"], correct: "摸脸" },
                                "一个": { options: ["摸脸", "闭眼", "张嘴", "捂耳朵"], correct: "摸脸" }
                            }
                        },
                        chinese: "Touch→Close→Open→Cover四个动作"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "猜猜画的是什么？",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "This is a face. These are two big eyes. This is a small nose. These are two small ears. Is it a panda? No, it isn't.",
                            question: "Is it a panda?",
                            options: ["No, it isn't.", "Yes, it is."],
                            correct: "No, it isn't."
                        },
                        stepB: {
                            instruction: "不是panda，那可能是什么？（大眼睛、小鼻子、小耳朵）",
                            optionsMap: {
                                "No, it isn't.": { options: [
                                    { html: 'cat', value: "cat" },
                                    { html: 'panda', value: "panda" },
                                    { html: 'lion', value: "lion" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "cat" },
                                "Yes, it is.": { options: [
                                    { html: 'panda', value: "panda" },
                                    { html: 'cat', value: "cat" },
                                    { html: 'lion', value: "lion" },
                                    { html: 'horse', value: "horse" }
                                ], correct: "panda" }
                            }
                        },
                        chinese: "大眼+小鼻+小耳→not panda→cat"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "Good afternoon! 画画课",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Good afternoon. Let's draw together! This is a face. These are two eyes. This is a nose. Look! It's a lion.",
                            question: "画的是什么动物？",
                            options: ["狮子", "猫", "老鼠", "熊猫"],
                            correct: "狮子"
                        },
                        stepB: {
                            instruction: "根据A选的中文，找正确的英文动物",
                            optionsMap: {
                                "狮子": { options: [
                                    { html: 'lion', value: "lion" },
                                    { html: 'cat', value: "cat" },
                                    { html: 'mouse', value: "mouse" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "lion" },
                                "猫": { options: [
                                    { html: 'cat', value: "cat" },
                                    { html: 'lion', value: "lion" },
                                    { html: 'mouse', value: "mouse" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "cat" },
                                "老鼠": { options: [
                                    { html: 'mouse', value: "mouse" },
                                    { html: 'lion', value: "lion" },
                                    { html: 'cat', value: "cat" },
                                    { html: 'panda', value: "panda" }
                                ], correct: "mouse" },
                                "熊猫": { options: [
                                    { html: 'panda', value: "panda" },
                                    { html: 'lion', value: "lion" },
                                    { html: 'cat', value: "cat" },
                                    { html: 'mouse', value: "mouse" }
                                ], correct: "panda" }
                            }
                        },
                        chinese: "画画课→lion"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "Touch Your Face chant",
                        stepA: {
                            instruction: "读一读这首chant",
                            text: "Face, face, touch your face. Eyes, eyes, close your eyes. Mouth, mouth, open your mouth. Ears, ears, cover your ears.",
                            question: "Close your ___?",
                            options: ["eyes", "mouth", "ears", "nose"],
                            correct: "eyes"
                        },
                        stepB: {
                            instruction: "根据chant，Cover your ___?",
                            optionsMap: {
                                "eyes": { options: ["ears", "eyes", "mouth", "nose"], correct: "ears" },
                                "mouth": { options: ["ears", "eyes", "mouth", "nose"], correct: "ears" },
                                "ears": { options: ["ears", "eyes", "mouth", "nose"], correct: "ears" },
                                "nose": { options: ["ears", "eyes", "mouth", "nose"], correct: "ears" }
                            }
                        },
                        chinese: "Touch Your Face chant"
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
                        sentence: "This is a face.",
                        stepA: { words: ["This", "is"], instruction: "选前半句的词" },
                        stepB: { words: ["a", "face."], instruction: "选后半句的词" },
                        chinese: "这是一张脸。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "These are two eyes.",
                        stepA: { words: ["These", "are"], instruction: "选前半句的词" },
                        stepB: { words: ["two", "eyes."], instruction: "选后半句的词" },
                        chinese: "这是两只眼睛。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "These are two ears.",
                        stepA: { words: ["These", "are"], instruction: "选前半句的词" },
                        stepB: { words: ["two", "ears."], instruction: "选后半句的词" },
                        chinese: "这是两只耳朵。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "This is a nose.",
                        stepA: { words: ["This", "is"], instruction: "选前半句的词" },
                        stepB: { words: ["a", "nose."], instruction: "选后半句的词" },
                        chinese: "这是一个鼻子。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "Touch your face.",
                        stepA: { words: ["Touch", "your"], instruction: "选前半句的词" },
                        stepB: { words: ["face."], instruction: "选后半句的词" },
                        chinese: "摸你的脸。"
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
                        template: "These are two ___. This is a ___.",
                        image: '<img src="assets/images/cat.png" width="70">',
                        stepA: { blank: 1, options: ["eyes", "ears", "legs", "noses"], correct: "eyes", instruction: "看图片，先画了什么？填第1个空" },
                        stepB: { blank: 2, options: ["nose", "eye", "ear", "mouth"], correct: "nose", instruction: "课本画顺序：眼睛之后画鼻子（nose）。填第2个空" },
                        chinese: "These are two eyes. This is a nose."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "___ your eyes. ___ your mouth.",
                        image: '<img src="assets/images/eye.png" width="70">',
                        stepA: { blank: 1, options: ["Close", "Open", "Touch", "Cover"], correct: "Close", instruction: "眼睛用哪个动作词？填第1个空" },
                        stepB: { blank: 2, options: ["Open", "Close", "Touch", "Cover"], correct: "Open", instruction: "嘴巴——张开嘴，用Open。课本里说'Open your mouth.'，填第2个空" },
                        chinese: "Close your eyes. Open your mouth."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "This is a ___. These are two ___.",
                        image: '<img src="assets/images/mouth.png" width="70">',
                        stepA: { blank: 1, options: ["mouth", "nose", "face", "eye"], correct: "mouth", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["ears", "eyes", "legs", "noses"], correct: "ears", instruction: "课本画动物脸的顺序：嘴巴之后画两只耳朵。填第2个空（答案：ears）" },
                        chinese: "This is a mouth. These are two ears."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "___ your face. ___ your ears.",
                        image: '<img src="assets/images/ear.png" width="70">',
                        stepA: { blank: 1, options: ["Touch", "Close", "Open", "Cover"], correct: "Touch", instruction: "脸用哪个动作词？填第1个空" },
                        stepB: { blank: 2, options: ["Cover", "Touch", "Close", "Open"], correct: "Cover", instruction: "耳朵——捂住耳朵，用Cover。课本里说'Cover your ears.'，填第2个空" },
                        chinese: "Touch your face. Cover your ears."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "Look! It's a ___. It has two big ___.",
                        image: '<img src="assets/images/lion.png" width="70">',
                        stepA: { blank: 1, options: ["lion", "cat", "mouse", "panda"], correct: "lion", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["eyes", "ears", "legs", "noses"], correct: "eyes", instruction: "课本里说lion有两只大眼睛（It has two big eyes.）。填第2个空" },
                        chinese: "Look! It's a lion. It has two big eyes."
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
                        word: "lion",
                        image: '<img src="assets/images/lion.png" width="60">',
                        stepA: { letters: ["l", "i"], distractors: ["a", "e"], instruction: "拼前半：l___" },
                        stepB: { letters: ["o", "n"], distractors: ["a", "t"], instruction: "拼后半：__on" },
                        chinese: "狮子"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "nose",
                        image: '<img src="assets/images/nose.png" width="60">',
                        stepA: { letters: ["n", "o"], distractors: ["a", "u"], instruction: "拼前半：n___" },
                        stepB: { letters: ["s", "e"], distractors: ["t", "d"], instruction: "拼后半：__se" },
                        chinese: "鼻子"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "face",
                        image: '<img src="assets/images/cat.png" width="60">',
                        stepA: { letters: ["f", "a"], distractors: ["e", "i"], instruction: "拼前半：f___" },
                        stepB: { letters: ["c", "e"], distractors: ["k", "s"], instruction: "拼后半：__ce" },
                        chinese: "脸"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "mouse",
                        image: '<img src="assets/images/mouse.png" width="60">',
                        stepA: { letters: ["m", "o", "u"], distractors: ["a", "i"], instruction: "拼前半：m____" },
                        stepB: { letters: ["s", "e"], distractors: ["t", "n"], instruction: "拼后半：___se" },
                        chinese: "老鼠"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "mouth",
                        image: '<img src="assets/images/mouth.png" width="60">',
                        stepA: { letters: ["m", "o", "u"], distractors: ["a", "e"], instruction: "拼前半：m____" },
                        stepB: { letters: ["t", "h"], distractors: ["n", "s"], instruction: "拼后半：___th" },
                        chinese: "嘴巴"
                    }
                ]
            },

            // ── 站点4：情境写作（Problem-based）──
            {
                id: 4, name: "情境写作", icon: "💌",
                difficulty: "hard",
                theoryTags: ["Problem-based", "Project"],
                description: "A选画什么，B写描述步骤",
                questions: [
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "和同学一起画动物",
                        stepA: {
                            instruction: "选一个动物来画",
                            options: [
                                { html: 'cat', value: "cat" },
                                { html: 'lion', value: "lion" },
                                { html: 'panda', value: "panda" },
                                { html: 'mouse', value: "mouse" }
                            ]
                        },
                        stepB: {
                            instruction: "给A选的动物写第一步",
                            optionsMap: {
                                "cat":   { options: ["This is a face.", "These are two legs.", "This is a nose.", "These are two eyes."], correct: "This is a face." },
                                "lion":  { options: ["This is a face.", "These are two legs.", "This is a nose.", "These are two eyes."], correct: "This is a face." },
                                "panda": { options: ["This is a face.", "These are two legs.", "This is a nose.", "These are two eyes."], correct: "This is a face." },
                                "mouse": { options: ["This is a face.", "These are two legs.", "This is a nose.", "These are two eyes."], correct: "This is a face." }
                            }
                        },
                        chinese: "画动物第一步"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "画完了，猜猜是什么？",
                        stepA: {
                            instruction: "画了一只动物，选'Look! It's a ___.'",
                            options: ["Look! It's a cat.", "Look! It's a lion.", "Look! It's a mouse.", "Look! It's a panda."]
                        },
                        stepB: {
                            instruction: "根据A画的动物，选一句描述",
                            optionsMap: {
                                "Look! It's a cat.":   { options: ["It is cute.", "It is big.", "It has long legs.", "It has small ears."], correct: "It is cute." },
                                "Look! It's a lion.":  { options: ["It is big.", "It is cute.", "It can jump.", "It has small ears."], correct: "It is big." },
                                "Look! It's a mouse.": { options: ["It is small.", "It is big.", "It has long legs.", "It can fly."], correct: "It is small." },
                                "Look! It's a panda.": { options: ["It is black and white.", "It is brown.", "It has long legs.", "It can fly."], correct: "It is black and white." }
                            }
                        },
                        chinese: "画完猜动物"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "给动物画身体部位",
                        stepA: {
                            instruction: "先画什么？选一个身体部位",
                            options: ["These are two eyes.", "This is a nose.", "This is a mouth.", "These are two ears."]
                        },
                        stepB: {
                            instruction: "课本画动物的顺序：眼睛→鼻子→嘴巴→耳朵→说'This is a face.'。A画了哪步，选紧接着的下一步",
                            optionsMap: {
                                "These are two eyes.": { options: ["This is a nose.", "These are two eyes.", "This is a face.", "These are two legs."], correct: "This is a nose." },
                                "This is a nose.":     { options: ["This is a mouth.", "This is a nose.", "This is a face.", "These are two legs."], correct: "This is a mouth." },
                                "This is a mouth.":    { options: ["These are two ears.", "This is a mouth.", "This is a face.", "These are two legs."], correct: "These are two ears." },
                                "These are two ears.": { options: ["This is a face.", "These are two ears.", "These are two eyes.", "These are two legs."], correct: "This is a face." }
                            }
                        },
                        chinese: "画身体部位步骤"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "写Touch Your Face chant（顺序：Touch your face → Close your eyes → Open your mouth → Cover your ears → Touch your face …）",
                        stepA: {
                            instruction: "选第一句chant指令",
                            options: ["Touch your face.", "Close your eyes.", "Open your mouth.", "Cover your ears."]
                        },
                        stepB: {
                            instruction: "Chant顺序是：Touch face→Close eyes→Open mouth→Cover ears→再回到Touch face。A选了第一句，选紧接着的下一句",
                            optionsMap: {
                                "Touch your face.":  { options: ["Close your eyes.", "Touch your face.", "Open your mouth.", "Cover your ears."], correct: "Close your eyes." },
                                "Close your eyes.":  { options: ["Open your mouth.", "Close your eyes.", "Touch your face.", "Cover your ears."], correct: "Open your mouth." },
                                "Open your mouth.":  { options: ["Cover your ears.", "Open your mouth.", "Touch your face.", "Close your eyes."], correct: "Cover your ears." },
                                "Cover your ears.":  { options: ["Touch your face.", "Cover your ears.", "Close your eyes.", "Open your mouth."], correct: "Touch your face." }
                            }
                        },
                        chinese: "Touch Your Face chant顺序"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "下午好！一起画画吧",
                        stepA: {
                            instruction: "选一句打招呼+邀请",
                            options: ["Good afternoon. Let's draw together!", "Hello. Let's go.", "Hi. Let's jump.", "Good afternoon. Let's run."]
                        },
                        stepB: {
                            instruction: "A邀请画画了，选画什么开头",
                            optionsMap: {
                                "Good afternoon. Let's draw together!": { options: ["This is a face.", "I am white.", "I can jump.", "These are dogs."], correct: "This is a face." },
                                "Hello. Let's go.":                      { options: ["This is a face.", "I am white.", "I can jump.", "These are dogs."], correct: "This is a face." },
                                "Hi. Let's jump.":                       { options: ["This is a face.", "I am white.", "I can jump.", "These are dogs."], correct: "This is a face." },
                                "Good afternoon. Let's run.":            { options: ["This is a face.", "I am white.", "I can jump.", "These are dogs."], correct: "This is a face." }
                            }
                        },
                        chinese: "Good afternoon + Let's draw together"
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
                        type: "coop_read_relay", word: "lion", chinese: "狮子", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "mouse", chinese: "老鼠", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "nose", chinese: "鼻子", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "face", chinese: "脸", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "draw", chinese: "画", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "This is a face", chinese: "这是一张脸。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "These are two eyes", chinese: "这是两只眼睛。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "Touch your nose", chinese: "摸你的鼻子。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "Close your eyes", chinese: "闭上你的眼睛。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "Open your mouth", chinese: "张开你的嘴巴。", difficulty: "medium",
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
                        image: '<img src="assets/images/eye.png" width="90">',
                        answer: "These are two eyes",
                        chinese: "这是两只眼睛",
                        stepA: {
                            instruction: "看图片，说出完整句子：These are two _____.",
                            expected: "These are two eyes",
                            chinese: "这是两只眼睛"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：These are two _____.",
                            expected: "These are two eyes",
                            chinese: "这是两只眼睛"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/ear.png" width="90">',
                        answer: "These are two ears",
                        chinese: "这是两只耳朵",
                        stepA: {
                            instruction: "看图片，说出完整句子：These are two _____.",
                            expected: "These are two ears",
                            chinese: "这是两只耳朵"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：These are two _____.",
                            expected: "These are two ears",
                            chinese: "这是两只耳朵"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/nose.png" width="90">',
                        answer: "This is a nose",
                        chinese: "这是一个鼻子",
                        stepA: {
                            instruction: "看图片，说出完整句子：This is a _____.",
                            expected: "This is a nose",
                            chinese: "这是一个鼻子"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：This is a _____.",
                            expected: "This is a nose",
                            chinese: "这是一个鼻子"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/mouth.png" width="90">',
                        answer: "This is a mouth",
                        chinese: "这是一张嘴",
                        stepA: {
                            instruction: "看图片，说出完整句子：This is a _____.",
                            expected: "This is a mouth",
                            chinese: "这是一张嘴"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：This is a _____.",
                            expected: "This is a mouth",
                            chinese: "这是一张嘴"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/nose.png" width="90">',
                        answer: "Touch your nose",
                        chinese: "摸你的鼻子",
                        stepA: {
                            instruction: "看图片，说出完整句子：Touch your _____.",
                            expected: "Touch your nose",
                            chinese: "摸你的鼻子"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Touch your _____.",
                            expected: "Touch your nose",
                            chinese: "摸你的鼻子"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/eye.png" width="90">',
                        answer: "Close your eyes",
                        chinese: "闭上你的眼睛",
                        stepA: {
                            instruction: "看图片，说出完整句子：Close your _____.",
                            expected: "Close your eyes",
                            chinese: "闭上你的眼睛"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Close your _____.",
                            expected: "Close your eyes",
                            chinese: "闭上你的眼睛"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/mouth.png" width="90">',
                        answer: "Open your mouth",
                        chinese: "张开你的嘴巴",
                        stepA: {
                            instruction: "看图片，说出完整句子：Open your _____.",
                            expected: "Open your mouth",
                            chinese: "张开你的嘴巴"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Open your _____.",
                            expected: "Open your mouth",
                            chinese: "张开你的嘴巴"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/ear.png" width="90">',
                        answer: "Cover your ears",
                        chinese: "捂住你的耳朵",
                        stepA: {
                            instruction: "看图片，说出完整句子：Cover your _____.",
                            expected: "Cover your ears",
                            chinese: "捂住你的耳朵"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Cover your _____.",
                            expected: "Cover your ears",
                            chinese: "捂住你的耳朵"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/lion.png" width="90">',
                        answer: "Look It is a lion",
                        chinese: "看！是一只狮子",
                        stepA: {
                            instruction: "看图片，说出完整句子：Look! It's a _____.",
                            expected: "Look It is a lion",
                            chinese: "看！是一只狮子"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Look! It's a _____.",
                            expected: "Look It is a lion",
                            chinese: "看！是一只狮子"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/cat.png" width="90">',
                        answer: "Look It is a cat",
                        chinese: "看！是一只猫",
                        stepA: {
                            instruction: "看图片，说出完整句子：Look! It's a _____.",
                            expected: "Look It is a cat",
                            chinese: "看！是一只猫"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Look! It's a _____.",
                            expected: "Look It is a cat",
                            chinese: "看！是一只猫"
                        }
                    }
                ]
            },

            // ── 站点3：合作对话（hard）— 完整示范句+中文，AB说不同的话 ──
            {
                id: 3, name: "合作对话", icon: "🗣️",
                difficulty: "hard",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A说画画步骤，B猜动物或做动作指令对话",
                questions: [
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "一起画动物",
                        image: '<img src="assets/images/cat.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说画画步骤",
                            role: "画画者",
                            line: "This is a face. These are two eyes",
                            chinese: "这是一张脸。这是两只眼睛。"
                        },
                        stepB: {
                            instruction: "看示范句，猜动物",
                            role: "猜题者",
                            line: "Look It is a cat",
                            chinese: "看！是一只猫。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "一起画动物",
                        image: '<img src="assets/images/lion.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说画画步骤",
                            role: "画画者",
                            line: "This is a face. This is a nose",
                            chinese: "这是一张脸。这是一个鼻子。"
                        },
                        stepB: {
                            instruction: "看示范句，猜动物",
                            role: "猜题者",
                            line: "Look It is a lion",
                            chinese: "看！是一只狮子。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "做动作游戏",
                        image: '<img src="assets/images/nose.png" width="90">',
                        stepA: {
                            instruction: "看示范句，发出指令",
                            role: "老师",
                            line: "Touch your nose",
                            chinese: "摸你的鼻子。"
                        },
                        stepB: {
                            instruction: "看示范句，回应",
                            role: "学生",
                            line: "This is my nose",
                            chinese: "这是我的鼻子。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "做动作游戏",
                        image: '<img src="assets/images/eye.png" width="90">',
                        stepA: {
                            instruction: "看示范句，发出指令",
                            role: "老师",
                            line: "Close your eyes",
                            chinese: "闭上你的眼睛。"
                        },
                        stepB: {
                            instruction: "看示范句，回应",
                            role: "学生",
                            line: "Open your eyes",
                            chinese: "睁开你的眼睛。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "做动作游戏",
                        image: '<img src="assets/images/mouth.png" width="90">',
                        stepA: {
                            instruction: "看示范句，发出指令",
                            role: "老师",
                            line: "Open your mouth",
                            chinese: "张开你的嘴巴。"
                        },
                        stepB: {
                            instruction: "看示范句，回应",
                            role: "学生",
                            line: "Close your mouth",
                            chinese: "闭上你的嘴巴。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "做动作游戏",
                        image: '<img src="assets/images/ear.png" width="90">',
                        stepA: {
                            instruction: "看示范句，发出指令",
                            role: "老师",
                            line: "Cover your ears",
                            chinese: "捂住你的耳朵。"
                        },
                        stepB: {
                            instruction: "看示范句，回应",
                            role: "学生",
                            line: "These are my ears",
                            chinese: "这是我的耳朵。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "画画课打招呼",
                        image: '<img src="assets/images/panda.png" width="90">',
                        stepA: {
                            instruction: "看示范句，打招呼+邀请",
                            role: "同学A",
                            line: "Good afternoon. Let's draw together",
                            chinese: "下午好。我们一起画画吧！"
                        },
                        stepB: {
                            instruction: "看示范句，回应+提议",
                            role: "同学B",
                            line: "This is a face. These are two eyes",
                            chinese: "这是一张脸。这是两只眼睛。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "猜画的动物",
                        image: '<img src="assets/images/panda.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问是不是熊猫",
                            role: "猜题者",
                            line: "Is it a panda",
                            chinese: "是熊猫吗？"
                        },
                        stepB: {
                            instruction: "看示范句，回答不是",
                            role: "画画者",
                            line: "No it isn't. Look It is a cat",
                            chinese: "不是。看！是一只猫。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "Touch Your Face chant",
                        image: '<img src="assets/images/cat.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说chant前两句",
                            role: "领读",
                            line: "Face face touch your face",
                            chinese: "脸、脸，摸你的脸。"
                        },
                        stepB: {
                            instruction: "看示范句，说chant后两句",
                            role: "跟读",
                            line: "Eyes eyes close your eyes",
                            chinese: "眼睛、眼睛，闭上你的眼睛。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "Touch Your Face chant",
                        image: '<img src="assets/images/cat.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说chant第三句",
                            role: "领读",
                            line: "Mouth mouth open your mouth",
                            chinese: "嘴巴、嘴巴，张开你的嘴巴。"
                        },
                        stepB: {
                            instruction: "看示范句，说chant第四句",
                            role: "跟读",
                            line: "Ears ears cover your ears",
                            chinese: "耳朵、耳朵，捂住你的耳朵。"
                        }
                    }
                ]
            }
        ]
    }
};

// 导出（兼容直接 script 引入）
if (typeof window !== 'undefined') {
    window.u1l4_coop = u1l4_coop;
}
