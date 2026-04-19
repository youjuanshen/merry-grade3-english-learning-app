// 腾讯云 SCF 云函数：课堂练习 App 后端
// 功能：1) 成绩提交到飞书  2) 教师指令读写
'use strict';

import https from 'https';

const LARK_APP_ID = "cli_a93bc13364f88060";
const LARK_APP_SECRET = "mJRuXzOQk9ejHdvIvFFfVbmvGycI1KdR";
const LARK_APP_TOKEN = "Oy1dbiDS7aLIS8sqI1ZumqJSt8b";

// 两个表
const TABLE_SCORES = "tbluJjXQDQ2mxjxO";   // 课堂练习成绩
const TABLE_COMMANDS = "tblK0Q5Wr1kNHeCy";  // 控制指令

// 研究数据新表（阶段 3 手动建表后填入真实 tableId）
const TABLE_BEHAVIOR_LOG = 'tblCqx678yrA1KOD';   // app_behavior_log
const TABLE_STUDENT_PROFILE = 'tblxpu97Rnr2QW6J'; // student_profile
const TABLE_PAIR_COLLAB_LOG = 'tblByTjYSKvTLKqe'; // pair_collab_log

function post(hostname, path, data, token) {
    return new Promise(function(resolve, reject) {
        var body = JSON.stringify(data);
        var options = {
            hostname: hostname,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };
        if (token) { options.headers['Authorization'] = 'Bearer ' + token; }
        var req = https.request(options, function(res) {
            var chunks = [];
            res.on('data', function(chunk) { chunks.push(chunk); });
            res.on('end', function() {
                try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
                catch(e) { reject(new Error('JSON parse error')); }
            });
        });
        req.on('error', function(e) { reject(e); });
        req.setTimeout(30000, function() { req.destroy(new Error('timeout')); });
        req.write(body);
        req.end();
    });
}

function get(hostname, path, token) {
    return new Promise(function(resolve, reject) {
        var options = {
            hostname: hostname,
            path: path,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };
        var req = https.request(options, function(res) {
            var chunks = [];
            res.on('data', function(chunk) { chunks.push(chunk); });
            res.on('end', function() {
                try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
                catch(e) { reject(new Error('JSON parse error')); }
            });
        });
        req.on('error', function(e) { reject(e); });
        req.setTimeout(30000, function() { req.destroy(new Error('timeout')); });
        req.end();
    });
}

function del(hostname, path, token) {
    return new Promise(function(resolve, reject) {
        var options = {
            hostname: hostname,
            path: path,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };
        var req = https.request(options, function(res) {
            var chunks = [];
            res.on('data', function(chunk) { chunks.push(chunk); });
            res.on('end', function() {
                try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
                catch(e) { reject(new Error('JSON parse error')); }
            });
        });
        req.on('error', function(e) { reject(e); });
        req.setTimeout(30000, function() { req.destroy(new Error('timeout')); });
        req.end();
    });
}

// 批量创建记录（logBehavior 用）
function batchCreate(token, tableId, records) {
    var rows = records.map(function(r) { return { fields: r }; });
    return post('open.feishu.cn',
        '/open-apis/bitable/v1/apps/' + LARK_APP_TOKEN + '/tables/' + tableId + '/records/batch_create',
        { records: rows }, token);
}

// PUT 更新单条记录（upsert 用）
function putRecord(token, tableId, recordId, fields) {
    return new Promise(function(resolve, reject) {
        var body = JSON.stringify({ fields: fields });
        var opts = {
            hostname: 'open.feishu.cn',
            path: '/open-apis/bitable/v1/apps/' + LARK_APP_TOKEN + '/tables/' + tableId + '/records/' + recordId,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body),
                'Authorization': 'Bearer ' + token
            }
        };
        var req = https.request(opts, function(res) {
            var chunks = [];
            res.on('data', function(c) { chunks.push(c); });
            res.on('end', function() {
                try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
                catch(e) { reject(new Error('JSON parse error')); }
            });
        });
        req.on('error', function(e) { reject(e); });
        req.write(body);
        req.end();
    });
}

