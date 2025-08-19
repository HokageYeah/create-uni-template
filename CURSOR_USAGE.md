# 在Cursor中使用组件模板生成器插件

本文档详细说明如何在Cursor编辑器中安装和使用create-uni-template插件。

## 🚀 安装方式

### 方式一：本地安装（推荐用于测试）

1. **构建插件包**
   ```bash
   # 安装依赖
   npm install
   
   # 测试构建配置
   node test-build.js
   
   # 构建插件包
   npm run package-vsce
   ```

2. **在Cursor中安装**
   - 打开Cursor编辑器
   - 按下 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (macOS)
   - 输入 `Extensions: Install from VSIX...`
   - 选择生成的 `.vsix` 文件

### 方式二：通过VS Code扩展市场

插件发布后，可以在Cursor的扩展面板中搜索 "组件模板生成器" 进行安装。

## 🎯 使用方法

### 1. 命令面板调用

- 按下 `Ctrl+Shift+P` / `Cmd+Shift+P`
- 输入 "🤗创建组件模板"
- 按回车执行

### 2. 编辑器右键菜单

- 在任意编辑器窗口中右键点击
- 选择 "🤗创建组件模板"

### 3. 文件浏览器右键菜单（推荐）

- 在左侧文件浏览器中右键点击目标文件夹
- 选择 "🤗创建组件模板"
- 插件将自动使用该文件夹作为默认保存位置

## 📋 操作步骤

1. **输入组件名称**
   - 在弹出的输入框中输入组件名称
   - 例如：`UserProfile`、`ProductCard` 等

2. **选择模板类型**
   - uni-app 模板：适用于uni-app项目
   - Vue3 模板：适用于Vue3项目，使用Composition API
   - Vue2 模板：适用于Vue2项目，使用Options API

3. **确认保存位置**
   - 如果从文件夹右键调用，确认是否使用当前文件夹
   - 否则选择其他文件夹作为保存位置

4. **完成创建**
   - 插件会自动创建组件文件
   - 新文件会自动在编辑器中打开

## 🔧 Cursor特殊配置

### 启用插件功能

确保Cursor中的以下设置已启用：

```json
{
  "extensions.autoUpdate": true,
  "extensions.autoCheckUpdates": true
}
```

### 快捷键设置（可选）

可以为插件命令设置自定义快捷键：

1. 打开 `File > Preferences > Keyboard Shortcuts`
2. 搜索 "create-uni-template.createComponent"
3. 设置你喜欢的快捷键组合

## 📁 生成的模板内容

### uni-app 模板
```vue
<template>
  <view class='container'></view>
</template>

<script>
export default {
  name: 'YourComponentName'
};
</script>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

</script>
<style scoped lang='scss'>
.container {
  @include normalContainer();
}
</style>
```

### Vue3 模板
```vue
<template>
  <div></div>
</template>

<script setup lang='ts'>
export default {
  name: 'YourComponentName'
};
</script>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

</script>
<style scoped lang='scss'>

</style>
```

### Vue2 模板
```vue
<template>
  <div></div>
</template>
<script>
export default {
  name: 'YourComponentName',
  props: {},
  data() {
    return {}
  },
  mounted() {},
  created() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
</style>
```

## 🛠️ 故障排除

### 常见问题

1. **模板文件无法找到**
   - 确保插件正确安装
   - 重新安装插件

2. **命令不显示在菜单中**
   - 重启Cursor编辑器
   - 检查插件是否已启用

3. **无法创建文件**
   - 检查目标文件夹的写入权限
   - 确保文件夹路径有效

### 获取帮助

如果遇到问题，可以：
- 查看Cursor的开发者控制台：`Help > Toggle Developer Tools`
- 在GitHub仓库提交Issue
- 查看插件日志信息

## 🔄 更新插件

插件更新后，Cursor会自动提示更新，或者你可以：
1. 打开扩展面板
2. 找到 "组件模板生成器"
3. 点击更新按钮

---

**注意**: 本插件与VS Code完全兼容，因此所有VS Code的扩展功能在Cursor中都能正常工作。
