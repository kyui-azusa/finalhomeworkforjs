import express from "express";
import { readNote, getNote } from "../utils/noteReader.js";
import { get } from "http";
const router = express.Router();
import { marked } from "marked";
import { createTable, openDB, withDB } from "../utils/dbHandler.js";

marked.setOptions({
  highlight: function(code, lang) {
    const language = lang || 'plaintext';
    return `
<div class="md-fences md-end-block ty-contain-cm modeLoaded">
  <pre class="language-${language}"><code>${code}</code></pre>
</div>
    `.trim();
  },
  langPrefix: 'language-',
});

router.get("/", (req, res) => {
  res.send("显示所有笔记");
});

router.get("/:slug", async (req, res) => {
  const route = './source/_post/'
  // const re = await readNote(`${route}${req.params.id}`);
  const post = marked.parse((await getNote(req.params.slug)).content)
  // console.log(post);
  res.locals.slug = req.params.slug
  res.render('post', {post: post})
});

router.post("/", (req, res) => {
  res.send("新增笔记");
});

router.post("/favorite/add", async (req, res) => {
  // 1. 判断是否登录
  if (!req.session.user) {
    return res.status(401).json({ msg: "未登录" });
  }

  let user_id = req.session.user.id;
  // res.send(user_id)
  const { slug } = req.body;

  // 2. 参数校验（可选）
  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ msg: "参数错误" });
  }

  try {
    await withDB(async (db) => {
      // 3. 启用外键约束（确保生效）
      await db.exec("PRAGMA foreign_keys = ON");

      // 4. 插入收藏记录
      await db.run(
        `INSERT INTO favorites (user_id, slug) VALUES (?, ?)`,
        [user_id, slug]
      );
    });

    // 5. 成功响应
    res.json({ msg: "收藏成功" });
  } catch (err) {
    console.error("收藏失败:", err.message);

    // 6. 错误处理（暴露给开发时可以调试）
    res.status(500).json({ msg: "收藏失败", error: err.message });
  }
});

export default router;
