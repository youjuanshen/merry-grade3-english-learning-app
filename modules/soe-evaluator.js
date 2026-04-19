/**
 * soe-evaluator.js — 腾讯云智聆口语评测客户端封装
 *
 * 职责：
 *   1. 提供 SpeechRecorder：开始/停止录音（getUserMedia + ScriptProcessor → WAV → Base64）
 *   2. 提供 evaluateSpeech(referenceText, audioBase64)：POST /api/speech-eval，返回四字段
 *
 * 字段对齐 ADR-006 飞书 app_behavior_log schema：
 *   soeScore / soePronAccuracy / soePronFluency / soePronCompletion
 *
 * 铁律：
 *   - iOS 12 兼容：不用 async/await、?.、??、Promise.allSettled
 *   - 失败返回 null 四字段，不抛错、不阻塞答题
 *   - 超时 10 秒（iOS 12 友好）
 *   - 所有网络调用走 /api/speech-eval（本地代理走腾讯云签名）
 *
 * 依赖：全局 window（getUserMedia、AudioContext、fetch/XHR）
 */

(function() {
    'use strict';

    var TIMEOUT_MS = 15000; // iOS 12 网络较慢，15秒更安全
    var SAMPLE_RATE = 16000; // SOE 要求 16kHz
    var API_ENDPOINT = '/api/speech-eval';
    // 环境判断：非 localhost 时直接调 SCF（GitHub Pages 部署）
    var _soeIsLocal = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    var SCF_ENDPOINT = 'https://1316992450-2fbeeh6iet.ap-guangzhou.tencentscf.com/';
    var SCF_API_KEY = 'merry-quiz-2026-secret';

    // ===== WAV 编码（Float32 → 16bit PCM WAV Blob/Base64）=====
    function encodeWAV(samples, sampleRate) {
        var buffer = new ArrayBuffer(44 + samples.length * 2);
        var view = new DataView(buffer);
        function writeString(offset, str) {
            for (var i = 0; i < str.length; i++) {
                view.setUint8(offset + i, str.charCodeAt(i));
            }
        }
        writeString(0, 'RIFF');
        view.setUint32(4, 36 + samples.length * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);          // PCM
        view.setUint16(22, 1, true);          // mono
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, samples.length * 2, true);
        // Float32 → Int16
        var offset = 44;
        for (var j = 0; j < samples.length; j++) {
            var s = Math.max(-1, Math.min(1, samples[j]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            offset += 2;
        }
        return buffer;
    }

    // ArrayBuffer → Base64（iOS 12 无 btoa(binary-safe) 封装工具）
    function arrayBufferToBase64(buffer) {
        var bytes = new Uint8Array(buffer);
        var binary = '';
        var chunk = 0x8000;
        for (var i = 0; i < bytes.length; i += chunk) {
            binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
        }
        return window.btoa(binary);
    }

    // 简单重采样（线性插值）到 16kHz
    function resampleTo16k(inputSamples, inputRate) {
        if (inputRate === SAMPLE_RATE) return inputSamples;
        var ratio = inputRate / SAMPLE_RATE;
        var newLen = Math.round(inputSamples.length / ratio);
        var result = new Float32Array(newLen);
        for (var i = 0; i < newLen; i++) {
            var idx = i * ratio;
            var left = Math.floor(idx);
            var right = Math.min(left + 1, inputSamples.length - 1);
            var frac = idx - left;
            result[i] = inputSamples[left] * (1 - frac) + inputSamples[right] * frac;
        }
        return result;
    }

    // ===== SpeechRecorder：单例式录音控制 =====
    var _audioCtx = null;
    var _stream = null;
    var _processor = null;
    var _source = null;
    var _chunks = [];
    var _recording = false;
    var _inputSampleRate = 44100;

    function startRecording() {
        return new Promise(function(resolve, reject) {
            if (_recording) { reject(new Error('already recording')); return; }
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                reject(new Error('getUserMedia not supported')); return;
            }
            // iOS 12 bug: 多次创建 AudioContext 后可能静音，先彻底释放旧的
            if (_audioCtx) {
                try { _audioCtx.close(); } catch(e) {}
                _audioCtx = null;
            }
            if (_stream) {
                try { _stream.getTracks().forEach(function(t) { t.stop(); }); } catch(e) {}
                _stream = null;
            }
            navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: true,
                    channelCount: 1
                },
                video: false
            }).then(function(stream) {
                try {
                    _stream = stream;
                    var Ctx = window.AudioContext || window.webkitAudioContext;
                    _audioCtx = new Ctx();
                    _inputSampleRate = _audioCtx.sampleRate;
                    _source = _audioCtx.createMediaStreamSource(stream);
                    _processor = _audioCtx.createScriptProcessor(4096, 1, 1);
                    _chunks = [];
                    var _dbgCount = 0;
                    var _warmupFrames = Math.ceil(0.2 * _inputSampleRate / 4096); // 跳过前200ms（麦克风预热噪音，不能太长否则短单词被截）
                    var _frameCount = 0;
                    _processor.onaudioprocess = function(e) {
                        var data = e.inputBuffer.getChannelData(0);
                        _frameCount++;
                        // 诊断：前5帧打印音频电平，确认麦克风真的在采集
                        if (_dbgCount < 5) {
                            var maxVal = 0;
                            for (var k = 0; k < data.length; k++) {
                                var abs = data[k] < 0 ? -data[k] : data[k];
                                if (abs > maxVal) maxVal = abs;
                            }
                            console.log('[SOE] audio frame #' + _dbgCount + ' max=' + maxVal.toFixed(4) + ' rate=' + _inputSampleRate + ' warmup=' + _warmupFrames);
                            _dbgCount++;
                        }
                        // 跳过前500ms预热帧（iPhone麦克风启动噪音）
                        if (_frameCount <= _warmupFrames) return;
                        // 必须拷贝，浏览器会复用 buffer
                        var copy = new Float32Array(data.length);
                        for (var i = 0; i < data.length; i++) copy[i] = data[i];
                        _chunks.push(copy);
                    };
                    _source.connect(_processor);
                    _processor.connect(_audioCtx.destination);
                    _recording = true;
                    resolve();
                } catch(e) {
                    reject(e);
                }
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    function stopRecording() {
        return new Promise(function(resolve, reject) {
            if (!_recording) { reject(new Error('not recording')); return; }
            try {
                _recording = false;
                if (_processor) {
                    try { _processor.disconnect(); } catch(e) {}
                    _processor.onaudioprocess = null;
                }
                if (_source) { try { _source.disconnect(); } catch(e) {} }
                if (_stream) {
                    var tracks = _stream.getTracks();
                    for (var t = 0; t < tracks.length; t++) {
                        try { tracks[t].stop(); } catch(e) {}
                    }
                }
                // 合并 chunks
                var total = 0;
                for (var i = 0; i < _chunks.length; i++) total += _chunks[i].length;
                var merged = new Float32Array(total);
                var off = 0;
                for (var j = 0; j < _chunks.length; j++) {
                    merged.set(_chunks[j], off);
                    off += _chunks[j].length;
                }
                _chunks = [];
                console.log('[SOE] recorded samples: ' + total + ' (' + (total / SAMPLE_RATE).toFixed(1) + 's at 16kHz equiv)');
                // 如果音频太短（预热跳过后几乎没数据），警告
                if (total < SAMPLE_RATE * 0.5) {
                    console.warn('[SOE] audio too short after warmup skip: ' + total + ' samples');
                }
                // 归一化增益：iPhone 6 Plus 麦克风电平极低（peak~0.004），放大到 0.9 峰值
                var peakVal = 0;
                for (var p = 0; p < merged.length; p++) {
                    var absVal = merged[p] < 0 ? -merged[p] : merged[p];
                    if (absVal > peakVal) peakVal = absVal;
                }
                if (peakVal > 0.0001 && peakVal < 0.9) {
                    var gain = 0.9 / peakVal;
                    console.log('[SOE] normalize: peak=' + peakVal.toFixed(4) + ' gain=' + gain.toFixed(1) + 'x');
                    for (var g = 0; g < merged.length; g++) {
                        merged[g] = Math.max(-1, Math.min(1, merged[g] * gain));
                    }
                }
                var resampled = resampleTo16k(merged, _inputSampleRate);
                var wav = encodeWAV(resampled, SAMPLE_RATE);
                var base64 = arrayBufferToBase64(wav);
                // 关闭 AudioContext（iOS 12 有资源限制）
                if (_audioCtx && _audioCtx.close) {
                    try { _audioCtx.close(); } catch(e) {}
                }
                _audioCtx = null; _stream = null; _processor = null; _source = null;
                resolve(base64);
            } catch(e) {
                reject(e);
            }
        });
    }

    function isRecording() { return _recording; }

    // ===== evaluateSpeech：把音频送到 SOE，返回四字段（失败返回 null 四字段）=====
    function evaluateSpeech(referenceText, audioBase64) {
        return new Promise(function(resolve) {
            var EMPTY = { soeScore: null, soePronAccuracy: null, soePronFluency: null, soePronCompletion: null };
            if (!referenceText || !audioBase64) { resolve(EMPTY); return; }

            var done = false;
            var timer = setTimeout(function() {
                if (done) return;
                done = true;
                console.warn('[SOE] evaluateSpeech timeout');
                resolve(EMPTY);
            }, TIMEOUT_MS);

            // 非 localhost：通过 SCF soeEval action 评分（XHR，iOS 12 兼容）
            if (!_soeIsLocal) {
                try {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', SCF_ENDPOINT, true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('X-Api-Key', SCF_API_KEY);
                    xhr.timeout = TIMEOUT_MS;
                    xhr.onload = function() {
                        if (done) return;
                        done = true;
                        clearTimeout(timer);
                        try {
                            var data = JSON.parse(xhr.responseText);
                            if (!data || data.code !== 0) {
                                console.warn('[SOE] SCF soeEval error: code=' + (data && data.code) + ' msg=' + (data && data.msg) + ' ref="' + referenceText + '"');
                                resolve(EMPTY);
                                return;
                            }
                            resolve({
                                soeScore: (typeof data.score === 'number') ? data.score : null,
                                soePronAccuracy: (typeof data.soePronAccuracy === 'number') ? data.soePronAccuracy : null,
                                soePronFluency: (typeof data.soePronFluency === 'number') ? data.soePronFluency : null,
                                soePronCompletion: (typeof data.soePronCompletion === 'number') ? data.soePronCompletion : null
                            });
                        } catch(e) {
                            console.warn('[SOE] SCF soeEval JSON parse error:', e.message);
                            resolve(EMPTY);
                        }
                    };
                    xhr.onerror = function() {
                        if (done) return;
                        done = true;
                        clearTimeout(timer);
                        console.warn('[SOE] SCF soeEval network error');
                        resolve(EMPTY);
                    };
                    xhr.ontimeout = function() {
                        if (done) return;
                        done = true;
                        console.warn('[SOE] SCF soeEval timeout');
                        resolve(EMPTY);
                    };
                    xhr.send(JSON.stringify({ action: 'soeEval', audio: audioBase64, text: referenceText }));
                } catch(e) {
                    if (done) return;
                    done = true;
                    clearTimeout(timer);
                    console.warn('[SOE] SCF soeEval sync error:', e.message);
                    resolve(EMPTY);
                }
                return;
            }

            // localhost：走本地代理 /api/speech-eval
            try {
                fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: referenceText, audio: audioBase64 })
                }).then(function(res) {
                    return res.json();
                }).then(function(data) {
                    if (done) return;
                    done = true;
                    clearTimeout(timer);
                    if (!data || data.code !== 0) {
                        console.warn('[SOE] evaluateSpeech server error: code=' + (data && data.code) + ' msg=' + (data && data.msg) + ' ref="' + referenceText + '"');
                        resolve(EMPTY);
                        return;
                    }
                    resolve({
                        soeScore: (typeof data.score === 'number') ? data.score : null,
                        soePronAccuracy: (typeof data.soePronAccuracy === 'number') ? data.soePronAccuracy : null,
                        soePronFluency: (typeof data.soePronFluency === 'number') ? data.soePronFluency : null,
                        soePronCompletion: (typeof data.soePronCompletion === 'number') ? data.soePronCompletion : null
                    });
                }).catch(function(err) {
                    if (done) return;
                    done = true;
                    clearTimeout(timer);
                    console.warn('[SOE] evaluateSpeech fetch error:', err && err.message);
                    resolve(EMPTY);
                });
            } catch(e) {
                if (done) return;
                done = true;
                clearTimeout(timer);
                console.warn('[SOE] evaluateSpeech sync error:', e.message);
                resolve(EMPTY);
            }
        });
    }

    // ===== 便捷封装：recordAndEvaluate(referenceText, onStart, onStop)
    // 返回一个 controller：{ stop: Function -> Promise<四字段> }
    function beginRecordAndEvaluate(referenceText) {
        var controller = {
            stopped: false,
            _stopPromise: null,
            stop: function() {
                if (controller.stopped) return controller._stopPromise || Promise.resolve({ soeScore:null, soePronAccuracy:null, soePronFluency:null, soePronCompletion:null });
                controller.stopped = true;
                controller._stopPromise = stopRecording().then(function(base64) {
                    return evaluateSpeech(referenceText, base64);
                }).catch(function(err) {
                    console.warn('[SOE] stop/eval failed:', err && err.message);
                    return { soeScore:null, soePronAccuracy:null, soePronFluency:null, soePronCompletion:null };
                });
                return controller._stopPromise;
            }
        };
        // 异步启动录音
        controller._startPromise = startRecording().catch(function(err) {
            console.warn('[SOE] startRecording failed:', err && err.message);
            controller.stopped = true;
            controller._stopPromise = Promise.resolve({ soeScore:null, soePronAccuracy:null, soePronFluency:null, soePronCompletion:null });
            return null;
        });
        return controller;
    }

    // ===== 麦克风预热（进入口语模块时调用，提前获取权限+启动麦克风）=====
    var _micWarmedUp = false;
    function warmupMic() {
        if (_micWarmedUp) return Promise.resolve();
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return Promise.resolve();
        console.log('[SOE] warming up microphone...');
        return navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function(stream) {
            // 保持stream 1秒让麦克风稳定，然后释放
            _micWarmedUp = true;
            setTimeout(function() {
                stream.getTracks().forEach(function(t) { t.stop(); });
                console.log('[SOE] mic warmup done, released');
            }, 1000);
        }).catch(function(err) {
            console.warn('[SOE] mic warmup failed:', err && err.message);
        });
    }

    // 暴露全局
    window.SpeechEvaluator = {
        startRecording: startRecording,
        stopRecording: stopRecording,
        isRecording: isRecording,
        evaluateSpeech: evaluateSpeech,
        beginRecordAndEvaluate: beginRecordAndEvaluate,
        warmupMic: warmupMic
    };
    // 全局短别名
    window.evaluateSpeech = evaluateSpeech;

    console.log('🎤 SpeechEvaluator: Loaded (SOE 四字段封装)');
})();
