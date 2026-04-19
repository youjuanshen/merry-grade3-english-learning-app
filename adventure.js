/**
 * adventure.js — 冒险地图 + 站点系统 + 合作流程控制
 *
 * 核心职责：
 * 1. 冒险地图渲染（简洁列表风格）
 * 2. 站点状态管理（locked/current/completed）
 * 3. 合作流程控制（A步骤→B步骤→判断）
 * 4. "合作重做"机制
 * 5. 站点间难度递进
 */

// ===== 课程选择 =====
var _currentCoopLessonId = localStorage.getItem('coop_lesson_id') || 'U1L1';

function getCurrentCoopData() {
    var map = {
        'U1L1': window.u1l1_coop,
        'U1L2': window.u1l2_coop,
        'U1L3': window.u1l3_coop,
        'U1L4': window.u1l4_coop,
        'U2L1': window.u2l1_coop,
        'U2L2': window.u2l2_coop,
        'U2L3': window.u2l3_coop,
        'U2L4': window.u2l4_coop,
        'U3L1': window.u3l1_coop,
        'U3L2': window.u3l2_coop,
        'U3L3': window.u3l3_coop,
        'U3L4': window.u3l4_coop,
        'U4L1': window.u4l1_coop,
        'U4L2': window.u4l2_coop,
        'U4L3': window.u4l3_coop,
        'U4L4': window.u4l4_coop
    };
    return map[_currentCoopLessonId] || window.u1l1_coop;
}

function switchCoopLesson(lessonId) {
    _currentCoopLessonId = lessonId;
    localStorage.setItem('coop_lesson_id', lessonId);
    console.log('[选课] 切换到合作冒险课程: ' + lessonId);
}

// ===== 多样化反馈评语系统（Self-efficacy: verbal persuasion）=====
var FEEDBACK_MESSAGES = {
    // 答对 - 普通正确
    correct_normal: [
        '做得好！继续加油！',
        '太棒了！你们配合真默契！',
        '答对了！你们是最佳搭档！',
        '厉害！一起继续冒险吧！',
        '正确！你们越来越强了！',
        '真聪明！这道题难不倒你们！'
    ],
    // 答对 - 连续答对（combo 2+）
    correct_combo: [
        '连续答对！你们停不下来了！',
        '又对了！势不可挡！',
        '连胜中！你们太厉害了！',
        '完美配合！继续保持！'
    ],
    // 答对 - 错题重做时一次答对
    correct_retry_mastered: [
        '这次一次就对了！进步真大！',
        '看！你们已经掌握了！',
        '太好了！这道题被你们征服了！'
    ],
    // 答错 - 第一次错
    wrong_first: [
        '没关系，再试一次！',
        '别灰心，想一想再来！',
        '加油！你们一定可以的！',
        '错了也没关系，这就是学习！'
    ],
    // 答错 - 多次错同一题
    wrong_repeat: [
        '别着急，慢慢来！',
        '仔细看看提示，一定能做对！',
        '坚持就是胜利！再来一次！'
    ],
    // 答错 - 强制跳过（重试4次仍错）
    wrong_skip: [
        '没关系，下一题继续加油！',
        '先跳过，后面还有机会！',
        '别灰心，我们继续前进！'
    ],
    // 通关 - 3星
    complete_3star: [
        '你们太厉害了！一次全过！🎉',
        '满分通过！完美搭档！🎉',
        '三颗星！你们是冠军！🎉'
    ],
    // 通关 - 2星
    complete_2star: [
        '做得很好！继续努力更完美！',
        '你们坚持下来了！继续加油！💪',
        '不错！离满星只差一点点！'
    ],
    // 通关 - 1星
    complete_1star: [
        '通关了！下次争取更多星星！',
        '有点难，但你们撑过来了！👏',
        '坚持到最后，你们很棒！'
    ],
    // 通关 - 错题全部掌握
    complete_retry_mastered: [
        '所有错题都掌握了！你们真棒！',
        '从错误中学习，你们做到了！',
        '错题全部征服！了不起！'
    ],
    // 模块全部完成
    module_complete: [
        '太棒了！你们的合作越来越默契了！',
        '全部通关！你们是最强搭档！',
        '了不起的冒险！你们做到了！'
    ]
};

// 反馈选取：避免连续重复
var _lastFeedback = {};
function getRandomFeedback(category) {
    var msgs = FEEDBACK_MESSAGES[category];
    if (!msgs || msgs.length === 0) return '';
    if (msgs.length === 1) return msgs[0];
    var last = _lastFeedback[category];
    var pick;
    do {
        pick = msgs[Math.floor(Math.random() * msgs.length)];
    } while (pick === last && msgs.length > 1);
    _lastFeedback[category] = pick;
    return pick;
}

// 连续答对计数
var _comboCount = 0;

// ===== 冒险状态 =====
var adventureState = null; // null = 非冒险模式

function initAdventureState(module, coopData) {
    var stations = coopData[module] ? coopData[module].stations : [];
    var saved = loadAdventureProgress(coopData.id, module, stations);

    adventureState = {
        lessonId: coopData.id,
        module: module,
        stations: stations,
        currentStation: saved.currentStation || 0,
        completedStations: saved.completedStations || [],
        stationResults: saved.stationResults || {},  // {stationId: {stars, accuracy}}
        stationSessionId: 0,        // 防止stale callback闪退
        // 合作答题状态（进入站点后初始化）
        coopPhase: 'A',        // 'A' | 'B' | 'judge'
        aResult: null,
        retryCount: 0,
        stationProgress: null,
        // 自适应队列（进入站点后初始化）
        questionQueue: [],          // 当前站点的题目队列（存题目索引）
        questionQueue_original: [], // 原始题目总数（用于星星计算）
        retryCountMap: {},          // 每题重试次数 {questionIndex: count}
        forceSkipped: [],           // 被强制跳过的题目索引
        scaffoldLevels: {},         // 每题当前支架级别 {questionIndex: level}
        stationStars: 0,            // 本站星星数（完成后计算）
        stationStarsHistory: [],    // 历史各站星星数（用于站间难度调整）
        questionDetailLog: [],      // 每题完成时的详细数据记录
        // 合作角色指针：[roleA, roleB]。每进入"新的一题"都 reverse 一次，
        // 确保 A/B 跨站点跨题型严格每题轮换（修复：之前按 questionIndex 奇偶
        // 决定角色，遇到重做/队列重排会导致同一人连续做 A）
        coopRoles: [0, 1]
    };
    return adventureState;
}

// ===== 进度持久化 =====
function loadAdventureProgress(lessonId, module, stations) {
    try {
        var key = 'adventure_' + lessonId + '_' + module;
        var data = localStorage.getItem(key);
        var state = data ? JSON.parse(data) : {};
        // 越界容错：站点结构变更后（如 listening 5→4），老用户 localStorage 里的
        // currentStation/completedStations 可能指向已不存在的站点，需要 clamp/过滤
        if (stations && stations.length) {
            if (typeof state.currentStation === 'number') {
                if (state.currentStation >= stations.length) {
                    state.currentStation = Math.max(0, stations.length - 1);
                }
                if (state.currentStation < 0) state.currentStation = 0;
            }
            if (Array.isArray(state.completedStations)) {
                state.completedStations = state.completedStations.filter(function(id) {
                    return id >= 1 && id <= stations.length;
                });
            }
        }
        return state;
    } catch(e) { return {}; }
}

function saveAdventureProgress() {
    if (!adventureState) return;
    try {
        var key = 'adventure_' + adventureState.lessonId + '_' + adventureState.module;
        localStorage.setItem(key, JSON.stringify({
            currentStation: adventureState.currentStation,
            completedStations: adventureState.completedStations,
            stationResults: adventureState.stationResults || {}
        }));
    } catch(e) {}
}

// ===== 冒险地图渲染（简洁列表风格）=====
function renderAdventureMap() {
    var container = document.getElementById('adventure-map-container');
    if (!container || !adventureState) return;

    var moduleNames = { listening: '听力冒险', reading: '阅读冒险', writing: '写作冒险', speaking: '口语冒险' };
    var titleEl = document.getElementById('adventure-module-title');
    if (titleEl) titleEl.textContent = moduleNames[adventureState.module] || '冒险';

    var html = '';
    var stations = adventureState.stations;

    // 是否全部通关（决定"再练"按钮是否可点）
    var allCompleted = true;
    for (var ci = 0; ci < stations.length; ci++) {
        if (adventureState.completedStations.indexOf(stations[ci].id) === -1) {
            allCompleted = false;
            break;
        }
    }

    for (var i = 0; i < stations.length; i++) {
        var s = stations[i];
        var isCompleted = adventureState.completedStations.indexOf(s.id) !== -1;
        var isCurrent = (i === adventureState.currentStation) && !isCompleted;
        var isLocked = !isCompleted && !isCurrent;

        var cardClass = 'station-card';
        if (isCompleted) cardClass += ' station-completed';
        else if (isCurrent) cardClass += ' station-current';
        else cardClass += ' station-locked';

        // 读取本站历史成绩
        var result = (adventureState.stationResults && adventureState.stationResults[s.id]) || null;

        html += '<div class="' + cardClass + '" data-station="' + i + '"' +
                (isCurrent ? ' onclick="showStationIntro(' + i + ', function(){ enterStation(' + i + '); })"' : '') +
                (isCompleted && allCompleted ? ' onclick="showStationIntro(' + i + ', function(){ enterStation(' + i + '); })"' : '') + '>';

        // 左侧：状态图标区
        if (isCompleted) {
            // 已完成：显示星星
            var starCount = result ? result.stars : 1;
            var starsStr = '';
            for (var si = 0; si < 3; si++) {
                starsStr += si < starCount ? '⭐' : '☆';
            }
            html += '<div class="station-icon station-stars">' + starsStr + '</div>';
        } else if (isCurrent) {
            html += '<div class="station-icon station-current-icon">👉</div>';
        } else {
            html += '<div class="station-icon station-lock-icon">🔒</div>';
        }

        html += '<div class="station-info">';
        html += '<div class="station-name">' + s.icon + ' 站点' + s.id + '  ' + s.name + '</div>';

        if (isCompleted && result) {
            // 已完成：显示正确率
            html += '<div class="station-accuracy">' + result.accuracy + '% 正确</div>';
        } else if (isCurrent) {
            html += '<div class="station-current-label">当前关卡</div>';
        } else {
            html += '<div class="station-desc">' + (s.description || '未解锁') + '</div>';
        }

        html += '</div>';

        if (isCurrent) {
            html += '<div class="station-go">GO!</div>';
        } else if (isCompleted) {
            if (allCompleted) {
                html += '<div class="station-replay">再练</div>';
            } else {
                html += '<div class="station-replay station-replay-disabled" style="opacity:0.4;pointer-events:none;">再练</div>';
            }
        }
        html += '</div>';
    }

    // ===== 总星数统计栏（Self-efficacy: mastery experience 可视化）=====
    var totalStars = 0;
    var maxStars = stations.length * 3;
    for (var si = 0; si < stations.length; si++) {
        var sResult = (adventureState.stationResults && adventureState.stationResults[stations[si].id]) || null;
        if (sResult) totalStars += sResult.stars;
    }
    // 星星行
    var starsRowHtml = '';
    for (var si = 0; si < maxStars; si++) {
        if (si < totalStars) {
            starsRowHtml += '<span style="font-size:18px;margin:0 1px;display:inline-block;">⭐</span>';
        } else {
            starsRowHtml += '<span style="font-size:18px;margin:0 1px;display:inline-block;opacity:0.35;">☆</span>';
        }
    }
    // 进度百分比
    var starPercent = maxStars > 0 ? Math.round(totalStars / maxStars * 100) : 0;
    // 鼓励话语
    var encourageMsg = '';
    if (totalStars === 0) encourageMsg = '开始冒险吧！';
    else if (totalStars <= 4) encourageMsg = '不错的开始！继续加油！';
    else if (totalStars <= 8) encourageMsg = '太厉害了！已经过半了！';
    else if (totalStars <= 11) encourageMsg = '马上就要集齐了！';
    else encourageMsg = '全部集齐！你们是最强搭档！';

    // 如果还有未完成站点，显示"继续冒险"浮动按钮
    var nextUnlocked = -1;
    for (var ni = 0; ni < stations.length; ni++) {
        if (adventureState.completedStations.indexOf(stations[ni].id) === -1) {
            nextUnlocked = ni;
            break;
        }
    }
    if (nextUnlocked >= 0) {
        html += '<div style="margin-top:16px;text-align:center;">' +
            '<button onclick="showStationIntro(' + nextUnlocked + ', function(){ enterStation(' + nextUnlocked + '); })" ' +
            'style="width:90%;max-width:360px;padding:15px;background:linear-gradient(135deg,#58cc02,#7ed957);color:#fff;border:none;border-radius:16px;font-size:18px;font-weight:bold;box-shadow:0 5px 0 #46a302;cursor:pointer;">' +
            '继续冒险 → 站点' + (nextUnlocked + 1) +
            '</button></div>';
    }

    html += '<div style="background:#f9f9f3;border-radius:12px;padding:16px;margin-top:20px;text-align:center;">' +
        // 星星行
        '<div style="line-height:24px;">' + starsRowHtml + '</div>' +
        // 进度条
        '<div style="width:80%;margin:10px auto 0;background:#eee;border-radius:8px;height:8px;overflow:hidden;">' +
            '<div style="width:' + starPercent + '%;height:100%;border-radius:8px;background:linear-gradient(90deg,#58cc02,#46a302);transition:width 0.4s;"></div>' +
        '</div>' +
        // 鼓励话语
        '<div style="font-size:14px;color:#888;margin-top:8px;">' + encourageMsg + '</div>' +
    '</div>';

    container.innerHTML = html;
}

// ===== 显示冒险地图页面 =====
function showAdventureMap(module) {
    // 获取合作题库
    var coopData = getCurrentCoopData(); // 根据选课动态获取
    if (!coopData || !coopData[module]) {
        alert('该模块的合作题库还没准备好');
        return;
    }

    // 冒险模式下屏蔽教师同步指令，防止 Firebase 轮询拉到旧命令后把 game-screen 切走（闪退根因）
    if (typeof studentSelfSelectMode !== 'undefined') {
        studentSelfSelectMode = true;
    }

    // 口语模块预热麦克风（提前获取权限，避免第一次录音0分）
    if (module === 'speaking' && window.SpeechEvaluator && window.SpeechEvaluator.warmupMic) {
        window.SpeechEvaluator.warmupMic();
    }

    initAdventureState(module, coopData);

    // 切换到冒险地图页面
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) screens[i].classList.remove('active');
    document.getElementById('adventure-map-screen').classList.add('active');

    renderAdventureMap();
}

// ===== 站间难度调整：根据上站星星数返回本站题目难度配比 =====
function getNextStationDifficulty(stars) {
    if (stars === 3) return { easy: 0.2, medium: 0.5, hard: 0.3 };
    if (stars === 2) return { easy: 0.4, medium: 0.4, hard: 0.2 };
    return { easy: 0.6, medium: 0.3, hard: 0.1 }; // 1星或首站
}

// ===== 按难度配比筛选题目列表（返回题目索引数组）=====
function buildQuestionQueueByDifficulty(questions, ratio) {
    var easy = [], medium = [], hard = [], other = [];
    for (var i = 0; i < questions.length; i++) {
        var d = questions[i].difficulty;
        if (d === 'easy')        easy.push(i);
        else if (d === 'medium') medium.push(i);
        else if (d === 'hard')   hard.push(i);
        else                     other.push(i);
    }

    // 如果没有难度标注，直接全部按顺序返回
    if (easy.length + medium.length + hard.length === 0) {
        return questions.map(function(_, i) { return i; });
    }

    var total = questions.length;
    var easyCount  = Math.min(easy.length,   Math.round(total * ratio.easy));
    var mediumCount = Math.min(medium.length, Math.round(total * ratio.medium));
    var hardCount  = Math.min(hard.length,   Math.round(total * ratio.hard));

    // 不足时补全（取所有题）
    var queue = [];
    queue = queue.concat(easy.slice(0, easyCount));
    queue = queue.concat(medium.slice(0, mediumCount));
    queue = queue.concat(hard.slice(0, hardCount));

    // 如果计算后题数不足，将剩余题目补入
    if (queue.length < total) {
        var used = {};
        queue.forEach(function(idx) { used[idx] = true; });
        for (var j = 0; j < questions.length; j++) {
            if (!used[j]) queue.push(j);
        }
    }

    // 按 easy→medium→hard 排序
    queue.sort(function(a, b) {
        var order = { easy: 0, medium: 1, hard: 2 };
        var da = questions[a].difficulty || 'medium';
        var db = questions[b].difficulty || 'medium';
        return (order[da] || 1) - (order[db] || 1);
    });

    // 兜底：若计算后队列仍为空，按顺序放入所有题目
    if (queue.length === 0) {
        queue = questions.map(function(_, i) { return i; });
    }

    return queue;
}

// ===== 星星计算（基于首次作答正确率，不含错题重做轮）=====
function calcStationStars() {
    var sp = adventureState.stationProgress;
    // 使用 A+B 总正确数/总题数，与地图显示的正确率一致
    var total = sp.aTotal + sp.bTotal;
    if (total === 0) return 1;  // 没有数据给1星，不给3星

    var accuracy = (sp.aCorrect + sp.bCorrect) / total;  // 0~1

    if (accuracy >= 0.9) return 3;   // 90%+ → 3星
    if (accuracy >= 0.7) return 2;   // 70-89% → 2星
    return 1;                         // 70%以下 → 1星
}

