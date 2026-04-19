/**
 * U2L3 合作冒险题库 — Where is my sweater?
 * 主题：衣服在哪里
 * 新词汇：where, sweater, in, on, under, bed, chair, schoolbag, dear, put away
 * 累积词汇：U1全部 + U2L1-L2全部
 * 句型：Where is my ___? / It's in/on/under ___. / Is it in/on/under ___? / Put away your ___.
 */

var u2l3_coop = {
    id: "U2L3",
    title: "Where is my sweater?",
    theme: "where are clothes",

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
                        type: "coop_listen_relay", audio: "bed", chinese: "床", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/bed.png" width="70">', value: "bed" },
                                { html: '<img src="assets/images/chair.png" width="70">', value: "chair" },
                                { html: '<img src="assets/images/schoolbag.png" width="70">', value: "schoolbag" },
                                { html: '<img src="assets/images/sweater.png" width="70">', value: "sweater" }
                            ],
                            correct: "bed"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "bed":       { options: ["床","椅子","书包","毛衣"], correct: "床" },
                                "chair":     { options: ["椅子","床","书包","毛衣"], correct: "椅子" },
                                "schoolbag": { options: ["书包","床","椅子","毛衣"], correct: "书包" },
                                "sweater":   { options: ["毛衣","床","椅子","书包"], correct: "毛衣" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "chair", chinese: "椅子", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/chair.png" width="70">', value: "chair" },
                                { html: '<img src="assets/images/bed.png" width="70">', value: "bed" },
                                { html: '<img src="assets/images/schoolbag.png" width="70">', value: "schoolbag" },
                                { html: '<img src="assets/images/shirt.png" width="70">', value: "shirt" }
                            ],
                            correct: "chair"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "chair":     { options: ["椅子","床","书包","衬衫"], correct: "椅子" },
                                "bed":       { options: ["床","椅子","书包","衬衫"], correct: "床" },
                                "schoolbag": { options: ["书包","椅子","床","衬衫"], correct: "书包" },
                                "shirt":     { options: ["衬衫","椅子","床","书包"], correct: "衬衫" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "schoolbag", chinese: "书包", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/schoolbag.png" width="70">', value: "schoolbag" },
                                { html: '<img src="assets/images/bed.png" width="70">', value: "bed" },
                                { html: '<img src="assets/images/chair.png" width="70">', value: "chair" },
                                { html: '<img src="assets/images/jacket.png" width="70">', value: "jacket" }
                            ],
                            correct: "schoolbag"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "schoolbag": { options: ["书包","床","椅子","夹克"], correct: "书包" },
                                "bed":       { options: ["床","书包","椅子","夹克"], correct: "床" },
                                "chair":     { options: ["椅子","书包","床","夹克"], correct: "椅子" },
                                "jacket":    { options: ["夹克","书包","床","椅子"], correct: "夹克" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "sweater", chinese: "毛衣", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/sweater.png" width="70">', value: "sweater" },
                                { html: '<img src="assets/images/shirt.png" width="70">', value: "shirt" },
                                { html: '<img src="assets/images/jacket.png" width="70">', value: "jacket" },
                                { html: '<img src="assets/images/T-shirt.png" width="70">', value: "T-shirt" }
                            ],
                            correct: "sweater"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "sweater": { options: ["毛衣","衬衫","夹克","T恤"], correct: "毛衣" },
                                "shirt":   { options: ["衬衫","毛衣","夹克","T恤"], correct: "衬衫" },
                                "jacket":  { options: ["夹克","毛衣","衬衫","T恤"], correct: "夹克" },
                                "T-shirt": { options: ["T恤","毛衣","衬衫","夹克"], correct: "T恤" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "shirt", chinese: "衬衫", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/shirt.png" width="70">', value: "shirt" },
                                { html: '<img src="assets/images/sweater.png" width="70">', value: "sweater" },
                                { html: '<img src="assets/images/T-shirt.png" width="70">', value: "T-shirt" },
                                { html: '<img src="assets/images/jacket.png" width="70">', value: "jacket" }
                            ],
                            correct: "shirt"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "shirt":   { options: ["衬衫","毛衣","T恤","夹克"], correct: "衬衫" },
                                "sweater": { options: ["毛衣","衬衫","T恤","夹克"], correct: "毛衣" },
                                "T-shirt": { options: ["T恤","衬衫","毛衣","夹克"], correct: "T恤" },
                                "jacket":  { options: ["夹克","衬衫","毛衣","T恤"], correct: "夹克" }
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
                        type: "coop_listen_judge", audio: "bed", difficulty: "easy",
                        image: '<img src="assets/images/bed.png" width="90">',
                        isMatch: true, chinese: "床",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/bed.png" width="60">', value: "bed" },
                                { html: '<img src="assets/images/chair.png" width="60">', value: "chair" },
                                { html: '<img src="assets/images/schoolbag.png" width="60">', value: "schoolbag" },
                                { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                            ],
                            correct: "bed"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "chair", difficulty: "easy",
                        image: '<img src="assets/images/bed.png" width="90">',
                        isMatch: false, chinese: "椅子",
                        correctImage: '<img src="assets/images/chair.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/chair.png" width="60">', value: "chair" },
                                { html: '<img src="assets/images/bed.png" width="60">', value: "bed" },
                                { html: '<img src="assets/images/schoolbag.png" width="60">', value: "schoolbag" },
                                { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" }
                            ],
                            correct: "chair"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "schoolbag", difficulty: "medium",
                        image: '<img src="assets/images/schoolbag.png" width="90">',
                        isMatch: true, chinese: "书包",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/schoolbag.png" width="60">', value: "schoolbag" },
                                { html: '<img src="assets/images/bed.png" width="60">', value: "bed" },
                                { html: '<img src="assets/images/chair.png" width="60">', value: "chair" },
                                { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" }
                            ],
                            correct: "schoolbag"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "sweater", difficulty: "medium",
                        image: '<img src="assets/images/shirt.png" width="90">',
                        isMatch: false, chinese: "毛衣",
                        correctImage: '<img src="assets/images/sweater.png" width="60">',
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "图片和音频不配！选正确的图片",
                            options: [
                                { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" },
                                { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" }
                            ],
                            correct: "sweater"
                        }
                    },
                    {
                        type: "coop_listen_judge", audio: "jacket", difficulty: "medium",
                        image: '<img src="assets/images/jacket.png" width="90">',
                        isMatch: true, chinese: "夹克",
                        stepA: { instruction: "听音频，看图片，对不对？" },
                        stepB: {
                            instruction: "A判断错了！选正确答案",
                            options: [
                                { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" },
                                { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" },
                                { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                                { html: '<img src="assets/images/T-shirt.png" width="60">', value: "T-shirt" }
                            ],
                            correct: "jacket"
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
                        sequence: ["bed", "chair", "schoolbag"],
                        words: [
                            { html: '<img src="assets/images/bed.png" width="60">', value: "bed" },
                            { html: '<img src="assets/images/chair.png" width="60">', value: "chair" },
                            { html: '<img src="assets/images/schoolbag.png" width="60">', value: "schoolbag" }
                        ],
                        chinese: "bed → chair → schoolbag"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "medium",
                        sequence: ["sweater", "shirt", "jacket"],
                        words: [
                            { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" },
                            { html: '<img src="assets/images/shirt.png" width="60">', value: "shirt" },
                            { html: '<img src="assets/images/jacket.png" width="60">', value: "jacket" }
                        ],
                        chinese: "sweater → shirt → jacket"
                    },
                    {
                        type: "coop_listen_sort", difficulty: "hard",
                        sequence: ["schoolbag", "bed", "chair"],
                        words: [
                            { html: '<img src="assets/images/schoolbag.png" width="55">', value: "schoolbag" },
                            { html: '<img src="assets/images/bed.png" width="55">', value: "bed" },
                            { html: '<img src="assets/images/chair.png" width="55">', value: "chair" }
                        ],
                        chinese: "schoolbag → bed → chair"
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
                        sequence: ["bed", "schoolbag", "chair", "sweater"],
                        words: [
                            { html: '<img src="assets/images/bed.png" width="50">', value: "bed" },
                            { html: '<img src="assets/images/schoolbag.png" width="50">', value: "schoolbag" },
                            { html: '<img src="assets/images/chair.png" width="50">', value: "chair" },
                            { html: '<img src="assets/images/sweater.png" width="50">', value: "sweater" }
                        ],
                        chinese: "bed → schoolbag → chair → sweater"
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
                        scenario: "Yang Ming找不到毛衣",
                        audio: "Where is my sweater, Mom? Is it on your bed? No, it isn't.",
                        stepA: {
                            instruction: "听音频，毛衣在床上吗？",
                            question: "毛衣在床上吗？",
                            options: ["不在床上", "在床上", "在椅子上", "在书包里"],
                            correct: "不在床上"
                        },
                        stepB: {
                            instruction: "不在床上，可能在哪里？",
                            question: "继续找，问在哪里",
                            optionsMap: {
                                "不在床上": { options: ["Is it under your chair?", "It's on the bed.", "Thank you.", "Put on your sweater."], correct: "Is it under your chair?" },
                                "在床上":   { options: ["在床上找到了", "Is it under your chair?", "Thank you.", "Put on your sweater."], correct: "在床上找到了" },
                                "在椅子上": { options: ["在椅子上找到了", "Is it under your chair?", "Thank you.", "Put on your sweater."], correct: "在椅子上找到了" },
                                "在书包里": { options: ["在书包里找到了", "Is it under your chair?", "Thank you.", "Put on your sweater."], correct: "在书包里找到了" }
                            }
                        },
                        chinese: "毛衣不在床上"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "找到毛衣了",
                        audio: "Look! Your sweater is in your schoolbag! Oh, thank you very much.",
                        stepA: {
                            instruction: "听音频，毛衣在哪里？",
                            question: "毛衣找到了吗？在哪里？",
                            options: ["在书包里", "在床上", "在椅子下", "没找到"],
                            correct: "在书包里"
                        },
                        stepB: {
                            instruction: "找到了！Yang Ming怎么说？",
                            question: "Yang Ming说什么？",
                            optionsMap: {
                                "在书包里": { options: ["Thank you very much!", "I'm sorry.", "It's too big.", "Where is my shirt?"], correct: "Thank you very much!" },
                                "在床上":   { options: ["Thank you very much!", "I'm sorry.", "It's too big.", "Where is my shirt?"], correct: "Thank you very much!" },
                                "在椅子下": { options: ["Thank you very much!", "I'm sorry.", "It's too big.", "Where is my shirt?"], correct: "Thank you very much!" },
                                "没找到":   { options: ["继续找", "Thank you.", "I'm sorry.", "It's too big."], correct: "继续找" }
                            }
                        },
                        chinese: "毛衣在书包里"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "妈妈让收拾衣服",
                        audio: "Dear, put away your clothes, please. OK, Mom!",
                        stepA: {
                            instruction: "听音频，妈妈让做什么？",
                            question: "妈妈让做什么？",
                            options: ["收拾衣服", "穿上衣服", "找衣服", "买衣服"],
                            correct: "收拾衣服"
                        },
                        stepB: {
                            instruction: "妈妈让收拾衣服，怎么回答？",
                            question: "怎么回答妈妈？",
                            optionsMap: {
                                "收拾衣服": { options: ["OK, Mom!", "Thank you.", "I'm sorry.", "It's too big."], correct: "OK, Mom!" },
                                "穿上衣服": { options: ["OK, Mom!", "Thank you.", "I'm sorry.", "It's too big."], correct: "OK, Mom!" },
                                "找衣服":   { options: ["OK, Mom!", "Thank you.", "I'm sorry.", "It's too big."], correct: "OK, Mom!" },
                                "买衣服":   { options: ["OK, Mom!", "Thank you.", "I'm sorry.", "It's too big."], correct: "OK, Mom!" }
                            }
                        },
                        chinese: "妈妈让收拾衣服"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "找衬衫",
                        audio: "Where is my shirt? It's on your bed.",
                        stepA: {
                            instruction: "听音频，衬衫在哪里？",
                            question: "衬衫在哪里？",
                            options: ["在床上", "在椅子下", "在书包里", "不知道"],
                            correct: "在床上"
                        },
                        stepB: {
                            instruction: "衬衫在床上，用英文怎么说？",
                            question: "选正确的英文",
                            optionsMap: {
                                "在床上":   { options: ["It's on your bed.", "It's under your chair.", "It's in your schoolbag.", "I don't know."], correct: "It's on your bed." },
                                "在椅子下": { options: ["It's under your chair.", "It's on your bed.", "It's in your schoolbag.", "I don't know."], correct: "It's under your chair." },
                                "在书包里": { options: ["It's in your schoolbag.", "It's on your bed.", "It's under your chair.", "I don't know."], correct: "It's in your schoolbag." },
                                "不知道":   { options: ["I don't know.", "It's on your bed.", "It's under your chair.", "It's in your schoolbag."], correct: "I don't know." }
                            }
                        },
                        chinese: "衬衫在床上"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "T恤在椅子下面",
                        audio: "Where is my T-shirt? Is it under the chair? Yes! It's under the chair.",
                        stepA: {
                            instruction: "听音频，T恤在哪里？",
                            question: "T恤在哪里？",
                            options: ["在椅子下面", "在床上", "在书包里", "不知道"],
                            correct: "在椅子下面"
                        },
                        stepB: {
                            instruction: "T恤在椅子下面，用英文怎么说？",
                            question: "选正确的英文",
                            optionsMap: {
                                "在椅子下面": { options: ["It's under the chair.", "It's on the bed.", "It's in the schoolbag.", "I don't know."], correct: "It's under the chair." },
                                "在床上":     { options: ["It's on the bed.", "It's under the chair.", "It's in the schoolbag.", "I don't know."], correct: "It's on the bed." },
                                "在书包里":   { options: ["It's in the schoolbag.", "It's under the chair.", "It's on the bed.", "I don't know."], correct: "It's in the schoolbag." },
                                "不知道":     { options: ["I don't know.", "It's under the chair.", "It's on the bed.", "It's in the schoolbag."], correct: "I don't know." }
                            }
                        },
                        chinese: "T恤在椅子下面"
                    }
                ]
            }
        ]
    },

    // ==================== 阅读模块 ====================
    reading: {
        stations: [
            { id: 1, name: "词义接力", icon: "📖", difficulty: "easy", theoryTags: ["SLA", "Constructivism"], description: "A看图选英文，B看英文选中文",
                questions: [
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/bed.png" width="90">', stepA: { instruction: "看图片，选英文单词", options: ["bed", "chair", "schoolbag", "sweater"], correct: "bed" }, stepB: { instruction: "看A选的单词，选中文意思", optionsMap: { "bed": { options: ["床","椅子","书包","毛衣"], correct: "床" }, "chair": { options: ["椅子","床","书包","毛衣"], correct: "椅子" }, "schoolbag": { options: ["书包","床","椅子","毛衣"], correct: "书包" }, "sweater": { options: ["毛衣","床","椅子","书包"], correct: "毛衣" } } } },
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/chair.png" width="90">', stepA: { instruction: "看图片，选英文单词", options: ["chair", "bed", "schoolbag", "shirt"], correct: "chair" }, stepB: { instruction: "看A选的单词，选中文意思", optionsMap: { "chair": { options: ["椅子","床","书包","衬衫"], correct: "椅子" }, "bed": { options: ["床","椅子","书包","衬衫"], correct: "床" }, "schoolbag": { options: ["书包","椅子","床","衬衫"], correct: "书包" }, "shirt": { options: ["衬衫","椅子","床","书包"], correct: "衬衫" } } } },
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/schoolbag.png" width="90">', stepA: { instruction: "看图片，选英文单词", options: ["schoolbag", "bed", "chair", "jacket"], correct: "schoolbag" }, stepB: { instruction: "看A选的单词，选中文意思", optionsMap: { "schoolbag": { options: ["书包","床","椅子","夹克"], correct: "书包" }, "bed": { options: ["床","书包","椅子","夹克"], correct: "床" }, "chair": { options: ["椅子","书包","床","夹克"], correct: "椅子" }, "jacket": { options: ["夹克","书包","床","椅子"], correct: "夹克" } } } },
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/sweater.png" width="90">', stepA: { instruction: "看图片，选英文单词", options: ["sweater", "shirt", "jacket", "T-shirt"], correct: "sweater" }, stepB: { instruction: "看A选的单词，选中文意思", optionsMap: { "sweater": { options: ["毛衣","衬衫","夹克","T恤"], correct: "毛衣" }, "shirt": { options: ["衬衫","毛衣","夹克","T恤"], correct: "衬衫" }, "jacket": { options: ["夹克","毛衣","衬衫","T恤"], correct: "夹克" }, "T-shirt": { options: ["T恤","毛衣","衬衫","夹克"], correct: "T恤" } } } },
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/shirt.png" width="90">', stepA: { instruction: "看图片，选英文单词", options: ["shirt", "sweater", "jacket", "shorts"], correct: "shirt" }, stepB: { instruction: "看A选的单词，选中文意思", optionsMap: { "shirt": { options: ["衬衫","毛衣","夹克","短裤"], correct: "衬衫" }, "sweater": { options: ["毛衣","衬衫","夹克","短裤"], correct: "毛衣" }, "jacket": { options: ["夹克","衬衫","毛衣","短裤"], correct: "夹克" }, "shorts": { options: ["短裤","衬衫","毛衣","夹克"], correct: "短裤" } } } }
                ]
            },
            { id: 2, name: "翻牌配对", icon: "🃏", difficulty: "medium", theoryTags: ["Play-based", "CLT"], description: "A翻一张卡，B翻一张卡，找配对",
                questions: [
                    { type: "coop_flip_match", difficulty: "medium", pairs: [ { word: "bed", match: '<img src="assets/images/bed.png" width="50">', chinese: "床" }, { word: "chair", match: '<img src="assets/images/chair.png" width="50">', chinese: "椅子" }, { word: "schoolbag", match: '<img src="assets/images/schoolbag.png" width="50">', chinese: "书包" } ] },
                    { type: "coop_flip_match", difficulty: "medium", pairs: [ { word: "sweater", match: '<img src="assets/images/sweater.png" width="50">', chinese: "毛衣" }, { word: "shirt", match: '<img src="assets/images/shirt.png" width="50">', chinese: "衬衫" }, { word: "jacket", match: '<img src="assets/images/jacket.png" width="50">', chinese: "夹克" } ] },
                    { type: "coop_flip_match", difficulty: "medium", pairs: [ { word: "bed", match: '<img src="assets/images/bed.png" width="50">', chinese: "床" }, { word: "sweater", match: '<img src="assets/images/sweater.png" width="50">', chinese: "毛衣" }, { word: "schoolbag", match: '<img src="assets/images/schoolbag.png" width="50">', chinese: "书包" } ] },
                    { type: "coop_flip_match", difficulty: "hard", pairs: [ { word: "chair", match: '<img src="assets/images/chair.png" width="50">', chinese: "椅子" }, { word: "shirt", match: '<img src="assets/images/shirt.png" width="50">', chinese: "衬衫" }, { word: "sweater", match: '<img src="assets/images/sweater.png" width="50">', chinese: "毛衣" }, { word: "bed", match: '<img src="assets/images/bed.png" width="50">', chinese: "床" } ] },
                    { type: "coop_flip_match", difficulty: "hard", pairs: [ { word: "schoolbag", match: '<img src="assets/images/schoolbag.png" width="50">', chinese: "书包" }, { word: "jacket", match: '<img src="assets/images/jacket.png" width="50">', chinese: "夹克" }, { word: "bed", match: '<img src="assets/images/bed.png" width="50">', chinese: "床" }, { word: "chair", match: '<img src="assets/images/chair.png" width="50">', chinese: "椅子" } ] }
                ]
            },
            { id: 3, name: "句意接力", icon: "📝", difficulty: "medium", theoryTags: ["CLT", "SLA"], description: "A看句子选意思，B选中文",
                questions: [
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/sweater.png" width="90">', stepA: { instruction: "看图片，选正确的英文句子", options: [ { html: "Where is my sweater?", value: "Where is my sweater?" }, { html: "Where is my shirt?", value: "Where is my shirt?" }, { html: "This is my jacket.", value: "This is my jacket." }, { html: "Put on your T-shirt.", value: "Put on your T-shirt." } ], correct: "Where is my sweater?" }, stepB: { instruction: "选中文意思", optionsMap: { "Where is my sweater?": { options: ["我的毛衣在哪里？","我的衬衫在哪里？","这是我的夹克。","穿上你的T恤。"], correct: "我的毛衣在哪里？" }, "Where is my shirt?": { options: ["我的衬衫在哪里？","我的毛衣在哪里？","这是我的夹克。","穿上你的T恤。"], correct: "我的衬衫在哪里？" }, "This is my jacket.": { options: ["这是我的夹克。","我的毛衣在哪里？","我的衬衫在哪里？","穿上你的T恤。"], correct: "这是我的夹克。" }, "Put on your T-shirt.": { options: ["穿上你的T恤。","我的毛衣在哪里？","我的衬衫在哪里？","这是我的夹克。"], correct: "穿上你的T恤。" } } }, chinese: "我的毛衣在哪里？" },
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/bed.png" width="90">', stepA: { instruction: "读句子，选正确的英文", options: [ { html: "It's on your bed.", value: "It's on your bed." }, { html: "It's under your chair.", value: "It's under your chair." }, { html: "It's in your schoolbag.", value: "It's in your schoolbag." }, { html: "It's too big.", value: "It's too big." } ], correct: "It's on your bed." }, stepB: { instruction: "选中文意思", optionsMap: { "It's on your bed.": { options: ["在你的床上。","在你的椅子下。","在你的书包里。","太大了。"], correct: "在你的床上。" }, "It's under your chair.": { options: ["在你的椅子下。","在你的床上。","在你的书包里。","太大了。"], correct: "在你的椅子下。" }, "It's in your schoolbag.": { options: ["在你的书包里。","在你的床上。","在你的椅子下。","太大了。"], correct: "在你的书包里。" }, "It's too big.": { options: ["太大了。","在你的床上。","在你的椅子下。","在你的书包里。"], correct: "太大了。" } } }, chinese: "在你的床上" },
                    { type: "coop_word_relay", difficulty: "medium", image: '<img src="assets/images/chair.png" width="90">', stepA: { instruction: "读句子，选正确的英文", options: [ { html: "It's under the chair.", value: "It's under the chair." }, { html: "It's on the bed.", value: "It's on the bed." }, { html: "It's in the schoolbag.", value: "It's in the schoolbag." }, { html: "Put away your clothes.", value: "Put away your clothes." } ], correct: "It's under the chair." }, stepB: { instruction: "选中文意思", optionsMap: { "It's under the chair.": { options: ["在椅子下面。","在床上。","在书包里。","收好你的衣服。"], correct: "在椅子下面。" }, "It's on the bed.": { options: ["在床上。","在椅子下面。","在书包里。","收好你的衣服。"], correct: "在床上。" }, "It's in the schoolbag.": { options: ["在书包里。","在椅子下面。","在床上。","收好你的衣服。"], correct: "在书包里。" }, "Put away your clothes.": { options: ["收好你的衣服。","在椅子下面。","在床上。","在书包里。"], correct: "收好你的衣服。" } } }, chinese: "在椅子下面" },
                    { type: "coop_word_relay", difficulty: "medium", image: '<img src="assets/images/schoolbag.png" width="90">', stepA: { instruction: "读句子，选正确的英文", options: [ { html: "Is it in your schoolbag?", value: "Is it in your schoolbag?" }, { html: "Is it on your bed?", value: "Is it on your bed?" }, { html: "Is it under your chair?", value: "Is it under your chair?" }, { html: "Where is my shirt?", value: "Where is my shirt?" } ], correct: "Is it in your schoolbag?" }, stepB: { instruction: "选中文意思", optionsMap: { "Is it in your schoolbag?": { options: ["在你的书包里吗？","在你的床上吗？","在你的椅子下吗？","我的衬衫在哪里？"], correct: "在你的书包里吗？" }, "Is it on your bed?": { options: ["在你的床上吗？","在你的书包里吗？","在你的椅子下吗？","我的衬衫在哪里？"], correct: "在你的床上吗？" }, "Is it under your chair?": { options: ["在你的椅子下吗？","在你的书包里吗？","在你的床上吗？","我的衬衫在哪里？"], correct: "在你的椅子下吗？" }, "Where is my shirt?": { options: ["我的衬衫在哪里？","在你的书包里吗？","在你的床上吗？","在你的椅子下吗？"], correct: "我的衬衫在哪里？" } } }, chinese: "在你的书包里吗？" },
                    { type: "coop_word_relay", difficulty: "hard", image: '<img src="assets/images/scenario_clothes.png" width="90">', stepA: { instruction: "读句子，选正确的英文", options: [ { html: "Put away your clothes, please.", value: "Put away your clothes, please." }, { html: "Put on your T-shirt.", value: "Put on your T-shirt." }, { html: "Where is my sweater?", value: "Where is my sweater?" }, { html: "Whose shirt is this?", value: "Whose shirt is this?" } ], correct: "Put away your clothes, please." }, stepB: { instruction: "选中文意思", optionsMap: { "Put away your clothes, please.": { options: ["请收好你的衣服。","穿上你的T恤。","我的毛衣在哪里？","这是谁的衬衫？"], correct: "请收好你的衣服。" }, "Put on your T-shirt.": { options: ["穿上你的T恤。","请收好你的衣服。","我的毛衣在哪里？","这是谁的衬衫？"], correct: "穿上你的T恤。" }, "Where is my sweater?": { options: ["我的毛衣在哪里？","请收好你的衣服。","穿上你的T恤。","这是谁的衬衫？"], correct: "我的毛衣在哪里？" }, "Whose shirt is this?": { options: ["这是谁的衬衫？","请收好你的衣服。","穿上你的T恤。","我的毛衣在哪里？"], correct: "这是谁的衬衫？" } } }, chinese: "请收好你的衣服" }
                ]
            },
            { id: 4, name: "情境阅读", icon: "🔍", difficulty: "hard", theoryTags: ["Problem-based", "Constructivism"], description: "A读描述，B根据描述做判断",
                questions: [
                    { type: "coop_read_scenario", difficulty: "hard", scenario: "Yang Ming找毛衣", stepA: { instruction: "读一读这段话", text: "Where is my sweater, Mom? Is it on your bed? No, it isn't.", question: "毛衣在床上吗？", options: ["不在", "在", "不知道", "在椅子上"], correct: "不在" }, stepB: { instruction: "不在床上，继续找", optionsMap: { "不在": { options: ["Is it under your chair?", "It's on the bed.", "Thank you.", "Put on your sweater."], correct: "Is it under your chair?" }, "在": { options: ["去床上拿", "Is it under your chair?", "Thank you.", "Put on your sweater."], correct: "去床上拿" }, "不知道": { options: ["再找找", "It's on the bed.", "Thank you.", "Put on your sweater."], correct: "再找找" }, "在椅子上": { options: ["去椅子上找", "Is it under your chair?", "Thank you.", "Put on your sweater."], correct: "去椅子上找" } } }, chinese: "毛衣不在床上" },
                    { type: "coop_read_scenario", difficulty: "hard", scenario: "找到了！毛衣在书包里", stepA: { instruction: "读一读这段话", text: "Look! Your sweater is in your schoolbag!", question: "毛衣在哪里？", options: ["在书包里", "在床上", "在椅子下", "在地上"], correct: "在书包里" }, stepB: { instruction: "找到了，怎么说？", optionsMap: { "在书包里": { options: ["Oh, thank you very much!", "I'm sorry.", "It's too big.", "Where is my shirt?"], correct: "Oh, thank you very much!" }, "在床上": { options: ["Oh, thank you!", "I'm sorry.", "It's too big.", "Where is my shirt?"], correct: "Oh, thank you!" }, "在椅子下": { options: ["Oh, thank you!", "I'm sorry.", "It's too big.", "Where is my shirt?"], correct: "Oh, thank you!" }, "在地上": { options: ["Oh, thank you!", "I'm sorry.", "It's too big.", "Where is my shirt?"], correct: "Oh, thank you!" } } }, chinese: "毛衣在书包里→谢谢" },
                    { type: "coop_read_scenario", difficulty: "hard", scenario: "妈妈让收拾衣服", stepA: { instruction: "读一读这段话", text: "Dear, put away your clothes, please. OK, Mom!", question: "妈妈让做什么？", options: ["收拾衣服", "穿上衣服", "找衣服", "洗衣服"], correct: "收拾衣服" }, stepB: { instruction: "妈妈让收拾，怎么回答？", optionsMap: { "收拾衣服": { options: ["OK, Mom!", "Thank you.", "I'm sorry.", "Where is my shirt?"], correct: "OK, Mom!" }, "穿上衣服": { options: ["OK, Mom!", "Thank you.", "I'm sorry.", "Where is my shirt?"], correct: "OK, Mom!" }, "找衣服": { options: ["OK, Mom!", "Thank you.", "I'm sorry.", "Where is my shirt?"], correct: "OK, Mom!" }, "洗衣服": { options: ["OK, Mom!", "Thank you.", "I'm sorry.", "Where is my shirt?"], correct: "OK, Mom!" } } }, chinese: "收拾衣服→OK" },
                    { type: "coop_read_scenario", difficulty: "hard", scenario: "找衬衫", stepA: { instruction: "读一读这段话", text: "Where is my shirt? It's in your bag.", question: "衬衫在哪里？", options: ["在书包里", "在床上", "在椅子下", "不知道"], correct: "在书包里" }, stepB: { instruction: "根据A的描述，选正确的位置", optionsMap: { "在书包里": { options: ["in the schoolbag", "on the bed", "under the chair", "I don't know"], correct: "in the schoolbag" }, "在床上": { options: ["on the bed", "in the schoolbag", "under the chair", "I don't know"], correct: "on the bed" }, "在椅子下": { options: ["under the chair", "in the schoolbag", "on the bed", "I don't know"], correct: "under the chair" }, "不知道": { options: ["I don't know", "in the schoolbag", "on the bed", "under the chair"], correct: "I don't know" } } }, chinese: "衬衫在书包里" },
                    { type: "coop_read_scenario", difficulty: "hard", scenario: "T恤在椅子下面", stepA: { instruction: "读一读这段话", text: "Where is my T-shirt? It's under the chair.", question: "T恤在哪里？", options: ["在椅子下面", "在床上", "在书包里", "不知道"], correct: "在椅子下面" }, stepB: { instruction: "根据A的描述，选正确的位置图", optionsMap: { "在椅子下面": { options: [ { html: '<img src="assets/images/chair.png" width="60">', value: "chair" }, { html: '<img src="assets/images/bed.png" width="60">', value: "bed" }, { html: '<img src="assets/images/schoolbag.png" width="60">', value: "schoolbag" }, { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" } ], correct: "chair" }, "在床上": { options: [ { html: '<img src="assets/images/bed.png" width="60">', value: "bed" }, { html: '<img src="assets/images/chair.png" width="60">', value: "chair" }, { html: '<img src="assets/images/schoolbag.png" width="60">', value: "schoolbag" }, { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" } ], correct: "bed" }, "在书包里": { options: [ { html: '<img src="assets/images/schoolbag.png" width="60">', value: "schoolbag" }, { html: '<img src="assets/images/chair.png" width="60">', value: "chair" }, { html: '<img src="assets/images/bed.png" width="60">', value: "bed" }, { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" } ], correct: "schoolbag" }, "不知道": { options: [ { html: '<img src="assets/images/chair.png" width="60">', value: "chair" }, { html: '<img src="assets/images/bed.png" width="60">', value: "bed" }, { html: '<img src="assets/images/schoolbag.png" width="60">', value: "schoolbag" }, { html: '<img src="assets/images/sweater.png" width="60">', value: "sweater" } ], correct: "chair" } } }, chinese: "T恤在椅子下面" }
                ]
            }
        ]
    },

    // ==================== 写作模块 ====================
    writing: {
        stations: [
            { id: 1, name: "合作建句", icon: "✏️", difficulty: "easy", theoryTags: ["Constructivism", "SLA"], description: "A放前半句词块，B放后半句词块",
                questions: [
                    { type: "coop_build_sentence", difficulty: "easy", sentence: "Where is my sweater?", stepA: { words: ["Where", "is"], instruction: "选前半句的词" }, stepB: { words: ["my", "sweater?"], instruction: "选后半句的词" }, chinese: "我的毛衣在哪里？" },
                    { type: "coop_build_sentence", difficulty: "easy", sentence: "It's on your bed.", stepA: { words: ["It's", "on"], instruction: "选前半句的词" }, stepB: { words: ["your", "bed."], instruction: "选后半句的词" }, chinese: "在你的床上。" },
                    { type: "coop_build_sentence", difficulty: "easy", sentence: "It's under the chair.", stepA: { words: ["It's", "under"], instruction: "选前半句的词" }, stepB: { words: ["the", "chair."], instruction: "选后半句的词" }, chinese: "在椅子下面。" },
                    { type: "coop_build_sentence", difficulty: "medium", sentence: "It's in your schoolbag.", stepA: { words: ["It's", "in"], instruction: "选前半句的词" }, stepB: { words: ["your", "schoolbag."], instruction: "选后半句的词" }, chinese: "在你的书包里。" },
                    { type: "coop_build_sentence", difficulty: "medium", sentence: "Put away your clothes, please.", stepA: { words: ["Put", "away"], instruction: "选前半句的词" }, stepB: { words: ["your", "clothes,", "please."], instruction: "选后半句的词" }, chinese: "请收好你的衣服。" }
                ]
            },
            { id: 2, name: "接力填空", icon: "📝", difficulty: "medium", theoryTags: ["SLA", "ZPD"], description: "A填第1个空，B填第2个空",
                questions: [
                    { type: "coop_relay_fill", difficulty: "medium", template: "Where is my ___? It's ___ your bed.", image: '<img src="assets/images/sweater.png" width="70">', stepA: { blank: 1, options: ["sweater", "shirt", "jacket", "T-shirt"], correct: "sweater", instruction: "看图填第1个空" }, stepB: { blank: 2, options: ["on", "in", "under", "at"], correct: "on", instruction: "毛衣在床上，填第2个空" }, chinese: "Where is my sweater? It's on your bed." },
                    { type: "coop_relay_fill", difficulty: "medium", template: "Where is my ___? It's ___ your schoolbag.", image: '<img src="assets/images/shirt.png" width="70">', stepA: { blank: 1, options: ["shirt", "sweater", "jacket", "T-shirt"], correct: "shirt", instruction: "看图填第1个空" }, stepB: { blank: 2, options: ["in", "on", "under", "at"], correct: "in", instruction: "衬衫在书包里，填第2个空" }, chinese: "Where is my shirt? It's in your schoolbag." },
                    { type: "coop_relay_fill", difficulty: "medium", template: "Is it ___ your chair? No, it ___.", image: '<img src="assets/images/chair.png" width="70">', stepA: { blank: 1, options: ["under", "on", "in", "at"], correct: "under", instruction: "填第1个空" }, stepB: { blank: 2, options: ["isn't", "is", "are", "aren't"], correct: "isn't", instruction: "不在椅子下！No, it ___，填第2个空" }, chinese: "Is it under your chair? No, it isn't." },
                    { type: "coop_relay_fill", difficulty: "hard", template: "___ is my T-shirt? It's ___ the chair.", image: '<img src="assets/images/T-shirt.png" width="70">', stepA: { blank: 1, options: ["Where", "What", "Whose", "Who"], correct: "Where", instruction: "填第1个空" }, stepB: { blank: 2, options: ["under", "on", "in", "at"], correct: "under", instruction: "T恤在椅子下面，It's ___ the chair，填第2个空" }, chinese: "Where is my T-shirt? It's under the chair." },
                    { type: "coop_relay_fill", difficulty: "hard", template: "Put ___ your clothes, ___.", image: '<img src="assets/images/scenario_clothes.png" width="70">', stepA: { blank: 1, options: ["away", "on", "in", "up"], correct: "away", instruction: "填第1个空" }, stepB: { blank: 2, options: ["please", "sorry", "too", "big"], correct: "please", instruction: "填第2个空" }, chinese: "Put away your clothes, please." }
                ]
            },
            { id: 3, name: "合作拼词", icon: "🔤", difficulty: "hard", theoryTags: ["Play-based", "SLA"], description: "A放前半字母，B放后半字母",
                questions: [
                    { type: "coop_spell_word", difficulty: "medium", word: "where", image: '<img src="assets/images/sweater.png" width="60">', stepA: { letters: ["w", "h", "e"], distractors: ["a", "o"], instruction: "拼前半：w____" }, stepB: { letters: ["r", "e"], distractors: ["n", "t"], instruction: "拼后半：___re" }, chinese: "哪里" },
                    { type: "coop_spell_word", difficulty: "medium", word: "under", image: '<img src="assets/images/chair.png" width="60">', stepA: { letters: ["u", "n"], distractors: ["i", "o"], instruction: "拼前半：u____" }, stepB: { letters: ["d", "e", "r"], distractors: ["t", "s"], instruction: "拼后半：___der" }, chinese: "在…下面" },
                    { type: "coop_spell_word", difficulty: "medium", word: "chair", image: '<img src="assets/images/chair.png" width="60">', stepA: { letters: ["c", "h"], distractors: ["s", "t"], instruction: "拼前半：c____" }, stepB: { letters: ["a", "i", "r"], distractors: ["e", "o"], instruction: "拼后半：___air" }, chinese: "椅子" },
                    { type: "coop_spell_word", difficulty: "hard", word: "sweater", image: '<img src="assets/images/sweater.png" width="60">', stepA: { letters: ["s", "w", "e", "a"], distractors: ["o", "i"], instruction: "拼前半：s______" }, stepB: { letters: ["t", "e", "r"], distractors: ["n", "d"], instruction: "拼后半：___ter" }, chinese: "毛衣" },
                    { type: "coop_spell_word", difficulty: "hard", word: "bed", image: '<img src="assets/images/bed.png" width="60">', stepA: { letters: ["b"], distractors: ["d", "p"], instruction: "拼前半：b__" }, stepB: { letters: ["e", "d"], distractors: ["a", "o"], instruction: "拼后半：_ed" }, chinese: "床" }
                ]
            },
            { id: 4, name: "情境写作", icon: "💌", difficulty: "hard", theoryTags: ["Problem-based", "Project"], description: "A选情境，B写句子",
                questions: [
                    { type: "coop_write_scenario", difficulty: "hard", scenario: "找毛衣（B是妈妈，知道毛衣在书包里）", stepA: { instruction: "你找不到毛衣，问妈妈", options: ["Where is my sweater?", "This is my sweater.", "Put on your sweater.", "Whose sweater is this?"] }, stepB: { instruction: "你是妈妈！毛衣在书包里，回答A", optionsMap: { "Where is my sweater?": { options: ["It's in your schoolbag.", "Thank you.", "It's too big.", "Size M."], correct: "It's in your schoolbag." }, "This is my sweater.": { options: ["OK!", "Thank you.", "It's too big.", "Size M."], correct: "OK!" }, "Put on your sweater.": { options: ["OK!", "Thank you.", "It's too big.", "Size M."], correct: "OK!" }, "Whose sweater is this?": { options: ["It's Yang Ming's.", "Thank you.", "It's too big.", "Size M."], correct: "It's Yang Ming's." } } }, chinese: "找毛衣→在书包里" },
                    { type: "coop_write_scenario", difficulty: "hard", scenario: "猜衬衫在哪里（B知道：衬衫在椅子下面）", stepA: { instruction: "猜猜衬衫在哪里", options: ["Is it on the bed?", "Is it under the chair?", "Is it in the schoolbag?", "Where is my shirt?"] }, stepB: { instruction: "你知道答案：衬衫在椅子下面！回答A的猜测", optionsMap: { "Is it on the bed?": { options: ["No, it isn't.", "Yes, it is.", "Thank you.", "OK!"], correct: "No, it isn't." }, "Is it under the chair?": { options: ["Yes, it is!", "No, it isn't.", "Thank you.", "OK!"], correct: "Yes, it is!" }, "Is it in the schoolbag?": { options: ["No, it isn't.", "Yes, it is.", "Thank you.", "OK!"], correct: "No, it isn't." }, "Where is my shirt?": { options: ["It's under the chair.", "Thank you.", "OK!", "Size M."], correct: "It's under the chair." } } }, chinese: "猜衬衫位置" },
                    { type: "coop_write_scenario", difficulty: "hard", scenario: "帮妈妈收拾衣服", stepA: { instruction: "妈妈让你收拾衣服，选正确的指令", options: ["Put away your clothes, please.", "Put on your T-shirt.", "Where is my sweater?", "Whose shirt is this?"] }, stepB: { instruction: "回应妈妈", optionsMap: { "Put away your clothes, please.": { options: ["OK, Mom!", "Thank you.", "I'm sorry.", "It's too big."], correct: "OK, Mom!" }, "Put on your T-shirt.": { options: ["OK!", "Thank you.", "I'm sorry.", "It's too big."], correct: "OK!" }, "Where is my sweater?": { options: ["It's on your bed.", "OK!", "Thank you.", "I'm sorry."], correct: "It's on your bed." }, "Whose shirt is this?": { options: ["It's Yang Ming's.", "OK!", "Thank you.", "I'm sorry."], correct: "It's Yang Ming's." } } }, chinese: "收拾衣服" },
                    { type: "coop_write_scenario", difficulty: "hard", scenario: "帮同学找T恤", stepA: { instruction: "同学找不到T恤，选一个位置告诉他", options: [ { html: '<img src="assets/images/bed.png" width="60">', value: "bed" }, { html: '<img src="assets/images/chair.png" width="60">', value: "chair" }, { html: '<img src="assets/images/schoolbag.png" width="60">', value: "schoolbag" } ] }, stepB: { instruction: "根据A指的位置，用英文说出来", optionsMap: { "bed": { options: ["It's on your bed.", "It's under the chair.", "It's in your schoolbag.", "I don't know."], correct: "It's on your bed." }, "chair": { options: ["It's under the chair.", "It's on your bed.", "It's in your schoolbag.", "I don't know."], correct: "It's under the chair." }, "schoolbag": { options: ["It's in your schoolbag.", "It's on your bed.", "It's under the chair.", "I don't know."], correct: "It's in your schoolbag." } } }, chinese: "告诉同学T恤在哪里" },
                    { type: "coop_write_scenario", difficulty: "hard", scenario: "完成找衣服的对话（B记住：毛衣在书包里，衬衫在床上，T恤在椅子下，夹克在床上）", stepA: { instruction: "你找不到衣服，选一件问", options: ["Where is my sweater?", "Where is my shirt?", "Where is my T-shirt?", "Where is my jacket?"] }, stepB: { instruction: "B知道位置：毛衣→书包，衬衫→床上，T恤→椅子下，夹克→床上，回答A", optionsMap: { "Where is my sweater?": { options: ["It's in your schoolbag.", "It's too big.", "Thank you.", "Whose is this?"], correct: "It's in your schoolbag." }, "Where is my shirt?": { options: ["It's on your bed.", "It's too big.", "Thank you.", "Whose is this?"], correct: "It's on your bed." }, "Where is my T-shirt?": { options: ["It's under the chair.", "It's too big.", "Thank you.", "Whose is this?"], correct: "It's under the chair." }, "Where is my jacket?": { options: ["It's on your bed.", "It's too big.", "Thank you.", "Whose is this?"], correct: "It's on your bed." } } }, chinese: "找衣服对话" }
                ]
            }
        ]
    },

    // ==================== 口语模块 ====================
    speaking: {
        stations: [
            { id: 1, name: "跟读模仿", icon: "🎤", difficulty: "easy", theoryTags: ["SLA", "Self-efficacy"], description: "A听音频跟读，B跟着读同一个",
                questions: [
                    { type: "coop_read_relay", word: "where", chinese: "哪里", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "sweater", chinese: "毛衣", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "under", chinese: "在…下面", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "chair", chinese: "椅子", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "schoolbag", chinese: "书包", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "Where is my sweater", chinese: "我的毛衣在哪里？", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "It's on your bed", chinese: "在你的床上。", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "It's under the chair", chinese: "在椅子下面。", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "It's in your schoolbag", chinese: "在你的书包里。", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "Put away your clothes", chinese: "收好你的衣服。", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } }
                ]
            },
            { id: 2, name: "看图说话", icon: "💬", difficulty: "medium", theoryTags: ["SLA", "Self-efficacy"], description: "看图片和句型框架，说出完整句子",
                questions: [
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/sweater.png" width="90">', answer: "Where is my sweater", chinese: "我的毛衣在哪里", stepA: { instruction: "看图片，说出完整句子：Where is my _____?", expected: "Where is my sweater", chinese: "我的毛衣在哪里" }, stepB: { instruction: "你也看图说同一句话：Where is my _____?", expected: "Where is my sweater", chinese: "我的毛衣在哪里" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/shirt.png" width="90">', answer: "Where is my shirt", chinese: "我的衬衫在哪里", stepA: { instruction: "看图片，说出完整句子：Where is my _____?", expected: "Where is my shirt", chinese: "我的衬衫在哪里" }, stepB: { instruction: "你也看图说同一句话：Where is my _____?", expected: "Where is my shirt", chinese: "我的衬衫在哪里" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/bed.png" width="90">', answer: "It's on your bed", chinese: "在你的床上", stepA: { instruction: "看图片，说出完整句子：It's on your _____.", expected: "It's on your bed", chinese: "在你的床上" }, stepB: { instruction: "你也看图说同一句话：It's on your _____.", expected: "It's on your bed", chinese: "在你的床上" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/chair.png" width="90">', answer: "It's under the chair", chinese: "在椅子下面", stepA: { instruction: "看图片，说出完整句子：It's under the _____.", expected: "It's under the chair", chinese: "在椅子下面" }, stepB: { instruction: "你也看图说同一句话：It's under the _____.", expected: "It's under the chair", chinese: "在椅子下面" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/schoolbag.png" width="90">', answer: "It's in your schoolbag", chinese: "在你的书包里", stepA: { instruction: "看图片，说出完整句子：It's in your _____.", expected: "It's in your schoolbag", chinese: "在你的书包里" }, stepB: { instruction: "你也看图说同一句话：It's in your _____.", expected: "It's in your schoolbag", chinese: "在你的书包里" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/T-shirt.png" width="90">', answer: "Where is my T-shirt", chinese: "我的T恤在哪里", stepA: { instruction: "看图片，说出完整句子：Where is my _____?", expected: "Where is my T-shirt", chinese: "我的T恤在哪里" }, stepB: { instruction: "你也看图说同一句话：Where is my _____?", expected: "Where is my T-shirt", chinese: "我的T恤在哪里" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/jacket.png" width="90">', answer: "Where is my jacket", chinese: "我的夹克在哪里", stepA: { instruction: "看图片，说出完整句子：Where is my _____?", expected: "Where is my jacket", chinese: "我的夹克在哪里" }, stepB: { instruction: "你也看图说同一句话：Where is my _____?", expected: "Where is my jacket", chinese: "我的夹克在哪里" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/bed.png" width="90">', answer: "Is it on your bed", chinese: "在你的床上吗", stepA: { instruction: "看图片，说出完整句子：Is it on your _____?", expected: "Is it on your bed", chinese: "在你的床上吗" }, stepB: { instruction: "你也看图说同一句话：Is it on your _____?", expected: "Is it on your bed", chinese: "在你的床上吗" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/chair.png" width="90">', answer: "Is it under the chair", chinese: "在椅子下面吗", stepA: { instruction: "看图片，说出完整句子：Is it under the _____?", expected: "Is it under the chair", chinese: "在椅子下面吗" }, stepB: { instruction: "你也看图说同一句话：Is it under the _____?", expected: "Is it under the chair", chinese: "在椅子下面吗" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/scenario_clothes.png" width="90">', answer: "Put away your clothes", chinese: "收好你的衣服", stepA: { instruction: "看图片，说出完整句子：Put away your _____.", expected: "Put away your clothes", chinese: "收好你的衣服" }, stepB: { instruction: "你也看图说同一句话：Put away your _____.", expected: "Put away your clothes", chinese: "收好你的衣服" } }
                ]
            },
            { id: 3, name: "合作对话", icon: "🗣️", difficulty: "hard", theoryTags: ["SLA", "Self-efficacy"], description: "A问位置，B回答，合作完成对话",
                questions: [
                    { type: "coop_dialogue", difficulty: "hard", scenario: "找毛衣", image: '<img src="assets/images/sweater.png" width="90">', stepA: { instruction: "看示范句，问毛衣在哪", role: "提问者", line: "Where is my sweater", chinese: "我的毛衣在哪里？" }, stepB: { instruction: "看示范句，回答位置", role: "回答者", line: "It's in your schoolbag", chinese: "在你的书包里。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "找衬衫", image: '<img src="assets/images/shirt.png" width="90">', stepA: { instruction: "看示范句，问衬衫在哪", role: "提问者", line: "Where is my shirt", chinese: "我的衬衫在哪里？" }, stepB: { instruction: "看示范句，回答位置", role: "回答者", line: "It's on your bed", chinese: "在你的床上。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "找T恤", image: '<img src="assets/images/T-shirt.png" width="90">', stepA: { instruction: "看示范句，问T恤在哪", role: "提问者", line: "Where is my T-shirt", chinese: "我的T恤在哪里？" }, stepB: { instruction: "看示范句，回答位置", role: "回答者", line: "It's under the chair", chinese: "在椅子下面。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "猜在床上吗", image: '<img src="assets/images/bed.png" width="90">', stepA: { instruction: "看示范句，猜位置", role: "猜测者", line: "Is it on your bed", chinese: "在你的床上吗？" }, stepB: { instruction: "看示范句，回答", role: "回答者", line: "No it isn't", chinese: "不在。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "猜在椅子下吗", image: '<img src="assets/images/chair.png" width="90">', stepA: { instruction: "看示范句，猜位置", role: "猜测者", line: "Is it under your chair", chinese: "在你的椅子下面吗？" }, stepB: { instruction: "看示范句，回答", role: "回答者", line: "Yes it is", chinese: "是的！" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "妈妈让收拾衣服", image: '<img src="assets/images/scenario_clothes.png" width="90">', stepA: { instruction: "看示范句，你是妈妈", role: "妈妈", line: "Put away your clothes please", chinese: "请收好你的衣服。" }, stepB: { instruction: "看示范句，回答妈妈", role: "孩子", line: "OK Mom", chinese: "好的妈妈！" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "找到了说谢谢", image: '<img src="assets/images/sweater.png" width="90">', stepA: { instruction: "看示范句，找到衣服了", role: "帮忙者", line: "Your sweater is in your schoolbag", chinese: "你的毛衣在书包里。" }, stepB: { instruction: "看示范句，说谢谢", role: "感谢者", line: "Oh thank you very much", chinese: "哦谢谢你！" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "找夹克", image: '<img src="assets/images/jacket.png" width="90">', stepA: { instruction: "看示范句，问夹克在哪", role: "提问者", line: "Where is my jacket", chinese: "我的夹克在哪里？" }, stepB: { instruction: "看示范句，回答位置", role: "回答者", line: "It's on your bed", chinese: "在你的床上。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "猜在书包里吗", image: '<img src="assets/images/schoolbag.png" width="90">', stepA: { instruction: "看示范句，猜位置", role: "猜测者", line: "Is it in your schoolbag", chinese: "在你的书包里吗？" }, stepB: { instruction: "看示范句，回答", role: "回答者", line: "Yes it is", chinese: "是的！" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "不客气", image: '<img src="assets/images/scenario_clothes.png" width="90">', stepA: { instruction: "看示范句，说谢谢", role: "感谢者", line: "Thank you very much", chinese: "非常感谢！" }, stepB: { instruction: "看示范句，说不客气", role: "回应者", line: "You're welcome", chinese: "不客气。" } }
                ]
            }
        ]
    }
};

if (typeof window !== 'undefined') {
    window.u2l3_coop = u2l3_coop;
}
