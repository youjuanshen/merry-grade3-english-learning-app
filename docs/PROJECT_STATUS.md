# Project Status

> 每次开新窗口先读这个。
> 最后更新：2026-04-11 傍晚

## 下一步（明天早上直接做这个）

**先跑一次 audit 验证今天的修复**：派 audit agent 跑 `docs/audit_2026-04-11.md` 同样的流程，输出 `docs/audit_2026-04-12.md`，对比前后问题清单，确认零新 bug。

修完 audit 零问题后，决定：
- A. 修 coop_flip_match Output（理论对齐审查表中答辩最容易被质疑的题）
- B. 修其他 ⚠️ 支架定义缺失的题型（coop_listen_relay / listen_judge / relay_fill 等）
- C. 录导师汇报视频（脚本需要先重写，用户明确要求）

## 今天（2026-04-11）完成的 15+ 件事

**Bug 修复（15 个）**：
1. B009 listen_scenario B 区 pointer-events 卡死
2. B010 A 完成后自动滚到 B 区
3. B011 fixed overlay 被遮挡/清除教训入库
4. B012 .coop-zone 宽度约束
5. B013 getScaffoldHintHtml 读错字段（支架内容全空）
6. B014 grid item min-width 不足导致内容撑爆
7. B015 warmup 硬编码索引越界 crash
8. loadAdventureProgress localStorage 越界容错
9. AB 角色每题轮换（研究 bug）
10. 自动化测试 27✅/4❌ → 31✅/0❌
11. 4 个 projectMap 数据缺 items
12. 旧方案代码清理 18 个文件
13. 桌面浏览器 max-width 约束（#game-screen）
14. 超纲数据修复（cat/tiger/brown/black/beautiful 等全部清除）
15. reading/s4 3 题降级重写

**文档产出**：
- ADR-002 KM 矩阵与研究目标框架
- ADR-003 六理论在 App 中的完整逻辑
- ADR-004 导师汇报视频设计决策
- 导师汇报视频脚本（中英文，需重写）
- 题型 × 六理论对照表（78 格）
- audit_2026-04-11.md 端到端扫描报告

**新 memory（5 条）**：
- 合作题型设计三问
- 共享屏幕原则
- Speaking题A零门槛口语
- 合作题型设计第0问——不可替代价值
- 5层支架法则

**删除的题型**：
- coop_category_sort（大小分类）——5 专家一致认为无不可替代价值，成为今天最大教训

## 本次重要决策

**大小分类删除**：浪费大半天设计的题型最终被删，因为违反"设计第0问"——没有不可替代价值。教训已入 memory。

**今天所有工作的真正产出**：不是代码修复，是 5 条设计原则 memory + B011-B015 bug 模式。这些会保护未来所有新题型。

## 明天开工注意

1. **浏览器缓存**：CSS 版本已 bump 到 v=10003，正常刷新即可
2. **localStorage**：如果测试发现进不去题，在控制台 `localStorage.clear(); location.reload()`
3. **导师汇报视频**：用户明确说脚本要重写，视频放在"所有工作满意后"才录
4. **不要再做 reactive bug 修复**：用户今天下午明确说过这个工作方式错了，正确方式是 "audit → 批量修 → 再 audit"

## 关键文件索引

- 任务清单：`docs/当前任务清单.md`
- Bug 模式库：`docs/bug-patterns.md`（B001-B015）
- 理论对齐审查表：`docs/理论对齐审查表.md`
- audit 报告：`docs/audit_2026-04-11.md`
- 视频脚本：`docs/导师汇报视频脚本.md`（待重写）
- 今日决策：`docs/decisions/ADR-002/003/004`
