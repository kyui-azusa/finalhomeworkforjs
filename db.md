## 数据库代码

```js
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_PATH = path.join(__dirname, '../db/data.sqlite')

export const openDB = async () => {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  })
  return db
}

export const createTable = async (sql) => {
  const db = await openDB()
  await db.exec(sql)
  await db.close()
}

export const withDB = async (callback) => {
  const db = await openDB()
  try {
    return await callback(db)
  } finally {
    await db.close()
  }
}
```

1. `withDB` 是封装的数据库使用代码
	抽象出 `withDB` 函数, 优化开发体验, 使得可在 `js` 中获得类似 `python` 中使用 `with` 的开发体验, 不用担心忘记关闭数据库, 只用在回调函数中进行数据库的操作.
2. `createTable` 是对数据库进行查询的函数, 接收 `query` 语句. 与名称含义略有出入, 因为代码耦合还是不够低, 所以不便改名, 对项目改造为 `ts` 又不够熟悉, 只好保留了.

3. `openDB` 封装的数据库初始化连接函数, 已被 `withDB` 代替, 但作为其依赖仍需保留.

## 数据库结构

项目使用 SQLite 数据库存储用户信息与收藏关系，共包含两张数据表：users 和 favorites，设计如下：

### 1. users

**表：用户信息表**

| **字段名** | **类型** | **说明**               |
| ---------- | -------- | ---------------------- |
| id         | INTEGER  | 主键，自增             |
| username   | TEXT     | 用户名，唯一           |
| password   | TEXT     | 用户密码（明文或加密） |

**建表语句：**

```
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);
```

### 2. favorites

**表：收藏关系表**

| **字段名** | **类型** | **说明**                |
| ---------- | -------- | ----------------------- |
| id         | INTEGER  | 主键，自增              |
| user_id    | INTEGER  | 外键，关联 users(id)    |
| slug       | TEXT     | 被收藏笔记的标识符 slug |
| created_at | DATETIME | 收藏时间，默认当前时间  |

**建表语句：**

```
CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  slug TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```