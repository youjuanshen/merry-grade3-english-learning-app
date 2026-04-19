# ADR-007: 教师实时 Dashboard 设计——双列表极简方案

## 版本

- **2026-04-11 v2**：推翻 v1 的「5 指标 + 🟢🟡🔴 状态灯 + 时间阈值」方案，改为「双列表极简」方案。触发本次重写的核心质疑：v1 的时间阈值无文献支撑、状态灯算法会引导老师行为进而污染研究效度、5 指标平铺让老师被驱使看屏幕而非看学生。经第一性原理复盘 + 5 角色专家团一致评审，整体推翻重做。
- 2026-04-11 v1（作废）：五指标平铺 + 交通灯状态机。保留在 git 历史里供溯源，不在本 ADR 正文展开。

---

## 状态

已采纳（2026-04-11，v2，待实施）。

依赖 ADR-006《App 数据收集与研究分析架构》的数据基础设施（腾讯云 SCF 单一 endpoint、飞书 3 张数据表、`X-Api-Key` 鉴权协议、`scfPost` 机制）。本 ADR 只追加一条新 action `queryProgress`，不新增数据表、不新增 endpoint。

**前置依赖**：本 Dashboard 落地前，App 端必须先实现「挑战模式」（完成主线站点后解锁的加难题，同词汇但更高阶题型）。否则 Dashboard 告诉老师「组 5 完成了可以给挑战」，老师打开 App 却发现没有挑战内容，整个完成列表就白搭。「挑战模式」单独立 **ADR-009**（下一步做），本 ADR 仅标注「等待 ADR-009」。

---

## 背景

### 研究者场景不变

沈幼娟的 Merry English App 即将进入三下 1 班（U1L1 起步）课堂实验。两名学生共用一台 iPhone 6 Plus，全班 14 对学生同时作答。研究者需要一个教师端工具，以便在 40 分钟课堂里兼顾「个性化分层」「介入时机判断」「论文可 defend 的理论操作化」。

### v1 为什么被推翻

v1 方案设计了 5 个指标（星星、状态灯、开口次数、支架级别、组号）+ 🟢🟡🔴 状态判定 + 时间阈值（90 秒 / 3 分钟 / 4 分钟）。经研究者第一性原理质疑与专家团（导师 / 小学英语教师 / 测试设计专家 / 工程师 UX / 三年级学生 5 角色）一致评审后推翻，原因：

1. **时间阈值没有文献支撑**。90 秒 / 3 分钟 / 4 分钟这些数字没有任何学术来源，是作者拍脑袋估的。论文写作时 "Why 90 seconds?" 这一问无法回答，reviewer 一定会揪。**凡是论文 defend 不了的设计，不做**。
2. **状态灯算法会引导老师行为 → 污染研究效度**。一旦 Dashboard 给出 🔴，老师几乎一定会走过去。这意味着「教师介入」这个因变量被 Dashboard 算法决定而不是被学生真实困境决定。在 Obj3（参与度）和 Obj4（学习成果）的因果分析里，这是致命的 confound。
3. **5 指标平铺 → 认知负荷过高**。Sweller (1988) 的认知负荷理论恰恰否定了 v1：老师要同时看 14 行 × 5 列 = 70 个信息点，还要在心里合成判断。结果是老师被驱使盯屏幕，而不是观察真实学生 → 违反 Merry 教学直觉、违反 CLT、违反 Dashboard 的初衷。
4. **老师真实需求只有两件事**。回到第一性原理，40 分钟课堂老师真正需要 Dashboard 告诉她的只有：
   - **谁已经完成了**，好给延伸任务防止捣乱；
   - **谁彻底卡住了**（App 支架都用尽还不行），好人工介入。
   中间大多数正常进行的组，老师不需要看名字，只需要知道「他们都 OK」即可。

### 新方案的设计哲学

**Dashboard = ZPD differentiation 的操作化工具。**

- **完成列表** = 进入 ZPD 上限 → 学生已超出当前 ZPD 的上沿，需要 new challenge（Vygotsky 原理）；
- **帮助列表** = App 支架耗尽 → 学生跌出 ZPD 下沿，App 的 modified input 已经无效，需要 human scaffolding；
- **中间组** = 仍在 ZPD 内正常建构 → 老师不打扰，也不需要显示姓名。

