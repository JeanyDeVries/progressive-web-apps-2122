const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

import { renderHTML } from './public/modules/renderHTML.js';

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>{
  res.render("index");
})

app.get('/paintings', function (req, res) {
  fetchJson('https://www.rijksmuseum.nl/api/nl/collection?key=ixmhN4my&ps=20&imgonly=true').then(function (jsonData) {
    renderHTML(jsonData);
  })
})

app.listen(port);
