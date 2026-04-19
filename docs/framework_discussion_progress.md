# 框架图讨论进度记录
> 创建：2026-04-17
> 用途：开新窗口时读取，继续讨论

---

## 一、已确定的六理论关系链（核心决策）

```
SC（为什么合作）
 └── SLA（合作中学什么：i+1 / Interaction / Output）
      └── 3P（用什么形式合作：Play / Problem / Project）
           └── CLT（在这个形式里怎么分工：A半 / B半）
                ├── 做对 → Self-efficacy（继续的动力）
                └── 做错 → ZPD + Scaffolding（支持）
```

### 关系说明（逐条确认过的）：

1. **SC是最外层** — 整个系统存在的前提是"两个人合作"
2. **SC通过3P实现** — SC是"为什么合作"，3P是"怎么合作"（Play/Problem/Project活动形式）
3. **SLA在3P前面** — 先决定学什么内容（语言），再决定用什么形式学（游戏/挑战/项目）
4. **CLT在3P里面** — 在确定了活动形式后，才决定怎么在A和B之间分配认知负荷
5. **CLT的拆分产生了信息差** — A只有音+图，B只有图+词 → 信息差 → 让SLA Interaction工作
6. **i+1可以独立工作** — 不依赖SC，一个人也能有自适应难度
7. **Interaction依赖SC** — 没有两个人就没有信息差
8. **Output在App里通过SC实现** — 可以独立存在，但App里B被逼用英文是因为A只给了图
9. **ZPD只在做错时触发** — i+1把题目推到能力边缘，做错的题落在ZPD里
10. **Self-efficacy是输出端** — 做对产生掌握体验，驱动继续

### 嵌套逻辑（从外到内）：
SC → SLA → 3P → CLT → A/B交互 → 结果分两路（SE / ZPD）

---

## 二、已确定的可视化方式

### 整体结构：一张大图分两部分
- **左边 Panel A**：理论框架图（纯理论关系）
- **右边 Panel B**：理论×阶段矩阵（理论如何在App每个阶段体现）
- 两部分用箭头"guides design"连接

### 左边 Panel A：嵌套方框图
- SC最外层（绿色）→ SLA第二层（蓝色）→ 3P第三层（橙色）→ CLT第四层（紫色）
- 中心是A→B交互
- 做对→Self-efficacy / 做错→ZPD+Scaffolding
- 反馈环：i+1 adaptive → 回到下一题
- **当前状态：大结构已确认，CLT内部（A/B + ZPD + SE部分）需要简化，现在有点乱**

### 右边 Panel B：理论×阶段矩阵
- 列 = 8个阶段（教师端→配对→模块→地图→A→B→支架→反馈）
- 行 = 8个理论（每个理论名称下有核心概念定义）
- 激活格子（绿色）只写App怎么做（不重复理论定义）
- 底部汇总行：每阶段几个理论同时工作
- **当前状态：基本完成，等左边确定后再同步更新**

---

## 三、导师和专家审查意见（已记录）

详细记录在：`docs/expert_critique_framework.md`

### 导师Teeraporn的核心要求：
1. 理论之间要有结构关系（不是并列）
2. 要有可视化框架（表格或图）
3. 10秒原则——一眼看到核心结构
4. 用简单几何图形（不要卡通）
5. 左右信息必须一致
6. 每个理论要说清在输入/过程/输出的哪个位置

### 专家共同关注的问题：
1. 合作是真对话还是轮流操作？→ L1讨论提示确保对话
2. 3P标签是否名副其实？→ 承认是adapted版
3. 支架是否偷走任务？→ L4仍要求选答案
4. 学习者自主性在哪？→ 未来迭代加入

---

## 四、当前文件位置

| 文件 | 内容 | 状态 |
|------|------|------|
| `docs/figures/figure_final_combined.html` | 左右合并的最终图 | 左边CLT内部需要简化 |
| `docs/导师汇报视频脚本_v2.md` | 视频脚本 | 需要根据最终图更新 |
| `docs/expert_critique_framework.md` | 专家审查意见 | 完成 |
| `docs/framework_discussion_progress.md` | 本文件 | 当前 |

---

## 五、下一步待做

1. **简化CLT内部**：A/B + ZPD + SE的布局太乱，需要重新排列
2. **确认后同步右边矩阵**：确保左右一致
3. **替换真实App截图**：右边矩阵的mockup换成真实截图
4. **扮演导师最终审查**
5. **更新视频脚本**

---

## 六、新窗口提示词

复制以下内容到新窗口：

```
请读取以下文件了解我们之前的讨论进度：
1. /Users/shenyoujuan/Desktop/代码 copy 3/docs/framework_discussion_progress.md
2. /Users/shenyoujuan/Desktop/代码 copy 3/docs/expert_critique_framework.md
3. /Users/shenyoujuan/Desktop/代码 copy 3/docs/figures/figure_final_combined.html

我们在讨论博士论文的理论框架图。六个理论的关系链已经确定：
SC → SLA → 3P → CLT → A/B交互 → Self-efficacy(成功) / ZPD(失败)

当前问题：左边Panel A的嵌套方框图里，CLT内部（A/B + ZPD + Self-efficacy）的布局太乱，需要简化。请帮我继续优化这张图。
```
