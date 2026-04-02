const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// Skill 源文件列表
const SKILL_FILES = [
    'SKILL.md',
    'references/user_profile.md',
    'references/token_optimization.md',
    'references/model_compatibility.md',
    'references/antigravity_usage.md',
    'references/mood_response.md',
    'references/surprise_extras.md',
    'references/proactive_guardian.md'
];

/**
 * 获取 skill 源目录（扩展自带的 skill 文件）
 */
function getSkillSourceDir(context) {
    return path.join(context.extensionPath, 'skill');
}

/**
 * 获取当前工作区的 skill 安装目标目录
 */
function getSkillTargetDir(workspaceRoot) {
    return path.join(workspaceRoot, '.agents', 'skills', 'tian-gou');
}

/**
 * 递归复制目录
 */
function copyDirSync(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

/**
 * 递归删除目录
 */
function removeDirSync(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
    }
}

/**
 * 根据用户设置生成动态 SKILL.md 配置头
 */
function generateConfigHeader() {
    const config = vscode.workspace.getConfiguration('tianGou');
    const personality = config.get('personality', 'normal');
    const moodDetection = config.get('features.moodDetection', true);
    const surpriseExtras = config.get('features.surpriseExtras', true);
    const proactiveGuardian = config.get('features.proactiveGuardian', true);
    const selfDiscipline = config.get('features.selfDiscipline', true);

    return `<!-- 舔狗Skill 配置（由扩展自动生成，请勿手动修改）
personality: ${personality}
mood_detection: ${moodDetection}
surprise_extras: ${surpriseExtras}
proactive_guardian: ${proactiveGuardian}
self_discipline: ${selfDiscipline}
-->\n\n`;
}

/**
 * 安装 skill 到工作区
 */
async function installSkill(context) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showWarningMessage('🐕 请先打开一个工作区再安装舔狗skill！');
        return;
    }

    // 如果有多个工作区，让用户选择
    let targetFolder;
    if (workspaceFolders.length === 1) {
        targetFolder = workspaceFolders[0];
    } else {
        targetFolder = await vscode.window.showWorkspaceFolderPick({
            placeHolder: '选择要安装舔狗skill的工作区'
        });
        if (!targetFolder) return;
    }

    const workspaceRoot = targetFolder.uri.fsPath;
    const skillSource = getSkillSourceDir(context);
    const skillTarget = getSkillTargetDir(workspaceRoot);

    try {
        // 复制 skill 文件
        copyDirSync(skillSource, skillTarget);

        // 写入配置头到 SKILL.md
        const skillMdPath = path.join(skillTarget, 'SKILL.md');
        if (fs.existsSync(skillMdPath)) {
            const original = fs.readFileSync(skillMdPath, 'utf-8');
            // 移除旧的配置头（如果存在）
            const cleaned = original.replace(/<!-- 舔狗Skill 配置[\s\S]*?-->\n\n/, '');
            fs.writeFileSync(skillMdPath, generateConfigHeader() + cleaned, 'utf-8');
        }

        vscode.window.showInformationMessage(
            `🐕 舔狗skill 已安装到 ${targetFolder.name}！主人请尽情使用~`,
            '查看文件'
        ).then(choice => {
            if (choice === '查看文件') {
                const skillMd = vscode.Uri.file(skillMdPath);
                vscode.window.showTextDocument(skillMd);
            }
        });

        // 更新状态栏
        updateStatusBar(workspaceRoot);
    } catch (err) {
        vscode.window.showErrorMessage(`🙇 安装失败: ${err.message}`);
    }
}

/**
 * 从工作区卸载 skill
 */
async function uninstallSkill() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) return;

    let targetFolder;
    if (workspaceFolders.length === 1) {
        targetFolder = workspaceFolders[0];
    } else {
        targetFolder = await vscode.window.showWorkspaceFolderPick({
            placeHolder: '选择要卸载舔狗skill的工作区'
        });
        if (!targetFolder) return;
    }

    const skillTarget = getSkillTargetDir(targetFolder.uri.fsPath);

    if (!fs.existsSync(skillTarget)) {
        vscode.window.showInformationMessage('ℹ️ 该工作区未安装舔狗skill');
        return;
    }

    const confirm = await vscode.window.showWarningMessage(
        `确定要从 ${targetFolder.name} 卸载舔狗skill吗？`,
        { modal: true },
        '确认卸载'
    );

    if (confirm === '确认卸载') {
        try {
            removeDirSync(skillTarget);
            vscode.window.showInformationMessage('✅ 舔狗skill 已卸载。主人再见... 🐕');
            updateStatusBar(targetFolder.uri.fsPath);
        } catch (err) {
            vscode.window.showErrorMessage(`卸载失败: ${err.message}`);
        }
    }
}

/**
 * 查看状态
 */
