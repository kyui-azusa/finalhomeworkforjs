import express from 'express'
import router_note from './routes/notes.js'
import router_login from './routes/login.js'
import router_test from './routes/test.js'
import router_archive from './routes/archive.js'
import router_about from './routes/about.js'
import {getAllPosts} from './utils/noteReader.js';
import session from 'express-session'

const app = express()
const port = 3030

app.use(session({
  secret: 'azusa-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 } 
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use((req, res, next) => {
  res.locals.user = req.session.user || null
  next()
})
app.use('/note', router_note)
app.use('/login', router_login)
app.use('/test', router_test)
app.use('/archive', router_archive)
app.use('/about', router_about)


app.get('/', async (req, res) => {
  const posts = await getAllPosts()
  // const posts = []
  res.render('index', {posts: posts});
});

app.get('/admin', async (req, res) => {
  res.render('admin');
});

app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
// res.send(6)
});

app.listen(port, ()=>{
  console.log(`Server running at http://localhost:${port}`)
})