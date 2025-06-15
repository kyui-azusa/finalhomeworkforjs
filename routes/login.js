import express from "express";
import { createTable, openDB, withDB } from "../utils/dbHandler.js";

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.session.user) {
    return res.redirect("/")
  }
  res.render("login");
});

// router.post("/reg", async (req, res) => {
//   const { acc, psw } = req.body;

//   try {
//     await withDB(async (db) => {
//       await db.run(
//         'INSERT INTO users (username, password) VALUES (?, ?)',
//         [acc, psw]
//       );
//     });
//     res.send("注册成功");
//   } catch (err) {
//     console.error("注册失败:", err.message);
//     res.status(500).send("注册失败，请稍后再试");
//   }
// });
router.post("/reg", async (req, res) => {
  const { acc, psw } = req.body;
  try {
    let existingUser = null;
    await withDB(async (db) => {
      existingUser = await db.get(
        'SELECT * FROM users WHERE username = ?',
        [acc]
      );
      if (existingUser) {
        // throw new Error('用户名已存在');
        res.status(409).json({
          msg: '用户名已存在'
        })
      }
      await db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [acc, psw]
      );
    });
    res.send("注册成功");
  } catch (err) {
    console.error("注册失败:", err.message);
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { acc, psw } = req.body
  let found = false
  let user = null

  await withDB(async (db) => {
    user = await db.get('SELECT * FROM users WHERE username=? AND password=?', [acc, psw])
    if (user) found = true
  })

  if (found) {
    // console.log(user)
    // res.send(user)
    req.session.user = {
      id: user.id,
      username: user.username
    }
    res.send("登录成功")
  } else {
    res.status(401).send("账号或密码错误")
  }
})
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('退出失败:', err);
      return res.status(500).send('退出失败');
    }
    res.sendStatus(200);
  });
});
export default router;