// ===== 关卡介绍页 =====
function showStationIntro(stationIndex, callback) {
    if (!adventureState) { if (callback) callback(); return; }
    var station = adventureState.stations[stationIndex];
    if (!station) { if (callback) callback(); return; }

    // 关卡类型emoji映射
    var moduleEmojis = { listening: '\uD83C\uDFA7', reading: '\uD83D\uDCD6', writing: '\u270F\uFE0F', speaking: '\uD83C\uDFA4' };
    var moduleIcon = moduleEmojis[adventureState.module] || '\uD83C\uDFF0';

    var questionCount = station.questions ? station.questions.length : 0;

    // 移除已有的（防重复）
    var old = document.getElementById('station-intro-overlay');
    if (old) old.remove();

    var overlay = document.createElement('div');
    overlay.id = 'station-intro-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:linear-gradient(160deg,#FFF9E6 0%,#FFE8CC 30%,#FFD6E8 60%,#E0E7FF 100%);display:flex;align-items:center;justify-content:center;z-index:99999;animation:fadeIn 0.3s ease;overflow:hidden;';

    // 装饰浮动元素
    var decorEmojis = ['\u2728','\u2B50','\uD83C\uDF1F','\uD83C\uDF88','\uD83C\uDF3B','\uD83C\uDF08'];
    var decorHtml = '';
    for (var di = 0; di < 6; di++) {
        var top = 10 + Math.random() * 70;
        var left = 5 + Math.random() * 85;
        var delay = (di * 0.3).toFixed(1);
        var size = 20 + Math.floor(Math.random() * 16);
        decorHtml += '<span style="position:absolute;top:' + top + '%;left:' + left + '%;font-size:' + size + 'px;opacity:0.3;animation:floatBounce 3s ease-in-out ' + delay + 's infinite alternate;">' + decorEmojis[di] + '</span>';
    }

    overlay.innerHTML =
        decorHtml +
        '<style>@keyframes floatBounce{0%{transform:translateY(0) rotate(0deg);}100%{transform:translateY(-12px) rotate(10deg);}}</style>' +
        '<div style="text-align:center;max-width:320px;width:90%;animation:fadeIn 0.35s ease;position:relative;z-index:1;">' +
            '<div style="font-size:80px;line-height:1;margin-bottom:16px;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.1));">' + moduleIcon + '</div>' +
            '<div style="display:inline-block;background:rgba(255,255,255,0.7);border-radius:20px;padding:3px 16px;font-size:14px;color:#ff8c42;font-weight:bold;letter-spacing:3px;margin-bottom:10px;">第 ' + (stationIndex + 1) + ' 关</div>' +
            '<div style="font-size:26px;font-weight:bold;color:#333;margin-bottom:6px;">' + station.name + '</div>' +
            '<div style="font-size:15px;color:#888;margin-bottom:36px;">共 ' + questionCount + ' 道题</div>' +
            '<button id="station-intro-start-btn" style="width:80%;max-width:260px;background:linear-gradient(135deg,#58cc02,#7ed957);color:#fff;border:none;border-radius:16px;padding:16px;font-size:19px;font-weight:bold;box-shadow:0 5px 0 #46a302;cursor:pointer;letter-spacing:1px;">开始挑战 \u2192</button>' +
        '</div>';

    document.body.appendChild(overlay);

    document.getElementById('station-intro-start-btn').onclick = function() {
        overlay.remove();
        if (callback) callback();
    };
}

// ===== 进入站点 =====
var _enterStationLock = false;
function enterStation(stationIndex) {
    if (!adventureState) return;
    if (_enterStationLock) return;  // 防抖：100ms内不重复进入
    _enterStationLock = true;
    setTimeout(function() { _enterStationLock = false; }, 100);

    var station = adventureState.stations[stationIndex];
    if (!station) return;

    adventureState.stationSessionId++;  // 新会话ID，使旧回调失效

    adventureState.currentStation = stationIndex;
    adventureState.coopPhase = 'A';
    adventureState.aResult = null;
    adventureState.retryCount = 0;
    _comboCount = 0; // 重置连续答对计数

    // 初始化自适应队列
    var lastStars = adventureState.stationStarsHistory.length > 0
        ? adventureState.stationStarsHistory[adventureState.stationStarsHistory.length - 1]
        : 2; // 首站默认中等配比
    var ratio = getNextStationDifficulty(lastStars);
    var queue = buildQuestionQueueByDifficulty(station.questions, ratio);

    // 题目顺序保持难度递进（CLT理论：easy→medium→hard），不打乱
    // 选项顺序在 coop-types.js createOptionGrid 里随机打乱
    adventureState.questionQueue = queue.slice(); // 当前待做队列
    adventureState.questionQueue_original = queue.slice(); // 原始完整列表（用于星星计算）
    adventureState.retryCountMap = {};
    adventureState.forceSkipped = [];
    adventureState.scaffoldLevels = {};
    adventureState.stationStars = 0;
    adventureState.questionDetailLog = [];
    adventureState._isRetryRound = false;  // 是否在错题重做轮

    // 初始化每题重试计数
    for (var i = 0; i < queue.length; i++) {
        adventureState.retryCountMap[queue[i]] = 0;
        adventureState.scaffoldLevels[queue[i]] = 0;
    }

    adventureState.stationProgress = {
        questionIndex: queue.length > 0 ? queue[0] : 0,
        totalQuestions: station.questions.length,
        stars: 0,
        aCorrect: 0,
        bCorrect: 0,
        aTotal: 0,
        bTotal: 0,
        firstRoundCorrect: 0,   // 首次作答正确题数（不含错题重做轮）
        firstRoundTotal: 0,     // 首次作答总题数（不含错题重做轮）
        coopRetryCount: 0,
        scaffoldLog: [],
        retriedQuestions: [],   // 错题重做队列：记录曾经答错/forceSkipped的题目索引
        errorCountMap: {}       // 每道题累计错误次数 {questionIndex: count}，用于分析scaffolding有效性
    };

    // 设置全局题目列表（复用app.js的渲染流程）
    window.moduleQuestions = station.questions;
    window.currentQuestionIndex = 0;

    // 切换到游戏页面
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) screens[i].classList.remove('active');
    document.getElementById('game-screen').classList.add('active');

    // 更新站点信息栏
    updateStationHeader(station);

    // 若站点含 warmup 且本次会话尚未做过热身，先进行词义配对热身
    if (station.warmup && !station._warmupDone) {
        station._warmupDone = true;
        var warmupContainer = document.getElementById('question-container');
        if (warmupContainer) warmupContainer.innerHTML = '';
        if (typeof window.renderWarmupMatch === 'function') {
            window.renderWarmupMatch(station, warmupContainer, function() {
                // 热身完成，渲染第一道合作题
                renderCoopQuestion();
            });
        } else {
            renderCoopQuestion();
        }
    } else {
        // 渲染第一道合作题
        renderCoopQuestion();
    }
}

// ===== 更新站点信息栏 =====
function updateStationHeader(station) {
    var indicator = document.getElementById('turn-indicator');
    if (!indicator) return;
    if (!station) return; // 闪退防护
    var sp = adventureState.stationProgress;
    if (!sp) return;
    var q = station.questions[sp.questionIndex];

    // i+1 难度标识（体现 Krashen 可理解输入：循序渐进）
    var difficultyBadge = '';
    var diff = q ? q.difficulty : station.difficulty;
    if (diff === 'easy')   difficultyBadge = '<span style="background:#58cc02;color:#fff;font-size:10px;padding:1px 6px;border-radius:8px;margin-left:6px;">基础</span>';
    if (diff === 'medium') difficultyBadge = '<span style="background:#F5A623;color:#fff;font-size:10px;padding:1px 6px;border-radius:8px;margin-left:6px;">进阶</span>';
    if (diff === 'hard')   difficultyBadge = '<span style="background:#ff4b4b;color:#fff;font-size:10px;padding:1px 6px;border-radius:8px;margin-left:6px;">挑战</span>';

    // 错题阶段进度文案："错题 X/N"；正常阶段："第X/N题"
    var progress;
    if (adventureState._isRetryRound && adventureState._retryRoundTotal) {
        var retryDone = adventureState._retryRoundTotal - adventureState.questionQueue.length;
        progress = '错题 ' + (retryDone + 1) + '/' + adventureState._retryRoundTotal;
    } else {
        progress = '第' + (sp.questionIndex + 1) + '/' + sp.totalQuestions + '题';
    }
    indicator.innerHTML = '<span style="font-weight:bold;">' + station.icon + ' ' + station.name + '</span>' +
        difficultyBadge + ' &nbsp; ' + progress;
    indicator.style.display = '';

    // 隐藏旧的 header
    var headerEl = document.querySelector('#game-screen .header');
    if (headerEl) headerEl.style.display = 'none';
}

// ===== 渲染合作题目 =====
function renderCoopQuestion() {
    if (!adventureState || !adventureState.stationProgress) return;

    var station = adventureState.stations[adventureState.currentStation];

    // 闪退防护：station 未找到（stale callback 或 currentStation 越界）
    if (!station) {
        console.warn('[renderCoopQuestion] station is undefined, currentStation=' + adventureState.currentStation);
        return;
    }

    // 检查是否完成所有题目（队列为空）
    if (adventureState.questionQueue.length === 0) {
        var sp = adventureState.stationProgress;
        // 错题重做机制：检查是否有曾答错的题需要重做
        if (sp && sp.retriedQuestions && sp.retriedQuestions.length > 0) {
            var retryList = sp.retriedQuestions.slice(); // 复制一份
            sp.retriedQuestions = []; // 清空，重做时再错会重新加入

            console.log('[错题重做] 还有 ' + retryList.length + ' 道错题需要重做');

            // Fisher-Yates shuffle：打乱错题顺序，排除学生靠位置记忆答对
            for (var si = retryList.length - 1; si > 0; si--) {
                var sj = Math.floor(Math.random() * (si + 1));
                var tmp = retryList[si];
                retryList[si] = retryList[sj];
                retryList[sj] = tmp;
            }

            // 重新加入队列，重置支架级别和重试计数
            for (var ri = 0; ri < retryList.length; ri++) {
                var rIdx = retryList[ri];
                adventureState.questionQueue.push(rIdx);
                adventureState.scaffoldLevels[rIdx] = 0;  // 支架重置为0（全新一轮）
                adventureState.retryCountMap[rIdx] = 0;    // 重试次数重置
                // 从forceSkipped中移除（给重做的机会）
                var fsPos = adventureState.forceSkipped.indexOf(rIdx);
                if (fsPos !== -1) adventureState.forceSkipped.splice(fsPos, 1);
            }

            // 标记进入重做模式，记录错题总数（用于进度条文案）
            adventureState._isRetryRound = true;
            adventureState._retryRoundTotal = retryList.length;
            _comboCount = 0; // 重做轮重置连续答对计数

            // 显示提示："还有X道再练一次就通关啦！"
            showRetryRoundToast(retryList.length, function() {
                renderCoopQuestion();
            });
            return;
        }

        console.log('[queue empty] completeStation triggered, sessionId=' + adventureState.stationSessionId);
        completeStation();
        return;
    }

    // 从队列取出当前题目索引（队头）
    var currentQIndex = adventureState.questionQueue[0];
    adventureState.stationProgress.questionIndex = currentQIndex;

    var q = station.questions[currentQIndex];
    // 闪退防护：q 未找到（队列索引越界）
    if (!q) {
        console.warn('[renderCoopQuestion] q is undefined, currentQIndex=' + currentQIndex);
        adventureState.questionQueue.shift();
        renderCoopQuestion();
        return;
    }
    var container = document.getElementById('question-container');
    if (!container) return;
    container.innerHTML = '';
    container.style.background = '';

    // 重置合作状态
    adventureState.coopPhase = 'A';
    adventureState.aResult = null;
    adventureState.retryCount = 0;

    // 更新站点信息栏
    updateStationHeader(station);

    // 记录开始时间
    window.questionStartTime = Date.now();
    window.wrongCount = 0;

    // 先调用 coop-types.js 的渲染器（内部会 innerHTML=''，必须先跑）
    if (typeof window.renderCoopType === 'function') {
        window.renderCoopType(q, container, adventureState);
    } else {
        container.innerHTML = '<div style="text-align:center;padding:40px;color:#999;">合作题型渲染器未加载</div>';
    }

    // 渲染完题目后，再叠加支架提示（顺序不能反，否则会被 renderCoopType 清掉）
    // 基线：Level 1 同伴协商 banner 从一开始就显示（ZPD 默认 affordance）
    // 错误升级映射：error1→L2, error2→L3, error3→L4, error4→force skip
    if (typeof showScaffoldForLevel === 'function') {
        var lvl = adventureState.scaffoldLevels[currentQIndex] || 1;
        showScaffoldForLevel(currentQIndex, lvl, q, container);
    }
}

// ===== A步骤完成 =====
function onStepAComplete(selectedValue) {
    if (!adventureState) return;
    adventureState.aResult = selectedValue;
    adventureState.coopPhase = 'B';

    var sp = adventureState.stationProgress;
    var station = adventureState.stations[adventureState.currentStation];
    if (!station) return; // 闪退防护：stale callback
    var q = station.questions[sp.questionIndex];
    if (!q) return; // 闪退防护：索引越界

    // 记录A的答题情况
    sp.aTotal++;
    // 判断A是否正确：
    // 1. 口语题 speak_done/read_done → 正确
    // 2. 有 stepA.correct 的选择题 → 比对答案
    // 3. 没有 stepA.correct 的题型（拼词/排序/拼句等）→ 题型内部已验证，到这里就是对的
    if (selectedValue === 'speak_done' || selectedValue === 'read_done') {
        sp.aCorrect++;
    } else if (q.stepA && q.stepA.correct) {
        if (selectedValue === q.stepA.correct) sp.aCorrect++;
    } else {
        // 无 correct 字段的题型（spell_word/sentence_sort/build_sentence/relay_fill等）
        // 题型渲染器内部已验证正确才调用 onStepAComplete，所以直接算对
        sp.aCorrect++;
    }

    // 渲染B步骤
    var container = document.getElementById('question-container');
    if (typeof window.renderCoopStepB === 'function') {
        window.renderCoopStepB(q, container, adventureState);
    }
}

// ===== B步骤完成 =====
function onStepBComplete(selectedValue) {
    if (!adventureState) return;
    adventureState.coopPhase = 'judge';

    var sp = adventureState.stationProgress;
    var station = adventureState.stations[adventureState.currentStation];
    if (!station) return; // 闪退防护：stale callback
    var q = station.questions[sp.questionIndex];
    if (!q) return; // 闪退防护：索引越界

    sp.bTotal++;

    // 综合判断：A和B都答对才算整体正确
    var aCorrect = judgeStepA(q, adventureState.aResult);
    var bCorrect = judgeStepB(q, adventureState.aResult, selectedValue);
    var overallCorrect = aCorrect && bCorrect;

    if (bCorrect) sp.bCorrect++;

    // 首次作答统计（不含错题重做轮，用于星星计算）
    if (!adventureState._isRetryRound) {
        sp.firstRoundTotal++;
        if (overallCorrect) sp.firstRoundCorrect++;
    }

    if (overallCorrect) {
        // 答对！
        sp.stars++;
        var currentQIdx = adventureState.questionQueue[0];
        sp.scaffoldLog.push({ qIndex: currentQIdx, scaffoldLevel: adventureState.scaffoldLevels[currentQIdx] || 0, correct: true });

        // 记录详细数据（任务四）
        recordQuestionDetail(q, currentQIdx, true);

        // 从队列移除当前题（答对了）
        adventureState.questionQueue.shift();

        // 切到下一题 → 轮换 A/B 角色（全模块生效，研究效度要求）
        if (adventureState.coopRoles && adventureState.coopRoles.length === 2) {
            adventureState.coopRoles.reverse();
        }

        // 播放音效和反馈
        if (window.SoundSystem) SoundSystem.playCorrect();
        if (typeof playSuccessSound === 'function') playSuccessSound();
        showCoopFeedback(true, function() {
            renderCoopQuestion();
        });
    } else {
        // 答错 → 合作重做机制
        handleCoopRetry(q);
    }
}

// ===== 判断逻辑 =====

// B步骤"自动通过"的特殊值（A直接答对，B不需要操作）
var AUTO_PASS_VALUES = { 'auto_pass': true, 'read_done': true, 'speak_done': true, 'dialogue_done': true };

function judgeStepA(q, aResult) {
    // listen_judge 题型：用 isMatch + aResult 判断
    if (q.type === 'coop_listen_judge') {
        if (aResult === 'correct_match' || aResult === 'correct_no') return true;
        if (aResult === 'wrong_yes' || aResult === 'wrong_no') return false;
        return true;
    }
    if (!q.stepA || !q.stepA.correct) return true; // 其他题型无正确答案要求
    return aResult === q.stepA.correct;
}

function judgeStepB(q, aResult, bResult) {
    // auto_pass 及朗读/口语完成类型：B直接算对
    if (AUTO_PASS_VALUES[bResult]) return true;

    // 排序/配对题：明确区分对错
    if (bResult === 'sort_correct' || bResult === 'match_done') return true;
    if (bResult === 'sort_wrong') return false;

    // 使用 'correct'/'wrong' 作为判分结果的题型
    if (bResult === 'correct') return true;
    if (bResult === 'wrong') return false;

    // 口语自评：学生认为没说好 → 触发支架
    if (bResult === 'speak_bad') return false;

    var stepB = q.stepB;
    if (!stepB) return true;

    // optionsMap 类型：B的正确答案取决于A的选择
    if (stepB.optionsMap && aResult) {
        var bConfig = stepB.optionsMap[aResult];
        if (bConfig && bConfig.correct) {
            return bResult === bConfig.correct;
        }
    }

    // 直接 correct 类型
    if (stepB.correct) {
        return bResult === stepB.correct;
    }

    return true;
}

