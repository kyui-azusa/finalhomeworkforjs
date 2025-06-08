import express from "express";
import { createTable, openDB } from "../utils/dbHandler.js";

const router = express.Router();

router.get("/", async (req, res) => {

  res.send(openDB())
});
router.get("/c", async (req, res) => {
createTable(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);`)
  res.send(openDB())
});



router.get("/c1", async (req, res) => {
const db = await openDB()
  await db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['123', '123'])
  await db.close()
  res.send(openDB())
});

router.get("/s", async (req, res) => {
const db = await openDB()
  const users = await db.all('SELECT * FROM users')

  res.send(users)
});
export default router;