## 前端



## 后端

核心代码: 

```js
import express from 'express'
import router_note from './routes/notes.js'
import router_login from './routes/login.js'
import router_test from './routes/test.js'
import router_archive from './routes/archive.js'
import router_about from './routes/about.js'
import {getAllPosts} from './utils/noteReader.js';
import session from 'express-session'

const app = express()
const port = 3030

app.use(session({
  secret: 'azusa-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 } 
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use((req, res, next) => {
  res.locals.user = req.session.user || null
  next()
})
app.use('/note', router_note)
app.use('/login', router_login)
app.use('/test', router_test)
app.use('/archive', router_archive)
app.use('/about', router_about)


app.get('/', async (req, res) => {
  const posts = await getAllPosts()
  // const posts = []
  res.render('index', {posts: posts});
});

app.get('/admin', async (req, res) => {
  res.render('admin');
});

app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
// res.send(6)
});

app.listen(port, ()=>{
  console.log(`Server running at http://localhost:${port}`)
})
```



archive.js

```js
import express from "express";
import { withDB } from "../utils/dbHandler.js";
import { getPostsinfoBySlugs, getTagsBySlug } from "../utils/noteReader.js";

const router = express.Router();
router.get("/", async (req, res) => {
  let posts = [];
  let slugs = [];
  if (req.session.user) {
    const user_id = req.session.user.id;
    await withDB(async (db) => {
      const rows = await db.all(
        "SELECT slug FROM favorites WHERE user_id = ?",
        [user_id]
      );
      slugs = rows.map((row) => row.slug); // 得到 slug 数组
    });
  }
  posts = await getPostsinfoBySlugs(slugs);

  //   let tags = await Promise.all(
  //   slugs.map(async (slug) => {
  //     return await getTagsBySlug(slug);
  //   })
  // );
  const tagMap = {};
  for (const slug of slugs) {
    const tags = await getTagsBySlug(slug);
    tags.forEach((tag) => {tagMap[tag] = (tagMap[tag] || 0) + 1;});
  }
  const tagData = Object.entries(tagMap).map(([name, value]) => ({name, value}));
  res.locals.tagData = tagData;
  res.locals.slugs = slugs;
  res.locals.posts = posts;
  res.render("archive");
});
export default router;
```

> 使用 Express 的 Router 模块组织路由, 清晰划分页面逻辑, 避免所有逻辑堆在 app.js 中.

