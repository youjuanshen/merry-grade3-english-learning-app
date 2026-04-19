# ADR-002: KM矩阵与四个研究目标的对应框架

## 状态
已采纳（2026-04-11）

## 背景
导师（清迈大学KM系）要求研究不能只讲EFL理论，必须把KM流程显式地连接进来。
参考硕士论文的 Integrated Matrix 格式，需要把 Obj 1-4 对应到 KM 流程，
并用第二张矩阵展示各理论工具在哪个KM阶段发挥作用。

## 四个正式研究目标
- **Obj 1**: To design and develop a six-theory-grounded AI-assisted English learning app/model for Grade 3 students.
- **Obj 2**: To examine students' English development in listening, speaking, reading, writing, and English App application.
- **Obj 3**: To evaluate students' engagement during implementation.
- **Obj 4**: To evaluate students' learning outcomes.

## 决策：采用两张矩阵结构

### 第一张：Experimental Design Matrix（目标 → KM流程 → 步骤 → 理论工具 → 输出）

| Objectives | KM Process | Steps | Theories & Tools | Output |
|-----------|-----------|-------|-----------------|--------|
| Obj 1 设计开发App | Knowledge Identification | 1.1 识别学生英语学习差距 | Literature review, Pre-test, Gap analysis | 学习需求清单 |
| | Design KM Model | 1.2 基于六理论设计App | Social Constructivism, SLA, CLT, ZPD, 3P, Self-efficacy | App设计蓝图 |
| | Knowledge Capture | 1.3 开发含数据记录的App | AI adaptive algorithm, Cloud database | 功能型App原型 |
| | Knowledge Representation | 1.4 将知识编码进App内容 | CLT, Multimedia design | 四技能站点+合作题型 |
| | Knowledge Dissemination | 1.5 在课堂部署App | Teacher-led, AI-assisted model | 学生获得学习内容 |
| Obj 2 英语发展 | Knowledge Practice | 2.1 学生通过App完成合作任务 | A/B合作结构, ZPD支架 | 各技能练习记录 |
| | Knowledge Leverage | 2.2 测量L/S/R/W提升 | Pre/Post test, t-test | 英语发展分数 |
| Obj 3 参与度 | Knowledge Practice | 3.1 观察并测量参与度 | Classroom observation, Self-efficacy scale | 参与度数据 |
| Obj 4 学习成果 | Knowledge Leverage | 4.1 实验组vs对照组比较 | AAR, Statistical analysis | 学习成果对比 |

### 第二张：Integrated Matrix（理论工具 × KM流程）

| Theory / Tool | Knowledge Identification | Design KM Model | Knowledge Capture | Knowledge Representation | Knowledge Dissemination | Knowledge Practice | Knowledge Leverage |
|--------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Social Constructivism | | × | | | × | × | |
| SLA – Input (i+1) | | × | × | × | × | | |
| SLA – Interaction Hypothesis | | × | | | × | × | |
| SLA – Output Hypothesis | | × | | | | × | × |
| CLT (Cognitive Load Theory) | | × | | × | × | | |
| ZPD + Scaffolding | | × | | | × | × | |
| 3P (Play/Problem/Project) | | × | | × | | × | |
| Self-efficacy (Bandura) | × | × | | | | × | × |
| AI Adaptive Algorithm | | × | × | × | | | × |
| Pre/Post Test | × | | × | | | | × |
| Classroom Observation | × | | × | | | × | × |

## 理论依据
KM Process Framework（Marquardt, 2002; Nonaka & Takeuchi, 1995）——知识识别→设计→捕获→呈现→传播→实践→杠杆化，构成完整的组织学习闭环。与EFL六理论的blend体现在：每一个KM阶段都有对应的教学理论驱动其设计决策。

## 否定的方案
- 只做一张简单的"理论↔功能"对照表 → 太平面，不体现KM流程，导师说这是"贴标签"
- 把KM和EFL理论分开讲 → 两张皮，无法回答"如何blend"的核心问题

## 论文怎么写
This study adopts a KM process framework to structure the design and implementation of the AI-assisted cooperative learning app. The six educational theories (Social Constructivism, SLA, CLT, ZPD, 3P, and Self-efficacy) are not applied in isolation, but are systematically blended across the KM process stages — from knowledge identification and model design, through knowledge capture, representation, and dissemination, to knowledge practice and leverage — ensuring that each design decision is theoretically grounded and empirically measurable.
