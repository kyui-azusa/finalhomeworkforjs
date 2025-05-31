import express from 'express'
import router_note from './routes/notes.js'
import {getAllPosts} from './utils/noteReader.js';
const app = express()
const port = 3000
app.use('/note', router_note)
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const posts = await getAllPosts()
  // const posts = []
  res.render('index', {posts: posts}); // 默认找 views/index.ejs
});

app.listen(port, ()=>{
  console.log(`Server running at http://localhost:${port}`)
})