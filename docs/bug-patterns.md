# Bug模式库

> 每次发现新bug，先在这里记录根因和检测方法，避免下次重复犯同样的错误。
> 新模块开发完成后，对照此表逐条检查。

---

## 🔴 高频Bug（每个新模块都必须检查）

### B001：A/B轮次没有显示学生真实姓名
**现象**：轮次提示显示"A同学"/"B同学"而不是真实姓名
**根因**：直接用了 roleA/roleB 字符串，没有调用 getPlayerShortName()
**修法**：
```js
var nameA = getPlayerShortName(roleA);
var nameB = getPlayerShortName(roleB);
```
**检测**：grep coop-types.js 里的 "A同学" 或 "B同学"，出现即为bug

---

### B002：词块/字母块点完后无法撤回
**现象**：学生点选词块放入答案区后，无法更改
**根因**：答案区元素没有绑定点击撤回事件
**修法**：答案区每个元素加 onclick，触发时退回词库，恢复原词块状态
**涉及题型**：coop_sentence_sort / coop_listen_sort / coop_spell_word / coop_build_sentence
**检测**：每个有"放词块"操作的题型，必须能点击已放的词块撤回

---

### B003：排序/拼词题验证不检查顺序
**现象**：学生随机乱填，系统判定正确
**根因**：验证只检查"填满了没有"，没有检查顺序是否正确
**修法**：
```js
var correct = selected.every(function(item, i) {
    return item.toLowerCase() === answer[i].toLowerCase();
});
```
**涉及题型**：coop_spell_word / coop_sentence_sort / coop_listen_sort
**检测**：故意填错顺序，应该判错

---

### B004：中文翻译显示位置不当/重复显示
**现象**：中文翻译同时出现在题目顶部和锦囊里，或完全消失
**根因**：多处渲染同一字段，或修改时漏了某个函数
**修法**：中文翻译只在题目顶部显示（灰色小字），锦囊一改为句法提示
**检测**：每道 sentence_sort 题，中文只出现一次

---

### B005：B区卡死（没有可点击选项）
**现象**：A完成后B区只显示文字，没有按钮/选项，整题无法完成
**根因**：StepB 渲染函数没有被正确调用，或没有绑定点击事件
**修法**：确保 onStepAComplete 回调里有 renderStepB 调用，且 StepB 有可点击元素
**涉及题型**：所有需要A→B交接的题型
**检测**：每个题型完成A步骤后，B区必须出现可交互元素

---

### B006：题目使用超纲词汇或句型
**现象**：题目里出现课本没有的单词或句型
**根因**：直接生成内容没有对照课本
**修法**：生成任何题目前，先查 docs/知识点清单_U1L1.md
**U1L1词汇**：bear / horse / bird / panda / rabbit / monkey / duck
**U1L1句型**：This is a ___. / That is a ___. / It's big/cute. / It can run fast. / They are ___.
**检测**：所有英文内容必须来自上述词汇表和句型表

---

## 🟡 中频Bug（功能扩展时检查）

### B007：锦囊提示与题目已显示内容重叠
**现象**：锦囊内容和顶部已显示的内容完全一样，锦囊失去价值
**根因**：设计时没有分层，同一信息出现在多处
**修法**：三层分工——顶部=中文目标，做题中=即时提示，锦囊=递进句法支架

### B008：热身不触发/每题都触发
**现象**：热身环节没出现，或每道题都触发一次
**根因**：`station._warmupDone` 标记没有正确初始化或重置
**修法**：检查 `_warmupDone` 的赋值逻辑，确保每个站点只触发一次

---

### B009：iOS 12 B区按钮点不了（pointer-events 不还原）
**现象**：A步骤完成后B区出现内容，但按钮完全无法点击，像卡死一样
**根因**：`.coop-zone.waiting` 设了 `pointer-events: none`，切换到 `.active` 后 CSS 没有显式恢复，iOS 12 WebKit 不自动还原默认值
**修法**：
```css
.coop-zone.active { pointer-events: auto; }
```
同时在 JS 的 renderStepB 里加内联兜底：
```js
zoneB.style.pointerEvents = 'auto';
```
**涉及题型**：所有有 waiting/active 状态切换的题型
**检测**：在 iOS 12 真机/模拟器上测试 B 区点击，不能只在 Chrome 上测
**2026-04-12 举一反三**：全文搜索 coop-types.js，共 10 处 `zoneB.className = 'coop-zone coop-zone-B active'`，已逐一在每处之后加 `zoneB.style.pointerEvents = 'auto'; // B009 iOS 12 兜底`，全 10 处已覆盖。

