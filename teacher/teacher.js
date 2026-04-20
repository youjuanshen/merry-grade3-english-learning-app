// teacher.js
// Logic for Merry Teacher Dashboard — Single Page App

// --- STATE（从localStorage恢复上次选择）---
var savedLesson = {};
try {
    savedLesson = JSON.parse(localStorage.getItem('currentLesson') || '{}');
} catch (e) { savedLesson = {}; }

var currentLesson = savedLesson.unit && savedLesson.lesson
    ? 'U' + savedLesson.unit + 'L' + savedLesson.lesson
    : 'U1L1';
var currentModule = savedLesson.module || 'listening';
var currentPhase = 'practice'; // 固定

document.addEventListener('DOMContentLoaded', function() {
    initPage();
});

function initPage() {
    // 先绑定事件（确保 UI 可交互，不受后续逻辑报错影响）
    bindModuleSelector();
    bindPublishButton();

    // 恢复上次选择
    try { restoreSelections(); } catch(e) { console.warn('restoreSelections error:', e); }

    // 检查是否已发布（2小时内有效）
    var classStartedAt = localStorage.getItem('merry_class_started');
    if (classStartedAt && (Date.now() - parseInt(classStartedAt)) < 2 * 60 * 60 * 1000) {
        showControlMode();
    } else {
        // 超时则清除
        if (classStartedAt) localStorage.removeItem('merry_class_started');
        showSetupMode();
    }

    // 监听教师命令（同步状态）
    Sync.listenTeacherCommand(function(cmd) {
        if (cmd && cmd.module) currentModule = cmd.module;
    });
}

function showSetupMode() {
    var setup = document.getElementById('setup-area');
    var control = document.getElementById('control-area');
    if (setup) setup.style.display = '';
    if (control) control.style.display = 'none';
}

function showControlMode() {
    var setup = document.getElementById('setup-area');
    var control = document.getElementById('control-area');
    if (setup) setup.style.display = 'none';
    if (control) control.style.display = '';
    try { updateControlTitle(); } catch(e) { console.warn('updateControlTitle:', e); }
    try { startElapsedTimer(); } catch(e) { console.warn('startElapsedTimer:', e); }
    try { startProgressPolling(); } catch(e) { console.warn('startProgressPolling:', e); }
}

// --- 恢复上次选择 ---
function restoreSelections() {
    if (savedLesson.unit) {
        var unitEl = document.getElementById('unit-select');
        if (unitEl) unitEl.value = String(savedLesson.unit);
    }
    if (savedLesson.lesson) {
        var lessonEl = document.getElementById('lesson-select');
        if (lessonEl) lessonEl.value = String(savedLesson.lesson);
    }

    // 恢复模块选择
    if (currentModule) {
        var modSelectors = document.querySelectorAll('.module-select');
        modSelectors.forEach(function(el) {
            el.classList.remove('active');
            el.innerHTML = el.innerHTML.replace('<br>✓', '<br>&nbsp;');
            if (el.dataset.mod === currentModule) {
                el.classList.add('active');
                el.innerHTML = el.innerHTML.replace('<br>&nbsp;', '<br>✓');
            }
        });
    }

    // 渲染教学目标（使用当前课程ID）
    updateCurrentLesson();

    // 绑定课程选择变化
    var unitSelect = document.getElementById('unit-select');
    var lessonSelect = document.getElementById('lesson-select');
    if (unitSelect) {
        unitSelect.onchange = updateCurrentLesson;
        unitSelect.addEventListener('input', updateCurrentLesson);
    }
    if (lessonSelect) {
        lessonSelect.onchange = updateCurrentLesson;
        lessonSelect.addEventListener('input', updateCurrentLesson);
    }
}

function updateCurrentLesson() {
    var unitEl = document.getElementById('unit-select');
    var lessonEl = document.getElementById('lesson-select');
    var unitVal = unitEl ? unitEl.value : '1';
    var lessonVal = lessonEl ? lessonEl.value : '1';
    currentLesson = 'U' + unitVal + 'L' + lessonVal;
    renderObjectives(currentLesson);
}

// --- 模块选择器 ---
function bindModuleSelector() {
    var modSelectors = document.querySelectorAll('.module-select');
    modSelectors.forEach(function(el) {
        el.onclick = function() {
            modSelectors.forEach(function(m) {
                m.classList.remove('active');
                m.innerHTML = m.innerHTML.replace('<br>✓', '<br>&nbsp;');
            });
            el.classList.add('active');
            el.innerHTML = el.innerHTML.replace('<br>&nbsp;', '<br>✓');
            currentModule = el.dataset.mod;
            renderObjectives(currentLesson);
        };
    });
}

