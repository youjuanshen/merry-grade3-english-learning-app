// progress-map.js - 进度地图系统
// 冒险闯关式学习路径

var progressMapData = {
    units: [
        {
            id: 1,
            name: "Unit 1",
            theme: "Animals",
            themeChinese: "动物王国",
            icon: "🦁",
            lessons: [
                { id: "U1L1", name: "This is a bear.", icon: "🐻", stars: 3 },
                { id: "U1L2", name: "I see a lion.", icon: "🦁", stars: 3 },
                { id: "U1L3", name: "Look at the duck.", icon: "🦆", stars: 3 },
                { id: "U1L4", name: "What a cute dog!", icon: "🐕", stars: 3 }
            ]
        },
        {
            id: 2,
            name: "Unit 2",
            theme: "Pets & Food",
            themeChinese: "宠物与美食",
            icon: "🐱",
            lessons: [
                { id: "U2L1", name: "My pet dog.", icon: "🐶", stars: 3 },
                { id: "U2L2", name: "I like apples.", icon: "🍎", stars: 3 },
                { id: "U2L3", name: "Do you like oranges?", icon: "🍊", stars: 3 },
                { id: "U2L4", name: "My favorite fruit.", icon: "🍇", stars: 3 }
            ]
        },
        {
            id: 3,
            name: "Unit 3",
            theme: "Colors & Objects",
            themeChinese: "五彩世界",
            icon: "🎨",
            lessons: [
                { id: "U3L1", name: "It's red.", icon: "🔴", stars: 3 },
                { id: "U3L2", name: "The ball is blue.", icon: "🔵", stars: 3 },
                { id: "U3L3", name: "Green and yellow.", icon: "🟢", stars: 3 },
                { id: "U3L4", name: "Rainbow colors.", icon: "🌈", stars: 3 }
            ]
        },
        {
            id: 4,
            name: "Unit 4",
            theme: "Family",
            themeChinese: "温馨家庭",
            icon: "👨‍👩‍👧‍👦",
            lessons: [
                { id: "U4L1", name: "This is my mother.", icon: "👩", stars: 3 },
                { id: "U4L2", name: "My grandparents.", icon: "👴", stars: 3 },
                { id: "U4L3", name: "Brother and sister.", icon: "👫", stars: 3 },
                { id: "U4L4", name: "My family.", icon: "👨‍👩‍👧‍👦", stars: 3 }
            ]
        }
    ]
};

// 获取进度数据
function getProgressData() {
    var data = localStorage.getItem('merryProgressMap');
    if (data) {
        return JSON.parse(data);
    }
    // 默认：第一课解锁
    return {
        completedLessons: [],
        currentLesson: "U1L1",
        lessonStars: {}  // { "U1L1": 3, "U1L2": 2 }
    };
}

// 保存进度数据
function saveProgressData(data) {
    localStorage.setItem('merryProgressMap', JSON.stringify(data));
}

// 完成一课
function completeLesson(lessonId, earnedStars) {
    var data = getProgressData();

    // 添加到已完成列表
    if (data.completedLessons.indexOf(lessonId) === -1) {
        data.completedLessons.push(lessonId);
    }

    // 记录星星数
    data.lessonStars[lessonId] = Math.max(
        data.lessonStars[lessonId] || 0,
        earnedStars
    );

    // 解锁下一课
    var nextLesson = getNextLesson(lessonId);
    if (nextLesson) {
        data.currentLesson = nextLesson;
    }

    saveProgressData(data);

    // 更新成就系统
    if (typeof checkAndUpdateAchievements === 'function') {
        // 触发课程完成相关成就
    }
}

// 获取下一课ID
function getNextLesson(currentId) {
    var allLessons = [];
    for (var i = 0; i < progressMapData.units.length; i++) {
        for (var j = 0; j < progressMapData.units[i].lessons.length; j++) {
            allLessons.push(progressMapData.units[i].lessons[j].id);
        }
    }

    var currentIndex = allLessons.indexOf(currentId);
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
        return allLessons[currentIndex + 1];
    }
    return null;
}

// 检查课程是否解锁
function isLessonUnlocked(lessonId) {
    var data = getProgressData();

    // 第一课始终解锁
    if (lessonId === "U1L1") return true;

    // 已完成的课程
    if (data.completedLessons.indexOf(lessonId) !== -1) return true;

    // 当前课程
    if (data.currentLesson === lessonId) return true;

    return false;
}