---

### B010：A 完成后 B 区显示在屏幕外，学生以为卡死
**现象**：A 选完后 B 区激活并渲染选项，但选项位置在 iPhone 6 Plus 视口下方（top ≈ 724px，视口 736px），学生看不到 B 选项，误以为卡住
**根因**：iPhone 6 Plus 屏幕只有 736px，A 区 + 共享头部 + B 区堆叠后总高度超出视口；页面没有自动滚到 B 区
**修法**：在 `coop-types.js` 的 `renderCoopStepB` 调度完具体题型后，`setTimeout` 100ms 调用 `document.getElementById('coop-zone-b').scrollIntoView({behavior:'smooth', block:'start'})`；iOS 12 Safari 会忽略 smooth 参数瞬间跳转，可接受
**涉及题型**：所有 A→B 长页面题型，特别是 `coop_listen_scenario` / `coop_read_scenario` / `coop_write_scenario`
**检测**：414×736 视口下 A 完成后，B 选项 `getBoundingClientRect().bottom` 必须 < 736

---

### B011：position:fixed 全屏浮层被容器遮挡/清除
**现象**：过场页、yes/no 确认浮层等"全屏 overlay"创建了但用户看不到，页面仍停留在原 A/B 区
**根因**：
1. z-index 太低（9998/9999）被其他组件压住
2. overlay 被 append 到 `container`（题目容器），后续某个 `innerHTML=''` 把它连同题目一起清掉
3. overlay 没挂在最外层，被某个 `overflow:hidden` 父节点截断
**修法**：
```js
overlay.style.cssText = 'position:fixed;...;z-index:99999;...';
document.body.appendChild(overlay); // 一定挂到 body，不要挂 container
// 重复创建时先清旧的
var existed = document.getElementById('my-overlay-id');
if (existed && existed.parentNode) existed.parentNode.removeChild(existed);
```
**涉及题型**：coop_category_sort（showCategorySortHandoff / showPartnerCheck），以及将来任何"A→B 交接过场页"
**检测**：grep `position:fixed` + `z-index` 看是否 ≥ 99999；确认 `document.body.appendChild` 而非 container.appendChild

---

### B012：flex column 容器里 coop-zone 没设 width，导致 grid 1fr 坍缩到图片原始宽度
**现象**：听音接力第 1 题 A 区图片卡片"巨大铺满屏幕"、学生点击"完全没反应"，像卡死
**根因**：
1. `.content-area` 是 `display:flex; flex-direction:column; align-items:center; overflow:hidden`
2. `.coop-zone` 没有显式 `width`，在 `align-items:center` 下 shrink-to-fit，宽度由内容决定
3. `.coop-options-grid` 的 `grid-template-columns: repeat(2, 1fr)` 在 shrink-to-fit 环境里，1fr 列坍缩到内容 min-content
4. `.coop-option-card img` 被 UI 补丁（line 2686）设为 `width:100%;height:auto`，循环依赖下取到图片自然宽度 640px
5. 每张卡变成 640×640，整个 grid 宽 1280+ px，大部分溢出 414px 视口被 `overflow:hidden` 裁掉
6. 学生看到 2 张超大图，但真实点击热区在视口外，iOS 12 tap 落在可见图片上却对应不到卡片 hit box，看起来"点不了"
**修法**：
```css
.coop-zone { width: 100%; box-sizing: border-box; }
.coop-option-card.pre-selected { /* 即时视觉反馈，不要等 500ms */ }
```
**涉及题型**：所有用 `createOptionGrid` 渲染图片/大内容的 coop 题型（listen_relay / listen_judge / listen_scenario / ...）
**检测**：
- grep `.coop-zone {` 必须出现 `width: 100%`
- 414×736 视口下 `.coop-option-card` getBoundingClientRect().right ≤ 414
- 点击卡片后 500ms 内必须看到 `.pre-selected` 样式

---

