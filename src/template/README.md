# 组件模板说明

本目录包含插件使用的所有组件模板文件。当用户通过插件创建组件时，将根据选择的模板类型使用对应的模板文件。

## 模板文件说明

### uni-template.vue

uni-app组件模板，适用于uni-app项目。特点：

- 使用 `<view>` 标签作为容器
- 包含uni-app常用的组件结构
- 包含scss样式，使用`@include normalContainer()`
- 支持TypeScript

### vue3-template.vue

Vue3组件模板，适用于Vue3项目。特点：

- 使用Composition API
- 使用 `<script setup>` 语法
- 支持TypeScript
- 包含常用的ref和reactive引入

### vue2-template.vue

Vue2组件模板，适用于Vue2项目。特点：

- 使用Options API
- 包含常用的生命周期钩子
- 包含props、data、methods等基本结构

## 模板变量

所有模板中都包含可替换的变量：

- `name: 'name'`: 将被替换为用户输入的组件名称

## 自定义模板

如需添加新模板，请注意：

1. 文件名格式应为 `{类型}-template.vue`
2. 确保包含可替换的组件名称标记
3. 在templateManager.ts中添加对应的模板类型

## 最佳实践

- 保持模板简洁，只包含必要的基础结构
- 对于特定项目，可以根据项目规范调整模板内容
- 确保模板中的标记（如组件名称）保持一致，以便于替换 