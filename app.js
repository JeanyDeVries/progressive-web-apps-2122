const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>{
  res.render("index");
})

app.listen(port);