### B013：支架 hint 引用 q 上不存在的字段，错误时显示为"?"或空白
**现象**：学生答错题，UI 没有出现任何有内容的支架提示，看起来"支架系统失效"
**根因**：`getScaffoldHintHtml` 按题型写的 hint 内容引用了约定但未在数据里落地的字段（例：coop_word_relay 的 L3/L4 引用 `q.answer` 和 `q.chinese`，但 U1L1 数据只有 `q.stepA.correct` 和 `q.stepB.optionsMap[word].correct`）；代码 fallback 为 `?` 或空串，没有报错所以没人发现
**修法**：
1. 每个题型的 hint 函数必须从**数据里真实存在的字段**派生显示内容，不能假设题目作者会填某个新字段
2. 写新题型前先列出题库 JSON 的确切字段结构，再写 hint
3. 理论对齐审查表里不仅查"是否有支架分支"，还要查"分支读的字段数据里是否真的有"
**涉及题型**：可能影响所有有 hint 的 coop 题型——逐一对照 data 文件审查
**检测**：
- grep `getScaffoldHintHtml` 里所有 `q.xxx` 引用，对每个题型 data 文件验证字段存在
- 触发 L2/L3/L4 支架后，hint 内容里不能出现 `?` 或空 `<strong></strong>`

---

### B014：grid item 缺 min-width:0，CSS Grid 的 auto-min-size 把列撑到图片自然宽度（B012 未根治版）
**现象**：和 B012 一模一样——听音接力 A 区 2 张图片巨大铺满屏幕、点不动。B012 给 `.coop-zone` 加了 `width:100%` 之后**现象依然存在**
**根因**：
1. B012 只修了 `.coop-zone` 这一层的宽度，但真正决定 grid 列宽的是 **grid item 自身的 min-content**
2. CSS Grid 规范：`grid-template-columns: repeat(2, 1fr)` 的 `1fr` 默认等价于 `minmax(auto, 1fr)`，其中 `auto` = grid item 的 min-content
3. `.coop-option-card` 没设 `min-width: 0`，它的 min-content 由子元素（img）决定
4. `.coop-option-card img` 被 line 2692 的 UI 补丁写成 `width:100%; height:auto`（覆盖了 line 97 的 `max-width:100%`），在父级宽度未定的 shrink-to-fit 路径里，`width:100%` 对 img 形成循环依赖，浏览器 fallback 到 img **自然宽度 640px**
5. grid 列最小宽度 = 640px，两列 = 1280px，整行溢出 414 视口，被 `.content-area overflow:hidden` 裁掉大半
6. 学生看到 2 张超大图，hit box 和可见像素错位，iOS 12 tap 落在可见图上但命不中真实卡片区域 → 看起来"点不动"
**修法**：
```css
.coop-options-grid { width: 100%; min-width: 0; }
.coop-option-card { min-width: 0; max-width: 100%; box-sizing: border-box; overflow: hidden; }
/* 绝不用 width:100% on img，用 max-width + max-height 组合 */
.coop-option-card img { max-width: 100%; width: auto; height: auto; max-height: 110px; object-fit: contain; }
```
**教训**：
- B012 和 B014 是同一个 bug 的两层。B012 只治表层容器，B014 才是根治 grid item
- CSS Grid 里，**所有会被拉伸的 grid item 都要显式设 `min-width:0`**（flex item 同理，要 `min-width:0` 或 `min-height:0`）
- **永远不要对 replaced element（img/video/iframe）用 `width:100%`**，改用 `max-width:100%` + `max-height:xxx` 组合，防止循环依赖解到自然宽度
**涉及题型**：所有 createOptionGrid 渲染图片卡片的 coop 题型（listen_relay / listen_judge / listen_scenario / word_relay ...）
**检测**：
- grep `.coop-option-card img` 确保没有任何规则写 `width: 100%`（必须是 `max-width: 100%`）
- grep `.coop-option-card {` 后的规则块必须包含 `min-width: 0`
- grep `.coop-options-grid {` 规则块必须包含 `width: 100%` 和 `min-width: 0`
- 414×736 视口下 `.coop-option-card` getBoundingClientRect().right ≤ 414 且 img 高度 ≤ 110

---

### B016：sentence_sort 词义配对热身卡死（功能词无中文对应）
**现象**：coop_sentence_sort 站点进入热身时，左英文列显示 `This/is/a/bear`，右中文列显示 `这/熊/那/马`，is 和 a 无对应中文，那/马 无对应英文。学生永远配不完，只能点"跳过"。
**根因**：`renderWarmupMatch` (coop-types.js:2189) 从 `station.questions[].words` 提取英文词构成 pairs，句子 token 里混有功能词（is/a/It's/an）。而中文列经过 `chineseOrder` shuffle 后，会把 pairs[4..n] 的中文（那/马）错位到 pairs[0..3] 英文（is/a）旁边。本质：**sentence_sort 的词表不适合做 1:1 词义配对**，功能词没有独立中文。
**修法**：方案 A——data 层直接删除 `warmup` 字段，sentence_sort 不做词义配对热身，进入即答题。adventure.js 的 `if (station.warmup && ...)` 会自动跳过。
**文件**：`data/u1l1_coop.js` 站点3 删除 `warmup: { pairs: [...] }`。
**检测**：grep `warmup:` data/ 目录，每个含 warmup 的站点必须确认其 questions.words 都是实词（非功能词），或换用整句听读热身。
**涉及题型**：仅 coop_sentence_sort。`renderWarmupMatch` 函数本体未修改，其他题型（flip_match/word_relay）未使用 warmup 字段，不受影响。

