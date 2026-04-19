/**
 * coop-types.js — 合作题型渲染器
 *
 * 每道题分为 A步骤（蓝色）→ B步骤（橙色）
 * B的操作区域在A完成前灰显，A完成后激活
 */

// ===== SOE 录音按钮工具 =====
// 用在所有真正开口说话的题型（read_relay / picture_speak / dialogue）
// 按钮状态机：🎤 点击说 → 🔴 正在录（再点击停）→ ⏳ 评分中 → ✅ 完成 → 调 onComplete(selectedValue)
// 录音结果存到 window._pendingSoeScores[role]，data-reporter.js 会注入到飞书记录
function attachSoeRecordButton(opts) {
    var btn = opts.button;
    var refText = opts.referenceText || '';
    var role = opts.role || 'A';
    var defaultLabel = opts.defaultLabel || '🎤 点击开始说';
    var scoringLabel = '⏳ 评分中...';
    var doneLabel = opts.doneLabel || '⭐ 完成！继续加油！';
    var onComplete = opts.onComplete || function() {};

    if (!window._pendingSoeScores) window._pendingSoeScores = { A: null, B: null };

    var state = 'idle'; // idle → recording → scoring → done
    var controller = null;

    // 大按钮，三年级学生好点
    btn.style.cssText += ';min-height:56px;font-size:20px;font-weight:bold;';
    btn.textContent = defaultLabel;

    var _recordStartTime = 0;
    var MIN_RECORD_MS = 3000; // 最短录音3秒，确保足够音频数据

    btn.onclick = function() {
        if (state === 'idle') {
            if (!window.SpeechEvaluator) {
                console.warn('[SOE] SpeechEvaluator 未加载，跳过录音直接完成');
                state = 'done'; btn.disabled = true;
                btn.textContent = '⭐ 完成！继续加油！';
                btn.style.cssText += ';background:#fff;border:3px solid #FF9800;color:#E65100;font-size:20px;font-weight:bold;border-radius:12px;padding:12px 24px;';
                window._pendingSoeScores[role] = null;
                onComplete('speak_done');
                return;
            }
            // 开始录音
            state = 'recording';
            _recordStartTime = Date.now();
            btn.textContent = '🔴 大声读3遍，读完点这里';
            btn.style.background = '#FF5252';
            btn.style.color = '#fff';
            btn.style.fontSize = '18px';
            btn.classList.add('coop-recording');
            controller = window.SpeechEvaluator.beginRecordAndEvaluate(refText);

        } else if (state === 'recording') {
            // 检查最短录音时间
            var elapsed = Date.now() - _recordStartTime;
            if (elapsed < MIN_RECORD_MS) {
                var remain = Math.ceil((MIN_RECORD_MS - elapsed) / 1000);
                btn.textContent = '🔴 再多读' + remain + '秒...';
                return; // 不停止，让学生继续读
            }
            // 学生主动点击停止
            state = 'scoring';
            btn.textContent = scoringLabel;
            btn.disabled = true;
            btn.style.background = '';
            btn.style.color = '';
            btn.style.fontSize = '';
            btn.classList.remove('coop-recording');
            var stopPromise = controller ? controller.stop() : Promise.resolve({ soeScore:null, soePronAccuracy:null, soePronFluency:null, soePronCompletion:null });
            stopPromise.then(function(scores) {
                window._pendingSoeScores[role] = scores || null;
                state = 'done';
                var s = scores && typeof scores.soeScore === 'number' ? scores.soeScore : null;
                console.log('[SOE] ' + role + ' raw score:', s, 'ref="' + refText + '"');

                // 录音完成 → 统一给正面反馈
                // 研究数据保留原始分数（在 _pendingSoeScores 中），但学生只看鼓励
                btn.style.background = '#fff';
                btn.style.fontSize = '20px';
                btn.style.fontWeight = 'bold';
                btn.style.borderRadius = '12px';
                btn.style.padding = '12px 24px';

                if (s !== null && s >= 40) {
                    btn.textContent = '⭐⭐⭐ 读得很棒！';
                    btn.style.border = '3px solid #4CAF50';
                    btn.style.color = '#2E7D32';
                } else if (s !== null && s >= 15) {
                    btn.textContent = '⭐⭐ 读得不错！';
                    btn.style.border = '3px solid #4CAF50';
                    btn.style.color = '#2E7D32';
                } else {
                    // 0分、低分、null → 录完就过，不卡学生
                    // iPhone 6 Plus硬件限制，认真读也经常0分，强制重试只会卡死
                    btn.textContent = '⭐ 完成！继续加油！';
                    btn.style.border = '3px solid #FF9800';
                    btn.style.color = '#E65100';
                }
                onComplete('speak_done');
            });
        }
    };
    return btn;
}

// ===== B 步骤"念词/念句"开口支架（P2-1/P2-2）=====
// 在题型答对后插入一个 SOE 录音阶段，让 B 真正开口说出题目里的英文。
// 复用 attachSoeRecordButton；提供"我不会说"兜底（写 null 分数后继续）。
// 不改变原题型答题逻辑，只在"答对"分支末尾追加一个阶段。
function appendSpeakStage(parent, refText, role, opts) {
    opts = opts || {};
    var hint = opts.hint || '大声说出来';
    var doneLabel = opts.doneLabel || '⭐ 完成！继续加油！';
    var onDone = opts.onDone || function() {};
    var stageId = 'speak-stage-' + Math.random().toString(36).slice(2, 8);

    // 防重复：如果父节点里已有同类阶段则不再追加
    var existing = parent.querySelector('.coop-speak-stage');
    if (existing) return existing;

    var sayDiv = document.createElement('div');
    sayDiv.className = 'coop-speak-stage';
    sayDiv.id = stageId;
    sayDiv.style.cssText = 'margin-top:12px;padding:12px;background:#FFF8E1;border:2px dashed #F5A623;border-radius:12px;text-align:center;';

    var hintEl = document.createElement('div');
    hintEl.style.cssText = 'font-size:13px;color:#795548;margin-bottom:6px;font-weight:bold;';
    hintEl.textContent = '🎤 ' + hint;
    sayDiv.appendChild(hintEl);

    var refEl = document.createElement('div');
    refEl.style.cssText = 'font-size:22px;font-weight:bold;letter-spacing:1px;margin-bottom:10px;color:#333;line-height:1.3;';
    refEl.textContent = refText;
    sayDiv.appendChild(refEl);

    var sayBtn = document.createElement('button');
    sayBtn.className = 'coop-continue-btn';
    sayBtn.style.cssText = 'margin:6px auto;display:block;';
    attachSoeRecordButton({
        button: sayBtn,
        referenceText: refText,
        role: role,
        defaultLabel: '🎤 大声说',
        doneLabel: doneLabel,
        onComplete: function() {
            skipBtn.disabled = true;
            onDone();
        }
    });
    sayDiv.appendChild(sayBtn);

    var skipBtn = document.createElement('button');
    skipBtn.type = 'button';
    skipBtn.textContent = '😅 我不会说，跳过';
    skipBtn.style.cssText = 'display:none;margin:10px auto 0;background:transparent;border:none;color:#999;font-size:13px;text-decoration:underline;cursor:pointer;padding:6px;';
    // P2-3: 3秒冷却 — 防学生秒点跳过零录音
    setTimeout(function() { skipBtn.style.display = 'block'; }, 3000);
    skipBtn.onclick = function() {
        if (skipBtn.disabled) return;
        skipBtn.disabled = true;
        sayBtn.disabled = true;
        // 兜底：跳过时显式写入 null 分数（不影响 data-reporter，下一题清空）
        if (!window._pendingSoeScores) window._pendingSoeScores = { A: null, B: null };
        window._pendingSoeScores[role] = null;
        onDone();
    };
    sayDiv.appendChild(skipBtn);

    parent.appendChild(sayDiv);
    // 滚动到该阶段，避免被 iPhone 6 Plus 视口截断
    setTimeout(function() {
        try { sayDiv.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        catch (e) { sayDiv.scrollIntoView(true); }
    }, 100);
    return sayDiv;
}

// ===== 主入口：渲染合作题 =====
function renderCoopType(q, container, state) {
    container.innerHTML = '';

    // 每题切题时 adventure.js 会 reverse adventureState.coopRoles，
    // 保证 A/B 跨模块、跨题型都严格每题轮换（研究效度要求）。
    // 无 coopRoles（如测试/独立调用）时回退到老的 qIndex 奇偶判断。
    var qIndex = (state && state.stationProgress) ? state.stationProgress.questionIndex : 0;
    if (state && state.coopRoles && state.coopRoles.length === 2) {
        window.currentCoopRoleA = state.coopRoles[0];
    } else {
        window.currentCoopRoleA = qIndex % 2 === 0 ? 0 : 1;
    }

    var renderers = {
        'coop_listen_relay':    renderCoopListenRelay,
        'coop_listen_judge':    renderCoopListenJudge,
        'coop_listen_sort':     renderCoopListenSort,
        'coop_listen_scenario': renderCoopScenario,
        'coop_word_relay':      renderCoopWordRelay,
        'coop_flip_match':      renderCoopFlipMatch,
        'coop_sentence_sort':   renderCoopSentenceSort,
        'coop_read_scenario':   renderCoopScenario,
        'coop_build_sentence':  renderCoopBuildSentence,
        'coop_relay_fill':      renderCoopRelayFill,
        'coop_spell_word':      renderCoopSpellWord,
        'coop_write_scenario':  renderCoopScenario,
        'coop_read_relay':      renderCoopReadRelay,
        'coop_picture_speak':   renderCoopPictureSpeak,
        'coop_dialogue':        renderCoopDialogue
    };

    var fn = renderers[q.type];
    if (fn) {
        fn(q, container, state);
    } else {
        container.innerHTML = '<div style="text-align:center;padding:40px;color:#999;">未知题型: ' + q.type + '</div>';
    }
}

// ===== 渲染B步骤（A完成后调用）=====
function renderCoopStepB(q, container, state) {
    // 清除A的交互区，保留共享区域，渲染B
    var renderers = {
        'coop_listen_relay':    renderStepB_ListenRelay,
        'coop_listen_judge':    renderStepB_ListenJudge,
        'coop_listen_scenario': renderStepB_Scenario,
        'coop_word_relay':      renderStepB_WordRelay,
        'coop_read_scenario':   renderStepB_Scenario,
        'coop_write_scenario':  renderStepB_Scenario,
        'coop_relay_fill':      renderStepB_RelayFill,
        'coop_spell_word':      renderStepB_SpellWord,
        'coop_picture_speak':   renderStepB_PictureSpeak,
        'coop_read_relay':      renderStepB_ReadRelay,
        'coop_dialogue':        renderStepB_Dialogue,
        'coop_build_sentence':  renderStepB_BuildSentence,
        'coop_listen_sort':     renderStepB_NoOp,
        'coop_flip_match':      renderStepB_NoOp,
        'coop_sentence_sort':   renderStepB_NoOp
    };

    // B步骤激活前：重置A区所有确认按钮（修复"提交中..."永久残留bug）
    var aConfirmBtns = container.querySelectorAll('.coop-confirm-btn');
    aConfirmBtns.forEach(function(btn) {
        btn.textContent = '✅ 已提交，等同伴答题';
        btn.disabled = true;
        btn.style.background = '#58cc02';
        btn.style.boxShadow = '0 4px 0 #46a302';
        btn.style.pointerEvents = 'none';
        btn.style.color = '#fff';
    });

    var fn = renderers[q.type];
    if (fn) {
        fn(q, container, state);
    }

    // B010 修复：A 完成后 B 区可能出现在 iPhone 6 Plus（736px）视口下方被截断，
    // 学生以为卡死。渲染 B 后自动滚到 B 区顶部。
    // iOS 12 Safari 支持 scrollIntoView，但会忽略 {behavior:'smooth'}（瞬间跳转），可接受。
    setTimeout(function() {
        var zoneB = document.getElementById('coop-zone-b') || document.querySelector('.coop-zone-B');
        if (zoneB && zoneB.scrollIntoView) {
            try {
                zoneB.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } catch (e) {
                zoneB.scrollIntoView(true);
            }
        }
    }, 100);
}

// 无操作占位渲染器（轮流式题型：A/B同步完成，无需单独渲染B区）
function renderStepB_NoOp(q, container, state) {}

// ===== 通用 UI 组件 =====

// 获取学生短名（去掉"1. "前缀，只取名字）
function getPlayerShortName(index) {
    var p = window.players && window.players[index];
    if (!p || !p.name) return (index === 0 ? 'A同学' : 'B同学');
    return p.name.replace(/^\d+\.\s*/, '');
}

function createStepZone(role, instruction, isActive) {
    var zone = document.createElement('div');
    zone.className = 'coop-zone coop-zone-' + role + (isActive ? ' active' : ' waiting');
    // 用真实姓名，体现个人化；颜色区分角色
    // 根据当前题目的轮换结果，决定A区域/B区域显示哪位玩家
    var roleA = (typeof window.currentCoopRoleA === 'number') ? window.currentCoopRoleA : 0;
    var roleB = 1 - roleA;
    var index = role === 'A' ? roleA : roleB;
    var color = role === 'A' ? '#1cb0f6' : '#F5A623';
    var name = getPlayerShortName(index);
    // B区域：把指令里的"A"占位替换为A玩家的真实姓名
    if (role === 'B') {
        var roleAName = getPlayerShortName(roleA);
        instruction = instruction
            .replace(/根据A的/g, '根据' + roleAName + '的')
            .replace(/A选/g, roleAName + '选')
            .replace(/A说/g, roleAName + '说')
            .replace(/A听/g, roleAName + '听')
            .replace(/A判断/g, roleAName + '判断')
            .replace(/A同学/g, roleAName)
            .replace(/A已选择/g, roleAName + '已选择');
    }
    var label = '<span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:' + color + ';color:#fff;font-size:12px;font-weight:bold;text-align:center;line-height:22px;margin-right:4px;">' + role + '</span>' + name;
    zone.innerHTML = '<div class="coop-zone-header">' +
        '<span class="coop-zone-label">' + label + '</span>' +
        '<span class="coop-zone-instruction">' + instruction + '</span>' +
        '</div>';
    if (!isActive) {
        var waitEl = document.createElement('div');
        waitEl.className = 'coop-zone-wait';
        waitEl.textContent = '⏳ 等待' + getPlayerShortName(roleA) + '完成...';
        zone.appendChild(waitEl);
    }
    return zone;
}

// Fisher-Yates 洗牌（iOS 12 兼容，不修改原数组）
function shuffleArray(arr) {
    var a = arr.slice(); // copy
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
}
window.shuffleArray = shuffleArray; // 暴露给 adventure.js 使用

function createOptionGrid(options, onSelect, opts) {
    opts = opts || {};
    var confirmMode = !!opts.confirmMode;
    var confirmText = opts.confirmText || '✅ 我们选好啦';

    // 每次渲染前随机打乱选项顺序，防止学生记住位置
    var shuffledOptions = shuffleArray(options);

    // confirmMode=true 时，返回一个包装容器（grid + 确认按钮）
    // 否则返回 grid 本身（兼容现状）
    var grid = document.createElement('div');
    grid.className = 'coop-options-grid';
    var pendingTimer = null; // 旧模式：允许在500ms内重新选择
    var locked = false;
    var selectedVal = null;
    var selectedCard = null;

    // 确认按钮（仅 confirmMode 启用）
    var confirmBtn = null;
    if (confirmMode) {
        confirmBtn = document.createElement('button');
        confirmBtn.className = 'coop-confirm-btn';
        confirmBtn.type = 'button';
        confirmBtn.textContent = '👆 点击上方选答案';
        confirmBtn.disabled = true;
        confirmBtn.onclick = function() {
            if (locked) return;
            if (selectedVal === null || !selectedCard) return;
            locked = true;
            // 视觉反馈：深绿 + "提交中..."，200ms后提交
            confirmBtn.textContent = '提交中...';
            confirmBtn.style.background = '#3a8a01';
            confirmBtn.style.boxShadow = '0 1px 0 #2d6e01';
            confirmBtn.style.pointerEvents = 'none';
            setTimeout(function() {
                lockOptions(grid);
                onSelect(selectedVal, selectedCard);
            }, 200);
        };
    }

    shuffledOptions.forEach(function(opt) {
        var card = document.createElement('div');
        card.className = 'coop-option-card';
        if (typeof opt === 'object' && opt !== null) {
            card.innerHTML = opt.html || opt.text || opt.label || String(opt.value);
        } else {
            card.textContent = opt;
        }
        card.onclick = function() {
            if (locked) return;
            var val = (typeof opt === 'object' && opt !== null) ? opt.value : opt;

            if (confirmMode) {
                // 显式确认模式：只做 pre-select，不自动提交
                grid.querySelectorAll('.coop-option-card').forEach(function(c) {
                    c.classList.remove('selected-a', 'selected-b', 'pre-selected');
                });
                card.classList.add('pre-selected');
                selectedVal = val;
                selectedCard = card;
                if (confirmBtn) {
                    confirmBtn.disabled = false;
                    confirmBtn.classList.add('ready');
                    confirmBtn.textContent = '✅ 我选好啦';
                }
                return;
            }

            // 旧模式：500ms 自动提交
            if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }
            grid.querySelectorAll('.coop-option-card').forEach(function(c) {
                c.classList.remove('selected-a', 'selected-b', 'pre-selected');
            });
            card.classList.add('pre-selected');
            pendingTimer = setTimeout(function() {
                if (locked) return;
                locked = true;
                lockOptions(grid);
                onSelect(val, card);
            }, 500);
        };
        grid.appendChild(card);
    });

    if (confirmMode) {
        var wrap = document.createElement('div');
        wrap.className = 'coop-options-grid-wrap';
        wrap.appendChild(grid);
        wrap.appendChild(confirmBtn);
        return wrap;
    }
    return grid;
}

// 只高亮选中，不立即锁死——让学生在 onStepAComplete 触发前（约500ms）还能改选
function markSelected(card, role) {
    var parent = card.parentElement;
    // 取消上一个选中状态
    var cls = 'selected-' + role.toLowerCase();
    parent.querySelectorAll('.' + cls).forEach(function(c) { c.classList.remove(cls); });
    card.classList.add(cls);
    // 不在这里禁用兄弟卡片；由 lockOptions 在 onStepAComplete 前统一锁定
}

// 锁定一组选项，防止 B 步骤开始后 A 还能乱点
function lockOptions(parent) {
    parent.querySelectorAll('.coop-option-card').forEach(function(c) {
        c.style.pointerEvents = 'none';
    });
}

function showAResult(container, html) {
    var resultEl = document.createElement('div');
    resultEl.className = 'coop-a-result';
    resultEl.innerHTML = '✅ A已选择：' + html;
    container.appendChild(resultEl);
}

