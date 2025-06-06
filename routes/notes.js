import express from "express";
import { readNote, getNote } from "../utils/noteReader.js";
import { get } from "http";
const router = express.Router();
import { marked } from "marked";

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
  res.render('post', {post: post})
});

router.post("/", (req, res) => {
  res.send("新增笔记");
});

export default router;