---

### B017：桌面浏览器内容超出视口无法滚动
**现象**：桌面浏览器打开 app → 进入合作题（如 coop_listen_relay，4 图 2x2 + 音频按钮 + 标题横幅）→ 整个内容超出视口但无法滚动/拖动；iPhone 6 Plus 实机滚动正常。
**根因**：`.screen { height: 100vh }` 固定屏幕高度 + `.content-area { overflow: hidden }` 内容区裁剪 + 昨天为桌面兼容加的 `@media (min-width:481px) { #game-screen { max-width:480px } }` 只限宽没改高度规则。手机屏小，内容刚好挤得下（+ max-height:700px 那条 media query 把 play-sound-btn 缩小），而桌面视口一变大就暴露了"固定高+隐藏溢出"导致的裁切。
**修法**：仅在 `@media (min-width:481px)` 里给 `#game-screen` 加 `height:auto; min-height:100vh`，并给 `#game-screen .content-area` 加 `overflow-y:auto`。手机端（<481px）不变。
**检测**：桌面浏览器访问 `http://localhost:8080` 进入任意合作题，内容超出视口时必须能纵向滚动；手机真机不能退化。
**涉及题型**：所有 coop_* 题型（尤其图多的 listen_relay / listen_judge / listen_scenario）。

---

### B018：支架直接给中文翻译=偷走认知任务（违反 Gibbons 2015）
**现象**：学生答错听力题（如听 bear 选图），L3 支架弹出"💡 图片下方提示：**熊**"。学生直接看中文找对应图片，没有再做任何"听音→识别英语词"的认知工作。L4 更甚（图+音+中文同框）。
**根因**：`getScaffoldHintHtml` 把中文 `q.chinese` 当成通用"可视提示"，没区分这个字段对**听力题**来说相当于答案原文。Gibbons (2015) scaffolding 的核心定义：*reduce the cognitive load **without removing the task***。给中文翻译等于把"听→识图"任务换成了"读中文→匹配中文"任务，后者根本不需要 listening construct，effectively 偷走了任务。
**修法**（仅 listen_relay 已修）：
1. L3 不给中文翻译，改用"慢速重读 2 次 + 首音音素提示 /b.../"，保留"听"的动作
2. L4 不给中文翻译，改用"正确图片 border pulse + 音频重播"，保留"点对的那个"的动作
3. L2 在 UI 上加状态徽章（"慢速"）让学生意识到按钮已变
4. CSS 新增 `@keyframes scaffold-pulse` / `.scaffold-glow` / `.scaffold-badge`
**教训**：
- 每个支架 hint 必须通过"删除任务测试"：如果支架显示后学生不再需要做原认知任务（听/说/读/写）就能选对，那是**偷任务**不是**减负担**
- 对听力题：中文翻译 ≈ 答案，绝对禁止；图片描边/音频重播/首音音素是合规减负
- 对词汇题：中文翻译是拐杖但保留"识词"任务可以接受，要看 construct
**涉及题型**：审计见 `docs/scaffold_audit_2026-04-11.md`，13 题型中 L3 违反 5 个（listen_relay/listen_judge/word_relay/read_relay/relay_fill），L4 违反 11 个。本次只修 listen_relay 作为样本，其他待实机确认再推广。
**检测**：grep `getScaffoldHintHtml` 所有 case 分支，对听力类题型任何 `q.chinese` 显示都要标红；回归时进入 station 1 Q1 答错→L3 不能出现"熊"字样。

---

