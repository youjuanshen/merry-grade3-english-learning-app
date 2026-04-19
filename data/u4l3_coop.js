/**
 * U4L3 合作冒险题库 — What's your favorite drink?
 * 主题：最喜欢的食物饮料水果
 * 新词汇：favorite, drink, fruit, orange juice, apple, banana, sweet, please, water, park
 * 句型：What's your favorite drink/food/fruit? / My favorite drink is milk/orange juice.
 *       Do you want some orange juice? / I like apples/bananas. / Here are some fruits.
 */

var u4l3_coop = {
    id: "U4L3",
    title: "What's your favorite drink?",
    theme: "favorite food drink fruit",

    // ==================== 听力模块 ====================
    listening: {
        stations: [
            {
                id: 1, name: "听音接力", icon: "🎧",
                difficulty: "easy",
                theoryTags: ["SLA", "Constructivism"],
                description: "A听音频选图片，B看图选中文",
                questions: [
                    {
                        type: "coop_listen_relay", audio: "orange juice", chinese: "橙汁", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/orange_juice.png" width="70">', value: "orange_juice" },
                                { html: '<img src="assets/images/apple_juice.png" width="70">', value: "apple_juice" },
                                { html: '<img src="assets/images/milk.png" width="70">', value: "milk" },
                                { html: '<img src="assets/images/water.png" width="70">', value: "water" }
                            ],
                            correct: "orange_juice"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "orange_juice": { options: ["橙汁","苹果汁","牛奶","水"], correct: "橙汁" },
                                "apple_juice":  { options: ["苹果汁","橙汁","牛奶","水"], correct: "苹果汁" },
                                "milk":         { options: ["牛奶","橙汁","苹果汁","水"], correct: "牛奶" },
                                "water":        { options: ["水","橙汁","苹果汁","牛奶"], correct: "水" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "apple", chinese: "苹果", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/red_apple.png" width="70">', value: "apple" },
                                { html: '<img src="assets/images/banana.png" width="70">', value: "banana" },
                                { html: '<img src="assets/images/orange.png" width="70">', value: "orange" },
                                { html: '<img src="assets/images/fruit.png" width="70">', value: "fruit" }
                            ],
                            correct: "apple"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "apple":  { options: ["苹果","香蕉","橙子","水果"], correct: "苹果" },
                                "banana": { options: ["香蕉","苹果","橙子","水果"], correct: "香蕉" },
                                "orange": { options: ["橙子","苹果","香蕉","水果"], correct: "橙子" },
                                "fruit":  { options: ["水果","苹果","香蕉","橙子"], correct: "水果" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "banana", chinese: "香蕉", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/banana.png" width="70">', value: "banana" },
                                { html: '<img src="assets/images/red_apple.png" width="70">', value: "apple" },
                                { html: '<img src="assets/images/orange.png" width="70">', value: "orange" },
                                { html: '<img src="assets/images/milk.png" width="70">', value: "milk" }
                            ],
                            correct: "banana"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "banana": { options: ["香蕉","苹果","橙子","牛奶"], correct: "香蕉" },
                                "apple":  { options: ["苹果","香蕉","橙子","牛奶"], correct: "苹果" },
                                "orange": { options: ["橙子","香蕉","苹果","牛奶"], correct: "橙子" },
                                "milk":   { options: ["牛奶","香蕉","苹果","橙子"], correct: "牛奶" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "water", chinese: "水", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/water.png" width="70">', value: "water" },
                                { html: '<img src="assets/images/milk.png" width="70">', value: "milk" },
                                { html: '<img src="assets/images/orange_juice.png" width="70">', value: "orange_juice" },
                                { html: '<img src="assets/images/apple_juice.png" width="70">', value: "apple_juice" }
                            ],
                            correct: "water"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "water":        { options: ["水","牛奶","橙汁","苹果汁"], correct: "水" },
                                "milk":         { options: ["牛奶","水","橙汁","苹果汁"], correct: "牛奶" },
                                "orange_juice": { options: ["橙汁","水","牛奶","苹果汁"], correct: "橙汁" },
                                "apple_juice":  { options: ["苹果汁","水","牛奶","橙汁"], correct: "苹果汁" }
                            }
                        }
                    },
                    {
                        type: "coop_listen_relay", audio: "milk", chinese: "牛奶", difficulty: "easy",
                        stepA: {
                            instruction: "听音频，选图片",
                            options: [
                                { html: '<img src="assets/images/milk.png" width="70">', value: "milk" },
                                { html: '<img src="assets/images/water.png" width="70">', value: "water" },
                                { html: '<img src="assets/images/orange_juice.png" width="70">', value: "orange_juice" },
                                { html: '<img src="assets/images/banana.png" width="70">', value: "banana" }
                            ],
                            correct: "milk"
                        },
                        stepB: {
                            instruction: "看图片，选中文意思",
                            optionsMap: {
                                "milk":         { options: ["牛奶","水","橙汁","香蕉"], correct: "牛奶" },
                                "water":        { options: ["水","牛奶","橙汁","香蕉"], correct: "水" },
                                "orange_juice": { options: ["橙汁","牛奶","水","香蕉"], correct: "橙汁" },
                                "banana":       { options: ["香蕉","牛奶","水","橙汁"], correct: "香蕉" }
                            }
                        }
                    }
                ]
            },
            {
                id: 2, name: "听音判断", icon: "✅",
                difficulty: "medium",
                theoryTags: ["CLT", "ZPD"],
                description: "A听音频判断图片对不对，B纠正错误",
                questions: [
                    { type: "coop_listen_judge", audio: "orange juice", difficulty: "easy", image: '<img src="assets/images/orange_juice.png" width="90">', isMatch: true, chinese: "橙汁", stepA: { instruction: "听音频，看图片，对不对？" }, stepB: { instruction: "A判断错了！选正确答案", options: [{ html: '<img src="assets/images/orange_juice.png" width="60">', value: "orange_juice" },{ html: '<img src="assets/images/apple_juice.png" width="60">', value: "apple_juice" },{ html: '<img src="assets/images/milk.png" width="60">', value: "milk" },{ html: '<img src="assets/images/water.png" width="60">', value: "water" }], correct: "orange_juice" } },
                    { type: "coop_listen_judge", audio: "banana", difficulty: "easy", image: '<img src="assets/images/red_apple.png" width="90">', isMatch: false, chinese: "香蕉", correctImage: '<img src="assets/images/banana.png" width="60">', stepA: { instruction: "听音频，看图片，对不对？" }, stepB: { instruction: "图片和音频不配！选正确的图片", options: [{ html: '<img src="assets/images/banana.png" width="60">', value: "banana" },{ html: '<img src="assets/images/red_apple.png" width="60">', value: "apple" },{ html: '<img src="assets/images/orange.png" width="60">', value: "orange" },{ html: '<img src="assets/images/milk.png" width="60">', value: "milk" }], correct: "banana" } },
                    { type: "coop_listen_judge", audio: "apple", difficulty: "medium", image: '<img src="assets/images/red_apple.png" width="90">', isMatch: true, chinese: "苹果", stepA: { instruction: "听音频，看图片，对不对？" }, stepB: { instruction: "A判断错了！选正确答案", options: [{ html: '<img src="assets/images/red_apple.png" width="60">', value: "apple" },{ html: '<img src="assets/images/banana.png" width="60">', value: "banana" },{ html: '<img src="assets/images/orange.png" width="60">', value: "orange" },{ html: '<img src="assets/images/milk.png" width="60">', value: "milk" }], correct: "apple" } },
                    { type: "coop_listen_judge", audio: "water", difficulty: "medium", image: '<img src="assets/images/milk.png" width="90">', isMatch: false, chinese: "水", correctImage: '<img src="assets/images/water.png" width="60">', stepA: { instruction: "听音频，看图片，对不对？" }, stepB: { instruction: "图片和音频不配！选正确的图片", options: [{ html: '<img src="assets/images/water.png" width="60">', value: "water" },{ html: '<img src="assets/images/milk.png" width="60">', value: "milk" },{ html: '<img src="assets/images/orange_juice.png" width="60">', value: "orange_juice" },{ html: '<img src="assets/images/apple_juice.png" width="60">', value: "apple_juice" }], correct: "water" } },
                    { type: "coop_listen_judge", audio: "orange juice", difficulty: "medium", image: '<img src="assets/images/apple_juice.png" width="90">', isMatch: false, chinese: "橙汁", correctImage: '<img src="assets/images/orange_juice.png" width="60">', stepA: { instruction: "听音频，看图片，对不对？" }, stepB: { instruction: "图片和音频不配！选正确的图片", options: [{ html: '<img src="assets/images/orange_juice.png" width="60">', value: "orange_juice" },{ html: '<img src="assets/images/apple_juice.png" width="60">', value: "apple_juice" },{ html: '<img src="assets/images/milk.png" width="60">', value: "milk" },{ html: '<img src="assets/images/water.png" width="60">', value: "water" }], correct: "orange_juice" } }
                ]
            },
            {
                id: 3, name: "听音排序", icon: "🔢",
                difficulty: "hard",
                theoryTags: ["Play-based", "SLA"],
                description: "AB轮流按听到的顺序排列",
                questions: [
                    { type: "coop_listen_sort", difficulty: "medium", sequence: ["apple", "banana", "orange_juice"], words: [{ html: '<img src="assets/images/red_apple.png" width="60">', value: "apple" },{ html: '<img src="assets/images/banana.png" width="60">', value: "banana" },{ html: '<img src="assets/images/orange_juice.png" width="60">', value: "orange_juice" }], chinese: "apple → banana → orange juice" },
                    { type: "coop_listen_sort", difficulty: "medium", sequence: ["milk", "water", "apple"], words: [{ html: '<img src="assets/images/milk.png" width="60">', value: "milk" },{ html: '<img src="assets/images/water.png" width="60">', value: "water" },{ html: '<img src="assets/images/red_apple.png" width="60">', value: "apple" }], chinese: "milk → water → apple" },
                    { type: "coop_listen_sort", difficulty: "hard", sequence: ["orange_juice", "banana", "milk"], words: [{ html: '<img src="assets/images/orange_juice.png" width="55">', value: "orange_juice" },{ html: '<img src="assets/images/banana.png" width="55">', value: "banana" },{ html: '<img src="assets/images/milk.png" width="55">', value: "milk" }], chinese: "orange juice → banana → milk" },
                    { type: "coop_listen_sort", difficulty: "hard", sequence: ["water", "apple", "orange_juice"], words: [{ html: '<img src="assets/images/water.png" width="55">', value: "water" },{ html: '<img src="assets/images/red_apple.png" width="55">', value: "apple" },{ html: '<img src="assets/images/orange_juice.png" width="55">', value: "orange_juice" }], chinese: "water → apple → orange juice" },
                    { type: "coop_listen_sort", difficulty: "hard", sequence: ["banana", "milk", "apple", "water"], words: [{ html: '<img src="assets/images/banana.png" width="50">', value: "banana" },{ html: '<img src="assets/images/milk.png" width="50">', value: "milk" },{ html: '<img src="assets/images/red_apple.png" width="50">', value: "apple" },{ html: '<img src="assets/images/water.png" width="50">', value: "water" }], chinese: "banana → milk → apple → water" }
                ]
            },
            {
                id: 4, name: "情境听力", icon: "🎯",
                difficulty: "hard",
                theoryTags: ["Problem-based", "Constructivism"],
                description: "A听条件，B做判断",
                questions: [
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "在公园里，有人问你最喜欢的饮料是什么。你最喜欢橙汁。",
                        audio: "What's your favorite drink? My favorite drink is orange juice.",
                        stepA: { instruction: "听音频，最喜欢的饮料是什么？", question: "最喜欢什么？", options: ["orange juice", "milk", "water", "apple juice"], correct: "orange juice" },
                        stepB: { instruction: "他说最喜欢橙汁(orange juice)，选正确的图片", question: "选图片", optionsMap: { "orange juice": { options: [{ html: '<img src="assets/images/orange_juice.png" width="60">', value: "oj" },{ html: '<img src="assets/images/milk.png" width="60">', value: "milk" },{ html: '<img src="assets/images/water.png" width="60">', value: "water" },{ html: '<img src="assets/images/apple_juice.png" width="60">', value: "aj" }], correct: "oj" }, "milk": { options: [{ html: '<img src="assets/images/milk.png" width="60">', value: "milk" },{ html: '<img src="assets/images/orange_juice.png" width="60">', value: "oj" },{ html: '<img src="assets/images/water.png" width="60">', value: "water" },{ html: '<img src="assets/images/apple_juice.png" width="60">', value: "aj" }], correct: "milk" }, "water": { options: [{ html: '<img src="assets/images/water.png" width="60">', value: "water" },{ html: '<img src="assets/images/orange_juice.png" width="60">', value: "oj" },{ html: '<img src="assets/images/milk.png" width="60">', value: "milk" },{ html: '<img src="assets/images/apple_juice.png" width="60">', value: "aj" }], correct: "water" }, "apple juice": { options: [{ html: '<img src="assets/images/apple_juice.png" width="60">', value: "aj" },{ html: '<img src="assets/images/orange_juice.png" width="60">', value: "oj" },{ html: '<img src="assets/images/milk.png" width="60">', value: "milk" },{ html: '<img src="assets/images/water.png" width="60">', value: "water" }], correct: "aj" } } },
                        chinese: "最喜欢橙汁"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "Li Li最喜欢的饮料是牛奶，她也喜欢苹果和苹果汁。",
                        audio: "My favorite drink is milk. I like apples. And I like apple juice, too.",
                        stepA: { instruction: "听音频，Li Li最喜欢的饮料是？", question: "最喜欢的饮料？", options: ["milk", "apple juice", "orange juice", "water"], correct: "milk" },
                        stepB: { instruction: "Li Li最喜欢牛奶，她还喜欢什么水果？提示：I like apples.", question: "喜欢什么水果？", optionsMap: { "milk": { options: ["苹果", "香蕉", "橙子", "都不喜欢"], correct: "苹果" }, "apple juice": { options: ["苹果", "香蕉", "橙子", "都不喜欢"], correct: "苹果" }, "orange juice": { options: ["苹果", "香蕉", "橙子", "都不喜欢"], correct: "苹果" }, "water": { options: ["苹果", "香蕉", "橙子", "都不喜欢"], correct: "苹果" } } },
                        chinese: "最喜欢牛奶，也喜欢苹果"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "问你最喜欢的水果是什么。你喜欢香蕉。",
                        audio: "What's your favorite fruit? I like bananas.",
                        stepA: { instruction: "听音频，最喜欢的水果是？", question: "最喜欢什么水果？", options: ["bananas", "apples", "oranges", "都喜欢"], correct: "bananas" },
                        stepB: { instruction: "他说I like bananas（喜欢香蕉），选正确的中文", question: "选中文", optionsMap: { "bananas": { options: ["喜欢香蕉", "喜欢苹果", "喜欢橙子", "都喜欢"], correct: "喜欢香蕉" }, "apples": { options: ["喜欢苹果", "喜欢香蕉", "喜欢橙子", "都喜欢"], correct: "喜欢苹果" }, "oranges": { options: ["喜欢橙子", "喜欢香蕉", "喜欢苹果", "都喜欢"], correct: "喜欢橙子" }, "都喜欢": { options: ["都喜欢", "喜欢香蕉", "喜欢苹果", "喜欢橙子"], correct: "都喜欢" } } },
                        chinese: "最喜欢香蕉"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "有人给你橙汁，问你要不要。橙汁很甜。",
                        audio: "Do you want some orange juice? Yes, please. It's sweet.",
                        stepA: { instruction: "听音频，他要不要橙汁？", question: "要不要？", options: ["Yes, please.", "No, thank you.", "I want milk.", "I don't like it."], correct: "Yes, please." },
                        stepB: { instruction: "他说Yes, please.（要），橙汁怎么样？提示：It's sweet.", question: "橙汁怎么样？", optionsMap: { "Yes, please.": { options: ["甜的", "酸的", "苦的", "不好喝"], correct: "甜的" }, "No, thank you.": { options: ["甜的", "酸的", "苦的", "不好喝"], correct: "甜的" }, "I want milk.": { options: ["甜的", "酸的", "苦的", "不好喝"], correct: "甜的" }, "I don't like it.": { options: ["甜的", "酸的", "苦的", "不好喝"], correct: "甜的" } } },
                        chinese: "要橙汁，很甜"
                    },
                    {
                        type: "coop_listen_scenario", difficulty: "hard",
                        scenario: "公园里有水果，问你最喜欢什么水果和什么饮料。",
                        audio: "Here are some fruits. What's your favorite fruit? I like bananas. What's your favorite drink? My favorite drink is milk.",
                        stepA: { instruction: "听音频，最喜欢的水果是什么？", question: "最喜欢什么水果？", options: ["bananas", "apples", "oranges", "不知道"], correct: "bananas" },
                        stepB: { instruction: "他喜欢香蕉，那最喜欢的饮料呢？提示：My favorite drink is milk.", question: "最喜欢什么饮料？", optionsMap: { "bananas": { options: ["牛奶", "橙汁", "苹果汁", "水"], correct: "牛奶" }, "apples": { options: ["牛奶", "橙汁", "苹果汁", "水"], correct: "牛奶" }, "oranges": { options: ["牛奶", "橙汁", "苹果汁", "水"], correct: "牛奶" }, "不知道": { options: ["牛奶", "橙汁", "苹果汁", "水"], correct: "牛奶" } } },
                        chinese: "水果喜欢香蕉，饮料喜欢牛奶"
                    }
                ]
            }
        ]
    },

    // ==================== 阅读模块 ====================
    reading: {
        stations: [
            {
                id: 1, name: "词义接力", icon: "📖", difficulty: "easy", theoryTags: ["SLA", "Constructivism"], description: "A看图选英文，B看英文选中文",
                questions: [
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/orange_juice.png" width="90">', stepA: { instruction: "看图片，选英文单词", options: ["orange juice", "apple juice", "milk", "water"], correct: "orange juice" }, stepB: { instruction: "看A选的单词，选中文意思", optionsMap: { "orange juice": { options: ["橙汁","苹果汁","牛奶","水"], correct: "橙汁" }, "apple juice": { options: ["苹果汁","橙汁","牛奶","水"], correct: "苹果汁" }, "milk": { options: ["牛奶","橙汁","苹果汁","水"], correct: "牛奶" }, "water": { options: ["水","橙汁","苹果汁","牛奶"], correct: "水" } } } },
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/red_apple.png" width="90">', stepA: { instruction: "看图片，选英文单词", options: ["apple", "banana", "orange", "fruit"], correct: "apple" }, stepB: { instruction: "看A选的单词，选中文意思", optionsMap: { "apple": { options: ["苹果","香蕉","橙子","水果"], correct: "苹果" }, "banana": { options: ["香蕉","苹果","橙子","水果"], correct: "香蕉" }, "orange": { options: ["橙子","苹果","香蕉","水果"], correct: "橙子" }, "fruit": { options: ["水果","苹果","香蕉","橙子"], correct: "水果" } } } },
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/banana.png" width="90">', stepA: { instruction: "看图片，选英文单词", options: ["banana", "apple", "orange", "milk"], correct: "banana" }, stepB: { instruction: "看A选的单词，选中文意思", optionsMap: { "banana": { options: ["香蕉","苹果","橙子","牛奶"], correct: "香蕉" }, "apple": { options: ["苹果","香蕉","橙子","牛奶"], correct: "苹果" }, "orange": { options: ["橙子","香蕉","苹果","牛奶"], correct: "橙子" }, "milk": { options: ["牛奶","香蕉","苹果","橙子"], correct: "牛奶" } } } },
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/water.png" width="90">', stepA: { instruction: "看图片，选英文单词", options: ["water", "milk", "juice", "orange juice"], correct: "water" }, stepB: { instruction: "看A选的单词，选中文意思", optionsMap: { "water": { options: ["水","牛奶","果汁","橙汁"], correct: "水" }, "milk": { options: ["牛奶","水","果汁","橙汁"], correct: "牛奶" }, "juice": { options: ["果汁","水","牛奶","橙汁"], correct: "果汁" }, "orange juice": { options: ["橙汁","水","牛奶","果汁"], correct: "橙汁" } } } },
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/fruit.png" width="90">', stepA: { instruction: "看图片，选英文单词", options: ["fruit", "apple", "banana", "orange"], correct: "fruit" }, stepB: { instruction: "看A选的单词，选中文意思", optionsMap: { "fruit": { options: ["水果","苹果","香蕉","橙子"], correct: "水果" }, "apple": { options: ["苹果","水果","香蕉","橙子"], correct: "苹果" }, "banana": { options: ["香蕉","水果","苹果","橙子"], correct: "香蕉" }, "orange": { options: ["橙子","水果","苹果","香蕉"], correct: "橙子" } } } }
                ]
            },
            {
                id: 2, name: "翻牌配对", icon: "🃏", difficulty: "medium", theoryTags: ["Play-based", "CLT"], description: "A翻一张卡，B翻一张卡，找配对",
                questions: [
                    { type: "coop_flip_match", difficulty: "medium", pairs: [{ word: "orange juice", match: '<img src="assets/images/orange_juice.png" width="50">', chinese: "橙汁" },{ word: "apple", match: '<img src="assets/images/red_apple.png" width="50">', chinese: "苹果" },{ word: "banana", match: '<img src="assets/images/banana.png" width="50">', chinese: "香蕉" }] },
                    { type: "coop_flip_match", difficulty: "medium", pairs: [{ word: "water", match: '<img src="assets/images/water.png" width="50">', chinese: "水" },{ word: "milk", match: '<img src="assets/images/milk.png" width="50">', chinese: "牛奶" },{ word: "orange juice", match: '<img src="assets/images/orange_juice.png" width="50">', chinese: "橙汁" }] },
                    { type: "coop_flip_match", difficulty: "medium", pairs: [{ word: "apple", match: '<img src="assets/images/red_apple.png" width="50">', chinese: "苹果" },{ word: "banana", match: '<img src="assets/images/banana.png" width="50">', chinese: "香蕉" },{ word: "milk", match: '<img src="assets/images/milk.png" width="50">', chinese: "牛奶" }] },
                    { type: "coop_flip_match", difficulty: "hard", pairs: [{ word: "orange juice", match: '<img src="assets/images/orange_juice.png" width="50">', chinese: "橙汁" },{ word: "apple", match: '<img src="assets/images/red_apple.png" width="50">', chinese: "苹果" },{ word: "banana", match: '<img src="assets/images/banana.png" width="50">', chinese: "香蕉" },{ word: "water", match: '<img src="assets/images/water.png" width="50">', chinese: "水" }] },
                    { type: "coop_flip_match", difficulty: "hard", pairs: [{ word: "milk", match: '<img src="assets/images/milk.png" width="50">', chinese: "牛奶" },{ word: "apple juice", match: '<img src="assets/images/apple_juice.png" width="50">', chinese: "苹果汁" },{ word: "banana", match: '<img src="assets/images/banana.png" width="50">', chinese: "香蕉" },{ word: "orange juice", match: '<img src="assets/images/orange_juice.png" width="50">', chinese: "橙汁" }] }
                ]
            },
            {
                id: 3, name: "句意接力", icon: "📝", difficulty: "medium", theoryTags: ["CLT", "SLA"], description: "A看句子选意思，B选中文",
                questions: [
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/orange_juice.png" width="90">', stepA: { instruction: "看图片，选正确的英文句子", options: [{ html: "What's your favorite drink?", value: "What's your favorite drink?" },{ html: "My favorite drink is milk.", value: "My favorite drink is milk." },{ html: "I like apples.", value: "I like apples." },{ html: "Here are some fruits.", value: "Here are some fruits." }], correct: "What's your favorite drink?" }, stepB: { instruction: "选中文意思", optionsMap: { "What's your favorite drink?": { options: ["你最喜欢的饮料是什么？","我最喜欢的饮料是牛奶。","我喜欢苹果。","这里有一些水果。"], correct: "你最喜欢的饮料是什么？" }, "My favorite drink is milk.": { options: ["我最喜欢的饮料是牛奶。","你最喜欢的饮料是什么？","我喜欢苹果。","这里有一些水果。"], correct: "我最喜欢的饮料是牛奶。" }, "I like apples.": { options: ["我喜欢苹果。","你最喜欢的饮料是什么？","我最喜欢的饮料是牛奶。","这里有一些水果。"], correct: "我喜欢苹果。" }, "Here are some fruits.": { options: ["这里有一些水果。","你最喜欢的饮料是什么？","我最喜欢的饮料是牛奶。","我喜欢苹果。"], correct: "这里有一些水果。" } } }, chinese: "你最喜欢的饮料是什么？" },
                    { type: "coop_word_relay", difficulty: "easy", image: '<img src="assets/images/milk.png" width="90">', stepA: { instruction: "看图片，选正确的英文句子", options: [{ html: "My favorite drink is milk.", value: "My favorite drink is milk." },{ html: "My favorite drink is orange juice.", value: "My favorite drink is orange juice." },{ html: "I like bananas.", value: "I like bananas." },{ html: "Do you want some water?", value: "Do you want some water?" }], correct: "My favorite drink is milk." }, stepB: { instruction: "选中文意思", optionsMap: { "My favorite drink is milk.": { options: ["我最喜欢的饮料是牛奶。","我最喜欢的饮料是橙汁。","我喜欢香蕉。","你要水吗？"], correct: "我最喜欢的饮料是牛奶。" }, "My favorite drink is orange juice.": { options: ["我最喜欢的饮料是橙汁。","我最喜欢的饮料是牛奶。","我喜欢香蕉。","你要水吗？"], correct: "我最喜欢的饮料是橙汁。" }, "I like bananas.": { options: ["我喜欢香蕉。","我最喜欢的饮料是牛奶。","我最喜欢的饮料是橙汁。","你要水吗？"], correct: "我喜欢香蕉。" }, "Do you want some water?": { options: ["你要水吗？","我最喜欢的饮料是牛奶。","我最喜欢的饮料是橙汁。","我喜欢香蕉。"], correct: "你要水吗？" } } }, chinese: "我最喜欢的饮料是牛奶" },
                    { type: "coop_word_relay", difficulty: "medium", image: '<img src="assets/images/banana.png" width="90">', stepA: { instruction: "读句子，选正确的回答", options: [{ html: "I like bananas.", value: "I like bananas." },{ html: "I like apples.", value: "I like apples." },{ html: "My favorite drink is milk.", value: "My favorite drink is milk." },{ html: "I like orange juice.", value: "I like orange juice." }], correct: "I like bananas." }, stepB: { instruction: "选中文意思", optionsMap: { "I like bananas.": { options: ["我喜欢香蕉。","我喜欢苹果。","我最喜欢的饮料是牛奶。","我喜欢橙汁。"], correct: "我喜欢香蕉。" }, "I like apples.": { options: ["我喜欢苹果。","我喜欢香蕉。","我最喜欢的饮料是牛奶。","我喜欢橙汁。"], correct: "我喜欢苹果。" }, "My favorite drink is milk.": { options: ["我最喜欢的饮料是牛奶。","我喜欢香蕉。","我喜欢苹果。","我喜欢橙汁。"], correct: "我最喜欢的饮料是牛奶。" }, "I like orange juice.": { options: ["我喜欢橙汁。","我喜欢香蕉。","我喜欢苹果。","我最喜欢的饮料是牛奶。"], correct: "我喜欢橙汁。" } } }, chinese: "我喜欢香蕉" },
                    { type: "coop_word_relay", difficulty: "medium", image: '<img src="assets/images/fruit.png" width="90">', stepA: { instruction: "读句子，选正确的英文", options: [{ html: "What's your favorite fruit?", value: "What's your favorite fruit?" },{ html: "What's your favorite drink?", value: "What's your favorite drink?" },{ html: "I like apples.", value: "I like apples." },{ html: "Here are some fruits.", value: "Here are some fruits." }], correct: "What's your favorite fruit?" }, stepB: { instruction: "选中文意思", optionsMap: { "What's your favorite fruit?": { options: ["你最喜欢的水果是什么？","你最喜欢的饮料是什么？","我喜欢苹果。","这里有一些水果。"], correct: "你最喜欢的水果是什么？" }, "What's your favorite drink?": { options: ["你最喜欢的饮料是什么？","你最喜欢的水果是什么？","我喜欢苹果。","这里有一些水果。"], correct: "你最喜欢的饮料是什么？" }, "I like apples.": { options: ["我喜欢苹果。","你最喜欢的水果是什么？","你最喜欢的饮料是什么？","这里有一些水果。"], correct: "我喜欢苹果。" }, "Here are some fruits.": { options: ["这里有一些水果。","你最喜欢的水果是什么？","你最喜欢的饮料是什么？","我喜欢苹果。"], correct: "这里有一些水果。" } } }, chinese: "你最喜欢的水果是什么？" },
                    { type: "coop_word_relay", difficulty: "hard", image: '<img src="assets/images/orange_juice.png" width="90">', stepA: { instruction: "读句子，选正确的英文", options: [{ html: "Do you want some orange juice?", value: "Do you want some orange juice?" },{ html: "I like bananas.", value: "I like bananas." },{ html: "My favorite drink is milk.", value: "My favorite drink is milk." },{ html: "Here are some fruits.", value: "Here are some fruits." }], correct: "Do you want some orange juice?" }, stepB: { instruction: "选中文意思", optionsMap: { "Do you want some orange juice?": { options: ["你要橙汁吗？","我喜欢香蕉。","我最喜欢的饮料是牛奶。","这里有一些水果。"], correct: "你要橙汁吗？" }, "I like bananas.": { options: ["我喜欢香蕉。","你要橙汁吗？","我最喜欢的饮料是牛奶。","这里有一些水果。"], correct: "我喜欢香蕉。" }, "My favorite drink is milk.": { options: ["我最喜欢的饮料是牛奶。","你要橙汁吗？","我喜欢香蕉。","这里有一些水果。"], correct: "我最喜欢的饮料是牛奶。" }, "Here are some fruits.": { options: ["这里有一些水果。","你要橙汁吗？","我喜欢香蕉。","我最喜欢的饮料是牛奶。"], correct: "这里有一些水果。" } } }, chinese: "你要橙汁吗？" }
                ]
            },
            {
                id: 4, name: "情境阅读", icon: "🔍", difficulty: "hard", theoryTags: ["Problem-based", "Constructivism"], description: "A读描述，B根据描述做判断",
                questions: [
                    { type: "coop_read_scenario", difficulty: "hard", scenario: "问最喜欢的饮料，回答是橙汁", stepA: { instruction: "读一读这段话", text: "What's your favorite drink? My favorite drink is orange juice. It's sweet.", question: "最喜欢什么饮料？", options: ["橙汁", "牛奶", "苹果汁", "水"], correct: "橙汁" }, stepB: { instruction: "他说最喜欢橙汁，橙汁怎么样？提示：It's sweet.", optionsMap: { "橙汁": { options: ["甜的", "酸的", "苦的", "不好喝"], correct: "甜的" }, "牛奶": { options: ["甜的", "酸的", "苦的", "不好喝"], correct: "甜的" }, "苹果汁": { options: ["甜的", "酸的", "苦的", "不好喝"], correct: "甜的" }, "水": { options: ["甜的", "酸的", "苦的", "不好喝"], correct: "甜的" } } }, chinese: "最喜欢橙汁，很甜" },
                    { type: "coop_read_scenario", difficulty: "hard", scenario: "Li Li最喜欢牛奶，也喜欢苹果汁", stepA: { instruction: "读一读这段话", text: "What's your favorite drink, Li Li? My favorite drink is milk. I like apples. And I like apple juice, too.", question: "Li Li最喜欢什么饮料？", options: ["牛奶", "苹果汁", "橙汁", "水"], correct: "牛奶" }, stepB: { instruction: "Li Li最喜欢牛奶，她还喜欢什么？提示：I like apple juice, too.", optionsMap: { "牛奶": { options: ["苹果汁", "橙汁", "水", "都不喜欢"], correct: "苹果汁" }, "苹果汁": { options: ["苹果汁", "橙汁", "水", "都不喜欢"], correct: "苹果汁" }, "橙汁": { options: ["苹果汁", "橙汁", "水", "都不喜欢"], correct: "苹果汁" }, "水": { options: ["苹果汁", "橙汁", "水", "都不喜欢"], correct: "苹果汁" } } }, chinese: "最喜欢牛奶，也喜欢苹果汁" },
                    { type: "coop_read_scenario", difficulty: "hard", scenario: "公园里有水果，问最喜欢什么水果", stepA: { instruction: "读一读这段话", text: "Here are some fruits. What's your favorite fruit? I like bananas. What about you? I like apples.", question: "第一个人最喜欢什么水果？", options: ["香蕉", "苹果", "橙子", "都喜欢"], correct: "香蕉" }, stepB: { instruction: "第一个人喜欢香蕉，第二个人呢？提示：What about you? I like apples.", optionsMap: { "香蕉": { options: ["苹果", "香蕉", "橙子", "都喜欢"], correct: "苹果" }, "苹果": { options: ["苹果", "香蕉", "橙子", "都喜欢"], correct: "苹果" }, "橙子": { options: ["苹果", "香蕉", "橙子", "都喜欢"], correct: "苹果" }, "都喜欢": { options: ["苹果", "香蕉", "橙子", "都喜欢"], correct: "苹果" } } }, chinese: "一个喜欢香蕉，一个喜欢苹果" },
                    { type: "coop_read_scenario", difficulty: "hard", scenario: "问要不要橙汁", stepA: { instruction: "读一读这段话", text: "Do you want some orange juice? Yes, please. It's my favorite drink.", question: "他要不要橙汁？", options: ["要", "不要", "不知道", "要牛奶"], correct: "要" }, stepB: { instruction: "他说Yes, please.（要），为什么要？提示：It's my favorite drink.", optionsMap: { "要": { options: ["因为是最喜欢的饮料", "因为便宜", "因为渴了", "不知道"], correct: "因为是最喜欢的饮料" }, "不要": { options: ["因为是最喜欢的饮料", "因为便宜", "因为渴了", "不知道"], correct: "因为是最喜欢的饮料" }, "不知道": { options: ["因为是最喜欢的饮料", "因为便宜", "因为渴了", "不知道"], correct: "因为是最喜欢的饮料" }, "要牛奶": { options: ["因为是最喜欢的饮料", "因为便宜", "因为渴了", "不知道"], correct: "因为是最喜欢的饮料" } } }, chinese: "要橙汁，因为是最喜欢的" },
                    { type: "coop_read_scenario", difficulty: "hard", scenario: "谈论最喜欢的食物饮料水果", stepA: { instruction: "读一读这段话", text: "What's your favorite food? I like noodles. What's your favorite drink? My favorite drink is orange juice. What's your favorite fruit? I like bananas.", question: "最喜欢的食物是？", options: ["面条", "鸡蛋", "汉堡", "沙拉"], correct: "面条" }, stepB: { instruction: "食物是面条，饮料呢？提示：My favorite drink is orange juice.", optionsMap: { "面条": { options: ["橙汁", "牛奶", "苹果汁", "水"], correct: "橙汁" }, "鸡蛋": { options: ["橙汁", "牛奶", "苹果汁", "水"], correct: "橙汁" }, "汉堡": { options: ["橙汁", "牛奶", "苹果汁", "水"], correct: "橙汁" }, "沙拉": { options: ["橙汁", "牛奶", "苹果汁", "水"], correct: "橙汁" } } }, chinese: "食物面条，饮料橙汁，水果香蕉" }
                ]
            }
        ]
    },

    // ==================== 写作模块 ====================
    writing: {
        stations: [
            {
                id: 1, name: "合作建句", icon: "✏️", difficulty: "easy", theoryTags: ["Constructivism", "SLA"], description: "A放前半句词块，B放后半句词块",
                questions: [
                    { type: "coop_build_sentence", difficulty: "easy", sentence: "I like apples.", stepA: { words: ["I", "like"], instruction: "选前半句的词" }, stepB: { words: ["apples."], instruction: "选后半句的词" }, chinese: "我喜欢苹果。" },
                    { type: "coop_build_sentence", difficulty: "easy", sentence: "I like bananas.", stepA: { words: ["I", "like"], instruction: "选前半句的词" }, stepB: { words: ["bananas."], instruction: "选后半句的词" }, chinese: "我喜欢香蕉。" },
                    { type: "coop_build_sentence", difficulty: "easy", sentence: "My favorite drink is milk.", stepA: { words: ["My", "favorite"], instruction: "选前半句的词" }, stepB: { words: ["drink", "is", "milk."], instruction: "选后半句的词" }, chinese: "我最喜欢的饮料是牛奶。" },
                    { type: "coop_build_sentence", difficulty: "medium", sentence: "What's your favorite fruit?", stepA: { words: ["What's", "your"], instruction: "选前半句的词" }, stepB: { words: ["favorite", "fruit?"], instruction: "选后半句的词" }, chinese: "你最喜欢的水果是什么？" },
                    { type: "coop_build_sentence", difficulty: "medium", sentence: "Do you want some orange juice?", stepA: { words: ["Do", "you", "want"], instruction: "排好前半句" }, stepB: { words: ["some", "orange", "juice?"], instruction: "排好后半句" }, chinese: "你要橙汁吗？" }
                ]
            },
            {
                id: 2, name: "接力填空", icon: "📝", difficulty: "medium", theoryTags: ["SLA", "ZPD"], description: "A填第1个空，B填第2个空",
                questions: [
                    { type: "coop_relay_fill", difficulty: "medium", template: "What's your favorite ___? My favorite drink is ___.", image: '<img src="assets/images/orange_juice.png" width="70">', stepA: { blank: 1, options: ["drink", "food", "fruit", "color"], correct: "drink", instruction: "最喜欢的饮料：favorite ___，填第1个空" }, stepB: { blank: 2, options: ["orange juice", "milk", "water", "apple juice"], correct: "orange juice", instruction: "图片是橙汁，My favorite drink is ___，填第2个空" }, chinese: "What's your favorite drink? My favorite drink is orange juice." },
                    { type: "coop_relay_fill", difficulty: "medium", template: "What's your favorite ___? I like ___.", image: '<img src="assets/images/banana.png" width="70">', stepA: { blank: 1, options: ["fruit", "drink", "food", "color"], correct: "fruit", instruction: "最喜欢的水果：favorite ___，填第1个空" }, stepB: { blank: 2, options: ["bananas", "apples", "oranges", "milk"], correct: "bananas", instruction: "图片是香蕉（bananas），I like ___，填第2个空" }, chinese: "What's your favorite fruit? I like bananas." },
                    { type: "coop_relay_fill", difficulty: "medium", template: "Do you want some ___? Yes, ___.", image: '<img src="assets/images/orange_juice.png" width="70">', stepA: { blank: 1, options: ["orange juice", "milk", "water", "apple juice"], correct: "orange juice", instruction: "要橙汁吗？some ___，填第1个空" }, stepB: { blank: 2, options: ["please", "thanks", "sorry", "no"], correct: "please", instruction: "回答【好的】：Yes, ___，填第2个空" }, chinese: "Do you want some orange juice? Yes, please." },
                    { type: "coop_relay_fill", difficulty: "hard", template: "Here are some ___. I like ___.", image: '<img src="assets/images/red_apple.png" width="70">', stepA: { blank: 1, options: ["fruits", "drinks", "food", "milk"], correct: "fruits", instruction: "这里有一些水果：some ___，填第1个空" }, stepB: { blank: 2, options: ["apples", "bananas", "oranges", "milk"], correct: "apples", instruction: "图片是苹果，I like ___，填第2个空" }, chinese: "Here are some fruits. I like apples." },
                    { type: "coop_relay_fill", difficulty: "hard", template: "My ___ drink is milk. It's ___.", image: '<img src="assets/images/milk.png" width="70">', stepA: { blank: 1, options: ["favorite", "good", "big", "new"], correct: "favorite", instruction: "最喜欢的饮料：My ___ drink，填第1个空" }, stepB: { blank: 2, options: ["sweet", "big", "small", "good"], correct: "sweet", instruction: "牛奶很甜：It's ___，填第2个空" }, chinese: "My favorite drink is milk. It's sweet." }
                ]
            },
            {
                id: 3, name: "合作拼词", icon: "🔤", difficulty: "hard", theoryTags: ["Play-based", "SLA"], description: "A放前半字母，B放后半字母",
                questions: [
                    { type: "coop_spell_word", difficulty: "medium", word: "apple", image: '<img src="assets/images/red_apple.png" width="60">', stepA: { letters: ["a", "p", "p"], distractors: ["o", "e"], instruction: "拼前半：a____" }, stepB: { letters: ["l", "e"], distractors: ["t", "n"], instruction: "拼后半：___le" }, chinese: "苹果" },
                    { type: "coop_spell_word", difficulty: "medium", word: "banana", image: '<img src="assets/images/banana.png" width="60">', stepA: { letters: ["b", "a", "n"], distractors: ["o", "e"], instruction: "拼前半：b_____" }, stepB: { letters: ["a", "n", "a"], distractors: ["t", "d"], instruction: "拼后半：___ana" }, chinese: "香蕉" },
                    { type: "coop_spell_word", difficulty: "medium", word: "water", image: '<img src="assets/images/water.png" width="60">', stepA: { letters: ["w", "a", "t"], distractors: ["o", "i"], instruction: "拼前半：w____" }, stepB: { letters: ["e", "r"], distractors: ["n", "d"], instruction: "拼后半：___er" }, chinese: "水" },
                    { type: "coop_spell_word", difficulty: "hard", word: "orange", image: '<img src="assets/images/orange.png" width="60">', stepA: { letters: ["o", "r", "a"], distractors: ["i", "u"], instruction: "拼前半：o_____" }, stepB: { letters: ["n", "g", "e"], distractors: ["t", "d"], instruction: "拼后半：___nge" }, chinese: "橙子" },
                    { type: "coop_spell_word", difficulty: "hard", word: "fruit", image: '<img src="assets/images/fruit.png" width="60">', stepA: { letters: ["f", "r", "u"], distractors: ["a", "o"], instruction: "拼前半：f____" }, stepB: { letters: ["i", "t"], distractors: ["n", "d"], instruction: "拼后半：___it" }, chinese: "水果" }
                ]
            },
            {
                id: 4, name: "情境写作", icon: "💌", difficulty: "hard", theoryTags: ["Problem-based", "Project"], description: "A选情境，B写句子，合作完成对话",
                questions: [
                    { type: "coop_write_scenario", difficulty: "hard", scenario: "问最喜欢的饮料（你最喜欢橙汁）", stepA: { instruction: "问最喜欢的饮料", options: ["What's your favorite drink?", "I like apples.", "Good morning.", "I'm hungry."] }, stepB: { instruction: "你最喜欢橙汁，回答", optionsMap: { "What's your favorite drink?": { options: ["My favorite drink is orange juice.", "I like apples.", "Good morning.", "I'm hungry."], correct: "My favorite drink is orange juice." }, "I like apples.": { options: ["Me too!", "My favorite drink is orange juice.", "Good morning.", "I'm hungry."], correct: "Me too!" }, "Good morning.": { options: ["Good morning!", "My favorite drink is orange juice.", "I like apples.", "I'm hungry."], correct: "Good morning!" }, "I'm hungry.": { options: ["What do you want to eat?", "My favorite drink is orange juice.", "Good morning.", "I like apples."], correct: "What do you want to eat?" } } }, chinese: "问饮料→橙汁" },
                    { type: "coop_write_scenario", difficulty: "hard", scenario: "问最喜欢的水果（你喜欢香蕉）", stepA: { instruction: "问最喜欢的水果", options: ["What's your favorite fruit?", "What's your favorite drink?", "I like bananas.", "Good morning."] }, stepB: { instruction: "你喜欢香蕉，回答", optionsMap: { "What's your favorite fruit?": { options: ["I like bananas.", "I like apples.", "My favorite drink is milk.", "Good morning."], correct: "I like bananas." }, "What's your favorite drink?": { options: ["My favorite drink is milk.", "I like bananas.", "I like apples.", "Good morning."], correct: "My favorite drink is milk." }, "I like bananas.": { options: ["Me too!", "I like apples.", "My favorite drink is milk.", "Good morning."], correct: "Me too!" }, "Good morning.": { options: ["Good morning!", "I like bananas.", "I like apples.", "My favorite drink is milk."], correct: "Good morning!" } } }, chinese: "问水果→香蕉" },
                    { type: "coop_write_scenario", difficulty: "hard", scenario: "给朋友橙汁", stepA: { instruction: "问朋友要不要橙汁", options: ["Do you want some orange juice?", "What's your favorite drink?", "I like apples.", "Good morning."] }, stepB: { instruction: "朋友问你要不要橙汁，你要！", optionsMap: { "Do you want some orange juice?": { options: ["Yes, please.", "No, thank you.", "I like apples.", "Good morning."], correct: "Yes, please." }, "What's your favorite drink?": { options: ["My favorite drink is orange juice.", "Yes, please.", "No, thank you.", "Good morning."], correct: "My favorite drink is orange juice." }, "I like apples.": { options: ["Me too!", "Yes, please.", "No, thank you.", "Good morning."], correct: "Me too!" }, "Good morning.": { options: ["Good morning!", "Yes, please.", "No, thank you.", "Me too!"], correct: "Good morning!" } } }, chinese: "问要不要橙汁→要" },
                    { type: "coop_write_scenario", difficulty: "hard", scenario: "谈论最喜欢的食物饮料水果（Li Li饮料牛奶、水果苹果）", stepA: { instruction: "问Li Li最喜欢的饮料", options: ["What's your favorite drink?", "What's your favorite fruit?", "I like milk.", "Good morning."] }, stepB: { instruction: "Li Li最喜欢牛奶，帮她回答", optionsMap: { "What's your favorite drink?": { options: ["My favorite drink is milk.", "I like apples.", "I like bananas.", "Good morning."], correct: "My favorite drink is milk." }, "What's your favorite fruit?": { options: ["I like apples.", "My favorite drink is milk.", "I like bananas.", "Good morning."], correct: "I like apples." }, "I like milk.": { options: ["Me too!", "My favorite drink is milk.", "I like apples.", "Good morning."], correct: "Me too!" }, "Good morning.": { options: ["Good morning!", "My favorite drink is milk.", "I like apples.", "I like bananas."], correct: "Good morning!" } } }, chinese: "Li Li最喜欢牛奶" },
                    { type: "coop_write_scenario", difficulty: "hard", scenario: "公园里有水果，选一个你喜欢的", stepA: { instruction: "说这里有水果", options: ["Here are some fruits.", "I like apples.", "What's your favorite fruit?", "Good morning."] }, stepB: { instruction: "A说了有水果，你选一个喜欢的", optionsMap: { "Here are some fruits.": { options: ["I like bananas.", "Here are some fruits.", "Good morning.", "Thank you."], correct: "I like bananas." }, "I like apples.": { options: ["Me too!", "I like bananas.", "Good morning.", "Thank you."], correct: "Me too!" }, "What's your favorite fruit?": { options: ["I like bananas.", "Here are some fruits.", "Good morning.", "Thank you."], correct: "I like bananas." }, "Good morning.": { options: ["Good morning!", "I like bananas.", "Here are some fruits.", "Thank you."], correct: "Good morning!" } } }, chinese: "有水果→我喜欢香蕉" }
                ]
            }
        ]
    },

    // ==================== 口语模块 ====================
    speaking: {
        stations: [
            {
                id: 1, name: "跟读模仿", icon: "🎤", difficulty: "easy", theoryTags: ["SLA", "Self-efficacy"], description: "A听音频跟读，B跟着读同一个",
                questions: [
                    { type: "coop_read_relay", word: "orange juice", chinese: "橙汁", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "apple", chinese: "苹果", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "banana", chinese: "香蕉", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "water", chinese: "水", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "favorite", chinese: "最喜欢的", difficulty: "easy", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "What's your favorite drink", chinese: "你最喜欢的饮料是什么", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "My favorite drink is milk", chinese: "我最喜欢的饮料是牛奶", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "I like bananas", chinese: "我喜欢香蕉", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "Do you want some orange juice", chinese: "你要橙汁吗", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } },
                    { type: "coop_read_relay", word: "Here are some fruits", chinese: "这里有一些水果", difficulty: "medium", stepA: { instruction: "听音频，跟着读" }, stepB: { instruction: "跟着读同一个" } }
                ]
            },
            {
                id: 2, name: "看图说话", icon: "💬", difficulty: "medium", theoryTags: ["SLA", "Self-efficacy"], description: "看图片和句型框架，说出完整句子",
                questions: [
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/red_apple.png" width="90">', answer: "I like apples", chinese: "我喜欢苹果", stepA: { instruction: "看图片，说出完整句子：I like _____.", expected: "I like apples", chinese: "我喜欢苹果" }, stepB: { instruction: "你也看图说同一句话：I like _____.", expected: "I like apples", chinese: "我喜欢苹果" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/banana.png" width="90">', answer: "I like bananas", chinese: "我喜欢香蕉", stepA: { instruction: "看图片，说出完整句子：I like _____.", expected: "I like bananas", chinese: "我喜欢香蕉" }, stepB: { instruction: "你也看图说同一句话：I like _____.", expected: "I like bananas", chinese: "我喜欢香蕉" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/orange_juice.png" width="90">', answer: "My favorite drink is orange juice", chinese: "我最喜欢的饮料是橙汁", stepA: { instruction: "看图片，说出完整句子：My favorite drink is _____.", expected: "My favorite drink is orange juice", chinese: "我最喜欢的饮料是橙汁" }, stepB: { instruction: "你也看图说同一句话：My favorite drink is _____.", expected: "My favorite drink is orange juice", chinese: "我最喜欢的饮料是橙汁" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/milk.png" width="90">', answer: "My favorite drink is milk", chinese: "我最喜欢的饮料是牛奶", stepA: { instruction: "看图片，说出完整句子：My favorite drink is _____.", expected: "My favorite drink is milk", chinese: "我最喜欢的饮料是牛奶" }, stepB: { instruction: "你也看图说同一句话：My favorite drink is _____.", expected: "My favorite drink is milk", chinese: "我最喜欢的饮料是牛奶" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/fruit.png" width="90">', answer: "What's your favorite fruit", chinese: "你最喜欢的水果是什么", stepA: { instruction: "看图片，说出完整句子：What's your favorite _____?", expected: "What's your favorite fruit", chinese: "你最喜欢的水果是什么" }, stepB: { instruction: "你也看图说同一句话：What's your favorite _____?", expected: "What's your favorite fruit", chinese: "你最喜欢的水果是什么" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/orange_juice.png" width="90">', answer: "Do you want some orange juice", chinese: "你要橙汁吗", stepA: { instruction: "看图片，说出完整句子：Do you want some _____?", expected: "Do you want some orange juice", chinese: "你要橙汁吗" }, stepB: { instruction: "你也看图说同一句话：Do you want some _____?", expected: "Do you want some orange juice", chinese: "你要橙汁吗" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/fruit.png" width="90">', answer: "Here are some fruits", chinese: "这里有一些水果", stepA: { instruction: "看图片，说出完整句子：Here are some _____.", expected: "Here are some fruits", chinese: "这里有一些水果" }, stepB: { instruction: "你也看图说同一句话：Here are some _____.", expected: "Here are some fruits", chinese: "这里有一些水果" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/orange_juice.png" width="90">', answer: "What's your favorite drink", chinese: "你最喜欢的饮料是什么", stepA: { instruction: "看图片，说出完整句子：What's your favorite _____?", expected: "What's your favorite drink", chinese: "你最喜欢的饮料是什么" }, stepB: { instruction: "你也看图说同一句话：What's your favorite _____?", expected: "What's your favorite drink", chinese: "你最喜欢的饮料是什么" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/orange_juice.png" width="90">', answer: "Yes please", chinese: "好的", stepA: { instruction: "看图片，说出完整句子：Yes, _____.", expected: "Yes please", chinese: "好的" }, stepB: { instruction: "你也看图说同一句话：Yes, _____.", expected: "Yes please", chinese: "好的" } },
                    { type: "coop_picture_speak", difficulty: "medium", image: '<img src="assets/images/red_apple.png" width="90">', answer: "I like apples and apple juice", chinese: "我喜欢苹果和苹果汁", stepA: { instruction: "看图片，说出完整句子：I like _____ and _____ juice.", expected: "I like apples and apple juice", chinese: "我喜欢苹果和苹果汁" }, stepB: { instruction: "你也看图说同一句话：I like _____ and _____ juice.", expected: "I like apples and apple juice", chinese: "我喜欢苹果和苹果汁" } }
                ]
            },
            {
                id: 3, name: "合作对话", icon: "🗣️", difficulty: "hard", theoryTags: ["SLA", "Self-efficacy"], description: "A问最喜欢的，B回答",
                questions: [
                    { type: "coop_dialogue", difficulty: "hard", scenario: "问最喜欢的饮料", image: '<img src="assets/images/orange_juice.png" width="90">', stepA: { instruction: "看示范句，问最喜欢的饮料", role: "提问者", line: "What's your favorite drink", chinese: "你最喜欢的饮料是什么？" }, stepB: { instruction: "看示范句，回答橙汁", role: "回答者", line: "My favorite drink is orange juice", chinese: "我最喜欢的饮料是橙汁。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "问最喜欢的饮料-牛奶", image: '<img src="assets/images/milk.png" width="90">', stepA: { instruction: "看示范句，问最喜欢的饮料", role: "提问者", line: "What's your favorite drink", chinese: "你最喜欢的饮料是什么？" }, stepB: { instruction: "看示范句，回答牛奶", role: "回答者", line: "My favorite drink is milk", chinese: "我最喜欢的饮料是牛奶。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "问最喜欢的水果", image: '<img src="assets/images/banana.png" width="90">', stepA: { instruction: "看示范句，问最喜欢的水果", role: "提问者", line: "What's your favorite fruit", chinese: "你最喜欢的水果是什么？" }, stepB: { instruction: "看示范句，回答香蕉", role: "回答者", line: "I like bananas", chinese: "我喜欢香蕉。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "问最喜欢的水果-苹果", image: '<img src="assets/images/red_apple.png" width="90">', stepA: { instruction: "看示范句，问最喜欢的水果", role: "提问者", line: "What's your favorite fruit", chinese: "你最喜欢的水果是什么？" }, stepB: { instruction: "看示范句，回答苹果", role: "回答者", line: "I like apples", chinese: "我喜欢苹果。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "问要不要橙汁", image: '<img src="assets/images/orange_juice.png" width="90">', stepA: { instruction: "看示范句，问要不要", role: "提问者", line: "Do you want some orange juice", chinese: "你要橙汁吗？" }, stepB: { instruction: "看示范句，回答要", role: "回答者", line: "Yes please", chinese: "好的。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "你喜欢苹果", image: '<img src="assets/images/red_apple.png" width="90">', stepA: { instruction: "看示范句，说你喜欢苹果", role: "学生A", line: "I like apples", chinese: "我喜欢苹果。" }, stepB: { instruction: "看示范句，说你喜欢香蕉", role: "学生B", line: "I like bananas", chinese: "我喜欢香蕉。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "橙汁很甜", image: '<img src="assets/images/orange_juice.png" width="90">', stepA: { instruction: "看示范句，问最喜欢的饮料", role: "提问者", line: "What's your favorite drink", chinese: "你最喜欢的饮料是什么？" }, stepB: { instruction: "看示范句，说橙汁很甜", role: "回答者", line: "Orange juice It's sweet", chinese: "橙汁。很甜。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "这里有水果", image: '<img src="assets/images/fruit.png" width="90">', stepA: { instruction: "看示范句，说有水果", role: "主人", line: "Here are some fruits", chinese: "这里有一些水果。" }, stepB: { instruction: "看示范句，问最喜欢什么", role: "客人", line: "What's your favorite fruit", chinese: "你最喜欢的水果是什么？" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "我也喜欢苹果汁", image: '<img src="assets/images/apple_juice.png" width="90">', stepA: { instruction: "看示范句，说喜欢苹果", role: "学生A", line: "I like apples", chinese: "我喜欢苹果。" }, stepB: { instruction: "看示范句，说也喜欢苹果汁", role: "学生B", line: "I like apple juice too", chinese: "我也喜欢苹果汁。" } },
                    { type: "coop_dialogue", difficulty: "hard", scenario: "问你呢", image: '<img src="assets/images/banana.png" width="90">', stepA: { instruction: "看示范句，说喜欢香蕉", role: "学生A", line: "I like bananas What about you", chinese: "我喜欢香蕉。你呢？" }, stepB: { instruction: "看示范句，说喜欢苹果", role: "学生B", line: "I like apples", chinese: "我喜欢苹果。" } }
                ]
            }
        ]
    }
};

if (typeof window !== 'undefined') {
    window.u4l3_coop = u4l3_coop;
}
