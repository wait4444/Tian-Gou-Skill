@echo off
chcp 65001 >nul
echo ==========================================
echo   🐕 舔狗Skill 卸载器
echo ==========================================
echo.

if "%~1"=="" (
    echo 用法: uninstall.bat [目标项目路径]
    echo 示例: uninstall.bat D:\我的项目
    pause
    exit /b 1
)

set "TARGET=%~f1"
set "LINK_PATH=%TARGET%\.agents\skills\tian-gou"

if exist "%LINK_PATH%" (
    REM 检查是符号链接还是目录
    fsutil reparsepoint query "%LINK_PATH%" >nul 2>&1
    if not errorlevel 1 (
        rmdir "%LINK_PATH%"
    ) else (
        rmdir /S /Q "%LINK_PATH%"
    )
    echo ✅ 已卸载舔狗skill: %LINK_PATH%
) else (
    echo ℹ️  未发现安装: %LINK_PATH%
)

echo.