// ===== 听力：听音接力 =====
function renderCoopListenRelay(q, container) {
    // 播放按钮
    var playBtn = document.createElement('button');
    playBtn.className = 'play-sound-btn animate-pop';
    playBtn.innerHTML = '🔊';
    playBtn.onclick = function() { if (typeof speakWord === 'function') speakWord(q.audio); };
    container.appendChild(playBtn);
    setTimeout(function() { if (typeof speakWord === 'function') speakWord(q.audio); }, 300);

    // A区域（listen_relay 使用显式确认按钮模式，给三年级学生充分思考时间）
    var zoneA = createStepZone('A', q.stepA.instruction, true);
    var gridA = createOptionGrid(q.stepA.options, function(val, card) {
        markSelected(card, 'A'); onStepAComplete(val);
    }, { confirmMode: true, confirmText: '✅ 我选好啦' });
    zoneA.appendChild(gridA);
    container.appendChild(zoneA);

    // B区域（等待中）
    var zoneB = createStepZone('B', q.stepB.instruction, false);
    zoneB.id = 'coop-zone-b';
    container.appendChild(zoneB);
}

function renderStepB_ListenRelay(q, container, state) {
    var zoneB = document.getElementById('coop-zone-b');
    if (!zoneB) return;

    // 激活B区域
    zoneB.className = 'coop-zone coop-zone-B active';
    zoneB.style.pointerEvents = 'auto'; // B009 iOS 12 兜底：WebKit 不自动还原 pointer-events，必须内联显式恢复
    var waitEl = zoneB.querySelector('.coop-zone-wait');
    if (waitEl) waitEl.remove();

    // 显示A选了什么（只显示英文单词，不显示图片，迫使B真正认识英文）
    var aVal = state.aResult;
    var displayWord = '<span style="font-size:1.8em;font-weight:bold;color:#2196F3;letter-spacing:2px;">' + aVal + '</span>';
    showAResult(zoneB, displayWord);

    // B的选项
    var bConfig = q.stepB.optionsMap[aVal];
    if (!bConfig) { onStepBComplete(null); return; }

    var gridB = createOptionGrid(bConfig.options, function(val, card) {
        markSelected(card, 'B');
        onStepBComplete(val);
    }, { confirmMode: true, confirmText: '✅ 我选好啦' });
    zoneB.appendChild(gridB);
}

// ===== 听力：听音判断 =====
function renderCoopListenJudge(q, container) {
    var playBtn = document.createElement('button');
    playBtn.className = 'play-sound-btn animate-pop';
    playBtn.innerHTML = '🔊';
    playBtn.onclick = function() { if (typeof speakWord === 'function') speakWord(q.audio); };
    container.appendChild(playBtn);
    setTimeout(function() { if (typeof speakWord === 'function') speakWord(q.audio); }, 300);

    // 显示图片
    var imgEl = document.createElement('div');
    imgEl.className = 'coop-img-wrap';
    imgEl.innerHTML = q.image;
    container.appendChild(imgEl);

    // A区域：对/错按钮（B019 推广：显式"我选好啦"确认，和 createOptionGrid confirmMode 风格一致）
    var zoneA = createStepZone('A', q.stepA.instruction, true);
    var btnGrid = document.createElement('div');
    btnGrid.className = 'coop-tf-grid';

    var tfLocked = false;
    var tfSelected = null; // 'yes' | 'no'

    function tfPreSelect(btn, which) {
        if (tfLocked) return;
        // 清除上一次 pre-selected
        btnGrid.querySelectorAll('.coop-option-card').forEach(function(c) {
            c.classList.remove('selected-a', 'pre-selected');
        });
        btn.classList.add('pre-selected');
        tfSelected = which;
        if (tfConfirmBtn) {
            tfConfirmBtn.disabled = false;
            tfConfirmBtn.classList.add('ready');
            tfConfirmBtn.textContent = '✅ 我选好啦';
        }
    }

    var yesBtn = document.createElement('div');
    yesBtn.className = 'coop-option-card coop-tf-btn';
    yesBtn.textContent = '✅ 对';
    yesBtn.onclick = function() { tfPreSelect(yesBtn, 'yes'); };

    var noBtn = document.createElement('div');
    noBtn.className = 'coop-option-card coop-tf-btn';
    noBtn.textContent = '❌ 错';
    noBtn.onclick = function() { tfPreSelect(noBtn, 'no'); };

    btnGrid.appendChild(yesBtn);
    btnGrid.appendChild(noBtn);
    zoneA.appendChild(btnGrid);

    // 确认按钮
    var tfConfirmBtn = document.createElement('button');
    tfConfirmBtn.className = 'coop-confirm-btn';
    tfConfirmBtn.type = 'button';
    tfConfirmBtn.textContent = '👆 点击上方选答案';
    tfConfirmBtn.disabled = true;
    tfConfirmBtn.onclick = function() {
        if (tfLocked || tfSelected === null) return;
        tfLocked = true;
        // 视觉反馈：深绿 + "提交中..."
        tfConfirmBtn.textContent = '提交中...';
        tfConfirmBtn.style.background = '#3a8a01';
        tfConfirmBtn.style.boxShadow = '0 1px 0 #2d6e01';
        tfConfirmBtn.disabled = true;
        setTimeout(function() {
            tfConfirmBtn.style.background = '';
            tfConfirmBtn.style.boxShadow = '';
            // 将 pre-selected 升级为 selected-a
            var chosenBtn = tfSelected === 'yes' ? yesBtn : noBtn;
            markSelected(chosenBtn, 'A');
            lockOptions(btnGrid);
            if (tfSelected === 'yes') {
                if (q.isMatch) {
                    onStepAComplete('correct_match');
                    setTimeout(function() { onStepBComplete('auto_pass'); }, 300);
                } else {
                    onStepAComplete('wrong_yes');
                }
            } else {
                if (!q.isMatch) {
                    onStepAComplete('correct_no');
                } else {
                    onStepAComplete('wrong_no');
                }
            }
        }, 200);
    };
    zoneA.appendChild(tfConfirmBtn);
    container.appendChild(zoneA);

    // B区域：instruction留空，防止剧透A（等A答完后由renderStepB_ListenJudge填入）
    var zoneB = createStepZone('B', '', false);
    zoneB.id = 'coop-zone-b';
    container.appendChild(zoneB);
}

function renderStepB_ListenJudge(q, container, state) {
    var zoneB = document.getElementById('coop-zone-b');
    if (!zoneB) return;

    var aVal = state.aResult;

    // 如果A+自动通过，不需要B
    if (aVal === 'correct_match') return;

    // 激活B
    zoneB.className = 'coop-zone coop-zone-B active';
    zoneB.style.pointerEvents = 'auto'; // B009 iOS 12 兜底
    var waitEl = zoneB.querySelector('.coop-zone-wait');
    if (waitEl) waitEl.remove();

    // 更新B的指令
    var headerEl = zoneB.querySelector('.coop-zone-instruction');
    if (aVal === 'correct_no' || aVal === 'wrong_no') {
        if (headerEl) headerEl.textContent = '图片和音频不配！选正确的图片';
    } else {
        if (headerEl) headerEl.textContent = 'A判断有误，选正确答案';
    }

    var gridB = createOptionGrid(q.stepB.options, function(val, card) {
        markSelected(card, 'B');
        onStepBComplete(val);
    }, { confirmMode: true, confirmText: '✅ 我选好啦' });
    zoneB.appendChild(gridB);
}

// ===== 听力：听音排序（轮流操作）=====
function renderCoopListenSort(q, container) {
    // 播放序列（完整）
    function playSequence() {
        var delay = 0;
        q.sequence.forEach(function(word) {
            setTimeout(function() { if (typeof speakWord === 'function') speakWord(word); }, delay);
            delay += 1200;
        });
    }

    // 分词播放，带高亮（用于错2次/错4次支架）
    function playSequenceWithHighlight() {
        var delay = 0;
        q.sequence.forEach(function(word) {
            setTimeout(function() {
                if (typeof speakWord === 'function') speakWord(word);
                // 高亮对应词卡边框1秒
                var allCards = cardsDiv.querySelectorAll('.coop-option-card');
                allCards.forEach(function(c) {
                    if (c.dataset.value === word) {
                        c.style.outline = '3px solid #1976D2';
                        setTimeout(function() { c.style.outline = ''; }, 1000);
                    }
                });
            }, delay);
            delay += 1200;
        });
    }

    // 重新启用所有未选中词卡
    function resetCards() {
        var allCards = cardsDiv.querySelectorAll('.coop-option-card');
        allCards.forEach(function(c) {
            c.classList.remove('picked');
            c.style.opacity = '';
            c.style.pointerEvents = '';
            c.style.background = '';
        });
        sortArea.innerHTML = '';
        currentClickIndex = 0;
        sortCompleted = false;
    }

    // 显示支架提示框（清除旧的，显示新的）
    function showScaffoldHint(html, bgColor, borderColor) {
        var old = container.querySelector('.scaffold-hint');
        if (old) old.remove();
        var hint = document.createElement('div');
        hint.className = 'scaffold-hint';
        hint.style.cssText = 'background:' + bgColor + ';border:2px solid ' + borderColor + ';border-radius:12px;padding:12px;margin-bottom:12px;font-size:15px;';
        hint.innerHTML = html;
        container.insertBefore(hint, cardsDiv);
    }

    // 四级支架触发
    function triggerScaffold(count) {
        if (count === 1) {
            // 错1次：同伴讨论提示（黄色）
            showScaffoldHint('💬 先和同学讨论一下，再试试！', '#FFF9C4', '#F9A825');
        } else if (count === 2) {
            // 错2次：分词播放+高亮（蓝色）
            showScaffoldHint('🔊 再听一遍，注意每个词', '#E3F2FD', '#1976D2');
            setTimeout(playSequenceWithHighlight, 300);
        } else if (count === 3) {
            // 错3次：首字母提示（橙色）
            var firstWord = q.sequence[0] || '';
            var hint = firstWord.length > 0
                ? firstWord[0] + firstWord.slice(1).replace(/./g, '_')
                : '';
            showScaffoldHint('📝 第一个词：<strong style="font-size:18px;letter-spacing:2px;">' + hint + '</strong>', '#FFF3E0', '#F57C00');
        } else if (count >= 4) {
            // 错4次：词卡下方显示文字 + 分词播放（绿色）
            showScaffoldHint('✅ 看图片和单词，把它们排好顺序吧！', '#E8F5E9', '#388E3C');
            var allCards = cardsDiv.querySelectorAll('.coop-option-card');
            allCards.forEach(function(c) {
                if (!c.querySelector('.scaffold-word-label')) {
                    var label = document.createElement('div');
                    label.className = 'scaffold-word-label';
                    label.style.cssText = 'font-size:13px;font-weight:bold;color:#2E7D32;margin-top:4px;text-align:center;';
                    label.textContent = c.dataset.value;
                    c.appendChild(label);
                }
            });
            setTimeout(playSequenceWithHighlight, 300);
        }
    }

    var playBtn = document.createElement('button');
    playBtn.className = 'play-sound-btn animate-pop';
    playBtn.innerHTML = '🔊 听音频';
    playBtn.style.cssText += 'font-size:14px;padding:8px 16px;width:auto;height:auto;border-radius:24px;';
    playBtn.onclick = playSequence;
    container.appendChild(playBtn);
    setTimeout(playSequence, 500);

    var roleA = window.currentCoopRoleA !== undefined ? window.currentCoopRoleA : 0;
    var roleB = 1 - roleA;
    var nameA = getPlayerShortName(roleA);
    var nameB = getPlayerShortName(roleB);

    // 已选区域
    var sortArea = document.createElement('div');
    sortArea.className = 'coop-sort-area';
    container.appendChild(sortArea);

    // 打乱选项
    var items = q.words.slice();
    for (var si = items.length - 1; si > 0; si--) {
        var sj = Math.floor(Math.random() * (si + 1));
        var tmp = items[si]; items[si] = items[sj]; items[sj] = tmp;
    }

    var currentClickIndex = 0; // 当前需要点第几个（在 sequence 里的索引）
    var totalItems = q.sequence.length;
    var errorCount = 0; // 支架计数器（累计错误次数）
    var sortCompleted = false; // 防止重复触发完成

    // 轮次指示器
    var turnIndicator = document.createElement('div');
    turnIndicator.style.cssText = 'text-align:center;padding:8px 14px;border-radius:10px;font-size:15px;font-weight:bold;margin-bottom:10px;';
    function updateTurnIndicator() {
        var isRoleATurn = currentClickIndex % 2 === 0;
        var currentName = isRoleATurn ? nameA : nameB;
        turnIndicator.style.background = isRoleATurn ? '#e8f4fd' : '#fff8e8';
        turnIndicator.style.border = '2px solid ' + (isRoleATurn ? '#1cb0f6' : '#f5a623');
        turnIndicator.style.color = isRoleATurn ? '#1cb0f6' : '#f5a623';
        var displayIndex = Math.min(currentClickIndex + 1, totalItems);
        turnIndicator.textContent = (isRoleATurn ? '🔵 ' : '🟠 ') + currentName + ' 点击第 ' + displayIndex + ' 个词！';
    }
    updateTurnIndicator();
    container.appendChild(turnIndicator);

    var cardsDiv = document.createElement('div');
    cardsDiv.className = 'coop-options-grid';

    // ===== 锦囊支架系统（初始化，答错后显示）=====
    var listenJinNangZone = document.createElement('div');
    listenJinNangZone.className = 'jinnang-zone';
    listenJinNangZone.style.cssText = 'display:none;border:2px dashed #FFC800;border-radius:14px;padding:12px;margin-top:14px;background:#FFFDE7;';

    var listenJinNangTitleEl = document.createElement('div');
    listenJinNangTitleEl.style.cssText = 'text-align:center;font-size:14px;color:#888;margin-bottom:10px;font-weight:bold;';
    listenJinNangTitleEl.textContent = '遇到困难？用锦囊！';
    listenJinNangZone.appendChild(listenJinNangTitleEl);

    var listenJinNangBtns = document.createElement('div');
    listenJinNangBtns.style.cssText = 'display:flex;justify-content:center;gap:12px;flex-wrap:wrap;';
    listenJinNangZone.appendChild(listenJinNangBtns);

    var listenJinNangContent = document.createElement('div');
    listenJinNangContent.style.cssText = 'margin-top:10px;font-size:15px;color:#333;';
    listenJinNangZone.appendChild(listenJinNangContent);

    var listenJinNangOpened = 0;

    var listenJinNangDefs = [
        {
            label: '🎁 锦囊一',
            getContent: function() {
                var ch = q.chinese || '（暂无中文翻译）';
                return '📖 句子意思：<strong>' + ch + '</strong>';
            }
        },
        {
            label: '🎁 锦囊二',
            getContent: function() {
                var firstWord = (q.sequence && q.sequence[0]) ? q.sequence[0] : '';
                return '<span style="color:#1976D2;">🔑 第一个词是：<strong style="font-size:18px;">' + firstWord + '</strong></span>';
            }
        },
        {
            label: '🎁 锦囊三',
            getContent: function() {
                if (!q.sequence) return '';
                var parts = q.sequence.map(function(w, ni) {
                    return '<span style="display:inline-block;background:#1976D2;color:#fff;border-radius:6px;padding:2px 8px;margin:2px;font-size:15px;"><sup style="font-size:10px;">' + (ni + 1) + '</sup> ' + w + '</span>';
                });
                return '✅ 完整顺序：' + parts.join(' ');
            }
        }
    ];

    listenJinNangDefs.forEach(function(def, idx) {
        var jBtn = document.createElement('button');
        jBtn.textContent = def.label;
        jBtn.style.cssText = 'width:80px;height:80px;border-radius:50%;background:#FFC800;color:#fff;font-size:13px;font-weight:bold;border:none;cursor:pointer;opacity:0.4;pointer-events:none;transition:all 0.2s;line-height:1.3;';
        jBtn.dataset.jidx = idx;
        listenJinNangBtns.appendChild(jBtn);

        jBtn.onclick = function() {
            if (listenJinNangOpened > idx) return;
            if (idx > 0 && listenJinNangOpened < idx) return;
            listenJinNangOpened = idx + 1;
            jBtn.style.background = '#58CC02';
            jBtn.style.opacity = '1';
            var nextJBtn = listenJinNangBtns.querySelector('[data-jidx="' + (idx + 1) + '"]');
            if (nextJBtn) { nextJBtn.style.opacity = '1'; nextJBtn.style.pointerEvents = ''; }
            listenJinNangContent.innerHTML = def.getContent();
        };
    });

    function showListenJinNang() {
        if (listenJinNangZone.style.display !== 'none') return;
        listenJinNangZone.style.display = 'block';
        var firstJBtn = listenJinNangBtns.querySelector('[data-jidx="0"]');
        if (firstJBtn) { firstJBtn.style.opacity = '1'; firstJBtn.style.pointerEvents = ''; }
    }

    items.forEach(function(item) {
        var card = document.createElement('div');
        card.className = 'coop-option-card';
        card.innerHTML = item.html || item.value || item;
        card.dataset.value = item.value || item;

        card.onclick = function() {
            if (sortCompleted) return;
            if (card.classList.contains('picked')) return;

            var val = card.dataset.value;
            var expectedVal = q.sequence[currentClickIndex];

            // 点的不是当前应选的词（干扰项或顺序错误）
            if (val !== expectedVal) {
                card.style.background = '#ffcccc';
                setTimeout(function() { card.style.background = ''; }, 600);
                // 每次点错算一次错误机会，重置排序，触发对应支架
                errorCount++;
                resetCards();
                triggerScaffold(errorCount);
                showListenJinNang();
                return;
            }

            // 点对了
            card.classList.add('picked');
            card.style.opacity = '0.3';
            card.style.pointerEvents = 'none';

            // 添加到排序区（可点击撤回）
            var badge = document.createElement('div');
            badge.className = 'coop-sort-badge';
            badge.textContent = currentClickIndex + 1;
            badge.style.cursor = 'pointer';
            badge.title = '点击撤回';
            // 把对应词卡引用存在 badge 上，方便撤回
            badge._sourceCard = card;
            badge.onclick = (function(thisBadge) {
                return function() {
                    if (sortCompleted) return;
                    // 找到此 badge 在 sortArea 中的位置，删除它及之后所有 badge
                    var allBadges = Array.prototype.slice.call(sortArea.querySelectorAll('.coop-sort-badge'));
                    var idx = allBadges.indexOf(thisBadge);
                    if (idx === -1) return;
                    for (var bi = allBadges.length - 1; bi >= idx; bi--) {
                        var b = allBadges[bi];
                        // 恢复对应词卡
                        if (b._sourceCard) {
                            b._sourceCard.classList.remove('picked');
                            b._sourceCard.style.opacity = '';
                            b._sourceCard.style.pointerEvents = '';
                            b._sourceCard.style.background = '';
                        }
                        b.parentNode.removeChild(b);
                    }
                    currentClickIndex = idx;
                    updateTurnIndicator();
                };
            })(badge);
            sortArea.appendChild(badge);

            currentClickIndex++;
            updateTurnIndicator();

            // 全部选完（必须点满 sequence.length 次，而不是 words.length 次）
            if (currentClickIndex === totalItems) {
                // 立即锁定所有词卡，防止完成后误触
                sortCompleted = true;
                var allCards = cardsDiv.querySelectorAll('.coop-option-card');
                allCards.forEach(function(c) {
                    c.style.pointerEvents = 'none';
                });
                // 按顺序全点对，直接正确
                onStepAComplete('sort_correct');
                // 非口语题型：排序完成后直接完成B步骤（不再要求录音）
                onStepBComplete('sort_correct');
            }
        };
        cardsDiv.appendChild(card);
    });
    container.appendChild(cardsDiv);
    container.appendChild(listenJinNangZone);
}

