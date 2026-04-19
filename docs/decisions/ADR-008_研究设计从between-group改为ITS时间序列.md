# ADR-008: 研究设计从 Between-group 改为 Interrupted Time Series

## 状态
讨论中（2026-04-11），待导师 Teeraporn 确认

## 背景

### 原方案遇到的硬伤
Obj2（英语发展）原计划采用 between-group quasi-experimental：
- **实验组**：研究者所在班（三下某班，28 人含 1 名转学生，14 对合作）
- **对照组**：其他学校三年级班级

硬伤：**对照组学校的期末考不含口语评分**，而本 App 核心目标是提升学生口语（对应 Output Hypothesis / SLA / CLT）。
关键研究问题（口语提升）无法在 between-group 框架里 defend，而补测对照组口语需动用跨校人脉与重新伦理审批，成本极高。

### 讨论过的替代方案

| 方案 | 发表等级 | 工作量 | 口语问题 |
|---|---|---|---|
| A. 缩小 Obj2 范围（只比听读写，口语改 within-group） | 🥈 中 | 低 | 部分解决 |
| B. 补测对照组口语 | 🥇 高 | 极高（人情+伦理） | 解决 |
| C. **放弃对照组，改用 ITS** | 🥈 中-高 | 低 | **完全解决** |

研究者明确表示 B 方案成本过高，倾向 C。

## 决策

**采用 Interrupted Time Series (ITS) Design（中断时间序列设计）**，放弃对照组，全部改为实验组内 within-group 分析。

### 设计结构

| 阶段 | 时间窗口 | 干预状态 | 数据收集 |
|---|---|---|---|
| **Phase 1: Baseline** | 期中考前 2 个月（约 8 周） | 传统教学，无 App | 每周平时成绩 / 课堂观察 / 满意度问卷 |
| **Interruption Point** | 期中考 | App 介入 | 期中考成绩（baseline 终点） |
| **Phase 2: Intervention** | 期中考后 2 个月（约 8 周） | App 辅助教学 | 每周平时成绩 / 课堂观察 / 满意度 + App 行为数据（ADR-006 三张表） |
| **Endpoint** | 期末考 | — | 期末考成绩（intervention 终点） |

### 分析方法：Segmented Regression

核心统计检验三个问题：
1. **Level change**：Interruption 点是否出现瞬时跳跃？
2. **Slope change**：Phase 2 的学习速率斜率是否显著大于 Phase 1？
3. **Long-term trend**：期末考 vs 期中考 vs Phase 1 起点的整体提升量？

口语 SOE 分数也纳入 ITS 分析（对照组无法解决的问题消失）。

### Triangulation（三角验证）
- **定量 Line 1**：每周平时成绩折线（学科表现）
- **定量 Line 2**：每周课堂观察评分（参与度）
- **定量 Line 3**：每周满意度问卷（情感 / Self-efficacy）
- **定性**：学生访谈 + 教师反思（已在 Obj3/Obj4 框架内）

三条独立证据链同时在 Interruption 点出现斜率变化 → 可以归因于 App 介入。

## 理论依据

### 研究设计方法论
- **Shadish, W. R., Cook, T. D., & Campbell, D. T. (2002).** *Experimental and quasi-experimental designs for generalized causal inference.* Houghton Mifflin.
  → ITS 被列为"无法做 RCT 时的准实验银牌"，在教育研究广泛接受
- **Bernal, J. L., Cummins, S., & Gasparrini, A. (2017).** Interrupted time series regression for the evaluation of public health interventions: a tutorial. *International Journal of Epidemiology, 46*(1), 348-355.
  → Segmented regression 的标准分析流程
- **Biglan, A., Ary, D., & Wagenaar, A. C. (2000).** The value of interrupted time-series experiments for community intervention research. *Prevention Science, 1*(1), 31-49.
  → 教育干预场景的 ITS 应用

### 与 App 六理论的关系
ITS 设计本身不影响六理论（Social Constructivism / SLA / CLT / ZPD+Scaffolding / 3P / Self-efficacy）在 App 内部的操作化，只改变 Obj2/Obj4 的**数据比较方式**。

## 否定的方案

### Plan A（缩小 Obj2，保留 between-group 对照学校）
- ❌ 口语无法对比，研究核心卖点少一个证据
- ❌ 仍依赖对照学校配合
- ✅ 比 C 更接近 between-group 金标准

### Plan B（对照学校补测口语）
- ❌ 研究者明确排除：人脉成本过高
- ❌ 跨校伦理审批需要重走
- ✅ 研究严谨度最高