// ===== 合作重做机制（自适应队列版）=====
function handleCoopRetry(q) {
    var sp = adventureState.stationProgress;
    adventureState.retryCount++;
    sp.coopRetryCount++;

    var currentQIdx = adventureState.questionQueue[0];

    // 更新重试计数和支架级别
    adventureState.retryCountMap[currentQIdx] = (adventureState.retryCountMap[currentQIdx] || 0) + 1;
    var currentRetry = adventureState.retryCountMap[currentQIdx];

    // 记录每题累计错误次数（用于分析 scaffolding 有效性）
    if (sp.errorCountMap) {
        sp.errorCountMap[currentQIdx] = (sp.errorCountMap[currentQIdx] || 0) + 1;
    }

    // 错题重做机制：记录曾答错的题（去重），站内全部做完后重做
    if (sp.retriedQuestions && sp.retriedQuestions.indexOf(currentQIdx) === -1) {
        sp.retriedQuestions.push(currentQIdx);
    }

    if (window.SoundSystem) SoundSystem.playWrong();
    if (typeof playWrongSound === 'function') playWrongSound();

    if (currentRetry >= 4) {
        // 重试4次仍错 → 强制跳过，不再入队
        // 错误链：error1→L2, error2→L3, error3→L4, error4→force skip
        sp.scaffoldLog.push({ qIndex: currentQIdx, scaffoldLevel: adventureState.scaffoldLevels[currentQIdx] || 4, correct: false });
        adventureState.scaffoldLevels[currentQIdx] = 4; // 最高级支架
        if (adventureState.forceSkipped.indexOf(currentQIdx) === -1) {
            adventureState.forceSkipped.push(currentQIdx);
        }

        // 记录详细数据（任务四）
        recordQuestionDetail(q, currentQIdx, false);

        // 从队列移除（强制跳过）
        adventureState.questionQueue.shift();

        // 切到下一题 → 轮换 A/B 角色
        if (adventureState.coopRoles && adventureState.coopRoles.length === 2) {
            adventureState.coopRoles.reverse();
        }

        showCoopFeedback(false, function() {
            renderCoopQuestion();
        });
    } else {
        // 未超限 → 升级支架
        // 映射：error1→L2, error2→L3, error3→L4
        // 基线 Level 1（同伴协商）在 renderCoopQuestion 中始终显示
        var newLevel = Math.min(currentRetry + 1, 4);
        adventureState.scaffoldLevels[currentQIdx] = newLevel;

        sp.scaffoldLog.push({ qIndex: currentQIdx, scaffoldLevel: newLevel, correct: false });

        // 题目留在队头，立刻用升级后的支架重做同一道题
        // （不移到队尾，否则renderCoopQuestion会取到下一道新题，导致支架永远停在Level 1）

        // 第1次错 → "一起商量重来吧！"；后续错 → 直接重渲染（支架升级）
        showCoopRetryPrompt(function() {
            adventureState.coopPhase = 'A';
            adventureState.aResult = null;
            renderCoopQuestion();
        });
    }
}

// ===== 任务四：记录每题详细数据 =====
function recordQuestionDetail(q, qIndex, wasCorrect) {
    if (!adventureState) return;
    var timeSpent = window.questionStartTime ? (Date.now() - window.questionStartTime) : 0;

    // Bug #2 修复：累积合作时长到 stationProgress，供 buildPairRecord 计算平均值
    if (window.questionStartTime && adventureState.stationProgress) {
        adventureState.stationProgress.totalCollabMs =
            (adventureState.stationProgress.totalCollabMs || 0) + timeSpent;
        adventureState.stationProgress.questionCount =
            (adventureState.stationProgress.questionCount || 0) + 1;
    }

    var detail = {
        questionType: q.type,
        difficulty: q.difficulty || 'unknown',
        retryCount: adventureState.retryCountMap[qIndex] || 0,
        finalScaffoldLevel: adventureState.scaffoldLevels[qIndex] || 0,
        wasForceSkipped: adventureState.forceSkipped.indexOf(qIndex) !== -1,
        wasCorrect: wasCorrect,
        timeSpent: timeSpent,
        questionIndex: qIndex,
        isRetry: !!adventureState._isRetryRound  // 标记是否为错题重做轮
    };
    // 追加角色信息（个体追踪 P0 需求）
    if (adventureState.coopRoles) {
        var roles = adventureState.coopRoles;
        detail.roleAStudentId = (window.players && window.players[roles[0]]) ? window.players[roles[0]].name : 'A';
        detail.roleBStudentId = (window.players && window.players[roles[1]]) ? window.players[roles[1]].name : 'B';
    }
    adventureState.questionDetailLog.push(detail);

    // Bug #1 修复：buildBehaviorRecord 现在返回 [recA, recB] 数组，分别入队
    // 检测是否为最后一题：队列只剩1题且答对（答对后会shift掉，触发completeStation）
    var isLastQuestion = false;
    var finalStars = null;
    if (wasCorrect && adventureState.questionQueue && adventureState.questionQueue.length === 1) {
        // 队列只剩当前这道，答对后将为空→站点完成
        // 还需检查没有待重做的错题
        var _sp = adventureState.stationProgress;
        var hasRetries = _sp && _sp.retriedQuestions && _sp.retriedQuestions.length > 0;
        if (!hasRetries) {
            isLastQuestion = true;
            finalStars = calcStationStars();
        }
    }

    if (typeof buildBehaviorRecord === 'function') {
        var recs = buildBehaviorRecord(q, qIndex, wasCorrect, adventureState, timeSpent, isLastQuestion, finalStars);
        if (recs && recs.length) {
            for (var ri = 0; ri < recs.length; ri++) {
                enqueueBehaviorLog(recs[ri]);
            }
        }
    }
}

// ===== 合作反馈UI =====
function showCoopFeedback(isCorrect, callback) {
    var container = document.getElementById('question-container');

    // 根据场景选择反馈评语
    var feedbackMsg = '';

    // 口语题型：优先用SOE得分决定评语，避免0分却说"完美"
    var sp = adventureState && adventureState.stationProgress;
    var station = adventureState && adventureState.stations && adventureState.stations[adventureState.currentStation];
    var currentQ = sp && station ? station.questions[sp.questionIndex] : null;
    var isOralType = currentQ && (
        currentQ.type === 'coop_read_relay' ||
        currentQ.type === 'coop_picture_speak' ||
        currentQ.type === 'coop_dialogue'
    );
    if (isOralType && isCorrect && window._pendingSoeScores) {
        // 取A、B中较低分数作为评语依据（鼓励双方都进步）
        var sA = window._pendingSoeScores.A && typeof window._pendingSoeScores.A.soeScore === 'number' ? window._pendingSoeScores.A.soeScore : null;
        var sB = window._pendingSoeScores.B && typeof window._pendingSoeScores.B.soeScore === 'number' ? window._pendingSoeScores.B.soeScore : null;
        var minScore = null;
        if (sA !== null && sB !== null) { minScore = sA < sB ? sA : sB; }
        else if (sA !== null) { minScore = sA; }
        else if (sB !== null) { minScore = sB; }

        if (minScore !== null) {
            if (minScore >= 80) {
                feedbackMsg = '发音很棒！';
            } else if (minScore >= 60) {
                feedbackMsg = '读得不错，继续加油！';
            } else if (minScore >= 40) {
                feedbackMsg = '有进步，多练几遍会更好！';
            } else {
                feedbackMsg = '没关系，跟着音频多听多读！';
            }
            _comboCount++;
        }
    }
    // 消费完 SOE 分数后清空，避免下一题误用（必须在读取之后清空，不能在 buildBehaviorRecord 中清空）
    window._pendingSoeScores = { A: null, B: null };

    if (!feedbackMsg && isCorrect) {
        _comboCount++;
        // 判断是否在错题重做轮
        var isRetryRound = adventureState && adventureState._isRetryRound;
        if (isRetryRound) {
            feedbackMsg = getRandomFeedback('correct_retry_mastered');
        } else if (_comboCount >= 2) {
            feedbackMsg = getRandomFeedback('correct_combo');
        } else {
            feedbackMsg = getRandomFeedback('correct_normal');
        }
    } else if (!feedbackMsg) {
        _comboCount = 0;
        // 判断当前题重试次数
        var currentQIdx = adventureState && adventureState.questionQueue ? adventureState.questionQueue[0] : 0;
        var retryCount = adventureState && adventureState.retryCountMap ? (adventureState.retryCountMap[currentQIdx] || 0) : 0;
        if (retryCount >= 4) {
            // 强制跳过
            feedbackMsg = getRandomFeedback('wrong_skip');
        } else if (retryCount > 1) {
            feedbackMsg = getRandomFeedback('wrong_repeat');
        } else {
            feedbackMsg = getRandomFeedback('wrong_first');
        }
    }

    if (isCorrect) {
        // 答对：底部轻量toast，1.5秒后自动消失并进入下一题
        var toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;bottom:40px;left:50%;transform:translateX(-50%);' +
            'background:linear-gradient(135deg,#58cc02,#46a302);color:white;' +
            'padding:16px 32px;border-radius:16px;font-size:18px;font-weight:bold;' +
            'box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:99999;' +
            'opacity:0;transition:opacity 0.3s ease,transform 0.3s ease;' +
            'transform:translateX(-50%) translateY(20px);';
        toast.textContent = feedbackMsg;
        document.body.appendChild(toast);

        // 淡入 + 上滑
        setTimeout(function() {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);

        // 1.5秒后淡出，然后移除并进入下一题
        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(function() {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
                if (callback) callback();
            }, 300);
        }, 1500);
    } else {
        // 答错：保持全屏弹窗，需要点"继续"
        var overlay = document.createElement('div');
        overlay.className = 'coop-feedback-overlay bg-wrong';
        overlay.innerHTML = '<div class="coop-feedback-card fail">' +
            '<div style="font-size:48px;margin-bottom:12px;">😅</div>' +
            '<div style="font-size:20px;font-weight:bold;color:#ff4b4b;">' +
            feedbackMsg + '</div>' +
            '<button class="coop-continue-btn" id="coop-continue-btn">下一题</button>' +
            '</div>';
        document.body.appendChild(overlay);

        document.getElementById('coop-continue-btn').onclick = function() {
            overlay.remove();
            if (callback) callback();
        };
    }
}

function showCoopRetryPrompt(callback) {
    var container = document.getElementById('question-container');

    // 支架提示（体现 ZPD 理论：在出错后提供刚好够用的帮助）
    var sp = adventureState && adventureState.stationProgress;
    var station = adventureState && adventureState.stations[adventureState.currentStation];
    var q = sp && station ? station.questions[sp.questionIndex] : null;

    var hintHtml = '';
    if (q) {
        if (q.type === 'coop_listen_judge' && q.chinese) {
            hintHtml = '<div style="background:#fff8e1;border:1px solid #ffe082;border-radius:10px;padding:8px 14px;margin:10px 0;font-size:13px;color:#795548;">' +
                '💡 提示：音频说的是 <strong>' + (q.audio || '') + '</strong>（' + q.chinese + '）</div>';
        } else if (q.stepB && q.stepB.hint) {
            hintHtml = '<div style="background:#fff8e1;border:1px solid #ffe082;border-radius:10px;padding:8px 14px;margin:10px 0;font-size:13px;color:#795548;">' +
                '💡 ' + q.stepB.hint + '</div>';
        }
    }

    // 根据重试次数选择不同鼓励语
    var currentQIdx = adventureState && adventureState.questionQueue ? adventureState.questionQueue[0] : 0;
    var retryCount = adventureState && adventureState.retryCountMap ? (adventureState.retryCountMap[currentQIdx] || 0) : 0;
    var retryMsg = retryCount > 1 ? getRandomFeedback('wrong_repeat') : getRandomFeedback('wrong_first');

    var overlay = document.createElement('div');
    overlay.className = 'coop-feedback-overlay bg-wrong';
    overlay.innerHTML = '<div class="coop-feedback-card retry">' +
        '<div style="font-size:40px;margin-bottom:8px;">🤝</div>' +
        '<div style="font-size:17px;font-weight:bold;color:#F5A623;">' + retryMsg + '</div>' +
        hintHtml +
        '<button class="coop-continue-btn" id="coop-retry-btn">再来一次</button>' +
        '</div>';
    document.body.appendChild(overlay);

    document.getElementById('coop-retry-btn').onclick = function() {
        overlay.remove();
        if (callback) callback();
    };
}

// ===== 错题重做提示 =====
function showRetryRoundToast(count, callback) {
    var container = document.getElementById('question-container');
    if (!container) { if (callback) callback(); return; }

    container.innerHTML = '';
    var overlay = document.createElement('div');
    overlay.className = 'coop-feedback-overlay bg-retry';
    overlay.innerHTML = '<div class="coop-feedback-card retry">' +
        '<div style="font-size:48px;margin-bottom:12px;">💪</div>' +
        '<div style="font-size:20px;font-weight:bold;color:#F5A623;">还有 ' + count + ' 道再练一次就通关啦！</div>' +
        '<div style="font-size:14px;color:#888;margin-top:6px;">之前做错的题，这次直接答对就过关</div>' +
        '<button class="coop-continue-btn" id="retry-round-btn">开始！</button>' +
        '</div>';
    document.body.appendChild(overlay);

    document.getElementById('retry-round-btn').onclick = function() {
        overlay.remove();
        if (callback) callback();
    };
}

// ===== 站点完成 =====
function completeStation() {
    if (!adventureState) return;
    var station = adventureState.stations[adventureState.currentStation];
    var sp = adventureState.stationProgress;

    // 计算本站星星数
    var stars = calcStationStars();
    adventureState.stationStars = stars;
    adventureState.stationStarsHistory.push(stars);
    sp.stars = stars;

    // 计算正确率
    var totalAttempts = Math.max(sp.aTotal + sp.bTotal, 1);
    var accuracy = Math.round(((sp.aCorrect + sp.bCorrect) / totalAttempts) * 100);

    // 存储本站结果（保留最佳成绩：星星取高，正确率取高）
    if (!adventureState.stationResults) adventureState.stationResults = {};
    var prev = adventureState.stationResults[station.id];
    if (!prev || stars > prev.stars || (stars === prev.stars && accuracy > prev.accuracy)) {
        adventureState.stationResults[station.id] = { stars: stars, accuracy: accuracy };
    }

    // 记录完成
    if (adventureState.completedStations.indexOf(station.id) === -1) {
        adventureState.completedStations.push(station.id);
    }

    // 同步数据到云端（含详细日志）
    sp.questionDetailLog = adventureState.questionDetailLog;
    syncCoopProgress(sp);

    // 上报到研究数据表（data-reporter.js）
    if (typeof flushBehaviorQueue === 'function') {
        flushBehaviorQueue();
    }
    if (typeof buildStudentUpdate === 'function' && typeof enqueueStudentUpdate === 'function') {
        var roles = adventureState.coopRoles || [0, 1];
        var idA = (window.players && window.players[roles[0]]) ? window.players[roles[0]].name.match(/^(\d+)/) : null;
        var idB = (window.players && window.players[roles[1]]) ? window.players[roles[1]].name.match(/^(\d+)/) : null;
        var sidA = idA ? idA[1] : 'A';
        var sidB = idB ? idB[1] : 'B';
        enqueueStudentUpdate(buildStudentUpdate(sidA, adventureState));
        enqueueStudentUpdate(buildStudentUpdate(sidB, adventureState));
        flushStudentQueue();
    }
    // 每关完成时也发pair数据（不等回到地图）
    if (typeof buildPairRecord === 'function' && typeof enqueuePairLog === 'function') {
        var pairRec = buildPairRecord(adventureState, sp);
        if (pairRec) { enqueuePairLog(pairRec); flushPairQueue(); }
    }

    // 显示站点结算画面
    // 注意：解锁下一站的逻辑移到结算页按钮回调中（支持"再试一次"选项）
    showStationCompleteOverlay(station, sp, stars);
}

