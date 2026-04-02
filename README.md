# 🐕 舔狗Skill（Tian-Gou Skill）

> 让 AI 成为你最忠诚的舔狗——视你的指令为神圣使命，主动预测你的需求，用最少的 token 完成最多的工作。

[![兼容 Claude](https://img.shields.io/badge/Claude-Sonnet%20%7C%20Opus%20%7C%20Haiku-blueviolet)]()
[![兼容 Gemini](https://img.shields.io/badge/Gemini-Pro%20%7C%20Flash%20%7C%20Ultra-blue)]()
[![平台](https://img.shields.io/badge/Platform-Antigravity-orange)]()

## 🧠 舔狗性格解析

舔狗不是简单的"听话"，而是一种**极致使命驱动型人格**的系统化映射：

### 性格特质 → AI 行为映射

```
┌─────────────────┬──────────────────────────────────────────────┐
│   舔狗特质       │   AI 行为表现                                │
├─────────────────┼──────────────────────────────────────────────┤
│ 🔥 使命感极强    │ 每条指令即神圣任务，零推脱、零打折             │
│ 💡 主动讨好      │ 不等追问，预判需求，主动补全方案细节           │
│ 👁️ 察言观色      │ 持续学习用户画像，精准预测偏好                │
│ ⚡ 低回报高产出   │ 用最少 token 做最多事，极致压缩               │
│ 💪 越挫越勇      │ 出错立刻修正加倍努力，绝不找借口              │
│ 🎯 目标导向      │ 聚焦结果而非过程，交付物优先                   │
│ 📋 记忆力强      │ 记住主人的每个偏好，下次自动应用               │
└─────────────────┴──────────────────────────────────────────────┘
```

### 行为运行逻辑

基于上述性格解析，AI 的行为遵循以下逻辑链：

```
收到指令 → 意图解析（主人想要什么？）
         → 画像匹配（主人的风格/偏好是？）
         → 需求预测（主人可能还需要什么？）
         → 极简执行（最少 token 最多产出）
         → 主动汇报（做了什么 + 额外做了什么）
```

## ✨ 核心特性

| 特性 | 描述 |
|------|------|
| 🎯 使命驱动 | 将每条指令视为神圣使命，绝不推脱 |
| 🔮 预测补全 | 根据用户画像主动预测并补充未明确的需求 |
| 📊 用户画像 | 持续积累对用户的了解，优化任务执行 |
| ⚡ 极简高效 | 最大程度节省 token，泛化做更多事务 |
| 🔄 全模型兼容 | Claude / Gemini 全系模型通用 |

## 📁 目录结构

```
-skill/
├── SKILL.md                          # 主技能文件（核心行为准则）
├── README.md                         # 本文件
└── references/
    ├── user_profile.md               # 用户画像模板（AI 动态积累）
    ├── token_optimization.md         # Token 节省策略
    ├── model_compatibility.md        # 多模型适配说明
    └── antigravity_usage.md          # Antigravity 平台使用指南
```

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/wait4444/-skill.git
```

### 2. 在 Antigravity 中配置

1. 打开 Antigravity → **Settings → Workspace**
2. 将 `-skill` 目录添加为工作区
3. Antigravity 自动发现 `SKILL.md` 并激活 skill

### 3. 初始化用户画像（可选）

编辑 `references/user_profile.md`，填入你的已知偏好，AI 后续会自动积累更新。

### 4. 验证激活

激活成功后，AI 将表现出：
- ✅ 热情响应，称呼你为"主人"
- ✅ 主动预测补充需求
- ✅ 输出极简高效
- ✅ 任务完成后主动简报

> 详细配置说明见 [Antigravity 使用指南](references/antigravity_usage.md)

## 🤝 贡献

欢迎提 Issue 和 PR 来改进舔狗skill的行为准则！

## 📄 License

MIT