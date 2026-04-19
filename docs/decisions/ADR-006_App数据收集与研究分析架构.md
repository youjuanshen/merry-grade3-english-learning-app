# ADR-006: App 数据收集与研究分析架构

## 状态

已采纳（2026-04-11，**2026-04-11 架构修订**，待实施）。待 ADR-007《教师实时 Dashboard 设计》补充监控端细节。
2026-04-11 疑点回复第一轮：Q1/Q2/Q3 决策已纳入。

> **修订说明（2026-04-11）**：原架构写的是"iPhone → 本地电脑服务器 → 飞书"两级中转，但实际调查发现：研究者并没有在教室部署本地电脑服务器的条件，而已有基础设施（`tencent_scf.js` + `firebase-sync.js`）已经把"iPhone 直连腾讯云函数 → 飞书"这条路跑通了。本次修订把数据流改为**单级腾讯云 SCF 中转**，并把实施任务拆成 5 个阶段，保留原有的字段 Schema / 操作化定义 / Triangulation 规则 / 英文 Methods 段落不变。

---

## 背景

Merry English App 即将进入正式实验阶段（中国小学三年级课堂，13 台 iPhone 6 Plus，两人一机合作学习）。研究者沈幼娟（清迈大学博士生）需要一套完整的数据收集与分析架构，同时满足五类需求：

1. **研究目标回答**：用数据覆盖 4 个 Research Objectives（Obj1 设计 App / Obj2 英语发展 / Obj3 参与度 / Obj4 学习成果，详见 ADR-002）。
2. **课堂实时监控**：教师在课堂上需要实时 Dashboard 看到每对学生的进度与求助信号。
3. **研究统计分析**：研究后期需要做 Paired t-test、RM-ANOVA、Effect Size、Triangulation、Correlation 等严谨分析。
4. **设备兼容**：必须在 iPhone 6 Plus / iOS 12 / Safari 12 上稳定运行，不能因数据上报卡死或崩溃。
5. **数据归档**：所有原始数据最终要落到飞书数据库（base `Oy1dbiDS7aLIS8sqI1ZumqJSt8b`），与 `05_数据收集/` 下现有流程统一。

此前的数据收集分散在 `firebase-sync.js`、`_server.js`、飞书手动录入之间，字段不统一、没有针对研究目标设计、也没有考虑 construct validity（游戏化奖励与原始表现互相污染）。本 ADR 定稿一个统一架构。

---

## 决策概要

1. **三张飞书表**：App 行为数据表（每题一行）+ 学生个人档案表（每生一行）+ 对子合作表（每对每课一行）。学生档案表**不冗余存题型明细**，所有细粒度统计从原始表实时计算，避免数据完整性问题。
2. **单级数据流**：iPhone → 腾讯云函数 SCF（单一 endpoint，按 `action` 路由）→ 飞书多维表格。**不经过本地电脑**，复用已有的 `scfPost` 管道。
3. **三段上报策略**：每题写 localStorage 离线队列 → 每站批量 `scfPost` 到腾讯云 → App 启动/节课结束扫描未传数据补传 + 指数退避重试。
4. **双轨字段边界**：进入论文统计的原始指标 vs 只给学生看的游戏化指标严格分离，防止 double counting。
5. **操作化定义**：词汇掌握、句型掌握、站点完成三个核心构念都有明确阈值。
6. **Triangulation 规则**：教师 Bandura 四源 Likert 打分与 App 行为指标一对一对照，不一致的情况作为"有趣发现"写进论文讨论。
7. **iOS 12 兼容约束**：禁用 `?.`、`??`、`Promise.allSettled`；localStorage 上限 200KB；新功能必须 iPhone 6 Plus 真机测试。
8. **隐私伦理**：不存真名，不存音频原文件，只存 SOE 分数，实验前需与导师 Teeraporn 确认伦理文档。

---

## 数据架构（三张表完整 Schema）

所有字段统一 **camelCase** 命名；时间字段统一用 ISO 8601 字符串；布尔字段统一 `true/false`；飞书对应字段类型在括号中注明。

### 表 1：App 行为数据表 `app_behavior_log`

粒度：**每答一题一行**（原子级，最细粒度，永不更新，只追加）。