// ===== 任务二：站点过渡动画（结算画面）=====
function showStationCompleteOverlay(station, sp, stars) {
    // 移除已有的遮罩（防重复）
    var old = document.getElementById('station-complete-overlay');
    if (old) old.remove();

    // 鼓励文案（从评语库随机选取）
    var encourageMsg = '';
    // 检查是否有错题且全部在重做中掌握了
    var hadRetries = sp && sp.retriedQuestions && sp.retriedQuestions.length === 0 &&
                     adventureState._retryRoundTotal && adventureState._retryRoundTotal > 0;
    if (hadRetries && stars >= 2) {
        encourageMsg = getRandomFeedback('complete_retry_mastered');
    } else if (stars === 3) {
        encourageMsg = getRandomFeedback('complete_3star');
    } else if (stars === 2) {
        encourageMsg = getRandomFeedback('complete_2star');
    } else {
        encourageMsg = getRandomFeedback('complete_1star');
    }

    // 正确率
    var totalA = Math.max(sp.aTotal, 1);
    var totalB = Math.max(sp.bTotal, 1);
    var accPct = Math.round(((sp.aCorrect + sp.bCorrect) / (totalA + totalB)) * 100);

    // 跳过题目提示
    var skipMsg = '';
    if (adventureState.forceSkipped.length > 0) {
        skipMsg = '<div style="color:#F5A623;font-size:13px;margin-top:6px;">' +
            adventureState.forceSkipped.length + ' 道题需要复习，下次加强！</div>';
    }

    // 是否有下一未完成站点
    var hasNextStation = adventureState.currentStation < adventureState.stations.length - 1;

    // 按钮区
    var actionButtons = '';
    if (hasNextStation) {
        // 非最后站（不管几星）：只有继续冒险 + 查看地图，不给"再试一次"
        actionButtons =
            '<button id="next-station-btn" style="width:100%;margin-top:14px;background:#58cc02;color:#fff;border:none;border-radius:14px;padding:14px;font-size:17px;font-weight:bold;box-shadow:0 4px 0 #46a302;">继续冒险 →</button>' +
            '<button id="view-map-btn" style="width:100%;margin-top:8px;background:transparent;color:#888;border:none;padding:10px;font-size:13px;cursor:pointer;">查看地图</button>';
    } else if (stars <= 1) {
        // 最后一站 1星：再试一次 + 查看地图
        actionButtons =
            '<div style="display:flex;gap:10px;margin-top:14px;">' +
                '<button id="retry-station-btn" style="flex:1;background:#F5A623;color:#fff;border:none;border-radius:14px;padding:13px 8px;font-size:15px;font-weight:bold;">再试一次</button>' +
                '<button id="view-map-btn" style="flex:1;background:#58cc02;color:#fff;border:none;border-radius:14px;padding:13px 8px;font-size:15px;font-weight:bold;">查看地图</button>' +
            '</div>';
    } else {
        // 最后一站 2~3星：全部完成 + 查看地图
        actionButtons =
            '<div style="font-size:15px;color:#ff6b35;font-weight:bold;margin:10px 0 4px;letter-spacing:1px;">🎊 全部完成！</div>' +
            '<button id="view-map-btn" style="width:100%;margin-top:8px;background:#58cc02;color:#fff;border:none;border-radius:14px;padding:14px;font-size:17px;font-weight:bold;box-shadow:0 4px 0 #46a302;">查看地图</button>';
    }

    // 三颗星星逐个淡入（CSS animation delay）
    var starsHtml = '';
    for (var si = 0; si < 3; si++) {
        var filled = si < stars ? '⭐' : '☆';
        var delay = (si * 0.2 + 0.1).toFixed(1);
        starsHtml += '<span style="display:inline-block;font-size:36px;' +
            'animation:fadeInStar 0.4s ease both;animation-delay:' + delay + 's;">' + filled + '</span>';
    }

    var overlay = document.createElement('div');
    overlay.id = 'station-complete-overlay';
    // 注入关键帧（每次只注入一次，防重复）
    if (!document.getElementById('station-complete-keyframes')) {
        var styleEl = document.createElement('style');
        styleEl.id = 'station-complete-keyframes';
        styleEl.textContent =
            '@keyframes bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-15px);}}' +
            '@keyframes fadeIn{from{opacity:0;transform:scale(0.5);}to{opacity:1;transform:scale(1);}}' +
            '@keyframes fadeInStar{from{opacity:0;transform:scale(0.3);}to{opacity:1;transform:scale(1);}}';
        document.head.appendChild(styleEl);
    }
    overlay.innerHTML =
        '<div class="station-complete-card" style="background:transparent;border-radius:24px;padding:28px 24px;text-align:center;max-width:320px;width:90%;">' +
            '<div style="animation:bounce 0.8s infinite;display:inline-block;font-size:80px;line-height:1;">' +
                (stars === 3 ? '🏆' : stars === 2 ? '🥈' : '🥉') +
            '</div>' +
            '<div style="margin:10px 0 4px;">' + starsHtml + '</div>' +
            '<div style="font-size:20px;font-weight:bold;color:#333;margin:8px 0 4px;">' +
                station.name + ' 完成！' +
            '</div>' +
            '<div style="font-size:28px;font-weight:bold;color:#ff6b35;margin:2px 0 6px;">' +
                accPct + '<span style="font-size:16px;color:#888;font-weight:normal;">% 正确</span>' +
            '</div>' +
            '<div style="font-size:14px;color:#666;margin-bottom:4px;">' + encourageMsg + '</div>' +
            skipMsg +
            actionButtons +
        '</div>';

    document.body.appendChild(overlay);

    // "继续冒险" → 解锁下一站，直接进入
    var nextBtn = document.getElementById('next-station-btn');
    if (nextBtn) {
        nextBtn.onclick = function() {
            overlay.remove();
            if (sp.questionDetailLog) {
                sp.questionDetailLog.push({ event: 'station_unlock_choice', choice: 'proceed', stars: stars });
            }
            if (adventureState.currentStation < adventureState.stations.length - 1) {
                adventureState.currentStation++;
            }
            saveAdventureProgress();
            var nextIdx = adventureState.currentStation;
            showStationIntro(nextIdx, function() { enterStation(nextIdx); });
        };
    }

    // "查看地图" → 回到冒险地图
    var mapBtn = document.getElementById('view-map-btn');
    if (mapBtn) {
        mapBtn.onclick = function() {
            overlay.remove();
            if (sp.questionDetailLog) {
                sp.questionDetailLog.push({ event: 'station_unlock_choice', choice: 'map', stars: stars });
            }
            if (adventureState.currentStation < adventureState.stations.length - 1) {
                adventureState.currentStation++;
            }
            saveAdventureProgress();
            // 用户主动选择"查看地图"时，预先标记模块完成弹窗已显示过，
            // 避免 backToAdventureMap() 检测到全部完成后再次弹出模块完成页，
            // 让用户能直接看到地图上的星星和进度。
            var moduleCompleteKey = 'moduleComplete_' + (adventureState.module || 'default');
            var allDone = adventureState.completedStations.length >= adventureState.stations.length;
            if (allDone) {
                localStorage.setItem(moduleCompleteKey, '1');
            }
            backToAdventureMap();
        };
    }

    // "再试一次" → 重做本站（重新初始化队列）
    var retryBtn = document.getElementById('retry-station-btn');
    if (retryBtn) {
        retryBtn.onclick = function() {
            overlay.remove();
            if (sp.questionDetailLog) {
                sp.questionDetailLog.push({ event: 'station_unlock_choice', choice: 'retry', stars: stars });
            }
            var stationIndex = adventureState.currentStation;
            showStationIntro(stationIndex, function() { enterStation(stationIndex); });
        };
    }
}

function showStationComplete(station, sp) {
    var container = document.getElementById('question-container');
    var acc = sp.aTotal > 0 ? Math.round(((sp.aCorrect + sp.bCorrect) / (sp.aTotal + sp.bTotal)) * 100) : 0;

    var nameA = (window.players && window.players[0]) ? window.players[0].name.replace(/^\d+\.\s*/, '') : 'A';
    var nameB = (window.players && window.players[1]) ? window.players[1].name.replace(/^\d+\.\s*/, '') : 'B';

    // 生成错题回顾列表 HTML
    var wrongReviewHtml = '';
    if (sp.coopRetryCount > 0 && sp.scaffoldLog && sp.scaffoldLog.length > 0) {
        // 按题目分组统计
        var qMap = {};
        for (var i = 0; i < sp.scaffoldLog.length; i++) {
            var log = sp.scaffoldLog[i];
            var key = log.qIndex;
            if (!qMap[key]) qMap[key] = { qIndex: log.qIndex, scaffoldLevel: log.scaffoldLevel, retries: 0, lastCorrect: false };
            qMap[key].retries++;
            qMap[key].lastCorrect = log.correct;
        }
        var wrongItems = '';
        var keys = Object.keys(qMap);
        for (var j = 0; j < keys.length; j++) {
            var item = qMap[keys[j]];
            var levelLabel = item.scaffoldLevel ? ('【' + item.scaffoldLevel + '】') : '';
            var resultIcon = item.lastCorrect ? '✅' : '❌';
            wrongItems += '<div style="padding:6px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#555;">' +
                resultIcon + ' 第' + (item.qIndex + 1) + '题 ' + levelLabel + ' — 重做了' + item.retries + '次</div>';
        }
        wrongReviewHtml = '<div id="wrong-review" style="display:none;margin-top:12px;background:#fff8f0;border:1px solid #F5A623;border-radius:8px;padding:12px;text-align:left;">' +
            '<div style="font-weight:bold;color:#F5A623;margin-bottom:8px;">📋 错题回顾</div>' +
            wrongItems +
            '</div>';
    }

    // 合作重做区域
    var coopRetryHtml;
    if (sp.coopRetryCount === 0) {
        coopRetryHtml = '<div style="text-align:center;">' +
            '<div style="font-size:24px;font-weight:bold;color:#58cc02;">0</div>' +
            '<div style="font-size:12px;color:#999;">合作重做</div>' +
            '</div>';
    } else {
        coopRetryHtml = '<div style="text-align:center;">' +
            '<div onclick="toggleWrongReview()" style="cursor:pointer;font-size:24px;font-weight:bold;color:#F5A623;user-select:none;">' + sp.coopRetryCount + ' ▼</div>' +
            '<div style="font-size:12px;color:#999;">合作重做</div>' +
            wrongReviewHtml +
            '</div>';
    }

    container.innerHTML = '<div style="text-align:center;padding:30px 20px;">' +
        '<div style="font-size:48px;margin-bottom:16px;">🏆</div>' +
        '<div style="font-size:22px;font-weight:bold;color:#333;margin-bottom:8px;">' + station.name + ' 完成！</div>' +
        '<div style="font-size:16px;color:#666;margin-bottom:20px;">获得 ' + sp.stars + ' ⭐</div>' +
        '<div style="display:flex;justify-content:center;gap:20px;margin-bottom:24px;">' +
            '<div style="text-align:center;"><div style="font-size:24px;font-weight:bold;color:#4A90D9;">' + Math.round(sp.aCorrect / Math.max(sp.aTotal, 1) * 100) + '%</div><div style="font-size:12px;color:#999;">' + nameA + '正确率</div></div>' +
            '<div style="text-align:center;"><div style="font-size:24px;font-weight:bold;color:#F5A623;">' + Math.round(sp.bCorrect / Math.max(sp.bTotal, 1) * 100) + '%</div><div style="font-size:12px;color:#999;">' + nameB + '正确率</div></div>' +
            coopRetryHtml +
        '</div>' +
        '<button class="coop-continue-btn" onclick="backToAdventureMap()" style="width:80%;">回到冒险地图</button>' +
        '</div>';

    // 隐藏答题信息栏
    var indicator = document.getElementById('turn-indicator');
    if (indicator) indicator.style.display = 'none';
}

function toggleWrongReview() {
    var el = document.getElementById('wrong-review');
    if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

// ===== 返回冒险地图 =====
function backToAdventureMap() {
    if (!adventureState) return;
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) screens[i].classList.remove('active');
    document.getElementById('adventure-map-screen').classList.add('active');
    renderAdventureMap();

    // 节课结束：上报对子合作记录 + flush 剩余队列
    if (typeof buildPairRecord === 'function' && typeof enqueuePairLog === 'function') {
        var pairRec = buildPairRecord(adventureState, adventureState.stationProgress);
        if (pairRec) {
            enqueuePairLog(pairRec);
            flushPairQueue();
        }
    }

    // 检查是否所有站点都完成（只弹一次，持久化到localStorage）
    var allDone = adventureState.completedStations.length >= adventureState.stations.length;
    var moduleCompleteKey = 'moduleComplete_' + (adventureState.module || 'default');
    if (allDone && !localStorage.getItem(moduleCompleteKey)) {
        localStorage.setItem(moduleCompleteKey, '1');
        setTimeout(showModuleComplete, 500);
    }
}

// ===== 模块全部完成 =====
function showModuleComplete() {
    var moduleNames = { listening: '听力', reading: '阅读', writing: '写作', speaking: '口语' };
    var name = moduleNames[adventureState.module] || '';

    // 用 overlay 弹窗，不替换地图内容，用户可关闭后继续查看地图
    var overlay = document.createElement('div');
    overlay.className = 'station-intro-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, #FFF8E1 0%, #FFE082 100%);display:flex;align-items:center;justify-content:center;z-index:99999;';
    overlay.innerHTML = '<div style="background:transparent;border-radius:20px;padding:32px 24px;max-width:340px;width:85%;text-align:center;">' +
        '<div style="font-size:64px;margin-bottom:16px;">🎊</div>' +
        '<div style="font-size:24px;font-weight:bold;color:#58cc02;margin-bottom:8px;">' + name + '冒险全部完成！</div>' +
        '<div style="font-size:16px;color:#666;margin-bottom:24px;">' + getRandomFeedback('module_complete') + '</div>' +
        '<button class="coop-continue-btn" id="module-complete-select-btn" style="width:80%;margin-bottom:10px;">选其他模块</button>' +
        '<button class="coop-continue-btn" id="module-complete-map-btn" style="width:80%;background:transparent;color:#888;border:1px solid #ddd;font-weight:normal;">留在地图</button>' +
        '</div>';
    document.body.appendChild(overlay);

    document.getElementById('module-complete-select-btn').onclick = function() {
        overlay.remove();
        backToModuleSelect();
    };
    document.getElementById('module-complete-map-btn').onclick = function() {
        overlay.remove();
    };
}

// ===== 返回模块选择 =====
function backToModuleSelect() {
    adventureState = null;
    // 退出冒险模式，恢复教师同步（如有需要）
    if (typeof studentSelfSelectMode !== 'undefined') {
        studentSelfSelectMode = false;
    }
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) screens[i].classList.remove('active');
    document.getElementById('module-screen').classList.add('active');
    document.getElementById('module-screen').style.display = '';
    updateProjectLockState();
}

// ===== Project 解锁状态管理 =====
function checkAllModulesComplete() {
    var required = ['listening', 'reading', 'writing', 'speaking'];
    for (var i = 0; i < required.length; i++) {
        if (!localStorage.getItem('moduleComplete_' + required[i])) {
            return false;
        }
    }
    return true;
}

function updateProjectLockState() {
    var card = document.getElementById('project-card');
    var icon = document.getElementById('project-card-icon');
    if (!card || !icon) return;

    var wasLocked = card.classList.contains('locked');
    var allDone = checkAllModulesComplete();

    if (allDone) {
        card.classList.remove('locked');
        card.classList.add('unlocked');
        icon.textContent = '🎨';
        if (wasLocked) {
            // 刚解锁，播放动画
            card.classList.add('just-unlocked');
            setTimeout(function() { card.classList.remove('just-unlocked'); }, 600);
        }
    } else {
        card.classList.remove('unlocked');
        card.classList.add('locked');
        icon.textContent = '🔒';
    }
}

function onProjectCardClick() {
    if (!checkAllModulesComplete()) {
        // 锁定状态：轻微抖动提示
        var card = document.getElementById('project-card');
        if (card) {
            card.style.webkitTransform = 'translateX(-6px)';
            card.style.transform = 'translateX(-6px)';
            setTimeout(function() {
                card.style.webkitTransform = 'translateX(6px)';
                card.style.transform = 'translateX(6px)';
            }, 100);
            setTimeout(function() {
                card.style.webkitTransform = '';
                card.style.transform = '';
            }, 200);
        }
        return;
    }
    showProjectScreen();
}

// ===== 数据同步 =====
function syncCoopProgress(sp) {
    if (!adventureState || !window.players || !window.Sync) return;

    var p1 = window.players[0];
    var p2 = window.players[1];
    if (!p1) return;

    var name1 = p1.name.replace(/^\d+\.\s*/, '');
    var name2 = p2 ? p2.name.replace(/^\d+\.\s*/, '') : '';

    var data = {
        mode: 'adventure',
        lessonId: adventureState.lessonId,
        module: adventureState.module,
        stationId: adventureState.stations[adventureState.currentStation] ? adventureState.stations[adventureState.currentStation].id : 0,
        studentName: name1 + (name2 ? ' & ' + name2 : ''),
        stars: sp.stars,
        totalQuestions: sp.totalQuestions,
        aCorrectRate: sp.aTotal > 0 ? Math.round(sp.aCorrect / sp.aTotal * 100) : 0,
        bCorrectRate: sp.bTotal > 0 ? Math.round(sp.bCorrect / sp.bTotal * 100) : 0,
        coopRetryCount: sp.coopRetryCount,
        scaffoldLog: sp.scaffoldLog,
        timestamp: Date.now()
    };

    // 存本地
    var id1Match = p1.name.match(/^(\d+)/);
    var id1 = id1Match ? id1Match[1] : '0';
    Sync.setDashboardData('coopProgress_' + id1, data);
}

// ===== 海报Project入口 =====
function showProjectScreen() {
    var coopData = getCurrentCoopData();
    if (!coopData || !coopData.id) {
        alert('请先选择课程');
        return;
    }
    var unitId = coopData.id.substring(0, 2);
    var projectData = window[unitId.toLowerCase() + '_project'];
    if (!projectData) {
        alert('该单元的海报还没准备好');
        return;
    }

    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) screens[i].classList.remove('active');
    document.getElementById('project-screen').classList.add('active');
    document.getElementById('project-title').textContent = projectData.title;

    var container = document.getElementById('project-container');
    startDragPoster(projectData, container);
}


