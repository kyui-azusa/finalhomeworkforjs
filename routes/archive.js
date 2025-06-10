import express from "express";
import { createTable, openDB, withDB } from "../utils/dbHandler.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let posts = [];

  if (req.session.user) {
    const user_id = req.session.user.id;

    await withDB(async (db) => {
      const rows = await db.all(
        "SELECT slug FROM favorites WHERE user_id = ?",
        [user_id]
      );
      posts = rows.map((row) => row.slug); // 得到 slug 数组
    });
  }

  res.locals.posts = posts;
  res.render("archive");
});
export default router;
