# 🚀 Antigravity 平台使用指南

> 如何在 Antigravity 上安装并激活舔狗skill，支持单项目和跨项目配置。

---

## 方式一：一键安装到任意项目（推荐）

### Windows

```powershell
# 将舔狗skill安装到你的项目中
d:\舔狗skill\-skill\install.bat D:\你的项目路径

# 示例：安装到 D:\my-webapp
d:\舔狗skill\-skill\install.bat D:\my-webapp
```

### Linux / macOS

```bash
./install.sh /path/to/your/project
```

### 安装效果

安装后，目标项目会出现如下结构：

```
你的项目/
├── .agents/
│   └── skills/
│       └── tian-gou/  →  (链接到舔狗skill源目录)
│           ├── SKILL.md
│           └── references/
├── src/
├── package.json
└── ...（你的项目原有文件）
```

### 卸载

```powershell
d:\舔狗skill\-skill\uninstall.bat D:\你的项目路径
```

---

## 方式二：直接添加为工作区

适合只在舔狗skill目录下工作：

1. 打开 Antigravity
2. 进入 **Settings → Workspace**
3. 将 `-skill` 目录添加为工作区
4. Antigravity 自动发现 `SKILL.md` 并激活

---

## 方式三：手动配置（适合自定义结构）

### 步骤 1：在项目中创建 skill 目录

```powershell
mkdir 你的项目\.agents\skills\tian-gou
```

### 步骤 2：复制或链接文件

```powershell
# 方法A：符号链接（推荐，源文件更新时自动同步）
mklink /D 你的项目\.agents\skills\tian-gou d:\舔狗skill\-skill

# 方法B：复制（独立副本，不自动同步）
xcopy /E /I d:\舔狗skill\-skill 你的项目\.agents\skills\tian-gou
```

### 步骤 3：确认目录结构

确保目标路径下的 `SKILL.md` 文件在 `tian-gou/` 根目录中。

---

## 多项目批量安装

如果你有多个项目需要安装：

```powershell
# 批量安装示例
d:\舔狗skill\-skill\install.bat D:\项目A
d:\舔狗skill\-skill\install.bat D:\项目B
d:\舔狗skill\-skill\install.bat D:\项目C
```

使用符号链接方式安装时，所有项目共享同一份 skill 源文件。
更新 skill 时只需更新源目录，所有项目自动生效。

---

## 模型选择

| 平台 | 推荐模型 | 适用场景 |
|------|---------|---------|
| Claude Sonnet | ⭐ 首选 | 日常开发，平衡速度与质量 |
| Claude Opus | 深度推理 | 复杂架构设计、疑难 bug |
| Claude Haiku | 极速 | 简单查询、批量小任务 |
| Gemini Pro | ⭐ 首选 | 日常开发，全面能力 |
| Gemini Flash | 低延迟 | 快速迭代、实时交互 |
| Gemini Ultra | 最强 | 复杂分析、大型重构 |

---

## 初始化用户画像

首次使用时，编辑 `references/user_profile.md` 填入已知偏好：

```markdown
| 项目 | 值 |
|-----|---|
| 常用语言 | 中文 |
| 主力技术栈 | Python, JavaScript |
| 编码风格偏好 | 简洁，少注释 |
```

---

## 验证激活

skill 激活后，AI 应表现出以下特征：
- ✅ 称呼你为"主人"
- ✅ 主动预测并补充需求
- ✅ 输出简洁高效
- ✅ 根据情绪调整语调
- ✅ 附赠实用小彩蛋
- ✅ 主动发现风险并预警

## 常见问题

**Q: 安装后 AI 没有表现出舔狗行为？**
A: 检查：① SKILL.md 是否在 `.agents/skills/tian-gou/` 目录下 ② 文件编码是否 UTF-8 ③ 重新打开 Antigravity 窗口

**Q: 符号链接创建失败？**
A: Windows 需要管理员权限创建符号链接。以管理员身份运行 install.bat，或脚本会自动回退到复制方式。

**Q: 更新 skill 后项目中没变化？**
A: 如果是符号链接安装，更新源文件即可自动生效。如果是复制安装，需要重新运行 install.bat。

**Q: 可以同时使用多个 skill 吗？**
A: 可以。在 `.agents/skills/` 下放入多个 skill 目录即可。

**Q: 如何调整舔狗浓度？**
A: 对话中直接说："不要叫主人"、"正式一些"、"简洁模式" 等。