// ===== 通用情境题（听力/阅读/写作共用）=====
function renderCoopScenario(q, container) {
    // 情境描述
    var scenarioEl = document.createElement('div');
    scenarioEl.className = 'coop-scenario-box';
    scenarioEl.textContent = q.scenario;
    container.appendChild(scenarioEl);

    // 如果有音频
    if (q.audio && typeof speakWord === 'function') {
        var playBtn = document.createElement('button');
        playBtn.className = 'play-sound-btn animate-pop';
        playBtn.innerHTML = '🔊';
        playBtn.onclick = function() { speakWord(q.audio); };
        container.appendChild(playBtn);
        setTimeout(function() { speakWord(q.audio); }, 300);
    }

    // 如果有文本（阅读）
    if (q.stepA && q.stepA.text) {
        var textEl = document.createElement('div');
        textEl.className = 'coop-read-text';
        textEl.textContent = q.stepA.text;
        container.appendChild(textEl);
    }

    // A区域
    var zoneA = createStepZone('A', q.stepA.instruction, true);
    if (q.stepA.question) {
        var qEl = document.createElement('div');
        qEl.style.cssText = 'font-size:15px;color:#333;margin:8px 0;font-weight:bold;';
        qEl.textContent = q.stepA.question;
        zoneA.appendChild(qEl);
    }

    var aOptions = q.stepA.options;
    // 如果选项是对象数组
    var gridA = createOptionGrid(aOptions, function(val, card) {
        markSelected(card, 'A'); onStepAComplete(val);
    }, { confirmMode: true, confirmText: '✅ 我选好啦' });
    zoneA.appendChild(gridA);
    container.appendChild(zoneA);

    // B区域
    var zoneB = createStepZone('B', q.stepB.instruction, false);
    zoneB.id = 'coop-zone-b';
    container.appendChild(zoneB);
}

function renderStepB_Scenario(q, container, state) {
    var zoneB = document.getElementById('coop-zone-b');
    if (!zoneB) return;

    zoneB.className = 'coop-zone coop-zone-B active';
    zoneB.style.pointerEvents = 'auto'; // 兜底：确保 iOS 12 WebKit 解除 waiting 时的 pointer-events:none
    var waitEl = zoneB.querySelector('.coop-zone-wait');
    if (waitEl) waitEl.remove();

    // 在B区顶部突出显示约束条件（Problem-based核心：在限制下做决策）
    if (q.scenario) {
        var conditionEl = document.createElement('div');
        conditionEl.style.cssText = 'background:#fff8e1;border-left:4px solid #F5A623;border-radius:8px;padding:8px 12px;margin-bottom:8px;font-size:14px;color:#795548;font-weight:bold;';
        conditionEl.innerHTML = '🎯 条件：' + q.scenario;
        zoneB.appendChild(conditionEl);
    }

    var aVal = state.aResult;
    showAResult(zoneB, String(aVal));

    if (q.stepB.question) {
        var qEl = document.createElement('div');
        qEl.style.cssText = 'font-size:15px;color:#333;margin:8px 0;font-weight:bold;';
        qEl.textContent = q.stepB.question;
        zoneB.appendChild(qEl);
    }

    var bConfig = q.stepB.optionsMap ? q.stepB.optionsMap[aVal] : null;
    if (!bConfig) {
        // optionsMap 无对应键时，B区显示提示后自动判为答错，触发重做
        var noOptEl = document.createElement('div');
        noOptEl.style.cssText = 'text-align:center;padding:16px;color:#bbb;font-size:14px;';
        noOptEl.textContent = '（等待跳转...）';
        zoneB.appendChild(noOptEl);
        onStepBComplete(null);
        return;
    }

    var gridB = createOptionGrid(bConfig.options, function(val, card) {
        markSelected(card, 'B');
        // 非口语题型：选完答案直接完成B步骤（不再要求录音）
        onStepBComplete(val);
    }, { confirmMode: true, confirmText: '✅ 我选好啦' });
    zoneB.appendChild(gridB);
}

// ===== 阅读：词义接力 =====
function renderCoopWordRelay(q, container) {
    // 显示图片
    var imgEl = document.createElement('div');
    imgEl.className = 'coop-img-wrap';
    imgEl.innerHTML = q.image;
    container.appendChild(imgEl);

    // A区域
    var zoneA = createStepZone('A', q.stepA.instruction, true);
    var gridA = createOptionGrid(q.stepA.options, function(val, card) {
        markSelected(card, 'A'); onStepAComplete(val);
    }, { confirmMode: true, confirmText: '✅ 我选好啦' });
    zoneA.appendChild(gridA);
    container.appendChild(zoneA);

    // B区域
    var zoneB = createStepZone('B', q.stepB.instruction, false);
    zoneB.id = 'coop-zone-b';
    container.appendChild(zoneB);
}

function renderStepB_WordRelay(q, container, state) {
    var zoneB = document.getElementById('coop-zone-b');
    if (!zoneB) return;

    zoneB.className = 'coop-zone coop-zone-B active';
    zoneB.style.pointerEvents = 'auto'; // B009 iOS 12 兜底
    var waitEl = zoneB.querySelector('.coop-zone-wait');
    if (waitEl) waitEl.remove();

    showAResult(zoneB, state.aResult);

    var bConfig = q.stepB.optionsMap[state.aResult];
    if (!bConfig) { onStepBComplete(null); return; }

    var gridB = createOptionGrid(bConfig.options, function(val, card) {
        markSelected(card, 'B');
        // 非口语题型：选完答案直接完成B步骤（不再要求录音）
        onStepBComplete(val);
    }, { confirmMode: true, confirmText: '✅ 我选好啦' });
    zoneB.appendChild(gridB);
}

// ===== 阅读：翻牌配对 =====
function renderCoopFlipMatch(q, container) {
    var roleA = window.currentCoopRoleA !== undefined ? window.currentCoopRoleA : 0;
    var roleB = 1 - roleA;
    var nameA = getPlayerShortName(roleA);
    var nameB = getPlayerShortName(roleB);

    // 轮次指示器
    var turnIndicator = document.createElement('div');
    turnIndicator.style.cssText = 'text-align:center;padding:8px 14px;border-radius:10px;font-size:15px;font-weight:bold;margin-bottom:10px;';
    var currentTurnA = true;
    function updateFlipTurnIndicator() {
        var currentName = currentTurnA ? nameA : nameB;
        turnIndicator.style.background = currentTurnA ? '#e8f4fd' : '#fff8e8';
        turnIndicator.style.border = '2px solid ' + (currentTurnA ? '#1cb0f6' : '#f5a623');
        turnIndicator.style.color = currentTurnA ? '#1cb0f6' : '#f5a623';
        turnIndicator.textContent = (currentTurnA ? '🔵 ' : '🟠 ') + currentName + ' 翻一张牌！';
    }
    updateFlipTurnIndicator();
    container.appendChild(turnIndicator);

    var instr = document.createElement('div');
    instr.style.cssText = 'text-align:center;margin:6px 0 10px;font-size:13px;color:#999;';
    instr.textContent = '轮流翻牌，找到配对！';
    container.appendChild(instr);

    // 创建所有卡片（单词+图片混合）
    var cards = [];
    q.pairs.forEach(function(pair) {
        cards.push({ type: 'word', content: pair.word, pairId: pair.word });
        cards.push({ type: 'image', content: pair.match, pairId: pair.word });
    });
    // 打乱
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = cards[i]; cards[i] = cards[j]; cards[j] = tmp;
    }

    var flipped = [];
    var matched = 0;
    var totalPairs = q.pairs.length;

    var grid = document.createElement('div');
    grid.className = 'coop-flip-grid';

    cards.forEach(function(c, idx) {
        var card = document.createElement('div');
        card.className = 'coop-flip-card';
        card.dataset.pairId = c.pairId;
        card.dataset.idx = idx;
        card.innerHTML = '<div class="flip-inner"><div class="flip-back">?</div><div class="flip-front"></div></div>';

        card.onclick = function() {
            if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
            if (flipped.length >= 2) return;

            card.classList.add('flipped');
            card.classList.add(currentTurnA ? 'flipped-a' : 'flipped-b');
            card.querySelector('.flip-front').innerHTML = c.content;

            flipped.push(card);

            if (flipped.length === 2) {
                var c1 = flipped[0];
                var c2 = flipped[1];
                if (c1.dataset.pairId === c2.dataset.pairId) {
                    // 配对成功，切换轮次
                    c1.classList.add('matched');
                    c2.classList.add('matched');
                    matched++;
                    flipped = [];

                    // P2-2 非阻塞开口提示：每次配对成功显示短提示条
                    var matchedWord = c1.dataset.pairId;
                    var skippedPairs = skippedPairs || [];
                    skippedPairs.push({ word: matchedWord, soeSkipped: true });
                    var speakHint = document.createElement('div');
                    speakHint.style.cssText = 'margin-top:8px;padding:8px 12px;background:#e8f5e9;border-radius:8px;' +
                        'font-size:15px;color:#2e7d32;text-align:center;border-left:3px solid #4caf50;';
                    speakHint.textContent = '🎤 大声说：' + matchedWord;
                    container.appendChild(speakHint);
                    setTimeout(function() {
                        if (speakHint.parentNode) speakHint.parentNode.removeChild(speakHint);
                    }, 2000);

                    currentTurnA = !currentTurnA;
                    updateFlipTurnIndicator();
                    if (matched === totalPairs) {
                        onStepAComplete('match_done');
                        // 非口语题型：配对完成后直接完成B步骤（不再要求录音）
                        onStepBComplete('match_done');
                    }
                } else {
                    // 配对失败，翻回，切换轮次
                    setTimeout(function() {
                        c1.classList.remove('flipped', 'flipped-a', 'flipped-b');
                        c1.querySelector('.flip-front').innerHTML = '';
                        c2.classList.remove('flipped', 'flipped-a', 'flipped-b');
                        c2.querySelector('.flip-front').innerHTML = '';
                        flipped = [];
                        currentTurnA = !currentTurnA;
                        updateFlipTurnIndicator();
                    }, 1000);
                }
            }
        };
        grid.appendChild(card);
    });
    container.appendChild(grid);
}

// ===== 阅读：句子排序（复用听音排序的轮流逻辑）=====
function renderCoopSentenceSort(q, container) {
    var roleA = window.currentCoopRoleA !== undefined ? window.currentCoopRoleA : 0;
    var roleB = 1 - roleA;
    var nameA = getPlayerShortName(roleA);
    var nameB = getPlayerShortName(roleB);

    var turnIndicator = document.createElement('div');
    turnIndicator.style.cssText = 'text-align:center;padding:10px 14px;border-radius:12px;font-size:16px;font-weight:bold;margin-bottom:10px;';
    container.appendChild(turnIndicator);

    if (q.chinese) {
        var chEl = document.createElement('div');
        chEl.style.cssText = 'text-align:center;font-size:13px;color:#aaa;margin-bottom:8px;';
        chEl.textContent = q.chinese;
        container.appendChild(chEl);
    }

    var sortArea = document.createElement('div');
    sortArea.className = 'coop-sort-area sentence-sort';
    container.appendChild(sortArea);

    // 打乱词
    var shuffled = q.words.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
    }

    var currentAns = [];
    var turnA = true;
    var sentCompleted = false;

    function updateSentTurnIndicator() {
        turnIndicator.style.background = turnA ? '#e8f4fd' : '#fff8e8';
        turnIndicator.style.border = '2px solid ' + (turnA ? '#1cb0f6' : '#f5a623');
        turnIndicator.style.color = turnA ? '#1cb0f6' : '#f5a623';
        turnIndicator.textContent = (turnA ? '🔵 ' : '🟠 ') + (turnA ? nameA : nameB) + ' 放一个词块！';
    }
    updateSentTurnIndicator();

    // ===== 锦囊支架系统 =====
    var sentJinNangZone = document.createElement('div');
    sentJinNangZone.className = 'jinnang-zone';
    sentJinNangZone.style.cssText = 'display:none;border:2px dashed #FFC800;border-radius:14px;padding:12px;margin-top:14px;background:#FFFDE7;';

    var sentJinNangTitleEl = document.createElement('div');
    sentJinNangTitleEl.style.cssText = 'text-align:center;font-size:14px;color:#888;margin-bottom:10px;font-weight:bold;';
    sentJinNangTitleEl.textContent = '遇到困难？用锦囊！';
    sentJinNangZone.appendChild(sentJinNangTitleEl);

    var sentJinNangBtns = document.createElement('div');
    sentJinNangBtns.style.cssText = 'display:flex;justify-content:center;gap:12px;flex-wrap:wrap;';
    sentJinNangZone.appendChild(sentJinNangBtns);

    var sentJinNangContent = document.createElement('div');
    sentJinNangContent.style.cssText = 'margin-top:10px;font-size:15px;color:#333;';
    sentJinNangZone.appendChild(sentJinNangContent);

    var sentJinNangOpened = 0;

    var sentJinNangDefs = [
        {
            label: '🎁 锦囊一',
            getContent: function() {
                var firstWord = q.sentence ? q.sentence.split(' ')[0] : '';
                return '<span style="color:#1976D2;font-size:18px;">👆 第一个词是：<strong>' + firstWord + '</strong></span>';
            }
        },
        {
            label: '🎁 锦囊二',
            getContent: function() {
                var words = q.sentence ? q.sentence.split(' ') : [];
                var twoWords = words.slice(0, 2).join(' ');
                return '<span style="color:#1976D2;font-size:18px;">📝 前两个词是：<strong>' + twoWords + '</strong></span>';
            }
        },
        {
            label: '🎁 锦囊三',
            getContent: function() {
                if (!q.sentence) return '';
                var parts = q.sentence.split(' ').map(function(w, ni) {
                    return '<span style="display:inline-block;background:#1976D2;color:#fff;border-radius:6px;padding:2px 8px;margin:2px;font-size:15px;"><sup style="font-size:10px;">' + (ni + 1) + '</sup> ' + w + '</span>';
                });
                return '✅ 完整顺序：' + parts.join(' ');
            }
        }
    ];

    sentJinNangDefs.forEach(function(def, idx) {
        var jBtn = document.createElement('button');
        jBtn.textContent = def.label;
        jBtn.style.cssText = 'width:80px;height:80px;border-radius:50%;background:#FFC800;color:#fff;font-size:13px;font-weight:bold;border:none;cursor:pointer;opacity:0.4;pointer-events:none;transition:all 0.2s;line-height:1.3;';
        jBtn.dataset.jidx = idx;
        sentJinNangBtns.appendChild(jBtn);

        jBtn.onclick = function() {
            if (sentJinNangOpened > idx) return;
            if (idx > 0 && sentJinNangOpened < idx) return;
            sentJinNangOpened = idx + 1;
            jBtn.style.background = '#58CC02';
            jBtn.style.opacity = '1';
            var nextJBtn = sentJinNangBtns.querySelector('[data-jidx="' + (idx + 1) + '"]');
            if (nextJBtn) { nextJBtn.style.opacity = '1'; nextJBtn.style.pointerEvents = ''; }
            sentJinNangContent.innerHTML = def.getContent();
        };
    });

    function showSentJinNang() {
        if (sentJinNangZone.style.display !== 'none') return;
        sentJinNangZone.style.display = 'block';
        var firstJBtn = sentJinNangBtns.querySelector('[data-jidx="0"]');
        if (firstJBtn) { firstJBtn.style.opacity = '1'; firstJBtn.style.pointerEvents = ''; }
    }

    // 重置答案区（答错后允许重试）
    function resetSentenceSort() {
        var allCards = cardsDiv.querySelectorAll('.coop-option-card');
        allCards.forEach(function(c) {
            c.classList.remove('picked', 'picked-a', 'picked-b');
            c.style.opacity = '';
            c.style.pointerEvents = '';
        });
        sortArea.innerHTML = '';
        currentAns = [];
        turnA = true;
        sentCompleted = false;
        updateSentTurnIndicator();
    }

    var cardsDiv = document.createElement('div');
    cardsDiv.className = 'coop-options-grid sentence-words';

    shuffled.forEach(function(word) {
        var card = document.createElement('div');
        card.className = 'coop-option-card word-card';
        card.textContent = word;
        card.onclick = function() {
            if (sentCompleted) return;
            if (card.classList.contains('picked')) return;
            card.classList.add('picked');
            card.classList.add(turnA ? 'picked-a' : 'picked-b');
            card.style.opacity = '0.3';
            card.style.pointerEvents = 'none';

            currentAns.push(word);

            // 创建可撤回的 badge
            var badge = document.createElement('span');
            badge.className = 'coop-word-badge ' + (turnA ? 'badge-a' : 'badge-b');
            badge.textContent = word + ' ';
            badge.style.cursor = 'pointer';
            badge.title = '点击撤回';
            badge._sourceCard = card;
            badge.onclick = (function(thisBadge, thisWord) {
                return function(e) {
                    e.stopPropagation();
                    if (sentCompleted) return;
                    // 找到此 badge 在 sortArea 中的位置
                    var allBadges = Array.prototype.slice.call(sortArea.querySelectorAll('.coop-word-badge'));
                    var bidx = allBadges.indexOf(thisBadge);
                    if (bidx === -1) return;
                    // 删除该 badge 及之后所有 badge，恢复对应词卡，更新 currentAns
                    for (var bi = allBadges.length - 1; bi >= bidx; bi--) {
                        var b = allBadges[bi];
                        if (b._sourceCard) {
                            b._sourceCard.classList.remove('picked', 'picked-a', 'picked-b');
                            b._sourceCard.style.opacity = '';
                            b._sourceCard.style.pointerEvents = '';
                        }
                        b.parentNode.removeChild(b);
                    }
                    currentAns.splice(bidx);
                    // 根据剩余 badge 数量推算 turnA
                    turnA = (currentAns.length % 2 === 0);
                    updateSentTurnIndicator();
                };
            })(badge, word);
            sortArea.appendChild(badge);

            turnA = !turnA;
            updateSentTurnIndicator();

            if (currentAns.length === q.words.length) {
                var result = currentAns.join(' ');
                var isCorrect = (result === q.sentence);
                if (isCorrect) {
                    sentCompleted = true;
                    onStepAComplete('sort_correct');
                    // 非口语题型：排序完成后直接完成B步骤（不再要求录音）
                    onStepBComplete('sort_correct');
                } else {
                    // 答错：显示锦囊，重置棋盘让学生重试
                    showSentJinNang();
                    setTimeout(function() { resetSentenceSort(); }, 800);
                }
            }
        };
        cardsDiv.appendChild(card);
    });
    container.appendChild(cardsDiv);
    container.appendChild(sentJinNangZone);
}

