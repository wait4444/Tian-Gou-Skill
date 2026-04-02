# 效果对比：普通 AI vs 舔狗Skill

> 同一任务，对比普通 AI 回复和启用舔狗skill后的回复差异。

---

## 对比 1：创建 Flask API

**用户指令**：`帮我写一个用户登录的 Flask API`

### 普通 AI 回复

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username == 'admin' and password == '123456':
        return jsonify({'message': 'Login successful'})
    return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)
```

> 总 token：约 180。功能完成，但仅给出最基础实现。

### 舔狗Skill 回复

```python
from flask import Flask, request, jsonify
from werkzeug.security import check_password_hash
import jwt, datetime, os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'change-me')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({'error': '请求体不能为空'}), 400
    
    username = data.get('username', '').strip()
    password = data.get('password', '')
    
    if not username or not password:
        return jsonify({'error': '用户名和密码不能为空'}), 400
    
    # TODO: 替换为数据库查询
    user = get_user_by_username(username)
    if not user or not check_password_hash(user['password_hash'], password):
        return jsonify({'error': '用户名或密码错误'}), 401
    
    token = jwt.encode({
        'user_id': user['id'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config['SECRET_KEY'], algorithm='HS256')
    
    return jsonify({'token': token, 'expires_in': 86400})

if __name__ == '__main__':
    app.run(debug=True)
```

```
🎁 额外赠送
- 已使用 werkzeug 密码哈希替代明文对比
- 加入了 JWT token 生成
- 输入校验已补全（空值、格式）

⚠️ 护主提醒
├─ 风险等级：🔴 高
├─ 问题：SECRET_KEY 使用了默认值
└─ 建议：部署前务必通过环境变量设置强密钥
```

> 总 token：约 320（+78%）。多花 78% token，但补全了安全哈希、JWT、输入校验、风险提醒。

### 对比分析

| 维度 | 普通 AI | 舔狗Skill | 差异 |
|------|--------|----------|------|
| 功能完整度 | 基础登录 | 登录+JWT+哈希+校验 | +3项 |
| 安全性 | 明文密码对比 | 哈希+环境变量密钥 | 🔴→🟢 |
| 主动补全 | 无 | 3项额外赠送 | +3 |
| 风险提醒 | 无 | 1项安全预警 | +1 |
| Token 开销 | 180 | 320 | +78% |

---

## 对比 2：修复 Bug

**用户指令**：`这个函数报 TypeError，帮我看看`

```python
def calculate_total(items):
    return sum(item.price for item in items)
```

### 普通 AI 回复

> `items` 中可能包含 `None` 值。加个过滤：
```python
def calculate_total(items):
    return sum(item.price for item in items if item is not None)
```

> Token：约 60

### 舔狗Skill 回复（😤 焦急模式检测）

```python
def calculate_total(items):
    if not items:
        return 0
    return sum(item.price for item in items if item is not None and hasattr(item, 'price'))
```

```
🙇 根因：items 可能含 None 或缺少 price 属性的对象。已加双重防护。

🎁 预防 checklist
- 调用处加类型注解：items: list[Item]
- 数据入口处过滤无效记录
```

> Token：约 110（+83%）。涡轮模式（检测到焦急），零废话直接修复+根因+预防。

---

## 对比 3：写 README

**用户指令**：`帮项目写个 README`

### 普通 AI 回复

提供标准 README 模板：标题、描述、安装、使用。约 200 token。

### 舔狗Skill 回复

提供完整 README + 以下额外内容：
- 自动分析项目结构生成目录树
- 根据 package.json / requirements.txt 推断技术栈并生成 badge
- 补充 Contributing 指南框架
- 🎁 赠送 .editorconfig

> Token：约 400（+100%）。双倍 token 但完成度从 60% → 95%。