这就是论文里 defend Dashboard 学术价值的核心框架，必须在 Chapter 3 里清楚写出来。

---

## 决策

### 核心定位

**Dashboard 不是 5 指标监控器，是 ZPD 分层教学的操作化工具。**

只显示两类需要老师动作的 pair + 一个研究指标板块。其他一切砍掉。

### 使用场景

| 维度 | 设定 |
|------|------|
| 设备 | 研究者 MacBook，放讲台做中央控制台 |
| 浏览器 | Safari / Chrome 最新版 |
| 使用方式 | 老师大部分时间走动观察学生，每隔 2–3 分钟回讲台扫一眼 Dashboard |
| 扫一眼时长 | 目标 ≤ 3 秒 |
| 刷新策略 | 30 秒轮询 |

### 设计原则（与 v1 不同）

1. **只显示需要动作的组**。没显示的都是 OK，不焦虑。
2. **二元状态，无时间阈值**。完成 or 未完成；L4 卡 or 未卡。
3. **不引导老师行为**。Dashboard 只提供事实（谁完成了、谁卡在 L4），不计算「应该介入」。老师自己判断要不要去。
4. **研究指标独立板块**。口语触发榜作为 Obj2/Obj3 的 within-group 证据单独放一个板块，与教学决策板块解耦。
5. **3 秒看懂**。每个板块一屏即看完，没有折叠、没有交互。

---

## 界面布局（ASCII 线框图）

```
┌──────────────────────────────────────────────┐
│ 三下1班 · U1L1 · 第12分钟                    │
│ 班级状态: 其他 10 组正常进行中 ✓              │
├──────────────────────────────────────────────┤
│ ✅ 已完成主线 - 给他们挑战任务                 │
│   组5 王小明&陈晓   ⭐15  🗣22               │
│   组9 刘芳&赵亮     ⭐14  🗣18               │
│   [一键解锁挑战模式]  ← 按钮                 │
├──────────────────────────────────────────────┤
│ ⚠ 需要你去帮助 - L4支架仍卡住                │
│   组3 张宇豪&李明                            │
│   第2站 · 已错5次 · L4支架开启               │
│   最近说话:🗣6次  SOE平均:58分               │
├──────────────────────────────────────────────┤
│ 📊 本节口语触发榜 (研究指标)                  │
│   组5: 🗣28  组1: 🗣22  组9: 🗣18            │
│   ...                                        │
│   组3: 🗣6  ← 最少                          │
└──────────────────────────────────────────────┘
```

### 三个板块的职责

| 板块 | 内容 | 给谁看 | 决策场景 |
|------|------|-------|---------|
| 板块 1 顶部信息条 | 班级 · 课号 · 第几分钟 · 中间组状态 | 老师扫一眼安心 | "我没看到名字的组都 OK" |
| 板块 2 已完成主线 | 达到 ZPD 上限的 pair | 老师给挑战 | 走过去发挑战任务 / 按按钮解锁 |
| 板块 3 需要帮助 | L4 支架耗尽仍卡的 pair | 老师人工介入 | 走过去手把手教 |
| 板块 4 口语触发榜 | 全 14 组口语次数排名 | 研究者 + 老师鼓励 | 走到最少的组鼓励 B 开口 |

---

## 两个列表的操作定义（critical —— 不靠时间阈值）

### 「完成好」的定义

**触发条件**：`completedStations.length === totalStations`

- 严格二元状态，无阈值。
- 当前 lesson 所有主线站点 done → 立刻出现在完成列表。
- **效度干净**：不依赖任何时间判断，论文 defend 时只需要说 "completed all mainline stations"，不需要解释任何数字。

### 「需要帮助」的定义

**触发条件**：`currentScaffoldLevel === 4 && retryCount >= 2`

- 行为状态触发，不依赖时间。
- **逻辑**：App 已经尽了所有努力（L4 是最高级支架，含图片 / 慢速音频 / 中文 hint / 手势引导全开），学生还错 ≥ 2 次 → 说明 App 的 scaffolding 在这里失效，必须换 human scaffolding。这是 Wood et al. (1976) scaffolding 理论的天然边界条件。
- **为什么不用时间**：时间是结果不是原因，学生可能花 3 分钟反复尝试是正在学习而不是卡住。真正的 "stuck" 信号是「最高支架都给了还错」。
- **为什么错 2 次**：1 次可能是误触，3 次太晚。2 次是最小可 defend 的判据（操作化定义，论文里直接写）。