### B019：500ms 自动提交 + lockOptions 让学生无法改主意（原诊断为 CSS transform，已纠正）
**纠正（2026-04-12）**：上次 agent 把锅扣在 CSS transform:scale 上只是旁支现象。**真实根因**是 `createOptionGrid` 的 500ms 自动提交设计本身有问题：三年级学生节奏慢，500ms 根本不够思考，且一旦 timer 到期立刻 `locked=true` + `lockOptions(grid)` 把所有卡片 pointerEvents:none，学生完全无法改选。这违反 L1 peer negotiation 支架精神——合作题需要让 A/B 有时间讨论后再提交。**方案 B 显式确认按钮已实施**：`createOptionGrid` 新增 `{confirmMode:true}` 选项，点图只加 `.pre-selected` 不自动提交，必须按 grid 下方的 "✅ 我选好啦" 按钮才提交。只在 `listen_relay` 启用（其他 4 个题型暂保持现状，待实机回归后再推广）。见 coop-types.js L125+ 和 L246/L276。

**旧条目**（保留作历史分析）：
**现象**：listen_relay（及所有 createOptionGrid 图片题型）学生点第一张图（例：熊），熊出现蓝色 pre-selected 边框，但**500ms 提交窗口内点其他图毫无反应**，整个选项区看起来被锁死。学生无法改主意。
**根因**：
1. createOptionGrid 的 JS 逻辑其实**已经正确**实现了"允许切换"（pendingTimer + clearTimeout + remove-all + add 新卡，见 coop-types.js line 125-163），locked 只在 500ms 到期后才置 true
2. 但 CSS 同时存在 `.coop-option-card:active { transform: scale(0.95); }`（B012 之前就有的按下反馈）和 `.coop-option-card.pre-selected { transform: scale(0.97); }`（B012 新加的等待态）
3. iOS 12 Safari/WebKit 对**同一元素叠加多个 transform:scale 状态**会即时触发 compositing 层重建，重建过程中新产生的 compositing 层会"吞"接下来几帧的 touch 事件 —— 表现为兄弟卡的 tap 落空，onclick 根本没被调用
4. 结果：学生以为"点了没反应"，其实是 iOS 12 的 hit-test bug，JS 逻辑完全没执行到
**修法**：`.coop-option-card.pre-selected` **去掉 transform:scale**，改用更强的视觉反馈（border-width:3px + box-shadow 外环）。保留 `:active` 的 scale(0.95) 作为按下瞬间反馈（它只在 touchdown 那一刻触发，不持续）。
**教训**：
- iOS 12 WebKit 对状态型 `transform:scale` 的 compositing 管理有 bug，状态类（.selected/.pre-selected/.active-state）**绝对不要用 transform 做视觉变化**，用 border/shadow/background 替代
- `:active` 伪类可以用 transform（瞬时），但**持久 class** 用 transform 会触发此 bug
- 碰到"点一次后其他元素点不了"的现象，第一反应查 transform 叠加而不是 pointer-events
**涉及题型**：所有 createOptionGrid 渲染的图片/文字卡片题型：coop_listen_relay / coop_listen_judge / coop_listen_scenario / coop_listen_sort / coop_relay_fill（共 5 个 render 函数，10 处调用）
**检测**：
- grep `.coop-option-card.pre-selected` 规则块**不能**出现 `transform`
- grep `.coop-option-card\.(selected-|pre-selected)` 任何持久状态 class 都不能用 transform
- iPhone 6 Plus 真机回归：点第一张图→在 500ms 内点第二张图→必须能切换 pre-selected 到第二张

---

### B020：前端字段漂移导致飞书 FieldNotFound
**现象**：data-reporter.js 上报 coop_pair_data 时飞书报 FieldNotFound 错误，数据全部无法落表
**根因**：前端 payload 里带了 `roleAStudentId` / `roleBStudentId` 两个字段，但飞书表 schema 里根本没有这两列。schema 变更后前端字段没跟着删
**修法**：从 data-reporter.js 的 payload 里移除 `roleAStudentId` / `roleBStudentId`
**预防**：前端上报字段必须和飞书 schema 1:1 对齐；schema 变更时必须同步改前端；新增字段必须先在飞书建表再在前端加
**检测**：任何新增字段前先 grep 飞书 schema 文档或 ADR-006 确认字段存在

---

### B021：日期字段必须用毫秒时间戳而非字符串
**现象**：data-reporter.js 上报时飞书报字段类型错误，date 字段无法写入
**根因**：前端把日期用 ISO 字符串（"2026-04-11T..."）发过去，但飞书日期字段要的是毫秒时间戳（Number 类型，`Date.now()`）
**修法**：所有日期字段改用 `Date.now()` 毫秒数字
**预防**：任何飞书 Date 字段前端必须传 `Date.now()`，禁止 `new Date().toISOString()`；改日期字段时必须查飞书字段类型
**检测**：grep `toISOString` 确认没有日期字段用字符串格式上报

