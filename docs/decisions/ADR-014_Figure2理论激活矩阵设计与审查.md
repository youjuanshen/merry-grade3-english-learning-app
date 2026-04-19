# ADR-014: Figure 2 Theory Activation Matrix 设计与专家审查

## 状态
已采纳（2026-04-19）

## 背景
Figure 2 需要展示"一道合作题（~30秒）中六个理论如何同时工作"。需要一种清晰的可视化方式，让审稿人/导师一眼看到"这不是理论拼盘，是真正的融合"。

## 决策

### 矩阵结构
- 5个理论（SC/SLA/CLT/ZPD/SE）×4个阶段（Setup/Interaction/Support/Feedback）
- 3P作为顶部Banner（station/unit level宏观设计原则，不进矩阵）
- 激活级别：Primary / Secondary / Inactive
- 底部Integration Points：4个卡片，每个标注对应Phase

### 截图原则
1. **必须全部用真实App界面截图** — 不能用AI生成的示意图，导师会质疑"App里没有这个画面"
2. **同一截图可以出现在不同理论行** — 这恰恰证明"一个设计决策同时服务多个理论"，是论文核心论点
3. **Secondary格子也要有截图** — 让读者直观看到每个格子对应的App界面

### 专家审查后的修正（6处）
1. **SLA必须包含Swain** — SLA P2补充 "B must produce a response based on A's result — pushed output reveals gaps (Swain)"，三假说都要在矩阵中有体现
2. **ZPD必须标注与SC的关系** — 理论标签加 "(inherent SC mechanism)"，Note中说明 "separated here for analytical clarity"
3. **SC P1文字匹配截图** — 改为 "Cooperative structure set" 匹配教师配置界面截图
4. **SE P2不重复SC P4** — SE P2聚焦vicarious experience（"A peer like me can do it"），不重复 "both must answer correctly"
5. **Note补充层级关系** — SC标注 "the epistemological foundation"，ZPD标注 "an inherent mechanism within SC"
6. **Integration Points加Phase标签** — 让读者能和上方矩阵对应

## 理论依据
六理论框架整体：SC (Vygotsky, 1978) + SLA (Krashen, 1985; Long, 1996; Swain, 1985) + CLT (Sweller, 1988) + ZPD/Scaffolding (Vygotsky; Wood et al., 1976) + 3P (synthesized in this study) + SE (Bandura, 1977)

## 否定的方案
1. **AI生成示意图** — 被否决，导师会质疑真实性
2. **每个格子用不同截图** — 不现实（Secondary格子对应的App画面有限），且同一截图出现在多行恰好证明理论融合
3. **Integration Points不加Phase标签** — 被否决，读者看不出和上方矩阵的对应关系

## 导师可能的质疑（已准备防守）
1. "Swain的Output在哪个格子？" → SLA P2已补充pushed output
2. "ZPD和SC在Figure 1嵌套，Figure 2怎么平行了？" → 标注+Note说明 "for analytical clarity"
3. "3P学术合法性？" → "adopted as design principles, not full pedagogical implementations"
4. "SE三个阶段都Primary？" → 共享屏幕是intentional design for vicarious experience
5. "CLT P1教师预选=任何App都有？" → "most apps require student navigation; here ALL decisions removed"

## 论文怎么写
Figure 2 maps the activation of five micro-level theories across four phases of one cooperative question (~30 seconds), demonstrating that the six theories are not isolated but genuinely integrated — a single design decision (e.g., A/B task split on shared device) simultaneously serves CLT (reduced cognitive load), SC (enforced cooperation), and SE (vicarious experience).
