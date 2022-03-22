# Server side Rijksmuseum

## Table of Contents
- [Description](#description)
- [Server setup](#Server)

## Description
To improve the single web page we have made for Rijksmuseum I build a server side application. It was a client side at first, but this comes with some counterpoints. The loading of the page takes some time plus if you have any javascript errors it can be fatal. This will be countered in server side rendering. 
  
## Server setup <a name="Server">
To begin the trandformation from client side to server side, I first needed to install some packages. The first thing needed was Node.js, thankfully I used this before so I already had it installed. Secondly I needed express.js. I installed it using the npm package manager via the terminal. The packagemanager then looks like this:
  
  ```
    "name": "myapp",
    "version": "1.0.0",
    "description": "server side app",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "nodemon app.js"
    },
    "author": "Jeany de Vries",
    "license": "ISC",
    "dependencies": {
      "ejs": "^3.1.6",
      "express": "^4.17.3"
    },
    "devDependencies": {
      "nodemon": "^2.0.15"
    }
  ```
  
  (I installed nodemon as well just so it refreshes the page automatically)
  
The second thing to do was setting the server up with the packages we have downloaded. A mistake I made was only using node.js for setting up the server. I realised  that I could set up my html very fast, but the css was a bit of a problem. I then asked for help and they said I needed to use express as well. This eventually made things a lot easier. But how did I get it to work? Well I first set up an app with the express method and made it listen to the port I wanted (you also need to import express using the require method). I then wanted to render the index.html. But after some searching I needed to translate the html to ejs. To find the ejs file I setset the ejs to views with a pathname where it could find it. For the other files I said to find it in the public folder, where I transferred my files in. This is the code below:
  
  
  ```
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
  ```

