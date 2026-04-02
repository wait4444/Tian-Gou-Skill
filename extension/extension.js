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

// ============================================================
// 工具函数
// ============================================================

function getSkillSourceDir(context) {
    return path.join(context.extensionPath, 'skill');
}

function getSkillTargetDir(workspaceRoot) {
    return path.join(workspaceRoot, '.agents', 'skills', 'tian-gou');
}

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

function removeDirSync(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
    }
}

/**
 * 获取将写入的文件列表及大小
 */
function getFileManifest(sourceDir, prefix = '') {
    const manifest = [];
    if (!fs.existsSync(sourceDir)) return manifest;
    const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(sourceDir, entry.name);
        const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
            manifest.push(...getFileManifest(fullPath, relPath));
        } else {
            const stat = fs.statSync(fullPath);
            manifest.push({
                path: relPath,
                size: stat.size,
                sizeStr: stat.size > 1024
                    ? `${(stat.size / 1024).toFixed(1)} KB`
                    : `${stat.size} B`
            });
        }
    }
    return manifest;
}

/**
 * 根据用户设置生成动态配置头
 */
function generateConfigHeader() {
    const config = vscode.workspace.getConfiguration('tianGou');
    const personality = config.get('personality', 'professional');
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
 * 写入配置到已安装的 SKILL.md
 */
function writeConfigToSkillMd(skillTarget) {
    const skillMdPath = path.join(skillTarget, 'SKILL.md');
    if (fs.existsSync(skillMdPath)) {
        const original = fs.readFileSync(skillMdPath, 'utf-8');
        const cleaned = original.replace(/<!-- 舔狗Skill 配置[\s\S]*?-->\n\n/, '');
        fs.writeFileSync(skillMdPath, generateConfigHeader() + cleaned, 'utf-8');
    }
}

// ============================================================
// 命令：安装（含预览弹窗）
// ============================================================

async function installSkill(context) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showWarningMessage('🐕 请先打开一个工作区再安装舔狗skill！');
        return;
    }

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

    // P3: 安装前弹窗显示将写入的文件列表
    const manifest = getFileManifest(skillSource);
    const totalSize = manifest.reduce((sum, f) => sum + f.size, 0);
    const totalSizeStr = totalSize > 1024
        ? `${(totalSize / 1024).toFixed(1)} KB`
        : `${totalSize} B`;

    const fileList = manifest.map(f => `  ${f.path} (${f.sizeStr})`).join('\n');
    const targetRelPath = path.relative(workspaceRoot, skillTarget);

    const confirm = await vscode.window.showInformationMessage(
        `🐕 将安装舔狗skill到 ${targetFolder.name}\n\n` +
        `目标: ${targetRelPath}/\n` +
        `文件数: ${manifest.length}\n` +
        `总大小: ${totalSizeStr}`,
        { modal: true, detail: `将写入以下文件:\n\n${fileList}` },
        '确认安装',
        '预览 Diff'
    );

    if (confirm === '预览 Diff') {
        await previewDiff(context, targetFolder);
        return;
    }
    if (confirm !== '确认安装') return;

    try {
        copyDirSync(skillSource, skillTarget);
        writeConfigToSkillMd(skillTarget);

        // 记录安装时间
        const metaPath = path.join(skillTarget, '.meta.json');
        fs.writeFileSync(metaPath, JSON.stringify({
            installed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            source: context.extensionPath,
            version: context.extension?.packageJSON?.version || '2.0.0'
        }, null, 2), 'utf-8');

        vscode.window.showInformationMessage(
            `🐕 舔狗skill 已安装到 ${targetFolder.name}！主人请尽情使用~`,
            '查看 SKILL.md', '编辑用户画像'
        ).then(choice => {
            if (choice === '查看 SKILL.md') {
                const uri = vscode.Uri.file(path.join(skillTarget, 'SKILL.md'));
                vscode.window.showTextDocument(uri);
            } else if (choice === '编辑用户画像') {
                const uri = vscode.Uri.file(path.join(skillTarget, 'references', 'user_profile.md'));
                vscode.window.showTextDocument(uri);
            }
        });

        updateStatusBar(workspaceRoot);
    } catch (err) {
        vscode.window.showErrorMessage(`🙇 安装失败: ${err.message}`);
    }
}

