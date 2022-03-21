const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>{
  res.render("index");
})

app.listen(port);

/*
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.writeHead(200, {'Content-Type' : 'text/html'})
  fs.readFile('index.html', function(error, data){
    if(error){
      res.writeHead(404);
      res.write('Error: File not found')
    }
    else{
      res.write(data);
    }
    res.end();
  })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/