# Changelog

> 记录每次重要功能变更。目的：研究答辩时能说清楚"哪个班用的是哪个版本"。
> 格式：日期 + 一句话说变了什么 + 影响哪些题型

---

## 2026-04

### 2026-04-20 (48)
- 🔗 **教师-学生指令同步打通**：修复教师发布课程后学生端收不到的问题。根因：飞书免费版API配额超限（1万次/月），学生轮询消耗~4.4万次/月。修复：①`firebase-sync.js` 的 `_isLocal` 扩展匹配私有IP（192.168.x.x等），本地网络走 `/api` 内存存储；②`tencent_scf.js` 教师指令（teacherCommand/currentLesson）改存SCF内存变量+`/tmp`文件双保险，不再走飞书API；③飞书token延迟获取（`ensureToken`），教师指令请求完全不触发飞书API。月飞书调用量从~4.5万降到~3000次，免费额度够用。已部署SCF并测试通过。决策详见 `docs/decisions/ADR-016_教师指令存SCF内存替代飞书.md`。

### 2026-04-19 (47)
- 📄 **Figure 1 & Figure 2 定稿**：Figure 1加AI sidebar（ZPD内右侧竖条，Development/Delivery/Adaptation三层）；Figure 2全面升级——3P从纯Banner改为矩阵行+简化Banner、矩阵行顺序改为SC→ZPD→SLA→3P→CLT→SE（和Figure 1一致）、标题/Legend/Note全部重写更通俗、AI横条改为三列卡片对齐Figure 1、Integration Points按Phase排列、3P行加截图。两张图PNG放桌面发导师。决策详见 `docs/decisions/ADR-015_Figure1-Figure2定稿与导师汇报.md`。

### 2026-04-19 (46)
- 🔊 **修复 GitHub Pages 音频不播放**：3个根因修复。①`speakWord()` 在非 localhost 时被 AudioContext suspended 状态阻断，没能走到 speechSynthesis 分支——修复：把 `!_ttsIsLocal` 判断提到最前，不经过 AudioContext 检查直接调用 speechSynthesis。②Chrome speechSynthesis 长时间使用后卡死——修复：所有 `speak()` 调用前加 `cancel()`（app.js speakFeedback/speakEncouragement/speakWord，coop-types.js 所有支架触发点共6处）。③coop-types.js 第1726行 `new Audio(q.audio).play()` 用 URL 方式播放文本内容——修复：改为 `speakWord(q.audio)`。app.js→v133，coop-types.js→v129。

### 2026-04-19 (45)
- 📄 **Figure 2 Theory Activation Matrix v4 完成+专家审查**：完成 `docs/conceptual_framework/figure2_v4.html`——5理论×4阶段矩阵，3P顶部Banner，Integration Points底部卡片加Phase标签。所有格子配真实App截图（含Secondary）。Opus专家+导师视角双重审查后修正6处：SLA P2补充Swain pushed output；ZPD标注"inherent SC mechanism"；SC P1文字匹配截图；SE P2去重聚焦vicarious experience；Note补充SC认识论定位和ZPD关系说明；Integration Points加Phase标签。决策详见 `docs/decisions/ADR-014_Figure2理论激活矩阵设计与审查.md`。

### 2026-04-19 (44)
- 📋 **ADR-013 决策归档：Project功能优化——三轮考察+错题重做+海报差异化**：记录今日全部设计决策（三轮递进R1认词/R2理解句/R3补句型、4选项×2次机会答题机制、每轮错题重做1次不循环、第3轮改考核心句型is/has/can、补句子题显示中文名不显示英文名、海报差异化灰色剪影/区域结算加学生名字/去掉My Sentences/全中文海报/2×2一屏截图、干扰选项三层取源策略）及今日修复的7个bug（eliminated计数/0 falsy死循环/数组引用/lovely超纲词/"..."占位/双重导航栏/空白缩略图）。见 `docs/decisions/ADR-013_Project功能优化三轮考察错题重做海报差异化.md`。

### 2026-04-19 (43)
- 🔒 **Project卡片解锁机制**：单元海报卡片默认灰色锁定（🔒+提示文字），四个模块（听力/阅读/写作/口语）全部完成（`moduleComplete_*` localStorage 均存在）后自动解锁（🎨+橙色渐变+弹跳动画）；锁定时点击触发抖动提示；登录后、返回模块选择页时均刷新状态；卡片横跨两列排在第5位。影响：index.html, adventure.js, app.js, style.css。adventure.js→v131, app.js→v130。

### 2026-04-19 (42)
- 🎨 **UI优化：收集展示栏改为顶部横条 + 结算页统计简化**：`buildThumbWrap` 从右上角88px小方块改为顶部居中横条（全屏宽、60-70px高），使用zone的bgGradient渐变背景；已收集动物显示38px圆形彩色头像，未收集/待收集位置显示灰色问号/爪印占位；R1/R2/R3/retry四个轮次统一使用新展示栏。区域结算页（`renderZoneResult`）收集统计从三个独立数字（已收集/未收集/描述句）改为动物头像一览：已收集显示44px绿色圆形头像，失败的显示灰化头像，满分时显示"🎉X只全部收集！"。影响：adventure.js。

### 2026-04-15 (41)
- 🎯 **教师端一键跳转全班模块**：`teacher/dashboard.html` 顶部新增"全班跳转"面板，4个按钮（听力/阅读/写作/口语），点击后通过 `teacherCommand` 发送 `{action:'navigate', module:X}` 指令；`app.js` 新增 `navigate` 动作处理，调用 `window.showAdventureMap(module)` 直接跳转到指定冒险地图；dashboard SCF_URL 改为 `/api/scf` 与学生端共用同一代理通道。影响：app.js, teacher/dashboard.html。