// ============================================================
// 命令：预览 Diff
// ============================================================

async function previewDiff(context, targetFolder) {
    if (!targetFolder) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) return;
        targetFolder = workspaceFolders[0];
    }

    const skillSource = getSkillSourceDir(context);
    const skillTarget = getSkillTargetDir(targetFolder.uri.fsPath);

    // 选择要预览的文件
    const manifest = getFileManifest(skillSource);
    const items = manifest.map(f => ({
        label: f.path,
        description: f.sizeStr,
        detail: fs.existsSync(path.join(skillTarget, f.path)) ? '📝 将更新' : '🆕 新文件'
    }));

    const selected = await vscode.window.showQuickPick(items, {
        placeHolder: '选择文件预览 diff',
        canPickMany: false
    });

    if (!selected) return;

    const srcUri = vscode.Uri.file(path.join(skillSource, selected.label));
    const targetPath = path.join(skillTarget, selected.label);

    if (fs.existsSync(targetPath)) {
        // 已存在的文件：显示 diff
        const targetUri = vscode.Uri.file(targetPath);
        await vscode.commands.executeCommand('vscode.diff',
            targetUri, srcUri,
            `${selected.label}: 当前 ↔ 新版本`
        );
    } else {
        // 新文件：直接显示
        await vscode.window.showTextDocument(srcUri, { preview: true });
    }
}

// ============================================================
// 命令：卸载
// ============================================================

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

    const manifest = getFileManifest(skillTarget);
    const confirm = await vscode.window.showWarningMessage(
        `确定要从 ${targetFolder.name} 卸载舔狗skill吗？\n将删除 ${manifest.length} 个文件。`,
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

// ============================================================
// 命令：状态页（P3 增强版）
// ============================================================

async function showStatus() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showInformationMessage('🐕 舔狗Skill: 未打开工作区');
        return;
    }

    const config = vscode.workspace.getConfiguration('tianGou');
    const personality = config.get('personality', 'professional');
    const personalityLabels = {
        full: '🔥 全力舔狗',
        normal: '🐕 标准模式',
        lite: '📎 轻量模式',
        professional: '👔 专业模式'
    };

    // 收集各工作区状态
    const statusLines = [];
    for (const folder of workspaceFolders) {
        const skillTarget = getSkillTargetDir(folder.uri.fsPath);
        if (fs.existsSync(skillTarget)) {
            const metaPath = path.join(skillTarget, '.meta.json');
            let metaInfo = '';
            if (fs.existsSync(metaPath)) {
                try {
                    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
                    const installed = new Date(meta.installed_at).toLocaleDateString('zh-CN');
                    const updated = new Date(meta.updated_at).toLocaleDateString('zh-CN');
                    metaInfo = ` (安装: ${installed}, 更新: ${updated})`;
                } catch { /* ignore */ }
            }
            const profilePath = path.join(skillTarget, 'references', 'user_profile.md');
            const profileExists = fs.existsSync(profilePath);
            statusLines.push(`✅ ${folder.name}${metaInfo}`);
            statusLines.push(`   画像: ${profileExists ? profilePath : '未找到'}`);
        } else {
            statusLines.push(`❌ ${folder.name} — 未安装`);
        }
    }

    // 功能开关状态
    const features = [
        ['情绪感知', config.get('features.moodDetection', true)],
        ['惊喜彩蛋', config.get('features.surpriseExtras', true)],
        ['护主预警', config.get('features.proactiveGuardian', true)],
        ['自我鞭策', config.get('features.selfDiscipline', true)]
    ];
    const featureStr = features.map(([name, on]) => `${on ? '✅' : '❌'} ${name}`).join('  ');

    const panel = vscode.window.createWebviewPanel(
        'tianGouStatus', '🐕 舔狗Skill 状态', vscode.ViewColumn.One, {}
    );

    panel.webview.html = `<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 20px; color: var(--vscode-foreground); background: var(--vscode-editor-background); }
        h1 { border-bottom: 2px solid var(--vscode-focusBorder); padding-bottom: 10px; }
        .card { background: var(--vscode-editorWidget-background); border-radius: 8px; padding: 16px; margin: 12px 0; border: 1px solid var(--vscode-widget-border); }
        .card h3 { margin-top: 0; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin: 2px; }
        .on { background: #2ea04370; color: #2ea043; }
        .off { background: #f8514970; color: #f85149; }
        .mode { background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); padding: 4px 12px; border-radius: 12px; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; }
        td, th { padding: 8px 12px; text-align: left; border-bottom: 1px solid var(--vscode-widget-border); }
    </style>
</head>
<body>
    <h1>🐕 舔狗Skill 状态面板</h1>
    
    <div class="card">
        <h3>🎭 人格模式</h3>
        <span class="mode">${personalityLabels[personality] || personality}</span>
    </div>

    <div class="card">
        <h3>🔧 功能开关</h3>
        ${features.map(([name, on]) =>
            `<span class="badge ${on ? 'on' : 'off'}">${on ? '✅' : '❌'} ${name}</span>`
        ).join(' ')}
    </div>

    <div class="card">
        <h3>📂 工作区安装状态</h3>
        <table>
            <tr><th>工作区</th><th>状态</th><th>详情</th></tr>
            ${workspaceFolders.map(folder => {
                const skillTarget = getSkillTargetDir(folder.uri.fsPath);
                const installed = fs.existsSync(skillTarget);
                let detail = '';
                if (installed) {
                    const metaPath = path.join(skillTarget, '.meta.json');
                    if (fs.existsSync(metaPath)) {
                        try {
                            const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
                            detail = `安装于 ${new Date(meta.installed_at).toLocaleDateString('zh-CN')}`;
                        } catch { detail = '已安装'; }
                    } else { detail = '已安装'; }
                }
                return `<tr><td>${folder.name}</td><td>${installed ? '✅ 已安装' : '❌ 未安装'}</td><td>${detail}</td></tr>`;
            }).join('')}
        </table>
    </div>
</body>
</html>`;
}