### 中间组

**不显示姓名，只显示计数**：`其他 N 组正常进行中 ✓`

- 老师一眼知道：没显示的都 OK，不焦虑，也不用扫屏幕扫 14 行。
- 这就是 CLT 认知负荷理论对「教师视角」的应用。
- 同时避免「老师总盯着 Dashboard 找名字」污染走动观察。

---

## 口语数据板块（第三个板块，研究指标）

### 为什么单独放一个板块

口语触发榜不是用来做教学决策的（老师已经通过板块 2/3 知道去哪里），它是用来做**研究数据可视化**的。Obj2 改 ITS 设计后没有对照组口语，这个榜就是 Obj2/Obj3 的 **within-group 证据**：同一课堂内、同一时间段内、14 对 pair 的口语触发频率分布与组间差异。

### 数据源与流程

- 每次学生点 🎤 按钮 = 一次 `speakCount` 事件，通过 ADR-006 的 `logBehavior` 写入 `app_behavior_log`。
- SOE 分数 2–3 秒后从腾讯云 SOE API 返回，异步回填同一条记录。
- `queryProgress` 返回时按 `class_id + lesson_id + date` 聚合本节课口语次数。

### 显示规则

- 按口语次数**降序**排列全部 14 对 pair。
- 每行：`组 N: 🗣{count}`；若该 pair 也在板块 2/3，名字额外高亮。
- 最后一名标 `← 最少`，提醒老师**走过去鼓励 B 开口**。
- **默认不按 SOE 分数排序**（只排次数）。SOE 分数是否加入排序留作 Q5 由研究者决定。

---

## 六理论 × Dashboard 映射表（重写）

这张表是 v2 相对 v1 的**核心学术重写**。v1 的「5 指标各对 1 理论」被替换为「每个理论对应一个 Dashboard 元素或行为」：

| 理论 | Dashboard 对应 | 教师动作 |
|---|---|---|
| Social Constructivism (Vygotsky / Piaget) | 完成列表显示 pair 名称（强调是两个人一起完成） | 走过去表扬合作，强化"我们是一起"的身份 |
| SLA Output Hypothesis (Swain, 1985) | 口语触发榜 | 走到最少的组鼓励 B 开口，触发 pushed output |
| CLT 认知负荷 (Sweller, 1988) | 中间组折叠为 `其他 10 组正常进行中` | 老师注意力不被稀释，心智资源留给真正需要动作的组 |
| ZPD + Scaffolding (Vygotsky, 1978; Wood et al., 1976) | 完成列表（ZPD 上限）+ 帮助列表（ZPD 下限） | 完成 → 给挑战；卡住 → 人工介入 |
| 3P (Project / Problem / Play) | 一键解锁挑战模式按钮 | 启动延伸 Project / Play 任务 |
| Self-efficacy (Bandura, 1977) | ⭐ 星星数显示（完成列表中） | 老师口头表扬，执行 Verbal Persuasion |

**答辩用法**：导师问「你的 App 如何体现 ZPD？」→ 研究者打开 Dashboard 一张截图：**「完成列表就是 ZPD 的上限，帮助列表就是 ZPD 的下限。中间折叠的 10 组是当前在 ZPD 内正常建构的学生。我做的唯一教学决策——是否向某一类学生移动——就是一次 ZPD 的分层教学操作。」**

---

## 技术架构（保留 ADR-006 数据链路）

```
            iPhone × 14 台
                 │ 作答事件 / speakCount
                 │ HTTPS + X-Api-Key
                 ▼
        ┌────────────────────┐
        │ 腾讯云 SCF          │
        │ (单一 endpoint)     │
        │  action=logBehavior │  ← 已有
        │  action=logPair     │  ← 已有
        │  action=logStudent  │  ← 已有
        │  action=queryProgress│ ← 本 ADR 新增
        └──────────┬─────────┘
                   │
                   ▼
        ┌────────────────────┐
        │ 飞书多维表格        │
        │ ├ app_behavior_log  │
        │ ├ student_profile   │
        │ └ pair_collab_log   │
        └──────────┬─────────┘
                   │ 只读聚合，不回写
                   ▼
        ┌────────────────────┐
        │ MacBook 浏览器      │
        │ Dashboard 单文件 HTML│
        │ 30 秒轮询 queryProgress│
        └────────────────────┘
```

