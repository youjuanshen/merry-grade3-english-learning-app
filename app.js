// Safe console wrapper: prevent console.log from crashing in any environment
(function(){var o=console.log,w=console.warn,e=console.error;console.log=function(){try{o.apply(console,arguments)}catch(x){}};console.warn=function(){try{w.apply(console,arguments)}catch(x){}};console.error=function(){try{e.apply(console,arguments)}catch(x){}};})();

const students = [
  '1. 张宇豪', '2. 张佳寒', '3. 张睿渊', '4. 张羽韬', '5. 张美茹',
  '6. 张嘉钦', '7. 卢梦婷', '8. 张悦萱', '9. 张语涵', '10. 张英豪',
  '11. 张志鹏', '12. 张智杰', '13. 张梓婷', '14. 张品琪', '15. 张诺依',
  '16. 张雨泽', '17. 张依彤', '18. 张艺楠', '19. 张思彤', '20. 张子豪',
  '21. 张梓亦', '22. 张皓鑫', '23. 张雨欣', '24. 张如欣', '25. 张柏涵',
  '26. 张梓纯', '27. 张泽鑫'
];

let selectedStudents = [];
let players = [];
let currentPlayerIndex = 0;
let currentQuestionIndex = 0;
let isAnimating = false;
var savedPretestSnapshot = null; // 保存前测结束时的数据快照，防止实战数据覆盖

// Welcome Screen Logic - 点击开始 → 音乐 → 3,2,1倒计时
document.addEventListener('DOMContentLoaded', function() {
    var welcomeScreen = document.getElementById('welcome-screen');
    var loginScreen = document.getElementById('login-screen');
    var countdownEl = document.getElementById('countdown');
    var startBtn = document.getElementById('welcome-start-btn');

    if (welcomeScreen && loginScreen && countdownEl && startBtn) {
        startBtn.onclick = function() {
            // 解锁 iOS 音频
            if (window.SoundSystem) SoundSystem.resume();

            // 直接跳转到登录页（省掉3-2-1倒计时，节省课堂时间）
            welcomeScreen.style.opacity = '0';
            setTimeout(function() {
                welcomeScreen.classList.remove('active');
                loginScreen.classList.add('active');
            }, 400);
        };
    }

    // Load current lesson from LocalStorage (sync) + Cloud (async fallback)
    function applyLessonDisplay(lesson) {
        if (lesson && lesson.displayName) {
            var courseInfoDisplay = document.getElementById('course-info-display');
            var displayLessonTitle = document.getElementById('display-lesson-title');
            var displayModuleTitle = document.getElementById('display-module-title');
            if (courseInfoDisplay && displayLessonTitle && displayModuleTitle) {
                displayLessonTitle.textContent = lesson.displayName.split('-')[0].trim();
                displayModuleTitle.textContent = lesson.displayName.split('-')[1] ? lesson.displayName.split('-')[1].trim() : '听力';
                courseInfoDisplay.style.display = 'block';
            }
        }
    }
    // 先用本地缓存立即显示
    var localLesson = Sync.getCurrentLessonOnceSync ? Sync.getCurrentLessonOnceSync() : null;
    applyLessonDisplay(localLesson);
    // 再异步从云端更新（不阻塞页面）
    Sync.getCurrentLessonOnce().then(applyLessonDisplay);
});

// 计时器相关
let questionTimer = null;
let timeLeft = 0;
let currentTimeLimit = 0; // 0=不限时，学生答完点下一题
const DEFAULT_TIME_LIMIT = 0;

// ========== 自适应难度系统 ==========
// 前测统计（用于计算学生水平）
let pretestStats = {
    player1: { correct: 0, total: 0, totalTime: 0, wrongWords: [] },
    player2: { correct: 0, total: 0, totalTime: 0, wrongWords: [] }
};
let questionStartTime = 0; // 每题开始时间

// 学生水平等级：A=基础好, B=基础中等, C=基础薄弱
let studentLevel = 'B'; // 默认中等

// 动态难度调整
let consecutiveCorrect = 0; // 连续答对次数
let consecutiveWrong = 0;   // 连续答错次数
let currentDifficulty = 'medium'; // easy/medium/hard

// 根据 Bloom Mastery Learning 理论设置阈值
const MASTERY_THRESHOLD = 0.8;  // 80%正确率为掌握
const STRUGGLE_THRESHOLD = 0.6; // 60%以下为薄弱
const FAST_TIME_RATIO = 0.5;    // 标准时间的50%以内算快
const SLOW_TIME_RATIO = 1.5;    // 标准时间的150%以上算慢

// Student <-> Teacher Sync
let lastTeacherCommandTime = 0;

Sync.listenTeacherCommand((cmd) => {
    if (cmd && cmd.timestamp > lastTeacherCommandTime) {
        lastTeacherCommandTime = cmd.timestamp;
        handleTeacherCommand(cmd);
    }
});

// 有效的模块和阶段
const VALID_MODULES = ['listening', 'reading', 'writing', 'speaking'];
const VALID_PHASES = ['pretest', 'practice'];

function handleTeacherCommand(cmd) {
    // 输入验证
    if (!cmd || typeof cmd !== 'object') return;

    // 学生自选模式下，忽略教师同步（防止覆盖学生选择）
    // 但 navigate 命令例外——教师一键跳转必须生效
    if (studentSelfSelectMode && cmd.action !== 'navigate') {
        console.log('[Sync] 学生自选模式，跳过教师命令:', cmd.action);
        return;
    }

    if (cmd.action === 'start') {
        // 验证模块和阶段
        if (!VALID_MODULES.includes(cmd.module)) {
            console.error('Invalid module:', cmd.module);
            return;
        }
        if (!VALID_PHASES.includes(cmd.phase)) {
            console.error('Invalid phase:', cmd.phase);
            return;
        }

        var oldPhase = currentPhase;
        // 始终保存教师设置的模块和阶段（无论学生端处于什么状态）
        currentModule = cmd.module;
        currentPhase = cmd.phase;
        currentTimeLimit = Math.max(0, Math.min(300, cmd.timeLimit || 0));

        // 根据教师选择的课程加载对应数据
        if (cmd.lesson) {
            var match = String(cmd.lesson).match(/U(\d+)L(\d+)/i);
            if (match) {
                var u = parseInt(match[1]), l = parseInt(match[2]);
                var varName = (u === 1 && l === 1) ? 'lesson1' : 'unit' + u + '_lesson' + l;
                if (window[varName]) {
                    currentLessonData = window[varName];
                }
            }
        }

        console.log('教师命令: 课程=' + (cmd.lesson || '未知') + ', 模块=' + currentModule + ', 阶段=' + currentPhase);

        // 更新UI显示当前模块
        const displayModuleTitle = document.getElementById('display-module-title');
        if (displayModuleTitle) {
            const moduleNames = { listening: '听力', reading: '阅读', writing: '写作', speaking: '口语' };
            displayModuleTitle.textContent = moduleNames[currentModule] || '听力';
        }

        const modScreen = document.getElementById('module-screen');
        const gameScreen = document.getElementById('game-screen');

        // 教师从前测切换到实战：强制跳转（无论学生在什么界面）
        if (oldPhase === 'pretest' && currentPhase === 'practice' && gameScreen.classList.contains('active')) {
            // 保存当前前测进度（即使没做完）
            syncStudentProgress(true);
            calculateStudentLevel();
            // 显示过渡动画后自动开始实战
            forceStartPractice();
            return;
        }

        // 新方案：教师指令也走冒险模式
        if (modScreen.classList.contains('active') || gameScreen.classList.contains('active')) {
            document.getElementById('login-screen').classList.remove('active');
            gameScreen.classList.remove('active');
            modScreen.style.display = '';
            modScreen.classList.add('active');
        }
        // 如果在登录界面，教师命令已保存，学生选择完成后会使用这些设置
    } else if (cmd.action === 'navigate') {
        // 教师一键跳转：让所有学生设备跳到指定模块的冒险地图
        if (!VALID_MODULES.includes(cmd.module)) {
            console.error('[Sync] navigate: invalid module', cmd.module);
            return;
        }
        console.log('[Sync] 教师跳转指令: 模块=' + cmd.module);
        // 重置自选模式，允许教师覆盖
        if (typeof studentSelfSelectMode !== 'undefined') {
            studentSelfSelectMode = false;
        }
        // showAdventureMap 在 adventure.js 中定义，已挂载到 window
        if (typeof window.showAdventureMap === 'function') {
            window.showAdventureMap(cmd.module);
        } else {
            console.warn('[Sync] showAdventureMap 未就绪');
        }
    } else if (cmd.action === 'pause') {
        alert('👩‍🏫 老师已暂停活动，请注意听讲！');
    }
}

function syncStudentProgress(isComplete = false) {
    if (!players || players.length === 0) return;
    
    const p1 = players[0];
    const p2 = players[1];
    
    // Extract ID (e.g. "1. 张宇豪" -> 1)
    const id1Match = p1.name.match(/^(\d+)/);
    const id1 = id1Match ? parseInt(id1Match[1]) : 0;
    const name1 = p1.name.replace(/^\d+\.\s*/, '');
    
    let id2 = null, name2 = null;
    if (p2) {
        const id2Match = p2.name.match(/^(\d+)/);
        id2 = id2Match ? parseInt(id2Match[1]) : 0;
        name2 = p2.name.replace(/^\d+\.\s*/, '');
    }
    
    const progressData = {
        studentId: id1,
        studentName: name1,
        partnerId: id2,
        partnerName: name2,
        module: currentModule,
        phase: currentPhase,
        currentQuestion: Math.min(currentQuestionIndex + 1, moduleQuestions.length),
        totalQuestions: moduleQuestions.length,
        stars: p1.stars + (p2 ? p2.stars : 0),
        completed: isComplete,
        timestamp: Date.now(),
        // Add detailed stats for Teacher Dashboard
        correct: pretestStats.player1.correct + (id2 ? pretestStats.player2.correct : 0) + p1.correct + (p2 ? p2.correct : 0),
        totalAnswered: pretestStats.player1.total + (id2 ? pretestStats.player2.total : 0) + p1.total + (p2 ? p2.total : 0),
        wrongWords: [...new Set([...pretestStats.player1.wrongWords, ...(id2 ? pretestStats.player2.wrongWords : [])])]
    };
    
    if (id1) Sync.setDashboardData(`studentProgress_${id1}`, progressData);
    if (id2) {
        const progressData2 = {
            ...progressData,
            studentId: id2,
            studentName: name2,
            partnerId: id1,
            partnerName: name1
        };
        Sync.setDashboardData(`studentProgress_${id2}`, progressData2);
    }

    // ===== 飞书数据同步：前测或实战完成时发送到腾讯云函数 → 飞书多维表格 =====
    if (isComplete && name1) {
        var lessonTitle = (currentLessonData && currentLessonData.title) ? currentLessonData.title : '';
        var lessonId = (currentLessonData && currentLessonData.id) ? currentLessonData.id : '';
        var phaseStr = currentPhase === 'practice' ? '实战' : '前测';
        var scfUrl = 'https://1316992450-2fbeeh6iet.ap-guangzhou.tencentscf.com/';

        function sendOneRecord(studentName, stats) {
            var correct = stats.correct || 0;
            var total = stats.total || 0;
            var acc = total > 0 ? Math.round((correct / total) * 100) : 0;
            var totalMs = stats.totalTime || 0;
            var totalSec = Math.round(totalMs / 1000);
            var minU = Math.floor(totalSec / 60);
            var secU = totalSec % 60;
            var dur = minU > 0 ? minU + '分' + secU + '秒' : secU + '秒';
            var words = (stats.wrongWords || []).join(', ');

            var payload = {
                studentName: studentName,
                timestamp: Date.now(),
                examType: currentModule,
                score: correct,
                maxScore: total,
                accuracy: acc,
                duration: dur,
                phase: phaseStr,
                wrongWords: words,
                lessonTitle: lessonId + ' ' + lessonTitle,
                listeningScore: currentModule === 'listening' ? correct : 0,
                readingScore: currentModule === 'reading' ? correct : 0,
                writingScore: currentModule === 'writing' ? correct : 0,
                speakingScore: currentModule === 'speaking' ? correct : 0
            };

            scfPost(payload).then(function() {
                console.log('[飞书] ' + studentName + ' ' + phaseStr + ' 成绩已提交');
            }).catch(function() {
                console.warn('[飞书] ' + studentName + ' 提交失败');
            });
        }

        console.log('[飞书调试] currentPhase=' + currentPhase + ', name1=' + name1 + ', name2=' + name2);
        console.log('[飞书调试] player2 stats:', JSON.stringify(pretestStats.player2));

        if (currentPhase === 'practice') {
            // 实战：一组一行（两人合作）
            // 用实战期间的数据（当前pretestStats减去保存的前测数据）
            var practiceStats = {
                correct: pretestStats.player1.correct - (savedPretestSnapshot && savedPretestSnapshot.player1 ? savedPretestSnapshot.player1.correct : 0),
                total: pretestStats.player1.total - (savedPretestSnapshot && savedPretestSnapshot.player1 ? savedPretestSnapshot.player1.total : 0),
                totalTime: pretestStats.player1.totalTime - (savedPretestSnapshot && savedPretestSnapshot.player1 ? savedPretestSnapshot.player1.totalTime : 0),
                wrongWords: pretestStats.player1.wrongWords || []
            };
            // 防止负数
            if (practiceStats.correct < 0) practiceStats.correct = pretestStats.player1.correct;
            if (practiceStats.total < 0) practiceStats.total = pretestStats.player1.total;

            var groupName = name1 + (name2 ? ' & ' + name2 : '');
            console.log('[飞书] 实战模式，发1行: ' + groupName);
            sendOneRecord(groupName, practiceStats);
        } else {
            // 前测：每人一行（各答各的，数据不同）
            console.log('[飞书] 前测模式，发2行: ' + name1 + ' 和 ' + name2);
            sendOneRecord(name1, pretestStats.player1);
            if (name2) {
                // 延迟500ms发第二条，避免云函数并发冲突
                setTimeout(function() {
                    console.log('[飞书] 发送第2行(延迟): ' + name2);
                    sendOneRecord(name2, pretestStats.player2);
                }, 500);
            } else {
                console.warn('[飞书] name2 为空，只发了1行！');
            }
        }
    }
}

// Module Control
let currentModule = 'listening';
let currentPhase = 'practice'; // 取消前测，直接实战
let currentLessonData = (typeof lesson1 !== 'undefined') ? lesson1 : null;
let moduleQuestions = [];

// Professional hints - Duolingo style (不直接给答案，引导思考)
// 分层提示：Level 1 = 轻提示, Level 2 = 更多提示, Level 3 = 查书提示

// 提示设计原则：
// - 操作指示用中文（学生看得懂）
// - 知识点用英文（测试是否掌握）
const hintData = {
    // ===== 动物单词 Animals =====
    'bear': {
        level1: 'b___',
        level2: 'bear',
        level3: '请查书第2页'
    },
    'horse': {
        level1: 'h____',
        level2: 'horse',
        level3: '请查书第2页'
    },
    'bird': {
        level1: 'b___',
        level2: 'bird',
        level3: '请查书第2页'
    },
    'panda': {
        level1: 'p____',
        level2: 'panda',
        level3: '请查书第3页'
    },
    'animal': {
        level1: 'a_____',
        level2: 'animal',
        level3: '请查书第2页'
    },

    // ===== 形容词 Adjectives =====
    'big': {
        level1: 'b__',
        level2: 'big',
        level3: '请查书第5页'
    },
    'cute': {
        level1: 'c___',
        level2: 'cute',
        level3: '请查书第5页'
    },
    'fast': {
        level1: 'f___',
        level2: 'fast',
        level3: '请查书第5页'
    },

    // ===== This/That 句型 =====
    'This is a bear.': {
        level1: 'This / That ?',
        level2: 'This is a ___.',
        level3: '近的用This，远的用That'
    },
    'That is a horse.': {
        level1: 'This / That ?',
        level2: 'That is a ___.',
        level3: '近的用This，远的用That'
    },
    'This is a bird.': {
        level1: 'This / That ?',
        level2: 'This is a ___.',
        level3: '近的用This，远的用That'
    },
    'That is a panda.': {
        level1: 'This / That ?',
        level2: 'That is a ___.',
        level3: '近的用This，远的用That'
    },

    // ===== It's 句型 =====
    "It's big.": {
        level1: "It's ___.",
        level2: 'big / small ?',
        level3: '请查书第5页'
    },
    "It's cute.": {
        level1: "It's ___.",
        level2: 'cute',
        level3: '请查书第5页'
    },
    'It can run fast.': {
        level1: 'It can ___ fast.',
        level2: 'run',
        level3: '请查书第5页'
    },

    // ===== 组合句子 =====
    "This is a bear. It's big.": {
        level1: 'bear + big',
        level2: 'This is a bear.',
        level3: '两句话：这是熊 + 它很大'
    },
    "That is a panda. It's cute.": {
        level1: 'panda + cute',
        level2: 'That is a panda.',
        level3: '两句话：那是熊猫 + 它很可爱'
    },
    'This is a horse. It can run fast.': {
        level1: 'horse + fast',
        level2: 'This is a horse.',
        level3: '两句话：这是马 + 它跑得快'
    },

    // ===== 听力排序 =====
    'bear, bird': {
        level1: '先听到哪个？',
        level2: 'bear → bird',
        level3: '请两人一起商量'
    },
    'horse, panda': {
        level1: '先听到哪个？',
        level2: 'horse → panda',
        level3: '请两人一起商量'
    },
    'bird, bear, panda': {
        level1: '顺序：1, 2, 3',
        level2: 'bird → bear → panda',
        level3: '请两人一起商量'
    },
    'panda, horse, bird': {
        level1: '顺序：1, 2, 3',
        level2: 'panda → horse → bird',
        level3: '请两人一起商量'
    }
};

// Track wrong attempts per question
let wrongAttempts = 0;

function getHint(word) {
    const hints = hintData[word];
    if (!hints) return '';

    // 根据错误次数给不同级别的提示
    if (wrongAttempts === 0) {
        return hints.level1;
    } else if (wrongAttempts === 1) {
        return hints.level2;
    } else {
        return hints.level3;
    }
}

function resetHintLevel() {
    wrongAttempts = 0;
}

function increaseHintLevel() {
    wrongAttempts = Math.min(wrongAttempts + 1, 2);
}

// Keep for backward compatibility
function getEnglishHint(english) {
    return getHint(english);
}

function getChineseHint(english) {
    // 不再使用中文提示
    return '';
}

// Web Audio API for sound effects
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playTone(freq, type, duration, vol = 0.1) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playSuccessSound() {
    playTone(523.25, 'sine', 0.1); // C5
    setTimeout(() => playTone(659.25, 'sine', 0.2), 100); // E5
    setTimeout(() => playTone(783.99, 'sine', 0.3), 200); // G5
}

function playWrongSound() {
    playTone(300, 'sawtooth', 0.2);
    playTone(250, 'sawtooth', 0.3);
}

// Voice encouragement - English like Duolingo
const successPhrases = ['Great!', 'Awesome!', 'Good job!', 'Perfect!', 'Well done!', 'Excellent!'];
const tryAgainPhrases = ['Try again!', 'Almost!', 'Keep going!', 'You can do it!'];

function speakEncouragement(isCorrect) {
    if ('speechSynthesis' in window) {
        const phrases = isCorrect ? successPhrases : tryAgainPhrases;
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        const utterance = new SpeechSynthesisUtterance(phrase);
        utterance.lang = 'en-US';
        utterance.rate = 1.0;
        window.speechSynthesis.cancel(); // Chrome bug：先 cancel 再 speak，防止卡死
        window.speechSynthesis.speak(utterance);
    }
}

// Show floating feedback text (中文显示，配合英文语音)
// 语音说英文，屏幕显示中文翻译，让学生知道英文意思
// 多邻国风格鼓励语（更丰富、更有趣）
const feedbackMap = {
    success: [
        { en: 'Correct!', cn: '答对了！' },
        { en: 'Right!', cn: '正确！' },
        { en: 'Good!', cn: '不错！' },
        { en: 'Nice!', cn: '很好！' },
        { en: 'Well done!', cn: '做得好！' },
        { en: 'Yes!', cn: '没错！' }
    ],
    encourage: [
        { en: 'Try again!', cn: '再想想！' },
        { en: 'Almost!', cn: '差一点！' },
        { en: 'Not quite.', cn: '不太对哦' },
        { en: 'Keep trying!', cn: '再试试！' }
    ],
    // 连击专用鼓励语
    combo: [
        { en: 'On fire!', cn: '火力全开！' },
        { en: 'Unstoppable!', cn: '势不可挡！' },
        { en: 'Keep it up!', cn: '保持下去！' },
        { en: 'You\'re on a roll!', cn: '状态爆棚！' }
    ]
};

function showFeedbackText(isCorrect) {
    let list, item;

    // 连击时使用特殊鼓励语
    if (isCorrect && consecutiveCorrect >= 2) {
        // 混合使用普通成功语和连击语
        if (Math.random() > 0.5) {
            list = feedbackMap.combo;
        } else {
            list = feedbackMap.success;
        }
    } else {
        list = isCorrect ? feedbackMap.success : feedbackMap.encourage;
    }

    item = list[Math.floor(Math.random() * list.length)];

    const feedback = document.createElement('div');
    feedback.className = 'floating-feedback ' + (isCorrect ? 'success' : 'encourage');
    feedback.textContent = item.cn;
    document.body.appendChild(feedback);

    // 如果是连击，显示连击数
    if (isCorrect && consecutiveCorrect >= 2) {
        showComboIndicator(consecutiveCorrect);
    }

    setTimeout(() => {
        if (document.body.contains(feedback)) {
            document.body.removeChild(feedback);
        }
    }, 1500);
}

// 显示连击Combo指示器
function showComboIndicator(count) {
    // 移除旧的连击指示器
    const oldCombo = document.getElementById('combo-indicator');
    if (oldCombo) oldCombo.remove();

    const combo = document.createElement('div');
    combo.id = 'combo-indicator';
    combo.className = 'combo-indicator';
    combo.innerHTML = `<span class="combo-fire">🔥</span> 连击 x ${count}`;
    document.body.appendChild(combo);

    setTimeout(() => {
        if (document.body.contains(combo)) {
            combo.classList.add('fade-out');
            setTimeout(() => combo.remove(), 300);
        }
    }, 2000);
}