// ============================================================
// 命令：切换人格模式（P3: 自动修改配置文件）
// ============================================================

async function switchPersonality() {
    const modes = [
        { label: '👔 专业模式', description: '默认。正式语调，保留预测和预警', value: 'professional' },
        { label: '🐕 标准模式', description: '热情但不过度，适度 emoji', value: 'normal' },
        { label: '🔥 全力舔狗', description: '所有功能全开，emoji 最多', value: 'full' },
        { label: '📎 轻量模式', description: '减少 emoji 和彩蛋', value: 'lite' }
    ];

    const selected = await vscode.window.showQuickPick(modes, {
        placeHolder: '选择人格模式'
    });

    if (!selected) return;

    // 写入 VS Code 设置
    const config = vscode.workspace.getConfiguration('tianGou');
    await config.update('personality', selected.value, vscode.ConfigurationTarget.Global);

    // 同步更新所有已安装的 SKILL.md 配置头
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        for (const folder of workspaceFolders) {
            const skillTarget = getSkillTargetDir(folder.uri.fsPath);
            writeConfigToSkillMd(skillTarget);

            // 更新 meta
            const metaPath = path.join(skillTarget, '.meta.json');
            if (fs.existsSync(metaPath)) {
                try {
                    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
                    meta.updated_at = new Date().toISOString();
                    meta.personality = selected.value;
                    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf-8');
                } catch { /* ignore */ }
            }
        }
    }

    vscode.window.showInformationMessage(`🐕 已切换到 ${selected.label}`);
}

// ============================================================
// 命令：编辑/重置用户画像
// ============================================================

async function editProfile(context) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) return;

    for (const folder of workspaceFolders) {
        const profilePath = path.join(getSkillTargetDir(folder.uri.fsPath), 'references', 'user_profile.md');
        if (fs.existsSync(profilePath)) {
            const doc = await vscode.workspace.openTextDocument(profilePath);
            await vscode.window.showTextDocument(doc);
            return;
        }
    }

    const choice = await vscode.window.showWarningMessage('🐕 请先安装舔狗skill', '立即安装');
    if (choice === '立即安装') vscode.commands.executeCommand('tianGou.install');
}