### 架构原则（与 v1 相同，未改）

1. **iPhone 与 Dashboard 数据链路完全解耦**。iPhone 只管上报 → 飞书；Dashboard 只管查询 ← 飞书。任何一端挂了不影响另一端。
2. **复用 ADR-006 的 `scfPost` 机制**，同一个鉴权密钥，同一个 endpoint，新增 action 而已。
3. **服务端聚合，客户端只渲染**。完成判定 / L4 卡判定 / 口语次数汇总全部放 SCF 侧。Dashboard 拿到结构化 JSON 直接渲染，不做业务逻辑。

### `queryProgress` 返回结构（草稿）

```json
{
  "code": 0,
  "class_id": "grade3_class1",
  "lesson_id": "U1L1",
  "lesson_elapsed_min": 12,
  "total_pairs": 14,
  "normal_pairs_count": 10,
  "completed_pairs": [
    { "pair_id": "5", "members": ["王小明","陈晓"], "stars": 15, "speaking_count": 22 },
    { "pair_id": "9", "members": ["刘芳","赵亮"],   "stars": 14, "speaking_count": 18 }
  ],
  "needs_help_pairs": [
    {
      "pair_id": "3",
      "members": ["张宇豪","李明"],
      "current_station": 2,
      "retry_count": 5,
      "scaffold_level": 4,
      "speaking_count": 6,
      "soe_avg": 58
    }
  ],
  "speaking_leaderboard": [
    { "pair_id": "5", "speaking_count": 28 },
    { "pair_id": "1", "speaking_count": 22 },
    { "pair_id": "9", "speaking_count": 18 },
    { "pair_id": "3", "speaking_count": 6, "is_lowest": true }
  ]
}
```

### 刷新策略

30 秒轮询，`setInterval(fetchProgress, 30000)`。理由与 v1 相同：双列表都是行为触发，延迟 30 秒对老师决策无实质影响；WebSocket 过度工程；10 秒触发 SCF 限流风险。

---

## 砍掉的功能（与 v1 对比，明确列出）

| 砍掉的功能 | 来自 v1？ | 砍掉理由 |
|------|---------|---------|
| ❌ 🟢🟡🔴 状态灯 | 是 | 引导老师行为 → 污染效度 |
| ❌ 「距上次操作 2:34」实时倒计时 | 是 | 时间阈值无文献支撑 |
| ❌ 时间阈值（90s / 3min / 4min） | 是 | 论文 defend 不了 |
| ❌ 14 个组并列卡片 | 是 | 信息过载，违反 CLT |
| ❌ 累计星星前 2 组排行 | 是 | 与课堂决策无关；Self-efficacy 星星应学生自己看 |
| ❌ 刷新动画 / 声音 | 是 | 打断注意力 |
| ❌ 班级切换 tab | 是 | 只有 1 个班 |
| ❌ 多班级扩展 | 是 | 过度工程，研究结束前用不到 |
| ❌ 复杂图表（雷达 / 折线） | 是 | 3 秒看不懂 |
| ❌ Dashboard → iPhone 一键推送提示 | 是 | 打破数据流解耦原则 |
| ❌ 学生端通知弹窗 | 是 | 打断作答节奏 |

> 原则：**凡是 v1 的「炫技项」全部砍；凡是论文 defend 不了的全部砍；凡是老师上课没空做的全部砍。**

---

## 保留的功能

- ✅ MacBook 浏览器端单文件 HTML（无构建工具）
- ✅ 30 秒轮询
- ✅ 复用 ADR-006 的 `scfPost` 与 `X-Api-Key`
- ✅ 服务端聚合、客户端只渲染的分层原则
- ✅ iPhone 与 Dashboard 数据链路解耦
- ✅ 安全鉴权的风险评估（同 v1，Pilot 前短期接受，后续做读写分离密钥）

---

## 否定的方案

### 方案 A：保留 v1 的状态灯但改用「学生体感阈值」

即不用 90 秒 / 3 分钟这种拍脑袋数字，而是用「本课前 5 分钟平均作答间隔 × 1.5」作为卡住判据。否定：仍然是时间阈值，仍然会引导老师行为，只是把拍脑袋数字包装成动态数字。本质问题未解决。

### 方案 B：不做 Dashboard，教师只凭走动观察

