// daily-quests.js - 每日任务系统

var dailyQuestDefinitions = [
    {
        id: 'daily_20',
        name: '今日练习',
        icon: '🎯',
        description: '完成20道题',
        target: 20,
        reward: 10
    },
    {
        id: 'streak_5',
        name: '连胜挑战',
        icon: '🔥',
        description: '连续答对5题',
        target: 5,
        reward: 15
    },
    {
        id: 'duo_1',
        name: '找个搭档',
        icon: '🤝',
        description: '完成1次双人练习',
        target: 1,
        reward: 10
    },
    {
        id: 'review_1',
        name: '复习旧课',
        icon: '📚',
        description: '复习任意1课',
        target: 1,
        reward: 5
    }
];

// 获取每日任务数据
function getDailyQuestData() {
    var data = localStorage.getItem('merryDailyQuests');
    if (data) {
        return JSON.parse(data);
    }
    return {
        date: null,
        progress: {},      // { quest_id: current_count }
        completed: [],     // 已完成的任务ID
        claimed: []        // 已领取奖励的任务ID
    };
}

// 保存每日任务数据
function saveDailyQuestData(data) {
    localStorage.setItem('merryDailyQuests', JSON.stringify(data));
}

// 检查并重置每日任务（每天0点重置）
function checkDailyReset() {
    var today = new Date().toDateString();
    var data = getDailyQuestData();

    if (data.date !== today) {
        // 新的一天，重置任务
        data = {
            date: today,
            progress: {},
            completed: [],
            claimed: []
        };
        // 初始化每个任务的进度为0
        for (var i = 0; i < dailyQuestDefinitions.length; i++) {
            data.progress[dailyQuestDefinitions[i].id] = 0;
        }
        saveDailyQuestData(data);
    }

    return data;
}

// 更新任务进度
function updateQuestProgress(questId, increment) {
    var data = checkDailyReset();

    if (!data.progress[questId]) {
        data.progress[questId] = 0;
    }

    data.progress[questId] += increment;

    // 检查是否完成
    var quest = null;
    for (var i = 0; i < dailyQuestDefinitions.length; i++) {
        if (dailyQuestDefinitions[i].id === questId) {
            quest = dailyQuestDefinitions[i];
            break;
        }
    }

    if (quest && data.progress[questId] >= quest.target) {
        if (data.completed.indexOf(questId) === -1) {
            data.completed.push(questId);
        }
    }

    saveDailyQuestData(data);
    return data;
}

// 领取任务奖励
function claimQuestReward(questId) {
    var data = getDailyQuestData();

    // 检查是否已完成且未领取
    if (data.completed.indexOf(questId) !== -1 && data.claimed.indexOf(questId) === -1) {
        data.claimed.push(questId);
        saveDailyQuestData(data);

        // 返回奖励数
        for (var i = 0; i < dailyQuestDefinitions.length; i++) {
            if (dailyQuestDefinitions[i].id === questId) {
                return dailyQuestDefinitions[i].reward;
            }
        }
    }
    return 0;
}

// 处理答题后的任务更新
function processDailyQuests(isCorrect, currentStreak) {
    checkDailyReset();

    // 更新"今日练习"
    updateQuestProgress('daily_20', 1);

    // 更新"连胜挑战"
    if (isCorrect && currentStreak >= 5) {
        var data = getDailyQuestData();
        if (data.progress['streak_5'] < 5) {
            updateQuestProgress('streak_5', 5); // 直接完成
        }
    }

    // "找个搭档"在开始双人游戏时更新
    // "复习旧课"在选择复习时更新
}

// 标记双人练习完成
function markDuoPracticeComplete() {
    updateQuestProgress('duo_1', 1);
}

// 标记复习完成
function markReviewComplete() {
    updateQuestProgress('review_1', 1);
}

