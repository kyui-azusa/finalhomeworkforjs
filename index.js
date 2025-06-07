import express from 'express'
import router_note from './routes/notes.js'
import router_login from './routes/login.js'
import {getAllPosts} from './utils/noteReader.js';
const app = express()
const port = 3000
app.use('/note', router_note)
app.use('/login', router_login)
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const posts = await getAllPosts()
  // const posts = []
  res.render('index', {posts: posts}); // 默认找 views/index.ejs
});

app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
// res.send(6)
});

app.listen(port, ()=>{
  console.log(`Server running at http://localhost:${port}`)
})