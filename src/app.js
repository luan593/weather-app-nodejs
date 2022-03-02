const path = require('path');
const express = require('express');
const hbs = require('hbs');

const PORT = 3000;
const app = express();

const publicPath = path.join(__dirname, '..', 'public'); 
const viewsPath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use('/public', express.static(publicPath));

app.get('', (req, res) => {
  res.render('index.hbs', {
    title: 'weather app',
    urlPath: req.originalUrl,
    creator: 'Andres Future App Dev'
  });
});

app.get('*', (req, res) => {
  res.render('404-error.hbs', {
    errorMessage: 'we can\'t find the page you are looking for'
  });
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});