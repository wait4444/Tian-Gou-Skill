@echo off
chcp 65001 >nul
echo ==========================================
echo   🐕 舔狗Skill 安装器
echo ==========================================
echo.

REM 获取当前脚本所在目录（即skill源目录）
set "SKILL_SOURCE=%~dp0"
set "SKILL_SOURCE=%SKILL_SOURCE:~0,-1%"

REM 检查参数
if "%~1"=="" (
    echo 用法: install.bat [目标项目路径]
    echo.
    echo 示例:
    echo   install.bat D:\我的项目
    echo   install.bat .   （安装到当前目录）
    echo.
    echo 功能: 在目标项目中创建 .agents\skills 目录，
    echo       并创建符号链接指向舔狗skill。
    echo       这样在该项目中使用 Antigravity 时，
    echo       AI 就会自动加载舔狗行为准则。
    echo.
    pause
    exit /b 1
)

set "TARGET=%~f1"

REM 检查目标目录存在
if not exist "%TARGET%" (
    echo ❌ 目标目录不存在: %TARGET%
    exit /b 1
)

REM 创建 .agents\skills 目录
set "SKILLS_DIR=%TARGET%\.agents\skills"
if not exist "%SKILLS_DIR%" (
    mkdir "%SKILLS_DIR%"
    echo ✅ 创建目录: %SKILLS_DIR%
) else (
    echo ℹ️  目录已存在: %SKILLS_DIR%
)

REM 创建符号链接
set "LINK_PATH=%SKILLS_DIR%\tian-gou"
if exist "%LINK_PATH%" (
    echo ℹ️  链接已存在: %LINK_PATH%
    echo    如需更新，请先删除后重新安装。
) else (
    mklink /D "%LINK_PATH%" "%SKILL_SOURCE%" >nul 2>&1
    if errorlevel 1 (
        echo ⚠️  创建符号链接失败（可能需要管理员权限）
        echo    尝试复制文件方式安装...
        xcopy /E /I /Y "%SKILL_SOURCE%" "%LINK_PATH%" >nul
        echo ✅ 已复制安装到: %LINK_PATH%
    ) else (
        echo ✅ 已链接安装到: %LINK_PATH%
    )
)

echo.
echo ==========================================
echo   ✅ 安装完成！
echo ==========================================
echo.
echo 现在在 %TARGET% 中使用 Antigravity 时，
echo AI 会自动加载舔狗skill。
echo.
echo 目录结构:
echo   %TARGET%
echo   └── .agents
echo       └── skills
echo           └── tian-gou -^> %SKILL_SOURCE%
echo.