否定：14 对学生肉眼盯不过来；论文里没有「理论落地」的可视证据链；导师 2026-04-09 明确要求 concrete implementation。

### 方案 C：飞书多维表格视图直接看

否定：无法做完成 / L4 卡的聚合；无法做 14 组口语排名；刷新要手动；**无法对应到六理论**，违反核心定位。

### 方案 D：React + WebSocket 实时推送

否定：技术栈过重；SCF 架构不支持长连接；Pilot 前快速验证阶段需要的是可改的单文件 HTML，不是 SPA。

### 方案 E：iPad 版 Dashboard（老师拿在手上走动看）

否定：老师走动时应看学生而非屏幕；iPad Safari iOS 轮询稳定性差于 Chrome macOS；增加一台设备的维护成本。

---

## 理论依据

- **ZPD + Scaffolding**（Vygotsky, 1978; Wood, Bruner & Ross, 1976）—— 本 ADR 核心框架。
- **Cognitive Load Theory**（Sweller, 1988）—— 折叠中间组的依据。⚠️ 严格区别于 Communicative Language Teaching。
- **SLA Output Hypothesis**（Swain, 1985）—— 口语触发榜的理论依据。
- **Social Constructivism**（Piaget, 1952; Vygotsky, 1978）—— pair 名称显示强调合作身份。
- **Self-efficacy**（Bandura, 1977）—— ⭐ 星星数 + 老师 verbal persuasion。
- **3P / Play-based Learning** —— 挑战模式（ADR-009）的理论定位。

---

## 前置依赖与开发路径

### 前置依赖：ADR-009 挑战模式

Dashboard 的板块 2「已完成主线 - 给他们挑战任务」直接依赖 App 端先实现**挑战模式**：

- 完成主线站点后解锁的加难题；
- 使用与主线相同词汇，但题型更高阶（如主线是 listening match → 挑战是 speaking free response）；
- 否则 Dashboard 的按钮指向空内容，板块 2 全无意义。

ADR-009 单独立，待下一步设计。本 ADR 只标注等待状态。

### 开发工作量（相对 v1 缩减）

v1 估 1.5–2 天，v2 因为砍掉状态灯算法 + 简化到双列表，后端与前端都显著变轻：

| 阶段 | 内容 | 估时 |
|------|------|------|
| 阶段 1 | 后端 `queryProgress` action：按 `class_id + lesson_id + date` 聚合 3 张表，返回双列表 + 口语榜 | 0.5 天 |
| 阶段 2 | 前端 3 板块渲染（单文件 HTML）：顶部信息条 / 双列表 / 口语榜 | 0.5 天 |
| 阶段 3 | 对接测试：联调真实飞书数据，14 台 iPhone 同时写入验证 | 0.5 天 |
| **合计** | | **1.5 天**（上限） |

---

## How to Write This in the Thesis (English)

### Revised paragraph for Chapter 3 — App Design (Section: Teacher-facing Instrumentation)

> **Teacher Dashboard Design.** To support ZPD-based differentiated instruction in a classroom with 14 cooperative pairs sharing limited teacher attention, we designed a dual-list real-time dashboard operationalizing Vygotsky's ZPD framework. The dashboard surfaces only two categories of pairs requiring teacher action: (a) pairs who have completed all mainline stations, representing the upper boundary of their current ZPD and requiring new challenges to prevent off-task behavior; and (b) pairs who have exhausted the highest level of App-provided scaffolding (Level 4) while still producing errors, indicating that human scaffolding is needed. The middle group (pairs progressing normally within ZPD) is intentionally collapsed to minimize teacher cognitive load (Sweller, 1988) and prevent attention dilution. An additional panel displays per-pair speaking frequency counts, providing real-time insight into Output Hypothesis (Swain, 1985) engagement — a key outcome measure of this study. This dual-list design deliberately avoids threshold-based status indicators (e.g., time-based traffic lights) because arbitrary thresholds cannot be defended in research context and risk algorithm-driven teacher behavior that could confound the study's causal inference.

### Suggested figure caption

> **Figure X.** Dual-list Teacher Dashboard. The top list surfaces pairs who have crossed their ZPD upper boundary (completed all mainline stations) and await new challenges. The bottom list surfaces pairs who have exhausted Level-4 App scaffolding while still erring, indicating the need for human scaffolding. Middle-group pairs are collapsed into a single count, preserving teacher attention for pairs requiring action. The lower panel renders per-pair speaking frequency as a within-group measure of Swain's (1985) Output Hypothesis engagement.

