import express from "express";
import { readNote } from "../utils/noteReader.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("显示所有笔记");
});

router.get("/:id", async (req, res) => {
  const route = './source/_post/'
  const re = await readNote(`${route}${req.params.id}`);
  res.send(re);
  console.log(req.query.r);
});

router.post("/", (req, res) => {
  res.send("新增笔记");
});

export default router;