---

### B022：改完核心 JS 忘记 bump index.html 版本号 → 浏览器/iOS 强缓存跑旧版（"bug 看似没修"幻觉）
**现象**：2026-04-12 上午修完 Phase 5 双写 bug（`data-reporter.js buildBehaviorRecord` 改为 push A/B 两条记录），磁盘代码正确、`node --check` 通过。下午浏览器跑 U1L1 Station 1 五道题，飞书「App行为日志」表仍只收到 5 条记录且 asRoleA 全 true（应该 10 条一半 true 一半 false）。看起来 bug 完全没修。
**根因**：`index.html:222` 的 `<script src="data-reporter.js?v=100">` 版本号没同步 bump。浏览器/iOS 12 Safari 走强缓存继续加载 localStorage 里的旧 JS（旧版单条 return + 硬编码 `asRoleA:'true'`）。磁盘代码改对了，但运行时跑的是缓存旧版——即所谓"代码对了却生效不了"。
**修法**：
1. 把 `index.html` 里 `data-reporter.js` / `adventure.js` / `coop-types.js` / `u1l1_coop.js` / `soe-evaluator.js` 的 `?v=100` 全部 bump 到 `?v=101`
2. 在核心 JS 顶部加 `try { console.log('[ModuleName] v=101 xxx loaded'); } catch(e) {}` 指纹，硬刷新后 DevTools Console 看到这行即证明新版加载
3. 浏览器测试必须 Cmd+Shift+R 硬刷新 + DevTools Network 面板 勾选 Disable cache
4. iOS 12 真机测试必须 Safari → 设置 → 清除历史记录与网站数据
**教训**：
- **改完 data-reporter.js / adventure.js / coop-types.js / app.js / data/*.js 任何一个，必须在同一次提交里 bump index.html 的 `?v=N` → `?v=N+1`**，这是铁律
- 不要信"刷新一下就好"，iOS 12 + localStorage 会跑缓存跑很久
- 看到"代码明显正确但行为像旧版"时第一反应查缓存版本号，不要怀疑磁盘代码
- 在核心模块顶部加 console 指纹是最便宜的"新版已加载"检测
**涉及文件**：`index.html` + 所有带 `?v=` 参数的 JS 引用
**检测**：
- grep `?v=` index.html 对每个文件确认版本号和最近 git log 改动次数一致
- 部署新版后硬刷新 DevTools Console 必须能看到所有改动模块的指纹 console.log
- Network 面板对应 JS 请求 URL 必须是新版本号且返回 200（不是 304 Not Modified）

---

## ✅ 新模块上线检查清单

开发完新模块后，运行 `/app-qa` 自动检测，或手动逐条检查：

- [ ] B001：所有轮次提示显示真实姓名，不是"A同学"
- [ ] B002：所有词块/字母块都可以撤回
- [ ] B003：填写类题目验证了顺序，乱填会判错
- [ ] B004：中文翻译只在顶部显示一次
- [ ] B005：每个A步骤完成后，B区有可交互元素
- [ ] B006：所有词汇和句型来自课本
- [ ] B007：锦囊内容与顶部信息不重叠
- [ ] B008：热身每个站点只触发一次
- [ ] B009：iOS 12 真机验证 B 区按钮可点击（pointer-events 不被冻结）
- [ ] B010：414×736 视口下 A 完成后自动滚到 B 区，B 选项 bottom < 736
- [ ] B011：所有全屏 overlay z-index ≥ 99999 且 append 到 document.body
- [ ] B012：.coop-zone 显式 `width:100%` 且点击 option 后 500ms 内有视觉反馈（pre-selected 样式）
- [ ] B014：.coop-options-grid 和 .coop-option-card 都显式 `min-width:0`；.coop-option-card img 用 `max-width:100%` 而不是 `width:100%`；有 `max-height` 上限
- [ ] B019：.coop-option-card.pre-selected（及任何持久状态类）不得使用 transform:scale，改用 border/shadow 视觉反馈，避免 iOS 12 compositing 吞 tap
- [ ] B021：.content-area 必须 overflow-y:auto（不能 hidden），否则合作题型在 iPhone 上 B区选项会被裁掉，看似卡死；.coop-read-text 英文字号必须 ≥24px（原 18px 太小）
