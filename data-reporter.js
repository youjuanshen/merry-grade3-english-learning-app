/**
 * data-reporter.js — 研究数据离线队列上报模块（仅 app_behavior_log 单表）
 * 依赖：firebase-sync.js 的 scfPost（已挂到全局）
 * iOS 12 兼容：无 ?. ?? Promise.allSettled async/await
 */
try { console.log('[DataReporter] v=131 stable'); } catch (e) {}

// ===== UUID 生成 =====
function _drUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// ===== 容量检查（粗估字节数）=====
function _drStorageSize() {
    var total = 0;
    try {
        for (var k in localStorage) {
            if (localStorage.hasOwnProperty(k)) {
                total += ((localStorage[k] || '').length + k.length) * 2;
            }
        }
    } catch(e) {}
    return total;
}

// ===== 入队：行为日志（每题一行）=====
function enqueueBehaviorLog(record) {
    try {
        if (_drStorageSize() > 150000) {
            flushBehaviorQueue();
        }
        var key = 'pending_log_' + _drUUID();
        localStorage.setItem(key, JSON.stringify(record));
    } catch(e) {
        console.warn('[DataReporter] enqueueBehaviorLog failed:', e.message);
    }
}

// ===== No-op：student_profile 已移除，保留函数壳防止调用方报错 =====
function enqueuePairLog() {}
function enqueueStudentUpdate() {}
function flushPairQueue() {}
function flushStudentQueue() {}
function buildStudentUpdate() { return null; }
function buildPairRecord() { return null; }

// ===== Flush：批量发送行为日志 =====
function flushBehaviorQueue() {
    var keys = [];
    try {
        for (var k in localStorage) {
            if (localStorage.hasOwnProperty(k) && k.indexOf('pending_log_') === 0) {
                keys.push(k);
            }
        }
    } catch(e) { return; }

    if (keys.length === 0) return;

    var records = [];
    var validKeys = [];
    for (var i = 0; i < keys.length; i++) {
        try {
            var rec = JSON.parse(localStorage.getItem(keys[i]));
            records.push(rec);
            validKeys.push(keys[i]);
        } catch(e) {
            try { localStorage.removeItem(keys[i]); } catch(e2) {}
        }
    }
    if (records.length === 0) return;

    scfPost({ action: 'logBehavior', records: records }).then(function(resp) {
        console.log('[DataReporter] behaviorFlush resp:', JSON.stringify(resp).substring(0, 300));
        if (resp && resp.code === 0) {
            for (var j = 0; j < validKeys.length; j++) {
                try { localStorage.removeItem(validKeys[j]); } catch(e) {}
            }
            console.log('[DataReporter] behaviorFlush OK: ' + validKeys.length + ' records');
        } else {
            console.warn('[DataReporter] behaviorFlush non-zero:', resp);
        }
    }).catch(function(err) {
        console.warn('[DataReporter] behaviorFlush failed (will retry):', err.message);
    });
}

// ===== 强制 Flush 所有队列（节课结束时调用）=====
function flushAllQueues() {
    flushBehaviorQueue();
    // flushStudentQueue / flushPairQueue 已移除，no-op
}

// ===== App 启动补传（延迟2秒，等初始化完成）=====
function dataReporterStartupFlush() {
    setTimeout(flushAllQueues, 2000);
}

// ===== 工具：从 window.players + coopRoles 取角色 ID =====
function _getStudentId(playerIndex) {
    var players = window.players;
    if (!players || !players[playerIndex]) return 'unknown';
    var name = players[playerIndex].name || '';
    var m = name.match(/^(\d+)/);
    return m ? m[1] : name.replace(/\s/g, '_');
}

function _getPairId(idA, idB) {
    var sorted = idA < idB ? [idA, idB] : [idB, idA];
    return sorted[0] + '-' + sorted[1];
}