// 语音鼓励（说英文）
// 语音鼓励（说英文）
function speakFeedback(isCorrect) {
    if ('speechSynthesis' in window) {
        const list = isCorrect ? feedbackMap.success : feedbackMap.encourage;
        const item = list[Math.floor(Math.random() * list.length)];
        const utterance = new SpeechSynthesisUtterance(item.en);
        utterance.lang = 'en-US';
        utterance.rate = 1.0;
        window.speechSynthesis.cancel(); // Chrome bug：先 cancel 再 speak，防止卡死
        window.speechSynthesis.speak(utterance);
    }
}

// ===== TTS 音频播放（Web Audio API，iOS兼容）=====
// iOS Safari 的 HTMLAudioElement.play() 每次都需要用户手势，
// 但 AudioContext 只需解锁一次后就可以自由播放。
var _audioCtxTTS = null;
var _audioUnlocked = false;
var _ttsBufferCache = {}; // 缓存已解码的 AudioBuffer
var _pendingSpeak = null;

// 获取或创建 AudioContext
function _getAudioCtx() {
    if (!_audioCtxTTS) {
        var Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx) _audioCtxTTS = new Ctx();
    }
    return _audioCtxTTS;
}

// 第一次触摸解锁 AudioContext（iOS 必需）
function _unlockAudioOnTouch() {
    if (_audioUnlocked) return;
    var ctx = _getAudioCtx();
    if (!ctx) return;
    // iOS 要求在用户手势中 resume
    if (ctx.state === 'suspended') {
        ctx.resume();
    }
    // 播放一个极短的空 buffer 来彻底解锁
    try {
        var buf = ctx.createBuffer(1, 1, 22050);
        var src = ctx.createBufferSource();
        src.buffer = buf;
        src.connect(ctx.destination);
        src.start(0);
    } catch(e) {}
    _audioUnlocked = true;
    console.log('[Audio] AudioContext unlocked, state:', ctx.state);
    document.removeEventListener('touchstart', _unlockAudioOnTouch);
    document.removeEventListener('click', _unlockAudioOnTouch);
    // 播放等待中的请求
    if (_pendingSpeak) {
        var pending = _pendingSpeak;
        _pendingSpeak = null;
        speakWord(pending);
    }
}
document.addEventListener('touchstart', _unlockAudioOnTouch, false);
document.addEventListener('click', _unlockAudioOnTouch, false);

function speakWord(word) {
    if (!word) return;
    console.log('[TTS] speakWord:', word);

    // 非 localhost（GitHub Pages / 局域网 HTTPS）：直接用 speechSynthesis
    // 必须先判断，不能被 AudioContext.state 阻断
    var _ttsIsLocal = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (!_ttsIsLocal) {
        if (window.speechSynthesis) {
            // Chrome bug：speechSynthesis 长时间使用后会卡死，cancel() 后再 speak() 解决
            window.speechSynthesis.cancel();
            var utt = new SpeechSynthesisUtterance(word);
            utt.lang = 'en-US';
            utt.rate = 0.85;
            // iOS Safari：speechSynthesis.speak() 必须在用户手势同步回调中调用。
            // 自动播放（setTimeout/页面加载时）在 iOS 会静默失败。
            // 这里直接调用——点击播放按钮时会成功；页面自动播放时 iOS 会静默忽略，
            // 用户看到 🔊 按钮手动触发即可，行为可接受。
            window.speechSynthesis.speak(utt);
            console.log('[TTS] speechSynthesis:', word);
        } else {
            console.warn('[TTS] speechSynthesis not available');
        }
        return;
    }

    // localhost：走 AudioContext + 服务器 TTS
    var ctx = _getAudioCtx();
    if (!ctx) {
        console.warn('[TTS] no AudioContext');
        return;
    }
    // 如果还没解锁，缓存请求等解锁后播放
    if (ctx.state === 'suspended') {
        console.warn('[TTS] AudioContext suspended, queuing:', word);
        _pendingSpeak = word;
        return;
    }

    var key = word.toLowerCase().trim();

    // 已缓存：直接播放
    if (_ttsBufferCache[key]) {
        _playBuffer(_ttsBufferCache[key]);
        return;
    }

    // 请求服务器TTS音频
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/tts?text=' + encodeURIComponent(word), true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
        if (xhr.status !== 200) {
            console.error('[TTS] server error:', xhr.status);
            return;
        }
        ctx.decodeAudioData(xhr.response, function(buffer) {
            _ttsBufferCache[key] = buffer; // 缓存
            _playBuffer(buffer);
        }, function(err) {
            console.error('[TTS] decode error:', err);
        });
    };
    xhr.onerror = function() { console.error('[TTS] xhr error'); };
    xhr.send();
}

function _playBuffer(buffer) {
    var ctx = _getAudioCtx();
    if (!ctx) return;
    var source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
    console.log('[TTS] playing buffer, duration:', buffer.duration.toFixed(2) + 's');
}

// 给选项卡片内的图片添加白色背景（用Canvas去除透明PNG的马赛克效果）
function wrapImagesWithWhiteBg(container) {
    // 扩大选择范围：option-card、tf-image-container、以及其他可能的图片容器
    const images = container.querySelectorAll('.option-card img, .tf-image-container img, .question-image img, img[src*="png"], img[src*="PNG"]');
    images.forEach(img => {
        // 等图片加载完成后用Canvas处理
        const processImage = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.naturalWidth || 100;
            canvas.height = img.naturalHeight || 100;

            // 先填充白色背景
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 再绘制图片
            ctx.drawImage(img, 0, 0);

            // 替换原图片src
            img.src = canvas.toDataURL('image/png');
        };

        if (img.complete) {
            processImage();
        } else {
            img.onload = processImage;
        }
    });
}

// Render student list - 响应式分页
const studentPagesEl = document.getElementById('student-pages');
const pageDotsEl = document.getElementById('page-dots');

// 根据屏幕宽度计算每页学生数
function getStudentsPerPage() {
    const width = window.innerWidth;
    if (width >= 1000) return 30;      // iPad横屏: 6列x5行
    if (width >= 700) return 25;       // iPad竖屏: 5列x5行
    if (width >= 400) return 12;       // iPhone 6 Plus: 3列x4行
    return 12;                          // iPhone 6 Plus: 3列x4行 (默认也是12)
}

const STUDENTS_PER_PAGE = getStudentsPerPage();
const totalPages = Math.ceil(students.length / STUDENTS_PER_PAGE);

// 创建分页
for (let page = 0; page < totalPages; page++) {
    const pageEl = document.createElement('div');
    pageEl.className = 'student-page';

    const startIdx = page * STUDENTS_PER_PAGE;
    const endIdx = Math.min(startIdx + STUDENTS_PER_PAGE, students.length);

    for (let i = startIdx; i < endIdx; i++) {
        const name = students[i];
        const el = document.createElement('div');
        el.className = 'student-card';
        el.textContent = name; // 保留学号，如 "1. 张宇豪"
        el.onclick = () => toggleStudent(name, el);
        pageEl.appendChild(el);
    }

    studentPagesEl.appendChild(pageEl);

    // 创建页码点
    const dot = document.createElement('div');
    dot.className = 'page-dot' + (page === 0 ? ' active' : '');
    pageDotsEl.appendChild(dot);
}

// 监听滚动更新页码指示器
studentPagesEl.addEventListener('scroll', () => {
    const scrollLeft = studentPagesEl.scrollLeft;
    const pageWidth = studentPagesEl.offsetWidth;
    const currentPage = Math.round(scrollLeft / pageWidth);
    const dots = pageDotsEl.querySelectorAll('.page-dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentPage);
    });
});

const nextBtn = document.getElementById('next-btn');

function toggleStudent(name, el) {
    if (selectedStudents.includes(name)) {
        selectedStudents = selectedStudents.filter(n => n !== name);
        el.classList.remove('selected');
    } else {
        if (selectedStudents.length >= 2) return; // Max 2
        selectedStudents.push(name);
        el.classList.add('selected');
    }
    nextBtn.disabled = selectedStudents.length !== 2;
    
    // Update selected names display - 简洁风格，保留学号
    const selectedNamesEl = document.getElementById('selected-names');
    if (selectedNamesEl) {
        if (selectedStudents.length === 0) {
            selectedNamesEl.textContent = '______ 和 ______';
        } else if (selectedStudents.length === 1) {
            selectedNamesEl.textContent = `${selectedStudents[0]} 和 ______`;
        } else {
            selectedNamesEl.textContent = `${selectedStudents[0]} 和 ${selectedStudents[1]}`;
        }
    }
}

