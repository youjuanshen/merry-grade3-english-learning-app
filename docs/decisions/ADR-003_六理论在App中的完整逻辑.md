# ADR-003: 六个理论在App设计中的完整逻辑

## 状态
已采纳（2026-04-11）

## 背景
导师要求"blend"而非"贴标签"——每个理论必须能回答：
1. 这个理论的核心主张是什么？
2. 没有它，App哪里会断掉？
3. App里的具体体现是什么？
4. 论文Ch2怎么引出它？

关键洞察：不是"一道题对应六个理论"，而是"一个设计决策同时被多个理论约束"。

---

## 六个理论完整逻辑

---

### 1. Social Constructivism（Piaget, 1952; Vygotsky, 1978）

**核心主张：** 学习不发生在个人脑袋里，发生在人与人的互动过程中。

**没有它，App哪里断：**
学生可以单独刷题，A/B合作结构没有理由存在。
整个cooperative learning设计失去理论基础。

**App具体体现：**
- A/B角色分工：两人掌握不同信息，必须互动才能完成
- 去掉任何一方，任务无法完成（不是"可以合作"，是"必须合作"）

**论文Ch2引出句：**
Social Constructivism posits that knowledge is co-constructed through social interaction (Vygotsky, 1978). This principle underpins the cooperative A/B structure of the app, where neither student can complete the task independently — collaboration is structurally enforced, not optional.

---

### 2. SLA — Input Hypothesis / i+1（Krashen, 1982）

**核心主张：** 外语习得需要"可理解输入"——比学生当前水平高一点点（i+1），太难或太简单都不习得。

**没有它，App哪里断：**
所有学生做同样难度的题，水平好的无聊，水平差的放弃。
没有理由设计自适应算法。

**App具体体现：**
- 自适应算法：根据答对/错动态调整下一题难度
- 课本定内容范围（教什么），算法定个人难度（对这个学生多难）

**论文Ch2引出句：**
Krashen's (1982) Input Hypothesis argues that language acquisition occurs when learners are exposed to input at a level slightly beyond their current competence (i+1). The app's adaptive algorithm operationalizes this principle by dynamically adjusting task difficulty based on each student's performance, ensuring personalized comprehensible input within the textbook's content scope.

---

### 3. SLA — Interaction Hypothesis（Long, 1981）

**核心主张：** 外语习得需要真实的意义协商（negotiation of meaning）——学生必须因为"听不懂"而开口问，因为"说不清"而反复尝试。

**没有它，App哪里断：**
信息差设计没有理由——A和B可以各自独立完成，不需要开口交流。

**App具体体现：**
- 信息差设计：A只有图片，B只有文字；必须开口交流才能完成
- 大小分类题：B必须说英文单词，A才知道拖哪张图

**论文Ch2引出句：**
Long's (1981) Interaction Hypothesis proposes that negotiation of meaning — the process by which learners work to resolve communication breakdowns — is central to second language acquisition. The app's information-gap tasks structurally require A/B interaction: Student A cannot complete the task without Student B's verbal input, creating authentic communicative need.

---

### 4. SLA — Output Hypothesis（Swain, 1985）

**核心主张：** 光有输入不够，学生必须被迫"产出"语言，才能注意到自己的语言缺口。

**没有它，App哪里断：**
B可以用手势或中文传递信息，不需要说英语。
没有理由要求B必须开口说英文。

**App具体体现：**
- B被迫用英语说出动物单词（说中文A找不到对应图片）
- Speaking站：B必须口头描述，A才能操作

**论文Ch2引出句：**
Swain's (1985) Output Hypothesis argues that producing language — not merely receiving it — is essential for acquisition, as it pushes learners to notice gaps in their linguistic knowledge. In this app, the information-gap design ensures Student B must produce English output: using Chinese would fail to communicate the required information, making English production functionally necessary.

---

### 5. Cognitive Load Theory / CLT（Sweller, 1988）

**核心主张：** 人的工作记忆有限，学习任务不能同时给太多信息，否则认知超载，什么都学不到。

**没有它，App哪里断：**
A/B同时处理所有信息 → 认知超载 → 学不会
没有理由把任务拆成StepA和StepB。

