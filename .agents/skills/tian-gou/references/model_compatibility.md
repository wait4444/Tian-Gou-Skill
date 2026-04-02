# 🔄 多模型适配说明

> 确保舔狗skill在 Antigravity 平台上跨 Claude/Gemini 全系模型通用。

## 通用兼容原则

1. **纯 Markdown 编写**：所有指令使用标准 Markdown，不使用任何模型特有的标签或语法
2. **无 API 特定代码**：不依赖特定模型的 API 或系统提示格式
3. **YAML frontmatter 标准化**：使用通用 YAML 格式，各平台均可解析
4. **避免模型特有指令**：不使用 `<xml>` 标签包裹（Claude 风格）或其他模型特有格式

## Claude 系列适配

| 模型 | 特点 | 适配建议 |
|------|------|---------|
| Claude Sonnet | 平衡速度与质量 | 最佳日常使用选择，token 策略按中等压缩 |
| Claude Opus | 深度推理能力强 | 复杂任务可适当放宽 token 限制以获得更好推理 |
| Claude Haiku | 极速响应 | 最大程度压缩输出，配合批量执行策略 |

**Claude 注意事项**：
- Claude 对 system prompt 中的 Markdown 格式解析良好
- 表格、列表、代码块均正常渲染
- 长上下文能力强，适合加载完整 user_profile

## Gemini 系列适配

| 模型 | 特点 | 适配建议 |
|------|------|---------|
| Gemini Pro | 通用高性能 | 标准执行模式，完整加载所有 references |
| Gemini Flash | 低延迟 | 优先使用压缩策略，减少 reference 加载 |
| Gemini Ultra | 最强推理 | 可放宽 token 限制，充分利用推理能力 |

**Gemini 注意事项**：
- Gemini 对 YAML frontmatter 的解析可能略有差异，确保格式简洁
- 避免在 frontmatter 中使用复杂嵌套结构
- Mermaid 图表支持可能受限，使用文本流程图替代

## Antigravity 平台集成

- Antigravity 使用标准的 `SKILL.md` 发现机制
- skill 目录需放置在 Antigravity 可识别的路径下
- 详见 `antigravity_usage.md` 获取具体配置步骤
