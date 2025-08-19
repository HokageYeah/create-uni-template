# 🚀 VS Code/Cursor 插件部署指南

## ✅ 构建成功

插件已成功打包为：`create-uni-template-0.0.1.vsix` (51.65 KB)

## 📦 安装插件

### 在 VS Code 中安装

1. 打开 VS Code
2. 按 `Ctrl+Shift+P` / `Cmd+Shift+P` 打开命令面板
3. 输入 `Extensions: Install from VSIX...`
4. 选择 `create-uni-template-0.0.1.vsix` 文件
5. 重启 VS Code

### 在 Cursor 中安装

1. 打开 Cursor 编辑器
2. 按 `Ctrl+Shift+P` / `Cmd+Shift+P` 打开命令面板
3. 输入 `Extensions: Install from VSIX...`
4. 选择 `create-uni-template-0.0.1.vsix` 文件
5. 重启 Cursor

## 🎯 使用方法

### 快速开始

1. **命令面板方式**：
   - `Ctrl+Shift+P` → 输入 "🤗创建组件模板"

2. **右键菜单方式**：
   - 编辑器中右键 → "🤗创建组件模板"
   - 文件浏览器中右键文件夹 → "🤗创建组件模板"

### 操作流程

1. 输入组件名称（如：`UserProfile`）
2. 选择模板类型：
   - uni-app 模板
   - Vue3 模板  
   - Vue2 模板
3. 选择保存位置
4. 自动生成并打开组件文件

## 🔧 开发者指令

### 重新构建插件

```bash
# 安装依赖
npm install

# 测试构建配置
node test-build.js

# 构建插件包
npm run package-vsce
```

### 本地开发

```bash
# 开发模式（监听文件变化）
npm run watch

# 编译代码
npm run compile

# 代码检查
npm run lint
```

## 📋 插件功能清单

✅ 支持三种模板类型（uni-app、Vue3、Vue2）  
✅ 自动替换组件名称  
✅ 多种调用方式（命令面板、右键菜单）  
✅ 智能路径识别（右键文件夹自动设置路径）  
✅ VS Code 完全兼容  
✅ Cursor 完全兼容  
✅ 自动打开生成的文件  
✅ 错误处理和用户反馈  

## 🗂️ 项目结构

```
create-uni-template/
├── dist/                          # 构建输出
│   ├── extension.js               # 主程序
│   └── extension.js.map           # 源码映射
├── template/                      # 模板文件（打包时复制）
│   ├── uni-template.vue          # uni-app模板
│   ├── vue3-template.vue         # Vue3模板
│   └── vue2-template.vue         # Vue2模板
├── src/                          # 源代码
│   ├── extension.ts              # 入口文件
│   ├── code/                     # 核心代码
│   │   ├── componentGenerator.ts # 组件生成器
│   │   ├── templateManager.ts    # 模板管理器
│   │   └── userInterface.ts      # 用户界面
│   └── template/                 # 源模板文件
├── copy-templates.js             # 模板复制脚本
├── test-build.js                 # 构建测试脚本
├── package.json                  # 插件配置
├── README.md                     # 主文档
├── CURSOR_USAGE.md              # Cursor使用指南
└── create-uni-template-0.0.1.vsix # 打包文件
```

## 🌟 发布到扩展市场

### 准备工作

1. 注册 [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage) 发布者账号
2. 获取 Personal Access Token (PAT)
3. 更新 package.json 中的发布者信息

### 发布命令

```bash
# 登录发布者账号
vsce login <发布者名称>

# 发布插件
vsce publish

# 或指定版本号发布
vsce publish minor
vsce publish major
vsce publish patch
```

## 🔍 故障排除

### 常见问题

1. **Node.js 版本问题**：使用 Node.js 20+ 版本
2. **模板文件找不到**：确保运行了 `node copy-templates.js`
3. **打包失败**：检查 vsce 版本，使用最新版本

### 检查清单

- [ ] Node.js 版本 20+
- [ ] 所有依赖已安装
- [ ] 模板文件已复制
- [ ] 构建测试通过
- [ ] VSIX 文件生成成功

## 📧 支持

如有问题，请查看：
- [GitHub 仓库](https://github.com/yuye/create-uni-template)
- [使用文档](./README.md)
- [Cursor 使用指南](./CURSOR_USAGE.md)

---

**祝贺！** 🎉 你的VS Code/Cursor插件已经可以正常使用了！
