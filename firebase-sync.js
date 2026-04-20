/**
 * 云函数同步引擎（替代 Firebase）
 * 通过腾讯云函数 + 飞书多维表格实现多设备通信
 */

// 环境判断：本地网络（含局域网 IP）走本地内存存储，GitHub Pages 等公网域名走云端 SCF
var _hostname = window.location.hostname;
var _isLocal = (
    _hostname === 'localhost' ||
    _hostname === '127.0.0.1' ||
    /^192\.168\./.test(_hostname) ||
    /^10\./.test(_hostname) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(_hostname)
);
var SCF_URL = _isLocal ? "/api" : "https://1316992450-2fbeeh6iet.ap-guangzhou.tencentscf.com/";
var SCF_API_KEY = "merry-quiz-2026-secret";

const _cache = {
    teacherCommand: null,
    currentLesson: null
};

// ===== 基础通信 =====

function scfPost(data) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', SCF_URL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-Api-Key', SCF_API_KEY);
        xhr.timeout = 15000;
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                try { resolve(JSON.parse(xhr.responseText)); }
                catch(e) { resolve({ code: 0 }); }
            } else {
                reject(new Error('HTTP ' + xhr.status));
            }
        };
        xhr.onerror = function() { reject(new Error('NETWORK_ERROR')); };
        xhr.ontimeout = function() { reject(new Error('TIMEOUT')); };
        xhr.send(JSON.stringify(data));
    });
}

// 写入键值
function scfSet(key, value) {
    return scfPost({ action: 'set', key: key, value: typeof value === 'string' ? value : JSON.stringify(value) });
}

// 读取键值
function scfGet(key) {
    return scfPost({ action: 'get', key: key }).then(function(resp) {
        if (resp && resp.data) {
            try { return JSON.parse(resp.data); }
            catch(e) { return resp.data; }
        }
        return null;
    });
}

// ===== Sync API（保持与原有接口兼容）=====

const Sync = {
    /**
     * 监听教师发布的控制指令（轮询模式）
     */
    listenTeacherCommand: (callback) => {
        let lastTimestamp = 0;
        let pollInterval = 30000; // 30秒轮询（省费用）
        let errorCount = 0;
        let pollTimer = null;

        function poll() {
            // 页面不可见时跳过轮询，节省调用次数
            if (document.hidden) {
                pollTimer = setTimeout(poll, pollInterval);
                return;
            }
            scfGet('teacherCommand').then(function(val) {
                errorCount = 0;
                if (val && val.timestamp && val.timestamp !== lastTimestamp) {
                    lastTimestamp = val.timestamp;
                    _cache.teacherCommand = val;
                    callback(val);
                }
                pollTimer = setTimeout(poll, pollInterval);
            }).catch(function(err) {
                errorCount++;
                var backoff = Math.min(pollInterval + errorCount * 10000, 60000);
                console.warn('[Sync] 轮询失败(第' + errorCount + '次)，' + (backoff/1000) + '秒后重试');
                pollTimer = setTimeout(poll, backoff);
            });
        }

        // 页面重新可见时立即拉一次
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                clearTimeout(pollTimer);
                poll();
            }
        });

        setTimeout(poll, 1000);
    },

    /**
     * 教师派发游戏控制指令
     */
    sendTeacherCommand: (cmdObj) => {
        _cache.teacherCommand = cmdObj;
        // 同时写 localStorage（本地备份）和云端
        localStorage.setItem('teacherCommand', JSON.stringify(cmdObj));
        scfSet('teacherCommand', cmdObj).then(function() {
            console.log('[Sync] 教师指令已同步到云端');
        }).catch(function(err) {
            console.warn('[Sync] 教师指令云端同步失败:', err.message);
        });
    },

    /**
     * 同步当前课程
     */
    setCurrentLesson: (lessonObj) => {
        _cache.currentLesson = lessonObj;
        localStorage.setItem('currentLesson', JSON.stringify(lessonObj));
        scfSet('currentLesson', lessonObj).then(function() {
            console.log('[Sync] 课程信息已同步到云端');
        }).catch(function(err) {
            console.warn('[Sync] 课程信息云端同步失败:', err.message);
        });
    },

    getCurrentLessonOnce: async () => {
        // 先用本地缓存，不主动发请求（由轮询更新）
        if (_cache.currentLesson) return _cache.currentLesson;
        var str = localStorage.getItem('currentLesson');
        if (str) {
            try {
                var parsed = JSON.parse(str);
                _cache.currentLesson = parsed;
                return parsed;
            } catch(e) { return null; }
        }
        // 本地没有才去云端拿
        try {
            var val = await scfGet('currentLesson');
            if (val) {
                _cache.currentLesson = val;
                return val;
            }
        } catch(e) {
            console.warn('[Sync] 获取课程失败');
        }
        return null;
    },

    getCurrentLessonOnceSync: () => {
        if (_cache.currentLesson) return _cache.currentLesson;
        var str = localStorage.getItem('currentLesson');
        if (!str) return null;
        try {
            var parsed = JSON.parse(str);
            _cache.currentLesson = parsed;
            return parsed;
        } catch(e) { return null; }
    },

    getTeacherCommandOnce: () => {
        if (_cache.teacherCommand) return _cache.teacherCommand;
        var str = localStorage.getItem('teacherCommand');
        if (!str) return null;
        try {
            var parsed = JSON.parse(str);
            _cache.teacherCommand = parsed;
            return parsed;
        } catch(e) { return null; }
    },

    /**
     * 同步作业检查结果
     */
    saveHomeworkCheck: (key, data) => {
        var currentObj = {};
        try {
            currentObj = JSON.parse(localStorage.getItem('homeworkRecords') || '{}');
        } catch(e) { currentObj = {}; }
        currentObj[key] = data;
        localStorage.setItem('homeworkRecords', JSON.stringify(currentObj));
    },

    getHomeworkRecordsOnce: async () => {
        try {
            return JSON.parse(localStorage.getItem('homeworkRecords') || '{}');
        } catch(e) { return {}; }
    },

    /**
     * 进度统计汇总上报
     */
    setDashboardData: (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    },

    getDashboardDataOnce: async (key) => {
        try {
            return JSON.parse(localStorage.getItem(key) || 'null');
        } catch(e) { return null; }
    }
};

window.Sync = Sync;
window.scfPost = scfPost; // 暴露给 data-reporter.js 使用
console.log("☁️ Cloud Sync Engine: Activated (SCF + Feishu)");
