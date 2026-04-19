# ADR-010: Project-based 题型定位为单元 L4 大作业

## 状态
**设计已通过（2026-04-12）**，实施延后到 Phase 3。

**延后原因**（2026-04-12 下午更新）：U1 词汇累积池审计（`docs/U1_词汇累积池.md`）发现 U1L2/L3/L4 的题库和知识点清单全部未建，要启动 U1L4 project pilot 必须先补完 U1L2-L4（约 240 道题 + 清单），工作量 6-9 天，和导师汇报时间窗口冲突。本 ADR 的五专家评审 + 7 条设计原则 + 语言材料铁律已锁定，未来题库扩展完成后直接进入实施。

## 背景

### 用户需求
2026-04-12，用户提出"在每个模块加一个 project-based 题型，让学生做一个小项目，给学有余力的同学准备"。

### 五专家投票结果
围绕 4 个候选（合作情景剧 / 故事拼图 / 合作海报 / Quiz Battle），5/5 专家一致投票 **候选 A 合作情景剧**：
- 导师/审查人：论文 defend 最硬，一次命中 Social Constructivism + SLA Output + SLA Interaction + ZPD 四理论
- 小学英语教师：三年级最喜欢演，课本本来就有 role-play 板块
- 测试专家：数据最干净，每句话的 SOE 四字段 + 对子合作时间差可量化
- 工程师：技术中等，可基于现有 dialogue 题型扩展
- 三年级学生：演角色比做题好玩 100 倍

### U1L1 词汇池审计带来的硬约束
审计结果（`docs/U1L1_词汇句型池.md`）：
- 可用词汇仅 20 个
- 可用句型仅 6 种陈述句 + 1 感叹（Look!）
- **0 问句 / 0 祈使句 / 0 寒暄词**（hello/hi/yes/no/ok/thank you/goodbye 课本一个都没教）
- "zoo" 英文超纲

**结论**：U1L1 不具备"情景剧"的语言材料，连"你好"都说不出来。

## 决策

**Project-based 合作情景剧放在每个单元的 Lesson 4**（U1L4 / U2L4 / U3L4 / U4L4），而不是每个模块一个。

### 决策细节

| 项 | 决定 |
|---|---|
| **位置** | 每单元 L4（不是每模块一个） |
| **数量** | 每单元 1 个 = 全部 4 单元共 4 个 project |
| **L4 结构** | 主线 4 模块（听/说/读/写）**+** project **额外解锁** |
| **解锁条件** | L4 主线 4 模块全部通关后解锁 project |
| **是否必做** | 可选（学有余力的学生挑战，不做不影响过站） |
| **Pilot 顺序** | U1L4 MVP → 真机验证 → 复制 U2L4 / U3L4 / U4L4 |

### 情景剧设计原则（7 条必守）
来自五专家的条件清单：

1. **剧本脚手架**：给明确台词模板，不能让学生空想
2. **A/B 自选角色**：学生自己挑角色（不是系统硬分配）
3. **3-6 轮对话**：Pilot 用 3 轮，真机跑通后升到 5 轮
4. **先听 AI 示范**：系统先播完整对话音（i+1 可理解输入）
5. **每轮给 2-3 个台词选项让学生选 + 念**（防止退化为 read_relay）
6. **"我不会说"兜底按钮**：弱学生可跳过某句不影响过站
7. **录音失败可重录**

### 语言材料铁律
**所有台词必须 100% 来自课本**：
- 句型来源：对应单元的知识点清单
- 词汇范围：对应单元已学的累积池（例如 U1L4 的 project 可用 L1+L2+L3+L4 累积的所有词）
- 禁止任何超纲词和超纲句型
- 剧本里的每一句都必须能在课本找到原型

## 理论依据

### 核心价值：持续性合作（Social Constructivism 深层协商）
用户在 5 专家讨论后明确选择此价值点作为 project-based 的不可替代理由：

> 现有 13 题型的合作是碎片化（每题 1-2 分钟），project-based 是持续性的（5-10 分钟连续协商）。Vygotsky 的 ZPD 真正发生在深层协商中，碎片化合作只触及浅层。

