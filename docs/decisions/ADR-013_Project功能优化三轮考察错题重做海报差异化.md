# ADR-013: Project功能优化——三轮考察+错题重做+海报差异化

## 状态
**已采纳（2026-04-19）**

## 背景

### 用户反馈
Project（单元级别大作业，每个动物区让学生收集动物到海报）被用户评价"太乱了"，核心问题：

- **设计定位模糊**：整体感觉像在答题，而非在"建造"自己的作品
- **视觉信息堆叠**：区域结算页数据（已收集数/未收集数/描述句数）缺乏直觉性
- **缺乏差异化反馈**：不同掌握程度的学生最终产出的海报看起来差不多，Self-efficacy 激励失效
- **技术bug**：失败判定逻辑永远不触发、索引初始化死循环、错题状态丢失、干扰选项用"..."占位等

### 现有实现问题（已修复 bug）
| Bug | 根因 |
|---|---|
| 失败判定逻辑永远不触发 | `eliminated` 计数错误，判断条件写反 |
| 索引初始化死循环 | `0` being falsy，导致初始化逻辑反复执行 |
| 错题状态丢失 | 数组引用问题（浅拷贝 vs 深拷贝） |
| "lovely"超纲词 | 违反"词汇只能来自课本"铁律 |
| "..."占位选项 | 干扰选项池不足时用省略号填充，学生一眼识破 |
| 双重导航栏 | 组件重复挂载 |
| 空白缩略图 | 图片加载时机问题 |

## 决策

### 1. 三轮考察递进（难度分层）

| 轮次 | 考察内容 | Krashen i+n |
|---|---|---|
| R1：认单词 | 看图选英文词（4选1） | i（当前水平） |
| R2：加描述 | 读描述句选对应动物（4选1） | i+1（可理解输入） |
| R3：补句子 | 看动物图+中文名，补完核心句型中的关键词（is/has/can等） | i+2（输出挑战） |

**第3轮从"装饰词"改为"句型补全"**：去掉考"furry/lovely"等装饰词（超纲且意义低），改考核心句型中的关键功能词，贴近 SLA Output Hypothesis 的可理解输出目标。

### 2. 答题机制：4选项 × 2次机会

- 首次答错：**消除该选项** + 提示"还剩1次机会"（不直接给答案，保持 ZPD 张力）
- 再次答错：**失败**，该动物进入错题库，进行错题重做
- 答对：动物收入海报，区域结算展示

### 3. 每轮错题重做1轮

- 触发时机：R1/R2/R3 每轮结束后，错题立刻进入该轮的重做环节
- 规则：打乱选项顺序，给一次机会重做
- 仍错：接受结果（海报显示灰色剪影/空白），**不循环**，不再给第三次机会
- 理论依据：ZPD + Scaffolding（Wood et al., 1976）——重做是支架介入，给第二次机会不等于给答案

### 4. 第3轮补句子题的显示规则

- 显示：动物图片 + 动物中文名（如"熊猫"）
- **不显示**英文名（避免泄露答案）
- 显示完整中文翻译（如"它有黑白两色。"，**不带空格**，避免提示答案位置）

### 5. 海报差异化（核心设计）

| 学生表现 | 海报呈现 |
|---|---|
| 所有轮次全部答对 | 动物完整彩色图片，装饰丰富，海报漂亮 |
| 重做后答对 | 动物正常展示（略有标记） |
| 重做仍错 | **灰色剪影 + 空白位置**，一眼看出差异 |

目标：一眼看出掌握差异，Self-efficacy 的 Mastery Experience（掌握体验）和 Social Comparison（社会比较）同时激活。

### 6. 最终海报布局

- **2×2 网格**，一屏显示，不滚动
- 图片大小根据动物数量自适应（动物多→图片小，动物少→图片大）
- 支持直接截图分享
- **全中文**：去掉英文标题和说明文字
- **去掉"My Sentences"区块**：结算页和海报均删除（数据已通过行为日志上报，不需要在UI中二次展示）

### 7. 区域结算页优化

- 标题格式：**"小明 & 小红 的森林区"**（加学生名字，增加归属感和 Self-efficacy 的 Social Persuasion）
- 动物展示：已收集→彩色圆形头像，失败→灰化头像（替代原来的三个独立数字）
- 满分时显示："🎉 X只全部收集！"

### 8. 收集展示栏改为顶部横条