// ===== 写作：合作建句 =====
function renderCoopBuildSentence(q, container) {
    // 中文提示：最顶部，小字灰色，仅作提示
    if (q.chinese) {
        var chEl = document.createElement('div');
        chEl.style.cssText = 'text-align:center;font-size:13px;color:#bbb;margin:4px 0 10px;letter-spacing:0.5px;';
        chEl.textContent = q.chinese;
        container.appendChild(chEl);
    }

    // ===== 多邻国风格顶部答案区 =====
    var resultArea = document.createElement('div');
    resultArea.className = 'duo-answer-area';
    resultArea.id = 'build-result';

    // A 的下划线 slot（蓝色）
    q.stepA.words.forEach(function(w) {
        var slot = document.createElement('span');
        slot.className = 'duo-answer-slot duo-slot-empty';
        slot.dataset.role = 'a';
        resultArea.appendChild(slot);
    });
    // B 的下划线 slot（橙色），初始灰色占位
    q.stepB.words.forEach(function(w) {
        var slot = document.createElement('span');
        slot.className = 'duo-answer-slot slot-b duo-slot-empty';
        slot.dataset.role = 'b';
        resultArea.appendChild(slot);
    });
    container.appendChild(resultArea);

    // ===== A区域：多邻国风格词块 =====
    var zoneA = createStepZone('A', q.stepA.instruction, true);
    var allAWords = q.stepA.words.slice();
    for (var i = allAWords.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = allAWords[i]; allAWords[i] = allAWords[j]; allAWords[j] = tmp;
    }

    var aSelected = [];
    var aPickedCards = [];

    var aGrid = document.createElement('div');
    aGrid.className = 'duo-word-grid';

    function undoLastA() {
        if (aSelected.length === 0) return;
        aSelected.pop();
        var lastCard = aPickedCards.pop();
        if (lastCard) {
            lastCard.classList.remove('duo-used');
        }
        // 把最后一个已填的 A slot 恢复为空
        var slots = resultArea.querySelectorAll('.duo-answer-slot[data-role="a"]');
        for (var si = slots.length - 1; si >= 0; si--) {
            if (!slots[si].classList.contains('duo-slot-empty')) {
                slots[si].classList.add('duo-slot-empty');
                slots[si].textContent = '';
                break;
            }
        }
    }

    // 给 A slot 添加点击取回功能（点击某个已填 slot，清空该 slot 及之后所有 A slot，对应词块恢复）
    function attachSlotClickA(slot, index) {
        slot.onclick = function() {
            if (slot.classList.contains('duo-slot-empty')) return;
            var slots = resultArea.querySelectorAll('.duo-answer-slot[data-role="a"]');
            // 清空 index 及之后的 slot，并恢复对应词块
            for (var si = index; si < slots.length; si++) {
                if (!slots[si].classList.contains('duo-slot-empty')) {
                    var word = slots[si].textContent;
                    // 找到对应词块恢复
                    var chips = aGrid.querySelectorAll('.duo-word-chip');
                    for (var ci = 0; ci < chips.length; ci++) {
                        if (chips[ci].dataset.word === word && chips[ci].classList.contains('duo-used')) {
                            chips[ci].classList.remove('duo-used');
                            break;
                        }
                    }
                    slots[si].classList.add('duo-slot-empty');
                    slots[si].textContent = '';
                }
            }
            // 同步 aSelected 和 aPickedCards
            aSelected.length = index;
            aPickedCards.length = index;
        };
    }

    allAWords.forEach(function(w) {
        var chip = document.createElement('button');
        chip.className = 'duo-word-chip zone-a';
        chip.textContent = w;
        chip.dataset.word = w;
        chip.onclick = function() {
            if (chip.classList.contains('duo-used')) return;
            chip.classList.add('duo-used');
            aSelected.push(w);
            aPickedCards.push(chip);

            // 顺序填入第一个空的 A slot
            var slots = resultArea.querySelectorAll('.duo-answer-slot[data-role="a"]');
            for (var si = 0; si < slots.length; si++) {
                if (slots[si].classList.contains('duo-slot-empty')) {
                    slots[si].classList.remove('duo-slot-empty');
                    slots[si].textContent = w;
                    attachSlotClickA(slots[si], si);
                    break;
                }
            }

            if (aSelected.length === q.stepA.words.length) {
                setTimeout(function() { onStepAComplete(aSelected.join(' ')); }, 300);
            }
        };
        aGrid.appendChild(chip);
    });
    zoneA.appendChild(aGrid);

    container.appendChild(zoneA);

    // B区域（等待激活）
    var zoneB = createStepZone('B', q.stepB.instruction, false);
    zoneB.id = 'coop-zone-b';
    container.appendChild(zoneB);
}

function renderStepB_BuildSentence(q, container, state) {
    var zoneB = document.getElementById('coop-zone-b');
    if (!zoneB) return;

    zoneB.className = 'coop-zone coop-zone-B active';
    zoneB.style.pointerEvents = 'auto'; // B009 iOS 12 兜底
    var waitEl = zoneB.querySelector('.coop-zone-wait');
    if (waitEl) waitEl.remove();
    // 防止重复渲染：移除已有的词块网格
    var existingGrid = zoneB.querySelector('.duo-word-grid');
    if (existingGrid) existingGrid.remove();

    var resultArea = document.getElementById('build-result');

    var bWords = q.stepB.words.slice();
    for (var i = bWords.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = bWords[i]; bWords[i] = bWords[j]; bWords[j] = tmp;
    }

    var bSelected = [];
    var bGrid = document.createElement('div');
    bGrid.className = 'duo-word-grid';

    // 给 B slot 添加点击取回功能（点击某个已填 slot，清空该 slot 及之后所有 B slot，对应词块恢复）
    function attachSlotClickB(slot, index) {
        slot.onclick = function() {
            if (slot.classList.contains('duo-slot-empty')) return;
            var slots = resultArea.querySelectorAll('.duo-answer-slot[data-role="b"]');
            for (var si = index; si < slots.length; si++) {
                if (!slots[si].classList.contains('duo-slot-empty')) {
                    var word = slots[si].textContent;
                    var chips = bGrid.querySelectorAll('.duo-word-chip');
                    for (var ci = 0; ci < chips.length; ci++) {
                        if (chips[ci].textContent === word && chips[ci].classList.contains('duo-used')) {
                            chips[ci].classList.remove('duo-used');
                            break;
                        }
                    }
                    slots[si].classList.add('duo-slot-empty');
                    slots[si].textContent = '';
                    slots[si].onclick = null;
                }
            }
            // 同步 bSelected
            bSelected.length = index;
            // 重置答案区样式（取消错误/正确高亮）
            resultArea.classList.remove('correct-flash', 'error-shake');
            resultArea.style.background = '';
            resultArea.style.borderColor = '';
        };
    }

    bWords.forEach(function(w) {
        var chip = document.createElement('button');
        chip.className = 'duo-word-chip zone-b';
        chip.textContent = w;
        chip.dataset.word = w;
        chip.onclick = function() {
            if (chip.classList.contains('duo-used')) return;
            chip.classList.add('duo-used');
            bSelected.push(w);

            // 顺序填入第一个空的 B slot
            var slots = resultArea.querySelectorAll('.duo-answer-slot[data-role="b"]');
            for (var si = 0; si < slots.length; si++) {
                if (slots[si].classList.contains('duo-slot-empty')) {
                    slots[si].classList.remove('duo-slot-empty');
                    slots[si].textContent = w;
                    attachSlotClickB(slots[si], si);
                    break;
                }
            }

            if (bSelected.length === q.stepB.words.length) {
                // 所有 B 槽填满，判断答案
                var full = (state.aResult + ' ' + bSelected.join(' ')).trim();
                var isCorrect = full === q.sentence.trim();
                if (isCorrect) {
                    // 正确：绿色闪烁动画后直接完成B步骤（不再要求录音）
                    resultArea.classList.add('correct-flash');
                    setTimeout(function() {
                        resultArea.classList.remove('correct-flash');
                        onStepBComplete(q.sentence);
                    }, 700);
                } else {
                    // 错误：红色抖动 + 清空所有 B slot 和词块让学生重来
                    resultArea.classList.add('error-shake');
                    setTimeout(function() {
                        resultArea.classList.remove('error-shake');
                        // 清空所有 B slot
                        var bSlots = resultArea.querySelectorAll('.duo-answer-slot[data-role="b"]');
                        bSlots.forEach(function(s) {
                            s.classList.add('duo-slot-empty');
                            s.textContent = '';
                            s.onclick = null;
                        });
                        // 恢复所有 B 词块
                        var chips = bGrid.querySelectorAll('.duo-word-chip');
                        chips.forEach(function(c) { c.classList.remove('duo-used'); });
                        bSelected.length = 0;
                    }, 600);
                }
            }
        };
        bGrid.appendChild(chip);
    });
    zoneB.appendChild(bGrid);
}

// ===== 写作：接力填空 =====
function renderCoopRelayFill(q, container) {
    if (q.image) {
        var imgEl = document.createElement('div');
        imgEl.className = 'coop-img-wrap';
        imgEl.innerHTML = q.image;
        container.appendChild(imgEl);
    }

    var templateEl = document.createElement('div');
    templateEl.className = 'coop-fill-template';
    templateEl.id = 'fill-template';
    templateEl.textContent = q.template;
    container.appendChild(templateEl);

    // A区域
    var zoneA = createStepZone('A', q.stepA.instruction, true);
    var gridA = createOptionGrid(q.stepA.options, function(val, card) {
        markSelected(card, 'A');
        // 更新模板显示
        var tmpl = document.getElementById('fill-template');
        if (tmpl) tmpl.textContent = q.template.replace('___', val);
        onStepAComplete(val);
    }, { confirmMode: true, confirmText: '✅ 我选好啦' });
    zoneA.appendChild(gridA);
    container.appendChild(zoneA);

    var zoneB = createStepZone('B', q.stepB.instruction, false);
    zoneB.id = 'coop-zone-b';
    container.appendChild(zoneB);
}

function renderStepB_RelayFill(q, container, state) {
    var zoneB = document.getElementById('coop-zone-b');
    if (!zoneB) return;

    zoneB.className = 'coop-zone coop-zone-B active';
    zoneB.style.pointerEvents = 'auto'; // B009 iOS 12 兜底
    var waitEl = zoneB.querySelector('.coop-zone-wait');
    if (waitEl) waitEl.remove();

    var gridB = createOptionGrid(q.stepB.options, function(val, card) {
        markSelected(card, 'B');
        var tmpl = document.getElementById('fill-template');
        var fullSentence = '';
        if (tmpl) {
            // 替换第二个空
            var text = tmpl.textContent;
            var idx = text.lastIndexOf('___');
            if (idx !== -1) {
                tmpl.textContent = text.substring(0, idx) + val + text.substring(idx + 3);
            }
            fullSentence = tmpl.textContent;
        }
        // 兜底：模板节点丢失时用 q.template 重算
        if (!fullSentence && q.template) {
            fullSentence = q.template.replace('___', String(state.aResult || '')).replace('___', String(val || ''));
        }
        // 非口语题型：选完答案直接完成B步骤（不再要求录音）
        onStepBComplete(val);
    }, { confirmMode: true, confirmText: '✅ 我选好啦' });
    zoneB.appendChild(gridB);
}

// ===== 写作：合作拼词 =====
function renderCoopSpellWord(q, container) {
    // ── 顶部：图片+答案格横排，节省垂直空间 ──
    var topRow = document.createElement('div');
    topRow.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;margin:4px 0;';

    if (q.image) {
        var imgEl = document.createElement('div');
        imgEl.style.cssText = 'flex-shrink:0;text-align:center;';
        imgEl.innerHTML = q.image.replace(/<img/g, '<img style="max-height:70px;max-width:70px;object-fit:contain;"');
        // 图片下方显示中文提示（学生看不懂图片时需要中文辅助）
        if (q.chinese) {
            imgEl.innerHTML += '<div style="font-size:13px;color:#666;margin-top:2px;">' + q.chinese + '</div>';
        }
        topRow.appendChild(imgEl);
    } else if (q.chinese) {
        // 没有图片时，单独显示中文提示
        var zhEl = document.createElement('div');
        zhEl.style.cssText = 'flex-shrink:0;font-size:16px;color:#333;font-weight:600;';
        zhEl.textContent = q.chinese;
        topRow.appendChild(zhEl);
    }

    // 答案格放在图片右边
    var slotsEl = document.createElement('div');
    slotsEl.className = 'spell-slots';
    slotsEl.id = 'spell-slots';
    slotsEl.style.cssText = 'display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin:0;';

    var aCount = q.stepA.letters.length;
    var bCount = q.stepB.letters.length;
    var totalCount = aCount + bCount;

    for (var si = 0; si < totalCount; si++) {
        var slot = document.createElement('div');
        slot.className = si < aCount ? 'spell-slot spell-slot-empty' : 'spell-slot slot-b spell-slot-empty';
        slot.dataset.index = si;
        slot.style.cssText = 'width:36px;height:36px;border-radius:8px;border:2px solid ' + (si < aCount ? '#1cb0f6' : '#ff9600') + ';display:flex;align-items:center;justify-content:center;font-size:1.2em;font-weight:900;color:#333;background:white;';
        slot.innerHTML = '<span class="spell-slot-char">_</span>';
        slotsEl.appendChild(slot);
    }
    topRow.appendChild(slotsEl);
    container.appendChild(topRow);

    // 音频按钮（如果有）
    if (q.audio) {
        var audioBtn = document.createElement('button');
        audioBtn.className = 'spell-audio-btn';
        audioBtn.innerHTML = '🔊';
        audioBtn.onclick = function() { new Audio(q.audio).play(); };
        container.appendChild(audioBtn);
    }

    // ── A区域 ──
    var roleA = (typeof window.currentCoopRoleA === 'number') ? window.currentCoopRoleA : 0;
    var roleB = 1 - roleA;
    var nameA = getPlayerShortName(roleA);
    var nameB = getPlayerShortName(roleB);

    var zoneA = document.createElement('div');
    zoneA.className = 'coop-zone coop-zone-A active';
    zoneA.innerHTML = '<div class="coop-zone-header"><span class="coop-zone-label">' +
        '<span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#1cb0f6;color:#fff;font-size:12px;font-weight:bold;text-align:center;line-height:22px;margin-right:4px;">A</span>' +
        nameA + '</span></div>';

    var allA = q.stepA.letters.slice();
    for (var i = allA.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = allA[i]; allA[i] = allA[j]; allA[j] = tmp;
    }

    var aSelected = [];
    var gridA = document.createElement('div');
    gridA.className = 'spell-letter-grid';
    gridA.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;justify-content:center;padding:4px 0;';
    allA.forEach(function(letter) {
        var btn = document.createElement('button');
        btn.className = 'spell-letter-btn';
        btn.style.cssText = 'width:40px;height:40px;border-radius:8px;border:2px solid #1cb0f6;background:white;font-size:1.1em;font-weight:800;cursor:pointer;box-shadow:0 2px 0 #1cb0f6;';
        btn.textContent = letter;
        btn.onclick = function() {
            if (btn.classList.contains('used')) return;
            if (aSelected.length >= aCount) return;
            btn.classList.add('used');
            aSelected.push(letter);

            // 填入对应格
            var slotIdx = aSelected.length - 1;
            var slots = document.querySelectorAll('#spell-slots .spell-slot');
            if (slots[slotIdx]) {
                slots[slotIdx].querySelector('.spell-slot-char').textContent = letter;
                slots[slotIdx].classList.remove('spell-slot-empty');
                slots[slotIdx].classList.add('slot-filled');
                // 记录来源按钮，支持点答案区撤回
                slots[slotIdx]._sourceBtn = btn;
                slots[slotIdx].onclick = function() {
                    // 只允许撤回最后一个（保持顺序一致性）
                    var filledSlots = document.querySelectorAll('#spell-slots .spell-slot.slot-filled');
                    var lastFilled = filledSlots[filledSlots.length - 1];
                    if (slots[slotIdx] !== lastFilled) return;
                    // 恢复词库按钮
                    var srcBtn = slots[slotIdx]._sourceBtn;
                    if (srcBtn) srcBtn.classList.remove('used');
                    // 移除最后一个 aSelected
                    aSelected.pop();
                    // 重置格子
                    slots[slotIdx].querySelector('.spell-slot-char').textContent = '_';
                    slots[slotIdx].classList.add('spell-slot-empty');
                    slots[slotIdx].classList.remove('slot-filled');
                    slots[slotIdx]._sourceBtn = null;
                    slots[slotIdx].onclick = null;
                };
            }

            if (aSelected.length === aCount) {
                var aCorrect = aSelected.every(function(letter, i) {
                    return letter.toLowerCase() === q.stepA.letters[i].toLowerCase();
                });
                if (aCorrect) {
                    setTimeout(function() { onStepAComplete(aSelected.join('')); }, 300);
                } else {
                    // 答错：答案格变红闪烁，500ms后清空重来
                    var slots = document.querySelectorAll('#spell-slots .spell-slot');
                    for (var ri = 0; ri < aCount; ri++) {
                        if (slots[ri]) slots[ri].classList.add('slot-error');
                    }
                    setTimeout(function() {
                        // 清空 aSelected
                        aSelected.length = 0;
                        // 恢复所有A格
                        var slotsNow = document.querySelectorAll('#spell-slots .spell-slot');
                        for (var ci = 0; ci < aCount; ci++) {
                            if (slotsNow[ci]) {
                                slotsNow[ci].querySelector('.spell-slot-char').textContent = '_';
                                slotsNow[ci].classList.add('spell-slot-empty');
                                slotsNow[ci].classList.remove('slot-filled', 'slot-error');
                                slotsNow[ci]._sourceBtn = null;
                                slotsNow[ci].onclick = null;
                            }
                        }
                        // 恢复所有字母按钮可用
                        gridA.querySelectorAll('.spell-letter-btn').forEach(function(b) {
                            b.classList.remove('used');
                        });
                    }, 500);
                }
            }
        };
        gridA.appendChild(btn);
    });
    zoneA.appendChild(gridA);
    container.appendChild(zoneA);

    // ── B区域（等待激活） ──
    var zoneB = document.createElement('div');
    zoneB.className = 'coop-zone coop-zone-B waiting';
    zoneB.id = 'coop-zone-b';
    zoneB.innerHTML = '<div class="coop-zone-header"><span class="coop-zone-label">' +
        '<span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#F5A623;color:#fff;font-size:12px;font-weight:bold;text-align:center;line-height:22px;margin-right:4px;">B</span>' +
        nameB + '</span></div>';
    var waitEl = document.createElement('div');
    waitEl.className = 'coop-zone-wait';
    waitEl.textContent = '⏳ 等待' + nameA + '完成...';
    zoneB.appendChild(waitEl);
    container.appendChild(zoneB);
}