### 2026-04-14 (40)
- 🎤 **SOE评分深度排查中**：Agent排查评分参数（ScoreCoeff/EvalMode）、音频质量、录音预热等根因。待Agent完成后更新。

### 2026-04-14 (39)
- 🎤 **录音提示"大声读3遍"+最短3秒**：`attachSoeRecordButton` 录音中按钮改为"🔴 大声读2~3遍，读完点这里"，3秒内点停止会提示"再多读X秒"，防学生秒停导致0分。影响：coop-types.js。

### 2026-04-14 (38)
- 🐛 **修复口语题正确率永远50%bug**：`onStepAComplete` 中口语题传入 `speak_done`/`read_done` 但只跟 `q.stepA.correct` 比较（undefined），导致A永远算错。修为：speak_done/read_done 直接算A正确。影响：adventure.js。

### 2026-04-14 (37)
- 📱 **iPhone显示修复三项**：(1) 情境阅读英文不可见+卡住 → `.content-area` overflow 改 auto，英文字号18→26px；(2) 全局7处图片加 max-height:120px；(3) 合作拼词字母块60→44px、按钮52→48px。影响：style.css, coop-types.js。

### 2026-04-14 (36)
- 🔊 **TTS音频改为服务器端生成+Web Audio API播放**：彻底放弃浏览器speechSynthesis（Chrome/Safari各种bug），改为：speakWord() → XHR请求 /api/tts → 服务器用macOS say生成WAV → AudioContext.decodeAudioData → BufferSource播放。iOS首次触摸解锁AudioContext。影响：app.js, _server.js。

### 2026-04-14 (35)
- 🎤 **口语模块全面改造**：(1) read_relay StepB补"先听一遍"按钮；(2) picture_speak从选择题改为录音口语题+SOE评分；(3) dialogue问答句加🔊播放按钮+支架Level2重播；(4) B区"听A怎么读的"改为显示A真名；(5) 支架文案改"先听一遍再跟着读"；(6) 评语根据SOE分数分级；(7) 跟读句子去末尾标点再评分。影响：coop-types.js, adventure.js。

### 2026-04-14 (34)
- 🔑 **SOE评分服务器密钥配置**：服务器需用 `_start.sh` 启动或手动设环境变量 TENCENT_SECRET_ID/KEY，否则评分返回null。影响：_server.js。

### 2026-04-14 (33)
- 🚫 **服务器禁止缓存**：Cache-Control 从 no-cache 改为 no-store, must-revalidate, max-age=0，解决测试时浏览器缓存旧代码问题。影响：_server.js。

### 2026-04-14 (32)
- 🌟 **SOE得分颜色改白底**：分数显示改为白色背景+彩色边框（>=60绿/0<橙/<0红），防止绿字在绿按钮上看不清。影响：coop-types.js。

### 2026-04-13 (31)
- **恢复 targetWord 字段 + 创建导师数据架构说明文档（v=107）**：在 `buildBehaviorRecord` 中恢复 `targetWord` 字段，从题目数据提取目标词/句（覆盖所有题型：word/audio/sentence/template/stepA.correct/stepA.expected/sequence/pairs/scenario）。recA 和 recB 均包含该字段。同时创建 `docs/数据架构_导师说明.md`（英文），详细说明 17 个字段各自对应的研究目标(Obj1-4)和分析方法，供导师审阅。影响：data-reporter.js, index.html, docs/。

### 2026-04-13 (30)
- **精简飞书上报为单表 app_behavior_log（v=106）**：移除 student_profile 和 pair_collab_log 两张表的写入逻辑，`enqueueStudentUpdate`/`flushStudentQueue`/`enqueuePairLog`/`flushPairQueue`/`buildStudentUpdate`/`buildPairRecord` 全部改为 no-op（保留函数壳，调用方不报错）。移除 `_studentAccum` 累积器。behavior_log 精简字段：移除 `starRewarded`/`stationCompleted`/`stationStarRating`（可从 isCorrect+scaffoldLevel 派生）、`clientVersion`（仅开发用）、`soePronAccuracy`/`soePronFluency`/`soePronCompletion`（只保留 soeScore）。保留字段：logId, studentId, partnerId, pairId, classId, sessionDate, lessonId, stationId, questionType, questionIndex, isCorrect, asRoleA, timeSpentMs, scaffoldLevelUsed, retryCount, soeScore。影响：data-reporter.js, index.html。

### 2026-04-13 (29)
- **修复飞书 app_behavior_log 字段类型不匹配（v=105）**：完整审计所有字段。核心bug：SOE四字段（soeScore/soePronAccuracy/soePronFluency/soePronCompletion）在录音跳过或失败时，soeA/soeB 是 `{soeScore:null,...}` 对象（truthy），旧代码 `soeA ? soeA.soeScore : 0` 会把 `null` 发到飞书 Number 字段导致写入失败。改为 `_safeNum()` 防御函数，确保只发 number 或 0。同时对 shared 对象所有 Number 字段加 `Number()` 兜底（retryCount/scaffoldLevelUsed/timeSpentMs/starRewarded/stationStarRating/questionIndex）。影响：data-reporter.js, index.html 版本号 bump。

### 2026-04-13 (28)
- 🔍 **已发现待修：支架提示需要区分A/B角色**。当前 `getScaffoldHintHtml` 对A和B给出相同的支架提示，但A/B任务语言不同时（如A选英文词、B选中文释义），英文支架（首字母提示 b___）对需要选中文的B毫无帮助。待修方案：A错→给英文相关支架（首字母、音频重播等），B错→给中文相关支架（图片提示、拼音提示、情境描述等）。涉及 coop-types.js `getScaffoldHintHtml` 需增加角色判断逻辑。理论依据：**ZPD + Scaffolding（Vygotsky/Wood）**——支架必须校准到具体任务需求（calibrated to the specific task demand），而非通用的。