| 字段名 | 类型 | 说明 |
|---|---|---|
| `logId` | 文本（主键） | 自动生成 UUID |
| `studentId` | 文本 | 学生座位号编码，如 `C3-A-07` |
| `partnerId` | 文本 | 同对另一名学生 ID |
| `pairId` | 文本 | 对子 ID（A-B 排序后哈希） |
| `classId` | 文本 | 班级编号 |
| `sessionDate` | 日期时间 | 答题时间戳 |
| `lessonId` | 文本 | 例 `U1L1` |
| `stationId` | 文本 | 例 `U1L1-Station3` |
| `questionType` | 单选 | `wordListen` / `sentenceOrder` / `soeRead` / `dialogue` / `scenario` / … |
| `questionIndex` | 数字 | 该站内第几题（1-based） |
| `asRoleA` | 布尔 | 当前学生是否担任 A 角色 |
| `isCorrect` | 布尔 | 是否首次答对 |
| `retryCount` | 数字 | 本题重试次数（0 = 一次过） |
| `scaffoldLevelUsed` | 数字 | 使用的最高支架等级（0-4；0 = 未使用） |
| `timeSpentMs` | 数字 | 从题目出现到最终提交的毫秒数 |
| `soeScore` | 数字（可空） | 口语评测总分（仅口语题） |
| `soePronAccuracy` | 数字（可空） | 发音准确度 |
| `soePronFluency` | 数字（可空） | 流利度 |
| `soePronCompletion` | 数字（可空） | 完整度 |
| `starRewarded` | 数字 | 本题获得星星数（0/1/2/3） |
| `stationCompleted` | 布尔 | 这一行是否是本站最后一题（用于站点结算） |
| `stationStarRating` | 数字（可空） | 站点最终星级（1-3），仅 `stationCompleted=true` 时有值 |
| `clientVersion` | 文本 | App 版本号，用于排查设备差异 |

### 表 2：学生个人档案表 `student_profile`

粒度：**每生一行**（每次答题后更新对应字段；历史由表 1 保留）。

身份信息：

| 字段名 | 类型 | 说明 |
|---|---|---|
| `studentId` | 文本（主键） | 同表 1 |
| `studentAlias` | 文本 | 化名（不存真名） |
| `classId` | 文本 | 班级 |
| `enrollDate` | 日期 | 入组时间 |

累积激励（只给学生看，**不进入论文统计**）：

| 字段名 | 类型 | 说明 |
|---|---|---|
| `totalStars` | 数字 | 累计星星 |
| `consecutiveDays` | 数字 | 连续上课天数 |
| `lastActiveDate` | 日期 | 最近上课日期 |
| `longestStreakMinutes` | 数字 | 个人最长坚持时长（分钟） |
| `currentLesson` | 文本 | 当前进度 lesson |
| `currentStation` | 文本 | 当前进度 station |
| `weeklyNewStars` | 数字 | 本周新增星星数 |

累积学习数据（**进入论文统计**，但仅作为聚合字段；复杂分析回到表 1）：

| 字段名 | 类型 | 说明 |
|---|---|---|
| `totalAttempts` | 数字 | 总答题数 |
| `totalCorrect` | 数字 | 总答对数 |
| `overallAccuracy` | 数字 | 总体准确率 = correct / attempts |
| `totalScaffoldUses` | 数字 | 总支架使用次数 |
| `avgTimePerQuestionMs` | 数字 | 平均每题用时 |
| `masteredWordsCount` | 数字 | 已"掌握"的单词数（按下方操作化定义） |
| `masteredPatternsCount` | 数字 | 已"掌握"的句型数 |

> **⚠️ 刻意不存**：题型分项表现明细（例：word 题正确率、sentence 题正确率）。原因：题型明细冗余存储极易与表 1 脱同步，违反数据完整性；所有题型级别分析一律从表 1 实时聚合。

### 表 3：对子合作表 `pair_collab_log`

粒度：**每对学生每节课一行**。

| 字段名 | 类型 | 说明 |
|---|---|---|
| `pairId` | 文本 | A-B 排序后的哈希 |
| `studentIdA` | 文本 | A 角色学生 |
| `studentIdB` | 文本 | B 角色学生 |
| `pairFormedDate` | 日期 | 配对起始日期 |
| `lessonId` | 文本 | 本次课 |
| `sessionDate` | 日期时间 | 本次上课时间 |
| `tasksAsA` | 数字 | A 角色任务次数 |
| `tasksAsB` | 数字 | B 角色任务次数 |
| `collabCompletionRate` | 数字 | 本次课内合作任务完成率 |
| `avgCollabDurationMs` | 数字 | 平均合作时长（从进入题目到两人都提交） |

---

## 数据流向图

