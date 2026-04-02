#!/bin/bash
# ==========================================
#   🐕 舔狗Skill 安装器 (Linux/macOS)
# ==========================================

SKILL_SOURCE="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:-.}"
TARGET="$(cd "$TARGET" 2>/dev/null && pwd)"

if [ -z "$1" ]; then
    echo "==========================================
  🐕 舔狗Skill 安装器
==========================================

用法: ./install.sh [目标项目路径]

示例:
  ./install.sh /home/user/my-project
  ./install.sh .   (安装到当前目录)

功能: 在目标项目中创建 .agents/skills 目录，
      并创建符号链接指向舔狗skill。"
    exit 1
fi

if [ ! -d "$TARGET" ]; then
    echo "❌ 目标目录不存在: $TARGET"
    exit 1
fi

SKILLS_DIR="$TARGET/.agents/skills"
mkdir -p "$SKILLS_DIR"
echo "✅ 确保目录存在: $SKILLS_DIR"

LINK_PATH="$SKILLS_DIR/tian-gou"
if [ -e "$LINK_PATH" ]; then
    echo "ℹ️  链接已存在: $LINK_PATH"
else
    ln -s "$SKILL_SOURCE" "$LINK_PATH"
    echo "✅ 已链接安装到: $LINK_PATH"
fi

echo "
==========================================
  ✅ 安装完成！
==========================================

目录结构:
  $TARGET
  └── .agents
      └── skills
          └── tian-gou -> $SKILL_SOURCE
"
