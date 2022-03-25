const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  fetch('https://www.rijksmuseum.nl/api/nl/collection?key=ixmhN4my&ps=20&imgonly=true')
    .then(async response => {
      const artWorks = await response.json()
      res.render('index', {
          pageTitle: 'ArtAtHomev2', 
          data: artWorks.artObjects
      })
    })
    .catch(err => res.send(err))
})

app.listen(port);

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .then((body) => body.data)
    .catch((error) => error)
}
