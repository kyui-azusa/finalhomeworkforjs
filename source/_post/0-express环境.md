---
title: 0-Express环境 
date: 2025-05-24 11:24:25
tags: [Express, node]
categories: 后端
---
## 配置环境

### 依赖要求

- Node.js >= 18
- npm >= 9
- 建议使用 nvm 进行 Node 版本管理(可选)：

  ```shell
  nvm install 18
  nvm use 18
  ```

### 初始化项目

1. 创建项目目录

   ```shell
   mkdir <项目名称>
   cd <项目名称>
   ```

   - 当然也可手动创建目录
2. 初始化

   ```shell
   npm init -y 
   ```

   - `-y` 参数可选, 表示使用默认值创建 `package.json`, 若要自定义配置(如版本号)弃用即可.

### 安装依赖

1. 生产依赖

   ```shell
   npm i express
   ```

   - `i` 是 `install` 的缩写
2. 开发依赖

   ```shell
   npm i -D nodemon
   ```

   - `-D` 是 `--save-dev` 的缩写 表示开发依赖, 仅在开发环节使用, 在使用构建工具时不会被打包进生产环境.

### 环境检验

1. express

   ```shell
   npm list express
   ```

   出现类似 `express@5.1.0` 的版本号提示即可.

   - 注意在项目目录下运行, 因为我们没有全局安装express.

### 其他配置

1. 启用 ES Module 模块系统（
   ```json
   {
     "type": "module",
     ... //其他配置
   }
   ```

## 搭建工程

### 项目结构

- root/
  - index.js
  - public/
    - 静态文件
  - package.json

1. index.js

   ```js
   import express from 'express'

   const app = express()
   const port = 3000

   // 添加静态路径
   app.use("/static", express.static("public")) // 路由可忽略, 默认为 "/"

   // API
   app.get('/test', (req, res) => {
     res.send("test")

   // 启动服务器
   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`)
   }) // 回调函数可省略, 仅在端口监听成功后运行
   ```
2. 启动服务

   1. 使用 `node`

      ```shell
      node index.js
      ```

      或使用 `nodemon` 以简化开发

      ```shell
      npx nodemon index.js
      ```

      或把命令添加到 `scripts`

      打开 `package.json`

      ```json
      {
        "scripts": {
          "dev": "nodemon index.js"
        },
        ...
      }
      ```
3. 访问 `api`

   - 本机3000端口下的接口:

     - [localhost:3000/test](localhost:3000) 或 [127.0.0.1:3000](127.0.0.1:3000)两者没区别
   - 或在局域网内让你的朋友访问

     - <ipv4地址>:3000/test
   - ipv4查看方法

     - win:

       ```bat
       ipocnfig
       ```
     - macOS

       ```shell
       ipconfig getifaddr en0
       ```

## 个人发现

### express是函数而非类

发现: express是一个函数, 而非类

1. 问题发现

   观察如下代码:

   ```js
   express.static("public")
   ```

   笔者突然想到, 既然前文已经有了

   ```js
   const app = express()
   ```

   为什么不能直接从 `app` 对象的属性使用 `static` 方法, 而是要从 `express` 获取, 这是否有点累赘了, 从而怀疑 `static` 是 `express` 对象的静态方法, 这样从 `app` 原型上调用可以减少内存浪费. 想到这里还没觉得有啥不对劲的地方.

   笔者习惯 `Python` 开发, 因此在写到如下代码时, 完全没有感觉什么不对:

   ```js
   import express from 'express'
   const app = express()
   ```

   对比 `Python` 类似场景 实例化对象的代码 (接触 `Express` 前笔者使用过 `fastapi`):

   ```python
   from fastapi import FastAPI
   app = FastAPI()
   ```

   几乎一模一样, 而且都在 `app` 上挂载了很多方法, 使用体验也很类似.

   **但 `js` 实例化对象要用关键字 `new`**

   所以 `express` 中的 `app` 是函数 `express` 的返回值, 看起来是从 `express` 类实例化来的属性的方法都是在函数内挂载的.

   结论: `app` 是对象, 但不是由 `express` 类实例化来的, 而是由 `express` 函数返回的对象.
2. 背景分析

   `Express` 诞生于2010, 而 `ES6` (更新关键字 `class`) 诞生于2015, 所以 `Express` 出现的时候普通函数和构造函数还没有明确的界限, 个人认为这就是造成这一现象的主要原因.

   当时的 `js` 风格偏向函数式编程(CommonJS时代), 主要以工厂函数的形式导出模块功能, 造就了这样的 `Express`

虽然没有用对象式的写法, 但是却有了强大的中间件机制, 由此可见类并非设计的唯一尽头, 精妙的函数设计也能有极佳的效果.

补充: 我早该发现的! express函数首字母都没有大写, 大概率不会是 `ES6` 规范下的类
