// achievements.js - 成就系统数据和逻辑

var achievementDefinitions = [
    // ===== 学习成就 =====
    {
        id: 'first_answer',
        name: '小小学徒',
        emoji: '🐣',
        description: '完成第1次答题',
        condition: { type: 'total_questions', value: 1 },
        reward: 5
    },
    {
        id: 'ten_correct',
        name: '初露锋芒',
        emoji: '🐥',
        description: '累计答对10题',
        condition: { type: 'total_correct', value: 10 },
        reward: 10
    },
    {
        id: 'fifty_correct',
        name: '小有成就',
        emoji: '🐤',
        description: '累计答对50题',
        condition: { type: 'total_correct', value: 50 },
        reward: 20
    },
    {
        id: 'hundred_correct',
        name: '学习达人',
        emoji: '🐔',
        description: '累计答对100题',
        condition: { type: 'total_correct', value: 100 },
        reward: 50
    },
    {
        id: 'five_hundred_correct',
        name: '英语高手',
        emoji: '🦅',
        description: '累计答对500题',
        condition: { type: 'total_correct', value: 500 },
        reward: 100
    },

    // ===== 准确率成就 =====
    {
        id: 'perfect_round',
        name: '神枪手',
        emoji: '🎯',
        description: '单次测试100%正确',
        condition: { type: 'perfect_round', value: 1 },
        reward: 30
    },
    {
        id: 'streak_10',
        name: '连胜王',
        emoji: '🔥',
        description: '连续答对10题',
        condition: { type: 'max_streak', value: 10 },
        reward: 20
    },
    {
        id: 'speed_demon',
        name: '闪电侠',
        emoji: '⚡',
        description: '10题内平均<3秒/题',
        condition: { type: 'speed_round', value: 3 },
        reward: 25
    },

    // ===== 合作成就 =====
    {
        id: 'good_partner',
        name: '好搭档',
        emoji: '🤝',
        description: '与同一人合作3次',
        condition: { type: 'same_partner', value: 3 },
        reward: 15
    },
    {
        id: 'golden_duo',
        name: '黄金搭档',
        emoji: '👯',
        description: '与同一人合作10次',
        condition: { type: 'same_partner', value: 10 },
        reward: 30
    },
    {
        id: 'best_duo',
        name: '最佳拍档',
        emoji: '🏆',
        description: '合作正确率>90%',
        condition: { type: 'duo_accuracy', value: 90 },
        reward: 40
    },

    // ===== 坚持成就 =====
    {
        id: 'first_day',
        name: '初次打卡',
        emoji: '📅',
        description: '第1天使用App',
        condition: { type: 'days_active', value: 1 },
        reward: 5
    },
    {
        id: 'three_days',
        name: '三天小火',
        emoji: '🔥',
        description: '连续3天使用',
        condition: { type: 'consecutive_days', value: 3 },
        reward: 15
    },
    {
        id: 'one_week',
        name: '一周之星',
        emoji: '🌟',
        description: '连续7天使用',
        condition: { type: 'consecutive_days', value: 7 },
        reward: 30
    },
    {
        id: 'one_month',
        name: '坚持不懈',
        emoji: '💎',
        description: '连续30天使用',
        condition: { type: 'consecutive_days', value: 30 },
        reward: 100
    }
];

// 获取用户成就数据
function getAchievementData() {
    var data = localStorage.getItem('merryAchievements');
    if (data) {
        return JSON.parse(data);
    }
    return {
        earned: [],           // 已获得的成就ID
        progress: {
            total_questions: 0,   // 总答题数
            total_correct: 0,     // 总正确数
            max_streak: 0,        // 最长连胜
            current_streak: 0,    // 当前连胜
            days_active: 0,       // 活跃天数
            consecutive_days: 0,  // 连续天数
            partners: {}          // 搭档记录 { name: count }
        },
        lastActive: null,
        totalStars: 0
    };
}

// 保存用户成就数据
function saveAchievementData(data) {
    localStorage.setItem('merryAchievements', JSON.stringify(data));
}