### 六理论命中
| 理论 | 如何体现 |
|---|---|
| Social Constructivism | 两人持续协商完成一段对话 |
| SLA Output Hypothesis | 学生被迫产出超出舒适区的语言 |
| SLA Interaction Hypothesis | A/B 必须互相回应，任何一方断了对话就崩 |
| CLT（认知负荷） | Pilot 3 轮 + 脚手架台词选项，降低 working memory 负荷 |
| ZPD + Scaffolding | 剧本/选项/AI示范/中文对照/兜底按钮多层支架 |
| 3P（Project-based Learning） | 这是 3P 中"Project"字母在 App 里的唯一操作化 |
| Self-efficacy（Mastery Experience） | "我和同桌演了一整段对话"是最强的成就感来源 |

### 参考文献
- **Swain, M. (1985).** Communicative competence: Some roles of comprehensible output in its development. In S. M. Gass & C. G. Madden (Eds.), *Input in second language acquisition* (pp. 235-253). Newbury House.
- **Long, M. H. (1996).** The role of the linguistic environment in second language acquisition. In W. C. Ritchie & T. K. Bhatia (Eds.), *Handbook of second language acquisition* (pp. 413-468). Academic Press.
- **Vygotsky, L. S. (1978).** *Mind in society: The development of higher psychological processes.* Harvard University Press.
- **Bandura, A. (1997).** *Self-efficacy: The exercise of control.* Freeman.

## 否定的方案

### 方案 A：每模块 1 个 project（共 16 个 = 4 单元 × 4 模块）
- ❌ 工作量过大（16 个 project）
- ❌ 听力和阅读模块做"情景剧"语义不通
- ❌ 和现有题型边界模糊

### 方案 B：U1L1 就做 project-based
- ❌ U1L1 词汇池只有 20 词 + 6 陈述句，0 问句 0 寒暄
- ❌ 连一段 3 轮对话都凑不出来
- ❌ 违反 Krashen i+1（跨度过大）

### 方案 C：Project-based 做成独白式（非对话）
- ❌ 失去"情景剧"的核心价值（持续性合作）
- ❌ 退化为 read_relay 的变体
- ✅ 备选：如果 U1L4 词汇池审计后仍 🔴 不可做，U1L4 退回独白式，真正的情景剧从 U2L4 起步

## 工期重估

原估"每模块 1 个 project × 4 模块 = 4-8 天"。
新估"每单元 1 个 project × 4 单元"：

| 阶段 | 工期 |
|---|---|
| 词汇累积池审计（U1L1-L4） | 已派 agent，半天 |
| U1L4 MVP pilot 开发 | 2-3 天 |
| 真机测试 + 调整 | 0.5-1 天 |
| 复制到 U2L4 / U3L4 / U4L4 | 每个 0.5-1 天 × 3 = 1.5-3 天 |
| **总计** | **4-7 天** |

比原估略有压缩（综合型任务比 16 个小任务高效）。

## 前置依赖

1. **U1 全单元词汇累积池审计**（已派 agent，输出 `docs/U1_词汇累积池.md`）
2. **U2/U3/U4 词汇累积池审计**（待做，决定每单元 L4 project 的可行性）
3. **SOE 口语评分真机验证**（P1-9 代码完成，iOS 12 真机待测）
4. **五专家 7 条设计原则**（已列入本 ADR）

## 实施顺序（待审计完成后）

1. ⏳ 等 U1 累积池审计结果
2. 🟢 U1L4 MVP：基于累积池写剧本（3 轮对话 + 每轮 2-3 选项 + AI 示范 + 兜底按钮）
3. 🟢 U1L4 真机验证
4. 🟢 复制 U2L4（用 U2 累积池重写剧本）
5. 🟢 复制 U3L4 / U4L4
6. 🟢 写 CHANGELOG + 更新任务清单

## 开放问题

- Q1：U1L4 累积池如果仍然缺问句/寒暄，是退回独白式还是推迟到 U2L4？
- Q2：学生选台词时，2-3 个选项应该只有 1 个正确（防错），还是允许多个正确（鼓励创造）？
- Q3：AI 示范用男女声还是双童声？
- Q4：Project 完成后的"作品回放"要不要做（把两人完整录音拼起来播放）？这是 Mastery Experience 的关键环节，但工期 +1 天。

## 关联文档

- `docs/decisions/ADR-009_U1L1题量规划与过站规则.md`（L4 过站规则前提）
- `docs/U1L1_词汇句型池.md`（U1L1 的硬约束来源）
- `docs/U1_词汇累积池.md`（待生成，决定 U1L4 可行性）
- `memory/feedback_coop_design_question_zero.md`（设计第 0 问铁律）
- `memory/feedback_coop_design_three_questions.md`（合作题型设计三问）
- `memory/feedback_vocabulary_textbook_only.md`（课本词汇铁律）
