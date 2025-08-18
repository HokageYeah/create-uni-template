# 组件模板生成器 (create-uni-template)

这是一个VS Code扩展，用于快速生成Vue组件模板。支持生成uni-app、Vue3和Vue2组件模板，帮助开发者提高开发效率。

## 功能特点

- 支持三种模板类型：uni-app、Vue3和Vue2
- 自动替换组件名称
- 多种使用方式：命令面板、编辑器右键菜单、资源管理器右键菜单
- 自动识别资源管理器右键点击的目录作为保存位置
- 自定义文件保存位置
- 自动打开新创建的文件

## 安装

1. 在VS Code扩展商店中搜索 `create-uni-template`
2. 点击安装
3. 重启VS Code

## 使用方法

### 方法一：使用命令面板

1. 打开命令面板 (`Ctrl+Shift+P` 或 `Cmd+Shift+P`)
2. 输入 `🤗创建组件模板` 并选择命令
3. 按照提示输入组件名称
4. 选择模板类型（uni-app、Vue3或Vue2）
5. 选择保存位置
6. 完成后，新组件文件会自动打开

### 方法二：使用编辑器右键菜单

1. 在编辑器中右键点击
2. 从菜单中选择 `🤗创建组件模板`
3. 按照提示输入组件名称和选择模板类型
4. 选择保存位置
5. 完成后，新组件文件会自动打开

### 方法三：使用资源管理器右键菜单（推荐）

1. 在资源管理器中右键点击目标文件夹
2. 从菜单中选择 `🤗创建组件模板`
3. 确认是否使用当前文件夹作为保存位置
4. 按照提示输入组件名称和选择模板类型
5. 完成后，新组件文件会自动打开

## 项目结构

```
create-uni-template/
  ├── src/                      # 源代码目录
  │   ├── extension.ts          # 插件入口文件
  │   ├── code/                 # 核心代码目录
  │   │   ├── componentGenerator.ts  # 组件生成器
  │   │   ├── templateManager.ts     # 模板管理器
  │   │   └── userInterface.ts       # 用户界面处理
  │   └── template/             # 模板文件目录
  │       ├── uni-template.vue  # uni-app模板
  │       ├── vue3-template.vue # Vue3模板
  │       └── vue2-template.vue # Vue2模板
  ├── package.json              # 插件配置文件
  ├── README.md                 # 说明文档
  ├── CHANGELOG.md              # 更新日志
  └── tsconfig.json             # TypeScript配置
```

## 文件说明

### 核心文件

- **extension.ts**: 插件入口文件，负责注册命令和初始化各个模块
- **componentGenerator.ts**: 组件生成器，协调整个生成流程
- **templateManager.ts**: 模板管理器，负责模板的读取、处理和生成
- **userInterface.ts**: 用户界面处理，负责与用户的交互
- **template/\*.vue**: 各种类型的组件模板文件

### 配置文件

- **package.json**: 插件配置文件，定义命令、菜单项和依赖
- **tsconfig.json**: TypeScript配置文件

## package.json 配置说明

### 主要配置项

```json
{
  "name": "create-uni-template",   // 插件名称
  "displayName": "create-uni-template",  // 显示名称
  "description": "create uni template file",  // 插件描述
  "version": "0.0.1",  // 版本号
  "engines": {
    "vscode": "^1.103.0"  // 支持的VS Code版本
  },
  "categories": [
    "Other"  // 插件类别
  ],
  "contributes": {
    "commands": [  // 注册的命令
      {
        "command": "create-uni-template.createComponent",
        "title": "🤗创建组件模板"
      }
    ],
    "menus": {  // 菜单配置
      "editor/context": [  // 编辑器右键菜单
        {
          "command": "create-uni-template.createComponent",
          "group": "navigation"
        }
      ],
      "explorer/context": [  // 资源管理器右键菜单
        {
          "command": "create-uni-template.createComponent",
          "group": "navigation",
          "when": "explorerResourceIsFolder"  // 只在文件夹上显示
        }
      ]
    }
  }
}
```

## 模板说明

### uni-app 模板

```vue
<template>
  <view class='container'></view>
</template>

<script>
export default {
  name: '组件名称'
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
  name: '组件名称'
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
  name: '组件名称',
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

## 核心功能流程

1. **命令激活**: 用户通过命令面板或右键菜单激活插件
2. **获取信息**: 获取组件名称、模板类型和保存位置
3. **生成组件**: 读取模板文件，替换组件名称，生成新的组件文件
4. **打开文件**: 自动打开新创建的组件文件

## 扩展设置

暂无可配置项，未来版本可能会添加自定义模板功能。

## 版本记录

### 0.0.1

- 初始版本
- 支持生成uni-app、Vue3和Vue2组件模板
- 支持通过命令面板、编辑器右键菜单和资源管理器右键菜单使用

## 贡献

欢迎提交问题和建议到[GitHub仓库](https://github.com/yourusername/create-uni-template)。

## 许可证

MIT