// --- 发布按钮 ---
function bindPublishButton() {
    var btn = document.getElementById('btn-start-class');
    if (!btn) return;
    btn.onclick = function() {
        try {
            var unitEl = document.getElementById('unit-select');
            var lessonEl = document.getElementById('lesson-select');
            var timeLimitEl = document.getElementById('time-limit-select');

            var unitVal = unitEl ? unitEl.value : '1';
            var lessonVal = lessonEl ? lessonEl.value : '1';
            var timeLimit = parseInt(timeLimitEl ? timeLimitEl.value : 0) || 0;

            currentLesson = 'U' + unitVal + 'L' + lessonVal;

            var unitText = unitEl ? unitEl.options[unitEl.selectedIndex].text : 'Unit ' + unitVal;
            var lessonText = lessonEl ? lessonEl.options[lessonEl.selectedIndex].text.split(':')[0] : 'Lesson ' + lessonVal;
            var moduleText = getModuleChinese(currentModule);

            // 从 lessonObjectives 提取课题名
            var lId = currentLesson;
            var objData = typeof lessonObjectives !== 'undefined' ? lessonObjectives[lId] : null;
            if (objData && objData.title && objData.title.indexOf(':') !== -1) {
                var topicName = objData.title.split(':')[1].trim();
                lessonText += ' · ' + topicName;
            }

            var currentLessonObj = {
                unit: parseInt(unitVal),
                lesson: parseInt(lessonVal),
                module: currentModule,
                displayName: unitText + ' ' + lessonText + ' - ' + moduleText
            };

            Sync.setCurrentLesson(currentLessonObj);
            Sync.sendTeacherCommand({
                action: 'start',
                module: currentModule,
                phase: currentPhase,
                lesson: currentLesson,
                timeLimit: timeLimit,
                timestamp: Date.now()
            });

            localStorage.setItem('merry_class_started', Date.now().toString());
            showControlMode();
        } catch(e) {
            console.error('发布失败:', e);
            alert('发布失败: ' + e.message);
        }
    };
}

// --- 控制模式：顶部标题 ---
function updateControlTitle() {
    var lessonInfo = Sync.getCurrentLessonOnceSync();
    var unitLesson = lessonInfo ? ('U' + lessonInfo.unit + 'L' + lessonInfo.lesson) : currentLesson;
    var el = document.getElementById('control-title');
    if (el) el.textContent = unitLesson + ' · ' + getModuleChinese(currentModule);
}

// --- 控制模式：已进行时间 ---
function startElapsedTimer() {
    var classStartedAt = parseInt(localStorage.getItem('merry_class_started') || '0');
    if (!classStartedAt) return;

    function update() {
        var elapsed = Math.floor((Date.now() - classStartedAt) / 60000);
        var el = document.getElementById('elapsed-time');
        if (el) el.textContent = '已进行 ' + elapsed + ' 分钟';
    }
    update();
    setInterval(update, 10000);
}

// --- 控制模式：进度轮询 ---
function startProgressPolling() {
    pollProgress();
    setInterval(pollProgress, 5000);
}

function pollProgress() {
    var allProgress = [];
    var pending = 27;

    for (var i = 1; i <= 27; i++) {
        (function(idx) {
            Sync.getDashboardDataOnce('studentProgress_' + idx).then(function(p) {
                if (p) allProgress.push(p);
                pending--;
                if (pending === 0) renderProgress(allProgress);
            }).catch(function() {
                pending--;
                if (pending === 0) renderProgress(allProgress);
            });
        })(i);
    }
}