---

## 与 ADR-006 的关系（未变）

| 维度 | ADR-006 | ADR-007 v2 |
|------|---------|-----------|
| 职责 | 数据收集基础设施（写入侧） | 数据消费入口（读取侧） |
| 数据流向 | iPhone → SCF → 飞书 | 飞书 → SCF → MacBook |
| 新增组件 | 3 张飞书表 + 3 条 SCF action | 1 条 SCF action + 1 个 HTML 页面 |
| 鉴权 | `X-Api-Key` | 复用同一 key，未来做读写分离 |

**ADR-007 v2 不重复 ADR-006 的任何决策**，只追加「如何把已收集的数据翻译成 ZPD 分层教学动作」这一层。

---

## 开放问题（研究者需审阅）

- **Q1**：「挑战模式」的具体内容在哪个 ADR 设计？→ **ADR-009，下一步做**。Dashboard 落地前必须先完成 ADR-009 的 App 侧实现。
- **Q2**：Dashboard 上能否直接从界面操作解锁挑战模式？还是只提醒老师去 iPad 上手动操作？这直接影响「一键解锁挑战模式」按钮是否真的要实现。作者倾向先做「仅提醒」版本，避免打破数据流解耦。
- **Q3**：论文截图时学生姓名用真名还是代号？这是研究伦理问题，需与 IRB / 清迈大学研究生院流程对齐。建议 Dashboard 渲染时同时保留「真名视图」与「代号视图」两种模式。
- **Q4**：第一次跑完课后要验证的假设：两个列表的触发频率是否合理？具体指标：
  - 完成列表：一节课内至少 2 对 pair 触发（否则说明 lesson 难度过高）；
  - 帮助列表：一节课内不超过 3 对 pair 同时存在（否则说明 L4 支架本身不够有效）；
  - 若任一指标偏离，先修 App，而不是修 Dashboard。
- **Q5**：口语触发榜的 SOE 平均分是否加入排序？默认只排次数（speakCount），不排 SOE。加入 SOE 平均分排序会让「说得少但说得好」的组排在「说得多但说得差」之上，可能扭曲研究者对 Output Hypothesis 的观测。暂保持只排次数，Pilot 后再评估。

---

## 后续工作

**P1（Pilot 后立刻做）**：

- 根据真实课堂数据验证双列表触发频率是否合理（Q4）；
- 新增「课后汇总视图」：一节课结束后自动显示本节课所有 pair 的完成 / L4 卡事件 + 口语总量排名 + 老师介入次数；
- 依 Pilot 反馈决定 Q2 的「一键按钮」是否真的上线。

**P2（Pilot 稳定后做）**：

- 读写分离密钥（Dashboard 专用 read-only key）；
- 与 ADR-009 的挑战模式做数据联动（挑战模式的作答也要进入口语触发榜）。

**P3（论文写作阶段做）**：

- 把每节课 Dashboard 的全程截图序列作为 Chapter 4 的 Figure 素材；
- 教师事后访谈：「哪次看 Dashboard 的决定你印象最深？」作为理论三角验证；
- Chapter 3 的 Dashboard 小节直接复用本 ADR 的「六理论映射表」与英文 Methods 段落。

---

## 与 v1 的差异速查（迁移清单）

| 项目 | v1 | v2 |
|------|----|----|
| 指标数量 | 5 个（pair / ⭐ / 🟢🟡🔴 / 🗣 / ⚙️） | 2 个触发条件（completed / L4 stuck）+ 1 个研究指标（speakCount）|
| 判定依据 | 时间阈值 + 支架级别 + 重试次数 | 二元行为状态，无时间 |
| 状态灯 | 🟢🟡🔴 | ❌ 取消 |
| 理论映射 | 5 指标 × 6 理论 | 6 理论 × Dashboard 元素/行为（重写映射表）|
| 中间组处理 | 折叠但可展开 | 只显示计数，无法展开 |
| 前置依赖 | 无 | 等待 ADR-009 挑战模式 |
| 开发估时 | 1.5–2 天 | 1.5 天（上限） |
| 论文 Methods 段落 | 围绕 status light | 围绕 dual-list + ZPD operationalization |
