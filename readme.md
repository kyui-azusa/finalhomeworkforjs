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


### 功能