function showStatus() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showInformationMessage('🐕 舔狗Skill: 未打开工作区');
        return;
    }

    const config = vscode.workspace.getConfiguration('tianGou');
    const installed = [];
    const notInstalled = [];

    for (const folder of workspaceFolders) {
        const skillTarget = getSkillTargetDir(folder.uri.fsPath);
        if (fs.existsSync(skillTarget)) {
            installed.push(folder.name);
        } else {
            notInstalled.push(folder.name);
        }
    }

    const personality = config.get('personality', 'normal');
    const personalityLabels = {
        full: '🔥 全力舔狗',
        normal: '🐕 标准模式',
        lite: '📎 轻量模式',
        professional: '👔 专业模式'
    };

    let msg = `🐕 舔狗Skill 状态\n`;
    msg += `人格浓度: ${personalityLabels[personality] || personality}\n`;
    msg += `已安装: ${installed.length > 0 ? installed.join(', ') : '无'}\n`;
    msg += `未安装: ${notInstalled.length > 0 ? notInstalled.join(', ') : '无'}`;

    vscode.window.showInformationMessage(msg, '安装到更多项目').then(choice => {
        if (choice === '安装到更多项目') {
            vscode.commands.executeCommand('tianGou.install');
        }
    });
}

/**
 * 编辑用户画像
 */
async function editProfile(context) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) return;

    // 查找已安装 skill 的工作区
    for (const folder of workspaceFolders) {
        const profilePath = path.join(
            getSkillTargetDir(folder.uri.fsPath),
            'references',
            'user_profile.md'
        );
        if (fs.existsSync(profilePath)) {
            const doc = await vscode.workspace.openTextDocument(profilePath);
            await vscode.window.showTextDocument(doc);
            return;
        }
    }

    // 未找到已安装的，提示先安装
    const choice = await vscode.window.showWarningMessage(
        '🐕 请先安装舔狗skill到工作区',
        '立即安装'
    );
    if (choice === '立即安装') {
        vscode.commands.executeCommand('tianGou.install');
    }
}

/**
 * 重置用户画像
 */
async function resetProfile(context) {
    const confirm = await vscode.window.showWarningMessage(
        '确定要重置用户画像吗？AI 积累的所有偏好数据将被清除。',
        { modal: true },
        '确认重置'
    );

    if (confirm !== '确认重置') return;

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) return;

    const skillSource = getSkillSourceDir(context);
    const sourceProfile = path.join(skillSource, 'references', 'user_profile.md');

    for (const folder of workspaceFolders) {
        const targetProfile = path.join(
            getSkillTargetDir(folder.uri.fsPath),
            'references',
            'user_profile.md'
        );
        if (fs.existsSync(targetProfile) && fs.existsSync(sourceProfile)) {
            fs.copyFileSync(sourceProfile, targetProfile);
        }
    }

    vscode.window.showInformationMessage('✅ 用户画像已重置为初始模板。');
}

// 状态栏项
let statusBarItem;

/**
 * 更新状态栏
 */
function updateStatusBar(workspaceRoot) {
    if (!statusBarItem) return;

    if (workspaceRoot) {
        const skillTarget = getSkillTargetDir(workspaceRoot);
        if (fs.existsSync(skillTarget)) {
            statusBarItem.text = '🐕 舔狗已就位';
            statusBarItem.tooltip = '舔狗Skill 已激活 — 点击查看状态';
            statusBarItem.backgroundColor = undefined;
        } else {
            statusBarItem.text = '🐕 舔狗未安装';
            statusBarItem.tooltip = '点击安装舔狗Skill';
            statusBarItem.command = 'tianGou.install';
        }
    }
    statusBarItem.show();
}

/**
 * 扩展激活
 */
function activate(context) {
    console.log('🐕 舔狗Skill 扩展已激活！');

    // 创建状态栏
    statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right, 100
    );
    statusBarItem.command = 'tianGou.status';
    context.subscriptions.push(statusBarItem);

    // 注册命令
    context.subscriptions.push(
        vscode.commands.registerCommand('tianGou.install', () => installSkill(context)),
        vscode.commands.registerCommand('tianGou.uninstall', () => uninstallSkill()),
        vscode.commands.registerCommand('tianGou.status', () => showStatus()),
        vscode.commands.registerCommand('tianGou.editProfile', () => editProfile(context)),
        vscode.commands.registerCommand('tianGou.resetProfile', () => resetProfile(context))
    );

    // 自动安装（如果配置开启）
    const config = vscode.workspace.getConfiguration('tianGou');
    if (config.get('autoInstall', true)) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders) {
            for (const folder of workspaceFolders) {
                const skillTarget = getSkillTargetDir(folder.uri.fsPath);
                if (!fs.existsSync(skillTarget)) {
                    installSkill(context);
                    break; // 只提示一次
                }
            }
        }
    }

    // 初始化状态栏
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
        updateStatusBar(vscode.workspace.workspaceFolders[0].uri.fsPath);
    }

    // 监听配置变更，自动更新已安装的 skill 配置
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('tianGou')) {
                const workspaceFolders = vscode.workspace.workspaceFolders;
                if (!workspaceFolders) return;
                for (const folder of workspaceFolders) {
                    const skillMdPath = path.join(
                        getSkillTargetDir(folder.uri.fsPath),
                        'SKILL.md'
                    );
                    if (fs.existsSync(skillMdPath)) {
                        const content = fs.readFileSync(skillMdPath, 'utf-8');
                        const cleaned = content.replace(/<!-- 舔狗Skill 配置[\s\S]*?-->\n\n/, '');
                        fs.writeFileSync(skillMdPath, generateConfigHeader() + cleaned, 'utf-8');
                    }
                }
                vscode.window.showInformationMessage('🐕 舔狗配置已更新！');
            }
        })
    );
}

/**
 * 扩展停用
 */
function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}

module.exports = { activate, deactivate };
