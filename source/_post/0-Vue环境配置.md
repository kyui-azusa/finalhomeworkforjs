---
title: 0-Vue环境配置
date: 2025-3-1 20:06:57 
tags: Vue
categories: Vue入门
cover: /image/bg-1.png
---

## 搭建工程与环境说明

开发环境与运行环境有区别，需要使用构建工具（如 vue-cli）来搭建 Vue 工程。

> 推荐使用 nvm 管理 Node 版本：[nvm 安装页](https://nvm.uihtm.com/download.html)，或 [备用链接](https://www.downza.cn/soft/352547.html)

## 配置环境

### 版本要求

- node: 14.16.0
- vue: 2.x
- vue-cli: 4.5.0

### node

1. 查看当前版本：

    ```bash
    node -v
    ```

2. 查看版本：

    ```bash
    nvm list
    ```

3. 如果没有安装该版本：

    ```bash
    nvm install 14.16.0
    ```

4. 使用该版本：

    ```bash
    nvm use 14.16.0
    ```

### vue-cli

1. 检查是否已经安装：

    ```bash
    vue --version
    ```

2. 如果已经安装，且版本不一致，可卸载：

    ```bash
    npm uninstall -g @vue/cli
    ```

3. 安装指定版本：

    ```bash
    npm i -g @vue/cli@4.5.0
    ```

4. 再次验证版本：

    ```bash
    vue --version
    ```

## 搭建工程

### vue 2.x

> 可查看 [官方文档](https://cli.vuejs.org/zh/guide/installation.html)

1. 进入工程目录，创建工程：

    ```bash
    vue create <工程名字>
    ```

    在终端中可以看到：

    ```bash
    Vue CLI v4.5.0
    ┌─────────────────────────────────────────┐
    │                                         │
    │   New version available 4.5.0 → 5.0.8   │
    │                                         │
    └─────────────────────────────────────────┘
    
    ? Please pick a preset:
    > Default ([Vue 2] babel, eslint)
      Default (Vue 3 Preview) ([Vue 3] babel, eslint)
      Manually select features
    ```

2. 选择 `Manually select features` (使用空格选择)

    ```bash
    >(*) Choose Vue version
     (*) Babel
     ( ) TypeScript
     ( ) Progressive Web App (PWA) Support
     ( ) Router
     ( ) Vuex
     ( ) CSS Pre-processors
     (*) Linter / Formatter
     ( ) Unit Testing
     ( ) E2E Testing
    ```

    - `Choose Vue version`：选择 `2.x`
    - Babel 保留
    - 不选 TypeScript
    - 勾选 CSS Pre-processors，选择 Less

3. 配置文件位置：

    ```bash
    ? Where do you prefer placing config for Babel, ESLint, etc.?
    > In dedicated config files
      In package.json
    ```

    建议选择保存在单独的配置文件中

4. 是否保存为 preset：

    ```bash
    ? Save this as a preset for future projects? (y/N)
    ```

5. 等待构建工具创建项目：

    ```bash
    Vue CLI v4.5.0
    ✨  Creating project in <目录>.
    ⚙️  Installing CLI plugins. This might take a while...
    ```

6. 创建完成，开始开发。

## 工程结构

- `.git`：自动初始化的 Git 仓库

- `public/`：页面模板

- `package.json`：包含运行和构建命令：

    - 启动开发服务器：

        ```bash
        npm run serve
        ```

        - 默认端口：8080
        - 内置热重载功能

    - 打包构建：

        ```bash
        npm run build
        ```

        将项目打包到 `dist/` 目录

- `main.js`：入口文件

    ```js
    import Vue from "vue"
    import App from "./App.vue"
    
    Vue.config.productionTip = false
    
    new Vue({
        render: h => h(App),
    }).$mount('#app')
    ```

> 推荐安装 Vue DevTools