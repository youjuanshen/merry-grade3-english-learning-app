# Merry English App — Claude 工作手册

## 项目简介

中国小学三年级英语合作学习App。两名学生共用一台 iPhone 6 Plus，通过 A/B 角色分工合作完成题目。研究者：沈幼娟（清迈大学博士生，研究在中国小学课堂开展）。

- **代码位置**：`~/Desktop/代码 copy 3/`
- **本地测试**：`http://localhost:8080/`
- **启动服务器**：`cd ~/Desktop/代码\ copy\ 3 && node _server.js &`
- **设计文档**：`docs/新方案_App合作冒险设计.md`
- **导师汇报文档**：`docs/App设计理念_导师汇报版.md`
- **当前任务**：`docs/当前任务清单.md` ← 每次开始前先读这个
- **新窗口上手**：`docs/PROJECT_STATUS.md` ← 开新窗口后先读这个
- **版本记录**：`docs/CHANGELOG.md` ← 每次改完重要功能追加一行

---

## ⚡ 工作原则（必须遵守）

### 1. 主窗口只做决策，不读代码
- 主窗口（和用户聊天的地方）只讨论方向、做决定、看摘要
- **禁止**在主窗口读代码文件、调试细节
- 读代码的事全部交给 Agent

### 2. Agent 永远后台运行
- 所有 Agent 必须设 `run_in_background: true`
- 不阻塞主窗口对话
- 完成后自动通知

### 3. Agent 模型分配（省token）
- **主窗口**：Opus — 思考、讨论、决策
- **Agent 默认用 Sonnet** — bug修复、代码改动、文件搜索、部署
- **Agent 用 Opus 的情况** — 仅当任务需要深度思考（架构设计、理论分析、复杂调试）
- 简单搜索/语法检查可以用 Haiku

### 4. 并行启动多个 Agent
- 只要任务涉及不同文件，在一条消息里同时启动多个 Agent
- 例：adventure.js 的 bug 修复 + style.css 的 UI 优化 → 同时跑

### 4. 决定立刻写进文档
- 每次讨论后，把结论写入 `docs/当前任务清单.md`
- Agent 读文档执行，不依赖对话记忆

### 5. Agent 完成后只返回摘要
- Agent 报告控制在 20 行以内
- 详细日志存文件，主窗口只看结论

### 6. 换窗口/Compact前主动提醒（不等用户说）
当 context 接近 80% 或用户说要开新窗口时，主动问：
- 有没有未记录的重要决策？（说"记下来"可以立刻存 ADR）
- CHANGELOG 有没有漏掉的功能变更？
- 当前任务清单有没有需要更新的？

确认完再换，避免信息丢失。

### 7. 改完代码必须按"四步测试流程"验证（不等用户说）

| 步骤 | 谁做 | 怎么做 | 拦住什么 |
|------|------|--------|---------|
| ① 语法+模式检查 | AI自动 | `node --check` + grep bug-patterns | 语法错误、已知bug模式 |
| ② Puppeteer自动测试 | AI自动 | `node test-ui-auto.js` | 题型流程走不通、DOM缺失 |
| ③ Mac浏览器 | 用户手动 | `localhost:8080` 走完整流程 | UI问题、逻辑错误 |
| ④ iPhone真机 | 用户手动 | `https://IP:8443` | iOS 12兼容、触屏、录音 |

**铁律：只有上一步通过了才进入下一步。Mac没问题才拿手机试。**

### 8. Bug验证流程（用户确认才算完）
- Agent修完bug后 → 更新 `docs/测试bug追踪.md` 标记为 "🔧 代码已修，待验证"
- 主动告诉用户怎么验证（具体操作步骤）
- **用户说"BUG-X 通过"才能标 ✅，否则永远是 🔧**
- 如果用户说"BUG-X 没过" → 标 ❌ 重新修
- 每次对话结束前，提醒用户有几个待验证的bug

### 9. 举一反三铁律（用户说一次就够）
- 用户报告任何bug → **必须全局扫描同类问题，一次性全部修完**
- 禁止只修用户指出的那一个，禁止等用户再次发现才修
- 修完后报告："扫描了X处，修了Y处"，让用户知道覆盖范围
- 如果不确定是否有同类问题 → 宁可多扫一遍也不要漏

- 如果发现新 bug 模式 → 立刻追加到 `docs/bug-patterns.md`，格式见该文件
- 改了重要功能 → 在 `docs/CHANGELOG.md` 追加一行

---

## 📁 核心文件结构

```
代码 copy 3/
├── CLAUDE.md              ← 你现在读的这个
├── adventure.js           ← 冒险地图+答题流程+自适应算法
├── coop-types.js          ← 所有题型渲染器（StepA/StepB）+支架系统
├── app.js                 ← 主逻辑
├── style.css              ← 全局样式
├── index.html             ← 入口页面
├── data/
│   └── u1l1_coop.js      ← U1L1题库（唯一已完成的课）
├── docs/
│   ├── 当前任务清单.md    ← 每次必读
│   ├── 新方案_App合作冒险设计.md
│   ├── App设计理念_导师汇报版.md
│   └── 知识点清单_U1L1.md
└── test-ui-auto.js        ← 唯一的自动化测试文件
```

---

## 👥 专家团角色（说"专家团讨论"时用这五个）

| 角色 | 视角 | 核心问题 |
|------|------|---------|
| 导师/审查人 | 学术严谨性 | "理论依据够吗？答辩能过吗？论文里站得住脚吗？" |
| 小学英语教师 | 教学内容 | "内容对不对？难度合适吗？知识点有没有漏？" |
| 测试设计专家 | 研究效度 | "效度/信度够吗？难度分布科学吗？" |
| 工程师/UX | 技术+体验 | "iOS 12能跑吗？操作流程顺畅吗？会有bug吗？" |
| 三年级学生 | 真实用户 | "小孩看得懂吗？会不会卡住？手指点得到吗？" |

> 每个角色讨论完后统一问：**"这个决策最大的漏洞是什么？"**

---

## 🎓 理论框架（六个，顺序固定）

1. **Social Constructivism** — Piaget + Vygotsky
2. **SLA** — Krashen(i+1) + Long(交互假说) + Swain(输出假说)
3. **CLT = Cognitive Load Theory** — Sweller ⚠️ 不是Communicative Language Teaching
4. **ZPD + Scaffolding** — Vygotsky + Wood et al.
5. **3P = Project / Problem / Play-based Learning**
6. **Self-efficacy** — Bandura

---

## 🛠️ 支架系统规则（不能违反）

- **任何级别支架都不能减少选项数量**（保护 construct validity）
- 四级顺序：Level1同伴协商 → Level2 Modified Input → Level3语言线索 → Level4多模态
- 支架必须在 `renderCoopType` 之后插入（否则被 `innerHTML=''` 清除）

---

## 📱 UI 设计约束（iPhone 6 Plus / iOS 12）

- 设备：iPhone 6 Plus，系统 iOS 12
- 屏幕宽度：414px（CSS逻辑像素）
- 触控目标：最小 52px 高
- 字号：英文单词 32px+，说明文字 16px+
- A/B 分阶段全屏切换（不同屏同时显示两个区域）
- 学生水平极弱：图片优先，文字辅助