```
 ┌─────────────────────────────────────────────────────┐
 │  教室：13 台 iPhone 6 Plus（两人一机）                      │
 │  每台运行 Safari 12 上的 App                            │
 │                                                       │
 │  答每题 → 写 localStorage 离线队列                       │
 │  完每站 → scfPost(action, payload) 批量发               │
 │  启动时 / 节课末 → 扫描未传数据补传                        │
 └───────────────────────┬─────────────────────────────┘
                         │  HTTPS + Header X-Api-Key
                         │  (XMLHttpRequest，iOS 12 兼容)
                         ▼
 ┌─────────────────────────────────────────────────────┐
 │  腾讯云函数 SCF（单一 endpoint）                          │
 │  https://1316992450-2fbeeh6iet.ap-guangzhou.tencentscf.com/ │
 │                                                       │
 │  按 body.action 路由：                                   │
 │  ├── set / get / (默认=成绩)     ← 已有，保留不动         │
 │  ├── logBehavior                ← 新增：写表 1          │
 │  ├── logPair                    ← 新增：写表 3          │
 │  ├── logStudent                 ← 新增：写/更新表 2      │
 │  └── queryProgress              ← 新增：教师 Dashboard 反查 │
 │                                                       │
 │  鉴权：Header X-Api-Key: merry-quiz-2026-secret          │
 └───────────────────────┬─────────────────────────────┘
                         │  飞书 Open API（服务端调用）
                         ▼
 ┌─────────────────────────────────────────────────────┐
 │  飞书多维表格 base Oy1dbiDS7aLIS8sqI1ZumqJSt8b          │
 │  ├── 课堂练习成绩表          ← 已在用                    │
 │  ├── 控制指令表              ← 已在用                    │
 │  ├── app_behavior_log       ← 新建                    │
 │  ├── student_profile        ← 新建                    │
 │  └── pair_collab_log        ← 新建                    │
 │  （永久研究数据，论文分析直接从这里导出）                     │
 └─────────────────────────────────────────────────────┘
```

**架构理由**：
- **iPhone 直连腾讯云 SCF**：教室没有本地电脑服务器的部署条件；已有 `scfPost` 管道经过课堂真机验证，延迟可控。
- **SCF 单一 endpoint + action 路由**：避免 iOS 12 维护多个域名/证书，复用现有 URL 和 X-Api-Key。
- **localStorage 离线队列**：课堂 Wi-Fi 偶尔抖动时，队列数据不丢失，启动时/节课末补传。
- **飞书作归档**：研究分析、导出 Excel/SPSS、与现有 `05_数据收集/` 流程打通。

---

## 上报策略

基于腾讯云 SCF 单级中转 + localStorage 离线队列：

| 时机 | 动作 | 目的 |
|---|---|---|
| 每答完 1 题 | 构造一条 log 记录 → `localStorage.setItem('pending_log_<uuid>', JSON.stringify(record))` | 零网络开销、零感知延迟，保证课堂流畅 |
| 每完成 1 站 | 扫描所有 `pending_log_*` → 一次 `scfPost({action:'logBehavior', records:[...]})` 批量发 → 成功后逐个 `removeItem` | 合并请求，减少 SCF 调用；iOS 12 下 XHR 稳定性优于高频小请求 |
| 节课结束 | 强制 flush 所有剩余 `pending_log_*` 及 `logPair`、`logStudent` 队列 | 保证数据完整性 |
| App 启动 | 启动时扫描 `pending_log_*`，若非空则立即后台补传 | 应对上一节课末未成功的残留数据 |
| 任意失败 | 保留 localStorage 条目，指数退避重试（1s → 2s → 4s → 8s → 放弃本次等下次站点 flush） | 鲁棒性 |

**离线保障**：localStorage 条目只有在收到腾讯云 SCF 200 响应（且 `body.code===0`）后才 `removeItem`，否则保留等待下次 flush。单点写入失败不会丢数据。

**localStorage 容量防护**：iOS 12 Safari localStorage 硬上限约 5MB，本 App 总配额硬性限制 200KB。若未传数据累积超过 150KB 阈值，直接触发一次 flush，flush 失败则弹提示告知教师。

**Key 命名约定**：
- `pending_log_<uuid>` → 行为日志（表 1）
- `pending_pair_<uuid>` → 对子合作（表 3）
- `pending_student_<studentId>_<ts>` → 学生档案更新（表 2，按 studentId 合并覆盖）

---

## 研究目标与数据 / 分析方法对应表

| Obj | 研究问题 | 所需数据（字段来源） | 分析方法 | 理论依据 |
|---|---|---|---|---|
| **Obj1 设计 App** | App 是否符合六理论设计？ | ADR 全集 + 理论对齐表（ADR-003） + 设计迭代记录 + `docs/CHANGELOG.md` | Design-Based Research narrative（质性叙事） | KM 矩阵（ADR-002） |
| **Obj2 英语发展** | 学生英语能力是否提升？ | 前后测分数（纸笔）+ `app_behavior_log.isCorrect`（按模块拆分：听/读/说/写）+ `soeScore/Accuracy/Fluency/Completion` | Paired t-test（前后测）+ Repeated Measures ANOVA（多时间点）+ Effect Size（Cohen's d） | Krashen i+1, Swain Output |
| **Obj3 参与度** | Self-efficacy 是否提升？ | 教师每课 Bandura 四源 Likert（纸质打分表）+ `totalAttempts` + `overallAccuracy` + `longestStreakMinutes` + `consecutiveDays` + `scaffoldLevelUsed` + 学生满意度问卷 | Mixed Methods + Triangulation（见下方）+ Correlation（教师打分 × App 行为） | Bandura Self-efficacy |
| **Obj4 学习成果** | 学到了什么？ | 周测 / 单元测（纸笔）+ `app_behavior_log.isCorrect` 的时间序列（按模块拆分） | Pre-Post Comparison + Effect Size + 描述统计 | Mastery Learning |