**App具体体现：**
- A只处理图片+分类，B只处理文字+答案：合作分担认知负荷
- 分步呈现（A完成StepA，B的屏幕才激活）
- 图片优先，文字辅助（减少外在认知负荷）

**⚠️ CLT = Cognitive Load Theory（Sweller），不是Communicative Language Teaching**

**论文Ch2引出句：**
Sweller's (1988) Cognitive Load Theory argues that learning is impaired when extraneous cognitive load exceeds working memory capacity. The app's split-task design addresses this by distributing cognitive demands between Student A and Student B: each student processes only half of the task's information load, reducing individual extraneous load while maintaining the overall task's communicative complexity.

---

### 6. ZPD + Scaffolding（Vygotsky, 1978; Wood, Bruner & Ross, 1976）

**核心主张：**
- ZPD（Vygotsky）：每个学生都有一个"独立做不到，但有帮助就能做到"的区间
- Scaffolding（Wood et al.）：在这个区间里提供递进式支持，用完即撤

**两者关系：** ZPD是"为什么要帮"的理论依据，Scaffolding是"怎么帮"的操作方法。没有ZPD，Scaffolding没有理论支撑；没有Scaffolding，ZPD只是一个诊断概念。

**没有它，App哪里断：**
学生答错只显示"Wrong"，不知道怎么改，卡住放弃。
没有理由设计四级支架系统。

**App具体体现：**
- Level 1：同伴协商（先问搭档）
- Level 2：Modified Input（简化题目呈现）
- Level 3：语言线索（给第一个词/关键词）
- Level 4：多模态支架（图片+音频+完整答案）
- 支架不减少选项数量（保护construct validity）

**论文Ch2引出句：**
Drawing on Vygotsky's (1978) Zone of Proximal Development and Wood, Bruner and Ross's (1976) scaffolding framework, the app provides four-level contingent support triggered by student errors. Following the principle of contingency (Wood et al., 1976), scaffolding is proportional to learner need and systematically fades as competence develops — beginning with peer negotiation and progressing to full multimodal support only when necessary.

---

### 7. Self-efficacy（Bandura, 1977）

**核心主张：** 学生相信自己能成功（自我效能感），是持续学习的动力来源。最有效的方式是"掌握体验"——真实完成了有挑战的任务。

**没有它，App哪里断：**
学生答对没有任何反馈，学生答错只有惩罚。
没有理由设计Combo连击、星星、庆祝动画。

**App具体体现：**
- Combo连击：连续答对触发特效，强化掌握感
- 星星评分：完成站点有可见成就
- 合作成功庆祝："你们配合得真好！"——强调的是合作掌握，不是个人竞争

**论文Ch2引出句：**
Bandura's (1977) Self-efficacy Theory proposes that learners' belief in their capability to succeed is a primary driver of motivation and persistence. The app incorporates mastery experiences through a combo reward system and cooperative achievement feedback, designed to build English learning self-efficacy — particularly important for rural Grade 3 students with limited prior exposure to English.

---

## 核心论点（答辩用）

**"Blend"的正确解释不是"一道题贴六个标签"，而是：**

> 每一个设计决策，都同时受到多个理论的约束。
> 移除任何一个理论，App的某个部分就会失去设计依据。
> 这六个理论不是装饰，是设计不能缺少的结构性支撑。

**举例（信息差设计这一个决策）：**
- Social Constructivism → 为什么需要两个人
- SLA Interaction → 为什么必须开口交流
- SLA Output → 为什么必须用英语说
- CLT → 为什么A和B看到的信息不同

四个理论同时约束了"信息差"这一个设计决定。

## 论文怎么写（Ch2总结段）

The six theoretical frameworks adopted in this study are not applied independently as separate lenses, but function as an integrated design system. Social Constructivism provides the philosophical foundation for collaborative learning; SLA theories (Krashen, 1982; Long, 1981; Swain, 1985) specify the linguistic conditions for acquisition; CLT (Sweller, 1988) governs cognitive load management; ZPD and Scaffolding (Vygotsky, 1978; Wood et al., 1976) operationalize adaptive support; and Self-efficacy theory (Bandura, 1977) guides motivational design. Each design decision in the app is simultaneously constrained by multiple theories — removing any single framework would undermine a specific, identifiable feature of the app's design.