- 原位置：右上角 88px 小方块
- 新位置：导航栏下方横条（全屏宽、60-70px 高），动物头像一字排开
- 已收集：38px 圆形彩色头像；未收集：灰色问号/爪印占位
- 适用于 R1/R2/R3/retry 四个轮次

### 9. 总览页区域卡片优化

- 区域卡片改为**正方形比例**（原为宽矩形，空间浪费）
- emoji 放大，充分利用正方形空间
- 视觉更紧凑，iOS 一屏可看清所有区域

### 10. Project 解锁条件

- 四个模块（听力/阅读/写作/口语）**全部通关后才解锁**
- 实现：检查 `moduleComplete_listening` / `moduleComplete_reading` / `moduleComplete_writing` / `moduleComplete_speaking` 四个 localStorage 键均存在
- 锁定时：卡片显示灰色 🔒 + 提示文字，点击触发抖动提示
- 解锁时：卡片变橙色渐变 🎨 + 弹跳动画

### 11. 干扰选项三层取源策略

优先级：当前 zone → 其他 zone → 跨区域，确保始终有 3 个有意义的干扰选项，彻底杜绝"..."占位。

## 理论依据

| 理论 | 对应决策 |
|---|---|
| **SLA（Krashen i+1）** | 三轮递进 = 认词(i) → 理解句(i+1) → 补关键词(i+2)，三轮是三个不同的 i+n 水平 |
| **SLA Output Hypothesis（Swain, 1985）** | 第3轮补句子 = 被迫产出，不是被动识别 |
| **CLT（Cognitive Load Theory，Sweller）** | 补句子题中文名+图片不显示英文名，减少 extraneous load；2×2 海报一屏显示，减少翻屏认知负担 |
| **ZPD + Scaffolding（Vygotsky / Wood et al., 1976）** | 错题重做 = 支架介入（给第二次机会不等于给答案）；选项消除 = 降低任务难度但不去除任务本身（Gibbons, 2015 原则） |
| **3P（Project-based Learning）** | 学生用所学词汇句型"建造"海报作品，海报质量直接反映掌握程度，不是纸面分数 |
| **Self-efficacy（Bandura, 1997）** | 海报差异化 = Mastery Experience（做到了/没做到一目了然）+ Social Comparison（和同桌对比）；区域标题加学生名字 = 归属感 + Verbal Persuasion |

## 否定的方案

### 方案 A：循环重做直到答对
- 无限给机会 → 失去 Self-efficacy 的真实 Mastery Experience（做到了是因为一直给机会，不代表真的掌握）
- 课堂时间不可控，可能一直卡在一道题
- 违反支架设计原则：支架要有出口，不能无限兜底

### 方案 B：第3轮考装饰词（furry/lovely等）
- "furry/lovely"等词超纲（不在课本词汇表内），违反"词汇只能来自课本"铁律
- 装饰词对句型掌握考察价值低，不命中 SLA Output Hypothesis
- 用核心句型（is/has/can）替代，论文答辩时更容易 defend

### 方案 C：海报滚动展示（多屏）
- 滚动截图困难，学生分享作品时需要多次截图拼接
- 教师展示时不直觉，一屏无法全览全班作品
- 2×2 固定网格 + 图片自适应解决了容量问题

### 方案 D：结算页保留"My Sentences"区块
- 数据已通过 behavior_log 上报，UI 二次展示冗余
- 增加认知负担（extraneous load）
- 删除后结算页更聚焦在"收集了哪些动物"这一核心反馈

## 论文怎么写

> The Project component employs a three-round progressive assessment structure (vocabulary recognition → sentence comprehension → sentence completion) aligned with Krashen's (1982) Input Hypothesis (*i*, *i*+1, *i*+2). The two-attempt mechanism with answer elimination provides scaffolded support without removing the cognitive task (Gibbons, 2015), while differentiated poster output—ranging from full-color illustrations to grey silhouettes—operationalizes Bandura's (1997) mastery experience by making learning outcomes visible and personally meaningful to learners.

## 关联文档

- `docs/decisions/ADR-010_Project-based题型定位为单元L4大作业.md`（Project 题型定位原始决策）
- `docs/decisions/ADR-011_站内错题重做机制.md`（错题重做机制通用规则）
- `docs/decisions/ADR-005_游戏化系统理论根基与重设计.md`（Self-efficacy 游戏化理论根基）
- `docs/CHANGELOG.md`（条目 42/43：UI优化实现记录）
- `memory/feedback_scaffold_preserve_task.md`（支架必须保留认知任务原则）
- `memory/feedback_scenario_vocabulary_scope.md`（词汇不能超纲铁律）
