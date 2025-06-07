项目结构

```text
my-notes-app/
├── package.json
├── index.js             # 入口文件
├── routes/              # 路由定义
│   └── notes.js
├── views/               # EJS 模板存放
│   └── index.ejs
├── public/              # 静态资源（CSS、JS）
├── data/                # 存放 markdown 或 note 元数据（可选）
├── db/                  # 数据库操作逻辑（如用 sqlite）
│   └── index.js
├── utils/               # 工具函数（如文件读取）
└── README.md            # 项目说明
```

## 环境

### 环境依赖

1. node>=18

### 开发依赖

1. nodemon
2. less

### 生产依赖

1. express
2. ejs
3. marked
4. gray-matter
5. sqlite3

### 快速开始

1. 安装依赖

   ```bash
   npm i
   ```

2. 启动服务

   开发环境

   ```bash
   npm run dev
   ```

   生产环境

   ```bash
   node index.js
   ```

## 功能

本项目是一个轻量级笔记网站, 具备以下核心功能

### 1. 首页展示

- 展示所有笔记的标题、时间和简介

### 2. 笔记详情页

- 路由格式：`/note/:slug`
- 使用 `marked` 渲染 Markdown 内容为 HTML
- 支持代码高亮、标题导航等
### 3. 账号系统

- 当前项目未内置登录注册功能，默认所有功能对所有用户开放。
- 若未来需要多用户支持，可扩展用户表（如 `users`）并引入会话管理中间件（如 `express-session` 或 JWT）。
- 收藏夹等功能已为账号系统预留结构支持。

### 4. 收藏夹功能

- 可将任意笔记加入收藏夹，点击收藏按钮即可触发写入操作。
- 收藏信息存入 SQLite 数据库中的 `favorites` 表，字段包括 `id`、`slug`、`title`
- 收藏记录可通过 `/favorites` 页面统一查看，展示已收藏笔记的标题及时间。
- 未来可支持收藏取消、去重、分页等功能。

### 5. 404 页面

- 对非法或不存在的路径进行统一拦截处理。
- 使用独立的 `404.ejs` 模板进行渲染。
- 页面将展示错误提示，并在 5 秒后自动跳转回首页（含倒计时提示）。

### 6. 样式与响应式布局

- 使用 LESS 作为样式预处理器，结构清晰、模块划分合理。
- 所有样式在开发时编写于 `style/` 目录，自动编译至 `public/style/*.css`。
- 页面整体使用 Flex 布局，适配桌面浏览器。
- 结构已预留移动端适配支持，便于后续拓展为响应式布局。

### 7. 数据源说明

- 所有笔记数据来源于本地 Markdown 文件，路径位于 `source/_post/*.md`。
- 每篇笔记包含标准的 YAML FrontMatter 格式，用于描述标题、时间、标签等元数据。
- 使用 `gray-matter` 解析元数据，配合 `marked` 将 Markdown 内容转为 HTML。
- 文件 slug（文件名去扩展名）作为笔记访问路由的唯一标识。