function renderProgress(allProgress) {
    if (allProgress.length === 0) {
        document.getElementById('stats-bar').textContent = '等待学生加入...';
        return;
    }

    var completed = [];
    var needsHelp = [];
    var inProgress = [];
    var totalCorrect = 0, totalAnswered = 0;
    var wordFreq = {};

    allProgress.forEach(function(p) {
        totalCorrect += (p.correct || 0);
        totalAnswered += (p.totalAnswered || 0);

        // 汇总易错词
        if (p.wrongWords) {
            p.wrongWords.forEach(function(w) {
                wordFreq[w] = (wordFreq[w] || 0) + 1;
            });
        }

        if (p.completed) {
            completed.push(p);
        } else {
            var acc = p.totalAnswered > 0 ? p.correct / p.totalAnswered : 1;
            if (p.totalAnswered >= 5 && acc < 0.5) {
                needsHelp.push(p);
            } else {
                inProgress.push(p);
            }
        }
    });

    // 按星星排序完成组
    completed.sort(function(a, b) { return (b.stars || 0) - (a.stars || 0); });

    // 班级统计
    var avgAcc = totalAnswered > 0 ? Math.round(totalCorrect / totalAnswered * 100) : 0;
    document.getElementById('stats-bar').textContent = allProgress.length + '/27人已开始 · 平均正确率 ' + avgAcc + '%';

    // 需要帮助
    document.getElementById('help-count').textContent = needsHelp.length;
    var helpHtml = '';
    if (needsHelp.length === 0) {
        helpHtml = '<div style="color:#bbb; padding:4px 0;">暂无</div>';
    } else {
        needsHelp.forEach(function(p) {
            var acc = p.totalAnswered > 0 ? Math.round(p.correct / p.totalAnswered * 100) : 0;
            helpHtml += '<div style="padding:8px 12px; margin-bottom:4px; background:#fff8f0; border-radius:8px; border-left:3px solid #e67e22;">' +
                '<div style="font-weight:600;">' + (p.studentName || '') + (p.partnerName ? ' & ' + p.partnerName : '') + '</div>' +
                '<div style="font-size:12px; color:#e67e22; margin-top:2px;">第' + (p.currentQuestion || 0) + '/' + (p.totalQuestions || 0) + '题 · 正确率' + acc + '%' +
                (p.wrongWords && p.wrongWords.length > 0 ? ' · 易错词: ' + p.wrongWords.slice(0, 3).join(', ') : '') + '</div></div>';
        });
    }
    document.getElementById('help-list').innerHTML = helpHtml;

    // 已完成
    document.getElementById('done-count').textContent = completed.length;
    var doneHtml = '';
    if (completed.length === 0) {
        doneHtml = '<div style="color:#bbb; padding:4px 0;">暂无</div>';
    } else {
        completed.forEach(function(p) {
            var acc = p.totalAnswered > 0 ? Math.round(p.correct / p.totalAnswered * 100) : 0;
            doneHtml += '<div style="padding:6px 12px; margin-bottom:4px; background:#f0fff0; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">' +
                '<span style="font-weight:600;">' + (p.studentName || '') + (p.partnerName ? ' & ' + p.partnerName : '') + '</span>' +
                '<span style="color:#27ae60; font-size:13px;">⭐' + (p.stars || 0) + ' ' + acc + '%</span></div>';
        });
    }
    document.getElementById('done-list').innerHTML = doneHtml;

    // 正常进行中
    document.getElementById('normal-text').textContent = '其他 ' + inProgress.length + ' 组正常进行中 ✓';

    // 缓存数据供排行榜和易错词用
    window._cachedProgress = allProgress;
    window._cachedWordFreq = wordFreq;
}

// --- 排行榜面板 ---
function toggleRanking() {
    var el = document.getElementById('ranking-panel');
    if (el.style.display === 'none') {
        var all = (window._cachedProgress || []).slice();
        all.sort(function(a, b) { return (b.stars || 0) - (a.stars || 0); });
        var medals = ['🥇', '🥈', '🥉'];
        var html = '<h3 style="margin:0 0 10px; font-size:15px; color:#2c3e50;">🏆 排行榜</h3>' +
            all.map(function(p, i) {
                var acc = p.totalAnswered > 0 ? Math.round(p.correct / p.totalAnswered * 100) : 0;
                var medal = i < 3 ? medals[i] : (i + 1) + '.';
                var status = p.completed ? '✅' : '第' + (p.currentQuestion || 0) + '/' + (p.totalQuestions || 0) + '题';
                return '<div style="padding:6px 12px; margin-bottom:3px; background:#fafafa; border-radius:8px; display:flex; justify-content:space-between; align-items:center; font-size:14px;">' +
                    '<span>' + medal + ' ' + (p.studentName || '') + (p.partnerName ? ' & ' + p.partnerName : '') + '</span>' +
                    '<span style="color:#888;">⭐' + (p.stars || 0) + ' ' + acc + '% ' + status + '</span></div>';
            }).join('');
        el.innerHTML = html || '<div style="color:#bbb;">暂无数据</div>';
        el.style.display = '';
    } else {
        el.style.display = 'none';
    }
}