// 随机打乱数组（Fisher-Yates 洗牌算法）
function shuffleArray(arr) {
    var shuffled = arr.slice(); // 复制，不改原数组
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

// 实战每节课的最大题数（15分钟 ÷ 约40秒/题 ≈ 22题，取20题留余量）
var PRACTICE_MAX_QUESTIONS = 30;

// 从题目中提取考点（核心词汇/句子）—— 用于防止同一考点重复出题
function getTestPoint(q) {
    var text = (q.audio || q.word || q.sentence || q.text || q.expected || '').toLowerCase().trim();
    if (!text) return 'unknown_' + Math.random();

    // 单词/短语（≤3词）：直接作为考点
    if (text.split(' ').length <= 3) return text.replace(/[.!?,]/g, '').trim();

    // 句子：提取核心实词作为考点指纹
    var cleaned = text
        .replace(/[.!?,\"']/g, '')
        .replace(/^(this is |that is |these are |those are |it's |they are |i have |look!? |let's |is it |what'?s? |do you |can i |i want |i like |put on |we have )/gi, '');
    var stop = ['a','an','the','is','are','it','in','on','and','to','my','your','do','you','we','i','for','some','too','not','very','so','many','go','have','can','please','ok','yes','no'];
    var words = cleaned.split(/\s+/).filter(function(w) { return stop.indexOf(w) === -1 && w.length > 1; });
    return words.slice(0, 2).join(' ') || text.substring(0, 15);
}

function getQuestions(module, phase) {
    var allQuestions = currentLessonData[module][phase] || [];
    if (allQuestions.length === 0) return [];

    // Step 1: 打乱题库（每次练习不同组合）
    var shuffled = shuffleArray(allQuestions);

    // Step 2: 选题核心规则
    // 唯一铁律：同一考点 + 同一题型 = 禁止（这才是学生感觉"重复"的根源）
    // 同一考点 + 不同题型 = 允许不限次（bear听+bear读+bear写+bear说 = 4种角度练习，不算重复）

    var selected = [];
    var usedPointType = {};  // "bear|listen_select" → true

    shuffled.forEach(function(q) {
        if (selected.length >= PRACTICE_MAX_QUESTIONS) return;

        var tp = getTestPoint(q);
        var ptKey = tp + '|' + q.type;

        // 同考点+同题型已选过 → 跳过
        if (usedPointType[ptKey]) return;

        selected.push(q);
        usedPointType[ptKey] = true;
    });

    // Step 3: 按难度排序（easy → medium → hard），配合 i+1 自适应
    var diffVal = { easy: 0, medium: 1, hard: 2 };
    selected.sort(function(a, b) {
        return (diffVal[getQuestionDifficulty(a)] || 1) - (diffVal[getQuestionDifficulty(b)] || 1);
    });

    console.log('[选题] ' + module + ': 选出' + selected.length + '题，去掉' + (allQuestions.length - selected.length) + '题重复 (题库' + allQuestions.length + ')');
    return selected;
}

// 从题目中提取核心词汇（用于词汇多样性检测）
function extractQuestionVocab(q) {
    var text = (q.audio || q.word || q.sentence || q.text || '').toLowerCase().trim();
    if (!text) return '';
    // 单词/短语题：直接返回
    if (text.split(' ').length <= 2) return text;
    // 句子题：去掉框架词，取前3个实词
    var cleaned = text
        .replace(/^(this is |that is |these are |those are |it's |they are |i have |look!? |let's |is it |what'?s? |do you |can i |i want |i like |put on )/gi, '')
        .replace(/[.!?,\"']/g, '').trim();
    var stopWords = ['a','an','the','is','are','it','in','on','and','to','my','your','do','you','we','i','for','some','too','not','very','so','many','go','have','can'];
    var words = cleaned.split(/\s+/).filter(function(w) { return stopWords.indexOf(w) === -1 && w.length > 1; });
    return words.slice(0, 3).join(' ') || text.substring(0, 15);
}

// 按题型比例抽取，确保词汇多样性（同一词汇最多出现2次）
function selectPracticeQuestions(allQuestions, maxCount) {
    // 先打乱，保证每次练习不同
    var shuffled = shuffleArray(allQuestions);

    // 按词汇多样性筛选：同一核心词汇最多选2题
    var vocabCount = {};
    var diverse = [];
    var overflow = []; // 超出2次的备选
    for (var i = 0; i < shuffled.length; i++) {
        var vocab = extractQuestionVocab(shuffled[i]);
        var count = vocabCount[vocab] || 0;
        if (count < 2) {
            diverse.push(shuffled[i]);
            vocabCount[vocab] = count + 1;
        } else {
            overflow.push(shuffled[i]);
        }
    }

    // 从多样化池中按题型均衡选取
    var byType = {};
    for (var j = 0; j < diverse.length; j++) {
        var t = diverse[j].type || 'unknown';
        if (!byType[t]) byType[t] = [];
        byType[t].push(diverse[j]);
    }

    var types = Object.keys(byType);
    var selected = [];

    // 每种题型按比例分配名额
    for (var k = 0; k < types.length; k++) {
        var type = types[k];
        var pool = byType[type];
        var quota = Math.max(2, Math.round(maxCount * pool.length / diverse.length));

        // 按难度分层取样
        var easy = pool.filter(function(q) { return getQuestionDifficulty(q) === 'easy'; });
        var med = pool.filter(function(q) { return getQuestionDifficulty(q) === 'medium'; });
        var hard = pool.filter(function(q) { return getQuestionDifficulty(q) === 'hard'; });

        var picked = [];
        if (easy.length > 0) picked.push(easy[0]);
        if (med.length > 0) picked.push(med[0]);
        if (hard.length > 0) picked.push(hard[0]);

        var rest = pool.filter(function(q) { return picked.indexOf(q) === -1; });
        for (var r = 0; r < quota - picked.length && r < rest.length; r++) {
            picked.push(rest[r]);
        }
        selected = selected.concat(picked);
    }

    // 截断到 maxCount
    if (selected.length > maxCount) {
        selected = selected.slice(0, maxCount);
    }
    // 不足则从 overflow 补充
    if (selected.length < maxCount) {
        for (var m = 0; m < overflow.length && selected.length < maxCount; m++) {
            selected.push(overflow[m]);
        }
    }

    // 按难度排序：easy → medium → hard
    var diffVal = { easy: 0, medium: 1, hard: 2 };
    selected.sort(function(a, b) {
        return (diffVal[getQuestionDifficulty(a)] || 1) - (diffVal[getQuestionDifficulty(b)] || 1);
    });

    console.log('[i+1] 从 ' + allQuestions.length + ' 题中抽取 ' + selected.length + ' 题（' + types.join('/') + '）');
    return selected;
}

// 根据学生水平筛选题目
function filterQuestionsByLevel(questions, level) {
    // 基于 Krashen i+1 + Bloom Mastery Learning 的难度分配比例
    const difficultyMap = {
        'A': { easy: 0.2, medium: 0.3, hard: 0.5 },  // 基础好：hard为主（i+1 挑战）
        'B': { easy: 0.3, medium: 0.4, hard: 0.3 },  // 基础中等：均衡发展
        'C': { easy: 0.5, medium: 0.3, hard: 0.2 }   // 基础薄弱：easy为主（夯实基础）
    };

    const ratio = difficultyMap[level] || difficultyMap['B'];

    // 按难度分组
    const easy = questions.filter(q => q.difficulty === 'easy' || !q.difficulty);
    const medium = questions.filter(q => q.difficulty === 'medium');
    const hard = questions.filter(q => q.difficulty === 'hard');

    // 如果题目都没有难度标签，按索引位置推断难度
    if (medium.length === 0 && hard.length === 0) {
        const total = questions.length;
        const easyCount = Math.floor(total * 0.4);
        const mediumCount = Math.floor(total * 0.4);

        questions.forEach((q, i) => {
            if (i < easyCount) q.difficulty = 'easy';
            else if (i < easyCount + mediumCount) q.difficulty = 'medium';
            else q.difficulty = 'hard';
        });

        return filterQuestionsByLevel(questions, level);
    }

    // 根据比例选择题目
    const result = [];
    const targetCount = Math.min(30, questions.length); // 最多30题

    const easyTarget = Math.floor(targetCount * ratio.easy);
    const mediumTarget = Math.floor(targetCount * ratio.medium);
    const hardTarget = targetCount - easyTarget - mediumTarget;

    // 随机选择
    result.push(...shuffleArray(easy).slice(0, easyTarget));
    result.push(...shuffleArray(medium).slice(0, mediumTarget));
    result.push(...shuffleArray(hard).slice(0, hardTarget));

    // 打乱顺序
    return shuffleArray(result);
}

// 数组随机打乱
function shuffleArray(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

// ===== 课程+模块选择（重写） =====

// 学生自选模式标记：学生自己选课时，屏蔽教师同步覆盖
var studentSelfSelectMode = false;

// 课程数据映射：根据 lessonId 获取对应数据对象
function getLessonData(lessonId) {
    var map = {
        'U1L1': typeof lesson1 !== 'undefined' ? lesson1 : null,
        'U1L2': typeof unit1_lesson2 !== 'undefined' ? unit1_lesson2 : null,
        'U1L3': typeof unit1_lesson3 !== 'undefined' ? unit1_lesson3 : null,
        'U1L4': typeof unit1_lesson4 !== 'undefined' ? unit1_lesson4 : null,
        'U2L1': typeof unit2_lesson1 !== 'undefined' ? unit2_lesson1 : null,
        'U2L2': typeof unit2_lesson2 !== 'undefined' ? unit2_lesson2 : null,
        'U2L3': typeof unit2_lesson3 !== 'undefined' ? unit2_lesson3 : null,
        'U2L4': typeof unit2_lesson4 !== 'undefined' ? unit2_lesson4 : null,
        'U3L1': typeof unit3_lesson1 !== 'undefined' ? unit3_lesson1 : null,
        'U3L2': typeof unit3_lesson2 !== 'undefined' ? unit3_lesson2 : null,
        'U3L3': typeof unit3_lesson3 !== 'undefined' ? unit3_lesson3 : null,
        'U3L4': typeof unit3_lesson4 !== 'undefined' ? unit3_lesson4 : null,
        'U4L1': typeof unit4_lesson1 !== 'undefined' ? unit4_lesson1 : null,
        'U4L2': typeof unit4_lesson2 !== 'undefined' ? unit4_lesson2 : null,
        'U4L3': typeof unit4_lesson3 !== 'undefined' ? unit4_lesson3 : null,
        'U4L4': typeof unit4_lesson4 !== 'undefined' ? unit4_lesson4 : null
    };
    return map[lessonId] || null;
}
// 兼容旧代码
var LESSON_MAP = null; // 用 getLessonData() 代替

// 当前选中状态
var selectedLesson = 'U1L1';
var selectedModule = 'listening';

// 模块按钮点击
document.querySelectorAll('#test-module-btns .tsel-btn').forEach(function(btn) {
    btn.onclick = function() {
        document.querySelectorAll('#test-module-btns .tsel-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        selectedModule = this.dataset.module;
    };
});

// Step 1: Click "开始学习" → 检查教师指令，有则自动进入，无则显示模块选择页
nextBtn.onclick = function() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    players = selectedStudents.map(n => ({ name: n, stars: 0, correct: 0, total: 0 }));
    window.players = players; // 同步到全局，coop-types.js 的 getPlayerShortName() 依赖 window.players
    document.getElementById('login-screen').classList.remove('active');

    // 检查是否有教师指令：如果教师已发布课程，自动跳转到指定模块
    var teacherCmd = Sync.getTeacherCommandOnce();
    if (teacherCmd && teacherCmd.action === 'start' && teacherCmd.lesson && teacherCmd.module) {
        console.log('[Sync] 检测到教师指令，自动进入:', teacherCmd.lesson, teacherCmd.module);
        var lessonData = getLessonData(teacherCmd.lesson);
        if (lessonData) {
            currentLessonData = lessonData;
            currentModule = teacherCmd.module;
            currentPhase = teacherCmd.phase || 'practice';
            currentTimeLimit = Math.max(0, Math.min(300, teacherCmd.timeLimit || 0));
            // 直接开始游戏（跳过模块选择页）
            startGame();
            return;
        }
    }

    // 没有教师指令，显示模块选择页
    document.getElementById('module-screen').style.display = '';
    document.getElementById('module-screen').classList.add('active');
    // 更新 Project 卡片解锁状态
    if (typeof updateProjectLockState === 'function') updateProjectLockState();
    // 同步课程下拉框
    var coopSelect = document.getElementById('coop-lesson-select');
    if (coopSelect && typeof _currentCoopLessonId !== 'undefined') {
        coopSelect.value = _currentCoopLessonId;
    }
};

// 恢复上次选择（从 localStorage）
function restoreTestSelection() {
    var savedUnit = localStorage.getItem('test_unit');
    var savedLesson = localStorage.getItem('test_lesson');
    var savedModule = localStorage.getItem('test_module');
    if (savedUnit) document.getElementById('test-unit-select').value = savedUnit;
    if (savedLesson) document.getElementById('test-lesson-select').value = savedLesson;
    if (savedModule) {
        selectedModule = savedModule;
        document.querySelectorAll('#test-module-btns .tsel-btn').forEach(function(b) {
            b.classList.toggle('active', b.dataset.module === savedModule);
        });
    }
}

// 兼容旧版 selectTestBtn（教师端可能调用）
function selectTestBtn(btn, group) {
    var container = document.getElementById('test-' + group + '-btns');
    if (container) {
        container.querySelectorAll('.test-sel-btn,.tsel-btn').forEach(function(b) { b.classList.remove('selected','active'); });
        btn.classList.add('selected','active');
    }
}

// 显示模块选择页（结束页"换模块"按钮用）
function showTestSelectScreen() {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) screens[i].classList.remove('active');
    document.getElementById('module-screen').style.display = '';
    document.getElementById('module-screen').classList.add('active');
}

// 点"开始练习！"
function confirmTestSelection() {
    var unit = document.getElementById('test-unit-select').value;
    var lesson = document.getElementById('test-lesson-select').value;
    var lessonId = 'U' + unit + 'L' + lesson;

    // 直接取数据
    var data = getLessonData(lessonId);
    if (!data) {
        alert('找不到课程数据: ' + lessonId + '\n请刷新页面重试');
        return;
    }
    currentLessonData = data;
    currentModule = selectedModule;
    currentPhase = 'practice';
    studentSelfSelectMode = true; // 学生自选，屏蔽教师同步覆盖

    var qCount = ((currentLessonData[currentModule] && currentLessonData[currentModule].practice) || []).length;
    console.log('[选课] ' + lessonId + ' / ' + currentModule + ' → id=' + currentLessonData.id + ' 题目数=' + qCount);

    // 保存选择
    localStorage.setItem('test_unit', unit);
    localStorage.setItem('test_lesson', lesson);
    localStorage.setItem('test_module', currentModule);

    document.getElementById('test-select-screen').classList.remove('active');
    startGame();
}

// 开始按钮绑定
document.getElementById('test-start-btn').onclick = confirmTestSelection;

// 模块卡片点击由 HTML 的 onclick="showAdventureMap(...)" 直接处理（见 index.html）
// 预加载题目中的所有图片到浏览器缓存
function preloadQuestionImages(questions) {
    if (!questions || !questions.length) return;
    var urls = {};
    var imgRegex = /src="([^"]+)"/g;
    
    questions.forEach(function(q) {
        // 从选项中提取图片
        if (q.options) {
            q.options.forEach(function(opt) {
                var match;
                while ((match = imgRegex.exec(opt)) !== null) {
                    urls[match[1]] = true;
                }
            });
        }
        // 从 image 字段提取
        if (q.image) {
            var match;
            while ((match = imgRegex.exec(q.image)) !== null) {
                urls[match[1]] = true;
            }
        }
    });

    var urlList = Object.keys(urls);
    console.log('预加载 ' + urlList.length + ' 张图片');
    urlList.forEach(function(url) {
        var img = new Image();
        img.src = url;
    });
}

function startGame() {
    document.getElementById('player1-ui').querySelector('.name').textContent = players[0].name;
    document.getElementById('player2-ui').querySelector('.name').textContent = players[1].name;

    // 注意：currentLessonData 已由调用方（confirmTestSelection 或 handleTeacherCommand）设置，这里不再覆盖

    // 标记双人练习完成（每日任务）
    if (typeof markDuoPracticeComplete === 'function') {
        markDuoPracticeComplete();
    }

    // 重置前测统计
    pretestStats = {
        player1: { correct: 0, total: 0, totalTime: 0, wrongWords: [] },
        player2: { correct: 0, total: 0, totalTime: 0, wrongWords: [] }
    };
    studentLevel = 'B';
    consecutiveCorrect = 0;
    consecutiveWrong = 0;
    currentDifficulty = 'easy'; // 从简单开始，i+1自适应逐步提升

    window._pretestUploaded = false; // 重置前测上传标记（每局游戏只上传第一次）

    moduleQuestions = labelQuestionDifficulty(getQuestions(currentModule, currentPhase));
    currentQuestionIndex = 0;
    currentPlayerIndex = 0;
    window.comboCount = 0;
    window.sessionMaxCombo = 0; // 全局最长连胜（跨阶段）

    // 重置双方分数（防止多轮游戏累加）
    players[0].stars = 0;
    players[1].stars = 0;

    // 如果没有设置时间限制，使用默认值
    if (!currentTimeLimit || currentTimeLimit === 0) {
        currentTimeLimit = DEFAULT_TIME_LIMIT;
    }

    // 预加载所有题目图片（防止答题时加载慢）
    try {
        preloadQuestionImages(moduleQuestions);
    } catch(e) { /* 预加载图片跳过 */ }

    document.getElementById('module-screen').classList.remove('active');

    // 实战阶段：先显示情境导入页（如果有的话）
    if (currentPhase === 'practice') {
        var lessonId = getCurrentLessonId();
        if (lessonId && scenarioMap[lessonId]) {
            showScenarioScreen(scenarioMap[lessonId]);
            return; // showScenarioScreen 的"开始"按钮会调用 startPracticeAfterScenario()
        }
    }

    document.getElementById('game-screen').classList.add('active');

    // Show phase indicator
    updatePhaseIndicator();

    // 启动倒计时（实战由教师设置或默认15分钟）
    stopPretestTimer(); // 清除上一轮
    startPretestTimer(15 * 60); // 实战默认15分钟

    renderQuestion();
}

function updatePhaseIndicator() {
    let indicator = document.getElementById('phase-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'phase-indicator';
        indicator.className = 'phase-indicator';
        const gameScreen = document.getElementById('game-screen');
        gameScreen.insertBefore(indicator, gameScreen.firstChild);
    }

    const phaseNames = {
        pretest: '闯关赛',
        practice: '闯关赛'
    };
    const moduleNames = {
        listening: '听力',
        reading: '阅读',
        writing: '写作',
        speaking: '口语'
    };

    // 获取课文标题（如 "This is a bear."）
    var lessonTopic = currentLessonData && currentLessonData.title ? currentLessonData.title : '';

    // 从 currentLessonData.id（如 "U1L1"）解析出 fallback 课程名
    function deriveLessonLabel() {
        var lessonId = currentLessonData && currentLessonData.id ? currentLessonData.id : '';
        var match = lessonId.match(/^U(\d+)L(\d+)$/);
        if (match) {
            return 'Unit ' + match[1] + ' Lesson ' + match[2];
        }
        return '';
    }

    // 直接从 currentLessonData 获取课程标题（不再依赖 Sync 缓存）
    var lessonTitle = deriveLessonLabel();

    var parts = [];
    if (lessonTitle) {
        parts.push('📚 ' + lessonTitle);
    } else {
        parts.push('📚');
    }
    if (lessonTopic) parts.push(lessonTopic);
    parts.push(moduleNames[currentModule] || '');
    parts.push(phaseNames[currentPhase]);
    indicator.textContent = parts.join(' · ');
}

function showQuestionHint(type, container) {
    const hints = {
        'memory_match': '翻开两张卡片，找出相同的配对',
        'drag_connect': '把左边的单词和右边的图片连起来',
        'sentence_order': '把打乱的单词排成正确的句子',
        'word_puzzle': '把字母拼成正确的单词',
        'fill_blank': '在空格里填上正确的单词',
        'duo_race': '双人抢答竞赛！',
        'whack_mole': '打地鼠抢答！',
        'word_match': '找到匹配的图片/单词',
        'sentence_match': '根据句子选出匹配的图片',
        'letter_select': '选出缺少的字母！',
        'word_spell': '根据图片拼出正确的单词！',
        'duo_spell': '接力拼写单词！',
        'duo_sentence': '双人合作排列句子！',
        'listen_select': '听录音，选出正确的图片',
        'listen_tf': '判断录音与图片是否一致',
        'duo_listen_select': '一人听音，一人选图！',
        'listen_question': '听问题，选出合适的回答',
        'read_sentence': '大声朗读这个句子',
        'repeat_word': '大声跟读单词'
    };

    if (hints[type]) {
        const hintEl = document.createElement('div');
        hintEl.className = 'question-type-hint';
        hintEl.textContent = hints[type];
        container.appendChild(hintEl);

        setTimeout(() => {
            hintEl.style.opacity = '0';
            setTimeout(() => {
                 if (hintEl.parentNode === container) {
                     hintEl.remove();
                 }
            }, 500);
        }, 3000);
    }
}

function renderQuestion() {
    isAnimating = false;
    window.wrongCount = 0;
    window.scaffoldVoiceThresholdLowered = false;
    window.earnedStarThisTurn = false;
    // 研究数据：初始化支架日志和自适应连胜计数
    if (!window.sessionScaffoldLog) window.sessionScaffoldLog = [];
    if (window.adaptiveEasyStreak === undefined) window.adaptiveEasyStreak = 0;
    if (window.adaptiveHardStreak === undefined) window.adaptiveHardStreak = 0;

    // 清除上一题的底部按钮行（因为是append到body的）
    var oldBtnRow = document.querySelector('.btn-row-fixed');
    if (oldBtnRow) oldBtnRow.remove();

    // 停止上一题的语音播放（防止语音重叠）
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    // 清除上一题的反馈元素（防止遮挡）
    hideFeedbackPanel();
    // 清除连击指示器
    const combo = document.getElementById('combo-indicator');
    if (combo) combo.remove();

    hideCorrectAnswerDisplay();
    hideCorrectHint();

    updateHeader();

    // Check if we reached the end of current phase
    if (currentQuestionIndex >= moduleQuestions.length) {
        // 实战完成 — 直接进入项目(L4)或结束页
        proceedAfterPractice();
        return;
    }

    const q = moduleQuestions[currentQuestionIndex];
    const container = document.getElementById('question-container');
    container.innerHTML = '';
    
    // Add dynamic question type hint
    showQuestionHint(q.type, container);

    // 记录每题开始时间（用于计算答题用时）
    questionStartTime = Date.now();

    // Update turn indicator with progress and timer (合并显示)
    const currentPlayerName = players[currentPlayerIndex].name.replace(/^\d+\.\s*/, '');
    const progress = '第' + (currentQuestionIndex + 1) + '/' + moduleQuestions.length + '题';
    const isLastQ = (currentQuestionIndex >= moduleQuestions.length - 1);
    const lastBadge = isLastQ ? '<span style="font-size:11px;background:#ff6b6b;color:#fff;padding:1px 6px;border-radius:8px;margin-left:4px;">最后！</span>' : '';

    // 恢复答题状态栏（从结果页/过渡页回来时可能被隐藏了）
    var turnIndicatorEl = document.getElementById('turn-indicator');
    if (turnIndicatorEl) turnIndicatorEl.style.display = '';
    var segBarEl = document.getElementById('quiz-seg-bar');
    if (segBarEl) segBarEl.style.display = '';

    // 重置容器背景（结果页会给 container 设渐变背景，答题页要恢复白色）
    container.style.background = '';
    container.style.paddingBottom = '';

    // 隐藏顶部 .header 行（AB名字+进度），全部合并进绿色横幅
    var headerEl = document.querySelector('#game-screen .header');
    if (headerEl) headerEl.style.display = 'none';

    var turnIndicator = document.getElementById('turn-indicator');
    var currentStars = currentPhase === 'practice' ? players[0].stars : players[currentPlayerIndex].stars;
    // countdownHtml: 空元素，渲染后立即由 updatePretestTimerDisplay() 填充，避免闪烁
    var countdownHtml = '<span id="pretest-countdown" style="background:rgba(255,255,255,0.3);padding:2px 8px;border-radius:10px;font-weight:bold;min-width:40px;text-align:center;font-size:13px;"></span>';

    // 普通徽章（等待方）
    function letterBadge(letter) {
        return '<span style="background:rgba(255,255,255,0.75);color:#555;font-size:12px;font-weight:900;width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">' + letter + '</span>';
    }
    // 活跃徽章（正在答题方，带弹跳）
    function letterBadgeActive(letter) {
        return '<span class="badge-active" style="background:#fff;color:#3c8c00;font-size:14px;font-weight:900;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 0 0 3px rgba(255,255,255,0.5);">' + letter + '</span>';
    }

    var name1 = players[0] ? players[0].name.replace(/^\d+\.\s*/, '') : 'A';
    var name2 = players[1] ? players[1].name.replace(/^\d+\.\s*/, '') : 'B';

    if (currentPhase === 'practice') {
        // 实战：Duolingo 合作模式横幅
        // 设计原则：让学生一眼看出「我们要一起答」（不是各打各）
        turnIndicator.innerHTML =
            // 左：两个玩家名字（小字，说明谁在玩）
            '<span style="display:flex;align-items:center;gap:5px;font-size:12px;opacity:0.9;">' +
                letterBadge('A') + '<span>' + name1 + '</span>' +
                '<span style="opacity:0.5;padding:0 2px;">·</span>' +
                letterBadge('B') + '<span>' + name2 + '</span>' +
            '</span>' +
            // 中：醒目的「合力答题」提示（视觉重心）
            '<span style="display:flex;align-items:center;gap:5px;background:rgba(255,255,255,0.25);padding:3px 12px;border-radius:20px;font-weight:900;font-size:13px;letter-spacing:0.3px;">' +
                '🤝&nbsp;一起来答题！' +
            '</span>' +
            // 右：星星 + 倒计时
            '<span style="display:flex;align-items:center;gap:6px;">' +
                '<span style="background:rgba(255,255,255,0.3);padding:2px 8px;border-radius:10px;font-weight:bold;font-size:13px;">⭐ ' + currentStars + '</span>' +
                countdownHtml +
            '</span>';

    } else {
        // 前测：A 固定左侧，B 固定右侧，活跃方大圆弹跳 + "轮到你答！"
        var aIsActive = (currentPlayerIndex === 0);

        turnIndicator.innerHTML =
            // 左：A（固定位置）
            '<span style="display:flex;align-items:center;gap:6px;">' +
                (aIsActive ? letterBadgeActive('A') : letterBadge('A')) +
                '<span style="display:flex;flex-direction:column;line-height:1.15;' + (aIsActive ? '' : 'opacity:0.55;') + '">' +
                    '<span style="font-weight:900;font-size:13px;">' + name1 + '</span>' +
                    (aIsActive ? '<span style="font-size:10px;">✏️ 轮到你答！</span>' : '') +
                '</span>' +
            '</span>' +
            // 中：倒计时
            '<span>' + countdownHtml + '</span>' +
            // 右：B（固定位置）
            '<span style="display:flex;align-items:center;gap:6px;justify-content:flex-end;">' +
                '<span style="display:flex;flex-direction:column;line-height:1.15;text-align:right;' + (!aIsActive ? '' : 'opacity:0.55;') + '">' +
                    '<span style="font-weight:900;font-size:13px;">' + name2 + '</span>' +
                    (!aIsActive ? '<span style="font-size:10px;">✏️ 轮到你答！</span>' : '') +
                '</span>' +
                (!aIsActive ? letterBadgeActive('B') : letterBadge('B')) +
            '</span>';
    }

    // 切题后立即填充倒计时值，防止闪烁（不等 interval 下一秒再更新）
    updatePretestTimerDisplay();

    // question-progress 保留但隐藏（后台兼容）
    var qp = document.getElementById('question-progress');
    if (qp) qp.style.display = 'none';

    // ── 分题刻度进度条（充电格 + 右侧数字标注）──
    var segBar = document.getElementById('quiz-seg-bar');
    if (segBar) {
        var total   = moduleQuestions.length;
        var current = currentQuestionIndex;
        var segsHtml = '';
        for (var si = 0; si < total; si++) {
            if (si < current)        segsHtml += '<div class="qseg done"></div>';
            else if (si === current) segsHtml += '<div class="qseg current"></div>';
            else                     segsHtml += '<div class="qseg"></div>';
        }
        segBar.innerHTML =
            '<div style="flex:1;display:flex;gap:3px;align-items:center;">' + segsHtml + '</div>' +
            '<span style="color:rgba(255,255,255,0.95);font-size:11px;font-weight:800;margin-left:8px;white-space:nowrap;letter-spacing:0.3px;">' + (current + 1) + '/' + total + '</span>';
    }





    // 启动计时器
    startQuestionTimer();

    // Delegate to module renderers（旧方案分发，已废弃；新方案用 coop-types.js + adventure.js）
    // 保留 typeof 守卫，避免 currentModule 误命中时崩溃
    if (currentModule === 'listening' && typeof renderListeningQuestion === 'function') {
        renderListeningQuestion(q, container);
    } else if (currentModule === 'reading' && typeof renderReadingQuestion === 'function') {
        renderReadingQuestion(q, container);
    } else if (currentModule === 'writing' && typeof renderWritingQuestion === 'function') {
        renderWritingQuestion(q, container);
    } else if (currentModule === 'speaking' && typeof renderSpeakingQuestion === 'function') {
        renderSpeakingQuestion(q, container);
    }

    // 给所有选项卡片内的图片添加白色背景包装（去除透明马赛克）
    wrapImagesWithWhiteBg(container);

    // 底部按钮（前测和实战都显示，前测默认禁用等选完答案后激活）
    const skipBtn = document.createElement('button');
    skipBtn.className = 'next-btn';
    skipBtn.id = 'next-question-btn';

    var isLastQuestion = (currentQuestionIndex >= moduleQuestions.length - 1);

    if (currentPhase === 'pretest') {
        // 前测：上一题+下一题 并排按钮
        window.pretestPendingAnswer = null;

        var btnRow = document.createElement('div');
        btnRow.className = 'btn-row-fixed';

        // 上一题按钮
        var prevBtn = document.createElement('button');
        prevBtn.className = 'next-btn';
        prevBtn.textContent = '◀ 上一题';
        if (currentQuestionIndex <= 0) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.3';
        } else {
            prevBtn.style.background = 'linear-gradient(135deg, #e0e0e0, #ccc)';
            prevBtn.style.boxShadow = '0 4px 0 #aaa';
            prevBtn.style.color = '#666';
            prevBtn.onclick = function() {
                if (window.pretestPendingAnswer) {
                    var p = window.pretestPendingAnswer;
                    var tStats = pretestStats[p.playerKey];
                    tStats.total++;
                    tStats.totalTime += p.responseTime;
                    if (p.isCorrect) { tStats.correct++; }
                    window.pretestPendingAnswer = null;
                }
                isAnimating = false;
                if (currentPhase !== 'practice') {
                    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
                }
                currentQuestionIndex--;
                renderQuestion();
            };
        }
        btnRow.appendChild(prevBtn);

        // 下一题按钮
        skipBtn.textContent = isLastQuestion ? '✅ 完成热身' : '下一题 ▶';
        skipBtn.disabled = true;
        skipBtn.style.opacity = '0.4';
        skipBtn.onclick = function() {
            if (window.pretestPendingAnswer) {
                var p = window.pretestPendingAnswer;
                var tStats = pretestStats[p.playerKey];
                tStats.total++;
                tStats.totalTime += p.responseTime;
                if (p.isCorrect) {
                    tStats.correct++;
                    window.earnedStarThisTurn = true;
                }
                window.pretestPendingAnswer = null;
            }
            isAnimating = false;
            skipToNextQuestion();
        };
        btnRow.appendChild(skipBtn);

        document.body.appendChild(btnRow);
        syncStudentProgress();
        return;
    } else {
        // 实战：上一题+下一题 并排按钮
        var btnRow = document.createElement('div');
        btnRow.className = 'btn-row-fixed';

        // 上一题按钮
        var prevBtn = document.createElement('button');
        prevBtn.className = 'next-btn';
        prevBtn.textContent = '◀ 上一题';
        if (currentQuestionIndex <= 0) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.3';
        } else {
            prevBtn.style.background = 'linear-gradient(135deg, #e0e0e0, #ccc)';
            prevBtn.style.boxShadow = '0 4px 0 #aaa';
            prevBtn.style.color = '#666';
            prevBtn.onclick = function() {
                isAnimating = false;
                if (currentPhase !== 'practice') {
                    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
                }
                currentQuestionIndex--;
                renderQuestion();
            };
        }
        btnRow.appendChild(prevBtn);

        // 下一题/查看结果按钮
        skipBtn.textContent = isLastQuestion ? '✅ 查看结果' : '下一题 ▶';
        skipBtn.onclick = skipToNextQuestion;
        if (isLastQuestion) {
            skipBtn.disabled = false;
            skipBtn.style.background = 'linear-gradient(135deg, #58cc02, #46a302)';
            skipBtn.style.boxShadow = '0 4px 0 #3d8f02';
            skipBtn.style.color = 'white';
            skipBtn.style.opacity = '1';
        } else {
            skipBtn.disabled = true;
        }
        btnRow.appendChild(skipBtn);

        document.body.appendChild(btnRow);
    }

    syncStudentProgress();
}

function showTransition() {
    var container = document.getElementById('question-container');

    // 隐藏所有答题状态栏（结果/过渡页应干净）
    var turnBar = document.getElementById('turn-indicator');
    if (turnBar) turnBar.style.display = 'none';
    var progBar = document.getElementById('question-progress');
    if (progBar) progBar.style.display = 'none';
    var segBar = document.getElementById('quiz-seg-bar');
    if (segBar) segBar.style.display = 'none';

    // 隐藏左上右上的学生名字卡片
    var headerEl = document.querySelector('.header');
    if (headerEl) headerEl.style.display = 'none';

    // 清除底部按钮行
    var oldBtnRow = document.querySelector('.btn-row-fixed');
    if (oldBtnRow) oldBtnRow.remove();

    // 停止倒计时
    stopPretestTimer();

    // 获取玩家名字和数据
    var player1Name = players[0] ? players[0].name.replace(/^\d+\.\s*/, '') : 'Student A';
    var player2Name = players[1] ? players[1].name.replace(/^\d+\.\s*/, '') : 'Student B';
    var p1Stars = players[0] ? players[0].stars : 0;
    var p2Stars = players[1] ? players[1].stars : 0;
    var p1 = pretestStats.player1;
    var p2 = pretestStats.player2;
    var totalCorrect = p1.correct + p2.correct;
    // 用固定题目数（20题），不用pretestStats.total（可能因上一题/重答被多算）
    var totalQuestions = 20;
    var totalAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    // 鼓励语（基于Growth Mindset，夸努力和过程，不夸天赋）
    // 渐变色背景 + 大字体 + 动感设计
    var cheerEmoji, cheerText, cheerColor, cheerBg;
    if (totalCorrect >= 16) {
        cheerEmoji = '🏆';
        cheerText = '太厉害了！你们已经掌握了！';
        cheerColor = '#fff';
        cheerBg = 'linear-gradient(135deg, #ff9500, #ff6b00)';
    } else if (totalCorrect >= 11) {
        cheerEmoji = '🌟';
        cheerText = '很棒！大部分都会了！';
        cheerColor = '#fff';
        cheerBg = 'linear-gradient(135deg, #ffb800, #ff9500)';
    } else if (totalCorrect >= 6) {
        cheerEmoji = '👏';
        cheerText = '不错的开始！闯关赛会更好！';
        cheerColor = '#fff';
        cheerBg = 'linear-gradient(135deg, #1cb0f6, #0095e8)';
    } else if (totalCorrect >= 3) {
        cheerEmoji = '💪';
        cheerText = '勇敢完成了！接下来一起练！';
        cheerColor = '#fff';
        cheerBg = 'linear-gradient(135deg, #58cc02, #46a302)';
    } else {
        cheerEmoji = '🌱';
        cheerText = '种子已种下，闯关赛一起成长！';
        cheerColor = '#fff';
        cheerBg = 'linear-gradient(135deg, #58cc02, #46a302)';
    }

    // ① 先注入 @keyframes（必须在 innerHTML 之前，否则动画不生效）
    if (!document.getElementById('transition-anim-style')) {
        var styleEl = document.createElement('style');
        styleEl.id = 'transition-anim-style';
        styleEl.textContent =
            '@keyframes popIn{from{transform:scale(0.3) rotate(-10deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}' +
            '@keyframes starDrop{0%{transform:scale(0) translateY(-20px);opacity:0}60%{transform:scale(1.4) translateY(4px)}100%{transform:scale(1) translateY(0);opacity:1}}' +
            '@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}';
        document.head.appendChild(styleEl);
    }

    // ② 设置容器背景（直接作用于 #question-container，避免 min-height:100% flex 失效）
    container.style.background = 'linear-gradient(160deg,#e8f8ff 0%,#f0ffe8 55%,#fffbea 100%)';
    container.style.paddingBottom = '40px';

    // ③ 星级：低分也给最少1颗星，永远庆祝努力（Duolingo Growth Mindset 原则）
    var stars = totalAccuracy >= 80 ? 3 : totalAccuracy >= 40 ? 2 : 1;
    var starsHtml = [0,1,2].map(function(si) {
        var on = si < stars;
        return '<span style="font-size:44px;display:inline-block;' +
            (on ? 'animation:starDrop 0.5s ' + (0.25 + si*0.15) + 's cubic-bezier(0.175,0.885,0.32,1.275) both;' : 'filter:grayscale(1) opacity(0.22);') +
            '">⭐</span>';
    }).join('&nbsp;');

    // ④ 低分用鼓励蓝，不用羞耻红
    var scoreColor = totalAccuracy >= 80 ? '#58cc02' : totalAccuracy >= 50 ? '#ffc200' : '#1cb0f6';


    var html = '<div style="padding:20px 18px 10px;text-align:center;">';

    // 庆祝徽章（弹入动画）
    html += '<div style="width:96px;height:96px;margin:0 auto 12px;border-radius:50%;background:' + cheerBg + ';display:flex;align-items:center;justify-content:center;font-size:50px;box-shadow:0 8px 24px rgba(0,0,0,0.18);animation:popIn 0.45s cubic-bezier(0.175,0.885,0.32,1.275) both;">' + cheerEmoji + '</div>';
    html += '<div style="font-size:26px;font-weight:900;color:#1a1a1a;letter-spacing:-0.5px;margin-bottom:4px;animation:fadeUp 0.4s 0.1s both;">热身赛完成！</div>';
    html += '<div style="font-size:13px;color:#aaa;margin-bottom:16px;animation:fadeUp 0.4s 0.15s both;">' + player1Name + ' & ' + player2Name + '</div>';

    // 星级（视觉重心）
    html += '<div style="margin-bottom:20px;line-height:1;">' + starsHtml + '</div>';

    // 成绩卡片
    html += '<div style="background:#fff;border-radius:22px;padding:20px 20px 16px;box-shadow:0 2px 20px rgba(0,0,0,0.07);border:1.5px solid #e8e8e8;margin-bottom:16px;animation:fadeUp 0.4s 0.3s both;">';
    html += '<div style="font-size:66px;font-weight:900;color:' + scoreColor + ';line-height:1;letter-spacing:-3px;margin-bottom:4px;">' + totalCorrect + '<span style="font-size:26px;color:#ccc;font-weight:400;"> / ' + totalQuestions + '</span></div>';
    var barW = Math.max(5, totalAccuracy);
    html += '<div style="width:88%;margin:12px auto 8px;height:12px;background:#f0f0f0;border-radius:99px;overflow:hidden;"><div style="width:' + barW + '%;height:100%;background:' + cheerBg + ';border-radius:99px;transition:width 1.2s cubic-bezier(0.25,1,0.5,1);"></div></div>';
    html += '<div style="font-size:13px;color:#bbb;">答对了 <b style="color:' + scoreColor + ';">' + totalAccuracy + '%</b></div>';
    html += '</div>';

    // 鼓励语（纯文字，不做成按钮样式）
    html += '<div style="font-size:17px;font-weight:bold;color:#555;margin-bottom:24px;line-height:1.5;animation:fadeUp 0.4s 0.4s both;">' + cheerText + '</div>';

    // 唯一主操作按钮
    html += '<button onclick="restartPretest()" style="width:100%;max-width:300px;padding:17px;font-size:18px;font-weight:900;background:linear-gradient(180deg,#49c0f8,#1cb0f6);border:none;color:#fff;border-radius:16px;cursor:pointer;box-shadow:0 5px 0 #0077cc;display:block;margin:0 auto 12px;animation:fadeUp 0.4s 0.5s both;">🔄 再来一遍</button>';
    html += '<div style="font-size:12px;color:#ccc;animation:fadeUp 0.4s 0.55s both;">等待老师指令进入闯关赛</div>';

    html += '</div>';

    container.innerHTML = html;

    // 静默保存成就数据（不显示在页面上）
    try {
        var orderId1 = getPlayerOrderId(0);
        var orderId2 = getPlayerOrderId(1);
        var data1 = loadAchievements(orderId1);
        var data2 = loadAchievements(orderId2);

        data1.totalCorrect = (data1.totalCorrect || 0) + p1.correct;
        data1.totalStars = (data1.totalStars || 0) + players[0].stars;
        data2.totalCorrect = (data2.totalCorrect || 0) + p2.correct;
        data2.totalStars = (data2.totalStars || 0) + players[1].stars;
        if (totalAccuracy === 100) { data1.lastPerfect = true; data2.lastPerfect = true; }
        data1.maxCombo = Math.max(data1.maxCombo || 0, consecutiveCorrect);
        data2.maxCombo = Math.max(data2.maxCombo || 0, consecutiveCorrect);

        for (var i = 0; i < achievementDefs.length; i++) {
            var def = achievementDefs[i];
            if (def.check(data1) && (!data1.earned || data1.earned.indexOf(def.id) === -1)) {
                if (!data1.earned) data1.earned = [];
                data1.earned.push(def.id);
            }
            if (def.check(data2) && (!data2.earned || data2.earned.indexOf(def.id) === -1)) {
                if (!data2.earned) data2.earned = [];
                data2.earned.push(def.id);
            }
        }
        saveAchievements(orderId1, data1);
        saveAchievements(orderId2, data2);
    } catch(e) { console.error('achievements save error', e); }
}

// 重新开始前测
function restartPretest() {
    // 重置统计（重新开始实战）
    pretestStats = {
        player1: { correct: 0, total: 0, totalTime: 0, wrongWords: [] },
        player2: { correct: 0, total: 0, totalTime: 0, wrongWords: [] }
    };
    currentPhase = 'practice';
    moduleQuestions = labelQuestionDifficulty(getQuestions(currentModule, currentPhase));
    currentQuestionIndex = 0;
    currentPlayerIndex = 0;

    // 恢复header显示（showTransition里隐藏了）
    var headerEl = document.querySelector('.header');
    if (headerEl) headerEl.style.display = '';
    var turnBar = document.getElementById('turn-indicator');
    if (turnBar) turnBar.style.display = '';
    var progBar = document.getElementById('question-progress');
    if (progBar) progBar.style.display = '';

    // 重启倒计时
    stopPretestTimer();
    startPretestTimer(5 * 60);

    updatePhaseIndicator();
    renderQuestion();
}

// 开始练习
function startPractice() {
    currentPhase = 'practice';
    moduleQuestions = labelQuestionDifficulty(getQuestions(currentModule, currentPhase));
    currentQuestionIndex = 0;
    updatePhaseIndicator();
    // 实战倒计时15分钟
    stopPretestTimer();
    startPretestTimer(15 * 60);
    renderQuestion();
}

// 计算学生水平（基于前测表现）
function calculateStudentLevel() {
    const p1 = pretestStats.player1;
    const p2 = pretestStats.player2;

    // 综合两人的表现
    const totalCorrect = p1.correct + p2.correct;
    const totalQuestions = p1.total + p2.total;
    const totalTime = p1.totalTime + p2.totalTime;

    if (totalQuestions === 0) {
        studentLevel = 'B';
        return;
    }

    const accuracy = totalCorrect / totalQuestions;
    const avgTimePerQuestion = totalTime / totalQuestions; // 毫秒
    // 当教师未设置时间限制时，用15秒作为基准（中等难度的合理答题时间）
    const standardTime = currentTimeLimit > 0 ? currentTimeLimit * 1000 : 15000;

    // 根据 Bloom Mastery Learning 理论
    // A级：正确率≥80% 且 平均用时≤标准时间
    // B级：正确率60-80% 或 用时中等
    // C级：正确率<60% 或 用时很长

    if (accuracy >= MASTERY_THRESHOLD && avgTimePerQuestion <= standardTime) {
        studentLevel = 'A';
    } else if (accuracy < STRUGGLE_THRESHOLD || avgTimePerQuestion > standardTime * SLOW_TIME_RATIO) {
        studentLevel = 'C';
    } else {
        studentLevel = 'B';
    }

    console.log(`学生水平评估: 正确率=${(accuracy*100).toFixed(1)}%, 平均用时=${(avgTimePerQuestion/1000).toFixed(1)}s, 等级=${studentLevel}`);
}

function updateHeader() {
    var p1 = document.getElementById('player1-ui');
    var p2 = document.getElementById('player2-ui');
    var teamUI = document.getElementById('team-ui');
    var headerEl = document.querySelector('.header');

    if (currentPhase === 'practice') {
        // 实战：简洁合作模式 — 隐藏整个 .header，所有信息合并到 turn-indicator
        headerEl.style.display = 'none';
        if (teamUI) teamUI.style.display = 'none';
    } else {
        // 前测：竞争模式
        headerEl.style.display = '';
        p1.style.display = '';
        p2.style.display = '';
        if (teamUI) teamUI.style.display = 'none';

        p1.querySelector('.name').textContent = players[0].name;
        p1.classList.toggle('active-player', currentPlayerIndex === 0);
        p2.classList.toggle('active-player', currentPlayerIndex === 1);
        // 前测不显示星星（前测是诊断测试，不是竞争）
        p1.querySelector('.stars').innerHTML = '';
        p2.querySelector('.stars').innerHTML = '';
    }
}

function handleAnswer(isCorrect, cardEl = null, correctAnswer = null) {
    if(isAnimating) return;
    
    const q = moduleQuestions[currentQuestionIndex];
    
    // E. 降低语音识别灵敏度处理（第3次答错后的放宽策略）
    if (!isCorrect && q && ['repeat_word', 'repeat_sentence', 'picture_speak'].indexOf(q.type) !== -1) {
        if (window.scaffoldVoiceThresholdLowered) {
             isCorrect = true;
        }
    }

    isAnimating = true;

    const responseTime = Date.now() - questionStartTime;
    const playerKey = currentPlayerIndex === 0 ? 'player1' : 'player2';
    const targetStats = pretestStats[playerKey];

    if (currentPhase === 'pretest') {
        // 前测：不立即记分，只存储待提交答案。学生可以改选，以最终点「下一题」时的选择为准。
        window.pretestPendingAnswer = { isCorrect: isCorrect, responseTime: responseTime, playerKey: playerKey };
    } else {
        // 实战：只在第一次尝试本题时统计（总题数不膨胀）
        if (window.wrongCount === 0 || window.wrongCount === undefined) {
            targetStats.total++;
            targetStats.totalTime += responseTime;
            if (currentPhase === 'practice' && players.length > 1) {
                pretestStats.player2.total++;
                pretestStats.player2.totalTime += responseTime;
            }
            if (isCorrect) {
                targetStats.correct++;
                if (currentPhase === 'practice' && players.length > 1) pretestStats.player2.correct++;
                window.earnedStarThisTurn = true;
            }
        }
    }
    
    if (isCorrect) {
        window.comboCount = (window.comboCount || 0) + 1;
        targetStats.maxCombo = Math.max(targetStats.maxCombo || 0, window.comboCount);
        // 全局最长连胜（用于结束页称号评定，不受阶段区分影响）
        window.sessionMaxCombo = Math.max(window.sessionMaxCombo || 0, window.comboCount);
        // 前测不显示星星动画（不暴露对错）
        if (currentPhase !== 'pretest' && window.earnedStarThisTurn && typeof window.showStarAnimation === 'function') {
            window.showStarAnimation();
            var qsProg = document.getElementById('question-progress');
            if (qsProg) {
                var currentScore = currentPhase === 'practice' ? players[0].stars : players[currentPlayerIndex].stars;
                var progressStr = '第' + (currentQuestionIndex + 1) + '/' + moduleQuestions.length + '题';
                qsProg.innerHTML = progressStr + ' &nbsp;⭐ ' + (currentScore + 1);
            }
        }
        if (typeof processAchievements === 'function') processAchievements(true);
    } else {
        if (typeof processAchievements === 'function') processAchievements(false);
        var wrongItem = (q && (q.word || q.audio || q.chinese)) ? (q.word || q.audio) : null;
        if (wrongItem && targetStats.wrongWords && !targetStats.wrongWords.includes(wrongItem)) {
            if (targetStats.wrongWords.length < 10) {
                targetStats.wrongWords.push(wrongItem);
            }
        }
    }

    if (isCorrect) {
        stopQuestionTimer(); // 答对停止计时

        // 前测：高亮选中项，允许改选（不锁定，等学生点"下一题"）
        if (currentPhase === 'pretest') {
            // 清除所有卡片的旧高亮
            var allCards = document.querySelectorAll('.option-card, .tf-option-card');
            allCards.forEach(function(c) { c.style.border = ''; c.style.backgroundColor = ''; });
            // 高亮当前选中
            if (cardEl) {
                cardEl.style.border = '3px solid #1cb0f6';
                cardEl.style.backgroundColor = '#e8f4fd';
            }
            isAnimating = false; // 解锁，允许改选
            activatePretestNextButton();
            return;
        } else {
            // 实战：完整反馈体验
            if (cardEl) cardEl.classList.add('correct');
            if (window.SoundSystem) SoundSystem.playCorrect();
            playSuccessSound();
            speakFeedback(true);      // 语音说英文
            resetHintLevel();

            // ===== 📊 研究数据记录：支架使用量 + i+1自适应信号 =====
            var scaffoldUsed = window.wrongCount || 0; // 答对前答错了几次 = 支架深度
            console.log('[i+1] 本题scaffoldLevel=' + scaffoldUsed + ' easyStreak=' + (window.adaptiveEasyStreak||0) + ' hardStreak=' + (window.adaptiveHardStreak||0) + ' phase=' + currentPhase);
            if (currentPhase === 'practice' && q) {
                // 记录本题数据
                window.sessionScaffoldLog.push({
                    qIndex: currentQuestionIndex,
                    type: q.type,
                    scaffoldLevel: scaffoldUsed,          // 0=无支架 1=轻提示 2=英文 3=英文+中文 4=高亮
                    timeSpent: Date.now() - questionStartTime,
                    correct: true
                });

                // i+1 × ZPD 联动：支架深度作为难度调整信号
                if (scaffoldUsed <= 1) {
                    // 几乎不需要帮助 → 连胜计数+1
                    window.adaptiveEasyStreak = (window.adaptiveEasyStreak || 0) + 1;
                    window.adaptiveHardStreak = 0;
                    if (window.adaptiveEasyStreak >= 3) {
                        // 连续3题低支架答对 → 题目可能偏易，建议升难度
                        window.adaptiveDifficultySignal = 'upgrade';
                        window.adaptiveEasyStreak = 0;
                        console.log('[i+1] 连续3题低支架 → 升难度');
                        adjustDifficulty('up');
                        reorderRemainingQuestions();
                    }
                } else if (scaffoldUsed >= 3) {
                    // 需要深度支架才答对 → 调低难度计数+1
                    window.adaptiveHardStreak = (window.adaptiveHardStreak || 0) + 1;
                    window.adaptiveEasyStreak = 0;
                    if (window.adaptiveHardStreak >= 2) {
                        // 连续2题高支架 → 题目可能偏难，建议降难度
                        window.adaptiveDifficultySignal = 'downgrade';
                        window.adaptiveHardStreak = 0;
                        console.log('[i+1] 连续2题高支架 → 降难度');
                        adjustDifficulty('down');
                        reorderRemainingQuestions();
                    }
                } else {
                    // 中间档（scaffoldLevel 2）→ 处于ZPD最佳区，保持
                    window.adaptiveEasyStreak = Math.max(0, (window.adaptiveEasyStreak || 0) - 1);
                    window.adaptiveHardStreak = Math.max(0, (window.adaptiveHardStreak || 0) - 1);
                }

                // 把当前课程的支架日志存入localStorage，供教师端查看
                try {
                    var logKey = 'scaffoldLog_' + (currentLessonData && currentLessonData.id || 'session');
                    localStorage.setItem(logKey, JSON.stringify(window.sessionScaffoldLog.slice(-50)));
                } catch(e) {}
            }
            // ===== 数据记录结束 =====

            // 只显示底部反馈面板（包含答案和鼓励语，不再重复显示绿色答案条）
            showFeedbackPanel(true, q);

            // 答对后保持 isAnimating = true，防止学生重复点击选项
            // 由 onFeedbackContinue() 中的"继续"按钮来解锁并跳到下一题
        }
    } else {
        window.comboCount = 0;

        // 前测：高亮选中项，允许改选（不锁定）
        if (currentPhase === 'pretest') {
            var allCards = document.querySelectorAll('.option-card, .tf-option-card');
            allCards.forEach(function(c) { c.style.border = ''; c.style.backgroundColor = ''; });
            if (cardEl) {
                cardEl.style.border = '3px solid #1cb0f6';
                cardEl.style.backgroundColor = '#e8f4fd';
            }
            isAnimating = false; // 解锁，允许改选
            activatePretestNextButton();
            return;
        }

        // 实战阶段：显示错误反馈+支架
        if (cardEl) cardEl.classList.add('wrong');
        if (window.SoundSystem) SoundSystem.playWrong();
        playWrongSound();
        speakFeedback(false);

        // 增加错误计数
        window.wrongCount = (window.wrongCount || 0) + 1;

        // 执行三级支架逻辑（仅实战阶段）
        if (q && typeof window.applyScaffolding === 'function') {
            window.applyScaffolding(q, cardEl);
        }

        setTimeout(() => {
            if (cardEl) cardEl.classList.remove('wrong');
            // 支架提示保持显示，不隐藏（让学生有时间看清楚）
            // progressive-hint 只在下一题加载时自动清除

            isAnimating = false;
        }, 2500);
    }
}

function showProgressiveHint(hint, level) {
    let hintEl = document.getElementById('progressive-hint');
    if (!hintEl) {
        hintEl = document.createElement('div');
        hintEl.id = 'progressive-hint';
        hintEl.className = 'correct-hint';
        // 插入到选项上方（而不是底部），确保学生看得到
        var qContainer = document.getElementById('question-container');
        var optionsGrid = qContainer.querySelector('.options-grid');
        if (optionsGrid) {
            qContainer.insertBefore(hintEl, optionsGrid);
        } else {
            // 没有 options-grid 时插入到最前面
            qContainer.insertBefore(hintEl, qContainer.firstChild);
        }
    }

    // 中文标签（学生看得懂）
    const icons = ['💡', '📝', '📖'];
    const labels = ['💡 提示：', '📝 再看看：', ''];  // 不直接说"答案是"

    if (level === 2) {
        // Level 3: 直接显示中文指示
        hintEl.innerHTML = `${icons[level]} ${hint}`;
    } else {
        hintEl.innerHTML = `${icons[level]} ${labels[level]} <strong>${hint}</strong>`;
    }
    hintEl.style.display = 'block';
}

// 答对时显示正确答案+中文翻译（让学生加深印象）
// 替换原来的题目位置，只保留选项
function showCorrectAnswerWithTranslation(q) {
    const container = document.getElementById('question-container');

    // 隐藏原来的题目内容（除了选项区域和固定底部的按钮等）
    const protectedClasses = ['options-grid', 'sort-area', 'whack-mole-grid', 'balloon-container', 'next-btn'];
    
    for (let i = 0; i < container.children.length; i++) {
        const child = container.children[i];
        let shouldHide = true;
        
        // 如果元素包含受保护的类之一，则不隐藏
        for (const cls of protectedClasses) {
            if (child.classList.contains(cls)) {
                shouldHide = false;
                break;
            }
        }
        
        if (child.id === 'correct-answer-display' || child.id === 'progressive-hint' || child.id === 'correct-hint') {
            shouldHide = false;
        }
        
        if (shouldHide) {
            child.dataset.originalDisplay = getComputedStyle(child).display;
            child.style.display = 'none';
        }
    }

    // 移除旧的正确答案显示（如果有）
    let display = document.getElementById('correct-answer-display');
    if (display) {
        display.remove();
    }

    // 创建新的正确答案显示
    display = document.createElement('div');
    display.id = 'correct-answer-display';
    display.className = 'correct-answer-display';

    // 获取英文内容和中文翻译
    let english = q.audio || q.word || q.sentence || '';
    let chinese = q.chinese || '';

    if (english && chinese) {
        display.innerHTML = `
            <div class="answer-english">✓ ${english}</div>
            <div class="answer-chinese">${chinese}</div>
        `;
    } else if (english) {
        display.innerHTML = `<div class="answer-english">✓ ${english}</div>`;
    }

    // 直接插入到最前面，也就是原来题目的位置
    if (container.firstChild) {
        container.insertBefore(display, container.firstChild);
    } else {
        container.appendChild(display);
    }

    // 确保下一题按钮被启用
    const nextBtn = document.getElementById('next-question-btn');
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.pointerEvents = 'auto';
        nextBtn.style.opacity = '1';
    }
}

function hideCorrectAnswerDisplay() {
    const display = document.getElementById('correct-answer-display');
    if (display) {
        display.remove();
    }
    // 恢复题目内容显示
    const container = document.getElementById('question-container');
    if (container) {
        for (let i = 0; i < container.children.length; i++) {
            const child = container.children[i];
            if (child.dataset.originalDisplay !== undefined) {
                child.style.display = child.dataset.originalDisplay;
                delete child.dataset.originalDisplay;
            }
        }
    }
}

// ===== 多邻国风格底部反馈面板 =====
// 记录当前答题是否正确（用于继续按钮判断是否加分）
var lastAnswerCorrect = false;

function showFeedbackPanel(isCorrect, question) {
    // 记录本题是否答对
    lastAnswerCorrect = isCorrect;

    // 移除旧的面板
    hideFeedbackPanel();

    // 添加标记类到body
    document.body.classList.add('feedback-panel-active');

    const panel = document.createElement('div');
    panel.id = 'feedback-panel';
    panel.className = `feedback-panel ${isCorrect ? 'correct' : 'wrong'}`;

    // 获取鼓励语（细颗粒度连击反馈，每一个里程碑都有独特感受）
    let feedbackTitle = '';
    let comboPopClass = '';
    if (isCorrect) {
        var c = window.comboCount || 1;
        if      (c >= 15) { feedbackTitle = '🏆 连对' + c + '题！神级传说！'; comboPopClass = 'combo-text-pop'; }
        else if (c >= 10) { feedbackTitle = '👑 连对' + c + '题！王者风范！'; comboPopClass = 'combo-text-pop'; }
        else if (c >= 9)  { feedbackTitle = '👑 连对9题！传奇就差一步！'; comboPopClass = 'combo-text-pop'; }
        else if (c >= 8)  { feedbackTitle = '🔥🔥🔥 连对8题！完全在线！'; comboPopClass = 'combo-text-pop'; }
        else if (c >= 7)  { feedbackTitle = '🔥🔥🔥 连对7题！停不下来！'; comboPopClass = 'combo-text-pop'; }
        else if (c >= 6)  { feedbackTitle = '🔥🔥 连对6题！厉害了！'; comboPopClass = 'combo-text-pop'; }
        else if (c >= 5)  { feedbackTitle = '🔥🔥 连对5题！势不可挡！'; comboPopClass = 'combo-text-pop'; }
        else if (c >= 4)  { feedbackTitle = '🔥 连对4题！越来越好！'; comboPopClass = 'combo-text-pop'; }
        else if (c >= 3)  { feedbackTitle = '🔥 连对3题！太燃了！'; comboPopClass = 'combo-text-pop'; }
        else if (c >= 2)  { feedbackTitle = '连对2题！不错哦 🌟'; }
        else              { feedbackTitle = '答对了！⭐'; }
    } else {
        const feedbackList = feedbackMap.encourage;
        feedbackTitle = feedbackList[Math.floor(Math.random() * feedbackList.length)].cn;
    }

    // 获取正确答案（从所有可能的字段中取）
    let answerWord = (question && question.sentence) || (question && question.word) || (question && question.audio) || (question && question.prompt) || (question && question.hint) || (question && question.expected) || '';
    let answerChinese = (question && question.chinese) || '';

    // 判断题特殊处理：从解释句中提取核心中文词
    if (question && (question.type === 'listen_tf' || question.type === 'read_tf')) {
        answerWord = (question.word || question.audio || '');
        // 尝试从解释句中提取核心词，如 "这是猴子，正确！" → "猴子"
        if (answerChinese && answerChinese.length > 4) {
            var extracted = answerChinese.replace(/这是/g, '').replace(/这不是/g, '').replace(/[,，。！正确]/g, '').trim();
            // 如果提取后还是很长，就不显示
            if (extracted.length <= 4) {
                answerChinese = extracted;
            } else {
                answerChinese = '';
            }
        }
    }

    // 最后一题时按钮文案改为"查看结果"
    var isLastQuestion = (currentQuestionIndex >= moduleQuestions.length - 1);
    var continueBtnText = isLastQuestion ? '查看结果 ✨' : '继续';

    // 构建面板内容
    let contentHTML = '';
    if (isCorrect) {
        contentHTML = `
            <div class="feedback-panel-content">
                <div class="feedback-icon">✓</div>
                <div class="feedback-text">
                    <div class="feedback-title ${comboPopClass}" style="font-size: 20px;">${feedbackTitle}</div>
                    ${answerWord ? `<div class="feedback-answer"><span class="answer-word">${answerWord}</span>${answerChinese ? ` = ${answerChinese}` : ''}</div>` : ''}
                </div>
            </div>
            <button class="feedback-continue-btn" onclick="onFeedbackContinue()">${continueBtnText}</button>
        `;
    } else {
        contentHTML = `
            <div class="feedback-panel-content">
                <div class="feedback-icon">✗</div>
                <div class="feedback-text">
                    <div class="feedback-title">${feedbackTitle}</div>
                    ${answerWord ? `<div class="feedback-answer">正确答案：<span class="answer-word">${answerWord}</span>${answerChinese ? ` (${answerChinese})` : ''}</div>` : ''}
                </div>
            </div>
            <button class="feedback-continue-btn" onclick="onFeedbackContinue()">${continueBtnText}</button>
        `;
    }

    panel.innerHTML = contentHTML;
    document.body.appendChild(panel);
}

function hideFeedbackPanel() {
    const panel = document.getElementById('feedback-panel');
    if (panel) {
        panel.remove();
    }
    document.body.classList.remove('feedback-panel-active');
}

function onFeedbackContinue() {
    hideFeedbackPanel();
    hideCorrectAnswerDisplay();
    hideCorrectHint();
    isAnimating = false; // 确保动画锁解除

    // 如果上一题答对了，调用 onCorrect 加分；否则只跳到下一题
    if (lastAnswerCorrect) {
        onCorrect();
    } else {
        skipToNextQuestion();
    }
}

// ===== 题目难度自动标注（i+1 基础设施） =====
// 根据题目客观特征（词数、字母数等）自动计算难度，不需要手动标注题库
function getQuestionDifficulty(q) {
    if (!q) return 'medium';
    if (q.type === 'sentence_order') {
        var wLen = q.words ? q.words.length : 0;
        return wLen <= 3 ? 'easy' : wLen <= 5 ? 'medium' : 'hard';
    }
    if (q.type === 'word_puzzle' || q.type === 'word_spell' || q.type === 'pinyin_fill') {
        var wordLen = (q.word || q.hint || '').replace(/_/g, '').length;
        return wordLen <= 4 ? 'easy' : wordLen <= 6 ? 'medium' : 'hard';
    }
    if (q.type === 'listen_select' || q.type === 'listen_tf') {
        var audioWords = (q.audio || '').split(' ').length;
        return audioWords <= 2 ? 'easy' : audioWords <= 5 ? 'medium' : 'hard';
    }
    if (q.type === 'fill_blank') {
        return q.image ? 'easy' : 'medium';
    }
    if (q.type === 'listen_sequence') {
        // 听音排序是综合题，同时考察多个词的听力理解
        return 'hard';
    }
    if (q.type === 'sentence_sequence') {
        return 'hard';
    }
    if (q.type === 'repeat_word' || q.type === 'picture_speak') {
        return 'easy';
    }
    if (q.type === 'repeat_sentence') {
        var sWords = (q.sentence || q.word || '').split(' ').length;
        return sWords <= 4 ? 'easy' : sWords <= 7 ? 'medium' : 'hard';
    }
    if (q.type === 'word_match') {
        return 'easy';
    }
    if (q.type === 'sentence_match') {
        var smText = q.sentence || q.word || '';
        var smWords = smText.split(' ').length;
        return smWords <= 4 ? 'easy' : smWords <= 7 ? 'medium' : 'hard';
    }
    if (q.type === 'tap_pair') {
        // 图片配对为 medium，中文文字配对为 hard
        var hasImage = q.pairs && q.pairs.length > 0 && q.pairs[0].match && q.pairs[0].match.indexOf('<img') !== -1;
        return hasImage ? 'medium' : 'hard';
    }
    return 'medium';
}

// 给一组题目批量标注难度（在加载题目时调用）
function labelQuestionDifficulty(questions) {
    for (var i = 0; i < questions.length; i++) {
        if (!questions[i].difficulty) {
            questions[i].difficulty = getQuestionDifficulty(questions[i]);
        }
    }
    return questions;
}

// ===== 动态难度调整 =====
function adjustDifficulty(direction) {
    const levels = ['easy', 'medium', 'hard'];
    const currentIndex = levels.indexOf(currentDifficulty);

    if (direction === 'up' && currentIndex < levels.length - 1) {
        currentDifficulty = levels[currentIndex + 1];
        showDifficultyChangeNotice('up');
    } else if (direction === 'down' && currentIndex > 0) {
        currentDifficulty = levels[currentIndex - 1];
        showDifficultyChangeNotice('down');
    }

    console.log(`难度调整: ${direction} -> ${currentDifficulty}`);
}

function showDifficultyChangeNotice(direction) {
    const notice = document.createElement('div');
    notice.className = 'difficulty-notice';

    if (direction === 'up') {
        notice.innerHTML = '📈 难度提升！';
        notice.style.background = 'linear-gradient(135deg, #ff9500, #ffb800)';
    } else {
        notice.innerHTML = '📉 难度降低';
        notice.style.background = 'linear-gradient(135deg, #58cc02, #7ce000)';
    }

    document.body.appendChild(notice);

    setTimeout(() => {
        if (document.body.contains(notice)) {
            document.body.removeChild(notice);
        }
    }, 1500);
}

// 难度调整后，对剩余题目按新难度重新排序
// 如果当前难度的题不够了，从已做过的题中回收同难度题（间隔重复 spaced repetition）
function reorderRemainingQuestions() {
    if (currentQuestionIndex >= moduleQuestions.length - 1) return;

    var done = moduleQuestions.slice(0, currentQuestionIndex + 1);
    var remaining = moduleQuestions.slice(currentQuestionIndex + 1);

    // 检查剩余题中当前难度的题还有几道
    var targetCount = remaining.filter(function(q) { return q.difficulty === currentDifficulty; }).length;

    // 总题数上限：不能无限膨胀。最多比初始多5道回收题
    var totalCap = PRACTICE_MAX_QUESTIONS + 5;
    var canAdd = Math.max(0, totalCap - done.length - remaining.length);

    // 如果当前难度的题不足3道且还有空间，从已做过的题中回收同难度题
    if (targetCount < 3 && canAdd > 0) {
        var recycled = [];
        for (var i = 0; i < done.length; i++) {
            if (done[i].difficulty === currentDifficulty) {
                // 复制一份，标记为回收题，重新打乱顺序
                var copy = JSON.parse(JSON.stringify(done[i]));
                copy._recycled = true;
                // 如果有scrambled字段（排序题），重新打乱
                if (copy.scrambled && copy.words) {
                    copy.scrambled = copy.words.slice().sort(function() { return Math.random() - 0.5; });
                }
                if (copy.chineseScrambled && copy.chineseWords) {
                    copy.chineseScrambled = copy.chineseWords.slice().sort(function() { return Math.random() - 0.5; });
                }
                recycled.push(copy);
            }
        }
        if (recycled.length > 0) {
            // 只加到上限允许的数量
            recycled = recycled.slice(0, canAdd);
            remaining = remaining.concat(recycled);
            console.log('[i+1] 回收 ' + recycled.length + ' 道 ' + currentDifficulty + ' 题（间隔重复）| 总题数:' + (done.length + remaining.length));
        }
    }

    // 按当前难度排序
    var diffOrder = { easy: 0, medium: 1, hard: 2 };
    remaining.sort(function(a, b) {
        var da = diffOrder[a.difficulty] !== undefined ? diffOrder[a.difficulty] : 1;
        var db = diffOrder[b.difficulty] !== undefined ? diffOrder[b.difficulty] : 1;
        if (currentDifficulty === 'hard') return db - da; // hard优先
        if (currentDifficulty === 'easy') return da - db; // easy优先
        return 0; // medium保持原序
    });

    moduleQuestions = done.concat(remaining);
    var diffCounts = { easy: 0, medium: 0, hard: 0 };
    remaining.forEach(function(q) { diffCounts[q.difficulty || 'medium']++; });
    console.log('[i+1] 剩余题目按难度 ' + currentDifficulty + ' 重排 | easy:' + diffCounts.easy + ' medium:' + diffCounts.medium + ' hard:' + diffCounts.hard);
}

// ===== 计时器功能 =====
function startQuestionTimer() {
    // 清除之前的计时器
    if (questionTimer) {
        clearInterval(questionTimer);
        questionTimer = null;
    }

    if (!currentTimeLimit || currentTimeLimit === 0) {
         const timerEl = document.getElementById('question-timer');
         if (timerEl) {
             timerEl.textContent = '';
         }
         return;
    }

    timeLeft = currentTimeLimit;
    updateTimerDisplay();

    questionTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            // 时间到，强制下一题
            clearInterval(questionTimer);
            forceNextQuestion();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerEl = document.getElementById('question-timer');
    if (timerEl) {
        timerEl.textContent = `⏱️ ${timeLeft}s`;
        // 时间少于10秒变红色警告
        if (timeLeft <= 10) {
            timerEl.style.color = '#ff4b4b';
            timerEl.style.fontWeight = 'bold';
        } else {
            timerEl.style.color = '';
            timerEl.style.fontWeight = '';
        }
    }
}

function stopQuestionTimer() {
    if (questionTimer) {
        clearInterval(questionTimer);
        questionTimer = null;
    }
}

function forceNextQuestion() {
    // 时间到，显示提示并强制下一题
    showFeedbackText(false);
    speakFeedback(false);

    setTimeout(() => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        currentQuestionIndex++;
        resetHintLevel();
        syncStudentProgress();
        renderQuestion();
    }, 1500);
}

// 前测专用：显示"下一题"按钮
// 激活前测的"下一题"按钮（按钮已在renderQuestion中创建，这里只是激活）
function activatePretestNextButton() {
    var btn = document.getElementById('next-question-btn');
    if (btn) {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.background = 'linear-gradient(135deg, #1cb0f6, #0095e8)';
        btn.style.boxShadow = '0 4px 0 #0077cc';
        btn.style.color = 'white';
    }
}

// 倒计时（前测和实战共用）
var pretestTimerInterval = null;
var pretestTimeRemaining = 0;

function startPretestTimer(seconds) {
    pretestTimeRemaining = seconds || 5 * 60;
    // 等 renderQuestion() 创建 DOM 后再更新，避免第0秒空白
    setTimeout(updatePretestTimerDisplay, 50);
    pretestTimerInterval = setInterval(function() {
        pretestTimeRemaining--;
        updatePretestTimerDisplay();
        if (pretestTimeRemaining <= 0) {
            clearInterval(pretestTimerInterval);
            pretestTimerInterval = null;
            currentQuestionIndex = moduleQuestions.length;
            // 实战时间到：先显示提示再跳转
            if (currentPhase === 'practice') {
                var toast = document.createElement('div');
                toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.78);color:#fff;font-size:22px;font-weight:bold;padding:18px 36px;border-radius:18px;z-index:9999;pointer-events:none;';
                toast.textContent = '⏰ 时间到！';
                document.body.appendChild(toast);
                setTimeout(function() { toast.remove(); renderQuestion(); }, 1500);
            } else {
                renderQuestion();
            }
        }
    }, 1000);
}


function stopPretestTimer() {
    if (pretestTimerInterval) {
        clearInterval(pretestTimerInterval);
        pretestTimerInterval = null;
    }
}

function updatePretestTimerDisplay() {
    var timerEl = document.getElementById('pretest-countdown');
    if (!timerEl) return;
    var min = Math.floor(pretestTimeRemaining / 60);
    var sec = pretestTimeRemaining % 60;
    timerEl.textContent = min + ':' + (sec < 10 ? '0' : '') + sec;
    if (pretestTimeRemaining <= 60) {
        timerEl.style.color = '#ff4b4b';
    }
}

// 手动跳过/下一题按钮
function skipToNextQuestion() {
    if (isAnimating) return;
    stopQuestionTimer();
    hideCorrectAnswerDisplay();
    // 前测：交替；实战：不切换
    if (currentPhase !== 'practice') {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }
    currentQuestionIndex++;
    resetHintLevel();
    syncStudentProgress();
    renderQuestion();
}

function showCorrectHint(answer) {
    let hint = document.getElementById('correct-hint');
    if (!hint) {
        hint = document.createElement('div');
        hint.id = 'correct-hint';
        hint.className = 'correct-hint';
        document.getElementById('question-container').appendChild(hint);
    }
    hint.innerHTML = `💡 提示：<strong>${answer}</strong>`;
    hint.style.display = 'block';
}

function hideCorrectHint() {
    const hint = document.getElementById('correct-hint');
    if (hint) {
        hint.style.display = 'none';
    }
    const progressiveHint = document.getElementById('progressive-hint');
    if (progressiveHint) {
        progressiveHint.style.display = 'none';
    }
}

function onCorrect() {
    if (window.earnedStarThisTurn) {
        if (currentPhase === 'practice') {
            // 实战阶段：两人合作，都加⭐（实战才有星星）
            players[0].stars += 1;
            players[1].stars += 1;
        }
        // 前测：不加星 —— 前测目的是诊断，不是竞争
        // 准确率数据已在 handleAnswer 的 pretestStats 中实时统计
    }
    updateHeader();
    createConfetti(15);

    // 前测：严格交替 A→B；实战：不切换（两人一起）
    if (currentPhase !== 'practice') {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }
    currentQuestionIndex++;
    syncStudentProgress();
    renderQuestion();
}

// ===== Memory Match Game (翻牌配对) =====
function hasMemoryGameData() {
    if (!currentLessonData || !currentLessonData.reading) return false;
    var practiceWords = (currentLessonData.reading.practice || []).filter(function(q) {
        return q.type === 'word_match';
    });
    var pretestWords = (currentLessonData.reading.pretest || []).filter(function(q) {
        return q.type === 'word_match';
    });
    return (practiceWords.length + pretestWords.length) >= 4;
}

function getMemoryCards() {
    var wordMatchQuestions = (currentLessonData.reading.practice || []).filter(function(q) {
        return q.type === 'word_match';
    });
    if (wordMatchQuestions.length < 4) {
        var pretestWords = (currentLessonData.reading.pretest || []).filter(function(q) {
            return q.type === 'word_match';
        });
        wordMatchQuestions = wordMatchQuestions.concat(pretestWords);
    }
    // 去重（按 word 字段）
    var seen = {};
    var unique = [];
    for (var i = 0; i < wordMatchQuestions.length; i++) {
        if (!seen[wordMatchQuestions[i].word]) {
            seen[wordMatchQuestions[i].word] = true;
            unique.push(wordMatchQuestions[i]);
        }
    }
    wordMatchQuestions = unique.slice(0, 4);

    var cards = [];
    for (var i = 0; i < wordMatchQuestions.length; i++) {
        var q = wordMatchQuestions[i];
        // 找到正确选项的图片
        var imgSrc = '';
        for (var j = 0; j < q.options.length; j++) {
            var opt = q.options[j];
            var optVal = typeof opt === 'object' ? opt.value : opt;
            if (optVal === q.correct) {
                var optText = typeof opt === 'object' ? opt.text : opt;
                // 从 <img src="..."> 中提取 src
                var srcMatch = optText.match(/src="([^"]+)"/);
                if (srcMatch) imgSrc = srcMatch[1];
                break;
            }
        }
        cards.push({ type: 'word', content: q.word, pairId: i, imgSrc: '' });
        cards.push({ type: 'image', content: imgSrc, pairId: i, word: q.word });
    }
    return shuffleArray(cards);
}

function showMemoryGame() {
    var cards = getMemoryCards();
    if (cards.length < 8) { proceedAfterPractice(); return; }

    var container = document.getElementById('question-container');
    var memoryState = {
        cards: cards,
        flippedIndices: [],   // 当前翻开的（最多2张）
        matchedPairs: 0,
        locked: false,        // 翻牌锁（等动画时不可点）
        currentPlayer: 0      // 0 或 1
    };

    function getPlayerName(idx) {
        return players[idx] ? players[idx].name.replace(/^\d+\.\s*/, '') : ('Student ' + (idx + 1));
    }

    function render() {
        var html = '<div class="memory-game-container">';
        html += '<div class="memory-game-title">🎮 翻牌配对！</div>';
        html += '<div class="memory-game-rule">找出 <strong>单词 + 图片</strong> 的配对 · 翻错了换人</div>';
        var flippedCount = memoryState.flippedIndices.length;
        var turnMsg = flippedCount === 1 ? '已翻1张，再翻1张！' : '请翻2张牌';
        html += '<div class="memory-game-turn">👉 <strong>' + getPlayerName(memoryState.currentPlayer) + '</strong> · ' + turnMsg + '</div>';
        html += '<div class="memory-game-grid">';

        for (var i = 0; i < memoryState.cards.length; i++) {
            var card = memoryState.cards[i];
            var isFlipped = memoryState.flippedIndices.indexOf(i) !== -1;
            var isMatched = card.matched;
            var classes = 'memory-card';
            if (isFlipped || isMatched) classes += ' flipped';
            if (isMatched) classes += ' matched';

            var backContent = '';
            if (card.type === 'word') {
                backContent = '<span style="font-size:15px;font-weight:bold;">' + card.content + '</span>';
            } else {
                backContent = card.content ? '<img src="' + card.content + '" style="max-width:65px;max-height:65px;">' : '🖼️';
            }

            html += '<div class="' + classes + '" data-index="' + i + '">';
            html += '<div class="memory-card-inner">';
            html += '<div class="memory-card-front">❓</div>';
            html += '<div class="memory-card-back">' + backContent + '</div>';
            html += '</div></div>';
        }

        html += '</div>'; // grid

        // 计分
        html += '<div class="memory-game-scores">';
        for (var p = 0; p < 2; p++) {
            var activeClass = memoryState.currentPlayer === p ? ' active-scorer' : '';
            html += '<div class="memory-score-item' + activeClass + '">';
            html += getPlayerName(p) + ' ⭐' + (players[p] ? players[p].stars : 0);
            html += '</div>';
        }
        html += '</div>';
        html += '</div>'; // container

        container.innerHTML = html;

        // 绑定点击事件
        var cardEls = container.querySelectorAll('.memory-card');
        for (var j = 0; j < cardEls.length; j++) {
            cardEls[j].addEventListener('click', onCardClick);
        }
    }

    function onCardClick(e) {
        if (memoryState.locked) return;

        var cardEl = e.currentTarget;
        var idx = parseInt(cardEl.getAttribute('data-index'));
        var card = memoryState.cards[idx];

        // 不能翻已配对的牌
        if (card.matched) return;
        // 不能翻当前已翻开的牌
        if (memoryState.flippedIndices.indexOf(idx) !== -1) return;
        // 最多翻2张
        if (memoryState.flippedIndices.length >= 2) return;

        // 翻牌
        memoryState.flippedIndices.push(idx);
        cardEl.classList.add('flipped');

        if (memoryState.flippedIndices.length === 2) {
            // 两张翻开，检查配对
            memoryState.locked = true;
            var idx1 = memoryState.flippedIndices[0];
            var idx2 = memoryState.flippedIndices[1];
            var card1 = memoryState.cards[idx1];
            var card2 = memoryState.cards[idx2];

            if (card1.pairId === card2.pairId && card1.type !== card2.type) {
                // 配对成功！
                setTimeout(function() {
                    card1.matched = true;
                    card2.matched = true;
                    memoryState.matchedPairs++;

                    // 加星
                    if (players[memoryState.currentPlayer]) {
                        players[memoryState.currentPlayer].stars++;
                    }

                    if (window.SoundSystem) SoundSystem.playCorrect();

                    memoryState.flippedIndices = [];
                    memoryState.locked = false;

                    if (memoryState.matchedPairs >= 4) {
                        // 游戏结束
                        render();
                        createConfetti(20);
                        setTimeout(function() {
                            proceedAfterPractice();
                        }, 2000);
                    } else {
                        render(); // 不换人，继续翻
                    }
                }, 500);
            } else {
                // 不配对
                setTimeout(function() {
                    if (window.SoundSystem) SoundSystem.playWrong();

                    // 翻回去
                    memoryState.flippedIndices = [];
                    // 换人
                    memoryState.currentPlayer = memoryState.currentPlayer === 0 ? 1 : 0;
                    memoryState.locked = false;
                    render();
                }, 1000);
            }
        }
    }

    render();
}

// ===== Unit Project (单元小项目) =====
// 注：U*L4 的 items: [] 是测试占位符，不代表真实数据，待后续课程内容补充
var projectMap = {
    'U1L1': { title: '🏞️ 设计你的动物园', task: '用10个金币选动物，设计你们的动物园！', example: '', icon: '🦁', projectId: 'proj_02', items: [] },
    'U1L4': {
        title: '\ud83e\udd81 \u8bbe\u8ba1\u4f60\u7684\u52a8\u7269\u56ed',
        task: '\u90093\u4e2a\u4f60\u6700\u559c\u6b22\u7684\u52a8\u7269\uff0c\u7528\u82f1\u6587\u4ecb\u7ecd\u5b83\u4eec\uff01',
        example: '\u4f8b\u5982\uff1a"This is a bear. It\'s big. I like it!"',
        icon: '\ud83c\udfde\ufe0f',
        items: []
    },
    'U2L4': {
        title: '\ud83d\udc57 \u6211\u7684\u65f6\u88c5\u79c0',
        task: '\u90093\u4ef6\u8863\u670d\u642d\u914d\u4e00\u5957\u7a7f\u642d\uff0c\u7528\u82f1\u6587\u4ecb\u7ecd\u4f60\u7684\u642d\u914d\uff01',
        example: '\u4f8b\u5982\uff1a"I wear a T-shirt and shorts. My shoes are white!"',
        icon: '\ud83d\udc54',
        items: []
    },
    'U3L4': {
        title: '\ud83d\udcc5 \u6211\u7684\u5b8c\u7f8e\u4e00\u5929',
        task: '\u5b89\u6392\u4f60\u7684\u4e00\u5929\uff0c\u7528\u82f1\u6587\u8bf4\u51fa3\u4e2a\u65f6\u95f4\u548c\u6d3b\u52a8\uff01',
        example: '\u4f8b\u5982\uff1a"It\'s 7 o\'clock. It\'s time for breakfast!"',
        icon: '\u23f0',
        items: []
    },
    'U4L4': {
        title: '\ud83c\udf7d\ufe0f \u8bbe\u8ba1\u4f60\u7684\u83dc\u5355',
        task: '\u4e3a\u4f60\u7684\u9910\u5385\u8bbe\u8ba1\u83dc\u5355\uff0c\u7528\u82f1\u6587\u4ecb\u7ecd\u65e9\u9910\u3001\u5348\u9910\u548c\u665a\u9910\u5404\u6709\u4ec0\u4e48\uff01',
        example: '\u4f8b\u5982\uff1a"For breakfast, we have eggs and milk!"',
        icon: '\ud83d\udccb',
        items: []
    }
};

function proceedAfterPractice() {
    var lessonId = getCurrentLessonId();
    if (lessonId && projectMap[lessonId]) {
        showUnitProject(lessonId);
    } else {
        showFinishScreen();
    }
}

function showUnitProject(lessonId) {
    var project = projectMap[lessonId];
    if (!project) { showFinishScreen(); return; }

    // 动物园项目：有交互的版本
    if (project.projectId === 'proj_02' && window.projectsData) {
        var zooData = null;
        for (var i = 0; i < window.projectsData.length; i++) {
            if (window.projectsData[i].id === 'proj_02') { zooData = window.projectsData[i]; break; }
        }
        if (zooData) { showZooProject(zooData); return; }
    }

    // 其他项目：口头版
    var container = document.getElementById('question-container');
    function getPlayerName(idx) {
        return players[idx] ? players[idx].name.replace(/^\d+\.\s*/, '') : ('Student ' + (idx + 1));
    }
    var html = '<div class="unit-project-container">';
    html += '<div class="unit-project-icon">' + project.icon + '</div>';
    html += '<div class="unit-project-title">' + project.title + '</div>';
    html += '<div class="unit-project-task">' + project.task + '</div>';
    if (project.example) html += '<div class="unit-project-example">' + project.example + '</div>';
    html += '<div class="unit-project-instruction">\ud83d\udde3\ufe0f \u4e24\u4e2a\u4eba\u4e00\u8d77\u8ba8\u8bba\uff0c\u7136\u540e\u8f6e\u6d41\u7528\u82f1\u6587\u4ecb\u7ecd\u4f60\u4eec\u7684\u4f5c\u54c1\uff01</div>';
    for (var p = 0; p < 2; p++) {
        html += '<div class="unit-project-player-card"><div class="unit-project-player-name">\ud83d\udc64 ' + getPlayerName(p) + '</div><div class="unit-project-player-status">\ud83c\udfa4 \u8bf7\u53e3\u5934\u5b8c\u6210\u4efb\u52a1</div></div>';
    }
    html += '<div class="unit-project-buttons"><button class="unit-project-btn skip" onclick="skipUnitProject()">\u23ed\ufe0f \u8df3\u8fc7</button><button class="unit-project-btn complete" onclick="completeUnitProject()">\u2705 \u5b8c\u6210\uff01</button></div></div>';
    container.innerHTML = html;
}

// ===== 动物园项目：A选动物（预算限制）→ B读句子 → 展示成果 =====
function showZooProject(zooData) {
    var container = document.getElementById('question-container');
    var nameA = players[0] ? players[0].name.replace(/^\d+\.\s*/, '') : 'A';
    var nameB = players[1] ? players[1].name.replace(/^\d+\.\s*/, '') : 'B';
    var budget = zooData.budget;
    var remaining = budget;
    var selected = [];

    function renderZoo() {
        container.innerHTML = '';
        var wrap = document.createElement('div');
        wrap.style.cssText = 'padding:16px;font-family:sans-serif;max-width:414px;margin:0 auto;';

        // 标题
        var title = document.createElement('div');
        title.style.cssText = 'text-align:center;margin-bottom:12px;';
        title.innerHTML = '<div style="font-size:20px;font-weight:bold;">\ud83c\udfde\ufe0f \u8bbe\u8ba1\u4f60\u7684\u52a8\u7269\u56ed</div>' +
            '<div style="font-size:13px;color:#666;margin-top:4px;">\u7528' + budget + '\u4e2a\u91d1\u5e01\u9009\u52a8\u7269\uff01</div>';
        wrap.appendChild(title);

        // A区：选动物
        var zoneA = document.createElement('div');
        zoneA.style.cssText = 'background:#e8f4fd;border:2px solid #1cb0f6;border-radius:12px;padding:12px;margin-bottom:12px;';
        zoneA.innerHTML = '<div style="font-size:14px;font-weight:bold;color:#1cb0f6;margin-bottom:8px;">\ud83d\udd35 ' + nameA + ' \u9009\u52a8\u7269</div>' +
            '<div style="font-size:13px;color:#555;margin-bottom:10px;">\ud83d\udcb0 \u5269\u4f59\u91d1\u5e01\uff1a<strong style="font-size:20px;color:#f5a623;">' + remaining + '</strong> / ' + budget + '</div>';

        var grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:8px;';
        zooData.animals.forEach(function(animal) {
            var isSel = selected.some(function(s) { return s.name === animal.name; });
            var canAfford = remaining >= animal.price;
            var card = document.createElement('div');
            card.style.cssText = 'text-align:center;padding:10px 4px;border-radius:10px;border:2px solid ' +
                (isSel ? '#58cc02' : (canAfford ? '#cce5ff' : '#eee')) +
                ';background:' + (isSel ? '#f0fff0' : '#fff') +
                ';cursor:' + (isSel || canAfford ? 'pointer' : 'default') +
                ';opacity:' + (canAfford || isSel ? '1' : '0.4') + ';';
            card.innerHTML = '<div style="font-size:34px;">' + animal.emoji + '</div>' +
                '<div style="font-size:13px;font-weight:bold;">' + animal.name + '</div>' +
                '<div style="font-size:12px;color:#f5a623;">\ud83d\udcb0' + animal.price + '</div>' +
                (isSel ? '<div style="font-size:11px;color:#58cc02;">\u2705</div>' : '');
            if (isSel) {
                card.onclick = (function(a) { return function() {
                    selected = selected.filter(function(s) { return s.name !== a.name; });
                    remaining += a.price; renderZoo();
                }; })(animal);
            } else if (canAfford) {
                card.onclick = (function(a) { return function() {
                    selected.push(a); remaining -= a.price; renderZoo();
                }; })(animal);
            }
            grid.appendChild(card);
        });
        zoneA.appendChild(grid);
        if (selected.length > 0) {
            var selLine = document.createElement('div');
            selLine.style.cssText = 'font-size:13px;color:#333;';
            selLine.textContent = '\u5df2\u9009\uff1a' + selected.map(function(s) { return s.emoji + s.name; }).join('  ');
            zoneA.appendChild(selLine);
        }
        wrap.appendChild(zoneA);

        // B区：读句子
        if (selected.length > 0) {
            var zoneB = document.createElement('div');
            zoneB.style.cssText = 'background:#fff8e8;border:2px solid #f5a623;border-radius:12px;padding:12px;margin-bottom:12px;';
            zoneB.innerHTML = '<div style="font-size:14px;font-weight:bold;color:#f5a623;margin-bottom:8px;">\ud83d\udfe0 ' + nameB + ' \u4ecb\u7ecd\u52a8\u7269\u56ed</div>' +
                '<div style="font-size:12px;color:#888;margin-bottom:8px;">\u70b9\ud83d\udd0a\u542c\u53d1\u97f3\uff0c\u8ddf\u7740\u8bf4\uff01</div>';
            selected.forEach(function(animal) {
                var row = document.createElement('div');
                row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px;background:#fff;border-radius:8px;margin-bottom:6px;';
                var speakSentence = animal.sentence.replace(/'/g, "\\'");
                row.innerHTML = '<span style="font-size:28px;">' + animal.emoji + '</span>' +
                    '<span style="flex:1;font-size:14px;font-weight:bold;">' + animal.sentence + '</span>' +
                    '<button onclick="if(typeof speakWord===\'function\')speakWord(\'' + speakSentence + '\')" ' +
                    'style="background:#1cb0f6;color:#fff;border:none;border-radius:8px;padding:6px 10px;font-size:18px;cursor:pointer;">\ud83d\udd0a</button>';
                zoneB.appendChild(row);
            });
            wrap.appendChild(zoneB);
        }

        // 按钮
        var btns = document.createElement('div');
        btns.style.cssText = 'display:flex;gap:10px;';
        btns.innerHTML = '<button onclick="skipUnitProject()" style="flex:1;background:#ddd;color:#666;border:none;border-radius:12px;padding:12px;font-size:14px;">\u23ed\ufe0f \u8df3\u8fc7</button>';
        if (selected.length > 0) {
            btns.innerHTML += '<button onclick="completeUnitProject()" style="flex:2;background:#58cc02;color:#fff;border:none;border-radius:12px;padding:12px;font-size:16px;font-weight:bold;">\u2705 \u52a8\u7269\u56ed\u5b8c\u6210\uff01</button>';
        }
        wrap.appendChild(btns);
        container.appendChild(wrap);
    }
    renderZoo();
}

function skipUnitProject() {
    showFinishScreen();
}

function completeUnitProject() {
    // 两人各得3⭐奖励星
    if (players[0]) players[0].stars += 3;
    if (players[1]) players[1].stars += 3;
    createConfetti(30);

    if (window.SoundSystem) SoundSystem.playCorrect();

    // 短暂延迟后进入结果页
    setTimeout(function() {
        showFinishScreen();
    }, 1500);
}

// ===== 宝石 & 段位系统 =====

// 宝石存储：每位学生独立累积（因为搭档每节课可能不同）
function loadPlayerGems(studentId) {
    try { return JSON.parse(localStorage.getItem('merryGems_' + studentId) || '{"total":0}'); }
    catch(e) { return { total: 0 }; }
}
function savePlayerGems(studentId, data) {
    try { localStorage.setItem('merryGems_' + studentId, JSON.stringify(data)); } catch(e) {}
}

// 本节课的星星换算成宝石（10⭐ = 1💎，每10颗才换一颗，让宝石有价值感）
function convertStarsToGems(sessionStars) {
    return Math.floor(sessionStars / 10);
}

// 段位（按小组两人中总宝石数平均值判断）
function getGroupRank(avgGems) {
    if (avgGems >= 60) return { icon: '👑', name: '传奇', color: '#FFD700', desc: '顶级！' };
    if (avgGems >= 30) return { icon: '💎', name: '精英', color: '#b980f0', desc: '出类拔萃' };
    if (avgGems >= 15) return { icon: '🔥', name: '达人', color: '#ff6b35', desc: '相当厉害' };
    if (avgGems >= 5)  return { icon: '🌟', name: '学徒', color: '#1cb0f6', desc: '进步很快' };
    return                   { icon: '🌱', name: '新芽', color: '#58cc02', desc: '刚刚起步' };
}

// 本节课称号（当堂行为，结束时即时评定）
function getSessionTitles(sessionStars, totalQuestions, maxCombo, hadMistakes, p1PretestAcc, p2PretestAcc) {
    var titles = [];
    // 正确率（实战）
    var acc = totalQuestions > 0 ? sessionStars / totalQuestions : 0;
    if (acc >= 1.0 && totalQuestions > 0)  titles.push({ icon: '👑', name: '无懈可击', desc: '100% 全对！' });
    else if (acc >= 0.9)                   titles.push({ icon: '🎯', name: '精准射手', desc: '正确率 90%+' });
    // 连胜
    if (maxCombo >= 10)      titles.push({ icon: '🔥', name: '传奇连胜', desc: '连对 ' + maxCombo + ' 题！' });
    else if (maxCombo >= 7)  titles.push({ icon: '🔥', name: '连胜王', desc: '连对 ' + maxCombo + ' 题' });
    else if (maxCombo >= 5)  titles.push({ icon: '🔥', name: '势如破竹', desc: '连对 ' + maxCombo + ' 题' });
    // 坚持完成
    if (hadMistakes && totalQuestions > 0) titles.push({ icon: '💪', name: '永不放弃', desc: '遇挫但完成了全部题目' });
    // 前测默契搭档（两人前测都≥70%）
    if (typeof p1PretestAcc !== 'undefined' && typeof p2PretestAcc !== 'undefined') {
        if (p1PretestAcc >= 70 && p2PretestAcc >= 70) titles.push({ icon: '🤝', name: '默契搭档', desc: '两人前测均 70%+' });
    }
    return titles;
}

// 计算距下一段位还差多少
function getNextRankInfo(avgGems) {
    var tiers = [
        { at: 5,  name: '学徒', icon: '🌟', color: '#1cb0f6' },
        { at: 15, name: '达人', icon: '🔥', color: '#ff6b35' },
        { at: 30, name: '精英', icon: '💎', color: '#b980f0' },
        { at: 60, name: '传奇', icon: '👑', color: '#FFD700' }
    ];
    for (var i = 0; i < tiers.length; i++) {
        if (avgGems < tiers[i].at) {
            var prev = i > 0 ? tiers[i-1].at : 0;
            return {
                next: tiers[i].at, nextName: tiers[i].name,
                nextIcon: tiers[i].icon, nextColor: tiers[i].color,
                need: tiers[i].at - avgGems,
                progress: (avgGems - prev) / (tiers[i].at - prev)
            };
        }
    }
    return null;
}

// 数字从0滚动到目标值（ease-out cubic）
function animateFinishNumbers(stars, gems, combo) {
    function countUp(elId, target, duration, delay) {
        setTimeout(function() {
            var el = document.getElementById(elId);
            if (!el) return;
            if (target === 0) { el.textContent = 0; return; }
            var start = null;
            function step(ts) {
                if (!start) start = ts;
                var pct = Math.min((ts - start) / duration, 1);
                var eased = 1 - Math.pow(1 - pct, 3);
                el.textContent = Math.round(target * eased);
                if (pct < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }, delay);
    }
    countUp('finish-num-stars', stars, 900, 100);
    countUp('finish-num-gems',  gems,  700, 400);
    countUp('finish-num-combo', combo, 600, 700);
}

function showFinishScreen() {
    checkAndShowAchievements(renderFinishScreen);
}

function renderFinishScreen() {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) screens[i].classList.remove('active');
    document.getElementById('finish-screen').classList.add('active');

    // 结果页：隐藏所有答题状态 chrome（干净庆祝感）
    ['turn-indicator', 'question-progress', 'quiz-seg-bar'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    var finishStars = document.getElementById('finish-stars');
    var s0 = players[0].stars;
    var totalQ = moduleQuestions.length;
    var maxCombo = Math.max(pretestStats.player1.maxCombo || 0, pretestStats.player2.maxCombo || 0,
                            window.sessionMaxCombo || 0);
    var name1 = players[0] ? players[0].name.replace(/^\d+\.\s*/, '') : 'A';
    var name2 = players[1] ? players[1].name.replace(/^\d+\.\s*/, '') : 'B';
    var groupName = name1 + ' & ' + name2;

    function extractId(n) { var m = n.match(/^(\d+)/); return m ? m[1] : n; }
    var id1 = extractId(players[0].name);
    var id2 = extractId(players[1] ? players[1].name : '');

    var newGems = convertStarsToGems(s0);
    var gem1data = loadPlayerGems(id1); gem1data.total = (gem1data.total || 0) + newGems; savePlayerGems(id1, gem1data);
    var gem2data = loadPlayerGems(id2); gem2data.total = (gem2data.total || 0) + newGems; savePlayerGems(id2, gem2data);
    var avgGems = Math.round((gem1data.total + gem2data.total) / 2);

    var rank     = getGroupRank(avgGems);
    var nextRank = getNextRankInfo(avgGems);

    var p1PretestAcc = savedPretestSnapshot && savedPretestSnapshot.player1 && savedPretestSnapshot.player1.total > 0
        ? Math.round(savedPretestSnapshot.player1.correct / savedPretestSnapshot.player1.total * 100) : undefined;
    var p2PretestAcc = savedPretestSnapshot && savedPretestSnapshot.player2 && savedPretestSnapshot.player2.total > 0
        ? Math.round(savedPretestSnapshot.player2.correct / savedPretestSnapshot.player2.total * 100) : undefined;
    var hadMistakes = (pretestStats.player1.total > pretestStats.player1.correct) ||
                      (pretestStats.player2.total > pretestStats.player2.correct);
    var sessionTitles = getSessionTitles(s0, totalQ, maxCombo, hadMistakes, p1PretestAcc, p2PretestAcc);
    var newAchs = window.sessionNewAchievements || [];

    // === 鼓励语（Bandura: Verbal Persuasion）===
    var acc = totalQ > 0 ? s0 / totalQ : 0;
    var encouragement;
    if (acc >= 1.0 && totalQ > 0) encouragement = '完美！全部答对！你们真的太厉害了！';
    else if (acc >= 0.9)          encouragement = '几乎全对！太拼了，继续保持！';
    else if (acc >= 0.7)          encouragement = '做得不错！多练几次就更棒了！';
    else if (maxCombo >= 5)       encouragement = '连胜厉害！下次可以答得更准！';
    else                          encouragement = '坚持到底！每次练习都在进步！';

    // === 最佳称号（取第1个最重要的，最多2个）===
    var topTitles = sessionTitles.slice(0, 2);

    var html = '';

    // ── Layer 1：英雄区（最大、第一眼） ─────────────────────────────
    // Bandura: Mastery Experience + Social Constructivism（两人共同成果）
    html += '<div style="text-align:center;padding:28px 20px 0;">';
    html += '<div style="font-size:11px;color:#bbb;letter-spacing:2px;margin-bottom:8px;text-transform:uppercase;">闯关赛完成 🎉</div>';
    html += '<div style="font-size:21px;font-weight:900;color:#2c3e50;margin-bottom:20px;">' + groupName + '</div>';

    // 大星星数字
    html += '<div style="position:relative;display:inline-block;margin-bottom:4px;">';
    html += '<div id="finish-num-stars" style="font-size:72px;font-weight:900;line-height:1;color:#f5a623;font-variant-numeric:tabular-nums;">0</div>';
    html += '<div style="font-size:16px;color:#bbb;margin-top:2px;font-weight:600;">颗星星 ⭐</div>';
    html += '</div>';

    // 称号徽章（Bandura: Mastery Experience 即时认可）
    if (topTitles.length > 0) {
        html += '<div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin:16px 0 0;">';
        topTitles.forEach(function(t) {
            html += '<div style="display:inline-flex;align-items:center;gap:6px;background:white;border-radius:24px;padding:8px 16px;border:2px solid #eee;box-shadow:0 2px 8px rgba(0,0,0,0.06);">';
            html += '<span style="font-size:18px;">' + t.icon + '</span>';
            html += '<div style="text-align:left;"><div style="font-size:14px;font-weight:800;color:#333;">' + t.name + '</div>';
            html += '<div style="font-size:11px;color:#aaa;">' + t.desc + '</div></div>';
            html += '</div>';
        });
        html += '</div>';
    }

    // 鼓励语（Bandura: Verbal Persuasion）
    html += '<div style="margin:14px 20px 0;font-size:15px;color:#666;line-height:1.5;font-style:italic;">"' + encouragement + '"</div>';
    html += '</div>'; // Layer 1 end

    // ── Layer 2：次要数据（连胜 — 小，不抢焦点）────────────────────
    if (maxCombo >= 3) {
        html += '<div style="text-align:center;margin:18px 20px 0;">';
        html += '<div style="display:inline-flex;align-items:center;gap:6px;background:#fff4ee;border-radius:20px;padding:6px 16px;border:1.5px solid rgba(255,130,0,0.2);">';
        html += '<span style="font-size:16px;">🔥</span>';
        html += '<span style="font-size:13px;font-weight:700;color:#ff6b35;">最长连胜 <span id="finish-num-combo" style="font-size:16px;">0</span> 题</span>';
        html += '</div></div>';
    }

    // ── Layer 3：ZPD进度（Vygotsky: 可见的下一步目标）──────────────
    html += '<div style="margin:18px 16px 0;background:linear-gradient(135deg,' + rank.color + '15,' + rank.color + '05);border-radius:18px;padding:14px 16px;border:1.5px solid ' + rank.color + '25;">';

    // 当前段位 + 新增宝石标记
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:' + (nextRank ? '12px' : '0') + ';">';
    html += '<div style="font-size:26px;">' + rank.icon + '</div>';
    html += '<div style="flex:1;"><div style="font-size:15px;font-weight:800;color:' + rank.color + ';">' + rank.name + '</div>';
    html += '<div style="font-size:11px;color:#999;margin-top:1px;">累计 ' + avgGems + ' 💎</div></div>';
    if (newGems > 0) {
        html += '<div style="background:' + rank.color + ';color:white;font-size:12px;font-weight:700;padding:4px 10px;border-radius:20px;">+' + newGems + ' 💎</div>';
    }
    html += '</div>';

    // 进度条（ZPD: 距下一段位"跳一跳够得着"）
    if (nextRank) {
        html += '<div style="display:flex;align-items:center;gap:8px;">';
        html += '<span style="font-size:14px;">' + rank.icon + '</span>';
        html += '<div style="flex:1;background:rgba(0,0,0,0.08);border-radius:20px;height:8px;overflow:hidden;">';
        html += '<div id="rank-progress-bar" style="height:100%;width:0%;background:' + rank.color + ';border-radius:20px;transition:width 1.2s cubic-bezier(0.34,1.2,0.64,1);"></div>';
        html += '</div>';
        html += '<span style="font-size:14px;">' + nextRank.nextIcon + '</span>';
        html += '</div>';
        html += '<div style="text-align:center;font-size:12px;color:#888;margin-top:7px;">再得 <strong style="color:' + nextRank.nextColor + ';">' + nextRank.need + '</strong> 颗 💎 就升级到 ' + nextRank.nextName + '！</div>';
    }
    html += '</div>'; // Layer 3 end

    // ── 按钮区 ────────────────────────────────────────────────────
    // ── 按钮区：只保留「再来一次」（每台手机固定一对学生）──────────
    html += '<div style="padding:20px 16px 32px;">';
    html += '<button onclick="restartCurrentModule()" style="width:100%;padding:16px;font-size:18px;font-weight:700;background:linear-gradient(135deg,#58cc02,#46a302);border:none;color:white;border-radius:16px;cursor:pointer;box-shadow:0 4px 14px rgba(88,204,2,0.35);margin-bottom:10px;">🔄 再来一次</button>';
    html += '<button onclick="showTestSelectScreen()" style="width:100%;padding:14px;font-size:16px;font-weight:600;background:#fff;border:2px solid #e0e0e0;color:#555;border-radius:16px;cursor:pointer;">⚙️ 换模块 / 换课程</button>';
    html += '</div>';

    finishStars.innerHTML = html;

    createConfetti(50);
    syncStudentProgress(true);

    // 数字动画（DOM设置后才能拿到元素）
    animateFinishNumbers(s0, newGems, maxCombo);

    // 段位进度条（延迟让CSS transition触发）
    setTimeout(function() {
        var bar = document.getElementById('rank-progress-bar');
        if (bar && nextRank) bar.style.width = Math.max(4, Math.round(nextRank.progress * 100)) + '%';
    }, 300);

    // 飞书宝石备份（延迟2秒，避免与成绩上传冲突）
    setTimeout(function() {
        try {
            var scfUrl = 'https://1316992450-2fbeeh6iet.ap-guangzhou.tencentscf.com/';
            var lessonId    = (currentLessonData && currentLessonData.id)    ? currentLessonData.id    : '';
            var lessonTitle = (currentLessonData && currentLessonData.title) ? currentLessonData.title : '';
            function sendGemsRecord(studentName, totalGems, newGemsThis) {
                var payload = {
                    studentName: studentName, timestamp: Date.now(),
                    examType: 'gems_backup', score: newGemsThis, maxScore: totalGems,
                    accuracy: totalGems, phase: '实战', wrongWords: '',
                    lessonTitle: lessonId + ' ' + lessonTitle,
                    listeningScore:0, readingScore:0, writingScore:0, speakingScore:0
                };
                scfPost(payload).then(function() {
                    console.log('[飞书💎] ' + studentName + ' 备份成功，累计=' + totalGems);
                }).catch(function() {
                    console.warn('[飞书💎] ' + studentName + ' 备份失败');
                });
            }
            sendGemsRecord(name1, gem1data.total, newGems);
            setTimeout(function() { sendGemsRecord(name2, gem2data.total, newGems); }, 600);
        } catch(e) { console.warn('[飞书💎] 备份出错:', e); }
    }, 2000);
}


// 重新开始当前模块
function restartCurrentModule() {
    document.getElementById('finish-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    startGame();
}

// ===== 宠物系统集成 =====

// 宠物按钮点击事件
var petBtn = document.getElementById('pet-btn');
if (petBtn) {
    petBtn.onclick = function() {
        if (typeof showPetModal === 'function') {
            showPetModal();
        }
    };
}

// ===== 进度地图集成 =====

// 进度地图按钮点击事件
var mapBtn = document.getElementById('map-btn');
if (mapBtn) {
    mapBtn.onclick = function() {
        if (typeof showProgressMapModal === 'function') {
            showProgressMapModal();
        }
    };
}

// 从地图选择课程
function selectLessonFromMap(lessonId) {
    // 根据lessonId找到对应的课程数据（旧方案数据已清理，仅保留typeof守卫避免崩溃）
    var lessonMap = {
        'U1L1': (typeof lesson1 !== 'undefined') ? lesson1 : null,
        'U1L2': (typeof unit1_lesson2 !== 'undefined') ? unit1_lesson2 : null,
        'U1L3': (typeof unit1_lesson3 !== 'undefined') ? unit1_lesson3 : null,
        'U1L4': (typeof unit1_lesson4 !== 'undefined') ? unit1_lesson4 : null,
        'U2L1': (typeof unit2_lesson1 !== 'undefined') ? unit2_lesson1 : null,
        'U2L2': (typeof unit2_lesson2 !== 'undefined') ? unit2_lesson2 : null,
        'U2L3': (typeof unit2_lesson3 !== 'undefined') ? unit2_lesson3 : null,
        'U2L4': (typeof unit2_lesson4 !== 'undefined') ? unit2_lesson4 : null,
        'U3L1': (typeof unit3_lesson1 !== 'undefined') ? unit3_lesson1 : null,
        'U3L2': (typeof unit3_lesson2 !== 'undefined') ? unit3_lesson2 : null,
        'U3L3': (typeof unit3_lesson3 !== 'undefined') ? unit3_lesson3 : null,
        'U3L4': (typeof unit3_lesson4 !== 'undefined') ? unit3_lesson4 : null,
        'U4L1': (typeof unit4_lesson1 !== 'undefined') ? unit4_lesson1 : null,
        'U4L2': (typeof unit4_lesson2 !== 'undefined') ? unit4_lesson2 : null,
        'U4L3': (typeof unit4_lesson3 !== 'undefined') ? unit4_lesson3 : null,
        'U4L4': (typeof unit4_lesson4 !== 'undefined') ? unit4_lesson4 : null
    };

    if (lessonMap[lessonId]) {
        // 保存选择的课程
        Sync.setCurrentLesson({
            id: lessonId,
            displayName: lessonMap[lessonId].title + ' - 听力',
            module: 'listening',
            stage: 'practice'
        });

        // 刷新页面加载新课程
        location.reload();
    }
}

// ===== 成就系统集成 =====

// 成就按钮点击事件
var achievementsBtn = document.getElementById('achievements-btn');
if (achievementsBtn) {
    achievementsBtn.onclick = function() {
        // 隐藏登录页面
        var loginScreen = document.getElementById('login-screen');
        loginScreen.classList.remove('active');
        loginScreen.style.display = 'none';

        // 隐藏任务面板（如果打开的话）
        var questsContainer = document.getElementById('daily-quests-container');
        if (questsContainer) questsContainer.style.display = 'none';

        // 显示成就页面
        var achScreen = document.getElementById('achievements-screen');
        achScreen.classList.add('active');
        achScreen.style.display = 'flex';

        var container = document.getElementById('achievements-container');
        if (typeof renderAchievementsPage === 'function') {
            renderAchievementsPage(container);
        }
    };
}

// 返回按钮
var backToLoginBtn = document.getElementById('back-to-login');
if (backToLoginBtn) {
    backToLoginBtn.onclick = function() {
        // 隐藏成就页面
        var achScreen = document.getElementById('achievements-screen');
        achScreen.classList.remove('active');
        achScreen.style.display = 'none';

        // 显示登录页面
        var loginScreen = document.getElementById('login-screen');
        loginScreen.classList.add('active');
        loginScreen.style.display = 'flex';
    };
}

// ===== 每日任务集成 =====

// 任务按钮点击事件
var questsBtn = document.getElementById('quests-btn');
var questsContainer = document.getElementById('daily-quests-container');
var questsVisible = false;

if (questsBtn && questsContainer) {
    questsBtn.onclick = function() {
        questsVisible = !questsVisible;
        if (questsVisible) {
            if (typeof renderDailyQuestsPanel === 'function') {
                questsContainer.innerHTML = renderDailyQuestsPanel();
            }
            questsContainer.style.display = 'block';
        } else {
            questsContainer.style.display = 'none';
        }
    };

    // 初始化时检查重置
    if (typeof checkDailyReset === 'function') {
        checkDailyReset();
    }
}

// 处理成就检测（在答题后调用）
function processAchievements(isCorrect) {
    if (typeof checkAndUpdateAchievements !== 'function') return;

    // 获取搭档名称
    var partnerName = null;
    if (players && players.length > 1) {
        var otherPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        partnerName = players[otherPlayerIndex].name;
    }

    var newAchievements = checkAndUpdateAchievements(isCorrect, partnerName);

    // 显示新解锁的成就
    if (newAchievements && newAchievements.length > 0) {
        if (window.SoundSystem) SoundSystem.playAchievement();
        for (var i = 0; i < newAchievements.length; i++) {
            setTimeout(function(ach) {
                return function() {
                    showAchievementUnlock(ach);
                };
            }(newAchievements[i]), i * 2000);
        }
    }

    // 处理每日任务
    if (typeof processDailyQuests === 'function') {
        processDailyQuests(isCorrect, consecutiveCorrect);
    }
}

function createConfetti(count) {
    if (count === undefined) count = 20;
    const container = document.getElementById('confetti-container');
    var colors = ['#58cc02', '#1cb0f6', '#ffcb00', '#ff4b4b'];
    for (var i = 0; i < count; i++) {
        var el = document.createElement('div');
        el.className = 'confetti';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.animation = `fall ${Math.random() * 1 + 1}s linear forwards`;
        el.style.webkitAnimation = `fall ${Math.random() * 1 + 1}s linear forwards`;
        container.appendChild(el);
        setTimeout(() => {
            if (container.contains(el)) container.removeChild(el);
        }, 2000);
    }
}

// ---- Scaffolding Injection ---- 
// Helper: get useful Chinese hint (skip generic labels like "情景选择")
function getUsefulChineseHint(q) {
    var genericLabels = ['情景选择', '场景选择', '情境选择'];
    if (q.chinese && genericLabels.indexOf(q.chinese) === -1) {
        return q.chinese;
    }
    // For scenario questions, find the correct answer text from options
    if (q.options && q.correct !== undefined) {
        for (var i = 0; i < q.options.length; i++) {
            var opt = q.options[i];
            var isObj = typeof opt === 'object' && opt !== null;
            if (isObj && (opt.value === q.correct || opt.value === 'correct')) {
                return opt.text || '';
            } else if (!isObj && i === q.correct) {
                return String(opt);
            }
        }
    }
    return q.sentence || q.word || q.text || '';
}

window.applyScaffolding = function(q, cardEl) {
    const container = document.getElementById('question-container');
    if (!container) return;
    
    const isSelectionType = ['listen_select', 'speak_select', 'word_match', 'sentence_match', 'fill_blank', 'read_select', 'letter_select', 'word_spell', 'sentence_fill', 'pinyin_fill', 'scenario'].indexOf(q.type) !== -1;
    const isTFType = ['listen_tf', 'read_tf'].indexOf(q.type) !== -1;
    const isOrderType = q.type === 'sentence_order' || q.type === 'duo_sentence' || q.type === 'sentence_sequence';
    const isPuzzleType = q.type === 'word_puzzle' || q.type === 'duo_spell';
    const isSpeakingType = ['repeat_word', 'repeat_sentence', 'picture_speak'].indexOf(q.type) !== -1;
    const isTapPairType = q.type === 'tap_pair';
    const isListenSequenceType = q.type === 'listen_sequence';

    var wrongCount = window.wrongCount || 0;

    if (isSelectionType) {
        // === 4级支架（ZPD渐进原则）===
        // 错1: 仅重播音频，不显示文字 → 4选项全保留
        // 错2: 显示英文句子（提示级，不是"答案是"）→ 4选项全保留
        // 错3: 英文+中文（答案级）+ 灰掉1个错误选项 → 3选项
        // 错4+: 高亮正确答案（直接引导）→ 3选项

        var engText = q.sentence || q.word || q.text || q.audio || '';
        var chText = getUsefulChineseHint(q) || q.chinese || '';
        var isListenType = (q.type.indexOf('listen') !== -1);

        // 通用：灰掉错误选项，保留 keepCount 个可点击
        function grayWrongOptions(keepCount) {
            var allOpts = Array.from(container.querySelectorAll('.option-card'));
            var alreadyGrayed = allOpts.filter(function(o) { return o.style.opacity === '0.3'; }).length;
            var activeOpts = allOpts.filter(function(o) { return o.style.opacity !== '0.3'; });
            var wrongOpts = activeOpts.filter(function(opt, idx) {
                var globalIdx = allOpts.indexOf(opt);
                if (opt === cardEl || opt.classList.contains('correct')) return false;
                if (q.options && q.options.length === allOpts.length) {
                    var dataOpt = q.options[globalIdx];
                    var isObj = typeof dataOpt === 'object' && dataOpt !== null;
                    if (isObj) return !(dataOpt.value === q.correct || dataOpt.value === q.word);
                    else return globalIdx !== q.correct;
                } else {
                    var cText = q.options && typeof q.correct === 'number' ? q.options[q.correct] : null;
                    if (cText && typeof cText === 'object') cText = cText.text || cText.value;
                    return !(cText && opt.textContent.trim() === cText.toString().trim());
                }
            });
            var toGray = Math.max(0, activeOpts.length - keepCount);
            for (var i = 0; i < toGray && i < wrongOpts.length; i++) {
                wrongOpts[i].style.opacity = '0.3';
                wrongOpts[i].style.pointerEvents = 'none';
            }
        }

        if (wrongCount === 1) {
            // 第1级：仅重播音频，不给任何文字提示
            if (q.audio && window.speakWord) speakWord(q.audio);
            // 非听力类型给最轻量提示
            if (!isListenType && chText) {
                showProgressiveHint('再仔细看看，想想意思', 0);
            }

        } else if (wrongCount === 2) {
            // 第2级：显示提示 → 4选项保持
            if (q.audio && window.speakWord) speakWord(q.audio);

            // scenario 听力题特殊处理：重播+强化情境中文理解（不泄露英文关键词）
            if (q.context && isListenType) {
                var contextHint = q.question || q.context || '再听一次，想想情境里问了什么';
                showProgressiveHint('💡 ' + contextHint + '\n再仔细听一遍！', 0);
                var hEl2 = document.getElementById('progressive-hint');
                if (hEl2) { hEl2.style.fontSize = '16px'; hEl2.style.color = '#ff9500'; hEl2.style.whiteSpace = 'pre-line'; }
            } else {
                var showText = isListenType ? engText : (engText || chText);
                if (showText) {
                    showProgressiveHint(showText, 0);
                    var hEl2 = document.getElementById('progressive-hint');
                    if (hEl2) {
                        hEl2.style.fontSize = '20px';
                        hEl2.style.fontWeight = 'bold';
                        hEl2.style.color = '#1cb0f6';
                    }
                }
            }

        } else if (wrongCount === 3) {
            // 第3级：英文+中文同时显示（明确告知答案）+ 灰掉1个错误选项 → 3选项
            if (q.audio && window.speakWord) speakWord(q.audio);
            var hint3 = engText;
            if (chText) hint3 = engText + '\n' + chText;
            if (hint3) {
                showProgressiveHint(hint3, 1); // 📝 再看看：
                var hEl3 = document.getElementById('progressive-hint');
                if (hEl3) {
                    hEl3.style.fontSize = '20px';
                    hEl3.style.whiteSpace = 'pre-line';
                }
            }
            grayWrongOptions(3); // 只灰1个，保留3个可点

        } else if (wrongCount >= 4) {
            // 第4级：高亮正确答案（直接引导点对）
            var allOpts4 = Array.from(container.querySelectorAll('.option-card'));
            allOpts4.forEach(function(opt, idx) {
                var isCorrectNode = false;
                if (q.options && q.options.length === allOpts4.length) {
                    var dataOpt = q.options[idx];
                    var isObj = typeof dataOpt === 'object' && dataOpt !== null;
                    if (isObj) isCorrectNode = (dataOpt.value === q.correct || dataOpt.value === q.word);
                    else isCorrectNode = (idx === q.correct);
                } else {
                    var cText = q.options && typeof q.correct === 'number' ? q.options[q.correct] : null;
                    if (cText && typeof cText === 'object') cText = cText.text || cText.value;
                    if (cText && opt.textContent.trim() === cText.toString().trim()) isCorrectNode = true;
                }
                if (isCorrectNode) opt.classList.add('scaffold-highlight');
            });
        }
    } else if (isTFType) {
        // === TF判断题 4级支架 ===
        // 错1: 仅重播音频      → 2个选项保持
        // 错2: 显示英文句子    → 2个选项保持
        // 错3: 英文+中文翻译   → 2个选项保持（只有2个没法灰掉）
        // 错4+: 高亮正确按钮
        var tfEngText = q.sentence || q.word || q.text || q.audio || '';
        var tfChText = q.chinese || '';

        if (wrongCount === 1) {
            if (q.audio && window.speakWord) speakWord(q.audio);
        } else if (wrongCount === 2) {
            if (q.audio && window.speakWord) speakWord(q.audio);
            if (tfEngText) {
                showProgressiveHint(tfEngText, 0);
                var hElTF2 = document.getElementById('progressive-hint');
                if (hElTF2) { hElTF2.style.fontSize = '20px'; hElTF2.style.color = '#1cb0f6'; }
            }
        } else if (wrongCount === 3) {
            if (q.audio && window.speakWord) speakWord(q.audio);
            var tfHint3 = tfEngText + (tfChText ? '\n' + tfChText : '');
            showProgressiveHint(tfHint3, 1);
            var hElTF3 = document.getElementById('progressive-hint');
            if (hElTF3) hElTF3.style.whiteSpace = 'pre-line';
        } else if (wrongCount >= 4) {
            var tfBtns = Array.from(container.querySelectorAll('.tf-btn, .tf-option-card'));
            tfBtns.forEach(function(btn) {
                var isTrueBtn = btn.textContent.indexOf('√') !== -1 || btn.textContent.indexOf('对') !== -1;
                if ((q.isTrue && isTrueBtn) || (!q.isTrue && !isTrueBtn)) {
                    btn.classList.add('scaffold-highlight');
                }
            });
        }

    } else if (isOrderType || isPuzzleType) {
        // === 排序/拼词题 4级支架 ===

        // sentence_sequence 特殊处理（句子排序，不是词排序）
        if (q.type === 'sentence_sequence') {
            var seqSentences = q.sentences || [];
            var firstSentence = seqSentences[0] || '';
            if (wrongCount === 1) {
                // Level 1：启发式提示（不给答案）
                showProgressiveHint('想想故事的开头是哪一句？', 0);
            } else if (wrongCount === 2) {
                // Level 2：显示每句话的中文翻译帮助理解（不给顺序）
                var chHint = q.chineseHint || q.chinese || '';
                if (chHint && chHint.indexOf('排') === -1) {
                    // chineseHint 是真正的翻译内容
                    showProgressiveHint('💡 句子的意思：\n' + chHint, 0);
                } else {
                    // 没有翻译，给通用提示
                    showProgressiveHint('💡 想想这几句话在讲一个什么故事？先找"介绍"的那句', 0);
                }
                var hElSeq = document.getElementById('progressive-hint');
                if (hElSeq) { hElSeq.style.fontSize = '15px'; hElSeq.style.color = '#ff9500'; hElSeq.style.whiteSpace = 'pre-line'; }
            } else if (wrongCount === 3) {
                // Level 3：告诉第一句（给起点，剩下2句自己排）
                showProgressiveHint('💡 第一句是："' + firstSentence + '"', 0);
                var hElSeq2 = document.getElementById('progressive-hint');
                if (hElSeq2) { hElSeq2.style.fontSize = '16px'; hElSeq2.style.color = '#1cb0f6'; }
            } else if (wrongCount >= 4) {
                // Level 4：告诉前两句（只剩最后一句自己点）
                var secondSentence = seqSentences[1] || '';
                showProgressiveHint('💡 前两句："' + firstSentence + '" → "' + secondSentence + '"', 0);
                var hElSeq3 = document.getElementById('progressive-hint');
                if (hElSeq3) { hElSeq3.style.fontSize = '15px'; hElSeq3.style.color = '#4caf50'; }
            }
            return;
        }

        // 错1: 引导看中文参考（不泄露具体词）
        // 错2: 提示第一个词/字母是什么
        // 错3: 自动放置第1个词（给起点）
        // 错4+: 自动放置更多词

        var firstWord = (q.words || q.letters || [])[0] || '';

        if (wrongCount === 1) {
            showProgressiveHint(isPuzzleType ? '仔细想想中文意思，再拼一次' : '对照上面的中文，重新排排看', 0);

        } else if (wrongCount === 2) {
            // 告诉第一个词/字母，不自动填
            if (firstWord) {
                var prefix = isPuzzleType ? '第一个字母是：' : '第一个词是：';
                showProgressiveHint(prefix + firstWord, 0);
                var hElOrd2 = document.getElementById('progressive-hint');
                if (hElOrd2) { hElOrd2.style.fontSize = '22px'; hElOrd2.style.color = '#1cb0f6'; }
            }

        } else if (wrongCount === 3) {
            // 自动点击放入第1个词/字母
            showProgressiveHint('帮你放好第一个词，其余自己来！', 0);
            setTimeout(function() { window.lockOrderPieces(q, container, 1); }, 850);

        } else if (wrongCount >= 4) {
            var lockTotal = isPuzzleType ? 2 : 3;
            showProgressiveHint('再帮你多放几个，继续加油！', 0);
            setTimeout(function() { window.lockOrderPieces(q, container, lockTotal); }, 850);
        }

    } else if (isSpeakingType) {
        // === 口语题 4级支架 ===
        // 错1: 播放示范音频 + 提示跟读
        // 错2: 显示文字 + 再听（看着说）
        // 错3: 发音技巧/慢速提示
        // 错4+: 降低识别阈值，鼓励尝试

        var spWord = q.word || q.sentence || q.expected || '';

        if (wrongCount === 1) {
            showProgressiveHint('再听一次，跟着读', 0);
            if (spWord && window.speakWord) speakWord(spWord);

        } else if (wrongCount === 2) {
            if (spWord && window.speakWord) speakWord(spWord);
            if (spWord) {
                showProgressiveHint(spWord, 0); // 显示文字，看着读
                var hElSp2 = document.getElementById('progressive-hint');
                if (hElSp2) { hElSp2.style.fontSize = '22px'; hElSp2.style.color = '#1cb0f6'; }
            }

        } else if (wrongCount === 3) {
            if (q.phonetic) {
                showProgressiveHint('发音提示：' + q.phonetic + '（注意嘴型）', 1);
            } else {
                showProgressiveHint('慢慢说，把每个词说清楚', 1);
            }
            if (spWord && window.speakWord) speakWord(spWord);

        } else if (wrongCount >= 4) {
            showProgressiveHint('老师稍微放宽了要求，再试一次吧！', 1);
            window.scaffoldVoiceThresholdLowered = true;
        }

    } else if (isTapPairType) {
        // === 配对题(tap_pair) 4级支架 ===
        // 错1: 轻提示，引导观察
        // 错2: 显示中文翻译帮助理解
        // 错3: 高亮一组正确配对
        // 错4+: 高亮两组正确配对
        var pairChinese = q.chinese || '';
        var pairs = q.pairs || [];

        if (wrongCount === 1) {
            showProgressiveHint('仔细看看，哪些是一对？', 0);
        } else if (wrongCount === 2) {
            if (pairChinese) {
                showProgressiveHint('💡 ' + pairChinese, 0);
                var hElTP = document.getElementById('progressive-hint');
                if (hElTP) { hElTP.style.fontSize = '16px'; hElTP.style.color = '#ff9500'; }
            } else if (pairs.length > 0) {
                var firstPair = pairs[0];
                var hintText = (firstPair.word || firstPair.text || '') + ' = ' + (firstPair.match || '');
                showProgressiveHint('💡 提示：' + hintText, 0);
            }
        } else if (wrongCount === 3) {
            // 高亮第一组配对
            if (pairs.length > 0) {
                var firstWord = pairs[0].word || pairs[0].text || '';
                var firstMatch = pairs[0].match || '';
                showProgressiveHint('💡 找到这一对：' + firstWord + ' ↔ ' + firstMatch, 1);
                var hElTP3 = document.getElementById('progressive-hint');
                if (hElTP3) { hElTP3.style.fontSize = '18px'; hElTP3.style.color = '#1cb0f6'; }
            }
        } else if (wrongCount >= 4) {
            // 高亮前两组配对
            if (pairs.length >= 2) {
                var hint4 = pairs[0].word + ' ↔ ' + pairs[0].match + '\n' + pairs[1].word + ' ↔ ' + pairs[1].match;
                showProgressiveHint('💡 ' + hint4, 1);
                var hElTP4 = document.getElementById('progressive-hint');
                if (hElTP4) { hElTP4.style.whiteSpace = 'pre-line'; hElTP4.style.fontSize = '17px'; hElTP4.style.color = '#4caf50'; }
            }
        }

    } else if (isListenSequenceType) {
        // === 听音排序题(listen_sequence) 4级支架 ===
        // 错1: 重播音频
        // 错2: 显示中文提示
        // 错3: 提示第一个词
        // 错4+: 提示前两个词的顺序
        var lsWords = q.words || q.sequence || [];
        var lsChinese = q.chinese || '';

        if (wrongCount === 1) {
            showProgressiveHint('再听一次，注意顺序', 0);
            if (q.audio && window.speakWord) speakWord(q.audio);
        } else if (wrongCount === 2) {
            if (q.audio && window.speakWord) speakWord(q.audio);
            if (lsChinese) {
                showProgressiveHint('💡 ' + lsChinese, 0);
                var hElLS = document.getElementById('progressive-hint');
                if (hElLS) { hElLS.style.fontSize = '16px'; hElLS.style.color = '#ff9500'; }
            } else {
                showProgressiveHint('集中注意力，听每个词的先后顺序', 0);
            }
        } else if (wrongCount === 3) {
            if (q.audio && window.speakWord) speakWord(q.audio);
            if (lsWords.length > 0) {
                showProgressiveHint('💡 第一个词是："' + lsWords[0] + '"', 1);
                var hElLS3 = document.getElementById('progressive-hint');
                if (hElLS3) { hElLS3.style.fontSize = '18px'; hElLS3.style.color = '#1cb0f6'; }
            }
        } else if (wrongCount >= 4) {
            if (lsWords.length >= 2) {
                showProgressiveHint('💡 顺序是：' + lsWords[0] + ' → ' + lsWords[1] + ' → ...', 1);
                var hElLS4 = document.getElementById('progressive-hint');
                if (hElLS4) { hElLS4.style.fontSize = '17px'; hElLS4.style.color = '#4caf50'; }
            }
        }
    }
};

window.lockOrderPieces = function(q, container, count) {
    var correctArr = q.words || q.letters || q.parts || q.chineseWords || [];
    if (!correctArr || correctArr.length === 0) return;
    
    var lockCount = Math.min(count, correctArr.length);
    for (var i = 0; i < lockCount; i++) {
        var targetText = correctArr[i];
        var allDivs = container.getElementsByTagName('div');
        for (var j = 0; j < allDivs.length; j++) {
            var div = allDivs[j];
            if (div.textContent === targetText && typeof div.onclick === 'function' && div.style.opacity !== '0') {
                if (div.className.indexOf('option-card') !== -1 || div.style.boxShadow) {
                    div.click();
                    break;
                }
            }
        }
    }
    
    var allDivs2 = container.getElementsByTagName('div');
    for (var k = 0; k < allDivs2.length; k++) {
        var slot = allDivs2[k];
        if (typeof slot.onclick === 'function') {
            var hasText = slot.textContent && slot.textContent.trim() !== '';
            if (hasText && (slot.className.indexOf('puzzle-slot') !== -1 || slot.style.borderRadius === '12px')) {
                slot.onclick = null;
                slot.style.pointerEvents = 'none';
                slot.style.opacity = '0.6';
                slot.style.filter = 'grayscale(100%)';
            }
        }
    }
};

window.showStarAnimation = function() {
    var starEl = document.createElement('div');
    starEl.className = 'floating-star';
    starEl.textContent = '⭐';
    document.body.appendChild(starEl);
    setTimeout(function() {
        if (document.body.contains(starEl)) {
            document.body.removeChild(starEl);
        }
    }, 1000);
};

// ===== 情境导入页 (Problem-based Learning) =====
var scenarioMap = {
    'U1L1': { title: '🦁 动物园探险', text: '你来到动物园，好多动物！认识它们吧！', img: 'assets/images/scenario_animals.png', bg: 'linear-gradient(135deg, #a8e063, #56ab2f)' },
    'U1L2': { title: '🐾 动物朋友', text: '农场里有好多动物朋友，它们叫什么名字呢？', img: 'assets/images/scenario_animals.png', bg: 'linear-gradient(135deg, #56ab2f, #a8e063)' },
    'U1L3': { title: '🐒 猜猜我是谁', text: '动物们在玩捉迷藏，听声音猜猜它们是谁！', img: 'assets/images/scenario_animals.png', bg: 'linear-gradient(135deg, #f7971e, #ffd200)' },
    'U1L4': { title: '🎪 动物表演', text: '动物们要表演了！看看谁最大谁最小！', img: 'assets/images/scenario_animals.png', bg: 'linear-gradient(135deg, #ffd200, #f7971e)' },
    'U2L1': { title: '👕 穿衣服啦', text: '今天天气真好，选什么衣服出门呢？帮忙搭配吧！', img: 'assets/images/scenario_clothes.png', bg: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    'U2L2': { title: '👗 时装秀', text: '学校要办时装秀！帮同学们挑选合适的衣服！', img: 'assets/images/scenario_clothes.png', bg: 'linear-gradient(135deg, #f5576c, #f093fb)' },
    'U2L3': { title: '🧥 找衣服', text: '今天要出门，但毛衣找不到了！帮妈妈找到衣服吧！', img: 'assets/images/scenario_clothes.png', bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
    'U2L4': { title: '👟 运动日', text: '今天是运动日！穿上运动服和运动鞋，出发！', img: 'assets/images/scenario_clothes.png', bg: 'linear-gradient(135deg, #fbc2eb, #a18cd1)' },
    'U3L1': { title: '⏰ 几点了', text: '闹钟响了！看看现在几点，该做什么了？', img: 'assets/images/scenario_time.png', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    'U3L2': { title: '📅 我的一天', text: '从早上起床到晚上睡觉，安排好一天的时间吧！', img: 'assets/images/scenario_time.png', bg: 'linear-gradient(135deg, #00f2fe, #4facfe)' },
    'U3L3': { title: '🏫 学校时间表', text: '学校的课程表是怎样的？什么时间上什么课？', img: 'assets/images/scenario_time.png', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    'U3L4': { title: '🎉 周末计划', text: '周末到了！几点去公园？几点吃午饭？安排一下！', img: 'assets/images/scenario_time.png', bg: 'linear-gradient(135deg, #38f9d7, #43e97b)' },
    'U4L1': { title: '🍳 早餐时间', text: '肚子饿了！早餐想吃什么？来看看有什么好吃的！', img: 'assets/images/scenario_food.png', bg: 'linear-gradient(135deg, #fa709a, #fee140)' },
    'U4L2': { title: '🍔 午餐点餐', text: '你和朋友去餐厅吃饭，服务员问你们想吃什么。帮忙点餐吧！', img: 'assets/images/scenario_food.png', bg: 'linear-gradient(135deg, #fee140, #fa709a)' },
    'U4L3': { title: '🥤 饮料时间', text: '口渴了！你最喜欢什么饮料？帮大家选饮料吧！', img: 'assets/images/scenario_food.png', bg: 'linear-gradient(135deg, #f6d365, #fda085)' },
    'U4L4': { title: '🍲 丰盛晚餐', text: '妈妈在做晚饭，今天有什么菜？帮妈妈准备晚餐吧！', img: 'assets/images/scenario_food.png', bg: 'linear-gradient(135deg, #fda085, #f6d365)' }
};

function getCurrentLessonId() {
    // 优先使用 currentLessonData 自带的 id 字段
    if (currentLessonData && currentLessonData.id) {
        return currentLessonData.id;
    }
    // 兜底：逐个比较引用
    var lessonMap = {
        'U1L1': typeof lesson1 !== 'undefined' ? lesson1 : null,
        'U1L2': typeof unit1_lesson2 !== 'undefined' ? unit1_lesson2 : null,
        'U1L3': typeof unit1_lesson3 !== 'undefined' ? unit1_lesson3 : null,
        'U1L4': typeof unit1_lesson4 !== 'undefined' ? unit1_lesson4 : null,
        'U2L1': typeof unit2_lesson1 !== 'undefined' ? unit2_lesson1 : null,
        'U2L2': typeof unit2_lesson2 !== 'undefined' ? unit2_lesson2 : null,
        'U2L3': typeof unit2_lesson3 !== 'undefined' ? unit2_lesson3 : null,
        'U2L4': typeof unit2_lesson4 !== 'undefined' ? unit2_lesson4 : null,
        'U3L1': typeof unit3_lesson1 !== 'undefined' ? unit3_lesson1 : null,
        'U3L2': typeof unit3_lesson2 !== 'undefined' ? unit3_lesson2 : null,
        'U3L3': typeof unit3_lesson3 !== 'undefined' ? unit3_lesson3 : null,
        'U3L4': typeof unit3_lesson4 !== 'undefined' ? unit3_lesson4 : null,
        'U4L1': typeof unit4_lesson1 !== 'undefined' ? unit4_lesson1 : null,
        'U4L2': typeof unit4_lesson2 !== 'undefined' ? unit4_lesson2 : null,
        'U4L3': typeof unit4_lesson3 !== 'undefined' ? unit4_lesson3 : null,
        'U4L4': typeof unit4_lesson4 !== 'undefined' ? unit4_lesson4 : null
    };
    for (var key in lessonMap) {
        if (lessonMap[key] && lessonMap[key] === currentLessonData) return key;
    }
    return null;
}

function tryShowScenarioScreen() {
    var id = getCurrentLessonId();
    if (id && scenarioMap[id]) {
        showScenarioScreen(scenarioMap[id]);
    } else {
        startPractice();
    }
}

// Teacher forced switch: show transition overlay then auto-start practice
function forceStartPractice() {
    // Hide any feedback panel
    hideFeedbackPanel();
    
    // Create a full-screen overlay
    var overlay = document.createElement('div');
    overlay.id = 'force-practice-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,#58cc02,#7ce800);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;animation:fadeIn 0.3s ease;';
    overlay.innerHTML = '<div style="font-size:64px;margin-bottom:16px;">🚀</div>' +
        '<div style="font-size:24px;font-weight:bold;color:white;text-shadow:0 2px 4px rgba(0,0,0,0.2);">进入闯关赛！</div>' +
        '<div style="font-size:16px;color:rgba(255,255,255,0.8);margin-top:8px;">一起加油！</div>';
    document.body.appendChild(overlay);

    // Auto-start after 2 seconds
    setTimeout(function() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        tryShowScenarioScreen();
    }, 2000);
}

function showScenarioScreen(scenario) {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
        screens[i].classList.remove('active');
    }
    
    var screen = document.getElementById('scenario-screen');
    if (!screen) {
        screen = document.createElement('div');
        screen.className = 'screen';
        screen.id = 'scenario-screen';
        var appContainer = document.querySelector('.app-container') || document.body;
        appContainer.appendChild(screen);
    }
    
    var bgStyle = scenario.bg || 'linear-gradient(135deg, #667eea, #764ba2)';
    var imgHtml = scenario.img ? '<img src="' + scenario.img + '" class="scenario-img" alt="scenario" />' : '';
    
    screen.innerHTML = '<div class="scenario-card-enhanced" style="background: ' + bgStyle + ';">' +
        '<div class="scenario-sparkles">✨</div>' +
        imgHtml +
        '<h2 class="scenario-title-enhanced">' + scenario.title + '</h2>' +
        '<p class="scenario-desc-enhanced">' + scenario.text + '</p>' +
        '<button class="scenario-btn-enhanced" onclick="startPracticeAfterScenario()">🚀 开始挑战！</button>' +
    '</div>';
    screen.classList.add('active');
}

function startPracticeAfterScenario() {
    var scr = document.getElementById('scenario-screen');
    if (scr) scr.classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    updatePhaseIndicator();
    // 确保实战倒计时启动（不能遗漏）
    stopPretestTimer();
    startPretestTimer(15 * 60);
    renderQuestion();
}

// ===== 成就系统 (Achievement System) =====
var achievementDefs = [
    { id: 'first_star', name: '第一颗星', icon: '⭐', desc: '获得第1颗星星', check: function(d) { return d.totalStars >= 1; } },
    { id: 'ten_correct', name: '小有成就', icon: '🌟', desc: '累计答对10题', check: function(d) { return d.totalCorrect >= 10; } },
    { id: 'fifty_correct', name: '学习达人', icon: '🏅', desc: '累计答对50题', check: function(d) { return d.totalCorrect >= 50; } },
    { id: 'hundred_correct', name: '英语高手', icon: '🏆', desc: '累计答对100题', check: function(d) { return d.totalCorrect >= 100; } },
    { id: 'perfect_10', name: '满分王', icon: '👑', desc: '单次测试全对', check: function(d) { return d.lastPerfect === true; } },
    { id: 'combo_5', name: '连胜达人', icon: '🔥', desc: '连续答对5题', check: function(d) { return d.maxCombo >= 5; } },
    { id: 'combo_10', name: '无敌连胜', icon: '💎', desc: '连续答对10题', check: function(d) { return d.maxCombo >= 10; } },
    { id: 'all_units', name: '全册通关', icon: '🎓', desc: '完成所有16课', check: function(d) { return d.lessonsCompleted >= 16; } }
];

function getPlayerOrderId(idx) {
    if (!players || !players[idx]) return null;
    var match = players[idx].name.match(/^\d+/);
    return match ? match[0] : players[idx].name;
}

function loadAchievements(orderId) {
    try {
        var dataStr = localStorage.getItem('merryAchievements_' + orderId);
        if (dataStr) {
            return JSON.parse(dataStr);
        }
    } catch(e) {
        console.error('Failed to load achievements', e);
    }
    return { totalStars: 0, totalCorrect: 0, maxCombo: 0, lessonsCompleted: 0, earned: [] };
}

function saveAchievements(orderId, data) {
    try {
        localStorage.setItem('merryAchievements_' + orderId, JSON.stringify(data));
    } catch(e) {
        console.error('Failed to save achievements', e);
    }
}

function checkAchievements(pIdx) {
    var orderId = getPlayerOrderId(pIdx);
    if (!orderId) return [];
    
    var data = loadAchievements(orderId);
    var pStats = pIdx === 0 ? pretestStats.player1 : (pretestStats.player2 || {correct:0, total:0});
    var matchStars = players[pIdx].stars || 0;
    var matchCorrect = pStats.correct || 0;
    var matchTotal = pStats.total || 0;
    var matchMaxCombo = Math.max(pretestStats.player1.maxCombo || 0, pretestStats.player2.maxCombo || 0); // use overall max combo for player session
    
    data.totalStars += matchStars;
    data.totalCorrect += matchCorrect;
    if (matchMaxCombo > data.maxCombo) {
        data.maxCombo = matchMaxCombo;
    }
    // 满分王：只有在答了一定数量的题目之后，星星的数量严格等于全部答题量（由于只有一遍对才给星，这是最严谨的）
    data.lastPerfect = (matchTotal > 0 && matchStars === matchTotal); 
    data.lessonsCompleted += 1; // Mark a module as fully complete
    
    if (!data.earned) data.earned = [];
    var newlyEarned = [];
    
    for (var i = 0; i < achievementDefs.length; i++) {
        var def = achievementDefs[i];
        if (data.earned.indexOf(def.id) === -1) {
            if (def.check(data)) {
                data.earned.push(def.id);
                newlyEarned.push(def);
            }
        }
    }
    
    saveAchievements(orderId, data);
    return newlyEarned;
}

var pendingAchievementModals = [];
var onAchievementsDoneCallback = null;

// ===== 成就系统（静默版）=====
// 原则：游戏中绝不打断答题节奏；所有新成就在结束页统一揭晓，制造一次高潮
function checkAndShowAchievements(callback) {
    window.sessionNewAchievements = [];

    if (currentPhase === 'practice' && players.length > 1) {
        var p1New = checkAchievements(0);
        var p2New = checkAchievements(1);
        // 合并去重 — 同一个成就只展示一次
        var seen = {};
        p1New.concat(p2New).forEach(function(ach) {
            if (!seen[ach.id]) { seen[ach.id] = true; window.sessionNewAchievements.push(ach); }
        });
    } else {
        var p1New = checkAchievements(0);
        window.sessionNewAchievements = p1New.slice();
        if (players.length > 1) {
            checkAchievements(1).forEach(function(ach) {
                var dup = window.sessionNewAchievements.some(function(a) { return a.id === ach.id; });
                if (!dup) window.sessionNewAchievements.push(ach);
            });
        }
    }

    // 直接进结束页，不打断答题节奏，所有新成就在结束页统一揭晓
    if (typeof callback === 'function') callback();
}

function renderAchievementSection() {
    // Collect earned achievement IDs (merge both players)
    var earnedIds = [];
    if (currentPhase === 'practice' && players.length > 1) {
        var d0 = loadAchievements(getPlayerOrderId(0));
        var d1 = loadAchievements(getPlayerOrderId(1));
        var e0 = d0.earned || []; var e1 = d1.earned || [];
        for (var i = 0; i < e0.length; i++) { if (earnedIds.indexOf(e0[i]) === -1) earnedIds.push(e0[i]); }
        for (var j = 0; j < e1.length; j++) { if (earnedIds.indexOf(e1[j]) === -1) earnedIds.push(e1[j]); }
    } else {
        for (var p = 0; p < players.length; p++) {
            var d = loadAchievements(getPlayerOrderId(p));
            var e = d.earned || [];
            for (var k = 0; k < e.length; k++) { if (earnedIds.indexOf(e[k]) === -1) earnedIds.push(e[k]); }
        }
    }
    var total = achievementDefs.length;
    var count = earnedIds.length;
    var pct = total > 0 ? Math.round((count / total) * 100) : 0;

    var html = '<div class="ach-section-mini">';
    // Progress bar row
    html += '<div class="ach-progress-row">';
    html += '<span class="ach-progress-label">🏆 ' + count + '/' + total + '</span>';
    html += '<div class="ach-progress-track"><div class="ach-progress-fill" style="width:' + pct + '%"></div></div>';
    html += '</div>';
    // Show only earned icons (no locks)
    if (count > 0) {
        html += '<div class="ach-earned-row">';
        for (var m = 0; m < achievementDefs.length; m++) {
            if (earnedIds.indexOf(achievementDefs[m].id) !== -1) {
                html += '<span class="ach-mini-icon" title="' + achievementDefs[m].name + '">' + achievementDefs[m].icon + '</span>';
            }
        }
        html += '</div>';
    }
    html += '</div>';
    return html;
}

