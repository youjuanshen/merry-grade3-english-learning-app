var http = require('http');
var https = require('https');
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var url = require('url');
var WebSocket = require('ws');

var ROOT = __dirname;
var PORT = 8080;
var HTTPS_PORT = 8443;

// ===== 腾讯云智聆口语评测 (SOE) 配置 =====
// 开通地址：https://console.cloud.tencent.com/soe （免费每月1万次）
// 密钥地址：https://console.cloud.tencent.com/cam/capi
var SOE_SECRET_ID  = process.env.TENCENT_SECRET_ID  || '';
var SOE_SECRET_KEY = process.env.TENCENT_SECRET_KEY || '';
var SOE_APP_ID     = process.env.TENCENT_APP_ID     || '1316992450';

var MIME = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};

// 本地内存存储（替代云函数，局域网内秒同步）
var localStore = {};

// 共用请求处理函数（HTTP 和 HTTPS 共享）
function handleRequest(req, res) {
  var parsed = url.parse(req.url, true);

  // CORS 预检
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type,X-Api-Key','Access-Control-Allow-Methods':'POST,GET,OPTIONS'});
    res.end();
    return;
  }

  // API: 先走本地内存，云函数作为备用
  if (parsed.pathname === '/api') {
    var body = [];
    req.on('data', function(chunk) { body.push(chunk); });
    req.on('end', function() {
      var postData = Buffer.concat(body).toString();
      var reqObj;
      try { reqObj = JSON.parse(postData); } catch(e) { reqObj = {}; }

      // 本地内存处理（不走云函数，秒级响应）
      if (reqObj.action === 'set') {
        localStore[reqObj.key] = reqObj.value;
        console.log('[LOCAL] set', reqObj.key, '=', String(reqObj.value).substring(0, 80));
        res.writeHead(200, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
        res.end(JSON.stringify({code:0, msg:'ok'}));
        return;
      }
      if (reqObj.action === 'get') {
        var val = localStore[reqObj.key] || null;
        res.writeHead(200, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
        res.end(JSON.stringify({code:0, data: val}));
        return;
      }

      // 未知 action，返回空
      res.writeHead(200, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
      res.end(JSON.stringify({code:0}));
    });
    return;
  }

  // ===== SCF 代理（解决 HTTPS→SCF 跨域问题）=====
  if (parsed.pathname === '/api/scf') {
    var body = [];
    req.on('data', function(chunk) { body.push(chunk); });
    req.on('end', function() {
      var postData = Buffer.concat(body).toString();
      var scfUrl = 'https://1316992450-2fbeeh6iet.ap-guangzhou.tencentscf.com/';
      var scfReq = https.request(scfUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'merry-quiz-2026-secret'
        }
      }, function(scfRes) {
        var chunks = [];
        scfRes.on('data', function(c) { chunks.push(c); });
        scfRes.on('end', function() {
          var result = Buffer.concat(chunks).toString();
          res.writeHead(scfRes.statusCode || 200, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
          res.end(result);
        });
      });
      scfReq.on('error', function(err) {
        res.writeHead(500, {'Content-Type':'application/json'});
        res.end(JSON.stringify({code:-1, msg: err.message}));
      });
      scfReq.write(postData);
      scfReq.end();
    });
    return;
  }

  // ===== 服务端 TTS（speechSynthesis 不可用时的备用方案）=====
  if (parsed.pathname === '/api/tts') {
    var text = (parsed.query && parsed.query.text) || '';
    if (!text) { res.writeHead(400); res.end('missing text'); return; }
    // 用 macOS say 命令生成 WAV（兼容所有浏览器）
    var tmpAiff = '/tmp/tts_' + Date.now() + '.aiff';
    var tmpWav = '/tmp/tts_' + Date.now() + '.wav';
    var child_process = require('child_process');
    // 安全：只允许字母数字空格和基本标点
    var safeText = text.replace(/[^a-zA-Z0-9 .,!?']/g, '');
    // say → AIFF → afconvert → WAV（Safari/Chrome/iOS全兼容）
    var cmd = 'say -v Samantha -o ' + tmpAiff + ' "' + safeText + '" && afconvert -f WAVE -d LEI16 ' + tmpAiff + ' ' + tmpWav;
    child_process.exec(cmd, function(err) {
      fs.unlink(tmpAiff, function() {}); // 清理AIFF
      if (err) { res.writeHead(500); res.end('TTS error'); return; }
      fs.readFile(tmpWav, function(readErr, data) {
        fs.unlink(tmpWav, function() {}); // 清理WAV
        if (readErr) { res.writeHead(500); res.end('read error'); return; }
        res.writeHead(200, {'Content-Type': 'audio/wav', 'Cache-Control': 'public, max-age=86400'});
        res.end(data);
      });
    });
    return;
  }

  // ===== 语音评分 API =====
  if (parsed.pathname === '/api/speech-eval') {
    var body = [];
    req.on('data', function(chunk) { body.push(chunk); });
    req.on('end', function() {
      var postData = Buffer.concat(body).toString();
      var reqObj;
      try { reqObj = JSON.parse(postData); } catch(e) { reqObj = {}; }

      res.writeHead(200, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});

      if (!reqObj.audio || !reqObj.text) {
        res.end(JSON.stringify({code:-1, msg:'missing audio or text'}));
        return;
      }

      if (!SOE_SECRET_ID || !SOE_SECRET_KEY) {
        console.log('[SOE] 未配置密钥！请设置环境变量 TENCENT_SECRET_ID 和 TENCENT_SECRET_KEY');
        // 未配置API → 返回 null 四字段，客户端不写入 SOE 字段
        res.end(JSON.stringify({code:-1, msg:'SOE not configured', score:null, soePronAccuracy:null, soePronFluency:null, soePronCompletion:null, recognized:'(API未配置)'}));
        return;
      }

      callTencentSOE(reqObj.audio, reqObj.text, function(err, result) {
        if (err) {
          console.log('[SOE] error:', err.message || err);
          // 失败 → 返回 null 四字段，不阻塞答题
          res.end(JSON.stringify({code:-1, msg:String(err.message || err), score:null, soePronAccuracy:null, soePronFluency:null, soePronCompletion:null, recognized:''}));
          return;
        }
        res.end(JSON.stringify({
          code: 0,
          score: result.score,
          soePronAccuracy: result.soePronAccuracy,
          soePronFluency: result.soePronFluency,
          soePronCompletion: result.soePronCompletion,
          recognized: result.recognized || ''
        }));
      });
    });
    return;
  }

  // Static file serving
  var filePath = path.join(ROOT, parsed.pathname === '/' ? 'index.html' : parsed.pathname);
  fs.readFile(filePath, function(err, data) {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    var ext = path.extname(filePath);
    res.writeHead(200, {'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0', 'Pragma': 'no-cache', 'Expires': '0'});
    res.end(data);
  });
}

// HTTP server
var server = http.createServer(handleRequest);
server.listen(PORT, '0.0.0.0', function() {
  console.log('HTTP  → http://0.0.0.0:' + PORT);
});

// HTTPS server（iOS Safari 要求 HTTPS 才能用 getUserMedia）
var certPath = path.join(__dirname, '_cert.pem');
var keyPath = path.join(__dirname, '_key.pem');
if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
  var httpsServer = https.createServer({
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath)
  }, handleRequest);
  httpsServer.listen(HTTPS_PORT, '0.0.0.0', function() {
    console.log('HTTPS → https://0.0.0.0:' + HTTPS_PORT + '  ← iPhone用这个');
  });
} else {
  console.log('[HTTPS] 未找到 _cert.pem/_key.pem，HTTPS未启动');
  console.log('  生成方式：openssl req -x509 -newkey rsa:2048 -keyout _key.pem -out _cert.pem -days 365 -nodes');
}