> ⚠️ **注意**：`masteredWordsCount` / `masteredPatternsCount` 是**学生档案展示字段**（激发 Mastery Experience），**不进入 Obj2/Obj4 的统计分析**。论文分析必须使用 `app_behavior_log` 中各模块的**原始正确率**，详见"操作化定义"和"数据使用边界"章节。

---

## 操作化定义

所有涉及"掌握""完成"的构念必须可计算、可复现：

- **掌握一个单词** = 该单词相关题连续 2 次答对（不含使用支架的情况）。
- **掌握一个句型** = 该句型相关题答对率 ≥ 80%（至少 **3** 次尝试，跨模块合并计算）。
  > **⚠️ 注意**：此指标仅作为学生档案展示字段，用于激发 Self-efficacy（Mastery Experience）。**不进入论文统计分析**，因为：
  > 1. 不同模块（听/读/说/写）测的是不同语言技能，简单相加会掩盖差异；
  > 2. 论文分析应使用各模块的**原始正确率**（按模块分开），而不是跨模块的聚合"掌握数"。
- **完成一个站点** = 站内所有必做题答对率 ≥ 60%，且所有必做题至少尝试过一次。
- **一次"合作尝试"** = A 提交 + B 提交的时间差 < 60 秒（超过则视为独立答题）。
- **"持续坚持"分钟数** = 从进入 App 到最后一次操作的时间，中间无操作超过 90 秒则切段重新计算。

---

## Triangulation 规则（教师观察 × App 行为）

Bandura Self-efficacy 四源，每节课教师对每个学生打 1-5 Likert，与 App 行为字段一对一对照：

| Bandura 四源 | 教师 Likert（1-5） | App 行为指标 | 对照规则 |
|---|---|---|---|
| Mastery Experience | 任务开始积极性 + 持续性 | `overallAccuracy` + `longestStreakMinutes` + 放弃次数（未完成站点数） | 教师高 + App 高 → **一致**；教师低 + App 高 → **写进论文讨论作为有趣发现** |
| Vicarious Experience | 对示范动画的反应 | 看示范动画次数 + 跟读次数 | 同上 |
| Verbal Persuasion | 对口头鼓励的反应 | 收到星星后**下一题**的 `isCorrect` + `timeSpentMs` 变化 | 同上 |
| Physiological State | 放松程度 + 专注度 | 答题速度 `timeSpentMs` 变化趋势 + 操作犹豫时长（首次点击延迟） | 同上 |

**不一致案例的处理**：不被当作"数据错误"丢弃，而是进入 Chapter 4 Discussion 作为 qualitative insight 单独讨论——这是 Mixed Methods 的核心价值所在。

## Triangulation 的量化指标：Cohen's kappa

为了量化教师观察（4 维 Likert 打分）和 App 行为指标之间的一致性程度，本研究采用 **Cohen's kappa (κ)** 作为辅助统计指标。

### 为什么需要 Cohen's kappa
- Reviewer 在 mixed methods 研究中通常会质疑"两套数据源之间的一致性"
- 仅做定性描述（如"我们发现了有趣的不一致"）不够严谨
- Cohen's kappa 是学术界衡量两个评分者一致性的标准指标

### 操作步骤
1. 将教师 Likert 1-5 分映射到三类：低（1-2）/ 中（3）/ 高（4-5）
2. 将 App 连续行为指标（如坚持时长、重试次数）映射到对应的三类
3. 按对应的 Bandura 四源（Mastery / Vicarious / Verbal Persuasion / Physiological）分别计算 κ
4. 报告每个维度的 κ 值

### 解读标准
- κ ≥ 0.8：高度一致
- 0.6 ≤ κ < 0.8：中度一致
- 0.4 ≤ κ < 0.6：弱一致
- κ < 0.4：不一致（此类案例进入论文讨论章节作为有趣发现）

### 论文写作
在 Methods 章节说明两套数据源的 triangulation 方法与 κ 计算方式；在 Results 章节报告每个维度的 κ 值；在 Discussion 章节讨论不一致案例的潜在原因。

---

## 数据使用边界（防 Double Counting）

严格分离两类字段：

### A. 进入论文统计分析的字段

