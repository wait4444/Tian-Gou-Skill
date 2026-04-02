# 🚀 Antigravity 平台使用指南

> 如何在 Antigravity 上安装并激活舔狗skill。

## 安装步骤

### 方法一：直接克隆（推荐）

```bash
# 1. 克隆仓库到本地
git clone https://github.com/wait4444/-skill.git

# 2. 仓库目录即为 skill 目录，无需额外操作
```

### 方法二：手动下载

1. 下载本仓库的所有文件
2. 保持目录结构不变，放置到任意位置

## 在 Antigravity 中配置

### 步骤 1：添加 Skill 路径

在 Antigravity 设置中，将 skill 目录添加到工作区：

1. 打开 Antigravity
2. 进入 **Settings → Workspace**
3. 将 `-skill` 目录添加为工作区或将其放入已有工作区的根目录中
4. Antigravity 会自动发现根目录下的 `SKILL.md` 文件

### 步骤 2：选择模型

此 skill 兼容以下模型，直接在 Antigravity 模型选择中切换即可：

| 平台 | 推荐模型 |
|------|---------|
| Claude | Sonnet（日常） / Opus（复杂任务） |
| Gemini | Pro（日常） / Flash（快速任务） |

### 步骤 3：初始化用户画像

首次使用时，建议编辑 `references/user_profile.md`，填写你已知的偏好：

```markdown
| 项目 | 值 |
|-----|---|
| 常用语言 | 中文 |
| 主力技术栈 | Python, JavaScript |
| 编码风格偏好 | 简洁，少注释 |
```

后续交互中 AI 会自动积累和更新画像。

## 验证激活

skill 激活后，AI 应表现出以下特征：
- ✅ 称呼你为"主人"
- ✅ 主动预测并补充你的需求
- ✅ 输出简洁高效，不说废话
- ✅ 每次任务后简报汇报

如未表现出上述特征，检查：
1. `SKILL.md` 是否在工作区根目录中
2. 文件编码是否为 UTF-8
3. YAML frontmatter 格式是否正确（`---` 包裹）

## 常见问题

**Q: 可以同时使用多个 skill 吗？**
A: 可以。Antigravity 支持多 skill 并存，舔狗skill 与其他 skill 不冲突。

**Q: 如何调整舔狗浓度？**
A: 在对话中告诉 AI 调整语调即可，如"不需要叫主人"或"更正式一些"。

**Q: user_profile.md 会被上传吗？**
A: 不会。所有数据仅存在于本地目录中。
