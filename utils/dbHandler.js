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