// 按单字段查找记录（upsert 去重用）
function findByField(token, tableId, fieldName, fieldValue) {
    var filter = encodeURIComponent('CurrentValue.[' + fieldName + ']="' + String(fieldValue) + '"');
    var url = '/open-apis/bitable/v1/apps/' + LARK_APP_TOKEN +
        '/tables/' + tableId + '/records?filter=' + filter + '&page_size=1';
    return get('open.feishu.cn', url, token).then(function(resp) {
        if (resp.data && resp.data.items && resp.data.items.length > 0) {
            return resp.data.items[0];
        }
        return null;
    });
}

// 按双字段 AND 查找记录（logPair upsert 用）
function findByTwoFields(token, tableId, f1, v1, f2, v2) {
    var filter = encodeURIComponent(
        'AND(CurrentValue.[' + f1 + ']="' + String(v1) + '",CurrentValue.[' + f2 + ']="' + String(v2) + '")'
    );
    var url = '/open-apis/bitable/v1/apps/' + LARK_APP_TOKEN +
        '/tables/' + tableId + '/records?filter=' + filter + '&page_size=1';
    return get('open.feishu.cn', url, token).then(function(resp) {
        if (resp.data && resp.data.items && resp.data.items.length > 0) {
            return resp.data.items[0];
        }
        return null;
    });
}

async function getToken() {
    var tk = await post('open.feishu.cn', '/open-apis/auth/v3/tenant_access_token/internal',
        { app_id: LARK_APP_ID, app_secret: LARK_APP_SECRET }, null);
    if (!tk.tenant_access_token) throw new Error('no token: ' + JSON.stringify(tk));
    return tk.tenant_access_token;
}

// ========== 指令读写 ==========

// 查找指定 key 的记录
async function findRecord(token, key) {
    var filter = encodeURIComponent('CurrentValue.[key]="' + key + '"');
    var url = '/open-apis/bitable/v1/apps/' + LARK_APP_TOKEN +
        '/tables/' + TABLE_COMMANDS + '/records?filter=' + filter + '&page_size=1';
    var resp = await get('open.feishu.cn', url, token);
    if (resp.data && resp.data.items && resp.data.items.length > 0) {
        return resp.data.items[0];
    }
    return null;
}

// 写入指令（key-value）：有则更新，无则创建
async function setCommand(token, key, value) {
    var existing = await findRecord(token, key);
    var fields = { "key": key, "data": value };

    if (existing) {
        // 更新现有记录
        var url = '/open-apis/bitable/v1/apps/' + LARK_APP_TOKEN +
            '/tables/' + TABLE_COMMANDS + '/records/' + existing.record_id;
        // PUT request
        return new Promise(function(resolve, reject) {
            var body = JSON.stringify({ fields: fields });
            var options = {
                hostname: 'open.feishu.cn',
                path: url,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(body),
                    'Authorization': 'Bearer ' + token
                }
            };
            var req = https.request(options, function(res) {
                var chunks = [];
                res.on('data', function(chunk) { chunks.push(chunk); });
                res.on('end', function() {
                    try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
                    catch(e) { reject(new Error('JSON parse error')); }
                });
            });
            req.on('error', function(e) { reject(e); });
            req.write(body);
            req.end();
        });
    } else {
        // 创建新记录
        return await post('open.feishu.cn',
            '/open-apis/bitable/v1/apps/' + LARK_APP_TOKEN + '/tables/' + TABLE_COMMANDS + '/records',
            { fields: fields }, token);
    }
}

// 读取指令
async function getCommand(token, key) {
    var record = await findRecord(token, key);
    if (record && record.fields) {
        return record.fields['data'] || null;
    }
    return null;
}

// ========== 主处理函数 ==========