// --- 易错词面板 ---
function toggleWrongWords() {
    var el = document.getElementById('wrongwords-panel');
    if (el.style.display === 'none') {
        var freq = window._cachedWordFreq || {};
        var sorted = Object.entries(freq).sort(function(a, b) { return b[1] - a[1]; });
        var titleHtml = '<h3 style="margin:0 0 10px; font-size:15px; color:#2c3e50;">📖 易错词汇总</h3>';
        if (sorted.length === 0) {
            el.innerHTML = titleHtml + '<div style="color:#27ae60; padding:8px;">全班表现优异，暂无易错词！</div>';
        } else {
            el.innerHTML = titleHtml + '<div style="display:flex; flex-wrap:wrap; gap:8px; padding:8px 0;">' +
                sorted.map(function(item) {
                    return '<span style="background:#fff3cd; color:#856404; padding:5px 12px; border-radius:15px; font-size:14px; border:1px solid #ffeeba;">' + item[0] + '(' + item[1] + '人错)</span>';
                }).join('') + '</div>';
        }
        el.style.display = '';
    } else {
        el.style.display = 'none';
    }
}

// --- 重置课堂 ---
function resetClass() {
    if (!confirm('确定重置课堂？将清除当前发布状态。')) return;
    localStorage.removeItem('merry_class_started');
    localStorage.removeItem('teacherCommand');
    localStorage.removeItem('currentLesson');
    showSetupMode();
}

// --- 教学目标渲染（从原teacher.js迁移，保持不变）---
function renderObjectives(lessonId) {
    if (typeof lessonObjectives === 'undefined') return;
    var data = lessonObjectives[lessonId];
    if (!data) return;

    var modNames = { listening: '听力', reading: '阅读', writing: '写作', speaking: '口语' };
    var modName = modNames[currentModule] || '听力';
    var moduleObjHtml = '';

    if (data.moduleObjectives && data.moduleObjectives[currentModule]) {
        moduleObjHtml = '<div style="margin-bottom:10px; background-color:#f0f7ff; padding:10px; border-radius:8px; border-left:4px solid var(--teacher-primary);">' +
            '<strong style="color:var(--teacher-primary);">📍 ' + modName + '模块目标：</strong>' +
            '<ol class="info-list" style="margin-top:5px;">' +
            data.moduleObjectives[currentModule].map(function(o) { return '<li>' + o + '</li>'; }).join('') +
            '</ol></div>';
    } else {
        moduleObjHtml = '<div style="margin-bottom:10px; background-color:#f0f7ff; padding:10px; border-radius:8px; border-left:4px solid var(--teacher-primary);">' +
            '<strong style="color:var(--teacher-primary);">📍 ' + modName + '模块目标：</strong>' +
            '<p style="margin:5px 0 0 0; font-size:14px; color:#666;">（掌握本课通用目标并进行' + modName + '专项训练）</p></div>';
    }

    var container = document.getElementById('objectives-container');
    if (!container) return;
    container.innerHTML =
        '<h4 style="margin-top:0; color:var(--teacher-primary)">' + data.title + '</h4>' +
        moduleObjHtml +
        '<div style="margin-bottom:10px;"><strong>本课通用目标：</strong>' +
        '<ol class="info-list">' +
        data.objectives.map(function(o) { return '<li>' + o + '</li>'; }).join('') +
        '</ol></div>' +
        '<div style="margin-bottom:10px;"><strong>核心词汇：</strong>' +
        '<div style="background:var(--teacher-bg); padding:10px; border-radius:8px; font-weight:bold; color:#f26622;">' +
        data.vocabulary.map(function(v) { return v.word + ' ' + v.chinese; }).join(' | ') +
        '</div></div>' +
        '<div style="margin-bottom:10px;"><strong>核心句型：</strong>' +
        '<ul class="info-list">' +
        data.sentences.map(function(s) { return '<li>' + s.en + ' ' + s.cn + '</li>'; }).join('') +
        '</ul></div>';
}

// --- HELPER ---
function getModuleChinese(mod) {
    var map = { listening: '听力', reading: '阅读', writing: '写作', speaking: '口语' };
    return map[mod] || mod;
}