function renderStepB_SpellWord(q, container, state) {
    var zoneB = document.getElementById('coop-zone-b');
    if (!zoneB) return;

    zoneB.className = 'coop-zone coop-zone-B active';
    zoneB.style.pointerEvents = 'auto'; // B009 iOS 12 兜底
    var waitEl = zoneB.querySelector('.coop-zone-wait');
    if (waitEl) waitEl.remove();

    var aCount = q.stepA.letters.length;
    var bCount = q.stepB.letters.length;

    var allB = q.stepB.letters.slice();
    for (var i = allB.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = allB[i]; allB[i] = allB[j]; allB[j] = tmp;
    }

    var bSelected = [];
    var gridB = document.createElement('div');
    gridB.className = 'spell-letter-grid';
    gridB.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;justify-content:center;padding:4px 0;';
    allB.forEach(function(letter) {
        var btn = document.createElement('button');
        btn.className = 'spell-letter-btn zone-b';
        btn.style.cssText = 'width:40px;height:40px;border-radius:8px;border:2px solid #ff9600;background:white;font-size:1.1em;font-weight:800;cursor:pointer;box-shadow:0 2px 0 #ff9600;';
        btn.textContent = letter;
        btn.onclick = function() {
            if (btn.classList.contains('used')) return;
            if (bSelected.length >= bCount) return;
            btn.classList.add('used');
            bSelected.push(letter);

            // 填入B对应格（从 aCount 开始偏移）
            var slotIdx = aCount + bSelected.length - 1;
            var slots = document.querySelectorAll('#spell-slots .spell-slot');
            if (slots[slotIdx]) {
                slots[slotIdx].querySelector('.spell-slot-char').textContent = letter;
                slots[slotIdx].classList.remove('spell-slot-empty');
                slots[slotIdx].classList.add('slot-filled');
                // 记录来源按钮，支持点答案区撤回
                slots[slotIdx]._sourceBtn = btn;
                slots[slotIdx].onclick = function() {
                    // 只允许撤回最后一个（保持顺序一致性）
                    var allSlots = document.querySelectorAll('#spell-slots .spell-slot');
                    var filledBSlots = [];
                    for (var fi = aCount; fi < allSlots.length; fi++) {
                        if (allSlots[fi].classList.contains('slot-filled')) filledBSlots.push(allSlots[fi]);
                    }
                    var lastFilled = filledBSlots[filledBSlots.length - 1];
                    if (allSlots[slotIdx] !== lastFilled) return;
                    // 恢复词库按钮
                    var srcBtn = allSlots[slotIdx]._sourceBtn;
                    if (srcBtn) srcBtn.classList.remove('used');
                    // 移除最后一个 bSelected
                    bSelected.pop();
                    // 重置格子
                    allSlots[slotIdx].querySelector('.spell-slot-char').textContent = '_';
                    allSlots[slotIdx].classList.add('spell-slot-empty');
                    allSlots[slotIdx].classList.remove('slot-filled');
                    allSlots[slotIdx]._sourceBtn = null;
                    allSlots[slotIdx].onclick = null;
                };
            }

            if (bSelected.length === bCount) {
                var bCorrect = bSelected.every(function(letter, i) {
                    return letter.toLowerCase() === q.stepB.letters[i].toLowerCase();
                });
                if (bCorrect) {
                    // 非口语题型：拼对后直接完成B步骤（不再要求录音）
                    setTimeout(function() {
                        onStepBComplete(q.word);
                    }, 300);
                } else {
                    // 答错：B区答案格变红闪烁，500ms后清空重来
                    var allSlots = document.querySelectorAll('#spell-slots .spell-slot');
                    for (var ri = aCount; ri < allSlots.length; ri++) {
                        if (allSlots[ri]) allSlots[ri].classList.add('slot-error');
                    }
                    setTimeout(function() {
                        // 清空 bSelected
                        bSelected.length = 0;
                        // 恢复所有B格
                        var slotsNow = document.querySelectorAll('#spell-slots .spell-slot');
                        for (var ci = aCount; ci < slotsNow.length; ci++) {
                            if (slotsNow[ci]) {
                                slotsNow[ci].querySelector('.spell-slot-char').textContent = '_';
                                slotsNow[ci].classList.add('spell-slot-empty');
                                slotsNow[ci].classList.remove('slot-filled', 'slot-error');
                                slotsNow[ci]._sourceBtn = null;
                                slotsNow[ci].onclick = null;
                            }
                        }
                        // 恢复所有B字母按钮可用
                        gridB.querySelectorAll('.spell-letter-btn').forEach(function(b) {
                            b.classList.remove('used');
                        });
                    }, 500);
                }
            }
        };
        gridB.appendChild(btn);
    });
    zoneB.appendChild(gridB);
}

// ===== 口语：跟读接力（简化版：录音+确认）=====
function renderCoopReadRelay(q, container) {
    if (q.image) {
        var imgEl = document.createElement('div');
        imgEl.className = 'coop-img-wrap';
        imgEl.innerHTML = q.image;
        container.appendChild(imgEl);
    }

    var wordEl = document.createElement('div');
    wordEl.style.cssText = 'text-align:center;font-size:32px;font-weight:bold;margin:8px 0;';
    wordEl.textContent = q.word;
    container.appendChild(wordEl);

    if (q.chinese) {
        var chEl = document.createElement('div');
        chEl.style.cssText = 'text-align:center;font-size:14px;color:#aaa;margin-bottom:10px;';
        chEl.textContent = q.chinese;
        container.appendChild(chEl);
    }

    // A区域
    var zoneA = createStepZone('A', q.stepA.instruction, true);

    // 自动播放音频示范（跟读题必须先听再说）
    var listenBtn = document.createElement('button');
    listenBtn.className = 'play-sound-btn';
    listenBtn.innerHTML = '🔊 先听一遍';
    listenBtn.style.cssText += 'font-size:14px;padding:8px 16px;width:auto;height:auto;border-radius:24px;margin:8px auto;display:block;';
    listenBtn.onclick = function() { if (typeof speakWord === 'function') speakWord(q.word); };
    zoneA.appendChild(listenBtn);
    setTimeout(function() { if (typeof speakWord === 'function') speakWord(q.word); }, 300);

    var doneBtn = document.createElement('button');
    doneBtn.className = 'coop-continue-btn';
    doneBtn.style.cssText += 'margin:12px auto;display:block;';
    // 去掉末尾标点，避免SOE评分对句子带句号失败
    var cleanRefA = (q.word || '').replace(/[.!?。！？]+$/g, '').trim();
    attachSoeRecordButton({
        button: doneBtn,
        referenceText: cleanRefA,
        role: 'A',
        defaultLabel: '🎤 点击开始读',
        doneLabel: '⭐ 完成！继续加油！',
        onComplete: function() { onStepAComplete('read_done'); }
    });
    zoneA.appendChild(doneBtn);
    container.appendChild(zoneA);

    var zoneB = createStepZone('B', q.stepB.instruction, false);
    zoneB.id = 'coop-zone-b';
    container.appendChild(zoneB);
}

function renderStepB_ReadRelay(q, container, state) {
    var zoneB = document.getElementById('coop-zone-b');
    if (!zoneB) return;

    zoneB.className = 'coop-zone coop-zone-B active';
    zoneB.style.pointerEvents = 'auto'; // B009 iOS 12 兜底
    var waitEl = zoneB.querySelector('.coop-zone-wait');
    if (waitEl) waitEl.remove();

    var roleA = (typeof window.currentCoopRoleA === 'number') ? window.currentCoopRoleA : 0;
    var nameA = getPlayerShortName(roleA);

    var instr = document.createElement('div');
    instr.style.cssText = 'text-align:center;font-size:14px;color:#666;margin:8px 0;';
    instr.textContent = '听' + nameA + '怎么读的，模仿着读一遍';
    zoneB.appendChild(instr);

    // "先听一遍"按钮（B也需要音频示范）
    var listenBtnB = document.createElement('button');
    listenBtnB.className = 'play-sound-btn';
    listenBtnB.innerHTML = '🔊 先听一遍';
    listenBtnB.style.cssText += 'font-size:14px;padding:8px 16px;width:auto;height:auto;border-radius:24px;margin:8px auto;display:block;';
    listenBtnB.onclick = function() { if (typeof speakWord === 'function') speakWord(q.word); };
    zoneB.appendChild(listenBtnB);
    // 自动播放一遍
    setTimeout(function() { if (typeof speakWord === 'function') speakWord(q.word); }, 300);

    var doneBtn = document.createElement('button');
    doneBtn.className = 'coop-continue-btn';
    doneBtn.style.cssText += 'margin:12px auto;display:block;';
    // 去掉末尾标点，避免SOE评分对句子带句号失败
    var cleanRefB = (q.word || '').replace(/[.!?。！？]+$/g, '').trim();
    attachSoeRecordButton({
        button: doneBtn,
        referenceText: cleanRefB,
        role: 'B',
        defaultLabel: '🎤 点击开始读',
        doneLabel: '⭐ 完成！继续加油！',
        onComplete: function() {
            // 录完直接进下一题，不需要自评
            onStepBComplete('read_done');
        }
    });
    zoneB.appendChild(doneBtn);
}

// ===== 口语：看图说话 =====
function renderCoopPictureSpeak(q, container) {
    // 图片（共用，放在区域外）
    if (q.image) {
        var imgEl = document.createElement('div');
        imgEl.className = 'coop-img-wrap';
        imgEl.innerHTML = q.image;
        container.appendChild(imgEl);
    }

    // A区域：看图 → 先听一遍 → 录音说出单词 → 显示分数 → 继续
    var zoneA = createStepZone('A', q.stepA.instruction, true);

    // 中文提示（帮助理解）
    if (q.stepA.chinese) {
        var chA = document.createElement('div');
        chA.style.cssText = 'text-align:center;font-size:14px;color:#aaa;margin:6px 0;';
        chA.textContent = q.stepA.chinese;
        zoneA.appendChild(chA);
    }

    // "先听一遍"按钮
    var listenBtnA = document.createElement('button');
    listenBtnA.className = 'play-sound-btn';
    listenBtnA.innerHTML = '🔊 先听一遍';
    listenBtnA.style.cssText += 'font-size:14px;padding:8px 16px;width:auto;height:auto;border-radius:24px;margin:8px auto;display:block;';
    var refTextA = q.stepA.expected || q.answer || '';
    listenBtnA.onclick = function() { if (typeof speakWord === 'function') speakWord(refTextA); };
    zoneA.appendChild(listenBtnA);
    // 自动播放一遍
    setTimeout(function() { if (typeof speakWord === 'function') speakWord(refTextA); }, 300);

    // 录音按钮（SOE评分）
    var doneBtnA = document.createElement('button');
    doneBtnA.className = 'coop-continue-btn';
    doneBtnA.style.cssText += 'margin:12px auto;display:block;';
    // 去掉末尾标点，避免SOE评分失败
    var cleanRefA = refTextA.replace(/[.!?。！？]+$/g, '').trim();
    attachSoeRecordButton({
        button: doneBtnA,
        referenceText: cleanRefA,
        role: 'A',
        defaultLabel: '🎤 点击开始说',
        doneLabel: '⭐ 完成！继续加油！',
        onComplete: function() {
            // SOE分数>=40算通过；null默认通过
            var scores = window._pendingSoeScores && window._pendingSoeScores['A'];
            var s = scores && typeof scores.soeScore === 'number' ? scores.soeScore : null;
            var passed = s === null || s >= 40;
            onStepAComplete(passed ? 'speak_done' : 'speak_bad');
        }
    });
    zoneA.appendChild(doneBtnA);
    container.appendChild(zoneA);

    var zoneB = createStepZone('B', q.stepB.instruction, false);
    zoneB.id = 'coop-zone-b';
    container.appendChild(zoneB);
}

function renderStepB_PictureSpeak(q, container, state) {
    var zoneB = document.getElementById('coop-zone-b');
    if (!zoneB) return;

    zoneB.className = 'coop-zone coop-zone-B active';
    zoneB.style.pointerEvents = 'auto'; // B009 iOS 12 兜底
    var waitEl = zoneB.querySelector('.coop-zone-wait');
    if (waitEl) waitEl.remove();

    // 更新指令：听A（真名）怎么说的，跟着说同一句话
    var roleA = (typeof window.currentCoopRoleA === 'number') ? window.currentCoopRoleA : 0;
    var nameA = getPlayerShortName(roleA);
    var instrEl = zoneB.querySelector('.coop-zone-instruction');
    if (instrEl) instrEl.textContent = '听' + nameA + '怎么说的，跟着说同一句话';

    // 显示正确句子（B可以看到，跟着说）
    var refTextB = q.stepB.expected || q.stepA.expected || q.answer || '';
    var expectedB = document.createElement('div');
    expectedB.style.cssText = 'text-align:center;font-size:28px;font-weight:bold;margin:8px 0;color:#E87722;';
    expectedB.textContent = refTextB;
    zoneB.appendChild(expectedB);

    if (q.stepB.chinese) {
        var chB = document.createElement('div');
        chB.style.cssText = 'text-align:center;font-size:13px;color:#aaa;';
        chB.textContent = q.stepB.chinese;
        zoneB.appendChild(chB);
    }

    // "先听一遍"按钮
    var listenBtnB = document.createElement('button');
    listenBtnB.className = 'play-sound-btn';
    listenBtnB.innerHTML = '🔊 先听一遍';
    listenBtnB.style.cssText += 'font-size:14px;padding:8px 16px;width:auto;height:auto;border-radius:24px;margin:8px auto;display:block;';
    listenBtnB.onclick = function() { if (typeof speakWord === 'function') speakWord(refTextB); };
    zoneB.appendChild(listenBtnB);
    // 自动播放一遍
    setTimeout(function() { if (typeof speakWord === 'function') speakWord(refTextB); }, 300);

    // 录音按钮（SOE评分）
    var doneBtnB = document.createElement('button');
    doneBtnB.className = 'coop-continue-btn';
    doneBtnB.style.cssText += 'margin:12px auto;display:block;';
    // 去掉末尾标点，避免SOE评分失败
    var cleanRefB = refTextB.replace(/[.!?。！？]+$/g, '').trim();
    attachSoeRecordButton({
        button: doneBtnB,
        referenceText: cleanRefB,
        role: 'B',
        defaultLabel: '🎤 点击开始说',
        doneLabel: '⭐ 完成！继续加油！',
        onComplete: function() {
            // SOE分数>=40算通过；null默认通过
            var scores = window._pendingSoeScores && window._pendingSoeScores['B'];
            var s = scores && typeof scores.soeScore === 'number' ? scores.soeScore : null;
            var passed = s === null || s >= 40;
            onStepBComplete(passed ? 'speak_done' : 'speak_bad');
        }
    });
    zoneB.appendChild(doneBtnB);
}

// ===== 口语：情境对话 =====
function renderCoopDialogue(q, container) {
    var scenarioEl = document.createElement('div');
    scenarioEl.className = 'coop-scenario-box';
    scenarioEl.textContent = q.scenario;
    container.appendChild(scenarioEl);

    if (q.image) {
        var imgEl = document.createElement('div');
        imgEl.className = 'coop-img-wrap';
        imgEl.innerHTML = q.image;
        container.appendChild(imgEl);
    }

    // A区域
    var zoneA = createStepZone('A', q.stepA.instruction, true);
    var roleALabel = q.stepA.role || q.roleA || '提问者';
    var roleAEl = document.createElement('div');
    roleAEl.style.cssText = 'font-size:12px;color:#4A90D9;margin:4px 0;';
    roleAEl.textContent = '扮演：' + roleALabel;
    zoneA.appendChild(roleAEl);

    var lineAWrap = document.createElement('div');
    lineAWrap.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;margin:8px 0;';
    var lineA = document.createElement('span');
    lineA.style.cssText = 'font-size:20px;font-weight:bold;';
    lineA.textContent = q.stepA.line;
    lineAWrap.appendChild(lineA);
    var speakBtnA = document.createElement('button');
    speakBtnA.className = 'play-sound-btn';
    speakBtnA.innerHTML = '🔊';
    speakBtnA.style.cssText += 'font-size:18px;padding:4px 10px;width:auto;height:auto;border-radius:20px;';
    (function(lineText) {
        speakBtnA.onclick = function() { if (typeof speakWord === 'function') speakWord(lineText); };
    }(q.stepA.line || ''));
    lineAWrap.appendChild(speakBtnA);
    zoneA.appendChild(lineAWrap);
    if (q.stepA.chinese) {
        var chA = document.createElement('div');
        chA.style.cssText = 'text-align:center;font-size:13px;color:#aaa;';
        chA.textContent = q.stepA.chinese;
        zoneA.appendChild(chA);
    }

    // 自动朗读A的台词
    if (q.stepA.line && typeof speakWord === 'function') {
        setTimeout(function() { speakWord(q.stepA.line); }, 300);
    }

    var doneBtnA = document.createElement('button');
    doneBtnA.className = 'coop-continue-btn';
    doneBtnA.style.cssText += 'margin:12px auto;display:block;';
    // 去掉末尾标点，避免SOE评分失败
    var cleanRefA = (q.stepA.line || '').replace(/[.!?。！？]+$/g, '').trim();
    attachSoeRecordButton({
        button: doneBtnA,
        referenceText: cleanRefA,
        role: 'A',
        defaultLabel: '🎤 点击开始说',
        doneLabel: '⭐ 完成！继续加油！',
        onComplete: function() { onStepAComplete('dialogue_done'); }
    });
    zoneA.appendChild(doneBtnA);
    container.appendChild(zoneA);

    var zoneB = createStepZone('B', q.stepB.instruction, false);
    zoneB.id = 'coop-zone-b';
    container.appendChild(zoneB);
}

function renderStepB_Dialogue(q, container, state) {
    var zoneB = document.getElementById('coop-zone-b');
    if (!zoneB) return;

    zoneB.className = 'coop-zone coop-zone-B active';
    zoneB.style.pointerEvents = 'auto'; // B009 iOS 12 兜底
    var waitEl = zoneB.querySelector('.coop-zone-wait');
    if (waitEl) waitEl.remove();

    var roleBLabel = q.stepB.role || q.roleB || '回答者';
    var roleBEl = document.createElement('div');
    roleBEl.style.cssText = 'font-size:12px;color:#F5A623;margin:4px 0;';
    roleBEl.textContent = '扮演：' + roleBLabel;
    zoneB.appendChild(roleBEl);

    var lineBWrap = document.createElement('div');
    lineBWrap.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;margin:8px 0;';
    var lineB = document.createElement('span');
    lineB.style.cssText = 'font-size:20px;font-weight:bold;';
    lineB.textContent = q.stepB.line;
    lineBWrap.appendChild(lineB);
    var speakBtnB = document.createElement('button');
    speakBtnB.className = 'play-sound-btn';
    speakBtnB.innerHTML = '🔊';
    speakBtnB.style.cssText += 'font-size:18px;padding:4px 10px;width:auto;height:auto;border-radius:20px;';
    (function(lineText) {
        speakBtnB.onclick = function() { if (typeof speakWord === 'function') speakWord(lineText); };
    }(q.stepB.line || ''));
    lineBWrap.appendChild(speakBtnB);
    zoneB.appendChild(lineBWrap);
    if (q.stepB.chinese) {
        var chB = document.createElement('div');
        chB.style.cssText = 'text-align:center;font-size:13px;color:#aaa;';
        chB.textContent = q.stepB.chinese;
        zoneB.appendChild(chB);
    }

    // 自动朗读B的台词
    if (q.stepB.line && typeof speakWord === 'function') {
        setTimeout(function() { speakWord(q.stepB.line); }, 300);
    }

    var doneBtnB = document.createElement('button');
    doneBtnB.className = 'coop-continue-btn';
    doneBtnB.style.cssText += 'margin:12px auto;display:block;';
    // 去掉末尾标点，避免SOE评分失败
    var cleanRefB = (q.stepB.line || '').replace(/[.!?。！？]+$/g, '').trim();
    attachSoeRecordButton({
        button: doneBtnB,
        referenceText: cleanRefB,
        role: 'B',
        defaultLabel: '🎤 点击开始说',
        doneLabel: '⭐ 完成！继续加油！',
        onComplete: function() { onStepBComplete('dialogue_done'); }
    });
    zoneB.appendChild(doneBtnB);
}