- `isCorrect`, `retryCount`, `scaffoldLevelUsed`, `timeSpentMs`
- `soeScore`, `soePronAccuracy`, `soePronFluency`, `soePronCompletion`
- `overallAccuracy`, `masteredWordsCount`, `masteredPatternsCount`
- `longestStreakMinutes`, `consecutiveDays`, `totalScaffoldUses`

### B. 仅学生可见，不进入统计分析

- `totalStars`（累计星星）
- `stationStarRating`（站点星级）
- `weeklyNewStars`（本周新增星星数）
- `starRewarded`

**理由**：星级是从 `isCorrect` 与 `scaffoldLevelUsed` 算出来的派生变量；如果同时把星级与原始正确率都当自变量/因变量，就是 double counting，破坏 construct validity。论文 Chapter 3 的 Operational Definitions 部分必须明确写出这条边界。

> **关于 `weeklyNewStars` 的专门说明**：`weeklyNewStars` 是从答题正确率派生的激励字段，与累计星星同类。若进入统计分析会构成 double counting（重复计数），违反 construct validity 原则。仅作为学生档案展示，对应 Bandura 的 Verbal Persuasion（言语劝导）理论。

---

## iOS 12 兼容性约束

针对 iPhone 6 Plus / iOS 12 / Safari 12 的硬性限制（任何违反都会导致课堂设备闪退或白屏）：

- **复用已有 XHR 模式**：数据上报一律走 `firebase-sync.js` 里已经跑通的 `scfPost` / `scfGet` / `scfSet`，底层是 `XMLHttpRequest`，已在课堂真机验证过。**不要切换到 `fetch`** —— 避免重新踩 iOS 12 网络栈的坑。
- **语法禁用**：`?.`（Optional Chaining）、`??`（Nullish Coalescing）、`Promise.allSettled`、`String.matchAll`、`globalThis`、顶层 `await`。
- **一律用**：`if (x && x.y)` 代替 `x?.y`；`Promise.all` + 逐个 try/catch 代替 `allSettled`。
- **localStorage**：单次写入 < 50KB，总占用 < 200KB；超限先 flush 到腾讯云再清空。
- **XHR 超时**：`scfPost` 内部必须设置 `xhr.timeout`（建议 10000ms）并处理 `ontimeout`，不能无限挂起。
- **CSS**：`pointer-events`、`touch-action` 等属性必须在每个页面切换时显式重置，防止残留。
- **验证流程**：任何涉及数据上报的新功能合入前必须在真机 iPhone 6 Plus 上走完"答题 → 站点完成 → 节课结束"全流程；浏览器模拟不算数。

---

## 隐私与伦理

1. **不存真名**：所有学生仅用 `studentId`（座位号编码）+ `studentAlias`（化名）。映射表只保留在研究者本地，不进入飞书。
2. **不存音频原文件**：口语题音频上传腾讯云 SOE 后立即丢弃，只保留返回的分数字段。
3. **家长知情同意书**：实验前由班主任代发纸质知情同意书，说明"数据仅用于学术研究，化名处理，论文发表前销毁原始设备数据"。
4. **伦理审批**：需在正式实验前将本 ADR 的数据字段清单纳入清迈大学伦理审批申请材料。
5. **导师确认**：开始实验前必须与主导师 Assoc.Prof. Teeraporn Saeheaw 当面过一遍本 ADR，取得书面确认。
6. **数据保留期**：原始表 1（行为日志）在论文发表后 3 年销毁；聚合表 2、表 3 可长期保留。

---

## 论文怎么写（English, Chapter 3 Methods 可直接抄）

### 3.X Data Collection Architecture

Student interaction data were collected through a cloud-relayed synchronization pipeline. Thirteen iPhone 6 Plus devices (iOS 12, Safari 12), each shared by a pair of third-grade students, recorded every answered question locally in `localStorage` as an offline queue and transmitted batched records to a Tencent Cloud Serverless Cloud Function (SCF) upon completion of each learning "station". The SCF endpoint, protected by a shared API key transmitted in an `X-Api-Key` header, routed requests to the appropriate Feishu (Lark) multi-dimensional database table according to an `action` field in the payload. Records that failed to transmit due to transient network issues remained in the local queue and were retried upon the next station completion, at the end of the class, and at the next application launch, ensuring complete long-term archival of research data without blocking the latency-sensitive classroom experience on legacy devices.

### 3.X Data Structure

