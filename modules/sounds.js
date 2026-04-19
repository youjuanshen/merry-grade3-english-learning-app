/**
 * Web Audio API 音效系统
 * 完全本地内存生成，无需下载庞大音频文件
 */

const SoundSystem = (function() {
    let audioCtx = null;
    let isMuted = false;

    function init() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }
    }

    // 必须在用户第一次交互（点击）时调用，以解锁 iOS 音频限制
    function resume() {
        init();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function toggleMute() {
        isMuted = !isMuted;
        return isMuted;
    }

    function playTone(freq, type, duration, vol=0.1, delay=0) {
        if (isMuted) return;
        init();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
        
        // 消除音爆的包络线
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + delay + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + duration);
    }

    return {
        resume,
        toggleMute,
        
        // 按钮点击：轻微的"哒"
        playClick: () => {
            playTone(400, 'sine', 0.1, 0.05);
        },

        // 答对：短促的"叮咚" (高音双重)
        playCorrect: () => {
            playTone(880, 'sine', 0.15, 0.1); // A5
            playTone(1108.73, 'sine', 0.3, 0.1, 0.1); // C#6
        },

        // 答错：温和的"嗡" (低音)
        playWrong: () => {
            playTone(150, 'sawtooth', 0.3, 0.1);
        },

        // 连击(combo)：越来越高的音调
        playCombo: (comboCount) => {
            // 基础音 440Hz (A4)，每连击升半音等
            const baseFreq = 440;
            const freq = baseFreq * Math.pow(1.059463, Math.min(comboCount, 12)); 
            playTone(freq, 'sine', 0.2, 0.1);
            playTone(freq * 1.5, 'sine', 0.3, 0.05, 0.1); 
        },

        // 成就解锁：胜利号角
        playAchievement: () => {
            playTone(523.25, 'square', 0.2, 0.08, 0.0); // C5
            playTone(659.25, 'square', 0.2, 0.08, 0.2); // E5
            playTone(783.99, 'square', 0.4, 0.08, 0.4); // G5
            playTone(1046.50, 'square', 0.6, 0.08, 0.6); // C6
        },

        // 关卡完成：欢呼 (简化为快节奏和弦琶音)
        playLevelComplete: () => {
            let delay = 0;
            const notes = [440, 554.37, 659.25, 880, 659.25, 880, 1108.73];
            for (let f of notes) {
                playTone(f, 'sine', 0.15, 0.1, delay);
                delay += 0.1;
            }
        },

        // 倒计时 3-2-1：清脆铃声，越来越高越来越紧迫
        playCountdownTick: function(step) {
            // 五声音阶上行：Sol4 → Re5 → La5
            var freqs = { 3: 392.00, 2: 587.33, 1: 880.00 };
            var freq = freqs[step] || 392.00;
            // 铃声主音（triangle = 清脆不刺耳）
            playTone(freq, 'triangle', 0.3, 0.14);
            // 泛音（让音色更饱满像真铃声）
            playTone(freq * 2, 'sine', 0.2, 0.05, 0.0);
            playTone(freq * 3, 'sine', 0.12, 0.02, 0.0);
            // 低音铺垫（只有最后一拍加，增加紧迫感）
            if (step === 1) {
                playTone(freq * 0.5, 'triangle', 0.4, 0.07, 0.0);
                // 快速装饰音 La→La（双击效果）
                playTone(freq, 'triangle', 0.08, 0.10, 0.15);
            }
        },

        // GO! 胜利号角（大调和弦 + 欢呼琶音）
        playCountdownGo: function() {
            // 快速上行琶音 Do-Mi-Sol-Do↑
            playTone(523.25, 'triangle', 0.10, 0.13, 0.00);  // C5
            playTone(659.25, 'triangle', 0.10, 0.13, 0.05);  // E5
            playTone(783.99, 'triangle', 0.10, 0.14, 0.10);  // G5
            playTone(1046.50, 'triangle', 0.35, 0.15, 0.15); // C6
            // 和弦爆发（四音同时 = 辉煌感）
            playTone(523.25, 'sine', 0.8, 0.07, 0.22);
            playTone(659.25, 'sine', 0.8, 0.07, 0.22);
            playTone(783.99, 'sine', 0.8, 0.07, 0.22);
            playTone(1046.50, 'sine', 0.8, 0.06, 0.22);
            // 星星闪烁高音装饰
            playTone(1567.98, 'sine', 0.12, 0.03, 0.30);
            playTone(2093.0, 'sine', 0.15, 0.03, 0.40);
            playTone(1567.98, 'sine', 0.12, 0.02, 0.50);
        },

        // 开场旋律（五声音阶欢快旋律，类似多邻国/趣味游戏）
        // Do-Re-Mi-Sol-La-Sol-Mi-Re-Mi-Sol-Do↑
        playOpeningJingle: function() {
            var m = [
                // 第一乐句：上行 Do-Re-Mi-Sol（活泼跳跃）
                { f: 523.25, d: 0.10, v: 0.11, t: 0.00 },  // Do
                { f: 587.33, d: 0.08, v: 0.10, t: 0.10 },  // Re
                { f: 659.25, d: 0.12, v: 0.12, t: 0.18 },  // Mi（稍长）
                { f: 783.99, d: 0.12, v: 0.12, t: 0.30 },  // Sol
                // 第二乐句：La-Sol-Mi（下行回弹）
                { f: 880.00, d: 0.10, v: 0.13, t: 0.42 },  // La
                { f: 783.99, d: 0.08, v: 0.11, t: 0.52 },  // Sol
                { f: 659.25, d: 0.10, v: 0.10, t: 0.60 },  // Mi
                // 第三乐句：Sol-La-Do↑（冲向高潮）
                { f: 783.99, d: 0.08, v: 0.12, t: 0.72 },  // Sol
                { f: 880.00, d: 0.08, v: 0.13, t: 0.80 },  // La
                { f: 1046.50, d: 0.30, v: 0.14, t: 0.88 },  // Do↑（结尾长音）
            ];
            for (var i = 0; i < m.length; i++) {
                playTone(m[i].f, 'triangle', m[i].d, m[i].v, m[i].t);
                // 泛音层（让每个音更亮更有光泽）
                playTone(m[i].f * 2, 'sine', m[i].d * 0.5, m[i].v * 0.15, m[i].t);
            }
        }
    };
})();

// 全局暴露
window.SoundSystem = SoundSystem;