// ===== 构建行为日志记录（adventure.js 的 recordQuestionDetail 里调用）=====
// 返回两条记录的数组：[A行, B行]，分别对应 roleA 和 roleB 两名学生
function buildBehaviorRecord(q, qIndex, wasCorrect, adventureState, timeSpentMs, stationCompleted, stationStarRating) {
    if (!adventureState) return null;
    try {
        var roles = adventureState.coopRoles || [0, 1];
        var roleAIdx = roles[0];
        var roleBIdx = roles[1];
        var roleAStudentId = _getStudentId(roleAIdx);
        var roleBStudentId = _getStudentId(roleBIdx);
        var pairId = _getPairId(roleAStudentId, roleBStudentId);

        var station = adventureState.stations && adventureState.stations[adventureState.currentStation];
        var stationId = station ? String(station.id) : '';
        var scaffoldLevel = adventureState.scaffoldLevels ? (adventureState.scaffoldLevels[qIndex] || 0) : 0;
        var retryCount = adventureState.retryCountMap ? (adventureState.retryCountMap[qIndex] || 0) : 0;

        var now = Date.now(); // 飞书DateTime字段需要毫秒时间戳

        // targetWord：从题目数据中提取本题目标词/句
        var targetWord = q.word        // coop_spell_word, coop_read_relay
            || q.audio                 // coop_listen_relay, coop_listen_judge, coop_listen_scenario
            || q.sentence              // coop_sentence_sort, coop_build_sentence
            || q.template              // coop_relay_fill
            || (q.stepA && q.stepA.correct)  // coop_word_relay
            || (q.stepA && q.stepA.expected) // coop_picture_speak
            || (q.sequence && q.sequence.join(','))  // coop_listen_sort
            || (q.pairs && q.pairs.map(function(p){return p.word;}).join(','))  // coop_flip_match
            || q.scenario              // coop_read_scenario, coop_write_scenario
            || '';

        // classId：优先从 localStorage 取（教师端可预写），否则用默认值
        var classId = '';
        try { classId = localStorage.getItem('merry_classId') || 'grade3_class1'; } catch(e) { classId = 'grade3_class1'; }

        // SOE 分数：从 window._pendingSoeScores 取（由 coop-types.js 录音完成后写入）
        // 注意：_pendingSoeScores 在 adventure.js 的 showCoopFeedback 之后才清空，
        // 这里只读取，不清空（清空由 adventure.js 在 showCoopFeedback 完成后负责）
        var soePending = window._pendingSoeScores || {};
        var soeA = soePending.A || null;
        var soeB = soePending.B || null;

        // 安全取数字：防止 null/undefined 传到飞书 Number 字段
        function _safeNum(v) { return (typeof v === 'number' && !isNaN(v)) ? v : 0; }

        // A行（classId和starRewarded已在飞书表建好字段，但暂不上报，避免旧版JS报错）
        var recA = {
            logId: _drUUID(),
            studentId: roleAStudentId,
            partnerId: roleBStudentId,
            pairId: pairId,
            sessionDate: now,
            lessonId: adventureState.lessonId || '',
            module: adventureState.module || '',
            stationId: stationId,
            questionType: q.type || '',
            questionIndex: Number(qIndex + 1) || 1,
            targetWord: String(targetWord),
            isCorrect: wasCorrect ? 'true' : 'false',
            asRoleA: 'true',
            timeSpentMs: Number(timeSpentMs) || 0,
            scaffoldLevelUsed: Number(scaffoldLevel) || 0,
            retryCount: Number(retryCount) || 0,
            soeScore: _safeNum(soeA && soeA.soeScore)
        };

        // B行
        var recB = {
            logId: _drUUID(),
            studentId: roleBStudentId,
            partnerId: roleAStudentId,
            pairId: pairId,
            sessionDate: now,
            lessonId: adventureState.lessonId || '',
            module: adventureState.module || '',
            stationId: stationId,
            questionType: q.type || '',
            questionIndex: Number(qIndex + 1) || 1,
            targetWord: String(targetWord),
            isCorrect: wasCorrect ? 'true' : 'false',
            asRoleA: 'false',
            timeSpentMs: Number(timeSpentMs) || 0,
            scaffoldLevelUsed: Number(scaffoldLevel) || 0,
            retryCount: Number(retryCount) || 0,
            soeScore: _safeNum(soeB && soeB.soeScore)
        };

        // 注意：_pendingSoeScores 不在此处清空，由 adventure.js 的 showCoopFeedback
        // 完成后清空，确保 showCoopFeedback 能用到分数生成评语（问题3修复）

        return [recA, recB];
    } catch(e) {
        console.warn('[DataReporter] buildBehaviorRecord error:', e.message);
        return null;
    }
}

// ===== 暴露全局 =====
window.enqueueBehaviorLog = enqueueBehaviorLog;
window.enqueuePairLog = enqueuePairLog;
window.enqueueStudentUpdate = enqueueStudentUpdate;
window.flushBehaviorQueue = flushBehaviorQueue;
window.flushPairQueue = flushPairQueue;
window.flushStudentQueue = flushStudentQueue;
window.flushAllQueues = flushAllQueues;
window.dataReporterStartupFlush = dataReporterStartupFlush;
window.buildBehaviorRecord = buildBehaviorRecord;
window.buildStudentUpdate = buildStudentUpdate;
window.buildPairRecord = buildPairRecord;

// App 启动时自动补传
document.addEventListener('DOMContentLoaded', dataReporterStartupFlush);

console.log('📊 DataReporter: Loaded');