Three tables were maintained in the Feishu database. The **behavioral log table** (`app_behavior_log`) stored one row per answered question, capturing identifiers (student, partner, pair, class, lesson, station, question type), role assignment (A or B), performance indicators (correctness, retry count, scaffolding level used, time spent in milliseconds), and, for speaking items, the four sub-scores returned by Tencent SOE (total, accuracy, fluency, completion). The **student profile table** (`student_profile`) stored one row per student with cumulative learning aggregates (total attempts, correct count, overall accuracy, mastered-word count, mastered-pattern count) and motivational aggregates (cumulative stars, consecutive days, longest streak). The **pair collaboration table** (`pair_collab_log`) stored one row per pair per class session, recording role distribution, collaboration completion rate, and average collaboration duration. Question-type-level performance was deliberately not stored as a denormalized field in the profile table; instead, it was computed on demand from the behavioral log to preserve data integrity.

### 3.X Operational Definitions

A learner was considered to have "mastered" a vocabulary item when two consecutive related questions were answered correctly without scaffolding use. A learner was considered to have "mastered" a sentence pattern when accuracy on related items reached 80% or higher over at least three attempts, aggregated across modules (listening, reading, speaking, writing). This aggregated mastery count was used solely as a display field in the student profile to foster self-efficacy through mastery experience (Bandura, 1997) and was **not** entered into inferential statistical analysis, because the four modules assess distinct language skills; module-level raw accuracy was used instead for all statistical comparisons. A learning station was considered "completed" when accuracy on all required items reached 60% or higher and every required item had been attempted at least once.

### 3.X Analytic Strategy

Research Objective 1 (App design) was addressed through a Design-Based Research narrative grounded in the KM matrix and the six-theory alignment (see Chapter 3, Section X). Objective 2 (English development) was addressed via paired t-tests comparing pre- and post-test scores, Repeated Measures ANOVA on multi-timepoint speaking scores, and Cohen's d effect sizes. Objective 3 (engagement and self-efficacy) was addressed through a Mixed Methods triangulation in which teacher Likert ratings on Bandura's four sources of self-efficacy were cross-referenced against behavioral indicators from the App. To quantify the agreement between the two data sources, **Cohen's kappa (κ)** was computed for each of the four Bandura sources after mapping both the teacher Likert scores (1-5) and the continuous App indicators into three categories (low / medium / high); κ values were interpreted following standard thresholds (≥ 0.8 high agreement; 0.6-0.8 moderate; 0.4-0.6 weak; < 0.4 disagreement). Inconsistent cases (κ < 0.4 or individual disagreement pairs) were retained and treated as qualitative findings in the Discussion chapter. Objective 4 (learning outcomes) was addressed through pre-post comparisons of weekly and unit test scores combined with App-derived mastery counts.

### 3.X Construct Validity Safeguard

To avoid double-counting, motivational variables derived from raw performance (star ratings, cumulative stars, weekly new stars, station star ratings) were used exclusively for in-class feedback to learners and were not entered into any inferential statistical analysis. Only raw behavioral variables (correctness, retry count, time spent, SOE scores, scaffolding level used) and their direct aggregates entered the analysis.

### 3.X Ethical Considerations

Student real names were never stored; each student was assigned a seat-based identifier and a pseudonym. Raw audio files were discarded immediately after scoring by Tencent SOE; only the numerical sub-scores were retained. Written parental consent was obtained prior to the experiment, and the data collection protocol was reviewed and approved by the ethics committee of Chiang Mai University.

---

## 已有基础设施盘点（2026-04-11 调查结论）

以下组件已经在生产代码里跑通，本 ADR 的新架构**复用它们**，不重建：

| 组件 | 位置 | 状态 | 本 ADR 如何复用 |
|---|---|---|---|
| 腾讯云 SCF 单一入口 | `tencent_scf.js` | 已部署，已跑通 `set` / `get` / （默认=成绩）三条 action | 本 ADR 在同一函数里追加 4 条新 action（`logBehavior`/`logPair`/`logStudent`/`queryProgress`），不新建 endpoint |
| SCF 鉴权机制 | Header `X-Api-Key: merry-quiz-2026-secret` | 已启用 | 新 action 沿用同一 key，不改协议 |
| 客户端调用层 | `firebase-sync.js` 里的 `scfPost` / `scfGet` / `scfSet` | 已跑通，已带 X-Api-Key，已做 XHR 超时处理 | 本 ADR 所有上报一律走这三个函数；禁止绕开它们直接写 XHR |
| 飞书 base | `Oy1dbiDS7aLIS8sqI1ZumqJSt8b` | 已在用 | 在同一 base 下新建三张研究表，tableId 回填到 `reference_key_resources.md` |
| 腾讯云 SOE 语音评测 | 新版 SDK 已接通 | 已跑通 | 口语题继续走 SOE，只把四个分数字段写入 `app_behavior_log` |
| 本地开发服务器 `_server.js` | 本地 8080 + SOE 代理 | 仅开发用 | **不在数据上报链路上**，本 ADR 的任何实施任务都不改动它 |

**结论**：数据上报这条路，80% 的基础设施已经存在，本 ADR 的工作主要是"新增 4 条 action"+"新建 3 张表"+"前端加离线队列"。

