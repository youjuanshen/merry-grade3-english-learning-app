// pet-system.js - 虚拟宠物系统
// 学习伴侣，随学习进度成长

var petDefinitions = [
    {
        id: 'egg',
        name: '神秘蛋',
        nameChinese: '神秘蛋',
        emoji: '🥚',
        stage: 0,
        requiredStars: 0,
        description: '一颗神秘的蛋，等待孵化...'
    },
    {
        id: 'chick',
        name: 'Little Chick',
        nameChinese: '小鸡仔',
        emoji: '🐣',
        stage: 1,
        requiredStars: 20,
        description: '刚孵化的小鸡，很可爱！'
    },
    {
        id: 'chicken',
        name: 'Chicken',
        nameChinese: '小鸡',
        emoji: '🐥',
        stage: 2,
        requiredStars: 50,
        description: '长大了一点的小鸡！'
    },
    {
        id: 'hen',
        name: 'Happy Hen',
        nameChinese: '快乐母鸡',
        emoji: '🐔',
        stage: 3,
        requiredStars: 100,
        description: '开心的母鸡，学习真棒！'
    },
    {
        id: 'phoenix',
        name: 'Phoenix',
        nameChinese: '凤凰',
        emoji: '🦅',
        stage: 4,
        requiredStars: 200,
        description: '传说中的凤凰，学习大师！'
    }
];

var petFoods = [
    { id: 'seed', name: '小种子', emoji: '🌱', energy: 5, price: 5 },
    { id: 'corn', name: '玉米粒', emoji: '🌽', energy: 10, price: 10 },
    { id: 'cake', name: '小蛋糕', emoji: '🍰', energy: 20, price: 20 },
    { id: 'star_fruit', name: '星星果', emoji: '⭐', energy: 50, price: 50 }
];

var petMoods = [
    { min: 0, max: 20, mood: 'sad', emoji: '😢', message: '好饿...' },
    { min: 21, max: 50, mood: 'neutral', emoji: '😐', message: '还好...' },
    { min: 51, max: 80, mood: 'happy', emoji: '😊', message: '心情不错！' },
    { min: 81, max: 100, mood: 'excited', emoji: '🤩', message: '超级开心！' }
];

// 获取宠物数据
function getPetData() {
    var data = localStorage.getItem('merryPetData');
    if (data) {
        return JSON.parse(data);
    }
    // 默认数据：从蛋开始
    return {
        currentPetId: 'egg',
        totalStars: 0,
        energy: 50,      // 能量值 0-100
        lastFeedTime: Date.now(),
        feedCount: 0,
        hatched: false
    };
}

// 保存宠物数据
function savePetData(data) {
    localStorage.setItem('merryPetData', JSON.stringify(data));
}

// 获取当前宠物
function getCurrentPet() {
    var data = getPetData();
    for (var i = 0; i < petDefinitions.length; i++) {
        if (petDefinitions[i].id === data.currentPetId) {
            return petDefinitions[i];
        }
    }
    return petDefinitions[0];
}

// 获取宠物心情
function getPetMood() {
    var data = getPetData();
    var energy = data.energy;

    for (var i = 0; i < petMoods.length; i++) {
        if (energy >= petMoods[i].min && energy <= petMoods[i].max) {
            return petMoods[i];
        }
    }
    return petMoods[0];
}

// 能量随时间减少
function updatePetEnergy() {
    var data = getPetData();
    var now = Date.now();
    var hoursPassed = (now - data.lastFeedTime) / (1000 * 60 * 60);

    // 每小时减少5点能量
    var energyLoss = Math.floor(hoursPassed * 5);
    data.energy = Math.max(0, data.energy - energyLoss);
    data.lastFeedTime = now;

    savePetData(data);
    return data.energy;
}