### 2026-04-12 晚 第三轮 (27)
- 🎬 **关卡intro页面美化**：背景改为暖色渐变（淡黄→淡橙→淡粉→淡紫蓝），增加浮动装饰emoji，"第X关"加白色圆角标签。

### 2026-04-12 晚 第三轮 (26)
- ✅ **A提交后按钮保持绿色**：不再变灰，改为绿底白字"已提交，等同伴答题"，符合做题习惯。

### 2026-04-12 晚 第三轮 (25)
- 💬 **优化按钮文案**："先选一个答案"改为"点击上方选答案"，更贴切。

### 2026-04-12 晚 第三轮 (24)
- 🗺️ **恢复"查看地图"按钮**：非最后站完成界面增加灰色小字"查看地图"次要按钮，主按钮仍为"继续冒险"。

### 2026-04-12 晚 第三轮 (23)
- 🐛 **修复"提交中..."按钮永久残留bug**：coop-types.js renderCoopStepB 增加A区按钮重置逻辑，提交后显示绿色"已提交，等同伴答题"。

### 2026-04-12 (22)
- ✨ **选项选中反馈增强**：选中选项显示绿色粗边框+浅绿背景+右上角勾号+按压弹回动画，让学生清楚看到自己选了什么。理论依据：**CLT（Sweller）**——明确的视觉反馈减少 extraneous load（"我到底选了没？"的困惑）；**Self-efficacy（Bandura）**——即时正向视觉确认强化 mastery experience。

### 2026-04-12 (21)
- ⭐ **星星计算修正**：90%+=3星、70-89%=2星、<70%=1星，基于首次作答正确率（不含错题重做）。之前阈值不合理导致评价失准。

### 2026-04-12 (20)
- 🎨 **所有弹窗不透明背景**：答对浅绿、答错浅橙、通关金色、错题浅蓝、介绍页渐变，统一视觉风格。理论依据：**CLT（Sweller）**——不透明背景消除底层内容干扰，减少 extraneous load。

### 2026-04-12 (19)
- 🗺️ **地图增强**：已完成关卡显示星星+正确率，当前关卡高亮+脉冲动画，未解锁显示锁头，底部总星数统计。理论依据：**Self-efficacy（Bandura）**——可视化进度和成就是 mastery experience 的外显化，帮助学生建立"我能做到"的信念。

### 2026-04-12 (18)
- 🐛 **地图闪退修复**：模块完成时弹窗改为 overlay 方式（不再用 alert/confirm 阻塞），localStorage 持久化防重复弹出。

### 2026-04-12 (17)
- 💬 **答对反馈改为底部轻量 toast**：1.5 秒自动消失，不需点"继续"按钮。理论依据：**CLT（Sweller）**——减少不必要的交互步骤（点"继续"）= 减少 extraneous load，让学生保持答题心流。

### 2026-04-12 (16)
- 💬 **评语多样化系统**：36 条评语覆盖 10 个场景（答对/答错/连续答对/错题重做答对/通关等），避免固定评语被学生忽略。理论依据：**Self-efficacy（Bandura）** verbal persuasion——情境化正面评语是有效的言语说服；**CLT（Sweller）**——固定不变的评语被习惯性忽略变成无效 extraneous load，多样评语让反馈成为有意义的 germane load。

### 2026-04-12 (15)
- 📢 **非口语题型全部移除录音**：只有口语模块（read_relay/picture_speak/dialogue）保留 SOE 评分，其他题型恢复"选完就过"。理由：听力/阅读/写作模块核心能力不是口语输出，强制录音偏离模块目标且 iPhone 6 Plus 体验差。

### 2026-04-12 (14)
- 🔄 **站内错题重做机制（ADR-011）**：答错的题进错题库，关卡结束后必须全部一次性答对才通关。错题打乱顺序、记录 errorCount、进度条显示"错题 X/N"。理论依据：**ZPD + Scaffolding（Vygotsky/Wood）**——错题重做是即时补救性支架；**CLT（Sweller）**——打乱顺序防止机械记忆，保证 germane load。

### 2026-04-12 (13)
- 🎬 **关卡过渡介绍页**：进入新关卡前显示全屏介绍（关卡名+题数+emoji），不透明渐变背景。理论依据：**CLT（Sweller）**——提前告知关卡信息降低不确定性带来的 extraneous load；**Self-efficacy（Bandura）**——明确的任务预期帮助学生建立信心。

### 2026-04-12 (12)
- 🧭 **关卡导航修复**："继续冒险"按钮直接进下一关开始答题，不再跳到结算页。之前的行为让学生多点一步才能开始，增加不必要的操作。

### 2026-04-12 (11)
- 💬 **评语多样化系统**：答对/答错/连续答对/错题重做答对/通关等不同场景给不同评语，避免固定评语被学生忽略。理论依据：**Self-efficacy（Bandura）** verbal persuasion——情境化的正面评语是言语说服的有效形式，比千篇一律的"做对了"更能建立自我效能感；**CLT（Cognitive Load Theory, Sweller）**——固定不变的评语会被学生习惯性忽略，变成无效的 extraneous load，而根据场景变化的多样评语让反馈变成有意义的 germane load，帮助学生主动加工学习体验。