// 渲染每日任务面板
function renderDailyQuestsPanel() {
    var data = checkDailyReset();
    var completedCount = data.completed.length;
    var totalCount = dailyQuestDefinitions.length;

    var html = '<div style="background:white;border-radius:16px;padding:15px;margin:10px;box-shadow:0 4px 15px rgba(0,0,0,0.1);">';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">';
    html += '<span style="font-size:18px;font-weight:bold;color:#FF7043;">📋 今日任务</span>';
    html += '<span style="background:#FFE0B2;padding:4px 12px;border-radius:12px;font-size:14px;color:#E65100;">' + completedCount + '/' + totalCount + '</span>';
    html += '</div>';

    for (var i = 0; i < dailyQuestDefinitions.length; i++) {
        var quest = dailyQuestDefinitions[i];
        var progress = data.progress[quest.id] || 0;
        var isCompleted = data.completed.indexOf(quest.id) !== -1;
        var isClaimed = data.claimed.indexOf(quest.id) !== -1;
        var percentage = Math.min(100, Math.round((progress / quest.target) * 100));

        var statusIcon = isClaimed ? '✅' : (isCompleted ? '🎁' : '⏳');
        var bgColor = isClaimed ? '#E8F5E9' : (isCompleted ? '#FFF8E1' : '#FAFAFA');
        var borderColor = isClaimed ? '#4CAF50' : (isCompleted ? '#FFC107' : '#E0E0E0');

        html += '<div style="background:' + bgColor + ';border:2px solid ' + borderColor + ';border-radius:12px;padding:12px;margin-bottom:10px;">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;">';
        html += '<div>';
        html += '<span style="font-size:20px;margin-right:8px;">' + quest.icon + '</span>';
        html += '<span style="font-weight:bold;">' + quest.name + '</span>';
        html += '</div>';
        html += '<div style="display:flex;align-items:center;">';
        html += '<span style="color:#58cc02;font-weight:bold;margin-right:8px;">⭐+' + quest.reward + '</span>';
        html += '<span>' + statusIcon + '</span>';
        html += '</div></div>';

        // 进度条
        html += '<div style="margin-top:8px;">';
        html += '<div style="height:8px;background:#E0E0E0;border-radius:4px;overflow:hidden;">';
        html += '<div style="height:100%;width:' + percentage + '%;background:linear-gradient(90deg,#58cc02,#7ce800);border-radius:4px;transition:width 0.3s;"></div>';
        html += '</div>';
        html += '<div style="font-size:12px;color:#999;margin-top:4px;text-align:right;">' + progress + '/' + quest.target + '</div>';
        html += '</div>';

        // 领取按钮
        if (isCompleted && !isClaimed) {
            html += '<button onclick="onClaimQuest(\'' + quest.id + '\')" style="width:100%;margin-top:8px;padding:10px;background:linear-gradient(135deg,#FFD700,#FFA500);border:none;border-radius:8px;font-weight:bold;color:#333;cursor:pointer;">领取奖励</button>';
        }

        html += '</div>';
    }

    html += '</div>';
    return html;
}

// 领取奖励按钮点击
function onClaimQuest(questId) {
    var reward = claimQuestReward(questId);
    if (reward > 0) {
        // 更新成就系统的总星星
        var achData = getAchievementData();
        achData.totalStars += reward;
        saveAchievementData(achData);

        // 显示领取动画
        showRewardPopup(reward);

        // 重新渲染任务面板
        var container = document.getElementById('daily-quests-container');
        if (container) {
            container.innerHTML = renderDailyQuestsPanel();
        }
    }
}

// 显示奖励弹窗
function showRewardPopup(reward) {
    var popup = document.createElement('div');
    popup.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
        'background:linear-gradient(135deg,#58cc02,#7ce800);padding:30px 50px;border-radius:20px;' +
        'text-align:center;z-index:10000;box-shadow:0 10px 40px rgba(0,0,0,0.3);' +
        'animation:rewardPop 0.5s ease-out;';

    popup.innerHTML = '<div style="font-size:40px;margin-bottom:10px;">🎉</div>' +
        '<div style="font-size:24px;color:white;font-weight:bold;">+' + reward + ' ⭐</div>';

    document.body.appendChild(popup);

    // 添加动画
    if (!document.getElementById('reward-styles')) {
        var style = document.createElement('style');
        style.id = 'reward-styles';
        style.textContent = '@keyframes rewardPop{0%{transform:translate(-50%,-50%) scale(0);opacity:0}' +
            '50%{transform:translate(-50%,-50%) scale(1.2)}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}';
        document.head.appendChild(style);
    }

    setTimeout(function() {
        popup.style.transition = 'opacity 0.3s';
        popup.style.opacity = '0';
        setTimeout(function() {
            if (popup.parentNode) popup.remove();
        }, 300);
    }, 1500);
}