// 喂食宠物
function feedPet(foodId) {
    var data = getPetData();
    var food = null;

    for (var i = 0; i < petFoods.length; i++) {
        if (petFoods[i].id === foodId) {
            food = petFoods[i];
            break;
        }
    }

    if (!food) return { success: false, message: '找不到食物' };

    // 检查是否有足够的星星
    var achData = null;
    if (typeof getAchievementData === 'function') {
        achData = getAchievementData();
    }

    var currentStars = achData ? achData.totalStars : 0;
    if (currentStars < food.price) {
        return { success: false, message: '星星不够！需要 ' + food.price + ' ⭐' };
    }

    // 扣除星星
    if (achData) {
        achData.totalStars -= food.price;
        if (typeof saveAchievementData === 'function') {
            saveAchievementData(achData);
        }
    }

    // 增加能量
    data.energy = Math.min(100, data.energy + food.energy);
    data.feedCount++;
    data.lastFeedTime = Date.now();

    savePetData(data);

    return {
        success: true,
        message: '喂食成功！能量 +' + food.energy,
        newEnergy: data.energy
    };
}

// 检查宠物进化
function checkPetEvolution() {
    var data = getPetData();
    var achData = null;

    if (typeof getAchievementData === 'function') {
        achData = getAchievementData();
    }

    var totalStars = achData ? achData.totalStars : 0;

    // 找到可以进化到的最高阶段
    var newPet = null;
    for (var i = petDefinitions.length - 1; i >= 0; i--) {
        if (totalStars >= petDefinitions[i].requiredStars) {
            newPet = petDefinitions[i];
            break;
        }
    }

    if (newPet && newPet.id !== data.currentPetId) {
        var oldPet = getCurrentPet();
        data.currentPetId = newPet.id;

        // 首次孵化
        if (oldPet.id === 'egg' && newPet.id !== 'egg') {
            data.hatched = true;
        }

        savePetData(data);

        return {
            evolved: true,
            from: oldPet,
            to: newPet
        };
    }

    return { evolved: false };
}

// 渲染宠物面板
function renderPetPanel() {
    updatePetEnergy();
    var data = getPetData();
    var pet = getCurrentPet();
    var mood = getPetMood();

    var achData = null;
    if (typeof getAchievementData === 'function') {
        achData = getAchievementData();
    }
    var currentStars = achData ? achData.totalStars : 0;

    // 下一阶段所需星星
    var nextPet = null;
    for (var i = 0; i < petDefinitions.length; i++) {
        if (petDefinitions[i].stage > pet.stage) {
            nextPet = petDefinitions[i];
            break;
        }
    }

    var html = '<div class="pet-panel">';

    // 宠物显示区
    html += '<div class="pet-display">';
    html += '<div class="pet-avatar" style="font-size:80px;animation:petBounce 2s infinite;">' + pet.emoji + '</div>';
    html += '<div class="pet-name">' + pet.nameChinese + '</div>';
    html += '<div class="pet-mood">' + mood.emoji + ' ' + mood.message + '</div>';
    html += '</div>';

    // 状态栏
    html += '<div class="pet-stats">';

    // 能量条
    html += '<div class="stat-row">';
    html += '<span>💪 能量</span>';
    html += '<div class="energy-bar"><div class="energy-fill" style="width:' + data.energy + '%;background:' + (data.energy > 50 ? '#58cc02' : (data.energy > 20 ? '#FFC107' : '#f44336')) + ';"></div></div>';
    html += '<span>' + data.energy + '/100</span>';
    html += '</div>';

    // 进化进度
    if (nextPet) {
        var progress = Math.min(100, Math.round((currentStars / nextPet.requiredStars) * 100));
        html += '<div class="stat-row">';
        html += '<span>✨ 进化</span>';
        html += '<div class="energy-bar"><div class="energy-fill" style="width:' + progress + '%;background:linear-gradient(90deg,#FFD700,#FFA500);"></div></div>';
        html += '<span>' + currentStars + '/' + nextPet.requiredStars + ' ⭐</span>';
        html += '</div>';
        html += '<div class="next-evolution">下一阶段: ' + nextPet.emoji + ' ' + nextPet.nameChinese + '</div>';
    } else {
        html += '<div class="max-level">🎉 已达到最高阶段！</div>';
    }

    html += '</div>';

    // 喂食区
    html += '<div class="feed-section">';
    html += '<h3>🍽️ 喂食宠物</h3>';
    html += '<div class="food-grid">';

    for (var i = 0; i < petFoods.length; i++) {
        var food = petFoods[i];
        var canAfford = currentStars >= food.price;
        var btnClass = canAfford ? 'food-btn' : 'food-btn disabled';

        html += '<button class="' + btnClass + '" data-food="' + food.id + '" ' + (canAfford ? '' : 'disabled') + '>';
        html += '<span class="food-icon">' + food.emoji + '</span>';
        html += '<span class="food-name">' + food.name + '</span>';
        html += '<span class="food-price">' + food.price + ' ⭐</span>';
        html += '</button>';
    }

    html += '</div>';
    html += '<p class="stars-balance">你有: ' + currentStars + ' ⭐</p>';
    html += '</div>';

    html += '</div>';

    return html;
}