// ===== 四级支架系统：通用渲染层 =====

/**
 * 在题目容器中插入支架 UI
 * Level 1：黄色横幅（讨论提示）
 * Level 2-4：蓝色提示框（题型专属线索）—— 累加显示，不覆盖
 */
function insertScaffoldBanner(container, qType) {
    if (container.querySelector('.scaffold-banner')) return; // 只插一次
    var banner = document.createElement('div');
    banner.className = 'scaffold-banner level-1';
    // 口语题型用适合开口的提示，非口语题型用讨论提示
    var bannerText;
    if (qType === 'coop_read_relay' || qType === 'coop_picture_speak') {
        bannerText = '👂 先听一遍，再跟着读！';
    } else if (qType === 'coop_dialogue') {
        bannerText = '🤝 先和同学练习一下再说！';
    } else {
        bannerText = '🤝 先和同学讨论一下再选！';
    }
    banner.innerHTML = bannerText;
    container.insertBefore(banner, container.firstChild);
}

function insertScaffoldHint(container, level, html) {
    var hint = document.createElement('div');
    hint.className = 'scaffold-hint level-' + level;
    hint.innerHTML = html;
    container.appendChild(hint);
}

/**
 * 根据题型和级别生成支架内容（供答错后调用）
 * @param {number} qIndex  题目在 station.questions 中的索引
 * @param {number} level   支架级别 1-4
 * @param {object} q       题目对象
 * @param {Element} container  渲染容器
 */
function applyScaffold(qIndex, level, q, container) {
    if (level === 1) {
        insertScaffoldBanner(container, q && q.type);
        // 情境阅读/情境听力题：Level 1 就给关键词中文提示（学生看不懂英文会乱点）
        if (q && (q.type === 'coop_read_scenario' || q.type === 'coop_listen_scenario')) {
            var l1Chinese = q.chinese || '';
            var l1Text = (q.stepA && q.stepA.text) || '';
            // 提取英文关键词并翻译
            var l1Known = { big: '大的', small: '小的', fast: '快的', cute: '可爱的', run: '跑', fly: '飞', long: '长的', black: '黑色', white: '白色', brown: '棕色', lovely: '可爱的', ears: '耳朵', eyes: '眼睛', legs: '腿', grass: '草', like: '喜欢', have: '有' };
            var l1Words = l1Text.match(/\b[a-zA-Z]+\b/g) || [];
            var l1Hints = [];
            l1Words.forEach(function(w) {
                var wl = w.toLowerCase();
                if (l1Known[wl]) l1Hints.push(w + '=' + l1Known[wl]);
            });
            if (l1Hints.length > 0) {
                insertScaffoldHint(container, 1, '📖 关键词：' + l1Hints.join('，'));
            }
        }
        return;
    }

    var hintHtml = getScaffoldHintHtml(q, level);
    if (hintHtml) {
        insertScaffoldHint(container, level, hintHtml);
    }

    // Level 2+ 的特殊行为（音频慢速/高亮等）
    triggerScaffoldSideEffect(q, level, container);
}

function getScaffoldHintHtml(q, level) {
    var type = q.type;

    // coop_listen_relay — 2026-04-11 重设计：不给中文翻译，保留"听→识图"认知任务
    if (type === 'coop_listen_relay') {
        if (level === 2) return '🐢 慢速重播音频中，仔细听每个音';
        if (level === 3) {
            // L3：重读关键词 2 次 + 首音音素提示（不给中文，仍需学生"听→认图"）
            var lrWord = q.audio || '';
            var firstPhoneme = lrWord ? ('/' + lrWord[0].toLowerCase() + '.../') : '';
            return '🔊 再听一次，注意开头发音：<strong style="font-size:22px;letter-spacing:2px;">' + firstPhoneme + '</strong>';
        }
        if (level === 4) {
            // L4：多模态 —— 正确图片描边脉冲 + 音频，仍要求学生"点对的那个"
            return '🌟 正确答案的图片正在闪烁，边听边点它！';
        }
    }

    // coop_listen_judge
    if (type === 'coop_listen_judge') {
        if (level === 2) return '🐢 慢速重播整句音频，仔细听';
        if (level === 3 && q.audio) return '📖 音频对应单词：<strong>' + q.audio + '</strong>';
        if (level === 4) {
            var parts = [];
            if (q.audio) parts.push('<strong>' + q.audio + '</strong>');
            if (q.chinese) parts.push('（' + q.chinese + '）');
            return '📖🔊 单词+音频+翻译：' + parts.join(' ');
        }
    }

    // coop_word_relay
    // 数据结构：q.stepA.correct = 英文单词；q.stepB.optionsMap[word].correct = 中文意思
    if (type === 'coop_word_relay') {
        var wrWord = (q.stepA && q.stepA.correct) ? q.stepA.correct : '';
        var wrZh = '';
        if (wrWord && q.stepB && q.stepB.optionsMap && q.stepB.optionsMap[wrWord]) {
            wrZh = q.stepB.optionsMap[wrWord].correct || '';
        }
        // L2 Modified Input：首字母+字母数提示（不减少选项，只给视觉线索）
        if (level === 2) {
            var wrHint = wrWord ? (wrWord[0] + wrWord.slice(1).replace(/./g, '_')) : '?';
            return '💡 首字母提示：<strong style="font-size:20px;letter-spacing:3px;">' + wrHint + '</strong> （' + wrWord.length + ' 个字母）';
        }
        // L3 语言线索：中文翻译 + 图片观察指引
        if (level === 3) {
            return '📖 中文意思：<strong>' + wrZh + '</strong><br>🔍 再仔细看看图片，想想是哪一个词';
        }
        // L4 多模态：图片+首字母+中文+音频朗读（由 triggerScaffoldSideEffect 重播发音）
        if (level === 4) {
            var wrHint4 = wrWord ? (wrWord[0] + wrWord.slice(1).replace(/./g, '_')) : '?';
            return '🖼️🔊📖 三重提示：<strong>' + wrHint4 + '</strong> = <strong>' + wrZh + '</strong>（' + wrWord + '）';
        }
    }

    // coop_flip_match
    if (type === 'coop_flip_match') {
        if (level === 2) return '💡 回忆刚才翻过的牌的位置，已匹配的牌边框会保留';
        if (level === 3) return '✨ 一张正确配对牌的边框正在闪烁，找到它！';
        if (level === 4) return '🎯 正确配对位置已直接显示，对应翻牌即可';
    }

    // coop_build_sentence
    if (type === 'coop_build_sentence') {
        if (level === 2 && q.chinese) return '📖 句子中文意思：<strong>' + q.chinese + '</strong>';
        if (level === 3) return '💡 第一个词块位置高亮，从那里开始！';
        if (level === 4 && q.sentence) {
            var words = q.sentence.split(' ');
            var numbered = words.map(function(w, i) { return (i+1) + '.' + w; }).join('  ');
            return '📖🔢 中文：<strong>' + (q.chinese || '') + '</strong><br>词块顺序：' + numbered;
        }
    }

    // coop_relay_fill
    if (type === 'coop_relay_fill') {
        if (level === 2) return '🖼️🔊 图片和音频已重新播放，注意观察';
        if (level === 3 && q.chinese) return '💡 空格对应中文：<strong>' + q.chinese + '</strong>';
        if (level === 4) return '🖼️📖🔊 图片+中文+音频全部提示';
    }

    // coop_spell_word
    if (type === 'coop_spell_word') {
        if (level === 2) return '🐢 单词音频正在慢速播放';
        if (level === 3) return '✨ 正确字母格正在闪烁，找到它！';
        if (level === 4) return '🔊✨📖 音频+正确字母高亮+中文：<strong>' + (q.chinese || '') + '</strong>';
    }

    // coop_listen_sort — L3 不给顺序答案（保留"听→排"认知任务）
    // 数据字段：q.sequence（有序词数组）、q.words（词卡数组）
    if (type === 'coop_listen_sort') {
        if (level === 2) return '🐢 慢速重播整段音频，仔细听每个词';
        if (level === 3) return '🔊 每个动物名正在慢速重读 2 次，边听边判断顺序';
        if (level === 4) return '🌟 第一张正确的图片边框正在闪烁，从它开始排！';
    }

    // coop_listen_scenario — L3 不给对话翻译（保留语境理解任务）
    // 数据字段：q.audio（对话文本）、q.scenario（中文情境）、q.stepA.correct
    // stepB 用 optionsMap 按 A 的答案给出选项
    if (type === 'coop_listen_scenario') {
        var lscPhase = (window.adventureState && window.adventureState.coopPhase) || 'A';
        if (lscPhase === 'B') {
            // B step: judging whether the animal fits the scenario
            var lscScenario = q.scenario || '';
            var lscChinese = q.chinese || '';
            if (level === 2) return '💡 再想想情境：<strong>' + lscScenario + '</strong>';
            if (level === 3) return '📖 提示：<strong>' + lscChinese + '</strong>';
            if (level === 4) return '🌟 情境+答案提示：<strong>' + lscScenario + '</strong><br>参考：<strong>' + lscChinese + '</strong>';
        } else {
            // A step: listening and identifying the animal
            if (level === 2) return '🐢 慢速重播场景音频，仔细听';
            if (level === 3) return '🔊 对话中的关键词正在重读 2 次，注意听';
            if (level === 4) {
                var lsScn = q.scenario || '';
                return '🌟 语境提示：<strong>' + lsScn + '</strong>（想想在什么情境下发生）';
            }
        }
    }

    // coop_sentence_sort
    if (type === 'coop_sentence_sort') {
        if (level === 2) return '🔊 完整句子音频正在播放，边听边排';
        if (level === 3) return '💡 第一个词块已高亮，先点它！';
        if (level === 4 && q.chinese) return '🔊📖💡 音频+翻译+第一词高亮：<strong>' + q.chinese + '</strong>';
    }

    // coop_read_scenario — A步：读英文→选中文特征；B步：看中文描述→选动物图片
    if (type === 'coop_read_scenario') {
        var rsPhase = (window.adventureState && window.adventureState.coopPhase) || 'A';
        if (rsPhase === 'B') {
            // B step: seeing Chinese description → selecting correct animal image
            var rsBCorrect = (q.stepB && q.stepB.correct) || '';
            if (level === 2) return '🔊 听听这个动物的发音';
            if (level === 3 && rsBCorrect) return '<img src="assets/images/' + rsBCorrect + '.png" width="60" style="border-radius:8px;vertical-align:middle;"> 想想这是哪个动物';
            if (level === 4 && rsBCorrect) return '<img src="assets/images/' + rsBCorrect + '.png" width="60" style="border-radius:8px;vertical-align:middle;"> 答案是 <strong>' + rsBCorrect + '</strong>';
        } else {
            // A step: reading English text → selecting Chinese characteristics
            var rsText = (q.stepA && q.stepA.text) || '';
            var rsZh = q.chinese || '';
            if (level === 2) return '💡 再读一遍，注意加粗的词';
            if (level === 3) {
                // Extract key words from the text and show English=Chinese hints
                var rsWords = rsText.match(/\b[a-zA-Z]+\b/g) || [];
                var rsKnown = { big: '大的', small: '小的', fast: '快的', slow: '慢的', cute: '可爱的', tall: '高的', run: '跑', fly: '飞', swim: '游', jump: '跳' };
                var rsHints = [];
                rsWords.forEach(function(w) {
                    var wl = w.toLowerCase();
                    if (rsKnown[wl]) rsHints.push('<strong>' + w + '</strong>=' + rsKnown[wl]);
                });
                if (rsZh) return '📖 关键词提示：' + (rsHints.length ? rsHints.join('，') : rsText) + '<br>提示：' + rsZh;
                return '📖 关键词提示：' + (rsHints.length ? rsHints.join('，') : rsText);
            }
            if (level === 4 && rsZh) return '📖 中文翻译：<strong>' + rsZh + '</strong>';
            if (level === 4) return '📖 完整提示：<strong>' + rsText + '</strong>';
        }
    }

    // coop_write_scenario — A步/B步：看情境描述→写/选正确英文
    if (type === 'coop_write_scenario') {
        var wsZh = q.chinese || '';
        var wsCorrect = (q.stepA && q.stepA.correct) || (q.stepB && q.stepB.correct) || '';
        if (level === 2) return '💡 再看看题目描述';
        if (level === 3 && wsZh) return '📖 中文意思：<strong>' + wsZh + '</strong>';
        if (level === 3) return '📖 仔细阅读题目，找关键词';
        if (level === 4 && wsCorrect) return '🎯 答案是：<strong>' + wsCorrect + '</strong>';
        if (level === 4) return '🎯 认真看题目，答案在提示里';
    }

    // coop_read_relay
    // 数据：q.word（英文）、q.chinese（中文）；q.phonetic 不存在于 U1L1 数据
    if (type === 'coop_read_relay') {
        if (level === 2) return '🔊 系统示范音频正在重播，模仿发音（L2 Modified Input）';
        if (level === 3) return '📖 中文意思：<strong>' + (q.chinese || '') + '</strong> — 先理解词义再读';
        if (level === 4) return '🔊🖼️📖 三重提示：<strong>' + (q.word || '') + '</strong>（' + (q.chinese || '') + '）音频重播中';
    }

    // coop_picture_speak
    // 数据：q.stepA.chinese / q.stepA.expected / q.stepB.chinese / q.stepB.expected（top-level q.chinese 不存在）
    if (type === 'coop_picture_speak') {
        var psZh = (q.stepA && q.stepA.chinese) || '';
        var psEn = (q.stepA && q.stepA.expected) || '';
        if (level === 2) return '📖 看着说：<strong>' + psEn + '</strong>（' + psZh + '）';
        if (level === 3) {
            var frame = psEn ? psEn.replace(/\S+\s*$/,'___') : 'This is a ___';
            return '📝 句型框架：<strong>' + frame + '</strong>';
        }
        if (level === 4) {
            return '💬📝📚 中文+框架+参考词：<strong>' + psZh + '</strong>｜<em>' + psEn + '</em>';
        }
    }

    // coop_dialogue
    // 数据：q.scenario（中文情境）/ q.stepA.chinese / q.stepA.line / q.stepB.chinese / q.stepB.line
    if (type === 'coop_dialogue') {
        var dAzh = (q.stepA && q.stepA.chinese) || '';
        var dAln = (q.stepA && q.stepA.line) || '';
        if (level === 2) {
            var sc = q.scenario || '';
            return '💬 情境提示：' + sc + (dAzh ? '<br>A 台词意思：<strong>' + dAzh + '</strong>' : '');
        }
        if (level === 3) {
            var firstWord = dAln ? dAln.split(' ')[0] : '';
            return '💡 对话开头词提示：<strong>' + firstWord + '...</strong>';
        }
        if (level === 4) {
            return '💬💡📖 中文+完整句型：<strong>' + dAzh + '</strong><br><em>' + dAln + '</em>';
        }
    }

    return '';
}

/**
 * 触发支架的副作用行为（慢速播音/高亮等）
 */
