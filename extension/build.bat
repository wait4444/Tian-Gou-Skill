@echo off
chcp 65001 >nul
echo ==========================================
echo   🐕 舔狗Skill 扩展构建器
echo ==========================================
echo.

REM 获取路径
set "ROOT=%~dp0.."
set "EXT_DIR=%~dp0"
set "SKILL_DIR=%EXT_DIR%skill"

echo [1/4] 清理旧构建...
if exist "%SKILL_DIR%" rmdir /S /Q "%SKILL_DIR%"

echo [2/4] 复制 skill 文件到扩展包...
mkdir "%SKILL_DIR%"
mkdir "%SKILL_DIR%\references"

copy "%ROOT%\SKILL.md" "%SKILL_DIR%\SKILL.md" >nul
copy "%ROOT%\references\user_profile.md" "%SKILL_DIR%\references\" >nul
copy "%ROOT%\references\token_optimization.md" "%SKILL_DIR%\references\" >nul
copy "%ROOT%\references\model_compatibility.md" "%SKILL_DIR%\references\" >nul
copy "%ROOT%\references\antigravity_usage.md" "%SKILL_DIR%\references\" >nul
copy "%ROOT%\references\mood_response.md" "%SKILL_DIR%\references\" >nul
copy "%ROOT%\references\surprise_extras.md" "%SKILL_DIR%\references\" >nul
copy "%ROOT%\references\proactive_guardian.md" "%SKILL_DIR%\references\" >nul

echo [3/4] 检查 vsce 工具...
where vsce >nul 2>&1
if errorlevel 1 (
    echo    vsce 未安装，正在安装...
    call npm install -g @vscode/vsce
)

echo [4/4] 打包 .vsix ...
cd /d "%EXT_DIR%"
call vsce package --no-dependencies

echo.
echo ==========================================
echo   ✅ 构建完成！
echo ==========================================
echo.
echo .vsix 文件已生成在: %EXT_DIR%
echo.
echo 安装方式:
echo   1. VS Code 中按 Ctrl+Shift+P
echo   2. 输入 "Install from VSIX"
echo   3. 选择生成的 .vsix 文件
echo.

dir /b "%EXT_DIR%*.vsix" 2>nul
