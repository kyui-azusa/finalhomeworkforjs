import express from 'express'
import router_note from './routes/notes.js'

const app = express()
const port = 3000
app.use('/note', router_note)
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index'); // 默认找 views/index.ejs
});

app.listen(port, ()=>{
  console.log(`Server running at http://localhost:${port}`)
})