// 添加宠物面板样式
function addPetStyles() {
    if (document.getElementById('pet-styles')) return;

    var style = document.createElement('style');
    style.id = 'pet-styles';
    style.textContent = '' +
        '.pet-panel { padding: 20px; text-align: center; }' +
        '.pet-display { margin-bottom: 20px; }' +
        '.pet-avatar { margin-bottom: 10px; }' +
        '.pet-name { font-size: 20px; font-weight: bold; color: #333; }' +
        '.pet-mood { font-size: 16px; color: #666; margin-top: 5px; }' +
        '.pet-stats { background: white; border-radius: 16px; padding: 15px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }' +
        '.stat-row { display: flex; align-items: center; margin-bottom: 10px; } .stat-row > *:not(:last-child) { margin-right: 10px; }' +
        '.energy-bar { flex: 1; height: 12px; background: #e0e0e0; border-radius: 6px; overflow: hidden; }' +
        '.energy-fill { height: 100%; border-radius: 6px; transition: width 0.5s; }' +
        '.next-evolution { font-size: 14px; color: #888; margin-top: 10px; }' +
        '.max-level { font-size: 16px; color: #58cc02; font-weight: bold; }' +
        '.feed-section { background: white; border-radius: 16px; padding: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }' +
        '.feed-section h3 { margin: 0 0 15px 0; color: #333; }' +
        '.food-grid { display: grid; grid-template-columns: repeat(2, 1fr); grid-gap: 10px; }' +
        '.food-btn { display: flex; flex-direction: column; align-items: center; padding: 12px; border: 2px solid #58cc02; border-radius: 12px; background: #f9fff9; cursor: pointer; }' +
        '.food-btn:active { transform: scale(0.95); background: #e8f5e9; }' +
        '.food-btn.disabled { border-color: #ddd; background: #f5f5f5; opacity: 0.6; cursor: not-allowed; }' +
        '.food-icon { font-size: 24px; }' +
        '.food-name { font-size: 12px; margin-top: 4px; }' +
        '.food-price { font-size: 11px; color: #FFA500; margin-top: 2px; }' +
        '.stars-balance { margin-top: 15px; color: #888; }' +
        '@keyframes petBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }';

    document.head.appendChild(style);
}

