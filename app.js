const express = require('express');
const path = require('path');
const app = express();
const port = 1337;
const api_key = "ixmhN4my&"

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=${api_key}&ps=20&imgonly=true`)
    .then(async response => {
      const artWorks = await response.json()
      res.render('index', {
          pageTitle: 'Home page', 
          data: artWorks.artObjects
      })
    })
    .catch(err => res.send(err))
})

app.get('/painting/:id', (req, res) => {
  fetch(`https://www.rijksmuseum.nl/api/nl/collection/${req.params.id}?key=${api_key}&imgonly=true`)
      .then(async response => {
         const detail = await response.json()
          res.render('detail', {
              pageTitle: `Kunstwerk: ${req.params.id}`,
              data: detail.artObject
          })
      })
      .catch(err => res.send(err))
})

app.get('/search', (req, res) => {
  fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=${api_key}q=${req.query.query}`)
      .then(async response => {
         const search = await response.json() 
         console.log(search)
         res.render('searchResults', {
              pageTitle: `Kunstwerk: ${req.query.query}`,
              data: search.artObjects
        })
      })
      .catch(err => res.send(err))
})

app.listen(port);

//Use later when everything works
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .then((body) => body.data)
    .catch((error) => error)
}