### 2026-04-12 (10)
- 📢 **决策变更：非口语题型全部移除录音**。继条目(8)移除4个听力题型录音后，进一步移除阅读+写作题型（flip_match/sentence_sort/read_scenario/build_sentence/relay_fill/spell_word/write_scenario/word_relay）的B步骤录音环节，恢复"选完就过"。**只有口语模块（read_relay/picture_speak/dialogue）保留录音+SOE评分**，共3题型×A/B=6个录音点。理由：(1) 听力/阅读/写作模块核心能力不是口语输出，强制录音偏离模块教学目标；(2) iPhone 6 Plus (iOS 12) 录音体验差（麦克风电平极低，SOE得分仅30-32分），非必要场景不应强加；(3) Output Hypothesis 通过口语模块3题型6录音点已充分体现。P2-1/P2-2 任务标记为"已撤销"。

### 2026-04-12 (9)
- 确立专业开发测试流程：代码修改→`node --check` 语法验证→Puppeteer 自动化回归（test-ui-auto.js）→Mac 浏览器手动验证→最后真机 iPhone 验证。每一层过了才进下一层，避免在真机上浪费时间调低级错误。

### 2026-04-12 (8)
- 去掉听力类题型（listen_relay/listen_judge/listen_sort/listen_scenario）B步骤的录音环节，恢复"选完就过"。听力模块目标是"听懂"不是"说"，听力理解≠口语输出，录音是多此一举。~~录音保留在非听力题型~~ → 见条目(10)进一步移除阅读+写作题型录音。

### 2026-04-12 (7)
- 🛡️ **B009 举一反三**：coop-types.js 全 10 处 `zoneB.className = 'coop-zone coop-zone-B active'` 均补加 `zoneB.style.pointerEvents = 'auto'` 内联兜底，防 iOS 12 WebKit pointer-events 不还原导致 B 区按钮点不了。

### 2026-04-12 (6)
- 🎤 **SOE 真机调试**：iPhone 6 Plus (iOS 12.5.7) 真机验证全链路跑通。修复：HTTPS 必须（getUserMedia 要求）/ 归一化增益（peak 0.004→0.9）/ score_coeff 4.0 / 手动录音交互（点击开始→点击停止）/ AudioContext 重置防 iOS 12 静音 bug / 分数显示在按钮上。已知限制：iPhone 6 Plus 麦克风电平极低导致分数偏低（30-32 分），后期优化。

### 2026-04-12 (5)
- 🛡️ **P2-3：B 步骤开口跳过按钮 3 秒冷却**（coop-types.js L116-117）：`renderSayPhase` 跳过按钮初始 `display:none`，3 秒后 setTimeout 显示。防学生秒点跳过零录音。统一 helper 改一处覆盖全部 9 题型。

### 2026-04-12 (4)
- 🎤 **P2-1/P2-2：9 题型 B 步骤加"念词/念句"开口阶段**（coop-types.js）：新增 `appendSpeakStage(parent, refText, role, opts)` 统一支架，复用 P1-9 `attachSoeRecordButton`，含"我不会说"兜底按钮（写 null 分数后继续）。改造题型：listen_sort（念整段序列）/ listen_scenario（念 A 听到的动物名）/ flip_match（念全部配对词）/ sentence_sort（念整句）/ read_scenario（念 B 选的英文词）/ build_sentence（念整句）/ relay_fill（念填空完整句）/ spell_word（念拼出的单词）/ write_scenario（念 B 选的英文句子）。引用文本全部来自 `q.sequence/q.sentence/q.word/q.pairs/q.template`，零硬编码。~~Output Hypothesis 现覆盖全部 12 个非纯听力题型~~ → 已于条目(8)(10)撤销，最终仅口语模块3题型保留录音+SOE。data-reporter.js 不动，soeScore 四字段继续从 `_pendingSoeScores.B` 取值双写到飞书。

### 2026-04-12 (3)
- 通关界面视觉大改：金色渐变背景 + 奖杯跳动动画 + 星星逐个淡入 + 大字正确率；新增"继续冒险 →"按钮（有下一站时显示）+ 最后一站"🎊 全部完成！"
- 修闪退根因：`renderCoopQuestion`/`onStepAComplete`/`onStepBComplete`/`updateStationHeader` 四处加 `if (!station) return` + `if (!q) return` 防护，避免 stale callback 导致白屏
- QA 全通过：Puppeteer 7/7，B001-B021 零命中，node --check 全通过

