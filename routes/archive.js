import express from "express";
import { createTable, openDB, withDB } from "../utils/dbHandler.js";
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
    tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    });
  }
  const tagData = Object.entries(tagMap).map(([name, value]) => ({
    name,
    value,
  }));

  res.locals.tagData = tagData;

  res.locals.slugs = slugs;
  res.locals.posts = posts;
  // res.locals.tagMap = tagMap;

  res.render("archive");
});
export default router;
