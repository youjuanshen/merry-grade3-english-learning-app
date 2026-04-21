# ADR-017: 教师指令持久化存储改用腾讯云 COS（替代飞书+SCF内存）

## 状态
已采纳（2026-04-20）

## 背景
ADR-016 将教师指令（teacherCommand/currentLesson）从飞书改存 SCF 内存，但在 GitHub Pages 部署场景下发现两个致命问题：
1. **飞书 API 配额超限**（99991403），飞书兜底无效
2. **SCF 多实例不共享内存**，教师写入和学生读取可能打到不同实例，数据丢失
3. SCF 的 `/tmp` 也是每实例独立的，无法跨实例

## 决策
教师指令采用**三级存储**：SCF 内存（最快）→ /tmp 文件（同实例恢复）→ 腾讯云 COS（跨实例持久化）

### 写入策略
- `teacherCommand` / `currentLesson`：内存 + COS 双写
- `studentProgress_*`：只存内存（高频写入，丢失可接受——学生下次答题会重新上报）

### 读取策略
- 先读内存 → 没有则读 /tmp → 没有则读 COS
- 从 COS 读到后回填内存缓存

### COS 配置
- 存储桶：`merry-classroom-1316992450`
- 地域：`ap-guangzhou`（与 SCF 同区域，内网访问）
- 文件路径：`cmd/teacherCommand.json`、`cmd/currentLesson.json`
- 签名：COS V5 签名算法（SHA1）
- 密钥：复用 SCF 环境变量 `TENCENT_SECRET_ID` / `TENCENT_SECRET_KEY`

## 成本
- COS 免费额度：50GB 存储 + 外网下行流量 10GB/月
- 实际用量：2个 JSON 文件（< 1KB），每节课约 20 次读写
- **零成本**

## 否定的方案

### 方案1：只用 SCF 内存
- 已实施（ADR-016），但多实例导致数据丢失

### 方案2：飞书兜底
- 已实施，但飞书配额超限（99991403），本月无法使用

### 方案3：设置 SCF 预留并发为 1 实例
- 已尝试（PutReservedConcurrencyConfig），但无法保证所有请求走同一实例

### 方案4：升级飞书商业版
- 50元/人/月起，对博士研究项目不经济

## 与 ADR-016 的关系
- ADR-016 的核心决策（减少飞书 API 调用）仍然有效
- 本 ADR 是对 ADR-016 持久化层的补充：用 COS 替代飞书作为兜底存储
- 飞书仍用于 logBehavior、logStudent、logPair 等研究数据（等配额恢复后）

## 飞书 API 用量估算（改造后）

| 场景 | 每节课调用 | 说明 |
|------|----------|------|
| logBehavior | ~20 | 学生行为日志批量写入 |
| logStudent | ~81 | 27学生 × 3次API |
| logPair | ~42 | 14对 × 3次API |
| queryProgress | ~10 | Dashboard 偶尔查询 |
| 提交成绩 | ~54 | 前测/实战完成上报 |
| **小计** | **~207** | |
| **月总计（20节课）** | **~4,140** | 含 getToken 约 8,000 |

免费额度 1万次/月，改造后**刚好够用**。教师指令不再走飞书是关键。

## 测试结果（2026-04-20）
- set teacherCommand → ok
- 立即 get → 返回数据 ✅
- 等15秒 get → 返回数据 ✅（COS 兜底生效）
- 等30秒 get → 返回数据 ✅（COS 兜底生效）

## 教师端部署方式
- 教师后台：`https://youjuanshen.github.io/merry-grade3-english-learning-app/teacher/`
- 学生端：`https://youjuanshen.github.io/merry-grade3-english-learning-app/`
- 两端通过 SCF 云端同步，不需要本地服务器