### 2026-04-12 (2)
- 🐛 **闪退修复：renderCoopQuestion/onStepAComplete/onStepBComplete 增加 station/q null 防护**（adventure.js）：三处 `station.questions[...]` 调用均无 null guard，stale callback 触发时 station=undefined → crash。修法：在 renderCoopQuestion(L336)、onStepAComplete(L393)、onStepBComplete(L427)、updateStationHeader(L309) 各加 `if (!station) return` + `if (!q) return` 保护。
- ✨ **通关界面视觉大改**（adventure.js + style.css）：`showStationCompleteOverlay` 全面重设计 —— 渐变金色背景(#FFF9C4→#FFE082)、奖杯图标(80px) bounce 动画、三颗星逐个 fadeInStar 出现(delay 0.1/0.3/0.5s)、正确率大字(28px 橙色)、CSS keyframes 动态注入(无重复)。按钮区新逻辑：有下一站→ 绿色"继续冒险 →"(主) + 灰色"查看地图"(次)；最后一站→ "🎊 全部完成！"+ 绿色"查看地图"。1星还有"再试一次"按钮。"查看地图"直接跳地图(backToAdventureMap)，"继续冒险"走原 showStationComplete 详情页。

### 2026-04-12
- 📋 **ADR-010 写入：Project-based 题型定位为单元 L4 大作业**（`docs/decisions/ADR-010_*.md`）。五专家一致投票合作情景剧（Social Constructivism 深层协商 + SLA Output + Mastery Experience），7 条设计原则（剧本脚手架/AB自选角色/3-6轮对话/AI示范/2-3台词选项防退化/兜底按钮/可重录）。**实施延后到 Phase 3**：U1 词汇累积池审计发现 U1L2/L3/L4 题库和知识点清单全部未建（`docs/U1_词汇累积池.md`），project pilot 启动前必须先补完约 240 道题，工作量 6-9 天和汇报窗口冲突。汇报 DoD 从 10-15 天压缩到 5-7 天。
- 📋 **U1L1 词汇句型池审计**（`docs/U1L1_词汇句型池.md`）：可用词汇仅 20 个、句型仅 6 种陈述句 + 1 感叹，**0 问句 / 0 寒暄 / 0 祈使句**，zoo 英文超纲。这是 ADR-010 决策的硬约束来源。
- 📋 **U1 全单元词汇累积池审计**（`docs/U1_词汇累积池.md`）：理论上限 U1L4 可达 ~75-80 词 / ~15-18 句型 / 2 问句 / ~8 寒暄 / ~6 祈使句，🟢 理论支持情景剧；**但 U1L2/L3/L4 题库和清单全部未建**，实际开发必须先建题库。
- 🔍 **audit_2026-04-12 端到端扫描完成**（`docs/audit_2026-04-12.md`）：15/19 通过，**零回归**，B009-B015 全部稳定，U1L1 12 个超纲词零命中，app.js 裸 XHR 全部走 scfPost 带 X-Api-Key，桌面 max-width 已限定 #game-screen。发现 Phase 5 数据上报 3 个 bug（已在当日修复）。
- 🎤 **P1-9 SOE 口语评分接入**：新增 `modules/soe-evaluator.js`（getUserMedia+WAV 编码+16kHz 重采样+/api/speech-eval 代理调用，iOS 12 兼容，10s 超时，失败返回 null 四字段）；`coop-types.js` 顶部新增 `attachSoeRecordButton` 工具，改造 6 个 🎤 录音点（coop_read_relay/coop_picture_speak/coop_dialogue 的 A/B 两阶段）从自评按钮升级为真实录音按钮；`data-reporter.js` `buildBehaviorRecord` 从 `window._pendingSoeScores.A/B` 分别取分数写入 recA/recB 的 soeScore/soePronAccuracy/soePronFluency/soePronCompletion 四字段（对齐 ADR-006 schema）；`_server.js` `/api/speech-eval` 返回扩展为四字段（code/score/soePronAccuracy/soePronFluency/soePronCompletion/recognized），`callTencentSOE` 解析 evalResult 的 PronAccuracy/PronFluency/PronCompletion 全部透传。详见 `docs/SOE接入清单_2026-04-12.md`。⚠️ 真机未测试。
- 🐛 **Phase 5 Bug #1/2/3 修复**：data-reporter.js `buildBehaviorRecord` 改为返回 [A行,B行] 两条记录（每题双写，修 B数据全丢）；adventure.js `recordQuestionDetail` 改为遍历数组 enqueue + 累积 `stationProgress.totalCollabMs/questionCount`；`buildPairRecord` 改用 totalCollabMs/questionCount 计算 `avgCollabDurationMs`（修恒为0）；`asRoleA`/`isCorrect` 改为 JS 布尔值（ADR-006 定义为布尔字段）。影响：app_behavior_log 每题双行落表（A/B 各一行），pair_collab_log 合作时长字段正确写入。
- ✨ **B019 confirmMode 推广到所有合作题型**：listen_judge(StepB)/listen_scenario(read/write 共用 Scenario A+B)/word_relay(A+B)/relay_fill(A+B) 共 7 处 createOptionGrid 调用加上 `{ confirmMode: true, confirmText: '✅ 我选好啦' }`（coop-types.js:367/702/752/768/793/1352/1375），统一"点选→确认→提交"交互，消除 500ms 仓促提交。listen_judge 的 ✅对/❌错 按钮也改成同样的显式确认流程（coop-types.js:298-365，新增独立 tfConfirmBtn + tfPreSelect 状态机，保留原 coop-tf-btn 样式）。
- ✨ **补 listen_sort / listen_scenario 的 scaffold case**：coop-types.js:2058+ 新增两个 case 分支到 getScaffoldHintHtml，遵循 Gibbons"L3 不给答案"原则 —— L2 慢速重播、L3 关键词慢速重读 2 次、L4 第一张正确图片脉冲闪烁 / 语境 emoji 提示。triggerScaffoldSideEffect 同步新增 listen_sort L2/L3/L4 和 listen_scenario L2/L3 的副作用（speechSynthesis rate=0.5-0.6 + scaffold-glow）。字段引用通过 B013 检查：listen_sort 读 q.sequence，listen_scenario 读 q.audio/q.scenario/q.stepA.correct，全部真实存在。
- 写入 ADR-009：U1L1 题量规划与过站规则（保留 69 题 + 最低 3 题过站 + variable dosage）→ docs/decisions/ADR-009_*.md
- 🐛 **B019 真正的修法：listen_relay 改用显式"我选好啦"确认按钮**（上次 CSS transform 诊断只是旁支）。真实根因：createOptionGrid 的 500ms 自动提交 + 到期 lockOptions(pointerEvents:none) 对三年级学生太仓促，学生一旦点了第一张就无法改选，违反 L1 peer negotiation 支架精神。修法：createOptionGrid 新增 `opts.confirmMode` 参数（coop-types.js:125），confirmMode=true 时点图只加 .pre-selected 不自动提交，grid 下方渲染 52px 高的绿色 "✅ 我选好啦" 按钮，选中前 disabled 灰色，选中后 enabled 可点，按下才 lock+onSelect。只在 listen_relay 的 A/B 两个调用点启用（coop-types.js:246/276），其他 4 个题型（listen_judge/listen_scenario/listen_sort/relay_fill）默认 confirmMode=false 保持现状。新增 CSS `.coop-confirm-btn` / `.coop-options-grid-wrap`（style.css:110+）。

### 2026-04-11
- 🐛 **B019 修复：listen_relay 学生无法改选（CSS transform 叠加吞 tap）**。现象：点第一张图后蓝边 pre-selected 出现，但 500ms 提交窗口内点其他图完全无反应，学生无法改主意。根因：createOptionGrid JS 逻辑其实已经正确（pendingTimer + clearTimeout + 允许切换，coop-types.js:125-163），但 CSS 里 `.pre-selected` 的 `transform:scale(0.97)` 与 `:active` 的 `transform:scale(0.95)` 在 iOS 12 WebKit 上叠加触发 compositing 层重建，吞掉兄弟卡的 touch 事件。修法：style.css:101 `.coop-option-card.pre-selected` 去掉 transform，改用 border-width:3px + box-shadow 外环做视觉反馈，保留 :active 的瞬时 scale 不动。影响所有 createOptionGrid 图片题型：listen_relay / listen_judge / listen_scenario / listen_sort / relay_fill。记为 B019。
- 🎓 **支架重设计样板：coop_listen_relay**（Gibbons 2015 原则：reduce load without removing task）。旧 L3 直接给中文翻译"熊"，把听力识别任务换成了阅读任务；L4 更甚。新设计：L2 在播放按钮旁加"慢速"橙色徽章提示按钮状态；L3 去除中文，改为慢速重读关键词 2 次 + 首音音素提示（如 /b.../）；L4 取消中文翻译，改为正确图片 border pulse 描边脉冲（`.scaffold-glow` 动画）+ 音频重播，学生仍需动手点击正确图。新增 CSS `@keyframes scaffold-pulse` / `.scaffold-glow` / `.scaffold-badge`。仅改 listen_relay 一个 case 分支，其他 12 个题型保持现状等实机确认再推广。审计报告：docs/scaffold_audit_2026-04-11.md（13 题型共 5 个 L3、11 个 L4 违反原则）。
- 🐛 **B017 修复：桌面浏览器屏幕拖不动**。根因：`.screen` 固定 `height:100vh` + `.content-area overflow:hidden` 把超出视口的内容切掉，桌面视口偏高时无法滚动；iPhone 实机因小屏 media query 刚好挤得下才没暴露。修法：仅在 `@media (min-width:481px)` 里给 `#game-screen` 加 `height:auto; min-height:100vh`、给 `#game-screen .content-area` 加 `overflow-y:auto`。手机真机（<481px）完全不受影响。影响：桌面测试所有 coop_* 题型都能正常纵向滚动。
- 🐛 B016 修复：coop_sentence_sort 站点删除 warmup 字段，不再做词义配对热身（功能词 is/a 无独立中文对应会导致配对卡死），进入即答题。影响：sentence_sort。

### 2026-04-11
- **audit v2 修复（对应 docs/audit_2026-04-12.md 6 处 + B013 防复发 + 白名单）**：data/u1l1_coop.js 清掉剩余词汇白名单泄漏 —— writing/s2/q1 干扰项 `small`→`fast`、writing/s2/q3 干扰项 `slow`→`cute`、writing/s2/q4 整题改写为 `They are birds. This one is cute.`（删除正确答案 `red`）、writing/s4/q1 干扰项 `That is a bird. It's small.`→`It can fly.`、writing/s4/q2 干扰项 `It's small.`→`It's cute.` + `It can fly.`→`It can run fast.`、speaking/s3/q3 B 台词 `Cool!`→`It can run fast!`；coop-types.js `getScaffoldHintHtml` 修 B013 亚型 —— coop_listen_judge L3/L4 标签 `句子文字`→`音频对应单词`（匹配 q.audio 实为单词的事实），coop_relay_fill L2 side-effect 从 `speakWord(q.audio)` 改为 `speakWord(q.stepA.correct || q.stepB.correct)`（数据无 q.audio）；全量扫描 getScaffoldHintHtml 所有分支字段存在性，未发现新 B013 隐患；docs/知识点清单_U1L1.md 新增「U1L1 白名单硬约束」章节 + 自检 grep；grep 零命中、node --check 通过。
- **U1L1 数据超纲词汇/句型修复**：data/u1l1_coop.js 按知识点清单合法范围清理超纲内容。listening/s1/q3 选项 cat→duck（含 stepB optionsMap 同步）；listening/s1/q5 选项 tiger→monkey；reading/s1/q3 选项 cat+tiger→duck+monkey；reading/s4 全站 3 题重写为"读描述找动物"：Q1 `It's big. It can run fast.`→horse、Q2 `It's cute. It can fly.`→bird、Q3 `This is a bear. It's big.`→bear，所有描述仅用 big/cute/fast/fly + 课本 This is/That is/It's/It can 句型；listening/s4 颜色场景 `red/blue/black bird`→`bird can fly` 会飞动物场景；writing/s4/q2 `It's beautiful.`→`It can fly.`；speaking/s2/q4 expected `This is a bird. It's beautiful.`→`This is a bird. It can fly.`。grep 扫 cat/tiger/dog/brown/black/white/yellow/has/and/long/legs/beautiful/hot/cold 全部零命中，node --check 通过。
- 桌面浏览器测试兼容：.screen 在 ≥481px 视口下 max-width:480px + 居中，避免 UI 被拉伸（手机真机不受影响）
- 桌面max-width约束从 .screen 改为 #game-screen，保留首页/选学生/选模块等页面原有宽度
- **修 P1-1**：app.js 两处裸 XHR（成绩上报 L260 + gems 备份 L3191）改为调 `scfPost()`，补上缺失的 `X-Api-Key`，消除 403 风险。
- **B014 听音接力图片仍然巨大的二次修复**（B012 第一版只修了 `.coop-zone width:100%` 不够）：真正根因是 `.coop-option-card` 作为 grid item 没设 `min-width:0`，CSS Grid 的 auto-min-size 会把列的最小宽度撑到内容 min-content（= img 自然宽度 640px），加上 line 2692 `.coop-option-card img { width:100% }` 和 line 97 `max-width:100%` 冲突（width:100% 胜出，且会与未定宽父级形成循环依赖，最终解到 img 自然宽度）。修法：`.coop-options-grid` 加 `width:100%; min-width:0`；`.coop-option-card` 加 `min-width:0; max-width:100%; overflow:hidden`；`.coop-option-card img` 两处规则（line 97/2702）统一改为 `max-width:100%; width:auto; max-height:110px; object-fit:contain`（绝不再用 `width:100%`）。index.html `style.css?v=10000→10001` bump 缓存。影响所有 createOptionGrid 图片题型（listen_relay / listen_judge / listen_scenario 等）。记为 B014。


- **4 级 ZPD 支架系统根因修复（B013）**：coop-types.js `getScaffoldHintHtml` 多个题型引用的是数据里不存在的字段，导致错了也看不到有内容的支架：
  - `coop_word_relay` 原引用 `q.answer`/`q.chinese`（不存在），改为从 `q.stepA.correct` + `q.stepB.optionsMap[word].correct` 派生英文+中文；新增 L4 side effect（播放正确单词音频 + 图片放大蓝框高亮）
  - `coop_read_relay` 原 L3 引用不存在的 `q.phonetic`，改为用 `q.chinese`；L4 改为 word+chinese 三重提示
  - `coop_picture_speak` 原引用顶层 `q.chinese`（不存在），改为 `q.stepA.chinese`
  - `coop_dialogue` 原引用顶层 `q.chinese`（不存在），改为 `q.scenario` + `q.stepA.chinese`
- **错误→支架映射全局调整**：adventure.js `handleCoopRetry` 映射改为 error1→L2（Modified Input）、error2→L3（语言线索）、error3→L4（多模态）、error4→强制跳过（原先是 error1→L1、error3→force skip）；Level 1 同伴协商 banner 在 `renderCoopQuestion` 中从一开始就显示（ZPD 默认 affordance）
- **新增 B013 bug 模式**：hint 引用的字段必须在题库 data 里真实存在。影响**所有 coop 题型**的错误链 —— 研究效度要求记录在案
- **B012 听音接力 A 区图片点不动修复**：style.css `.coop-zone` 增加 `width:100%; box-sizing:border-box`；新增 `.coop-option-card.pre-selected` 样式（点击后即时视觉反馈，不再等 500ms 黑屏）。根因：`.content-area` 是 `flex column + align-items:center + overflow:hidden`，coop-zone 未显式设宽导致 shrink-to-fit，`grid 1fr` 坍缩到图片自然宽度 640px，图片溢出 414 视口被裁掉大部分，学生看到"2 张巨大图"但 hit box 错位点不到。影响**所有用 createOptionGrid 渲染图片的 coop 题型**（listen_relay / listen_judge / listen_scenario 等）→ 记为 B012
- 删除 coop_category_sort 题型 — 5个专家一致认为无不可替代价值，5层支架设计是"题型本身错了"的信号；listen模块5→4站，speaking模块4→3站；保留B009/B010/AB轮换/B011模式作为今天的真实产出
- **coop_category_sort 减句 + overlay 修复**：data/u1l1_coop.js 把原 2 题×4 句重写为 3 题×2 句（题1 bear/bird、题2 horse/rabbit、题3 panda/monkey），词汇全部在课本范围，去掉 duck 避免新词，降低三年级口语极弱学生的认知负荷；coop-types.js `showCategorySortHandoff` 与 `showPartnerCheck` 的 fixed overlay z-index 从 9998/9999 升到 99999 并显式 append 到 document.body、副标题写死的"这 4 句话"改为 `sentences.length`，新增重复创建防护；`renderStepB_CategorySort` 强制 zoneB className=active + pointerEvents=auto + opacity=1 避免残留 waiting 态；三处加 console.log 追踪执行路径（修完可删）→ 记为新 bug 模式 B011
- **localStorage 越界容错**：adventure.js `loadAdventureProgress` 增加 stations 入参，对 `currentStation` clamp 到 `[0, stations.length-1]`，对 `completedStations` 过滤掉超出 `stations.length` 的 id。修复 listening 5→4、speaking 3→4 站点结构变更后老用户存档 currentStation=4 越界导致的闪退/行为异常
- **coop_category_sort 数据迁移 + B 阶段重写（实施）**：data/u1l1_coop.js 把原 listening 站点 5（2 题）整体剪切 → speaking 新增站点 4，theoryTags 改为 Self-efficacy / Output Hypothesis / Scaffolding；题目 stepB 扩充为 sentences[{sentence, ipa, chinese, emoji, category, word}]；coop-types.js 新增 showCategorySortHandoff 过场页（列 4 句 + 全部听一遍 + 我准备好了），renderStepB_CategorySort 重写为逐句朗读屏（L1 听一遍 / L2 完整句大字 / L3 音标 / L4 中文 / L5 单词拆分点读 + "我说完了" + "我不会说"保底 + 每句结束触发 A 的 yes/no 微任务反哺）
- **AB 角色全模块每题轮换**：adventure.js 新增 `adventureState.coopRoles=[0,1]`，在 onStepBComplete 答对后 shift、handleCoopRetry 强制跳过 shift 这两个"切到新题"的点 reverse 一次；coop-types.js renderCoopType 改为优先读 coopRoles[0] 作为 currentCoopRoleA（回退老的 qIndex 奇偶）。修复研究效度 bug：旧的 qIndex%2 在题目重做/队列重排时会让同一人连续做 A
- 清理旧方案代码：删除 18 个旧数据文件（data/lesson1.js + unit*_lesson*.js + U1L3_practice.json），index.html 同步删除 script 引用，app.js 加 typeof 守卫
- 修复 projectMap 缺 items 字段：U1L1/U1L4/U2L4/U3L4/U4L4 加 items: []（⚠️ 测试占位符，非真实数据）
- 测试结果：从 27✅/4❌ → 31✅/0❌
- 大小分类(coop_category_sort) 添加四级 ZPD 支架系统（修复理论对齐审查 ❌ → ✅）— L2动物名对照、L3提示首个BIG动物+卡片闪烁、L4完整正确分类+全卡片闪烁
- 修复情境听力(coop_listen_scenario) B区卡死 — iOS 12 pointer-events未重置导致按钮不可点
- 建立自动化QA流程（/app-qa skill + bug-patterns.md B001-B009）
- 项目配置 dangerouslySkipPermissions + JS语法自动检查Hook
- 修复 B010 — A 完成后自动滚动到 B 区，解决 iPhone 6 Plus 屏幕下方 B 选项被截断的"假卡死"
- 第二轮清理：删除旧方案 4 个题型模块（modules/listening.js / reading.js / writing.js / speaking.js）+ data/projects.js + 空目录 assets/audio/，同步清理 index.html / app.js / test-ui-auto.js
- 写入 ADR-005：游戏化系统（achievements/pet/quests/progress-map）保留，对应 Self-efficacy + 3P 理论，列入下一阶段重设计任务
- 测试结果保持 0❌（27✅，比上次少 4 个是删除了对旧函数的检测）
- 生成「题型 × 六理论」对照表 → docs/理论对齐审查表.md（13题型 × 6理论 = 78格，识别 4 个 ❌：其中 coop_flip_match Output 被标为答辩最大漏洞，9 个题型 SLA Output ⚠️ 普遍只点选不开口）
- 写入 ADR-002：KM矩阵与研究目标（Obj1-4）的对应框架 → docs/decisions/ADR-002_*.md
- 写入 ADR-003：六理论在 App 中的完整逻辑（一道题六理论同时工作）→ docs/decisions/ADR-003_*.md
- 写入 ADR-004：导师汇报视频设计决策（结构/叙事/时长）→ docs/decisions/ADR-004_*.md
- 完成导师汇报视频脚本（中英文双语）→ docs/导师汇报视频脚本.md
- **大小分类(coop_category_sort) 完整重设计**：从 listening 类别移到 speaking 类别；B 阶段新增 5 层支架（示范 → 字幕 → 音标 → 翻译 → 拆分点读，最后保底全开）；A 阶段新增零门槛口语任务（学生只需说 yes/no）；AB 角色每题自动轮换（此前仅 5 号支架 ZPD 框架作废，整题重写）
- 新增 3 条 memory：合作题型设计三问 / 共享屏幕原则 / Speaking题A零门槛口语
- **写入 ADR-006：App 数据收集与研究分析架构**（336行，10张表，含英文 Methods 章节可直接抄进论文 Chapter 3）
- **调查现有上报架构**：发现实际是 iPhone → 腾讯云 SCF → 飞书（不需要电脑中转），`firebase-sync.js` 的 `scfPost` 已带 X-Api-Key
- **发现 2 个 bug**：`app.js:260` 和 `app.js:3191` 两处裸 XHR 未带 X-Api-Key，鉴权开启后会 403（待修）
- ADR-006 架构更新：从"电脑中转方案"改为"复用现有腾讯云 SCF 路径"（Agent 后台执行中）

### 2026-04-09
- 翻牌配对(coop_flip_match) UI重写为多邻国风格3D翻转动画
- 句子排序(coop_sentence_sort) 新增三级锦囊支架系统
- 句子排序词块点击后可撤回
- 合作拼词(coop_spell_word) 修复顺序验证（之前只检查"填满了没有"）
- 合作拼词字母块可撤回
- 新增词义配对热身环节(renderWarmupMatch)，60秒倒计时，A/B合作完成
- UI优化：轮次横幅、字号32px+、按钮52px+
- 新增题目：flip_match +2题、sentence_sort +2题、build_sentence +2题

---

## 使用说明

每次改完功能，在最新日期下追加一行。
改了之后记得问自己：**这个版本和上次有什么不同，会影响学生的实验体验吗？**

2026-04-12 Phase 5完成：data-reporter.js 端到端验证通过，行为数据成功上报飞书 app_behavior_log（修复日期字段类型+多余字段两个bug）
2026-04-14 B021修复：coop_read_scenario 英文句子不可见+界面卡死。根因：.content-area overflow:hidden 在 iPhone 6 Plus 上裁掉内容且不可滚动；.coop-read-text 字号 18px 太小。修复：overflow-y:auto 全局可滚动；英文文本字号升至 26px；加 width:100%。
2026-04-19 renderFinalPoster v3：图片自适应大小（1只84px/2只64px/3只52px/4只46px/5只+40px），圆角白底卡片样式，标题行压缩为单行，格子padding减小，灰色剪影占位统一大小，node --check通过。