// 显示宠物弹窗
function showPetModal() {
    addPetStyles();

    // 检查进化
    var evolution = checkPetEvolution();
    if (evolution.evolved) {
        showEvolutionAnimation(evolution.from, evolution.to);
        return;
    }

    var modal = document.createElement('div');
    modal.id = 'pet-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:linear-gradient(180deg,#fff8e1 0%,#ffecb3 100%);z-index:10000;overflow-y:auto;';

    var content = document.createElement('div');
    content.style.cssText = 'margin:20px;';

    // 关闭按钮
    var closeBtn = document.createElement('button');
    closeBtn.textContent = '← 返回';
    closeBtn.style.cssText = 'position:fixed;top:20px;left:20px;padding:10px 20px;background:white;border:none;border-radius:20px;font-size:16px;cursor:pointer;z-index:10001;box-shadow:0 2px 8px rgba(0,0,0,0.2);';
    closeBtn.onclick = function() {
        modal.remove();
    };

    content.innerHTML = renderPetPanel();
    modal.appendChild(closeBtn);
    modal.appendChild(content);
    document.body.appendChild(modal);

    // 添加喂食按钮事件
    var foodBtns = modal.querySelectorAll('.food-btn:not(.disabled)');
    for (var i = 0; i < foodBtns.length; i++) {
        foodBtns[i].addEventListener('click', function() {
            var foodId = this.getAttribute('data-food');
            var result = feedPet(foodId);

            if (result.success) {
                // 刷新面板
                content.innerHTML = renderPetPanel();
                showFeedAnimation(result.message);

                // 重新绑定事件
                var newBtns = modal.querySelectorAll('.food-btn:not(.disabled)');
                for (var j = 0; j < newBtns.length; j++) {
                    newBtns[j].addEventListener('click', arguments.callee);
                }

                // 检查进化
                var evo = checkPetEvolution();
                if (evo.evolved) {
                    modal.remove();
                    showEvolutionAnimation(evo.from, evo.to);
                }
            } else {
                alert(result.message);
            }
        });
    }
}

// 喂食动画
function showFeedAnimation(message) {
    var popup = document.createElement('div');
    popup.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
        'background:linear-gradient(135deg,#58cc02,#7ce800);padding:20px 40px;border-radius:16px;' +
        'color:white;font-size:18px;font-weight:bold;z-index:10002;' +
        'animation:popIn 0.3s ease-out;';
    popup.innerHTML = '🍽️ ' + message;

    document.body.appendChild(popup);

    setTimeout(function() {
        popup.style.opacity = '0';
        popup.style.transition = 'opacity 0.3s';
        setTimeout(function() { popup.remove(); }, 300);
    }, 1500);
}

// 进化动画
function showEvolutionAnimation(fromPet, toPet) {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);' +
        'z-index:10003;display:flex;flex-direction:column;align-items:center;justify-content:center;';

    overlay.innerHTML = '' +
        '<div style="text-align:center;color:white;">' +
        '<div style="font-size:60px;animation:spin 1s ease-in-out;">' + fromPet.emoji + '</div>' +
        '<div style="font-size:24px;margin:20px 0;">✨ 进化中... ✨</div>' +
        '</div>';

    document.body.appendChild(overlay);

    // 添加旋转动画
    var spinStyle = document.createElement('style');
    spinStyle.textContent = '@keyframes spin { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.5); } 100% { transform: rotate(360deg) scale(1); } }' +
        '@keyframes popIn { 0% { transform: translate(-50%,-50%) scale(0); } 100% { transform: translate(-50%,-50%) scale(1); } }';
    document.head.appendChild(spinStyle);

    setTimeout(function() {
        overlay.innerHTML = '' +
            '<div style="text-align:center;color:white;">' +
            '<div style="font-size:100px;animation:petBounce 1s infinite;">' + toPet.emoji + '</div>' +
            '<div style="font-size:28px;font-weight:bold;margin:20px 0;color:#FFD700;">🎉 进化成功！</div>' +
            '<div style="font-size:20px;">' + toPet.nameChinese + '</div>' +
            '<button onclick="this.parentElement.parentElement.remove();showPetModal();" ' +
            'style="margin-top:30px;padding:15px 40px;font-size:18px;border:none;border-radius:25px;' +
            'background:linear-gradient(135deg,#FFD700,#FFA500);cursor:pointer;">太棒了！</button>' +
            '</div>';
    }, 1500);
}