export const main_handler = async (event, context) => {
    var cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Api-Key',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: cors, body: '' };

    // 鉴权：防止外部刷接口
    var API_KEY = 'merry-quiz-2026-secret';
    var headers = event.headers || {};
    var authKey = headers['x-api-key'] || headers['X-Api-Key'] || '';
    if (authKey !== API_KEY) {
        return { statusCode: 403, headers: cors, body: JSON.stringify({ code: -1, msg: 'forbidden' }) };
    }

    try {
        var bodyStr = event.body || '{}';
        if (event.isBase64Encoded) bodyStr = Buffer.from(bodyStr, 'base64').toString('utf8');
        var d = JSON.parse(bodyStr);

        var token = await getToken();

        // ========== 路由 ==========

        // 新增：logBehavior — 批量写 app_behavior_log（表1）
        if (d.action === 'logBehavior') {
            var records = d.records;
            if (!records || !records.length) {
                return { statusCode: 200, headers: cors, body: JSON.stringify({ code: -1, msg: 'records empty' }) };
            }
            var batchResp = await batchCreate(token, TABLE_BEHAVIOR_LOG, records);
            var batchCode = (batchResp && batchResp.code === 0) ? 0 : -1;
            return { statusCode: 200, headers: cors, body: JSON.stringify({ code: batchCode, msg: 'ok', count: records.length, larkResp: batchResp }) };
        }

        // 新增：logStudent — upsert student_profile（表2，按 studentId 去重）
        if (d.action === 'logStudent') {
            var srec = d.record;
            if (!srec || !srec.studentId) {
                return { statusCode: 200, headers: cors, body: JSON.stringify({ code: -1, msg: 'record.studentId required' }) };
            }
            var sexisting = await findByField(token, TABLE_STUDENT_PROFILE, 'studentId', srec.studentId);
            var sWriteResp;
            if (sexisting) {
                sWriteResp = await putRecord(token, TABLE_STUDENT_PROFILE, sexisting.record_id, srec);
            } else {
                sWriteResp = await post('open.feishu.cn',
                    '/open-apis/bitable/v1/apps/' + LARK_APP_TOKEN + '/tables/' + TABLE_STUDENT_PROFILE + '/records',
                    { fields: srec }, token);
            }
            var sCode = (sWriteResp && sWriteResp.code === 0) ? 0 : -1;
            return { statusCode: 200, headers: cors, body: JSON.stringify({ code: sCode, msg: sCode === 0 ? 'ok' : 'lark write failed', larkResp: sWriteResp }) };
        }

        // 新增：logPair — upsert pair_collab_log（表3，按 pairId+lessonId 去重）
        if (d.action === 'logPair') {
            var prec = d.record;
            if (!prec || !prec.pairId || !prec.lessonId) {
                return { statusCode: 200, headers: cors, body: JSON.stringify({ code: -1, msg: 'record.pairId and record.lessonId required' }) };
            }
            var pexisting = await findByTwoFields(token, TABLE_PAIR_COLLAB_LOG, 'pairId', prec.pairId, 'lessonId', prec.lessonId);
            if (pexisting) {
                await putRecord(token, TABLE_PAIR_COLLAB_LOG, pexisting.record_id, prec);
            } else {
                await post('open.feishu.cn',
                    '/open-apis/bitable/v1/apps/' + LARK_APP_TOKEN + '/tables/' + TABLE_PAIR_COLLAB_LOG + '/records',
                    { fields: prec }, token);
            }
            return { statusCode: 200, headers: cors, body: JSON.stringify({ code: 0, msg: 'ok' }) };
        }

        // queryProgress — 教师 Dashboard 聚合当天进度（ADR-007 v2）
        if (d.action === 'queryProgress') {
            if (!d.classId || !d.lessonId) {
                return { statusCode: 200, headers: cors, body: JSON.stringify({ code: -1, msg: 'classId and lessonId required' }) };
            }

            // 今天 0:00 ~ 23:59:59 毫秒范围
            var now = Date.now();
            var todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);
            var dayStartMs = todayStart.getTime();
            var dayEndMs = dayStartMs + 86400000 - 1;

            // 分页抓取 app_behavior_log（每页最多500条）
            var allItems = [];
            var pageToken = '';
            var pageLoop = true;
            var loopCount = 0;
            while (pageLoop && loopCount < 20) {
                loopCount++;
                var qfilter = encodeURIComponent(
                    'AND(' +
                    'CurrentValue.[classId]="' + String(d.classId) + '",' +
                    'CurrentValue.[lessonId]="' + String(d.lessonId) + '",' +
                    'CurrentValue.[sessionDate]>=' + dayStartMs + ',' +
                    'CurrentValue.[sessionDate]<=' + dayEndMs +
                    ')'
                );
                var qurl = '/open-apis/bitable/v1/apps/' + LARK_APP_TOKEN +
                    '/tables/' + TABLE_BEHAVIOR_LOG + '/records?filter=' + qfilter + '&page_size=500' +
                    (pageToken ? '&page_token=' + encodeURIComponent(pageToken) : '');
                var qresp = await get('open.feishu.cn', qurl, token);
                var pageItems = (qresp.data && qresp.data.items) ? qresp.data.items : [];
                allItems = allItems.concat(pageItems);
                if (qresp.data && qresp.data.has_more && qresp.data.page_token) {
                    pageToken = qresp.data.page_token;
                } else {
                    pageLoop = false;
                }
            }

            // 抓取 student_profile 表，构建 studentId → name 映射
            var studentMap = {};
            try {
                var spUrl = '/open-apis/bitable/v1/apps/' + LARK_APP_TOKEN +
                    '/tables/' + TABLE_STUDENT_PROFILE + '/records?page_size=500';
                var spResp = await get('open.feishu.cn', spUrl, token);
                if (spResp.data && spResp.data.items) {
                    spResp.data.items.forEach(function(rec) {
                        var f = rec.fields || {};
                        if (f.studentId && f.name) {
                            studentMap[String(f.studentId)] = String(f.name);
                        }
                    });
                }
            } catch(e) { /* 非致命错误，忽略 */ }

            // 按 pairId 分组
            var pairMap = {};
            allItems.forEach(function(rec) {
                var f = rec.fields || {};
                var pid = String(f.pairId || 'unknown');
                if (!pairMap[pid]) { pairMap[pid] = []; }
                pairMap[pid].push(f);
            });

            // U1L1 满站点集合（4个站），可按 lessonId 扩展
            var REQUIRED_STATIONS = [1, 2, 3, 4];

            var completedPairs = [];
            var needsHelpPairs = [];
            var speakingLeaderboard = [];
            var earliestTime = Infinity;
            var allPairIds = Object.keys(pairMap);

            allPairIds.forEach(function(pid) {
                var records = pairMap[pid];

                // 计算 speakCount
                var speakCount = records.filter(function(f) {
                    return (f.questionType && String(f.questionType).indexOf('speak') !== -1) ||
                           (f.soeScore !== null && f.soeScore !== undefined && f.soeScore !== '');
                }).length;

                // 计算 stars
                var stars = records.reduce(function(sum, f) {
                    return sum + (Number(f.starRewarded) || 0);
                }, 0);

                // 最早记录时间（用于 elapsed_min）
                records.forEach(function(f) {
                    var t = Number(f.sessionDate) || 0;
                    if (t > 0 && t < earliestTime) { earliestTime = t; }
                });

                // 完成判断：isCorrect=true 的 stationId 集合覆盖所有必须站点
                var correctStations = {};
                records.forEach(function(f) {
                    if (f.isCorrect === true || f.isCorrect === 'true' || f.isCorrect === 1) {
                        correctStations[Number(f.stationId)] = true;
                    }
                });
                var isCompleted = REQUIRED_STATIONS.every(function(s) { return correctStations[s]; });

                // 最新记录（sessionDate 最大）
                var latestRecord = records.reduce(function(latest, f) {
                    return (Number(f.sessionDate) || 0) > (Number(latest.sessionDate) || 0) ? f : latest;
                }, records[0]);

                var scaffoldLevel = Number(latestRecord.scaffoldLevelUsed) || 0;
                var retryCount = Number(latestRecord.retryCount) || 0;
                var needsHelp = (scaffoldLevel === 4 && retryCount >= 2);

                // 获取成员名字（studentA / studentB 字段，或从 studentMap 查）
                var members = [];
                if (latestRecord.studentAId && studentMap[String(latestRecord.studentAId)]) {
                    members.push(studentMap[String(latestRecord.studentAId)]);
                } else if (latestRecord.studentA) {
                    members.push(String(latestRecord.studentA));
                }
                if (latestRecord.studentBId && studentMap[String(latestRecord.studentBId)]) {
                    members.push(studentMap[String(latestRecord.studentBId)]);
                } else if (latestRecord.studentB) {
                    members.push(String(latestRecord.studentB));
                }
                if (members.length === 0) { members.push('组' + pid); }

                if (isCompleted) {
                    completedPairs.push({
                        pair_id: pid,
                        members: members,
                        stars: stars,
                        speaking_count: speakCount
                    });
                }

                if (needsHelp) {
                    // SOE 平均分
                    var soeScores = records
                        .map(function(f) { return Number(f.soeScore); })
                        .filter(function(v) { return !isNaN(v) && v > 0; });
                    var soeAvg = soeScores.length > 0
                        ? Math.round(soeScores.reduce(function(a,b){return a+b;},0) / soeScores.length)
                        : 0;

                    needsHelpPairs.push({
                        pair_id: pid,
                        members: members,
                        current_station: Number(latestRecord.stationId) || 0,
                        retry_count: retryCount,
                        scaffold_level: scaffoldLevel,
                        speaking_count: speakCount,
                        soe_avg: soeAvg
                    });
                }

                speakingLeaderboard.push({ pair_id: pid, speaking_count: speakCount });
            });

            // 口语榜降序排列，最低者标注
            speakingLeaderboard.sort(function(a, b) { return b.speaking_count - a.speaking_count; });
            if (speakingLeaderboard.length > 0) {
                var minCount = speakingLeaderboard[speakingLeaderboard.length - 1].speaking_count;
                speakingLeaderboard[speakingLeaderboard.length - 1].is_lowest = true;
                // 如果有多个并列最低，全部标注
                speakingLeaderboard.forEach(function(item) {
                    if (item.speaking_count === minCount) { item.is_lowest = true; }
                });
            }

            var totalPairs = allPairIds.length;
            var specialPairIds = {};
            completedPairs.forEach(function(p) { specialPairIds[p.pair_id] = true; });
            needsHelpPairs.forEach(function(p) { specialPairIds[p.pair_id] = true; });
            var normalPairsCount = totalPairs - Object.keys(specialPairIds).length;
            if (normalPairsCount < 0) { normalPairsCount = 0; }

            var elapsedMin = (earliestTime === Infinity)
                ? 0
                : Math.round((now - earliestTime) / 60000);

            var result = {
                code: 0,
                class_id: d.classId,
                lesson_id: d.lessonId,
                lesson_elapsed_min: elapsedMin,
                total_pairs: totalPairs,
                normal_pairs_count: normalPairsCount,
                completed_pairs: completedPairs,
                needs_help_pairs: needsHelpPairs,
                speaking_leaderboard: speakingLeaderboard
            };
            return { statusCode: 200, headers: cors, body: JSON.stringify(result) };
        }

        // 1. 写入指令
        if (d.action === 'set') {
            var result = await setCommand(token, d.key, d.value);
            return { statusCode: 200, headers: cors, body: JSON.stringify({ code: 0, msg: 'ok' }) };
        }

        // 2. 读取指令
        if (d.action === 'get') {
            var value = await getCommand(token, d.key);
            return { statusCode: 200, headers: cors, body: JSON.stringify({ code: 0, data: value }) };
        }

        // 3. 提交成绩（默认）
        var fields = {
            "姓名": String(d.studentName || ''),
            "时间": Number(d.timestamp) || Date.now(),
            "考试类型": String(d.examType || ''),
            "总分": Number(d.score) || 0,
            "满分": Number(d.maxScore) || 0,
            "总正确率": Number(d.accuracy) || 0,
            "课程名称": String(d.lessonTitle || ''),
            "听力": Number(d.listeningScore) || 0,
            "阅读": Number(d.readingScore) || 0,
            "写作": Number(d.writingScore) || 0,
            "口语": Number(d.speakingScore) || 0
        };

        var result = await post('open.feishu.cn',
            '/open-apis/bitable/v1/apps/' + LARK_APP_TOKEN + '/tables/' + TABLE_SCORES + '/records',
            { fields: fields }, token);

        return { statusCode: 200, headers: cors, body: JSON.stringify(result) };

    } catch(err) {
        return {
            statusCode: 200,
            headers: cors,
            body: JSON.stringify({ code: -1, msg: err.message })
        };
    }
};