// 渲染进度地图
function renderProgressMap() {
    var data = getProgressData();
    var html = '<div class="progress-map">';

    html += '<div class="map-header">';
    html += '<h2>🗺️ 学习冒险地图</h2>';
    html += '<div class="total-progress">';
    var totalCompleted = data.completedLessons.length;
    var totalLessons = 16;
    var percentage = Math.round((totalCompleted / totalLessons) * 100);
    html += '<div class="progress-bar-container">';
    html += '<div class="progress-bar-fill" style="width:' + percentage + '%"></div>';
    html += '</div>';
    html += '<span>' + totalCompleted + '/' + totalLessons + ' 课程完成</span>';
    html += '</div>';
    html += '</div>';

    // 渲染每个单元
    for (var i = 0; i < progressMapData.units.length; i++) {
        var unit = progressMapData.units[i];
        html += '<div class="map-unit">';
        html += '<div class="unit-header">';
        html += '<span class="unit-icon">' + unit.icon + '</span>';
        html += '<div class="unit-info">';
        html += '<span class="unit-name">' + unit.name + '</span>';
        html += '<span class="unit-theme">' + unit.themeChinese + '</span>';
        html += '</div>';
        html += '</div>';

        // 渲染课程节点
        html += '<div class="lesson-path">';
        for (var j = 0; j < unit.lessons.length; j++) {
            var lesson = unit.lessons[j];
            var isCompleted = data.completedLessons.indexOf(lesson.id) !== -1;
            var isCurrent = data.currentLesson === lesson.id;
            var isUnlocked = isLessonUnlocked(lesson.id);
            var stars = data.lessonStars[lesson.id] || 0;

            var nodeClass = 'lesson-node';
            if (isCompleted) nodeClass += ' completed';
            else if (isCurrent) nodeClass += ' current';
            else if (!isUnlocked) nodeClass += ' locked';

            html += '<div class="' + nodeClass + '" data-lesson="' + lesson.id + '">';
            html += '<div class="node-icon">' + (isUnlocked ? lesson.icon : '🔒') + '</div>';
            if (isCompleted || isCurrent) {
                html += '<div class="node-stars">';
                for (var s = 0; s < 3; s++) {
                    html += s < stars ? '⭐' : '☆';
                }
                html += '</div>';
            }
            html += '</div>';

            // 连接线
            if (j < unit.lessons.length - 1) {
                var lineClass = 'path-line';
                if (isCompleted) lineClass += ' completed';
                html += '<div class="' + lineClass + '"></div>';
            }
        }
        html += '</div>';
        html += '</div>';
    }

    html += '</div>';
    return html;
}

// 添加进度地图样式
function addProgressMapStyles() {
    if (document.getElementById('progress-map-styles')) return;

    var style = document.createElement('style');
    style.id = 'progress-map-styles';
    style.textContent = '' +
        '.progress-map { padding: 15px; background: linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%); min-height: 100vh; }' +
        '.map-header { text-align: center; margin-bottom: 20px; }' +
        '.map-header h2 { color: #2e7d32; margin-bottom: 10px; }' +
        '.total-progress { display: flex; align-items: center; justify-content: center; } .total-progress > *:not(:last-child) { margin-right: 10px; }' +
        '.progress-bar-container { width: 150px; height: 12px; background: #ddd; border-radius: 6px; overflow: hidden; }' +
        '.progress-bar-fill { height: 100%; background: linear-gradient(90deg, #58cc02, #7ce800); transition: width 0.5s; }' +
        '.map-unit { background: white; border-radius: 16px; padding: 15px; margin-bottom: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }' +
        '.unit-header { display: flex; align-items: center; margin-bottom: 15px; } .unit-header > *:not(:last-child) { margin-right: 12px; padding-bottom: 10px; border-bottom: 2px dashed #e0e0e0; }' +
        '.unit-icon { font-size: 36px; }' +
        '.unit-info { display: flex; flex-direction: column; }' +
        '.unit-name { font-weight: bold; color: #333; }' +
        '.unit-theme { font-size: 14px; color: #666; }' +
        '.lesson-path { display: flex; align-items: center; justify-content: space-around; padding: 10px 0; }' +
        '.lesson-node { width: 60px; height: 60px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: all 0.3s; cursor: pointer; }' +
        '.lesson-node.completed { background: linear-gradient(135deg, #58cc02, #7ce800); box-shadow: 0 4px 12px rgba(88,204,2,0.4); }' +
        '.lesson-node.current { background: linear-gradient(135deg, #FFD700, #FFA500); box-shadow: 0 4px 12px rgba(255,165,0,0.4); animation: pulse 1.5s infinite; }' +
        '.lesson-node.locked { background: #e0e0e0; opacity: 0.6; cursor: not-allowed; }' +
        '.lesson-node:not(.locked):active { transform: scale(0.95); }' +
        '.node-icon { font-size: 24px; }' +
        '.node-stars { font-size: 10px; margin-top: 2px; }' +
        '.path-line { width: 20px; height: 4px; background: #e0e0e0; border-radius: 2px; }' +
        '.path-line.completed { background: #58cc02; }' +
        '@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }';

    document.head.appendChild(style);
}

// 显示进度地图弹窗
function showProgressMapModal() {
    addProgressMapStyles();

    var modal = document.createElement('div');
    modal.id = 'progress-map-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:10000;overflow-y:auto;';

    var content = document.createElement('div');
    content.style.cssText = 'margin:20px;';

    // 关闭按钮
    var closeBtn = document.createElement('button');
    closeBtn.textContent = '← 返回';
    closeBtn.style.cssText = 'position:fixed;top:20px;left:20px;padding:10px 20px;background:white;border:none;border-radius:20px;font-size:16px;cursor:pointer;z-index:10001;box-shadow:0 2px 8px rgba(0,0,0,0.2);';
    closeBtn.onclick = function() {
        modal.remove();
    };

    content.innerHTML = renderProgressMap();
    modal.appendChild(closeBtn);
    modal.appendChild(content);
    document.body.appendChild(modal);

    // 添加课程点击事件
    var nodes = modal.querySelectorAll('.lesson-node:not(.locked)');
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].addEventListener('click', function() {
            var lessonId = this.getAttribute('data-lesson');
            modal.remove();
            // 触发课程选择
            if (typeof selectLessonFromMap === 'function') {
                selectLessonFromMap(lessonId);
            }
        });
    }
}
