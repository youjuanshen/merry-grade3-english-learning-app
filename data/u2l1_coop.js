/**
 * U2L1 合作冒险题库 — What size do you wear?
 * 主题：衣服尺码
 * 新词汇：size, S, M, L, XL, wear, T-shirt, too, small, big, put on, team, please, boys, girls
 * 累积词汇（from U1）：bear, horse, bird, panda, rabbit, monkey, duck, dog, cat, big, small, cute, fast, fly, run, this, that, it, these, those, they, have, ears, eyes, long, legs, like, grass, brown, lovely, white, black
 * 句型：What size do you wear? / Size S/M/L/XL. / It's too small/big. / Put on your ___.
 *
 * 每道题拆成 stepA（蓝色）→ stepB（橙色），B依赖A的结果
 */

var u2l1_coop = {
    id: "U2L1",
    title: "What size do you wear?",
    theme: "clothes sizes",

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
                        type: "coop_listen_relay", audio: "T-shirt", chinese: "T恤", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/T-shirt.png" width="70">', value: "T-shirt" },
                                { html: '<img src="assets/images/shirt.png" width="70">', value: "shirt" },
                                { html: '<img src="assets/images/jacket.png" width="70">', value: "jacket" },
                                { html: '<img src="assets/images/sweater.png" width="70">', value: "sweater" }
                            ],
                            correct: "T-shirt"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "T-shirt": { options: ["T恤","衬衫","夹克","毛衣"], correct: "T恤" },
                                "shirt":   { options: ["衬衫","T恤","夹克","毛衣"], correct: "衬衫" },
                                "jacket":  { options: ["夹克","T恤","衬衫","毛衣"], correct: "夹克" },
                                "sweater": { options: ["毛衣","T恤","衬衫","夹克"], correct: "毛衣" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "shirt", chinese: "衬衫", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/shirt.png" width="70">', value: "shirt" },
                                { html: '<img src="assets/images/T-shirt.png" width="70">', value: "T-shirt" },
                                { html: '<img src="assets/images/sweater.png" width="70">', value: "sweater" },
                                { html: '<img src="assets/images/jacket.png" width="70">', value: "jacket" }
                            ],
                            correct: "shirt"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "shirt":   { options: ["衬衫","T恤","毛衣","夹克"], correct: "衬衫" },
                                "T-shirt": { options: ["T恤","衬衫","毛衣","夹克"], correct: "T恤" },
                                "sweater": { options: ["毛衣","衬衫","T恤","夹克"], correct: "毛衣" },
                                "jacket":  { options: ["夹克","衬衫","T恤","毛衣"], correct: "夹克" }
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
                                { html: '<img src="assets/images/T-shirt.png" width="70">', value: "T-shirt" },
                                { html: '<img src="assets/images/sweater.png" width="70">', value: "sweater" }
                            ],
                            correct: "jacket"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "jacket":  { options: ["夹克","衬衫","T恤","毛衣"], correct: "夹克" },
                                "shirt":   { options: ["衬衫","夹克","T恤","毛衣"], correct: "衬衫" },
                                "T-shirt": { options: ["T恤","夹克","衬衫","毛衣"], correct: "T恤" },
                                "sweater": { options: ["毛衣","夹克","衬衫","T恤"], correct: "毛衣" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "sweater", chinese: "毛衣", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/sweater.png" width="70">', value: "sweater" },
                                { html: '<img src="assets/images/jacket.png" width="70">', value: "jacket" },
                                { html: '<img src="assets/images/shirt.png" width="70">', value: "shirt" },
                                { html: '<img src="assets/images/T-shirt.png" width="70">', value: "T-shirt" }
                            ],
                            correct: "sweater"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "sweater": { options: ["毛衣","夹克","衬衫","T恤"], correct: "毛衣" },
                                "jacket":  { options: ["夹克","毛衣","衬衫","T恤"], correct: "夹克" },
                                "shirt":   { options: ["衬衫","毛衣","夹克","T恤"], correct: "衬衫" },
                                "T-shirt": { options: ["T恤","毛衣","夹克","衬衫"], correct: "T恤" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "shorts", chinese: "短裤", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/shorts.png" width="70">', value: "shorts" },
                                { html: '<img src="assets/images/skirt.png" width="70">', value: "skirt" },
                                { html: '<img src="assets/images/T-shirt.png" width="70">', value: "T-shirt" },
                                { html: '<img src="assets/images/jacket.png" width="70">', value: "jacket" }
                            ],
                            correct: "shorts"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "shorts":  { options: ["短裤","裙子","T恤","夹克"], correct: "短裤" },
                                "skirt":   { options: ["裙子","短裤","T恤","夹克"], correct: "裙子" },
                                "T-shirt": { options: ["T恤","短裤","裙子","夹克"], correct: "T恤" },
                                "jacket":  { options: ["夹克","短裤","裙子","T恤"], correct: "夹克" }
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
                        type: "coop_listen_judge", audio: "T-shirt", difficulty: "easy",
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
                        type: "coop_listen_judge", audio: "jacket", difficulty: "easy",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        isMatch: false, chinese: "夹克",
                        correctImage: '<img src="assets/images/jacket.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                            ],
                            correct: "jacket"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "sweater", difficulty: "medium",
                        image: '<img src="assets/images/sweater.png" width="90">',
                        isMatch: true, chinese: "毛衣",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
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
                        type: "coop_listen_judge", audio: "shirt", difficulty: "medium",
                        image: '<img src="assets/images/sweater.png" width="90">',
                        isMatch: false, chinese: "衬衫",
                        correctImage: '<img src="assets/images/shirt.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" },
                                { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" }
                            ],
                            correct: "shirt"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "shorts", difficulty: "medium",
                        image: '<img src="assets/images/skirt.png" width="90">',
                        isMatch: false, chinese: "短裤",
                        correctImage: '<img src="assets/images/shorts.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/shorts.png" width="60">', value: "shorts" },
                                { html: '<img src="assets/images/skirt.png" width="60">', value: "skirt" },
                                { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" }
                            ],
                            correct: "shorts"
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
                        sequence: ["T-shirt", "shirt", "jacket"],
                        words: [
                            { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                            { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                            { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" }
                        ],
                        chinese: "T-shirt → shirt → jacket"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["sweater", "shorts", "skirt"],
                        words: [
                            { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" },
                            { html: '<img src="assets/images/shorts.png" width="60">', value: "shorts" },
                            { html: '<img src="assets/images/skirt.png" width="60">', value: "skirt" }
                        ],
                        chinese: "sweater → shorts → skirt"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["jacket", "T-shirt", "sweater"],
                        words: [
                            { html: '<img src="assets/images/jacket.png" width="55">', value: "jacket" },
                            { html: '<img src="assets/images/T-shirt.png" width="55">', value: "T-shirt" },
                            { html: '<img src="assets/images/sweater.png" width="55">', value: "sweater" }
                        ],
                        chinese: "jacket → T-shirt → sweater"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["shirt", "sweater", "shorts"],
                        words: [
                            { html: '<img src="assets/images/shirt.png" width="55">', value: "shirt" },
                            { html: '<img src="assets/images/sweater.png" width="55">', value: "sweater" },
                            { html: '<img src="assets/images/shorts.png" width="55">', value: "shorts" }
                        ],
                        chinese: "shirt → sweater → shorts"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["T-shirt", "jacket", "shirt", "sweater"],
                        words: [
                            { html: '<img src="assets/images/T-shirt.png" width="50">', value: "T-shirt" },
                            { html: '<img src="assets/images/jacket.png" width="50">', value: "jacket" },
                            { html: '<img src="assets/images/shirt.png" width="50">', value: "shirt" },
                            { html: '<img src="assets/images/sweater.png" width="50">', value: "sweater" }
                        ],
                        chinese: "T-shirt → jacket → shirt → sweater"
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
                        scenario: "体育课要穿队服，老师在说尺码",
                        audio: "Boys and girls, put on your team T-shirts, please. Size S.",
                        stepA: {
                            instruction: "听音频，老师说的是什么尺码？",
                            question: "老师说穿什么尺码？",
                            options: ["Size S", "Size M", "Size L", "Size XL"],
                            correct: "Size S"
                        },
                        stepB: {
                            instruction: "A听到的尺码，你穿合适吗？",
                            question: "Size S适合谁？",
                            optionsMap: {
                                "Size S":  { options: ["适合小个子同学", "适合大个子同学"], correct: "适合小个子同学" },
                                "Size M":  { options: ["适合中等身材同学", "适合小个子同学"], correct: "适合中等身材同学" },
                                "Size L":  { options: ["适合大个子同学", "适合小个子同学"], correct: "适合大个子同学" },
                                "Size XL": { options: ["适合最大的同学", "适合小个子同学"], correct: "适合最大的同学" }
                            }
                        },
                        chinese: "穿Size S的队服"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "同学试衣服，觉得不合适",
                        audio: "What size do you wear? Size M. It's too small.",
                        stepA: {
                            instruction: "听音频，这件衣服怎么了？",
                            question: "衣服合适吗？",
                            options: ["太小了", "太大了", "刚刚好", "太长了"],
                            correct: "太小了"
                        },
                        stepB: {
                            instruction: "衣服太小了，应该换什么尺码？",
                            question: "应该换大一号吗？",
                            optionsMap: {
                                "太小了": { options: ["对！换大一号Size L", "不用换"], correct: "对！换大一号Size L" },
                                "太大了": { options: ["对！换小一号", "不用换"], correct: "对！换小一号" },
                                "刚刚好": { options: ["不用换", "换大一号"], correct: "不用换" },
                                "太长了": { options: ["换短一点的", "不用换"], correct: "换短一点的" }
                            }
                        },
                        chinese: "Size M太小了，要换大号"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "老师让穿上T恤",
                        audio: "Put on your T-shirt, please. Size L.",
                        stepA: {
                            instruction: "听音频，老师让穿什么？",
                            question: "老师让穿什么衣服？",
                            options: ["T-shirt", "shirt", "jacket", "sweater"],
                            correct: "T-shirt"
                        },
                        stepB: {
                            instruction: "音频说了Size L，帮A找Size L的T-shirt",
                            question: "什么尺码的T-shirt？",
                            optionsMap: {
                                "T-shirt": { options: ["Size L", "Size S", "Size M", "Size XL"], correct: "Size L" },
                                "shirt":   { options: ["Size L", "Size S", "Size M", "Size XL"], correct: "Size L" },
                                "jacket":  { options: ["Size L", "Size S", "Size M", "Size XL"], correct: "Size L" },
                                "sweater": { options: ["Size L", "Size S", "Size M", "Size XL"], correct: "Size L" }
                            }
                        },
                        chinese: "穿Size L的T-shirt"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "同学说衣服太大了",
                        audio: "What size do you wear? Size XL. It's too big.",
                        stepA: {
                            instruction: "听音频，衣服怎么了？",
                            question: "这件衣服怎么样？",
                            options: ["太大了", "太小了", "刚刚好", "很好看"],
                            correct: "太大了"
                        },
                        stepB: {
                            instruction: "衣服太大了，应该怎么办？",
                            question: "应该换小一号吗？",
                            optionsMap: {
                                "太大了": { options: ["对！换小一号Size L", "不用换"], correct: "对！换小一号Size L" },
                                "太小了": { options: ["换大一号", "不用换"], correct: "换大一号" },
                                "刚刚好": { options: ["不用换", "换大一号"], correct: "不用换" },
                                "很好看": { options: ["不用换", "换小一号"], correct: "不用换" }
                            }
                        },
                        chinese: "Size XL太大了"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "问同学穿什么尺码",
                        audio: "What size do you wear? Size M.",
                        stepA: {
                            instruction: "听音频，同学穿什么尺码？",
                            question: "同学穿什么尺码？",
                            options: ["Size M", "Size S", "Size L", "Size XL"],
                            correct: "Size M"
                        },
                        stepB: {
                            instruction: "同学穿Size M，帮他选衣服",
                            question: "哪件是Size M的？",
                            optionsMap: {
                                "Size M":  { options: ["中号T恤", "小号T恤", "大号T恤", "特大号T恤"], correct: "中号T恤" },
                                "Size S":  { options: ["小号T恤", "中号T恤", "大号T恤", "特大号T恤"], correct: "小号T恤" },
                                "Size L":  { options: ["大号T恤", "中号T恤", "小号T恤", "特大号T恤"], correct: "大号T恤" },
                                "Size XL": { options: ["特大号T恤", "中号T恤", "大号T恤", "小号T恤"], correct: "特大号T恤" }
                            }
                        },
                        chinese: "同学穿Size M"
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
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["T-shirt", "shirt", "jacket", "sweater"],
                            correct: "T-shirt"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "T-shirt": { options: ["T恤","衬衫","夹克","毛衣"], correct: "T恤" },
                                "shirt":   { options: ["衬衫","T恤","夹克","毛衣"], correct: "衬衫" },
                                "jacket":  { options: ["夹克","T恤","衬衫","毛衣"], correct: "夹克" },
                                "sweater": { options: ["毛衣","T恤","衬衫","夹克"], correct: "毛衣" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["shirt", "T-shirt", "sweater", "jacket"],
                            correct: "shirt"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "shirt":   { options: ["衬衫","T恤","毛衣","夹克"], correct: "衬衫" },
                                "T-shirt": { options: ["T恤","衬衫","毛衣","夹克"], correct: "T恤" },
                                "sweater": { options: ["毛衣","衬衫","T恤","夹克"], correct: "毛衣" },
                                "jacket":  { options: ["夹克","衬衫","T恤","毛衣"], correct: "夹克" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["jacket", "shirt", "T-shirt", "shorts"],
                            correct: "jacket"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "jacket":  { options: ["夹克","衬衫","T恤","短裤"], correct: "夹克" },
                                "shirt":   { options: ["衬衫","夹克","T恤","短裤"], correct: "衬衫" },
                                "T-shirt": { options: ["T恤","夹克","衬衫","短裤"], correct: "T恤" },
                                "shorts":  { options: ["短裤","夹克","衬衫","T恤"], correct: "短裤" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/sweater.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["sweater", "jacket", "shirt", "skirt"],
                            correct: "sweater"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "sweater": { options: ["毛衣","夹克","衬衫","裙子"], correct: "毛衣" },
                                "jacket":  { options: ["夹克","毛衣","衬衫","裙子"], correct: "夹克" },
                                "shirt":   { options: ["衬衫","毛衣","夹克","裙子"], correct: "衬衫" },
                                "skirt":   { options: ["裙子","毛衣","夹克","衬衫"], correct: "裙子" }
                            }
                        }
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/shorts.png" width="90">',
                        stepA: {
                            instruction: "看图片，选英文单词",
                            options: ["shorts", "skirt", "shirt", "sweater"],
                            correct: "shorts"
                        },
                        stepB: {
                            instruction: "看A选的单词，选中文意思",
                            optionsMap: {
                                "shorts":  { options: ["短裤","裙子","衬衫","毛衣"], correct: "短裤" },
                                "skirt":   { options: ["裙子","短裤","衬衫","毛衣"], correct: "裙子" },
                                "shirt":   { options: ["衬衫","短裤","裙子","毛衣"], correct: "衬衫" },
                                "sweater": { options: ["毛衣","短裤","裙子","衬衫"], correct: "毛衣" }
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
                            { word: "T-shirt", match: '<img src="assets/images/T-shirt.png" width="50">', chinese: "T恤" },
                            { word: "shirt", match: '<img src="assets/images/shirt.png" width="50">', chinese: "衬衫" },
                            { word: "jacket", match: '<img src="assets/images/jacket.png" width="50">', chinese: "夹克" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "sweater", match: '<img src="assets/images/sweater.png" width="50">', chinese: "毛衣" },
                            { word: "shorts", match: '<img src="assets/images/shorts.png" width="50">', chinese: "短裤" },
                            { word: "skirt", match: '<img src="assets/images/skirt.png" width="50">', chinese: "裙子" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "medium",
                        pairs: [
                            { word: "T-shirt", match: '<img src="assets/images/T-shirt.png" width="50">', chinese: "T恤" },
                            { word: "sweater", match: '<img src="assets/images/sweater.png" width="50">', chinese: "毛衣" },
                            { word: "shorts", match: '<img src="assets/images/shorts.png" width="50">', chinese: "短裤" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "jacket", match: '<img src="assets/images/jacket.png" width="50">', chinese: "夹克" },
                            { word: "shirt", match: '<img src="assets/images/shirt.png" width="50">', chinese: "衬衫" },
                            { word: "sweater", match: '<img src="assets/images/sweater.png" width="50">', chinese: "毛衣" },
                            { word: "skirt", match: '<img src="assets/images/skirt.png" width="50">', chinese: "裙子" }
                        ]
                    },
                    {
                        type: "coop_flip_match", difficulty: "hard",
                        pairs: [
                            { word: "T-shirt", match: '<img src="assets/images/T-shirt.png" width="50">', chinese: "T恤" },
                            { word: "shorts", match: '<img src="assets/images/shorts.png" width="50">', chinese: "短裤" },
                            { word: "jacket", match: '<img src="assets/images/jacket.png" width="50">', chinese: "夹克" },
                            { word: "shirt", match: '<img src="assets/images/shirt.png" width="50">', chinese: "衬衫" }
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
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        stepA: {
                            instruction: "看图片，选正确的英文句子",
                            options: [
                                { html: "Put on your T-shirt.", value: "Put on your T-shirt." },
                                { html: "Put on your jacket.", value: "Put on your jacket." },
                                { html: "Put on your sweater.", value: "Put on your sweater." },
                                { html: "Put on your shirt.", value: "Put on your shirt." }
                            ],
                            correct: "Put on your T-shirt."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Put on your T-shirt.": { options: ["穿上你的T恤。","穿上你的夹克。","穿上你的毛衣。","穿上你的衬衫。"], correct: "穿上你的T恤。" },
                                "Put on your jacket.":  { options: ["穿上你的夹克。","穿上你的T恤。","穿上你的毛衣。","穿上你的衬衫。"], correct: "穿上你的夹克。" },
                                "Put on your sweater.": { options: ["穿上你的毛衣。","穿上你的T恤。","穿上你的夹克。","穿上你的衬衫。"], correct: "穿上你的毛衣。" },
                                "Put on your shirt.":   { options: ["穿上你的衬衫。","穿上你的T恤。","穿上你的夹克。","穿上你的毛衣。"], correct: "穿上你的衬衫。" }
                            }
                        },
                        chinese: "穿上T恤"
                    },
                    {
                        type: "coop_word_relay", difficulty: "easy",
                        image: '<img src="assets/images/wear.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的英文",
                            options: [
                                { html: "What size do you wear?", value: "What size do you wear?" },
                                { html: "Put on your T-shirt.", value: "Put on your T-shirt." },
                                { html: "It's too small.", value: "It's too small." },
                                { html: "It's too big.", value: "It's too big." }
                            ],
                            correct: "What size do you wear?"
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "What size do you wear?": { options: ["你穿多大号？","穿上你的T恤。","太小了。","太大了。"], correct: "你穿多大号？" },
                                "Put on your T-shirt.":   { options: ["穿上你的T恤。","你穿多大号？","太小了。","太大了。"], correct: "穿上你的T恤。" },
                                "It's too small.":        { options: ["太小了。","你穿多大号？","穿上你的T恤。","太大了。"], correct: "太小了。" },
                                "It's too big.":          { options: ["太大了。","你穿多大号？","穿上你的T恤。","太小了。"], correct: "太大了。" }
                            }
                        },
                        chinese: "你穿多大号？"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的英文",
                            options: [
                                { html: "It's too small.", value: "It's too small." },
                                { html: "It's too big.", value: "It's too big." },
                                { html: "Size M.", value: "Size M." },
                                { html: "Size S.", value: "Size S." }
                            ],
                            correct: "It's too small."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "It's too small.": { options: ["太小了。","太大了。","中号。","小号。"], correct: "太小了。" },
                                "It's too big.":   { options: ["太大了。","太小了。","中号。","小号。"], correct: "太大了。" },
                                "Size M.":         { options: ["中号。","太小了。","太大了。","小号。"], correct: "中号。" },
                                "Size S.":         { options: ["小号。","太小了。","太大了。","中号。"], correct: "小号。" }
                            }
                        },
                        chinese: "太小了"
                    },
                    {
                        type: "coop_word_relay", difficulty: "medium",
                        image: '<img src="assets/images/scenario_clothes.png" width="90">',
                        stepA: {
                            instruction: "读句子，选正确的英文",
                            options: [
                                { html: "Size L.", value: "Size L." },
                                { html: "Size XL.", value: "Size XL." },
                                { html: "Size S.", value: "Size S." },
                                { html: "Size M.", value: "Size M." }
                            ],
                            correct: "Size L."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "Size L.":  { options: ["大号。","特大号。","小号。","中号。"], correct: "大号。" },
                                "Size XL.": { options: ["特大号。","大号。","小号。","中号。"], correct: "特大号。" },
                                "Size S.":  { options: ["小号。","大号。","特大号。","中号。"], correct: "小号。" },
                                "Size M.":  { options: ["中号。","大号。","特大号。","小号。"], correct: "中号。" }
                            }
                        },
                        chinese: "大号"
                    },
                    {
                        type: "coop_word_relay", difficulty: "hard",
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        stepA: {
                            instruction: "读对话，选正确的回答",
                            options: [
                                { html: "It's too big.", value: "It's too big." },
                                { html: "It's too small.", value: "It's too small." },
                                { html: "Size M.", value: "Size M." },
                                { html: "Put on your T-shirt.", value: "Put on your T-shirt." }
                            ],
                            correct: "It's too big."
                        },
                        stepB: {
                            instruction: "选中文意思",
                            optionsMap: {
                                "It's too big.":          { options: ["太大了。","太小了。","中号。","穿上你的T恤。"], correct: "太大了。" },
                                "It's too small.":        { options: ["太小了。","太大了。","中号。","穿上你的T恤。"], correct: "太小了。" },
                                "Size M.":                { options: ["中号。","太大了。","太小了。","穿上你的T恤。"], correct: "中号。" },
                                "Put on your T-shirt.":   { options: ["穿上你的T恤。","太大了。","太小了。","中号。"], correct: "穿上你的T恤。" }
                            }
                        },
                        chinese: "太大了"
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
                        scenario: "帮同学选合适的衣服尺码",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "What size do you wear? Size S. It's too small.",
                            question: "这件衣服怎么了？",
                            options: ["太小了", "太大了", "刚好合适", "很好看"],
                            correct: "太小了"
                        },
                        stepB: {
                            instruction: "根据A的描述，应该换什么尺码？",
                            optionsMap: {
                                "太小了": { options: ["Size M", "Size S", "Size XL", "不换"], correct: "Size M" },
                                "太大了": { options: ["Size S", "Size M", "Size XL", "不换"], correct: "Size S" },
                                "刚好合适": { options: ["不换", "Size M", "Size L", "Size S"], correct: "不换" },
                                "很好看": { options: ["不换", "Size M", "Size L", "Size S"], correct: "不换" }
                            }
                        },
                        chinese: "Size S太小→换Size M"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "老师让穿队服",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Boys and girls, put on your team T-shirts, please.",
                            question: "老师让大家做什么？",
                            options: ["穿上队服T恤", "脱下T恤", "买T恤", "洗T恤"],
                            correct: "穿上队服T恤"
                        },
                        stepB: {
                            instruction: "根据A的选择，选一个正确的回答",
                            optionsMap: {
                                "穿上队服T恤": { options: ["What size do you wear?", "I don't like T-shirts.", "It's a cat.", "These are dogs."], correct: "What size do you wear?" },
                                "脱下T恤": { options: ["What size do you wear?", "OK!", "It's a cat.", "These are dogs."], correct: "OK!" },
                                "买T恤": { options: ["What size do you wear?", "OK!", "It's a cat.", "These are dogs."], correct: "What size do you wear?" },
                                "洗T恤": { options: ["OK!", "What size do you wear?", "It's a cat.", "These are dogs."], correct: "OK!" }
                            }
                        },
                        chinese: "老师让穿队服→问尺码"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "帮同学选尺码",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "What size do you wear? Size XL. It's too big.",
                            question: "这件衣服怎么了？",
                            options: ["太大了", "太小了", "刚好合适", "很便宜"],
                            correct: "太大了"
                        },
                        stepB: {
                            instruction: "根据A的描述，应该换什么尺码？",
                            optionsMap: {
                                "太大了": { options: ["Size L", "Size XL", "Size S", "不换"], correct: "Size L" },
                                "太小了": { options: ["Size XL", "Size L", "Size S", "不换"], correct: "Size XL" },
                                "刚好合适": { options: ["不换", "Size L", "Size S", "Size M"], correct: "不换" },
                                "很便宜": { options: ["不换", "Size L", "Size S", "Size M"], correct: "不换" }
                            }
                        },
                        chinese: "Size XL太大→换Size L"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "读对话，判断穿什么",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "Put on your T-shirt, please. Size M.",
                            question: "要穿什么衣服？",
                            options: ["T恤，中号", "衬衫，大号", "夹克，小号", "毛衣，中号"],
                            correct: "T恤，中号"
                        },
                        stepB: {
                            instruction: "根据A的选择，选正确的图片",
                            optionsMap: {
                                "T恤，中号": { options: [
                                    { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                    { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                    { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                    { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                                ], correct: "T-shirt" },
                                "衬衫，大号": { options: [
                                    { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                    { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                    { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                    { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                                ], correct: "shirt" },
                                "夹克，小号": { options: [
                                    { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                    { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                    { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                    { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                                ], correct: "jacket" },
                                "毛衣，中号": { options: [
                                    { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" },
                                    { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                    { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                    { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" }
                                ], correct: "sweater" }
                            }
                        },
                        chinese: "穿Size M的T-shirt"
                    },
                    {
                        type: "coop_read_scenario", difficulty: "hard",
                        scenario: "同学在试衣服",
                        stepA: {
                            instruction: "读一读这段话",
                            text: "What size do you wear? Size L.",
                            question: "同学穿什么尺码？",
                            options: ["大号 Size L", "中号 Size M", "小号 Size S", "特大号 Size XL"],
                            correct: "大号 Size L"
                        },
                        stepB: {
                            instruction: "根据A的选择，帮同学拿衣服",
                            optionsMap: {
                                "大号 Size L":   { options: ["拿Size L的T恤", "拿Size S的T恤", "拿Size M的T恤", "拿Size XL的T恤"], correct: "拿Size L的T恤" },
                                "中号 Size M":   { options: ["拿Size M的T恤", "拿Size S的T恤", "拿Size L的T恤", "拿Size XL的T恤"], correct: "拿Size M的T恤" },
                                "小号 Size S":   { options: ["拿Size S的T恤", "拿Size M的T恤", "拿Size L的T恤", "拿Size XL的T恤"], correct: "拿Size S的T恤" },
                                "特大号 Size XL": { options: ["拿Size XL的T恤", "拿Size S的T恤", "拿Size M的T恤", "拿Size L的T恤"], correct: "拿Size XL的T恤" }
                            }
                        },
                        chinese: "同学穿Size L"
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
                        sentence: "Put on your T-shirt.",
                        stepA: { words: ["Put", "on"], instruction: "选前半句的词" },
                        stepB: { words: ["your", "T-shirt."], instruction: "选后半句的词" },
                        chinese: "穿上你的T恤。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "What size do you wear?",
                        stepA: { words: ["What", "size"], instruction: "选前半句的词" },
                        stepB: { words: ["do", "you", "wear?"], instruction: "选后半句的词" },
                        chinese: "你穿多大号？"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "It's too small.",
                        stepA: { words: ["It's", "too"], instruction: "选前半句的词" },
                        stepB: { words: ["small."], instruction: "选后半句的词" },
                        chinese: "太小了。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "easy",
                        sentence: "It's too big.",
                        stepA: { words: ["It's", "too"], instruction: "选前半句的词" },
                        stepB: { words: ["big."], instruction: "选后半句的词" },
                        chinese: "太大了。"
                    },
                    {
                        type: "coop_build_sentence", difficulty: "medium",
                        sentence: "Boys and girls, put on your team T-shirts, please.",
                        stepA: { words: ["Boys", "and", "girls,"], instruction: "选前半句的词" },
                        stepB: { words: ["put", "on", "your", "team", "T-shirts,", "please."], instruction: "选后半句的词" },
                        chinese: "同学们，请穿上你们的队服T恤。"
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
                        template: "What ___ do you wear? Size ___.",
                        image: '<img src="assets/images/wear.png" width="70">',
                        stepA: { blank: 1, options: ["size", "color", "name", "time"], correct: "size", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["S", "big", "small", "too"], correct: "S", instruction: "图片里小朋友穿的是Size S，填第2个空" },
                        chinese: "What size do you wear? Size S."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "Put on your ___. It's too ___.",
                        image: '<img src="assets/images/T-shirt.png" width="70">',
                        stepA: { blank: 1, options: ["T-shirt", "shirt", "jacket", "sweater"], correct: "T-shirt", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["small", "big", "long", "short"], correct: "small", instruction: "这件T恤太小了，填第2个空" },
                        chinese: "Put on your T-shirt. It's too small."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "medium",
                        template: "Put on your ___, please. Size ___.",
                        image: '<img src="assets/images/jacket.png" width="70">',
                        stepA: { blank: 1, options: ["jacket", "T-shirt", "shirt", "sweater"], correct: "jacket", instruction: "看图填第1个空" },
                        stepB: { blank: 2, options: ["L", "S", "M", "XL"], correct: "L", instruction: "图片上标着Size L，填第2个空" },
                        chinese: "Put on your jacket, please. Size L."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "What size do you ___? Size ___.",
                        image: '<img src="assets/images/wear.png" width="70">',
                        stepA: { blank: 1, options: ["wear", "put", "like", "have"], correct: "wear", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["M", "S", "L", "XL"], correct: "M", instruction: "对话说同学穿Size M，填第2个空" },
                        chinese: "What size do you wear? Size M."
                    },
                    {
                        type: "coop_relay_fill", difficulty: "hard",
                        template: "___ and girls, put on your team ___, please.",
                        image: '<img src="assets/images/T-shirt.png" width="70">',
                        stepA: { blank: 1, options: ["Boys", "Dogs", "Cats", "Bears"], correct: "Boys", instruction: "填第1个空" },
                        stepB: { blank: 2, options: ["T-shirts", "shoes", "hats", "bags"], correct: "T-shirts", instruction: "填第2个空" },
                        chinese: "Boys and girls, put on your team T-shirts, please."
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
                        word: "shirt",
                        image: '<img src="assets/images/shirt.png" width="60">',
                        stepA: { letters: ["s", "h", "i"], distractors: ["a", "o"], instruction: "拼前半：s____" },
                        stepB: { letters: ["r", "t"], distractors: ["n", "d"], instruction: "拼后半：___rt" },
                        chinese: "衬衫"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "size",
                        image: '<img src="assets/images/wear.png" width="60">',
                        stepA: { letters: ["s", "i"], distractors: ["a", "o"], instruction: "拼前半：s___" },
                        stepB: { letters: ["z", "e"], distractors: ["t", "n"], instruction: "拼后半：__ze" },
                        chinese: "尺码"
                    },
                    {
                        type: "coop_spell_word", difficulty: "medium",
                        word: "wear",
                        image: '<img src="assets/images/wear.png" width="60">',
                        stepA: { letters: ["w", "e"], distractors: ["r", "t"], instruction: "拼前半：w___" },
                        stepB: { letters: ["a", "r"], distractors: ["e", "n"], instruction: "拼后半：__ar" },
                        chinese: "穿"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "small",
                        image: '<img src="assets/images/T-shirt.png" width="60">',
                        stepA: { letters: ["s", "m", "a"], distractors: ["o", "e"], instruction: "拼前半：s____" },
                        stepB: { letters: ["l", "l"], distractors: ["r", "n"], instruction: "拼后半：___ll" },
                        chinese: "小的"
                    },
                    {
                        type: "coop_spell_word", difficulty: "hard",
                        word: "jacket",
                        image: '<img src="assets/images/jacket.png" width="60">',
                        stepA: { letters: ["j", "a", "c"], distractors: ["o", "u"], instruction: "拼前半：j_____" },
                        stepB: { letters: ["k", "e", "t"], distractors: ["n", "d"], instruction: "拼后半：___ket" },
                        chinese: "夹克"
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
                        scenario: "帮同学问尺码",
                        stepA: {
                            instruction: "你想知道同学穿什么尺码，选一句话问他",
                            options: ["What size do you wear?", "Put on your T-shirt.", "It's too big.", "It's too small."]
                        },
                        stepB: {
                            instruction: "回答A的问题",
                            optionsMap: {
                                "What size do you wear?": { options: ["Size M.", "It's too big.", "Put on your T-shirt.", "These are dogs."], correct: "Size M." },
                                "Put on your T-shirt.":   { options: ["OK!", "Size M.", "It's too big.", "These are dogs."], correct: "OK!" },
                                "It's too big.":          { options: ["换小一号", "Size M.", "OK!", "These are dogs."], correct: "换小一号" },
                                "It's too small.":        { options: ["换大一号", "Size M.", "OK!", "These are dogs."], correct: "换大一号" }
                            }
                        },
                        chinese: "问尺码并回答"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "体育课，老师让穿队服",
                        stepA: {
                            instruction: "你是老师，让同学穿上队服",
                            options: ["Boys and girls, put on your team T-shirts, please.", "What size do you wear?", "It's too small.", "It's too big."]
                        },
                        stepB: {
                            instruction: "你是同学，回应老师",
                            optionsMap: {
                                "Boys and girls, put on your team T-shirts, please.": { options: ["What size do you wear?", "It's too big.", "These are dogs.", "They have long legs."], correct: "What size do you wear?" },
                                "What size do you wear?": { options: ["Size S.", "It's too big.", "These are dogs.", "Put on your T-shirt."], correct: "Size S." },
                                "It's too small.": { options: ["换大一号", "Size S.", "These are dogs.", "Put on your T-shirt."], correct: "换大一号" },
                                "It's too big.": { options: ["换小一号", "Size S.", "These are dogs.", "Put on your T-shirt."], correct: "换小一号" }
                            }
                        },
                        chinese: "老师让穿队服"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "同学试衣服发现不合适",
                        stepA: {
                            instruction: "你试了一件T恤，告诉同学怎么了",
                            options: ["It's too small.", "It's too big.", "Size M.", "Put on your T-shirt."]
                        },
                        stepB: {
                            instruction: "帮A想办法",
                            optionsMap: {
                                "It's too small.": { options: ["换Size L吧", "换Size S吧", "真好看", "These are pandas."], correct: "换Size L吧" },
                                "It's too big.":   { options: ["换Size S吧", "换Size L吧", "真好看", "These are pandas."], correct: "换Size S吧" },
                                "Size M.":         { options: ["试试看合不合适", "换Size S吧", "真好看", "These are pandas."], correct: "试试看合不合适" },
                                "Put on your T-shirt.": { options: ["OK!", "换Size S吧", "真好看", "These are pandas."], correct: "OK!" }
                            }
                        },
                        chinese: "衣服不合适，换尺码"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "帮同学选衣服（同学穿Size M）",
                        stepA: {
                            instruction: "同学穿Size M，选一件衣服给他",
                            options: [
                                { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" },
                                { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                            ]
                        },
                        stepB: {
                            instruction: "同学穿Size M，A选了衣服，说让他穿上",
                            optionsMap: {
                                "T-shirt": { options: ["Put on your T-shirt. Size M.", "Put on your T-shirt. Size S.", "Put on your T-shirt. Size L.", "Put on your T-shirt. Size XL."], correct: "Put on your T-shirt. Size M." },
                                "shirt":   { options: ["Put on your shirt. Size M.", "Put on your shirt. Size S.", "Put on your shirt. Size L.", "Put on your shirt. Size XL."], correct: "Put on your shirt. Size M." },
                                "jacket":  { options: ["Put on your jacket. Size M.", "Put on your jacket. Size S.", "Put on your jacket. Size L.", "Put on your jacket. Size XL."], correct: "Put on your jacket. Size M." },
                                "sweater": { options: ["Put on your sweater. Size M.", "Put on your sweater. Size S.", "Put on your sweater. Size L.", "Put on your sweater. Size XL."], correct: "Put on your sweater. Size M." }
                            }
                        },
                        chinese: "选衣服，尺码Size M"
                    },
                    {
                        type: "coop_write_scenario", difficulty: "hard",
                        scenario: "和同学讨论衣服尺码",
                        stepA: {
                            instruction: "问同学穿什么尺码",
                            options: ["What size do you wear?", "Put on your jacket.", "It's too small.", "It's too big."]
                        },
                        stepB: {
                            instruction: "告诉A你穿的尺码",
                            optionsMap: {
                                "What size do you wear?": { options: ["Size L.", "It's too big.", "Put on your T-shirt.", "These are pandas."], correct: "Size L." },
                                "Put on your jacket.": { options: ["OK!", "Size L.", "It's too big.", "These are pandas."], correct: "OK!" },
                                "It's too small.": { options: ["换大一号Size L", "Size L.", "OK!", "These are pandas."], correct: "换大一号Size L" },
                                "It's too big.": { options: ["换小一号Size M", "Size L.", "OK!", "These are pandas."], correct: "换小一号Size M" }
                            }
                        },
                        chinese: "讨论衣服尺码"
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
                        type: "coop_read_relay", word: "T-shirt", chinese: "T恤", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "size", chinese: "尺码", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "wear", chinese: "穿", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "small", chinese: "小的", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "please", chinese: "请", difficulty: "easy",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "What size do you wear", chinese: "你穿多大号？", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "It's too small", chinese: "太小了。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "It's too big", chinese: "太大了。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "Put on your T-shirt", chinese: "穿上你的T恤。", difficulty: "medium",
                        stepA: { instruction: "听音频，跟着读" },
                        stepB: { instruction: "跟着读同一个" }
                    },
                    {
                        type: "coop_read_relay", word: "Size M", chinese: "中号。", difficulty: "easy",
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
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        answer: "Put on your T-shirt",
                        chinese: "穿上你的T恤",
                        stepA: {
                            instruction: "看图片，说出完整句子：Put on your _____.",
                            expected: "Put on your T-shirt",
                            chinese: "穿上你的T恤"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Put on your _____.",
                            expected: "Put on your T-shirt",
                            chinese: "穿上你的T恤"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        answer: "Put on your jacket",
                        chinese: "穿上你的夹克",
                        stepA: {
                            instruction: "看图片，说出完整句子：Put on your _____.",
                            expected: "Put on your jacket",
                            chinese: "穿上你的夹克"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Put on your _____.",
                            expected: "Put on your jacket",
                            chinese: "穿上你的夹克"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        answer: "Put on your shirt",
                        chinese: "穿上你的衬衫",
                        stepA: {
                            instruction: "看图片，说出完整句子：Put on your _____.",
                            expected: "Put on your shirt",
                            chinese: "穿上你的衬衫"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Put on your _____.",
                            expected: "Put on your shirt",
                            chinese: "穿上你的衬衫"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/sweater.png" width="90">',
                        answer: "Put on your sweater",
                        chinese: "穿上你的毛衣",
                        stepA: {
                            instruction: "看图片，说出完整句子：Put on your _____.",
                            expected: "Put on your sweater",
                            chinese: "穿上你的毛衣"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Put on your _____.",
                            expected: "Put on your sweater",
                            chinese: "穿上你的毛衣"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        answer: "It's too small",
                        chinese: "太小了",
                        stepA: {
                            instruction: "看图片，说出完整句子：It's too _____.",
                            expected: "It's too small",
                            chinese: "太小了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：It's too _____.",
                            expected: "It's too small",
                            chinese: "太小了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        answer: "It's too big",
                        chinese: "太大了",
                        stepA: {
                            instruction: "看图片，说出完整句子：It's too _____.",
                            expected: "It's too big",
                            chinese: "太大了"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：It's too _____.",
                            expected: "It's too big",
                            chinese: "太大了"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/wear.png" width="90">',
                        answer: "What size do you wear",
                        chinese: "你穿多大号",
                        stepA: {
                            instruction: "看图片，说出完整句子：What _____ do you wear?",
                            expected: "What size do you wear",
                            chinese: "你穿多大号"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：What _____ do you wear?",
                            expected: "What size do you wear",
                            chinese: "你穿多大号"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/shorts.png" width="90">',
                        answer: "Put on your shorts",
                        chinese: "穿上你的短裤",
                        stepA: {
                            instruction: "看图片，说出完整句子：Put on your _____.",
                            expected: "Put on your shorts",
                            chinese: "穿上你的短裤"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Put on your _____.",
                            expected: "Put on your shorts",
                            chinese: "穿上你的短裤"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/skirt.png" width="90">',
                        answer: "Put on your skirt",
                        chinese: "穿上你的裙子",
                        stepA: {
                            instruction: "看图片，说出完整句子：Put on your _____.",
                            expected: "Put on your skirt",
                            chinese: "穿上你的裙子"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Put on your _____.",
                            expected: "Put on your skirt",
                            chinese: "穿上你的裙子"
                        }
                    },
                    {
                        type: "coop_picture_speak", difficulty: "medium",
                        image: '<img src="assets/images/sports_shoes.png" width="90">',
                        answer: "Put on your sports shoes",
                        chinese: "穿上你的运动鞋",
                        stepA: {
                            instruction: "看图片，说出完整句子：Put on your _____.",
                            expected: "Put on your sports shoes",
                            chinese: "穿上你的运动鞋"
                        },
                        stepB: {
                            instruction: "你也看图说同一句话：Put on your _____.",
                            expected: "Put on your sports shoes",
                            chinese: "穿上你的运动鞋"
                        }
                    }
                ]
            },

            // ── 站点3：合作对话（hard）— 完整示范句+中文，AB说不同的话 ──
            {
                id: 3, name: "合作对话", icon: "🗣️",
                difficulty: "hard",
                theoryTags: ["SLA", "Self-efficacy"],
                description: "A问尺码，B回答，合作完成对话",
                questions: [
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问同学穿什么尺码",
                        image: '<img src="assets/images/wear.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问同学尺码",
                            role: "提问者",
                            line: "What size do you wear",
                            chinese: "你穿多大号？"
                        },
                        stepB: {
                            instruction: "看示范句，回答尺码",
                            role: "回答者",
                            line: "Size S",
                            chinese: "小号。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问同学穿什么尺码",
                        image: '<img src="assets/images/wear.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问同学尺码",
                            role: "提问者",
                            line: "What size do you wear",
                            chinese: "你穿多大号？"
                        },
                        stepB: {
                            instruction: "看示范句，回答尺码",
                            role: "回答者",
                            line: "Size M",
                            chinese: "中号。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问同学穿什么尺码",
                        image: '<img src="assets/images/wear.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问同学尺码",
                            role: "提问者",
                            line: "What size do you wear",
                            chinese: "你穿多大号？"
                        },
                        stepB: {
                            instruction: "看示范句，回答尺码",
                            role: "回答者",
                            line: "Size L",
                            chinese: "大号。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "试衣服，太小了",
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说出感受",
                            role: "试穿者",
                            line: "It's too small",
                            chinese: "太小了。"
                        },
                        stepB: {
                            instruction: "看示范句，建议换大号",
                            role: "帮忙者",
                            line: "Put on Size L",
                            chinese: "穿大号的。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "试衣服，太大了",
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        stepA: {
                            instruction: "看示范句，说出感受",
                            role: "试穿者",
                            line: "It's too big",
                            chinese: "太大了。"
                        },
                        stepB: {
                            instruction: "看示范句，建议换小号",
                            role: "帮忙者",
                            line: "Put on Size S",
                            chinese: "穿小号的。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "老师让穿队服",
                        image: '<img src="assets/images/T-shirt.png" width="90">',
                        stepA: {
                            instruction: "看示范句，你是老师",
                            role: "老师",
                            line: "Put on your T-shirt please",
                            chinese: "请穿上你的T恤。"
                        },
                        stepB: {
                            instruction: "看示范句，问尺码",
                            role: "学生",
                            line: "What size do you wear",
                            chinese: "穿多大号？"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "穿上夹克",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        stepA: {
                            instruction: "看示范句，让同学穿夹克",
                            role: "提醒者",
                            line: "Put on your jacket",
                            chinese: "穿上你的夹克。"
                        },
                        stepB: {
                            instruction: "看示范句，说尺码",
                            role: "回答者",
                            line: "Size M",
                            chinese: "中号。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "穿上毛衣",
                        image: '<img src="assets/images/sweater.png" width="90">',
                        stepA: {
                            instruction: "看示范句，让同学穿毛衣",
                            role: "提醒者",
                            line: "Put on your sweater",
                            chinese: "穿上你的毛衣。"
                        },
                        stepB: {
                            instruction: "看示范句，说尺码",
                            role: "回答者",
                            line: "Size L",
                            chinese: "大号。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "问同学穿什么尺码",
                        image: '<img src="assets/images/wear.png" width="90">',
                        stepA: {
                            instruction: "看示范句，问同学尺码",
                            role: "提问者",
                            line: "What size do you wear",
                            chinese: "你穿多大号？"
                        },
                        stepB: {
                            instruction: "看示范句，回答尺码",
                            role: "回答者",
                            line: "Size XL",
                            chinese: "特大号。"
                        }
                    },
                    {
                        type: "coop_dialogue", difficulty: "hard",
                        scenario: "穿上衬衫",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        stepA: {
                            instruction: "看示范句，让同学穿衬衫",
                            role: "提醒者",
                            line: "Put on your shirt",
                            chinese: "穿上你的衬衫。"
                        },
                        stepB: {
                            instruction: "看示范句，说感受",
                            role: "回答者",
                            line: "It's too small",
                            chinese: "太小了。"
                        }
                    }
                ]
            }
        ]
    }
};

// 导出（兼容直接 script 引入）
if (typeof window !== 'undefined') {
    window.u2l1_coop = u2l1_coop;
}