if (!SOE_SECRET_ID || !SOE_SECRET_KEY) {
  console.log('[SOE] ⚠️  语音评分API未配置（录音测试可用，评分fallback 70分）');
} else {
  console.log('[SOE] ✅ 语音评分API已配置');
}

// ===== 腾讯云智聆口语评测 新版 API (WebSocket) =====

function callTencentSOE(audioBase64, refText, callback) {
  var wordCount = refText.trim().split(/\s+/).length;
  var voiceId = 'soe_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8);
  var timestamp = Math.floor(Date.now() / 1000);
  var expired = timestamp + 3600;
  var nonce = Math.floor(Math.random() * 1000000000);

  // 请求参数
  var params = {
    secretid: SOE_SECRET_ID,
    timestamp: String(timestamp),
    expired: String(expired),
    nonce: String(nonce),
    server_engine_type: '16k_en',
    voice_id: voiceId,
    eval_mode: String(wordCount <= 1 ? 0 : 1),  // 0=单词(仅1词) 1=句子(2词及以上)
    score_coeff: '4.0',  // 4.0=最宽松（范围1.0-4.0），适合小学生
    ref_text: refText,
    voice_format: '1',  // WAV
    sentence_info_enabled: '1'
  };

  // 签名：按key字典序排列，拼接URL，HMAC-SHA1 + Base64
  var sortedKeys = Object.keys(params).sort();
  var queryForSign = sortedKeys.map(function(k) { return k + '=' + params[k]; }).join('&');
  var signStr = 'soe.cloud.tencent.com/soe/api/' + SOE_APP_ID + '?' + queryForSign;
  var signature = crypto.createHmac('sha1', SOE_SECRET_KEY).update(signStr).digest('base64');

  // 构造 WebSocket URL
  params.signature = signature;
  var urlQuery = Object.keys(params).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
  }).join('&');
  var wsUrl = 'wss://soe.cloud.tencent.com/soe/api/' + SOE_APP_ID + '?' + urlQuery;

  var done = false;
  var evalResult = null;

  var timer = setTimeout(function() {
    if (!done) { done = true; try { ws.close(); } catch(e) {} callback(new Error('WebSocket timeout')); }
  }, 15000);  // 与客户端 TIMEOUT_MS 一致

  var ws = new WebSocket(wsUrl);

  ws.on('open', function() {
    console.log('[SOE] WebSocket connected, sending audio...');
    var audioBuffer = Buffer.from(audioBase64, 'base64');
    // 分块发送 WAV（与得82分时完全一致的方式）
    var chunkSize = 1280;
    var offset = 0;
    function sendChunk() {
      if (offset < audioBuffer.length) {
        var end = Math.min(offset + chunkSize, audioBuffer.length);
        ws.send(audioBuffer.slice(offset, end));
        offset = end;
        setTimeout(sendChunk, 10);
      } else {
        ws.send(JSON.stringify({ type: 'end' }));
        console.log('[SOE] WAV sent (' + audioBuffer.length + ' bytes)');
      }
    }
    sendChunk();
  });

  ws.on('message', function(data) {
    try {
      var msg = JSON.parse(data.toString());
      console.log('[SOE] msg:', JSON.stringify(msg).substring(0, 200));

      if (msg.code !== 0) {
        if (!done) {
          done = true; clearTimeout(timer); ws.close();
          callback(new Error('SOE code=' + msg.code + ': ' + (msg.message || '')));
        }
        return;
      }

      // 解析评分结果
      if (msg.result) {
        try { evalResult = typeof msg.result === 'string' ? JSON.parse(msg.result) : msg.result; } catch(e) {}
      }

      // final=1 表示评测完成
      if (msg.final === 1) {
        if (!done) {
          done = true; clearTimeout(timer); ws.close();
          if (evalResult) {
            // SOE 返回值已是百分制（0-100），直接取整
            var score = Math.round(evalResult.SuggestedScore || evalResult.PronAccuracy || 0);
            var pronAcc = (typeof evalResult.PronAccuracy === 'number') ? Math.round(evalResult.PronAccuracy) : null;
            var pronFlu = (typeof evalResult.PronFluency === 'number') ? Math.round(evalResult.PronFluency) : null;
            var pronCmp = (typeof evalResult.PronCompletion === 'number') ? Math.round(evalResult.PronCompletion) : null;
            var recognized = '';
            if (evalResult.Words && evalResult.Words.length > 0) {
              recognized = evalResult.Words.map(function(w) { return w.Word; }).join(' ');
            }
            console.log('[SOE] refText="' + refText + '" score=' + score + ' acc=' + pronAcc + ' flu=' + pronFlu + ' cmp=' + pronCmp);
            callback(null, { score: score, soePronAccuracy: pronAcc, soePronFluency: pronFlu, soePronCompletion: pronCmp, recognized: recognized });
          } else {
            callback(new Error('No result received'));
          }
        }
      }
    } catch(e) {
      console.log('[SOE] parse error:', e.message);
    }
  });

  ws.on('error', function(err) {
    console.log('[SOE] ws error:', err.message);
    if (!done) { done = true; clearTimeout(timer); callback(err); }
  });

  ws.on('close', function() {
    if (!done) { done = true; clearTimeout(timer); callback(new Error('WebSocket closed unexpectedly')); }
  });
}