function triggerScaffoldSideEffect(q, level, container) {
    var type = q.type;

    // 慢速播音
    if (level === 2 && (type === 'coop_listen_relay' || type === 'coop_listen_judge' || type === 'coop_spell_word')) {
        if (typeof speakWord === 'function' && q.audio) {
            // 通过 Web Speech API 调低语速（如可用）
            if (window.speechSynthesis) {
                var utt = new SpeechSynthesisUtterance(q.audio);
                utt.rate = 0.8;
                window.speechSynthesis.speak(utt);
            } else {
                speakWord(q.audio);
            }
        }
    }

    // coop_listen_relay Level 2：在播放按钮旁加"慢速"徽章，提示学生按钮状态变了
    if (level === 2 && type === 'coop_listen_relay') {
        var lrPlayBtn = container.querySelector('.play-sound-btn');
        if (lrPlayBtn && !lrPlayBtn.parentNode.querySelector('.scaffold-badge')) {
            var badge = document.createElement('span');
            badge.className = 'scaffold-badge';
            badge.textContent = '慢速';
            lrPlayBtn.parentNode.insertBefore(badge, lrPlayBtn.nextSibling);
        }
    }

    // coop_listen_relay Level 3：首音提示 —— 用慢速重读关键词 2 次
    if (level === 3 && type === 'coop_listen_relay') {
        if (window.speechSynthesis && q.audio) {
            var lrUtt1 = new SpeechSynthesisUtterance(q.audio);
            lrUtt1.rate = 0.6;
            window.speechSynthesis.speak(lrUtt1);
            setTimeout(function() {
                var lrUtt2 = new SpeechSynthesisUtterance(q.audio);
                lrUtt2.rate = 0.6;
                window.speechSynthesis.speak(lrUtt2);
            }, 1200);
        } else if (typeof speakWord === 'function' && q.audio) {
            speakWord(q.audio);
            setTimeout(function() { speakWord(q.audio); }, 1200);
        }
    }

    // coop_listen_relay Level 4：正确答案图片描边脉冲 + 音频重播（保留"选对的"动作）
    if (level === 4 && type === 'coop_listen_relay') {
        if (typeof speakWord === 'function' && q.audio) {
            speakWord(q.audio);
        }
        // q.stepA.correct 是正确单词；listen_relay 是图片选项，按 img src 或 innerHTML 匹配
        var lrCorrect = (q.stepA && q.stepA.correct) ? q.stepA.correct : '';
        if (lrCorrect) {
            var lrCards = container.querySelectorAll('.coop-option-card');
            for (var li = 0; li < lrCards.length; li++) {
                var lrImg = lrCards[li].querySelector('img');
                var lrKey = lrImg ? (lrImg.getAttribute('src') || '') : lrCards[li].textContent;
                if (lrKey && lrKey.indexOf(lrCorrect) !== -1) {
                    lrCards[li].classList.add('scaffold-glow');
                    break;
                }
            }
        }
    }

    // coop_listen_sort Level 2：慢速重播整段序列
    if (level === 2 && type === 'coop_listen_sort') {
        if (window.speechSynthesis && q.sequence && q.sequence.length) {
            var lsDelay = 0;
            q.sequence.forEach(function(w) {
                setTimeout(function() {
                    var u = new SpeechSynthesisUtterance(w);
                    u.rate = 0.6;
                    window.speechSynthesis.speak(u);
                }, lsDelay);
                lsDelay += 1500;
            });
        } else if (typeof speakWord === 'function' && q.sequence) {
            var lsDelay2 = 0;
            q.sequence.forEach(function(w) {
                setTimeout(function() { speakWord(w); }, lsDelay2);
                lsDelay2 += 1500;
            });
        }
    }

    // coop_listen_sort Level 3：每个词慢速重读 2 次（不给顺序答案）
    if (level === 3 && type === 'coop_listen_sort') {
        if (window.speechSynthesis && q.sequence && q.sequence.length) {
            var ls3Delay = 0;
            q.sequence.forEach(function(w) {
                setTimeout(function() {
                    var u1 = new SpeechSynthesisUtterance(w);
                    u1.rate = 0.5;
                    window.speechSynthesis.speak(u1);
                }, ls3Delay);
                setTimeout(function() {
                    var u2 = new SpeechSynthesisUtterance(w);
                    u2.rate = 0.5;
                    window.speechSynthesis.speak(u2);
                }, ls3Delay + 1200);
                ls3Delay += 2500;
            });
        }
    }

    // coop_listen_sort Level 4：第一张正确图片边框脉冲闪烁
    if (level === 4 && type === 'coop_listen_sort') {
        var lsFirst = (q.sequence && q.sequence.length) ? q.sequence[0] : '';
        if (lsFirst) {
            var lsCards = container.querySelectorAll('.coop-option-card');
            for (var lsi = 0; lsi < lsCards.length; lsi++) {
                if (lsCards[lsi].dataset && lsCards[lsi].dataset.value === lsFirst) {
                    lsCards[lsi].classList.add('scaffold-glow');
                    break;
                }
                var lsImg = lsCards[lsi].querySelector('img');
                var lsKey = lsImg ? (lsImg.getAttribute('src') || '') : lsCards[lsi].textContent;
                if (lsKey && lsKey.indexOf(lsFirst) !== -1) {
                    lsCards[lsi].classList.add('scaffold-glow');
                    break;
                }
            }
        }
    }

    // coop_listen_scenario Level 2：A步慢速重播场景音频；B步无特殊行为
    if (level === 2 && type === 'coop_listen_scenario') {
        var lscSidePhase2 = (window.adventureState && window.adventureState.coopPhase) || 'A';
        if (lscSidePhase2 !== 'B') {
            if (window.speechSynthesis && q.audio) {
                var lscU = new SpeechSynthesisUtterance(q.audio);
                lscU.rate = 0.6;
                window.speechSynthesis.speak(lscU);
            } else if (typeof speakWord === 'function' && q.audio) {
                speakWord(q.audio);
            }
        }
    }

    // coop_listen_scenario Level 3：A步关键词慢速重读 2 次（用 stepA.correct 作为关键词）
    if (level === 3 && type === 'coop_listen_scenario') {
        var lscSidePhase3 = (window.adventureState && window.adventureState.coopPhase) || 'A';
        if (lscSidePhase3 !== 'B') {
            var lscKey = (q.stepA && q.stepA.correct) ? q.stepA.correct : '';
            if (lscKey && window.speechSynthesis) {
                var lscU1 = new SpeechSynthesisUtterance(lscKey);
                lscU1.rate = 0.5;
                window.speechSynthesis.speak(lscU1);
                setTimeout(function() {
                    var lscU2 = new SpeechSynthesisUtterance(lscKey);
                    lscU2.rate = 0.5;
                    window.speechSynthesis.speak(lscU2);
                }, 1200);
            } else if (lscKey && typeof speakWord === 'function') {
                speakWord(lscKey);
                setTimeout(function() { speakWord(lscKey); }, 1200);
            }
        }
    }

    // coop_sentence_sort Level 2：播整句音频
    if (level === 2 && type === 'coop_sentence_sort') {
        if (typeof speakWord === 'function' && q.sentence) {
            speakWord(q.sentence);
        }
    }

    // coop_read_relay Level 2：重播示范音频
    if (level === 2 && type === 'coop_read_relay') {
        if (typeof speakWord === 'function' && q.word) {
            speakWord(q.word);
        }
    }

    // coop_dialogue Level 2：重播当前角色台词音频
    if (level === 2 && type === 'coop_dialogue') {
        if (typeof speakWord === 'function') {
            var dlPhase = (window.adventureState && window.adventureState.coopPhase) || 'A';
            var dlLine = dlPhase === 'B' ? ((q.stepB && q.stepB.line) || '') : ((q.stepA && q.stepA.line) || '');
            if (dlLine) speakWord(dlLine);
        }
    }

    // coop_relay_fill Level 2：播关键词音频（数据无 q.audio，退而读 stepA.correct）
    if (level === 2 && type === 'coop_relay_fill') {
        if (typeof speakWord === 'function') {
            var rfWord = (q.stepA && q.stepA.correct) || (q.stepB && q.stepB.correct) || '';
            if (rfWord) speakWord(rfWord);
        }
    }

    // coop_flip_match Level 3：闪烁一张正确牌
    if (level === 3 && type === 'coop_flip_match') {
        var flipCards = container.querySelectorAll('.coop-flip-card:not(.matched)');
        if (flipCards.length > 0) {
            var target = flipCards[0];
            target.style.animation = 'scaffoldFlicker 0.8s ease 3';
            setTimeout(function() { target.style.animation = ''; }, 2400);
        }
    }

    // coop_spell_word Level 3：正确字母格闪烁
    if (level === 3 && type === 'coop_spell_word') {
        var emptySlots = container.querySelectorAll('.spell-slot.spell-slot-empty');
        if (emptySlots.length > 0) {
            emptySlots[0].style.animation = 'scaffoldFlicker 0.8s ease 3';
            setTimeout(function() { emptySlots[0].style.animation = ''; }, 2400);
        }
    }

    // coop_build_sentence Level 3：高亮第一个词块
    if (level === 3 && type === 'coop_build_sentence') {
        var chips = container.querySelectorAll('.duo-word-chip:not(.duo-used)');
        if (chips.length > 0) {
            chips[0].style.outline = '3px solid #2196F3';
            chips[0].style.animation = 'scaffoldFlicker 0.8s ease 3';
            setTimeout(function() {
                if (chips[0]) { chips[0].style.outline = ''; chips[0].style.animation = ''; }
            }, 2400);
        }
    }

    // coop_read_scenario Level 2 (B step)：播放正确动物发音
    if (level === 2 && type === 'coop_read_scenario') {
        var rsPhase2 = (window.adventureState && window.adventureState.coopPhase) || 'A';
        if (rsPhase2 === 'B') {
            var rsBWord = (q.stepB && q.stepB.correct) || '';
            if (rsBWord && typeof speakWord === 'function') {
                speakWord(rsBWord);
            }
        }
    }

    // coop_read_scenario Level 4 (B step)：正确动物图片高亮
    if (level === 4 && type === 'coop_read_scenario') {
        var rsPhase4 = (window.adventureState && window.adventureState.coopPhase) || 'A';
        if (rsPhase4 === 'B') {
            var rsBCorrect4 = (q.stepB && q.stepB.correct) || '';
            if (rsBCorrect4) {
                var rsCards = container.querySelectorAll('.coop-option-card');
                for (var rsi = 0; rsi < rsCards.length; rsi++) {
                    var rsImg = rsCards[rsi].querySelector('img');
                    var rsKey = rsImg ? (rsImg.getAttribute('src') || '') : rsCards[rsi].textContent;
                    if (rsKey && rsKey.indexOf(rsBCorrect4) !== -1) {
                        rsCards[rsi].classList.add('scaffold-glow');
                        break;
                    }
                }
            }
        }
    }

    // coop_word_relay Level 4：播放正确单词音频 + 图片放大高亮
    if (level === 4 && type === 'coop_word_relay') {
        var wrWord4 = (q.stepA && q.stepA.correct) ? q.stepA.correct : '';
        if (typeof speakWord === 'function' && wrWord4) {
            speakWord(wrWord4);
        }
        var wrImg = container.querySelector('img');
        if (wrImg) {
            wrImg.style.transform = 'scale(1.15)';
            wrImg.style.transition = 'transform 0.4s';
            wrImg.style.outline = '3px solid #2196F3';
            wrImg.style.outlineOffset = '4px';
        }
    }

    // coop_sentence_sort Level 3：高亮第一个词块
    if (level === 3 && type === 'coop_sentence_sort') {
        var wordCards = container.querySelectorAll('.coop-option-card.word-card:not(.picked)');
        if (wordCards.length > 0 && q.sentence) {
            var firstWord = q.sentence.split(' ')[0];
            for (var i = 0; i < wordCards.length; i++) {
                if (wordCards[i].textContent.trim() === firstWord) {
                    wordCards[i].style.outline = '3px solid #2196F3';
                    wordCards[i].style.animation = 'scaffoldFlicker 0.8s ease 3';
                    setTimeout(function(c) { c.style.outline = ''; c.style.animation = ''; }
                        .bind(null, wordCards[i]), 2400);
                    break;
                }
            }
        }
    }

}

/**
 * adventure.js 调用的：在重渲染时恢复已有支架显示
 */
function showScaffoldForLevel(qIndex, maxLevel, q, container) {
    for (var lv = 1; lv <= maxLevel; lv++) {
        applyScaffold(qIndex, lv, q, container);
    }
}

// 暴露给 adventure.js
window.applyScaffold = applyScaffold;
window.showScaffoldForLevel = showScaffoldForLevel;

// ===== 在答错回调中触发支架 =====
// adventure.js 的 handleCoopRetry 在升级支架后会重新 renderCoopQuestion
// renderCoopQuestion 内部会调用 showScaffoldForLevel
// 因此此处无需额外 hook，架构已完备

// ===== 词义配对热身 =====
/**
 * renderWarmupMatch(station, container, onComplete)
 * 在进入 coop_sentence_sort 站点时，先做一次词义配对热身。
 * A同学配左边2对（indices 0,1），B同学配右边2对（indices 2,3）。
 * 退出条件：全部配对正确 OR 60秒倒计时到0。
 */
function renderWarmupMatch(station, container, onComplete) {
    // 任务1：获取真实学生名字
    var roleA = window.currentCoopRoleA !== undefined ? window.currentCoopRoleA : 0;
    var roleB = 1 - roleA;
    var nameA = getPlayerShortName(roleA);
    var nameB = getPlayerShortName(roleB);

    // 任务2：自动从本站所有题目提取词表
    var wordDict = {
        "This": "这", "That": "那", "is": "是", "are": "是",
        "a": "一只", "an": "一只", "It's": "它是", "It": "它",
        "big": "大", "small": "小", "cute": "可爱",
        "can": "能", "run": "跑", "fast": "快",
        "bear": "熊", "horse": "马", "bird": "鸟",
        "panda": "熊猫", "rabbit": "兔子", "monkey": "猴子", "duck": "鸭子",
        "Look": "看"
    };

    // 优先用 station.warmup.pairs 补充字典
    if (station.warmup && station.warmup.pairs) {
        station.warmup.pairs.forEach(function(p) {
            if (p.word && p.chinese && !wordDict[p.word]) {
                wordDict[p.word] = p.chinese;
            }
        });
    }

    // 从 station.questions 提取所有 words，去重去标点，过滤出有字典对应的词
    var seen = {};
    var pairs = [];
    if (station.questions && station.questions.length > 0) {
        station.questions.forEach(function(q) {
            if (q.words && Array.isArray(q.words)) {
                q.words.forEach(function(w) {
                    // 去掉末尾标点（句号/感叹号/问号/逗号）
                    var clean = w.replace(/[.,!?]+$/, '');
                    if (!seen[clean] && wordDict[clean]) {
                        seen[clean] = true;
                        pairs.push({ word: clean, chinese: wordDict[clean] });
                    }
                });
            }
        });
    }

    // 兜底：如果从 questions 里取不到，用 warmup.pairs
    if (pairs.length === 0 && station.warmup && station.warmup.pairs) {
        pairs = station.warmup.pairs;
    }

    // 最多8对
    if (pairs.length > 8) { pairs = pairs.slice(0, 8); }

    if (pairs.length === 0) { onComplete(); return; }

    // 状态
    var matched = new Array(pairs.length).fill(false); // 每对是否已配对成功
    var selectedWordIdx = null; // 当前高亮的英文词索引
    var timeLeft = 60;
    var timer = null;
    var done = false;

    // 中文顺序 shuffle（hoist 到 closure 作用域，render 内不再重算，避免每次点击画面跳动）
    var chineseOrder = pairs.map(function(_, i) { return i; });
    for (var si = chineseOrder.length - 1; si > 0; si--) {
        var sj = Math.floor(Math.random() * (si + 1));
        var st = chineseOrder[si]; chineseOrder[si] = chineseOrder[sj]; chineseOrder[sj] = st;
    }
    // 防退化：如果 shuffle 后完全不变，强制交换前两项
    var unchanged = chineseOrder.every(function(v, i) { return v === i; });
    if (unchanged && chineseOrder.length >= 2) {
        var _t = chineseOrder[0]; chineseOrder[0] = chineseOrder[1]; chineseOrder[1] = _t;
    }

    // A/B 区划分点（前一半算 A 区）
    var aZoneEnd = Math.floor(pairs.length / 2);

    function finish() {
        if (done) return;
        done = true;
        clearInterval(timer);
        onComplete();
    }

    function checkAllMatched() {
        return matched.every(function(v) { return v; });
    }

    function render() {
        container.innerHTML = '';

        // 标题区
        var titleEl = document.createElement('div');
        titleEl.style.cssText = 'text-align:center;font-size:20px;font-weight:bold;color:#333;padding:14px 0 6px;';
        titleEl.textContent = '🔥 热身：词义配对！';
        container.appendChild(titleEl);

        // 说明
        var desc = document.createElement('div');
        desc.style.cssText = 'text-align:center;font-size:13px;color:#888;margin-bottom:8px;';
        desc.textContent = '点英文词 → 再点中文词，完成配对';
        container.appendChild(desc);

        // 倒计时
        var timerEl = document.createElement('div');
        timerEl.id = 'warmup-timer';
        timerEl.style.cssText = 'text-align:center;font-size:16px;font-weight:bold;color:' + (timeLeft <= 10 ? '#ff4b4b' : '#58cc02') + ';margin-bottom:10px;';
        timerEl.textContent = '⏱ ' + timeLeft + 's';
        container.appendChild(timerEl);

        // 角色提示
        var roleEl = document.createElement('div');
        roleEl.style.cssText = 'display:flex;justify-content:space-around;font-size:12px;color:#fff;margin-bottom:8px;padding:0 10px;';
        roleEl.innerHTML =
            '<span style="background:#4A90E2;padding:3px 10px;border-radius:10px;">👤 ' + nameA + '</span>' +
            '<span style="background:#E2844A;padding:3px 10px;border-radius:10px;">👤 ' + nameB + '</span>';
        container.appendChild(roleEl);

        // 配对区
        var grid = document.createElement('div');
        grid.style.cssText = 'display:flex;gap:10px;padding:0 12px;';

        // chineseOrder 已在 closure 作用域生成（稳定 shuffle，render 内不重算）

        // 左列：英文词
        var leftCol = document.createElement('div');
        leftCol.style.cssText = 'flex:1;display:flex;flex-direction:column;gap:8px;';

        // 右列：中文词
        var rightCol = document.createElement('div');
        rightCol.style.cssText = 'flex:1;display:flex;flex-direction:column;gap:8px;';

        // 分隔线（视觉区分AB）
        var divider = document.createElement('div');
        divider.style.cssText = 'width:2px;background:linear-gradient(to bottom,#4A90E2 50%,#E2844A 50%);border-radius:2px;';

        for (var i = 0; i < pairs.length; i++) {
            (function(idx) {
                var chIdx = chineseOrder[idx]; // 这个位置显示哪个中文
                var isAZone = idx < aZoneEnd;

                // 英文词块
                var wordBtn = document.createElement('div');
                wordBtn.dataset.wordIdx = idx;
                var wordBg = matched[idx] ? '#b7eb8f' : (selectedWordIdx === idx ? '#91d5ff' : (isAZone ? '#e6f0ff' : '#fff3e0'));
                var wordBorder = matched[idx] ? '2px solid #52c41a' : (selectedWordIdx === idx ? '2px solid #1890ff' : '2px solid ' + (isAZone ? '#4A90E2' : '#E2844A'));
                wordBtn.style.cssText = 'background:' + wordBg + ';border:' + wordBorder + ';border-radius:10px;padding:10px 8px;text-align:center;font-size:22px;font-weight:bold;color:#333;cursor:pointer;min-height:48px;display:flex;align-items:center;justify-content:center;transition:all 0.15s;';
                wordBtn.textContent = pairs[idx].word;
                if (!matched[idx]) {
                    wordBtn.addEventListener('click', function() { onWordClick(idx); });
                }
                leftCol.appendChild(wordBtn);

                // 中文词块（乱序展示）
                var cnBtn = document.createElement('div');
                cnBtn.dataset.cnIdx = chIdx;
                var cnBg = matched[chIdx] ? '#b7eb8f' : (isAZone ? '#e6f0ff' : '#fff3e0');
                var cnBorder = matched[chIdx] ? '2px solid #52c41a' : '2px solid #E2844A';
                cnBtn.style.cssText = 'background:' + cnBg + ';border:' + cnBorder + ';border-radius:10px;padding:10px 8px;text-align:center;font-size:22px;font-weight:bold;color:#333;cursor:pointer;min-height:48px;display:flex;align-items:center;justify-content:center;transition:all 0.15s;';
                cnBtn.textContent = pairs[chIdx].chinese;
                if (!matched[chIdx]) {
                    cnBtn.addEventListener('click', function() { onChineseClick(chIdx); });
                }
                rightCol.appendChild(cnBtn);
            })(i);
        }

        grid.appendChild(leftCol);
        grid.appendChild(divider);
        grid.appendChild(rightCol);
        container.appendChild(grid);

        // 跳过按钮
        var skipBtn = document.createElement('div');
        skipBtn.style.cssText = 'text-align:center;margin-top:18px;';
        skipBtn.innerHTML = '<span style="color:#bbb;font-size:13px;cursor:pointer;text-decoration:underline;" id="warmup-skip">跳过热身</span>';
        container.appendChild(skipBtn);
        var skipEl = document.getElementById('warmup-skip');
        if (skipEl) skipEl.addEventListener('click', finish);
    }

    function flashError(container, idx, chIdx) {
        // 找到对应的词块，让它们变红闪烁再恢复
        var wordBtns = container.querySelectorAll('[data-word-idx]');
        var cnBtns = container.querySelectorAll('[data-cn-idx]');
        var wBtn = null, cBtn = null;
        for (var i = 0; i < wordBtns.length; i++) {
            if (parseInt(wordBtns[i].dataset.wordIdx) === idx) { wBtn = wordBtns[i]; break; }
        }
        for (var i = 0; i < cnBtns.length; i++) {
            if (parseInt(cnBtns[i].dataset.cnIdx) === chIdx) { cBtn = cnBtns[i]; break; }
        }
        if (wBtn) { wBtn.style.background = '#ffccc7'; wBtn.style.border = '2px solid #ff4d4f'; }
        if (cBtn) { cBtn.style.background = '#ffccc7'; cBtn.style.border = '2px solid #ff4d4f'; }
        setTimeout(function() {
            selectedWordIdx = null;
            render();
        }, 600);
    }

    function onWordClick(idx) {
        if (matched[idx]) return;
        selectedWordIdx = idx;
        render();
    }

    function onChineseClick(chIdx) {
        if (matched[chIdx]) return;
        if (selectedWordIdx === null) return;
        // 判断是否配对正确：pairs[selectedWordIdx].chinese === pairs[chIdx].chinese
        if (selectedWordIdx === chIdx) {
            // 正确
            matched[chIdx] = true;
            selectedWordIdx = null;
            render();
            if (checkAllMatched()) {
                setTimeout(finish, 500);
            }
        } else {
            // 错误：闪烁后恢复
            var errWordIdx = selectedWordIdx;
            selectedWordIdx = null;
            flashError(container, errWordIdx, chIdx);
        }
    }

    // 启动倒计时
    timer = setInterval(function() {
        timeLeft--;
        var timerEl = document.getElementById('warmup-timer');
        if (timerEl) {
            timerEl.style.color = timeLeft <= 10 ? '#ff4b4b' : '#58cc02';
            timerEl.textContent = '⏱ ' + timeLeft + 's';
        }
        if (timeLeft <= 0) {
            finish();
        }
    }, 1000);

    render();
}