// 检查并更新成就
function checkAndUpdateAchievements(isCorrect, partnerName) {
    var data = getAchievementData();
    var newAchievements = [];

    // 更新进度
    data.progress.total_questions++;

    if (isCorrect) {
        data.progress.total_correct++;
        data.progress.current_streak++;
        if (data.progress.current_streak > data.progress.max_streak) {
            data.progress.max_streak = data.progress.current_streak;
        }
    } else {
        data.progress.current_streak = 0;
    }

    // 更新搭档记录
    if (partnerName) {
        if (!data.progress.partners[partnerName]) {
            data.progress.partners[partnerName] = 0;
        }
        data.progress.partners[partnerName]++;
    }

    // 更新活跃天数
    var today = new Date().toDateString();
    if (data.lastActive !== today) {
        // 检查是否连续
        if (data.lastActive) {
            var lastDate = new Date(data.lastActive);
            var todayDate = new Date(today);
            var diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                data.progress.consecutive_days++;
            } else if (diffDays > 1) {
                data.progress.consecutive_days = 1;
            }
        } else {
            data.progress.consecutive_days = 1;
        }
        data.progress.days_active++;
        data.lastActive = today;
    }

    // 检查每个成就是否达成
    for (var i = 0; i < achievementDefinitions.length; i++) {
        var achievement = achievementDefinitions[i];

        // 跳过已获得的成就
        if (data.earned.indexOf(achievement.id) !== -1) {
            continue;
        }

        var conditionMet = false;
        var cond = achievement.condition;

        switch (cond.type) {
            case 'total_questions':
                conditionMet = data.progress.total_questions >= cond.value;
                break;
            case 'total_correct':
                conditionMet = data.progress.total_correct >= cond.value;
                break;
            case 'max_streak':
                conditionMet = data.progress.max_streak >= cond.value;
                break;
            case 'days_active':
                conditionMet = data.progress.days_active >= cond.value;
                break;
            case 'consecutive_days':
                conditionMet = data.progress.consecutive_days >= cond.value;
                break;
            case 'same_partner':
                // 检查是否有任一搭档达到要求次数
                for (var p in data.progress.partners) {
                    if (data.progress.partners[p] >= cond.value) {
                        conditionMet = true;
                        break;
                    }
                }
                break;
        }

        if (conditionMet) {
            data.earned.push(achievement.id);
            data.totalStars += achievement.reward;
            newAchievements.push(achievement);
        }
    }

    // 保存数据
    saveAchievementData(data);

    // 返回新解锁的成就
    return newAchievements;
}

// 显示成就解锁弹窗
function showAchievementUnlock(achievement) {
    // 移除旧弹窗
    var oldPopup = document.getElementById('achievement-popup');
    if (oldPopup) {
        oldPopup.remove();
    }

    var popup = document.createElement('div');
    popup.id = 'achievement-popup';
    popup.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);' +
        'background:linear-gradient(135deg,#FFD700,#FFA500);padding:10px 20px;border-radius:12px;' +
        'text-align:center;z-index:10000;box-shadow:0 4px 15px rgba(0,0,0,0.2);' +
        'animation:achievementSlide 0.3s ease-out;display:flex;align-items:center;gap:10px;';

    popup.innerHTML =
        '<span style="font-size:30px;">' + achievement.emoji + '</span>' +
        '<div style="text-align:left;">' +
        '<div style="font-size:14px;font-weight:bold;color:#333;">' + achievement.name + '</div>' +
        '<div style="font-size:12px;color:#666;">' + achievement.description + ' +' + achievement.reward + '⭐</div>' +
        '</div>';

    document.body.appendChild(popup);

    if (!document.getElementById('achievement-styles')) {
        var style = document.createElement('style');
        style.id = 'achievement-styles';
        style.textContent = '@keyframes achievementSlide{0%{transform:translateX(-50%) translateY(-100%);opacity:0}' +
            '100%{transform:translateX(-50%) translateY(0);opacity:1}}';
        document.head.appendChild(style);
    }

    // 1.5秒后自动消失（从3秒缩短）
    setTimeout(function() {
        if (popup.parentNode) {
            popup.style.transition = 'opacity 0.3s, transform 0.3s';
            popup.style.opacity = '0';
            popup.style.transform = 'translateX(-50%) translateY(-100%)';
            setTimeout(function() {
                if (popup.parentNode) {
                    popup.remove();
                }
            }, 300);
        }
    }, 1500);
}

