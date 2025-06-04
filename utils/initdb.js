// scripts/init-sqlite.js
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const init = async () => {
  const db = await open({
    filename: './db/data.sqlite',
    driver: sqlite3.Database
  });

  console.log('✅ 空数据库已创建（尚未创建任何表）');
  await db.close();
};

init();