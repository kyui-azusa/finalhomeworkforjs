import express from "express";
const router = express.Router();

router.get("/:slug", async (req, res) => {
  const route = './source/_post/'
  // const re = await readNote(`${route}${req.params.id}`);
  const post = marked.parse((await getNote(req.params.slug)).content)
  // console.log(post);
  res.render('post', {post: post})
});

export default router;