// 获取成就进度（用于显示）
function getAchievementProgress(achievementId) {
    var data = getAchievementData();
    var achievement = null;

    for (var i = 0; i < achievementDefinitions.length; i++) {
        if (achievementDefinitions[i].id === achievementId) {
            achievement = achievementDefinitions[i];
            break;
        }
    }

    if (!achievement) return null;

    var current = 0;
    var target = achievement.condition.value;
    var cond = achievement.condition;

    switch (cond.type) {
        case 'total_questions':
            current = data.progress.total_questions;
            break;
        case 'total_correct':
            current = data.progress.total_correct;
            break;
        case 'max_streak':
            current = data.progress.max_streak;
            break;
        case 'days_active':
            current = data.progress.days_active;
            break;
        case 'consecutive_days':
            current = data.progress.consecutive_days;
            break;
        case 'same_partner':
            var maxPartner = 0;
            for (var p in data.progress.partners) {
                if (data.progress.partners[p] > maxPartner) {
                    maxPartner = data.progress.partners[p];
                }
            }
            current = maxPartner;
            break;
    }

    return {
        current: current,
        target: target,
        percentage: Math.min(100, Math.round((current / target) * 100))
    };
}

// 渲染成就页面
function renderAchievementsPage(container) {
    var data = getAchievementData();
    var earnedCount = data.earned.length;
    var totalCount = achievementDefinitions.length;

    var html = '<div style="padding:20px;">' +
        '<h2 style="text-align:center;color:#FF7043;">🏆 我的成就 (' + earnedCount + '/' + totalCount + ')</h2>' +
        '<div style="text-align:center;margin-bottom:20px;font-size:18px;">总星星：⭐ ' + data.totalStars + '</div>';

    // 已获得的成就
    html += '<h3 style="color:#58cc02;">⭐ 已获得</h3><div style="display:flex;flex-wrap:wrap;margin-bottom:20px;margin: -5px;">';

    var hasEarned = false;
    for (var i = 0; i < achievementDefinitions.length; i++) {
        var ach = achievementDefinitions[i];
        if (data.earned.indexOf(ach.id) !== -1) {
            hasEarned = true;
            html += '<div style="background:#d7ffb8;border:2px solid #58cc02;border-radius:12px;padding:10px;text-align:center;width:80px;">' +
                '<div style="font-size:30px;">' + ach.emoji + '</div>' +
                '<div style="font-size:12px;font-weight:bold;">' + ach.name + '</div></div>';
        }
    }
    if (!hasEarned) {
        html += '<div style="color:#999;font-size:14px;">还没有成就，继续加油！</div>';
    }
    html += '</div>';

    // 待解锁的成就
    html += '<h3 style="color:#999;">🔒 待解锁</h3><div style="display:flex;flex-wrap:wrap;margin: -5px;">';

    for (var j = 0; j < achievementDefinitions.length; j++) {
        var ach2 = achievementDefinitions[j];
        if (data.earned.indexOf(ach2.id) === -1) {
            var progress = getAchievementProgress(ach2.id);
            html += '<div style="background:#f5f5f5;border:2px solid #ddd;border-radius:12px;padding:10px;text-align:center;width:80px;">' +
                '<div style="font-size:30px;opacity:0.5;">' + ach2.emoji + '</div>' +
                '<div style="font-size:12px;color:#999;">' + progress.current + '/' + progress.target + '</div></div>';
        }
    }
    html += '</div></div>';

    container.innerHTML = html;
}