---

## 已发现的 Bug（修订时顺便识别）

> 这些 bug 与本 ADR 的上报架构直接相关，实施新架构前必须先修，否则连现有成绩上报都会 403。

1. **`app.js:260`**：直接构造 `XMLHttpRequest` 调用 SCF，**未带 `X-Api-Key`** header → 服务端鉴权失败返回 403。
2. **`app.js:3191`**：同上，另一处 XHR 直调，同样缺失 `X-Api-Key`。

**修复方式**（实施阶段 1 执行）：把这两处直连 XHR 改为调用 `firebase-sync.js` 导出的 `scfPost(action, payload)`。该函数已经把 `X-Api-Key`、JSON 序列化、超时、错误回调都处理好了。

---

## 实施路径（5 个阶段，总工作量约 2-3 天）

### 阶段 1：Bug 修复（0.5 小时）

- **目标**：让现有成绩上报功能恢复可用。
- **动作**：修 `app.js:260` 和 `app.js:3191` 两处，改为调用 `scfPost`。
- **交付物**：真机验证"答一题 → 成绩进飞书课堂练习成绩表"这条旧链路仍然通畅。

### 阶段 2：扩展腾讯云函数（0.5 天）

- **目标**：SCF 单一 endpoint 支持 4 条新 action，旧 3 条不动。
- **动作**：在 `tencent_scf.js` 入口 switch 里追加分支：
  - `action === 'logBehavior'`：接收 `records: [...]` 数组（每条即表 1 的一行），批量写飞书 `app_behavior_log`。
  - `action === 'logPair'`：接收一条对子记录，upsert 到 `pair_collab_log`（按 `pairId + lessonId` 去重）。
  - `action === 'logStudent'`：接收一条学生档案更新，upsert 到 `student_profile`（按 `studentId` 去重，累积字段用 += 语义由客户端先算好再传）。
  - `action === 'queryProgress'`：按 `classId + lessonId + date` 反查当天所有对子的进度汇总，供教师 Dashboard 用。
- **保留**：现有 `set` / `get` / 默认成绩写入三条路径**一行不动**。
- **交付物**：Postman/curl 压测 4 条新 action 全部返回 `{code:0}`。

### 阶段 3：飞书新建三张表（1-2 小时）

- **目标**：在 base `Oy1dbiDS7aLIS8sqI1ZumqJSt8b` 下按本 ADR 的字段定义手动建表。
- **动作**：
  1. 建 `app_behavior_log`，字段与本 ADR "表 1" 完全一致。
  2. 建 `student_profile`，字段与 "表 2" 完全一致。
  3. 建 `pair_collab_log`，字段与 "表 3" 完全一致。
  4. 复制三个 tableId 回填到 `~/.claude/projects/-Users-shenyoujuan/memory/reference_key_resources.md`。
- **交付物**：三个 tableId + 字段截图。

### 阶段 4：App 客户端改造（1 天）

- **目标**：前端产生数据、入队、批量上传、断点续传。
- **动作**：
  1. 新建 `data-reporter.js`（或在 `firebase-sync.js` 内扩展），导出 `enqueueBehaviorLog(record)` / `enqueuePairLog(record)` / `enqueueStudentUpdate(record)`。
  2. 所有上报统一走 `scfPost`，禁止新增任何直接 XHR 调用。
  3. localStorage 离线队列：key 命名见本 ADR"上报策略"节；写入前检查总占用 < 150KB。
  4. 在"每完成 1 站"的回调里触发 `flushBehaviorQueue()`，一次打包发送。
  5. 在 App 启动 `DOMContentLoaded` 回调里触发一次补传扫描。
  6. 在"节课结束"按钮里触发强制 flush 三类队列。
  7. 指数退避重试：1s → 2s → 4s → 8s → 放弃本次。
- **交付物**：Chrome DevTools 里模拟断网 10 秒后恢复，数据应自动补传成功。

### 阶段 5：真机测试（0.5 天）

- **目标**：iPhone 6 Plus 真机端到端验证。
- **动作**：
  1. 13 台设备中抽 1 台跑完整的"一节课"流程（4-5 个站点）。
  2. 验证飞书三张表都有数据进来，行数与 App 端答题数吻合。
  3. 模拟中途开飞行模式 30 秒 → 恢复 → 确认缓存数据被补传。
  4. 模拟 App 崩溃重启 → 确认启动扫描触发了补传。
  5. 跑完记录延迟数据：每站 flush 的平均 RTT。
- **交付物**：真机测试报告（存 `docs/测试报告/`），含三张表的数据行数对账与延迟统计。

**总工作量**：约 2-3 天（不含飞书伦理审批等待时间）。

---

## 否定的方案