### Plan C（本决策）— 选 C 的理由
1. **口语问题自动解决**：所有分析全部 within-group，SOE 分数直接纳入
2. **数据已有**：研究者已在每周收集平时成绩 / 观察 / 满意度，ITS 需要的高频数据天然满足
3. **发表等级接近 between-group**：ITS 是经典教育研究方法，顶级期刊接受
4. **避免跨校协调**：不依赖任何外部学校

## 四个主要效度威胁与应对

| Threat | 风险描述 | 应对 |
|---|---|---|
| **History** | 期中考后可能发生与 App 无关的其他变化（课程进度、教师状态、季节等） | 三条独立证据链 triangulation；每周课堂观察可记录异常事件 |
| **Maturation** | 三年级学生自然成长 8 周本身就会提分 | Phase 1 基线斜率已捕获自然成长率，Segmented regression 会扣除 |
| **Testing effect** | 每周测试本身会提分 | Phase 1 和 Phase 2 同样高频测试，相互抵消 |
| **Novelty effect** | App 新鲜感导致 Phase 2 早期短期提升 | 跑满 8 周，Week 1-2 vs Week 7-8 对比可检测新鲜感衰减；持续提升才归因于学习 |

## 需要确认的 4 个前置条件

| # | 条件 | 当前状态 |
|---|---|---|
| 1 | 每周平时成绩数据连续性（Phase 1 至少 8 周 + Phase 2 至少 8 周） | ⏳ 待确认 |
| 2 | 每周课堂观察表数据连续性 | ⏳ 待确认 |
| 3 | 每周满意度问卷数据连续性 | ⏳ 待确认 |
| 4 | 导师 Teeraporn 对 ITS 设计的认可 | ⏳ 待讨论 |

## 论文怎么写

### Methods 章节英文段落（草稿）

> **Research Design.** Due to the inter-school heterogeneity in standardized testing (control schools' final examinations do not include speaking assessment), a between-group quasi-experimental design was not feasible for evaluating speaking development, which is a core outcome of the proposed App. Therefore, this study adopted an **Interrupted Time Series (ITS) design** (Shadish, Cook, & Campbell, 2002), a well-established quasi-experimental method for intervention research without a control group.
>
> **Phases.** The study consisted of two consecutive phases within the same class (N = 28 students, 14 cooperative pairs). *Phase 1 (Baseline, 8 weeks)* occurred prior to the midterm examination, during which students received traditional English instruction without the App. *Phase 2 (Intervention, 8 weeks)* occurred after the midterm and introduced the cooperative learning App as a supplement to classroom instruction.
>
> **Data Collection.** Weekly data were collected throughout both phases, including: (1) in-class formative assessment scores, (2) structured classroom observation ratings on a 4-point Likert scale, and (3) student satisfaction questionnaires. Summative assessments (midterm and final examinations) served as Phase 1 and Phase 2 endpoints, respectively. In Phase 2, additional App behavioral data were collected per ADR-006.
>
> **Analysis.** Segmented regression (Bernal et al., 2017) was used to estimate three parameters: (a) baseline trend slope in Phase 1, (b) immediate level change at the intervention point, and (c) slope change between Phase 1 and Phase 2. Triangulation across three independent weekly data streams (performance, engagement, satisfaction) was used to strengthen causal inference.

### Limitations 章节要写清楚
- 单组设计固有的局限（缺少真正的 counterfactual）
- History threat 的残余风险
- 新鲜感效应的残余风险
- 样本量局限（N=28，14 对）

## 后续行动

1. **立即**：把本 ADR 内容整理成 proposal 段落发给导师 Teeraporn 讨论
2. **导师认可后**：更新 ADR-006 Obj2/Obj4 章节，把 between-group 相关内容全部替换为 ITS
3. **更新当前任务清单.md**：追加"验证 Phase 1 数据连续性（回溯期中考前 8 周的平时成绩 / 观察表 / 满意度是否齐全）"
4. **论文 Methods 章节**：直接用本 ADR 草拟的英文段落起草

## 开放问题

- Q1：Phase 1 和 Phase 2 分别 8 周是否够支撑 segmented regression？（统计功效需核算）
- Q2：每周的"平时成绩"具体是什么测试？单元小测 or 周考？每周测试内容是否标准化（否则 ITS 数据点不可比）
- Q3：期中考和期末考是否由同一套命题逻辑出题？难度等值性如何论证？