// ===== 海报Project渲染 =====

/**
 * 渲染海报制作的当前步骤
 * @param {Object} posterData - 当前海报数据
 * @param {number} stepIndex - 当前步骤索引 (0-based)
 * @param {HTMLElement} container - 渲染容器
 * @param {Object} posterState - 已选内容 {animal:'bear', intro:'This is a bear.', ...}
 * @param {Function} onStepComplete - 步骤完成回调 (field, value)
 */
function renderPosterStep(posterData, stepIndex, container, posterState, onStepComplete) {
    container.innerHTML = '';
    var step = posterData.steps[stepIndex];
    if (!step) return;

    var roleA = (typeof window.currentCoopRoleA === 'number') ? window.currentCoopRoleA : 0;
    var roleB = 1 - roleA;

    // 步骤5：预览
    if (step.type === 'preview') {
        renderPosterPreview(posterData, posterState, container, onStepComplete);
        return;
    }

    // 步骤指示
    var roleIndex = step.role === 'A' ? roleA : roleB;
    var roleName = getPlayerShortName(roleIndex);
    var roleColor = step.role === 'A' ? '#4A90D9' : '#F5A623';
    var instruction = step.instruction;
    // 替换{animal}/{clothing}等占位符
    for (var key in posterState) {
        instruction = instruction.replace('{' + key + '}', posterState[key]);
    }

    var headerDiv = document.createElement('div');
    headerDiv.style.cssText = 'text-align:center;margin-bottom:16px;';
    headerDiv.innerHTML = '<div style="font-size:13px;color:#999;margin-bottom:4px;">步骤 ' + (stepIndex + 1) + ' / 5</div>' +
        '<div style="display:inline-block;padding:6px 16px;border-radius:20px;background:' + roleColor + ';color:#fff;font-size:15px;font-weight:bold;">' +
        roleName + '：' + instruction + '</div>';
    container.appendChild(headerDiv);

    // 实时海报预览（小版）
    if (Object.keys(posterState).length > 0) {
        var miniPreview = document.createElement('div');
        miniPreview.style.cssText = 'max-width:280px;margin:0 auto 16px;padding:12px;border-radius:12px;background:' + posterData.bgColor + ';border:2px solid ' + posterData.borderColor + ';text-align:center;';
        var previewHTML = '<div style="font-size:14px;font-weight:bold;color:#555;margin-bottom:6px;">' + posterData.title + '</div>';
        if (posterState.animal) {
            previewHTML += '<div style="margin:4px 0;"><img src="assets/images/' + posterState.animal + '.png" style="max-height:60px;width:auto;" onerror="this.style.display=\'none\'"></div>';
        }
        if (posterState.clothing) {
            previewHTML += '<div style="margin:4px 0;"><img src="assets/images/' + posterState.clothing.toLowerCase().replace(/ /g, '-') + '.png" style="max-height:60px;width:auto;" onerror="this.style.display=\'none\'"></div>';
        }
        var textFields = ['intro', 'feature', 'ability', 'time', 'activity', 'place', 'feeling', 'meal', 'food', 'drink', 'fruit', 'size', 'color', 'match'];
        for (var ti = 0; ti < textFields.length; ti++) {
            if (posterState[textFields[ti]]) {
                // 从选项文本中提取英文部分（去掉 "Size S — " 这类前缀后面的中文标注）
                var txt = posterState[textFields[ti]];
                if (txt.indexOf(' — ') > -1) txt = txt.split(' — ')[0];
                previewHTML += '<div style="font-size:13px;color:#333;line-height:1.5;">' + txt + '</div>';
            }
        }
        miniPreview.innerHTML = previewHTML;
        container.appendChild(miniPreview);
    }

    // 选项区域
    var optionsDiv = document.createElement('div');

    if (step.type === 'select_image') {
        optionsDiv.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:320px;margin:0 auto;';
        var opts = step.options;
        for (var i = 0; i < opts.length; i++) {
            (function(opt) {
                var card = document.createElement('div');
                card.style.cssText = 'text-align:center;padding:12px;border-radius:12px;border:3px solid #e5e5e5;background:#fff;cursor:pointer;transition:all 0.2s;';
                card.innerHTML = '<img src="' + opt.image + '" style="max-height:70px;width:auto;display:block;margin:0 auto;" onerror="this.outerHTML=\'<div style=\\\'font-size:40px;\\\'>' + opt.label + '</div>\'">' +
                    '<div style="font-size:14px;color:#333;margin-top:6px;font-weight:bold;">' + opt.label + '</div>' +
                    '<div style="font-size:12px;color:#999;">' + opt.value + '</div>';
                card.onclick = function() {
                    // 高亮选中
                    var siblings = optionsDiv.children;
                    for (var s = 0; s < siblings.length; s++) {
                        siblings[s].style.borderColor = '#e5e5e5';
                        siblings[s].style.background = '#fff';
                    }
                    card.style.borderColor = roleColor;
                    card.style.background = roleColor + '15';
                    // 显示确认按钮
                    showConfirmBtn(opt.value);
                };
                optionsDiv.appendChild(card);
            })(opts[i]);
        }
    } else if (step.type === 'select_text') {
        optionsDiv.style.cssText = 'max-width:320px;margin:0 auto;';
        var textOpts = step.optionsMap ? (step.optionsMap[posterState[posterData.steps[0].field]] || step.options || []) : (step.options || []);
        for (var j = 0; j < textOpts.length; j++) {
            (function(text, idx) {
                var btn = document.createElement('button');
                btn.style.cssText = 'display:block;width:100%;padding:14px 16px;margin-bottom:8px;font-size:16px;font-weight:600;border:3px solid #e5e5e5;border-radius:12px;background:#fff;color:#333;cursor:pointer;text-align:left;transition:all 0.2s;';
                btn.textContent = text;
                btn.onclick = function() {
                    // 高亮
                    var siblings = optionsDiv.querySelectorAll('button');
                    for (var s = 0; s < siblings.length; s++) {
                        siblings[s].style.borderColor = '#e5e5e5';
                        siblings[s].style.background = '#fff';
                    }
                    btn.style.borderColor = roleColor;
                    btn.style.background = roleColor + '15';
                    showConfirmBtn(text);
                };
                optionsDiv.appendChild(btn);
            })(textOpts[j], j);
        }
    }

    container.appendChild(optionsDiv);

    // 确认按钮（选完后出现）
    var confirmDiv = document.createElement('div');
    confirmDiv.id = 'poster-confirm-area';
    confirmDiv.style.cssText = 'text-align:center;margin-top:16px;display:none;';
    container.appendChild(confirmDiv);

    function showConfirmBtn(selectedValue) {
        confirmDiv.style.display = 'block';
        confirmDiv.innerHTML = '';
        var confirmBtn = document.createElement('button');
        confirmBtn.style.cssText = 'padding:14px 40px;font-size:17px;font-weight:bold;border:none;border-radius:16px;background:linear-gradient(135deg,#58cc02,#46a302);color:#fff;cursor:pointer;box-shadow:0 4px 0 #3d8f02;';
        confirmBtn.textContent = '确认选择';
        confirmBtn.onclick = function() {
            confirmBtn.disabled = true;
            confirmBtn.textContent = '已选择';
            // 如果需要审核
            if (step.reviewBy) {
                var reviewerIndex = step.reviewBy === 'A' ? roleA : roleB;
                var reviewerName = getPlayerShortName(reviewerIndex);
                renderPosterReview(selectedValue, reviewerName, step.reviewBy === 'A' ? '#4A90D9' : '#F5A623', container, function() {
                    // 审核通过
                    onStepComplete(step.field, selectedValue);
                }, function() {
                    // 打回，重新渲染本步骤
                    renderPosterStep(posterData, stepIndex, container, posterState, onStepComplete);
                });
            } else {
                onStepComplete(step.field, selectedValue);
            }
        };
        confirmDiv.appendChild(confirmBtn);
        // 滚动到确认按钮
        setTimeout(function() {
            try { confirmBtn.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
            catch (e) { confirmBtn.scrollIntoView(true); }
        }, 100);
    }
}

/**
 * 渲染审核环节
 */
function renderPosterReview(selectedValue, reviewerName, reviewerColor, container, onApprove, onReject) {
    var reviewDiv = document.createElement('div');
    reviewDiv.style.cssText = 'max-width:320px;margin:16px auto;padding:16px;border-radius:16px;border:3px solid ' + reviewerColor + ';background:#fff;text-align:center;';
    reviewDiv.innerHTML = '<div style="font-size:14px;color:#666;margin-bottom:8px;">' + reviewerName + ' 来审核</div>' +
        '<div style="font-size:18px;font-weight:bold;color:#333;margin-bottom:16px;line-height:1.4;">"' + selectedValue + '"</div>';

    var approveBtn = document.createElement('button');
    approveBtn.style.cssText = 'padding:12px 28px;font-size:16px;font-weight:bold;border:none;border-radius:12px;background:#4CAF50;color:#fff;cursor:pointer;margin-right:12px;';
    approveBtn.textContent = '✓ 确认';
    approveBtn.onclick = function() {
        approveBtn.disabled = true;
        rejectBtn.disabled = true;
        onApprove();
    };

    var rejectBtn = document.createElement('button');
    rejectBtn.style.cssText = 'padding:12px 28px;font-size:16px;font-weight:bold;border:none;border-radius:12px;background:#FF5252;color:#fff;cursor:pointer;';
    rejectBtn.textContent = '↻ 换一个';
    rejectBtn.onclick = function() {
        approveBtn.disabled = true;
        rejectBtn.disabled = true;
        onReject();
    };

    reviewDiv.appendChild(approveBtn);
    reviewDiv.appendChild(rejectBtn);
    container.appendChild(reviewDiv);

    setTimeout(function() {
        try { reviewDiv.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        catch (e) { reviewDiv.scrollIntoView(true); }
    }, 100);
}

/**
 * 渲染完整海报预览（步骤5）
 */
function renderPosterPreview(posterData, posterState, container, onComplete) {
    var roleA = (typeof window.currentCoopRoleA === 'number') ? window.currentCoopRoleA : 0;
    var roleB = 1 - roleA;
    var nameA = getPlayerShortName(roleA);
    var nameB = getPlayerShortName(roleB);

    // 海报卡片
    var card = document.createElement('div');
    card.style.cssText = 'max-width:320px;margin:0 auto;border-radius:16px;padding:20px;background:' + posterData.bgColor + ';border:3px solid ' + posterData.borderColor + ';box-shadow:0 4px 16px rgba(0,0,0,0.1);text-align:center;transition:transform 0.6s;';

    // 标题
    var titleEl = document.createElement('div');
    titleEl.style.cssText = 'font-size:20px;font-weight:bold;color:#333;margin-bottom:12px;';
    titleEl.textContent = posterData.title;
    card.appendChild(titleEl);

    // 图片（动物或衣服）
    var imgField = posterState.animal || posterState.clothing;
    if (imgField) {
        var imgSrc = 'assets/images/' + imgField.toLowerCase().replace(/ /g, '-') + '.png';
        var imgDiv = document.createElement('div');
        imgDiv.style.cssText = 'margin:8px 0;';
        imgDiv.innerHTML = '<img src="' + imgSrc + '" style="max-height:120px;width:auto;display:block;margin:0 auto;" onerror="this.style.display=\'none\'">';
        card.appendChild(imgDiv);
    }

    // 文字行（逐行fade in）
    var textFields = ['intro', 'feature', 'ability', 'time', 'activity', 'place', 'feeling', 'meal', 'food', 'drink', 'fruit', 'size', 'color', 'match'];
    var lineDelay = 0;
    for (var i = 0; i < textFields.length; i++) {
        if (posterState[textFields[i]]) {
            (function(txt, delay) {
                // 清理显示文本
                var displayTxt = txt;
                if (displayTxt.indexOf(' — ') > -1) displayTxt = displayTxt.split(' — ')[0];
                var line = document.createElement('div');
                line.style.cssText = 'font-size:18px;line-height:1.6;color:#333;opacity:0;transform:translateY(8px);transition:all 0.4s ease;';
                line.textContent = displayTxt;
                card.appendChild(line);
                setTimeout(function() {
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                }, 200 + delay * 300);
            })(posterState[textFields[i]], lineDelay);
            lineDelay++;
        }
    }

    // Made by
    var madeBy = document.createElement('div');
    madeBy.style.cssText = 'font-size:13px;color:#999;margin-top:16px;padding-top:12px;border-top:1px dashed #ccc;';
    madeBy.textContent = 'Made by ' + nameA + ' & ' + nameB;
    card.appendChild(madeBy);

    container.appendChild(card);

    // 按钮区域
    var btnArea = document.createElement('div');
    btnArea.style.cssText = 'text-align:center;margin-top:20px;';

    var editUsed = false;

    var editBtn = document.createElement('button');
    editBtn.style.cssText = 'padding:12px 24px;font-size:15px;font-weight:bold;border:2px solid #F5A623;border-radius:12px;background:#fff;color:#F5A623;cursor:pointer;margin-right:12px;';
    editBtn.textContent = '修改一处';
    editBtn.onclick = function() {
        if (editUsed) {
            editBtn.textContent = '只能改一处哦';
            editBtn.disabled = true;
            return;
        }
        editUsed = true;
        editBtn.disabled = true;
        editBtn.style.opacity = '0.5';
        // 显示可修改字段列表
        showEditOptions();
    };
    btnArea.appendChild(editBtn);

    var doneBtn = document.createElement('button');
    doneBtn.style.cssText = 'padding:12px 32px;font-size:17px;font-weight:bold;border:none;border-radius:12px;background:linear-gradient(135deg,#58cc02,#46a302);color:#fff;cursor:pointer;box-shadow:0 4px 0 #3d8f02;';
    doneBtn.textContent = '完成！';
    doneBtn.onclick = function() {
        doneBtn.disabled = true;
        editBtn.disabled = true;
        // 翻转动画
        card.style.transform = 'perspective(800px) rotateY(360deg)';
        setTimeout(function() {
            onComplete('done', posterState);
        }, 700);
    };
    btnArea.appendChild(doneBtn);

    container.appendChild(btnArea);

    function showEditOptions() {
        var editDiv = document.createElement('div');
        editDiv.style.cssText = 'max-width:320px;margin:16px auto;padding:12px;border-radius:12px;border:2px dashed #F5A623;background:#FFF8E1;';
        editDiv.innerHTML = '<div style="font-size:14px;color:#795548;margin-bottom:8px;font-weight:bold;">选择要修改的内容：</div>';

        var editableFields = [];
        for (var k = 0; k < textFields.length; k++) {
            if (posterState[textFields[k]]) {
                editableFields.push(textFields[k]);
            }
        }

        for (var ef = 0; ef < editableFields.length; ef++) {
            (function(field) {
                var txt = posterState[field];
                if (txt.indexOf(' — ') > -1) txt = txt.split(' — ')[0];
                var fb = document.createElement('button');
                fb.style.cssText = 'display:block;width:100%;padding:10px;margin-bottom:6px;font-size:14px;border:2px solid #e5e5e5;border-radius:8px;background:#fff;cursor:pointer;text-align:left;';
                fb.textContent = txt;
                fb.onclick = function() {
                    // 找到对应步骤的选项
                    var targetStep = null;
                    for (var si = 0; si < posterData.steps.length; si++) {
                        if (posterData.steps[si].field === field) {
                            targetStep = posterData.steps[si];
                            break;
                        }
                    }
                    if (!targetStep) return;
                    // 显示该字段的选项列表
                    editDiv.innerHTML = '<div style="font-size:14px;color:#795548;margin-bottom:8px;font-weight:bold;">选一个新的：</div>';
                    var options = targetStep.optionsMap ? (targetStep.optionsMap[posterState[posterData.steps[0].field]] || targetStep.options || []) : (targetStep.options || []);
                    for (var oi = 0; oi < options.length; oi++) {
                        (function(optText) {
                            var ob = document.createElement('button');
                            ob.style.cssText = 'display:block;width:100%;padding:10px;margin-bottom:6px;font-size:14px;border:2px solid #e5e5e5;border-radius:8px;background:#fff;cursor:pointer;text-align:left;';
                            if (optText === posterState[field]) {
                                ob.style.borderColor = '#4CAF50';
                                ob.style.background = '#f0fce8';
                                ob.textContent = optText + ' (当前)';
                            } else {
                                ob.textContent = optText;
                            }
                            ob.onclick = function() {
                                posterState[field] = optText;
                                // 重新渲染预览
                                renderPosterPreview(posterData, posterState, container, onComplete);
                            };
                            editDiv.appendChild(ob);
                        })(options[oi]);
                    }
                };
                editDiv.appendChild(fb);
            })(editableFields[ef]);
        }

        container.appendChild(editDiv);
        setTimeout(function() {
            try { editDiv.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
            catch (e) { editDiv.scrollIntoView(true); }
        }, 100);
    }
}

window.renderPosterStep = renderPosterStep;
window.renderPosterPreview = renderPosterPreview;
window.renderPosterReview = renderPosterReview;

// ===== 暴露全局 =====
window.renderCoopType = renderCoopType;
window.renderCoopStepB = renderCoopStepB;
window.renderWarmupMatch = renderWarmupMatch;

console.log('🤝 Coop Types: Loaded');