1. **iPhone 直连飞书 Open API**
   否决理由：飞书 Open API 需要 `tenant_access_token` 的服务端签发流程，客户端直连会把 App Secret 暴露；且飞书 API 公网往返 500ms-2s。改为走腾讯云 SCF 统一代理，SCF 内部再调飞书 API。

1b. **iPhone → 本地电脑服务器 → 飞书（原方案）**
   否决理由：研究者在中国小学教室没有部署本地电脑服务器的条件（电源、网络、值守），且已有 `scfPost` 管道已经课堂真机验证过。强行加一层本地中转只会引入新故障点。

2. **冗余存储题型明细到 student_profile**
   否决理由：冗余字段极易与原始表脱同步；一旦某次上报失败，profile 的题型准确率就永久错误，而原始表却是对的——数据完整性无从判定。改为实时聚合。

3. **把星星数、星级也进统计分析**
   否决理由：Double counting，违反 construct validity，答辩时会被 challenge。

4. **用单一 Google Sheet 代替三张表**
   否决理由：Google 在国内课堂不可用；且单表无法表达 student × pair × question 三种不同粒度。

5. **把音频原文件也存档**
   否决理由：隐私风险高，存储成本高，SOE 分数已足够做研究问题的分析，研究不涉及音频特征提取。

6. **只存聚合、不存每题原始数据**
   否决理由：一旦后期想换分析方法（例如研究"支架使用后答题速度变化"），没有原始数据就无法回溯；DBR 强调迭代分析，必须保留最细粒度。

---

## 后续工作

本 ADR 敲定了**数据结构**与**数据流架构**。以下工作待后续 ADR / 任务：

1. **ADR-007：教师实时 Dashboard 设计** — 本地电脑如何向教师展示实时进度、求助信号、对子对比、Bandura 打分录入界面。
2. **ADR-008：前后测工具设计** — 纸笔前后测的题目、效度验证、计分规则（独立于 App 本身）。
3. **代码实施任务**（详见本 ADR"实施路径"章节，共 5 阶段）：
   - 阶段 1：修 `app.js:260` 和 `app.js:3191` 两处 XHR 鉴权 bug。
   - 阶段 2：在 `tencent_scf.js` 新增 4 条 action。
   - 阶段 3：飞书建三张表。
   - 阶段 4：新建 `data-reporter.js`，实现 localStorage 离线队列 + 站点 flush + 启动补传 + 节课末强制 flush。
   - 阶段 5：iPhone 6 Plus 真机端到端验证。
   - 新建 `data/schema.js` 常量文件统一三张表字段名（防拼写漂移）。
   - **不改 `_server.js`**：本地开发服务器不在数据上报链路上。
4. **飞书表创建**：在 base `Oy1dbiDS7aLIS8sqI1ZumqJSt8b` 下手动创建三张表，字段与本 ADR 完全一致，创建完把 tableId 回填到 `reference_key_resources.md`。
5. **伦理审批材料更新**：把本 ADR 的字段清单和操作化定义粘贴到清迈大学伦理审批申请的 Data Collection 部分。
6. **与导师沟通**：下次导师会议时拿本 ADR 走一遍，重点确认 Triangulation 规则与 Construct Validity Safeguard 两节——这两点是答辩时最容易被 challenge 的。

---

## 理论依据

- **Krashen i+1**（Krashen, 1985）→ Obj2 数据支撑
- **Swain Output Hypothesis**（Swain, 1985）→ SOE 分数与说的次数
- **Bandura Self-efficacy**（Bandura, 1977, 1997）→ Obj3 四源 Triangulation
- **Mastery Learning**（Bloom, 1968）→ Obj4 操作化定义
- **Design-Based Research**（Brown, 1992; Design-Based Research Collective, 2003）→ Obj1 方法论
- **Mixed Methods Triangulation**（Creswell & Plano Clark, 2018）→ Obj3 一致/不一致处理

---

## 修订历史

- **2026-04-11 疑点回复第一轮**：根据研究者的三项决策更新本 ADR：
  1. 句型掌握操作化定义从"累计尝试 ≥ 5 次且答对率 ≥ 80%"改为"答对率 ≥ 80%（至少 3 次尝试，跨模块合并计算）"，并明确该指标仅用于学生档案展示、不进入论文统计分析；
  2. 在 Triangulation 章节新增"Cohen's kappa 量化指标"小节，规定 κ 的计算、解读和写作方式；
  3. 将 `weeklyNewStars` 明确归入"仅学生可见、不进入统计分析"类别，与 `totalStars`、`stationStarRating` 并列，并补充 double counting 的理由；
  4. 同步更新英文 Methods 章节（Operational Definitions / Analytic Strategy / Construct Validity Safeguard）保持中英一致。

（与 ADR-003 六理论在 App 中的完整逻辑保持一致。）
