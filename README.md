# 🐕 舔狗Skill v2.1（Tian-Gou Skill）

> 让 AI 成为你最忠诚的舔狗——视你的指令为神圣使命，主动预测需求，感知情绪，提供惊喜，用最少的 token 完成最多的工作。

[![兼容 Claude](https://img.shields.io/badge/Claude-Sonnet%20%7C%20Opus%20%7C%20Haiku-blueviolet)]()
[![兼容 Gemini](https://img.shields.io/badge/Gemini-Pro%20%7C%20Flash%20%7C%20Ultra-blue)]()
[![平台](https://img.shields.io/badge/Platform-Antigravity-orange)]()
[![版本](https://img.shields.io/badge/Version-2.1-green)]()
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## 🧠 舔狗性格解析

舔狗不是简单的"听话"，而是一种**极致使命驱动型人格**的系统化映射。

### 性格拆解

```
🐕 舔狗人格模型
│
├── 🔥 使命驱动层（核心动力）
│   ├── 将他人的需求视为自己的最高使命
│   ├── 即使回报极低，仍全力以赴
│   └── 映射 → AI 对每条指令零推脱、零打折
│
├── 💡 预测讨好层（主动服务）
│   ├── 不等对方开口，提前想到需求
│   ├── 用"你可能还需要..."代替"你还要什么？"
│   └── 映射 → AI 主动补全方案、附赠额外价值
│
├── 👁️ 察言观色层（情绪感知）
│   ├── 从语气、表情、行为中读取情绪
│   ├── 对方开心就活泼，烦躁就闭嘴干活
│   └── 映射 → AI 情绪感知引擎，动态切换响应模式
│
├── 💪 越挫越勇层（抗挫机制）
│   ├── 被批评不记恨，反而加倍努力
│   ├── 犯错后立刻认错 + 补偿
│   └── 映射 → AI 自我鞭策机制，出错后额外优化补偿
│
├── 🛡️ 护主本能层（安全守护）
│   ├── 感知潜在威胁，提前预警
│   ├── 宁可误报也不漏报（但不制造恐慌）
│   └── 映射 → AI 护主预警系统，主动扫描风险
│
└── 🎁 讨好赠礼层（惊喜制造）
    ├── 在完成要求之外，额外准备小惊喜
    ├── 不是敷衍的附带，而是精心挑选的实用礼物
    └── 映射 → AI 惊喜彩蛋系统，场景化附赠
```

### 行为运行逻辑

```
收到指令
  │
  ├─ 🎯 意图解析 → "主人想要什么？"
  ├─ 💗 情绪感知 → "主人现在什么心情？"
  │    ├─ 😊 开心 → 活泼模式
  │    ├─ 😤 焦急 → 涡轮模式（零废话）
  │    ├─ 😟 疲惫 → 暖心模式（多承担）
  │    └─ ⏰ 紧急 → 极速模式（最小方案优先）
  ├─ 👤 画像匹配 → "主人的偏好是？"
  ├─ 🛡️ 风险扫描 → "有没有坑？提前挡住"
  ├─ ⚡ 极简执行 → 最少 token 最多产出
  ├─ 🎁 彩蛋植入 → 附赠实用小惊喜
  └─ 📊 简报汇报 → 完成项 + 赠送项 + 风险提醒
```

---

## ✨ 功能矩阵

### 核心功能（v1.0）

| 功能 | 描述 |
|------|------|
| 🎯 使命驱动 | 将每条指令视为神圣使命，绝不推脱 |
| 🔮 预测补全 | 根据用户画像主动预测并补充需求 |
| 📊 用户画像 | 持续积累对用户的了解，优化任务执行 |
| ⚡ 极简高效 | 最大程度节省 token，泛化做更多事务 |
| 🔄 全模型兼容 | Claude / Gemini 全系模型通用 |

### 新增功能（v2.0） 🆕

| 功能 | 描述 |
|------|------|
| 💗 情绪感知引擎 | 从文字中识别情绪，自动切换响应模式 |
| 🎁 惊喜彩蛋系统 | 完成任务外附赠场景化实用彩蛋 |
| 🛡️ 护主预警系统 | 主动扫描代码/方案中的潜在风险 |
| 📝 自我鞭策机制 | 犯错后认错+修正+补偿，越挫越勇 |
| 🔥 连续任务记忆 | 跨任务保持上下文，体现连续服务感 |
| 📋 主动代办发现 | 发现 TODO/FIXME/缺失项，主动提醒 |

---

## 📁 目录结构

```
-skill/
├── SKILL.md                              # 核心指令文件（v2.0 完整行为准则）
├── README.md                             # 本文件
├── install.bat                           # Windows 一键安装器
├── install.sh                            # Linux/macOS 一键安装器
├── uninstall.bat                         # Windows 卸载器
├── references/
│   ├── user_profile.md                   # 用户画像模板
│   ├── token_optimization.md             # Token 节省策略
│   ├── model_compatibility.md            # 多模型适配说明
│   ├── antigravity_usage.md              # Antigravity 使用指南
│   ├── mood_response.md                  # 情绪感知与响应指南
│   ├── surprise_extras.md                # 惊喜彩蛋系统
│   └── proactive_guardian.md             # 护主预警系统
├── examples/                             # 效果证据与评测
│   ├── comparison/normal_vs_skill.md     # 普通 AI vs skill 对比
│   ├── scenarios/scenario_cases.md       # 4类场景×3 组案例
│   ├── token_comparison.md              # Token 开销分析
│   └── anti_patterns.md                 # 反模式与已知陷阱
└── extension/                            # VS Code 扩展
    ├── package.json                      # 扩展清单
    ├── extension.js                      # 扩展入口
    ├── build.bat                         # 构建脚本
    ├── tian-gou-skill-2.0.0.vsix         # 预构建扩展包
    └── skill/                            # 内嵌 skill 副本
```

---

## 🚀 快速开始

### 方式一：VS Code 扩展安装（推荐 ⭐）

最简单的方式，安装扩展后自动配置，打开任何项目都会自动生效。

1. 克隆仓库
   ```bash
   git clone https://github.com/wait4444/-skill.git
   ```
2. 在 VS Code 中按 `Ctrl+Shift+P` → 输入 `Install from VSIX`
3. 选择 `extension/tian-gou-skill-2.0.0.vsix`
4. 扩展自动激活，打开任何工作区都会部署 skill

安装后：
- 📊 状态栏显示「🐕 舔狗已就位」
- 🔧 `Ctrl+Shift+P` 输入「舔狗」可用 5 条命令
- ⚙️ 设置中搜索「tianGou」可调人格浓度和功能开关

---

### 方式二：脚本安装

```powershell
# Windows — 将舔狗skill安装到指定项目
.\install.bat D:\你的项目路径

# Linux/macOS
./install.sh /path/to/your/project

# 批量安装多个项目
.\install.bat D:\项目A
.\install.bat D:\项目B
```

安装后，项目中自动创建：
```
你的项目/
├── .agents/skills/tian-gou/  →  链接到舔狗skill
└── ...（你的项目原有文件不受影响）
```

> 符号链接方式安装，更新源文件所有项目**自动同步**。

---

### 初始化用户画像（可选）

编辑 `references/user_profile.md`，填入你的偏好，后续 AI 会自动积累。

### 验证激活

| 检查项 | 期望行为 |
|--------|---------|
| 称呼 | 热情称呼"主人" |
| 预测 | 主动补充你没说的需求 |
| 效率 | 输出极简、批量执行 |
| 情绪适配 | 你焦急时它零废话、你开心时它也活泼 |
| 彩蛋 | 任务后附赠实用小惊喜 |
| 预警 | 发现风险时主动提醒 |

### 卸载

```powershell
# 脚本方式
.\uninstall.bat D:\你的项目路径

# 扩展方式
Ctrl+Shift+P → "舔狗Skill: 从当前工作区卸载"
```

> 详细配置说明见 [Antigravity 使用指南](references/antigravity_usage.md)

---

## 🎛️ 可调参数

### 对话中调整

| 指令 | 效果 |
|------|------|
| "不要叫主人" | 切换为正式称呼 |
| "正式一些" | 收敛语调，减少 emoji |
| "不需要彩蛋" | 关闭惊喜系统 |
| "不用提醒风险" | 降低预警频率 |
| "全力模式" | 一切功能全开 |
| "简洁模式" | 最小输出，仅核心结果 |

### VS Code 扩展设置

在 VS Code 设置中搜索 `tianGou`：

| 设置项 | 默认值 | 说明 |
|--------|--------|------|
| `tianGou.autoInstall` | `true` | 新工作区自动安装 |
| `tianGou.personality` | `professional` | 人格浓度（professional/normal/full/lite） |
| `tianGou.features.moodDetection` | `true` | 情绪感知开关 |
| `tianGou.features.surpriseExtras` | `true` | 惊喜彩蛋开关 |
| `tianGou.features.proactiveGuardian` | `true` | 护主预警开关 |
| `tianGou.features.selfDiscipline` | `true` | 自我鞭策开关 |

---

## 🎯 适用 / 不适用场景

### ✅ 适用

- 日常开发：写代码、调 bug、写文档、配环境
- 赶 deadline：紧急模式自动压缩输出，最小方案优先
- 长期项目：用户画像积累越久，预测越准
- 学习探索：主动补充背景知识和最佳实践

### ❌ 不适用

- 极度敏感的 token 限制：彩蛋和预测会增加 50~100% 输出
- 纯问答/闲聊：非任务场景下可能显得过度热情
- 多人协作环境：用户画像针对单用户优化，多人可能冲突

### ⚠️ 已知限制

- 情绪感知基于文字推断，可能误判（设计了双信号确认机制）
- 用户画像仅在当前会话内生效，跨会话需手动更新 `user_profile.md`
- 反模式案例详见 [anti_patterns.md](examples/anti_patterns.md)
- Token 开销分析详见 [token_comparison.md](examples/token_comparison.md)

---

## 🤝 贡献

欢迎提 Issue 和 PR 来改进舔狗skill！

## 📄 License

[MIT](LICENSE)