async function resetProfile(context) {
    const confirm = await vscode.window.showWarningMessage(
        '确定要重置用户画像吗？AI 积累的所有偏好数据将被清除。',
        { modal: true }, '确认重置'
    );
    if (confirm !== '确认重置') return;

    const sourceProfile = path.join(getSkillSourceDir(context), 'references', 'user_profile.md');
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) return;

    let count = 0;
    for (const folder of workspaceFolders) {
        const targetProfile = path.join(getSkillTargetDir(folder.uri.fsPath), 'references', 'user_profile.md');
        if (fs.existsSync(targetProfile) && fs.existsSync(sourceProfile)) {
            fs.copyFileSync(sourceProfile, targetProfile);
            count++;
        }
    }

    vscode.window.showInformationMessage(`✅ 已重置 ${count} 个工作区的用户画像。`);
}

// ============================================================
// 状态栏
// ============================================================

let statusBarItem;

function updateStatusBar(workspaceRoot) {
    if (!statusBarItem) return;
    if (workspaceRoot) {
        const skillTarget = getSkillTargetDir(workspaceRoot);
        if (fs.existsSync(skillTarget)) {
            const config = vscode.workspace.getConfiguration('tianGou');
            const personality = config.get('personality', 'professional');
            const modeIcons = { full: '🔥', normal: '🐕', lite: '📎', professional: '👔' };
            statusBarItem.text = `${modeIcons[personality] || '🐕'} 舔狗已就位`;
            statusBarItem.tooltip = '舔狗Skill 已激活 — 点击查看状态';
            statusBarItem.command = 'tianGou.status';
        } else {
            statusBarItem.text = '🐕 舔狗未安装';
            statusBarItem.tooltip = '点击安装舔狗Skill';
            statusBarItem.command = 'tianGou.install';
        }
    }
    statusBarItem.show();
}

// ============================================================
// 扩展生命周期
// ============================================================

function activate(context) {
    console.log('🐕 舔狗Skill 扩展已激活！');

    // 状态栏
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    context.subscriptions.push(statusBarItem);

    // 注册命令
    context.subscriptions.push(
        vscode.commands.registerCommand('tianGou.install', () => installSkill(context)),
        vscode.commands.registerCommand('tianGou.uninstall', () => uninstallSkill()),
        vscode.commands.registerCommand('tianGou.status', () => showStatus()),
        vscode.commands.registerCommand('tianGou.editProfile', () => editProfile(context)),
        vscode.commands.registerCommand('tianGou.resetProfile', () => resetProfile(context)),
        vscode.commands.registerCommand('tianGou.previewDiff', () => previewDiff(context)),
        vscode.commands.registerCommand('tianGou.switchPersonality', () => switchPersonality())
    );

    // 自动安装
    const config = vscode.workspace.getConfiguration('tianGou');
    if (config.get('autoInstall', true)) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders) {
            for (const folder of workspaceFolders) {
                const skillTarget = getSkillTargetDir(folder.uri.fsPath);
                if (!fs.existsSync(skillTarget)) {
                    installSkill(context);
                    break;
                }
            }
        }
    }

    // 初始化状态栏
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
        updateStatusBar(vscode.workspace.workspaceFolders[0].uri.fsPath);
    }

    // 配置变更监听 → 自动同步配置文件
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('tianGou')) {
                const workspaceFolders = vscode.workspace.workspaceFolders;
                if (!workspaceFolders) return;
                for (const folder of workspaceFolders) {
                    const skillTarget = getSkillTargetDir(folder.uri.fsPath);
                    writeConfigToSkillMd(skillTarget);
                }
                // 更新状态栏图标
                updateStatusBar(workspaceFolders[0].uri.fsPath);
            }
        })
    );
}

function deactivate() {
    if (statusBarItem) statusBarItem.dispose();
}

module.exports = { activate, deactivate };