function startDragPoster(projectData, container) {
    var roleA = (typeof window.currentCoopRoleA === 'number') ? window.currentCoopRoleA : 0;
    var roleB = 1 - roleA;
    var nameA = getPlayerShortName(roleA);
    var nameB = getPlayerShortName(roleB);
    var colorA = '#4A90D9', colorB = '#F5A623';

    // ===== 工具：打乱数组 =====
    function shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
        return arr;
    }

    // ===== 状态变量 =====
    var zoneStates = {};
    for (var zi = 0; zi < projectData.zones.length; zi++) {
        var _z = projectData.zones[zi];
        zoneStates[_z.id] = {
            animals: [],          // 第1轮答对的动物对象
            failedAnimals: [],    // 第1轮最终失败的动物id
            descriptions: [],     // 第2轮答对的描述英文句
            sentences: [],        // 第3轮答对的完整句子
            stars: 0,
            errors: 0,
            completed: false,
            // 答题轮次：'r1'=第1轮, 'r1retry'=第1轮错题重做,
            //           'r2'=第2轮, 'r2retry'=第2轮错题重做,
            //           'r3'=第3轮, 'r3retry'=第3轮错题重做, 'done'=结算
            _phase: 'story',
            _isATurn: true
        };
    }

    // ===== 收集展示栏：更新顶部进度条 =====
    function updateThumbnail(zoneId) {
        var bar = document.getElementById('proj-thumb-' + zoneId);
        if (!bar) return;
        var st = zoneStates[zoneId];
        var zone = null;
        for (var i = 0; i < projectData.zones.length; i++) {
            if (projectData.zones[i].id === zoneId) { zone = projectData.zones[i]; break; }
        }
        if (!zone) return;

        var collected = st.animals.length;
        var total = zone.animals ? zone.animals.length : 0;

        // 构建动物头像列表（已收集=彩色圆形，未收集=灰色问号占位）
        var avatarsHtml = '';
        // 已收集动物（彩色圆形头像）
        for (var i = 0; i < st.animals.length; i++) {
            avatarsHtml += '<img src="' + st.animals[i].image + '" style="width:38px;height:38px;object-fit:contain;border-radius:50%;background:rgba(255,255,255,0.85);border:2px solid rgba(255,255,255,0.9);flex-shrink:0;-webkit-transition:transform 0.25s cubic-bezier(.34,1.56,.64,1);transition:transform 0.25s cubic-bezier(.34,1.56,.64,1);" class="coll-avatar">';
        }
        // 失败动物（灰色问号占位）
        for (var i = 0; i < st.failedAnimals.length; i++) {
            avatarsHtml += '<span style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:rgba(0,0,0,0.12);border:2px dashed rgba(255,255,255,0.4);font-size:18px;flex-shrink:0;opacity:0.55;">❓</span>';
        }
        // 未开始的位置（还没遇到的动物）
        var pendingCount = total - st.animals.length - st.failedAnimals.length;
        for (var i = 0; i < pendingCount; i++) {
            avatarsHtml += '<span style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,0.15);border:2px dashed rgba(255,255,255,0.3);font-size:16px;flex-shrink:0;opacity:0.4;">🐾</span>';
        }

        // 进度文字
        var allDone = collected === total;
        var progressText = allDone ? '🎉 全部收集！' : ('收集 ' + collected + ' / ' + total);

        bar.innerHTML =
            '<div style="display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;gap:6px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding:0 4px;flex:1;min-width:0;">' +
            avatarsHtml +
            '</div>' +
            '<div style="font-size:11px;font-weight:bold;color:rgba(255,255,255,0.95);white-space:nowrap;text-shadow:0 1px 3px rgba(0,0,0,0.35);flex-shrink:0;padding-left:6px;">' + progressText + '</div>';

        // 答对新动物时：弹跳动画
        bar.style.webkitTransform = 'scaleY(1.06)';
        bar.style.transform = 'scaleY(1.06)';
        setTimeout(function() {
            bar.style.webkitTransform = 'scaleY(1)';
            bar.style.transform = 'scaleY(1)';
        }, 300);
    }

    // ===== 创建收集展示栏（顶部居中横条，供三个轮次复用）=====
    function buildThumbWrap(zone, containerEl) {
        var bar = document.createElement('div');
        bar.id = 'proj-thumb-' + zone.id;
        // 流式元素，插在 nav 下方，宽度100%，高60-70px
        bar.style.cssText = 'display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;flex-shrink:0;width:100%;box-sizing:border-box;padding:8px 12px;min-height:60px;max-height:70px;background:' + zone.bgGradient + ';-webkit-transition:-webkit-transform 0.2s ease;transition:transform 0.2s ease;overflow:hidden;cursor:pointer;-webkit-tap-highlight-color:transparent;border-bottom:1px solid rgba(255,255,255,0.25);';
        containerEl.appendChild(bar);
        (function(zid) {
            bar.onclick = function() { showThumbPreview(zid); };
        })(zone.id);
        updateThumbnail(zone.id);
    }

    // ===== 缩略图全屏预览弹窗 =====
    function showThumbPreview(zoneId) {
        var st = zoneStates[zoneId];
        var zone = null;
        for (var i = 0; i < projectData.zones.length; i++) {
            if (projectData.zones[i].id === zoneId) { zone = projectData.zones[i]; break; }
        }
        if (!zone) return;

        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:999;display:flex;align-items:center;justify-content:center;';

        var card = document.createElement('div');
        card.style.cssText = 'background:' + zone.bgGradient + ';border-radius:20px;padding:20px;min-width:240px;max-width:300px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.35);';

        var collected = st.animals.length;
        var total = zone.animals ? zone.animals.length : 0;

        var animalsHtml = '';
        for (var i = 0; i < st.animals.length; i++) {
            animalsHtml += '<img src="' + st.animals[i].image + '" style="width:52px;height:52px;object-fit:contain;margin:4px;border-radius:10px;background:rgba(255,255,255,0.7);">';
        }
        for (var i = 0; i < st.failedAnimals.length; i++) {
            animalsHtml += '<span style="display:inline-block;width:52px;height:52px;line-height:52px;font-size:28px;margin:4px;opacity:0.3;">🐾</span>';
        }

        card.innerHTML =
            '<div style="font-size:28px;margin-bottom:6px;">' + zone.emoji + '</div>' +
            '<div style="font-size:16px;font-weight:bold;color:#333;margin-bottom:12px;">' + zone.name + '</div>' +
            '<div style="display:flex;flex-wrap:wrap;justify-content:center;">' + animalsHtml + '</div>' +
            '<div style="font-size:13px;color:rgba(0,0,0,0.6);margin-top:12px;font-weight:bold;">已收集 ' + collected + ' / ' + total + '</div>' +
            '<div style="margin-top:16px;"><button style="padding:8px 24px;border:none;border-radius:20px;background:rgba(0,0,0,0.15);color:#333;font-size:14px;font-weight:bold;cursor:pointer;">关闭</button></div>';

        card.querySelector('button').onclick = function() {
            document.body.removeChild(overlay);
        };
        overlay.onclick = function(e) {
            if (e.target === overlay) document.body.removeChild(overlay);
        };

        overlay.appendChild(card);
        document.body.appendChild(overlay);
    }

    // ===== 辅助：隐藏/恢复 project-screen 顶部标题栏（进入区域时用 buildNav 替代） =====
    function hideProjectHeader() {
        var hdr = document.querySelector('#project-screen .adventure-header');
        if (hdr) hdr.style.display = 'none';
    }
    function showProjectHeader() {
        var hdr = document.querySelector('#project-screen .adventure-header');
        if (hdr) hdr.style.display = '';
    }

    // ===== renderWelcome =====
    function renderWelcome() {
        showProjectHeader();
        container.style.cssText = 'padding:16px;max-width:400px;margin:0 auto;overflow-y:auto;max-height:calc(100vh - 60px);-webkit-overflow-scrolling:touch;';
        var welcomeEmoji = projectData.emoji || '🎮';
        var welcomeRole = (projectData.welcome && projectData.welcome.role) || '园长';
        var welcomeMsg = (projectData.welcome && projectData.welcome.message) || '欢迎来探索！';
        container.innerHTML =
            '<div style="text-align:center;padding:30px 20px;">' +
            '<div style="font-size:48px;margin-bottom:16px;">' + welcomeEmoji + '</div>' +
            '<div style="font-size:20px;font-weight:bold;color:#333;margin-bottom:12px;">' + projectData.title + '</div>' +
            '<div style="font-size:14px;color:#555;line-height:1.8;padding:16px;border-radius:12px;background:#f5f5f5;text-align:left;margin-bottom:20px;">' +
            '<strong>' + welcomeRole + '来信：</strong><br><br>' +
            '亲爱的 ' + nameA + ' 和 ' + nameB + '，<br>' +
            welcomeMsg + '<br><br>' +
            '掌握得好→作品丰富漂亮，掌握得差→作品简陋。准备好了吗？出发！🎉' +
            '</div>' +
            '</div>';

        var btn = document.createElement('button');
        btn.style.cssText = 'display:block;width:100%;padding:14px;font-size:17px;font-weight:bold;border:none;border-radius:14px;background:linear-gradient(135deg,#58cc02,#46a302);color:#fff;cursor:pointer;box-shadow:0 4px 0 #3d8f02;-webkit-touch-callout:none;-webkit-user-select:none;';
        btn.textContent = '准备好了，开始建造！';
        btn.onclick = function() { renderOverview(); };
        container.appendChild(btn);
    }

    // ===== renderOverview =====
    function renderOverview() {
        showProjectHeader();
        container.style.cssText = 'padding:16px;max-width:400px;margin:0 auto;overflow-y:auto;max-height:calc(100vh - 60px);-webkit-overflow-scrolling:touch;';
        container.innerHTML = '';

        var title = document.createElement('div');
        title.style.cssText = 'font-size:18px;font-weight:bold;color:#333;text-align:center;margin-bottom:16px;';
        title.textContent = '🗺️ 选择要探索的区域';
        container.appendChild(title);

        var grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:12px;';

        for (var i = 0; i < projectData.zones.length; i++) {
            (function(zoneIdx) {
                var zone = projectData.zones[zoneIdx];
                var state = zoneStates[zone.id];
                var total = zone.animals ? zone.animals.length : 0;
                var collected = state.animals ? state.animals.length : 0;

                var cell = document.createElement('div');
                cell.style.cssText = 'border-radius:20px;padding:16px 12px;text-align:center;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;aspect-ratio:1/1;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,0.1);transition:transform 0.15s ease;' +
                    (state.completed
                        ? 'background:' + zone.bgGradient + ';border:3px solid rgba(255,255,255,0.6);'
                        : 'background:linear-gradient(180deg,#fafafa,#f0f0f0);border:2px dashed #ccc;');

                var starsHtml = '';
                if (state.completed) {
                    starsHtml = '<div style="margin-top:6px;">';
                    for (var s = 0; s < 3; s++) {
                        starsHtml += '<span style="font-size:18px;">' + (s < state.stars ? '⭐' : '☆') + '</span>';
                    }
                    starsHtml += '</div>';
                }

                var animalsHtml = '';
                if (state.completed && state.animals.length > 0) {
                    animalsHtml = '<div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin-top:8px;">';
                    for (var ai = 0; ai < state.animals.length; ai++) {
                        animalsHtml += '<img src="' + state.animals[ai].image + '" style="width:32px;height:32px;object-fit:contain;border-radius:50%;background:rgba(255,255,255,0.8);padding:2px;">';
                    }
                    animalsHtml += '</div>';
                }

                var statusHtml = '';
                if (state.completed) {
                    statusHtml = '<div style="font-size:12px;color:rgba(0,0,0,0.5);margin-top:6px;">' + collected + '/' + total + ' 已收集</div>';
                } else {
                    statusHtml = '<div style="font-size:12px;color:#bbb;margin-top:8px;padding:6px 16px;border-radius:12px;background:rgba(0,0,0,0.05);">点击探索 →</div>';
                }

                cell.innerHTML =
                    '<div style="font-size:40px;margin-bottom:4px;">' + zone.emoji + '</div>' +
                    '<div style="font-size:15px;font-weight:bold;color:' + (state.completed ? '#333' : '#888') + ';">' + zone.name + '</div>' +
                    starsHtml + animalsHtml + statusHtml;

                cell.onclick = function() { enterZone(zoneIdx); };
                grid.appendChild(cell);
            })(i);
        }
        container.appendChild(grid);

        var allDone = true;
        for (var j = 0; j < projectData.zones.length; j++) {
            if (!zoneStates[projectData.zones[j].id].completed) { allDone = false; break; }
        }
        if (allDone) {
            var posterBtn = document.createElement('button');
            posterBtn.style.cssText = 'display:block;width:100%;margin-top:16px;padding:14px;font-size:16px;font-weight:bold;border:none;border-radius:14px;background:linear-gradient(135deg,#FFD54F,#FFB300);color:#333;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;';
            posterBtn.textContent = '🎉 生成海报！';
            posterBtn.onclick = function() { renderFinalPoster(); };
            container.appendChild(posterBtn);
        }
    }

    // ===== enterZone：区域已完成则看回顾，否则进入答题 =====
    function enterZone(zoneIndex) {
        hideProjectHeader();
        var zone = projectData.zones[zoneIndex];
        var state = zoneStates[zone.id];
        if (state.completed) { renderZoneComplete(zoneIndex); return; }
        if (state._phase === 'story') { renderStory(zoneIndex); }
        else { renderQuizPhase(zoneIndex); }
    }

    // ===== renderStory =====
    function renderStory(zoneIndex) {
        var zone = projectData.zones[zoneIndex];
        container.innerHTML = '';
        container.style.cssText = 'padding:0;display:flex;flex-direction:column;height:calc(100vh - 60px);';

        var nav = buildNav(zone, zoneIndex, zoneStates[zone.id]);
        container.appendChild(nav);

        var mainArea = document.createElement('div');
        mainArea.style.cssText = 'flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:12px 16px;background:' + zone.bgGradient + ';';
        mainArea.innerHTML =
            '<div style="text-align:center;padding:40px 20px;">' +
            '<div style="font-size:48px;margin-bottom:16px;">' + zone.emoji + '</div>' +
            '<div style="font-size:18px;font-weight:bold;color:#333;margin-bottom:12px;">' + zone.name + '</div>' +
            '<div style="font-size:15px;color:#555;line-height:1.8;max-width:280px;margin:0 auto;padding:16px;border-radius:12px;background:rgba(255,255,255,0.8);">' +
            zone.story + '</div></div>';

        var bottomArea = document.createElement('div');
        bottomArea.style.cssText = 'flex-shrink:0;padding:12px 16px;background:#fff;border-top:2px solid #e5e5e5;';
        var startBtn = document.createElement('button');
        startBtn.style.cssText = 'display:block;width:100%;padding:14px;font-size:17px;font-weight:bold;border:none;border-radius:14px;background:linear-gradient(135deg,#58cc02,#46a302);color:#fff;cursor:pointer;box-shadow:0 4px 0 #3d8f02;-webkit-touch-callout:none;-webkit-user-select:none;';
        startBtn.textContent = '开始探索！';
        startBtn.onclick = function() {
            zoneStates[zone.id]._phase = 'r1';
            zoneStates[zone.id]._isATurn = true;
            zoneStates[zone.id]._r1Queue = buildR1Queue(zone);
            zoneStates[zone.id]._r1Failed = [];
            renderQuizPhase(zoneIndex);
        };
        bottomArea.appendChild(startBtn);
        container.appendChild(mainArea);
        container.appendChild(bottomArea);
    }

    // ===== buildNav =====
    function buildNav(zone, zoneIndex, state) {
        var nav = document.createElement('div');
        nav.style.cssText = 'padding:8px 16px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;background:#fff;border-bottom:1px solid #eee;';
        var backBtn = document.createElement('button');
        backBtn.style.cssText = 'border:none;background:none;font-size:16px;color:#333;cursor:pointer;padding:8px;-webkit-touch-callout:none;-webkit-user-select:none;';
        backBtn.textContent = '← 返回';
        backBtn.onclick = function() {
            showProjectHeader();
            container.style.cssText = 'padding:16px;max-width:400px;margin:0 auto;overflow-y:auto;max-height:calc(100vh - 60px);-webkit-overflow-scrolling:touch;';
            renderOverview();
        };
        var zoneTitle = document.createElement('div');
        zoneTitle.style.cssText = 'font-size:16px;font-weight:bold;color:#333;';
        zoneTitle.textContent = zone.emoji + ' ' + zone.name;
        var errDisplay = document.createElement('div');
        errDisplay.id = 'err-display-' + zone.id;
        errDisplay.style.cssText = 'font-size:12px;color:#999;';
        errDisplay.textContent = '错误：' + state.errors;
        nav.appendChild(backBtn);
        nav.appendChild(zoneTitle);
        nav.appendChild(errDisplay);
        return nav;
    }

    // ===== buildR1Queue：第1轮题目队列 =====
    function buildR1Queue(zone) {
        var q = [];
        for (var i = 0; i < zone.animals.length; i++) q.push(zone.animals[i]);
        return q;
    }

    // ===== renderQuizPhase：总调度 =====
    function renderQuizPhase(zoneIndex) {
        var zone = projectData.zones[zoneIndex];
        var state = zoneStates[zone.id];
        var phase = state._phase;

        if (phase === 'r1')      { renderR1(zoneIndex); return; }
        if (phase === 'r1retry') { renderRetry(zoneIndex, 'r1', 'r2'); return; }
        if (phase === 'r2')      { renderR2(zoneIndex); return; }
        if (phase === 'r2retry') { renderRetry(zoneIndex, 'r2', 'r3'); return; }
        if (phase === 'r3')      { renderR3(zoneIndex); return; }
        if (phase === 'r3retry') { renderRetry(zoneIndex, 'r3', 'done'); return; }
        if (phase === 'done')    { renderZoneResult(zoneIndex); return; }
    }

    // ===== showWarning：大字提醒 =====
    function showWarning(text) {
        var w = document.createElement('div');
        w.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.75);color:#fff;font-size:22px;font-weight:bold;padding:18px 28px;border-radius:16px;z-index:9999;text-align:center;pointer-events:none;';
        w.textContent = text;
        document.body.appendChild(w);
        setTimeout(function() { if (w.parentNode) w.parentNode.removeChild(w); }, 1500);
    }

    // ===== render4Options：渲染4选项按钮，返回el数组 =====
    function render4Options(bottomArea, options, correctWord, eliminated, onCorrect, onFail, state) {
        var optGrid = document.createElement('div');
        optGrid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px;';
        var els = [];

        for (var i = 0; i < options.length; i++) {
            (function(word) {
                var btn = document.createElement('div');
                btn.setAttribute('data-word', word);
                btn.style.cssText = 'padding:16px 8px;border-radius:14px;border:3px solid #e5e5e5;background:#fff;text-align:center;cursor:pointer;font-size:18px;font-weight:bold;color:#333;-webkit-touch-callout:none;-webkit-user-select:none;transition:all 0.2s ease;';
                btn.textContent = word;
                els.push(btn);
                if (eliminated.indexOf(word) !== -1) {
                    btn.style.opacity = '0.3';
                    btn.style.pointerEvents = 'none';
                    btn.style.borderColor = '#FF5252';
                    btn.style.background = '#ffebee';
                }
                btn.onclick = function() {
                    if (btn.style.pointerEvents === 'none') return;
                    if (word === correctWord) {
                        btn.style.borderColor = '#4CAF50';
                        btn.style.background = '#f0fce8';
                        btn.style.transform = 'scale(1.05)';
                        for (var x = 0; x < els.length; x++) els[x].style.pointerEvents = 'none';
                        setTimeout(function() { onCorrect(); }, 700);
                    } else {
                        state.errors++;
                        var errEl = document.getElementById('err-display-' + state._zoneId);
                        if (errEl) errEl.textContent = '错误：' + state.errors;
                        eliminated.push(word);
                        btn.style.borderColor = '#FF5252';
                        btn.style.background = '#ffebee';
                        btn.style.opacity = '0.3';
                        btn.style.pointerEvents = 'none';
                        // 用已淘汰数判断：错1次=还剩1次机会，错2次=失败
                        var wrongSoFar = eliminated.length;
                        if (wrongSoFar === 1) {
                            // 第1次错：警告
                            showWarning('⚠️ 还剩1次机会！');
                        }
                        if (wrongSoFar >= 2) {
                            // 第2次错：失败，亮出正确答案，锁定所有按钮
                            for (var x2 = 0; x2 < els.length; x2++) {
                                els[x2].style.pointerEvents = 'none';
                                if (els[x2].getAttribute('data-word') === correctWord) {
                                    els[x2].style.borderColor = '#4CAF50';
                                    els[x2].style.background = '#f0fce8';
                                    els[x2].style.opacity = '1';
                                }
                            }
                            setTimeout(function() { onFail(); }, 1200);
                        }
                    }
                };
                optGrid.appendChild(btn);
            })(options[i]);
        }
        bottomArea.appendChild(optGrid);
        return els;
    }

    // ===== renderR1：第1轮认单词 =====
    function renderR1(zoneIndex) {
        var zone = projectData.zones[zoneIndex];
        var state = zoneStates[zone.id];
        state._zoneId = zone.id;
        var queue = state._r1Queue || buildR1Queue(zone);
        state._r1Queue = queue;
        if (!state._r1Failed) state._r1Failed = [];
        if (state._r1CurIdx === undefined || state._r1CurIdx === null) state._r1CurIdx = 0;

        if (state._r1CurIdx >= queue.length) {
            // 第1轮全做完
            if (state._r1Failed.length > 0) {
                state._phase = 'r1retry';
                // 保存retry队列（错题，打乱顺序）
                state._retryQueue = shuffle(state._r1Failed.slice());
                state._retryFailed = [];
                state._retryCurIdx = 0;
                state._retryFrom = 'r1';
                state._retryNext = 'r2';
            } else {
                state._phase = 'r2';
                state._r2CurIdx = 0;
                state._r2Failed = [];
                state._r2Queue = buildR2Queue(zone, state);
            }
            renderQuizPhase(zoneIndex);
            return;
        }

        var animal = queue[state._r1CurIdx];
        var isATurn = state._isATurn;
        var curName = isATurn ? nameA : nameB;
        var curColor = isATurn ? colorA : colorB;
        var othName = isATurn ? nameB : nameA;
        var othColor = isATurn ? colorB : colorA;

        if (!state._r1ShowOptions) {
            // 第一屏：当前玩家看图
            container.innerHTML = '';
            container.style.cssText = 'padding:0;display:flex;flex-direction:column;height:calc(100vh - 60px);';
            var nav = buildNav(zone, zoneIndex, state);
            container.appendChild(nav);

            var mainArea = document.createElement('div');
            mainArea.style.cssText = 'flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:12px 16px;background:' + zone.bgGradient + ';display:flex;flex-direction:column;align-items:center;justify-content:center;';

            // 收集展示栏
            buildThumbWrap(zone, container);

            mainArea.innerHTML =
                '<div style="font-size:13px;color:rgba(0,0,0,0.5);margin-bottom:8px;">第1轮 认单词 · ' + (state._r1CurIdx + 1) + ' / ' + queue.length + '</div>' +
                '<div style="display:inline-block;padding:6px 16px;border-radius:16px;background:' + curColor + ';color:#fff;font-size:14px;font-weight:bold;margin-bottom:16px;">' +
                curName + ' 看！记住这个</div>' +
                '<div style="margin:16px 0;"><img src="' + animal.image + '" style="max-height:130px;width:auto;border-radius:12px;"></div>' +
                '<div style="font-size:15px;font-weight:bold;color:#333;margin-bottom:6px;">' + animal.label + '</div>' +
                '<div style="font-size:13px;color:#666;">记住了吗？告诉你的同伴！</div>';

            var bottomArea = document.createElement('div');
            bottomArea.style.cssText = 'flex-shrink:0;padding:12px 16px;background:#fff;border-top:2px solid #e5e5e5;';
            var nextBtn = document.createElement('button');
            nextBtn.style.cssText = 'display:block;width:100%;padding:14px;font-size:16px;font-weight:bold;border:none;border-radius:14px;background:' + curColor + ';color:#fff;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;';
            nextBtn.textContent = '记住了！让' + othName + '来选英文';
            nextBtn.onclick = function() {
                state._r1ShowOptions = true;
                state._r1Eliminated = [];
                renderR1(zoneIndex);
            };
            bottomArea.appendChild(nextBtn);
            container.appendChild(mainArea);
            container.appendChild(bottomArea);
        } else {
            // 第二屏：另一个玩家选英文
            container.innerHTML = '';
            container.style.cssText = 'padding:0;display:flex;flex-direction:column;height:calc(100vh - 60px);';
            var nav2 = buildNav(zone, zoneIndex, state);
            container.appendChild(nav2);

            // 收集展示栏
            buildThumbWrap(zone, container);

            var mainArea2 = document.createElement('div');
            mainArea2.style.cssText = 'flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:12px 16px;background:' + zone.bgGradient + ';display:flex;flex-direction:column;align-items:center;justify-content:center;';
            mainArea2.innerHTML =
                '<div style="font-size:13px;color:rgba(0,0,0,0.5);margin-bottom:8px;">第1轮 认单词 · ' + (state._r1CurIdx + 1) + ' / ' + queue.length + '</div>' +
                '<div style="display:inline-block;padding:6px 16px;border-radius:16px;background:' + othColor + ';color:#fff;font-size:14px;font-weight:bold;margin-bottom:8px;">' +
                othName + '：同伴看到了什么？选出英文！</div>' +
                '<div style="font-size:13px;color:#888;margin-bottom:16px;">（问问' + curName + '看到了什么）</div>';
            container.appendChild(mainArea2);

            // 构建选项
            var opts = [animal.word];
            var distract = zone.distractorAnimals.slice();
            shuffle(distract);
            for (var di = 0; di < distract.length && opts.length < 4; di++) {
                if (opts.indexOf(distract[di]) === -1) opts.push(distract[di]);
            }
            shuffle(opts);

            var bottomArea2 = document.createElement('div');
            bottomArea2.style.cssText = 'flex-shrink:0;padding:12px 16px;background:#fff;border-top:2px solid #e5e5e5;';
            container.appendChild(bottomArea2);

            if (!state._r1Eliminated) state._r1Eliminated = [];
            var elim = state._r1Eliminated;
            render4Options(bottomArea2, opts, animal.word, elim,
                function() {
                    // 正确
                    state.animals.push(animal);
                    updateThumbnail(zone.id);
                    state._r1CurIdx++;
                    state._r1ShowOptions = false;
                    state._r1Eliminated = [];
                    state._isATurn = !isATurn;
                    renderR1(zoneIndex);
                },
                function() {
                    // 失败
                    state._r1Failed.push(animal);
                    state.failedAnimals.push(animal.id);
                    state._r1CurIdx++;
                    state._r1ShowOptions = false;
                    state._r1Eliminated = [];
                    state._isATurn = !isATurn;
                    renderR1(zoneIndex);
                },
                state
            );
        }
    }

    // ===== buildR2Queue：第2轮题目队列（跳过失败动物）=====
    function buildR2Queue(zone, state) {
        var q = [];
        for (var i = 0; i < state.animals.length; i++) {
            var a = state.animals[i];
            for (var j = 0; j < a.descriptions.length; j++) {
                q.push({ animal: a, desc: a.descriptions[j] });
            }
        }
        return q;
    }

    // ===== renderR2：第2轮加描述 =====
    function renderR2(zoneIndex) {
        var zone = projectData.zones[zoneIndex];
        var state = zoneStates[zone.id];
        state._zoneId = zone.id;
        if (!state._r2Queue) state._r2Queue = buildR2Queue(zone, state);
        if (state._r2CurIdx === undefined || state._r2CurIdx === null) state._r2CurIdx = 0;
        if (!state._r2Failed) state._r2Failed = [];

        var queue = state._r2Queue;
        if (queue.length === 0) {
            // 没有动物答对，跳过第2轮直接进第3轮
            state._phase = 'r3';
            state._r3CurIdx = 0;
            state._r3Failed = [];
            state._r3Queue = zone.sentenceFills ? zone.sentenceFills.slice() : [];
            renderQuizPhase(zoneIndex);
            return;
        }

        if (state._r2CurIdx >= queue.length) {
            if (state._r2Failed.length > 0) {
                state._phase = 'r2retry';
                state._retryQueue = shuffle(state._r2Failed.slice());
                state._retryFailed = [];
                state._retryCurIdx = 0;
                state._retryFrom = 'r2';
                state._retryNext = 'r3';
            } else {
                state._phase = 'r3';
                state._r3CurIdx = 0;
                state._r3Failed = [];
                state._r3Queue = zone.sentenceFills ? zone.sentenceFills.slice() : [];
            }
            renderQuizPhase(zoneIndex);
            return;
        }

        var item = queue[state._r2CurIdx];
        var animal = item.animal;
        var desc = item.desc;
        var isATurn = state._isATurn;
        var curName = isATurn ? nameA : nameB;
        var curColor = isATurn ? colorA : colorB;

        container.innerHTML = '';
        container.style.cssText = 'padding:0;display:flex;flex-direction:column;height:calc(100vh - 60px);';
        var nav = buildNav(zone, zoneIndex, state);
        container.appendChild(nav);

        // 收集展示栏
        buildThumbWrap(zone, container);

        var mainArea = document.createElement('div');
        mainArea.style.cssText = 'flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:12px 16px;background:' + zone.bgGradient + ';display:flex;flex-direction:column;align-items:center;justify-content:center;';
        mainArea.innerHTML =
            '<div style="font-size:13px;color:rgba(0,0,0,0.5);margin-bottom:8px;">第2轮 加描述 · ' + (state._r2CurIdx + 1) + ' / ' + queue.length + '</div>' +
            '<div style="display:inline-block;padding:6px 16px;border-radius:16px;background:' + curColor + ';color:#fff;font-size:14px;font-weight:bold;margin-bottom:16px;">' + curName + ' 来答！</div>' +
            '<img src="' + animal.image + '" style="max-height:90px;width:auto;border-radius:12px;margin-bottom:12px;">' +
            '<div style="font-size:20px;font-weight:bold;color:#333;margin-bottom:8px;">' + desc.chinese + '</div>' +
            '<div style="font-size:13px;color:#777;margin-bottom:6px;">这句话的英文是？</div>';
        container.appendChild(mainArea);

        // 构建4个英文句子选项
        var correctEn = desc.english;
        var opts2 = [correctEn];
        // 第1层：从当前zone已认出的动物的描述里取干扰项
        for (var ai = 0; ai < state.animals.length && opts2.length < 4; ai++) {
            for (var di = 0; di < state.animals[ai].descriptions.length && opts2.length < 4; di++) {
                var en = state.animals[ai].descriptions[di].english;
                if (en !== correctEn && opts2.indexOf(en) === -1) opts2.push(en);
            }
        }
        // 第2层：从当前zone所有动物（含未认出的）描述里取
        for (var ai2 = 0; ai2 < zone.animals.length && opts2.length < 4; ai2++) {
            for (var di2 = 0; di2 < zone.animals[ai2].descriptions.length && opts2.length < 4; di2++) {
                var en2 = zone.animals[ai2].descriptions[di2].english;
                if (en2 !== correctEn && opts2.indexOf(en2) === -1) opts2.push(en2);
            }
        }
        // 第3层：从其他zone的动物描述里取（跨区域取干扰项）
        for (var zi = 0; zi < projectData.zones.length && opts2.length < 4; zi++) {
            var otherZone = projectData.zones[zi];
            if (otherZone.id === zone.id) continue;
            for (var ai3 = 0; ai3 < otherZone.animals.length && opts2.length < 4; ai3++) {
                for (var di3 = 0; di3 < otherZone.animals[ai3].descriptions.length && opts2.length < 4; di3++) {
                    var en3 = otherZone.animals[ai3].descriptions[di3].english;
                    if (en3 !== correctEn && opts2.indexOf(en3) === -1) opts2.push(en3);
                }
            }
        }
        shuffle(opts2);

        var bottomArea = document.createElement('div');
        bottomArea.style.cssText = 'flex-shrink:0;padding:12px 16px;background:#fff;border-top:2px solid #e5e5e5;';
        container.appendChild(bottomArea);

        if (!state._r2Eliminated) state._r2Eliminated = [];
        var elim2 = state._r2Eliminated;
        render4Options(bottomArea, opts2.slice(0, 4), correctEn, elim2,
            function() {
                state.descriptions.push(correctEn);
                updateThumbnail(zone.id);
                state._r2CurIdx++;
                state._r2Eliminated = [];
                state._isATurn = !isATurn;
                renderR2(zoneIndex);
            },
            function() {
                state._r2Failed.push(item);
                state._r2CurIdx++;
                state._r2Eliminated = [];
                state._isATurn = !isATurn;
                renderR2(zoneIndex);
            },
            state
        );
    }

    // ===== renderR3：第3轮补句子 =====
    function renderR3(zoneIndex) {
        var zone = projectData.zones[zoneIndex];
        var state = zoneStates[zone.id];
        state._zoneId = zone.id;
        if (!state._r3Queue) state._r3Queue = zone.sentenceFills ? zone.sentenceFills.slice() : [];
        if (state._r3CurIdx === undefined || state._r3CurIdx === null) state._r3CurIdx = 0;
        if (!state._r3Failed) state._r3Failed = [];

        var queue = state._r3Queue;
        if (queue.length === 0 || state._r3CurIdx >= queue.length) {
            if (state._r3Failed && state._r3Failed.length > 0) {
                state._phase = 'r3retry';
                state._retryQueue = shuffle(state._r3Failed.slice());
                state._retryFailed = [];
                state._retryCurIdx = 0;
                state._retryFrom = 'r3';
                state._retryNext = 'done';
            } else {
                state._phase = 'done';
            }
            renderQuizPhase(zoneIndex);
            return;
        }

        var item = queue[state._r3CurIdx];
        var isATurn = state._isATurn;
        var curName = isATurn ? nameA : nameB;
        var curColor = isATurn ? colorA : colorB;

        // 把句子里的空格高亮显示
        var sentenceDisplay = item.sentence.replace('___',
            '<span style="display:inline-block;min-width:60px;border-bottom:3px solid ' + curColor + ';margin:0 4px;font-size:22px;"> &nbsp;&nbsp;&nbsp;&nbsp; </span>');

        container.innerHTML = '';
        container.style.cssText = 'padding:0;display:flex;flex-direction:column;height:calc(100vh - 60px);';
        var nav = buildNav(zone, zoneIndex, state);
        container.appendChild(nav);

        // 收集展示栏
        buildThumbWrap(zone, container);

        // 查找关联的动物/物品图片
        var itemImageHtml = '';
        if (item.animalId) {
            var allAnimals = projectData.allAnimals || {};
            var animalInfo = allAnimals[item.animalId];
            if (!animalInfo) {
                // fallback：在zone.animals里找
                for (var ai = 0; ai < zone.animals.length; ai++) {
                    if (zone.animals[ai].id === item.animalId) {
                        animalInfo = zone.animals[ai];
                        break;
                    }
                }
            }
            if (animalInfo && animalInfo.image) {
                var animalLabel2 = animalInfo.label || item.animalId;
                itemImageHtml =
                    '<div style="text-align:center;margin-bottom:12px;">' +
                    '<img src="' + animalInfo.image + '" alt="' + animalLabel2 + '" ' +
                    'style="width:100px;height:100px;object-fit:contain;border-radius:16px;background:rgba(255,255,255,0.9);padding:8px;box-shadow:0 2px 8px rgba(0,0,0,0.12);" />' +
                    '<div style="font-size:18px;font-weight:bold;color:#333;margin-top:6px;">' + animalLabel2 + '</div>' +
                    '</div>';
            } else if (animalInfo) {
                // 没有图片，显示emoji+名字
                var animalLabel = animalInfo.label || item.animalId;
                itemImageHtml =
                    '<div style="text-align:center;margin-bottom:12px;">' +
                    '<div style="font-size:56px;line-height:1.2;">' + (zone.emoji || '🐾') + '</div>' +
                    '<div style="font-size:18px;font-weight:bold;color:#333;margin-top:4px;">' + animalLabel + '</div>' +
                    '</div>';
            }
        }

        // 中文翻译
        var chineseHint = item.chinese
            ? '<div style="font-size:14px;color:#999;margin-top:6px;letter-spacing:0.5px;">（' + item.chinese + '）</div>'
            : '';

        var mainArea = document.createElement('div');
        mainArea.style.cssText = 'flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:12px 16px;background:' + zone.bgGradient + ';display:flex;flex-direction:column;align-items:center;justify-content:center;';
        mainArea.innerHTML =
            '<div style="font-size:13px;color:rgba(0,0,0,0.5);margin-bottom:8px;">第3轮 补句子 · ' + (state._r3CurIdx + 1) + ' / ' + queue.length + '</div>' +
            '<div style="display:inline-block;padding:6px 16px;border-radius:16px;background:' + curColor + ';color:#fff;font-size:14px;font-weight:bold;margin-bottom:16px;">' + curName + ' 来答！</div>' +
            itemImageHtml +
            '<div style="font-size:22px;font-weight:bold;color:#333;text-align:center;line-height:2;padding:16px 20px;background:rgba(255,255,255,0.9);border-radius:14px;margin-bottom:4px;">' +
            sentenceDisplay + '</div>' +
            chineseHint +
            '<div style="font-size:13px;color:#777;margin-top:8px;">填入正确的词！</div>';
        container.appendChild(mainArea);

        var bottomArea = document.createElement('div');
        bottomArea.style.cssText = 'flex-shrink:0;padding:12px 16px;background:#fff;border-top:2px solid #e5e5e5;';
        container.appendChild(bottomArea);

        var opts3 = item.options.slice();
        shuffle(opts3);
        if (!state._r3Eliminated) state._r3Eliminated = [];
        var elim3 = state._r3Eliminated;
        render4Options(bottomArea, opts3, item.blank, elim3,
            function() {
                // 答对：把完整句子存为装饰句
                var full = item.sentence.replace('___', item.blank);
                state.sentences.push(full);
                updateThumbnail(zone.id);
                state._r3CurIdx++;
                state._r3Eliminated = [];
                state._isATurn = !isATurn;
                renderR3(zoneIndex);
            },
            function() {
                state._r3Failed.push(item);
                state._r3CurIdx++;
                state._r3Eliminated = [];
                state._isATurn = !isATurn;
                renderR3(zoneIndex);
            },
            state
        );
    }

    // ===== renderRetry：错题重做（通用）=====
    function renderRetry(zoneIndex, fromPhase, nextPhase) {
        var zone = projectData.zones[zoneIndex];
        var state = zoneStates[zone.id];
        var queue = state._retryQueue || [];
        var idx = state._retryCurIdx || 0;

        // 显示过渡页
        if (!state._retryStarted) {
            state._retryStarted = true;
            container.innerHTML = '';
            container.style.cssText = 'padding:16px;max-width:400px;margin:0 auto;overflow-y:auto;max-height:calc(100vh - 60px);-webkit-overflow-scrolling:touch;';
            var div = document.createElement('div');
            div.style.cssText = 'text-align:center;padding:40px 20px;';
            div.innerHTML =
                '<div style="font-size:48px;margin-bottom:16px;">⚠️</div>' +
                '<div style="font-size:18px;font-weight:bold;color:#333;margin-bottom:8px;">还有 ' + queue.length + ' 道题没答对</div>' +
                '<div style="font-size:14px;color:#666;margin-bottom:24px;">再试一次！这次选项顺序不一样哦</div>';
            var btn = document.createElement('button');
            btn.style.cssText = 'display:block;width:100%;padding:14px;font-size:16px;font-weight:bold;border:none;border-radius:14px;background:linear-gradient(135deg,#FF9800,#F57C00);color:#fff;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;';
            btn.textContent = '继续重试！';
            btn.onclick = function() {
                state._retryCurIdx = 0;
                state._retryEliminatedMap = {};
                renderRetry(zoneIndex, fromPhase, nextPhase);
            };
            div.appendChild(btn);
            container.appendChild(div);
            return;
        }

        if (idx >= queue.length) {
            // 重做完毕，进入下一阶段
            state._retryStarted = false;
            if (fromPhase === 'r1') {
                // r1重做仍然失败的→维持失败
                state._phase = 'r2';
                state._r2CurIdx = 0;
                state._r2Failed = [];
                state._r2Queue = buildR2Queue(zone, state);
            } else if (fromPhase === 'r2') {
                state._phase = 'r3';
                state._r3CurIdx = 0;
                state._r3Failed = [];
                state._r3Queue = zone.sentenceFills ? zone.sentenceFills.slice() : [];
            } else if (fromPhase === 'r3') {
                state._phase = 'done';
            }
            renderQuizPhase(zoneIndex);
            return;
        }

        var item = queue[idx];
        var isATurn = state._isATurn;
        var curName = isATurn ? nameA : nameB;
        var curColor = isATurn ? colorA : colorB;
        var othName = isATurn ? nameB : nameA;
        var othColor = isATurn ? colorB : colorA;

        if (!state._retryEliminatedMap) state._retryEliminatedMap = {};
        var elimKey = 'retry_' + idx;
        if (!state._retryEliminatedMap[elimKey]) state._retryEliminatedMap[elimKey] = [];
        var elim = state._retryEliminatedMap[elimKey];

        container.innerHTML = '';
        container.style.cssText = 'padding:0;display:flex;flex-direction:column;height:calc(100vh - 60px);';
        var nav = buildNav(zone, zoneIndex, state);
        container.appendChild(nav);

        // 收集展示栏
        buildThumbWrap(zone, container);

        var mainArea = document.createElement('div');
        mainArea.style.cssText = 'flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:12px 16px;background:' + zone.bgGradient + ';display:flex;flex-direction:column;align-items:center;justify-content:center;';

        var bottomArea = document.createElement('div');
        bottomArea.style.cssText = 'flex-shrink:0;padding:12px 16px;background:#fff;border-top:2px solid #e5e5e5;';

        var correctWord, opts, label;

        if (fromPhase === 'r1') {
            // 错题重做：认单词
            var animal = item; // item是animal对象
            // 检查是否已经先看图
            if (!state._retryShowOptions) {
                mainArea.innerHTML =
                    '<div style="font-size:13px;color:rgba(0,0,0,0.5);margin-bottom:8px;">重做 · ' + (idx + 1) + ' / ' + queue.length + '</div>' +
                    '<div style="display:inline-block;padding:6px 16px;border-radius:16px;background:' + curColor + ';color:#fff;font-size:14px;font-weight:bold;margin-bottom:16px;">' + curName + ' 看！</div>' +
                    '<img src="' + animal.image + '" style="max-height:130px;width:auto;border-radius:12px;margin-bottom:12px;">' +
                    '<div style="font-size:15px;font-weight:bold;color:#333;">' + animal.label + '</div>';
                var nextBtn = document.createElement('button');
                nextBtn.style.cssText = 'display:block;width:100%;padding:14px;font-size:16px;font-weight:bold;border:none;border-radius:14px;background:' + curColor + ';color:#fff;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;';
                nextBtn.textContent = '记住了！让' + othName + '来选';
                nextBtn.onclick = function() {
                    state._retryShowOptions = true;
                    renderRetry(zoneIndex, fromPhase, nextPhase);
                };
                bottomArea.appendChild(nextBtn);
                container.appendChild(mainArea);
                container.appendChild(bottomArea);
                return;
            }
            // 选项屏
            state._retryShowOptions = false;
            correctWord = animal.word;
            opts = [correctWord];
            var distract2 = zone.distractorAnimals.slice();
            shuffle(distract2);
            for (var di = 0; di < distract2.length && opts.length < 4; di++) {
                if (opts.indexOf(distract2[di]) === -1) opts.push(distract2[di]);
            }
            shuffle(opts);

            mainArea.innerHTML =
                '<div style="font-size:13px;color:rgba(0,0,0,0.5);margin-bottom:8px;">重做 · ' + (idx + 1) + ' / ' + queue.length + '</div>' +
                '<div style="display:inline-block;padding:6px 16px;border-radius:16px;background:' + othColor + ';color:#fff;font-size:14px;font-weight:bold;">' + othName + '：选出英文！</div>';
            render4Options(bottomArea, opts, correctWord, elim,
                function() {
                    state.animals.push(animal);
                    // 从failedAnimals移除
                    for (var fi = 0; fi < state.failedAnimals.length; fi++) {
                        if (state.failedAnimals[fi] === animal.id) { state.failedAnimals.splice(fi, 1); break; }
                    }
                    updateThumbnail(zone.id);
                    state._retryCurIdx = idx + 1;
                    state._isATurn = !isATurn;
                    renderRetry(zoneIndex, fromPhase, nextPhase);
                },
                function() {
                    // 重做仍然失败，接受结果
                    state._retryCurIdx = idx + 1;
                    state._isATurn = !isATurn;
                    renderRetry(zoneIndex, fromPhase, nextPhase);
                },
                state
            );

        } else if (fromPhase === 'r2') {
            // 错题重做：描述选句
            var descItem = item;
            correctWord = descItem.desc.english;
            opts = [correctWord];
            for (var ai3 = 0; ai3 < zone.animals.length && opts.length < 4; ai3++) {
                for (var di3 = 0; di3 < zone.animals[ai3].descriptions.length && opts.length < 4; di3++) {
                    var en3 = zone.animals[ai3].descriptions[di3].english;
                    if (en3 !== correctWord && opts.indexOf(en3) === -1) opts.push(en3);
                }
            }
            shuffle(opts);

            mainArea.innerHTML =
                '<div style="font-size:13px;color:rgba(0,0,0,0.5);margin-bottom:8px;">重做 · ' + (idx + 1) + ' / ' + queue.length + '</div>' +
                '<div style="display:inline-block;padding:6px 16px;border-radius:16px;background:' + curColor + ';color:#fff;font-size:14px;font-weight:bold;margin-bottom:16px;">' + curName + ' 来答！</div>' +
                '<img src="' + descItem.animal.image + '" style="max-height:80px;width:auto;border-radius:12px;margin-bottom:12px;">' +
                '<div style="font-size:18px;font-weight:bold;color:#333;">' + descItem.desc.chinese + '</div>';
            render4Options(bottomArea, opts.slice(0, 4), correctWord, elim,
                function() {
                    state.descriptions.push(correctWord);
                    updateThumbnail(zone.id);
                    state._retryCurIdx = idx + 1;
                    state._isATurn = !isATurn;
                    renderRetry(zoneIndex, fromPhase, nextPhase);
                },
                function() {
                    state._retryCurIdx = idx + 1;
                    state._isATurn = !isATurn;
                    renderRetry(zoneIndex, fromPhase, nextPhase);
                },
                state
            );

        } else if (fromPhase === 'r3') {
            // 错题重做：补句子
            var fillItem = item;
            var sentDisplay = fillItem.sentence.replace('___',
                '<span style="display:inline-block;min-width:60px;border-bottom:3px solid ' + curColor + ';margin:0 4px;font-size:22px;"> &nbsp;&nbsp;&nbsp;&nbsp; </span>');
            mainArea.innerHTML =
                '<div style="font-size:13px;color:rgba(0,0,0,0.5);margin-bottom:8px;">重做 · ' + (idx + 1) + ' / ' + queue.length + '</div>' +
                '<div style="display:inline-block;padding:6px 16px;border-radius:16px;background:' + curColor + ';color:#fff;font-size:14px;font-weight:bold;margin-bottom:20px;">' + curName + ' 来答！</div>' +
                '<div style="font-size:22px;font-weight:bold;color:#333;text-align:center;line-height:2;padding:16px 20px;background:rgba(255,255,255,0.9);border-radius:14px;">' +
                sentDisplay + '</div>';
            var retryOpts = fillItem.options.slice();
            shuffle(retryOpts);
            render4Options(bottomArea, retryOpts, fillItem.blank, elim,
                function() {
                    var full2 = fillItem.sentence.replace('___', fillItem.blank);
                    state.sentences.push(full2);
                    updateThumbnail(zone.id);
                    state._retryCurIdx = idx + 1;
                    state._isATurn = !isATurn;
                    renderRetry(zoneIndex, fromPhase, nextPhase);
                },
                function() {
                    state._retryCurIdx = idx + 1;
                    state._isATurn = !isATurn;
                    renderRetry(zoneIndex, fromPhase, nextPhase);
                },
                state
            );
        }

        container.appendChild(mainArea);
        container.appendChild(bottomArea);
    }

    // ===== 辅助：从zone.animals中查找失败动物的完整对象 =====
    function findAnimalById(zone, animalId) {
        for (var i = 0; i < zone.animals.length; i++) {
            if (zone.animals[i].id === animalId) return zone.animals[i];
        }
        return null;
    }

    // ===== 辅助：生成单个动物卡片HTML =====
    function buildAnimalCard(animal, isFailed, descText) {
        var cardBg = isFailed ? '#f0f0f0' : '#fff';
        var imgFilter = isFailed ? 'filter:grayscale(100%);opacity:0.35;' : '';
        var nameColor = isFailed ? '#aaa' : '#333';
        var imgSrc = animal ? animal.image : '';
        var word = animal ? animal.word : '???';

        var html = '<div style="background:' + cardBg + ';border-radius:14px;padding:12px 10px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.08);width:calc(50% - 6px);box-sizing:border-box;">';
        if (imgSrc) {
            html += '<div style="width:72px;height:72px;margin:0 auto 8px;display:flex;align-items:center;justify-content:center;">' +
                '<img src="' + imgSrc + '" style="max-width:72px;max-height:72px;border-radius:10px;' + imgFilter + '">' +
                '</div>';
        }
        html += '<div style="font-size:15px;font-weight:bold;color:' + nameColor + ';margin-bottom:4px;">' + word + '</div>';
        if (isFailed) {
            html += '<div style="font-size:11px;color:#bbb;font-style:italic;">下次加油</div>';
        } else if (descText) {
            html += '<div style="font-size:11px;color:#666;line-height:1.4;">' + descText + '</div>';
        }
        html += '</div>';
        return html;
    }

    // ===== renderZoneResult：区域结算 =====
    function renderZoneResult(zoneIndex) {
        var zone = projectData.zones[zoneIndex];
        var state = zoneStates[zone.id];

        // 计算星级
        if (state.errors === 0) state.stars = 3;
        else if (state.errors <= 2) state.stars = 2;
        else state.stars = 1;
        state.completed = true;

        // 找下一个未完成区域
        var nextIdx = -1;
        for (var ni = 0; ni < projectData.zones.length; ni++) {
            if (ni !== zoneIndex && !zoneStates[projectData.zones[ni].id].completed) {
                nextIdx = ni; break;
            }
        }

        container.innerHTML = '';
        container.style.cssText = 'padding:0;max-width:400px;margin:0 auto;overflow-y:auto;max-height:calc(100vh - 60px);-webkit-overflow-scrolling:touch;';

        // --- 顶部横幅：区域名 + 星星 ---
        var banner = document.createElement('div');
        banner.style.cssText = 'text-align:center;padding:24px 16px 18px;background:' + zone.bgGradient + ';border-radius:0 0 24px 24px;';
        var starsHtml = '';
        for (var s = 0; s < 3; s++) {
            starsHtml += '<span style="font-size:32px;' + (s < state.stars ? '' : 'opacity:0.3;') + '">' + (s < state.stars ? '⭐' : '☆') + '</span>';
        }
        var resultNote = state.stars === 3 ? '零失误！完美！' : ('错误 ' + state.errors + ' 次');
        banner.innerHTML =
            '<div style="font-size:36px;margin-bottom:6px;">' + zone.emoji + '</div>' +
            '<div style="font-size:20px;font-weight:bold;color:#333;margin-bottom:8px;">' + zone.name + ' 完成！</div>' +
            '<div style="font-size:14px;color:rgba(0,0,0,0.6);margin-bottom:8px;">' + nameA + ' & ' + nameB + ' 的' + zone.name + '</div>' +
            '<div style="margin-bottom:6px;">' + starsHtml + '</div>' +
            '<div style="font-size:13px;color:rgba(0,0,0,0.5);">' + resultNote + '</div>';
        container.appendChild(banner);

        // --- 收集成果：动物头像一览 ---
        var totalAnimals = zone.animals ? zone.animals.length : 0;
        var collectedCount = state.animals.length;
        var allCollected = collectedCount === totalAnimals;
        var collectSummary = allCollected
            ? '🎉 ' + collectedCount + '只全部收集！'
            : collectedCount + ' / ' + totalAnimals + ' 只收集成功';

        var collectBar = document.createElement('div');
        collectBar.style.cssText = 'padding:12px 16px 4px;text-align:center;';

        var avatarsHtml = '';
        for (var ci = 0; ci < state.animals.length; ci++) {
            avatarsHtml += '<img src="' + state.animals[ci].image + '" style="width:44px;height:44px;object-fit:contain;border-radius:50%;background:rgba(255,255,255,0.9);border:3px solid #4CAF50;margin:4px;display:inline-block;">';
        }
        for (var fi2 = 0; fi2 < state.failedAnimals.length; fi2++) {
            var failedInfo = findAnimalById(zone, state.failedAnimals[fi2]);
            var failSrc = failedInfo && failedInfo.image ? failedInfo.image : '';
            if (failSrc) {
                avatarsHtml += '<img src="' + failSrc + '" style="width:44px;height:44px;object-fit:contain;border-radius:50%;background:#e0e0e0;border:3px solid #ccc;margin:4px;display:inline-block;-webkit-filter:grayscale(1);filter:grayscale(1);opacity:0.55;">';
            } else {
                avatarsHtml += '<span style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;background:#e0e0e0;border:3px dashed #bbb;margin:4px;font-size:22px;opacity:0.55;">❓</span>';
            }
        }

        collectBar.innerHTML =
            '<div style="font-size:15px;font-weight:bold;color:#555;margin-bottom:8px;">' + collectSummary + '</div>' +
            '<div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;">' + avatarsHtml + '</div>';
        container.appendChild(collectBar);

        // --- 动物卡片网格 ---
        var cardsWrap = document.createElement('div');
        cardsWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;padding:10px 16px 6px;justify-content:center;';
        // 成功的动物
        for (var ai = 0; ai < state.animals.length; ai++) {
            var descForAnimal = ai < state.descriptions.length ? state.descriptions[ai] : '';
            cardsWrap.innerHTML += buildAnimalCard(state.animals[ai], false, descForAnimal);
        }
        // 失败的动物（灰色剪影 - 用真实图片但灰化）
        for (var fi = 0; fi < state.failedAnimals.length; fi++) {
            var failedAnimal = findAnimalById(zone, state.failedAnimals[fi]);
            cardsWrap.innerHTML += buildAnimalCard(failedAnimal, true, '');
        }
        container.appendChild(cardsWrap);

        // --- 按钮区 ---
        var btnArea = document.createElement('div');
        btnArea.style.cssText = 'padding:14px 16px 24px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;';

        if (nextIdx >= 0) {
            (function(nIdx) {
                var nextBtn = document.createElement('button');
                nextBtn.style.cssText = 'flex:1;padding:14px;border:none;border-radius:14px;background:linear-gradient(135deg,#42A5F5,#1E88E5);color:#fff;font-size:15px;font-weight:bold;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;';
                nextBtn.textContent = '去' + projectData.zones[nIdx].name + ' →';
                nextBtn.onclick = function() { enterZone(nIdx); };
                btnArea.appendChild(nextBtn);
            })(nextIdx);
        } else {
            var posterBtn = document.createElement('button');
            posterBtn.style.cssText = 'flex:1;padding:14px;border:none;border-radius:14px;background:linear-gradient(135deg,#FFD54F,#FFB300);color:#333;font-size:15px;font-weight:bold;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;';
            posterBtn.textContent = '🎉 生成海报！';
            posterBtn.onclick = function() { renderFinalPoster(); };
            btnArea.appendChild(posterBtn);
        }

        var overviewBtn = document.createElement('button');
        overviewBtn.style.cssText = 'padding:14px 20px;border:2px solid #ddd;border-radius:14px;background:#fff;color:#888;font-size:14px;font-weight:bold;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;';
        overviewBtn.textContent = '返回总览';
        overviewBtn.onclick = function() { renderOverview(); };
        btnArea.appendChild(overviewBtn);

        container.appendChild(btnArea);
    }

    // ===== renderZoneComplete：已完成区域回顾 =====
    function renderZoneComplete(zoneIndex) {
        var zone = projectData.zones[zoneIndex];
        var state = zoneStates[zone.id];

        container.innerHTML = '';
        container.style.cssText = 'padding:0;max-width:400px;margin:0 auto;overflow-y:auto;max-height:calc(100vh - 60px);-webkit-overflow-scrolling:touch;';

        // --- 顶部横幅 ---
        var banner = document.createElement('div');
        banner.style.cssText = 'text-align:center;padding:20px 16px 16px;background:' + zone.bgGradient + ';border-radius:0 0 24px 24px;';
        var starsHtml = '';
        for (var s = 0; s < 3; s++) {
            starsHtml += '<span style="font-size:28px;' + (s < state.stars ? '' : 'opacity:0.3;') + '">' + (s < state.stars ? '⭐' : '☆') + '</span>';
        }
        banner.innerHTML =
            '<div style="font-size:28px;margin-bottom:4px;">' + zone.emoji + '</div>' +
            '<div style="font-size:18px;font-weight:bold;color:#333;margin-bottom:6px;">' + zone.name + '</div>' +
            '<div>' + starsHtml + '</div>' +
            '<div style="font-size:12px;color:rgba(0,0,0,0.45);margin-top:4px;">收集了 ' + state.animals.length + ' 个动物</div>';
        container.appendChild(banner);

        // --- 动物卡片网格 ---
        var cardsWrap = document.createElement('div');
        cardsWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;padding:14px 16px 6px;justify-content:center;';
        for (var ai = 0; ai < state.animals.length; ai++) {
            var descForAnimal = ai < state.descriptions.length ? state.descriptions[ai] : '';
            cardsWrap.innerHTML += buildAnimalCard(state.animals[ai], false, descForAnimal);
        }
        for (var fi2 = 0; fi2 < state.failedAnimals.length; fi2++) {
            var failedAnimal2 = findAnimalById(zone, state.failedAnimals[fi2]);
            cardsWrap.innerHTML += buildAnimalCard(failedAnimal2, true, '');
        }
        container.appendChild(cardsWrap);

        // --- 返回按钮 ---
        var backWrap = document.createElement('div');
        backWrap.style.cssText = 'padding:14px 16px 24px;';
        var backBtn = document.createElement('button');
        backBtn.style.cssText = 'display:block;width:100%;padding:14px;border:2px solid #ddd;border-radius:14px;background:#fff;color:#888;font-size:14px;font-weight:bold;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;';
        backBtn.textContent = '← 返回总览';
        backBtn.onclick = function() { renderOverview(); };
        backWrap.appendChild(backBtn);
        container.appendChild(backWrap);
    }

    // ===== renderFinalPoster (v3 — 一屏海报，2×2网格，图片自适应大小，不滚动) =====
    function renderFinalPoster() {
        container.innerHTML = '';
        // 整个海报撑满屏幕，禁止滚动
        container.style.cssText = 'padding:0;max-width:414px;margin:0 auto;overflow:hidden;height:calc(100vh - 60px);display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;box-sizing:border-box;background:#fff;';

        var totalStars = 0;
        var maxStars = projectData.zones.length * 3;
        for (var i = 0; i < projectData.zones.length; i++) {
            var st = zoneStates[projectData.zones[i].id];
            totalStars += st.stars || 0;
        }
        var quality = totalStars >= maxStars ? 'perfect' : (totalStars >= maxStars * 0.6 ? 'good' : 'poor');
        var headerBg = quality === 'perfect' ? 'linear-gradient(135deg,#FFF8E1,#FFECB3)' : (quality === 'good' ? 'linear-gradient(135deg,#E3F2FD,#BBDEFB)' : 'linear-gradient(135deg,#f5f5f5,#e0e0e0)');

        // ---- 标题区（极紧凑单行：标题 + 星星 + 人名，一行搞定） ----
        var header = document.createElement('div');
        header.style.cssText = 'flex-shrink:0;text-align:center;padding:4px 8px 3px;background:' + headerBg + ';border-bottom:1px solid rgba(0,0,0,0.06);';
        var coverStars = '';
        for (var cs = 0; cs < maxStars; cs++) {
            coverStars += '<span style="font-size:11px;' + (cs >= totalStars ? 'opacity:0.25;' : '') + '">' + (cs < totalStars ? '⭐' : '☆') + '</span>';
        }
        header.innerHTML =
            '<div style="display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;gap:6px;line-height:1.4;">' +
            '<span style="font-size:13px;font-weight:bold;color:#333;">' + (projectData.title || '我的动物园') + '</span>' +
            '<span>' + coverStars + '<span style="font-size:10px;color:#999;margin-left:2px;">' + totalStars + '/' + maxStars + '</span></span>' +
            '<span style="font-size:10px;color:#888;">' + nameA + '&' + nameB + '</span>' +
            '</div>';
        container.appendChild(header);

        // ---- 2×2 网格主体 ----
        var grid = document.createElement('div');
        grid.style.cssText = 'flex:1;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-webkit-flex-wrap:wrap;flex-wrap:wrap;overflow:hidden;';

        for (var j = 0; j < projectData.zones.length; j++) {
            var zone = projectData.zones[j];
            var state = zoneStates[zone.id];

            // 每格占 50% 宽、50% 高
            var cell = document.createElement('div');
            cell.style.cssText = 'width:50%;height:50%;box-sizing:border-box;border-right:' + (j % 2 === 0 ? '1px solid rgba(0,0,0,0.07)' : 'none') + ';border-bottom:' + (j < 2 ? '1px solid rgba(0,0,0,0.07)' : 'none') + ';background:' + zone.bgGradient + ';display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;overflow:hidden;padding:4px 4px 3px;box-sizing:border-box;';

            // 区域标题行：emoji + 名字 + 星星（一行）
            var zStarsHtml = '';
            for (var zs = 0; zs < 3; zs++) {
                zStarsHtml += '<span style="font-size:10px;' + (zs >= state.stars ? 'opacity:0.2;' : '') + '">' + (zs < state.stars ? '⭐' : '☆') + '</span>';
            }
            var zoneHeader = document.createElement('div');
            zoneHeader.style.cssText = 'display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;flex-shrink:0;padding:0 1px;line-height:1.3;';
            zoneHeader.innerHTML =
                '<span style="font-size:12px;">' + zone.emoji + '</span>' +
                '<span style="font-size:10px;font-weight:bold;color:#333;margin-left:2px;flex:1;">' + zone.name + '</span>' +
                '<span>' + zStarsHtml + '</span>';
            cell.appendChild(zoneHeader);

            // 动物网格区（成功的+失败的）
            var animalGrid = document.createElement('div');
            animalGrid.style.cssText = 'flex:1;display:-webkit-box;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;overflow:hidden;padding:3px 2px 2px;';

            // 根据动物总数自适应图片尺寸和字号
            var totalCount = state.animals.length + state.failedAnimals.length;
            var imgSizePx, wordSizePx, gapPx;
            if (totalCount <= 1) {
                imgSizePx = 84; wordSizePx = 13; gapPx = 0;
            } else if (totalCount <= 2) {
                imgSizePx = 64; wordSizePx = 12; gapPx = 4;
            } else if (totalCount <= 3) {
                imgSizePx = 52; wordSizePx = 11; gapPx = 3;
            } else if (totalCount <= 4) {
                imgSizePx = 46; wordSizePx = 10; gapPx = 3;
            } else {
                imgSizePx = 40; wordSizePx = 10; gapPx = 2;
            }
            var imgSize = imgSizePx + 'px';
            var wordSize = wordSizePx + 'px';
            var itemMargin = gapPx + 'px';

            // 成功动物
            for (var ai = 0; ai < state.animals.length; ai++) {
                var anim = state.animals[ai];
                var animalItem = document.createElement('div');
                animalItem.style.cssText = 'display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center;margin:' + itemMargin + ';';
                var imgHtml = '<div style="width:' + imgSize + ';height:' + imgSize + ';background:rgba(255,255,255,0.7);border-radius:8px;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;">' +
                    '<img src="' + anim.image + '" style="width:' + imgSize + ';height:' + imgSize + ';object-fit:contain;border-radius:8px;"></div>';
                var wordHtml = '<div style="font-size:' + wordSize + ';color:#333;font-weight:bold;text-align:center;line-height:1.2;width:' + imgSize + ';overflow:hidden;white-space:nowrap;">' + anim.word + '</div>';
                animalItem.innerHTML = imgHtml + wordHtml;
                animalGrid.appendChild(animalItem);
            }

            // 失败动物（灰色剪影，占同等大小位置）
            for (var fi2 = 0; fi2 < state.failedAnimals.length; fi2++) {
                var fAnimal = findAnimalById(zone, state.failedAnimals[fi2]);
                if (!fAnimal) { continue; }
                var failItem = document.createElement('div');
                failItem.style.cssText = 'display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center;margin:' + itemMargin + ';';
                var fImgHtml = '<div style="width:' + imgSize + ';height:' + imgSize + ';background:rgba(255,255,255,0.5);border-radius:8px;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;">' +
                    '<img src="' + fAnimal.image + '" style="width:' + imgSize + ';height:' + imgSize + ';object-fit:contain;border-radius:8px;-webkit-filter:grayscale(100%);filter:grayscale(100%);opacity:0.35;"></div>';
                var fWordHtml = '<div style="font-size:' + wordSize + ';color:#bbb;font-weight:bold;text-align:center;line-height:1.2;width:' + imgSize + ';overflow:hidden;white-space:nowrap;">' + fAnimal.word + '</div>';
                failItem.innerHTML = fImgHtml + fWordHtml;
                animalGrid.appendChild(failItem);
            }

            // 如果该区域没有任何动物
            if (state.animals.length === 0 && state.failedAnimals.length === 0) {
                animalGrid.innerHTML = '<div style="font-size:10px;color:#aaa;text-align:center;">下次加油</div>';
            }

            cell.appendChild(animalGrid);
            grid.appendChild(cell);
        }

        container.appendChild(grid);

        // ---- 底部按钮区（一行三个，高度固定） ----
        var btnBar = document.createElement('div');
        btnBar.style.cssText = 'flex-shrink:0;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;gap:6px;padding:5px 8px;background:#fafafa;border-top:1px solid rgba(0,0,0,0.07);height:44px;box-sizing:border-box;';

        // 朗读按钮
        var ttsBtn = document.createElement('button');
        ttsBtn.style.cssText = 'flex:1;height:34px;border:none;border-radius:10px;background:#E3F2FD;color:#1565C0;font-size:12px;font-weight:bold;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;';
        ttsBtn.textContent = '🔊 朗读';
        ttsBtn.onclick = function() {
            var texts = [];
            for (var i = 0; i < projectData.zones.length; i++) {
                var st2 = zoneStates[projectData.zones[i].id];
                for (var d = 0; d < st2.descriptions.length; d++) { texts.push(st2.descriptions[d]); }
                for (var ss = 0; ss < st2.sentences.length; ss++) { texts.push(st2.sentences[ss]); }
            }
            var idx = 0;
            function speakNext() {
                if (idx >= texts.length) { return; }
                if (window.speechSynthesis) {
                    var utt = new SpeechSynthesisUtterance(texts[idx]);
                    utt.lang = 'en-US';
                    idx++;
                    utt.onend = function() { speakNext(); };
                    window.speechSynthesis.speak(utt);
                }
            }
            speakNext();
        };

        // 自评按钮 → 弹出overlay
        var selfBtn = document.createElement('button');
        selfBtn.style.cssText = 'flex:1;height:34px;border:none;border-radius:10px;background:#FFF9C4;color:#F57F17;font-size:12px;font-weight:bold;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;';
        selfBtn.textContent = '⭐ 自评';
        selfBtn.onclick = function() {
            // 构建自评弹窗overlay
            var overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.45);display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;z-index:9999;';
            var modal = document.createElement('div');
            modal.style.cssText = 'background:#fff;border-radius:18px;padding:20px 24px 18px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.2);min-width:240px;';
            modal.innerHTML = '<div style="font-size:15px;font-weight:bold;color:#333;margin-bottom:6px;">给自己打分</div><div style="font-size:12px;color:#999;margin-bottom:14px;">' + nameA + ' & ' + nameB + ' 今天表现如何？</div>';
            var selfStars = document.createElement('div');
            selfStars.style.cssText = 'display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;gap:8px;margin-bottom:16px;';
            for (var ss2 = 1; ss2 <= 5; ss2++) {
                (function(starNum) {
                    var starBtn = document.createElement('span');
                    starBtn.style.cssText = 'font-size:36px;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;';
                    starBtn.textContent = '☆';
                    starBtn.onclick = function() {
                        var all = selfStars.querySelectorAll('span');
                        for (var x = 0; x < all.length; x++) {
                            all[x].textContent = x < starNum ? '⭐' : '☆';
                        }
                    };
                    selfStars.appendChild(starBtn);
                })(ss2);
            }
            modal.appendChild(selfStars);
            var closeBtn = document.createElement('button');
            closeBtn.style.cssText = 'width:100%;padding:10px;border:none;border-radius:12px;background:#58cc02;color:#fff;font-size:14px;font-weight:bold;cursor:pointer;';
            closeBtn.textContent = '确定';
            closeBtn.onclick = function() { document.body.removeChild(overlay); };
            modal.appendChild(closeBtn);
            overlay.appendChild(modal);
            overlay.onclick = function(e) { if (e.target === overlay) { document.body.removeChild(overlay); } };
            document.body.appendChild(overlay);
        };

        // 再玩按钮
        var againBtn = document.createElement('button');
        againBtn.style.cssText = 'flex:1;height:34px;border:none;border-radius:10px;background:linear-gradient(135deg,#58cc02,#46a302);color:#fff;font-size:12px;font-weight:bold;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;';
        againBtn.textContent = '🔄 再玩';
        againBtn.onclick = function() {
            for (var i = 0; i < projectData.zones.length; i++) {
                var z = projectData.zones[i];
                zoneStates[z.id] = {
                    animals: [], failedAnimals: [], descriptions: [], sentences: [],
                    stars: 0, errors: 0, completed: false,
                    _phase: 'story', _isATurn: true
                };
            }
            renderWelcome();
        };

        btnBar.appendChild(ttsBtn);
        btnBar.appendChild(selfBtn);
        btnBar.appendChild(againBtn);
        container.appendChild(btnBar);

        try {
            var saveData = { totalStars: totalStars, nameA: nameA, nameB: nameB, date: new Date().toISOString() };
            localStorage.setItem('project_result_' + projectData.id, JSON.stringify(saveData));
        } catch(e) {}
    }

    // ===== 启动 =====
    renderWelcome();

}

// 暴露全局
window.adventureState = null; // 让 app.js 能检测冒险模式
window.initAdventureState = initAdventureState;
window.showAdventureMap = showAdventureMap;
window.enterStation = enterStation;
window.showStationIntro = showStationIntro;
window.renderCoopQuestion = renderCoopQuestion;
window.onStepAComplete = onStepAComplete;
window.onStepBComplete = onStepBComplete;
window.backToAdventureMap = backToAdventureMap;
window.backToModuleSelect = backToModuleSelect;
window.showProjectScreen = showProjectScreen;
window.updateProjectLockState = updateProjectLockState;
window.onProjectCardClick = onProjectCardClick;
window.adventureState = adventureState;

console.log('🗺️ Adventure System: Loaded v131');
